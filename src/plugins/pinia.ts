import {IAdapter} from "@/lib/adapter/adapter.interface"
import {Ver} from "@/lib/ver"

declare module 'pinia' {
    interface PiniaCustomProperties {
        $adapter: IAdapter
        $ver: Ver
    }
}
