<template>
  <div class="space-panel py-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h2 class="text-white" v-text="$tc('export.h2')"/>
          <h3 class="text-white" v-text="$tc('export.h3')"/>

          <p v-text="$tc('export.p1')"/>
          <p v-text="$tc('export.p2')"/>
          <p v-text="$tc('export.p3')"/>

          <p>
            <a
              href="#"
              v-text="$tc('export.button')"
              class="btn btn-accent btn-lg"
              @click.prevent="backup"/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  methods: {
    backup() {
      this.$adapter.backup()
    }
  }
})
</script>
