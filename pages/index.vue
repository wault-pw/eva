<template>
  <form @submit.prevent="submit">
    <p>
      <input
        v-model="username"
        :placeholder="$t('ui.username')"
        type="text"
      >
    </p>

    <p>
      {{ username }} / {{ password }}
    </p>

    <p>
      <input
        v-model="password"
        :placeholder="$t('ui.passphrase')"
        type="password"
      >
    </p>

    <p>
      <button type="submit">
        {{ $t('ui.login') }}
      </button>
    </p>

    <p>
      <a href="#" @click.prevent="demo">
        login_as_demo_user
      </a>
    </p>

    <p>
      <nuxt-link :to="$urn.join()">
        join
      </nuxt-link>
    </p>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import {Login0Request, Login0Response, Login1Request, Login1Response} from "~/desc/alice_v1_pb";

export default Vue.extend({
  layout: "hello",

  data() {
    return {
      username: "",
      password: "",
    }
  },

  methods: {
    async demo() {
      this.username = this.$setup.demoUsername
      this.password = this.$setup.demoPassword
      await this.submit()
    },

    async submit() {
      const res0 = await this.auth0(this.username)
      const srp = this.$ver.NewSrpBridge()
      await srp.init({username: this.username, password: this.password, salt: res0.getSalt_asU8()})
      const challenge = await srp.setServerPublicKey(res0.getMutual_asU8())

      const res1 = await this.auth1(challenge.publicKey, challenge.proof)
      alert(await srp.isProofValid(res1.getProof_asU8()))
    },

    async auth0(username: string): Promise<Login0Response> {
      const req = new Login0Request()
      req.setIdentity(username)
      return await this.$adapter.auth0(req)
    },

    async auth1(mutual: Uint8Array, proof: Uint8Array): Promise<Login1Response> {
      const req = new Login1Request()
      req.setMutual(mutual)
      req.setProof(proof)
      return await this.$adapter.auth1(req)
    },
  }
})
</script>
