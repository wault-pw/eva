import {IDerive, SHA1_NAME, SHA256_NAME} from "@/lib/cryptos/interfaces"
import {HashSize} from "@/lib/cryptos/hashes"

export enum DeriveEnum {
    Pbkdf2Sha256 = "Pbkdf2Sha256",
    Pbkdf2Sha1 = "Pbkdf2Sha1",
}

export function NewDerive(num: DeriveEnum): IDerive {
    switch (num) {
        case DeriveEnum.Pbkdf2Sha256:
            return new Pbkdf2Derive(SHA256_NAME)
        case DeriveEnum.Pbkdf2Sha1:
            return new Pbkdf2Derive(SHA1_NAME)
        default:
            throw(`unknown derive num <${num}>`)
    }
}

export function DeriveSaltSize(num: DeriveEnum): number {
    switch (num) {
        case DeriveEnum.Pbkdf2Sha1:
            return HashSize(SHA1_NAME)
        case DeriveEnum.Pbkdf2Sha256:
            return HashSize(SHA256_NAME)
        default:
            throw(`unknown derive num <${num}>`)
    }
}

class Pbkdf2Derive implements IDerive {
    private readonly hash: string

    constructor(hash: string) {
        this.hash = hash
    }

    async generate(password: Uint8Array, salt: Uint8Array, iterations: number, bytes: number): Promise<Uint8Array> {
        const base = await crypto.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"])
        const buffer = await crypto.subtle.deriveBits({
            name: "PBKDF2",
            hash: this.hash,
            salt: salt,
            iterations: iterations
        }, base, bytes << 3)
        return new Uint8Array(buffer)
    }
}
