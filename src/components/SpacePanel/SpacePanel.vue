<template>
  <aside class="space-panel pb-3" data-cy="panel">
    <header class="space-panel-header mb-2">
      <a
          href="#"
          class="space-panel-header-a"
          @click.prevent="$emit('close')"
      >
        <i class="icon-cancel" />
      </a>
    </header>

    <div class="space-panel-body">
      <slot />
    </div>
  </aside>
</template>
