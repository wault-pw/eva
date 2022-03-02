// Uint8ArrayFromHex parses HEX to binary array.
// allows grouping by 4 bytes and new lines
import {crypt} from "~/lib/cryptos/interfaces"
import { v4 as uid } from "uuid"

export function Uint8ArrayFromHex(input: string): Uint8Array {
  const matched = input.match(/[A-Fa-f0-9]{2}/g)
  if (matched == null) {
    return new Uint8Array(0)
  }

  return new Uint8Array(matched.map(byte => parseInt(byte, 16)))
}

export function TextEncode(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

export function TextDecode(input: Uint8Array): string {
  return new TextDecoder().decode(input)
}

export function SecureRandom(size: number): Uint8Array {
  const buf = new Uint8Array(size)
  crypt.getRandomValues(buf)
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
