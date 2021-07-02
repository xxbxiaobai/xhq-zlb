<template>
  <div>
    <van-nav-bar title="提交订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- <div id="recomTime" v-show="orderinfo.orderState == '1'">剩余支付时间 {{rocallTime}}秒</div> -->
    <van-form @submit="onSubmit">
      <van-field v-model="venue" name="场馆" label="场馆" readonly />
      <ul class="venue_list">
        <li v-for="(item,i) in hour" :key="i">
          预订场次
          <span
            style="margin-left: 1.5rem;"
          >{{placeInfo.day.month}}月{{placeInfo.day.day}}日{{placeInfo.day.week}} {{item.price.substring(0,12)}} {{item.place}} {{item.price.trim().substring(0,12)}}</span>
        </li>
      </ul>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="支付宝支付" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="微信支付" clickable @click="radio = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-form>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="payMoney" :disabled="isAbled">确认支付{{ tatol }}元</van-button>
    </div>
  </div>
</template>
<script>
import { createOrderNumber, getApplyWxPay, getApplyAliPay, returnUrl } from "@/http/api";
import wx from "weixin-jsapi";
export default {
  name: 'orderSubmit',
  data() {
    return {
      isAbled: false,
      placeInfo: "",
      code: "",
      appid: "",
      orderNum: "",
      userId: "",
      hour: [],
      tatol: 0,
      radio: "",
      venue: "",
      coupon: "0张优惠券",
      phone: "",
      rocallTime: "",
      consumerId: '',
      orderNum: '',
    };
  },
  created() {
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) === 'micromessenger'){
      this.getCode();
    }
    this.venue = this.$route.query.cdlxName;
    this.consumerId = JSON.parse(localStorage.getItem('userLoginMsg')).id
    this.hour = JSON.parse(sessionStorage.getItem('placeInfo')).hour
    this.placeInfo = JSON.parse(sessionStorage.getItem('placeInfo'))
    if (this.hour) {
      this.hour.forEach((item, i) => {
        this.tatol += Number(item.price.split("￥")[1]);
      })
    }
  },
  methods: {
    // 获取授权code
    GetUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let url = window.location.href.split("#")[0];
      let search = url.split("?")[1];
      if (search) {
        var r = search.substr(0).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
      } else {
        return null;
      }
    },
    // 获取微信openid
    getCode() {
      const code = this.GetUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      const local = window.location.href
      const appid = 'wx2f953b3dd99a129d'
      if (code === null || code === '') {
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=#wechat_redirect'
      } else {
        this.code = code
      }
    },
    // 订单支付的方法
    payMoney() {

      // this.isAbled = true
      this.$toast('您还没有配置支付设置');
      // if(this.radio === '') {
      //   this.isAbled = false
      //   return this.$toast('请选择支付方式');
      // } else if(this.radio === '1' && this.code !== '' && this.code !== null) {
      //   this.isAbled = false
      //   return this.$toast('请选择微信');
      // } else if(this.radio === '2') {
      //   return this.getOrderNumber(this.radio)
      // } else if(this.radio === '1' && this.code === '') {
      //   return this.getOrderNumber(this.radio)
      // }
    },
    // 获取订单号
    getOrderNumber(val) {
      let str_cdhm = ''
      let str_id = ''
      this.hour.forEach((item, i) => {
        str_cdhm += item.cdhmId + ','
        str_id += item.startTime + ','
      })
      if (str_cdhm.length > 0) {
        str_cdhm = str_cdhm.substr(0, str_cdhm.length - 1)
      }
      if (str_id.length > 0) {
        str_id = str_id.substr(0, str_id.length - 1)
      }
      createOrderNumber({
        cdlxId: this.hour[0].cdlxId,
        cdhmIds: str_cdhm.trim(),
        startTimes: str_id.trim(),
        memberId: this.consumerId
      }).then(res => {
        const orderInfo= sessionStorage.getItem('orderInfo');
        if(res.resp_code === 0) {
          sessionStorage.removeItem('orderInfo')
          sessionStorage.setItem('orderInfo', res.datas.orderNum)
        } else if (res.resp_code === 1 && orderInfo !== null) {
          sessionStorage.getItem('orderInfo')
        } else if (res.resp_code === 1 && orderInfo === null){
          this.isAbled = false
          return this.$toast(res.resp_msg)
        }
        const orderNum = sessionStorage.getItem('orderInfo');
        if (orderNum && val === '1') {
          return this.getApplyAliPay(orderNum)
        } else if(orderNum && val === '2' && this.code !== '') {
          // 微信内置浏览器支付
          const status = 1
          return this.getParams(orderNum, status)
        } else if(orderNum && val === '2' && this.code === '') {
          // 微信h5支付
          const status = 2
          return this.getParams(orderNum, status)
        } else { 
          this.isAbled = false
           return this.$toast('场地已被预订，请重新选择')
        }
      }).catch(err => { })
    },
    // 支付宝支付调用的方法
    getApplyAliPay(orderNum) {
      getApplyAliPay({
        orderNum: orderNum,
        status: 2,
        paysuccessUrl: returnUrl + '#/orderList?id=' + this.consumerId
      }).then(res => {
        const div = document.createElement('div')
        div.id = 'alipay'
        div.innerHTML = res
        document.body.appendChild(div)
        document.querySelector('#alipay').children[0].submit() // 执行后会唤起支付宝
      })
    },
    //获取微信支付参数
    getParams(orderNum, status) {
      getApplyWxPay({
        code: this.code,
        orderNum: orderNum,
        status: status
      }).then(res => {
        if(res.resp_code === 0 && res.datas.wxParam.appId) {
          wx.config({
            appId: res.datas.wxParam.appId, // 必填，公众号的唯一标识
            timestamp: res.datas.wxParam.timeStamp, // 必填，生成签名的时间戳
            nonceStr: res.datas.wxParam.nonceStr, // 必填，生成签名的随机串
            signature: res.datas.wxParam.sign, // 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
          })
          wx.chooseWXPay({
            timestamp: res.datas.wxParam.timeStamp, // 支付签名时间戳
            nonceStr: res.datas.wxParam.nonceStr, // 支付签名随机串，不长于32 位
            package: res.datas.wxParam.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.datas.wxParam.sign, // 支付签名
            success: function(res) {
              //支付成功
              this.$router.push(returnUrl + '#/orderList?id=' + this.consumerId)
            },
            cancel: function(res) {
              //支付取消
              this.isAbled = false
              this.$router.go(-2)
            }
          })
        } else {
          const url = res.datas.wxParam.mwebUrl + '&redirect_url=' + returnUrl + '#/orderList?id=' + this.consumerId
          window.location.href = url
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onClickLeft() {
      this.$router.go(-2);
    },
    onSubmit(values) {
      console.log("submit", values)
    }
  }
};
</script>
<style lang="less" scoped>
#recomTime {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
.venue_list {
  font-size: 14px;
  justify-content: space-between;
  line-height: 2rem;
  position: relative;
  padding: 0 16px;
  & > ::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>