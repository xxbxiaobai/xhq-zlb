<template>
  <div class="filter-container">
    <!-- <van-nav-bar
      title="科学健身"
      left-text="返回"
      left-arrow
      right-text="确定"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar> -->
    <div class="filter">
      <div class="cate-title">
        分类筛选
        <span class="queding" @click="onClickRight">确定</span>
      </div>
      <div class="fliter-item" v-for="(item, index) in filterList" :key="index">
        <ul class="fliter-wrap">
          <li
            v-for="child in item.childList"
            :key="child.id"
            :class="{ current: id == child.id }"
            @click="selectItem(child)"
          >{{ child.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool";
export default {
  name: "",
  created() {
    this.filterList = [{"name":"体育休闲","childList":[{"name":"射击射箭","id":40},{"name":"潜水","id":39},{"name":"轮滑","id":38},{"name":"棋牌","id":37},{"name":"游泳","id":36},{"name":"钓鱼","id":41}],"id":35},{"name":"武术搏击","childList":[{"name":"空手道","id":34},{"name":"柔道","id":33},{"name":"女子防身术","id":32},{"name":"自由搏击","id":31},{"name":"击剑","id":30},{"name":"散打","id":29},{"name":"跆拳道","id":28},{"name":"国术","id":27}],"id":26},{"name":"健美健身","childList":[{"name":"体操","id":25},{"name":"舞蹈","id":23},{"name":"健身","id":22},{"name":"瑜伽","id":24}],"id":21},{"name":"球类运动","childList":[{"name":"毽球","id":20},{"name":"棒球","id":19},{"name":"橄榄球","id":18},{"name":"网球","id":17},{"name":"乒乓球","id":16},{"name":"羽毛球","id":15},{"name":"足球","id":14},{"name":"篮球","id":13},{"name":"台球","id":584},{"name":"排球","id":583}],"id":12},{"name":"户外运动","childList":[{"name":"滑雪","id":11},{"name":"马术","id":10},{"name":"冲浪","id":9},{"name":"骑行","id":8},{"name":"徒步","id":7},{"name":"登山","id":6},{"name":"跑步","id":5},{"name":"攀岩","id":582}],"id":4}];
    this.id = this.$route.query.minorTermId;
  },
  data() {
    return {
      filterList: [],
      id: -1,
      name: ''
    };
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  methods: {
    onClickLeft() {
     this.$router.go(-1);
    },
    selectItem(item) {
      this.name = item.name
      if (this.id == item.id) {
        this.id = "";
      } else {
        this.id = item.id;
      }
    },
    onClickRight() {
        this.$router.push({
          path: '/scientific-fitness',
          query:{
            name: this.name
          }
        })
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.queding {
  position: relative;
  right: 0.6rem;
  float: right;
}
.filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  // padding-top: 46px;
  padding-left: 12px;
  background-color: #fff;
  .cate-title {
    padding: 15px 0 10px 0;
    font-size: 16px;
    font-weight: 500;
    color: rgba(20, 146, 255, 1);
    line-height: 20px;
    border-bottom: 1px solid #e7e7e7;
  }
  .fliter-item {
    padding: 15px 12px 5px 0;
    background-color: #fff;
    border-bottom: 1px solid #e7e7e7;
    .title {
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
    }
    .fliter-wrap {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 22% 0 0;
        padding: 9px 0;
        font-size: 14px;
        font-weight: 400;
        margin-right: 10px;
        margin-bottom: 10px;
        // color: rgba(180, 180, 180, 1);
        color: #333;
        line-height: 14px;
        text-align: center;
        // background-color: #f2f2f2;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 3px;
        &.current {
          color: #1492ff;
          background: rgba(20, 146, 255, 0.1);
          border: 1px solid rgba(20, 146, 255, 1);
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
