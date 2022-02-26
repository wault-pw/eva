import {NewPubCipher, PubCipherEnum} from "~/lib/cryptos/pub.ciphers"
import {EXPORT_PRIV_KEY_FORMAT, EXPORT_PUB_KEY_FORMAT, IAedCipher, IDerive, IPubCipher} from "~/lib/cryptos/interfaces"
import {DeriveEnum, DeriveSaltSize, NewDerive} from "~/lib/cryptos/derives"
import {SrpBridge} from "~/lib/srp.bridge"
import {SRP_4096} from "~/lib/const"
import {SecureRandom, TextDecode, TextEncode} from "~/lib/cryptos/util"
import {AedCipherEnum, AedCipherSizes, NewAedCipher} from "~/lib/cryptos/aed.ciphers"

interface Opts {
  pubCipherNum: PubCipherEnum
  deriveNum: DeriveEnum
  aedCipherNum: AedCipherEnum
  deriveIter: number
  srpGroup: string
}

export class Ver {
  private readonly pubCipherNum: PubCipherEnum
  private readonly deriveNum: DeriveEnum
  private readonly aedCipherNum: AedCipherEnum
  private readonly srpGroup: string
  public readonly deriveIter: number

  constructor(opts: Opts) {
    this.pubCipherNum = opts.pubCipherNum
    this.deriveNum = opts.deriveNum
    this.deriveIter = opts.deriveIter
    this.srpGroup = opts.srpGroup
    this.aedCipherNum = opts.aedCipherNum
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

  async exportPrivKey(key: CryptoKeyPair): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.exportKey(EXPORT_PRIV_KEY_FORMAT, key.privateKey))
  }

  async exportPubKey(key: CryptoKeyPair): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.exportKey(EXPORT_PUB_KEY_FORMAT, key.publicKey))
  }

  async aedEncrypt(key: CryptoKey, data: Uint8Array, addon: Uint8Array | null): Promise<Uint8Array> {
    const iv = this.random(this.aedIvSize)
    const enc = await this.aedCipher.encrypt({iv, key, data, addon})
    return new Uint8Array([...iv, ...enc])
  }

  async aedDecrypt(key: CryptoKey, data: Uint8Array, addon: Uint8Array | null): Promise<Uint8Array> {
    return await this.aedCipher.decrypt({key, iv: data.slice(0, this.aedIvSize), data: data.slice(this.aedIvSize), addon})
  }

  async aedEncryptText(key: CryptoKey, text: string, addon: Uint8Array | null): Promise<Uint8Array> {
    return this.aedEncrypt(key, TextEncode(text), addon)
  }

  async aedDecryptText(key: CryptoKey, data: Uint8Array, addon: Uint8Array | null): Promise<string> {
    return TextDecode(await this.aedDecrypt(key, data, addon))
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
  aedCipherNum: AedCipherEnum.AES256GCM,
})
