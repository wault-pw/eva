import {CreateWorkspaceRequest, RegistrationRequest, UpdateWorkspaceRequest} from "@/desc/alice_v1_pb"

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

export function MapRegistrationWorkspace(param: RegistrationWorkspaceOpts): RegistrationRequest.Workspace {
    const out = new RegistrationRequest.Workspace()
    out.setAedKeyEnc(param.aedKeyEnc)
    out.setTitleEnc(param.titleEnc)
    return out
}

interface CreateWorkspaceOpts {
    aedKeyEnc: Uint8Array
    titleEnc: Uint8Array
}

interface UpdateWorkspaceOpts {
    titleEnc: Uint8Array
}

interface RegistrationWorkspaceOpts {
    aedKeyEnc: Uint8Array
    titleEnc: Uint8Array
}
