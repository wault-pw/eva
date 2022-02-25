import {DeriveEnum, NewDerive} from "~/lib/cryptos/derives"
import {TextEncode, Uint8ArrayFromHex} from "~/lib/cryptos/util"

// @refs https://www.ietf.org/rfc/rfc6070.txt
describe('Pbkdf2', () => {
  it('PBKDF2 HMAC-SHA1 Test Vectors', async () => {
    const P = "password"
    const S = "salt"
    const c = 1
    const dkLen = 20
    const DK = Uint8ArrayFromHex(`
0c 60 c8 0f 96 1f 0e 71
f3 a9 b5 24 af 60 12 06
2f e0 37 a6`)

    const dk = await NewDerive(DeriveEnum.Pbkdf2Sha1).generate(
      TextEncode(P),
      TextEncode(S),
      c,
      dkLen
    )
    expect(dk).to.deep.eq(DK)
  })
})
