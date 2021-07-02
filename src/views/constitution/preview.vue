<template>
  <div id="home">
    <!-- 搜索栏 -->
    <!-- <van-nav-bar title="预览报告" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <div class="text">
      <h2>个人中心</h2>
      <div class="one">
        <p>
          <span>姓名</span>
          <span>{{vaule.userName}}</span>
        </p>
        <p>
          <span>身份证</span>
          <span>{{vaule.idCard}}</span>
        </p>

        <p>
          <span>固定号码</span>
          <span>{{vaule.phone}}</span>
        </p>
        <div>
          <p>
            <span>性别</span>
            <span>{{vaule.sex}}</span>
          </p>
          <p>
            <span>生日</span>
            <span>{{vaule.brithday}}</span>
          </p>
        </div>
        <p>
          <span>手机号</span>
          <span>{{vaule.mobilePhone}}</span>
        </p>
        <div>
          <p>
            <span>体重</span>
            <span>{{vaule.weight}}</span>
          </p>
          <p>
            <span>身高</span>
            <span>{{vaule.height}}</span>
          </p>
        </div>
      </div>
      <h2>体测及评价</h2>
      <ul class="two">
        <li>
          <h5>握力</h5>
          <p>{{vaule.grip}}</p>
        </li>
        <li>
          <h5>坐位体前屈</h5>
          <p>{{vaule.sittingFlexion}}</p>
        </li>
        <li>
          <h5>选择反应时</h5>
          <p>{{vaule.selReactionTime}}</p>
        </li>
        <li>
          <h5>闭眼单脚站立</h5>
          <p>{{vaule.eyeCloseStandTime}}</p>
        </li>
        <li>
          <h5>肺活量</h5>
          <p>{{vaule.vitalCapacity}}</p>
        </li>
        <li>
          <h5>台阶指数</h5>
          <p>{{vaule.stepIndex}}</p>
        </li>
        <li>
          <h5>立定跳远</h5>
          <p>{{vaule.longJumpAssess}}</p>
        </li>
        <li>
          <h5>网球掷远</h5>
          <p>{{vaule.tennisAssess}}</p>
        </li>
        <li>
          <h5>10米折返跑</h5>
          <p>{{vaule.tripRun}}</p>
        </li>
        <li>
          <h5>走平衡木</h5>
          <p>{{vaule.balanceAssess}}</p>
        </li>
        <li>
          <h5>双脚连续跳</h5>
          <p>{{vaule.continueJump}}</p>
        </li>
        <li>
          <h5>纵跳</h5>
          <p>{{vaule.standJumpAssess}}</p>
        </li>
        <li>
          <h5>俯卧撑</h5>
          <p>{{vaule.pushUpAssess}}</p>
        </li>
        <li>
          <h5>一分钟仰卧起坐</h5>
          <p>{{vaule.sitUp}}</p>
        </li>
      </ul>
      <h2>身高体重评价</h2>
      <p class="bottom">{{vaule.hwAssess}}{{vaule.hwAssess}}</p>
      <h2>儿童身高评价</h2>
      <p class="bottom">{{vaule.bodyHeightAssess}}</p>
      <h2>总分及评价</h2>
      <article>总分({{vaule.totalScore}})</article>
      <p class="bottom">{{vaule.totalScoreAssess}}</p>
    </div>
    <div class="bt">
      <button @click="bt">下载成绩单</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {zlbFun} from "@/util/Tool";
import { Icon, Toast } from "vant";
import { MyDetectionsing } from "../../http/api";
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
      // this.$router.push({
      //   path: "/myMeasure"
      // });
    },
    bt() {
      Toast("暂未开放");
    }
  },

  created() {
    zlbFun('预览报告')
    let resultId = this.$store.state.resultId.resultId;
  
  this.$store.state.states = { stateings: 0 };
    console.log(resultId);
    MyDetectionsing({ resultId }).then(res => {
      console.log(res.data);
      if (res.data.sex == 0) {
        res.data.sex = "男";
      } else if (res.data.sex == 1) {
        res.data.sex = "女";
      }
      res.data.brithday = res.data.brithday.slice(0, 10);
      console.log(res.data.sex);
      this.vaule = res.data;
    });
  }
};
</script>

<style lang='less' scoped>
#home {
  background: white;
  // height: 100%;
}
.text {
  width: 18.75rem;
  padding: 0 0.625rem;
  margin-top: -0.3rem;
  background: rgba(255, 255, 255, 1);
  h2 {
    padding: 1rem 0 0 0;
    // height: 0.775rem;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 2rem;
    color: rgba(0, 0, 0, 1);
  }
  .one {
    p {
      //  height:0.625rem;
      font-size: 0.65rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 2.5rem;
      border-bottom: 0.025rem solid rgba(231, 231, 231, 1);

      span:nth-of-type(1) {
        width: 3.5rem;
        display: inline-block;
      }
      span:nth-of-type(2) {
        font-size: 0.65rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
    }
    > div {
      display: flex;
      p {
        flex: 1;
        margin-right: 1rem;
      }
    }
  }
  .two {
    li {
      margin-bottom: 0.8rem;
      h5 {
        font-size: 0.7rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(20, 146, 255, 1);
        margin-bottom: 0.2rem;
      }
      p {
        height: 1rem;
        font-size: 0.7rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  article {
    font-size: 0.7rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(20, 146, 255, 1);
    margin-bottom: 0.2rem;
  }
  .bottom {
    font-size: 0.7rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    height: 1rem;
  }
  img {
    width: 17.55rem;
    height: 17.5rem;
    border-radius: 0.125rem;
    //  margin: 0 auto;
  }
}
.bt {
  // display: flex;
  // justify-content: center;
  padding-bottom: 2.7rem;

  button {
    // margin-top: 2.7rem;
    width: 9.5rem;
    height: 2.025rem;
    background: rgba(20, 146, 255, 1);
    border-radius: 0.125rem;
    font-size: 0.9rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin: 1.7rem auto;
    margin-bottom: 0rem;
    display: block;
  }
}
</style>
