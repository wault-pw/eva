import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {Card} from "~/desc/alice_v1_pb"
import _sortBy from "lodash/sortBy"
import _get from "lodash/get"

export const state = (): ICardState => ({
  list: [],
})

export type CardState = ReturnType<typeof state>

export const getters: GetterTree<ICardState, ICardState> = {
  TAG_SET(state): Array<ITagMap> {
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

export const mutations: MutationTree<ICardState> = {
  SET_LIST(state, list: Array<ICard>) {
    state.list = _sortBy(list, "title")
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
      title: await this.$ver.aedDecryptText(opts.aedKey, opts.item.getTitleEnc_asU8(), null)
    }
  }
}

export interface ICard {
  id: string
  title: string
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

export interface ITagMap {
  name: string
  count: number
}
