import {RegistrationRequest} from "~/desc/alice_v1_pb";

export function MapCardWithItems(opts: RegistrationCardDomain): RegistrationRequest.CardWithItems {
  const out = new RegistrationRequest.CardWithItems()
  out.setTitleEnc(opts.titleEnc)
  out.setTagsEncList(opts.tagsEnc)
  return out
}

export interface RegistrationCardDomain {
  titleEnc: Uint8Array,
  tagsEnc: Array<Uint8Array>
}
