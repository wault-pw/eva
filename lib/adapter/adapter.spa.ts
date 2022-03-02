import {IAdapter} from "~/lib/adapter/adapter.type"
import _filter from "lodash/filter"
import Indexer from "~/lib/backup/indexer"
import {
  ArchiveCardResponse, Card,
  CloneCardRequest,
  CloneCardResponse,
  CreateWorkspaceRequest, CreateWorkspaceResponse, ListCardItemsResponse,
  ListCardsResponse,
  ListWorkspacesResponse,
  Login0Request,
  Login0Response,
  Login1Request,
  Login1Response,
  RegistrationRequest,
  WhoAmIResponse
} from "~/desc/alice_v1_pb"

export class AdapterSpa implements IAdapter {
  private index: Indexer
  private readonly property: string

  constructor(property: string) {
    this.property = property
    this.index = new Indexer(new Uint8Array(0))
  }

  async init(): Promise<void> {
    // @ts-ignore
    this.index = new Indexer(<Uint8Array>window[this.property])
    await this.index.index()
  }

  @unavailable
  backup() {
  }

  @unavailable
  async register(req: RegistrationRequest) {
  }

  @unavailable
  async auth0(req: Login0Request): Promise<Login0Response> {
    return <any>null
  }

  @unavailable
  async auth1(req: Login1Request): Promise<Login1Response> {
    return <any>null
  }

  async logout() {}

  async whoami(): Promise<WhoAmIResponse> {
    return this.index.user
  }

  async listWorkspaces(): Promise<ListWorkspacesResponse> {
    const res = new ListWorkspacesResponse()
    res.setItemsList(this.index.workspaces)
    return res
  }

  async listCards(workspaceId: string): Promise<ListCardsResponse> {
    const res = new ListCardsResponse()
    res.setItemsList(<Array<Card>>_filter(this.index.cards, { workspaceId: workspaceId }))
    return res
  }

  @unavailable
  async createWorkspace(req: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse> {
    return <any>null
  }

  @unavailable
  async deleteWorkspace(id: string) {
    return <any>null
  }

  @unavailable
  async cloneCard(req: CloneCardRequest, workspaceId: string, id: string): Promise<CloneCardResponse> {
    return <any>null
  }

  @unavailable
  async deleteCard(workspaceId: string, id: string): Promise<void> {
    return <any>null
  }

  async listCardItems(workspaceId: string, id: string): Promise<ListCardItemsResponse> {
    return <any>null
  }

  @unavailable
  async archiveCard(workspaceId: string, id: string): Promise<ArchiveCardResponse> {
    return <any>null
  }
}

function unavailable<T>(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.value = () => {
    const message = `method <${propertyKey}> is unavailable for SPA mode`
    alert(message)
    throw(message)
  }
}
