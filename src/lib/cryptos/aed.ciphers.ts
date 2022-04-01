import {AedCryptoParams, IAedCipher} from "@/lib/cryptos/interfaces"

const AED_TAG_LENGTH = 128

export enum AedCipherEnum {
    AES256GCM = "AES256GCM",
}

export function NewAedCipher(num: AedCipherEnum): IAedCipher {
    switch (num) {
        case AedCipherEnum.AES256GCM:
            return new AesAedCipher("AES-GCM", 256)
        default:
            throw(`unknown aed cipher num <${num}>`)
    }
}

export function AedCipherSizes(num: AedCipherEnum): [number, number] {
    switch (num) {
        case AedCipherEnum.AES256GCM:
            return [256 >> 3, 12]
        default:
            throw(`unknown aed cipher num <${num}>`)
    }
}

class AesAedCipher implements IAedCipher {
    private readonly bits: number
    private readonly name: string

    constructor(name: string, bits: number) {
        this.name = name
        this.bits = bits
    }

    async generateKey(): Promise<CryptoKey> {
        return await crypto.subtle.generateKey({name: this.name, length: this.bits}, true, ["encrypt", "decrypt"])
    }

    async importKey(key: Uint8Array): Promise<CryptoKey> {
        return await crypto.subtle.importKey("raw", key, {name: this.name}, false, ["encrypt", "decrypt"])
    }

    async exportKey(key: CryptoKey): Promise<Uint8Array> {
        return new Uint8Array(await crypto.subtle.exportKey("raw", key))
    }

    async decrypt(params: AedCryptoParams): Promise<Uint8Array> {
        const buf = await crypto.subtle.decrypt(
            {
                name: this.name,
                iv: params.iv,
                additionalData: params.addon ?? new Uint8Array(),
                tagLength: AED_TAG_LENGTH,
            }, params.key, params.data)

        return new Uint8Array(buf)
    }

    async encrypt(params: AedCryptoParams): Promise<Uint8Array> {
        const buf = await crypto.subtle.encrypt({
            name: this.name,
            iv: params.iv,
            additionalData: params.addon ?? new Uint8Array(),
            tagLength: AED_TAG_LENGTH,
        }, params.key, params.data)

        return new Uint8Array(buf)
    }
}
