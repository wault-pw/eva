import {IDerive, SHA1, SHA256, crypt} from "~/lib/cryptos/interfaces"

export enum DeriveEnum {
  Pbkdf2Sha256 = "Pbkdf2Sha256",
  Pbkdf2Sha1 = "Pbkdf2Sha1",
}

export function NewDerive(num: DeriveEnum): IDerive {
  switch (num) {
    case DeriveEnum.Pbkdf2Sha256:
      return new Pbkdf2Derive(SHA256)
    case DeriveEnum.Pbkdf2Sha1:
      return new Pbkdf2Derive(SHA1)
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
    const base = await crypt.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"])
    const buffer = await crypt.subtle.deriveBits({
      name: "PBKDF2",
      hash: this.hash,
      salt: salt,
      iterations: iterations
    }, base, bytes << 3)
    return new Uint8Array(buffer)
  }
}
