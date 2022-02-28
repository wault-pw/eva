<template>
  <aside
    :class="{'space-menu-shown': shown}"
    class="space-menu space-aside py-3"
  >
    <ul class="space-nav mb-0">
      <li>
        <i/>
        <a href="#">Preferences</a>
        <i/>
      </li>

      <li>
        <i/>
        <a href="#">Passphrase</a>
        <i/>
      </li>

      <li>
        <i/>
        <a href="#">Import</a>
        <i/>
      </li>

      <li>
        <i/>
        <a href="#">Export</a>
        <i/>
      </li>
    </ul>

    <hr class="space-nav-hr" >

    <ul class="space-nav mb-0">
      <li>
        <i/>
        <a href="#">About</a>
        <i/>
      </li>

      <li>
        <i/>
        <a href="#">Github</a>
        <i/>
      </li>
    </ul>

    <hr class="space-nav-hr" >

    <ul class="space-nav mb-0">
      <li>
        <i/>
        <a href="#">Logout</a>
        <i/>
      </li>
    </ul>

    <div class="space-aside-footer mt-auto pt-3">
      To completely delete your account <a href="#">click here</a>.
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    shown: {
      type: Boolean,
      required: true
    }
  }
})
</script>
