<template>
  <div class="password-generator">
    <i
        class="icon-arrows-cw password-generator-ico"
        @click.prevent="refresh"
    />

    <input
        v-model="value"
        type="text"
        class="password-generator-input form-control"
        @keydown.enter.prevent="down"
    />

    <i
        class="icon-down password-generator-ico"
        @click.prevent="down"
    />
  </div>
</template>

<script lang="ts">
import {PASSWORD_CHARS, PASSWORD_DIGITS, PASSWORD_LETTERS} from '@/lib/const'
import {GeneratePassword} from '@/lib/cryptos/util'
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      value: ""
    }
  },

  beforeMount() {
    this.refresh()
  },

  mounted() {
    document.body.addEventListener('click', this.clickOutside)
  },

  beforeUnmount() {
    document.body.removeEventListener('click', this.clickOutside)
  },

  methods: {
    refresh() {
      this.value = GeneratePassword(PASSWORD_LETTERS + PASSWORD_CHARS + PASSWORD_DIGITS, 24)
    },

    down() {
      this.$emit('down', this.value)
    },

    clickOutside(event: any) {
      if (this.$el == event.target || this.$el.contains(event.target)) return
      this.$emit('close')
    }
  }
})
</script>
