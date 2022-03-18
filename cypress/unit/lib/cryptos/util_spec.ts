import {TextEncode, Uint8ArrayToHex} from "~/lib/cryptos/util"

describe('Uint8ArrayToHex', () => {
  it('it works', async () => {
    const message = TextEncode("foo")
    const want = "666f6f"

    expect(Uint8ArrayToHex(message)).to.deep.eq(want)
  })
})
