<template>
  <div class="">
    <van-cell-group
      v-for="item in listconten"
      :key="item.key"
      @click="Persdetails(item.idCardNo)"
    >
      <van-cell title="姓名" :label="item.username">
        <!-- <van-cell   slot="default"> 你好吗</van-cell>
  <van-cell   slot="default"> w好吗</van-cell> -->
        <div class="listRight">
          <div style="text-align: left; color: #666;font-size: 12px;">
            <span>身份证号</span>
          </div>
          <img
            :src="listimg"
            alt=""
            style="float: right; margin-top: -6px; width: 8px;"
          />
          <div
            style="text-align: left;font-weight: bolder;color: #000;font-size: 14px;"
          >
            <span>{{ item.idCardNo }}</span>
          </div>
        </div>
      </van-cell>
      <!-- <div> -->

      <!-- </div> -->
    </van-cell-group>
    <center
      style="text-align: -moz-center;position: absolute; bottom: 140px; width: 100%;"
    >
      <van-button
        style="background-color: #28CFB3; border: 0; margin-top: 10px; font-size: 16px; width: 230px; height: 40px;"
        type="info"
        round
        block
        @click="addperson"
      >
        添加人员
      </van-button>
    </center>
    <!-- <center
      style="text-align: -moz-center;position: absolute; bottom: 110px; width: 100%;"
    >
      <van-button
        style="background-color: red; border: 0; margin-top: 30px; font-size: 16px; width: 230px; height: 40px;"
        type="info"
        round
        block
        @click="UnbundlingWeChat"
      >
        解绑微信
      </van-button>
    </center> -->
    <center
      style="text-align: -moz-center;position: absolute; bottom: 90px; width: 100%;"
    >
      <van-button
        style="background-color: #0061ED; border: 0; margin-top: 30px; font-size: 16px; width: 230px; height: 40px;"
        type="info"
        round
        block
        @click="TechnicalSupport"
      >
        技术支持
      </van-button>
    </center>
        <!-- <center
      style="text-align: -moz-center;position: absolute; bottom: 210px; width: 100%;"
    >
    <div class="prompt_text">*非浙江户口请在工作日08:00~18:00注册及修改信息</div>
    </center> -->
     <footer>
      <p>本服务由浙江政务网、西湖区文广旅体局提供</p>
      <p @click="phone1()">
        服务咨询热线:0571-88808880
      </p>
    </footer>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="friends-o">
        人员列表
      </van-tabbar-item>
      <van-tabbar-item replace to="/perMap" icon="location-o">
        地图
      </van-tabbar-item>
      <van-tabbar-item replace to="/DataStatistics" icon="chart-trending-o">
        数据统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { PersonnelInformation,mobileUserInfoNew } from "../../http/api";
import { zlbFun, getQueryString } from "@/util/Tool";
import {
  Toast,
  Dialog
} from 'vant'
// import domain from '../../domain.js'
export default {
  components: {
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },

  data() {
    return {
      //   title: '赛事活动',
      listconten: [],
      phone: '',
      listimg: require('./images/icon_more@2x.png'),
      userTypeStr:'',//用户类型
      latitudeStr:'',
      longitudeStr:'',
    }
  },
  // 计算属性
  computed: {
    // submitBarText() {
    //   const count = this.checkedGoods.length;
    //   return '结算' + (count ? `(${count})` : '');
    // },
    // totalPrice() {
    //   return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
    // }
  },
  // 函数要在这个方法下面添加
  methods: {
    phone1(){
      ZWJSBridge.phoneCall({
     corpId:'0571-88808880'
      }).then((result) => {
          console.log(result);
      }).catch((error) => {
          console.log(error);
      });
    },
    DataRequest(phone) {
      // alert(phone);
      Toast.loading({
        message: '请稍等...',
        forbidClick: true,
        duration: 0
      })
        PersonnelInformation({
        mobile: phone,
      })
        .then((response) => {
          console.log(response);
          if (response.code == 0) {
            // 取消等待
            Toast.clear()
            this.count = response.data.length
            response.data.forEach(item => {
              this.listconten.push(item)
            })
          }
        })
        .catch(function(error) {
          Toast.clear()
          console.log(error);
        });
    },
    Persdetails(idCardNo) {
      this.$router.push({
        path: '/persondetails',
        name: 'persondetails',
        query: {
          idCardNo: idCardNo,
          phone: this.phone
        }
      })
    },
    addperson() {
      this.$router.push({
        path: '/PersonInfo',
        name: 'PersonInfo',
        query: {
          phone: this.phone
        }
      })
    },
    UnbundlingWeChat() {
      Dialog.confirm({
        title: '提示',
        message: '确定要解绑微信吗？'
      })
        .then(() => {
          // on confirm
          this.getUnbWeChat()
        })
        .catch(() => {
          // on cancel
        })
    },
    // 技术支持
    TechnicalSupport() {
      this.$router.push({
        path: '/Techical',
        name: 'Techical'
      })
    },
    getUnbWeChat() {
      var openid = localStorage.getItem('openid')
      // 测试测试
      this.$axios
        .get(
          domain.testUrl + 'api-movement/map/api/user/exit?openid=' + openid,
          {
            headers: {
              'front-token': localStorage.getItem('apitoken')
            }
          }
        )
        .then(response => {
          console.log(response.data)
          // eslint-disable-next-line eqeqeq
          if (response.data.code == 0) {
            // alert('11111111');
            // 清空存储内容
            localStorage.removeItem('phone')
            this.$router.push({
              path: '/',
              name: 'index',
              query: {
                phone: this.phone
              }
            })
          } else {
            Toast.fail('解绑失败')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
      //获取用户信息
    ObtainingUserInformation(id) {
      mobileUserInfoNew({
        userId: id
      }).then(res => {
        alert(JSON.stringify(res));
        console.log(res);
          if (res.code == 0) {
    localStorage.setItem("userDetails",JSON.stringify(res.user))
          sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                id: res.user.id,
                imageid: res.user.image,
                realName: res.user.realName,
                userName: res.user.userName,
                sex: res.user.sex,
                mobile:res.user.mobile,
                idCardNo:res.user.idCardNo
              })
            );
          this.ZhejiangDoBuriedPoint(res.user.id,res.user.realname)
                // 备注备注
          this.DataRequest(JSON.parse(sessionStorage.getItem("userInfo")).mobile);
          console.log(JSON.parse(sessionStorage.getItem("userInfo")))
          }
        })
        .catch(err => {
          // alert(JSON.stringify(err));
          console.log(err);
        });
    },
        //浙里办埋点
    ZhejiangDoBuriedPoint(id,realname){
      // alert(id);
// 如采集用户信息是异步行为需要先执行这个 BLOCK 埋点 
aplus_queue.push({ 
  action: 'aplus.setMetaInfo', 
  arguments: ['_hold', 'BLOCK'] 
  }); 
  // 设置会员昵称 
aplus_queue.push({ 
    action: "aplus.setMetaInfo", 
    arguments: ["_user_nick", realname] 
  }); 
    // 设置会员 ID 
aplus_queue.push({ 
    action: "aplus.setMetaInfo", 
    arguments: ["_user_id", id] 
  }); 
aplus_queue.push({ 
    action: "aplus.setMetaInfo", 
    arguments: ["_dev_id", "yourDeviceId"] 
  }); 
  aplus_queue.push({ 
    action: 'aplus.sendPV', 
    arguments: [{ 
      // 写死即可 
      is_auto: false, 
      }, 
      {
        isMini: true, 
        // args 自定义参数，注意：参数值只支持字符串类型，不支持多层 json 嵌套 
        long:this.longitudeStr, 
        lati:this.latitudeStr, 
        userType:this.userTypeStr, 
        miniAppName:'智慧体育', 
        miniAppId:'2001401448' 
       }] 
       });
// 如采集用户信息是异步行为，需要在设置完用户信息后执行这个 START 埋点 
// 此时被 block 住的日志会携带上用户信息逐条发出 
aplus_queue.push({ 
  action: 'aplus.setMetaInfo', 
  arguments: ['_hold', 'START'] 
  });
    }
  },
  created() {
    alert(1111)
    const sUserAgent = window.navigator.userAgent.toLowerCase()
    const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
    console.log(bIsDtDreamApp)
    const bIsAlipayMini =     sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1// 浙里办支付宝小程序
    if(!bIsDtDreamApp||bIsAlipayMini){//浙里办环境
      //获取浙里办用户类型
    ZWJSBridge.getUserType().then((result) => { 
      console.log(result); 
      if(result.userType==0||result.userType==1){
      this.userTypeStr='个人';
      }else{
      this.userTypeStr='企业';
      }
      }).catch((error) => { 
        console.log(error); 
      });
      //获取浙里办经纬度
    ZWJSBridge.getLocation() .then((result) => { 
        console.log(result); 
        this.latitudeStr=result.latitude;
        this.longitudeStr=result.longitude;
        }).catch((error) => { 
          console.log(error); 
        });
    // alert(window.location.href);
          if (window.location.href.split('=')[1] === "false#/"){
                  this.$dialog
                  .alert({
                    title: "",
                    message: "请您完成实名制认证，谢谢"
                  })
                  .then(() => { 
                    dd.biz.util.close();
                  });
                return;
              }
            // alert(getQueryString("user"));
            console.log(getQueryString("user"));
        //备注备注测试
        // localStorage.setItem("tokenandUserId", '{"apiToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMDlGNzk1NDNDRDBFQjQ5Q0ZBODdFOTM3QkQyQkVGNSIsInVzZXJOYW1lIjoiMTMwODUxMzk0MjkiLCJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAmICM0MElOVkFMSURMaW51eElOVkFMSUQgVUlOVkFMSUQgQW5kcm9pZCAxMElOVkFMSUQgemgtQ05JTlZBTElEIEJNSC1BTjIwIEJ1aWxkL0hVQVdFSUJNSC1BTjIwJiAjNDFJTlZBTElEIEFwcGxlV2ViS2l0LzUzNy4zNiAmICM0MElOVkFMSURLSFRNTCwgbGlrZSBHZWNrbyYgIzQxSU5WQUxJRCBWZXJzaW9uLzQuMCBDaHJvbWUvNjkuMC4zNDk3LjEwMCBVV1MvMy4yMS4wLjE3OCBNb2JpbGUgU2FmYXJpLzUzNy4zNiBKdXBpdGVyLzEuMCBBcHBDaGFubmVsL2JiNjYyNTM5ZTMwYTRiY2M4Y2IzZDljMTljNjIxYTkxIE1vemlsbGEvNS4wICYgIzQwSU5WQUxJRExpbnV4SU5WQUxJRCBVSU5WQUxJRCBBbmRyb2lkIDEwSU5WQUxJRCB6aC1DTklOVkFMSUQgQk1ILUFOMjAgQnVpbGQvSFVBV0VJQk1ILUFOMjAmICM0MUlOVkFMSUQgQXBwbGVXZWJLaXQvNTM3LjM2ICYgIzQwSU5WQUxJREtIVE1MLCBsaWtlIEdlY2tvJiAjNDFJTlZBTElEIFZlcnNpb24vNC4wIENocm9tZS82OS4wLjM0OTcuMTAwIFVXUy8zLjIxLjAuMTc4IE1vYmlsZSBTYWZhcmkvNTM3LjM2IEp1cGl0ZXIvMS4wIEFwcENoYW5uZWwvYmI2NjI1MzllMzBhNGJjYzhjYjNkOWMxOWM2MjFhOTEgL2hhbndlYl9hbmRyb2lkXy9oYW53ZWIvZHRkcmVhbXdlYi9idW5kbGVWZXJzaW9uNi44LjIgQXRtQW5hbHl0aWNzLzEuMC4wIDAwMDAwMUBaTEJfYW5kcm9pZF82LjguMiJ9.8JdVn5g7g74SW2Ar3P6cyftroZ0LAS5P0ZjNLcSmekE","userId":22859}');
        //正式
      //  localStorage.setItem("tokenandUserId", getQueryString("user"));
      //  localStorage.setItem("token", JSON.parse(localStorage.getItem("tokenandUserId")).apiToken);
      // this.ObtainingUserInformation(JSON.parse(localStorage.getItem("userInfo")).userId)
      this.ObtainingUserInformation(JSON.parse(localStorage.getItem("userInfo")).userId)
      //  备注备注
        // this.DataRequest(JSON.parse(localStorage.getItem("userInfo")).mobile);
    }else{//城市大脑环境
    if(JSON.parse(sessionStorage.getItem("userInfo")).mobile){
    // 备注备注
    this.DataRequest(JSON.parse(sessionStorage.getItem("userInfo")).mobile);
    }
    }
  }
  //   beforeCreate() {
  //     document.querySelector('body').setAttribute('style', 'background:#F6FAFD')
  //   },
  //   beforeDestroy() {
  //     document.querySelector('body').setAttribute('style', '')
  //   }
}
</script>
<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif  !important; 
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
</style>
<style lang="less">
body {
  width: 100%;
  height: 100%;
  //   position: relative;
  background-color: #f6fafd;
}
.van-cell__title {
  text-align: left;
  color: #666;
  font-size: 12px;
  margin-right: -80px;
}
.van-cell__label {
  font-weight: bolder;
  color: #000;
  font-size: 14px;
}

.van-cell-group {
  margin: 10px;
  border-radius: 5px;
}
.prompt_text {
  font-size: 12px;
  color: red;
}
.van-hairline--top-bottom::after{
  border: 0px;
}
 footer {
   position: fixed;
   bottom: 50px;
   left: 0;
   right: 0;
    width: 100%;
    height: 1.6rem;
    // padding-top: 0.5rem;
    background-color: #fff;
    text-align: center;
    p {
      font-size: 0.6rem;
      color: #999;
    }
  }
</style>
