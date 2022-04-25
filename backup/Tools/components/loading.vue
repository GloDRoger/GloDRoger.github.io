<!-- 全局loading -->
<template>
 <div id="loading_g">
  <div class="loading_g_box">
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
  </div>
 </div>
</template>
<style lang="scss" scoped>
#loading_g {
 position: fixed;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 margin: auto;
 // width: 100%;
 // height: 100%;
 height: 40px;
 width: 60px;
 // background-color: rgba(0, 0, 0,.7);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 99999;
 .loading_g_box {
  height: 40px;
  display: flex;
  align-items: center;
  width: 60px;
  justify-content: space-between;
  span {
   display: inline-block;
   width: 8px;
   height: 100%;
   border-radius: 4px;
   background: #2f72f5;
   animation: load 1s ease infinite;
   &:nth-child(1) {
    height: 30px;
   }
   &:nth-child(2) {
    animation-delay: 0.2s;
    height: 50px;
   }
   &:nth-child(3) {
    animation-delay: 0.4s;
    height: 70px;
   }
   &:nth-child(4) {
    animation-delay: 0.6s;
    height: 50px;
   }
   &:nth-child(5) {
    animation-delay: 0.8s;
    height: 30px;
   }
  }
 }
}

@keyframes load {
 0%,
 100% {
  height: 40px;
  background: #2f72f5;
 }
 50% {
  height: 70px;
  margin: -15px 0;
  background: #42a0fe;
 }
}
</style>
