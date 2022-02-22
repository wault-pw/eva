import {WORKER_CMD_INIT, WORKER_CMD_VERIFIER} from "~/lib/const"

// @ts-ignore
import W from "./srp.worker"
import PromiseWorker from "promise-worker";

// This is a TypeScript bindings for the SRP6a
// client inside a web worker
export class SrpBridge {
  private readonly worker: Worker
  private readonly promise: PromiseWorker
  private readonly group: String

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
    })
  }

  async verifier(): Promise<Uint8Array> {
    return this.promise.postMessage({cmd: WORKER_CMD_VERIFIER})
  }

  destroy() {
    this.worker.terminate()
  }
}

interface InitParam {
  username: string
  password: string
}
