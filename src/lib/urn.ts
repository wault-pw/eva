export class Urn {
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
