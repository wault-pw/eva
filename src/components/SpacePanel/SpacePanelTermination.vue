<template>
  <SpacePanel @close="$emit('close')">
    <form @submit.prevent="trySubmit">
      <h2
          class="text-white"
          v-text="$tc('termination.h1')"
      />

      <p v-text="$tc('termination.p1')" class="mb-3" />

      <p class="mb-3">
        <input
            v-model="username"
            :placeholder="$tc('user.username').toLowerCase()"
            autocapitalize="none"
            data-cy="username"
            class="form-control form-control-lg form-control-dark"
            type="text"
        >
      </p>

      <div class="form-check mb-4">
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

      <p class="mb-0">
        <button
            :disabled="disabled"
            v-text="$tc('termination.button')"
            class="btn btn-accent btn-lg"
            type="submit"
        />
      </p>
    </form>
  </SpacePanel>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {MapTerminateUser} from "@/mapper_v1/user.mapper"
import SpacePanel from "@/components/SpacePanel/SpacePanel.vue"

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
      check: false,
      username: "",
    }
  },

  computed: {
    disabled(): boolean {
      return (this.readonly || !this.check || this.username === "")
    }
  },

  methods: {
    async trySubmit() {
      if (this.disabled) return

      try {
        await this.$dialog.prompt({text: this.$tc("dialog.areYouSure")})
      } catch {
        return
      }

      try {
        this.$throbber.show(this.$tc("ui.loading"))
        await this.submit()
        await this.$router.push(this.$urn.login())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async submit() {
      const [identity, _] = await this.$ver.credentials(this.username, "")
      await this.$adapter.terminate(MapTerminateUser({identity}))
    }
  }
})
</script>
