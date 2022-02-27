<template>
  <div class="space-card space-main space-main-focused">
    <header class="space-card-header">
      <nav
        class="space-card-header-nav"
        v-text="$tc('ui.edit')"
        @click.prevent="$emit('edit')"
      />

      <nav
        class="space-card-header-nav"
        v-text="$tc('ui.clone')"
        @click.prevent="clone"
      />

      <nav
        class="space-card-header-nav"
        v-text="$tc('ui.archive')"
      />

      <nav
        class="space-card-header-nav"
        v-text="$tc('ui.delete')"
        @click.prevent="destroy"
      />
    </header>

    <section class="pt-4 space-card-body">
      <h2 class="mb-3">
        {{ card.title }}
      </h2>

      <SpaceItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        class="mb-3"
      />
    </section>

    <StatusThrobber
      :absolute="true"
      ref="throbber"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {CardCloneOpts, DeleteCardOpts, ICard} from "~/store/CARD"
import {IWorkspace} from "~/store/WORKSPACE";
import {CardItemLoadOpts, ICardItem} from "~/store/CARD_ITEM"
import StatusThrobber from "~/components/Shared/StatusThrobber.vue"
import SpaceItem from "~/components/Shared/SpaceItem.vue"

interface IData {
  items: Array<ICardItem>
  loading: boolean
}

export default Vue.extend({
  components: {SpaceItem, StatusThrobber},
  props: {
    card: {
      type: Object as () => ICard,
      required: true
    },

    workspace: {
      type: Object as () => IWorkspace,
      required: true,
    }
  },

  data(): IData {
    return {
      items: [],
      loading: false
    }
  },

  watch: {
    'card.id': {
      immediate: true,
      async handler(newID) {
        if (newID) {
          // BusBoot(this).load("booting")
          await this.load()
          // BusBoot(this).done()
        }
      }
    },

    loading(newVal: boolean) {
      const throbber: any = this.$refs.throbber
      newVal ? throbber.show("Loading") : throbber.hide()
    }
  },

  methods: {
    async load() {
      this.loading = true
      this.items = await this.$store.dispatch("CARD_ITEM/LOAD", <CardItemLoadOpts>{
        workspace: this.workspace,
        cardId: this.card.id
      })
      this.loading = false
    },

    async clone() {
      const card = await this.$store.dispatch("CARD/CLONE", <CardCloneOpts>{
        workspace: this.workspace,
        id: this.card.id,
        title: `${this.card.title} (clone)`
      })
      this.$emit('cloned', card)
    },

    async destroy() {
      try {
        await this.$dialog.confirm({text: "Delete card?"})
      } catch {
        return
      }

      await this.$store.dispatch("CARD/DELETE_CARD", <DeleteCardOpts>this.card)
      this.$emit("destroyed")
    }
  }
})
</script>
