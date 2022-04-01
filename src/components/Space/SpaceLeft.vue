<template>
  <aside
      :class="{'space-left-sown': shown}"
      data-cy="left"
      class="space-left space-aside py-2"
  >

    <ul class="space-nav mb-0">
      <li>
        <i class="icon-folder"/>

        <b v-text="$tc('spaceLeft.workspaces')"/>

        <a
            v-if="!readonly"
            class="icon-plus"
            href="#"
            style="opacity: 1;"
            @click.prevent="create"
        />
      </li>

      <li
          v-for="item in workspaces"
          :class="{active: item.id === workspace.id}"
          :key="item.id"
      >
        <a
            v-if="!readonly"
            href="javascript:"
            class="icon-i-cursor space-nav-icon-hidden text-center"
            @click.prevent="rename(item)"
        />

        <i v-else/>

        <router-link
            :to="$urn.workspace(item.id)"
            v-text="item.title"
        />

        <a
            v-if="!readonly"
            data-cy="delete"
            href="javascript:"
            class="icon-trash space-nav-icon-hidden"
            @click.prevent="destroy(item)"
        />
      </li>
    </ul>

    <hr class="space-nav-hr">

    <ul class="space-nav">
      <li>
        <i class="icon-tag"/>

        <b v-text="$tc('card.tags')"/>
      </li>

      <li :class="{active: isCleared}">
        <i/>

        <a
            href="#"
            v-text="$tc('ui.all')"
            class="text-lowercase"
            @click.prevent="erase"
        />

        <span class="space-nav-ico justify-content-start">
           <span
               class="space-nav-ico-counter"
               v-text="tagSet.total"
           />
        </span>
      </li>

      <li :class="{active: archived}">
        <i/>

        <a
            href="#"
            class="text-lowercase"
            v-text="$tc('card.archived')"
            @click.prevent="setArchived(!archived)"
        />

        <span class="space-nav-ico justify-content-start">
           <span
               class="space-nav-ico-counter"
               v-text="tagSet.archived"
           />
        </span>
      </li>

      <li
          v-for="name in tagSet.list()"
          :class="{active: tag === name}"
          :key="name"
      >
        <i/>

        <a
            v-text="name"
            href="#"
            @click.prevent="setTag(name)"
        />

        <span class="space-nav-ico justify-content-start">
          <span
              class="space-nav-ico-counter"
              v-text="tagSet.counter(name)"
          />
        </span>
      </li>
    </ul>

    <div class="space-aside-footer mt-auto pt-3">
      © Wault ver.{{ $setup.version }}<br>
    </div>
  </aside>
</template>

<script lang="ts">
import {CARD_STORE, TagSet } from "@/store/CARD"
import { USER_STORE } from "@/store/USER"
import { IWorkspace, WORKSPACE_STORE } from "@/store/WORKSPACE"
import {defineComponent} from "vue"

export default defineComponent({
  props: {
    shown: {
      type: Boolean,
      required: true,
    },

    tag: {
      type: String,
      required: false,
      default: null
    },

    archived: {
      type: Boolean,
      required: true
    },

    readonly: {
      type: Boolean,
      required: true,
    }
  },

  computed: {
    workspace(): IWorkspace {
      return WORKSPACE_STORE().active
    },

    workspaces(): Array<IWorkspace> {
      return WORKSPACE_STORE().list
    },

    tagSet(): TagSet {
      return CARD_STORE().TAG_SET
    },

    isCleared(): Boolean {
      return this.tag == null && !this.archived
    }
  },

  methods: {
    setTag(name: string) {
      this.$emit('update:tag', name)
      this.$emit('update:archived', false)
    },

    setArchived(value: boolean) {
      this.$emit('update:tag', null)
      this.$emit('update:archived', value)
    },

    erase() {
      this.$emit('update:tag', null)
      this.$emit('update:archived', false)
    },

    async create() {
      let title: string
      try {
        title = <string>await this.$dialog.prompt({
          text: this.$tc("dialog.createWorkspace"),
          placeholder: this.$tc("workspace.title").toLowerCase()
        })
      } catch {
        return
      }

      const workspace = await WORKSPACE_STORE().CREATE(USER_STORE().$state, title)
      await this.$router.push(this.$urn.workspace(workspace.id))
    },

    async destroy(workspace: IWorkspace) {
      try {
        await this.$dialog.prompt({
          text: this.$tc("dialog.deleteWorkspaceHtml"),
          placeholder: workspace.title,
          verify: true,
        })
      } catch {
        return
      }

      await this.$adapter.deleteWorkspace(workspace.id)
      WORKSPACE_STORE().REMOVE_FROM_LIST(workspace.id)

      if (this.workspace.id == workspace.id) {
        await this.$router.push(this.$urn.workspaces())
      }
    },

    async rename(workspace: IWorkspace) {
      let title: string;
      try {
        title = <string>await this.$dialog.prompt({
          text: this.$tc("dialog.renameWorkspace"),
          placeholder: this.$tc("workspace.title"),
          value: workspace.title,
        })
      } catch {
        return
      }

      await WORKSPACE_STORE().UPDATE(USER_STORE().$state, workspace, title)
    }
  }
})
</script>
