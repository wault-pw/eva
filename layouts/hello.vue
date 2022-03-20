<template>
  <div>
    <StatusThrobberBus/>
    <DialogBus/>

    <div
      :class="{'hello-spa': $setup.spa, 'hello-mpa': $setup.mpa}"
      id="main"
      class="hello"
    >
      <div class="mx-auto w-100 align-self-center my-3">
        <nuxt/>
      </div>

      <HelloFooter />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StatusThrobberBus from "~/components/Shared/StatusThrobberBus.vue"
import HelloFooter from "~/components/Shared/HelloFooter.vue"
import DialogBus from "~/components/Shared/DialogBus.vue"

export default Vue.extend({
  components: {HelloFooter, StatusThrobberBus, DialogBus}
})
</script>
