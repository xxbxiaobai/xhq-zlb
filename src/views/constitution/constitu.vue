<template>
  <div id="home">
    <!-- <van-nav-bar title="体质测定站" id="title" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <div style="position:fixed;top:0;width:100%">
      <div class="map">
        <div id="container"></div>
      </div>
      <div style="border-bottom:1px solid #E7E7E7;padding:0 0.6rem;">
        <van-dropdown-menu :overlay="false">
          <!-- <van-dropdown-item v-model="value1" :options="option1" /> -->
          <!-- <van-dropdown-item
            :title="shi"
            placeholder="区域（市）"
            v-model="value1"
            :options="option1"
            @change="week"
          />
          <van-dropdown-item
            class="two"
            :title="xian"
            v-model="value2"
            :options="option2"
            placeholder="区域（县）"
          @change="weeking"-->
          <!-- @opened="weekings" -->
          <!-- /> -->
          <van-dropdown-item :title="titlearea" ref="area">
            <van-tree-select
              :items="regionItems"
              :active-id.sync="activeId"
              :main-active-index.sync="activeIndex"
              @click-item="selectRegion"
              @click-nav="selectLeft"
              class="intended"
            />
          </van-dropdown-item>
          <van-dropdown-item v-model="value3" :options="option3" @change="items" :title="XM" />
          <van-checkbox v-model="checked" @change="sElect">可预约</van-checkbox>
          <!-- <van-dropdown-item v-model="value3" :options="option3" /> -->
        </van-dropdown-menu>
      </div>
    </div>
    <div class="kong"></div>
    <ul class="lie">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadings">
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <li v-for="(value, key) in  dates" :key="key" @click="particularss(value.id)">
          <div class="img">
            <!-- <div
              v-if="value.fileList.length!==0"
              :style="{background:'url('+imgs+value.fileList[0].id?(imgs+value.fileList[0].id):img1.url+') no-repeat center',backgroundSize:'cover',height:'100%'}"
              alt
            ></div>-->
            <img
              v-if="value.fileList.length!==0"
              :src="imgs+value.fileList[0].id?(imgs+value.fileList[0].id):img1.url"
              style="width:100%;height:100%"
              alt
            />
            <img v-else src="../../assets/zwltsy.jpg" alt />
          </div>
          <div class="text">
            <h3>{{value.name}}</h3>
            <p>{{value.distance}}公里</p>
            <p>
              <img style="width:0.45rem;height: 0.65rem;" src="./img/icon_weizhi@2x.png" alt />
              {{value.address}}
            </p>
            <p>开放时间：{{value.openTime}}</p>
          </div>
        </li>
      </van-list>
      <!-- 
      <li v-for="(value, key) in  dates" :key="key" @click="particularss(value.id)">
        <div class="img">
          <div
            v-if="value.fileList.length!==0"
            :style="{background:'url('+value.fileList[0].url+') no-repeat center',backgroundSize:'cover',height:'100%'}"
            alt
          ></div>
          <img v-else src="./img/wu.png" alt />
        </div>
        <div class="text">
          <h3>{{value.name}}</h3>
          <p>{{value.distance}}公里</p>
          <p>
            <img style="width:0.45rem;height: 0.65rem;" src="./img/icon_weizhi@2x.png" alt />
            {{value.address}}
          </p>
          <p>开放时间：{{value.openTime}}</p>
        </div>
      </li>-->
    </ul>

    <!-- 弹出层开始 -->
    <div class="popup" v-show="isPopup">
      <div class="popup-cont">
        <div class="cont">
          <strong>{{popup.name||'暂无'}}</strong>
          <p>{{popup.address||'暂无'}}</p>
          <p>{{popup.description||'暂无'}}</p>
        </div>
        <router-link :to="{path:'/parti',query:{Id:popup.id}}">
          <button>查看详情</button>
        </router-link>
      </div>
      <div class="popup-shade" @click="isPopup =! isPopup"></div>
    </div>
    <!-- 弹出层结束 -->
  </div>
</template>

<script>
import Vue from "vue";
import { zlbFun, gcj02 } from "@/util/Tool";
import {
  userImg
} from "../../http/api";
import { DropdownMenu, DropdownItem, Toast, List } from "vant";
Vue.use(DropdownMenu)
  .use(DropdownItem)
  .use(Toast)
  .use(List);
// import { AMapManager } from "vue-amap";
var map; //地图

export default {
  name: "constitu",
  data() {
    return {
      page: 0, //页数
      loading: false,
      finished: false,
      imgs: userImg,
      shi: "区域（市）",
      xian: "区域（区）",
      titlearea: "区域",
      XM: "测定项目",
      pointX: "",
      pointY: "",
      activeId: 1,
      activeIndex: 0,
      checked: false,
      openStatus: "",
      zoom: 7,
      isPopup: false,
      popup: {
        id: "",
        name: "",
        address: "",
        description: ""
      },
      center: [121.5273285, 31.21515044],
      groundimages: [
        {
          url: "//faas.elemecdn.com/desktop/media/img/appqc.95e532.png",
          bounds: [
            [121.5273285, 31.21515044],
            [122.9273285, 3.31515044]
          ],
          events: {
            click() {
              alert("click groundimage");
            }
          }
        }
      ],
      value1: 1,
      value2: 1,
      value3: 0,
      option1: [
        {
          text: "全部",
          value: 1
        }
        // {
        //   text: "全部",
        //   value: ""
        // }
      ],
      option2: [
        {
          text: "全部",
          value: 1
        }
        // {
        //   text: "全部",
        //   value: ""
        // }
      ],
      option3: [
        {
          text: "全部",
          value: 0
        }
        // {
        //   text: "全部",
        //   value: ""
        // }
      ],
      dates: [],
      list: [],
      provinces: [],
      options: [],
      XY: [],
      regionItems: [
        {
          text: "全部",
          value: "",
          children: []
        }
      ],
      datas: {
        areaId: "",
        projectId: ""
      },
      areaId: "", //市区，
      projectId: "" //项目
    };
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  methods: {
    sElect() {
      window.scroll(0, 0);
      var pageSing = 1;
      this.page = parseInt(pageSing);
      // console.log(this.checked);
      if (this.checked) {
        this.openStatus = 0;
      } else {
        this.openStatus = 1;
      }
      this.listsing();
    },
    //点击区县
    selectRegion(data) {
      window.scroll(0, 0);
      var pageSing = 1;
      this.page = parseInt(pageSing);
      // console.log(data.text)
      if (data.text == "全部") {
        // console.log(data.id)
        this.regionItems.forEach(i => {
          // console.log(i)
          if (i.value == data.id) {
            this.titlearea = i.text;
          }
        });
      } else {
        this.titlearea = data.text;
      }

      this.areaId = data.id;
      this.$refs.area.toggle();
      // this.pageIndex = 0
      // this.eventlists = []
      // this.onLoadList()
      this.listsing();
    },
    //点击市
    selectLeft(data) {
      window.scroll(0, 0);
      var pageSing = 1;
      this.page = parseInt(pageSing);
      // console.log(data)
      if (data === 0) {
        this.titlearea = "全部";
        this.$refs.area.toggle();
        this.areaId = "";
        // this.pageIndex = 0
        // this.eventlists = []
        // this.onLoadList()
        this.listsing();
      }
    },

    /**
     * 初始化地区
     */
    getArea() {
      this.regionItems = [
        // {
        //   text: "绍兴市",
        //   value: 126,
        //   children: [
        //     { text: "全部", id: 126 },
        //     { text: "越城区", id: 1299 },
        //     { text: "柯桥区", id: 1300 },
        //     { text: "上虞区", id: 1301 },
        //     { text: "新昌县", id: 1302 },
        //     { text: "诸暨市", id: 1303 },
        //     { text: "嵊州市", id: 1304 }
        //   ]
        // }
      ];
    },
    //=============================
    loadings() {
      this.page = this.page + 1;
      // console.log(1)
      // alert(this.page)
      if (this.page == 1) {
        this.init();
      } else {
        this.listsing();
      }

      // console.log(this.page)
    },
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/scientific-list");
    },
    // 跳转详情
    particularss(i) {
      var dada = this.dates[i];
      // console.log(i);
      this.$store.state.nameId = { siteId: i };
      this.$router.push({
        path: "/parti",
        query: {
          Id: i
        }
      });
    },
    // 市地址筛选
    week() {
      var pageSing = 1;
      this.page = parseInt(pageSing);
      this.xian = "区域（区）";
      // console.log(e)
      this.option1.forEach(i => {
        if (i.value == this.value1) {
          this.shi = i.text;
        }
      });

      this.value2 = 1;
      // if (this.value1== 1) {
      this.option2 = [
        // {
        //   text: "区域",
        //   value: 1
        // },
        {
          text: "全部",
          value: ""
        }
      ];
      // }
      this.areaId = this.value1;
      this.list.forEach(item => {
        if (item.id == this.value1) {
          // console.log(item.data);
          item.data.forEach(i => {
            this.option2.push({
              text: i.name,
              value: i.id
            });
          });
        }
      });
      // 筛选
      var areaId = this.areaId;
      if (this.value1 == 1 || this.value1 == "") {
        // console.log(12312);
        this.areaId = this.value1;
        this.areaId = "";
        this.projectId = this.value3;
        // measurementFitnessapi({ areaId, projectId }).then(res => {
        //   // console.log(res);
        //   this.dates = res.data;
        this.listsing();
        // this.init();
        // });
      } else {
        console.log();
        this.projectId = this.value3;
        // console.log(projectId, areaId);
        // measurementFitnessapi({ areaId, projectId }).then(res => {
        //   console.log(res);
        //   this.dates = res.data;
        // this.init();
        this.listsing();
        // });
      }
    },
    // 县筛选
    weeking() {
      var pageSing = 1;
      this.page = parseInt(pageSing);
      // console.log(this.value2);
      this.option2.forEach(i => {
        if (i.value == this.value2) {
          this.xian = i.text;
        }
      });
      if (this.value2 == "" || this.value2 == 1) {
        // console.log(12312);
        // this.areaId = this.value1;
        // var areaId = this.areaId;
        this.projectId = "";
        // console.log(areaId, projectId);
        // measurementFitnessapi({ areaId, projectId }).then(res => {
        //   // console.log(res);
        //   this.dates = res.data;
        this.listsing();
        // this.init();
        // });
      } else {
        // console.log(this.value1)
        // console.log(this.value2);
        // this.areaId = this.value2;
        this.areaId = this.value2;
        this.projectId = this.value3;
        // console.log(areaId, projectId);
        // measurementFitnessapi({ areaId, projectId }).then(res => {
        //   console.log(res);
        //   this.dates = res.data;
        // this.init();
        this.listsing();
        // });
      }
    },
    weekings() {
      if (this.value1 == 0) {
        Toast("请选择市区");
      }
    },
    // 项目筛选
    items() {
      window.scroll(0, 0);
      var pageSing = 1;
      this.page = parseInt(pageSing);
      this.option3.forEach(i => {
        if (i.value == this.value3) {
          this.XM = i.text;
        }
      });
      console.log();
      if (this.value3 == 0) {
        // var areaId = this.areaId;
        this.projectId = "";

        // measurementFitnessapi({ areaId }).then(res => {
        //   console.log(res);
        //   this.dates = res.data;
        // this.init();
        this.listsing();
        // });
      } else {
        console.log(this.value3);
        this.datas.projectId = this.value3;
        // var projectId = this.value3;
        // var areaId = this.areaId;
        // console.log(projectId, areaId);
        // measurementFitnessapi({ projectId, areaId }).then(res => {
        //   console.log(res);
        //   this.dates = res.data;
        // this.init();
        this.listsing();
        // });
      }
    },

    // 地图
    init() {
      //初始化地图
      map = new AMap.Map("container", {
        // zoom: 1, //级别
        center: [120.14835, 30.26975]
        // resizeEnable: true
      });

      map.on("complete", () => {
        let myMapIndex = [120.14835, 30.26975];
        this.pointY = myMapIndex[1];
        this.pointX = myMapIndex[0];
        this.listsing();
        map.setZoomAndCenter(15, myMapIndex);
        //添加当前位置
        let marker = new AMap.Marker({
          content: '<i class="my-index"></i>', // 自定义点标记覆盖物内容
          position: myMapIndex, // 基点位置
          offset: new AMap.Pixel(-20, -40) // 相对于基点的偏移位置
        });
        map.add(marker);
        //信息点查询
        this.pointOfInformation();
      });

      //开启定位
      // AMap.plugin("AMap.Geolocation", () => {
      //   var geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
      //     timeout: 10000, //超过10秒后停止定位，默认：5s
      //     buttonPosition: "RB", //定位按钮的停靠位置
      //     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      //   });
      //   map.addControl(geolocation);
      //   //  console.log(map.addControl(geolocation))
      //   geolocation.getCurrentPosition((status, result) => {
      //     // console.log(result);
      //     (this.pointX = result.position.Q), (this.pointY = result.position.P);
      // this.listsing();

      // this.dates.forEach(y => {
      //   var p1 = [y.longitude, y.latitude];
      //   var p2 = [result.position.Q, result.position.P];
      //   if (p1[0] == null) {
      //     y.distance = "暂无";
      //     // console.log(1);
      //   } else {
      //     y.distance = AMap.GeometryUtil.distance(p1, p2);
      //     y.distance = Math.round(parseFloat(y.distance / 1000)) / 10;
      //     // console.log(2);
      //   }
      // });
      //

      // 返回 p1 到 p2 间的地面距离，单位：米

      //   if (status == "complete") {
      //     //信息点初始化
      //     this.pointOfInformation();
      //   } else {
      //     this.$toast("GPS定位失败");
      //     // console.log(result);
      //   }
      // });
      // });
    },
    pointOfInformation() {
      let add = this.icon([
        {
          id: 283,
          type: "海宁市国民体质监测中心",
          position: [120.683213, 30.521102]
        },
        {
          id: 282,
          type: "泰顺县国民体质监测站",
          position: [119.728993, 27.574393]
        },
        {
          id: 1,
          type: "杭州市国民体质监测中心",
          position: [120.137255, 30.267275]
        },
        {
          id: 2,
          type: "上城区国民体质监测站",
          position: [120.169917, 30.243103]
        },
        {
          id: 43,
          type: "千岛湖镇社区卫生服务站点",
          position: [119.053208, 29.597069]
        },
        {
          id: 44,
          type: "千岛湖镇体育馆站点",
          position: [119.054294, 29.584266]
        },
        {
          id: 46,
          type: "南湖区国民体质监测与健身指导中心",
          position: [120.772289, 30.756106]
        },
        {
          id: 47,
          type: "嘉善县国民体质监测与健康指导中心",
          position: [120.935144, 30.831725]
        },
        {
          id: 56,
          type: "梧桐街道振东社区国民体质测试点",
          position: [120.567267, 30.631354]
        },
        {
          id: 59,
          type: "秀洲区国民体质监测新塍站",
          position: [120.695742, 30.783186]
        },
        {
          id: 64,
          type: "海盐县国民体质监测站",
          position: [120.951083, 30.527042]
        },
        {
          id: 68,
          type: "平湖市国民体质监测站",
          position: [121.031278, 30.693132]
        },
        {
          id: 78,
          type: "武义县国民体质监测站",
          position: [119.807896, 28.886907]
        },
        {
          id: 79,
          type: "义乌市国民体质监测中心",
          position: [120.055097, 29.280186]
        },
        {
          id: 81,
          type: "磐安县国民体质监测站",
          position: [120.443689, 29.038419]
        },
        {
          id: 83,
          type: "兰溪市国民体质监测站",
          position: [119.461259, 29.205514]
        },
        {
          id: 85,
          type: "丽水市国民体质监测中心",
          position: [119.928281, 28.465999]
        },
        {
          id: 86,
          type: "丽水市疾病预防控制中心(健康管理体验室)",
          position: [119.934629, 28.460602]
        },
        {
          id: 87,
          type: "丽水市人民医院(健康驿站)",
          position: [119.915791, 28.449463]
        },
        {
          id: 88,
          type: "莲都区艾莱依集团  挚爱体检中心",
          position: [119.947006, 28.476436]
        },
        {
          id: 89,
          type: "遂昌县体育中心监测站",
          position: [119.274321, 28.5833]
        },
        {
          id: 90,
          type: "庆元县国民体质监测中心",
          position: [119.07656, 27.62027]
        },
        {
          id: 91,
          type: "云和县国民体质监测站",
          position: [119.573394, 28.106542]
        },
        {
          id: 92,
          type: "松阳县国民体质监测站点",
          position: [119.483927, 28.448014]
        },
        {
          id: 93,
          type: "龙泉市剑池街道社区卫生服务中心（国民体质监测中心）",
          position: [119.129506, 28.066506]
        },
        {
          id: 94,
          type: "景宁县疾病预防控制中心",
          position: [119.645915, 27.967361]
        },
        {
          id: 95,
          type: "青田县中医院海口镇分院监测点",
          position: [120.08981, 28.323804]
        },
        {
          id: 96,
          type: "青田县人民医院高湖分院监测点",
          position: [120.219864, 28.334378]
        },
        {
          id: 98,
          type: "宁波市镇海区国民体质监测与健身指导中心",
          position: [121.696726, 29.957114]
        },
        {
          id: 105,
          type: "海曙区国民体质监测站",
          position: [121.512284, 29.874789]
        },
        {
          id: 120,
          type: "白云街道国民体质监测站",
          position: [121.523778, 29.869492]
        },
        {
          id: 156,
          type: "东胜街道国民体质监测站",
          position: [121.579612, 29.869783]
        },
        {
          id: 161,
          type: "宁波市鄞州区国民体质监测中心",
          position: [121.555476, 29.821779]
        },
        {
          id: 188,
          type: "慈溪市国民体质测定与科学健身指导中心",
          position: [121.271209, 30.175636]
        },
        {
          id: 194,
          type: "浙江省省级国民体质监测与健身中心",
          position: [118.40774, 29.128139]
        },
        {
          id: 195,
          type: "衢州市国民体质监测与健身指导中心",
          position: [118.880198, 28.933704]
        },
        {
          id: 196,
          type: "常山县人民医院体检中心国民体质监测站",
          position: [118.498245, 28.911398]
        },
        {
          id: 197,
          type: "常山县国民体质监测与健身指导中心",
          position: [118.715314, 28.945928]
        },
        { id: 198, type: "国民体质测定室", position: [119.176948, 29.035566] },
        {
          id: 199,
          type: "樟潭街道国民体质监测点",
          position: [118.951893, 28.974535]
        },
        {
          id: 200,
          type: "高家镇国民体质监测点",
          position: [119.03214, 28.999578]
        },
        {
          id: 201,
          type: "浮石国民体质监测点",
          position: [118.916374, 29.00241]
        },
        {
          id: 202,
          type: "江山市清湖街道国民体质监测站点",
          position: [118.603903, 28.666346]
        }
      ]);
      map.add(add);
    },
    /**
     * 信息点生成
     */

    icon(page) {
      // console.log(page);
      if (!page) return;
      let url = require("./img/icon.png");
      return page.map(item => {
        // url = require(`@/assets/icon/${item.type}.png`) || url;

        let icon = document.createElement("img");
        icon.src = url;
        icon.height = 28;
        icon.width = 28;
        icon.setAttribute("data-id", item.id);
        icon.onclick = e => this.iconCont(e);

        // content = `<img class='icon' src='${url}' data-id="${item.id}" height="28!important" width="28"/>`;
        return new AMap.Marker({
          content: icon, // 自定义点标记覆盖物内容
          position: item.position, // 基点位置
          offset: new AMap.Pixel(-14, -14) // 相对于基点的偏移位置
        });
      });
    },

    /**
     * 信息点函数
     */
    iconCont(e) {
      this.popup = {
        bookDateType: 0,
        address: "开发路435号",
        servicePhone: "0571-24817716",
        latitude: 29.584266,
        display: 0,
        description:
          "身高、体重、肺活量、台阶指数、握力、纵跳、俯卧撑/仰卧起坐、坐位体前屈、闭眼单脚站立、选择反应时",
        partTimeNum: 5,
        areaName: "淳安县",
        openSituation: "固定时间开放",
        name: "千岛湖镇体育馆站点",
        id: 44,
        openTime: "工作日8:30-12:00,14:00-17:00",
        imageList: [
          {
            id: "70cdee35985b493d99504a46350c0c3d",
            msgId: "44",
            fieldName: "MAP_MONITOR_SITE_LABEL",
            name: "微信图片_20191218103344.jpg",
            isImg: true,
            contentType: "image/jpeg",
            size: 2002898,
            path: null,
            url:
              "https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-12-18/1e7fb0aa3344470c9f7dc6b15f967175-file.jpg",
            ossurl:
              "zjsport_filehost/2019-12-18/1e7fb0aa3344470c9f7dc6b15f967175-file.jpg",
            source: "ALIYUN",
            status: 1,
            mark: 1,
            insetsUrl:
              "https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-12-18/1e7fb0aa3344470c9f7dc6b15f967175-file.jpg",
            insetsOss:
              "mini_zjsport_filehost/2019-12-18/1e7fb0aa3344470c9f7dc6b15f967175-file.jpg",
            createTime: "2019-12-18T02:34:14.000+0000",
            pathDir: null
          },
          {
            id: "388eb072446d42b39b9dd947c7da5839",
            msgId: "44",
            fieldName: "MAP_MONITOR_SITE_LABEL",
            name: "微信图片_20191218103349.jpg",
            isImg: true,
            contentType: "image/jpeg",
            size: 306456,
            path: null,
            url:
              "https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-12-18/866fd1682d494bffb3307ac673812c28-file.jpg",
            ossurl:
              "zjsport_filehost/2019-12-18/866fd1682d494bffb3307ac673812c28-file.jpg",
            source: "ALIYUN",
            status: 1,
            mark: 1,
            insetsUrl:
              "https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-12-18/866fd1682d494bffb3307ac673812c28-file.jpg",
            insetsOss:
              "mini_zjsport_filehost/2019-12-18/866fd1682d494bffb3307ac673812c28-file.jpg",
            createTime: "2019-12-18T02:34:07.000+0000",
            pathDir: null
          },
          {
            id: "16334b7b634d4af1a60d031ffe9161d4",
            msgId: "44",
            fieldName: "MAP_MONITOR_SITE_LABEL",
            name: "微信图片_20191218103354.jpg",
            isImg: true,
            contentType: "image/jpeg",
            size: 347523,
            path: null,
            url:
              "https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-12-18/a6c70807edc04a2e8434b842743664c9-file.jpg",
            ossurl:
              "zjsport_filehost/2019-12-18/a6c70807edc04a2e8434b842743664c9-file.jpg",
            source: "ALIYUN",
            status: 1,
            mark: 1,
            insetsUrl:
              "https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-12-18/a6c70807edc04a2e8434b842743664c9-file.jpg",
            insetsOss:
              "mini_zjsport_filehost/2019-12-18/a6c70807edc04a2e8434b842743664c9-file.jpg",
            createTime: "2019-12-18T02:34:01.000+0000",
            pathDir: null
          }
        ],
        principalPhone: "18268212159",
        longitude: 119.054294,
        fullTimeNum: 0
      };
      this.isPopup = true;
    },

    /**
     * 查询信息点
     */
    listsing() {
      this.loading= true
      this.finished= true
      this.dates=[{"bookDateType":0,"address":"杭州市黄龙路6号","openStatus":0,"servicePhone":"18958067991","distance":1.1,"latitude":30.267275,"display":0,"description":"国民体质测试11项、骨密度、体成分","partTimeNum":0,"openSituation":"固定时间开放","name":"杭州市国民体质监测中心","id":1,"openTime":"每周二、四上午","principalPhone":"18958067991","fileList":[{"id":"a91a39ab288347318e2c45a4af88c3b6","msgId":"1","fieldName":"MAP_MONITOR_SITE_LABEL","name":"下载 (2).jpg","isImg":true,"contentType":"image/jpeg","size":22218,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","ossurl":"zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","createTime":"2019-11-03T22:12:47.000+0000","pathDir":null}],"longitude":120.137255,"fullTimeNum":7},{"bookDateType":0,"address":"上城区惠民路20号","openStatus":1,"servicePhone":"87833126","distance":3.6,"latitude":30.243103,"display":0,"description":"国民体质测试11项","partTimeNum":0,"openSituation":"固定时间开放","name":"上城区国民体质监测站","id":2,"openTime":"9:00-17:00","principalPhone":"13958162423","fileList":[{"id":"d88c79545e2d412ea0a71c6bc099dafb","msgId":"2","fieldName":"MAP_MONITOR_SITE_LABEL","name":"timg.jpg","isImg":true,"contentType":"image/jpeg","size":38372,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-12-09/5ea4201b9e6443ebbff43905a165b391-file.jpg","ossurl":"zjsport_filehost/2019-12-09/5ea4201b9e6443ebbff43905a165b391-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-12-09/5ea4201b9e6443ebbff43905a165b391-file.jpg","insetsOss":"mini_zjsport_filehost/2019-12-09/5ea4201b9e6443ebbff43905a165b391-file.jpg","createTime":"2019-12-09T01:27:57.000+0000","pathDir":null}],"longitude":120.169917,"fullTimeNum":10},{"bookDateType":0,"address":"舞阳街道振兴路87号","openStatus":2,"servicePhone":"0572-8825523","distance":27.3,"latitude":30.18337,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":3,"openSituation":"视情时间开放","name":"德清县舞阳街道国民体质监测站","id":259,"openTime":"8:00-17:00","principalPhone":"13706536630","fileList":[{"id":"9e4e9a8e7d7d4406b2058d951c6c49ff","msgId":"259","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县舞阳街道国民体质监测点门头.jpg","isImg":true,"contentType":"image/jpeg","size":4753671,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/0146c830884c47b1a6fcd09f2637db29-file.jpg","ossurl":"zjsport_filehost/2019-11-11/0146c830884c47b1a6fcd09f2637db29-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/0146c830884c47b1a6fcd09f2637db29-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/0146c830884c47b1a6fcd09f2637db29-file.jpg","createTime":"2019-11-10T22:25:10.000+0000","pathDir":null},{"id":"aad0126bd2e9446a80dce4f4677c77f7","msgId":"259","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县舞阳街道国民体质监测点器材.jpg","isImg":true,"contentType":"image/jpeg","size":5297443,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/38c06e463a794d09bd76c3ef5ad4d543-file.jpg","ossurl":"zjsport_filehost/2019-11-11/38c06e463a794d09bd76c3ef5ad4d543-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/38c06e463a794d09bd76c3ef5ad4d543-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/38c06e463a794d09bd76c3ef5ad4d543-file.jpg","createTime":"2019-11-10T22:25:10.000+0000","pathDir":null},{"id":"d46aa37473874e24b9da6911b7fd4178","msgId":"259","fieldName":"MAP_MONITOR_SITE_LABEL","name":"200497014076550308.jpg","isImg":true,"contentType":"image/jpeg","size":5327041,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/bdfe4584ed864e50ba7bf4e2e70ff148-file.jpg","ossurl":"zjsport_filehost/2019-11-11/bdfe4584ed864e50ba7bf4e2e70ff148-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/bdfe4584ed864e50ba7bf4e2e70ff148-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/bdfe4584ed864e50ba7bf4e2e70ff148-file.jpg","createTime":"2019-11-10T22:25:10.000+0000","pathDir":null}],"longitude":120.414371,"fullTimeNum":0},{"bookDateType":0,"address":"雷甸镇新大街268号（雷甸镇卫生院）","openStatus":2,"servicePhone":"0572-8485097","distance":27.6,"latitude":30.517859,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":2,"openSituation":"视情时间开放","name":"德清县雷甸镇国民体质监测站　","id":254,"openTime":"8:00-17:00","principalPhone":"13655829679","fileList":[{"id":"0a5ab1d523d3463c9434793fefa62666","msgId":"254","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县雷甸镇国民体质监测点器材.jpg","isImg":true,"contentType":"image/jpeg","size":214037,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/542a28e2b1914dc9a81b51a3a18cea1e-file.jpg","ossurl":"zjsport_filehost/2019-11-11/542a28e2b1914dc9a81b51a3a18cea1e-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/542a28e2b1914dc9a81b51a3a18cea1e-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/542a28e2b1914dc9a81b51a3a18cea1e-file.jpg","createTime":"2019-11-10T22:10:12.000+0000","pathDir":null},{"id":"762cf06b188c444da02b4c4400eb6774","msgId":"254","fieldName":"MAP_MONITOR_SITE_LABEL","name":"雷甸镇器材1.jpg","isImg":true,"contentType":"image/jpeg","size":1781236,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/f0db1d8679e64687861e11c1cc33ab6b-file.jpg","ossurl":"zjsport_filehost/2019-11-11/f0db1d8679e64687861e11c1cc33ab6b-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/f0db1d8679e64687861e11c1cc33ab6b-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/f0db1d8679e64687861e11c1cc33ab6b-file.jpg","createTime":"2019-11-10T22:10:12.000+0000","pathDir":null},{"id":"dc80182f5aa0414a8b22fb96211785c1","msgId":"254","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县雷甸镇国民体质监测点门头.jpg","isImg":true,"contentType":"image/jpeg","size":86819,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/39ac0f0c3827490cbe139b396ea6de1e-file.jpg","ossurl":"zjsport_filehost/2019-11-11/39ac0f0c3827490cbe139b396ea6de1e-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/39ac0f0c3827490cbe139b396ea6de1e-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/39ac0f0c3827490cbe139b396ea6de1e-file.jpg","createTime":"2019-11-10T22:10:12.000+0000","pathDir":null}],"longitude":120.140399,"fullTimeNum":0},{"bookDateType":0,"address":"天能路19号和平镇卫生院","openStatus":0,"servicePhone":"15657285112","distance":27.6,"latitude":30.160074,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":2,"openSituation":"固定时间开放","name":"长兴县和平镇国民体质监测站","id":265,"openTime":"8:00-17:00","principalPhone":"15657285112","fileList":[{"id":"140a227b967842ffa4cad3c659a4e567","msgId":"265","fieldName":"MAP_MONITOR_SITE_LABEL","name":"和平镇国民体质监测站.jpg","isImg":true,"contentType":"image/jpeg","size":5418384,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-12/eddea0d448094d3590a4a2f0e399a414-file.jpg","ossurl":"zjsport_filehost/2019-11-12/eddea0d448094d3590a4a2f0e399a414-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-12/eddea0d448094d3590a4a2f0e399a414-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-12/eddea0d448094d3590a4a2f0e399a414-file.jpg","createTime":"2019-11-11T22:39:55.000+0000","pathDir":null},{"id":"dbed9aec622349b58472fffb77a1a299","msgId":"265","fieldName":"MAP_MONITOR_SITE_LABEL","name":"微信图片_20191105150420.jpg","isImg":true,"contentType":"image/jpeg","size":36505,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-12/c3c31e25a9f441d2acf0876b924e9c70-file.jpg","ossurl":"zjsport_filehost/2019-11-12/c3c31e25a9f441d2acf0876b924e9c70-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-12/c3c31e25a9f441d2acf0876b924e9c70-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-12/c3c31e25a9f441d2acf0876b924e9c70-file.jpg","createTime":"2019-11-11T22:39:53.000+0000","pathDir":null}],"longitude":120.406015,"fullTimeNum":0},{"bookDateType":0,"address":"禹越镇禹越街51号（镇卫生院）","openStatus":2,"servicePhone":"0572-8352965","distance":30,"latitude":30.518936,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":2,"openSituation":"视情时间开放","name":"德清县禹越镇国民体质监测站","id":255,"openTime":"8:00-17:00","principalPhone":"13967262251","fileList":[{"id":"4c7df2086c9949da8b59995ae343d6f8","msgId":"255","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县禹越镇国民体质监测点门头.jpg","isImg":true,"contentType":"image/jpeg","size":1878763,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/7d87e7d6efa04454823265c9ea40327c-file.jpg","ossurl":"zjsport_filehost/2019-11-11/7d87e7d6efa04454823265c9ea40327c-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/7d87e7d6efa04454823265c9ea40327c-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/7d87e7d6efa04454823265c9ea40327c-file.jpg","createTime":"2019-11-10T22:11:11.000+0000","pathDir":null},{"id":"ae8af49096b442a2ba4aab1c3808c681","msgId":"255","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县禹越镇国民体质监测点器材.jpg","isImg":true,"contentType":"image/jpeg","size":1371162,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/be6c52b26f0745eba48f18bf5c0f6650-file.jpg","ossurl":"zjsport_filehost/2019-11-11/be6c52b26f0745eba48f18bf5c0f6650-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/be6c52b26f0745eba48f18bf5c0f6650-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/be6c52b26f0745eba48f18bf5c0f6650-file.jpg","createTime":"2019-11-10T22:11:11.000+0000","pathDir":null}],"longitude":120.266162,"fullTimeNum":0},{"bookDateType":0,"address":"新安镇裕华路57号（新安镇卫生院）","openStatus":2,"servicePhone":"0572-8461252","distance":30.2,"latitude":30.533031,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":2,"openSituation":"视情时间开放","name":"德清县新安镇国民体质监测站","id":256,"openTime":"8:00-17:00","principalPhone":"18768224627","fileList":[{"id":"cfcd3f364e5842278bdbdf13b0ed84eb","msgId":"256","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县新安镇国民体质监测点器材.jpg","isImg":true,"contentType":"image/jpeg","size":3843062,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/1a5928d43bc34fe1b318877602788c20-file.jpg","ossurl":"zjsport_filehost/2019-11-11/1a5928d43bc34fe1b318877602788c20-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/1a5928d43bc34fe1b318877602788c20-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/1a5928d43bc34fe1b318877602788c20-file.jpg","createTime":"2019-11-10T22:16:40.000+0000","pathDir":null},{"id":"a9b9ddd6fea845a7bb14cd4fb0d8a7f3","msgId":"256","fieldName":"MAP_MONITOR_SITE_LABEL","name":"257435309511546708.jpg","isImg":true,"contentType":"image/jpeg","size":100810,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/d0f76f68c05f4951bad60220cc22eac8-file.jpg","ossurl":"zjsport_filehost/2019-11-11/d0f76f68c05f4951bad60220cc22eac8-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/d0f76f68c05f4951bad60220cc22eac8-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/d0f76f68c05f4951bad60220cc22eac8-file.jpg","createTime":"2019-11-10T22:16:39.000+0000","pathDir":null},{"id":"ce100db70a904c689196b90f32645deb","msgId":"256","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县新安镇国民体质监测点门头.jpg","isImg":true,"contentType":"image/jpeg","size":78963,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/8346d48400d1473e906f4c9e6c641cbe-file.jpg","ossurl":"zjsport_filehost/2019-11-11/8346d48400d1473e906f4c9e6c641cbe-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/8346d48400d1473e906f4c9e6c641cbe-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/8346d48400d1473e906f4c9e6c641cbe-file.jpg","createTime":"2019-11-10T22:16:39.000+0000","pathDir":null}],"longitude":120.225679,"fullTimeNum":0},{"bookDateType":0,"address":"新市镇士林村康仙路","openStatus":2,"servicePhone":"0572-8206870","distance":31.4,"latitude":30.54626,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":2,"openSituation":"视情时间开放","name":"德清县新市镇国民体质监测站","id":251,"openTime":"8:00-17:00","principalPhone":"13706539889","fileList":[{"id":"7e87246e82fe4036a7c0f3dee157cfe9","msgId":"251","fieldName":"MAP_MONITOR_SITE_LABEL","name":"362994400742968111.jpg","isImg":true,"contentType":"image/jpeg","size":1498361,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-07/7b9d21d2c13c4c4d90dea89547949058-file.jpg","ossurl":"zjsport_filehost/2019-11-07/7b9d21d2c13c4c4d90dea89547949058-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-07/7b9d21d2c13c4c4d90dea89547949058-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-07/7b9d21d2c13c4c4d90dea89547949058-file.jpg","createTime":"2019-11-06T21:42:00.000+0000","pathDir":null},{"id":"c3f58a9b1e2b41d9a0e26194f0b5b766","msgId":"251","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县新市镇国民体质监测点器材.jpg","isImg":true,"contentType":"image/jpeg","size":1595558,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-07/a1b729e737c449bba7295a810cacfc85-file.jpg","ossurl":"zjsport_filehost/2019-11-07/a1b729e737c449bba7295a810cacfc85-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-07/a1b729e737c449bba7295a810cacfc85-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-07/a1b729e737c449bba7295a810cacfc85-file.jpg","createTime":"2019-11-06T21:42:00.000+0000","pathDir":null},{"id":"cc96bdb4870c4423808cf5e4eaf7bc48","msgId":"251","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县新市镇国民体质监测点门头.jpg","isImg":true,"contentType":"image/jpeg","size":1819898,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-07/468154105be84534aa89f4be041fe6d0-file.jpg","ossurl":"zjsport_filehost/2019-11-07/468154105be84534aa89f4be041fe6d0-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-07/468154105be84534aa89f4be041fe6d0-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-07/468154105be84534aa89f4be041fe6d0-file.jpg","createTime":"2019-11-06T21:42:00.000+0000","pathDir":null}],"longitude":120.08615,"fullTimeNum":0},{"bookDateType":0,"address":"武康街道五里牌路（县体育中心内）","openStatus":2,"servicePhone":"0572-8064512","distance":33.6,"latitude":30.541641,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":5,"openSituation":"视情时间开放","name":"德清县国民体质监测中心","id":249,"openTime":"9:00-16:00　","principalPhone":"13867250521","fileList":[{"id":"c104cca809a34e40b1f11952ea42ea35","msgId":"249","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县体育中心器材.JPG","isImg":true,"contentType":"image/jpeg","size":7294498,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/b76891c079ff4e968cc9d9963f53e740-file.JPG","ossurl":"zjsport_filehost/2019-11-11/b76891c079ff4e968cc9d9963f53e740-file.JPG","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/b76891c079ff4e968cc9d9963f53e740-file.JPG","insetsOss":"mini_zjsport_filehost/2019-11-11/b76891c079ff4e968cc9d9963f53e740-file.JPG","createTime":"2019-11-10T19:28:11.000+0000","pathDir":null},{"id":"204870c3e27f49cbb1f230834d3af457","msgId":"249","fieldName":"MAP_MONITOR_SITE_LABEL","name":"德清县体育中心监测站门头.jpg","isImg":true,"contentType":"image/jpeg","size":2883143,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/2cb28772c7384ec5941bc420d957a3f5-file.jpg","ossurl":"zjsport_filehost/2019-11-11/2cb28772c7384ec5941bc420d957a3f5-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/2cb28772c7384ec5941bc420d957a3f5-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/2cb28772c7384ec5941bc420d957a3f5-file.jpg","createTime":"2019-11-10T19:28:10.000+0000","pathDir":null}],"longitude":119.996591,"fullTimeNum":1},{"bookDateType":0,"address":"下渚湖街道二都小镇琳琅水街","openStatus":2,"servicePhone":"0572-8481124","distance":34.8,"latitude":30.53806,"display":0,"description":"握力、肺活量、台阶测试等11件","partTimeNum":2,"openSituation":"视情时间开放","name":"德清县下渚湖街道国民体质监测站","id":261,"openTime":"8:00-17:00","principalPhone":"13656724027","fileList":[{"id":"421f934dffbc4e33974bd724d27e5572","msgId":"261","fieldName":"MAP_MONITOR_SITE_LABEL","name":"725886378913277500.jpg","isImg":true,"contentType":"image/jpeg","size":6036093,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/c742f39006fb40d0bb1ce18be6ae8546-file.jpg","ossurl":"zjsport_filehost/2019-11-11/c742f39006fb40d0bb1ce18be6ae8546-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/c742f39006fb40d0bb1ce18be6ae8546-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-11/c742f39006fb40d0bb1ce18be6ae8546-file.jpg","createTime":"2019-11-10T22:29:12.000+0000","pathDir":null},{"id":"4c3d0707a5844c5f8e4f68c497e44b5c","msgId":"261","fieldName":"MAP_MONITOR_SITE_LABEL","name":"器材2.JPG","isImg":true,"contentType":"image/jpeg","size":61015,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/836003facbb94745aba29e0a85bedb43-file.JPG","ossurl":"zjsport_filehost/2019-11-11/836003facbb94745aba29e0a85bedb43-file.JPG","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/836003facbb94745aba29e0a85bedb43-file.JPG","insetsOss":"mini_zjsport_filehost/2019-11-11/836003facbb94745aba29e0a85bedb43-file.JPG","createTime":"2019-11-10T22:29:10.000+0000","pathDir":null},{"id":"dbb229af4aaf48d88fde873e47d5b0df","msgId":"261","fieldName":"MAP_MONITOR_SITE_LABEL","name":"器材1.JPG","isImg":true,"contentType":"image/jpeg","size":72227,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-11/8a65dc76c26a43ae81343a45c55ad8f8-file.JPG","ossurl":"zjsport_filehost/2019-11-11/8a65dc76c26a43ae81343a45c55ad8f8-file.JPG","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-11/8a65dc76c26a43ae81343a45c55ad8f8-file.JPG","insetsOss":"mini_zjsport_filehost/2019-11-11/8a65dc76c26a43ae81343a45c55ad8f8-file.JPG","createTime":"2019-11-10T22:29:10.000+0000","pathDir":null}],"longitude":119.961828,"fullTimeNum":0}]
    }
  },
  created() {
    this.getArea();
    // zlbFun("体质测定站");
    // ,()=>{
    //   console.log(11)
    //          dd.device.location.get({
    //       onSuccess: (data)=> {
    //         console.log('成功')
    //         // alert(data.longitude)
    //         console.log(data.longitude);
    //       },
    //       onFail: (error) =>{
    //         console.log('失败')
    //       }
    //     });
    // });

    // this.listsing()
    //  this.init();
    // console.log(this.XY)
    //   var p1 = [116.434027, 39.941037];
    // var p2 = [116.461665, 39.941564];
    // // 返回 p1 到 p2 间的地面距离，单位：米
    // var dis = AMap.GeometryUtil.distance(p1, p2);
    // console.log(dis);
    // 列表

    // 地址筛选
    this.option1 = [{ text: "绍兴市", value: 126 }];

    // 项目筛选
    this.option3 = [
      { text: "全部", value: 0 },
      { text: "选择反应时", value: 258 },
      { text: "仰卧起坐", value: 312 },
      { text: "血压", value: 313 },
      { text: "骨密度", value: 314 },
      { text: "人体成分", value: 315 },
      { text: "立定跳远", value: 316 },
      { text: "10米折返跑", value: 317 },
      { text: "走平衡木", value: 318 },
      { text: "双脚连续跳", value: 319 },
      { text: "网球掷远", value: 320 },
      { text: "跳绳", value: 321 },
      { text: "腰围", value: 322 },
      { text: "脂肪厚度", value: 323 },
      { text: "心率", value: 324 },
      { text: "安静脉搏", value: 325 },
      { text: "心肺功能测试", value: 326 },
      { text: "血管机能测试", value: 327 },
      { text: "背力", value: 328 },
      { text: "功率自行车", value: 329 },
      { text: "跳中绳", value: 330 },
      { text: "体电图", value: 331 },
      { text: "亚健康", value: 332 },
      { text: "平衡测试", value: 333 },
      { text: "动脉硬化", value: 334 },
      { text: "动脉曲张", value: 335 },
      { text: "闭眼单脚站立", value: 257 },
      { text: "坐位体前屈", value: 256 },
      { text: "俯卧撑", value: 255 },
      { text: "纵跳", value: 254 },
      { text: "握力", value: 253 },
      { text: "台阶测试", value: 252 },
      { text: "肺活量", value: 251 },
      { text: "体重", value: 250 },
      { text: "身高", value: 2 }
    ];
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
.my-index {
  display: block;
  height: 40px;
  width: 40px;
  background: url("../../assets/index.png") no-repeat center;
  background-size: cover;
}
</style>

<style lang='less' scoped>
// /deep/[data-v-4c9398d1] .amap-container img{
//   height: 30px!important;
// }
#home {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;

  #title {
    .van-ellipsis {
      text-align: center;
    }
  }
  .popup {
    .popup-cont {
      position: absolute;
      top: 50%;
      right: 50%;
      margin-top: -25vh;
      margin-right: -40%;
      padding: 0.8rem;
      height: 50vh;
      width: 80%;
      border-radius: 0.25rem;
      background-color: white;
      z-index: 5;

      strong {
        display: block;
        margin-bottom: 0.4rem;
        font-size: 0.9rem;
        line-height: 1rem;
        font-family: PingFang;
        font-weight: 500;
        color: rgba(51, 51, 51);
      }
      p {
        margin-bottom: 0.2rem;
      }
      p:nth-child(2) {
        display: flex;
        align-items: center;
        font-size: 0.6rem;
        font-family: PingFang;
        font-weight: 400;
        color: rgba(153, 153, 153);
        &::before {
          content: "";
          display: inline-block;
          margin-right: 0.25rem;
          height: 0.7rem;
          width: 0.7rem;
          background: url("../../assets/ditu.png") no-repeat center;
          background-size: cover;
        }
      }
      p:nth-child(3) {
        position: relative;
        padding-left: 20px;
        font-size: 0.7rem;
        font-family: PingFang;
        font-weight: 400;
        color: rgba(51, 51, 51);
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          margin-right: 0.25rem;
          height: 0.7rem;
          width: 0.7rem;
          background: url("../../assets/juli.png") no-repeat center;
          background-size: cover;
        }
      }
      button {
        height: 40px;
        width: 100%;
        font-size: 0.7rem;
        font-family: PingFang;
        color: rgb(255, 255, 255);
        background: rgb(20, 146, 255);
      }
      .cont {
        padding-bottom: 20px;
        height: calc(100% - 40px);
        overflow: scroll;
      }
    }

    .popup-shade {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
.map {
  width: 100%;
  height: 12.5rem;
  // background-image: url(img/timg.jpg);
  background-size: 100% 100%;
}
#container {
  width: 100%;
  height: 12.5rem;
  // background-image: url('img/timg.jpg');
  background-size: 100% 100%;
  margin: 0 auto;
  cursor: pointer;
}
.lie {
  background: #fff;
  // margin-top: 17.9rem;

  li {
    padding: 0.95rem 0.6rem;
    display: flex;
    border-bottom: 0.05rem solid #e7e7e7;
    width: 100%;
    // height: 5.75rem;
    .img {
      width: 6rem;
      height: 4rem;
      text-align: center;
      overflow: hidden;
      border-radius: 0.15rem;

      img {
        // width: 100%;
        height: 100%;
      }
      // background-image: url(img/jianceb.jpg);
      // background-size: 100% 100%;
    }
    .text {
      width: 10rem;
      margin-left: 0.6rem;
      p {
        font-size: 0.65rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 1.05rem;
      }
      p:last-child {
        height: 0.8rem;
        font-size: 0.5rem !important;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.85rem;
      }
    }
    h3 {
      font-size: 0.8rem;
      padding: 0 0 0.1rem 0;
      font-family: PingFang SC;
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    p {
      font-size: 0.65rem;
      // padding: 0rem 0.6rem;
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-of-type(3) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}

/deep/.amap-copyright {
  height: 0;
}
/deep/.amap-logo img {
  height: 0 !important;
}
/deep/.van-dropdown-item__content {
  max-height: 100%;
}
/deep/.van-dropdown-item {
  background: #fff;
}
/deep/.van-hairline--top-bottom {
  span {
    padding: 0;
    // width: 5rem;
  }
  div:nth-child(1) {
    justify-content: flex-start;
    // width: 4rem;
  }
  > div:nth-child(2) {
    justify-content: center;
    text-align: center;
    //  width: 5rem;
  }
  > div:nth-child(3) {
    flex-direction: row-reverse;
    text-align: center;
    //  width: 5rem
    justify-content: start;
    padding-right: 0.5rem;
    span {
      right: 0;
    }
  }
}
/deep/.van-nav-bar__title {
  margin: 0 auto !important;
}
.kong {
  width: 100%;
  height: 15.25rem;
}
// /deep/.van-dropdown-menu__title::after{
//   right: -25%;
// }
/deep/.van-ellipsis {
  margin-right: 0.5rem;

  text-align: left;
  font-weight: normal;
  font-family: "Microsoft Yahei", serif;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
}
/deep/.van-dropdown-menu__title::after {
  top: 80%;
  right: -0.6rem;
  display: block;
  width: 1rem;
  height: 1rem;
  background: url("../../assets/jiantoux.png") center no-repeat;
  background-size: 100% 100%;
  transform: rotate(0);
  opacity: 1;
  transform: translateY(-50%);
  border: 0;
  content: "";
}
/deep/.van-dropdown-menu__title.van-dropdown-menu__title--active::after {
  top: 0;
  transform: rotateZ(180deg);
  transition: all 0.3s;
}
/deep/.van-dropdown-menu__item {
  border: 0.05rem solid white;
}
.two {
  position: relative;
  /deep/.van-dropdown-item__option {
    text-align: center;
  }
  /deep/.van-cell__title {
    width: 100%;
    position: absolute;
    text-align: center;
  }
  /deep/.van-cell {
    padding-left: 0;
  }
}
/deep/.van-cell {
  height: 2rem;
}
/deep/ .van-dropdown-menu__item:first-child::after {
  background-color: white;
}
/deep/.van-hairline--top-bottom span {
  font-size: 14px;
}
/deep/.van-checkbox {
  margin-left: 10%;
}
/deep/.van-tree-select__item--active {
  color: #1989fa;
  // margin-top: -0.2rem;
}
/deep/.van-tree-select__item {
  border-bottom: 1px solid #e7e7e7;
}
/deep/.van-sidebar-item--select {
  color: #1989fa;
  border-color: white;
}
.intended {
  height: 100% !important;
  /deep/.van-icon-checked:before {
    content: "\F0C8";
  }
  /deep/.van-dropdown-item__icon {
    margin-top: -0.2rem;
  }
}
/deep/.van-tree-select__nav-item {
  text-align: left;
}
</style>

