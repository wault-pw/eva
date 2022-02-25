import {Uint8ArrayFromHex} from "~/lib/cryptos/util"
import {AedCipherEnum, NewAedCipher} from "~/lib/cryptos/aed.ciphers"

// @refs https://luca-giuzzi.unibs.it/corsi/Support/papers-cryptography/gcm-spec.pdf
// K: secret key
// P: plain text
// C: cipher text
// T: auth tag
describe('AES256GCM', () => {
  it('it works', async () => {
    const key8 = Uint8ArrayFromHex(`feffe9928665731c6d6a8f9467308308`)
    const tag = Uint8ArrayFromHex(`4d5c2af327cd64a62cf35abd2ba6fab4`)
    const iv = Uint8ArrayFromHex(`cafebabefacedbaddecaf888`)
    const cipherText = Uint8ArrayFromHex(`42831ec2217774244b7221b784d0d49ce3aa212f2c02a4e035c17e2329aca12e21d514b25466931c7d8f6a5aac84aa051ba30b396a0aac973d58e091473f5985`)
    const plainText = Uint8ArrayFromHex(`d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956809532fcf0e2449a6b525b16aedf5aa0de657ba637b391aafd255`)

    const cipher = NewAedCipher(AedCipherEnum.AES256GCM)
    const key = await cipher.importKey(key8)
    const dec = await cipher.decrypt({key, iv, data: new Uint8Array([...cipherText, ...tag]), addon: null})
    const fail = cipher.decrypt({key, iv, data: new Uint8Array([...cipherText]), addon: null})

    expect(dec).to.deep.eq(plainText)
    expect(fail).to.throws
  })

  it('it uses addon', async () => {
    const cipher = NewAedCipher(AedCipherEnum.AES256GCM)
    const key = await cipher.generateKey()
    const iv = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const plainText = new Uint8Array([1, 2, 3])
    const addon = new Uint8Array([11, 22, 33])

    const enc = await cipher.encrypt({key, iv, data: plainText, addon: addon})
    const dec = await cipher.decrypt({key, iv, data: enc, addon: addon})
    const fail = cipher.decrypt({key, iv, data: enc, addon: null})

    expect(dec).to.deep.eq(plainText)
    expect(fail).to.throws
  })
})
