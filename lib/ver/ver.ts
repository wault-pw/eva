import {NewPubCipher, PubCipherEnum} from "~/lib/cryptos/pub.ciphers"
import {EXPORT_PRIV_KEY_FORMAT, EXPORT_PUB_KEY_FORMAT, IDerive, IPubCipher} from "~/lib/cryptos/interfaces"
import {DeriveEnum, NewDerive} from "~/lib/cryptos/derives"

interface Opts {
  pubCipherNum: PubCipherEnum
  deriveNum: DeriveEnum
  deriveIter: number
}

export class Ver {
  private readonly pubCipherNum: PubCipherEnum
  private readonly deriveNum: DeriveEnum
  public readonly deriveIter: number

  constructor(opts: Opts) {
    this.pubCipherNum = opts.pubCipherNum
    this.deriveNum = opts.deriveNum
    this.deriveIter = opts.deriveIter
  }

  get pubCipher(): IPubCipher {
    return NewPubCipher(this.pubCipherNum)
  }

  get derive(): IDerive {
    return NewDerive(this.deriveNum)
  }

  async exportPrivKey(key: CryptoKeyPair): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.exportKey(EXPORT_PRIV_KEY_FORMAT, key.privateKey))
  }

  async exportPubKey(key: CryptoKeyPair): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.exportKey(EXPORT_PUB_KEY_FORMAT, key.publicKey))
  }
}

/**
 * Alice specification for crypto scheme Ver.1
 */
export const Ver1 = new Ver({
  pubCipherNum: PubCipherEnum.Rsa4096Sha256,
  deriveNum: DeriveEnum.Pbkdf2Sha256,
  deriveIter: 10_000,
})
