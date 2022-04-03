<template>
  <form v-if="url" @submit.prevent="submit">
    <p>
      <QrcodeVue :value="url" :size="150" render-as="svg" />
    </p>

    <p v-html="$t('mfaEnable.p1Html', { secret: secret })" />

    <p v-text="$i18n.tc('mfaEnable.p2')" />

    <p>
      <input
          v-model="username"
          :placeholder="$tc('user.username').toLowerCase()"
          data-cy=username
          autocapitalize="none"
          class="form-control form-control-lg form-control-dark"
          type="text"
      >
    </p>

    <p>
      <input
          v-model="passcode"
          :placeholder="$tc('user.otpPasscode').toLowerCase()"
          data-cy="passcode"
          autocapitalize="none"
          class="form-control form-control-lg form-control-dark"
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
          v-text="$tc('mfaEnable.check')"
          class="form-check-label"
          for="accept"
      />
    </div>

    <p>
      <button
          :disabled="disabled"
          v-text="$tc('ui.turnOn')"
          class="btn btn-accent btn-lg"
          type="submit"
      />
    </p>
  </form>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import QrcodeVue from "qrcode.vue"
import { USER_STORE } from "@/store/USER"

interface IData {
  url: string | null
  secret: string | null
  username: string
  passcode: string
  check: boolean
}

export default defineComponent({
  components: {QrcodeVue},

  data(): IData {
    return {
      url: null,
      secret: null,
      username: "",
      passcode: "",
      check: false,
    }
  },

  computed: {
    disabled(): boolean {
      return !this.check || this.username === "" || this.passcode === ""
    }
  },

  async mounted() {
    await this.issue()
  },

  methods: {
    async issue() {
      try {
        this.$throbber.show(this.$tc("ui.loading"))
        const res = await this.$adapter.otpIssue()
        this.url = res.getUrl()
        this.secret = res.getSecret()
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async submit() {
      if (this.disabled) return

      try {
        this.$throbber.show(this.$tc("ui.loading"))
        const [identity, _] = await this.$ver.credentials(this.username, "")
        await USER_STORE().ENABLE_OTP({identity, passcode: this.passcode})
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    }
  }
})
</script>
