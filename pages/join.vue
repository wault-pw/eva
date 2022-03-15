<template>
  <div class="hello-window">
    <header class="text-center px-4">
      <h1
        v-text="$tc('join.h1')"
        class="h2 mb-1 text-uppercase"
      />

      <p
        v-text="$tc('hello.h2')"
        class="text-white text-lowercase"
      />
    </header>

    <div ref="card" class="card shadow">
      <div class="card-body">
        <JoinForm
          :disabled="loading"
          :username.sync="username"
          :password.sync="password"
          @submit="trySubmit"
        />
      </div>
    </div>

    <p class="mt-4 text-center">
      <nuxt-link :to="$urn.login()" class="text-white">
        {{ $tc("menu.login") }}
      </nuxt-link>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {RegistrationRequest} from "~/desc/alice_v1_pb"
import {MapRegistrationUser} from "~/lib/domain_v1/user"
import {MapRegistrationWorkspace} from '~/lib/domain_v1/workspace'
import {MapRegistrationCard, MapRegistrationCardItem} from "~/lib/domain_v1/card"
import {TextEncode} from '~/lib/cryptos/util'
import {ISeed, Russian} from "~/lib/seeds"
import JoinForm from "~/components/Join/JoinForm.vue"

export default Vue.extend({
  components: {JoinForm},
  layout: "hello",

  data() {
    return {
      username: "",
      password: "",
      loading: false,
    }
  },

  mounted() {
    const card = this.$refs.card
    card.style["min-height"] = `${card.offsetHeight}px`
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

    async submit() {
      this.$throbber.show(this.$tc("join.step1"))

      const username = this.username
      const password = this.password

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
      const pub8 = await this.$ver.exportPubKey(pair)
      const priv8 = await this.$ver.exportPrivKey(pair)
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

      const seed: ISeed = Russian

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

  head() {
    return {
      title: this.$tc("join.title")
    }
  }
})
</script>
