<template>
  <div data-cy="card" class="space-main-wrapper">
    <StatusThrobber
      :absolute="true"
      ref="throbber"
    />

    <div
      :class="{'space-card-archived': card.archived}"
      class="space-card space-main"
    >
      <header class="space-card-header x-hidden-md-up">
        <nav
          class="space-card-header-nav"
          @click.prevent="$emit('close')"
        >
          <i class="icon-left-open" />
        </nav>

        <nav
          class="space-card-header-nav"
          @click.prevent="$emit('edit', items)"
        >
          <i class="icon-pencil" />
        </nav>

        <nav
          :disabled="readonly"
          class="space-card-header-nav"
          @click.prevent="clone"
        >
          <i class="icon-copy" />
        </nav>

        <nav
          :disabled="readonly"
          class="space-card-header-nav"
          @click.prevent="archive"
        >
          <i class="icon-archive" />
        </nav>

        <nav
          :disabled="readonly"
          class="space-card-header-nav"
          @click.prevent="destroy"
        >
          <i class="icon-trash-1" />
        </nav>
      </header>

      <header class="space-card-header x-hidden-md-down">
        <nav
          class="space-card-header-nav"
          v-text="$tc('ui.edit')"
          @click.prevent="$emit('edit', items)"
        />

        <nav
          :disabled="readonly"
          class="space-card-header-nav"
          v-text="$tc('ui.toClone')"
          @click.prevent="clone"
        />

        <nav
          :disabled="readonly"
          class="space-card-header-nav"
          v-text="card.archived ? $tc('ui.restore') : $tc('ui.archive')"
          @click.prevent="archive"
        />

        <nav
          :disabled="readonly"
          class="space-card-header-nav"
          v-text="$tc('ui.delete')"
          @click.prevent="destroy"
        />
      </header>

      <section
        v-if="fetched"
        class="pt-4 space-card-body"
      >
        <h2 class="mb-2">
          {{ card.title }}
        </h2>

        <ul
          v-if="card.tags.length"
          class="space-card-tags mb-3"
        >
          <li
            v-for="tag in card.tags"
            :key="tag"
          >
            <span class="badge rounded-pill bg-primary" v-text="tag"/>
          </li>
        </ul>

        <SpaceItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          class="mb-3"
          @copied="onCopied"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {ArchiveCardOpts, CardCloneOpts, DeleteCardOpts, ICard} from "~/store/CARD"
import {IWorkspace} from "~/store/WORKSPACE";
import {CardItemLoadOpts, ICardItem} from "~/store/CARD_ITEM"
import StatusThrobber from "~/components/Shared/StatusThrobber.vue"
import SpaceItem from "~/components/Shared/SpaceItem.vue"

interface IData {
  items: Array<ICardItem>
  loading: boolean
  fetched: boolean
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
    },

    readonly: {
      type: Boolean,
      required: true
    }
  },

  data(): IData {
    return {
      items: [],
      // fetched - to prevent title blinking
      // while card items loading
      fetched: false,
      loading: false
    }
  },

  async mounted() {
    await this.load()
  },

  watch: {
    loading(newVal: boolean) {
      const throbber: any = this.$refs.throbber
      newVal ? throbber.show(this.$i18n.tc("ui.loading")) : throbber.hide()
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
      this.fetched = true
    },

    async clone() {
      this.loading = true

      const card = await this.$store.dispatch("CARD/CLONE", <CardCloneOpts>{
        workspace: this.workspace,
        id: this.card.id,
        title: `${this.card.title} (${this.$tc('ui.copy').toLowerCase()})`
      })

      this.$emit('cloned', card)
      this.loading = false
    },

    async destroy() {
      try {
        await this.$dialog.confirm({text: this.$i18n.tc("dialog.deleteCard")})
      } catch {
        return
      }

      this.loading = true

      await this.$store.dispatch("CARD/DELETE_CARD", <DeleteCardOpts>{workspace: this.workspace, id: this.card.id})
      this.$emit("close")

      this.loading = false
    },

    async archive() {
      try {
        await this.$dialog.confirm({text: this.$i18n.tc("dialog.archiveCard")})
      } catch {
        return
      }

      this.loading = true

      await this.$store.dispatch("CARD/ARCHIVE_CARD", <ArchiveCardOpts>{workspace: this.workspace, id: this.card.id})
      this.$emit("close")

      this.loading = false
    },

    onCopied() {
      const throbber: any = this.$refs.throbber
      throbber.shot(this.$i18n.tc("ui.copied"))
    }
  }
})
</script>
