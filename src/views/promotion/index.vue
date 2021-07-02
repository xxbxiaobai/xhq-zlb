<template>
  <div id="container">
    <van-nav-bar title="个人中心" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-coupon-list
      :coupons="listCoupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disListCoupons"
      :show-close-button="false"
      @change="onChange"
      @exchange="onExchange"
    />

    <van-popup v-model="show" round :style="{boxShadow:'0 5px 20px rgb(128, 128, 128)'}">
      <div class="code">
        <img src="../../assets/erweima.png" />
        <div>
          <span>DDA90919DWA</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { findUserPromoCode,receivePromoCode } from "@/http/api.js";
const coupon = {
  available: 1,
  condition: "无使用门槛",
  reason: "",
  value: 150,
  name: "体育中心篮球馆",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "5",
  unitDesc: "元"
};
export default {
  data() {
    return {
      show: false,
      showList: true,
      chosenCoupon: -1,
      coupons: [coupon, coupon, coupon],
      disabledCoupons: [coupon],
      listCoupons: [],
      disListCoupons: []
    };
  },
  created() {
    this.getPromotionList();
  },
  methods: {
    //获取优惠码列表
    getPromotionList() {
      findUserPromoCode({
        userId: this.$route.query.id,
        codeStatus: "1"
      })
        .then(res => {
          if (res.data.length == 0) {
            return false;
          }
          this.listCoupons = res.data.filter((item, i) => {
            if (item.codeStatus == 1) {
              var coupon = {
                available: 1,
                condition: "最多优惠" + item.codeDetails + "元",
                reason: "",
                value: item.discountedPrice,
                name: item.name,
                startAt: item.codeStartTime,
                endAt: item.codeEndTime,
                valueDesc: item.discountedPrice,
                unitDesc: "元"
              };
              return coupon;
            }
          });
          this.disListCoupons = res.data.filter((item, i) => {
            if (item.codeStatus != 1) {
              var coupon = {
                available: 1,
                condition: "最多优惠" + item.codeDetails + "元",
                reason: "",
                value: item.discountedPrice,
                name: item.name,
                startAt: item.codeStartTime,
                endAt: item.codeEndTime,
                valueDesc: item.discountedPrice,
                unitDesc: "元"
              };
              return coupon;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      console.log("选了");
      this.show = true;
    },
    onExchange(code) {
      receivePromoCode({
        userId: this.$route.query.id,
        promoId: code
      })
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
      // this.$toast("兑换成功");
      // setTimeout(() => {
      //   this.coupons.push(coupon);
      // }, 1000);

    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped lang="less">
#container {
  .code {
    padding: 1rem;
    img {
      width: 60vw;
    }
    div {
      margin-top: 0.2rem;
      padding: 0.2rem 0.5rem;
      border: 1px solid #ccc;
      text-align: center;
    }
  }

  //   /deep/ .van-tabs__line {
  //     background-color: #1989fa;
  //   }
  //   /deep/ .van-button__text {
  //     color: #1989fa;
  //   }
  //   /deep/ .van-button--disabled {
  //     opacity: .8;
  //   }

  //   /deep/ .van-checkbox__icon--checked .van-icon {
  //     background-color: #1989fa;
  //     border-color: #1989fa;
  //   }
}
</style>
