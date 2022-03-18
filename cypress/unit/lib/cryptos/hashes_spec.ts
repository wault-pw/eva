import {TextEncode, Uint8ArrayFromHex} from "~/lib/cryptos/util"
import {HashEnum, NewHash} from "~/lib/cryptos/hashes"

// @refs https://emn178.github.io/online-tools/sha256.html
describe('SHA-256', () => {
  it('it works', async () => {
    const message = TextEncode("foo")
    const want = Uint8ArrayFromHex("2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae")

    const hash = await NewHash(HashEnum.Sha256)
    const got = await hash.digest(message)

    expect(got).to.deep.eq(want)
  })
})
