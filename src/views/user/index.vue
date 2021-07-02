<template>
  <div id="container">
    <van-nav-bar title="我的健身圈" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-image width="100vw" height="10rem" fit="cover" :src="head" />
    <article data-v-626542b8 class="son" ref="son_user"></article>
    <div class="box">
      <div>
        <span>870</span>
        <span style="font-size:14px;">我的卡路里</span>
      </div>
    </div>
    <div class="tab">
      <router-link to="/user/myCommunity">
        <van-cell title="我的社团" icon="medal-o" is-link></van-cell>
      </router-link>
      <router-link to="/user/myCrowd">
        <van-cell title="健身群" icon="friends-o" is-link></van-cell>
      </router-link>
    </div>
  </div>
</template>


<script>
let head = require("../../assets/507.png");
export default {
  data() {
    return {
      head
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.son_user.style.backgroundImage = "url(" + JSON.parse(sessionStorage.getItem("userInfo")).url + ")";
    this.$refs.son_user.style.backgroundRepeat = "no-repeat";
    this.$refs.son_user.style.backgroundPosition = "center";
    this.$refs.son_user.style.backgroundSize = "cover";
  }
};
</script>


<style scoped lang="less">
#container {
  /deep/.van-cell__left-icon {
    color: #458efe;
  }
  .box {
    border-radius: 0.25rem;
    height: 4rem;
    margin: 0 0.5rem;
    padding: 0.8rem;
    background: linear-gradient(to right, #5bdca1, #1e8aa2);
    div {
      display: flex;
      flex-flow: column;
      font-size: 1rem;
      color: white;
      span {
        font-family: PingFang SC;
        font-weight: 500;
      }
    }
    h3 {
      border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
      text-align: right;
      font-size: 0.7rem;
      line-height: 0.7rem;
      color: white;
    }
  }
  .tab {
    margin-top: 1rem;
  }

  article {
    position: relative;
    top: -2rem;
    background: url("../../assets/nan.png") no-repeat center;
    background-size: cover;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin: auto;
    margin-bottom: -1rem;
    left: -7rem;
    border:none;
  }
}
</style>
