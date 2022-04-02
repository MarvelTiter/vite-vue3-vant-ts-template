// import { getCurrentInstance } from 'vue'
import { instance } from '@/lang'

// const i18n = useI18n()
// const i = getCurrentInstance()
function getContentByKey(key: string): string {
    const hasKey = instance.te(key)
    if (hasKey) {
        return instance.t(key)
    }
    return ""
}

export default function getPageTitle(key: string) {
    let pageName = getContentByKey(`route.${key}`)
    let title = getContentByKey("app.title")
    if (pageName && title)
        return `${pageName} - ${title}`
    else
        return "檢測線管理程序"
}
