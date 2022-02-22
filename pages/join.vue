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
      const srp = this.$setup.NewSrpVerifier()
      await srp.init({username: this.username, password: this.password})
      console.log("SRP: verifier", await srp.verifier())

      const derive = await this.$setup.ver.derive.generate(
        new TextEncoder().encode(this.password),
        new Uint8Array([1,2,3,34,34,4,234,5,33]),
        this.$setup.ver.deriveIter,
        32
      )

      console.log("DERIVED:", derive)

      const pair = await this.$setup.ver.pubCipher.generatePair()
      console.log("PUB:", await this.$setup.ver.exportPubKey(pair))
      console.log("PRIV:", await this.$setup.ver.exportPrivKey(pair))

      srp.destroy()
    }
  }
})
</script>
