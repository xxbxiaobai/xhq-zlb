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
        <router-link
          :to="{path:'/goodParticulars',query:{id:item.id}}"
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
      </div>
    </div>
    <!-- 列表展示结束 -->
  </div>
</template>


<script>
import AMap from "AMap"; // 引入高德地图
import { mapGetters } from "vuex";
import { point, userImg } from "../../http/api";
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

      msg: "篮球", //用户输入
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
      this.newList = [
        {
          id: 79916,
          title: "平湖市新仓镇双红村篮球场2",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=0b10ff2967ed414d9d457d20d8263e7e",
          date: "全天开放",
          site: "双红村仓庆路号、双红村朱家浜23号",
          distance: "100m",
          isBook: true,
          isLessOfFree: true,
          url: ""
        },
        {
          id: 19266,
          title: "德清县体育中心-室外篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=63d28cad120440bea86a09e59e0b1fbc",
          date: "8：30-20：40",
          site: "德清武康街道五里牌路155号",
          distance: "100m",
          isBook: true,
          isLessOfFree: false,
          url:
            "http://deqing.hulasports.com/web/order?_venue=5e5ca0e331fd0d714ddbc50b"
        },
        {
          id: 79812,
          title: "平湖市新埭镇大齐塘村居家养老篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=80f2e46ce061492e986966367e7bc3ec",
          date: "8:00-20:30",
          site: "平湖市新埭镇大齐塘村居家养老服务中心对面",
          distance: "100m",
          isBook: false,
          isLessOfFree: false,
          url: ""
        },
        {
          id: 40560,
          title: "平湖市新埭镇人民政府篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=b7e8eec7df4b46fbaaa730ebf5fda907",
          date: "24小时开放",
          site: "平湖市新埭镇人民政府（新南路398号）广场东侧",
          distance: "100m",
          isBook: false,
          isLessOfFree: false,
          url: ""
        },
        {
          id: 19725,
          title: "长兴体育中心-篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=f7f5b1faf50c4e8ea002c55ed6862e69",
          date: "12:00-20:10",
          site: "湖州市长兴县太湖中路170号",
          distance: "100m",
          isBook: true,
          isLessOfFree: true,
          url:
            "https://fdsaas.hulasports.com/web/order?_venue=5dc2226a7e9312f021afca97"
        },
        {
          id: 38887,
          title: "岱山县衢山镇沙塘社区村民委员会-休闲公园篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=a076c9b82ae94b269457616f8b98d36b",
          date: "24小时",
          site: "岱山县衢山镇沙塘社区88号",
          distance: "100m",
          isBook: false,
          isLessOfFree: false,
          url: ""
        },
        {
          id: 38869,
          title: "岱山县体育发展中心-篮球场2",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=ad99c5ecee56434a96c7d865c00ab1d1",
          date: "全天",
          site: "岱山县高亭镇长剑大道175号",
          distance: "100m",
          isBook: false,
          isLessOfFree: false,
          url: ""
        },
        {
          id: 19269,
          title: "德清县体育中心-体育馆",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=06276b38c3074429927ba97b8f87bac3",
          date: "改造期间，暂不开放",
          site: "德清武康街道五里牌路155号",
          distance: "100m",
          isBook: false,
          isLessOfFree: false,
          url: ""
        },
        {
          id: 40756,
          title: "平湖市新仓镇中华村篮球场1",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=4ff76140bc884ff2b422dc56b9e63bdb",
          date: "24小时开放",
          site: "新仓镇中华村中华路85号",
          distance: "100m",
          isBook: false,
          isLessOfFree: false,
          url: ""
        },
        {
          id: 40658,
          title: "平湖市新埭镇牌楼村篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=1f3516772da841d1b87434c61ff31fab",
          date: "24小时开放",
          site: "平湖市新埭镇牌楼村村部东50米",
          distance: "100m",
          isBook: false,
          isLessOfFree: false,
          url: ""
        }
      ];
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
      // zlbFun("场馆搜索", () => {
      //   dd.device.location.get({
      //     onSuccess: data => {
      //       [dataPOI.pointY, dataPOI.pointX] = gcj02(
      //         data.longitude,
      //         data.latitude
      //       );
      //       let id = (this.msg = this.$route.query.name);
      //       if (id) {
      //         this.search();
      //       }
      //     },
      //     onFail: error => {
      //       this.$toast("GPS定位失败");
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
    max-width: 75%;
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
    margin-right: -18px;
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
