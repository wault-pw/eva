<template>
  <div :class="{'hello-layout-mpa': $setup.mpa, 'hello-layout-spa': $setup.spa}" id="main" class="hello-layout">
    <div class="hello-body">
      <slot />
    </div>

    <HelloFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import HelloFooter from "@/components/Shared/HelloFooter.vue"

export default defineComponent({
  components: {HelloFooter},
})
</script>
