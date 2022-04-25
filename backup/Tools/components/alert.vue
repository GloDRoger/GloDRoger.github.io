<!-- 需要用户操作的提示弹窗 -->
<template>
 <div id="alert" @click.self="Remove">
  <div class="title">
   <p class="title_html" v-html="title" @mousedown="Mousedown" @mouseup="isclick = false"></p>
   <span class="iconfont icon-cuo" @click="CLOSE"></span>
  </div>
  <div class="body" :class="type">
   <i v-background="'icon.png'" :class="type" class="type"></i>
   <p v-html="body"></p>
  </div>
  <div class="button">
   <!-- 确定 -->
   <span class="define" @click="DEFINE">{{yy.t('turnTable.t18')}}</span>
   <!-- 取消 -->
   <span v-text="cancel" class="cancel" v-if="cancel" @click="CANCEL">{{yy.t('message.q_qx')}}</span>
  </div>
 </div>
</template>

<script>
export default {
 data() {
  return {
   isclick: false,
   left: 0,
   top: 0,
   x: null,
   y: null,
    yy: window.yuYan,
  }
 },
 mounted() {
  document.onmousemove = null
 },
 watch: {
  isclick(to) {
   if (to) {
    document.onmousemove = (e) => {
     let event = e || window.event

     let height = document.documentElement.clientHeight
     let width = document.documentElement.clientWidth
     let elW = this.$el.offsetWidth / 2
     let elH = this.$el.offsetHeight / 2
     let x = event.clientX + elW
     let y = event.clientY + elH
     if (this.x) {
      if (this.$el.offsetLeft - elW < 0) {
       this.$el.style.left = elW + 'px'
      } else if (this.$el.offsetLeft + elW > width) {
       this.$el.style.left = width - elW + 'px'
      } else {
       this.$el.style.left = this.$el.offsetLeft + (x - this.x) + 'px'
      }
     }

     if (this.y) {
      if (this.$el.offsetTop - elH < 0) {
       this.$el.style.top = elH + 'px'
      } else if (this.$el.offsetTop + elH > height) {
       this.$el.style.top = height - elH + 'px'
      } else {
       this.$el.style.top = this.$el.offsetTop + (y - this.y) + 'px'
      }
     }
     this.x = x
     this.y = y
    }
   } else {
    document.onmousemove = null
   }
  },
 },
 methods: {
  DEFINE() {
   // 确定
   this.Define()
   document.body.removeChild(this.$el)
  },
  CANCEL() {
   // 取消
   this.Cancel()
   document.body.removeChild(this.$el)
  },
  CLOSE() {
   // 关闭
   this.Close()
   document.body.removeChild(this.$el)
  },
  Mousedown(e) {
   // 移动弹窗
   let event = e || window.event
   this.isclick = true
   this.left = this.$el.offsetLeft - this.$el.offsetWidth / 2 // 减去一半宽度是因为css  transform偏移X轴-50%
   this.top = this.$el.offsetTop - this.$el.offsetHeight / 2 // 减去一半宽度是因为css  transform偏移Y轴-50%
  },
  Remove() {
   document.body.removeChild(this.$el)
  },
 },
}
</script>

<style lang="scss" scoped>
#alert {
 width: 260px;
 min-height: 158px;
 background: #fff;
 position: fixed;
 border: 1px solid rgba(0, 0, 0, 0.1);
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 overflow: hidden;
 animation: big 0.3s forwards;
 z-index: 9999;
}
.title {
 height: 43px;
 line-height: 43px;
 width: 100%;
 font-size: 14px;
 color: #333;
 border-bottom: 1px solid #eee;
 position: relative;
 background-color: #f8f8f8;
 .title_html {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: move;
  user-select: none;
 }
 .icon-cuo {
  position: absolute;
  right: 10px;
  top: 0px;
  cursor: pointer;
  color: #2d2c3b;
  font-weight: bold;
 }
}
.body {
 padding: 20px 20px 20px 55px;
 box-sizing: border-box;
 font-size: 14px;
 position: relative;
 .type {
  width: 30px;
  height: 30px;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 15px;
  bottom: 0;
  margin: auto;
  background-position-x: -30px;
 }
 .error {
  background-position-x: -60px;
 }
 .warn {
  background-position-x: 60px;
 }
}
.error {
 color: red;
}
.true {
 color: #00ba9b;
}
.true {
 background-position-x: -30px;
}
.button {
 padding: 11px 10px 5px;
 display: flex;
 justify-content: flex-end;
 span {
  padding: 0 15px;
  height: 28px;
  line-height: 28px;
  margin: 6px 6px 0;
  font-size: 13px;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
 }
 .define {
  border-color: #4898d5;
  background-color: #2e8ded;
  color: #fff;
 }
 .cancel {
  border: 1px solid #dedede;
  background-color: #f1f1f1;
  color: #333;
 }
}
@keyframes big {
 from {
  transform: translateX(-50%) translateY(-50%) scale(0.3);
 }
 to {
  transform: translateX(-50%) translateY(-50%) scale(1);
 }
}
</style>
