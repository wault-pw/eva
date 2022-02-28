import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {Card} from "~/desc/alice_v1_pb"
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
  SET_LIST(state, list: Array<ICard>) {
    state.list = _sortBy(list, "title")
  },

  ADD_TO_LIST(state, card: ICard) {
    state.list = _sortBy([...state.list, card], 'title')
  },

  REMOVE_FROM_LIST(state, id: string) {
    state.list = _reject(state.list, {id})
  },

  UPDATE_ARCHIVED(state, opts: UpdateArchiveCardOpts) {
    const card = _find(state.list, {id: opts.id})
    if (card) card.archived = opts.archived
  },
}

export const actions: ActionTree<CardState, CardState> = {
  async LOAD_ALL({commit, dispatch}, opts: ICardLoadAllOpts) {
    const res = await this.$adapter.listCards(opts.workspaceID)
    const out = []

    for (const item of res.getItemsList()) {
      out.push(await dispatch('DECODE', {aedKey: opts.aedKey, item: item}))
    }

    commit('SET_LIST', out)
  },

  async DECODE({commit, dispatch}, opts: ICardDecodeOpts): Promise<ICard> {
    const tags = []
    for (const tag of opts.item.getTagsEncList_asU8()) {
      tags.push(await this.$ver.aedDecryptText(opts.aedKey, tag, null))
    }

    return {
      tags,
      id: opts.item.getId(),
      archived: opts.item.getArchived(),
      workspaceId: opts.item.getWorkspaceId(),
      title: await this.$ver.aedDecryptText(opts.aedKey, opts.item.getTitleEnc_asU8(), null)
    }
  },

  async CLONE({commit, dispatch}, opts: CardCloneOpts): Promise<ICard> {
    const req = MapCloneCard({titleEnc: await this.$ver.aedEncryptText(opts.workspace.aedKey, opts.title, null)})
    const res = await this.$adapter.cloneCard(req, opts.workspace.id, opts.id)
    const card = await dispatch("DECODE", <ICardDecodeOpts>{aedKey: opts.workspace.aedKey, item: res.getCard()})
    commit('ADD_TO_LIST', card)
    return card
  },

  async DELETE_CARD({commit, dispatch}, opts: DeleteCardOpts): Promise<void> {
    await this.$adapter.deleteCard(opts.workspaceId, opts.id)
    commit('REMOVE_FROM_LIST', opts.id)
  },

  async ARCHIVE_CARD({commit, dispatch}, opts: ArchiveCardOpts): Promise<void> {
    const res = await this.$adapter.archiveCard(opts.workspaceId, opts.id)
    commit('UPDATE_ARCHIVED', <UpdateArchiveCardOpts>{id: opts.id, archived: res.getArchived()})
  }
}

export interface ICard {
  id: string
  title: string
  archived: boolean
  workspaceId: string
  tags: Array<string>
}

export interface ICardLoadAllOpts {
  workspaceID: string
  aedKey: CryptoKey
}

export interface ICardDecodeOpts {
  aedKey: CryptoKey
  item: Card
}

export interface ICardState {
  list: Array<ICard>
}

export interface CardCloneOpts {
  workspace: IWorkspace
  id: string
  title: string
}

export interface DeleteCardOpts {
  workspaceId: string
  id: string
}

export interface ArchiveCardOpts {
  workspaceId: string
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
