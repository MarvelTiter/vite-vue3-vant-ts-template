<script setup lang="ts">
import { isExternal } from '@/utils/validate';
import { ref, reactive, computed, Prop } from 'vue';

const prop = defineProps({
    iconClass: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        default: ''
    }
})

const testExternal = computed(() => {
    return isExternal(prop.iconClass)
})
const svgClass = computed(() => {
    if (prop.className) {
        return 'svg-icon ' + prop.className
    } else {
        return 'svg-icon'
    }
})
const iconName = computed(() => {
    return `#icon-${prop.iconClass}`
})
const styleExternalIcon = computed(() => {
    return {
        mask: `url(${prop.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${prop.iconClass}) no-repeat 50% 50%`
    }
})
</script>
 
<template>
    <div
        v-if="testExternal"
        :style="styleExternalIcon"
        class="svg-external-icon svg-icon"
        v-bind="$attrs"
    />
    <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
        <use :xlink:href="iconName" />
    </svg>
</template>
 
<style scoped lang="scss">
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
