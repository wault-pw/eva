import {
  CreateWorkspaceRequest, CreateWorkspaceResponse,
  ListCardsResponse,
  ListWorkspacesResponse,
  Login0Request,
  Login0Response,
  Login1Request,
  Login1Response,
  RegistrationRequest, WhoAmIResponse
} from "~/desc/alice_v1_pb"

export interface IAdapter {
  register(req: RegistrationRequest): void

  auth0(req: Login0Request): Promise<Login0Response>

  auth1(req: Login1Request): Promise<Login1Response>

  whoami(): Promise<WhoAmIResponse>

  listWorkspaces(): Promise<ListWorkspacesResponse>

  listCards(workspaceId: string): Promise<ListCardsResponse>

  createWorkspace(req: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse>

  deleteWorkspace(id: string): Promise<void>
}
