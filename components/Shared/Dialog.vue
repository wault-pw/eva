<template>
  <div>
    <transition name="dialog-backdrop-transition">
      <div v-if="shown" class="dialog-backdrop"/>
    </transition>

    <transition
      name="dialog-box-transition"
      @after-leave="onHidden"
    >
      <div v-if="shown" class="dialog-wrapper">
        <div v-if="shown" class="dialog-box">
          <div>
            <p v-html="text" class="fw-bold mb-2" />

            <div
              v-if="value || placeholder"
              class="mb-3"
            >
              <input
                v-model="value"
                :placeholder="placeholder"
                type="text"
                class="form-control form-control-lg"
              >
            </div>

            <div class="text-end">
              <button
                class="btn btn-lg btn-dark"
                @click.prevent="dismiss"
              >
                {{ no || $tc("ui.no") }}
              </button>

              <button
                class="btn btn-lg btn-secondary"
                @click.prevent="approve"
              >
                {{ yes || $tc("ui.yes") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const RejectError = new Error("dialog was rejected")

interface IData {
  shown: boolean
  resolve: null | any
  reject: null | any
  approved: boolean
  value: string | null
  placeholder: string | null
  yes: string | null
  no: string | null
  text: string | null
}

export interface DialogShowOpts {
  resolve: any
  reject: any
  value: string | null
  placeholder: string | null
  yes: string | null
  no: string | null
  text: string | null
}

export default Vue.extend({
  data(): IData {
    return {
      shown: false,
      resolve: null,
      reject: null,
      approved: false,
      value: null,
      placeholder: null,
      yes: null,
      no: null,
      text: null,
    }
  },

  methods: {
    show(opts: DialogShowOpts) {
      this.text = opts.text
      this.resolve = opts.resolve
      this.reject = opts.reject
      this.value = opts.value
      this.placeholder = opts.placeholder
      this.yes = opts.yes
      this.no = opts.no
      this.shown = true
    },

    dismiss() {
      this.approved = false
      this.shown = false
    },

    approve() {
      this.approved = true
      this.shown = false
    },

    reset() {
      this.text = ""
      this.resolve = null
      this.reject = null
      this.approved = false
      this.value = null
      this.placeholder = null
      this.yes = null
      this.no = null
    },

    async onHidden() {
      this.approved ? this.resolve?.(this.value) : this.reject?.(RejectError)
    }
  }
})
</script>
