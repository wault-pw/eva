<template>
  <SpacePanel @close="$emit('close')">
    <h2 class="text-white" v-text="$tc('share.h1')"/>

    <p v-text="$tc('share.p1')" class="mb-3"/>

    <div v-if="loading">
      <Throbber />
    </div>

    <div v-if="shares.length" class="mb-3">
      <p v-text="$tc('share.p2') + ':'" class="mb-0"/>

      <ul>
        <li v-for="share in shares" :key="share.id">
          <a
              href="javascript:"
              class="text-white"
              v-text="share.userId"
              @click.prevent="remove(share.id)"
          />
        </li>
      </ul>
    </div>

    <form v-if="!loading" @submit.prevent="create">
      <fieldset :disabled="disabled">
        <p class="mb-2">
          <input
              v-model="userId"
              :placeholder="$tc('user.id').toLowerCase()"
              autocapitalize="none"
              data-cy="username"
              class="form-control form-control-lg form-control-dark"
              type="text"
          >
        </p>

        <p>
          <button
              :disabled="disabled"
              v-text="$tc('menu.share')"
              data-cy="share"
              type="submit"
              class="btn btn-accent btn-lg"
          />
        </p>
      </fieldset>
    </form>
  </SpacePanel>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {IShare, SHARE_STORE} from "@/store/SHARE"
import {IWorkspace} from "@/store/WORKSPACE"
import SpacePanel from "@/components/SpacePanel/SpacePanel.vue"
import Throbber from "@/components/Shared/Throbber.vue"
import _reject from "lodash/reject"

interface IData {
  userId: string
  shares: Array<IShare>
  loading: boolean
}

export default defineComponent({
  components: {Throbber, SpacePanel},

  props: {
    workspace: {
      type: Object as () => IWorkspace,
      required: true,
    },

    readonly: {
      type: Boolean,
      required: true
    }
  },

  data(): IData {
    return {
      userId: "",
      shares: [],
      loading: false
    }
  },

  computed: {
    disabled(): boolean {
      return this.readonly || this.workspace.sharedWithYou
    },
  },

  async created() {
    if (this.disabled) return
    await this.load()
  },

  methods: {
    async create() {
      try {
        this.$throbber.show(this.$tc("ui.loading"))
        const share = await SHARE_STORE().CREATE(this.workspace, this.userId)
        this.shares.push(share)
        this.userId = ""
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async load() {
      this.loading = true
      this.shares = await SHARE_STORE().LIST(this.workspace)
      this.loading = false
    },

    async remove(id: string) {
      try {
        await this.$dialog.confirm({text: this.$tc("dialog.areYouSure")})
      } catch(e) {
        return
      }

      try {
        this.$throbber.show(this.$tc("ui.loading"))
        await SHARE_STORE().DELETE(id)
        this.shares = _reject(this.shares, {id})
      }  catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    }
  }
})
</script>
