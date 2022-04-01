<template>
  <div data-cy="card" class="space-main">
    <div class="space-card">
      <header class="space-card-header hidden-md-up">
        <nav
            class="space-card-header-nav"
            @click.prevent="$emit('close')"
        >
          <i class="icon-left-open"/>
        </nav>

        <nav
            class="space-card-header-nav"
            @click.prevent="$emit('edit', items)"
        >
          <i class="icon-pencil"/>
        </nav>

        <nav
            :disabled="readonly"
            class="space-card-header-nav"
            @click.prevent="clone"
        >
          <i class="icon-copy"/>
        </nav>

        <nav
            :disabled="readonly"
            class="space-card-header-nav"
            @click.prevent="archive"
        >
          <i class="icon-archive"/>
        </nav>

        <nav
            :disabled="readonly"
            class="space-card-header-nav"
            @click.prevent="destroy"
        >
          <i class="icon-trash-1"/>
        </nav>
      </header>

      <header class="space-card-header hidden-md-down">
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
          :class="{'space-card-body-archived': card.archived}"
          class="pt-3 space-card-body"
      >
        <h1 class="mb-1">
          {{ card.title }}
        </h1>

        <ul
            v-if="card.tags.length"
            class="mb-3"
        >
          <li
              v-for="tag in card.tags"
              :key="tag"
          >
            <span class="badge" v-text="tag"/>
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
import {CARD_STORE, ICard} from "@/store/CARD"
import {CARD_ITEM_STORE, ICardItem} from "@/store/CARD_ITEM"
import {IWorkspace, WORKSPACE_STORE} from "@/store/WORKSPACE"
import {defineComponent} from "vue"
import SpaceItem from "@/components/Space/SpaceItem.vue";

interface IData {
  items: Array<ICardItem>
  loading: boolean
  fetched: boolean
}

export default defineComponent({
  components: {SpaceItem},
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
      loading: false,
      fetched: false,
    }
  },

  watch: {
    loading(val: boolean) {
      val ? this.$emit("loadingBegin") : this.$emit("loadingDone")
    }
  },

  async mounted() {
    await this.load()
  },

  methods: {
    async load() {
      this.loading = true
      this.items = await CARD_ITEM_STORE().LOAD(WORKSPACE_STORE().active, this.card.id)
      this.fetched = true
      this.loading = false
    },

    onCopied() {
      this.$emit("shot", this.$tc("ui.copied"))
    },

    async clone() {
      this.loading = true
      const card = await CARD_STORE().CLONE(this.workspace, {
        id: this.card.id,
        title: `${this.card.title} (${this.$tc('ui.copy').toLowerCase()})`
      })
      this.$emit('cloned', card)
      this.loading = false
    },

    async destroy() {
      try {
        await this.$dialog.confirm({text: this.$tc("dialog.deleteCard")})
      } catch {
        return
      }

      this.loading = true
      await CARD_STORE().DELETE_CARD(this.workspace, this.card.id)
      this.$emit("close")
      this.loading = false
    },

    async archive() {
      try {
        await this.$dialog.confirm({text: this.$tc("dialog.archiveCard")})
      } catch {
        return
      }

      this.loading = true
      await CARD_STORE().ARCHIVE_CARD(this.workspace, this.card.id)
      this.$emit("close")
      this.loading = false
    },
  }
})
</script>
