<template>
  <aside class="space-right" @scroll="onScroll">
    <a
      :style="{transform: `translateY(${buttonOffset}px)`}"
      class="space-right-add" href="#"
      @click.prevent="$emit('add')"
    >
      +
    </a>

    <ul class="space-right-ul">
      <li
        v-for="card in cards"
        :key="card.id"
        class="space-right-li"
      >
        <div
          :class="{active: active && card.id === active.id}"
          class="space-right-item"
          @click="$emit('update:active', card)"
        >
          <span v-text="card.title" />
        </div>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import Vue from "vue"
import { ICard } from "~/store/CARD"
import _throttle from "lodash/throttle"

export default Vue.extend({
  props: {
    active: {
      type: Object as () => ICard,
      required: false,
    }
  },

  data() {
    return {
      buttonOffset: 0,
    }
  },

  computed: {
    cards(): Array<ICard> {
      return this.$store.state.CARD.list
    }
  },

  methods: {
    onScroll: _throttle(function(this: any, e: any) {
      this.buttonOffset = e.target.scrollTop
    }, 80),
  }
})
</script>
