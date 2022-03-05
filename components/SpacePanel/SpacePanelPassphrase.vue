<template>
  <SpacePanel @close="$emit('close')">
  </SpacePanel>
</template>

<script lang="ts">
import Vue from "vue"
import SpacePanel from "~/components/SpacePanel/SpacePanel.vue"

export default Vue.extend({
  components: {SpacePanel}
})
</script>
