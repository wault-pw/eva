<template>
  <div
      class="space-form-item space-form-item-add"
      @click.prevent="$emit('add')"
  >
    <button
        class="btn space-form-item-add-button"
        @click.prevent=""
    >
      <i class="icon-plus" />
    </button>

    <div class="space-form-item-row">
      <i />

      <input
          class="space-form-item-title"
          readonly="readonly"
          tabindex="-1"
      />

      <i />
    </div>

    <div class="space-form-item-row">
      <i />

      <textarea
          ref="textarea"
          class="space-form-item-body"
          readonly="readonly"
          tabindex="-1"
          rows="1"
      />

      <i/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
})
</script>
