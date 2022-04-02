import { constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { Module } from 'vuex'
import { IRootStateType } from '../type'


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
    if (route.meta !== undefined) {
        let allow = route.meta.roles as string[]
        return roles.some(role => allow.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}

export interface TypeModulePermission {
    routes: RouteRecordRaw[],
    addRoutes: RouteRecordRaw[]
}

const module: Module<TypeModulePermission, IRootStateType> = {
    namespaced: true,
    state: {
        routes: [],
        addRoutes: [],
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
        }
    },
    actions: {
        generateRoutes({ commit }, roles: string[]) {
            return new Promise(resolve => {
                let accessedRoutes: RouteRecordRaw[] = []
                if (roles.includes('system')) {
                    accessedRoutes = []
                } else {
                    accessedRoutes = filterAsyncRoutes([], roles)
                }
                commit('SET_ROUTES', accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    }
}

export default module
