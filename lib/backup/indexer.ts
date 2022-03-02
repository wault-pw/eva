import {Reader, MarkerCard, MarkerWhoAmI, MarkerWorkspace} from "~/lib/backup/reader"
import {Card, UserWithWorkspace, WhoAmIResponse} from "~/desc/alice_v1_pb"

export default class Indexer {
  private readonly reader: Reader
  user: WhoAmIResponse
  workspaces: Array<UserWithWorkspace>
  cards: Array<Card>

  constructor(data: Uint8Array) {
    this.reader = new Reader(data)
    this.workspaces = []
    this.cards = []
    this.user = new WhoAmIResponse()
  }

  async index(): Promise<void> {
    while (true) {
      const [marker, bin] = await this.reader.next()
      switch (marker) {
        case null:
          return
        case MarkerWhoAmI:
          this.user = WhoAmIResponse.deserializeBinary(bin)
          break
        case MarkerWorkspace:
          this.workspaces.push(UserWithWorkspace.deserializeBinary(bin))
          break
        case MarkerCard:
          this.cards.push(Card.deserializeBinary(bin))
          break
        default:
          throw(`unkown marker <${marker}>`)
      }
    }
  }
}
