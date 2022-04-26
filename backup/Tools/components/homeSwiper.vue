<!-- 轮播组件 -->
<template>
 <div id="lunbotu">

  <div class="swiper-container gallery-top">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(data, index) in option" :key="index">
          <div class="top_img">
            <img :src="data.thumb" alt="" />
          </div>
        </div>
    </div>
  </div>

  <div class="line_box">
    <div 
      v-for="(dot,index) in 4" 
      :key="index+300" 
      class="line"
      :class="{activeDot : activeDot == index}"
    >
      <div class="dot"></div>
      <div class="t_progress"></div>
    </div>
  </div>

  <div class="thumbs_box">
    <ul class="thumbs">
      <li 
        class="thumb" 
        v-for="(item,index) in thumbsData" 
        :key="item.id + index"
        @click="swichBanner(index)"
        :class="activeTb === index ? 'activeTb' : '' "
      >
        <img :src="item.thumb" alt="">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
  
  
 </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
const rollNotice = utils.dynamicImportComponents('rollnotice')

export default {
 components: { rollNotice },
 props: {
  view: {
   // 显示所少个视图
   type: [Number, String],
   default: 1,
  },
  option: {
   type: [Object, Array, Number],
   default: function () {
    return []
   },
  },
  name: {
   // swiper 的实例化的名称 唯一
   type: String,
   default: 'swiperss',
  },
  loop: {
   type: Boolean,
   default: false,
  },
  slidesPerColumn: {
   type: Number,
   default: 1,
  },
  isEsports: {
   type: Boolean,
   default: false,
  },
  autoplay: {
   type: Number | Boolean,
   default: 2000,
  },
  swiperPage: {
   // 分页class 为空不显示分页
   type: String,
   default: '',
  },
  slidesPerGroup: {
   // 在carousel mode下定义slides的数量多少为一组
   type: Number,
   default: 1,
  },
  width: {
   // swiper 的高度 游戏页面一般会使用
   type: String | Number,
   default: '100%',
  },
  height: {
   // swiper 的高度 游戏页面一般会使用
   type: String,
   default: '100%',
  },
  nextButton: {
   // 下一页的class名称
   type: String,
   default: '',
  },
  slidesPerColumnFill: {
   type: String,
   default: 'row',
  },
  prevButton: {
   // 上一页的class名称
   type: String,
   default: '',
  },
  color: {
   // 小圆点默认颜色
   type: String,
   default: '#000',
  },
  activeColor: {
   // 选中状态默认颜色
   type: String,
   default: 'red',
  },
 },
 data() {
  return {
   activeTb:0,//当前的缩略图
   activeDot:0,//当前的进度条
  }
 },
 computed:{
   thumbsData(){
     //手动复制第一页用作最后一页，做循环效果
     const arr1 = this.option.filter((i,index)=> index < 4)
     const arr = this.option
     return arr.concat(arr1)
   },
 },
 created() {
 },
 beforeDestroy() {
  this.galleryThumbs = null
  this.galleryTop = null
 },
 mounted() {
  if (this.option) {
   this.install()
  }
 },
 methods: {
  install() {
   if (this.option && this.option.length) {
    this.$nextTick(() => {
      const _this = this
      this.galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        autoplay: this.autoplay
        ? {
            delay: this.autoplay,
            disableOnInteraction: false,
          }
        : false, // 自动轮播时间
        on:{
          slideChange(){
            //realIndex第一个是0 previousIndex第一个1
            _this.activeTb = this.realIndex

            //点
            if((this.realIndex + 1) % 4){
              _this.activeDot = (this.realIndex + 1) % 4 - 1
            }else{
              _this.activeDot = 3
            }
            
            //根据大图换页
            const thumbs = document.getElementsByClassName('thumbs')[0]
            const h = 516 //每页高度
            let page ,move
            page = Math.ceil((this.realIndex + 1) / 4) - 1 //第几页
            move = page * h //移动总距离
            thumbs.style.transform = `translateY(-${move}px)`

            if(this.realIndex === 0 && this.previousIndex === _this.option.length){
              //由最后一张切换至第一张
              page = Math.ceil((this.previousIndex + 1) / 4) - 1 //previousIndex第一个值是1，加1正好是复制出来的最后一页
              move = page * h
              thumbs.style.transform = `translateY(-${move}px)`
              setTimeout(()=>{ //过渡动画完之后再取消过度动画并切换回第一页
                thumbs.style.transition = 'all ease-out 0s'
                thumbs.style.transform = `translateY(0px)`
                setTimeout(()=>{
                  thumbs.style.transition = '' //恢复动画
                },100)
              },300)
            }

          },
        },
      })
    })
   }
  },
  swichBanner(index){
    this.galleryTop.slideTo(index+1,500,false)
  },
 },
}
</script>

<style lang="scss" scoped>
#lunbotu {
 height: 100%;
 width: 100%;
 display: flex;
 .line_box {
  height: 100%;
  width: 2px;
  background-color: #9BA3C4;
  border-radius: 5px;
  margin: 0 25px;
  .line{
    position: relative;
    width: 2px;
    height: 25%;
    .dot{
      position: absolute;
      width: 8px;
      height: 8px;
      background-color:#9BA3C4 ;
      border-radius: 50%;
      left: -3px;
      top: 0;
    }
    .t_progress{
      position: absolute;
      left: -1px;
      width: 4px;
      height: 0;
      background-color:#3e96fc;
    }
  }
  .activeDot{
    .dot{
      background-color:#3e96fc ;
    }
    .t_progress{
      animation: 3.1s grow linear forwards;
    }
  }
  @keyframes grow {
    from{
      height: 0;
    }
    to{
      height: 102%;
    }
  }
 }
 .thumbs_box{
   flex-grow: 1;
   max-width: 425px;
   height: 500px;
   overflow: hidden;
 }
 .thumbs{
   transition: all ease-out 0.3s;
   .thumb{
      height:102px;
      background-color:#fff;
      border-radius:10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      box-shadow:0px 2px 10px #d2dfea;
      box-sizing: border-box;
      border:2px solid; 
      border-color:#fff;
      margin-bottom: 27.3px;
     img{
       width: auto;
       height: 102px;
       border-radius:8px;
       margin-right: 18px;
     }
     span{
      font-family: PingFang SC;
      font-weight: 500;
      color: #0b213b;
      font-size: 20px;
     }
   }
   .activeTb{
      border-color:#3e96fc;
      box-shadow:0px 1px 16px #3d95fb inset;
      padding-left: 12px;
      img{
        height: 78px;
      }
   }
 }
}

.gallery-top {
 width: 70%;
 max-width: 1344px;
 height: 490px;
 margin: 0;
 box-shadow:0px 2px 10px #d2dfea;
 border-radius: 10px;
 .top_img {
  img {
   width: 100%;
   height: 490px;
   border-radius: 10px;
  }
 }
}
</style>
