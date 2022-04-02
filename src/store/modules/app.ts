import { Module } from "vuex"
import { IRootStateType } from "../type"
import { Store, useStore as useVuexStore } from "vuex"
import { getLanguage } from "@/lang"
import localStore from "@/utils/localStore"

export interface TypeModuleApp {
    language: string,
    keyStr: string,
    size: string,
    token: string
}

const module: Module<TypeModuleApp, IRootStateType> = {
    namespaced: true,
    state: {
        language: getLanguage(),
        keyStr: "HFp0kS+tve9xb+r9KsEJ1A==",
        size: localStore.getItem("size") || "medium",
        token: "",
    },
    mutations: {
        SET_LANGUAGE(state, payload) {
            localStore.setItem("lang", payload)
            state.language = payload
        },
        SET_KEY(state, payload) {
            state.keyStr = payload
        },
    },
    actions: {
        setLanguage({ commit }, payload) {
            commit("SET_LANGUAGE", payload);
        },
        setKeyString({ commit }, payload) {
            commit("SET_KEY", payload)
        },
    }
}

export default module
