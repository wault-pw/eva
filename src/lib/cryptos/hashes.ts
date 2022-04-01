import {IHash, SHA256_NAME, SHA1_NAME} from "@/lib/cryptos/interfaces"

export enum HashEnum {
    Sha256 = "SHA-256",
}

export function NewHash(num: HashEnum): IHash {
    switch (num) {
        case HashEnum.Sha256:
            return new Hash(SHA256_NAME)
        default:
            throw(`unknown hash num <${num}>`)
    }
}

export function HashSize(hash: string): number {
    switch (hash) {
        case SHA256_NAME:
            return 128 >> 3
        case SHA1_NAME:
            return 256 >> 3
        default:
            throw(`unknown hash <${hash}> size`)
    }
}

class Hash implements IHash {
    private readonly name: string

    constructor(name: string) {
        this.name = name
    }

    async digest(input: Uint8Array): Promise<Uint8Array> {
        return new Uint8Array(await crypto.subtle.digest({name: this.name}, input))
    }
}
