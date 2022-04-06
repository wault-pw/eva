<template>
  <aside
      :class="{'space-menu-shown': shown}"
      class="space-menu space-aside py-2"
  >
    <ul class="space-nav mb-0">
      <li>
        <i/>
        <a
            href="javascript:"
            disabled
            v-text="$tc('menu.preferences')"
        />
        <i/>
      </li>

      <li :class="{active: panel === 'passphrase'}">
        <i/>
        <a
            href="javascript:"
            v-text="$tc('menu.passphrase')"
            data-cy="passphrase"
            @click.prevent="onPassphrase"
        />
        <i/>
      </li>

      <li :class="{active: panel === 'mfa'}">
        <i/>
        <a
            href="javascript:"
            v-text="'MFA'"
            data-cy="mfa"
            @click.prevent="onMfa"
        />
        <i/>
      </li>

      <li>
        <i/>
        <a
            href="javascript:"
            disabled=""
            v-text="$tc('menu.import')"
        />
        <i/>
      </li>

      <li :class="{active: panel === 'export'}">
        <i/>
        <a
            href="javascript:"
            v-text="$tc('menu.export')"
            data-cy="export"
            @click.prevent="onExport"
        />
        <i/>
      </li>

      <li :class="{active: panel === 'share'}">
        <i/>
        <a
            href="javascript:"
            v-text="$tc('menu.share')"
            data-cy="share"
            @click.prevent="onShare"
        />
        <i/>
      </li>
    </ul>

    <hr class="space-nav-hr">

    <ul class="space-nav mb-0">
      <li v-if="$setup.featurePage">
        <i/>
        <a
            :href="$setup.featurePage"
            target="_blank"
            v-text="$tc('menu.features')"
        />
        <i/>
      </li>

      <li v-if="$setup.securityPage">
        <i/>
        <a
            :href="$setup.securityPage"
            target="_blank"
            v-text="$tc('menu.security')"
        />
        <i/>
      </li>

      <li>
        <i/>
        <a
            :href="$setup.github"
            target="_blank"
        >
          GitHub
        </a>
        <i/>
      </li>
    </ul>

    <hr class="space-nav-hr">

    <ul class="space-nav mb-0">
      <li>
        <i/>
        <a
            href="javascript:"
            v-text="$tc('menu.logout')"
            data-cy="logout"
            @click.prevent="logout"
        />
        <i/>
      </li>
    </ul>

    <div class="space-aside-footer mt-auto pt-3">
      <p v-text="$tc('spaceMenu.userID', { id: user.id })" />

      <a
          v-text="$tc('ui.delete')"
          href="javascript:;"
          data-cy="termination"
          @click.prevent="onTerminate"
      />
    </div>
  </aside>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {
  PANEL_EXPORT,
  PANEL_PASSPHRASE,
  PANEL_TERMINATION,
  PANEL_MFA, PANEL_SHARE
} from "@/views/WorkspaceView.vue"
import {IUser, USER_STORE} from "@/store/USER"

export default defineComponent({
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

  computed: {
    user(): IUser {
      return USER_STORE().$state
    }
  },

  methods: {
    async logout() {
      try {
        this.$throbber.show(this.$tc("ui.loading"))
        await USER_STORE().LOGOUT()
        await this.$router.push(this.$urn.login())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    onExport() {
      this.$emit('update:panel', PANEL_EXPORT)
    },

    onPassphrase() {
      this.$emit('update:panel', PANEL_PASSPHRASE)
    },

    onMfa() {
      this.$emit('update:panel', PANEL_MFA)
    },

    onTerminate() {
      this.$emit('update:panel', PANEL_TERMINATION)
    },

    onShare() {
      this.$emit('update:panel', PANEL_SHARE)
    },
  }
})
</script>
