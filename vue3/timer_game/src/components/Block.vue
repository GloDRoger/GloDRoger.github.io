<template>
    <div class="spin" v-show="!showBox">
        <n-spin :size="50"/>
    </div>
    <div class="box" v-show="showBox" @click="stopTimer">
        click me
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

    const props = defineProps(['delay'])
    const emit = defineEmits(['gameOver'])

    const showBox = ref(false)
    const timer = ref(null)
    const reactionTime = ref(0)

    onMounted(()=>{
        setTimeout(()=>{
            showBox.value = true
            startTimer()
        },props.delay)
    })

    function startTimer(){
        timer.value = setInterval(()=>{
            reactionTime.value += 10
        },10)
    }
    function stopTimer(){
        clearInterval(timer)
        emit('gameOver',reactionTime.value)
        // console.log('reactionTime',reactionTime.value)
    }

</script>

<style lang="scss" scoped>
.spin{
    width: 500px;
    height: 400px;
    margin: 50px auto 0;
    text-align: center;
    line-height: 400px;
}
.box{
    width: 500px;
    height: 400px;
    background-color: aqua;
    margin: 50px auto 0;
    padding-top: 15%;
    box-sizing: border-box;
}
</style>
