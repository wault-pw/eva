import { GetterTree, ActionTree, MutationTree } from 'vuex'
import {RegistrationRequest} from "~/desc/alice_v1_pb"
import {AdapterMpa} from '~/lib/adapter/adapter.mpa'

export const state = () => ({
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async REGISTER({ commit }, params: IUserRegister) {
    const req = new RegistrationRequest()
    const user = new RegistrationRequest.User()
    user.setIdentity(params.username)
    req.setUser(user)

    new AdapterMpa(this.$axios).register(req)
  },
}

export interface IUserRegister {
  username: string
  password: string
}
