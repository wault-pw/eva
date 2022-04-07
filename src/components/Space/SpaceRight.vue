<template>
  <aside class="space-right" data-cy="right">
    <button
        data-cy="add"
        class="btn btn-primary space-right-add"
        @click.prevent="$emit('add')"
    >
      <i class="icon-plus" />
    </button>

    <ul class="space-right-ul">
      <li
          v-for="card in cards"
          :key="card.id"
          :class="{active: isActive(card)}"
          class="space-right-li"
      >
        <div
            :class="{active: isActive(card), archived: card.archived}"
            class="space-right-item"
            @click="$emit('update:active', card)"
        >
          <span v-text="card.title || '\u2800'"/>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {ICard} from "@/store/CARD"
import _throttle from "lodash/throttle"

export default defineComponent({
  props: {
    active: {
      type: Object as () => ICard,
      required: false,
    },

    cards: {
      type: Array as () => Array<ICard>,
      required: true
    }
  },

  methods: {
    isActive(card: ICard): boolean {
      return this.active ? card.id === this.active.id : false
    }
  }
})
</script>
