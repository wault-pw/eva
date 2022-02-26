<template>
  <div class="hello-window">
    <header class="text-center">
      <h1 class="mb-1 text-uppercase">
        {{ $tc("join.h1") }}
      </h1>

      <p class="text-white text-lowercase">
        {{ $tc("hello.h2") }}
      </p>
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
import {RegistrationRequest} from "~/desc/alice_v1_pb";
import {MapRegistrationUser} from "~/lib/domain_v1/user";
import { MapRegistrationWorkspace } from '~/lib/domain_v1/workspace';
import JoinForm from "~/components/Join/JoinForm.vue";
import {MapCardWithItems} from "~/lib/domain_v1/card";

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
      const srp = this.$ver.NewSrpBridge()
      const srpSalt = await srp.randomSalt()
      await srp.init({username: this.username, password: this.password, salt: srpSalt})
      const verifier = await srp.verifier()

      this.$throbber.show(this.$tc("join.step2"))
      const passwdSalt = this.$ver.random(this.$ver.deriveSaltSize)
      const derived = await this.$ver.derive.generate(
        new TextEncoder().encode(this.password),
        passwdSalt,
        this.$ver.deriveIter,
        this.$ver.aedKeySize
      )

      this.$throbber.show(this.$tc("join.step3"))
      const pair = await this.$ver.pubCipher.generatePair()
      const pub8 = await this.$ver.exportPubKey(pair)
      const priv8 = await this.$ver.exportPrivKey(pair)
      const ukey = await this.$ver.aedCipher.importKey(derived)

      const wKey = await this.$ver.aedCipher.generateKey()
      const wKey8 = await this.$ver.aedCipher.exportKey(wKey)
      const wKey8Enc = await this.$ver.pubCipher.encrypt(pair.publicKey, wKey8)

      this.$throbber.show(this.$tc("join.step4"))
      const req = new RegistrationRequest()
      req.setUser(MapRegistrationUser({
        verifier,
        srpSalt,
        passwdSalt,
        identity: this.username,
        privKeyEnc: await this.$ver.aedEncrypt(ukey, priv8, pub8),
        pubKey: pub8,
      }))

      req.setWorkspace(MapRegistrationWorkspace({
        aedKeyEnc: wKey8Enc,
        titleEnc: await this.$ver.aedEncryptText(wKey, "personal", null),
      }))

      req.setCardWithItemsList([
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "Facebook (example)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "social", null)],
          items: [
            {
              titleEnc: await this.$ver.aedEncryptText(wKey, "login", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "user@example.com", null),
            },
            {
              titleEnc: await this.$ver.aedEncryptText(wKey, "password", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "password123", null),
            }
          ]
        }),
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "Apple (example)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "social", null)]
        }),
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "Gmail (example)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "social", null)]
        }),
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "bitcoin (example)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "finance", null)]
        }),
      ])

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
