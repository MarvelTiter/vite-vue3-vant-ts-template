import { useStore } from "@/store";
import { ActionSheetAction } from "vant";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

export function useActionSheet() {
    const panelVisible = ref(false);

    const store = useStore()

    const i18n = useI18n()

    const currentLanguage = computed(() => {
        return store.state.app.language
    })

    const langs = ['zhs', 'zht', 'en', 'es']

    // disabled: currentLanguage.value === langs[0]
    const actions: ActionSheetAction[] = reactive([
        { name: '简体中文' },
        { name: '繁体中文' },
        { name: 'English' },
        { name: '葡萄牙語' },
    ]);
    const actionCallback = (action: ActionSheetAction, index: number) => {
        i18n.locale.value = langs[index]
        store.dispatch("app/setLanguage", langs[index])
    }
    return {
        panelVisible,
        actions,
        actionCallback,
        currentLanguage
    }
}
