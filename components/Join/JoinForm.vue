<template>
  <form name="join">
    <fieldset v-if="step === 2" :disabled="disabled">
      <p class="text-center text-muted mb-3">
        $>{{ $tc("joinForm.step2").toLowerCase() }}:
      </p>

      <div class="form-check form-switch mb-3">
        <input v-model="check0" class="form-check-input" type="checkbox" id="check0">
        <label
          class="form-check-label small"
          for="check0"
          v-html="$tc('joinForm.check0')"
        />
      </div>

      <div class="form-check form-switch mb-3">
        <input v-model="check1" class="form-check-input" type="checkbox" id="check1">
        <label
          class="form-check-label small"
          for="check1"
          v-html="$t('joinForm.check1', { url: $setup.termsPage })"
        />
      </div>
    </fieldset>

    <fieldset v-if="step === 1">
      <p class="text-center text-muted mb-3">
        $>{{ $tc("joinForm.step1").toLowerCase() }}:
      </p>

      <p>
        <input
          v-model="confirmation"
          :placeholder="$tc('ui.passphrase').toLowerCase()"
          class="form-control form-control-lg"
          type="password"
          @keyup.enter="$refs.next.click()"
        >
      </p>
    </fieldset>

    <fieldset v-if="step === 0">
      <p class="text-center text-muted mb-3">
        $>{{ $tc("joinForm.step0").toLowerCase() }}:
      </p>

      <p class="mb-2">
        <input
          :value="username"
          :placeholder="$tc('ui.username').toLowerCase()"
          class="form-control form-control-lg"
          type="text"
          autocapitalize="none"
          @input="$emit('update:username', $event.target.value)"
          @keyup.enter="$refs.next.click()"
        >
      </p>

      <p>
        <input
          :value="password"
          :placeholder="$tc('ui.passphrase').toLowerCase()"
          class="form-control form-control-lg"
          type="password"
          @input="$emit('update:password', $event.target.value)"
          @keyup.enter="$refs.next.click()"
        >
      </p>
    </fieldset>

    <p class="text-center mb-0">
      <button
        :class="{invisible: !step}"
        type="button"
        class="btn text-uppercase btn-lg"
        @click.prevent="pred"
      >
        <<
      </button>

      <button
        :disabled="!isStepValid"
        ref="next"
        type="button"
        class="btn text-uppercase btn-lg btn-accent"
        data-cy="next"
        @click.prevent="next"
      >
        >>
      </button>
    </p>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import _trim from "lodash/trim"

export default Vue.extend({
  props: {
    username: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    disabled: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      step: 0,
      confirmation: "",
      check0: false,
      check1: false
    }
  },

  computed: {
    isStepValid(): Boolean {
      switch (this.step) {
        case 0:
          return !(_trim(this.username) === "" || _trim(this.password) === "")
        case 1:
          return this.password === this.confirmation
        case 2:
          return this.check0 && this.check1
        default:
          throw(`unkown step <${this.step}>`)
      }
    },
  },

  methods: {
    next() {
      switch (this.step) {
        case 0:
        case 1:
          this.step++
          break
        case 2:
          this.$emit('submit')
          break
        default:
          throw(`unknown step ${this.step}`)
      }
    },

    pred() {
      if (this.step === 1) {
        this.confirmation = ""
      }

      if (this.step === 2) {
        this.check0 = false
        this.check1 = false
      }

      this.step--
    }
  }
})
</script>
