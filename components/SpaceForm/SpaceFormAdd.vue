<template>
  <div
    class="space-form-item space-form-item-add"
    @click.prevent="$emit('add')"
  >
    <div
      href="#"
      class="space-form-item-add-button"
      v-text="'+'"
      @click.prevent=""
    />

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
import Vue from "vue"

export default Vue.extend({
})
</script>
