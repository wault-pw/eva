<template>
  <div class="space-panel py-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="trySubmit">
            <h2
              class="text-white mb-3 text-uppercase"
              v-text="$tc('termination.h2')"
            />

            <p
              v-text="$tc('termination.p1')"
              class="mb-0 text-uppercase"
            />

            <hr class="my-3" />

            <p>
              <input
                v-model="username"
                :placeholder="$tc('ui.username').toLowerCase()"
                autocapitalize="none"
                class="form-control form-control-lg"
                type="text"
              >
            </p>

            <div class="form-check mb-3">
              <input
                v-model="check"
                class="form-check-input"
                type="checkbox"
                id="accept"
              >
              <label
                v-text="$tc('termination.check')"
                class="form-check-label"
                for="accept"
              />
            </div>

            <p>
              <button
                :disabled="disabled"
                v-text="$tc('termination.button')"
                class="btn btn-accent btn-lg"
                type="submit"
              />
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { TextEncode } from "~/lib/cryptos/util"
import {MapTerminateUser} from "~/lib/domain_v1/user"

export default Vue.extend({
  data() {
    return {
      check: false,
      username: "",
    }
  },

  computed: {
    disabled(): boolean {
      return (!this.check || this.username === "")
    }
  },

  methods: {
    async trySubmit() {
      if (this.disabled) return

      try {
        this.$throbber.show("loading")
        await this.submit()
        await this.$router.push(this.$urn.login())
      } catch(e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async submit() {
      await this.$adapter.terminate(MapTerminateUser({
        identity: TextEncode(this.username)
      }))
    }
  }
})
</script>
