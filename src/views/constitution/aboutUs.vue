<template>
  <div class="about_us">
    <van-nav-bar title="关于我们" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="logo">
      <img src="../../assets/logo@2x.png" alt="">
    </div>
    <div class="footer_info">
        <p @click="LookProtocol"><span>《用户服务协议》</span></p>
        <p>和</p>
        <p @click="LookPrivacy"><span>《隐私政策》</span></p>
        <p>Copyright © 西湖区文化和广电旅游体育局. All rights reserved.</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showProtocol: false,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    LookProtocol() {
      this.$router.push({
        path: '/userProtocol'
      })
    },
    LookPrivacy() {
      this.$router.push({
        path: '/userPrivacy'
      })
    }
  }
};
</script>
<style lang="less" scoped>
.about_us {
  height: 100%;
  background-color: #f6f8f7;
  /deep/.van-nav-bar__title {
    font-weight: 700;
    font-size: 18px;
  }
  .logo {
    width: 4.15rem;
    height: 4.15rem;
    margin: 4rem auto;
    color: #fff;
    line-height: 4.15rem;
    text-align: center;
    img{
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  }
  .footer_info{
    position: fixed;
    bottom: 2rem;
    font-size: 12px;
    width: 100%;
    color: #999;
    p{
      text-align: center;
      span{
        color: #4590FE;
      }
    }
    &>p:last-child{
      margin-top:1rem;
   
    }
  }
}
</style>