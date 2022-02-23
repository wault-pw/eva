import {RegistrationRequest} from "~/desc/alice_v1_pb";

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
