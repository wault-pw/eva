import {IAdapter} from "~/lib/adapter/adapter.type"
import {NuxtAxiosInstance} from "@nuxtjs/axios"
import {
  ArchiveCardResponse,
  CloneCardRequest,
  CloneCardResponse,
  UpsertCardRequest,
  UpsertCardResponse,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
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
  WhoAmIResponse,
  UpdateCredentialsRequest,
  UpdateCredentialsResponse,
  LoginOtpRequest,
  LoginOtpResponse,
  OtpIssueResponse, OtpEnableRequest, ValidationError,
} from "~/desc/alice_v1_pb"
import {AxiosError, Method as AxiosMethod, ResponseType as AxiosResponseType} from "axios"
import {ToastApi} from "~/plugins/toast"
import {BASE_422_ERR_FIELD} from "~/lib/const"

export class AdapterMpa implements IAdapter {
  private readonly $axios: NuxtAxiosInstance
  private readonly $toast: ToastApi

  constructor($axios: NuxtAxiosInstance, $toast: ToastApi) {
    this.$axios = $axios
    this.$toast = $toast
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

  async otp(req: LoginOtpRequest): Promise<LoginOtpResponse> {
    const bin = await this.post("/v1/login/otp", req)
    return LoginOtpResponse.deserializeBinary(bin)
  }

  async otpIssue(): Promise<OtpIssueResponse> {
    const bin = await this.post("/v1/otp/issue", null)
    return OtpIssueResponse.deserializeBinary(bin)
  }

  async otpEnable(req: OtpEnableRequest) {
    await this.post("/v1/otp/enable", req)
  }

  async otpDisable() {
    await this.$axios.$post(`/v1/otp/disable`)
  }

  async whoami(): Promise<WhoAmIResponse> {
    const bin = await this.post("/v1/whoami", null)
    return WhoAmIResponse.deserializeBinary(bin)
  }

  async updateCredentials(req: UpdateCredentialsRequest): Promise<UpdateCredentialsResponse> {
    const bin = await this.post("/v1/credentials/update", req)
    return UpdateCredentialsResponse.deserializeBinary(bin)
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

  async updateWorkspace(id: string, req: UpdateWorkspaceRequest): Promise<UpdateWorkspaceResponse> {
    const bin = await this.post(`/v1/workspaces/${id}/update`, req)
    return UpdateWorkspaceResponse.deserializeBinary(bin)
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

    try {
      const answer = await this.$axios(opts)
      return new Uint8Array(answer.data)
    } catch (e: any) {
      if (e?.response) this.handleErr(e as AxiosError)
      throw(e)
    }
  }

  private handleErr(e: AxiosError) {
    switch (e.response?.status) {
      case 422:
        const items = ValidationError.deserializeBinary(e.response?.data).getItemsList()
        if (!items.length) return
        const field = items[0].getField()
        const description = items[0].getDescription()
        this.$toast.open(field == BASE_422_ERR_FIELD ? description : `${field}: ${description}`)
    }
  }
}

interface IProto {
  serializeBinary(): Uint8Array
}
