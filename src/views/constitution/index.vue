<template>
  <div id="box">
    <!-- 头部开始 -->
    <van-nav-bar title="全民健身地图" left-text="返回" left-arrow>
      <van-icon name="search" />
      <router-link tag="i" to="/goodPathList" class="map" slot="right"></router-link>
      <router-link tag="i" to="/searchPlace" class="search" slot="right"></router-link>
    </van-nav-bar>
    <!-- 头部结束 -->

    <!-- 下拉切换开始 -->
    <div class="box-head">
      <span :class="{tab:movement}" @click="movement = !movement,region=false">{{myData.movement}}</span>
      <span :class="{tab:region}" @click="region = !region,movement=false">{{myData.region}}</span>
      <!-- 可选参数 -->
      <div class="screen">
        <i :class="{active:screen.make}" @click="getMake">可预约</i>
        <i :class="{active:screen.discounts}" @click="getDiscounts">低免</i>
      </div>
    </div>
    <!-- 下拉切换结束 -->

    <!-- 地图开始 -->
    <div class="box-map">
      <div id="container" @click="clickIcon"></div>

      <div class="venue" :class="{low:dataList.low}" v-show="screen.indexCont">
        <strong :class="{order:dataList.order}">{{dataList.title}}</strong>
        <span>距您{{dataList.distance}} {{dataList.site}}</span>
        <p>开放时间：{{dataList.date}}</p>
        <div class="venue-btn">
          <a href="#">
            <span>查看详情</span>
          </a>
          <a href="#">
            <span>导航</span>
          </a>
        </div>
      </div>
    </div>
    <!-- 地图结束 -->

    <!-- 下拉开始 -->
    <div id="shade" v-show="movement===true||region===true">
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
            @click="getMovement(item.name,i)"
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
            @click="getRegion(item.name,i)"
          >{{item.name}}</div>
        </li>
      </ul>
      <div class="shade-overlay" @click="movement=region=false"></div>
    </div>
    <!-- 下拉结束 -->
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import { pointAll, region, motionType, pointCont } from "../../http/api";
import { icon } from "../../util/Tool";
var map; //地图
//信息点

var dataPOI = {
  pointSportTypeId: null, //运动类型id
  pointAreaId: null, //区域id
  isBook: null, //是否预定 0是 1否
  isLessOfFree: null, //是否低免 0是 1否
  checkStatus: 0, //审核状态 //默认
  pointY: null, //我的位置 y
  pointX: null, //我的位置 x
  page: 1, //页数
  // limit: 20, //每页数量
  orderType: 1, //排序 0倒叙 1正序
  minDistance:0,//最小距离
  maxDistance:1000//最大距离
};
export default {
  data() {
    return {
      movement: false, //运动项目
      region: false, //区域
      show: false, //下拉菜单

      //状态切换
      screen: {
        make: false, //预约
        discounts: false, //低免
        indexCont: false //内容展示框
      },

      //参数切换
      myData: {
        movement: "运动项目",
        region: "区域"
      },

      //数据
      dataList: {},
      movementList: {
        index: 0,
        list: [{}]
      },
      regionList: {
        index: 0,
        list: [{}]
      }
    };
  },
  methods: {
    /**
     * 地图初始化函数
     */
    init() {
      // 给地图容器定义高度
      let head =
          document.getElementsByClassName("box-head")[0].clientHeight ||
          o.offsetHeight,
        nav =
          document.getElementsByClassName("van-nav-bar")[0].clientHeight ||
          o.offsetHeight,
        mapHeight = document.body.clientHeight - head - nav;
      document.getElementById("container").style.height = mapHeight + "px";
      document.getElementById("shade").style.height = mapHeight + "px";
      document.getElementById("shade").style.top = head + nav + "px";

      //初始化地图
      map = new AMap.Map("container", {
        zoom: 15, //级别
        resizeEnable: true
      });

      //开启定位
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status == "complete") {
            console.log(result);
            dataPOI.pointY = result.position.lng;
            dataPOI.pointX = result.position.lat;

            //信息点初始化
            this.pointOfInformation();
          } else {
            this.$toast("GPS定位失败");
            console.log(result);
          }
        });
      });
    },

    /**
     * 获取点击运动
     */
    getMovement(name, i) {
      this.myData.movement = name;
      this.movementList.list[this.movementList.index].index = i;
    },

    /**
     * 获取点击地区
     */
    getRegion(name, i) {
      this.myData.region = name;
      this.regionList.list[this.regionList.index].index = i;
    },

    /**
     * 可预约
     */
    getMake() {
      let make = (this.screen.make = !this.screen.make);
      make ? (dataPOI.isBook = 0) : (dataPOI.isBook = null);
      this.pointOfInformation();
    },

    /**
     * 抵免
     */
    getDiscounts() {
      let discounts = (this.screen.discounts = !this.screen.discounts);
      discounts ? (dataPOI.isLessOfFree = 0) : (dataPOI.isLessOfFree = null);
      this.pointOfInformation();
    },

    /**
     * 跳转搜索
     */
    onClickRight() {
      this.$router.push("/searchPlace");
    },

    /**
     * 信息点查询
     */
    pointOfInformation() {
      console.log(dataPOI, "信息点初始化");
      map.clearMap();
      pointAll(dataPOI).then(res => {
        if (res.data.length) {
          let msg = res.data.map(item => {
            return {
              id: item.id,
              type: item.typeList[0].icon,
              position: [item.pointyCoordinate, item.pointxCoordinate] // 基点位置
            };
          });
          let add = this.icon(msg);
          map.add(add);
        } else {
          this.$toast("暂无数据");
        }
      });
    },
    icon(page) {
    if (!page) return;
    let url = require('img/icon.png'),
        content = '';
    return page.map(item => {
        // url = require(`@/assets/icon/${item.type}.png`) || url;
        content = `< img class='icon' src='${url}' data-id="${item.id}" height="28" width="28">`;
        return new AMap.Marker({
            content,  // 自定义点标记覆盖物内容
            position: item.position, // 基点位置
            offset: new AMap.Pixel(-14, -14), // 相对于基点的偏移位置
        });
    })
}

    /**
     * 地区查询(初始化)
     */
    inquireRegion() {
      region().then(res => {
        this.regionList.list = res.data.map(item => {
          let district = item.childList.map(data => data);
          return {
            id: item.id,
            title: item.name,
            classify: district,
            index: 0
          };
        });
      });
    },

    /**
     * 运动查询(初始化)
     */
    inquireMotion() {
      motionType().then(res => {
        this.movementList.list = res.data.map(item => {
          let district = item.mList.map(data => data);
          return {
            id: item.id,
            title: item.name,
            classify: district,
            index: 0
          };
        });
      });
    },

    /**
     * 点击地图添加绑定事件
     */
    clickIcon() {
      console.log("点击了地图");
      //接下来为信息点绑定事件
      let icon = document.getElementsByClassName("icon");
      for (let i = 0; i < icon.length; i++) {
        icon[i].addEventListener("click", this.iconCont);
      }
    },

    /**
     * 信息点函数
     */
    iconCont(e) {
      let id = e.target.getAttribute("data-id");
      pointCont(id).then(res => {
        let data = res.data;
        this.dataList = {
          id: data.id,
          title: data.pointName || "暂无数据",
          date: data.pointOpenTime || "08:00-20:00",
          site: data.pointAddr || "双溪竹海景区",
          distance: "4.2km",
          order: data.isBook === 0,
          low: data.isLessOfFree === 0
        };
        this.screen.indexCont = true;
      });
    }
  },
  mounted() {
    //地图初始化
    this.init();
  },
  created() {
    //查询初始化
    this.inquireRegion();
    this.inquireMotion();
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
    .i-btn("../../assets/liebiao.png");
  }
  .search {
    .i-btn("../../assets/sousuoh.png", 0.8rem, 0.8rem);
    margin-left: 0.4rem;
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
  //地图详情
  .box-map {
    // 高德地图
    #container {
      width: 100vw;
      background-color: #eee;
    }
    //展示卡
    .venue {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 1.15rem 0.6rem 0;
      width: 100vw;
      border-radius: 0.9rem 0.9rem 0 0;
      background-color: white;
      box-shadow: 0 -0.15rem 0.3rem 0 rgba(153, 153, 153, 0.4);

      &.low::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 2.1rem;
        width: 2.1rem;
        background: url("../../assets/dmditu.png") no-repeat center;
        background-size: cover;
      }
      > strong {
        font-family: PingFang SC;
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        line-height: 0.9rem;
        font-size: 0.9rem;
      }
      > strong.order::after {
        content: "订场";
        display: inline-block;
        margin-left: 0.5rem;
        width: 2.5rem;
        height: 1rem;
        border: 0.05rem solid;
        border-radius: 0.125rem;
        font-size: 0.6rem;
        line-height: 1rem;
        text-align: center;
        color: #1492ff;
      }
      > span {
        font-family: PingFang SC;
        display: block;
        margin-bottom: 0.85rem;
        font-size: 0.6rem;
        line-height: 0.6rem;
        color: #999;
      }
      > p {
        font-family: PingFang SC;
        margin-bottom: 0.45rem;
        min-height: 1.6rem;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
      .venue-btn {
        display: flex;
        align-items: center;
        margin-top: 0.9rem;
        height: 2.45rem;
        border-top: 0.05rem solid #ccc;
        a {
          width: 100%;
          height: 1.4rem;
          font-size: 0.7rem;
          line-height: 1.4rem;
          text-align: center;
          color: #333;
          &:nth-child(1) {
            border-right: 0.05rem solid #ccc;
            span {
              margin-right: 12px;
              &::before {
                .i("../../assets/chakanxiangqing.png");
              }
            }
          }
          &:nth-child(2) {
            span {
              margin-left: 12px;
              &::before {
                .i("../../assets/icon.png");
              }
            }
          }
          span {
            display: inline-flex;
            align-items: center;
          }
        }
      }
    }
  }

  //下拉框
  #shade {
    position: absolute;
    width: 100vw;
    top: 46px;
    > ul {
      position: absolute;
      // overflow:scroll;
      display: flex;
      height: 19rem;
      width: 100vw;
      background-color: white;
      z-index: 1;
      &:nth-child(2) {
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
