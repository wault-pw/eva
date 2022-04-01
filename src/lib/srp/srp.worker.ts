import registerPromiseWorker from "promise-worker/register"
import {ClientChallenge, SrpClient} from "@wault-pw/srp6a-webcrypto"
import {
    SRP_GROUP_MAP,
    WORKER_CMD_INIT,
    WORKER_CMD_IS_PROOF_VALID,
    WORKER_CMD_SET_PUBLIC_KEY,
    WORKER_CMD_VERIFIER
} from "@/lib/const"

let CLIENT: SrpClient
let CHALLENGE: ClientChallenge

const COMMANDS = {
    [WORKER_CMD_INIT]: async function (opts: { username: string, password: string, group: string, salt: Uint8Array }) {
        CLIENT = new SrpClient(opts.username, opts.password, SRP_GROUP_MAP[opts.group])
        CLIENT.seed(opts.salt)
    },

    [WORKER_CMD_VERIFIER]: async function ({}) {
        return await CLIENT.verifier()
    },

    [WORKER_CMD_SET_PUBLIC_KEY]: async function (opts: { mutual: Uint8Array }) {
        CHALLENGE = await CLIENT.setServerPublicKey(opts.mutual)
        const {proof, publicKey} = CHALLENGE
        return {proof, publicKey}
    },

    [WORKER_CMD_IS_PROOF_VALID]: async function (opts: { proof: Uint8Array }) {
        return CHALLENGE.isProofValid(opts.proof)
    },
}

registerPromiseWorker(async function (input) {
    // @ts-ignore
    const handler = COMMANDS[input.cmd]

    if (!handler) {
        throw `COMMAND <${input.cmd} NOT REGISTERED: ${input}>`
    }

    return await handler(input)
})
