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
        <aside ref="box" tabindex="-1" class="dialog-box" data-cy="dialog" @keydown.esc="dismiss">
          <form @submit.prevent="approve">
            <p v-html="text" class="fw-bold mb-2" />

            <div
              v-if="value || placeholder != null"
              class="mb-3"
            >
              <input
                v-model="value"
                :placeholder="placeholder"
                autocapitalize="none"
                type="text"
                class="form-control form-control-lg"
              >
            </div>

            <div class="text-end">
              <button
                type="button"
                class="btn btn-lg btn-accent"
                @click.prevent="dismiss"
              >
                {{ no || $tc("ui.no") }}
                <span class="opacity-25 x-hidden-md-down">esc</span>
              </button>

              <button
                :disabled="disabled"
                data-cy="yes"
                type="submit"
                class="btn btn-lg btn-dark"
              >
                {{ yes || $tc("ui.yes") }}
              </button>
            </div>
          </form>
        </aside>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import _toString from "lodash/toString"

const RejectError = new Error("dialog was rejected")

interface IData {
  shown: boolean
  verify: null | boolean
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
  verify: null | boolean
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
      verify: false,
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

  computed: {
    disabled(): boolean {
      return this.verify! && _toString(this.value) !== _toString(this.placeholder)
    }
  },

  watch: {
    shown(value) {
      this.$nextTick(() => {
        // autofocus dialog to be able to press ESC key
        if (value) {
          const box: any = this.$refs.box!
          box.focus()
        }
      })
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
      this.verify = opts.verify
      this.shown = true
    },

    dismiss() {
      this.approved = false
      this.shown = false
    },

    approve() {
      if (this.disabled) return
      this.approved = true
      this.shown = false
    },

    async onHidden() {
      this.approved ? this.resolve?.(this.value) : this.reject?.(RejectError)
    }
  }
})
</script>
