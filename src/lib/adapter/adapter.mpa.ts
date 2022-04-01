import {IAdapter} from "@/lib/adapter/adapter.interface"
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
} from "@/desc/alice_v1_pb"

export default class AdapterMpa implements IAdapter {
    private readonly url: string
    toast: (text: string) => void

    constructor(url: string) {
        this.url = url
        this.toast = function(text: string) {
            /**stub**/
        }
    }

    async init(): Promise<void> {
        return
    }

    async register(req: RegistrationRequest) {
        await this.post("/v1/register", req)
    }

    backup() {
        window.location = <any>(this.url + `/v1/backups/create`)
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
        await this.post(`/v1/otp/disable`, null)
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
        await this.post(`/v1/workspaces/${id}/delete`, null)
    }

    async cloneCard(req: CloneCardRequest, workspaceId: string, id: string): Promise<CloneCardResponse> {
        const bin = await this.post(`/v1/workspaces/${workspaceId}/cards/${id}/clone`, req)
        return CloneCardResponse.deserializeBinary(bin)
    }

    async deleteCard(workspaceId: string, id: string): Promise<void> {
        await this.post(`/v1/workspaces/${workspaceId}/cards/${id}/delete`, null)
    }

    async listCardItems(workspaceId: string, id: string): Promise<ListCardItemsResponse> {
        const bin = await this.post(`/v1/workspaces/${workspaceId}/cards/${id}/items`, null)
        return ListCardItemsResponse.deserializeBinary(bin)
    }

    async logout() {
        await this.post(`/v1/sessions/delete`, null)
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

    private async post(permalink: string, req: IProto | null): Promise<Uint8Array> {
        const response = await fetch(this.url + permalink, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            body: req?.serializeBinary()
        })

        if (!response.ok) {
            this.handleErr(response)
            throw Error(response.statusText)
        }

        return new Uint8Array(await response.arrayBuffer())
    }

    private async handleErr(response: Response) {
        switch (response.status) {
            case 422:
                const bin = new Uint8Array(await response.arrayBuffer())
                const items = ValidationError.deserializeBinary(bin).getItemsList()
                if (!items.length) return
                const field = items[0].getField()
                const description = items[0].getDescription()
                this.toast(field == "" ? description : `${field}: ${description}`)
                break
            default:
                this.toast(response.statusText)
        }
    }
}

interface IProto {
    serializeBinary(): Uint8Array
}
