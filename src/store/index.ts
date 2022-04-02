import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import persistedState from 'vuex-persistedstate'
import { IStoreType, TypeAllState } from "./type";
// import { TypeAllState, TypeRootState } from "./type";
const modulesFiles = import.meta.globEager("./modules/*.ts")
const modules: any = {}
// 匹配文件名   ./modules/[name].ts
const reg = /(?<=\/)(\w+)(?=\.)/g
Object.keys(modulesFiles).forEach(c => {
    const m = modulesFiles[c]
    const fileName = c.match(reg)![0]
    modules[fileName] = m.default
})
export const key: InjectionKey<Store<IStoreType>> = Symbol("vue-store")

export function useStore() {
    return baseUseStore(key)
}

export default createStore<IStoreType>({
    plugins: [
        // 持久化插件
        persistedState({
            key: "vue-store",
            paths: ["app"],
            storage: window.sessionStorage
        })
    ],
    modules,
})

