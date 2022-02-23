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

    <button @click.prevent="submit">
      Click ME!
    </button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import {RegistrationRequest} from "~/desc/alice_v1_pb";
import {MapRegistrationUser} from "~/lib/domain_v1/user";

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
      const pub = await this.$ver.exportPubKey(pair)
      const priv = await this.$ver.exportPrivKey(pair)
      const key = await this.$ver.aedCipher.importKey(derived)

      const req = new RegistrationRequest()
      req.setUser(MapRegistrationUser({
        verifier,
        srpSalt,
        passwdSalt,
        identity: this.username,
        privKeyEnc: await this.$ver.aedEncrypt(key, priv, pub),
        pubKey: pub,
      }))

      await this.$adapter.register(req)
      alert("ok")
    }
  }
})
</script>
