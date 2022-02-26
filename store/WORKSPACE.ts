import {GetterTree, ActionTree, MutationTree} from 'vuex'
import _sortBy from "lodash/sortBy"
import {UserWithWorkspace} from "~/desc/alice_v1_pb";

export const state = (): IWorkspaceState => ({
  list: [],
})

export type WorkspaceState = ReturnType<typeof state>

export const getters: GetterTree<WorkspaceState, WorkspaceState> = {
  DEFAULT(state): IWorkspace | null {
    return state.list[0]
  },

  ACTIVE(state): IWorkspace {
    return state.list[0]
  },
}

export const mutations: MutationTree<WorkspaceState> = {
  SET_LIST(state, list: Array<IWorkspace>) {
    state.list = _sortBy(list, "title")
  },
}

export const actions: ActionTree<WorkspaceState, WorkspaceState> = {
  async LOAD_ALL({commit, dispatch}, opts: IWorkspaceLoadAllOpts) {
    const res = await this.$adapter.listWorkspaces()
    const out = []

    for (const item of res.getItemsList()) {
      out.push(await dispatch('DECODE', {privKey: opts.privKey, item} as IDecodeOpts))
    }

    commit('SET_LIST', out)
  },

  async DECODE({}, opts: IDecodeOpts): Promise<IWorkspace> {
    const aedKey8 = await this.$ver.pubCipher.decrypt(opts.privKey, opts.item.getAedKeyEnc_asU8())
    const aedKey = await this.$ver.aedCipher.importKey(aedKey8)

    return {
      aedKey,
      id: opts.item.getWorkspaceId(),
      title: await this.$ver.aedDecryptText(aedKey, opts.item.getTitleEnc_asU8(), null),
    }
  }
}

export interface IWorkspaceState {
  list: Array<IWorkspace>
}

export interface IWorkspace {
  id: string
  aedKey: CryptoKey
  title: string
}

export interface IWorkspaceLoadAllOpts {
  privKey: CryptoKey
}

export interface IDecodeOpts {
  privKey: CryptoKey
  item: UserWithWorkspace
}
