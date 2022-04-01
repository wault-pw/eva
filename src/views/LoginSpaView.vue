<template>
  <HelloLayout>
    <div class="hello-window">
      <div class="card">
        <div class="card-body">
          <form
              name="login"
              @submit.prevent="trySubmit"
          >
            <p class="mb-3">
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
                  class="btn w-100 btn-lg btn-primary"
              />
            </p>
          </form>
        </div>
      </div>
    </div>
  </HelloLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import HelloLayout from "@/layouts/HelloLayout.vue"
import {USER_STORE} from "@/store/USER"

export default defineComponent({
  components: {HelloLayout},

  beforeMount() {
    if (!this.$setup.spa) this.$router.push(this.$urn.login())
  },

  data() {
    return {
      username: "",
      password: "",
    }
  },

  async mounted() {
    try {
      this.$throbber.show(this.$tc("ui.loading"))
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
        this.$throbber.show(this.$tc("ui.loading"))
        const [_, password] = await this.$ver.credentials("", this.password)
        await this.whoami(password)
        await this.$router.push(this.$urn.workspaces())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async whoami(password: string) {
      await USER_STORE().WHO_AM_I(password)
    },
  },

  // head() {
  //   return {
  //     title: this.$tc("spa.title")
  //   }
  // }
})
</script>
