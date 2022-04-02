<script setup lang="ts">
import { ref, reactive } from 'vue';
const username = "陈大伟"
const position = "汽车检验"
const status = "空闲"
</script>
 
<template>
    <div class="container">
        <div class="avator">
            <img />
        </div>
        <div class="info">
            <p>姓名: {{ username }}</p>
            <p>岗位: {{ position }}</p>
            <p>姿态: {{ status }}</p>
        </div>
    </div>
</template>
 
<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    .avator {
        img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
            border: 1px solid #cccccc;
        }
    }
    .info {
        p {
            text-align: left;
            margin-left: 20px;
        }
    }
}
</style>
