import {RegistrationRequest} from "~/desc/alice_v1_pb"

export interface IAdapter {
  register(req: RegistrationRequest): void
}
