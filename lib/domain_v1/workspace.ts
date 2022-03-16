import {CreateWorkspaceRequest, RegistrationRequest, UpdateWorkspaceRequest} from "~/desc/alice_v1_pb";

export function MapRegistrationWorkspace(param: RegistrationWorkspaceDomain): RegistrationRequest.Workspace {
  const out = new RegistrationRequest.Workspace()
  out.setAedKeyEnc(param.aedKeyEnc)
  out.setTitleEnc(param.titleEnc)
  return out
}

export interface RegistrationWorkspaceDomain {
  aedKeyEnc: Uint8Array
  titleEnc: Uint8Array
}

export function MapCreateWorkspace(opts: CreateWorkspaceOpts): CreateWorkspaceRequest {
  const out = new CreateWorkspaceRequest()
  out.setAedKeyEnc(opts.aedKeyEnc)
  out.setTitleEnc(opts.titleEnc)
  return out
}

export function MapUpdateWorkspace(opts: UpdateWorkspaceOpts): UpdateWorkspaceRequest {
  const out = new UpdateWorkspaceRequest()
  out.setTitleEnc(opts.titleEnc)
  return out
}

export interface CreateWorkspaceOpts {
  aedKeyEnc: Uint8Array
  titleEnc: Uint8Array
}

export interface UpdateWorkspaceOpts {
  titleEnc: Uint8Array
}
