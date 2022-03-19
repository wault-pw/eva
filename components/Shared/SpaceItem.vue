<template>
  <div class="space-item">
    <div class="text-muted space-item-header">
      <span class="space-item-title">{{ item.title }}</span>

      <i
        v-if="eye"
        :class="{'icon-eye-off': !hidden, 'icon-eye': hidden}"
        class="space-item-eye"
        @click.prevent="hidden = !hidden"
      />
    </div>

    <div
      :class="`x-scale-${scale}`"
      class="space-item-body"
      v-text="value"
      @click.prevent="copy"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Mask } from '~/lib/mask'
import {ICardItem} from "~/store/CARD_ITEM"
import {TextScale} from "~/lib/scale";

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
      eye: this.item.hidden,
      body: this.item.body
    }
  },

  computed: {
    value(): String {
      return this.hidden ? Mask(this.body) : this.body
    },

    scale(): number {
      return TextScale(this.body)
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
