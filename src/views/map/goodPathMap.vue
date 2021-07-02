<template>
  <div id="box">
    <!-- 头部开始 -->
    <van-nav-bar title="全民健身地图" @click-left="goBack">
      <van-icon name="search" />
    </van-nav-bar>
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

    <!-- 地图开始 -->
    <div class="box-map">
      <div class="searchIcon">
        <router-link tag="div" to="/map/searchPlace" style="height:100%;"></router-link>
      </div>
      <div id="container" @click="screen.indexCont=false"></div>

      <div class="venue" :class="{low:dataList.low}" v-show="screen.indexCont">
        <strong :class="{order:dataList.order}">{{dataList.title}}</strong>
        <span>距您{{dataList.distance}} {{dataList.site}}</span>
        <p>开放时间：{{dataList.date}}</p>
        <div class="venue-btn">
          <router-link :to="{path:'/map/goodParticulars',query:{id:dataList.id}}">
            <span>查看详情</span>
          </router-link>
          <a
            :href="'//uri.amap.com/marker?position='+dataList.y+','+dataList.x+'&name='+dataList.title"
          >
            <span>导航</span>
          </a>
        </div>
      </div>
    </div>
    <!-- 地图结束 -->

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
    <div class="login-map" v-show="loading">
      <div class="login">
        <van-loading />
      </div>
    </div>
    <!-- loading结束 -->

    <!-- 提示框开始 -->
    <transition name="fade">
      <div v-show="screen.noData" class="noData" @click="screen.noData=!screen.noData">
        <div class="noData-box" @click.stop="searchCircum">
          <span>本区域暂无数据</span>
          <a class="noData-btn">
            <span>搜周边</span>
          </a>
        </div>
      </div>
    </transition>
    <!-- 提示框结束 -->

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

    <!-- 我的位置开始 -->
    <!-- <i class="go-index" @click="myIndex"></i> -->
    <i class="go-index-km"></i>
    <!-- 我的位置结束 -->
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import {
  pointAll,
  region,
  motionType,
  pointCont,
  hotType
} from "../../http/api";
import cookieTool from "@/util/cookie";
import { distance, gcj02 } from "../../util/Tool";
var map, //地图
  cluster,
  myMapIndex, //我的位置
  dataPOI, //信息点
  count = null;
export default {
  data() {
    return {
      loading: true,
      movement: false, //运动项目
      region: false, //区域
      region1: false, //设施
      // show: false, //下拉菜单

      //状态切换
      screen: {
        make: false, //预约
        discounts: false, //低免
        indexCont: false, //内容展示框
        noData: false //搜周边
      },

      //参数切换
      myData: {
        movement: "运动项目",
        region: "区域",
        region1: "类型"
      },
      //热门
      hotData: [{}],
      //数据
      dataList: {},
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
      },
      OtherPositioning: {
        pointY: '',
        pointX: ''
      }
    };
  },
  methods: {
    // 来自Android或IOS的定位
    getMap(data){
      let mapData = JSON.parse(data)
      if (mapData.code === '0') {
        this.OtherPositioning.pointY = mapData.data.longitude 
        this.OtherPositioning.pointX = mapData.data.latitude
        this.init()
      } else {
        return this.$toast('定位失败')
      }
    },
                  //定位获得当前位置信息
     getMyLocation() {
      //  alert(1111111);
      var geolocation = new qq.maps.Geolocation("IWFBZ-NH7WF-5C5JS-JDWYX-7H74H-3OFTR", "我的报修");
      // geolocation.getIpLocation(this.showPosition, this.showErr);
        geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
      },
      showPosition(position) {
          console.log(position);
          // this.latitude = position.lat;
          // this.longitude = position.lng;
          // this.city = position.city;
          // var that2 = this;
      // setTimeout(function () {
      //     that2.init(this.latitude,this.longitude);
      //  },100);
      this.init(position.lat,position.lng);
      },
      showErr() {
      console.log("定位失败");
      this.getMyLocation();//定位失败再请求定位，测试使用
      },
    /**
     * 地图初始化函数
     */
    init(lat,lng) {
      // 给地图容器定义高度
      // alert(2222222222222);
      let head =
          document.getElementsByClassName("box-head")[0].clientHeight || 0,
        nav = 46,
        mapHeight = document.body.clientHeight - head - nav;
      document.getElementById("container").style.height = mapHeight+"px";
      document.getElementById("shade").style.height = mapHeight + "px";
      document.getElementById("shade").style.top = head + nav + "px";
      //返回键听
      // if (window.history && window.history.pushState) {
      //   history.pushState(null, null, document.URL);
      //   window.addEventListener("popstate", this.goBack, false);
      // }
    //  alert(2222222222222);
      //初始化地图
      map = new AMap.Map("container", {
        zoom: 14, //级别
        resizeEnable: true
      });

      // 地图图块加载完成后触发
      map.on("complete", () => {

        myMapIndex = [dataPOI.pointY, dataPOI.pointX] = [
          // this.OtherPositioning.pointY,
          // this.OtherPositioning.pointX
          // 120.137649,
          // 30.268234
          lng,
          lat

        ];
        // alert(mapHeight)
        map.setZoomAndCenter(14, myMapIndex);
        //信息点查询
        this.pointOfInformation();
      //   var that2 = this;
      //  setTimeout(function () {
          // that2.pointOfInformation();
      //  },100);
      });

      //开启定位
      // AMap.plugin("AMap.Geolocation", () => {
      //   var geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
      //     timeout: 10000, //超过10秒后停止定位，默认：5s
      //     zoomToAccuracy: false //定位成功后是否自动调整地图视野到定位点
      //   });
      //   map.addControl(geolocation);
      //   geolocation.getCurrentPosition((status, result) => {
      //     if (status == "complete") {
      //       let myIndex = (myMapIndex) = [
      //         dataPOI.pointY,
      //         dataPOI.pointX
      //       ] = gcj02(result.position.lng, result.position.lat);
      //       //信息点初始化
      //       this.pointOfInformation();
      //       map.setZoomAndCenter(15, myMapIndex);
      //     } else {
      //       let myIndex = (myMapIndex) = [
      //         dataPOI.pointY,
      //         dataPOI.pointX
      //       ] = gcj02(this.OtherPositioning.pointY, this.OtherPositioning.pointX);
      //        this.pointOfInformation();
      //       map.setZoomAndCenter(15, myMapIndex);
      //     }
      //   });
      // });

      //搜索点击范围
      AMap.event.addListener(map, "dblclick", e => {
        this.$dialog
          .confirm({
            message: "是否定位在这里？"
          })
          .then(() => {
            this.myIndex(e.lnglat);
          });
      });
    },
    /**
     * 拦截器
     */
    interceptor() {
      if (this.loading) return;
      this.loading = true;
      this.screen.indexCont = false;
    },
    /**
     * 页面跳转
     */
    searchCircum() {
      let data = JSON.stringify(Object.assign(dataPOI, this.myData));
      localStorage.setItem("searchCircum", data);
      this.$router.push({
        path: "/map/goodPathList"
      });
    },
    /**
     * 获取点击运动
     */
    getMovement(i, item) {
      this.interceptor();
      this.myData.movement = item.name;
      this.movementList.list[this.movementList.index].index = i;
      dataPOI.pointSportTypeId = item.id;
      dataPOI.page = 1;

      this.pointOfInformation();
    },
    /**
     * 点击获取热门(篮球)
     */
    getHotMovement(name = "") {
      this.interceptor();
      this.myData.movement = name + "足球";
      this.movementList.list[this.movementList.index].index = -1;
      dataPOI.pointSportTypeId = 268;
      dataPOI.name = name || null;
      dataPOI.page = 1;
      this.movement = this.region = false;
      this.pointOfInformation();
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
      this.myData.region = item.name;
      this.regionList.list[this.regionList.index].index = i;
      let getCenter = item.center.split(",");
      dataPOI.pointAreaId = item.id;
      [dataPOI.pointY, dataPOI.pointX] = getCenter;
      map.setZoomAndCenter(14, getCenter);
      dataPOI.page = 1;
      this.pointOfInformation();
    },

    /**
     * 点击获取设施
     */
    getRegion1(item, i) {
      this.interceptor();
      this.myData.region1 = item.name;
      this.regionList1.list[this.regionList1.index].index = i;
      dataPOI.type = item.id;
      dataPOI.page = 1;
      this.movement = this.region = this.region1 = false;
      this.pointOfInformation();
    },

    /**
     * 可预约
     */
    getMake() {
      this.interceptor();
      let make = (this.screen.make = !this.screen.make);
      make ? (dataPOI.isBook = 0) : (dataPOI.isBook = null);
      this.pointOfInformation();
    },

    /**
     * 低免
     */
    getDiscounts() {
      this.interceptor();
      let discounts = (this.screen.discounts = !this.screen.discounts);
      discounts ? (dataPOI.isLessOfFree = 0) : (dataPOI.isLessOfFree = null);
      this.pointOfInformation();
    },

    /**
     * 跳转搜索
     */
    onClickRight() {
      this.$router.push("/map/searchPlace");
    },

    /**
     * 信息点查询
     */
    pointOfInformation(index) {
      // alert(1111111);
      map.clearMap();
      //添加当前位置
      new AMap.Marker({
        content: '<i class="my-index"></i>', // 自定义点标记覆盖物内容
        position: index || myMapIndex, // 基点位置
        // offset: new AMap.Pixel(-20, -40), // 相对于基点的偏移位置
        map: map
      });
      console.log(dataPOI);
      //加载周围信息点
      pointAll(dataPOI).then(res => {
        console.log(res.data);
        if (res.data.length) {
          let msg = res.data.map(item => {
            return {
              id: item.id,
              type: item.typeList.length ? item.typeList[0].icon : "1",
              position: [item.pointyCoordinate, item.pointxCoordinate] // 基点位置
            };
          });
          // console.log(msg);
          // 添加标注点
          this.icon(msg);
          /**
           * 点聚合样式表
           */
          // count = add.length;
          // if (cluster) {
          //   cluster.setMap(null);
          // }
          // cluster = new AMap.MarkerClusterer(map, add, {
          //   gridSize: 80,
          //   renderClusterMarker: this.renderClusterMarker
          // });
        } else {
          this.loading = false;
          this.screen.noData = true;
          // map.clearMap();
          // cluster.setMap(null);
        }
        this.loading = false;
      });
    },

    /**
     * 信息点生成
     */
    icon(page) {
      console.log(1111111);
      if (!page) return;
      let _this = this;
      let url = require("@/assets/icon/1.png"),
        content = "";
      return page.map(item => {
        url = require(`@/assets/icon/${item.type}.png`) || url;
        let icon = document.createElement("img");
        icon.src = url;
        icon.height = 34;
        icon.width = 34;
        icon.setAttribute("data-id", item.id);
        icon.onclick = e => this.iconCont(e);

        return new AMap.Marker({
          content: icon, // 自定义点标记覆盖物内容
          position: item.position, // 基点位置
          // offset: new AMap.Pixel(-17, -17), // 相对于基点的偏移位置
          map: map
        });
      });
    },

    /**
     * 地区查询(初始化)
     */
    inquireRegion() {
      region().then(res => {
        let district = res.data.map(data => data);
        console.log(res.data)
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
                // console.log(res.data);
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
     * 我的位置
     */
    myIndex(index) {
      this.interceptor();
      const i = index.lng !== undefined ? [index.lng, index.lat] : myMapIndex;
      [dataPOI.pointY, dataPOI.pointX] = i;
      map.setZoomAndCenter(14, i);
      dataPOI.page = 1;
      dataPOI.pointAreaId = null;
      this.pointOfInformation(index.lng !== undefined ? index : i);
    },

    /**
     * 信息点函数
     */
    iconCont(e) {
      let id = e.target.getAttribute("data-id"),
        [pointY, pointX] = myMapIndex,
        data = { pointY, pointX };
      pointCont(id, data).then(res => {
        let data = res.data;
        this.dataList = {
          id: data.id,
          title: data.pointName || "",
          date: data.pointOpenTime || "",
          site: data.pointAddr || "",
          distance: distance(data.distance || ""),
          y: data.pointyCoordinate,
          x: data.pointxCoordinate,
          order: data.isBook === 0,
          low: data.isLessOfFree === 0
        };
        this.screen.indexCont = true;
      });
    },
    /**
     * 信息点样式
     */
    renderClusterMarker(context) {
      var factor = Math.pow(context.count / count, 1 / 18);
      var div = document.createElement("div");
      var Hue = 180 - factor * 180;
      var bgColor = "hsla(" + Hue + ",100%,50%,0.7)";
      var fontColor = "hsla(" + Hue + ",100%,20%,1)";
      var borderColor = "hsla(" + Hue + ",100%,40%,1)";
      var shadowColor = "hsla(" + Hue + ",100%,50%,1)";
      div.style.backgroundColor = bgColor;
      var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
      div.style.width = div.style.height = size + "px";
      div.style.border = "solid 1px " + borderColor;
      div.style.borderRadius = size / 2 + "px";
      div.style.boxShadow = "0 0 1px " + shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size + "px";
      div.style.color = fontColor;
      div.style.fontSize = "14px";
      div.style.textAlign = "center";
      // context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div);
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
        // console.log(res.data);
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
      this.$router.push("/");
    },
  },
  mounted() {


    //app端隐藏底部tab
    // if (cookieTool.getCookie("tabbar", true)) {
    //   localStorage.setItem("flag", cookieTool.getCookie("tabbar", true));
    //   this.$store.state.flag = "yes";
     
    // }
    //地图初始化
    // this.init();
    // this.onLocation()
    // alert(111111);
     this.getMyLocation();
  },
  destroyed() {
    // window.removeEventListener("popstate", this.goBack, false);
  },
   created() {
    // var that2 = this;
    //   setTimeout(function () {
//  this.getMyLocation();
// },100);
//判断是否在微信内
//     const ua = window.navigator.userAgent.toLowerCase();
//     if(ua.match(/MicroMessenger/i) == 'micromessenger'){        
//   let data='{"code":"0","data":{"longitude":"120.573424","latitude":"30.055018"}}'
//   console.log(data);
//   var that2 = this;
//   setTimeout(function () {
//  that2.getMap(data)
// },100);
// }else{
//     let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;   //判断是否是 android终端
// //IOS 系统
//     let isIOS = /iP(ad|hone|od)/.test(navigator.userAgent)
//     if(isIOS){
//       let data = window.location.href="sxty://getLocation/?callback=onLocation";
//       window['onLocation'] = (data) => {
//         this.getMap(data)
//         // alert(data);
//       }
//       //安卓系统
//     } else if(isAndroid){
//       window.WebViewJavascriptBridge.callHandler(
//         'getLocation', {}
//         ,(responseData) => {
//           this.getMap(responseData)
//         }
//       );

//     }else{
//       //其他浏览器
//         let data2='{"code":"0","data":{"longitude":"120.573424","latitude":"30.055018"}}'
//   console.log(data2);

// var that = this;
//   setTimeout(function (){
//  that.getMap(data2)   
//     },100);
//     }
// }

  
    //初始化
    dataPOI = {
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
      maxDistance: 4000, //最大距离
      name: null,
      type: ""
    };


    //查询初始化
    this.inquireRegion();
    this.inquireMotion();
    this.hot();
  }
};
</script>


<style>
#box .amap-geolocation-con .amap-geo {
  display: none;
}

.map_iconMap{
  width: 60px;
  height: 60px;
  position: absolute;
  right: 5px;
  bottom: 160px;
}
.map_iconMap22{
  width: 60px;
  height: 60px;
  position: absolute;
  right: 5px;
  bottom: 100px;
}
.amap-logo {
  bottom: -1rem;
}
.amap-copyright {
  bottom: -1rem;
}
.go-index {
  position: absolute;
  top: 5rem;
  right: 0.3rem;
  height: 2rem;
  width: 2rem;
  background: #fff url("../../assets/onclick.png") center no-repeat;
  background-size: cover;
}
.go-index-km {
  position: absolute;
  left: 0.75rem;
  bottom: 1.2rem;
  height: 1rem;
  width: 3rem;
  background: url("../../assets/sangongli.png") no-repeat center;
  background-size: contain;
}
.my-index {
  display: block;
  height: 40px;
  width: 40px;
  background: url("../../assets/index.png") no-repeat center;
  background-size: cover;
}
</style>
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
//本区域暂无数据样式
.noData {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  .noData-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 50%;
    right: 50%;
    margin-right: -5.7rem;
    margin-top: -3rem;
    padding-left: 0.7rem;
    height: 2rem;
    width: 11.4rem;
    border-radius: 1rem;
    box-shadow: 0px 2px 6px 0 rgba(153, 153, 153, 0.32);
    background-color: white;
    > span {
      font-size: 0.7rem;
      line-height: 0.7rem;
      color: #333333;
    }
    > .noData-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      width: 3.85rem;
      border-radius: 1rem;
      text-align: center;
      background-color: #1492ff;
      span {
        display: flex;
        align-items: center;
        color: white;
        font-size: 0.6rem;
        line-height: 0.6rem;
        &::before {
          .icon("../../assets/xiangzuo.png", 0.75rem, 0.75rem);
          margin-right: 0.2rem;
        }
      }
    }
  }
}
//盒容器
#box {
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
  //地图详情
  .box-map {
    //搜索图标
    .searchIcon {
      position: absolute;
      top: 8rem;
      right: 0.3rem;
      height: 60px;
      width: 60px;
      background: url("../../assets/map_icon_1@2x.png");
      background-size: cover;
      z-index: 999;
    }
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
      z-index: 10000;
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
        line-height: 1.2rem;
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
        line-height: 1rem;
        color: #999;
      }
      > p {
        font-family: PingFang SC;
        margin-bottom: 0.45rem;
        font-size: 0.7rem;
        line-height: 1rem;
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

    // 热门
    .hot {
      position: relative;
      padding: 0 0.6rem;
      height: 6.3rem;
      color: #1492ff;
      background-color: #f6f8f7;
      z-index: 10001;
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
      z-index: 10001;
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
      z-index: 10000;
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
      .control("../../assets/liebiao.png");
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
