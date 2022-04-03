/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * @refs https://github.com/valgeirb/vue3-popper/issues/20
 */
declare module "vue3-popper" {
  const file: Component;
  export default file;
}
