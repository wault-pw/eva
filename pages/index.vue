<template>
  <div class="hello-window">
    <header class="text-center">
      <h1 class="mb-1 text-uppercase">
        {{ $tc("login.h1") }}
      </h1>

      <p class="text-white text-lowercase">
        {{ $tc("hello.h2") }}
      </p>
    </header>

    <div class="card shadow">
      <div class="card-body">
        <form @submit.prevent="trySubmit">
          <p>
            <input
              v-model="username"
              :placeholder="$tc('ui.username').toLowerCase()"
              autocapitalize="none"
              class="form-control form-control-lg"
              type="text"
            >
          </p>

          <p>
            <input
              v-model="password"
              :placeholder="$tc('ui.passphrase').toLowerCase()"
              class="form-control form-control-lg"
              type="password"
            >
          </p>

          <p>
            <button
              type="submit"
              class="btn w-100 text-uppercase btn-lg btn-primary"
            >
              {{ $t('ui.login') }}
            </button>
          </p>
        </form>

        <div class="mt-4 pt-1"/>

        <fieldset class="mb-3 x-fieldset">
          <legend class="small">{{ $tc("ui.or") }}</legend>
        </fieldset>

        <p class="mb-0 text-center text-lowercase">
          <nuxt-link :to="$urn.join()" class="text-">
            {{ $tc("menu.join") }}
          </nuxt-link>
        </p>
      </div>
    </div>

    <p class="mt-4 text-center">
      <a href="#" @click.prevent="demo" class="text-white">
        {{ $tc("menu.demo") }}
      </a>
    </p>
  </div>
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
      await this.trySubmit()
    },

    async trySubmit() {
      try {
        await this.submit()
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async submit() {
      this.$throbber.show("0")
      const res0 = await this.auth0(this.username)
      const srp = this.$ver.NewSrpBridge()
      await srp.init({username: this.username, password: this.password, salt: res0.getSalt_asU8()})

      this.$throbber.show("1")
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
  },

  head() {
    return {
      title: this.$tc("login.title")
    }
  }
})
</script>
