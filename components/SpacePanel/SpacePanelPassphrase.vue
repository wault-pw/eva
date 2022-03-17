<template>
  <SpacePanel @close="$emit('close')">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h3 class="text-white" v-text="$tc('export.h1')"/>

          <p v-text="$tc('export.p1')"/>

          <form @submit.prevent="trySubmit">
            <p>
              <input
                v-model="oldUsername"
                :placeholder="$tc('user.oldUsername').toLowerCase()"
                autocapitalize="none"
                class="form-control form-control-lg"
                type="text"
              >
            </p>

            <p>
              <input
                v-model="newUsername"
                :placeholder="$tc('user.newUsername').toLowerCase()"
                autocapitalize="none"
                class="form-control form-control-lg"
                type="text"
              >
            </p>

            <p>
              <input
                v-model="newPassword"
                :placeholder="$tc('user.newPassword').toLowerCase()"
                autocapitalize="none"
                class="form-control form-control-lg"
                type="password"
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
                v-text="$tc('panelPassphrase.check')"
                class="form-check-label"
                for="accept"
              />
            </div>

            <p>
              <button
                :disabled="disabled"
                v-text="$tc('ui.save')"
                class="btn btn-accent btn-lg"
                type="submit"
              />
            </p>
          </form>
        </div>
      </div>
    </div>
  </SpacePanel>
</template>

<script lang="ts">
import Vue from "vue"
import SpacePanel from "~/components/SpacePanel/SpacePanel.vue"
import {CredentialsUpdateOpts} from "~/store/USER";

export default Vue.extend({
  components: {SpacePanel},

  data() {
    return {
      oldUsername: "",
      newUsername: "",
      newPassword: "",
      check: false
    }
  },

  computed: {
    disabled(): boolean {
      return !this.check ||
        this.oldUsername == "" ||
        this.newUsername == "" ||
        this.newPassword == ""
    }
  },

  methods: {
    async trySubmit() {
      if (this.disabled) return

      try {
        this.$throbber.show(this.$tc("ui.loading"))
        await this.submit()
        await this.$adapter.logout()
        await this.$router.push(this.$urn.login())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async submit() {
      await this.$store.dispatch("USER/UPDATE_CREDENTIALS", <CredentialsUpdateOpts>{
        user: this.$store.state.USER,
        newIdentity: this.newUsername,
        oldIdentity: this.oldUsername,
        password: this.newPassword
      })
    }
  }
})
</script>
