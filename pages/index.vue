<template>
  <div class="hello-window">
    <header class="text-center">
      <h1
        v-text="$tc('login.h1')"
        class="mb-1 text-uppercase"
      />

      <p
        v-text="$tc('hello.h2')"
        class="text-white text-lowercase"
      />
    </header>

    <div class="card shadow">
      <div class="card-body">
        <form
          name="login"
          @submit.prevent="trySubmit"
        >
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
              v-text="$t('ui.login')"
              class="btn w-100 text-uppercase btn-lg btn-primary"
            />
          </p>
        </form>

        <div class="mt-4 pt-1"/>

        <fieldset class="mb-3 x-fieldset">
          <legend
            v-text="$tc('ui.or')"
            class="small"
          />
        </fieldset>

        <p class="mb-0 text-center text-lowercase">
          <nuxt-link
            :to="$urn.join()"
            data-cy="join"
          >
            {{ $tc("menu.join") }}
          </nuxt-link>
        </p>
      </div>
    </div>

    <p class="mt-4 text-center">
      <a
        href="#"
        v-text="$tc('menu.demo')"
        class="text-white"
        @click.prevent="demo"
      />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Login0Request, Login0Response, Login1Request, Login1Response} from "~/desc/alice_v1_pb";
import {WhoAmIParam} from '~/store/USER';

export default Vue.extend({
  layout: "hello",
  middleware: ['mpa'],

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
        await this.whoami(this.password)
        await this.$router.push(this.$urn.workspaces())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async whoami(password: string) {
      await this.$store.dispatch('USER/WHO_AM_I', {password} as WhoAmIParam)
    },

    async submit() {
      this.$throbber.show(this.$tc("login.auth0"))
      const res0 = await this.auth0(this.username)
      const srp = this.$ver.NewSrpBridge()
      await srp.init({username: this.username, password: this.password, salt: res0.getSalt_asU8()})

      this.$throbber.show(this.$tc("login.auth1"))
      const challenge = await srp.setServerPublicKey(res0.getMutual_asU8())
      const res1 = await this.auth1(challenge.publicKey, challenge.proof)
      const valid = await srp.isProofValid(res1.getProof_asU8())
      if (!valid) throw(`invalid credentials`)
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
