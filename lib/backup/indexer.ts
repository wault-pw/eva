import {Reader} from "~/lib/backup/reader"
import {Card, CardItem, UserWithWorkspace, WhoAmIResponse} from "~/desc/alice_v1_pb"

export const MarkerWhoAmI = 1
export const MarkerWorkspace = 2
export const MarkerCard = 3
export const MarkerCardItem = 4

export class Indexer {
  private readonly reader: Reader
  user: WhoAmIResponse
  workspaces: Array<UserWithWorkspace>
  cards: Array<Card>
  cardItems: Array<CardItem>

  constructor(data: Uint8Array) {
    this.reader = new Reader(data)
    this.workspaces = []
    this.cards = []
    this.cardItems = []
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
        case MarkerCardItem:
          this.cardItems.push(CardItem.deserializeBinary(bin))
          break
        default:
          throw(`unkown marker <${marker}>`)
      }
    }
  }
}
