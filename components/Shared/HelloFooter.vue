<template>
  <footer>
    <ul class="hello-footer-links pt-2 pb-1">
      <li v-if="$setup.aboutPage">
        <a
          :href="$setup.aboutPage"
          target="_blank"
          v-text="$tc('menu.features')"
        />
      </li>

      <li v-if="$setup.termsPage" class="x-hidden-md-down">
        <a
          :href="$setup.termsPage"
          target="_blank"
          v-text="underscore($tc('menu.terms'))"
        />
      </li>

      <li v-if="$setup.privacyPage">
        <a
          :href="$setup.privacyPage"
          target="_blank"
          v-text="$tc('menu.privacy')"
        />
      </li>

      <li class="x-hidden-sm-down">
        <a
          :href="`${$setup.github}/issues`"
          target="_blank"
          v-text="$tc('menu.issues')"
        />
      </li>

      <li v-if="$setup.mpa && $setup.statusPage">
        <a
          :href="$setup.statusPage"
          target="_blank"
          v-text="underscore($tc('menu.status'))"
        />
      </li>
    </ul>

    <div class="hello-footer-copyright pb-3">
      {{ year }} © Wault <span class="x-hidden-md-down">ver.{{ $setup.version }}</span>

      <a target="_blank" :href="$setup.github">Github</a>
      <a v-if="$setup.email" :href="`mailto:${$setup.email}`" v-text="$setup.email" />
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },

  methods: {
    underscore(text: string): string {
      return text.replace(/\s/g, '_')
    }
  }
})
</script>
