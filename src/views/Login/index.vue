<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import LangSelect from '@/components/LangSelect/index.vue';
import { FormInstance } from 'vant';
import { fromJSON } from 'postcss';
import { useStore } from '@/store';
import { LocationQuery, useRoute, useRouter } from 'vue-router';
const loginForm = reactive({
    username: 'atos',
    password: 'atos.qwe123',
})

const loading = ref(false)
const redirect = ref()
const otherQuery = ref()
const store = useStore()
const route = useRoute()
const router = useRouter()

const getOtherQuery = (query: LocationQuery) => {
    return Object.keys(query).reduce((acc: any, cur) => {
        if (cur !== 'redirect') {
            acc[cur] = query[cur]
        }
        return acc
    }, {})
}

watch(route, r => {
    const query = r.query
    if (query) {
        redirect.value = query.redirect
        otherQuery.value = getOtherQuery(query)
    }
}, { immediate: true })

const formRef = ref<FormInstance>()
const handleLogin = async () => {
    loading.value = true
    try {
        let flag = await store.dispatch("user/login", loginForm)
        if (flag) {
            router.push({
                path: redirect.value || "/",
                query: otherQuery.value
            })
        }
    } catch (error) {

    }
    loading.value = false
}
</script>
<template>
    <div class="login-container">
        <div class="title-container">
            <span class="title">
                {{ $t('login.title') }}
                <lang-select class="set-language" />
            </span>
        </div>
        <van-form ref="formRef" class="login-form" label-position="left">
            <van-cell-group>
                <van-field v-model="loginForm.username" :placeholder="$t('login.username')" tabindex="1" autocomplete="on" :rules="[{ required: true, message: 'required' }]">
                    <template #left-icon>
                        <span class="svg-container">
                            <svg-icon icon-class="user" />
                        </span>
                    </template>
                </van-field>

                <van-field
                    v-model="loginForm.password"
                    type="password"
                    :placeholder="$t('login.password')"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.enter.native="handleLogin"
                    :rules="[{ required: true }]"
                >
                    <template #left-icon>
                        <span class="svg-container">
                            <svg-icon icon-class="password" />
                        </span>
                    </template>
                </van-field>
            </van-cell-group>

            <van-button :loading="loading" type="primary" style="width:100%;margin-top:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</van-button>
        </van-form>
    </div>
</template>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 180px;
    .login-form {
        width: 100%;
        padding: 20px;
    }
    .svg-container {
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        color: white;
        padding: 20px;
        .title {
            position: relative;
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
            .set-language {
                color: #fff;
                position: absolute;
                top: 6px;
                font-size: 18px;
                right: -25px;
                cursor: pointer;
            }
        }
    }
}
</style>
