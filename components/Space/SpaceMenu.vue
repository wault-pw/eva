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

      <li :class="{active: panel === 'passphrase'}">
        <i/>
        <a href="#" @click.prevent="onPassphrase">Passphrase</a>
        <i/>
      </li>

      <li>
        <i/>
        <a href="#">Import</a>
        <i/>
      </li>

      <li :class="{active: panel === 'export'}">
        <i/>
        <a href="#" @click.prevent="onExport">Export</a>
        <i/>
      </li>
    </ul>

    <hr class="space-nav-hr">

    <ul class="space-nav mb-0">
      <li>
        <i/>
        <a href="#">About</a>
        <i/>
      </li>

      <li>
        <i/>
        <a :href="$setup.github" target="_blank">Github</a>
        <i/>
      </li>
    </ul>

    <hr class="space-nav-hr">

    <ul class="space-nav mb-0">
      <li>
        <i/>
        <a href="#" @click.prevent="logout">Logout</a>
        <i/>
      </li>
    </ul>

    <div class="space-aside-footer mt-auto pt-3">
      To completely delete your account <a href="#">click here</a>.
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from "vue"
import {PANEL_EXPORT, PANEL_PASSPHRASE} from "~/pages/workspaces/_id.vue"

export default Vue.extend({
  props: {
    shown: {
      type: Boolean,
      required: true
    },

    panel: {
      type: String,
      required: false,
      default: null
    }
  },

  methods: {
    async logout() {
      try {
        this.$throbber.show("loading")
        await this.$adapter.logout()
        await this.$router.push(this.$urn.login())
        this.$throbber.hide()
      } catch (e) {
        this.$throbber.error("failed", e)
      }
    },

    onExport() {
      this.$emit('update:panel', PANEL_EXPORT)
    },

    onPassphrase() {
      this.$emit('update:panel', PANEL_PASSPHRASE)
    }
  }
})
</script>
