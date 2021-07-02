<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="ban">
      <img src="./images/ing.png" />
    </div>
    <div class="text">已参赛，请等待成绩确认</div>
    <div class="bottom">
      <button class="btn1">
        <img src="./images/nav.png" />导航
      </button>
      <button>电话</button>
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool"
import Tabar from "../../components/Tabar"
export default {
  data() {
    return {
      title: "活动报名"
    }
  },

  methods: {},
  components: {
    Tabar
  },
  created() {
    zlbFun("活动报名")
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #fff;
  .ban {
    width: 100%;
    height: 13rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text{
    margin-top: 3.4rem;
    text-align: center;
    font-size: .7rem;
    color: #666666;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    box-shadow:0px -1px 0px 0px rgba(0, 0, 0, 0.09);
    button {
      width: 8rem;
      height: 1.6rem;
      background-color: #1492ff;
      font-size: 0.7rem;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.3rem;
    }
    .btn1 {
      background-color: #fff;
      color: #000000;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 0.3rem;
      img {
        width: 0.65rem;
        height: 0.75rem;
        vertical-align: middle;
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
