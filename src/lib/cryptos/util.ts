import {v4 as uid} from "uuid"

// Uint8ArrayFromHex parses HEX to binary array.
// allows grouping by 4 bytes and new lines
export function Uint8ArrayFromHex(input: string): Uint8Array {
    const matched = input.match(/[A-Fa-f\d]{2}/g)
    if (matched == null) {
        return new Uint8Array(0)
    }

    return new Uint8Array(matched.map(byte => parseInt(byte, 16)))
}

export function Uint8ArrayToHex(input: Uint8Array): string {
    return [...input].map(x => x.toString(16).padStart(2, '0')).join('')
}

export function TextEncode(text: string): Uint8Array {
    return new TextEncoder().encode(text)
}

export function TextDecode(input: Uint8Array): string {
    return new TextDecoder().decode(input)
}

export function SecureRandom(size: number): Uint8Array {
    const buf = new Uint8Array(size)
    crypto.getRandomValues(buf)
    return buf
}

export function FakeCryptoKey(): CryptoKey {
    return {
        algorithm: {name: "FAKE"},
        extractable: false,
        type: "secret",
        usages: []
    }
}

export function UUID(): string {
    return uid()
}

export function GeneratePassword(chars: string, length: number): string {
    const out: Array<string> = new Array<string>(length)
    const rand = new Uint16Array(length)
    crypto.getRandomValues(rand)

    rand.forEach(function (value: number, ix: number) {
        const r = value % chars.length
        out[ix] = chars.substring(r, r + 1)
    })

    return out.join('')
}
