import {CloneCardRequest, RegistrationRequest} from "~/desc/alice_v1_pb"

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
