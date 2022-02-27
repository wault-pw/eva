<template>
  <div class="space-item">
    <div class="text-muted space-item-header">
      <span class="space-item-title">{{ item.title }}</span>

      <i
        v-if="eye"
        class="space-item-eye"
        @click.prevent="hidden = !hidden"
      >
        👁
      </i>
    </div>

    <div
      class="fs-4 space-item-body"
      @click.prevent="copy"
    >
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {ICardItem} from "~/store/CARD_ITEM"

export default Vue.extend({
  props: {
    item: {
      type: Object as () => ICardItem,
      required: true
    }
  },

  data() {
    return {
      hidden: this.item.hidden,
      eye: this.item.hidden
    }
  },

  computed: {
    value(): String {
      return this.hidden ? "*".repeat(this.item.body.length) : this.item.body
    }
  },

  methods: {
    async copy() {
      await navigator.clipboard.writeText(this.item.body)
      this.$emit('copied')
    }
  }
})
</script>
