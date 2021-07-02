<template>
  <div class="body">
    <!-- 头部 -->
    <van-nav-bar title="取消预约" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="achieve">
      <textarea v-model="val" v-if="state=='取消预约'" placeholder="取消原因"></textarea>
    </div>

    <div v-if="state=='完成'" class="achieve">
      <img src="./img/wancheng@2x.png" alt />
      <h4>提交完成</h4>
      <article
        style="color:#666666;font-size:0.7rem;
font-family:PingFang SC;
font-weight:500;"
      >等待测定站点确认</article>
    </div>
    <div class="bt">
      <p @click="accomplish">{{state}}</p>
    </div>
  </div>
</template>
<script>
import { CallOff } from "../../http/api";
export default {
  data() {
    return {
      state: "取消预约",
      val: ""
    };
  },
  components: {},
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 完成
    accomplish() {
      if(this.state === '完成'){
      this.$router.go(-1);
      }
      this.state = "完成";
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  background: white;
  height: 100%;
}
.achieve {
  width: 18.75rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  img {
    width: 3.25rem;
    height: 3.25rem;
    margin: 0 auto;
    margin-top: 6.85rem;
  }
  h4 {
    // width:3.55rem;
    //height:0.85rem;
    font-size: 0.9rem;
    font-family: PingFang SC;
    font-weight: 800;
    color: rgba(0, 0, 0, 1);
    margin-top: 2.25rem;
  }
}
.bt {
  position: fixed;
  bottom: 15%;
  width: 18.75rem;
  p {
    margin: 0 auto;
    text-align: center;
    width: 9.5rem;
    height: 2rem;
    background: #1492ff;
    font-size: 0.9rem;
    color: #ffffff;
    line-height: 2rem;
    border-radius: 0.15rem;
    margin-bottom: 3% !important;
  }
}

textarea {
  padding: 0.4rem;
  width: 17.55rem;
  height: 9.5rem;
  margin: 0.5rem auto;
  border: 1px solid #e7e7e7;
}
</style>