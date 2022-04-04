export type SetupObject = { [name: string]: any }

export class Setup {
    private readonly $config: SetupObject

    constructor($config: SetupObject) {
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

    get locale(): string {
        return this.$config.locale ?? raise("locale not set")
    }

    get demoUsername(): string {
        return this.$config.demoUsername ?? raise("demoUsername not set")
    }

    get demoPassword(): string {
        return this.$config.demoPassword ?? raise("demoPassword not set")
    }

    /**
     * slash url "/" is used inside DockerfileBundle, to say eva that alice
     * is located on the same host and port
     */
    get aliceUrl(): string {
        const url = this.$config.aliceUrl ?? raise("aliceUrl not set")
        return url === "/" ? window.location.origin : url
    }

    get email(): string | null {
        return this.$config.email
    }

    get statusPage(): string | null {
        return this.$config.statusPage
    }

    get termsPage(): string | null {
        return this.$config.termsPage
    }

    get privacyPage(): string | null {
        return this.$config.privacyPage
    }

    get featurePage(): string | null {
        return this.$config.featurePage
    }

    get securityPage(): string | null {
        return this.$config.securityPage
    }

    get ver666(): boolean {
        return this.$config.ver666
    }
}

function raise(errorMessage: string): never {
    throw new Error(errorMessage)
}
