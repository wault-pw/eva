import {IAdapter} from "~/lib/adapter/types"
import {NuxtAxiosInstance} from "@nuxtjs/axios"
import {RegistrationRequest} from "~/desc/alice_v1_pb"

export class AdapterMpa implements IAdapter {
  private readonly $axios: NuxtAxiosInstance

  constructor($axios: NuxtAxiosInstance) {
    this.$axios = $axios
  }

  register(req: RegistrationRequest) {
    alert(req.getUser()?.getIdentity())
  }
}
