import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {Card} from "~/desc/alice_v1_pb"
import _sortBy from "lodash/sortBy"


export const state = (): ICardState => ({
  list: [],
})

export type CardState = ReturnType<typeof state>

export interface ICardState {
  list: Array<ICard>
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
    return {
      id: opts.item.getId(),
      title: await this.$ver.aedDecryptText(opts.aedKey, opts.item.getTitleEnc_asU8(), null)
    }
  }
}

export interface ICard {
  id: string
  title: string
}

export interface ICardLoadAllOpts {
  workspaceID: string
  aedKey: CryptoKey
}

export interface ICardDecodeOpts {
  aedKey: CryptoKey
  item: Card
}
