import {UUID} from "@/lib/cryptos/util"
import {defineStore} from "pinia"
import {IWorkspace} from "@/store/WORKSPACE"
import {CardItem} from "@/desc/alice_v1_pb"
import _sortBy from "lodash/sortBy"

export const CARD_ITEM_STORE = defineStore("CARD_ITEM", {
    actions: {
        async LOAD(workspace: IWorkspace, cardID: string): Promise<Array<ICardItem>> {
            const res = await this.$adapter.listCardItems(workspace.id, cardID)
            const out: Array<ICardItem> = []

            for (const item of res.getItemsList()) {
                out.push(await this.DECODE(workspace, item))
            }

            return _sortBy(out, "position")
        },

        async DECODE(workspace: IWorkspace, item: CardItem): Promise<ICardItem> {
            return {
                id: item.getId(),
                cid: UUID(),
                position: item.getPosition(),
                hidden: item.getHidden(),
                title: await this.$ver.aedDecryptText(workspace.aedKey, item.getTitleEnc_asU8(), null),
                body: await this.$ver.aedDecryptText(workspace.aedKey, item.getBodyEnc_asU8(), null),
            }
        },

        async ENCODE(workspace: IWorkspace, item: ICardItem): Promise<ICardItemEnc> {
            return {
                id: item.id,
                hidden: item.hidden,
                titleEnc: await this.$ver.aedEncryptText(workspace.aedKey, item.title, null),
                bodyEnc: await this.$ver.aedEncryptText(workspace.aedKey, item.body, null),
            }
        }
    }
})

export interface ICardItem {
    id: string
    cid: string // used in UI for vue key property
    position: number
    title: string
    body: string
    hidden: boolean
}

export function NewCardItem(title: string, notes?: string): ICardItem {
    return {
        id: "",
        position: 0,
        cid: UUID(),
        title: title,
        body: notes ?? "",
        hidden: false
    }
}

export interface ICardItemEnc {
    id: string
    titleEnc: Uint8Array
    bodyEnc: Uint8Array
    hidden: boolean
}
