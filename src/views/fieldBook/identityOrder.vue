<template>
  <div id="identy">
    <van-nav-bar title="订单确认" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <!-- <div class="time">
      <van-icon name="warning-o" style="margin-right:5px;vertical-align: middle;" />支付倒计时：{{ rocallTime}}
    </div> -->
    <div class="content">
      <div class="title">{{cgxxName}}</div>
      <div class="date">
        <van-icon name="notes-o" style="margin-right: 5px;vertical-align: middle;" />
        {{curentDate}}
      </div>
      <div class="placeInfo">
        <p>成人票上午场{{datas.startTimeName}}--{{datas.endTimeName}}</p>
        <p>￥{{datas.price}}元x{{count}}张</p>
      </div>
    </div>
    <div class="method">支付方式</div>
    <div class="card">
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
    </div>
    <van-button :disabled="isAbled" @click="gotoPay">
      <span style="font-size；12px;">实付：</span>
      <span style="font-size:16px;">￥{{datas.price*count}}</span>立即支付
    </van-button>
  </div>
</template>
<script>
import { formatDateTime } from "@/util/Tool";
import { getApplyWxPay, returnUrl, getApplyAliPay } from "@/http/api";
export default {
  data() {
    return {
      isAbled: false,
      radio:'1',
      cgxxName: "",
      datas: "",
      appId: "",
      orderNum: "",
      count: "",
      curentDate: "",
      code: "",
      orderinfo: {
        orderState: ""
      },
      rocallTime: "",
      consumerId: '',
    };
  },
  created() {
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      this.getCode();
    }
    // this.getCode()
    this.curentDate =
      formatDateTime(Date.now()) + '星期' + new Date(Date.now()).getDay();
    this.cgxxName = this.$route.query.cgxxName;
    this.datas = JSON.parse(this.$route.query.datas);
    this.consumerId = JSON.parse(localStorage.getItem('userLoginMsg')).id
    this.appId = this.$route.query.appId;
    this.orderNum = this.$route.query.orderNum;
    this.count = this.$route.query.count;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    gotoPay() {
      this.isAbled = true
      this.isAbled = true
      if(this.radio === '') {
        this.isAbled = false
        return this.$toast('请选择支付方式');
      } else if(this.radio === '1' && this.code !== '') {
        this.isAbled = false
        return this.$toast('请选择微信');
      } else if(this.radio === '2' && this.code === '') {
        const status = 2
        return this.getParams(status)
      } else if(this.radio === '2' && this.code !== '') {
        const status = 1
        return this.getParams(status)
      } else if(this.radio === '1' && this.code === '') {
        return this.getApplyAliPay()
      }
    },
    // 支付宝支付调用的方法
    getApplyAliPay() {
      getApplyAliPay({
        orderNum: this.orderNum,
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
    getParams(status) {
      getApplyWxPay({
        code: this.code,
        orderNum: this.orderNum,
        status: status
      }).then(res => {
        // console.log(res);
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
    getCode() {
      const code = this.GetUrlParam('code'); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      const local = window.location.href;
      const appid = "wx2f953b3dd99a129d";
      if (code == null || code === "") {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          appid +
          "&redirect_uri=" +
          encodeURIComponent(local) +
          "&response_type=code&scope=snsapi_base&state=#wechat_redirect";
      } else {
        this.code = code;
      }
    },
  },
};
</script>
<style lang="less" scoped>
#identy {
  width: 100%;
  height: 100%;
  background-color: #f6f8f7;
  font-size: 14px;
  .time {
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background-color: #fff;
  }
  .content {
    padding: 1rem;
    background-color: #fff;
    .title {
      height: 2rem;
      line-height: 2rem;
    }
    .date {
      color: #1492ff;
      height: 2rem;
      line-height: 2rem;
    }
    .placeInfo {
      background-color: #f6f8f7;
      padding-left: 5px;
      p {
        height: 1.5rem;
        line-height: 1.5rem;
      }
    }
  }
  .method {
    padding: 0 1rem;
    line-height: 2rem;
    height: 2rem;
  }
  button {
    width: 100%;
    background: #1492ff;
    vertical-align: middle;
    height: 42px;
    color: #fff;
    font-size: 16px;
    position: absolute;
    bottom: 0;
    & > span:first-child {
      font-size: 12px;
    }
    & > span:nth-child(2) {
      font-size: 16px;
      margin: 0 10px;
    }
  }
}
</style>