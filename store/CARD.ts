import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {Card, UpsertCardRequest} from "~/desc/alice_v1_pb"
import {IWorkspace} from "~/store/WORKSPACE"
import {MapCloneCard} from "~/lib/domain_v1/card"
import _sortBy from "lodash/sortBy"
import _reject from "lodash/reject"
import _find from "lodash/find"

export const state = (): ICardState => ({
  list: []
})

export type CardState = ReturnType<typeof state>

export const getters: GetterTree<CardState, CardState> = {
  TAG_SET(state): TagSet {
    const set = new TagSet()
    for (const card of state.list) {
      set.add(card)
    }
    return set
  },
}

export const mutations: MutationTree<CardState> = {
  SET_LIST(state: CardState, list: Array<ICard>) {
    state.list = _sortBy(list, "title")
  },

  ADD_TO_LIST(state: CardState, card: ICard) {
    state.list = _sortBy([...state.list, card], 'title')
  },

  REMOVE_FROM_LIST(state: CardState, id: string) {
    state.list = _reject(state.list, {id})
  },

  REPLACE_IN_LIST(state: CardState, card: ICard) {
    const list = _reject(state.list, {id: card.id})
    state.list = _sortBy([...list, card], 'title')
  },

  UPDATE_ARCHIVED(state: CardState, opts: UpdateArchiveCardOpts) {
    const card = _find(state.list, {id: opts.id})
    if (card) card.archived = opts.archived
  },

  CLEAR(state: CardState) {
    state.list = []
  }
}

export const actions: ActionTree<CardState, CardState> = {
  async LOAD_ALL({commit, dispatch}, opts: CardLoadAllOpts) {
    const res = await this.$adapter.listCards(opts.workspace.id)
    const out = []

    for (const item of res.getItemsList()) {
      out.push(await dispatch('DECODE', <CardDecodeOpts>{workspace: opts.workspace, item: item}))
    }

    commit('SET_LIST', out)
  },

  async DECODE({commit, dispatch}, opts: CardDecodeOpts): Promise<ICard> {
    const tags = []
    for (const tag of opts.item.getTagsEncList_asU8()) {
      tags.push(await this.$ver.aedDecryptText(opts.workspace.aedKey, tag, null))
    }

    return {
      tags,
      id: opts.item.getId(),
      archived: opts.item.getArchived(),
      title: await this.$ver.aedDecryptText(opts.workspace.aedKey, opts.item.getTitleEnc_asU8(), null)
    }
  },

  async ENCODE({commit, dispatch}, opts: CardEncodeOpts): Promise<ICardEnc> {
    const tags: Array<Uint8Array> = []
    for (const tag of opts.item.tags) {
      tags.push(await this.$ver.aedEncryptText(opts.workspace.aedKey, tag, null))
    }

    return {
      id: opts.item.id,
      archived: opts.item.archived,
      tagsEnc: tags,
      titleEnc: await this.$ver.aedEncryptText(opts.workspace.aedKey, opts.item.title, null),
    }
  },

  async CLONE({commit, dispatch}, opts: CardCloneOpts): Promise<ICard> {
    const req = MapCloneCard({titleEnc: await this.$ver.aedEncryptText(opts.workspace.aedKey, opts.title, null)})
    const res = await this.$adapter.cloneCard(req, opts.workspace.id, opts.id)
    const card = await dispatch("DECODE", <CardDecodeOpts>{workspace: opts.workspace, item: res.getCard()})
    commit('ADD_TO_LIST', card)
    return card
  },

  async CREATE({commit, dispatch}, opts: CreateCardOpts): Promise<ICard> {
    const res = await this.$adapter.createCard(opts.workspace.id, opts.req)
    const card = await dispatch("DECODE", <CardDecodeOpts>{workspace: opts.workspace, item: res.getCard()})
    commit('ADD_TO_LIST', card)
    return card
  },

  async UPDATE({commit, dispatch}, opts: UpdateCardOpts): Promise<ICard> {
    const res = await this.$adapter.updateCard(opts.workspace.id, opts.cardId, opts.req)
    const card = await dispatch("DECODE", <CardDecodeOpts>{workspace: opts.workspace, item: res.getCard()})
    commit('REPLACE_IN_LIST', card)
    return card
  },

  async DELETE_CARD({commit, dispatch}, opts: DeleteCardOpts): Promise<void> {
    await this.$adapter.deleteCard(opts.workspace.id, opts.id)
    commit('REMOVE_FROM_LIST', opts.id)
  },

  async ARCHIVE_CARD({commit, dispatch}, opts: ArchiveCardOpts): Promise<void> {
    const res = await this.$adapter.archiveCard(opts.workspace.id, opts.id)
    commit('UPDATE_ARCHIVED', <UpdateArchiveCardOpts>{id: opts.id, archived: res.getArchived()})
  }
}

export interface ICard {
  id: string
  title: string
  archived: boolean
  tags: Array<string>
}

export function BlankCard(): ICard {
  return {
    id: "",
    title: "",
    archived: false,
    tags: []
  }
}

export interface ICardEnc {
  id: string
  archived: boolean
  titleEnc: Uint8Array
  tagsEnc: Array<Uint8Array>
}

export interface CardLoadAllOpts {
  workspace: IWorkspace
}

export interface CardDecodeOpts {
  workspace: IWorkspace
  item: Card
}

export interface CardEncodeOpts {
  workspace: IWorkspace
  item: ICard
}

export interface ICardState {
  list: Array<ICard>
}

export interface CardCloneOpts {
  workspace: IWorkspace
  id: string
  title: string
}

export interface CreateCardOpts {
  workspace: IWorkspace
  req: UpsertCardRequest
}

export interface UpdateCardOpts {
  workspace: IWorkspace
  cardId: string
  req: UpsertCardRequest
}

export interface DeleteCardOpts {
  workspace: IWorkspace
  id: string
}

export interface ArchiveCardOpts {
  workspace: IWorkspace
  id: string
}

interface UpdateArchiveCardOpts {
  id: string
  archived: boolean
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
