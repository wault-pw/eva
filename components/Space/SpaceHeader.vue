<template>
  <header class="space-header">
    <div>
      <div
        class="x-hidden-lg-up"
        @click="$emit('update:left', !left)"
      >
        MENU {{ left }}
      </div>
    </div>

    <div
      v-if="title"
      class="space-header-title"
    >
      {{ title }}
    </div>

    <div
      v-if="!title"
      class="space-header-logo"
    />

    <div class="text-end">
      <div
        @click="$emit('update:menu', !menu)"
      >
        right {{ menu }}
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    left: {
      type: Boolean,
      required: true,
    },

    menu: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      required: false,
      default: null
    }
  }
})
</script>
