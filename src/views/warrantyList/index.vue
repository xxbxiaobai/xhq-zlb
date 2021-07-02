<template>
  <div id="container" class="warrant-tab">
    <!-- 头部开始 -->
    <van-nav-bar title="我的报修" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 头部结束 -->

    <!-- 列表开始 -->
    <van-tabs v-model="active" sticky @click="onClickTabs">
      <van-tab v-for="(item,i) in list" :title="item.title" :key="i">
        <van-list
          v-model="loading"
          :finished="finished"
          :offset="10"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoadList"
          :immediate-check="false"
        >
          <div v-for="(item,i) in listInfo" :key="item.id">
            <router-link tag="div" class="cont-card" :to="{path:'/warrantyCont',query:{
              repairId:item.id
            }}">
              <div :class="[noStyle,stateStyle[item.point.status]]"></div>
              <strong>报修场地：{{item.point.pointAddr}}</strong>
              <p>上报时间：{{item.createTime.split('T')[0]}}</p>
              <van-button plain hairline type="info">查看详情</van-button>
            </router-link>
          </div>
        </van-list>
        <!-- <div>
          <router-link tag="div" class="cont-card" to="/warrantyCont">
            <div :class="[noStyle,stateStyle[item.point.status]]"></div>
            <strong>报修场地：体育中心</strong>
            <p>上报时间：2019-09-21 12:10</p>
            <van-button plain hairline type="info">查看详情</van-button>
          </router-link>
        </div>-->
        <!-- <div>
          <router-link tag="div" class="cont-card" to="/warrantyCont">
            <div :class="[noStyle,stateStyle[2]]"></div>
            <strong>报修场地：体育中心</strong>
            <p>上报时间：2019-09-21 12:10</p>
            <van-button plain hairline type="info">查看详情</van-button>
          </router-link>
        </div>
        <div>
          <router-link tag="div" class="cont-card" to="/warrantyCont">
            <div :class="[noStyle,stateStyle[3]]"></div>
            <strong>报修场地：体育中心</strong>
            <p>上报时间：2019-09-21 12:10</p>
            <van-button plain hairline type="info">查看详情</van-button>
          </router-link>
        </div>
        <div>
          <router-link tag="div" class="cont-card" to="/warrantyCont">
            <div :class="[noStyle,stateStyle[0]]"></div>
            <strong>报修场地：体育中心</strong>
            <p>上报时间：2019-09-21 12:10</p>
            <van-button plain hairline type="info">查看详情</van-button>
          </router-link>
        </div> -->
      </van-tab>
    </van-tabs>
    <!-- 列表结束 -->
  </div>

  <!-- 

  -->
</template>


<script>
import { mapGetters } from "vuex";
import { pointRepairList } from "../../http/api";
import { renderTime } from "../../util/Tool";
export default {
  data() {
    //status: 0待受理  1已通过  2已完成  -1未通过
    return {
      show: true,
      noStyle: "no-style",
      stateStyle: ["blue", "yellow", "red", "green"],
      active: 0,
      loading: false,
      finished: false,
      listInfo: [],
      params: {
        repairUserId: this.repairUserId,
        pageNo: 1,
        pageSize: 10
      },
      list: [
        {
          title: "全部",
          loading: false,
          finished: false,
          contList: []
        },
        {
          title: "待受理",
          state: 0,
          loading: false,
          finished: false,
          contList: []
        },
        {
          title: "未通过",
          state: 2,
          loading: false,
          finished: false,
          contList: []
        },
        {
          title: "已通过",
          state: 1,
          loading: false,
          finished: false,
          contList: []
        },
        {
          title: "已完成",
          state: 3,
          loading: false,
          finished: false,
          contList: []
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userMsg"])
  },
  methods: {
    onLoadList() {
      this.params.pageNo++;
      this.getList(this.params);
    },
    getList(data) {
      this.loading = true;
      pointRepairList(data)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            console.log(res)
            this.listInfo = this.listInfo.concat(res.data);
            if (this.listInfo.length >= res.count) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list[0].contList.push(this.list[0].contList.length + 1);
        }
        // 加载状态结束
        this.list[0].loading = false;

        // 数据全部加载完成
        if (this.list[0].contList.length >= 40) {
          this.list[0].finished = true;
        }
      }, 500);
    },
    onClickLeft() {
      this.$router.push("/oneself");
    },
    // 切换tabs
    onClickTabs(index) {
      if (index == 0) {
        this.params = {
          repairUserId: this.$route.query.id,
          pageNo: 1,
          pageSize: 10
        };
      } else {
        this.params = {
          repairUserId: this.$route.query.id,
          pageNo: 1,
          pageSize: 10,
          status: this.list[index].state
        };
      }
      this.listInfo=[];
      this.getList(this.params)
    }
  },
  filters: {
    renderTime
  },
  created() {
    this.params.repairUserId = this.$route.query.id;
    // this.getList(this.params);
    this.onClickTabs(0);
  }
};

components: {
}
</script>


<style scoped lang="less">
#container {
  #wuimg {
    position: relative;
    top: 8rem;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7rem;
  }
  #wutext {
    position: relative;
    top: 4rem;
    font-size: 0.7rem;
    text-align: center;
  }
  //循环卡片
  .cont-card {
    position: relative;
    padding: 1.3rem 0.65rem 0.65rem 0.65rem;
    margin: 0.4rem 0.6rem;
    height: 4.5rem;
    border-radius: 0.4rem;
    box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.09);
    background-color: #fff;
    overflow: hidden;
    strong {
      display: block;
      margin-bottom: 0.55rem;
      font-size: 0.8rem;
      line-height: 0.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      color: #999;
      font-size: 0.6rem;
      line-height: 0.6rem;
    }
    button {
      position: absolute;
      right: 0.65rem;
      bottom: 0.3rem;
      height: 1.25rem;
      width: 4.05rem;
      font-size: 0.6rem;
      line-height: 1.25rem;
      color: #1492ff;
    }
    div.no-style {
      position: absolute;
      right: 0;
      top: 0;
      border: 1.1rem solid;
      border-color: #ffffff #ffffff transparent transparent;
      &::before {
        content: "";
        position: absolute;
        top: -0.9rem;
        right: -0.8rem;
        color: white;
        font-weight: bold;
        font-size: 0.7rem;
        font-family: "PingFang-SC-Bold";
      }
    }
    div.blue {
      border-color: #1492ff #1492ff transparent transparent;
      &::before {
        content: "待";
      }
    }
    div.green {
      border-color: #1ddd97 #1ddd97 transparent transparent;
      &::before {
        content: "完";
      }
    }
    div.yellow {
      border-color: #ea9818 #ea9818 transparent transparent;
      &::before {
        content: "过";
      }
    }
    div.red {
      border-color: #d51f1f #d51f1f transparent transparent;
      &::before {
        content: "未";
      }
    }
  }
}
</style>
<style lang="less">
.warrant-tab {
  .van-tab {
    flex-basis: 20% !important;
  }
  .van-tabs__line {
    position: absolute;
    bottom: 15px;
    left: 0;
    z-index: 1;
    height: 3px;
    background-color: #1492ff;
    border-radius: 3px;
  }
}
</style>