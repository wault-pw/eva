import IO from "~/lib/backup/io"

export const MarkerWhoAmI = 1
export const MarkerWorkspace = 2
export const MarkerCard = 3

export class Reader {
  private readonly io: IO

  constructor(array: Uint8Array) {
    this.io = new IO(array)
  }

  next(): Promise<[number | null, Uint8Array]> {
    return new Promise((resolve, _reject) => {
      if (this.io.eof()) {
        resolve([null, new Uint8Array(0)])
        return
      }

      const marker = this.io.byte()
      const body = this.io.slice(this.io.int32())

      resolve([marker, body])
    })
  }
}
