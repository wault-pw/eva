<template>
  <SpacePanel @close="$emit('close')">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h3 class="text-white" v-text="$tc('mfa.h1')"/>

          <p v-text="$tc('mfa.p1')"/>
          <p v-text="$tc('mfa.p2')"/>

          <p v-if="otpEnabled">
            <a
              :disabled="readonly"
              v-text="$tc('ui.turnOff')"
              href="javascript:"
              data-cy="off"
              class="btn btn-accent btn-lg"
              @click.prevent="turnOff"/>
          </p>

          <div v-if="otpDisabled">
            <p v-if="candidate === false">
              <a
                :disabled="readonly"
                v-text="$tc('ui.turnOn')"
                href="javascript:"
                data-cy="on"
                class="btn btn-accent btn-lg"
                @click.prevent="candidate = true"/>
            </p>

            <MfaEnable v-if="candidate === true"/>
          </div>
        </div>
      </div>
    </div>
  </SpacePanel>
</template>

<script lang="ts">
import Vue from "vue"
import SpacePanel from "~/components/SpacePanel/SpacePanel.vue"
import MfaEnable from "~/components/Mfa/MfaEnable.vue"

export default Vue.extend({
  components: {MfaEnable, SpacePanel},

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
      return this.$store.state.USER.otbEnabled
    },

    otpDisabled(): boolean {
      return !this.otpEnabled
    }
  },

  methods: {
    async turnOff() {
      try {
        await this.$dialog.prompt({text: this.$i18n.tc("dialog.disableMfa")})
      } catch {
        return
      }

      try {
        this.$throbber.show(this.$i18n.tc("ui.loading"))
        await this.$store.dispatch("USER/DISABLE_OTP")
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },
  }
})
</script>
