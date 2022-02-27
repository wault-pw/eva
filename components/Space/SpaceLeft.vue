<template>
  <aside
    :class="{'space-left-sown': shown}"
    class="space-left"
  >
    <div
      class="text-white mb-4"
      @click="$emit('update:shown', !shown)"
    >
      hide
    </div>

    <ul class="space-nav mb-3">
      <li>
        <i/>
        <b v-text="$tc('spaceLeft.workspaces')" />

        <a
          class="space-nav-icon space-nav-icon-right"
          href="#"
          style="opacity: 1;"
          @click.prevent="create"
        >C</a>
      </li>

      <li
        v-for="item in workspaces"
        :key="item.id"
      >
        <i
          :class="{'space-nav-icon-hidden': item.id !== workspace.id }"
          class="space-nav-ico"
        >
          E
        </i>

        <nuxt-link :to="$urn.workspace(item.id)">{{ item.title }}</nuxt-link>

        <a
          href="#"
          class="space-nav-icon space-nav-icon-hidden"
          @click.prevent="destroy(item)"
        >
          D
        </a>
      </li>
    </ul>

    <ul class="space-nav">
      <li>
        <i/>

        <b v-text="$tc('spaceLeft.workspaces')" />
      </li>

      <li>
        <i/>

        <a href="#" @click.prevent="$emit('update:activeTag', null)">all</a>

        <span class="space-nav-ico justify-content-start">
           <span
             class="space-nav-ico-counter"
             v-text="cardsCount"
           />
        </span>
      </li>

      <li
        v-for="tag in tags"
        :key="tag.name"
      >
        <i/>

        <a
          :class="{'nuxt-link-active': activeTag === tag}"
          v-text="tag.name"
          href="#"
          @click.prevent="$emit('update:activeTag', tag)"
        />

        <span class="space-nav-ico justify-content-start">
          <span
            class="space-nav-ico-counter"
            v-text="tag.count"
          />
        </span>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import Vue from "vue"
import {IWorkspace, WorkspaceCreateOpts} from "~/store/WORKSPACE"
import {ITag} from "~/store/CARD"

export default Vue.extend({
  props: {
    shown: {
      type: Boolean,
      required: true,
    },

    activeTag: {
      type: Object as () => ITag
    }
  },

  computed: {
    cardsCount(): number {
      return this.$store.getters["CARD/COUNT"]
    },

    workspace(): IWorkspace {
      return this.$store.state.WORKSPACE.active
    },

    workspaces(): Array<IWorkspace> {
      return this.$store.state.WORKSPACE.list
    },

    tags(): Array<ITag> {
      return this.$store.getters["CARD/TAG_SET"]
    },
  },

  methods: {
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
