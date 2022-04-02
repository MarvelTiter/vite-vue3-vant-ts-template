<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const store = useStore()

const key = computed(() => {
    return route.path
})
</script>
 
<template>
    <section class="app-main">
        <router-view :key="key" v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive cache>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>
 
<style scoped lang="scss">
</style>
