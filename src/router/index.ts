import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import LoginMpaView from "@/views/LoginMpaView.vue"
import JoinView from "@/views/JoinView.vue"
import WorkspaceListView from "@/views/WorkspaceListView.vue"
import WorkspaceView from "@/views/WorkspaceView.vue"
import LoginSpaView from "@/views/LoginSpaView.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: LoginMpaView
    },{
        path: '/spa',
        component: LoginSpaView
    }, {
        path: '/join',
        component: JoinView
    },  {
        path: '/workspaces',
        component: WorkspaceListView,
    },  {
        path: '/workspaces/:id',
        component: WorkspaceView,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
