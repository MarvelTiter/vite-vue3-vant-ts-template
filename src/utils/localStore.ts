function setItem(key:string, value:any){
    let vStr = JSON.stringify(value)
    localStorage.setItem(key, vStr)
}

function getItem(key:string) : string | null{
    return localStorage.getItem(key)
}

function removeItem(key: string){
    localStorage.removeItem(key)
}

function clear() {
    localStorage.clear()
}

export default {
    setItem,
    getItem,
    removeItem,
    clear
}
