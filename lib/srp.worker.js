import registerPromiseWorker from "promise-worker/register"
import {
  SRP_GROUP_MAP,
  WORKER_CMD_INIT,
  WORKER_CMD_IS_PROOF_VALID,
  WORKER_CMD_SET_PUBLIC_KEY,
  WORKER_CMD_VERIFIER
} from "~/lib/const"
import {SrpClient} from "@oka-is/srp6a-webcrypto";

let CLIENT
let CHALLENGE

const COMMANDS = {
  [WORKER_CMD_INIT]: async function ({username, password, group, salt}) {
    CLIENT = new SrpClient(username, password, SRP_GROUP_MAP[group])
    CLIENT.seed(salt)
  },

  [WORKER_CMD_VERIFIER]: async function ({}) {
    return await CLIENT.verifier()
  },

  [WORKER_CMD_SET_PUBLIC_KEY]: async function ({mutual}) {
    CHALLENGE = await CLIENT.setServerPublicKey(mutual)
    const {proof, publicKey} = CHALLENGE
    return {proof, publicKey}
  },

  [WORKER_CMD_IS_PROOF_VALID]: async function ({proof}) {
    return CHALLENGE.isProofValid(proof)
  },
}

registerPromiseWorker(async function (input) {
  const handler = COMMANDS[input.cmd]
  if (!handler) {
    throw `COMMAND <${input.cmd} NOT REGISTERED: ${input}>`
  }

  return await handler(input)
})

