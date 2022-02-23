import {IAdapter} from "~/lib/adapter/types"
import {NuxtAxiosInstance} from "@nuxtjs/axios"
import {RegistrationRequest} from "~/desc/alice_v1_pb"
import {Method as AxiosMethod, ResponseType as AxiosResponseType} from "axios";

export class AdapterMpa implements IAdapter {
  private readonly $axios: NuxtAxiosInstance

  constructor($axios: NuxtAxiosInstance) {
    this.$axios = $axios
  }

  async register(req: RegistrationRequest) {
    await this.post("/v1/register", req, null)
  }

  private async post<T extends IProtoRes | null>(url: string, req: IProtoReq | null, res: T): Promise<T | null> {
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
    if (res != null) {
      return res.deserializeBinary(new Uint8Array(answer.data))
    }

    return res
  }
}

interface IProtoReq {
  serializeBinary(): Uint8Array
}

interface IProtoRes {
  deserializeBinary(data: Uint8Array): any
}
