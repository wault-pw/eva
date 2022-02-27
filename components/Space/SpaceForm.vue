<template>
  <form class="space-form">
    <p class="mb-0">
      <input
        v-model="title"
        type="text"
        placeholder="card title"
        class="form-control form-control-lg space-form-title"
        style="font-size: 2rem"
      >
    </p>

    <div />

    <div class="space-form-footer">
      <button
        class="btn btn-success"
        v-text="$tc('ui.save')"
        @click.prevent="create"
      />

      <button
        class="btn btn-secondary"
        v-text="$tc('ui.cancel')"
        @click.prevent="$emit('cancel')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import {IWorkspace} from "~/store/WORKSPACE"

export default Vue.extend({
  props: {
    cardId: {
      type: String,
      required: false,
    },
    cardTitle: {
      type: String,
      required: false,
    },
    workspace: {
      type: Object as () => IWorkspace,
      required: true,
    }
  },

  data() {
    return {
      id: this.cardId,
      title: this.cardTitle,
      items: []
    }
  },

  methods: {
    create() {

    }
  }
})
</script>
