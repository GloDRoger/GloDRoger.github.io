<!-- 首页 -->
<template>
  <div id="home" ref="home">
    <home-header style="position: fixed; top: 0; z-index: 30"></home-header>
    <div class="main">
      <!-- 首页轮播 -->
      <div class="swiper_home" v-if="webConfig">
        <div class="swiper-container" id="home_swiper">
          <!-- 轮播图片 -->
          <div class="swiper-wrapper" ref="swiper">
            <div
              class="swiper-slide"
              v-for="(swiperList, index) in swipersHome"
              :key="index"
              :data-href="swiperList.path"
              :style="'backgroundImage:url(' + swiperList.thumb + ')'"
            ></div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <van-sticky offset-top="66" z-index="29">
        <div class="user_info" ref="userInfo">
          <div class="top">
            <span v-if="userState == 0">{{ $t("tag13") }}</span>
            <span v-if="userState == 1"
              >{{ $t("tag14") }}{{ userInfo.user_name }}</span
            >
            <span v-if="userState == 2"
              >{{ $t("tag15") }} {{ $t("in.shiwan") }} Account</span
            >
          </div>
          <div class="bottom">
            <div class="left">
              <div class="login" v-if="userState <= 0">
                <router-link to="/login">{{ $t("tag12") }}</router-link>
              </div>
              <div class="money" v-else>
                <span>{{ $t("tag11") }}</span>
                <i
                  class="iconfont icon-shuaxin1"
                  @click="MoneyRefs"
                  ref="refsBtn"
                ></i>
                <p>{{ $t("fuuhao") }} {{ userInfo.money }}</p>
              </div>
            </div>
            <div class="right">
              <ul>
                <li class="deposit">
                  <div @click="$router.push('/pay')">
                    <i class="iconfont icon-meiyuan8"></i>
                    <span>{{ $t("tag10") }}</span>
                  </div>
                </li>
                <li class="withdraw">
                  <div @click="$router.push('/withdraw')">
                    <i class="iconfont icon-jinqian-"></i>
                    <span>{{ $t("tag9") }}</span>
                  </div>
                </li>
                <li class="promotion" v-if="!isb72">
                  <div @click="$router.push('/userNews')">
                    <i class="iconfont icon-zhanneixin_f"></i>
                    <span>{{ $t("letter2") }}</span>
                  </div>
                </li>
                <li class="promotion" v-if="isb72">
                  <div @click="$router.push('/activity')">
                    <i class="iconfont icon-youhui"></i>
                    <span>{{ $t("tag8") }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </van-sticky>
      <div class="game_box">
        <div class="left" ref="left">
          <div class="game_nav" v-for="(item, index) in nav" :key="index">
            <div
              @click="GetgameList(index)"
              :class="{ navActive: index == currentIndex }"
              class="item"
            >
              <i style="display: inline-block; width: 18px">
                <img
                  style="width: 18px; vertical-align: middle"
                  :src="item.image"
                  alt=""
                />
              </i>
              <span>{{ yuyan === 'CN' ? item.name_cn : item.name_en }}</span>
            </div>
          </div>
        </div>
        <div class="right" ref="right">
          <div ref="right-wrapper">
            <div
              v-for="(list, index1) in nav"
              :key="index1"
              :class="list.is_ys"
              class="gameBox"
            >
              <div
                v-if="list.is_ys === 'egame'"
                class="game_list"
                @touchstart="getAnimail($event)"
              >
                <div @click="handleNewActivity">
                  <img :src="$gameIcon(1)" class="label" />
                  <img v-src="'lihe.svg'" alt="" class="logo logo_zreo" />
                </div>
              </div>
              <div
                v-for="(data, index2) in list.subChildren"
                :key="index2"
                class="game_list"
                @touchstart="getAnimail($event)"
              >
                <div v-if="data.sub_tag != 'more'" @click="$ongame(data)">
                  <img
                    :src="$gameIcon(data.tag)"
                    v-if="data.tag"
                    class="label"
                  />
                  <img :src="yuyan === 'CN' ? data.image : data.image2 " alt="" class="logo" />
                </div>
                <div v-else>
                  <img
                    :src="`/static/comm/websiteDefault/x30/${list.is_ys}_more${yuyan==='EN'?'en':''}.png`"
                    alt=""
                    class="logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import BScroll from "better-scroll";

const homeHeader = utils.dynamicImportComponents("homeHeader");
import { isb72 } from "@/utils/constant";

export default {
  components: {
    homeHeader,
  },
  data() {
    return {
      device: window.siteHeaders.device, //判断是否是APP
      gameShow: false,
      dev: process.env.NODE_ENV === "development",
      isSkeleton: true,
      isb72: isb72,
      bScroll: "",
      listHeight: [],
      RightDistance: 0, //实时获取右侧当前y轴的高度
      isShowAppBanner: true,
    };
  },
  computed: {
    swipersHome() {
      //轮播数据
      let swiper = [];
      let image = this.$store.state.webConfig.slides;
      image.map((data) => {
        // 遍历出首页的轮播图
        if (data.weizhi === 1) {
          swiper.push(data);
        }
      });
      return swiper;
    },
    webConfig() {
      return this.$store.state.webConfig;
    }, //网站基本信息
    userState() {
      return this.$store.state.user.userState;
    }, //登录状态
    userInfo() {
      return this.$store.state.user.userInfo;
    }, //用户信息
    yuyan(){
      return this.$store.state.language;
    },
    nav() {
      let nav = [...this.$store.state.nav];
      nav.map((item) => {
        if (item.subChildren.length % 2 !== 0 && item.is_ys !== "egame") {
          item.subChildren.push({ sub_tag: "more" });
        } else if (
          item.subChildren.length % 2 === 0 &&
          item.is_ys === "egame"
        ) {
          item.subChildren.push({ sub_tag: "more" });
        }
      });
      return nav;
    },
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        //当height2不存在的时候，或者落在height和height2之间的时候，直接返回当前索引
        if (
          !height2 ||
          (this.RightDistance >= height && this.RightDistance < height2)
        ) {
          return i;
        }
      }
      //如果this.listHeight没有，返回0
      return 0;
    },
  },
  created() {
    this.$store.dispatch("SHOW_REDBAO");
  },
  mounted() {
    if (this.$store.state.user.userState === 1) {
      this.$store.dispatch("GET_NOTIFICATIONS");
    }
    this.$nextTick(() => {

      // swiper slider数量不足2个时
      if (this.swipersHome.length > 1) {
        // 实例化swiper
        var that = this;
        let Swiper = this.$swiper;
        var swiper = new Swiper("#home_swiper", {
          slidesPerView: 1.3,
          loop: true,
          centeredSlides: true,
          autoplayDisableOnInteraction: false,
          autoplay: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: ".swiper-pagination",
          },
          on: {
            //点击跳转连接
            click: function (event) {
              if (
                event.target.getAttribute("data-href") != 0 &&
                event.target.getAttribute("data-href") != null
              ) {
                if (
                  event.target.getAttribute("data-href").toString().indexOf('dzp') !== -1) {
                  that.NavClick(13);
                  return
                }
                let dev = {
                  type: "shareClick",
                  data: {
                    url: event.target.getAttribute("data-href"),
                    ish: "1",
                    color: that.$store.state.color.headerBg,
                  },
                };
                that.$device(dev);
              }

            },
          },
        });
      }

      // 解决由于transition导致dom延迟渲染而导致获取不到高度的问题
      var magic = setInterval(() => {
        let elm = document.getElementsByClassName("gameBox");
        if (elm[0].offsetHeight !== 0) {
          this.GetHeight();
          clearInterval(magic);
        }
      }, 300);

      this.InitScroll();
    });
  },
  methods: {
    InitScroll() {
      //初始化滚动
      this.rights = new BScroll(this.$refs.right, {
        click: true,
        probeType: 3,
        stopPropagation: true, //是否静止外层滚动
      });
      this.rights.on("scroll", (pos) => {
        //监听右侧滚动距离
        this.RightDistance = Math.abs(Math.round(pos.y));
      });
    },
    GetHeight() {
      //获取盒子滚动距离组成数组
      let rightItems = document.getElementsByClassName("gameBox");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i];
        height += item.offsetHeight - 20;
        this.listHeight.push(height);
      }
    },

    GetgameList(index) {
      let rightItems = document.getElementsByClassName("gameBox");
      let el = rightItems[index];
      this.rights.scrollToElement(el, 300);
    },
    getAnimail(event) {
      if (event.target.classList.contains("gameActive")) {
        event.target.classList.remove("gameActive");
        setTimeout(() => {
          event.target.classList.add("gameActive");
        }, 20);
      } else {
        event.target.classList.add("gameActive");
      }
    },
    ScollDown(callback) {
      // 下拉刷新
      this.$loading.show();
      this.$store
        .dispatch("INSTALL")
        .then((res) => {
          callback();
        })
        .catch((err) => {
          callback();
        });
    },
    GoTx() {
      //跳转到提现页面
      localStorage.setItem("href", "/home"); //需要将当前页面路由储存，用于提现的路由拦截
      this.$router.push("/withdraw");
    },
    MoneyRefs() {
      // 刷新余额
      this.$refs.refsBtn.style.transition = " transform 70s";
      this.$refs.refsBtn.style.transform = "rotate(-36000deg)";
      this.$store.commit("USER_STATE", (callback) => {
        this.$refs.refsBtn.style.transition = " transform 5s ease-out";
        this.$refs.refsBtn.style.transform = "rotate(-1800deg)";
        let resf = setTimeout(() => {
          this.$refs.refsBtn.style = "";
          clearTimeout(resf);
        }, 5000);
      });
    },
    handleNewActivity() {
      this.$router.push("/recommend");
    },
    NavClick(id) {
      this.$store.dispatch("GET_TURNINGINFO",{id,ispop: true});
    },
  },
};
</script>

<style lang='scss'>
$game_list_bg: #fff !default;
$game_list_span: #5b5555 !default;
.banner-container {
  position: fixed;
  bottom: 47px;
  width: 100%;
}

.slide-duration {
  animation-duration: 1s;
  transition-duration: 1s;
}

#home {
  width: 100%;
  min-height: 100%;
  background-color: #000;
  scroll-behavior: smooth;
  .main {
    background: #010101;
    padding-top: 62px;
    >>>.van-sticky--fixed{
      z-index: 29;
    }
    .swiper_home {
      height: auto;
      width: 100%;
      background-color: #010101;
      position: relative;

      > #home_swiper {
        width: 100%;
        overflow: hidden;
        height: 130px;
        text-align: center;
        padding-top: 7px;

        .swiper-slide {
          border-radius: 7px;
          transition: 300ms;
          transform: scale(0.8);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .swiper-slide-active {
          transform: scale(1);
          width: 100%;
        }

        .swiper-pagination-bullet {
          width: 11px;
          height: 11px;
        }

        .swiper-pagination-bullet-active {
          background-color: #7d4e28;
        }
      }
    }

    .user_info {
      margin: 0 4px;
      width: 367px;
      height: 80px;
      border-radius: 6px;
      position: relative;
      box-sizing: border-box;
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.3);

      .top {
        background-color: #504d4d;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 6px;
        height: 25px;
        font-weight: 100;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;

        span {
          font-size: 12px;
          margin-left: 15px;
        }
      }

      .bottom {
        height: 54px;
        background-color: #282626;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        display: flex;
        align-items: center;

        .left {
          float: left;
          font-size: 12px;
          width: 30%;
          height: 40px;
          text-align: center;
          border-right: 2px solid #504d4d;

          .login {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;

            a {
              padding: 5px 10px;
              border: 1px solid #f6f605;
              color: #f6f605;
              border-radius: 15px;
              font-size: 12px;
            }
          }

          .money {
            padding-top: 6px;
            position: relative;

            span {
              color: #ffffff;
              font-size: 12px;
            }

            > i {
              color: #ffffff;
              margin-left: 5px;
              position: absolute;
              top: 4px;
              right: 8px;
            }

            p {
              color: #f6f605;
              font-size: 12px;
              line-height: 20px;
            }
          }
        }

        .right {
          height: 40px;
          width: 70%;

          ul {
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            li {
              display: inline-block;
              width: 25%;
              height: 100%;
              vertical-align: top;

              div {
                display: inline-block;
                width: 100%;
                height: 100%;
                font-size: 12px;
                text-align: center;

                i {
                  line-height: normal;
                  font-size: 20px;
                }

                span {
                  display: block;
                  color: #ffffff;
                  font-size: 12px;
                }
              }
            }

            .deposit {
              i {
                background: -webkit-linear-gradient(
                  66deg,
                  #3bceff 0,
                  #0baafe 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            .withdraw {
              i {
                background: -webkit-linear-gradient(
                  66deg,
                  #ffaf2a 0,
                  #fe7b0b 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            .promotion {
              i {
                background: -webkit-linear-gradient(
                  66deg,
                  #f94461 0,
                  #e93249 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
      }
    }

    .game_box {
      display: flex;
      color: #fff;
      margin: 10px 0;
      height: 460px;
      padding-bottom: 50px;
      justify-content: space-between;

      .left {
        width: 88px;
        height: 100%;
        overflow: hidden;
        margin: 0 10px;

        &::-webkit-scrollbar {
          display: none;
        }

        .game_nav {
          width: 100%;
          display: flex;
          flex-direction: column;

          .item {
            width: 100%;
            height: 48px;
            margin-bottom: 9px;
            background-color: #565050;
            color: #ffffff;
            font-size: 13px;
            line-height: 48px;
            padding-left: 7px;
            border-radius: 6px;
            box-sizing: border-box;

            > span {
              display: inline-block;
              // width: 58px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 18px;
              vertical-align: middle;
            }
          }

          > .navActive {
            background-color: #dbce22;
          }
        }
      }

      .right {
        flex: 1;
        width: 287px;
        height: 100%;
        overflow: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
        .gameBox {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 100px;
          row-gap: 8px;
          grid-auto-flow: dense;
          height: fit-content;
          margin-bottom: 8px;

          &:last-child {
            min-height: 450px;
          }

          .game_list {
            height: 100px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .label {
              position: absolute;
              right: 21px;
              top: 3px;
              width: 32px;
            }

            .logo {
              width: calc(100% - 10px);
              max-height: 100px;
              border-radius: 10px;
            }

            .logo_zreo {
              width: 131px;
              max-height: 100px;
            }

            .gameActive {
              animation: gameActive 0.5s;
            }
          }
        }

        .gameBox:nth-child(1) {
          padding-top: 5px;
        }
      }
    }

    .swiper-container-list .swiper-slide {
      padding-bottom: 60px;
    }
  }

  > .gamePoput {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;

    .content {
      width: 338px;
      height: 415px;
      border-radius: 6px;
      margin: 150px auto;
      display: flex;
      flex-direction: column;
      border: 1px solid transparent;
      background-clip: padding-box, border-box;
      background-origin: border-box;
      background-image: linear-gradient(#eee, #eee),
        /* 底色，即原有的背景 */ linear-gradient(#6b95ac, #9198e5);

      .title {
        height: 40px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #504d4d;
        font-size: 16px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        color: #ffffff;

        > i {
          font-size: 20px;
        }
      }

      .game_list {
        flex: 1;
        overflow: hidden;
        background-color: $game_list_bg;

        .scrollBox {
          width: 100%;

          > li {
            float: left;
            width: 33.3%;
            height: 80px;
            border-bottom: 2px solid #5b5555;
            font-size: 14px;
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;

            > .game_logo {
              width: 80px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;

              > img {
                width: 45px;
                max-height: 100%;
              }
            }

            > span {
              color: $game_list_span;
              margin-top: 5px;
            }

            > .icon {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 20px;
              height: 20px;
              background-color: red;
              position: absolute;
              top: 0;
              left: 10px;
              border-radius: 50%;
              font-size: 12px;
              animation: icon 0.5s infinite;
            }

            > .icon:after {
              content: "";
              position: absolute;
              top: 14px;
              right: -3px;
              width: 0;
              height: 0;
              border-right: 3px solid transparent;
              border-left: 3px solid transparent;
              border-top: 6px solid red;
              transform: rotate(-60deg);
              animation: after 0.5s infinite;
            }

            > .icon2 {
              width: 50px;
              height: 20px;
              border-radius: 5px;
            }

            > .icon2:after {
              right: 10px;
              top: 20px;
              transform: rotate(0);
            }

            @keyframes icon {
              0% {
                background-color: red;
                color: #fff;
              }
              25% {
                background-color: yellow;
                color: red;
              }
              50% {
                background-color: yellow;
                color: red;
              }
              100% {
                background-color: red;
                color: #fff;
              }
            }
            @keyframes after {
              0% {
                border-top-color: red;
              }
              25% {
                border-top-color: yellow;
              }
              50% {
                border-top-color: yellow;
              }
              100% {
                border-top-color: red;
              }
            }
          }
        }
      }
    }
  }

  .load {
    height: 50px;
    width: 100%;
    //position: fixed;
    bottom: 47px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.589);

    img {
      width: 88%;
    }

    > span {
      color: #fff;
      margin-left: 7px;
    }
  }

  .load2 {
    height: 50px;
    width: 100%;
    //position: fixed;
    bottom: 47px;
    left: 0;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.589);

    > p {
      display: flex;
      align-items: center;

      > span {
        color: #b0b0b0;
        font-size: 22px;
        margin-right: 10px;
        margin-top: 5px;
      }
    }

    > .down {
      width: 87px;
      height: 30px;
      border-radius: 5px;
      background-color: #e96923;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
