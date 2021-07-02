<template>
  <div>
    <div class="box">
      <!-- 导航栏 -->
      <van-nav-bar title="我的测定" left-text="返回" left-arrow @click-left="onClickLeft" />

      <van-tabs type="card" v-model="active">
        <van-tab title="预约列表" name="a">
          <ul v-show="isshows" class="lie">
            <li v-for="(i,index) in dataTexting" :key="index">
              <div>
                <h5>{{i.bookDate}}</h5>
                <span v-show="i.status==0" style="color:#FE3116;font-size:0.7rem;">审核中</span>
                <span v-show="i.status==1" style="color:#FFA007;font-size:0.7rem;">待测定</span>
                <span v-show="i.status==3" style="color:#999999;font-size:0.7rem;">预约失败</span>
                <span v-show="i.status==4" style="color:#999999;font-size:0.7rem;">取消</span>
                <span v-show="i.status==5" style="color:#1492FF;font-size:0.7rem;">已测定</span>
              </div>
              <div class="lieText">
                <p>测定站点：{{i.siteName}}</p>
                <p>
                  <nobr>
                    <van-button
                      v-show="i.status==0 || i.status==1"
                      style="margin-right:0.4rem;"
                      size="small"
                      type="default"
                      @click="noMake(i,index)"
                    >取消报名</van-button>
                    <van-button size="small" type="info" @click="makeing(i,index)">查看详情</van-button>
                  </nobr>
                </p>
              </div>
            </li>
          </ul>
          <div class="empty" v-show="isshow">
            <img src="./img/zan.png" alt />
            <p>暂无数据</p>
          </div>
        </van-tab>
        <van-tab title="报告列表" name="b">
          <ul v-if="dataText.length!==0" class="lie">
            <li v-for="(i,index) in dataText" :key="index">
              <div>
                <h5>{{i.testDate}}{{i.organName}}</h5>
                <!-- <span style="  color:#FE3116;font-size:0.7rem;">{{i.state}}</span> -->
              </div>
              <div class="lieText">
                <p>测定站点：{{i.organName}}</p>
                <p>
                  <nobr>
                    <van-button size="small" type="info" @click="make(i.resultId,index)">查看详情</van-button>
                  </nobr>
                </p>
              </div>
            </li>
          </ul>
          <div v-else class="empty">
            <img src="./img/zan.png" alt />
            <p>暂无数据</p>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { zlbFun } from "@/util/Tool";
import { MyMeasure, MyDetection } from "../../http/api";
import Vue from "vue";
import { Tab, Tabs, Button } from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(Button);

export default {
  data() {
    return {
      // activeName: "a",
      isshow: false,
      dataText: [],
      dataTexting: [
        {
          bookDate: "3月15日体质测定日体质质日...",
          status: 0,
          siteName: "体质测定站点"
        },
        {
          bookDate: "3月15日体质测定日体质质日...",
          status: 1,
          siteName: "体质测定站点"
        },
        {
          bookDate: "3月15日体质测定日体质质日...",
          status: 3,
          siteName: "体质测定站点"
        },
        {
          bookDate: "3月15日体质测定日体质质日...",
          status: 5,
          siteName: "体质测定站点"
        }
      ],
      isshows: true,
      // isshow: false,
      active: "a"
    };
  },
  methods: {
    // 返回上级
    onClickLeft() {
      // Toast("返回");
      this.$router.go(-1);
    },
    // onClickRight() {
    //   Toast("按钮");
    // }
    // 取消预约
    noMake(item, index) {
      console.log(item);
      this.$router.push({
        path: "/noMake",
        query: {
          id: item.id
        }
      });
    },
    // 报告查看详情
    make(item, index) {
      this.$store.state.resultId = { resultId: item };

      this.$router.push({
        path: "/previews"
      });
    },
    //查看预约详情
    makeing(item, index) {
      console.log(123);
      console.log(item.idCard);
      this.$store.state.idCard = { ID: item };
      this.$router.push({
        path: "/awaitMeasure",
        query: {
          siteId: item.idCard
        }
      });
    },
    formatDateTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      return y + "年" + m + "月" + d + "日";
    },
    stateS() {
      // console.log(12312)
    }
  },

  created() {
    // zlbFun('我的测定')
    //     // console.log(this.dataText.length);
    //        let statess = this.$store.state.states.stateings;
    //           // console.log(statess)
    //           if(statess==0){
    //             this.active='b'
    //           }
    //     // 预约
    //     let userId = JSON.parse(this.userMsg).userId;
    // // let userId=15
    //     MyMeasure({userId}).then(res => {
    //       console.log(res)
    //        if (res.data.length) {
    //         console.log('无')
    //         this.isshows = true;
    //       } else {
    //         this.isshow = true;
    //       }
    //       // res.data.forEach(y => {
    //       //   //时间格式化工具
    //       //   y.bookDate = this.formatDateTime(y.bookDate);
    //       //   y.bookDate =''+ y.bookDate.slice(5, 11);
    //       //   // console.log(y.testDate);
    //       // });
    //       this.dataTexting = res.data;
    //       // console.log(res);
    //     });
    // // 报告
    // MyDetection({ userId }).then(res => {
    //   // console.log(res.data);
    //   res.data.forEach(y => {
    //     //时间格式化工具
    //     y.testDate = this.formatDateTime(y.testDate);
    //     y.testDate = y.testDate.slice(5, 11);
    //     // console.log(y.testDate);
    //   });
    //   this.dataText = res.data;
    //   // console.log(this.dataText)
    // });
  }
};
</script>
<style lang="less" scoped>
.lie {
  padding: 0.6rem;
  li {
    width: 100%;
    height: 5rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rem 0.15rem 0.45rem 0rem rgba(11, 11, 11, 0.08);
    border-radius: 0.4rem;
    margin: 0.5rem auto;
    padding: 0.65rem 1.5rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h5 {
      width: 10.925rem;
      height: 0.975rem;
      font-size: 0.8rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 0.975rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lieText {
      margin-top: 0.5rem;
      padding-top: 0.6rem;
      border-top: 1px solid #f7f5f6;
      p:nth-of-type(1) {
        width: 7.225rem;
        // height: 0.55rem;
        font-size: 0.55rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.box {
  width: 100%;
  height: 100vh;
  background: white;
}
.empty {
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  // justify-content: center;
  img {
    width: 7.825rem;
    height: 8.8rem;
    margin: 0 auto;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 1.05rem;
  }
}
/deep/ .van-tabs__nav--card .van-tab.van-tab--active {
  background: #1492ff;
  color: white;
}
/deep/ .van-tabs__nav--card {
  border: 1px solid #1492ff;
}
/deep/ .van-tabs__nav--car {
  border: 1px solid #1492ff;
}
/deep/ .van-tabs__nav--card .van-tab {
  border-right: 1px solid #1492ff;
}
/deep/ .van-tabs__nav--card .van-tab {
  color: #1492ff;
  font-size: 0.7rem;
  font-family: PingFang SC;
  font-weight: bold;
}
</style>