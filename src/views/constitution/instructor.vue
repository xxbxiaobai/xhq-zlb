<template>
  <div id="box">
    <!-- 导航 -->
    <div class="fixed" v-if="isShow">
      <van-nav-bar  title="社会体育指导员" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
      <!-- <van-nav-bar title="社会体育指导员" left-arrow>
      <div  slot="left" @click="returns">返回</div>
      </van-nav-bar> -->
      <!-- 搜索 -->
      <div class="search-bar">
        <nobr style="display:flex;width:100%;height:1.45rem">
          <div class="search">
            <div class="search-icon">
              <img src="./img/suosuo.png" />
            </div>
            <div class="input-box">
              <input
                type="text"
                placeholder="请输入指导员名称"
                v-model="transfer_name"
                @focus="showDel = true"
                @blur="showDel = false"
              />
            </div>
            <div class="search-close search-s" @click="del" v-show="showDel">
              <img src="./img/cuo.png" />
            </div>
          </div>
          <div class="search-action" @click="Searchs">搜索</div>
        </nobr>
      </div>

      <!-- 下拉切换开始 -->
      <div class="box-head" v-show="nav">
        <!-- <span
          :class="{tab:movement}"
          @click="movement = !movement,region=false, name=false"
        >{{myData.movement}}</span> -->
        <span
          :class="{tab:region}"
          @click="region = !region,movement=false,name=false"
        >{{myData.region}}</span>
        <span :class="{tab:name}" @click="name = !name,region=false,movement=false">{{myData.name}}</span>
      </div>
      <!-- 下拉切换结束 -->
      <!-- 下拉开始 -->
      <div id="shade" v-show="movement===true||region===true||name==true">
        <!-- 地区 -->
        <ul v-show="movement">
          <li>
            <div
              :class="{select:regionList.index==i}"
              v-for="(item,i) in regionList.list"
              :key="i"
              @click="regionList.index=i,cutys(item,i) "
            >{{item.name}}</div>
          </li>
          <li @click="movement=region=false">
            <div
              :class="{select:erji==index}"
              v-for="(item,index) in regionList.list[regionList.index].data"
              :key="index"
              @click="getMovement(item,index)"
            >{{item.name}}</div>
          </li>
        </ul>
        <!-- 级别 -->
        <ul v-show="region">
          <li class="rank">
            <div
              :class="{select: num==i}"
              v-for="(item,i) in rank"
              :key="i"
              @click="getRegion(item,i)"
            >{{item.name}}</div>
          </li>
        </ul>
        <!-- 项目 -->
        <ul v-show="name">
          <li class="rank">
            <nobr>
              <div
                :class="{select: nums==i}"
                v-for="(item,i) in project"
                :key="i"
                @click="getName(item.id,i,item.name,item)"
              >{{item.name}}</div>
            </nobr>
          </li>
        </ul>
      </div>
    </div>

    <!--  -->
    <ul :class="{'ul':true,'ul_padding_s':isShow}">
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
      <li v-for="(i,index) in teacher" :key="index" @click="jump(i.id)">
        <img v-if="i.profilePhoto" :src="ImageUrl + i.profilePhoto" alt />
        <div v-else>
          <!-- <img v-if="i.gender==1" :src="require('./img/nan.png')" alt />
          <img v-else :src="require('./img/nv.png')" alt />-->
          <article class="son" v-if="i.gender===1" :class="i.active"></article>
          <article class="woman" v-else :class="i.active"></article>
        </div>

        <h4>{{i.name}}</h4>
        <p>区域：{{i.regionDistrict}}</p>
        <p>级别：{{i.instructorLevel}}</p>
        <p>项目：{{i.itemTypeName}}</p>
      </li>
       </van-list>
    </ul>
    <!-- <van-list
      v-if="hunt"
      v-model="loadingss"
      :finished="finishedss"
      finished-text="没有更多了"
      @load="onLoadss"
    >
      <ul class="ul souSuo">
        <li v-for="(i,index) in search" :key="index" @click="jump(i.id)">
          <img v-if="i.fileInfo!==''" :src="i.fileInfo" alt />
          <div v-else>
            <img v-if="i.gender==1" src="./img/nan.png" alt />
            <img v-else src="./img/nv.png" alt />
          </div>
          <h4>{{i.name}}</h4>
          <p>区域：{{i.regionDistrict}}</p>
          <p>级别：{{i.instructorLevel}}</p>
          <p>项目：{{i.itemTypeName}}</p>
        </li>
      </ul>
    </van-list>-->
    <div class="emptys" v-show="NoData">
      <img src="./img/zan.png" alt />
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
// import AMap from "AMap"; // 引入高德地图
import Vue from "vue";
import { zlbFun } from "@/util/Tool";
import { Area, InstructorDetails, InstructorProject } from "../../http/api";
import { DropdownMenu, DropdownItem, NavBar, Icon, List } from "vant";
Vue.use(DropdownMenu)
  .use(DropdownItem)
  .use(NavBar)
  .use(Icon)
  .use(List);
export default {
  name: "good",
  data() {
    return {
      ImageUrl: this.ImageUrl,
      isShow: false,
      login: true,
      NoData: false, //无数据显示
      filtrateList: true,
      page: 1, //页数
      limit: 21,
      loadingss: false,
      loading: false,
      finished: false,
      finishedss: false,
      pages: 0,
      list: [], //  请求的数据
      searchData: [], //搜索后的展示数据
      showDel: false,
      nav: true,
      teacher: [],
      city: [], //市区
      movement: false, //区域
      region: false, //指导级别
      name: false, //运动项目
      show: false, //下拉菜单
      listMap: true, //地图切换
      empty: false, //搜索没有数据时显示
      num: "",
      nums: "",
      erji: "",
      hunt: false, //搜索内容
      search: [],
      value: "",
      project: [
        {
          name: "全部",
          id: ""
        }
      ],
      rank: [
        { id: "", name: "全部" },
        { id: 1, name: "一级指导员" },
        { id: 2, name: "二级指导员" },
        { id: 3, name: "三级指导员" }
      ],
      myData: {
        movement: "选择区域",
        region: "指导级别",
        name: "指导项目"
      },
      regionList: {
        index: 0,
        list: [
          {
            name: "全部",
            index: ""
          }
        ]
      },
      all: {
        adcode: "",
        center: "",
        id: "",
        level: "",
        name: "全部",
        parentId: ""
      },
      // 封装方法
      transfer: {
        regionDistrict: "", //县区
        instructorLevel: "", //指导员级别
        typeId: "", //项目
        name: "", //名字
        page: 1,
        limit: 21
      },
      transfer_name: '',
    };
  },
   beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.path) {
        vm.isShow = true;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.isShow = false
    next();
  },
  methods: {
    onLoad() {
      // console.log(this.page)
      this.transfer.page++;
      // debugger
      // console.log(112992);
      this.login = true;
      this.listsing();
    },
    listsing(p_val) {
      this.loading = true
      if(typeof p_val == 'string' || p_val === ""){
        this.transfer.name = p_val
      }else{
        this.transfer.name = this.transfer_name
      }
      console.log(this.transfer)
      InstructorDetails(this.transfer)
      .then(res=>{
        if(res.code ==0){
          this.loading = false
          this.teacher = this.teacher.concat(res.data)
          if(res.count == 1&&res.data.length==0){
            this.finished = true
          }
          if(this.teacher.length >= res.count){
            this.finished = true
          }
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    // 筛选地区
    getMovement: function(item, i) {
      this.transfer.page = 1
      this.teacher = []
      this.finished = false
      window.scroll(0, 0);
      this.page = 1;
      this.erji = i;
      this.transfer.regionDistrict = item.id;
      var names = this.transfer;
      var regionCity = this.transfer.regionCity;
      var regionDistrict = this.transfer.regionDistrict;
      var instructorLevel = this.transfer.instructorLevel;
      var typeId = this.transfer.typeId;
      if (item == "全部") {
      } else {
        this.listsing();
      }
      this.myData.movement = item.name;
    },
    // 市
    cutys(name, i) {
      window.scroll(0, 0);
      this.page == 0;
      this.transfer.regionCity = name.id;
    },
    // 筛选等级
    getRegion: function(name, i) {
      this.transfer.page = 1
      this.teacher = []
      this.finished = false
      window.scroll(0, 0);
      this.page = 1;
      this.num = i;
      this.myData.region = name.name;
      this.regionList.list[this.regionList.index].index = i;
      this.transfer.instructorLevel = name.id;
      var names = this.transfer;
      var regionCity = this.transfer.regionCity;
      var regionDistrict = this.transfer.regionDistrict;
      var instructorLevel = this.transfer.instructorLevel;
      var typeId = this.transfer.typeId;
      var name = this.transfer.name;
      // console.log(instructorLevel);
      if (instructorLevel == 0) {
        instructorLevel = "";
      }
      this.listsing();
      this.region = false;
    },
    // 筛选项目
    getName(id, i, s,item) {
      this.transfer.page = 1
      this.teacher = []
      this.finished = false
      window.scroll(0, 0);
      this.page = 1;
      this.nums = i;
      this.myData.name = s;
      this.transfer.typeId = id;
      this.regionList.list[this.regionList.index].index = i;
      if (id === 0) {
        this.transfer.typeId = "";
        this.listsing();
      } else if (id !== 0) {
        this.listsing();
      }
      this.name = false;
    },
    init() {
      let map = new AMap.Map("container", {
        zoom: 10
      });
    },
    onClickRight() {
      this.$router.push("/searchPlace");
    },
    onClickLeft() {
      window.location.href = "sxty://back"
      this.$router.go(-1);
    },
    // 点击跳详情
    jump(i) {
      // console.log(i);
      this.$store.state.nameId = { id: i };
      this.$router.push({
        path: "/instructors",
        query: {
          id: i
        }
      });
    },
    // 搜索跳转
    suouso() {
      // console.log(this.search);
      // this.teacher=[];
      this.search = [];
      // console.log(123);
      this.nav = false;

      // this.NoData = true;
      this.movement = false;
      this.region = false;
      this.name = false;
      this.filtrateList = false;
    },
    returns() {
      this.nav = true;
      this.hunt = false;
      this.search = [];
      this.listsing();
    },

    del() {
      this.transfer.name = "";
    },
    // onLoadss() {
    //   this.pages = this.pages + 1;
    //   this.requestSousuo();
    // },
    // requestSousuo() {
    //   this.transfer.name = this.value;
    //   var name = this.transfer.name;
    //   var limit = this.limit;
    //   var page = this.pages;
    //   InstructorDetails({ name, limit, page }).then(res => {
    //     console.log(res);
    //     // this.search = res.data;
    //     // if (this.search.length == 0) {
    //     //   this.NoData = true;
    //     //   this.hunt = false;
    //     // } else {
    //     //   // this.NoData = false;
    //     //   this.hunt = true;
    //     // }

    //     //////
    //     if (res.data == null || res.data.length === 0) {
    //       this.hunt = false;
    //       // console.log(22222);
    //       // console.log(this.nav)
    //       this.loadingss = false;
    //       this.finishedss = true;
    //       this.NoData = true;
    //       this.search = res.data;
    //       // console.log(this.teacher);
    //       return;
    //     }
    //     this.hunt = true;
    //     if (this.page === 1) {
    //       // console.log(111111);
    //       this.search = res.data;
    //       this.NoData = false;
    //     } else {
    //       this.NoData = false;
    //       this.search = this.search.concat(res.data);
    //     }
    //     this.loadingss = false;
    //     if (res.data.length < 21) {
    //       this.NoData = false;
    //       this.finishedss = true;
    //     } else {
    //       this.NoData = false;
    //       this.finishedss = false;
    //     }
    //     ///////
    //   });
    // },
    // 搜索内容
    Searchs(p_val) {
      this.transfer.page = 1
      this.teacher = []
      this.finished = false
      window.scroll(0, 0);
      this.page = 1;
      this.listsing(p_val);
      // console.log(valueSou);
      // console.log(111);

      // if (this.search.count == 0) {
      //   this.empty = true;
      // } else {
      //   this.empty = false;
      // }
    }
  },
  created() {
    zlbFun("社会体育指导员");
    this.listsing();
    //体育指导员地区筛选
    // this.regionList.list = [
      // {
      //   data: [
      //     {
      //       adcode: "",
      //       center: "",
      //       id: "",
      //       level: "",
      //       name: "全部",
      //       parentId: ""
      //     },
      //     {
      //       id: 1299,
      //       name: "越城区",
      //       level: 3,
      //       parentId: 126,
      //       adcode: 330602,
      //       center: "120.582633,29.988244"
      //     },
      //     {
      //       id: 1300,
      //       name: "柯桥区",
      //       level: 3,
      //       parentId: 126,
      //       adcode: 330603,
      //       center: "120.495085,30.081929"
      //     },
      //     {
      //       id: 1301,
      //       name: "上虞区",
      //       level: 3,
      //       parentId: 126,
      //       adcode: 330604,
      //       center: "120.868122,30.03312"
      //     },
      //     {
      //       id: 1302,
      //       name: "新昌县",
      //       level: 3,
      //       parentId: 126,
      //       adcode: 330624,
      //       center: "120.903866,29.499831"
      //     },
      //     {
      //       id: 1303,
      //       name: "诸暨市",
      //       level: 3,
      //       parentId: 126,
      //       adcode: 330681,
      //       center: "120.246863,29.708692"
      //     },
      //     {
      //       id: 1304,
      //       name: "嵊州市",
      //       level: 3,
      //       parentId: 126,
      //       adcode: 330683,
      //       center: "120.831025,29.56141"
      //     }
      //   ],
      //   name: "绍兴市",
      //   id: 126
      // }
    // ];

    // 指导员项目筛选
    this.project = [
      { name: "全部", id: "" },
      { name: "田径", id: "1" },
      { name: "游泳", id: "2" },
      { name: "花样游泳", id: "3" },
      { name: "潜水(含蹼泳)", id: "4" },
      { name: "划水", id: "5" },
      { name: "皮划艇", id: "6" },
      { name: "救生", id: "7" },
      { name: "跳水", id: "8" },
      { name: "帆船(板)", id: "9" },
      { name: "龙舟", id: "10" },
      { name: "赛艇", id: "11" },
      { name: "飞艇", id: "12" },
      { name: "摩托艇", id: "13" },
      { name: "航海模型", id: "14" },
      { name: "风筝", id: "15" },
      { name: "热气球", id: "16" },
      { name: "牵引伞", id: "17" },
      { name: "动力伞", id: "18" },
      { name: "轻型飞机", id: "19" },
      { name: "滑翔机", id: "20" },
      { name: "滑翔伞", id: "21" },
      { name: "飞机跳伞", id: "22" },
      { name: "超轻型飞机", id: "23" },
      { name: "航天模型", id: "47" },
      { name: "航空模型", id: "48" },
      { name: "悬挂滑翔", id: "49" },
      { name: "攀岩", id: "50" },
      { name: "登山", id: "51" },
      { name: "户外山地", id: "52" },
      { name: "自行车", id: "53" },
      { name: "乒乓球", id: "55" },
      { name: "摩托车", id: "54" },
      { name: "羽毛球", id: "56" },
      { name: "篮球", id: "57" },
      { name: "足球", id: "58" },
      { name: "排球", id: "59" },
      { name: "棒球", id: "60" },
      { name: "橄榄球", id: "61" },
      { name: "壁球", id: "62" },
      { name: "门球", id: "63" },
      { name: "网球", id: "64" },
      { name: "软式网球", id: "65" },
      { name: "曲棍球", id: "66" },
      { name: "垒球", id: "67" },
      { name: "毽球", id: "68" },
      { name: "台球", id: "69" },
      { name: "手球", id: "70" },
      { name: "冰球", id: "71" },
      { name: "沙滩排球", id: "72" },
      { name: "地掷球", id: "73" },
      { name: "保龄球", id: "74" },
      { name: "水球", id: "75" },
      { name: "高尔夫球", id: "76" },
      { name: "藤球", id: "77" },
      { name: "轮滑", id: "78" },
      { name: "短道速滑", id: "79" },
      { name: "花样滑冰", id: "80" },
      { name: "速度滑冰", id: "81" },
      { name: "越野滑雪", id: "82" },
      { name: "自由式滑雪", id: "83" },
      { name: "高山滑雪", id: "84" },
      { name: "跳台滑雪", id: "85" },
      { name: "健美", id: "86" },
      { name: "举重", id: "87" },
      { name: "拳击", id: "88" },
      { name: "柔道", id: "89" },
      { name: "散打", id: "90" },
      { name: "摔跤", id: "91" },
      { name: "跆拳道", id: "92" },
      { name: "飞镖", id: "93" },
      { name: "射箭", id: "94" },
      { name: "射击", id: "95" },
      { name: "击剑", id: "96" },
      { name: "围棋", id: "97" },
      { name: "桥牌", id: "98" },
      { name: "国际象棋", id: "99" },
      { name: "中国象棋", id: "100" },
      { name: "电子竞技", id: "101" },
      { name: "无线电测向", id: "102" },
      { name: "业余无线电", id: "103" },
      { name: "汽车", id: "104" },
      { name: "车辆模型", id: "105" },
      { name: "体操", id: "106" },
      { name: "艺术体操", id: "107" },
      { name: "蹦床", id: "108" },
      { name: "技巧", id: "109" },
      { name: "铁人三项", id: "110" },
      { name: "冬季两项", id: "111" },
      { name: "现代五项", id: "112" },
      { name: "健美操", id: "113" },
      { name: "定向", id: "114" },
      { name: "信鸽", id: "115" },
      { name: "钓鱼", id: "116" },
      { name: "冰壶", id: "117" },
      { name: "武术", id: "118" },
      { name: "拔河", id: "119" },
      { name: "马术", id: "120" },
      { name: "体育舞蹈", id: "121" },
      { name: "舞龙舞狮", id: "122" },
      { name: "扇舞", id: "123" },
      { name: "绸舞", id: "124" },
      { name: "锅庄舞", id: "125" },
      { name: "健身舞", id: "126" },
      { name: "健身操舞", id: "127" },
      { name: "健身气功", id: "128" },
      { name: "健身操", id: "129" },
      { name: "健身拳", id: "130" },
      { name: "健身球", id: "131" },
      { name: "健身舞蹈", id: "132" },
      { name: "健身秧歌", id: "133" },
      { name: "木兰拳", id: "134" },
      { name: "木兰剑", id: "135" },
      { name: "木兰扇", id: "136" },
      { name: "太极拳", id: "137" },
      { name: "太极剑", id: "138" },
      { name: "太极扇", id: "139" },
      { name: "广播体操", id: "140" },
      { name: "拳操", id: "141" },
      { name: "体质检测", id: "142" },
      { name: "体质监测", id: "143" },
      { name: "腰鼓", id: "144" },
      { name: "瑜伽", id: "145" },
      { name: "老年花铃", id: "146" },
      { name: "跳绳", id: "147" },
      { name: "踢毽子", id: "148" },
      { name: "空竹", id: "149" },
      { name: "溜溜球", id: "150" },
      { name: "柔力球", id: "151" },
      { name: "五禽戏", id: "152" },
      { name: "洗髓经", id: "153" },
      { name: "长剑", id: "154" },
      { name: "划船", id: "155" },
      { name: "体育保健", id: "156" },
      { name: "功夫扇", id: "157" },
      { name: "体验式拓展培训师", id: "158" },
      { name: "户外运动领队", id: "159" },
      { name: "攀岩保护员", id: "160" },
      { name: "其他", id: "161" },
      { name: "未知", id: "162" },
      { name: "广场舞", id: "163" },
      { name: "气排球", id: "164" },
      { name: "健身瑜伽", id: "165" },
      { name: "工间操", id: "166" },
      { name: "健身", id: "167" },
      { name: "综合", id: "168" },
      { name: "节奏体语", id: "169" },
      { name: "组织管理", id: "170" },
      { name: "排舞", id: "171" },
      { name: "群众体育", id: "172" },
      { name: "太极拳剑扇", id: "173" },
      { name: "组织活动", id: "174" },
      { name: "体质测试", id: "175" },
      { name: "乒乓", id: "176" },
      { name: "经络操", id: "177" },
      { name: "经络探", id: "178" },
      { name: "持杖走", id: "179" },
      { name: "筋疲力尽络操", id: "180" },
      { name: "持杖", id: "181" },
      { name: "执仗员", id: "182" },
      { name: "杖持操", id: "183" },
      { name: "持杖操", id: "184" },
      { name: "筋络操", id: "185" },
      { name: "健身球操", id: "186" },
      { name: "曳步舞", id: "187" },
      { name: "武术（八法五步）", id: "188" },
      { name: "桨板", id: "189" },
      { name: "旱地冰壶", id: "190" },
      { name: "运动损伤", id: "191" },
      { name: "鬼步舞", id: "192" },
      { name: "佳木斯", id: "193" },
      { name: "国民体质监测", id: "194" },
      { name: "太极", id: "195" },
      { name: "长跑", id: "196" },
      { name: "自由搏击", id: "197" },
      { name: "象棋", id: "198" },
      { name: "门球　", id: "199" },
      { name: "篮球　", id: "200" },
      { name: "水上应急救援", id: "201" },
      { name: "天罡拳", id: "202" },
      { name: "秧歌", id: "203" },
      { name: "排级", id: "204" },
      { name: "形体舞", id: "205" },
      { name: "可乐球", id: "206" },
      { name: "舞蹈", id: "207" },
      { name: "国际跳棋", id: "208" },
      { name: "锣鼓", id: "209" },
      { name: "舞龙", id: "210" },
      { name: "跑步", id: "211" },
      { name: "球类", id: "212" },
      { name: "体育", id: "213" },
      { name: "术极拳", id: "214" },
      { name: "木球", id: "215" },
      { name: "营养学", id: "216" },
      { name: "急救", id: "217" },
      { name: "气功", id: "218" },
      { name: "球操", id: "219" },
      { name: "八卦", id: "220" },
      { name: "交谊舞", id: "221" },
      { name: "户外运动", id: "222" },
      { name: "明喻加", id: "223" },
      { name: "踢键子", id: "224" },
      { name: "珍咖", id: "225" },
      { name: "舞狮", id: "226" },
      { name: "航模", id: "227" },
      { name: "运动桨板", id: "228" },
      { name: "篮球足球", id: "229" },
      { name: "柔力球套路", id: "230" },
      { name: "五子棋", id: "231" },
      { name: "户外", id: "232" },
      { name: "健身排舞", id: "233" },
      { name: "短跑", id: "234" },
      { name: "其他（路跑）", id: "235" },
      { name: "其他（广播操）", id: "236" },
      { name: "啦啦操", id: "237" },
      { name: "健身腰鼓", id: "238" },
      { name: "木兰拳剑扇", id: "239" },
      { name: "合球", id: "240" },
      { name: "花键", id: "241" },
      { name: "体医结合", id: "242" },
      { name: "健身路径", id: "243" },
      { name: "花样跳绳", id: "244" },
      { name: "形意", id: "245" },
      { name: "太极推手", id: "246" },
      { name: "木兰", id: "247" },
      { name: "醒狮", id: "248" },
      { name: "排舞广场舞", id: "249" },
      { name: "健身跑", id: "250" },
      { name: "健身健美", id: "251" },
      { name: "营地", id: "252" },
      { name: "其他（幼儿基本操）", id: "253" },
      { name: "兜球", id: "254" },
      { name: "佳木斯快乐舞步操", id: "255" },
      { name: "      围棋", id: "256" },
      { name: "健身类", id: "257" },
      { name: "社会体育", id: "258" },
      { name: "抖空竹技艺", id: "259" },
      { name: "咏春拳", id: "260" },
      { name: "广场健身舞", id: "261" },
      { name: "其它", id: "262" },
      { name: "拉丁舞", id: "263" },
      { name: "街舞", id: "264" },
      { name: "体育与保健", id: "265" },
      { name: "铅球", id: "266" },
      { name: "蓝球", id: "267" },
      { name: "扑克", id: "268" },
      { name: "南拳", id: "269" },
      { name: "木兰十八式单扇", id: "270" },
      { name: "长跑运动", id: "271" },
      { name: "经络健身操", id: "272" },
      { name: "国民体质测试", id: "273" },
      { name: "国民体质", id: "274" },
      { name: "幼儿体育教育", id: "275" },
      { name: "健身广场舞", id: "276" },
      { name: "国标拉丁舞", id: "277" }
    ];
  }
};
</script>


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
//=======================

#box {
  // background: url() no-repeat center;
  // background-size: cover;
  min-height: 100vh;
  color: #333;
  background-color: #fff;

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
    span:nth-of-type(1) {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      max-width: 4.5rem;
      text-align: center;
    }
    span:nth-of-type(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4.5rem;
      text-align: center;
    }
    span:nth-of-type(3) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: 0;
      text-align: center;
      height: 2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      &.tab::after {
        .i("../../assets/jiantous.png");
      }
      &::after {
        .i("../../assets/jiantoux.png");
      }
    }
  }

  //下拉框
  #shade {
    position: fixed;
    width: 100vw;
    // top: 46px;
    height: 100%;
    background: #f6f8f7;

    > ul {
      position: absolute;
      // overflow:scroll;
      display: flex;
      //   height: 19rem;
      width: 100%;
      height: 100%;
      background-color: #f6f8f7;
      z-index: 1;
      //   margin-top: 2rem;
      &:nth-child(2) {
        // height: 100%;
        width: 100%;
      }
      &:nth-child(3) {
        // height: 100%;
        width: 100%;
      }
      > li {
        overflow-y: auto;
        height: calc(100% - 6.55rem) !important;
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
.rank {
  width: 100% !important;
  overflow-y: auto;

  div {
    width: 100%;
    background: #f6f8f7;
  }
}
// /deep/.van-nav-bar__left{
//   left: 3px;
// }
// /deep/.van-nav-bar__right{
//    right:7px;
// }
.ul_padding_s{
  padding-top: 7rem;
}

.ul {
  /deep/.van-list{
    flex-wrap: wrap;
    display: flex;
    width: 100%;
  }
  display: flex;
  flex-wrap: wrap;
  background: white;
  padding-left: 0.6rem;
  // justify-content: space-between;
  li {
    width: 29.8%;
    // flex: 3;
    height: 10rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    // margin: 1.5%;
    margin-bottom: 0.5rem;
    // padding-left: 1%;
    margin-right: 3.445%;
    border-radius: 0.125rem;
    // padding-right: 1%;
    img {
      width: 3.5rem;
      height: 3.5rem;
      margin: 0.8rem auto;
      border-radius: 50%;
      display: block;
    }
    h4 {
      text-align: center;
      font-size: 0.8rem;
      height: 0.8rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 0.8rem;
    }
    p {
      // width:6.45rem;
      height: 0.8rem;
      font-size: 0.55rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      margin: 0.05rem 0rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 0.3rem;
    }
  }
  .woman {
    background: url(img/nv.png) no-repeat center;
    background-size: cover;
    width: 3.5rem;
    height: 3.5rem;
    // background-position: -0.8rem 0;
    border-radius: 50%;
    margin: 0.8rem auto;

    &.active {
      position: relative;
      border: 2px solid #ffffff;
      box-shadow: 0 3px 5px #cad1d2;
      z-index: 0;
      &::before {
        content: "优秀";
        font-size: 12px;
        background: #ef6e00;
        position: absolute;
        right: -10px;
        line-height: 12px;
        padding: 2px;
        color: #fff;
        border-radius: 5px 0 5px 0;
        font-family: PingFang SC;
        z-index: 0;
      }
    }
  }
  .son {
    background: url(img/nan.png) no-repeat center;
    background-size: cover;
    width: 3.5rem;
    height: 3.5rem;
    // background-position: -0.8rem 0;
    border-radius: 50%;
    margin: 0.8rem auto;

    &.active {
      position: relative;
      border: 2px solid #ffffff;
      box-shadow: 0 3px 5px #cad1d2;
      z-index: 0;
      &::before {
        content: "\4F18\79C0";
        font-size: 12px;
        background: #ef6e00;
        position: absolute;
        right: -10px;
        line-height: 12px;
        padding: 2px;
        color: #fff;
        border-radius: 5px 0 5px 0;
        font-family: PingFang SC;
        z-index: 0;
      }
    }
  }
}
.search-bar {
  height: 2.25rem;
  width: 100%;
  font-size: 0.75rem;
  background-color: #fff;
  display: flex;
  padding: 0.5rem 0.5rem 0.4rem 0.1rem;
  box-sizing: border-box;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  border-bottom: 0.05rem solid rgba(0, 0, 0, 0.08);
  .back {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    color: #1492ff;
  }
  .search {
    width: 100%;
    border-radius: 0.85rem;
    // flex: 1;
    background-color: #f2f2f2;
    margin-left: 0.4rem;
    display: flex;
    padding: 0.25rem 1rem;
    justify-content: space-between;
    align-items: center;
    .search-icon,
    .search-close {
      width: 1rem;
      height: 1rem;
      margin-top: 0.05rem;
      img {
        width: 100%;
      }
    }

    .input-box {
      flex: 1;
      margin-left: 0.25rem;
      input {
        background-color: transparent;
        width: 85%;
        &::placeholder {
          color: #999999;
          font-size: 0.65rem;
        }
      }
    }
  }
  .search-action {
    line-height: 1.7rem;
    font-size: 0.75rem;
    color: #1492ff;
    margin-left: 3%;
  }
}
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}
.emptys {
  width: 100%;
  height: 100%;
  padding-top: 35%;
  img {
    display: block;
    width: 9.8125rem;
    height: 11rem;
    margin: 0 auto;
    padding-top: 5rem;
  }
  p {
    text-align: center;
    // width:3.15rem;
    //  height:0.775rem;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 1.05rem;
    margin-top: 0.7rem;
  }
}
.search-s {
  position: absolute;
  right: 20%;
}
.souSuo {
  padding-top: 3rem;
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
</style>
