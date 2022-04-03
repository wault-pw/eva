<template>
  <div class="space-item">
    <div class="space-item-header">
      <span class="text-muted space-item-title">{{ item.title }}</span>

      <i
          v-if="eye"
          :class="{'icon-eye-off': !hidden, 'icon-eye': hidden}"
          class="space-item-ico"
          @click.prevent="hidden = !hidden"
      />

      <i
          v-else-if="isLink"
          class="space-item-ico icon-link-ext-alt"
          @click.prevent="open"
      />
    </div>

    <div class="space-item-body">
      <div
          :class="[`x-scale-${scale}`, {'cursor-pointer': ableToCopy, 'text-primary': isLink}]"
          class="space-item-body-value"
          v-text="value"
          @click.prevent="copy"
      />

      <Popper
          v-if="qrSize"
          :zIndex="1"
          offsetDistance="0"
          :hover="true"
          placement="left"
          class="space-item-ico space-item-ico-bottom hidden-sm-down"
      >
        <i class="icon-qrcode space-item-ico-hidden"/>

        <template #content>
          <QrcodeVue :value="body" :size="qrSize" render-as="svg" />
        </template>
      </Popper>
    </div>
  </div>
</template>

<script lang="ts">
import {MatchedNum, Matcher} from "@/lib/matcher"
import {QrCodeSize, TextMask, TextScale} from "@/lib/text"
import {ICardItem} from "@/store/CARD_ITEM"
import {defineComponent} from "vue"
import Popper from "vue3-popper"
import QrcodeVue from "qrcode.vue"

export default defineComponent({
  components: {Popper, QrcodeVue},

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

    qrSize(): number {
      return QrCodeSize(this.body)
    },

    matcher(): MatchedNum {
      return Matcher(this.body)
    }
  },

  methods: {
    async copy() {
      if (!this.ableToCopy) return
      await navigator.clipboard.writeText(this.body)
      this.$emit('copied')
    },

    open() {
      window.open(this.body, '_blank')
    }
  }
})
</script>
