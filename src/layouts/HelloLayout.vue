<template>
  <div :class="{'hello-layout-mpa': $setup.mpa}" id="main" class="hello-layout">
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
  setup() {}
})
</script>
