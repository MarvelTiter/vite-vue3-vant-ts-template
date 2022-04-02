import { createI18n } from 'vue-i18n'
import zhsVant from 'vant/es/locale/lang/zh-CN'
import zhtVant from 'vant/es/locale/lang/zh-TW'
import esESVant from 'vant/es/locale/lang/es-ES'
import enUSVant from 'vant/es/locale/lang/en-US'
import zhsLocale from './zhs'
import zhtLocale from './zht'
import enLocale from './en'
import esLocale from './es'
import localStore from '@/utils/localStore'

const messages = {
    en: {
        ...enLocale,
        ...enUSVant
    },
    zhs: {
        ...zhsLocale,
        ...zhsVant
    },
    zht: {
        ...zhtLocale,
        ...zhtVant
    },
    es: {
        ...esLocale,
        ...esESVant
    }
}

export function getLanguage() {
    const lang = localStore.getItem("lang")
    // if has not choose language
    const language = (lang || navigator.language).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'zhs'
}

const i18n = createI18n({
    globalInjection: true,
    legacy: false, // you must specify 'legacy: false' option
    locale: getLanguage(),
    messages,
});
export default i18n

export const instance = i18n.global
