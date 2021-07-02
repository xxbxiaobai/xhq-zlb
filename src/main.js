import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import FastClick from 'fastclick'
import vant from 'vant'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'vant/lib/index.css';
import cookieTool from '@/util/cookie'
import { getUserDetail, userImg,csdnLoginAction } from "@/http/api";
import echarts from 'echarts'
Vue.use(vant);
Vue.prototype.ImageUrl = userImg
Vue.prototype.$echarts = echarts

FastClick.prototype.focus = function (targetElement) {
  // 判断windows phone系统
  let deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0;
  // 判断ios系统
  let deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
  let length;
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
    targetElement.focus();
  } else {
    targetElement.focus();
  }
}
//浙里办jsSDK
ZWJSBridge.onReady(() => { 
  console.log('初始化完成后，执行bridge方法') 
})
// 引入fastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

router.beforeEach((to, from, next) => {
  if (cookieTool.getCookie("tabbar", true)) { //app端隐藏底部tab
    localStorage.setItem('flag', cookieTool.getCookie("tabbar", true))
  }
  if (cookieTool.getCookie('tabbar')) {
    localStorage.setItem('tabbar', cookieTool.getCookie('tabbar'))
  }
  if (to.name === 'personList') {
    //备注备注
    const sUserAgent = window.navigator.userAgent.toLowerCase()
    const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
    const bIsAlipayMini =     sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1// 浙里办支付宝小程序
    if(bIsDtDreamApp){//浙里办环境
      alert('22222')
      alert(window.location.href)
      if( window.location.href.indexOf('login') == -1){
        alert(333333333333)
        // window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=xhsztyzhjsxt&goto=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001401448/1.1.16/index.html"
        window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=xhsztyzhjsxt&goto=http://192.168.0.155:57105"
      }
        next()
        return
    }else if(bIsAlipayMini){//支付宝浙里办环境
      if( window.location.href.indexOf('login') == -1){
        window.location.href = "https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=xhsztyzhjsxt&goto=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001401448/1.1.16/index.html"
        }
        next()
        return
    }else{//城市大脑环境
      // csdnLoginAction({
      //   authCode:"ab983b77-bc6d-4321-89c5-164f56d8b1ff"
      // }).then(res => {
      //   alert(JSON.stringify(res));
      // }).catch(err => {
      //   alert(JSON.stringify(err));
      // });
      window.yl.call("getAuthcode",{},{
        onSuccess:function(a){
          // alert(JSON.stringify(a.param))
          csdnLoginAction(a.param).then(res => {
            // alert(JSON.stringify(res));
            if(res.code==0){
            localStorage.setItem("token", res.userInfoByAccessToken.apiToken);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                id: res.userInfoByAccessToken.custUserId,
                imageid: "",
                realName: res.userInfoByAccessToken.custName,
                userName: res.userInfoByAccessToken.custName,
                sex: res.userInfoByAccessToken.sex,
                mobile:res.userInfoByAccessToken.mobile,
                idCardNo:res.userInfoByAccessToken.certNo
              })
            );
            }
            next()
            return
         }).catch(err => {
          alert(JSON.stringify(err));
        });
        },
        onFail:function(a){
          alert(JSON.stringify(a))
        }
      })

    }

  }
  // if (to.path == '/login' || to.path == '/userAgreement') {
  //   next()
  // } else {
  //   var token = localStorage.getItem('token')
  //   if (!token || token == "undefined") {
  //     var cookie = cookieTool.getCookie('front-token')
  //         //备注备注
  //     // if (!cookie) {
  //     //   next('/login')
  //     // }
  //     localStorage.setItem('token', cookie)
  //     getUserDetail().then(res => {
  //       localStorage.setItem('userLoginMsg', JSON.stringify(res.data))

  //     })
  //     next()
  //   }
  //   next()
  // }
  // 备注备注
  if(JSON.parse(sessionStorage.getItem("userInfo")).mobile){
  next()
  }
  // next()
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
// 表单验证
import validata from './util/validata'
// 文件下载
import download from './util/download'
Vue.prototype.validata = validata
Vue.prototype.download = download
Vue.prototype.$video = Video
// 引入全局的样式
import '@/style/common.less';
import { from } from 'core-js/fn/array'
// 时间格式化全局使用
Vue.filter('dateFormat', function (originVal) {
  var str1 = []
  var str = originVal
  if (str != null) {
    str = str.toString().split('')
    for (var i = 0; i < 10; i++) {
      str1[i] = str[i]
    }
  }
  var dt = str1.join('')
  return dt + ''
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
