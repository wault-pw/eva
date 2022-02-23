import {IAdapter} from "~/lib/adapter/adapter.type"
import {NuxtAxiosInstance} from "@nuxtjs/axios"
import {Login0Request, Login0Response, Login1Request, Login1Response, RegistrationRequest} from "~/desc/alice_v1_pb"
import {Method as AxiosMethod, ResponseType as AxiosResponseType} from "axios";

export class AdapterMpa implements IAdapter {
  private readonly $axios: NuxtAxiosInstance

  constructor($axios: NuxtAxiosInstance) {
    this.$axios = $axios
  }

  async register(req: RegistrationRequest) {
    await this.post("/v1/register", req)
  }

  async auth0(req: Login0Request): Promise<Login0Response> {
    await this.$axios.$post("/v1/login/cookie")
    const bin = await this.post("/v1/login/auth0", req)
    return Login0Response.deserializeBinary(bin)
  }

  async auth1(req: Login1Request): Promise<Login1Response> {
    const bin = await this.post("/v1/login/auth1", req)
    return Login1Response.deserializeBinary(bin)
  }

  private async post(url: string, req: IProto | null): Promise<Uint8Array> {
    const opts = {
      url,
      method: "POST" as AxiosMethod,
      responseType: "arraybuffer" as AxiosResponseType,
      data: Buffer.from([])
    }
    if (req != null) {
      opts.data = Buffer.from(req.serializeBinary())
    }

    const answer = await this.$axios(opts)
    return new Uint8Array(answer.data)
  }
}

interface IProto {
  serializeBinary(): Uint8Array
}
