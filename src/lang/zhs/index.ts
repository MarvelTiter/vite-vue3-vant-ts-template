
const modulesFiles = import.meta.globEager("./modules/*.ts")
const modules: any = {}
// 匹配文件名   ./modules/[name].ts
const reg = /(?<=\/)(\w+)(?=\.)/g
Object.keys(modulesFiles).forEach(c => {
    const m = modulesFiles[c]
    const fileName = c.match(reg)![0]
    modules[fileName] = m.default
})
export default modules
