import {LoginOtpRequest, OtpEnableRequest} from "@/desc/alice_v1_pb"

export function MapLoginOtp(passcode: string | null): LoginOtpRequest {
    const out = new LoginOtpRequest()
    out.setPasscode(passcode || "")
    return out
}

export function MapOtpEnable(opts: OtpEnableOpts): OtpEnableRequest {
    const out = new OtpEnableRequest()
    out.setPasscode(opts.passcode)
    out.setIdentity(opts.identity)
    return out
}

interface OtpEnableOpts {
    passcode: string
    identity: string
}
