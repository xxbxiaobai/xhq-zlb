<template>
  <div id="home">
    <van-nav-bar title="培训目录" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div data-v-b7beee96 role="feed" class="van-list" @click="trainnotice">
      <div data-v-b7beee96 class="card">
        <div data-v-b7beee96 class="top">2019年泰顺县第三期三级社会体育指导员培训班</div>
        <div data-v-b7beee96 class="middle">培训地点：温州市泰顺县体育中心</div>
        <div data-v-b7beee96 class="bottom">
          <div data-v-b7beee96 class="time">
            <p data-v-b7beee96>报名时间：2019-12-16 至 2019-12-27</p>
            <p data-v-b7beee96>培训时间：2019-12-28 至 2019-12-31</p>
          </div>
          <button data-v-b7beee96>查看</button>
        </div>
      </div>
      <div data-v-b7beee96 class="card">
        <div data-v-b7beee96 class="top">湖州市体育局关于举办2019年二级社会体育 指导员（八法五步）培训班的通知</div>
        <div data-v-b7beee96 class="middle">培训地点：湖州市吴兴区格林豪泰大酒店三楼(湖州市中医院对面)</div>
        <div data-v-b7beee96 class="bottom">
          <div data-v-b7beee96 class="time">
            <p data-v-b7beee96>报名时间：2019-12-01 至 2019-12-28</p>
            <p data-v-b7beee96>培训时间：2019-12-29 至 2019-12-31</p>
          </div>
          <button data-v-b7beee96>查看</button>
        </div>
      </div>
      <div data-v-b7beee96 class="card">
        <div data-v-b7beee96 class="top">关于举办 2019 年浙江省一级社会体育指导员 等级培训（杭州市）的通知</div>
        <div data-v-b7beee96 class="middle">培训地点：杭州市下城区杭州市下城区体育场 102 号</div>
        <div data-v-b7beee96 class="bottom">
          <div data-v-b7beee96 class="time">
            <p data-v-b7beee96>报名时间：2019-11-25 至 2019-12-15</p>
            <p data-v-b7beee96>培训时间：2019-12-24 至 2019-12-28</p>
          </div>
          <button data-v-b7beee96>查看</button>
        </div>
      </div>
      <div data-v-b7beee96 class="card">
        <div data-v-b7beee96 class="top">关于举办2019年浙江省一级社会体育指导员 等级培训（台州市）的通知</div>
        <div data-v-b7beee96 class="middle">培训地点：台州市三门县台州市三门县保罗大酒店（滨海大道18号）</div>
        <div data-v-b7beee96 class="bottom">
          <div data-v-b7beee96 class="time">
            <p data-v-b7beee96>报名时间：2019-11-04 至 2019-11-16</p>
            <p data-v-b7beee96>培训时间：2019-11-20 至 2019-11-24</p>
          </div>
          <button data-v-b7beee96>查看</button>
        </div>
      </div>
      <div data-v-b7beee96 class="card">
        <!-- <div data-v-b7beee96 class="top">关于举办2019年浙江省一级社会体育指导员 等级培训（绍兴市）的通知</div> -->
        <!-- <div data-v-b7beee96 class="middle">培训地点：绍兴市越城区绍兴市银泰大酒店（人民西路255号）</div> -->
        <div data-v-b7beee96 class="bottom">
          <div data-v-b7beee96 class="time">
            <p data-v-b7beee96>报名时间：2019-11-01 至 2019-11-22</p>
            <p data-v-b7beee96>培训时间：2019-11-29 至 2019-12-03</p>
          </div>
          <button data-v-b7beee96>查看</button>
        </div>
      </div>
      <div data-v-b7beee96 class="card">
        <div data-v-b7beee96 class="top">湖州市体育局关于举办2019年二级社会 体育指导员（曳步舞）培训班的通知</div>
        <div data-v-b7beee96 class="middle">培训地点：湖州市吴兴区湖州市奥体中心综合馆（二）</div>
        <div data-v-b7beee96 class="bottom">
          <div data-v-b7beee96 class="time">
            <p data-v-b7beee96>报名时间：2019-10-30 至 2019-11-08</p>
            <p data-v-b7beee96>培训时间：2019-11-13 至 2019-11-14</p>
          </div>
          <button data-v-b7beee96>查看</button>
        </div>
      </div>
      <div class="van-list__placeholder"></div>
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      login: true,
      tranlistshow: false,
      trainlists: [],
      limit: 6,
      pageSize: 0
    };
  },

  methods: {
    onLoad() {
      this.pageSize++;
      this.reqevent();
    },
    onClickLeft() {
      window.location.href = "sxty://back"
      this.$router.push("/scientific-list");
    },
    trainnotice() {
      this.$router.push("/trainnotice");
    },
    reqevent() {
    }
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
  created() {
    zlbFun("培训目录");
    console.log(this.trainlists);
    this.onLoad();
    // this.reqevent()
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 2.5rem;

  //背景
  .img-background {
    position: fixed;
    top: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    img {
      width: 8.8rem;
    }
    span {
      margin-top: 0.85rem;
      color: #999;
      font-size: 0.8rem;
      line-height: 0.8rem;
    }
  }
  .van-nav-bar {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
  .van-nav-bar__right {
    font-size: 0.85rem;
  }
  .card {
    width: 17.55rem;
    // height: 5.75rem;
    margin: 8px auto;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      color: #444444;
      font-size: 0.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
    }
    .middle {
      color: #999999;
      font-size: 0.6rem;
      padding: 0.5rem 0;
    }
    .bottom {
      color: #999999;
      font-size: 0.55rem;
      display: flex;
      justify-content: space-between;
      p {
        padding-bottom: 0.2rem;
      }
      button {
        width: 4rem;
        height: 1.6rem;
        background-color: #1492ff;
        color: #ffffff;
        font-size: 0.7rem;
        border-radius: 0.2rem;
      }
    }
  }
}
// 加载中  样式
.login-map {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  z-index: 999;
  .login {
    position: absolute;
    top: 50%;
    right: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -1.5rem;
    margin-top: -1.5rem;
    height: 3rem;
    width: 3rem;
    border-radius: 0.25rem;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
