<script setup lang="ts">
import { ref, reactive, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SvgIcon from '@/components/SvgIcon/index.vue';

const route = useRoute()
const { proxy } = getCurrentInstance()!
const title = computed(() => {
    const pathName = route.meta.title as string
    return proxy!.$t(`route.${pathName}`)
})

const enableBack = computed(() => {
    return route.path !== "/dashboard"
})

const router = useRouter()
const goBack = () => {
    router.back()
}

</script>
 
<template>
    <van-nav-bar :title="title" :left-arrow="enableBack" v-on:click-left="goBack">
        <template #right>
            <SvgIcon icon-class="settings" class="setting"></SvgIcon>
        </template>
    </van-nav-bar>
</template>
 
<style scoped lang="scss">
.setting {
    font-size: 32px;
}
</style>
