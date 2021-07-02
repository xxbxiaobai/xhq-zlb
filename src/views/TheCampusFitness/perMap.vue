<template>
  <div>
    <van-loading type="spinner" vertical v-show="showLoading">
    </van-loading>
    <div class="tab">
      <div
        v-for="(item, idx) in menu"
        :key="idx"
        class="tabMap"
        :class="idx == index ? 'tabActive' : ''"
        @click="tabClick(item, idx)"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="index == 1" class="container1">
      <div class="container-img">
          <div class="select">
              <van-tree-select
          :items="Streetitems"
          :main-active-index=" mainActiveIndex"
          :active-id="activeId"
          @click-nav="onClickNav($event)"
        >
            <template slot="content">
                <div class="mainItem" v-for="(item,index) in street[id]" :key="index" @click="onClickItem(item.schoolName)">
                    <div class="text1">学校名称:{{item.schoolName}}</div>
                    <div class="text2">开放时段:{{item.schoolOpenTime}}</div>
                    <div class="text2">地址:{{item.schoolSite}}</div>
                </div>
            </template>
              </van-tree-select>
          </div>
      </div>
    </div>
    <div v-if="index == 0" class="container1 myMap" >
        <!-- 地图 -->
        <div class="box-map">
            <div class="searchIcon">
                <!-- <router-link tag="div" to="/map/searchPlace" style="height:100%;"></router-link> -->
            </div>
            <div id="container" @click="screen.indexCont=false"></div>
            <div class="venue" :class="{low:dataList.low}" v-if="navShow">
              <div class="venue-top">
                <span>{{onSchool}}</span>
                <img src="./images/icon.png" alt="">
              </div>
              <div class="venun-mid">{{schoolStreet}}</div>
            <div class="venue-btn">
            <a
                :href="'//uri.amap.com/marker?position='+onPoint[0]+','+onPoint[1]+'&name='+onSchool"
            >
                <span>导航</span>
            </a>
            </div>
        </div>
    </div>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="friends-o">
        人员列表
      </van-tabbar-item>
      <van-tabbar-item replace to="/perMap" icon="location-o">
        地图
      </van-tabbar-item>
      <van-tabbar-item replace to="/DataStatistics" icon="chart-trending-o">
        数据统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import {
  fitnessSiteInfo,
  fitnessMap
} from "../../http/api";
var map, //地图
  myMapIndex, //我的位置
  dataPOI, //信息点
  count = null;
export default {
  components: {},
  data() {
    return {
      showLoading:true,
      // 街道信息
      street:[],
      //导航弹窗展示
      navShow:false,
      //当前所选学校地址
      onPoint:'',
      // 当前所选学校
      onSchool:'',
      // 学校所在街道
      schoolStreet:'',
      id:'0',
      menu: ["健身地图", "更多列表"],
      Streetitems:[],
      index: 0,
      mainActiveIndex: 0,
      activeId: null,
      Arr:[],
      loading: true,
      movement: false, //运动项目
      // show: false, //下拉菜单

      //状态切换
      screen: {
        indexCont: false, //内容展示框
      },
      //数据
      dataList: {},
    }
  },
  methods: {
      //顶部tab切换
    tabClick(item, idx) {
      this.index = idx;
      if(idx == 0){
        console.log(234)
        this.showLoading = true
         this.getMyLocation()
      }
    }, 
    //左侧导航栏切换
    onClickNav(e) {
        console.log(e)   
        this.id = e
      if(e == this.mainActiveIndex){

      }else{
          this.mainActiveIndex = e
          console.log(this.mainActiveIndex)
      }
    },
    //右侧地址信息点击事件
    onClickItem(e) {
        console.log(e)
        this.$router.push({
          path:'/schoolList',
          query:{
            id:e
          }
        })
    },

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
      var geolocation = new qq.maps.Geolocation("IWFBZ-NH7WF-5C5JS-JDWYX-7H74H-3OFTR", "我的报修");
        geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
      },
      showPosition(position) {
          console.log(position);
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
      let mapHeight = document.body.clientHeight;
      document.getElementById("container").style.height = mapHeight+"px";
      map = new AMap.Map("container", {
        zoom: 14, //级别
        resizeEnable: true
      });
      // 地图图块加载完成后触发
      map.on("complete", () => {
        myMapIndex = [dataPOI.pointY, dataPOI.pointX] = [
          lng,
          lat
        ];
        map.setZoomAndCenter(14, myMapIndex);
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
            console.log('wode',e.lnglat)
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
     * 获取点击地区
     */
    getRegion(item, i) {
      this.interceptor();
      this.regionList.list[this.regionList.index].index = i;
      let getCenter = item.center.split(",");
      dataPOI.pointAreaId = item.id;
      [dataPOI.pointY, dataPOI.pointX] = getCenter;
      map.setZoomAndCenter(14, getCenter);
      dataPOI.page = 1;
      this.pointOfInformation();
    },
    /**
     * 信息点查询
     */
    pointOfInformation(index) {
      console.log('xinxi')
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
      fitnessMap().then(res=>{
        if(res.code == '0'){
          this.showLoading = false;
          let msg = res.data.map(item => {
          return{
            position:[item.schoolCoords.split(',')[0],item.schoolCoords.split(',')[1]],
            schoolName:item.schoolName,
            id:item.id,
            site:item.site
          }
        })
        this.icon(msg);
        }
      }).catch(erro=>{
        this.$toast('服务器响应超时')
      })
    },
    /**
     * 信息点生成
     */
    icon(page) {
      console.log(1111111);
      if (!page) return;
      return page.map(item => {
        let icon = document.createElement("img");
        icon.src = require(`@/assets/icon/school.png`);
        icon.height = 23;
        icon.width = 26;
        icon.setAttribute('id',item.id)
        icon.onclick = e => this.iconCont(item.position,item.schoolName,item.site);

        return new AMap.Marker({
          content: icon, // 自定义点标记覆盖物内容
          label:{
            offset: new AMap.Pixel(-2, -2),  //设置文本标注偏移量
            content: `<div class='info'>${item.schoolName}</div>`, 
            direction: 'bottom' //设置文本标注方位
          },
          position: item.position, // 基点位置
          // offset: new AMap.Pixel(-17, -17), // 相对于基点的偏移位置
          map: map
        });
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
    iconCont(position,schoolName,site) {
      console.log(position,schoolName,site)
        this.navShow = true;
        this.onPoint = position
        this.onSchool  = schoolName;
        this.schoolStreet = site;
    },
    /**
     * 返回上一级
     */
    goBack() {
      window.location.href = "sxty://back";
      this.$router.push("/");
    },
    // 获取街道接口
    getFitnessSiteInfo(){
      fitnessSiteInfo({

      }).then(res=>{
        for(var i in res.data){
          var obj = {}
          obj.text = res.data[i].name
          this.Streetitems.push(obj)
          this.street.push(res.data[i].schoolInfoVos)
        }
      })
    },
    //获取地图信息接口
    getFitnessMap(){
      fitnessMap({}).then(res=>{
        console.log(res)
        console.log(12333333)
      })
    }
  },
   mounted() {
     this.getMyLocation();
  },
  destroyed() {
  },
   created() {
     this.index = this.$route.query.index?this.$route.query.index:'0';
    this.showLoading = !this.$route.query.showLoading
     console.log(this.showLoading)
     console.log(this.id)
     //获取地图位置信息和街道信息
     this.getFitnessSiteInfo();
     this.getFitnessMap()
    //初始化地图
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
   
  }
};
</script>
<style scpoed >
.my-index {
  /* position: absolute; */
  display: block;
  height: 40px ;
  width: 40px ;
  background: url("../../assets/index.png") no-repeat center;
  background-size: cover;
}
  .amap-marker-label{
    border: 0;
    background-color: transparent;
  }

.info{
    position: relative;
    top: 0;
    right: 0;
    min-width: 0;
    color:#333;
    font-weight: bold;
  }
  body{
    /* background-color: #fff; */
    text-align: left !important;
}
</style>
<style lang = "less" scoped>
.van-loading{
  position: fixed;
  top:calc(50% - 15px);
  left: calc(50% - 15px);
  z-index: 99;
  color: #000;
}
.tab {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
}
.van-tabbar{
  z-index: 999;
}
.tabMap,
.tabMore {
  font-size: 12px;
  display: flex;
  width: 85px;
  height: 32px;
  border-radius: 20px;
  /* background-color: rgb(71, 192, 215); */
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #666666;
  touch-action: none;
}
.tabActive {
  background-color: rgb(71, 192, 215);
  color: #ffffff;
}
.container1 {
  /* height: 540px; */
  background-color: #f0fcfc;
  padding-top: 10px;
}
.myMap{
    padding-top: 0px;
}
.container-img {
  /* height: 540px; */
  position: relative;
  /* margin: 18px 8px 0px; */
  bottom: 50px;
  margin-top: 42px;
}
.select{
    width: calc(100% - 20px);
    position: relative;
    top: 10px;
    left: 10px;
    background-color: #fff;
    border-radius: 20px;
}
.van-tree-select{
  height: 100vh !important;
   border-radius: 20px;
   overflow: hidden;
  /* height: calc(100vh ) !important; */
}
.van-sidebar,.van-tree-select__nav{
    background-color:#63aae7;
    width: 80px;
    /* font-size: 14px; */
}
.van-sidebar-item--select,.van-tree-select__nav-item{
     background-color:transparent !important;
    /* width: 80px; */
    /* height: 32px; */
    text-align: center;
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
}
.van-sidebar-item--select::before{
    background-color:transparent !important;
}
.van-sidebar-item--select{
    color: #ffffff;
}
.van-tree-select__content{
  text-align: left;
  padding-left: 30px;
}
.mainItem{
    height: 100px;
    /* box-shadow: 0px 0px 5px 2px #000; */
}
.text1{
    font-size: 13px;
    /* font-weight: 500; */
    font-weight: bold;
    padding-top: 20px;
    color: #333333;
}
.text2{
    font-size: 12px;
    font-weight: 400;
    margin-top: 6px;
    color: #333333;
}
.my-index {
  /* position: absolute; */
  display: block;
  height: 40px ;
  width: 40px ;
  background: url("../../assets/index.png") no-repeat center;
  background-size: cover;
}
/* 地图 */
.box-map {
    /* 搜索图标 */
    .searchIcon {
      position: absolute;
      top: 8rem;
      right: 0.3rem;
      height: 60px;
      width: 60px;
      background: url("/src/assets/map_icon_1@2x.png");
      background-size: cover;
      z-index: 999;
    }
    /* 高德地图 */
    #container {
      width: 100vw;
      background-color: #eee;
    }
    .venue-top{
      margin-left: 27px;
      margin-top: 15px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .venue-top span{
      vertical-align: middle;
    }
    .venue-top img{
      width: 15px;
      height: 15px;
      vertical-align: middle;
      margin-left: 10px;
    }
    .venun-mid{
      margin-left: 27px;
      margin-top: 12px;
      font-size: 13px;
      font-family: PingFang SC;
      color: #333333;
    }
      
    /* 展示卡 */
    .venue {
      position: fixed;
      bottom: 48px;
      right: 0;
      /* padding: 1.15rem 0.6rem 0; */
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
        /* margin-top: 0.9rem; */
        /* height: 2.45rem; */
        height: 33px;
        width:235px;
        margin:0 auto;
        background-color: #2bace8;
        border-radius: 30px;
        margin-top: 16px;
        margin-bottom: 16px;
        /* border-top: 0.05rem solid #ccc; */
        a {
          width: 100%;
          height: 1.4rem;
          /* font-size: 0.7rem; */
          font-size:14px;
          line-height: 1.4rem;
          text-align: center;
          color: #fff;
          /* &:nth-child(1) {
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
          } */
          span {
            display: inline-flex;
            align-items: center;
          }
        }
      }
    }
  }
</style>