<template>
  <div>
    <van-nav-bar title="科学健身" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="menu-list">
      <ul class="menu-list-wrap">
        <li class="menu-item">
          <!-- <a href="#"> -->
          <router-link to="/scientific-fitness" class="menu-wrap">
            <div class="menu-item-box">
              <p class="title">科学健身指导</p>
              <p class="sub-title">为大众提供体育健身等视频内容</p>
            </div>
          </router-link>
          <!-- </a> -->
        </li>
        <li class="menu-item">
          <router-link to="/instructor" class="menu-wrap">
            <div class="menu-item-box">
              <p class="title">社会体育指导员</p>
              <p class="sub-title">提供专业的社会体育指导员查询</p>
            </div>
          </router-link>
        </li>
        <!-- <li class="menu-item">
          <router-link to="/trainlist" class="menu-wrap">
            <div class="menu-item-box">
              <p class="title">体育指导员培训</p>
              <p class="sub-title">提供社会体育指导员培训报名</p>
            </div>
          </router-link>
        </li> -->
        <li class="menu-item">
          <router-link to="/physicalMeasurements" class="menu-wrap">
            <div class="menu-item-box">
              <p class="title">国民体质测试</p>
              <p class="sub-title">国民体质测试项目介绍和标准</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { instructorGroup } from "@/http/api";
import { zlbFun } from "@/util/Tool";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      name: "",
      tel: "",
      code: ""
    };
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
  computed: {
    ...mapGetters(["userMsg", "userInformation"])
  },
  created() {
    zlbFun("科学健身");
    // console.log(this.userMsg)
    let code = this.userInformation.mobile;
    console.log(this.userInformation);
    this.name = this.userInformation.realname;
    this.tel = this.userInformation.mobile;
    instructorGroup({ code }).then(res => {
      console.log(res);
      this.code = res.data;
    });
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.menu-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32px 15px 0 15px;
  margin-top: 30px;
  background-color: #f6f8f7;
  .menu-item {
    position: relative;
    height: 108px;
    overflow: hidden;
    margin-bottom: 11px;
    .menu-item-box {
      margin-left: 10px;
      margin-top: 35px;
      .title {
        margin-bottom: 7px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
      }
      .sub-title {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 12px;
      }
    }
    &:first-child {
      background: url("../../assets/kxjs.png") center no-repeat;
      background-size: 100%;
    }
    &:nth-child(2) {
      background: url("../../assets/shtyzdy.png") center no-repeat;
      background-size: 100%;
    }
    &:nth-child(3) {
      background: url("../../assets/tyzdypx.png") center no-repeat;
      background-size: 100%;
    }
    &:nth-child(4) {
      background: url("../../assets/1a.png") center no-repeat;
      background-size: 100%;
    }
    &:last-child {
      background: url("../../assets/tyzdypx.png") center no-repeat;
      background-size: 100%;
    }
  }
}
</style>
