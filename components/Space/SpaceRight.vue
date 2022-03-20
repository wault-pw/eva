<template>
  <aside class="space-right" data-cy="right" @scroll="onScroll">
    <a
      :style="{transform: `translateY(${buttonOffset}px)`}"
      href="javascript:"
      data-cy="add"
      class="space-right-add"
      v-text="'+'"
      @click.prevent="$emit('add')"
    />

    <ul class="space-right-ul">
      <li
        v-for="card in cards"
        :key="card.id"
        class="space-right-li"
      >
        <div
          :class="{active: active && card.id === active.id, archived: card.archived}"
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
import Vue from "vue"
import {ICard} from "~/store/CARD"
import _throttle from "lodash/throttle"

export default Vue.extend({
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

  data() {
    return {
      buttonOffset: 0,
    }
  },

  methods: {
    onScroll: _throttle(function (this: any, e: any) {
      this.buttonOffset = e.target.scrollTop
    }, 480),
  }
})
</script>
