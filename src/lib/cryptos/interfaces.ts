export const SHA256_NAME = "SHA-256"
export const SHA1_NAME = "SHA-1"
export const EXPORT_PUB_KEY_FORMAT = "spki"
export const EXPORT_PRIV_KEY_FORMAT = "pkcs8"

export interface IPubCipher {
    generatePair(): Promise<CryptoKeyPair>

    importPrivKey(key: Uint8Array): Promise<CryptoKey>

    importPubKey(key: Uint8Array): Promise<CryptoKey>

    decrypt(key: CryptoKey, data: Uint8Array): Promise<Uint8Array>

    encrypt(key: CryptoKey, data: Uint8Array): Promise<Uint8Array>
}

export interface IDerive {
    generate(password: Uint8Array, salt: Uint8Array, iterations: number, bytes: number): Promise<Uint8Array>
}

export interface IHash {
    digest(input: Uint8Array): Promise<Uint8Array>
}

export interface AedCryptoParams {
    key: CryptoKey
    data: Uint8Array
    iv: Uint8Array
    addon: Uint8Array | null
}

// IAedCipher interface for block cypher with authentication algorithms
export interface IAedCipher {
    generateKey(): Promise<CryptoKey>

    importKey(key: Uint8Array): Promise<CryptoKey>

    exportKey(key: CryptoKey): Promise<Uint8Array>

    encrypt(params: AedCryptoParams): Promise<Uint8Array>

    decrypt(params: AedCryptoParams): Promise<Uint8Array>
}
