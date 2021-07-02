<template>
  <div id="home">
    <van-nav-bar v-if="isShow" title="赛事活动报名" />
    <!-- <van-search
      placeholder="请输入搜索关键词"
      v-model="searchvalue"
      shape="round"
      v-if="isShow"
      @search="Search"
    /> -->
          <!--v-show 判断轮播图是都展示-->
    <!-- <swiper
      id="swiper"
      :options="swiperOption"
      ref="mySwiper"
      v-show="$route.query.origin"
      v-if="goodVisibility"
    > -->
        <swiper
      id="swiper"
      :options="swiperOption"
      ref="mySwiper"
      v-if="goodVisibility"
    >
      <!-- slides -->
      <swiper-slide v-for="(item,index) in banner" :key="index">
        <!-- <img :src="item.filecoverUrl? item.filecoverUrl:img.url" @click="detailspage(item.id)" /> -->
        <p class="banner-title">{{item.actName||''}}</p>
        
        <img :src="(item.fileImgList[0] === undefined) ? ('') : (ImageUrl + item.fileImgList[0].id)" @click="detailspage(item.id,item.aType,item.isThematic,item.annId)" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <van-dropdown-menu>
      <van-dropdown-item :title="titlearea" ref="area">
        <van-tree-select
          :items="regionItems"
          :active-id.sync="activeId"
          :main-active-index.sync="activeIndex"
          @click-item="selectRegion"
          @click-nav="selectLeft"
        />
      </van-dropdown-item>
      <van-dropdown-item title="赛事时间" ref="item">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          cancel-button-text="全部"
          :min-date="minDate"
          @confirm="onConfirm"
          @cancel="onConfirmcancel"
        />
      </van-dropdown-item>
      <van-dropdown-item
        :title="titlestatus"
        v-model="value2"
        :options="option2"
        @change="eventstatus"
      />
      <van-dropdown-item
        :title="titlelevel"
        v-model="value1"
        :options="option1"
        @change="changeindex"
      />
    </van-dropdown-menu> -->

    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      :offset="10"
      class="video-list"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoadList"
      :immediate-check="false"
    >
      <div
        class="box"
        v-for="(item,index) in eventlists"
        :key="index"
        @click="detailspage(item.id,item.aType,item.isThematic,item.annId,item.eventStatus)"
      >
        <div class="img">
          <img
            v-if="item.fileImgList.length>0"
            :src="ImageUrl+item.fileImgList[0].id"
          />
          <img v-else src="../../assets/zwltsy.jpg" />
          <span v-if="item.eventStatus==0" class="tig tig_blue">未开始</span>
          <span v-if="item.eventStatus==1" class="tig tig_red">报名中</span>
          <span v-if="item.eventStatus==2" class="tig tig_yellow">报名截止</span>
          <span v-if="item.eventStatus==3" class="tig tig_orange">比赛中</span>
          <span v-if="item.eventStatus==4" class="tig tig_gray">已结束</span>
        </div>
        <div class="box-text">
          <p>
            <i class="special" v-if="item.isThematic">专</i>
            {{item.actName}}
          </p>
          <span>
            <img src="../../assets/spor.png" />
            <i>{{item.organizer}}</i>
          </span>
          <span>
            <img src="../../assets/time.png" />
            <i>{{item.startTime |dateSlice}}-{{item.endTime |dateSlice}}</i>
          </span>
          <span>
            <img src="../../assets/address.png" />
            <i>{{item.actAddress}}</i>
          </span>
        </div>
          <!-- <span v-if="item.eventStatus==1" class="tig_m tig_blue"  @click.stop="gotoPlay(item.actApplyWay,item.id,item.actHeathReport,item.startTime)">去报名</span> -->
      </div>
    </van-list>
    <div class="login-map" v-show="login&&banner">
      <div class="login">
        <van-loading />
      </div>
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool";
import { competitionList, findRegionArea, eventlistbanner,codegetToken } from "@/http/api";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      isShow: false,
      isShow_search: true,
      login: true,
      bannershow: true,
      pageSize: 10, // 每页条数
      pageIndex: 0, // 页码
      loading: false,
      error: false,
      finished: false,
      count: 0,
      titlearea: "归属区域",
      titlelevel: "赛事级别",
      titlestatus: "赛事状态",
      level: null,
      value: null,
      eventlists: [],
      activeId: 1,
      activeIndex: 0,
      value1: 0,
      value2: 0,
      option1: [
        { text: "全部", value: 0 },
        { text: "区县级", value: 1 },
        { text: "市级", value: 2 },
        { text: " 省级", value: 3 },
        { text: "全国级", value: 4 },
        { text: "国际级", value: 5 }
      ],
      option2: [
        { text: "全部", value: 0 },
        { text: "未开始", value: 1 },
        { text: "报名中", value: 2 },
        { text: " 报名截止", value: 3 },
        { text: " 比赛中", value: 4 },
        { text: " 已结束", value: 5 }
      ],
      currentDate: new Date(),
      startTime: null,
      minDate: new Date(2018, 0, 1),
      area: null,
      regionItems: [
        {
          text: "全部",
          value: "",
          children: []
        }
      ],
      swiperOption: {
        notNextTick: true,
        // 分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // 循环
        loop: true,
        // 切换时长
        autoplay: {
          delay: 2000
        },
        // 速度
        speed: 600,
        //使最后一张不出现断层的现象
        loopAdditionalSlides: 1
      },
      banner: [], //banner图的数据
      goodVisibility: false,
      eventStatus: null,
      searchvalue: ""
    };
  },

  methods: {
    onLoadList(p_val) {
      // alert(this.ImageUrl);
      this.pageIndex++;
      this.reqevent(p_val);
    },
    onConfirmcancel() {
      this.startTime = null;
      this.pageIndex = 0;
      this.eventlists = [];
      this.searchvalue = "";
      this.onLoadList();
      this.$refs.item.toggle();
    },
    // 轮播图的数据
    reqbanner() {
      competitionList({
        // rotationStatus: 1
        page: 1,
        limit: 3
      }).then(res => {
        // this.bannershow = false;
        console.log(res);
        this.banner = res.eventList
        // console.log(this.banner);
        // 处理swiper渲染动态数据时，不循环的方法
        this.goodVisibility = false;
        this.$nextTick(() => {
          this.goodVisibility = true;
        });
      }).catch(err => {});

    },
    changeindex() {
      // console.log(this.value1);

      if (this.value1 == 0) {
        this.level = null;
        this.titlelevel = "赛事级别";
      } else {
        this.titlelevel = this.option1[this.value1].text;
        this.level = this.value1 - 1;
      }
      // console.log(this.level);
      this.pageIndex = 0;
      this.eventlists = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    eventstatus() {
      if (this.value2 == 0) {
        this.eventStatus = null;
        this.titlestatus = "赛事状态";
      } else {
        this.titlestatus = this.option2[this.value2].text;
        this.eventStatus = this.value2 - 1;
      }
      this.pageIndex = 0;
      this.eventlists = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    //点击区县
    selectRegion(data) {
      // console.log(data.text)
      this.titlearea = data.text;
      // console.log(this.titlearea);
      this.area = data.id;
      this.$refs.area.toggle();
      this.pageIndex = 0;
      this.eventlists = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    //点击市
    selectLeft(data) {
      // console.log(data)
      if (data === 0) {
        this.titlearea = "归属地区";
        this.$refs.area.toggle();
        this.area = null;
        this.pageIndex = 0;
        this.eventlists = [];
        this.searchvalue = "";
        this.onLoadList();
      }
    },
    onConfirm() {
      // console.log(this.currentDate);
      this.startTime = this.datatime(this.currentDate);
      this.$refs.item.toggle();
      this.pageIndex = 0;
      this.eventlists = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    getArea() {
      findRegionArea().then(res => {
        // console.log(res);
        res.data.forEach(item => {
          this.regionItems.push({
            text: item.name,
            value: item.id,
            children: item.data.map(child => ({
              text: child.name,
              id: child.id
            }))
          });
        });
      });
    },
    //时间格式化
    datatime(ol) {
      const dt = new Date(ol);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      return `${y}-${m}-${d}`;
    },
    onClickLeft() {
      // window.location.href = "sxty://back";
      // this.$router.push(-1);
    },
    Search(p_val) {
      this.eventlists = [];
      this.pageIndex = 0;
      this.startTime = null;
      this.area = null;
      this.level = null;
      this.eventStatus = null;
      this.titlearea = "归属地区";
      this.titlestatus = "赛事状态";
      this.titlelevel = "赛事级别";
      this.onLoadList(p_val);
    },
    reqevent(p_val) {
      competitionList({
        startTime1: this.startTime,
        area: this.area,
        level: this.level,
        eventStatus: this.eventStatus,
        actName: this.searchvalue || p_val,
        page: this.pageIndex,
        limit: this.pageSize
      })
        .then(res => {
          this.login = false;
          if (res.code != 0) return;
          localStorage.setItem("token", res.token);
          if (res.eventList) {
            this.eventlists = [...this.eventlists, ...res.eventList];
            // console.log(this.eventlists);
          } else {
            this.eventlists = [];
          }
          // 加载状态结束
          this.loading = false;
          this.finished = false;
          // 数据全部加载完成
          if (this.eventlists.length >= res.count) {
            this.finished = true;
          }
        })
        .catch(err => {});
    },
    detailspage(id, type, special, annId,Status) {
      if (special == 1) {
        return this.$router.push({
          path: "/details-column",
          query: { id, annId }
        });
      }
      if (type == 1) {
        this.$router.push({ path: "/details", query: { id, aType: type, sta: Status } });
      } else {
        this.$router.push({
          path: "/matchDetails",
          query: { id, aType: type }
        });
      }
    },
    gotoPlay(actApplyWay,id,actHeathReport,startTime){
      if(actApplyWay == 0 || actApplyWay == 2){
        this.$router.push({name: 'personal',params:{id:id}})
      }else if(actApplyWay == 1 || actApplyWay == 2){
        this.$router.push({path: '/team',query:{id:id,healthid:actHeathReport,startTime:startTime}})
      }
    },
    AccessToken() {
      codegetToken({

      })
        .then(res => {
          console.log(res);
    //  localStorage.setItem("token", res.token);
        })
        .catch(err => {});
    },
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
    this.isShow = false;
    next();
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // if (window.history && window.history.pushState) {
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener("popstate", this.onClickLeft, false);
    // }
    
  },
  destroyed() {
    // window.removeEventListener("popstate", this.onClickLeft, false);
  },
  created() {
    zlbFun("赛事目录");
    // this.AccessToken();
    this.onLoadList();
    this.reqbanner();
    this.getArea();
    


  },
  filters: {
    dateSlice: function(date) {
      let dt = date.slice(0, 10);
      return dt.replace(/-/g, "/");
    }
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #ffffff;
  #swiper {
    width: 100%;
    height: 9.8rem;
    background-color: #ffffff !important;
    padding: 0 0.6rem;
    .swiper-slide {
      border: 0.15rem solid #ffffff;
      border-radius: 0.5rem;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
    }

    .banner-title {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      position: absolute;
      padding: 0.3rem 0.6rem;
      font-size: 0.7rem;
      color: #eee;
    }
  }
  /deep/ [class*="van-hairline"]::after {
    display: none;
  }
  /deep/ .van-tree-select__item {
    font-weight: 400;
  }
  /deep/ .van-dropdown-menu {
    height: 2.25rem;
    margin-right: 0.6rem;
  }
  /deep/ .van-ellipsis {
    font-size: 0.7rem;
  }
  /deep/ .van-dropdown-menu__title::after {
    position: absolute;
    top: 50%;
    right: -0.5rem;
    margin-top: -0.5rem;
    height: 1rem;
    width: 1rem;
    border: none;
    -webkit-transform: none;
    transform: none;
    opacity: 1;
    background: url("../../assets/jiantoux.png") no-repeat center;
    background-size: cover;
    content: "";
  }
  /deep/ .van-dropdown-menu__title--down::after {
    -webkit-transform: none;
    transform: none;
    background: url("../../assets/jiantoushang.png") no-repeat center;
    background-size: cover;
  }
  /deep/ .van-sidebar-item--select {
    border-color: #1989fa;
  }
  /deep/ .van-tree-select__item--active {
    color: #1989fa;
  }
  /deep/ .van-dropdown-menu__item:first-child::after {
    background-color: white;
  }
  .van-nav-bar {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
  .van-nav-bar__right {
    font-size: 0.85rem;
  }
  .box {
    // width: 17.55rem;
    // height: 5.3rem;
    height: 110px;
    margin: 6px auto;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
    border-radius: 0.3rem;
    // padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 0.7rem;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    .tig_m {
        display: block;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.6rem;
        color: #ffffff;
        background-color: #0091ff;
        padding: 0 0.25rem;
        position: absolute;
        bottom: 5px;
        right: 5px;
        border-radius: 0.15rem;
        z-index: 100;
      }
    .img {
      width: 6rem;
      height: 4rem;
      // background-color: red;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
      .tig {
        display: block;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.6rem;
        color: #ffffff;
        background-color: #0091ff;
        padding: 0 0.25rem;
        position: absolute;
        top: -0.35rem;
        left: -0.35rem;
        border-radius: 0.15rem;
      }
      .tig_blue {
        background-color: #0091ff;
      }
      .tig_red {
        background-color: #e02020;
      }
      .tig_yellow {
        background-color: #f7b500;
      }
      .tig_orange {
        background-color: #fa6400;
      }
      .tig_gray {
        background-color: #dddddd;
        color: #000;
      }
    }
    .box-text {
      width: 10.5rem;
      height: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 0.75rem;
      position: relative;
      .special {
        border: 0.05rem solid;
        padding: 0.05rem;
        font-size: 0.6rem;
        line-height: 0.6rem;
        display: inline-block;
        color: #4fad2a;
        border-radius: 0.15rem;
        margin-right: 0.25rem;
      }
      p {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.7rem;
        font-weight: 400;
      }
      span {
        color: #9fa7b3;
        font-size: 0.6rem;
        display: flex;
        align-items: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
        i {
          width: 9.5rem;
          margin-left: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .tigcard {
    // margin-top: 0.25rem;
    line-height: 2.3rem;
    margin: 6px auto;
    border-radius: 0.3rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 0.7rem;
    color: #969799;
    // box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.09);
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
}
</style>
