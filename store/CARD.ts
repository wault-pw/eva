import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {Card} from "~/desc/alice_v1_pb"
import {IWorkspace} from "~/store/WORKSPACE"
import {MapCloneCard} from "~/lib/domain_v1/card"
import _sortBy from "lodash/sortBy"
import _get from "lodash/get"
import _reject from "lodash/reject"

export const state = (): ICardState => ({
  list: [],
})

export type CardState = ReturnType<typeof state>

export const getters: GetterTree<CardState, CardState> = {
  TAG_SET(state): Array<ITag> {
    const map: { [key: string]: number } = {}

    for (const card of state.list) {
      for (const tag of card.tags) {
        map[tag] = _get(map, tag, 0)
        map[tag]++
      }
    }

    return Object.keys(map).sort().map((tag) => {
      return {
        name: tag,
        count: map[tag]
      }
    })
  },

  COUNT(state): number {
    return state.list.length
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
    this.$adapter.deleteCard(opts.workspaceId, opts.id)
    commit('REMOVE_FROM_LIST', opts.id)
  }
}

export interface ICard {
  id: string
  title: string
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

export interface ITag {
  name: string
  count: number
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
