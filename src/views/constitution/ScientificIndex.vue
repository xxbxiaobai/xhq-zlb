<template>
  <div id="home">
    <!-- 搜索栏 -->
    <!-- <van-nav-bar title="科学健身" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <ul>
       <!-- <a href="http://223.4.69.177/home/index.html#/scientific-fitness">
      <li class="lia">
        <div>
          <h4>科学健身指导员</h4>
          <p>为大众提供体育健康等视频内容</p>
        </div>
      </li>
      </a> -->
      <li class="lib" @click="instructor">
        <div>
          <h4>社会体育指导员</h4>
          <p>提供体育指导员信息查询</p>
        </div>
      </li>
      <!-- <a href="http://223.4.69.177/pq/pxml/index.html#/trainlist">
        <li  class="lic">
          <div>
            <h4>社会指导员等级培训</h4>
            <p>提供社会体育指导员培训报名</p>
          </div>
        </li>
      </a> -->
      <li  class="lid" @click="constitu">
        <div>
          <h4>体质测定站点</h4>
          <p>搜索附近的免费国民体质测定站点</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import {zlbFun} from "@/util/Tool";
import { Icon, Toast } from "vant";
Vue.use(Icon).use(Toast);
export default {
  data() {
    return {
      vaule: []
    };
  },

  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
      //   this.$router.push({
      //     path: "/myMeasure"
      //   });
    },
    constitu() {
      this.$router.push({
        path: "/constitu"
      });
    },
    instructor() {
      this.$router.push({
        path: "/instructor"
      });
    }
  },

  created() {
    zlbFun('科学健身')
  }
};
</script>

<style lang='less' scoped>
#home {
  background: white;
  height: 100%;
}
ul {
  margin-top: 1rem;
  li {
    width: 90%;
    height: 5.375rem;
    border-radius: 0.375rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    display: flex;
    //  justify-content: center;
    align-items: center;
    > div {
      margin-left: 6.275rem;
    }
    h4 {
      //  width:4.75rem;
      height: 0.75rem;
      font-size: 0.8rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.625rem;
    }
    p {
      //  width:8.35rem;
      height: 0.6rem;
      font-size: 0.6rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 0.625rem;
      margin-top: 0.31rem;
    }
  }
  .lia{
    background-image: url(img/1@2x.png);
    background-size: 100%;
  }
  .lib{
    background-image: url(img/2@2x.png);
    background-size: 100%;
  }
  .lic {
    background-image: url(img/4@2x.png);
    background-size: 100%;
  }
  .lid {
    background-image: url(img/3@2x.png);
    background-size: 100%;
  }
}
</style>
