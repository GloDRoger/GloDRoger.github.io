<template>
  <h1>测试反应时间</h1>
  <button @click="start" :disabled="isPlay">开始</button>
  <Block v-if="isPlay" :delay="delay" @gameOver="showResult" />
  <Result :result="result" v-if="!isPlay && result"/>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Block from './components/Block.vue';
import Result from './components/Result.vue';

  const isPlay = ref(false)
  const delay = ref(null)
  const result = ref('')

  function start(){
    delay.value = 2000 + Math.random() * 5000
    isPlay.value = true
  }

  function showResult(v){
    isPlay.value = false
    result.value = v
    // console.log('gameOver',v)
  }

  onMounted(()=>{
    // console.log('挂载了。',delay.value)
  })

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
