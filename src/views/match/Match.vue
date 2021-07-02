<template>
  <div id="home">
    <!-- 组件导航栏 -->
    <!-- <van-nav-bar title="赛事活动" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" @search="onSearch" />
    <!-- 轮播 -->
    <swiper id="swiper" :options="swiperOption" ref="mySwiper" v-if="goodVisibility">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in banner" :key="index">
        <!-- <img :src="item.filecoverUrl? item.filecoverUrl:img.url" @click="detailspage(item.id)" /> -->
        <img
          v-if="item.fileCoverUrl"
          :src="'http://223.4.72.248:10084/api-file/files-anon/download?fileID='+item.fileCoverUrl"
          @click="detailspage(item.id)"
        />
        <img v-else src="@/assets/zwltsy.jpg"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 赛事活动 -->
    <div class="activity">
      <div class="img">
        <img src="./images/activity.png" />
      </div>
      <div class="list">
        <ul>
          <li @click="$router.push({name: 'noticedetails',params:{id:item.id,aType:item.aType}})" v-for="(item,index) in screen" :key="index">
            {{item.title}}
          </li>
        </ul>
      </div>
      <div class="more" @click="$router.push({path: '/competition'})">查看更多</div>
    </div>
    <div class="space"></div>
    <!-- 赛事目录 -->
    <div class="catalog">
      <h1>赛事目录</h1>
      <van-tabs v-model="active" color="#1492FF">
        <van-tab :title="item | date1" v-for="(item,index) in list" :key="index">
          <ul>
            <li v-for="(item,i) in showlist[index]" :key="i" @click="detailspage(item.id,item.aType)">
              <span>
                <img
                  :src="'http://223.4.72.248:10084/api-file/files-anon/download?fileID='+item.fileCoverUrl"
                />
              </span>
              <p>{{item.actName}}</p>
              <i>报名时间:{{item.regStartTime |date}}-{{item.regEndTime |date}}</i>
              <i>开赛时间:{{item.startTime |date}}-{{item.endTime |date}}</i>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
      <div class="moreContent" @click="$router.push({path: '/catalog'})">
        更多
        <span>
          <img src="./images/arror-r.png" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
//swiper样式
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
//导入组件tabbar
import { zlbFun } from "@/util/Tool";
import {
  activities,
  eventlist,
  competitionList,
  eventlistbanner,
  userImg
} from "../../http/api";
export default {
  name: "Match",
  data() {
    return {
      value: "",
      active: 0,
      index: 1,
      num: 0,
      list: [],
      img: { url: require("./images/sport.jpg") },
      clickshowlist: [],
      goodVisibility: false,
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
      screen: [],
      eventlists: [],
      showlist: [],
      searchData: [], //搜索后的展示数据
      banner: [] //banner图的数据
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push({ path: "/" });
    },
    getItem(currentIndex) {
      // console.log(this.list.length)
      if (currentIndex >= this.list.length) {
        return;
      }
      eventlist({
        startTimes: this.list[currentIndex]
      }).then(res => {
        currentIndex++;
        // console.log(res)
        this.showlist.push(res.data);
        this.getItem(currentIndex);
      });
    },
    reqdata() {
      activities()
        .then(res => {
          this.screen = res.eventList.slice(0, 3);
        })
        .catch(err => {});
    },
    async reqevent() {
      function newArr(arr) {
        return Array.from(new Set(arr));
      }
      let currentIndex = 0;
      await eventlist()
        .then(res => {
          console.log(res.data);
          this.eventlists = res.data;
          this.eventlists.forEach(item => {
            this.list.push(item.startTime);
          });
          this.list = newArr(this.list).sort();
        })
        .catch(err => {});
      this.getItem(currentIndex);
      // console.log(this.showlist)
    },
    // 轮播图的数据
    reqbanner() {
      eventlistbanner({
        rotationStatus: 1
      })
        .then(res => {
          this.banner = res.data || [{}];
          // 处理swiper渲染动态数据时，不循环的方法
          this.goodVisibility = false;
          this.$nextTick(() => {
            this.goodVisibility = true;
          });
        })
        .catch(err => {});
    },
    screendata() {
      this.screen;
    },
    async onSearch() {
      await competitionList({
        actName: this.value
      }).then(res => {
        console.log(res);
        this.searchData = res.eventList;
        // console.log(this.searchData)
      });
      this.$router.push({
        path: "/searcha",
        query: { data: JSON.stringify(this.searchData), status: 1 }
      });
    },
    detailspage(id,type) {
      // this.$store.commit("getlist", id)
      this.$router.push({ path: "/details", query: { id: id ,aType: type} })
    }
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
  created() {
    zlbFun("赛事活动");
    this.reqdata();
    this.reqevent();
    // this.reqsearch()
    this.reqbanner();
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
  filters: {
    date: function(ol) {
      const dt = new Date(ol);

      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      return `${m}.${d}`;
    },
    date1: function(ol) {
      const dt = new Date(ol);

      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      return `${m}月${d}日`;
    }
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  // height: 100%;
  // background-color: #f6f8f7;
  .van-nav-bar {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
  .van-nav-bar__right {
    font-size: 0.85rem;
  }
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
  }
  // i{
  //   font-style: normal;
  // }
  .activity {
    width: 100%;
    height: 4.25rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    border-top: 1px solid #e7e7e7;
    .img {
      width: 3.5rem;
      padding-top: 0.85rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .list {
      font-size: 0.65rem;
      ul li {
        width: 11.5rem;
        margin-top: 0.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          color: #1492ff;
        }
      }
    }
    .more {
      margin-left: 0.25rem;
      width: 3.5rem;
      height: 2.35rem;
      line-height: 2.35rem;
      text-align: center;
      font-size: 0.6rem;
      color: #666666;
      border-left: 0.1rem solid #e7e7e7;
    }
  }
  .space {
    width: 100%;
    height: 0.4rem;
    background-color: #f6f8f7;
  }
  .catalog {
    width: 100%;
    height: 13.5rem;
    background-color: #ffffff;
    position: relative;
    h1 {
      font-size: 0.9rem;
      font-weight: 500;
      margin-left: 0.5rem;
      padding-top: 0.6rem;
    }
    ul {
      overflow-x: scroll;
      white-space: nowrap;
      li {
        display: inline-block;
        box-sizing: border-box;
        width: 6.5rem;
        // height: 8.25rem;
        margin: 0.5rem;
        margin-right: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
        padding-bottom: 0.4rem;
        span {
          display: block;
          width: 6rem;
          height: 4rem;
          // background-color: red;
          border-radius: 0.25rem;
          margin: 0.3rem auto;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.25rem;
          }
        }
        p {
          // width: 5.5rem;
          // height: 1.6rem;
          font-size: 0.65rem;
          margin: 0 auto;
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 2;
          margin-top: 0.3rem;
          padding: 0 0.25rem;
          margin-bottom: 0.3rem;
        }
        i {
          display: block;
          // width: 5.5rem;
          font-size: 0.6rem;
          color: #999999;
          margin: 0 auto;
          margin-bottom: 0.1rem;
          padding: 0 0.25rem;
        }
      }
    }
    .moreContent {
      position: absolute;
      width: 2.5rem;
      height: 1.8rem;
      text-align: center;
      line-height: 1.9rem;
      top: 0.2rem;
      right: 0;
      font-size: 0.6rem;
      color: #666666;
      z-index: 999;
      background-color: transparent;
      img {
        width: 0.25rem;
        height: 0.45rem;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
<style>
[class*="van-hairline"]::after {
  border: none;
}
</style>
