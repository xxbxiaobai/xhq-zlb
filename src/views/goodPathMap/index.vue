<template>
  <div id="box">
    <!-- 头部开始 -->
    <van-nav-bar title="全民健身地图" left-text="返回" left-arrow @click-left="goBack">
      <van-icon name="search" />
    </van-nav-bar>
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

    <!-- 地图开始 -->
    <div class="box-map">
      <div id="container" @click="screen.indexCont=false"></div>

      <div class="venue" :class="{low:dataList.low}" v-show="screen.indexCont">
        <strong :class="{order:dataList.order}">{{dataList.title}}</strong>
        <span>距您{{dataList.distance}} {{dataList.site}}</span>
        <p>开放时间：{{dataList.date}}</p>
        <div class="venue-btn">
          <router-link :to="{path:'/goodParticulars',query:{id:dataList.id}}">
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
    <div class="tab-control">
      <router-link tag="div" to="/goodPathList" class="tab-control-list" slot="right">
        <i></i>
        <span>列表</span>
      </router-link>
      <router-link tag="div" to="/searchPlace" class="tab-control-search" slot="right">
        <i></i>
        <span>搜索</span>
      </router-link>
    </div>
    <!-- 列表切换结束 -->

    <!-- 我的位置开始 -->
    <i class="go-index" @click="myIndex"></i>
    <i class="go-index-km"></i>
    <!-- 我的位置结束 -->
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import { distance, zlbFun, gcj02 } from "../../util/Tool";
var map, //地图
  cluster,
  myMapIndex, //我的位置
  dataPOI, //信息点
  count = null;
export default {
  data() {
    return {
      login: true,

      movement: false, //运动项目
      region: false, //区域
      region1: false, //区域
      show: false, //下拉菜单

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
        region1: "设施"
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
          document.getElementsByClassName("box-head")[0].clientHeight || 0,
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

      //初始化地图
      map = new AMap.Map("container", {
        zoom: 15, //级别
        center: [120.58093638362453, 30.032846374884343]
        // resizeEnable: true
      });

      // 地图图块加载完成后触发
      map.on("complete", () => {
        myMapIndex = [dataPOI.pointY, dataPOI.pointX] = [
          120.58093638362453,
          30.032846374884343
        ];
        map.setZoomAndCenter(15, myMapIndex);
        //信息点查询
        this.pointOfInformation();
      });

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
      if (this.login) return;
      this.login = true;
      this.screen.indexCont = false;
    },
    /**
     * 页面跳转
     */
    searchCircum() {
      let data = JSON.stringify(Object.assign(dataPOI, this.myData));
      localStorage.setItem("searchCircum", data);
      this.$router.push({
        path: "/goodPathList"
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
      this.$router.push("/searchPlace");
    },

    /**
     * 信息点查询
     */
    pointOfInformation(index) {
      const index1 = [
        {
          id: 31818,
          type: "9",
          position: ["120.57611530746584", "30.029728275768775"]
        },
        {
          id: 31820,
          type: "6",
          position: ["120.57563581778226", "30.031403285006107"]
        },
        {
          id: 31817,
          type: "19",
          position: ["120.57607797676215", "30.026002437146424"]
        },
        {
          id: 31815,
          type: "9",
          position: ["120.57607687444215", "30.025949927965012"]
        },
        {
          id: 31487,
          type: "5",
          position: ["120.58351026120263", "30.035419142911667"]
        },
        {
          id: 29378,
          type: "6",
          position: ["120.57753945163098", "30.03598495826311"]
        },
        {
          id: 29375,
          type: "6",
          position: ["120.57562829349638", "30.034775021734003"]
        },
        {
          id: 29377,
          type: "19",
          position: ["120.57678221145036", "30.035723570063237"]
        },
        {
          id: 31433,
          type: "12",
          position: ["120.58704070958515", "30.028128477357438"]
        },
        {
          id: 31432,
          type: "12",
          position: ["120.58631229968356", "30.02585494949117"]
        },
        {
          id: 31431,
          type: "10",
          position: ["120.5862433655062", "30.02574899633267"]
        },
        {
          id: 31488,
          type: "11",
          position: ["120.57666596536706", "30.03662079771207"]
        },
        {
          id: 31482,
          type: "12",
          position: ["120.58041048283954", "30.037676911604013"]
        },
        {
          id: 31429,
          type: "6",
          position: ["120.58786283391176", "30.02756594685662"]
        },
        {
          id: 34368,
          type: "10",
          position: ["120.57965634213538", "30.02227251646993"]
        },
        {
          id: 34367,
          type: "12",
          position: ["120.58143887487603", "30.022174821268848"]
        },
        {
          id: 31392,
          type: "12",
          position: ["120.59057972817756", "30.032521468161914"]
        },
        {
          id: 31394,
          type: "7",
          position: ["120.59058872673333", "30.032600464334607"]
        },
        {
          id: 31393,
          type: "12",
          position: ["120.5906326795645", "30.03247044143269"]
        },
        {
          id: 31396,
          type: "6",
          position: ["120.5906296873012", "30.03253744346936"]
        },
        {
          id: 31390,
          type: "6",
          position: ["120.59062769038417", "30.032555444608118"]
        },
        {
          id: 31395,
          type: "10",
          position: ["120.59061970139537", "30.032610449025164"]
        },
        {
          id: 31391,
          type: "12",
          position: ["120.59062569626875", "30.032609446042926"]
        },
        {
          id: 31476,
          type: "5",
          position: ["120.58791640582194", "30.02274987249008"]
        },
        {
          id: 31430,
          type: "12",
          position: ["120.58951904666861", "30.024723956394723"]
        },
        {
          id: 31414,
          type: "10",
          position: ["120.59079255355759", "30.03257136360546"]
        },
        {
          id: 31501,
          type: "12",
          position: ["120.59130489111554", "30.02945509344573"]
        },
        {
          id: 31500,
          type: "12",
          position: ["120.5913319419906", "30.03038808865242"]
        },
        {
          id: 31506,
          type: "6",
          position: ["120.59157363923502", "30.028975966041596"]
        },
        {
          id: 31408,
          type: "10",
          position: ["120.575899842768", "30.01931052418105"]
        },
        {
          id: 31472,
          type: "28",
          position: ["120.58864761281625", "30.02164942276001"]
        },
        {
          id: 34375,
          type: "6",
          position: ["120.59183428089347", "30.02699883286338"]
        },
        {
          id: 31477,
          type: "41",
          position: ["120.58856368328377", "30.021530471011165"]
        },
        {
          id: 31474,
          type: "12",
          position: ["120.58864061392181", "30.02157842623735"]
        },

        {
          id: 30786,
          type: "12",
          position: ["120.59268071291983", "30.015059370495734"]
        },
        {
          id: 30787,
          type: "10",
          position: ["120.59268071291983", "30.015059370495734"]
        },
        {
          id: 30788,
          type: "30",
          position: ["120.59268071291983", "30.015059370495734"]
        },
        {
          id: 30789,
          type: "12",
          position: ["120.59268071291983", "30.015059370495734"]
        },
        {
          id: 30790,
          type: "6",
          position: ["120.59268071291983", "30.015059370495734"]
        },
        {
          id: 29285,
          type: "37",
          position: ["120.57243902026471", "30.048038031438438"]
        }
      ];
      map.clearMap();
      //添加当前位置
      const i = new AMap.Marker({
        content: '<i class="my-index"></i>', // 自定义点标记覆盖物内容
        position: index || myMapIndex, // 基点位置
        offset: new AMap.Pixel(-20, -40), // 相对于基点的偏移位置
        map: map
      });
      //加载周围信息点
      if (index1) {
        let add = this.icon(index1);

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

        map.add([i, ...add]);
      }
      this.login = false;
    },

    /**
     * 信息点生成
     */
    icon(page) {
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
          offset: new AMap.Pixel(-17, -17) // 相对于基点的偏移位置
        });
      });
    },

    /**
     * 地区查询(初始化)
     */
    inquireRegion() {
      this.regionList.list = [
        // {
        //   id: 126,
        //   title: "绍兴市",
        //   classify: [
        //     { id: 126, name: "绍兴市", center: "120.580364,30.030192" },
        //     {
        //       id: 1299,
        //       name: "越城区",
        //       parentId: 126,
        //       adcode: 330602,
        //       center: "120.582633,29.988244",
        //       number: 1728
        //     },
        //     {
        //       id: 1300,
        //       name: "柯桥区",
        //       parentId: 126,
        //       adcode: 330603,
        //       center: "120.495085,30.081929",
        //       number: 1645
        //     },
        //     {
        //       id: 1301,
        //       name: "上虞区",
        //       parentId: 126,
        //       adcode: 330604,
        //       center: "120.868122,30.03312",
        //       number: 1038
        //     },
        //     {
        //       id: 1302,
        //       name: "新昌县",
        //       parentId: 126,
        //       adcode: 330624,
        //       center: "120.903866,29.499831",
        //       number: 1140
        //     },
        //     {
        //       id: 1303,
        //       name: "诸暨市",
        //       parentId: 126,
        //       adcode: 330681,
        //       center: "120.246863,29.708692",
        //       number: 3850
        //     },
        //     {
        //       id: 1304,
        //       name: "嵊州市",
        //       parentId: 126,
        //       adcode: 330683,
        //       center: "120.831025,29.56141",
        //       number: 1274
        //     }
        //   ],
        //   index: 0
        // }
      ];
      this.regionList1.list = [
        // {
        //   id: 126,
        //   title: "绍兴市",
        //   classify: [
        //     { id: 126, name: "公共体育场馆", center: "120.580364,30.030192" },
        //     {
        //       id: 1299,
        //       name: "百姓健身房",
        //       parentId: 126,
        //       adcode: 330602,
        //       center: "120.582633,29.988244",
        //       number: 1728
        //     },
        //     {
        //       id: 1300,
        //       name: "民营体育场馆",
        //       parentId: 126,
        //       adcode: 330603,
        //       center: "120.495085,30.081929",
        //       number: 1645
        //     },
        //     {
        //       id: 1301,
        //       name: "学校体育场馆",
        //       parentId: 126,
        //       adcode: 330604,
        //       center: "120.868122,30.03312",
        //       number: 1038
        //     },
        //     {
        //       id: 1302,
        //       name: "农村体育设施",
        //       parentId: 126,
        //       adcode: 330624,
        //       center: "120.903866,29.499831",
        //       number: 1140
        //     },
        //     {
        //       id: 1303,
        //       name: "其他",
        //       parentId: 126,
        //       adcode: 330681,
        //       center: "120.246863,29.708692",
        //       number: 3850
        //     }
        //   ],
        //   index: 0
        // }
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
     * 我的位置
     */
    myIndex(index) {
      this.interceptor();
      const i = !index.isTrusted ? [index.lng, index.lat] : myMapIndex;
      [dataPOI.pointY, dataPOI.pointX] = i;
      map.setZoomAndCenter(14, i);
      dataPOI.page = 1;
      dataPOI.pointAreaId = null;
      this.pointOfInformation(!index.isTrusted ? index : i);
      this.myData.region = "全部";
    },

    /**
     * 信息点函数
     */
    iconCont(e) {
      setTimeout(() => {
        this.screen.indexCont = true;
        this.dataList = {
          id: 2520,
          title: "奥体中心",
          date: "24小时开放",
          site: "绍兴市诸暨市暨阳街道暨阳路219号",
          distance: "740m",
          y: "120.14184413274815",
          x: "30.271155247601886",
          order: true,
          low: true
        };
      }, 100);
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
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div);
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
    //地图初始化
    this.init();
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  created() {
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
      maxDistance: 3000, //最大距离
      name: null
    };

    //查询初始化
    this.inquireRegion();
    this.inquireMotion();
    this.hot();
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
