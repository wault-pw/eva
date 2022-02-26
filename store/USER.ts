import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {TextEncode, FakeCryptoKey} from "~/lib/cryptos/util"

export const state = (): IUser => ({
  id: "",
  aedKey: FakeCryptoKey(),
  privKey: FakeCryptoKey(),
  pubKey: FakeCryptoKey(),
})

export type UserState = ReturnType<typeof state>

export const getters: GetterTree<UserState, UserState> = {
  IS_AUTHORIZED(state): boolean {
    return state.id != ""
  },
}

export const mutations: MutationTree<UserState> = {
  SET_USER(state, user: IUser) {
    state.id = user.id
    state.aedKey = user.aedKey
    state.privKey = user.privKey
    state.pubKey = user.pubKey
  },
}

export const actions: ActionTree<UserState, UserState> = {
  async WHO_AM_I({commit}, param: WhoAmIParam) {
    const res = await this.$adapter.whoami()
    const aedKey8 = await this.$ver.derive.generate(
      TextEncode(param.password),
      res.getPasswdSalt_asU8(),
      this.$ver.deriveIter,
      this.$ver.aedKeySize
    )

    const aedKey = await this.$ver.aedCipher.importKey(aedKey8)
    const privKey8 = await this.$ver.aedDecrypt(aedKey, res.getPrivKeyEnc_asU8(), res.getPubKey_asU8())
    const privKey = await this.$ver.pubCipher.importPrivKey(privKey8)
    const pubKey = await this.$ver.pubCipher.importPubKey(res.getPubKey_asU8())

    commit('SET_USER', {
      id: res.getId(),
      aedKey,
      privKey,
      pubKey,
    } as IUser)
  }
}

export interface WhoAmIParam {
  password: string
}

export interface IUser {
  id: string
  aedKey: CryptoKey
  privKey: CryptoKey
  pubKey: CryptoKey
}
