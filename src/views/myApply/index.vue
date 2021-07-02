<template>
  <div id="container" class="myApply">
    <!-- 头部开始 -->
    <van-nav-bar title="我的报名" left-arrow left-text="返回" @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active" @click="onClickTabs">
      <van-tab v-for="(item,i) in list" :title="item.title" :key="i">
        <!-- <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh(i)"> -->
        <van-list
          ref="box"
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          @load="onLoadList(i)"
          finished-text="没有更多了"
        >
          <div
            class="list-card"
            v-for="(item,index) in item.contList"
            :key="index"
            @click="goDetails(item)"
          >
            <div>
              订单号：{{item.orderNum}}
              <span class="pull-right">{{item.createTime}}</span>
            </div>
            <div>
              <div
                :class="{'img-box':true,'yellow':item.applyStatus==0,'blue':item.applyStatus==1,'red':item.applyStatus==2}"
              >
                <img v-if="item.eventInfo.eventImg" src="item.eventInfo.eventImg" alt />
                <img v-else src="../../assets/zwltsy.jpg" alt />
                <span class="icon6">&nbsp;{{item.name}}</span>
              </div>
              <div class="text-box">
                <h2>{{item.eventInfo.name}}</h2>
                <p class="icon1">&nbsp;{{item.eventInfo.address}}</p>
                <p class="icon2">&nbsp;123</p>
                <p class="icon3">&nbsp;123</p>
                <p v-if="item.teamName" class="icon4">&nbsp;123</p>
                <p class="icon5">&nbsp;123</p>
              </div>
            </div>
            <div>
              <button
                v-if="item.applyStatus==0"
                class="commont-button pull-right"
                @click.stop="cancelButton(item)"
              >取消报名</button>
              <button
                v-if="item.applyStatus==1||item.applyStatus==2"
                class="commont-button pull-right del-button"
                @click.stop="delButton(item,index)"
              >删除</button>
              <button
                v-if="item.applyStatus==2"
                class="commont-button pull-right again-button"
                @click.stop="againButton(item)"
              >重新报名</button>
              <!-- <button
                v-if="item.applyStatus==1"
                class="commont-button pull-right fail-button"
                @click.stop="failButton(item)"
              >失败人员报名</button>-->
            </div>
          </div>
        </van-list>
        <!-- </van-pull-refresh> -->
      </van-tab>
    </van-tabs>
    <!-- 头部结束 -->
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import {
  getMyApplyList,
  changeApplyerStatus,
  delTeamById
} from "../../http/api";
import { renderTime, zlbFun } from "../../util/Tool";
const img = require("../../assets/156051040397.jpg");
export default {
  data() {
    return {
      active: 0,
      nullTip: "空空如也~",
      pageSize: 4, // 每页条数
      pageIndex: 0, // 页码
      dtWinNumberInfos: [], // 请求数据
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 300, // 滚动条与底部距离小于 offset 时触发load事件
      list: [
        {
          title: "所有报名",
          contList: [
            {
              orderNum: 1,
              createTime: 1,
              applyStatus: 1,
              name: 1,
              eventInfo: {
                name: "1",
                address: "1"
              }
            },
            {
              orderNum: 1,
              createTime: 1,
              applyStatus: 2,
              name: 1,
              eventInfo: {
                name: "1",
                address: "1"
              }
            },
            {
              orderNum: 1,
              createTime: 1,
              applyStatus: 0,
              name: 1,
              eventInfo: {
                name: "1",
                address: "1"
              }
            }
          ]
        },
        {
          title: "待审核",
          contList: []
        },
        {
          title: "已审核",
          contList: []
        },
        {
          title: "已取消",
          contList: []
        }
      ]
    };
  },
  filters: {
    renderTime
  },
  computed: {
    ...mapGetters(["userMsg"])
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
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/oneself" });
    },
    goDetails(item) {
      this.$router.push({ path: "/applyDetails", query: { teamId: item.id } });
    },
    //取消报名
    cancelButton(item) {
      changeApplyerStatus({ teamId: item.id, typeId: 2 }).then(res => {
        item.applyStatus = 2;
      });
    },
    //删除
    delButton(item, index) {
      delTeamById({ teamId: item.id }).then(res => {
        this.list[this.active].contList.splice(index, 1);
      });
    },
    //重新报名
    againButton(item) {
      changeApplyerStatus({ teamId: item.id, typeId: 1 }).then(res => {
        item.applyStatus = 0;
      });
    },
    //失败报名
    failButton(item) {
      this.$router.push({
        path: "/signupInformtion",
        query: { eventId: item.eventId }
      });
    },
    //点击tab切换
    onClickTabs(index) {
      window.scrollTo(0, 0);
      this.pageIndex = 1;
      this.getList(index);
    },
    getList(index) {
      let data = {};
      if (index == 0) {
        data = {
          zuserId: JSON.parse(this.userMsg).userId,
          page: this.pageIndex,
          limit: this.pageSize
        };
      } else {
        data = {
          zuserId: JSON.parse(this.userMsg).userId,
          applyStatus: index - 1,
          page: this.pageIndex,
          limit: this.pageSize
        };
      }
      getMyApplyList(data).then(res => {
        if (res.data == null || res.data.length === 0) {
          this.isUpLoading = false;
          this.upFinished = true;
          return;
        }
        // 处理数据
        if (this.pageIndex === 1) {
          this.list[index].contList = res.data;
        } else {
          this.list[index].contList = this.list[index].contList.concat(
            res.data
          );
        }
        this.isUpLoading = false;
        if (res.data.length < this.pageSize) {
          this.upFinished = true;
        } else {
          this.upFinished = false;
        }
      });
    },
    // onDownRefresh(i) {
    //   this.pageIndex = 1;
    //   this.upFinished = false;
    //   this.getList(i);
    // },
    // 上拉加载请求方法
    onLoadList(i) {
      this.pageIndex++;
      this.getList(i);
    }
  },
  created() {
    zlbFun("我的报名");
    this.onLoadList(0);
  }
};
</script>
<style scoped lang="less">
.van-list {
  background-color: #ffffff !important;
}
.van-tabs {
  position: relative;
  background: #f1f1f1;
}
.icon(@img, @w: 0.55rem,@h:0.55rem) {
  //   position: absolute;
  content: "";
  display: inline-block;
  width: @w;
  height: @h;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
.pull-right {
  float: right;
}
#container {
  height: 100%;
  // padding-top: 2.3rem;
  .van-nav-bar .van-icon {
    color: #1989fa;
    vertical-align: middle;
  }
  .van-nav-bar {
    background-color: #ffffff;
    div {
      color: #323233;
    }
  }
  // .van-nav-bar {
  //   background-color: #0091ff;
  //   div,
  //   .van-icon,
  //   .van-nav-bar__text {
  //     color: white;
  //   }
  //   .check {
  //     display: inline-block;
  //     margin-left: 0.6rem;
  //   }
  // }
  .list-card {
    margin-top: 0.2rem;
    padding: 0.3rem 0.7rem;
    font-size: 0.6rem;
    color: #9fa7b3;
    background-color: #ffffff;
    border-radius: 0.3rem;
    & > div:first-child {
      color: #333333;
      margin-bottom: 0.7rem;
    }
    & > div:nth-child(2) {
      display: flex;
      .text-box {
        flex: auto;
        padding-left: 0.6rem;
        h2 {
          font-size: 0.7rem;
          line-height: 1.2rem;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        & > p {
          //   padding-left: 0.5rem;
          line-height: 0.95rem;
          position: relative;
          padding-left: 0.5rem;
        }
        .icon1::before {
          position: absolute;
          left: 0;
          top: 0.15rem;
          .icon("../../assets/adress@2x.png", 0.7rem, 0.6rem);
        }
        .icon2::before {
          position: absolute;
          left: 0;
          top: 0.15rem;
          .icon("../../assets/zhong.png", 0.6rem, 0.6rem);
        }
        .icon3::before {
          position: absolute;
          left: 0;
          top: 0.15rem;
          .icon("../../assets/baoming_xiang.png", 0.5rem, 0.5rem);
        }
        .icon4::before {
          position: absolute;
          left: 0;
          top: 0.15rem;
          .icon("../../assets/baoming_tuanti.png", 0.5rem, 0.4rem);
        }
        .icon5::before {
          position: absolute;
          left: 0;
          top: 0.15rem;
          .icon("../../assets/baoming_shouji.png", 0.4rem, 0.5rem);
        }
      }
      .img-box {
        position: relative;
        .icon6::before {
          .icon("../../assets/baoming_ren.png", 0.5rem, 0.55rem);
        }
      }
      .yellow::before {
        content: "";
        position: absolute;
        left: -0.5rem;
        top: -0.2rem;
        height: 1rem;
        width: 2.6rem;
        background: url("../../assets/apply_dsh.png") no-repeat center;
        background-size: 100%;
      }
      .blue::before {
        content: "";
        position: absolute;
        left: -0.5rem;
        top: -0.2rem;
        height: 1rem;
        width: 2.6rem;
        background: url("../../assets/apply_ysh.png") no-repeat center;
        background-size: 100%;
      }
      .red::before {
        content: "";
        position: absolute;
        left: -0.5rem;
        top: -0.2rem;
        height: 1rem;
        width: 2.6rem;
        background: url("../../assets/apply_yqx.png") no-repeat center;
        background-size: 100%;
      }
      .img-box > img {
        display: block;
        margin-bottom: 0.8rem;
        max-width: 6rem;
        // height: 4rem;
        border-radius: 0.1rem;
      }
    }
    & > div:nth-child(3) {
      overflow: hidden;
      margin-top: 0.2rem;
      .commont-button {
        margin-right: 0.5rem;
        padding: 0 0.5rem;
        width: 3.5rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border-radius: 0.75rem;
        color: #fa6400;
        border: 1px solid #fa6400;
        background-color: #ffffff;
      }
      .del-button {
        color: #333333;
        border: 1px solid #333333;
      }
      .again-button {
        width: 3.5rem;
        color: #0091ff;
        border: 1px solid #0091ff;
      }
      .fail-button {
        width: 4.9rem;
        color: #0091ff;
        border: 1px solid #0091ff;
      }
    }
  }
}
</style>
<style lang="less">
.myApply {
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .van-tab--active {
    color: #0091ff;
    font-weight: 500;
  }
  .van-tabs__line {
    position: absolute;
    bottom: 15px;
    left: 0;
    z-index: 1;
    height: 3px;
    background-color: #0091ff;
    border-radius: 3px;
  }
  .van-tabs__wrap {
    position: fixed;
    top: 46px;
    width: 100%;
    z-index: 1;
  }
  .van-tab__pane {
    padding-top: 2.1rem;
    margin-top: 46px;
  }
  // .van-pull-refresh{
  //   height:100%;
  //   .van-tab__pane{
  //     height: 100%;
  //   }
  // }
}
</style>
