<template>
  <div>
    <div class="text-muted space-item-header">
      <span class="space-item-title">{{ item.title }}</span>

      <i
          v-if="eye"
          :class="{'icon-eye-off': !hidden, 'icon-eye': hidden}"
          class="space-item-eye"
          @click.prevent="hidden = !hidden"
      />

      <i
          v-else-if="isLink"
          class="space-item-icon icon-link-ext-alt"
          @click.prevent="open"
      />
    </div>

    <div
        :class="[`x-scale-${scale}`, {'cursor-pointer': ableToCopy, 'text-primary': isLink}]"
        class="space-item-body"
        v-text="value"
        @click.prevent="copy"
    />
  </div>
</template>

<script lang="ts">
import { MatchedNum, Matcher } from "@/lib/matcher"
import {TextMask, TextScale } from "@/lib/text"
import { ICardItem } from "@/store/CARD_ITEM"
import {defineComponent} from "vue"

export default defineComponent({
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
      return this.hidden ? TextMask(this.body) : this.body
    },

    scale(): number {
      return TextScale(this.body)
    },

    // do not copy if a large scale
    ableToCopy(): boolean {
      return this.scale == 1
    },

    isLink(): boolean {
      return this.matcher == MatchedNum.Link
    },

    matcher(): MatchedNum {
      return Matcher(this.body)
    }
  },

  methods: {
    async copy() {
      if (!this.ableToCopy) return
      await navigator.clipboard.writeText(this.item.body)
      this.$emit('copied')
    },

    open() {
      window.open(this.body, '_blank')
    }
  }
})
</script>
