import {defineStore} from "pinia"
import {IWorkspace} from "@/store/WORKSPACE"
import {Card, UpsertCardRequest} from "@/desc/alice_v1_pb"
import {MapCloneCard} from "@/mapper_v1/card.mapper"
import _reject from "lodash/reject"
import _find from "lodash/find"
import _sortBy from "lodash/sortBy"

export const CARD_STORE = defineStore("CARD", {
    state(): ICardState {
        return {
            list: []
        }
    },

    getters: {
        TAG_SET(): TagSet {
            const set = new TagSet()
            for (const card of this.list) {
                set.add(card)
            }
            return set
        },
    },

    actions: {
        ADD_TO_LIST(card: ICard) {
            this.list = this.SORT_LIST([...this.list, card])
        },

        SORT_LIST(list: Array<ICard>): Array<ICard> {
            return _sortBy(list, 'title')
        },

        CLEAR() {
            this.$reset()
        },

        REMOVE_FROM_LIST(id: string) {
            this.list = _reject(this.list, {id})
        },

        UPDATE_ARCHIVED(id: string, archived: boolean) {
            const card = _find(this.list, {id: id})
            if (card) card.archived = archived
        },

        REPLACE_IN_LIST(card: ICard) {
            const list = _reject(this.list, {id: card.id})
            this.list = this.SORT_LIST([...list, card])
        },

        async LOAD_ALL(workspace: IWorkspace) {
            const res = await this.$adapter.listCards(workspace.id)
            const out = []

            for (const item of res.getItemsList()) {
                out.push(await this.DECODE(workspace, item))
            }

            this.list = this.SORT_LIST(out)
        },

        async DECODE(workspace: IWorkspace, item: Card): Promise<ICard> {
            const tags = []
            for (const tag of item.getTagsEncList_asU8()) {
                tags.push(await this.$ver.aedDecryptText(workspace.aedKey, tag, null))
            }

            return {
                tags,
                id: item.getId(),
                archived: item.getArchived(),
                title: await this.$ver.aedDecryptText(workspace.aedKey, item.getTitleEnc_asU8(), null)
            }
        },

        async ENCODE(workspace: IWorkspace, item: ICard): Promise<ICardEnc> {
            const tags: Array<Uint8Array> = []
            for (const tag of item.tags) {
                tags.push(await this.$ver.aedEncryptText(workspace.aedKey, tag, null))
            }

            return {
                id: item.id,
                archived: item.archived,
                tagsEnc: tags,
                titleEnc: await this.$ver.aedEncryptText(workspace.aedKey, item.title, null),
            }
        },

        async CLONE(workspace: IWorkspace, opts: CardCloneOpts): Promise<ICard> {
            const req = MapCloneCard({titleEnc: await this.$ver.aedEncryptText(workspace.aedKey, opts.title, null)})
            const res = await this.$adapter.cloneCard(req, workspace.id, opts.id)
            const card = await this.DECODE(workspace, res.getCard()!)
            this.ADD_TO_LIST(card)
            return card
        },

        async DELETE_CARD(workspace: IWorkspace, id: string): Promise<void> {
            await this.$adapter.deleteCard(workspace.id, id)
            this.REMOVE_FROM_LIST(id)
        },

        async ARCHIVE_CARD(workspace: IWorkspace, id: string): Promise<void> {
            const res = await this.$adapter.archiveCard(workspace.id, id)
            this.UPDATE_ARCHIVED(id, res.getArchived())
        },

        async CREATE(workspace: IWorkspace, req: UpsertCardRequest): Promise<ICard> {
            const res = await this.$adapter.createCard(workspace.id, req)
            const card = await this.DECODE(workspace, res.getCard()!)
            this.ADD_TO_LIST(card)
            return card
        },

        async UPDATE(workspace: IWorkspace, cardID: string, req: UpsertCardRequest): Promise<ICard> {
            const res = await this.$adapter.updateCard(workspace.id, cardID, req)
            const card = await this.DECODE(workspace, res.getCard()!)
            this.REPLACE_IN_LIST(card)
            return card
        },
    }
})

export interface ICard {
    id: string
    title: string
    archived: boolean
    tags: Array<string>
}

export interface ICardState {
    list: Array<ICard>
}

export function BlankCard(): ICard {
    return {
        id: "",
        title: "",
        archived: false,
        tags: []
    }
}

export class TagSet {
    total: number
    archived: number
    private readonly map: { [key: string]: number }

    constructor() {
        this.map = {}
        this.total = 0
        this.archived = 0
    }

    counter(tag: string): number {
        return this.map[tag] ?? 0
    }

    add(card: ICard) {
        if (card.archived) {
            this.archived++
            return
        }

        this.total++

        for (const tag of card.tags) {
            this.map[tag] ??= 0
            this.map[tag]++
        }
    }

    list(): Array<string> {
        return Object.keys(this.map).sort()
    }
}

interface CardCloneOpts {
    id: string
    title: string
}

export interface ICardEnc {
    id: string
    archived: boolean
    titleEnc: Uint8Array
    tagsEnc: Array<Uint8Array>
}
