import {NewPubCipher, PubCipherEnum} from "~/lib/cryptos/pub.ciphers"
import {
  EXPORT_PRIV_KEY_FORMAT,
  EXPORT_PUB_KEY_FORMAT,
  IAedCipher,
  IDerive,
  IHash,
  IPubCipher
} from "~/lib/cryptos/interfaces"
import {DeriveEnum, DeriveSaltSize, NewDerive} from "~/lib/cryptos/derives"
import {SrpBridge} from "~/lib/srp.bridge"
import {SRP_1024, SRP_4096} from "~/lib/const"
import {SecureRandom, TextDecode, TextEncode, Uint8ArrayToHex} from "~/lib/cryptos/util"
import {AedCipherEnum, AedCipherSizes, NewAedCipher} from "~/lib/cryptos/aed.ciphers"
import {HashEnum, NewHash} from "~/lib/cryptos/hashes"

interface Opts {
  pubCipherNum: PubCipherEnum
  deriveNum: DeriveEnum
  aedCipherNum: AedCipherEnum
  hashNum: HashEnum
  deriveIter: number
  srpGroup: string
}

export class Ver {
  private readonly pubCipherNum: PubCipherEnum
  private readonly deriveNum: DeriveEnum
  private readonly aedCipherNum: AedCipherEnum
  private readonly hashNum: HashEnum
  private readonly srpGroup: string
  public readonly deriveIter: number

  constructor(opts: Opts) {
    this.pubCipherNum = opts.pubCipherNum
    this.deriveNum = opts.deriveNum
    this.deriveIter = opts.deriveIter
    this.srpGroup = opts.srpGroup
    this.aedCipherNum = opts.aedCipherNum
    this.hashNum = opts.hashNum
  }

  get pubCipher(): IPubCipher {
    return NewPubCipher(this.pubCipherNum)
  }

  get aedCipher(): IAedCipher {
    return NewAedCipher(this.aedCipherNum)
  }

  get derive(): IDerive {
    return NewDerive(this.deriveNum)
  }

  get hash(): IHash {
    return NewHash(this.hashNum)
  }

  get deriveSaltSize(): number {
    return DeriveSaltSize(this.deriveNum)
  }

  get aedKeySize(): number {
    const [ks, _] = AedCipherSizes(this.aedCipherNum)
    return ks
  }

  get aedIvSize(): number {
    const [_, is] = AedCipherSizes(this.aedCipherNum)
    return is
  }

  NewSrpBridge(): SrpBridge {
    return new SrpBridge(this.srpGroup)
  }

  random(size: number): Uint8Array {
    return SecureRandom(size)
  }

  async exportPrivKey(key: CryptoKey): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.exportKey(EXPORT_PRIV_KEY_FORMAT, key))
  }

  async exportPubKey(key: CryptoKey): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.exportKey(EXPORT_PUB_KEY_FORMAT, key))
  }

  async aedEncrypt(key: CryptoKey, data: Uint8Array, addon: Uint8Array | null): Promise<Uint8Array> {
    const iv = this.random(this.aedIvSize)
    const enc = await this.aedCipher.encrypt({iv, key, data, addon})
    return new Uint8Array([...iv, ...enc])
  }

  async aedDecrypt(key: CryptoKey, data: Uint8Array, addon: Uint8Array | null): Promise<Uint8Array> {
    if (!data.length) return new Uint8Array(0)
    return await this.aedCipher.decrypt({
      key,
      iv: data.slice(0, this.aedIvSize),
      data: data.slice(this.aedIvSize),
      addon
    })
  }

  async aedEncryptText(key: CryptoKey, text: string, addon: Uint8Array | null): Promise<Uint8Array> {
    return this.aedEncrypt(key, TextEncode(text), addon)
  }

  async aedDecryptText(key: CryptoKey, data: Uint8Array, addon: Uint8Array | null): Promise<string> {
    return TextDecode(await this.aedDecrypt(key, data, addon))
  }

  // hash SRP login and password to:
  // 1) prevent server to see raw username
  // 2) strengthen weak password
  async credentials(username: string, password: string): Promise<[string, string]> {
     return [
       Uint8ArrayToHex(await this.hash.digest(TextEncode(username))),
       Uint8ArrayToHex(await this.hash.digest(TextEncode(password))),
     ]
  }
}

/**
 * Alice specification for crypto scheme Ver.1
 */
export const Ver1 = new Ver({
  pubCipherNum: PubCipherEnum.Rsa4096Sha256,
  deriveNum: DeriveEnum.Pbkdf2Sha256,
  deriveIter: 10_000,
  srpGroup: SRP_4096,
  hashNum: HashEnum.Sha256,
  aedCipherNum: AedCipherEnum.AES256GCM,
})

// for testing purpose
export const Ver666 = new Ver({
  pubCipherNum: PubCipherEnum.Rsa1024Sha256,
  deriveNum: DeriveEnum.Pbkdf2Sha256,
  deriveIter: 1,
  srpGroup: SRP_1024,
  hashNum: HashEnum.Sha256,
  aedCipherNum: AedCipherEnum.AES256GCM,
})
