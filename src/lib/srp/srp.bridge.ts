import {
    SRP_GROUP_MAP,
    WORKER_CMD_INIT,
    WORKER_CMD_IS_PROOF_VALID,
    WORKER_CMD_SET_PUBLIC_KEY,
    WORKER_CMD_VERIFIER
} from "@/lib/const"

import PromiseWorker from "promise-worker"
import {SrpClient} from "@wault-pw/srp6a-webcrypto"

// This is a TypeScript bindings for the SRP6a
// client inside a web worker
export class SrpBridge {
    private readonly worker: Worker
    private readonly promise: PromiseWorker
    private readonly group: string

    constructor(group: string) {
        this.group = group
        // @refs https://webpack.js.org/guides/web-workers/
        this.worker = new Worker(new URL('./srp.worker', import.meta.url));
        this.promise = new PromiseWorker(this.worker)
    }

    async init(param: InitOpts): Promise<void> {
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

    async setServerPublicKey(mutual: Uint8Array): Promise<ChallengeOpts> {
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

interface InitOpts {
    username: string
    password: string
    salt: Uint8Array
}

interface ChallengeOpts {
    proof: Uint8Array
    publicKey: Uint8Array
}
