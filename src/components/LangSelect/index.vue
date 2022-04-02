<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ActionSheetAction, Toast } from 'vant';
import SvgIcon from '../SvgIcon/index.vue';
import { useActionSheet } from './makeActionSheet';

const { panelVisible, actions, actionCallback, currentLanguage } = useActionSheet()

</script>
 
<template>
    <div v-bind="$attrs">
        <SvgIcon icon-class="international" @click="panelVisible = true">Lang</SvgIcon>
        <van-action-sheet v-model:show="panelVisible" cancel-text="取消" :actions="actions" close-on-click-action @select="actionCallback"></van-action-sheet>
    </div>
</template>
 
<style scoped lang="scss">
</style>

