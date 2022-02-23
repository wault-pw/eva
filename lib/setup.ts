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
}

function raise(errorMessage: string): never {
  throw new Error(errorMessage)
}
