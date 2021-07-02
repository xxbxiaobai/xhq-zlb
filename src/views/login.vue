<template>
  <div id="login">
    <div class="logo">
      <img src="../assets/logo@2x.png" alt="">
    </div>
    <!-- <div class="tab">
      <p>
        验证码登录
        <span></span>
      </p>
    </div> -->
    <van-form class="form">
      <li class="phoneCode">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <div class="checkCode">
          <span v-show="show" @click="getCode">获取验证码</span>
          <span v-show="!show" class="count">重新发送({{count}}) s</span>
        </div>
      </li>
      <li class="code_container">
        <van-field
          v-model="checkNum"
          name="验证码"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <div class="code_info" v-show="isShow">
          <van-icon name="info-o" />
          <span>验证码错误</span>
        </div>
      </li>
    </van-form>
    <div class="promise">
      <van-checkbox v-model="checked" checked-color="#4baefe" icon-size="12">
        同意
        <a href="javascript:;" @click="$router.push('/userAgreement')">《西湖体育用户协议》</a>
      </van-checkbox>
    </div>
    <div class="button" @click="getLogin">
      <img src="../assets/login_btn_login_selected@2x.png" alt v-if="checked" />
      <img src="../assets/login_btn_login_default_@2x.png" alt v-else />
      <span >登录</span>
    </div>
  </div>
</template>
<script>
import { sendLoginCode, codeLogin } from "@/http/api";
import cookieTool from "@/util/cookie";
export default {
  data() {
    return {
      isShow: false,
      phone: "",
      checkNum: "",
      password: "",
      show: true,
      count: "",
      timer: null,
      checked: false
    };
  },
  methods: {
    submit() {},
    getLogin() {
      // 是否测试环境
      const Test = false
      if(Test) {
        // 测试
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzNUZFQUJEQ0RDREYwQjU5RUQ0QzE4MjEzQkJGMkRFOCIsInVzZXJOYW1lIjoiMTg1Mzc0NDExNjMiLCJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAmICM0MElOVkFMSURpUGhvbmVJTlZBTElEIENQVSBpUGhvbmUgT1MgMTNfMl8zIGxpa2UgTWFjIE9TIFgmICM0MUlOVkFMSUQgQXBwbGVXZWJLaXQvNjA1LjEuMTUgJiAjNDBJTlZBTElES0hUTUwsIGxpa2UgR2Vja28mICM0MUlOVkFMSUQgVmVyc2lvbi8xMy4wLjMgTW9iaWxlLzE1RTE0OCBTYWZhcmkvNjA0LjEgRWRnLzg0LjAuNDE0Ny44OSJ9.oa7L8dJ_n_essV2ig5F_nlBkM7I1S_Ygit64G3xe2Dc'
        const data = {
          "id": 9,
          "userName": "18537441163",
          "realName": null,
          "password": "123456",
          "mobile": "18537441163",
          "phone": null,
          "sex": 1,
          "idCard": null,
          "addr": null,
          "birthplace": null,
          "birthday": null,
          "role": null,
          "unitId": null,
          "unitName": null,
          "status": 0,
          "createTime": "2020-07-19T14:28:09.000+0800",
          "logonMode": null,
          "image": {
            "id": null,
            "msgId": null,
            "fieldName": null,
            "name": null,
            "isImg": null,
            "contentType": null,
            "size": 0,
            "path": null,
            "url": null,
            "ossurl": null,
            "source": null,
            "status": null,
            "mark": null,
            "insetsUrl": null,
            "insetsOss": null,
            "createTime": null,
            "pathDir": null
          }
        }
        cookieTool.setCookie("front-token", token ,360);
        localStorage.setItem("userLoginMsg",JSON.stringify(data))
        localStorage.setItem("token", token);
        this.$router.push("/"); 
      } else {
        // 正式
        if (!this.phone || !this.checkNum || !this.checked) {
            return false;
          }
          codeLogin({
            mobile: this.phone,
            code: this.checkNum
          }).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$store.state.userLoginMsg = res.data
              localStorage.setItem("userLoginMsg",JSON.stringify(res.data))
              localStorage.setItem("token", res.token);
              cookieTool.setCookie("front-token", res.token,360);
              this.$router.push("/");
            }
          }).catch(err => {
            console.log(err);
          });
      }
    },
    getCode() {
      //获取验证码
      if (!this.phone || this.count) {
        return false;
      }
      sendLoginCode({
        mobile: this.phone
      }).then(res => {
        console.log(res);
        if(res.code === 1) {
          return this.$toast(res.msg)
        }
      }).catch(err => {
        console.log(err);
      });

      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  .promise {
    padding: 16px;
    font-size: 12px;
    a {
      color: #4baefe;
    }
  }
  .form {
    margin-top: 2rem;
  }
  .phoneCode {
    position: relative;
    .checkCode {
      position: absolute;
      top: 0.5rem;
      right: 0.8rem;
      color: #4baefe;
      font-size: 14px;
    }
  }
  .button {
    width: 100%;
    height: 2.15rem;
    line-height: 2.15rem;
    text-align: center;
    font-size: 0.7rem;
    margin-top: 2.5rem;
    position: relative;
    z-index: 5;
    img {
      width: 10rem;
      height: 2rem;
    }
    span {
      position: absolute;
      color: #fff;
      left: 50%;
      top: 50%;
      font-size: 16px;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }
}
.logo {
  width: 4rem;
  height: 4rem;
  // background: rgba(153, 153, 153, 1);
  margin: 4rem auto;
  img{
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }
}
.tab {
  p {
    text-align: center;
    font-size: 16px;
    color: #0172fe;
  }
}
.modifyPassword {
  height: 100%;
  /deep/.van-nav-bar__title {
    font-size: 18px;
    font-weight: 700;
  }
  background: #f6f8f7;

  .code_container {
    position: relative;
    .code_info {
      position: absolute;
      top: 0.5rem;
      right: 0.8rem;
      color: #fe3116;
      font-size: 12px;
      /deep/.van-icon {
        vertical-align: middle;
        margin-right: 4px;
      }
    }
  }
}
</style>