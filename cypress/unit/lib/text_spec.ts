import {TextMask, QrCodeSize} from "@/lib/text"

describe('TextMask', () => {
    it('works', async () => {
        expect(TextMask(null)).to.eq("")
        expect(TextMask("a b")).to.eq("✶✶✶")
        expect(TextMask("a\nb")).to.eq("✶\n✶")
    })
})

describe('QrCodeSize', () => {
    it('works', async () => {
        expect(QrCodeSize("")).to.eq(0)
        expect(QrCodeSize(null)).to.eq(0)

        expect(QrCodeSize("a".repeat(1))).to.eq(100)
        expect(QrCodeSize("a".repeat(100))).to.eq(238)
        expect(QrCodeSize("a".repeat(500))).to.eq(286)
        expect(QrCodeSize("a".repeat(800))).to.eq(300)

        expect(QrCodeSize("a".repeat(1000))).to.eq(0)
        expect(QrCodeSize("a".repeat(2000))).to.eq(0)
    })
})
