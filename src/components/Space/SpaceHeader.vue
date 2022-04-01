<template>
  <header data-cy="header" class="space-header">
    <nav class="space-header-nav">
      <a
          href="javascript:"
          class="space-header-nav-a hidden-lg-up"
          data-cy="left"
          @click.prevent="$emit('update:left', !left)"
      >
        <i class="icon-tags"/>
      </a>

      <input
          v-model="value"
          :size="size"
          :placeholder="$tc('ui.search')"
          autofocus
          type="text"
          class="space-header-input hidden-lg-down mr-2"
      />
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
        <i class="icon-menu"/>
      </a>
    </nav>
  </header>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
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
    },

    query: {
      type: String,
      required: true,
    }
  },

  computed: {
    value: {
      get(): string {
        return this.query
      },

      set(value: string) {
        this.$emit('update:query', value)
      },
    },

    size(): number {
      return this.value === "" ? this.$tc('ui.search').length : this.value.length
    }
  }
})
</script>
