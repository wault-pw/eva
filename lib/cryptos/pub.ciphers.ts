import {IPubCipher, SHA256_NAME, crypt, EXPORT_PRIV_KEY_FORMAT, EXPORT_PUB_KEY_FORMAT} from "~/lib/cryptos/interfaces"

export enum PubCipherEnum {
  Rsa2048Sha256 = "Rsa2048Sha256",
  Rsa3072Sha256 = "Rsa3072Sha256",
  Rsa4096Sha256 = "Rsa4096Sha256",
  Rsa1024Sha256 = "Rsa1024Sha256",
}

export function NewPubCipher(num: PubCipherEnum): IPubCipher {
  switch (num) {
    case PubCipherEnum.Rsa4096Sha256:
      return new RsaCipher(4096, SHA256_NAME)
    case PubCipherEnum.Rsa3072Sha256:
      return new RsaCipher(3078, SHA256_NAME)
    case PubCipherEnum.Rsa2048Sha256:
      return new RsaCipher(2048, SHA256_NAME)
    case PubCipherEnum.Rsa1024Sha256:
      return new RsaCipher(1024, SHA256_NAME)
    default:
      throw(`unknown pub cipher num <${num}>`)
  }
}

class RsaCipher implements IPubCipher {
  private readonly bits: number
  private readonly name: string
  private readonly hash: string

  constructor(bits: number, hash: string) {
    this.bits = bits
    this.hash = hash
    this.name = "RSA-OAEP"
  }

  async decrypt(key: CryptoKey, data: Uint8Array): Promise<Uint8Array> {
    return new Uint8Array(await crypt.subtle.decrypt({name: this.name}, key, data))
  }

  async encrypt(key: CryptoKey, data: Uint8Array): Promise<Uint8Array> {
    return new Uint8Array(await crypt.subtle.encrypt({name: this.name}, key, data))
  }

  async importPrivKey(key: Uint8Array): Promise<CryptoKey> {
    return await crypt.subtle.importKey(
      EXPORT_PRIV_KEY_FORMAT,
      key,
      {name: this.name, hash: this.hash},
      true, ["decrypt"])
  }

  async importPubKey(key: Uint8Array): Promise<CryptoKey> {
    return await crypt.subtle.importKey(
      EXPORT_PUB_KEY_FORMAT,
      key,
      {name: this.name, hash: this.hash},
      true, ["encrypt"])
  }

  async generatePair(): Promise<CryptoKeyPair> {
    return crypt.subtle.generateKey({
      name: this.name,
      modulusLength: this.bits,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: this.hash,
    }, true, ["encrypt", "decrypt"])
  }
}
