import {CloneCardRequest, RegistrationRequest} from "~/desc/alice_v1_pb"

export function MapCardWithItems(opts: RegistrationCardDomain): RegistrationRequest.CardWithItems {
  const out = new RegistrationRequest.CardWithItems()
  out.setTitleEnc(opts.titleEnc)
  out.setTagsEncList(opts.tagsEnc)
  opts.items?.forEach((item: RegistrationCardItemDomain) => {
    const i = new RegistrationRequest.CardItem()
    i.setTitleEnc(item.titleEnc)
    i.setBodyEnc(item.bodyEnc)
    out.addItems(i)
  })
  out.addItems()
  return out
}

export interface RegistrationCardDomain {
  titleEnc: Uint8Array,
  tagsEnc: Array<Uint8Array>
  items?: Array<RegistrationCardItemDomain>
}

export interface RegistrationCardItemDomain {
  titleEnc: Uint8Array,
  bodyEnc: Uint8Array
}

export function MapCloneCard(opts: CloneCardDomaain): CloneCardRequest {
  const out = new CloneCardRequest()
  out.setTitleEnc(opts.titleEnc)
  return out
}

export interface CloneCardDomaain {
  titleEnc: Uint8Array,
}
