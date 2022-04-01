import {MatchedNum, Matcher} from "@/lib/matcher"

describe('Matcher', () => {
    it('Unknown', async () => {
        expect(Matcher("")).to.eq(MatchedNum.Unknown)
        expect(Matcher("Foo bar")).to.eq(MatchedNum.Unknown)
        expect(Matcher(null)).to.eq(MatchedNum.Unknown)
    })

    it('Link', () => {
        expect(Matcher("https://example.com")).to.eq(MatchedNum.Link)
        expect(Matcher("https://www.example.com")).to.eq(MatchedNum.Link)
        expect(Matcher("https://www.example.com?a=b&c=2")).to.eq(MatchedNum.Link)
        expect(Matcher("    http://example.com    ")).to.eq(MatchedNum.Link)
        expect(Matcher("\nhttp://example.com\n")).to.eq(MatchedNum.Link)
    })

    it('Not a link', () => {
        expect(Matcher("Website: https://example.com")).to.eq(MatchedNum.Unknown)
        expect(Matcher("https:// example.com")).to.eq(MatchedNum.Unknown)
        expect(Matcher("https://example.com\nhttps://example.com")).to.eq(MatchedNum.Unknown)
    })
})
