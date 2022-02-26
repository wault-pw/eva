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
        <b>Workspaces</b>

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
        <b>Tags</b>
      </li>

      <li>
        <i/>

        <a href="#">all</a>

        <i class="opacity-50">{{cardsCount}}</i>
      </li>

      <li
        v-for="tag in tags"
        :key="tag.title"
      >
        <i/>

        <a href="#">{{ tag.title }}</a>

        <i
          class="space-nav-icon space-nav-icon-right opacity-50"
          style="opacity: 1"
        >
          {{ tag.count }}
        </i>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import {IWorkspace} from "~/store/WORKSPACE";

export default Vue.extend({
  props: {
    shown: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    cardsCount(): number {
      return 0
    },

    workspace(): IWorkspace {
      return this.$store.getters["WORKSPACE/ACTIVE"]
    },

    workspaces(): Array<IWorkspace> {
      return this.$store.state.WORKSPACE.list
    },

    tags(): Array<string> {
      return []
    }
  },

  methods: {
    async create() {

    },

    async destroy() {
    }
  }
})
</script>
