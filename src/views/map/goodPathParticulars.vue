<template>
  <div id="container">
    <!-- 头部开始 -->
    <van-nav-bar title="场馆详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
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
        <strong>
          {{card.title}}
          <i v-if="card.isLessOfFree" @click="issue"></i>
        </strong>
        <div>
          <span>{{card.bigType}}</span>
          <span v-html="card.smallType"></span>
        </div>
      </div>
      <div class="box-msg">
        <div class="box-site">
          <span>{{card.site}}</span>
          <router-link :to="{path:'/warrantyEdit', query:{pointAddr:card.site,pointId:card.id}}">
          <img src="../../assets/icon_fixzxbx@2x.png"></img>
          <p>在线报修</p>
          </router-link>
        </div>
        <span class="box-date">开放时间：{{card.date}}</span>
        <!-- <span class="bookPay" @click="gotoBook">预订</span> -->
        <span class="box-phone">咨询电话：{{card.phone}}</span>
        <a :href="'tel:'+card.phone" class="icon-phone"></a>
      </div>
    </div>
    <!-- 基本信息结束 -->
    <!-- <div class="box-introduce">
      <div class="box-title">实时监控</div>
      <router-link to="/monitoring">
        <div class="jiankong">
          <span>当前时间：{{date}}</span>
          <span>
            馆内人数：43
            <i class="d">减少2</i>
          </span>
          <span>
            今日人流数：207
            <i class="up">新增31</i>
          </span>
        </div>
      </router-link>
    </div>-->
    <!-- 介绍列表开始 -->
    <div class="box-introduce">
      <div class="box-title">场馆简介</div>
      <div class="introduce">
        <p v-html="card.cont"></p>
      </div>
    </div>
    <!-- 介绍列表结束 -->

    <!-- 底部按钮开始 -->
    <div class="box-btn" v-if="!card.isBook">
      <button class="box-btn-gps">
        <a :href="'//uri.amap.com/marker?position='+card.y+','+card.x+'&name='+card.title">
          <span>导航</span>
        </a>
      </button>
      <button v-if="isWeixin === true" class="box-btn-oder" >
        <a @click="gotoBook">
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
import { mapGetters } from "vuex";
import { zlbFun } from "@/util/Tool";
import { pointCont, userImg } from "@/http/api";
import phone from "@/components/Phone";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      isWeixin: true, // 是否微信浏览器
      img: [],
      pointSportType: "",
      card: {
        title: "", //标题
        bigType: "", //大项
        smallType: "", //小项
        site: "",
        date: "",
        phone: "",
        cont: "",
      }
    };
  },
  components: {
    phone
  },
  methods: {
    gotoBook() {
      if (this.pointSportType === "271,") {
        this.$router.push({
          path: "/swimBook",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.$router.push({
          path: "/bookDetail",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },
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
  computed: {
    ...mapGetters(["userPhone"])
  },
  created() {
    // 如果不是微信，不显示订场。短期需求
    // const ua = window.navigator.userAgent.toLowerCase();
    // if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    //   this.isWeixin = true
    // }
    zlbFun("场馆详情");
    let id = (this.id = this.$route.query.id); //获取上个页面传递的id,在下面获取数据的时候先提交id
    if (id === null) return;
    pointCont(id).then(res => {
      let item = res.data;
      if (!res.code) {
        if (item.fileList.length) {
          this.img = item.fileList.map(img => userImg + img.id);
        } else {
          this.img = [require("../../assets/zwtpmrtp.jpeg")]
        }
        this.pointSportType = item.pointSportType;
        let mobile = this.userPhone;
        let smallType = "";
        item.typeList.forEach(item => {
          smallType += item.dataName + "&nbsp;&nbsp;";
        });
        this.card = {
          title: item.pointName, //标题
          bigType: item.pointPlaceType.name, //大项
          smallType, //小项
          site: item.pointAddr,
          date: item.pointOpenTime,
          phone: item.pointServicePhone || false,
          cont: item.pointDescription || "暂无介绍",
          isBook: item.isBook == 1,
          url: item.pointBookUrl + `&tel=${mobile}`,
          isLessOfFree: item.isLessOfFree == 0,
          x: item.pointxCoordinate,
          y: item.pointyCoordinate
        };
        console.log(this.img);
      } else {
        this.$toast("网络异常");
      }
    });
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
.bookPay {
  float: right;
  color: #1492ff;
  height: 0.9rem;
  width: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #1492ff;
  border: 1px solid;
  border-radius: 0.15rem;
  font-size: 0.6rem;
  line-height: 0.8rem;
  background-color: #fff;
}
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
      padding: 0.9rem 0.85rem 2.35rem 1.65rem;
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
        padding-right: 1rem;
        margin-bottom: 0.5rem;
        border-right: 1px solid #e7e7e7;
        span{
          position: relative;
          word-wrap:break-word; 
          font-size: 0.6rem;
          line-height: 0.6rem;
          .icon(0.75rem, 0.75rem, -1.05rem, 0, "../../assets/weizhi.png");
          span {
            font-size: 0.5rem;
            line-height: 0.5rem;
          }
        }
                  img {
    //     float: right;
    // margin-top: 10px;
          position: absolute;
          top: 50%;
          right: -2.5rem;
          height: 1.15rem;
          width: 1.15rem;
          // background: url("../../assets/phone.png") no-repeat center;
          background-size: 100%;
          transform: translateY(-95%);
        }
        p{
          position: absolute;
          top: 70%;
          right: -3.2rem;
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
   .icon-phone {
             float: right;
    margin-top: 25px;
    margin-right: 10px;
          // position: absolute;
          // top: 50%;
          // right: -2.5rem;
          height: 1.15rem;
          width: 1.15rem;
          background: url("../../assets/phone.png") no-repeat center;
          background-size: 100%;
          // transform: translateY(-50%);
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
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 20px;
        height: 20px;
        width: 20px;
        background: url("../../assets/sxt.png") no-repeat center;
        background-size: cover;
      }
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
