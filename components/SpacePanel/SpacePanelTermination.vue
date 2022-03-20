<template>
  <SpacePanel @close="$emit('close')">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="trySubmit">
            <h3
              class="text-white"
              v-text="$tc('termination.h1')"
            />

            <p
              v-text="$tc('termination.p1')"
              class="mb-0"
            />

            <hr class="my-3"/>

            <p>
              <input
                v-model="username"
                :placeholder="$tc('user.username').toLowerCase()"
                data-cy=username
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
  </SpacePanel>
</template>

<script lang="ts">
import Vue from "vue"
import {TextEncode} from "~/lib/cryptos/util"
import {MapTerminateUser} from "~/lib/domain_v1/user"
import SpacePanel from "~/components/SpacePanel/SpacePanel.vue";

export default Vue.extend({
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
      return this.readonly || (!this.check || this.username === "")
    }
  },

  methods: {
    async trySubmit() {
      if (this.disabled) return

      try {
        await this.$dialog.prompt({text: this.$i18n.tc("dialog.areYouSure")})
      } catch {
        return
      }

      try {
        this.$throbber.show(this.$i18n.tc("ui.loading"))
        await this.submit()
        await this.$router.push(this.$urn.login())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async submit() {
      const [username, _] = await this.$ver.credentials(this.username, "")
      await this.$adapter.terminate(MapTerminateUser({identity: username}))
    }
  }
})
</script>
