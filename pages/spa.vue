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
        <form
          name="login"
          @submit.prevent="trySubmit"
        >
          <p>
            <input
              v-model="password"
              :placeholder="$tc('user.password').toLowerCase()"
              class="form-control form-control-lg"
              type="password"
            >
          </p>

          <p class="mb-0">
            <button
              type="submit"
              v-text="$t('ui.login')"
              class="btn w-100 text-uppercase btn-lg btn-primary"
            />
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Login0Request, Login0Response, Login1Request, Login1Response} from "~/desc/alice_v1_pb";
import {WhoAmIParam} from '~/store/USER';

export default Vue.extend({
  layout: "hello",
  middleware: ['spa'],

  data() {
    return {
      username: "",
      password: "",
    }
  },

  async mounted() {
    try {
      this.$throbber.show("loading")
      await this.$adapter.init()
    } catch (e) {
      this.$throbber.error(this.$tc("ui.failed"), e)
    } finally {
      this.$throbber.hide()
    }
  },

  methods: {
    async trySubmit() {
      try {
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
  },

  head() {
    return {
      title: this.$tc("spa.title")
    }
  }
})
</script>
