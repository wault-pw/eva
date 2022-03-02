<template>
  <div class="space-form-item">
    <div class="space-form-item-row">
      <i
        class="icon-cancel-circled"
        @click.prevent="$emit('remove', donor.cid)"
      />

      <textarea
        v-model="title"
        class="space-form-item-title"
        placeholder="label"
        rows="1"
      />

      <div>
        R
      </div>
    </div>

    <div class="space-form-item-row">
      <i class="icon-ellipsis-vert" />

      <textarea
        v-model="hidden ? mask : body"
        :class="{'space-form-item-body-hidden': hidden}"
        :readonly="hidden"
        class="space-form-item-body"
        placeholder="value"
        rows="1"
        @input="onInput"
      />

      <i
        :class="{'icon-lock-filled': hidden, 'icon-lock-open-filled': !hidden}"
        @click="hidden = !hidden"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {ICardItem} from "~/store/CARD_ITEM";

export default Vue.extend({
  props: {
    donor: {
      type: Object as () => ICardItem,
      required: true
    }
  },

  data() {
    return {
      id: this.donor.id,
      title: this.donor.title,
      body: this.donor.body,
      hidden: this.donor.hidden
    }
  },

  computed: {
    mask(): string {
      return this.body.replace(/./g, '*')
    }
  },

  methods: {
    onInput(e: any) {
      const textarea = e.target
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }
})
</script>
