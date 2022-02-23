<template>
  <form>
    <p>
      <input
        v-model="username"
        type="text"
      >
    </p>

    <p>
      <input
        v-model="password"
        type="text"
      >
    </p>

    <p>
      <button @click.prevent="submit">
        Click ME!
      </button>
    </p>

    <p>
      <nuxt-link :to="$urn.login()">
        login
      </nuxt-link>
    </p>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import {RegistrationRequest} from "~/desc/alice_v1_pb";
import {MapRegistrationUser} from "~/lib/domain_v1/user";
import { MapRegistrationWorkspace } from '~/lib/domain_v1/workspace';

export default Vue.extend({
  layout: "hello",

  data() {
    return {
      username: "",
      password: "",
    }
  },

  methods: {
    async submit() {
      const srp = this.$ver.NewSrpBridge()
      const srpSalt = await srp.randomSalt()
      await srp.init({username: this.username, password: this.password, salt: srpSalt})
      const verifier = await srp.verifier()

      const passwdSalt = this.$ver.random(this.$ver.deriveSaltSize)
      const derived = await this.$ver.derive.generate(
        new TextEncoder().encode(this.password),
        passwdSalt,
        this.$ver.deriveIter,
        this.$ver.aedKeySize
      )

      console.log("DERIVED:", derived)
      const pair = await this.$ver.pubCipher.generatePair()
      const pub8 = await this.$ver.exportPubKey(pair)
      const priv8 = await this.$ver.exportPrivKey(pair)
      const ukey = await this.$ver.aedCipher.importKey(derived)

      const wKey = await this.$ver.aedCipher.generateKey()
      const wKey8 = await this.$ver.aedCipher.exportKey(wKey)
      const wKey8Enc = await this.$ver.pubCipher.encrypt(pair.publicKey, wKey8)

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

      await this.$adapter.register(req)
      alert("ok")
    }
  }
})
</script>
