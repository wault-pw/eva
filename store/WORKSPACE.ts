import {GetterTree, ActionTree, MutationTree} from "vuex"
import {UserWithWorkspace} from "~/desc/alice_v1_pb"
import {IUser} from "~/store/USER"
import {CreateWorkspaceOpts, MapCreateWorkspace, MapUpdateWorkspace} from "~/lib/domain_v1/workspace"
import {FakeCryptoKey} from "~/lib/cryptos/util"
import _sortBy from "lodash/sortBy"
import _reject from "lodash/reject"
import _find from "lodash/find"

export const state = (): IWorkspaceState => ({
  list: [],
  active: NullWorkspace(),
})

export type WorkspaceState = ReturnType<typeof state>

export const getters: GetterTree<WorkspaceState, WorkspaceState> = {
  DEFAULT(state: WorkspaceState): IWorkspace | null {
    return state.list[0]
  },
}

export const mutations: MutationTree<WorkspaceState> = {
  SET_LIST(state: WorkspaceState, list: Array<IWorkspace>) {
    state.list = _sortBy(list, "title")
  },

  ADD_TO_LIST(state: WorkspaceState, workspace: IWorkspace) {
    state.list = _sortBy([...state.list, workspace], 'title')
  },

  REMOVE_FROM_LIST(state: WorkspaceState, id: string) {
    state.list = _reject(state.list, {id: id})
  },

  REPLACE_IN_LIST(state: WorkspaceState, workspace: IWorkspace) {
    const list = _reject(state.list, {id: workspace.id})
    state.list = _sortBy([...list, workspace], 'title')
  },

  SET_ACTIVE_ID(state: WorkspaceState, id: string) {
    const workspace = _find(state.list, {id})
    if (workspace == null) throw(`workspace <${id}> not found`)
    return state.active = workspace
  },

  CLEAR(state: WorkspaceState) {
    state.list = []
  }
}

export const actions: ActionTree<WorkspaceState, WorkspaceState> = {
  async LOAD_ALL({commit, dispatch}, user: IUser) {
    const res = await this.$adapter.listWorkspaces()
    const out = []

    for (const item of res.getItemsList()) {
      out.push(await dispatch('DECODE', <DecodeOpts>{user, item}))
    }

    commit('SET_LIST', out)
  },

  async DECODE({}, opts: DecodeOpts): Promise<IWorkspace> {
    const aedKey8 = await this.$ver.pubCipher.decrypt(opts.user.privKey, opts.item.getAedKeyEnc_asU8())
    const aedKey = await this.$ver.aedCipher.importKey(aedKey8)

    return {
      aedKey,
      id: opts.item.getWorkspaceId(),
      title: await this.$ver.aedDecryptText(aedKey, opts.item.getTitleEnc_asU8(), null),
    }
  },

  async CREATE({commit, dispatch}, opts: WorkspaceCreateOpts): Promise<IWorkspace> {
    const wKey = await this.$ver.aedCipher.generateKey()
    const wKey8 = await this.$ver.aedCipher.exportKey(wKey)
    const wKey8Enc = await this.$ver.pubCipher.encrypt(opts.user.pubKey, wKey8)
    const res = await this.$adapter.createWorkspace(MapCreateWorkspace(<CreateWorkspaceOpts>{
      aedKeyEnc: wKey8Enc,
      titleEnc: await this.$ver.aedEncryptText(wKey, opts.title, null),
    }))
    const workspace = await dispatch('DECODE', <DecodeOpts>{user: opts.user, item: res.getWorkspace()})
    commit("ADD_TO_LIST", workspace)
    return workspace
  },

  async UPDATE({commit, dispatch}, opts: WorkspaceUpdateOpts): Promise<void> {
    const res = await this.$adapter.updateWorkspace(opts.workspace.id, MapUpdateWorkspace({
        titleEnc: await this.$ver.aedEncryptText(opts.workspace.aedKey, opts.title, null)
      })
    )

    const workspace = await dispatch('DECODE', <DecodeOpts>{user: opts.user, item: res.getWorkspace()})
    commit('REPLACE_IN_LIST', workspace)
  }
}

function NullWorkspace(): IWorkspace {
  return {
    id: "",
    title: "",
    aedKey: FakeCryptoKey(),
  }
}

export interface IWorkspaceState {
  list: Array<IWorkspace>
  active: IWorkspace
}

export interface IWorkspace {
  id: string
  aedKey: CryptoKey
  title: string
}

export interface DecodeOpts {
  user: IUser
  item: UserWithWorkspace
}

export interface WorkspaceCreateOpts {
  user: IUser
  title: string
}

export interface WorkspaceUpdateOpts {
  workspace: IWorkspace
  user: IUser
  title: string
}
