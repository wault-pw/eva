<template>
  <SpacePanel @close="$emit('close')">
    <h2 class="text-white" v-text="$tc('mfa.h1')"/>

    <p v-text="$tc('mfa.p1')"/>
    <p v-text="$tc('mfa.p2')" class="mb-3" />

    <p v-if="otpEnabled">
      <button
          :disabled="readonly"
          v-text="$tc('ui.turnOff')"
          data-cy="off"
          class="btn btn-accent btn-lg"
          @click.prevent="turnOff"/>
    </p>

    <div v-if="otpDisabled">
      <p v-if="candidate === false">
        <button
            :disabled="readonly"
            v-text="$tc('ui.turnOn')"
            data-cy="on"
            class="btn btn-accent btn-lg"
            @click.prevent="candidate = true"/>
      </p>

      <MfaEnable v-if="candidate === true"/>
    </div>
  </SpacePanel>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import { USER_STORE } from "@/store/USER"
import SpacePanel from "@/components/SpacePanel/SpacePanel.vue"
import MfaEnable from "@/components/SpacePanel/MfaEnable.vue"

export default defineComponent({
  components: {SpacePanel, MfaEnable},

  props: {
    readonly: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      candidate: false
    }
  },

  computed: {
    otpEnabled(): boolean {
      return USER_STORE().otbEnabled
    },

    otpDisabled(): boolean {
      return !this.otpEnabled
    }
  },

  methods: {
    async turnOff() {
      try {
        await this.$dialog.prompt({text: this.$tc("dialog.disableMfa")})
      } catch {
        return
      }

      try {
        this.$throbber.show(this.$tc("ui.loading"))
        await USER_STORE().DISABLE_OTP()
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },
  }
})
</script>
