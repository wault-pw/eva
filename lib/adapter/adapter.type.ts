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
  WhoAmIResponse, UpdateCredentialsRequest, UpdateCredentialsResponse
} from "~/desc/alice_v1_pb"

export interface IAdapter {
  init(): Promise<void>

  backup(): void

  register(req: RegistrationRequest): void

  auth0(req: Login0Request): Promise<Login0Response>

  auth1(req: Login1Request): Promise<Login1Response>

  whoami(): Promise<WhoAmIResponse>

  updateCredentials(req: UpdateCredentialsRequest): Promise<UpdateCredentialsResponse>

  listWorkspaces(): Promise<ListWorkspacesResponse>

  listCards(workspaceId: string): Promise<ListCardsResponse>

  createWorkspace(req: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse>

  deleteWorkspace(id: string): Promise<void>

  updateWorkspace(id: string, req: UpdateWorkspaceRequest): Promise<UpdateWorkspaceResponse>

  cloneCard(req: CloneCardRequest, workspaceId: string, id: string): Promise<CloneCardResponse>

  deleteCard(workspaceId: string, id: string): Promise<void>

  listCardItems(workspaceId: string, id: string): Promise<ListCardItemsResponse>

  archiveCard(workspaceId: string, id: string): Promise<ArchiveCardResponse>

  logout(): Promise<void>

  terminate(req: TerminateRequest): Promise<void>

  createCard(workspaceId: string, req: UpsertCardRequest): Promise<UpsertCardResponse>

  updateCard(workspaceId: string, cardId: string, req: UpsertCardRequest): Promise<UpsertCardResponse>
}
