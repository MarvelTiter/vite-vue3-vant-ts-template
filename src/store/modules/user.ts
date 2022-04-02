import { Module } from "vuex"
import { IRootStateType } from "../type"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { login } from "@/api/user"

export interface TypeModuleUser {
    token: string | null,
    name: string,
    roles: string[],
    userId: string,
    powers: string[]
}

const module: Module<TypeModuleUser, IRootStateType> = {
    namespaced: true,
    state: {
        token: getToken(),
        name: "",
        roles: [],
        userId: "",
        powers: []
    },
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.token = payload;
        },
        SET_ROLES: (state, payload) => {
            state.roles = payload;
        },
        SET_ID: (state, payload) => {
            state.userId = payload;
        },
    },
    actions: {
        async login({ commit, dispatch }, userInfo): Promise<boolean> {
            try {
                let result = await login(userInfo)
                if (result.success) {
                    commit("SET_TOKEN", result.data!.token)
                    commit("SET_ID", userInfo.username)
                    setToken(result.data!.token)
                }
                return result.success
            } catch (error) {
                console.log(error)
                return false
            }
        },

        async getInfo({ commit, state }): Promise<{
            roles: string[]
        }> {
            let result = {
                roles: ['admin']
            }
            //   getUserRoleByUserId({param1:state.userId}).then(res=>{
            //     let {status, data, retmsg} = res
            //     if (status) {
            //       let roles = data.map(v=>v.roleName)
            //       commit("SET_ROLES", roles)
            //       result.roles = roles
            //       resolve(result)
            //     } else {
            //       reject(retmsg)
            //     }
            //   }).catch(e=>{
            //     reject(e)
            //   })
            return result
        },

        resetToken({ commit }) {
            return new Promise<void>(resolve => {
                commit("SET_TOKEN", "");
                commit("SET_ROLES", []);
                removeToken();
                resolve();
            });
        },
    }
}
export default module
