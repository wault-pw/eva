<template>
  <main
    :class="{'hello-spa': $setup.spa, 'hello-mfa': $setup.mpa}"
    id="hello"
  >
    <nuxt/>

    <footer>
      ver.{{ $setup.version }}
    </footer>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
