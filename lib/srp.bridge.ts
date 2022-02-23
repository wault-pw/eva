import {
  SRP_GROUP_MAP,
  WORKER_CMD_INIT,
  WORKER_CMD_IS_PROOF_VALID,
  WORKER_CMD_SET_PUBLIC_KEY,
  WORKER_CMD_VERIFIER
} from "~/lib/const"

// @ts-ignore
import W from "./srp.worker"
import PromiseWorker from "promise-worker";
import {SrpClient} from "@oka-is/srp6a-webcrypto";

// This is a TypeScript bindings for the SRP6a
// client inside a web worker
export class SrpBridge {
  private readonly worker: Worker
  private readonly promise: PromiseWorker
  private readonly group: string

  constructor(group: string) {
    this.group = group
    this.worker = new W()
    this.promise = new PromiseWorker(this.worker)
  }

  async init(param: InitParam): Promise<void> {
    return this.promise.postMessage({
      cmd: WORKER_CMD_INIT,
      group: this.group,
      username: param.username,
      password: param.password,
      salt: param.salt
    })
  }

  async verifier(): Promise<Uint8Array> {
    return await this.promise.postMessage({cmd: WORKER_CMD_VERIFIER})
  }

  async setServerPublicKey(mutual: Uint8Array): Promise<ChallengeParam> {
    return await this.promise.postMessage({cmd: WORKER_CMD_SET_PUBLIC_KEY, mutual: mutual})
  }

  async isProofValid(proof: Uint8Array): Promise<Boolean> {
    return await this.promise.postMessage({cmd: WORKER_CMD_IS_PROOF_VALID, proof: proof})
  }

  async randomSalt(): Promise<Uint8Array> {
    // @ts-ignore
    const srp = new SrpClient("", "", SRP_GROUP_MAP[this.group]);
    return await srp.randomSalt()
  }

  destroy() {
    this.worker.terminate()
  }
}

interface InitParam {
  username: string
  password: string
  salt: Uint8Array
}

interface ChallengeParam {
  proof: Uint8Array
  publicKey: Uint8Array
}
