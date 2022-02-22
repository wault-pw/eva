<template>
  <main
    :class="{'hello-spa': $setup.spa, 'hello-mfa': $setup.mpa}"
    id="hello"
  >
    <nuxt/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>
