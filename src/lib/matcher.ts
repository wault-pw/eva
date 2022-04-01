const LinkRe = new RegExp(/^\s*https?:\/\/(www\.)?[-a-z\d@:%._+~#=]{1,256}\.[a-z\d()]{1,6}\b([-a-z\d()@:%_+.~#?&/=]*)\s*$/, 'i')

export enum MatchedNum {
    Unknown,
    Link,
}

export function Matcher(input: string | null): MatchedNum {
    switch (true) {
        case !input:
            return MatchedNum.Unknown
        case LinkRe.test(input!):
            return MatchedNum.Link
        default:
            return MatchedNum.Unknown
    }
}
