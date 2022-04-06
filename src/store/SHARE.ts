import {defineStore} from "pinia"
import {MapFindUser} from "@/mapper_v1/user.mapper"
import {IWorkspace} from "@/store/WORKSPACE"
import {MapCreateShare} from "@/mapper_v1/share.mapper"
import {UserWorkspace} from "@/desc/alice_v1_pb"

export const SHARE_STORE = defineStore("SHARE", {
    state() {
        return {}
    },

    actions: {
        async CREATE(workspace: IWorkspace, userId: string): Promise<IShare> {
            const res = await this.$adapter.findUser(MapFindUser({id: userId}))
            const uPubKey = await this.$ver.pubCipher.importPubKey(res.getUser()!.getPubKey_asU8())
            const aedKey8 = await this.$ver.aedCipher.exportKey(workspace.aedKey)
            const aedKeyEnc = await this.$ver.pubCipher.encrypt(uPubKey, aedKey8)
            const response = await this.$adapter.createShare(workspace.id, MapCreateShare({userId, aedKeyEnc}))
            return map(response.getUserWorkspace()!)
        },

        async LIST(workspace: IWorkspace): Promise<Array<IShare>> {
            const res = await this.$adapter.listShares(workspace.id)
            const out: Array<IShare> = []

            for (const item of res.getSharesList()) {
                out.push(map(item))
            }

            return out
        },

        async DELETE(id: string) {
            await this.$adapter.deleteShare(id)
        },
    }
})

function map(item: UserWorkspace): IShare {
    return {
        id: item.getId(),
        userId: item.getUserId(),
    }
}

export interface IShare {
    id: string
    userId: string
}
