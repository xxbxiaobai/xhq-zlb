<template>
  <div id="container">
    <!-- <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar> -->
    <!-- 内容开始 -->
    <div class="cont-box">
      <!-- 头部 -->
      <div class="cont-head">
        <!-- fitnessTypeArr -->
        <img class="type-icon" src="../../assets/icon/7.png" />
        <strong class="venue">{{info.cgxxName}}</strong>
        <strong class="venue">{{info.createTime.substring(0,11)}}</strong>
        <p>{{info.createTime.substring(11)}}</p>
        <img class="type-img" src="../../assets/ymq@2x.png" />
      </div>
      <!-- 二维码 -->
      <div class="cont-code" v-show="info.isPay == 2">
        <strong>入场码</strong>
        <div class="tickets">
          <div class="tickets-used" v-if="status===3">已使用</div>
          <div id="qrcode"></div>
        </div>
        <div class="cont-code-tickets">
          <span>入场码：</span>
          <i>001293</i>
        </div>
      </div>
      <!-- 联系方式 -->
      <!-- <div class="cont-phone">
        <a
          :href="'//uri.amap.com/marker?position='+orderDetail.longitude+','+orderDetail.latitude+'&name='+orderDetail.venueAddr"
        >
          <strong class="venue-name">{{orderDetail.venueName}}</strong>
          <p>{{ orderDetail.venueAddr}}</p>
        </a>
      </div> -->
      <!-- 消费 -->
      <div class="cont-money">
        <div class="cont-title-text">
          <strong>消费金额</strong>
          <span>¥{{info.amount}}</span>
        </div>

        <div class="cont-money-text">
          <span>订单号</span>
          <span>{{info.orderNum}}</span>
        </div>
        <div class="cont-money-text">
          <span>下单时间</span>
          <span>{{info.createTime}}</span>
        </div>
        <div class="cont-money-text">
          <span>手机号码</span>
          <span></span>
        </div>
      </div>

      <!-- 协议 -->
      <div class="cont-agreement">
        <strong>退订须知</strong>
        <p>
          在开场2小时前退场，不收取违约金；开场前1小时到2小时退场，收取预定金额20%的违约金；开场前1小时内退场收取预定金额50%的违约金。
        </p>
      </div>
    </div>
    <!-- 内容结束 -->
  </div>
</template>


<script>
import QRCode from "qrcodejs2";
import { zlbFun } from "../../util/Tool";
import { getOrderDetail, userImg } from "@/http/api";
import phone from "@/components/Phone";

export default {
  name: "orderCont",
  data() {
    return {
      info:'',
      status: 0,
      orderDetail: {},
      regulation: {
        phone: "",
        address: "",
        rule: ""
      }
    };
  },
  components: {
    phone
  },
  created() {
    this.info = JSON.parse(this.$route.params.info)
    console.log(this.info)
  },
  methods: {
    /**
     * 预定时间
     */
    // orderDate(date) {
    //     return (
    //         date.toString().substring(0, 4) +
    //         "-" +
    //         date.toString().substring(4, 6) +
    //         "-" +
    //         date.toString().substring(6, 8)
    //     );
    // },
    //图片
    orderImg(img) {
      if (img) return userImg + img;
      else return require("../../assets/zwltsy.jpg");
    },
    /**
     * 生成二维码
     */
    qrcode(code) {
      let qrcode = new QRCode("qrcode", {
        width: 138,
        height: 138,
        text: '001293' // 二维码内容
      });
    },
    /**
     * 电话与退订规则
     */
    phoneRegulation(id) {
      if (!id) return false;
      getOrderDetail({ id }).then(res => {
        if (res.code != 0) return console.log("接口错误,没有数据");
        this.regulation.rule =
          res.data.rule ||
          `在开场2小时前退场，不收取违约金；开场前1小时到2小时退场，
          收取预定金额20%的违约金；开场前1小时内退场收取预定金额50%的违约金。`;
        console.log(this.regulation.rule, "fdafdsafsda");
      });
    }
  },
  mounted() {
    if (this.status !== 2) {
      this.qrcode(this.orderDetail.enterCode);
    }
  }
};
components: {
}
</script>


<style>
/* 二维码 */
#container .cont-code .tickets #qrcode img {
  height: 6.9rem;
  width: 6.9rem;
}
</style>
<style scoped lang="less">
//===========================
//   Less 混合
//===========================
.p(@c:#999) {
  font-size: 0.7rem;
  line-height: 0.7rem;
  color: @c;
}

.ball(@_) {
  content: "";
  position: absolute;
  bottom: -0.25rem;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background-color: #f5f5f5;
}

.ball(L) {
  left: -1.35rem;
  border: 1px solid;
  border-color: #d2d2d2 #d2d2d2 #f5f5f5 #f5f5f5;
  transform: rotate(40deg);
}

.ball(R) {
  right: -1.35rem;
  border: 1px solid;
  border-color: #f5f5f5 #f5f5f5 #d2d2d2 #d2d2d2;
  transform: rotate(40deg);
}

.icon(@img, @h: 1rem, @w: 1rem) {
  content: "";
  position: absolute;
  top: 50%;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
  transform: translateY(-50%);
}

.money-color(@c) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;

  span {
    font-size: 0.8rem;
    line-height: 0.85rem;
    color: #999999;
  }
  strong {
    display: block;
    margin-top: 0.45rem;
    font-size: 2rem;
    line-height: 2.8rem;
    color: @c;
  }
}

//===========================
#container {
  padding-bottom: 1.1rem;
  color: #333;
  padding: 1.8rem 0.6rem 1rem;
  background-color: #f5f5f5;
  height: 100%;
  strong {
    font-family: PingFangSC-Medium, PingFang SC;
    display: block;
    font-size: 0.85rem;
    line-height: 0.85rem;
  }

  .cont-box {
    padding: 2rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid #d2d2d2;
    background-color: white;

    div:nth-child(1) {
      padding-top: 0;
    }

    p {
      .p();
    }

    > div {
      position: relative;
      padding-top: 1.1rem;
      padding-bottom: 1.1rem;
      border-bottom: 1px dashed #d2d2d2;

      &::after {
        .ball(R);
      }

      &::before {
        .ball(L);
      }
    }

    > div:last-child {
      padding-top: 1.1rem;
      padding-bottom: 0;
      border-bottom: none;

      &::after {
        display: none;
      }

      &::before {
        display: none;
      }
    }

    .cont-head {
      position: relative;
      padding-right: 7.5rem;
      height: 4.6rem;
      .venue {
        margin-bottom: 0.5rem;
      }
      span {
        color: #999999;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
      .type-icon {
        position: absolute;
        top: -2rem;
        right: 50%;
        margin-right: -1.2rem;
        margin-top: -1.2rem;
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
      }

      .type-img {
        position: absolute;
        right: 0;
        top: 0;
        height: 3.5rem;
        width: 5.1rem;
      }
    }

    .cont-code {
      .tickets {
        position: relative;
        margin: 1.2rem auto;
        height: 6.9rem;
        width: 6.9rem;
        // background-color: #eee;
        .tickets-used {
          font-family: PingFangSC-Medium, PingFang SC;
          position: absolute;
          top: 50%;
          right: 50%;
          margin-right: -3.75rem;
          height: 2.5rem;
          width: 7.5rem;
          border: 0.1rem solid;
          color: #da2625;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 2.5rem;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.85);
          transform: translateY(-50%);
        }
      }

      .cont-code-tickets {
        margin: auto;
        height: 2.1rem;
        width: 13.55rem;
        border: 1px solid #e2e2e2;
        border-radius: 0.2rem;
        font-size: 0.7rem;
        line-height: 2.1rem;
        text-align: center;

        span {
          color: #999999;
        }

        i {
          color: #333333;
        }
      }
    }

    .cont-unsubscribe {
      display: flex;
      height: 6.25rem;

      .cont-unsubscribe-money {
        &:first-child {
          .money-color(#23da92);
          border-right: 1px dashed #d2d2d2;
        }

        &:last-child {
          .money-color(#da2625);
        }
      }
    }

    .cont-phone {
      > a::after {
        content: "";
        position: absolute;
        right: 0;
        height: 30px;
        width: 30px;
        top: 50%;
        background: url("../../assets/adress@2x.png") no-repeat center/cover;
        transform: translateY(-50%);
      }
      p {
        margin-top: 0.6rem;
        width: 85%;
        overflow-wrap: break-word;
      }
    }

    .cont-money {
      .cont-title-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.8rem;
        line-height: 0.85rem;
      }

      .cont-money-text {
        position: relative;
        margin-top: 0.4rem;
        .p();

        span:nth-child(1) {
          display: inline-block;
          min-width: 70px;
        }

        span:nth-child(2) {
          color: #333;
        }
      }
    }

    .cont-agreement {
      strong {
        margin-bottom: 0.6rem;
      }

      p {
        font-size: 0.7rem;
        line-height: 1rem;
        color: #666666;
      }
    }
  }
}
</style>
