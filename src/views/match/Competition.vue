<template>
  <div id="home">
    <van-nav-bar title="赛事活动公告" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-search placeholder="请输入搜索关键词" v-model="searchvalue" shape="round" @search="Search" />
    <!-- 搜索的内容 -->
    <van-dropdown-menu>
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
        :title="titlelevel"
        v-model="value1"
        :options="option1"
        @change="changeindex"
      />
      <van-dropdown-item
        :title="titleitem"
        v-model="value2"
        :options="option2"
        @change="changeItem"
      />
    </van-dropdown-menu>
    <ul class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        :offset="10"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoadList"
        :immediate-check="false"
      >
        <li
          class="list-card"
          v-for="(item,index) in eventlist"
          :key="index"
          @click="$router.push({path: '/noticedetails',query:{id:item.id,aType:item.aType}})"
        >
          <div :class="{'img-box':true}">
            <img class="gf-icon" :src="item.imgUrl" v-if="item.imgUrl" />
            <img class="gf-icon" v-else src="../../assets/zwltsy.jpg" alt />
          </div>
          <div class="text-box">
            <p>{{item.title}}</p>
            <p v-if="item.sponsor" class="commont-p icon-sponsor">{{item.sponsor}}</p>
            <p class="commont-p icon-time">{{item.startTime|dateSlice}}-{{item.endTime|dateSlice}}</p>
            <p class="commont-p last-icon">{{item.actAddress}}</p>
          </div>
        </li>
      </van-list>
    </ul>
    <div class="login-map" v-show="login">
      <div class="login">
        <van-loading />
      </div>
    </div>
  </div>
</template>

<script>
import { activities, findRegionArea, selectItem } from "@/http/api";
import { zlbFun } from "@/util/Tool";
export default {
  data() {
    return {
      login: true,
      pageSize: 10, // 每页条数
      pageIndex: 0, // 页码
      loading: false,
      error: false,
      finished: false,
      count: 0,
      titlearea: "归属区域",
      titlelevel: "赛事级别",
      titleitem: "赛事项目",
      searchvalue: null,
      eventlist: [],
      value: null,
      // 下拉菜单
      level: null, //赛事级别
      project: null, //赛事项目
      activeId: 1,
      activeIndex: 0,
      value1: 0, //赛事级别
      option1: [
        { text: "全部", value: 0 },
        { text: "区县级", value: 1 },
        { text: "市级", value: 2 },
        { text: " 省级", value: 3 },
        { text: " 全国级", value: 4 },
        { text: " 国际级", value: 5 }
      ], //赛事级别数组
      value2: "", //赛事项目
      option2: [{ text: "全部", value: "0" }], //赛事项目数组
      currentDate: new Date(),
      startTime: null, //赛事时间
      minDate: new Date(2018, 0, 1),
      area: null, //赛事地点
      regionItems: [
        {
          text: "全部",
          value: "",
          children: []
        }
      ]
    };
  },
  filters: {
    dateSlice: function(date) {
      let dt = date.slice(0, 10);
      return dt.replace(/-/g, "/");
    }
  },
  methods: {
    onLoadList() {
      this.pageIndex++;
      this.reqdata();
    },
    Search() {
      this.eventlist = [];
      this.pageIndex = 0;
      this.startTime = null;
      this.area = null;
      this.project = null;
      this.level = null;
      this.titlearea = "归属地区";
      this.titlelevel = "赛事级别";
      this.titleitem = "赛事项目";
      this.onLoadList();
    },
    changeindex() {
      console.log(this.value1);
      if (this.value1 == 0) {
        this.level = null;
        this.titlelevel = "赛事级别";
      } else {
        this.level = this.value1 - 1;
        this.titlelevel = this.option1[this.value1].text;
      }
      this.pageIndex = 0;
      this.eventlist = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    changeItem() {
      if (this.value2 == 0) {
        this.project = null;
        this.titleitem = "赛事项目";
      } else {
        this.project = this.value2;
        this.titleitem = this.option2.filter(item =>
          String(item.value).match(this.value2)
        )[0].text;
      }
      this.pageIndex = 0;
      this.eventlist = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    onConfirmcancel() {
      this.startTime = null;
      this.pageIndex = 0;
      this.eventlist = [];
      this.searchvalue = "";
      this.onLoadList();
      this.$refs.item.toggle();
    },
    //点击区县
    selectRegion(data) {
      this.titlearea = data.text;
      console.log(data.id);
      this.area = data.id;
      this.$refs.area.toggle();
      this.pageIndex = 0;
      this.eventlist = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    //点击市
    selectLeft(data) {
      console.log(data);
      if (data === 0) {
        this.titlearea = "归属地区";
        this.$refs.area.toggle();
        this.area = null;
        this.pageIndex = 0;
        this.eventlist = [];
        this.searchvalue = "";
        this.onLoadList();
      }
    },
    onConfirm() {
      console.log(this.currentDate);
      this.startTime = this.datatime(this.currentDate);
      this.$refs.item.toggle();
      this.pageIndex = 0;
      this.eventlist = [];
      this.searchvalue = "";
      this.onLoadList();
    },
    getArea() {
      findRegionArea().then(res => {
        // console.log(res)
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
    getSelectItem() {
      selectItem().then(res => {
        // console.log(res)
        res.data.forEach(item => {
          this.option2.push({
            text: item.dataName,
            value: item.dataValue
          });
        });
      });
    },
    //时间格式化
    datatime(ol) {
      console.log(ol);
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
    reqdata() {
      activities({
        startTime1: this.startTime,
        district: this.area,
        level: this.level,
        itemId: this.project,
        page: this.pageIndex,
        limit: this.pageSize,
        title: this.searchvalue
      })
        .then(res => {
          this.login = false;
          // console.log(res.count)
          if (res.code != 0) return;
          if (res.eventList && res.eventList.length) {
            this.eventlist = [...this.eventlist, ...res.eventList];
            // console.log(this.eventlist)
          } else {
            this.eventlist = [];
          }
          // 加载状态结束
          this.loading = false;
          this.finished = false;
          // 数据全部加载完成
          if (this.eventlist.length >= res.count) {
            this.finished = true;
          }
        })
        .catch(err => {});
    },
    onClickLeft() {
      this.$router.push({ path: "/match" });
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
    this.onLoadList();
    zlbFun("赛事公告");
    this.getArea();
    this.getSelectItem();
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #fff;
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
  .list {
    margin: 0.3rem 0;
    .list-card {
      display: flex;
      padding: 0.8rem 0.7rem;
      border-radius: 0.3rem;
      background-color: #ffffff;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
      margin-bottom: 0.2rem;
      .img-box > img {
        display: block;
        border-radius: 0.2rem;
        width: 6rem;
        height: 4rem;
      }
      .img-box {
        position: relative;
      }
      .img-gf.img-box::before {
        position: absolute;
        top: -0.4rem;
        left: -0.4rem;
        content: "";
        display: inline-block;
        height: 1rem;
        width: 2rem;
        background: url("../../assets/gf.png") no-repeat center;
        background-size: 100%;
      }
      .img-xh.img-box::before {
        position: absolute;
        top: -0.4rem;
        left: -0.4rem;
        content: "";
        display: inline-block;
        height: 1rem;
        width: 2rem;
        background: url("../../assets/xh.png") no-repeat center;
        background-size: 100%;
      }
      .img-sh.img-box::before {
        position: absolute;
        top: -0.4rem;
        left: -0.4rem;
        content: "";
        display: inline-block;
        height: 1rem;
        width: 2rem;
        background: url("../../assets/sh.png") no-repeat center;
        background-size: 100%;
      }
      .text-box {
        font-size: 0.6rem;
        padding-left: 0.6rem;
        color: #9fa7b3;
        & > span {
          line-height: 0.8rem;
        }
        p {
          font-weight: 400;
          line-height: 1rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          color: #353a41;
          font-size: 0.7rem;
        }
        p:nth-child(1) {
          margin-bottom: 0.4rem;
        }
        .commont-p {
          position: relative;
          padding-left: 1rem;
          font-size: 0.6rem;
          line-height: 0.8rem;
          height: 0.8rem;
          color: #9fa7b3;
        }
        .icon-sponsor::after {
          position: absolute;
          left: 0;
          content: "";
          display: inline-block;
          height: 0.6rem;
          width: 0.6rem;
          background: url("../../assets/spor.png") no-repeat center;
          background-size: 100%;
        }
        .icon-time::after {
          position: absolute;
          left: 0;
          content: "";
          display: inline-block;
          height: 0.6rem;
          width: 0.6rem;
          background: url("../../assets/time.png") no-repeat center;
          background-size: 100%;
        }
        .last-icon::after {
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          display: inline-block;
          height: 0.6rem;
          width: 0.6rem;
          background: url("../../assets/address.png") no-repeat center;
          background-size: 100%;
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
