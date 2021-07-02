<template>
  <div id="container">
    <!-- 头部开始 -->
    <van-nav-bar title="路线详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 头部结束 -->

    <!-- 图片展示开始 -->
    <van-swipe>
      <van-swipe-item v-for="(item,i) in img" :key="i">
        <div class="box-img" :style="{background:'url('+item+')center center / cover no-repeat'}"></div>
      </van-swipe-item>
    </van-swipe>

    <!-- 图片展示结束 -->

    <!-- 基本信息开始 -->
    <div class="box-card">
      <div class="box-title">
        <strong>双溪竹海漂流</strong>
        <div>
          <span>漂流</span>
          <span>漂流</span>
        </div>
      </div>
      <div class="box-msg">
        <div class="box-site">
          <p>{{card.site}}</p>
          <span>双溪竹海路2号</span>
          <a :href="'tel:'+card.phone" class="icon-phone"></a>
        </div>
        <p class="box-date">开放时间：08:00-17:00</p>
      </div>
    </div>
    <!-- 基本信息结束 -->
    <div class="box-introduce">
      <div class="box-title">实时监控</div>
      <div class="jiankong">
        <span>当前时间：{{date}}</span>
        <span>
          健身人数：142
          <i class="up">新增45</i>
        </span>
        <span>
          今日人流数：207
          <i class="up">新增31</i>
        </span>
      </div>
    </div>
    <!-- 介绍列表开始 -->
    <div class="box-introduce">
      <div class="box-title">项目起止点</div>
      <div class="path">
        <span>安溪乡黄处村</span>
        <img src="../../assets/ZS.png" />
        <span>佛儿岩</span>
        <img src="../../assets/ZS.png" />
        <span>安溪乡黄处村</span>
      </div>
      <div class="introduce">
        <h3 style="margin-top: 0;">路线详情</h3>
        <p>
          面积：10000平方米
          <br />长度：5公里
          <br />宽度：5米
          <br />场地客容量：10000人
          <br />开展运动项目：游泳、漂流、自行车
          <br />建成年份：2004年9月
          <br />
        </p>
        <h3>双溪竹海漂流</h3>
        <p>
          双溪竹海漂流的生态自然资源得天独厚，人文景观极为丰富:陆羽泉品茗听琴，古韵悠悠;还有宋代被誉为江南五山十刹之首的径山寺，鬼斧神工的同安天门，雄姿奇峻的将军山，狮子山，以及沈括、苏东坡、李清照、徐文长等历代文人留下的游踪和华章佳句。
          在上下起伏的河流中体验着生命的动感；在潺潺的溪水中感受着速度的乐趣；全段九个深浅不一的戏水潭可让你与溪水嬉戏个畅快，亲密接触个够；八个高低不一的堰坝滑行让你扯嗓尖叫个够， 叫掉所有的世俗烦恼；一路尖叫，一路欢笑，无限体验，无限刺激，畅游在此，人生乐乎哉。九龙溪漂流是一处集良好的亲水性、趣味性、挑战性和安全性于一体的二人自助皮筏漂流点。
        </p>
      </div>
    </div>
    <!-- 介绍列表结束 -->

    <!-- 底部按钮开始 -->
    <div class="box-btn" v-if="0">
      <button class="box-btn-gps">
        <a :href="'//uri.amap.com/marker?position='+card.y+','+card.x+'&name='+card.title">
          <span>导航</span>
        </a>
      </button>
      <button class="box-btn-oder">
        <a href="#/pay">
          <span style="color:#fff">订场</span>
        </a>
      </button>
    </div>

    <div class="box-btn" v-else>
      <button class="box-gps">
        <a :href="'//uri.amap.com/marker?position='+card.y+','+card.x+'&name='+card.title">
          <span>导航</span>
        </a>
      </button>
    </div>
    <!-- 底部按钮结束 -->
  </div>
</template>

<script>
// import fitnessGuidance from "./components/fitness-guidance";
import { pointCont, userImg } from "@/http/api";
import phone from "@/components/Phone";
export default {
  data() {
    return {
      date: new Date().toLocaleString(),
      img: [require("../../assets/xzwtp.png")],
      card: {
        title: "", //标题
        bigType: "", //大项
        smallType: "", //小项
        site: "",
        date: "",
        phone: "",
        cont: ""
      }
    };
  },
  components: {
    phone
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //提示
    issue() {
      this.$toast({
        message: "免费或低收费向社会开放\n的公共体育场馆",
        duration: 5000
      });
    }
  },
  computed: {},
  created() {
    let id = (this.id = this.$route.query.id); //获取上个页面传递的id,在下面获取数据的时候先提交id
    this.img = [
      require("../../assets/mizi.png"),
      require("../../assets/mizi.png"),
      require("../../assets/mizi.png")
    ];
    this.card = {
      title: "奥体中心",
      bigType: "室外场地",
      smallType: "篮球&nbsp;&nbsp;足球&nbsp;&nbsp;健身场地&nbsp;&nbsp;",
      // site: "绍兴市诸暨市暨阳街道暨阳路219号",
      date: "寒暑假、节假日8:00-17:00",
      phone: "0575-87496380",
      cont: "奥体中心",
      isBook: false,
      url: "&tel=undefined",
      isLessOfFree: true,
      x: "29.724021",
      y: "120.243585"
    };
  }
};
</script>
<style>
#container .van-swipe .van-swipe__indicators {
  bottom: 1.2rem;
}
</style>
<style scoped lang="less">
//=======================
//      公用混合
.solid() {
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    height: 1px;
    width: 96%;
    background-color: #e7e7e7;
  }
}
.icon(@w,@h,@l,@r,@img) {
  &::before {
    content: "";
    position: absolute;
    left: @l; //-1.05rem
    right: @r;
    height: @h; //0.75rem
    width: @w;
    background: url(@img) no-repeat center;
    background-size: 95%;
  }
}
.i(@img, @h: 1rem, @w: 1rem) {
  content: "";
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
//=======================

#container {
  min-height: 100vh;
  min-width: 100vw;
  color: #333;
  background-color: #fff;
  //=======================
  //      图片展示
  //=======================
  .box-img {
    height: 10.85rem;
    width: 100vw;
  }

  //=======================
  //      基本信息
  //=======================
  .box-card {
    position: relative;
    top: -0.8rem;
    width: 100vw;
    margin-bottom: -0.75rem;
    border-radius: 0.5rem;
    background-color: white;
    .box-msg {
      padding: 0.9rem 0.85rem 1.2rem 1.65rem;
      font-size: 0.6rem;
      color: #666666;
      .box-phone {
        font-family: PingFang SC;
        position: absolute;
        left: 0.6rem;
        bottom: 0.7rem;
        color: #333333;
        font-size: 0.8rem;
        line-height: 0.8rem;
      }
      .box-site {
        position: relative;
        margin-right: 3rem;
        border-right: 1px solid #e7e7e7;
        p {
          position: relative;
          padding-right: 1rem;
          font-size: 0.6rem;
          line-height: 0.6rem;
          .icon(0.75rem, 0.75rem, -1.05rem, 0, "../../assets/weizhi.png");
          span {
            font-size: 0.5rem;
            line-height: 0.5rem;
          }
        }
        .icon-phone {
          position: absolute;
          top: 50%;
          right: -2.95rem;
          height: 1.15rem;
          width: 1.15rem;
          background: url("../../assets/phone.png") no-repeat center;
          background-size: 100%;
          transform: translateY(-50%);
        }
      }
      .box-date {
        position: relative;
        margin-top: 0.9rem;
        color: #666666;
        .icon(0.75rem, 0.75rem, -1.05rem, 0, "../../assets/shijian.png");
      }
    }
  }
  //公用标题头
  .box-title {
    position: relative;
    padding: 0.75rem 0.75rem 0.9rem 0.65rem;
    font-size: 0.8rem;
    .solid;
    strong {
      font-family: PingFang SC;
      display: block;
      margin-bottom: 0.7rem;
      font-size: 0.8rem;
      line-height: 1.2rem;
      color: #000000;
      i {
        display: inline-flex;
        align-items: center;
        &::before {
          content: "低免";
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-left: 0.5rem;
          height: 0.9rem;
          width: 1.8rem;
          border: 1px solid;
          border-radius: 0.125rem;
          color: #1492ff;
          font-size: 0.6rem;
        }
        &::after {
          .i("../../assets/issue.png");
          margin-left: 0.3rem;
        }
      }
    }
    > div {
      display: flex;
      span {
        &:first-child {
          white-space: nowrap;
          height: 100%;
          padding-right: 8px;
          margin-right: 8px;
          border-right: 1px solid #e7e7e7;
        }
        display: block;
        font-size: 0.5rem;
        line-height: 0.7rem;
        color: #666666;
      }
    }
  }
  //=======================
  //      介绍列表
  //=======================
  .box-introduce {
    border-top: 0.4rem solid #f6f7f8;
    background-color: white;

    .jiankong {
      position: relative;
      padding: 0.55rem 0.6rem 0.5rem 0.6rem;
      font-size: 0.73rem;
      line-height: 1.5rem;

      span {
        display: flex;
        align-items: flex-start;
        .up {
          font-size: 13px;
          color: #78c123;
          &::before {
            content: "";
            display: inline-block;
            width: 0;
            margin: 0 5px;
            border-width: 5px;
            border-style: solid;
            border-color: white white #78c123 white;
          }
        }
        .d {
          font-size: 13px;
          color: #f44336;
          &::before {
            content: "";
            display: inline-block;
            width: 0;
            margin: 0 5px;
            border-width: 5px;
            border-style: solid;
            border-color: #f44336 white white white;
          }
        }
      }
      /deep/ .van-count-down {
        line-height: inherit;
      }
    }

    .path {
      display: flex;
      align-items: center;
      padding: 0.6rem;
      font-size: 0.7rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51);
      img {
        padding: 0 0.5rem;
        height: 0.75rem;
        width: 0.75rem;
      }
    }

    .introduce {
      padding: 0.55rem 0.6rem 5rem 0.6rem;
      font-size: 0.7rem;

      h3 {
        margin-top: 1.4rem;
        margin-bottom: 0.7rem;
        font-size: 0.8rem;
      }
      p {
        font-size: 0.7rem;
        line-height: 1.4rem;
      }
    }
  }
  .button(@c:#fff,@b:#1492ff) {
    a {
      color: #333;
      display: block;
    }
    padding: 0.55rem;
    width: 100%;
    color: @c;
    border-radius: 0.125rem;
    font-size: 0.7rem;
    line-height: 0.7rem;
    background-color: @b;
  }
  .box-btn {
    position: fixed;
    bottom: 0;
    display: flex;
    padding: 0.5rem 0.6rem 1.2rem 0.6rem;
    width: 100%;
    background-color: white;
    .box-btn-gps {
      .button(#333, #fafafa);
      margin-right: 10px;
      border: 1px solid #cccccc;
      span {
        &::before {
          content: "";
          display: inline-block;
          height: 0.75rem;
          width: 0.65rem;
          background: url("../../assets/icon.png") no-repeat center;
          background-size: cover;
          vertical-align: middle;
        }
      }
    }
    .box-gps {
      .button();
      > a {
        color: #fff;
      }
      span {
        &::before {
          content: "";
          display: inline-block;
          margin-right: 0.3rem;
          height: 0.75rem;
          width: 0.65rem;
          background: url("../../assets/daohang.png") no-repeat center;
          background-size: cover;
          vertical-align: middle;
        }
      }
    }
    .box-btn-oder {
      .button();
    }
  }
}
</style>
