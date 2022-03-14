import {NuxtI18nInstance} from "@nuxtjs/i18n"

export class Urn {
  private readonly i18n: NuxtI18nInstance
  private locale: string

  constructor(i18n: NuxtI18nInstance) {
    this.i18n = i18n
    this.locale = i18n.locale

    i18n.onBeforeLanguageSwitch = (was: string, current: string) => {
      this.locale = current
    }
  }

  login(): string {
    return `/`
  }

  spa(): string {
    return `/spa`
  }

  join(): string {
    return `/join`
  }

  workspaces(): string {
    return `/workspaces`
  }

  workspace(id: string): string {
    return `/workspaces/${id}`
  }
}
