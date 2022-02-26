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
      <h2>
        {{ card.title }}
      </h2>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {CardCloneOpts, DeleteCardOpts, ICard} from "~/store/CARD";
import {IWorkspace} from "~/store/WORKSPACE";

export default Vue.extend({
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

  data() {
    return {
      items: []
    }
  },

  watch: {
    'card.id': {
      immediate: true,
      async handler(newID) {
        if (newID) {
          // BusBoot(this).load("booting")
          // await this.load()
          // BusBoot(this).done()
        }
      }
    }
  },

  methods: {
    // async load() {
    //   const {items} = await this.$adapter.listCardItems({
    //     workspaceId: this.workspace.id,
    //     id: this.card.id
    //   }, ListCardItemsResponse)
    //   const out = []
    //   for (const item of items) {
    //     out.push(await this.decode(this.workspace, item))
    //   }
    //   this.items = out
    // },
    //
    // async decode({aedKey}, {id, cardId, titleEnc, bodyEnc}) {
    //   return {
    //     id,
    //     cardId,
    //     title: await DECRYPT_USER_WORKSPACE_TEXT({aedKey, enc: titleEnc}),
    //     body: await DECRYPT_USER_WORKSPACE_TEXT({aedKey, enc: bodyEnc}),
    //   }
    // },
    //
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
