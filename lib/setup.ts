import {NuxtRuntimeConfig} from "@nuxt/types/config/runtime"

export class Setup {
  private readonly $config: NuxtRuntimeConfig

  constructor($config: NuxtRuntimeConfig) {
    this.$config = $config
  }

  get spa(): Boolean {
    return this.$config.spa ?? raise("spa not set")
  }

  get mpa(): Boolean {
    return this.$config.mpa ?? raise("mpa not set")
  }

  get version(): string {
    return this.$config.version ?? raise("version not set")
  }

  get github(): string {
    return this.$config.github ?? raise("github not set")
  }

  get demoUsername(): string {
    return this.$config.demoUsername ?? raise("demoUsername not set")
  }

  get demoPassword(): string {
    return this.$config.demoPassword ?? raise("demoPassword not set")
  }

  get statusPage(): string | null {
    return this.$config.statusPage
  }

  get ver666(): boolean {
    return this.$config.ver666
  }
}

function raise(errorMessage: string): never {
  throw new Error(errorMessage)
}
