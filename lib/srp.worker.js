import registerPromiseWorker from "promise-worker/register"
import {SRP_GROUP_MAP, WORKER_CMD_INIT, WORKER_CMD_VERIFIER} from "~/lib/const"
import {SrpClient} from "@oka-is/srp6a-webcrypto";

let client

const COMMANDS = {
  [WORKER_CMD_INIT]: async function({group, username, password}) {
    client = new SrpClient(username, password, SRP_GROUP_MAP[group])
    client.seed(await client.randomSalt())
  },

  [WORKER_CMD_VERIFIER]: async function({}) {
    return await client.verifier()
  }
}

registerPromiseWorker(async function (input) {
  const handler = COMMANDS[input.cmd]
  if (!handler) {
    throw `COMMAND <${input.cmd} NOT REGISTERED: ${input}>`
  }

  return await handler(input)
})

