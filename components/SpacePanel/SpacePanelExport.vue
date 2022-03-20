<template>
  <SpacePanel @close="$emit('close')">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h3 class="text-white" v-text="$tc('export.h1')"/>

          <p v-text="$tc('export.p1')"/>
          <p v-text="$tc('export.p2')"/>
          <p v-text="$tc('export.p3')"/>

          <p>
            <a
              :disabled="$setup.spa"
              v-text="$tc('export.button')"
              href="javascript:"
              data-cy="download"
              class="btn btn-accent btn-lg"
              @click.prevent="backup"/>
          </p>
        </div>
      </div>
    </div>
  </SpacePanel>
</template>

<script lang="ts">
import Vue from "vue"
import SpacePanel from "~/components/SpacePanel/SpacePanel.vue"

export default Vue.extend({
  components: {SpacePanel},

  methods: {
    backup() {
      this.$adapter.backup()
    }
  }
})
</script>
