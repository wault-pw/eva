import {NavigationGuardNext} from "vue-router"
import {USER_STORE} from "@/store/USER"
import {Urn} from "@/lib/urn"

export default function(next: NavigationGuardNext): boolean {
    if (USER_STORE().IS_AUTHENTICATED) {
        return true
    }

    next(new Urn().login())
    return false
}
