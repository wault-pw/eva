import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {TextEncode, FakeCryptoKey} from "~/lib/cryptos/util"
import {MapUpdateCredentials} from "~/lib/domain_v1/user";

export const state = (): IUser => ({
  id: "",
  readonly: true,
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
    state.readonly = user.readonly
  },
}

export const actions: ActionTree<UserState, UserState> = {
  async WHO_AM_I({commit}, param: WhoAmIParam) {
    const res = await this.$adapter.whoami()
    const user = res.getUser()!
    const aedKey8 = await this.$ver.derive.generate(
      TextEncode(param.password),
      user.getPasswdSalt_asU8(),
      this.$ver.deriveIter,
      this.$ver.aedKeySize
    )

    const aedKey = await this.$ver.aedCipher.importKey(aedKey8)
    const privKey8 = await this.$ver.aedDecrypt(aedKey, user.getPrivKeyEnc_asU8(), user.getPubKey_asU8())
    const privKey = await this.$ver.pubCipher.importPrivKey(privKey8)
    const pubKey = await this.$ver.pubCipher.importPubKey(user.getPubKey_asU8())

    commit('SET_USER', {
      id: user.getId(),
      readonly: user.getReadonly(),
      aedKey,
      privKey,
      pubKey,
    } as IUser)
  },

  async UPDATE_CREDENTIALS({commit}, opts: CredentialsUpdateOpts) {
    const username = opts.newIdentity
    const password = opts.password

    const srp = this.$ver.NewSrpBridge()
    const srpSalt = await srp.randomSalt()
    await srp.init({username, password, salt: srpSalt})
    const verifier = await srp.verifier()

    const passwdSalt = this.$ver.random(this.$ver.deriveSaltSize)
    const aedKey8 = await this.$ver.derive.generate(
      TextEncode(password),
      passwdSalt,
      this.$ver.deriveIter,
      this.$ver.aedKeySize
    )
    const aedKey = await this.$ver.aedCipher.importKey(aedKey8)
    const privKey8 = await this.$ver.exportPrivKey(opts.user.privKey)
    const pubKey8 = await this.$ver.exportPubKey(opts.user.pubKey)

    await this.$adapter.updateCredentials(MapUpdateCredentials({
      verifier,
      srpSalt,
      passwdSalt,
      newIdentity: username,
      oldIdentity: opts.oldIdentity,
      privKeyEnc: await this.$ver.aedEncrypt(aedKey, privKey8, pubKey8),
    }))
  }
}

export interface WhoAmIParam {
  password: string
}

export interface CredentialsUpdateOpts {
  user: IUser
  oldIdentity: string
  newIdentity: string
  password: string
}

export interface IUser {
  id: string
  readonly: boolean
  aedKey: CryptoKey
  privKey: CryptoKey
  pubKey: CryptoKey
}
