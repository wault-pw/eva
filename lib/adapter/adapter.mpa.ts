import {IAdapter} from "~/lib/adapter/adapter.type"
import {NuxtAxiosInstance} from "@nuxtjs/axios"
import {
  ArchiveCardResponse,
  CloneCardRequest,
  CloneCardResponse,
  UpsertCardRequest,
  UpsertCardResponse,
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  ListCardItemsResponse,
  ListCardsResponse,
  ListWorkspacesResponse,
  Login0Request,
  Login0Response,
  Login1Request,
  Login1Response,
  RegistrationRequest,
  TerminateRequest,
  WhoAmIResponse
} from "~/desc/alice_v1_pb"
import {Method as AxiosMethod, ResponseType as AxiosResponseType} from "axios";

export class AdapterMpa implements IAdapter {
  private readonly $axios: NuxtAxiosInstance

  constructor($axios: NuxtAxiosInstance) {
    this.$axios = $axios
  }

  async init(): Promise<void> {
    return
  }

  async register(req: RegistrationRequest) {
    await this.post("/v1/register", req)
  }

  backup() {
    window.location = <any>(this.$axios.defaults.baseURL + `/v1/backups/create`)
  }

  async auth0(req: Login0Request): Promise<Login0Response> {
    const bin = await this.post("/v1/login/auth0", req)
    return Login0Response.deserializeBinary(bin)
  }

  async auth1(req: Login1Request): Promise<Login1Response> {
    const bin = await this.post("/v1/login/auth1", req)
    return Login1Response.deserializeBinary(bin)
  }

  async whoami(): Promise<WhoAmIResponse> {
    const bin = await this.post("/v1/whoami", null)
    return WhoAmIResponse.deserializeBinary(bin)
  }

  async listWorkspaces(): Promise<ListWorkspacesResponse> {
    const bin = await this.post("/v1/workspaces/list", null)
    return ListWorkspacesResponse.deserializeBinary(bin)
  }

  async listCards(workspaceId: string): Promise<ListCardsResponse> {
    const bin = await this.post(`/v1/workspaces/${workspaceId}/cards`, null)
    return ListCardsResponse.deserializeBinary(bin)
  }

  async createWorkspace(req: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse> {
    const bin = await this.post(`/v1/workspaces/create`, req)
    return CreateWorkspaceResponse.deserializeBinary(bin)
  }

  async deleteWorkspace(id: string) {
    await this.$axios.$post(`/v1/workspaces/${id}/delete`)
  }

  async cloneCard(req: CloneCardRequest, workspaceId: string, id: string): Promise<CloneCardResponse> {
    const bin = await this.post(`/v1/workspaces/${workspaceId}/cards/${id}/clone`, req)
    return CloneCardResponse.deserializeBinary(bin)
  }

  async deleteCard(workspaceId: string, id: string): Promise<void> {
    await this.$axios.$post(`/v1/workspaces/${workspaceId}/cards/${id}/delete`, null)
  }

  async listCardItems(workspaceId: string, id: string): Promise<ListCardItemsResponse> {
    const bin = await this.post(`/v1/workspaces/${workspaceId}/cards/${id}/items`, null)
    return ListCardItemsResponse.deserializeBinary(bin)
  }

  async logout() {
    await this.$axios.$post(`/v1/sessions/delete`)
  }

  async archiveCard(workspaceId: string, id: string): Promise<ArchiveCardResponse> {
    const bin = await this.post(`/v1/workspaces/${workspaceId}/cards/${id}/archive`, null)
    return ArchiveCardResponse.deserializeBinary(bin)
  }

  async terminate(req: TerminateRequest): Promise<void> {
    await this.post(`/v1/terminate`, req)
    return
  }

  async createCard(workspaceId: string, req: UpsertCardRequest): Promise<UpsertCardResponse> {
    const bin = await this.post(`/v1/workspaces/${workspaceId}/cards/create`, req)
    return UpsertCardResponse.deserializeBinary(bin)
  }

  async updateCard(workspaceId: string, cardId: string, req: UpsertCardRequest): Promise<UpsertCardResponse> {
    const bin = await this.post(`/v1/workspaces/${workspaceId}/cards/${cardId}/update`, req)
    return UpsertCardResponse.deserializeBinary(bin)
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
