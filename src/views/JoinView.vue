<template>
  <HelloLayout>
    <div class="hello-window">
      <div class="card">
        <div class="card-body">
          <p
              v-text="$tc('join.h2')"
              class="text-center text-lowercase"
          />

          <JoinForm
              v-model:username="username"
              v-model:password="password"
              :disabled="loading"
              @done="trySubmit"
          />
        </div>
      </div>

      <p class="mt-4 text-center">
        <router-link
            :to="$urn.login()"
            v-text="$tc('menu.login')"
            class="text-white"
        />
      </p>
    </div>
  </HelloLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import HelloLayout from "@/layouts/HelloLayout.vue"
import JoinForm from "@/components/Shared/JoinForm.vue"
import {ISeed, Russian, English, Chinese} from "@/locales/seeds"
import {TextEncode} from "@/lib/cryptos/util"
import {RegistrationRequest} from "@/desc/alice_v1_pb"
import {MapRegistrationUser} from "@/mapper_v1/user.mapper"
import {MapRegistrationWorkspace} from "@/mapper_v1/workspace.mapper"
import {MapRegistrationCard, MapRegistrationCardItem} from "@/mapper_v1/card.mapper"

export default defineComponent({
  components: {JoinForm, HelloLayout},

  data() {
    return {
      username: "",
      password: "",
      loading: false,
    }
  },

  methods: {
    async trySubmit() {
      try {
        this.loading = true
        await this.submit()
        await this.$router.push(this.$urn.login())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.loading = false
        this.$throbber.hide()
      }
    },

    seed(locale: string): ISeed {
      switch (locale) {
        case "ru":
          return Russian
        case "en":
          return English
        case "zh":
          return Chinese
        default:
          throw `unkown seed for <${locale}>`
      }
    },

    async submit() {
      this.$throbber.show(this.$tc("join.step1"))
      const [username, password] = await this.$ver.credentials(this.username, this.password)
      const srp = this.$ver.NewSrpBridge()
      const srpSalt = await srp.randomSalt()
      await srp.init({username, password, salt: srpSalt})
      const verifier = await srp.verifier()

      this.$throbber.show(this.$tc("join.step2"))
      const passwdSalt = this.$ver.random(this.$ver.deriveSaltSize)
      const derived = await this.$ver.derive.generate(
          TextEncode(password),
          passwdSalt,
          this.$ver.deriveIter,
          this.$ver.aedKeySize
      )
      this.$throbber.show(this.$tc("join.step3"))
      const pair = await this.$ver.pubCipher.generatePair()
      const pub8 = await this.$ver.exportPubKey(pair.publicKey)
      const priv8 = await this.$ver.exportPrivKey(pair.privateKey)
      const uKey = await this.$ver.aedCipher.importKey(derived)
      const wKey = await this.$ver.aedCipher.generateKey()
      const wKey8 = await this.$ver.aedCipher.exportKey(wKey)
      const wKey8Enc = await this.$ver.pubCipher.encrypt(pair.publicKey, wKey8)
      this.$throbber.show(this.$tc("ui.loading"))
      const req = new RegistrationRequest()
      req.setUser(MapRegistrationUser({
        verifier,
        srpSalt,
        passwdSalt,
        identity: username,
        privKeyEnc: await this.$ver.aedEncrypt(uKey, priv8, pub8),
        pubKey: pub8,
      }))

      const seed: ISeed = this.seed(this.$i18n.locale)
      req.setWorkspace(MapRegistrationWorkspace({
        aedKeyEnc: wKey8Enc,
        titleEnc: await this.$ver.aedEncryptText(wKey, seed.workspace.title, null),
      }))

      for (const card of seed.cards) {
        const rq = MapRegistrationCard({
          titleEnc: await this.$ver.aedEncryptText(wKey, card.title, null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, card.tag, null)],
        })

        for (const item of card.items) {
          rq.addItems(MapRegistrationCardItem({
            titleEnc: await this.$ver.aedEncryptText(wKey, item.title, null),
            bodyEnc: await this.$ver.aedEncryptText(wKey, item.body, null),
            hidden: item.hidden
          }))
        }

        req.addCardWithItems(rq)
      }

      await this.$adapter.register(req)
    }
  },

  // head() {
  //   return {
  //     title: this.$tc("join.title")
  //   }
  // }
})
</script>
