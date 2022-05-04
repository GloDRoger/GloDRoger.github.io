<template>
    <div>
        <h2>游戏结束！</h2>
        <p>你的反应时间是：{{time}}秒</p>
    </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core"


    const props = defineProps(['result'])

    const time = computed(()=> props.result / 1000)

</script>

<style lang="scss" scoped>
div{
    width: 500px;
    height: 400px;
    background-color:#fff;
    margin: 50px auto 0;
    padding-top: 15%;
    box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgb(146, 145, 145);
}
</style>