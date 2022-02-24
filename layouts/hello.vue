<template>
  <main
    :class="{'hello-spa': $setup.spa, 'hello-mfa': $setup.mpa}"
    id="hello"
  >
    <StatusThrobberBus/>

    <nuxt/>

    <footer>
      2022 © OKA ver.{{ $setup.version }}

      <a target="_blank" :href="$setup.github">Github</a>
    </footer>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import StatusThrobberBus from "~/components/Shared/StatusThrobberBus.vue"

export default Vue.extend({
  components: {StatusThrobberBus}
})
</script>
