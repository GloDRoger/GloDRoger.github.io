<template>
  <div class="app">
    <h1>This is a Bio project</h1>
    <div>{{a}}</div>
    <button @click="a++">+</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      a:1
    }
  },
}
</script>

<style lang='scss'>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  width: 100%;
  height: 100vh;
  background:linear-gradient(60deg,rgb(71, 179, 241),rgb(163, 124, 240));
  padding-top: 20%;
  h1{
    color: #fff;
    text-align: center;
    font-size: 25px;
  }

}
</style>