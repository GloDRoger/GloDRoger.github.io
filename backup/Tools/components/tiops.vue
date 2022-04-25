<!-- 不需要用户点击的提醒 -->
<template>
 <div class="tiops" :class="type">
  <span class="iconfont" :class="type === 'error' ? 'icon-cuo' : 'icon-check'"></span>
  {{ message }}
 </div>
</template>

<script>
export default {
 mounted() {
  this.$nextTick(() => {
   let allChild = document.getElementsByClassName('tiops')
   for (var i = 0; i < allChild.length; i++) {
    if (i == 0) {
     allChild[i].style.top = '20px'
    } else {
     allChild[i].style.top = allChild[i - 1].offsetTop + allChild[i].offsetHeight + 20 + 'px'
    }
   }
  })
  let top = setTimeout(() => {
   let allChild = document.getElementsByClassName('tiops')
   for (var i = 0; i < allChild.length; i++) {
    allChild[i].style.top = allChild[i].offsetTop - allChild[i].offsetHeight - 20 + 'px'
   }
   setTimeout(() => {
    document.body.removeChild(this.$el)
    clearTimeout(allChild)
   }, 1000)
   clearTimeout(top)
  }, 2000)
 },
}
</script>

<style lang="scss" scoped>
.tiops {
 min-width: 380px;
 height: 40px;
 background-color: #f0f9eb;
 border: 1px solid #e1f3d8;
 position: fixed;
 left: 50%;
 top: 0;
 margin: auto;
 z-index: 1005;
 border-radius: 5px;
 display: flex;
 align-items: center;
 padding: 15px;
 box-sizing: border-box;
 overflow: hidden;
 transform: translateX(-50%);
 transition: top 0.3s;
 font-size: 14px;
}
.iconfont {
 width: 13px;
 height: 13px;
 line-height: 15px;
 font-size: 13px;
 border-radius: 100%;
 color: #fff;
 text-align: center;
 margin-right: 10px;
}
.error {
 background-color: #fef0f0;
 border-color: #fde2e2;
 color: #f56c6c;
 .icon-cuo {
  background: #f56c6c;
  font-size: 12px;
 }
}
.correct {
 color: #67c23a;
 .icon-check {
  background: #67c23a;
 }
}
</style>
