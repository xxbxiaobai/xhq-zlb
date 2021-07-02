<template>
  <div class="modifyPassword">
    <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <van-form @submit="onSubmit">
      <li class="phoneNum">
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
          <van-icon name="info-o"/>
          <span>验证码错误</span>
        </div>
      </li>

      <van-field
        v-model="password"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
    </van-form>
    <div class="button" @click="submit">提交</div>
  </div>
</template>
<script>
import { sendEditPasswordCode,editPasswordCode } from "@/http/api";
export default {
  data() {
    return {
      isShow: false,
      phone: "",
      checkNum: "",
      password: "",
      show: true,
      count: "",
      timer: null
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    //修改密码
    submit(){
      if(!this.phone || !this.checkNum || !this.password){
        return false
      }
      editPasswordCode({
        mobile: this.phone,
        code: this.checkNum,
        password: this.password
      })
      .then(res=>{
        if(res.code == 0){
          alert('修改成功')
        }else{
          alert('保存失败')
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getCode() {
      //获取验证码
      if(!this.phone || this.count){
        return false
      }
      sendEditPasswordCode({
        mobile: this.phone
      })
      .then(res=>{
        console.log(res)
      })

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
.modifyPassword {
  height: 100%;
  /deep/.van-nav-bar__title {
    font-size: 18px;
    font-weight: 700;
  }
  background: #f6f8f7;
  .button {
    width: 100%;
    height: 2.15rem;
    line-height: 2.15rem;
    text-align: center;
    font-size: 0.7rem;
    color: #fff;
    background: linear-gradient(
      90deg,
      rgba(68, 141, 254, 1) 0%,
      rgba(76, 179, 254, 1) 100%
    );
    margin-top: 2.5rem;
  }
  .phoneNum {
    position: relative;
    .checkCode {
      position: absolute;
      top: 0.5rem;
      right: 0.8rem;
      color: #4baefe;
      font-size: 14px;
    }
  }
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