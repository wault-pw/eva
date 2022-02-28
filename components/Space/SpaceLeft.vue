<template>
  <aside
    :class="{'space-left-sown': shown}"
    class="space-left space-aside py-3"
  >
    <ul class="space-nav mb-0">
      <li>
        <i/>
        <b v-text="$tc('spaceLeft.workspaces')"/>

        <a
          class="space-nav-icon space-nav-icon-right"
          href="#"
          style="opacity: 1;"
          @click.prevent="create"
        >C</a>
      </li>

      <li
        v-for="item in workspaces"
        :class="{active: item.id === workspace.id}"
        :key="item.id"
      >
        <i
          :class="{'space-nav-icon-hidden': item.id !== workspace.id }"
          class="space-nav-ico"
        >
          E
        </i>

        <nuxt-link
          :to="$urn.workspace(item.id)"
          v-text="item.title"
        />

        <a
          href="#"
          class="space-nav-icon space-nav-icon-hidden"
          @click.prevent="destroy(item)"
        >
          D
        </a>
      </li>
    </ul>

    <hr class="space-nav-hr">

    <ul class="space-nav">
      <li>
        <i/>

        <b v-text="$tc('card.tags')"/>
      </li>

      <li :class="{active: isCleared}">
        <i/>

        <a
          href="#"
          v-text="$tc('ui.all')"
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
      2022 © OKA ver.{{ $setup.version }}<br>
      Tallinn, Estonia
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from "vue"
import {IWorkspace, WorkspaceCreateOpts} from "~/store/WORKSPACE"
import {TagSet} from "~/store/CARD";

export default Vue.extend({
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
    }
  },

  computed: {
    workspace(): IWorkspace {
      return this.$store.state.WORKSPACE.active
    },

    workspaces(): Array<IWorkspace> {
      return this.$store.state.WORKSPACE.list
    },

    tagSet(): TagSet {
      return this.$store.getters["CARD/TAG_SET"]
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
        title = <string>await this.$dialog.prompt({text: "Create a workplace", placeholder: "Enter a name"})
      } catch {
        return
      }

      const workspace = await this.$store.dispatch("WORKSPACE/CREATE", <WorkspaceCreateOpts>{
        title,
        user: this.$store.state.USER
      })
      await this.$router.push(this.$urn.workspace(workspace.id))
    },

    async destroy(workspace: IWorkspace) {
      try {
        await this.$dialog.prompt({text: "To delete a workspace<br>enter its name:", placeholder: workspace.title})
      } catch {
        return
      }

      await this.$adapter.deleteWorkspace(workspace.id)
      this.$store.commit("WORKSPACE/REMOVE_FROM_LIST", workspace.id)

      if (this.workspace.id == workspace.id) {
        await this.$router.push(this.$urn.workspaces())
      }
    }
  }
})
</script>
