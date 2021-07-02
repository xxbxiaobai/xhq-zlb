<template>
  <div>
    <van-nav-bar title="赛事活动" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="menu-list">
      <ul class="menu-list-wrap">
        <li class="menu-item">
          <!-- <a href="#"> -->
          <router-link to="/competition" class="menu-wrap">
            <div class="menu-item-box">
              <p class="title">赛事活动公告</p>
              <p class="sub-title">为大众提供赛事活动信息</p>
            </div>
          </router-link>
          <!-- </a> -->
        </li>
        <li class="menu-item">
          <router-link :to="{path:'/catalog',query:{origin:'match'}}" class="menu-wrap">
            <div class="menu-item-box">
              <p class="title">赛事活动报名</p>
              <p class="sub-title">提供各项赛事活动报名</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { zlbFun } from "@/util/Tool";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      window.location.href = "sxty://back"
      this.$router.push("/");
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },
  created() {
    zlbFun("赛事活动");
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.menu-list {
  margin-top: 30px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32px 15px 0 15px;
  background-color: #f6f8f7;
  .menu-item {
    position: relative;
    height: 108px;
    overflow: hidden;
    margin-bottom: 11px;
    .menu-item-box {
      margin-left: 123px;
      margin-top: 37px;
      .title {
        margin-bottom: 7px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
      }
      .sub-title {
        max-width: 80%;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
      }
    }
    &:first-child {
      background: url("../../assets/gonggao-bg.png") center
        no-repeat;
      background-size: 100%;
    }
    &:nth-child(2) {
      background: url("../../assets/baoming-bg.png") center
        no-repeat;
      background-size: 100%;
    }
    &:nth-child(3) {
      background: url("../../assets/chengji-bg.png") center
        no-repeat;
      background-size: 100%;
    }
    &:last-child {
      background: url("../../assets/baoming-bg.png") center
        no-repeat;
      background-size: 100%;
    }
  }
}
</style>
