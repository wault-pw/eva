import {defineStore} from "pinia"
import {FakeCryptoKey, TextEncode} from "@/lib/cryptos/util"
import {MapOtpEnable} from "@/mapper_v1/otp.mapper";
import {MapUpdateCredentials} from "@/mapper_v1/user.mapper";

export interface IUser {
    id: string
    readonly: boolean
    aedKey: CryptoKey
    privKey: CryptoKey
    pubKey: CryptoKey
    otbEnabled: boolean
}

export const USER_STORE = defineStore("USER", {
    state(): IUser {
        return {
            id: "",
            readonly: true,
            aedKey: FakeCryptoKey(),
            privKey: FakeCryptoKey(),
            pubKey: FakeCryptoKey(),
            otbEnabled: false,
        }
    },

    getters: {
        IS_AUTHENTICATED(): boolean {
            return this.id !== ""
        }
    },

    actions: {
        async WHO_AM_I(password: string) {
            const res = await this.$adapter.whoami()
            const user = res.getUser()!
            const aedKey8 = await this.$ver.derive.generate(
                TextEncode(password),
                user.getPasswdSalt_asU8(),
                this.$ver.deriveIter,
                this.$ver.aedKeySize
            )

            const aedKey = await this.$ver.aedCipher.importKey(aedKey8)
            const privKey8 = await this.$ver.aedDecrypt(aedKey, user.getPrivKeyEnc_asU8(), user.getPubKey_asU8())
            const privKey = await this.$ver.pubCipher.importPrivKey(privKey8)
            const pubKey = await this.$ver.pubCipher.importPubKey(user.getPubKey_asU8())

            this.id = user.getId()
            this.readonly = user.getReadonly()
            this.otbEnabled = user.getOtpEnabled()
            this.aedKey = aedKey
            this.privKey = privKey
            this.pubKey = pubKey
        },

        async DISABLE_OTP() {
            await this.$adapter.otpDisable()
            this.otbEnabled = false
        },

        async ENABLE_OTP(opts: EnableOtpOpts) {
            await this.$adapter.otpEnable(MapOtpEnable({
                identity: opts.identity,
                passcode: opts.passcode
            }))
            this.otbEnabled = true
        },

        async UPDATE_CREDENTIALS(user: IUser, opts: CredentialsUpdateOpts) {
            const username = opts.newIdentity
            const password = opts.password

            const srp = this.$ver.NewSrpBridge()
            const srpSalt = await srp.randomSalt()
            await srp.init({username, password, salt: srpSalt})
            const verifier = await srp.verifier()

            const passwdSalt = this.$ver.random(this.$ver.deriveSaltSize)
            const aedKey8 = await this.$ver.derive.generate(
                TextEncode(password),
                passwdSalt,
                this.$ver.deriveIter,
                this.$ver.aedKeySize
            )
            const aedKey = await this.$ver.aedCipher.importKey(aedKey8)
            const privKey8 = await this.$ver.exportPrivKey(user.privKey)
            const pubKey8 = await this.$ver.exportPubKey(user.pubKey)

            await this.$adapter.updateCredentials(MapUpdateCredentials({
                verifier,
                srpSalt,
                passwdSalt,
                newIdentity: username,
                oldIdentity: opts.oldIdentity,
                privKeyEnc: await this.$ver.aedEncrypt(aedKey, privKey8, pubKey8),
            }))
        },
    },
})

interface EnableOtpOpts {
    identity: string
    passcode: string
}

interface CredentialsUpdateOpts {
    oldIdentity: string
    newIdentity: string
    password: string
}
