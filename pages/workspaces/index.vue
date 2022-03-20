<template>
  <div class="hello-window">
    <header class="text-center px-4">
      <h1
        v-text="$tc('workspaceList.h1')"
        class="mb-1 h2 text-uppercase"
      />

      <p
        v-text="$tc('workspaceList.p1')"
        class="text-white text-lowercase"
      />

      <div class="card shadow">
        <div class="card-body">
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
                  class="btn w-100 text-uppercase btn-lg btn-primary"
                />
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {IWorkspace, WorkspaceCreateOpts} from "~/store/WORKSPACE"

export default Vue.extend({
  middleware: ['auth'],
  layout: 'hello',

  async fetch(ctx) {
    await ctx.store.dispatch('WORKSPACE/LOAD_ALL', ctx.store.state.USER)
    const workspace = ctx.store.getters["WORKSPACE/DEFAULT"]
    if (workspace) await ctx.redirect(ctx.$urn.workspace(workspace.id))
  },

  data() {
    return {
      title: "",
      loading: false
    }
  },

  watch: {
    loading(newVal: boolean) {
      newVal ? this.$throbber.show(this.$tc("ui.loading")) : this.$throbber.hide()
    }
  },

  methods: {
    async submit() {
      try {
        this.loading = true
        const workspace = await this.create(this.title)
        await this.$router.push(this.$urn.workspace(workspace.id))
      } catch (e) {
        this.$throbber.error(this.$i18n.tc("ui.failed"), e)
      } finally {
        this.loading = false
      }
    },

    async create(title: string): Promise<IWorkspace> {
      return await this.$store.dispatch("WORKSPACE/CREATE", <WorkspaceCreateOpts>{
        title,
        user: this.$store.state.USER
      })
    }
  }
})
</script>
