<template>
  <SpacePanel @close="$emit('close')">
    <h2 class="text-white" v-text="$tc('export.h1')"/>

    <p v-text="$tc('export.p1')"/>
    <p v-text="$tc('export.p2')"/>
    <p v-text="$tc('export.p3')" class="mb-3"/>

    <p>
      <button
          :disabled="$setup.spa"
          v-text="$tc('export.button')"
          data-cy="download"
          class="btn btn-accent btn-lg"
          @click.prevent="backup"/>
    </p>
  </SpacePanel>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import SpacePanel from "@/components/SpacePanel/SpacePanel.vue"

export default defineComponent({
  components: {SpacePanel},

  methods: {
    backup() {
      this.$adapter.backup()
    }
  }
})
</script>
