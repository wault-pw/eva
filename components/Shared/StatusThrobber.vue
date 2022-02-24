<template>
  <div
    :class="{'status-throbber-fixed': fixed, 'status-throbber-absolute': absolute}"
    class="status-throbber"
  >
    <transition name="status-throbber-backdrop-transition">
      <div v-if="shown" class="status-throbber-backdrop"/>
    </transition>

    <transition name="status-throbber-box-transition">
      <div v-if="shown" class="status-throbber-box">
<!--        <div>-->
<!--          <Throbber/>-->
<!--        </div>-->

        <transition name="status-throbber-text-transition" mode="out-in">
          <span
            :key="text"
            v-text="text"
            class="text-uppercase"
          />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    absolute: {
      type: Boolean,
      required: false,
      default: false
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      shown: false,
      text: "",
    }
  },
})
</script>
