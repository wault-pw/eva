<template>
  <HelloLayout>
    <div class="hello-window">
      <div class="card">
        <div class="card-body">
          <p class="text-center mb-3" v-text="$tc('workspaceList.p1')" />

          <form name="workspace" @submit.prevent="submit">
            <fieldset :disabled="loading">
              <p class="mb-2">
                <input
                    v-model="title"
                    :placeholder="$tc('workspace.title').toLowerCase()"
                    autocapitalize="none"
                    class="form-control form-control-lg"
                    type="text"
                >
              </p>

              <p>
                <button
                    type="submit"
                    v-text="$t('ui.create')"
                    class="btn w-100 btn-lg btn-primary"
                />
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </HelloLayout>
</template>

<script lang="ts">
import AuthMiddleware from "@/middlewares/AuthMiddleware"
import HelloLayout from "@/layouts/HelloLayout.vue"
import {defineComponent} from "vue"
import {USER_STORE} from "@/store/USER"
import {IWorkspace, WORKSPACE_STORE} from "@/store/WORKSPACE"
import {Urn} from "@/lib/urn"

export default defineComponent({
  components: {HelloLayout},

  async beforeRouteEnter(to, from, next) {
    if (!AuthMiddleware(next)) return

    await WORKSPACE_STORE().LOAD_ALL(USER_STORE().$state)
    const def = WORKSPACE_STORE().DEFAULT
    if (def) return next(new Urn().workspace(def.id))
    next()
  },

  data() {
    return {
      title: "",
      loading: false
    }
  },

  methods: {
    async submit() {
      try {
        this.loading = true
        const workspace = await this.create(this.title)
        await this.$router.push(this.$urn.workspace(workspace.id))
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.loading = false
      }
    },

    async create(title: string): Promise<IWorkspace> {
      return await WORKSPACE_STORE().CREATE(USER_STORE().$state, title)
    }
  }
})
</script>
