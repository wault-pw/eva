import {defineStore} from "pinia"
import {FakeCryptoKey} from "@/lib/cryptos/util"
import {IUser} from "@/store/USER"
import {UserWithWorkspace} from "@/desc/alice_v1_pb"
import {MapCreateWorkspace, MapUpdateWorkspace} from "@/mapper_v1/workspace.mapper"
import _find from "lodash/find"
import _reject from "lodash/reject"
import _sortBy from "lodash/sortBy"

export const WORKSPACE_STORE = defineStore("WORKSPACE", {
    state(): IWorkspaceState {
        return {
            list: [],
            active: NullWorkspace()
        }
    },

    getters: {
        DEFAULT(): IWorkspace | null {
            return this.list[0]
        },
    },

    actions: {
        CLEAR() {
            this.$reset()
        },

        SORT_LIST(list: Array<IWorkspace>): Array<IWorkspace> {
            return _sortBy(list, 'title')
        },

        async LOAD_ALL(user: IUser) {
            const res = await this.$adapter.listWorkspaces()
            const out = []

            for (const item of res.getItemsList()) {
                out.push(await this.DECODE(user, item))
            }

            this.list = this.SORT_LIST(out)
        },

        SET_ACTIVE_ID(id: string) {
            const workspace = _find(this.list, {id})
            if (workspace == null) throw(`workspace <${id}> not found`)
            this.active = workspace
        },

        REMOVE_FROM_LIST(id: string) {
            this.list = _reject(this.list, {id: id})
        },

        REPLACE_IN_LIST(workspace: IWorkspace) {
            const list = _reject(this.list, {id: workspace.id})
            this.list = this.SORT_LIST([...list, workspace])
        },

        async DECODE(user: IUser, item: UserWithWorkspace): Promise<IWorkspace> {
            const aedKey8 = await this.$ver.pubCipher.decrypt(user.privKey, item.getAedKeyEnc_asU8())
            const aedKey = await this.$ver.aedCipher.importKey(aedKey8)

            return {
                aedKey,
                id: item.getWorkspaceId(),
                shareId: item.getId(),
                sharedWithYou: item.getSharedWithYou(),
                title: await this.$ver.aedDecryptText(aedKey, item.getTitleEnc_asU8(), null),
            }
        },

        async CREATE(user: IUser, title: string): Promise<IWorkspace> {
            const wKey = await this.$ver.aedCipher.generateKey()
            const wKey8 = await this.$ver.aedCipher.exportKey(wKey)
            const wKey8Enc = await this.$ver.pubCipher.encrypt(user.pubKey, wKey8)
            const res = await this.$adapter.createWorkspace(MapCreateWorkspace({
                aedKeyEnc: wKey8Enc,
                titleEnc: await this.$ver.aedEncryptText(wKey, title, null),
            }))

            const workspace = await this.DECODE(user, res.getWorkspace()!)
            this.list = this.SORT_LIST([...this.list, workspace])
            return workspace
        },

        async UPDATE(user: IUser, workspace: IWorkspace, title: string): Promise<void> {
            const res = await this.$adapter.updateWorkspace(workspace.id, MapUpdateWorkspace({
                    titleEnc: await this.$ver.aedEncryptText(workspace.aedKey, title, null)
                })
            )

            this.REPLACE_IN_LIST(await this.DECODE(user, res.getWorkspace()!))
        },

        async DELETE(workspace: IWorkspace): Promise<void> {
            if (workspace.sharedWithYou) {
                await this.$adapter.deleteShare(workspace.shareId)
            } else {
                await this.$adapter.deleteWorkspace(workspace.id)
            }

            this.REMOVE_FROM_LIST(workspace.id)
        }
    }
})

function NullWorkspace(): IWorkspace {
    return {
        id: "",
        shareId: "",
        title: "",
        sharedWithYou: false,
        aedKey: FakeCryptoKey(),
    }
}

interface IWorkspaceState {
    list: Array<IWorkspace>
    active: IWorkspace
}

export interface IWorkspace {
    id: string
    shareId: string
    aedKey: CryptoKey
    title: string
    sharedWithYou: boolean
}
