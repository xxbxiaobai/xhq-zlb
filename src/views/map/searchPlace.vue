<template>
  <div id="container">
    <!-- 头部开始 -->
    <van-nav-bar>
      <div class="head-search" slot="title">
        <input class="search" type="text" placeholder="请输入关键字" v-model="msg" />
        <span></span>
      </div>
      <span slot="right" @click="setMsg()">搜索</span>
    </van-nav-bar>
    <!-- 头部结束 -->

    <!-- 历史搜索开始 -->
    <div class="box-head">
      <span>
        {{newList==0?'历史搜索':'搜索结果'}}
        <i v-show="newList==0" class="icon-empty" @click="delMsg"></i>
      </span>
      <div>
        <span @click="getMake" :class="reserve?'reserve':''">可预约</span>
        <span @click="getDiscounts" :class="discounts?'reserve':''">低免</span>
      </div>
    </div>
    <!-- 历史搜索结束 -->

    <!-- 列表展示开始 -->
    <div class="box-cent">
      <!-- 历史 -->
      <div class="cont-history" v-show="newList==0">
        <span v-for="(item,i) in historyList" :key="i" @click="label(item)">{{item}}</span>
      </div>

      <!-- 列表 -->
      <div class="cont-list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="search"
        >
          <router-link
            :to="{path:'/map/goodParticulars',query:{id:item.id}}"
            tag="li"
            class="list-card"
            v-for="item in newList"
            :key="item.id"
          >
            <div
              class="img"
              :style="{background:'url('+item.img+') no-repeat center',backgroundSize:'cover'}"
            >
              <i v-if="item.isLessOfFree"></i>
            </div>
            <div class="list-card-text">
              <h3>{{item.title}}</h3>
              <p>开放时间：{{item.date}}</p>
              <p>{{item.typeName}}</p>
              <div class="card-site">
                <span>{{item.site}}</span>
                <span>{{item.distance}}</span>
              </div>
              <button v-if="item.isBook" @click.stop="jumpUrl(item.url)">订场</button>
            </div>
          </router-link>
        </van-list>
      </div>
    </div>
    <!-- 列表展示结束 -->
    <div class="loginMap" v-show="login">
      <div class="login">
        <van-loading />
      </div>
    </div>
  </div>
</template>


<script>
import AMap from "AMap"; // 引入高德地图
import { mapGetters } from "vuex";
import { point, region, motionType, userImg } from "../../http/api";
import {
  distance,
  setCookie,
  getCookie,
  delCookie,
  zlbFun,
  gcj02
} from "../../util/Tool";
//信息点
var dataPOI;
export default {
  data() {
    return {
      login: false,
      loading: false,
      finished: false,

      msg: "", //用户输入
      reserve: false, //预约
      discounts: false, //抵免
      historyList: [], //历史
      newList: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    /**
     * 拦截器
     */
    interceptor() {
      if (this.login) return;
      this.login = true;
    },
    /**
     * 页面跳转
     */
    jumpUrl(url) {
      let mobile = this.userPhone;
      if (!mobile || isNaN(mobile)) return false;
      window.location.href = url + `&tel=${mobile}`;
    },

    /**
     * 查询搜索内容
     */
    search() {
      this.interceptor();
      let msg = this.msg || "";
      if (msg) {
        dataPOI.name = msg;
        dataPOI.page++;
        point(dataPOI).then(res => {
          if (res.data.length) {
            this.loading = false;
            this.finished = false;
            res.data.forEach(item => {
              let img = item.fileList.length
                ? userImg + item.fileList[0].id
                : require("../../assets/xzwtp.png");
              let data = {
                id: item.id,
                title: item.pointName,
                typeName: Array(item.fitnessTypeNameArr).join(),
                img: img,
                date: item.pointOpenTime,
                site: item.pointAddr,
                distance: distance(item.distance || ""),
                isBook: !item.isBook,
                isLessOfFree: !item.isLessOfFree,
                url: item.pointBookUrl
              };
              this.newList.push(data);
            });
          } else {
            this.$toast("暂无数据");
            this.finished = true;
            this.loading = false;
          }
          this.login = false;
        });
      } else {
        this.$toast("搜索内容不可为空");
        this.login = false;
      }
    },

    /**
     * 可预约
     */
    getMake() {
      this.interceptor();
      dataPOI.page = 0;
      this.newList = [];
      let make = (this.reserve = !this.reserve);
      make ? (dataPOI.isBook = 0) : (dataPOI.isBook = null);
      this.search();
    },

    /**
     * 可低免
     */
    getDiscounts() {
      this.interceptor();
      dataPOI.page = 0;
      this.newList = [];
      let make = (this.discounts = !this.discounts);
      make ? (dataPOI.isLessOfFree = 0) : (dataPOI.isLessOfFree = null);
      this.search();
    },

    /**
     * 存储历史记录
     */
    setMsg() {
      this.newList = [];
      if (this.msg) {
        dataPOI.page = 0;
        this.search();
        this.historyList.push(this.msg);
        let msg = encodeURIComponent(JSON.stringify(this.historyList));
        setCookie("msg", msg);
      } else {
        this.$toast("搜索内容不可为空");
      }
    },

    /**
     * 初始化查询历史
     */
    getMsg() {
      let msg = getCookie("msg") || "";
      if (msg) {
        msg = JSON.parse(decodeURIComponent(msg));
        this.historyList = msg;
      }
    },

    /**
     * 清空存储数据
     */
    delMsg() {
      delCookie("msg");
      this.historyList = [];
    },

    /**
     * 标签搜索
     */
    label(item) {
      this.msg = item;
      dataPOI.page = 0;
      this.search();
    },
    /**
     * 初始化
     */
    init() {
      //初始化数据
      dataPOI = {
        pointSportTypeId: null, //运动类型id
        pointAreaId: null, //区域id
        isBook: null, //是否预定 0是 1否
        isLessOfFree: null, //是否低免 0是 1否
        checkStatus: 0, //审核状态 //默认
        pointY: null, //我的位置 y
        pointX: null, //我的位置 x
        page: 0, //页数
        limit: 10, //每页数量
        name: "",
        orderType: 1 //排序 0倒叙 1正序
      };

      //获取自己的位置
      this.GPS();
      //初始化查询请求
      this.getMsg();
    },
    GPS() {
        [dataPOI.pointY, dataPOI.pointX] = [
        120.57215254209507,
        30.048076408242174
      ];
      // AMap.plugin("AMap.Geolocation", () => {
      //   var geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
      //     timeout: 10000, //超过10秒后停止定位，默认：5s
      //     buttonPosition: "RB", //定位按钮的停靠位置
      //     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      //   });
      //   geolocation.getCurrentPosition((status, result) => {
      //     if (status == "complete") {
      //       let myIndex = ([dataPOI.pointY, dataPOI.pointX] = gcj02(
      //         result.position.lng,
      //         result.position.lat
      //       ));
      //     } else {
      //       this.$toast("GPS定位失败");
      //     }
      //     let id = (this.msg = this.$route.query.name);
      //     if (id) {
      //       this.search();
      //     }
      //   });
      // });
    }
  },
  computed: {
    ...mapGetters(["userPhone"])
  },
  created() {
    this.init();
  }
};
components: {
}
</script>

<style>
#container .van-nav-bar {
  position: fixed;
  top: 0;
  width: 100vw;
}
</style>
<style scoped lang="less">
// ========================
.icon(@img,@h:1rem,@w:1rem) {
  content: "";
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
// ========================

#container {
  min-height: 100vh;
  width: 100vw;
  background-color: #f6f7f8;

  //强制更改样式
  /deep/ .van-nav-bar__title {
    max-width: 78%;
    width: 100%;
    margin: 0 auto;
    margin-left: 5%;
    color: #323233;
    font-weight: 500;
    font-size: 16px;
  }

  .loginMap {
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
  .head-search {
    position: relative;
    display: flex;
    align-items: center;
    height: 46px;

    .search {
      padding-left: 1.8rem;
      width: 100%;
      height: 1.6rem;
      border-radius: 0.8rem;
      font-size: 0.7rem;
      line-height: 1.7rem;
      background-color: #f6f7f8;
    }
    span {
      position: absolute;
      left: 0.5rem;
      top: 50%;
      height: 0.8rem;
      width: 0.8rem;
      background: url("../../assets/sousuohui.png") no-repeat center;
      background-size: 100%;
      transform: translateY(-50%);
      z-index: 10;
    }
  }

  .box-head {
    position: fixed;
    top: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.6rem;
    height: 40px;
    width: 100vw;
    font-size: 0.8rem;
    color: #999;
    background-color: white;
    z-index: 1;

    .icon-empty {
      display: inline-block;
      height: 1rem;
      width: 1rem;
      background: url("../../assets/lajitong.png") no-repeat center;
      background-size: 100%;
    }
    > span {
      display: flex;
      align-items: center;
    }

    div {
      height: 100%;
      display: flex;
      span {
        &.reserve {
          &::before {
            .icon("../../assets/yuyuexuanzhong.png");
          }
        }

        display: inline-flex;
        align-items: center;
        margin-left: 0.5rem;
        color: #333;
        font-size: 0.7rem;
        &::before {
          .icon("../../assets/yueyue.png");
        }
      }
    }
  }

  // 内容
  .box-cent {
    padding-top: 86px;
    .cont-history {
      margin: 0.2rem 0.4rem;
      span {
        display: inline-block;
        padding: 0.3rem 0.64rem;
        margin: 1px 0.2rem;
        font-size: 0.65rem;
        line-height: 0.65rem;
        border-radius: 0.15rem;
        background-color: #e7e7e7;
      }
    }
    //列表内容展示
    .cont-list {
      .list-card {
        position: relative;
        margin: 0.45rem 0.6rem;
        padding-left: 6.8rem;
        height: 4.5rem;
        box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.09);
        border-radius: 0.4rem;
        background-color: #fff;

        .img {
          position: absolute;
          left: 0;
          top: 0;
          margin: 0.25rem 0.55rem 0.25rem 0.25rem;
          width: 6rem;
          height: 4rem;
          border-radius: 0.2rem;
          i {
            display: inline-block;
            width: 2.05rem;
            height: 1.45rem;
            background: url("../../assets/dm.png") no-repeat center;
            background-size: 100%;
          }
        }
        .list-card-text {
          padding: 0.5rem 1.05rem 0.5rem 0;
          width: 100%;
          height: 100%;
          h3 {
            display: block;
            margin-bottom: 0.5rem;
            overflow: hidden;
            font-size: 0.7rem;
            white-space: nowrap;
            line-height: 0.7rem;
            text-overflow: ellipsis;
          }
          p {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow-wrap: break-word;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.6rem;
            color: #999;
          }
          .card-site {
            display: inline-flex;
            align-items: center;
            width: 100%;
            font-size: 0.6rem;
            span {
              display: inline-block;
              width: 50%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:nth-child(2) {
                padding-left: 0.15rem;
              }
            }

            &::before {
              content: "";
              display: inline-block;
              margin-right: 0.25rem;
              height: 0.7rem;
              width: 0.7rem;
              background: url("../../assets/juli.png") no-repeat center;
              background-size: cover;
            }
          }
          button {
            position: absolute;
            right: 0.4rem;
            bottom: 0.4rem;
            height: 0.9rem;
            width: 1.6rem;
            color: #1492ff;
            border: 1px solid;
            border-radius: 0.15rem;
            font-size: 0.6rem;
            line-height: 0.5rem;
            background-color: #fff;
          }
        }
      }
    }
  }
  .van-ellipsis {
    overflow: visible;
  }
}
</style>
