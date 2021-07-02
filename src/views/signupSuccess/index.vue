<template>
  <div id="container" class="coach-review">
    <!-- 头部开始 -->
    <!-- <van-nav-bar title="提交成功" left-arrow></van-nav-bar> -->
    <!-- 头部结束 -->
    <div class="img-box">
      <img src="../../assets/head.png" alt />
      <h4>提交成功</h4>
      <p>请到比赛地点缴费</p>
    </div>
    <div class="footer">
      <div class="footer-button" @click="complete">完成</div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: { complete() {
    this.$router.push({path:"/myApply"});
  } },
  created() {}
};
</script>
<style scoped lang="less">
#container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-top: 2.3rem;
  .img-box {
    margin-top: 3.5rem;
    text-align: center;
    img {
      width: 3.25rem;
      height: 3.25rem;
    }
    h4 {
      margin-top: 2.25rem;
      margin-bottom: 0.8rem;
      font-size: 0.9rem;
    }
    p {
      font-size: 0.65rem;
      color: #666666;
    }
  }

  .van-nav-bar {
    background-color: #0091ff;
    div,
    .van-icon,
    .van-nav-bar__text {
      color: white;
    }
    .check {
      display: inline-block;
      margin-left: 0.6rem;
    }
  }
  .footer {
    position: fixed;
    bottom: 7.5rem;
    width: 100%;
    font-size: 0.7rem;
    color: #ffffff;
    text-align: center;
    padding: 0 1rem;
    .footer-button {
      display: inline-block;
      width: 9.5rem;
      height: 2.1rem;
      line-height: 2.1rem;
      background: rgba(0, 145, 255, 1);
      border-radius: 0.2rem;
    }
  }
}
</style>
<style lang="less">
.coach-review {
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
