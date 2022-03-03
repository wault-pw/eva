import {
  Card,
  CardItem,
  CloneCardRequest,
  RegistrationRequest, UpsertCardRequest,
} from "~/desc/alice_v1_pb"

export function MapCardWithItems(opts: RegistrationCardDomain): RegistrationRequest.CardWithItems {
  const out = new RegistrationRequest.CardWithItems()
  out.setTitleEnc(opts.titleEnc)
  out.setTagsEncList(opts.tagsEnc)
  opts.items?.forEach((item: RegistrationCardItemDomain) => {
    const i = new RegistrationRequest.CardItem()
    i.setTitleEnc(item.titleEnc)
    i.setBodyEnc(item.bodyEnc)
    i.setHidden(!!item.hidden)
    out.addItems(i)
  })
  return out
}

export interface RegistrationCardDomain {
  titleEnc: Uint8Array
  tagsEnc: Array<Uint8Array>
  items?: Array<RegistrationCardItemDomain>
}

export interface RegistrationCardItemDomain {
  titleEnc: Uint8Array
  bodyEnc: Uint8Array
  hidden?: boolean
}

export function MapCloneCard(opts: CloneCardDomain): CloneCardRequest {
  const out = new CloneCardRequest()
  out.setTitleEnc(opts.titleEnc)
  return out
}

export interface CloneCardDomain {
  titleEnc: Uint8Array
}

export function MapUpsertCard(c: CardOpts, i: Array<CardItemOpts>): UpsertCardRequest {
  const out = new UpsertCardRequest()
  out.setCard(MapCard(c))
  out.setCardItemsList(MapCardItems(i))
  return out
}

export function MapCard(c: CardOpts): Card {
  const out = new Card()
  out.setTitleEnc(c.titleEnc)
  out.setTagsEncList(c.tagsEnc)
  return out
}

export function MapCardItem(i: CardItemOpts): CardItem {
  const out = new CardItem()
  out.setTitleEnc(i.titleEnc)
  out.setBodyEnc(i.bodyEnc)
  out.setHidden(i.hidden)
  return out
}

export function MapCardItems(opts: Array<CardItemOpts>): Array<CardItem> {
  const out = []
  for (const opt of opts) {
    out.push(MapCardItem(opt))
  }
  return out
}

export interface CardOpts {
  titleEnc: Uint8Array
  tagsEnc: Array<Uint8Array>
}

export interface CardItemOpts {
  titleEnc: Uint8Array
  bodyEnc: Uint8Array
  hidden: boolean
}
