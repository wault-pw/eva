import {IAdapter} from "~/lib/adapter/adapter.type"
import {Indexer} from "~/lib/backup/indexer"
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

  async logout() {
  }

  async whoami(): Promise<WhoAmIResponse> {
    const user = this.index.user
    // force set readonly role, to disable any possible
    // mutation actions
    user.setReadonly(true)
    return user
  }

  async listWorkspaces(): Promise<ListWorkspacesResponse> {
    const res = new ListWorkspacesResponse()
    res.setItemsList(this.index.workspaces)
    return res
  }

  async listCards(workspaceId: string): Promise<ListCardsResponse> {
    const res = new ListCardsResponse()
    this.index.cards.forEach((card) => {
      if (card.getWorkspaceId() === workspaceId) res.addItems(card)
    })
    return res
  }

  @unavailable
  async createWorkspace(req: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse> {
    return <any>null
  }

  @unavailable
  async updateWorkspace(id: string, req: UpdateWorkspaceRequest): Promise<UpdateWorkspaceResponse> {
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
    const res = new ListCardItemsResponse()
    this.index.cardItems.forEach((item) => {
      if (item.getCardId() === id) res.addItems(item)
    })
    return res
  }

  @unavailable
  async archiveCard(workspaceId: string, id: string): Promise<ArchiveCardResponse> {
    return <any>null
  }

  @unavailable
  async terminate(req: TerminateRequest): Promise<void> {
    return <any>null
  }

  @unavailable
  async createCard(workspaceId: string, req: UpsertCardRequest): Promise<UpsertCardResponse> {
    return <any>null
  }

  @unavailable
  async updateCard(workspaceId: string, cardId: string, req: UpsertCardRequest): Promise<UpsertCardResponse> {
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
