<template>
  <aside data-cy="panel" class="space-panel pb-3">
    <header class="space-panel-header mb-2">
      <a
        href="#"
        class="space-panel-header-a"
        @click.prevent="$emit('close')"
      >
        <i class="icon-cancel" />
      </a>
    </header>

    <slot />
  </aside>
</template>
