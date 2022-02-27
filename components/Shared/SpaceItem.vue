<template>
  <div class="space-item">
    <div class="text-muted">
      {{ item.title }}
    </div>

    <div class="fs-4">
      {{ item.body }}
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
  }
})
</script>
