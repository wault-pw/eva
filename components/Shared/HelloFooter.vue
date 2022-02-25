<template>
  <footer>
    <ul class="hello-footer-links pt-2 pb-1">
      <li>
        <a href="/">{{ $tc("menu.about") }}</a>
      </li>

      <li class="x-hidden-md-down">
        <a href="/">{{ $tc("menu.terms") }}</a>
      </li>

      <li>
        <a href="/">{{ $tc("menu.privacy") }}</a>
      </li>

      <li class="x-hidden-sm-down">
        <a :href="`${$setup.github}/issues`" target="_blank">{{ $tc("menu.issues") }}</a>
      </li>

      <li v-if="$setup.mpa && $setup.statusPage">
        <a :href="$setup.statusPage" target="_blank">{{ $tc("menu.status") }}</a>
      </li>
    </ul>

    <div class="hello-footer-copyright pb-3">
      {{ year }} © OKA ver.{{ $setup.version }}

      <a target="_blank" :href="$setup.github">Github</a>
      <a target="_blank" href="/LICENSES.txt">Licenses</a>
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
