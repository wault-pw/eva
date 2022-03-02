import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {IWorkspace} from "~/store/WORKSPACE"
import {CardItem} from "~/desc/alice_v1_pb"
import {UUID} from "~/lib/cryptos/util"

export const state = () => ({})

export type CardItemState = ReturnType<typeof state>

export const actions: ActionTree<CardItemState, CardItemState> = {
  async LOAD({commit, dispatch}, opts: CardItemLoadOpts) {
    const res = await this.$adapter.listCardItems(opts.workspace.id, opts.cardId)
    const out: Array<ICardItem> = []

    for (const item of res.getItemsList()) {
      out.push(await dispatch('DECODE', <CardItemDecodeOpts>{workspace: opts.workspace, item: item}))
    }

    return out
  },

  async DECODE({commit, dispatch}, opts: CardItemDecodeOpts): Promise<ICardItem> {
    return {
      id: opts.item.getId(),
      cid: UUID(),
      hidden: opts.item.getHidden(),
      title: await this.$ver.aedDecryptText(opts.workspace.aedKey, opts.item.getTitleEnc_asU8(), null),
      body: await this.$ver.aedDecryptText(opts.workspace.aedKey, opts.item.getBodyEnc_asU8(), null),
    }
  }
}

export interface CardItemLoadOpts {
  workspace: IWorkspace
  cardId: string
}

interface CardItemDecodeOpts {
  workspace: IWorkspace
  item: CardItem
}

export interface ICardItem {
  id: string
  cid: string // used in UI for vue key property
  title: string
  body: string
  hidden: boolean
}
