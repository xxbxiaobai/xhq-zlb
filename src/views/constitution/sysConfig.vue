<template>
  <div class="config">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <ul class="config_item">
      <!-- <li @click="gotoPage(0)">
          <span>修改密码</span>
          <img src="./img/jt.png" alt="" >
      </li> -->
      <li  @click="gotoPage(1)">
          <span>意见反馈</span>
          <img src="./img/jt.png" alt="">
      </li>
      <li @click="gotoPage(2)">
          <span>关于我们</span>
          <img src="./img/jt.png" alt="" >
      </li>
    </ul>
    <!-- <div class="button" @click="editLogin">
        退出登录
    </div> -->
  </div>
</template>
<script>
import cookieTool from '@/util/cookie'
export default {
  data() {
    return {};
  },
  methods:{
      editLogin(){
        window.location.href = "sxty://exit"
        localStorage.removeItem('token')
        localStorage.removeItem("userLoginMsg")
        cookieTool.clearCookie('front-token')
        this.$router.push('/login')
      },
      goBack(){
          this.$router.back()
      },
      gotoPage(n){
          if(n==0){
              this.$router.push({
                  path: "/modifyPassword"
              })
          }else if(n==1){
              this.$router.push({
                  path: "/feedback"
              })
          }else if(n == 2){
              this.$router.push({
                  path: "/aboutUs"
              })
          }
      }
  }
};
</script>

<style lang="less" scoped>
.config{
    height: 100%;
    background-color: #F6F8F7;
}
.config_item{
    font-size: 0.7rem;
    li{
        height: 2.15rem;
        line-height: 2.15rem;
        background-color: #fff;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 0.8rem;
            height: 0.9rem;
        }
    }
    &>li:first-child{
        margin-bottom: 10px;
    }
    &>li:nth-child(2){
        border-bottom: 1px solid #F6F8F7;
    }
}
.button{
    width: 100%;
    height: 2.15rem;
    line-height: 2.15rem;
    text-align: center;
    font-size: 0.7rem;
    color: #fff;
    background:linear-gradient(90deg,rgba(68,141,254,1) 0%,rgba(76,179,254,1) 100%);
    margin-top: 2.5rem;
}
</style>