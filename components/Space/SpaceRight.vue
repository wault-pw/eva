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
import _throttle from "lodash/throttle"
import { ICard } from "~/store/CARD"

export default Vue.extend({
  props: {
    active: {
      type: Object,
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
    onScroll() {

    }
    // onScroll: _throttle(function ({ target: {scrollTop} }) {
    //   this.buttonOffset = scrollTop
    // }, 80, this)
  }
})
</script>
