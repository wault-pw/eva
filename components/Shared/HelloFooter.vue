<template>
  <footer>
    <ul class="hello-footer-links py-2">
      <li>
        <a href="/">About</a>
      </li>

      <li class="x-hidden-md-down">
        <a href="/">Term_of_service</a>
      </li>

      <li>
        <a href="/">Privacy</a>
      </li>

      <li class="x-hidden-sm-down">
        <a href="/">Issues</a>
      </li>

      <li v-if="$setup.mpa">
        <a href="https://cloud.oka.is/#/" target="_blank">Status_page</a>
      </li>
    </ul>

    <div class="hello-footer-copyright">
      {{ year }} © OKA ver.{{ $setup.version }}

      <a target="_blank" :href="$setup.github">Github</a>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      year: new Date().getFullYear(),
    }
  }
})
</script>
