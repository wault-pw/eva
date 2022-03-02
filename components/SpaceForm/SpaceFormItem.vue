<template>
  <div class="space-form-item">
    <div class="space-form-item-row">
      <div @click.prevent="$emit('remove', donor.cid)">
        D
      </div>

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
      <div>
        L
      </div>

      <textarea
        v-model="hidden ? mask : body"
        :class="{'space-form-item-body-hidden': hidden}"
        :readonly="hidden"
        class="space-form-item-body"
        placeholder="value"
        rows="1"
        @input="onInput"
      />

      <div @click="hidden = !hidden">
        R
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {IWorkspace} from "~/store/WORKSPACE"

interface IDonor {
  cid: number
  title: string
  body: string
  hidden: boolean
}

export default Vue.extend({
  props: {
    donor: {
      type: Object as () => IDonor,
      required: true
    }
  },

  data() {
    return {
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
      console.log(textarea)
    }
  }
})
</script>
