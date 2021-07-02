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
      <!-- <span
        :class="{tab:region}"
        @click="region = !region,movement=false,region1=false"
      >{{myData.region}}</span> -->
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
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="inquireList"
      >
        <router-link
          :to="{path:'/map/goodParticulars',query:{id:item.id}}"
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

            <button v-if="item.isBook" @click.stop="jumpUrl(item.id)">订场</button>
          </div>
        </router-link>
      </van-list>
    </ul>
    <!-- 内容结束 -->

    <!-- 下拉开始 -->
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
        <div>
          <router-link tag="div" to="/map/goodPathMap" style="height:100%;">
          <img class="map_iconMap" src="../../assets/map_icon_2@2x.png">
        </img>
        </router-link>
      </div>
       <div>
          <router-link tag="div" to="/map/goodPathList" style="height:100%;">
          <img class="map_iconMap22" src="../../assets/map_icon_3@2x.png">
        </img>
        </router-link>
      </div>
    <!-- 列表切换结束 -->
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import { mapGetters } from "vuex";
import { distance, zlbFun, gcj02 } from "../../util/Tool";
import { point, region, motionType, userImg, hotType } from "../../http/api";
var map, //地图
  dataPOI; //信息点

export default {
  data() {
    return {
      login: false,

      movement: false, //运动项目
      region: false, //区域
      region1: false, //设施
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
        region1: "类型"
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
      ImageUrl: this.ImageUrl,
      regionList1: {
        index: 0,
        list: [
          {
            classify: [
              { id: "", name: "全部" },
              { id: 1, name: "公共体育场馆" },
              { id: 2, name: "百姓健身房" },
              { id: 3, name: "学校体育场馆" },
              { id: 4, name: "体育休闲公园" },
              { id: 5, name: "民营体育场馆" },
              { id: 6, name: "农村体育设施" },
              { id: 7, name: "其他" }
            ],
            index: 0
          }
        ]
      }
    };
  },
  methods: {
                      //定位获得当前位置信息
     getMyLocation() {
      //  alert(1111111);
      var geolocation = new qq.maps.Geolocation("IWFBZ-NH7WF-5C5JS-JDWYX-7H74H-3OFTR", "我的报修");
      // geolocation.getIpLocation(this.showPosition, this.showErr);
        geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
      },
      showPosition(position) {
          console.log(position);
          this.latitude = position.lat;
          this.longitude = position.lng;
          this.city = position.city;
          this.init(this.latitude,this.longitude);
      },
      showErr() {
      console.log("定位失败");
      this.getMyLocation();//定位失败再请求定位，测试使用
      },
    /**
     * 初始化
     */
    init(lat,lng) {
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
        orderType: 1, //排序 0倒叙 1正序
        type: ""
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
      this.GPS(lat,lng);
    },

    GPS(lat,lng) {
      [dataPOI.pointY, dataPOI.pointX] = [
          // 120.137649,
          // 30.268234
          lng,lat
      ];
      this.inquireList();
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
      //       [dataPOI.pointY, dataPOI.pointX] = gcj02(
      //         result.position.lng,
      //         result.position.lat
      //       );
      //       this.inquireList();
      //     } else {
      //       this.$toast("GPS定位失败");
      //     }
      //   });
      // });
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
    jumpUrl(id) {
      // let mobile = this.userPhone;
      // if (!mobile || isNaN(mobile)) return false;
      // window.location.href = url + `&tel=${mobile}`;
       this.$router.push({
        path:'/bookDetail',
        query: {
          id: id
        }
      })
    },

    /**
     * 查询场馆列表
     */
    inquireList() {
      this.interceptor();
      dataPOI.page++;
      point(dataPOI).then(res => {
        if (res.code === 0 && res.data.length) {
          this.loading = false;
          this.finished = false;
          res.data.forEach(item => {
            let img = ''
            if (item.fileList.length !=0) {
              img = this.ImageUrl + item.fileList[0].id
            } else {
              img = require("../../assets/zwtpmrtp.jpeg")
            }
            let data = {
              id: item.id,
              title: item.pointName,
              typeName: Array(item.fitnessTypeNameArr).join(),
              img: img,
              date: item.pointOpenTime || "暂无",
              site: item.pointAddr || "暂无",
              distance: distance(item.distance || ""),
              url: item.pointBookUrl,
              isBook: !item.isBook,
              isLessOfFree: !item.isLessOfFree
            };
            this.dataList.push(data);
          });
        } else {
          this.finished = true;
          this.loading = false;
        }
        this.login = false;
      });
    },

    /**
     * 获取点击运动
     */
    getMovement(i, item) {
      this.interceptor();
      dataPOI.page = 0;
      dataPOI.name = null;
      this.dataList = [];
      this.myData.movement = item.name;
      this.movementList.list[this.movementList.index].index = i;
      dataPOI.pointSportTypeId = item.id;
      this.inquireList();
    },
    /**
     * 点击获取热门(篮球)
     */
    getHotMovement(name = "") {
      this.interceptor();
      this.dataList = [];
      this.myData.movement = name + "足球";
      this.movementList.list[this.movementList.index].index = -1;
      dataPOI.pointSportTypeId = 268;
      dataPOI.name = name || null;
      dataPOI.page = 0;
      this.movement = this.region = false;
      this.inquireList();
    },
    /**
     * 点击获取热门(全部)
     */
    getHotMovements(item) {
      this.interceptor();
      this.movement = this.region = false;
      return this.getMovement(-1, item);
    },
    /**
     * 获取点击地区
     */
    getRegion(item, i) {
      this.interceptor();
      dataPOI.page = 0;
      this.dataList = [];
      this.myData.region = item.name;
      this.regionList.list[this.regionList.index].index = i;
      dataPOI.pointAreaId = item.id;
      this.inquireList();
    },

    /**
     * 点击获取设施
     */
    getRegion1(item, i) {
      this.interceptor();
      dataPOI.page = 0;
      dataPOI.type = item.id;
      this.dataList = [];
      this.myData.region1 = item.name;
      this.regionList1.list[this.regionList1.index].index = i;
      this.movement = this.region = this.region1 = false;
      this.inquireList();
    },

    /**
     * 可预约
     */
    getMake() {
      this.interceptor();
      dataPOI.page = 0;
      this.dataList = [];
      let make = (this.screen.make = !this.screen.make);
      make ? (dataPOI.isBook = 0) : (dataPOI.isBook = null);
      this.inquireList();
    },

    /**
     * 抵免
     */
    getDiscounts() {
      this.interceptor();
      dataPOI.page = 0;
      this.dataList = [];
      let discounts = (this.screen.discounts = !this.screen.discounts);
      discounts ? (dataPOI.isLessOfFree = 0) : (dataPOI.isLessOfFree = null);
      this.inquireList();
    },

    /**
     * 地区查询(初始化)
     */
    inquireRegion() {
      region().then(res => {
        let district = res.data.map(data => data);
        this.regionList.list = [
          {
            id: 126,
            title: "绍兴市",
            classify: district,
            index: 0
          }
        ];
      });
    },

    /**
     * 运动查询(初始化)
     */
    inquireMotion() {
      motionType().then(res => {
        this.movementList.list = res.data
          .map(item => {
            let district = item.childList.map(data => data);
            return {
              id: item.id,
              title: item.name,
              classify: district,
              index: 0
            };
          })
          .slice(1, res.data.length);
      });
    },

    /**
     * 热门查询
     */
    hot() {
      hotType({
        parentId: 304,
        page: 1,
        limit: 5
      }).then(res => {
        if (res.data.length) {
          this.hotData = res.data
            .map(item => {
              return {
                id: item.id,
                name: item.name
              };
            })
            .slice(1, res.data.length);
        }
      });
    },

    /**
     * 返回上一级
     */
    goBack() {
      window.location.href = "sxty://back";
      this.$router.go(-1);
      // this.$router.push("/map/goodPathMap");
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
    this.getMyLocation();
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
  .map_iconMap{
  width: 60px;
  height: 60px;
  position: fixed;
  right: 5px;
  bottom: 160px;
}
.map_iconMap22{
  width: 60px;
  height: 60px;
  position: fixed;
  right: 5px;
  bottom: 100px;
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
      // margin-right: 1rem;
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
    bottom: 4.2rem;
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
