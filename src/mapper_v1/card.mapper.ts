import {Card, CardItem, CloneCardRequest, RegistrationRequest, UpsertCardRequest} from "@/desc/alice_v1_pb"

export function MapRegistrationCard(opts: RegistrationCardOpts): RegistrationRequest.CardWithItems {
    const out = new RegistrationRequest.CardWithItems()
    out.setTitleEnc(opts.titleEnc)
    out.setTagsEncList(opts.tagsEnc)
    return out
}

export function MapRegistrationCardItem(opts: RegistrationCardItemOpts): RegistrationRequest.CardItem {
    const i = new RegistrationRequest.CardItem()
    i.setTitleEnc(opts.titleEnc)
    i.setBodyEnc(opts.bodyEnc)
    i.setHidden(!!opts.hidden)
    return i
}

export function MapCloneCard(opts: CloneCardOpts): CloneCardRequest {
    const out = new CloneCardRequest()
    out.setTitleEnc(opts.titleEnc)
    return out
}

export function MapCard(c: CardOpts): Card {
    const out = new Card()
    out.setTitleEnc(c.titleEnc)
    out.setTagsEncList(c.tagsEnc)
    out.setArchived(c.archived)
    return out
}

export function MapUpsertCard(c: CardOpts, i: Array<CardItemOpts>): UpsertCardRequest {
    const out = new UpsertCardRequest()
    out.setCard(MapCard(c))
    out.setCardItemsList(MapCardItems(i))
    return out
}

export function MapCardItems(opts: Array<CardItemOpts>): Array<CardItem> {
    const out = []
    for (const opt of opts) {
        out.push(MapCardItem(opt))
    }
    return out
}

export function MapCardItem(i: CardItemOpts): CardItem {
    const out = new CardItem()
    out.setTitleEnc(i.titleEnc)
    out.setBodyEnc(i.bodyEnc)
    out.setHidden(i.hidden)
    return out
}

interface RegistrationCardOpts {
    titleEnc: Uint8Array
    tagsEnc: Array<Uint8Array>
}

interface RegistrationCardItemOpts {
    titleEnc: Uint8Array
    bodyEnc: Uint8Array
    hidden?: boolean
}

interface CloneCardOpts {
    titleEnc: Uint8Array
}

interface CardOpts {
    titleEnc: Uint8Array
    tagsEnc: Array<Uint8Array>
    archived: boolean
}

interface CardItemOpts {
    titleEnc: Uint8Array
    bodyEnc: Uint8Array
    hidden: boolean
}
