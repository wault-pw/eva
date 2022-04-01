<template>
  <SpacePanel @close="$emit('close')">
    <form @submit.prevent="trySubmit">
      <h2 class="text-white" v-text="$tc('panelPassphrase.h1')"/>

      <p v-text="$tc('panelPassphrase.p1')" class="mb-3"/>
      <p v-text="$i18n.tc('user.username')"/>
      <p>
        <input
            v-model="oldUsername"
            :placeholder="$tc('user.oldUsername').toLowerCase()"
            data-cy="old-username"
            autocapitalize="none"
            class="form-control form-control-lg form-control-dark"
            type="text"
        >
      </p>

      <p class="mb-3">
        <input
            v-model="newUsername"
            :placeholder="$tc('user.newUsername').toLowerCase()"
            data-cy="new-username"
            autocapitalize="none"
            class="form-control form-control-lg form-control-dark"
            type="text"
        >
      </p>

      <p v-text="$i18n.tc('user.password')"/>

      <p>
        <input
            v-model="newPassword"
            :placeholder="$tc('user.newPassword').toLowerCase()"
            data-cy="new-password"
            autocapitalize="none"
            class="form-control form-control-lg form-control-dark"
            type="password"
        >
      </p>

      <p class="mb-2">
        <input
            v-model="newPasswordConfirmation"
            :placeholder="$tc('user.confirmPassword').toLowerCase()"
            data-cy="confirm-password"
            autocapitalize="none"
            class="form-control form-control-lg form-control-dark"
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
  </SpacePanel>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import SpacePanel from "@/components/SpacePanel/SpacePanel.vue"
import {USER_STORE} from "@/store/USER"

export default defineComponent({
  components: {SpacePanel},

  props: {
    readonly: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      oldUsername: "",
      newUsername: "",
      newPassword: "",
      newPasswordConfirmation: "",
      check: false
    }
  },

  computed: {
    disabled(): boolean {
      return this.readonly ||
          !this.check ||
          this.oldUsername == "" ||
          this.newUsername == "" ||
          this.newPassword == "" ||
          this.newPassword !== this.newPasswordConfirmation
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
      const [newUsername, newPassword] = await this.$ver.credentials(this.newUsername, this.newPassword)
      const [oldUsername, _] = await this.$ver.credentials(this.oldUsername, "")

      await USER_STORE().UPDATE_CREDENTIALS(USER_STORE().$state, {
        newIdentity: newUsername,
        oldIdentity: oldUsername,
        password: newPassword
      })
    }
  }
})
</script>
