import {
  RFC5054b8192Sha256,
  RFC5054b6144Sha256,
  RFC5054b4096Sha256,
  RFC5054b3072Sha256,
  RFC5054b2048Sha256,
  RFC5054b1536Sha256,
  RFC5054b1024Sha256,
} from "@wault-pw/srp6a-webcrypto"
import {Params} from "@wault-pw/srp6a-webcrypto/src/rfc5054"

export const SRP_8192 = "SRP_8192"
export const SRP_6144 = "SRP_6144"
export const SRP_4096 = "SRP_4096"
export const SRP_3072 = "SRP_3072"
export const SRP_2048 = "SRP_2048"
export const SRP_1536 = "SRP_1536"
export const SRP_1024 = "SRP_1024"

export const SRP_GROUP_MAP:  {[key: string]: Params} = {
  [SRP_8192]: RFC5054b8192Sha256,
  [SRP_6144]: RFC5054b6144Sha256,
  [SRP_4096]: RFC5054b4096Sha256,
  [SRP_3072]: RFC5054b3072Sha256,
  [SRP_2048]: RFC5054b2048Sha256,
  [SRP_1536]: RFC5054b1536Sha256,
  [SRP_1024]: RFC5054b1024Sha256,
}

export const WORKER_CMD_INIT = "WORKER_CMD_INIT"
export const WORKER_CMD_VERIFIER = "WORKER_CMD_VERIFIER"
export const WORKER_CMD_SET_PUBLIC_KEY = "WORKER_CMD_SET_PUBLIC_KEY"
export const WORKER_CMD_IS_PROOF_VALID = "WORKER_CMD_IS_PROOF_VALID"

export const PASSWORD_LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const PASSWORD_DIGITS = "0123456789"
export const PASSWORD_CHARS = "!#$&()*+,-./;<=>?[\\]^_{|}~"
