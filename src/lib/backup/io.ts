const Uint32Size = 4

export default class IO {
    private readonly array: Uint8Array
    private pos: number

    constructor(array: Uint8Array) {
        this.array = array
        this.pos = 0
    }

    seek(n: number) {
        this.pos = n
    }

    skip() {
        this.seek(this.pos + 1)
    }

    eof(): boolean {
        return this.pos >= this.array.length
    }

    slice(n: number): Uint8Array {
        const start = this.pos
        const finish = start + n
        this.pos = finish
        return this.array.slice(start, finish)
    }

    byte(): number {
        const int = this.array[this.pos]
        this.pos += 1
        return int
    }

    int32() {
        const slice = this.slice(Uint32Size)
        return new DataView(slice.buffer).getUint32(0, true)
    }
}
