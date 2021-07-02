<template>
  <div id="container">
    <!-- 头部开始 -->
    <van-nav-bar title="青少年运动员注册" left-arrow @click-left="onClickLeft" />
    <router-link to="/athleteRegister" style="border-bottom:1px solid black;">
      <van-cell is-link>注册信息填报</van-cell>
    </router-link>
    <router-link to="/coachReview">
      <van-cell is-link>教练确认</van-cell>
    </router-link>
  </div>
</template>


<script>
export default {
  methods: {
    //点击跳转
    onClickLeft() {
     this.$router.go(-1);
    }
  }
};
components: {
}
</script>
<style scoped lang="less">
#container {
  background-color: #f1f1f1;
  .van-nav-bar {
    background-color: #0091ff;
    div,
    .van-icon,
    .van-nav-bar__text {
      color: white;
    }
  }
}
</style>
