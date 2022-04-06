import {CreateShareRequest} from "@/desc/alice_v1_pb"

export function MapCreateShare(opts: CreateShareOpts): CreateShareRequest {
    const out = new CreateShareRequest()
    out.setAedKeyEnc(opts.aedKeyEnc)
    out.setUserId(opts.userId)
    return out
}

interface CreateShareOpts {
    userId: string
    aedKeyEnc: Uint8Array
}
