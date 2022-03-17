<template>
  <header data-cy="header" class="space-header">
    <nav class="space-header-nav">
      <a
        href="javascript:"
        class="space-header-nav-a x-hidden-lg-up"
        @click.prevent="$emit('update:left', !left)"
      >
        <i class="icon-tags" />
      </a>
    </nav>

    <div
      v-if="title"
      v-text="title"
      class="space-header-title text-lowercase"
    />

    <div
      v-if="!title"
      class="space-header-logo"
    />

    <nav class="space-header-nav justify-content-end">
      <a
        href="javascript:"
        class="space-header-nav-a"
        data-cy="menu"
        @click.prevent="$emit('update:menu', !menu)"
      >
        <i class="icon-menu" />
      </a>
    </nav>
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
