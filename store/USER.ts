import { GetterTree, ActionTree, MutationTree } from 'vuex'
import {TextEncode} from "~/lib/cryptos/util"

export const state = () => ({
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
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
    console.log(privKey)


    // const {privKey} = await DECRYPT_USER_PACK({
    //   aedKey,
    //   pubKey,
    //   enc: privKeyEnc,
    // })
    //
    // commit('SET_USER', {id, privKey, pubKey})
  }
}

export interface WhoAmIParam {
  password: string
}
