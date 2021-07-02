<template>
  <div id="box">
    <!-- 头部开始 -->
    <van-nav-bar title="全民健身地图" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <!-- 头部结束 -->

    <!-- 下拉切换开始 -->
    <div class="box-head">
      <span
        :class="{tab:movement}"
        @click="movement = !movement,region=false,region1=false"
      >{{myData.movement}}</span>
      <span
        :class="{tab:region}"
        @click="region = !region,movement=false,region1=false"
      >{{myData.region}}</span>
      <span
        :class="{tab:region1}"
        @click="region1 = !region1,movement=false,region=false"
      >{{myData.region1}}</span>
      <!-- 可选参数 -->
      <div class="screen">
        <i :class="{active:screen.make}" @click="getMake">可预约</i>
        <i :class="{active:screen.discounts}" @click="getDiscounts">低免</i>
      </div>
    </div>
    <!-- 下拉切换结束 -->

    <!-- 内容开始 -->
    <ul class="box-list" id="container">
      <router-link
        :to="{path:'/goodParticulars',query:{id:item.id}}"
        tag="li"
        class="list-card"
        v-for="item in dataList"
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

          <button v-if="item.isBook" @click.stop="jumpUrl()">订场</button>
        </div>
      </router-link>
    </ul>
    <!-- 内容结束 -->

    <div id="shade" v-show="movement===true||region===true||region1===true">
      <!-- 热门开始 -->
      <div class="hot" v-show="movement">
        <strong>热门运动</strong>
        <div class="hot-football">
          <div @click="getHotMovement()">
            <span>足球</span>
          </div>
          <div @click="getHotMovement('五人')">
            <span>五人足球</span>
          </div>
          <div @click="getHotMovement('七人')">
            <span>七人足球</span>
          </div>
          <div @click="getHotMovement('十一人')">
            <span>十一人足球</span>
          </div>
        </div>
        <div class="hot-movement">
          <div v-for="item in hotData" :key="item.id" @click="getHotMovements(item)">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <!-- 热门结束 -->

      <ul v-show="movement">
        <li>
          <div
            :class="{select:movementList.index==i}"
            v-for="(item,i) in movementList.list"
            :key="i"
            @click="movementList.index=i"
          >{{item.title}}</div>
        </li>
        <li @click="movement=region=false">
          <div
            :class="{select:movementList.list[movementList.index].index==i}"
            v-for="(item,i) in movementList.list[movementList.index].classify"
            :key="i"
            @click="getMovement(i,item)"
          >{{item.name}}</div>
        </li>
      </ul>

      <ul v-show="region">
        <li>
          <div
            :class="{select:regionList.index==i}"
            v-for="(item,i) in regionList.list"
            :key="i"
            @click="regionList.index=i"
          >{{item.title}}</div>
        </li>
        <li @click="movement=region=false">
          <div
            :class="{select:regionList.list[regionList.index].index==i}"
            v-for="(item,i) in regionList.list[regionList.index].classify"
            :key="i"
            @click="getRegion(item,i)"
          >{{item.name}}</div>
        </li>
      </ul>

      <ul v-show="region1">
        <li>
          <div></div>
        </li>
        <li @click="movement=region=false">
          <div
            :class="{select:regionList1.list[regionList1.index].index==i}"
            v-for="(item,i) in regionList1.list[regionList1.index].classify"
            :key="i"
            @click="getRegion1(item,i)"
          >{{item.name}}</div>
        </li>
      </ul>

      <div class="shade-overlay" @click="movement=region=false"></div>
    </div>
    <!-- 下拉结束 -->
    <!-- loading开始 -->
    <div class="loginMap" v-show="login">
      <div class="login">
        <van-loading />
      </div>
    </div>
    <!-- loading结束 -->

    <!-- 列表切换开始 -->
    <div class="tab-control">
      <router-link tag="div" to="/goodPathMap" class="tab-control-list" slot="right">
        <i></i>
        <span>地图</span>
      </router-link>
      <router-link tag="div" to="/searchPlace" class="tab-control-search" slot="right">
        <i></i>
        <span>搜索</span>
      </router-link>
    </div>
    <!-- 列表切换结束 -->
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import { mapGetters } from "vuex";
import { distance } from "../../util/Tool";
var map, //地图
  dataPOI; //信息点

export default {
  data() {
    return {
      login: false,

      movement: false, //运动项目
      region: false, //区域
      region1: false, //区域
      show: false, //下拉菜单

      //下拉加载
      list: [],
      loading: false,
      finished: false,

      //状态切换
      screen: {
        make: false, //预约
        discounts: false, //低免
        indexCont: false //内容展示框
      },

      //参数切换
      myData: {
        movement: "运动项目",
        region: "区域",
        region1: "设施"
      },
      //热门
      hotData: [{}],

      dataList: [],
      movementList: {
        index: 0,
        list: [{}]
      },
      regionList: {
        index: 0,
        list: [{}]
      },
      regionList1: {
        index: 0,
        list: [{}]
      }
    };
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      //初始化清空数据
      let searchCircumData =
        JSON.parse(localStorage.getItem("searchCircum")) || "";
      console.log(searchCircumData, "searchCircumData");
      localStorage.removeItem("searchCircum");
      dataPOI = {
        pointSportTypeId: null, //运动类型id
        pointAreaId: null, //区域id
        isBook: null, //是否预定 0是 1否
        isLessOfFree: null, //是否低免 0是 1否
        checkStatus: 0, //审核状态 //默认
        pointY: null, //我的位置 y
        pointX: null, //我的位置 x
        name: null,
        page: 0, //页数
        limit: 10, //每页数量
        orderType: 1 //排序 0倒叙 1正序
      };
      console.log(dataPOI);
      //判断传过来的东西不为空
      if (searchCircumData) {
        dataPOI.pointSportTypeId = searchCircumData.pointSportTypeId;
        dataPOI.pointAreaId = searchCircumData.pointAreaId;
        dataPOI.isBook = searchCircumData.isBook;
        dataPOI.isLessOfFree = searchCircumData.isLessOfFree;
        dataPOI.pointY = searchCircumData.pointY;
        dataPOI.pointX = searchCircumData.pointX;
        dataPOI.name = searchCircumData.name;

        this.myData.movement = searchCircumData.movement;
        this.myData.region = searchCircumData.region;
        this.screen.make = searchCircumData.isBook === 0;
        this.screen.discounts = searchCircumData.isLessOfFree === 0;
      }

      this.inquireRegion();
      this.inquireMotion();
      this.hot();
      //获取自己的位置
      this.GPS();
    },

    GPS() {
      [dataPOI.pointY, dataPOI.pointX] =  [
        120.57215254209507,
        30.048076408242174
      ];
    },

    /**
     * 页面跳转
     */
    jumpUrl() {
      this.$router.push("/pay");
    },

    /**
     * 查询场馆列表
     */
    inquireList() {
      this.dataList = [
        {
          id: 31486,
          title: "绍兴市越城区灵芝街道外滩社区-乒乓球馆2",
          typeName: "乒乓球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=f1150688bea849b28752c550d7653fe2",
          date: "8:30-12:00,14:00-17:00",
          site: "绍兴市越城区灵芝街道解放北路镜湖大桥南面（金色家园西大门",
          distance: "1m",
          url: "",
          isBook: true,
          isLessOfFree: true
        },
        {
          id: 31481,
          title: "外滩社区梅园小区全民健身路径",
          typeName: "全民健身路径",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=ddec9a18f916433dae79dc5fc464f730",
          date: "24小时开放",
          site: "绍兴市越城区灵芝街道解放北路镜湖大桥南面（金色家园西大门",
          distance: "49m",
          url: "",
          isBook: false,
          isLessOfFree: false
        },
        {
          id: 31487,
          title: "外滩社区百合花园游泳池",
          typeName: "游泳",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=9d0002361dbb4a5aaa228b8b43639fbf",
          date: "24小时开放",
          site: "绍兴市越城区灵芝街道解放北路镜湖大桥南面（金色家园西大门",
          distance: "405m",
          url: "",
          isBook: true,
          isLessOfFree: true
        },
        {
          id: 31480,
          title: "外滩社区赞成美林小区全民健身路径",
          typeName: "全民健身路径",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=5861f2daa58d44238a864d39aa125337",
          date: "24小时开放",
          site: "绍兴市越城区灵芝街道解放北路镜湖大桥南面（金色家园西大门",
          distance: "461m",
          url: "",
          isBook: false,
          isLessOfFree: false
        },
        {
          id: 31483,
          title: "灵芝街道外滩社区-全民健身路径2",
          typeName: "全民健身路径",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=8cd899860cef4a8cb338fbc217d6fe24",
          date: "24小时开放",
          site: "绍兴市越城区灵芝街道解放北路镜湖大桥南面（金色家园西大门",
          distance: "464m",
          url: "",
          isBook: false,
          isLessOfFree: false
        },
        {
          id: 29378,
          title: "绍兴市镜湖中学-篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=e547f9503b9f4ee29e5b243712289d06",
          date: "8:00-11:00,14:00-17:00",
          site: "绍兴市越城区灵芝街道镜湖新区曲屯路 ",
          distance: "513m",
          url: "",
          isBook: true,
          isLessOfFree: false
        },
        {
          id: 31482,
          title: "灵芝街道外滩社区居民委员会全民健身路径1",
          typeName: "全民健身路径",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=0c8c9db06a4945858435bf5fde0e639b",
          date: "24小时开放",
          site: "绍兴市越城区灵芝街道解放北路镜湖大桥南面（金色家园西大门",
          distance: "540m",
          url: "",
          isBook: false,
          isLessOfFree: false
        },
        {
          id: 29379,
          title: "镜湖中学篮球馆",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=79f90f46f6c84fef8281719c7bc403eb",
          date: "8:00-11:00,14:00-17:00",
          site: "绍兴市越城区灵芝街道镜湖新区曲屯路 ",
          distance: "558m",
          url: "",
          isBook: true,
          isLessOfFree: false
        },
        {
          id: 29377,
          title: "绍兴市镜湖中学-沙滩排球场",
          typeName: "排球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=69353369ffa44b788db91264bc9417b7",
          date: "8:00-11:00,14:00-17:00",
          site: "绍兴市越城区灵芝街道镜湖新区曲屯路 ",
          distance: "561m",
          url: "",
          isBook: true,
          isLessOfFree: false
        },
        {
          id: 31478,
          title: "外滩社区天御花园-篮球场",
          typeName: "篮球",
          img:
            "http://223.4.72.248:10084/api-file/files-anon/download?fileID=6aa1e4b2a2b840bb8c2205ec4867b829",
          date: "24小时开放",
          site: "绍兴市越城区灵芝街道解放北路镜湖大桥南面（金色家园西大门",
          distance: "606m",
          url: "",
          isBook: true,
          isLessOfFree: false
        }
      ];
    },

    /**
     * 获取点击运动
     */
    getMovement(i, item) {
      dataPOI.page = 0;
      dataPOI.name = null;
      this.myData.movement = item.name;
      this.movementList.list[this.movementList.index].index = i;
      dataPOI.pointSportTypeId = item.id;
    },
    /**
     * 点击获取热门(篮球)
     */
    getHotMovement(name = "") {
      this.myData.movement = name + "足球";
      this.movementList.list[this.movementList.index].index = -1;
      dataPOI.pointSportTypeId = 268;
      dataPOI.name = name || null;
      dataPOI.page = 0;
      this.movement = this.region = false;
    },
    /**
     * 点击获取热门(全部)
     */
    getHotMovements(item) {
      this.movement = this.region = false;
      return this.getMovement(-1, item);
    },
    /**
     * 获取点击地区
     */
    getRegion(item, i) {
      dataPOI.page = 0;
      this.myData.region = item.name;
      this.regionList.list[this.regionList.index].index = i;
      dataPOI.pointAreaId = item.id;
    },
    getRegion1(item, i) {
      this.myData.region1 = item.name;
      this.regionList1.list[this.regionList1.index].index = i;
      let getCenter = item.center.split(",");
      dataPOI.pointAreaId = item.id;
      [dataPOI.pointY, dataPOI.pointX] = getCenter;
      map.setZoomAndCenter(14, getCenter);
      dataPOI.page = 1;
      this.pointOfInformation();
    },
    /**
     * 可预约
     */
    getMake() {
      dataPOI.page = 0;
      let make = (this.screen.make = !this.screen.make);
      make ? (dataPOI.isBook = 0) : (dataPOI.isBook = null);
    },

    /**
     * 抵免
     */
    getDiscounts() {
      dataPOI.page = 0;
      let discounts = (this.screen.discounts = !this.screen.discounts);
      discounts ? (dataPOI.isLessOfFree = 0) : (dataPOI.isLessOfFree = null);
    },

    /**
     * 地区查询(初始化)
     */
    inquireRegion() {
      this.regionList.list = [
        {
          id: 126,
          title: "绍兴市",
          classify: [
            { id: 126, name: "绍兴市", center: "120.580364,30.030192" },
            {
              id: 1299,
              name: "越城区",
              parentId: 126,
              adcode: 330602,
              center: "120.582633,29.988244",
              number: 1728
            },
            {
              id: 1300,
              name: "柯桥区",
              parentId: 126,
              adcode: 330603,
              center: "120.495085,30.081929",
              number: 1645
            },
            {
              id: 1301,
              name: "上虞区",
              parentId: 126,
              adcode: 330604,
              center: "120.868122,30.03312",
              number: 1038
            },
            {
              id: 1302,
              name: "新昌县",
              parentId: 126,
              adcode: 330624,
              center: "120.903866,29.499831",
              number: 1140
            },
            {
              id: 1303,
              name: "诸暨市",
              parentId: 126,
              adcode: 330681,
              center: "120.246863,29.708692",
              number: 3850
            },
            {
              id: 1304,
              name: "嵊州市",
              parentId: 126,
              adcode: 330683,
              center: "120.831025,29.56141",
              number: 1274
            }
          ],
          index: 0
        }
      ];

      this.regionList1.list = [
        {
          id: 126,
          title: "绍兴市",
          classify: [
            { id: 126, name: "公共体育场馆", center: "120.580364,30.030192" },
            {
              id: 1299,
              name: "百姓健身房",
              parentId: 126,
              adcode: 330602,
              center: "120.582633,29.988244",
              number: 1728
            },
            {
              id: 1300,
              name: "民营体育场馆",
              parentId: 126,
              adcode: 330603,
              center: "120.495085,30.081929",
              number: 1645
            },
            {
              id: 1301,
              name: "学校体育场馆",
              parentId: 126,
              adcode: 330604,
              center: "120.868122,30.03312",
              number: 1038
            },
            {
              id: 1302,
              name: "农村体育设施",
              parentId: 126,
              adcode: 330624,
              center: "120.903866,29.499831",
              number: 1140
            },
            {
              id: 1303,
              name: "其他",
              parentId: 126,
              adcode: 330681,
              center: "120.246863,29.708692",
              number: 3850
            }
          ],
          index: 0
        }
      ];
    },

    /**
     * 运动查询(初始化)
     */
    inquireMotion() {
      this.movementList.list = [
        {
          id: 305,
          title: "室内运动",
          classify: [
            { name: "体操", id: 293 },
            { name: "棋类", id: 294 },
            { name: "举重", id: 296 },
            { name: "电子竞技", id: 297 },
            { name: "武术", id: 298 },
            { name: "搏击", id: 299 },
            { name: "射击", id: 300 },
            { name: "射箭", id: 301 },
            { name: "健身房", id: 311 },
            { name: "击剑", id: 302 }
          ],
          index: 0
        },
        {
          id: 306,
          title: "室外运动",
          classify: [
            { name: "水上运动", id: 286 },
            { name: "极限运动", id: 288 },
            { name: "攀岩登山", id: 289 },
            { name: "野外露营", id: 290 },
            { name: "航空运动", id: 291 },
            { name: "全民健身路径", id: 272 },
            { name: "自行车", id: 292 },
            { name: "马术", id: 295 }
          ],
          index: 0
        },
        {
          id: 307,
          title: "球类运动",
          classify: [
            { name: "乒乓球", id: 269 },
            { name: "毽球", id: 273 },
            { name: "台球", id: 274 },
            { name: "门球", id: 275 },
            { name: "曲棍球", id: 276 },
            { name: "手球", id: 277 },
            { name: "板球", id: 278 },
            { name: "地掷球", id: 279 },
            { name: "高尔夫球", id: 280 },
            { name: "棒球", id: 281 },
            { name: "木球", id: 282 },
            { name: "排球", id: 283 },
            { name: "垒球", id: 284 },
            { name: "壁球", id: 285 }
          ],
          index: 0
        },
        {
          id: 308,
          title: "其他运动",
          classify: [
            { name: "小运动场", id: 310 },
            { name: "登山步道", id: 287 },
            { name: "健身场地", id: 303 }
          ],
          index: 0
        }
      ];
    },

    /**
     * 热门查询
     */
    hot() {
      this.hotData = [
        { id: 266, name: "羽毛球" },
        { id: 270, name: "网球" },
        { id: 267, name: "篮球" },
        { id: 271, name: "游泳" }
      ];
    },

    /**
     * 返回上一级
     */
    goBack() {
      this.$router.push("/");
    }
  },
  mounted() {
    //地图高度
    let head = document.getElementsByClassName("box-head")[0].clientHeight || 0,
      nav = 46,
      mapHeight = document.body.clientHeight - head - nav;
    document.getElementById("container").style.height = mapHeight + "px";
    document.getElementById("shade").style.height = mapHeight + "px";
    document.getElementById("shade").style.top = head + nav + "px";

    //返回键听
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  computed: {
    ...mapGetters(["userPhone"])
  },
  created() {
    //查询初始化
    this.init();
    this.inquireList();
  }
};
</script>

<style>
.amap-logo {
  bottom: -1rem;
}
.amap-copyright {
  bottom: -1rem;
}
</style>
<style scoped lang="less">
//=======================
.i(@img) {
  content: "";
  display: inline-block;
  top: 50%;
  height: 1rem;
  width: 1rem;
  background: url(@img) no-repeat center;
  background-size: cover;
}
.icon(@img, @h: 1rem, @w: 1rem) {
  content: "";
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
.i-btn(@img, @h: 1rem, @w: 1rem) {
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: cover;
  vertical-align: middle;
}
//=======================

#box {
  // background: url() no-repeat center;
  // background-size: cover;
  min-height: 100vh;
  color: #333;
  background-color: #f6f8f7;

  .map {
    .i-btn("../../assets/ditu.png");
  }
  .search {
    .i-btn("../../assets/sousuoh.png", 0.8rem, 0.8rem);
    margin-left: 0.4rem;
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

  // 切换选项卡
  .box-head {
    display: flex;
    justify-content: space-between;
    padding: 0 0.6rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.7rem;
    color: #333;
    background-color: #fff;
    span {
      display: inline-flex;
      align-items: center;
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 1rem;
      line-height: 2rem;
      &.tab::after {
        .i("../../assets/jiantous.png");
      }
      &::after {
        .i("../../assets/jiantoux.png");
      }
    }
    .screen {
      white-space: nowrap;
      i {
        display: inline-flex;
        align-items: center;
        &::before {
          .i("../../assets/yueyue.png");
          margin-left: 1rem;
        }
      }
      i.active {
        color: #1492ff;
        &::before {
          .i("../../assets/yuyuexuanzhong.png");
        }
      }
    }
  }

  //展示列表
  .box-list {
    overflow: auto;
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

  //下拉框
  #shade {
    position: absolute;
    width: 100vw;
    top: 46px;
    // 热门
    .hot {
      position: relative;
      padding: 0 0.6rem;
      height: 6.3rem;
      color: #1492ff;
      background-color: #f6f8f7;
      z-index: 10;
      strong {
        font-family: PingFang SC;
        display: block;
        padding: 0.75rem 0;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
      .hot-i() {
        display: inline-block;
        padding: 0 0.2rem;
        height: 100%;
        width: 25%;

        span {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          height: 100%;
          border-radius: 0.125rem;
          font-size: 0.6rem;
          line-height: 0.6rem;
        }
      }
      .hot-football {
        height: 1.8rem;
        padding-bottom: 0.6rem;
        width: 100%;
        font-size: 0;
        border-bottom: 1px dashed rgba(231, 231, 231, 1);
        div {
          .hot-i();
          span {
            color: #1492ff;
            border: none;
            background-color: #edf1f5;
          }
        }
        div:nth-child(1) span {
          color: #1492ff;
          border: 1px solid;
          background-color: transparent;
        }
      }
      .hot-movement {
        height: 1.2rem;
        width: 100%;
        margin-top: 10px;
        font-size: 0;
        div {
          .hot-i;
        }
      }
    }
    > ul {
      position: absolute;
      // overflow:scroll;
      display: flex;
      height: 19rem;
      width: 100vw;
      background-color: white;
      z-index: 2;
      &:nth-child(3) {
        height: 100%;
      }
      &:nth-child(4) {
        height: 100%;
      }

      > li {
        overflow: scroll;
        height: 100%;
        &:nth-child(1) {
          width: 35%;
          background-color: #f6f8f7;
          div {
            padding: 0 0.6rem;
            &.select {
              color: #1492ff;
              background-color: white;
            }
          }
        }
        &:nth-child(2) {
          width: 65%;
          background-color: #fff;
          div {
            margin: 0 0.8rem 0 0.4rem;
            padding-left: 1.25rem;
            border-bottom: 0.05rem solid #e7e7e7;
            &.select {
              color: #1492ff;
              &::after {
                .icon("../../assets/xuanzhong.png", 0.8rem, 0.55rem);
              }
            }
          }
        }
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 2rem;
          font-size: 0.7rem;
        }
      }
    }
    .shade-overlay {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.16);
      z-index: 1;
    }
  }

  //选项卡切换
  .control(@img) {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    i {
      display: inline-block;
      height: 0.75rem;
      width: 0.75rem;
      margin-bottom: 0.3rem;
      background: url(@img) no-repeat center;
      background-size: cover;
    }
    span {
      font-size: 0.55rem;
      line-height: 0.55rem;
    }
  }

  .tab-control {
    display: flex;
    position: fixed;
    right: 50%;
    bottom: 1.2rem;
    margin-right: -4.5rem;
    height: 2.2rem;
    width: 9rem;
    overflow: hidden;
    border-radius: 3rem;
    box-shadow: 0 0.8rem 1.45rem 0.15rem rgba(29, 55, 84, 0.2);
    background-color: white;

    .tab-control-list {
      color: #333;
      .control("../../assets/ditu.png");
      i {
        background-size: 120%;
      }
    }
    .tab-control-search {
      background-color: #1492ff;
      color: #fff;
      .control("../../assets/sousuolist.png");
    }
    animation: control 0.8s;
  }

  //动画
  @keyframes control {
    0% {
      bottom: 0;
      opacity: 0;
    }
    100% {
      bottom: 1.2rem;
    }
  }

  //==================================
  //修改框架样式
  //==================================
  .van-icon.van-icon-scan {
    margin-right: 0.55rem;
  }
}
</style>
