import {NuxtRuntimeConfig} from "@nuxt/types/config/runtime"
import {SRP_GROUPS} from "~/lib/const"
import _find from "lodash/find"
import {SrpBridge} from "~/lib/srp.bridge"
import {Ver, Ver1} from "~/lib/ver/ver"

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

  get ver(): Ver {
    return Ver1
  }

  NewSrpVerifier(): SrpBridge {
    return new SrpBridge(this.srpGroup)
  }

  private get srpGroup(): string {
    const found = _find(SRP_GROUPS, (group: string): Boolean => group === this.$config.srp) as (string | undefined)
    return found ?? raise(`SRP <${this.$config.srp}> not defined in <${SRP_GROUPS.join(',')}>`)
  }
}

function raise(errorMessage: string): never {
  throw new Error(errorMessage)
}
