<template>
  <footer class="hello-footer py-3">
    <ul class="hello-footer-ul">
      <li v-if="$setup.securityPage">
        <a
            :href="$setup.securityPage"
            target="_blank"
            v-text="$tc('menu.security')"
        />
      </li>

      <li v-if="$setup.termsPage" class="hidden-md-down">
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

      <li class="hidden-sm-down">
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

    <ul class="hello-footer-ul opacity-80">
      <li>
        {{ year }} © Wault<span class="hidden-md-down"> ver.{{ $setup.version }}</span>
      </li>

      <li>
        <a
            :href="$setup.github"
            target="_blank"
            v-text="'Github'"
        />
      </li>

      <li>
        <a
            v-if="$setup.email"
            :href="`mailto:${$setup.email}`"
            v-text="$setup.email"
        />
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
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
