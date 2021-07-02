<template>
  <div id="container" class="coach-review">
    <!-- 头部开始 -->
    <!-- <van-nav-bar title="注册信息审核" left-arrow left-text="返回" @click-left="onClickLeft">
      <span class="check" slot="right" @click="onClickAudit">审核</span>
    </van-nav-bar>-->
    <!-- 头部结束 -->

    <!-- 头部选择展示开始 -->
    <div
      class="shade"
      v-show="tabStatus.region||tabStatus.date||tabStatus.status"
      @click="tabStatus.region = tabStatus.date = tabStatus.status = false"
    ></div>
    <div class="head">
      <div class="head-card">
        <p :class="{up:tabStatus.region}" @click="tab('region')">代表区县</p>
        <p :class="{up:tabStatus.date}" @click="tab('date')">注册时间</p>
        <p :class="{up:tabStatus.status}" @click="tab('status')">审核状态</p>
      </div>
      <div class="select" v-show="tabStatus.region||tabStatus.date||tabStatus.status">
        <ul :class="{region:tabStatus.region}">
          <van-tree-select
            :items="regionItems"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
            @click-item="selectRegion"
            @click-nav="selectLeft"
          />
        </ul>
        <ul :class="{date:tabStatus.date}">
          <li
            :class="{checkedDate:index===activeDate}"
            v-for="(item,index) in dateList"
            :key="index"
            @click="dateClick(index)"
          >{{item}}</li>
        </ul>
        <ul :class="{status:tabStatus.status}">
          <li
            :class="{checkedStatus:index===activeStatus}"
            v-for="(item,index) in statusList"
            :key="index"
            @click="statusClick(index)"
          >{{item}}</li>
        </ul>
        <!-- <div class="shade" @click="tabStatus.region = tabStatus.date = tabStatus.status = false"></div> -->
      </div>
    </div>
    <!-- 头部选择展示关闭 -->

    <!-- 列表展示开始 -->

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getAthleteList">
      <van-checkbox-group v-model="result" :max="1" class="list">
        <div class="list-card" v-for="(item,i) in list" :key="i">
          <strong>
            <van-checkbox
              :name="item.id"
              shape="square"
              :disabled="item.checkStatus==4||item.checkStatus==5?false:true"
            >
              <img
                class="check-icon"
                slot="icon"
                :src="result[0]===item.id ? activeIcon : inactiveIcon"
              />
            </van-checkbox>
            {{item.teenName}}
            <i v-html="check(item.checkStatus)"></i>
          </strong>
          <div @click="goDetail(i)">
            <p>注册点：{{item.teenRegiPlace}}</p>
            <p>代表区县：{{item.teenRepresentCity}}{{item.teenRepresentArea}}</p>
            <p>训练单位：{{item.teenTrainUnit}}</p>
            <p>
              身份证号：{{item.teenIdCard}}
              <span class="date">{{item.createTime}}</span>
            </p>
          </div>
        </div>
      </van-checkbox-group>
    </van-list>

    <!-- 列表展示结束 -->

    <!-- 遮罩开始 -->
    <div class="shade=box">
      <div></div>
    </div>
    <van-overlay :show="show" @click="show = false" />
    <!-- 遮罩结束 -->
    <!-- 弹窗 -->
    <div class="popup-window-top" v-show="show">
      <div class="title">
        <van-icon @click="closePopup" size="1rem" name="cross" />
        <p>共选中{{personNum}}人</p>
        <span>审核意见</span>
      </div>
      <div class="main">
        <textarea v-model="textareaText" placeholder="请输入审核意见"></textarea>
      </div>
    </div>

    <div class="popup-button" v-show="show">
      <button @click="passClick" :disabled="isCanClick">审核通过</button>
      <button @click="noPassClick" :disabled="isCanClick">审核不通过</button>
    </div>
    <!-- 弹窗结束 -->
    <div class="btn-warp">
      <button class="btn1" @click="onClickAudit">审核</button>
    </div>
  </div>
</template>


<script>
import { zlbFun } from "@/util/Tool";
import { mapGetters } from "vuex";
const noChecked = require("../../assets/yuyuexuanzhong.png");
const iconCheckde = require("../../assets/yueyue.png");
import { findRegion, athleteList, coachCheck } from "../../http/api";
export default {
  data() {
    return {
      result: [],
      loading: false,
      finished: false,
      isCanClick: false,
      statusCheck: "", //状态
      // city市   district区 checkStatus状态
      page: 1,
      city: "",
      district: {},
      checkStatus: "",
      recentTime: "",
      textareaText: "",
      personNum: 0, //选中人数
      regionItems: [
        {
          text: "全部",
          value: "",
          children: []
        }
      ],
      activeId: "",
      activeIndex: 0,
      activeIcon: noChecked, //选中图表
      inactiveIcon: iconCheckde, //默认图标
      activeDate: 0, //选中时间状态
      activeStatus: 0, //选中审核状态
      show: false, //遮罩
      tabStatus: {
        region: false, //代表地区
        date: false, //时间
        status: false //状态
      },
      dateList: ["全部", "近一周", "近一个月", "近半年", "近一年"],
      statusList: ["全部", "待审核", "审核通过", "审核不通过"],
      //status: 0待审核  1通过  -1不通过
      list: [],
      coachId: sessionStorage.getItem("coachId") //获取当前教练id
    };
  },
  computed: {
    ...mapGetters(["userMsg"])
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
    //审核状态
    check(status) {
      if (!status) return;
      let schedule = "";
      switch (Number(status)) {
        case 4:
          schedule = "待审核";
          break;
        case 5:
          schedule = "教练审核未通过";
          break;
        case 6:
          schedule = "区县/单位审核中";
          break;
        case 7:
          schedule = "区县审核未通过";
          break;
        case 8:
          schedule = "区县/单位审核中";
          break;
        case 9:
          schedule = "单位审核未通过";
          break;
        case 10:
          schedule = "市体育局审核中";
          break;
        case 11:
          schedule = "市体育局审核未通过";
          break;
        case 12:
          schedule = "省体育局审核中";
          break;
        case 13:
          schedule = "省体育局审核未通过";
          break;
        case 14:
          schedule = "省体育局确认通过";
          break;
        case 15:
          schedule = "市级驳回至区县";
          break;
        case 16:
          schedule = "省级驳回到市级";
          break;
      }
      if (/6|8|10|12|14|15|16/.test(status)) {
        return `<span class="ok">${schedule}</span>`;
      } else if (/5|7|9|11|13/.test(status)) {
        return `<span class="no">${schedule}</span>`;
      } else {
        return `<span>${schedule}</span>`;
      }
    },

    //页面跳转
    onClickLeft() {
      if (window.sessionStorage.getItem("fromindex") == 0) {
        this.$router.push("/oneself");
      } else {
        this.$router.push("/");
      }
    },

    //切换下拉
    tab: function(msg) {
      for (const key in this.tabStatus) {
        if (key !== msg) this.tabStatus[key] = false;
      }
      this.tabStatus[msg] = !this.tabStatus[msg];
    },

    //选中弹出
    onClickAudit: function() {
      const result = this.result;
      this.personNum = result.length;
      if (!result.length) {
        this.$toast("请选择审核人员");
      } else {
        this.show = true;
      }
    },

    //点击日期
    dateClick: function(index) {
      this.activeDate = index;
      this.tabStatus.date = false;
      if (index === 0) {
        this.recentTime = "";
      } else {
        this.recentTime = index;
      }
      this.page = 1;
      this.list = [];
      this.getAthleteList();
    },

    //点击审核
    statusClick: function(index) {
      this.activeStatus = index;
      this.tabStatus.status = false;
      if (index === 0) {
        this.checkStatus = "";
      } else {
        this.checkStatus = index - 1;
      }
      this.page = 1;
      this.list = [];
      this.getAthleteList();
    },

    //去详情页
    goDetail: function(i) {
      this.$router.push({
        path: "/checkDetail",
        query: {
          status: this.list[i].checkStatus,
          teenName: this.list[i].teenName,
          teenagerId: this.list[i].id
          // status: this.list[i].competitionCoachCheck.coachCheckStatus
        }
      });
    },

    //关闭弹窗
    closePopup() {
      this.show = false;
    },

    //点击区县
    selectRegion(data) {
      console.log(data);
      this.tabStatus.region = false;
      this.district = data;
      this.page = 1;
      this.list = [];
      this.city = "";
      if (data.text === "全部") {
        this.city = data.id;
        this.district.id = "";
      }
      this.getAthleteList();
    },

    //点击市
    selectLeft(data) {
      console.log(data);
      if (data === 0) {
        this.city = "";
        this.district.id = "";
        this.tabStatus.region = false;
        this.page = 1;
        this.list = [];
        this.getAthleteList();
      } else {
        this.city = data;
      }
    },

    //审核通过
    passClick() {
      this.isCanClick = true;
      setTimeout(() => {
        this.isCanClick = false;
      }, 2000);
      if (this.textareaText !== "") {
        coachCheck({
          coachId: this.coachId,
          teenagerId: this.result[0],
          coachCheckOpinion: this.textareaText,
          coachCheckStatus: 1
        }).then(res => {
          this.$toast(res.msg);
          this.result = [];
          this.show = false;
          this.page = 1;
          this.list = [];
          this.getAthleteList();
        });
      } else {
        this.isCanClick = false;
        this.$toast("请输入审核意见");
      }
    },

    //审核不通过
    noPassClick() {
      this.isCanClick = true;
      setTimeout(() => {
        this.isCanClick = false;
      }, 2000);
      if (this.textareaText !== "") {
        coachCheck({
          coachId: this.coachId,
          teenagerId: this.result[0],
          coachCheckOpinion: this.textareaText,
          coachCheckStatus: 2
        }).then(res => {
          this.$toast(res.msg);
          this.result = [];
          this.show = false;
          this.page = 1;
          this.list = [];
          this.getAthleteList();
        });
      } else {
        this.isCanClick = false;
        this.$toast("请输入审核意见");
      }
    },
    //获取列表数据
    getAthleteList() {
      const data = {
        zuserId: JSON.parse(this.userMsg).userId,
        city: this.city,
        district: this.district.id,
        checkStatus: this.checkStatus,
        recentTime: this.recentTime,
        page: this.page++,
        limit: 10
      };
      this.loading = true;
      athleteList(data).then(res => {
        this.loading = false;
        if (res.data && res.data.length) {
          this.finished = false;
          this.list = [...this.list, ...res.data];
        } else {
          this.finished = true;
        }
      });
    }
  },
  created() {
    zlbFun("注册信息审核");
    //市区初始化
    findRegion().then(res => {
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
      this.regionItems.forEach((item, index) => {
        if (index > 0) {
          item.children.unshift({ text: "全部", id: item.value });
        }
      });
      console.log(this.regionItems);
    });
  }
};
</script>


<style scoped lang="less">
.btn-warp {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
  font-size: 0.7rem;
  background-color: #f1f1f1;
  .btn1 {
    margin-bottom: 0.5rem;
    width: 90%;
    height: 2rem;
    background-color: #0091ff;
    color: #ffffff;
    border-radius: 0.2rem;
  }
}
/deep/#app {
  background: #e7e7e7;
}
//========================
.icon(@img, @h: 1rem, @w: 1rem) {
  content: "";
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
.icon-absolute(@img, @h: 1rem, @w: 1rem) {
  content: "";
  position: absolute;
  top: 50%;
  left: 1.25rem;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
  transform: translateY(-50%);
}
//========================
#container {
  .shade {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.507);
  }
  padding-top: 2.5rem;
  height: 100%;
  overflow-y: auto;
  background: #f1f1f1;
  .van-nav-bar .van-icon {
    color: #1989fa;
    vertical-align: middle;
  }
  .van-nav-bar {
    background-color: #ffffff;
    div {
      color: #323233;
    }
  }
  // .van-nav-bar {
  //   background-color: #0091ff;
  //   div,
  //   .van-icon,
  //   .van-nav-bar__text {
  //     color: white;
  //   }
  //   .check {
  //     display: inline-block;
  //     margin-left: 0.6rem;
  //   }
  // }

  //头部展示
  .head {
    background-color: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    .head-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      height: 2rem;
      border-bottom: 0.05rem solid #e7e7e7;
      font-size: 0.7rem;
      p {
        display: inline-flex;
        align-items: center;
        &::after {
          .icon("../../assets/down.png");
          margin-left: 0.2rem;
        }
        &.up::after {
          .icon("../../assets/up.png");
          margin-left: 0.2rem;
        }
      }
    }
  }

  //塞选
  .select {
    position: absolute;
    width: 100vw;
    z-index: 1;
    ul {
      position: relative;
      display: none;
      width: 100vw;
      background-color: white;
      z-index: 10;
    }
    .region {
      display: block;
      // height: 17.95rem;
      .van-tree-select__item--active {
        color: #1989fa;
      }
      .van-sidebar-item--select {
        border-color: #1989fa;
      }
      .van-overlay {
        background-color: rgba(0, 0, 0, 0.3);
      }
      .van-tree-select__item {
        font-weight: 400;
      }
      .van-icon-checked:before {
        content: "\F0C8";
      }
    }
    .date {
      font-size: 0.7rem;
      font-weight: 900;
      display: block;
      li {
        padding: 0.5rem;
        border-bottom: 0.05rem solid #e7e7e7;
      }
      li.checkedDate {
        position: relative;
        color: #0091ff;
        &::after {
          .icon("../../assets/xuanzhong.png");
          position: absolute;
          right: 1rem;
          top: 0.7rem;
        }
      }
      // height: 17.95rem;
    }
    .status {
      font-size: 0.7rem;
      font-weight: 900;
      display: block;
      li {
        padding: 0.5rem;
        border-bottom: 0.05rem solid #e7e7e7;
      }
      li.checkedStatus {
        position: relative;
        color: #0091ff;
        &::after {
          .icon("../../assets/xuanzhong.png");
          position: absolute;
          right: 1rem;
          top: 0.7rem;
        }
      }
      // height: 17.95rem;
    }
    // .shade {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   height: 100%;
    //   width: 100%;
    //   background-color: rgba(0, 0, 0, 0.507);
    // }
  }

  //list列表展示
  .list {
    // margin: 4.9rem 1rem 0.3rem 1rem;
    margin: 0.3rem 1rem 2.5rem 1rem;
    .list-card {
      position: relative;
      padding: 0.25rem 0.6rem 0.35rem 0.6rem;
      margin: 0.3rem 0;
      // height: 3.65rem;
      border-radius: 0.3rem;
      background-color: white;

      strong {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding-left: 1.3rem;
        height: 1.45rem;
        color: #353a41;
        font-size: 0.7rem;
        line-height: 1.45rem;
        .check-icon {
          width: 100%;
          height: 100%;
        }
        /deep/ i {
          span {
            color: #f7b500;
            font-size: 0.6rem;
            line-height: 0.6rem;
          }
          .ok {
            color: #6dd400;
          }
          .no {
            color: #fa6400;
          }
        }
      }
      p {
        color: #9fa7b3;
        font-size: 0.6rem;
        line-height: 0.85rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .date {
        float: right;
      }
    }
  }
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .popup-button {
    position: fixed;
    bottom: 1.25rem;
    z-index: 2;
    text-align: center;
    font-family: "PingFangSC-Medium,PingFangSC";
    button {
      font-size: 0.7rem;
      width: 16.8rem;
      height: 2.1rem;
      line-height: 2.1rem;
      border-radius: 0.2rem;
      background-color: #eaeef3;
    }
    button:nth-child(1) {
      margin-bottom: 0.6rem;
      background-color: #0091ff;
      color: #ffffff;
    }
  }
  .popup-window-top {
    position: fixed;
    top: 3rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 16.8rem;
    height: 18.75rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.6rem;
    .title {
      padding: 0.9rem 1.4rem 0.6rem 1.4rem;
      border-bottom: 0.05rem solid #eaeef3;
      font-size: 0.7rem;
      color: #a6b0bd;
      .van-icon {
        float: right;
      }
      p {
        font-size: 1rem;
        color: #333333;
        text-align: center;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        font-weight: 600;
      }
    }
    .main {
      text-align: center;
      textarea {
        font-size: 0.7rem;
        padding: 0.4rem;
        margin-top: 0.5rem;
        width: 14.8rem;
        height: 10.5rem;
        background: rgba(241, 241, 241, 1);
        border-radius: 4px;
      }
    }
  }
}
</style>
<style lang="less">
.van-checkbox__icon {
  width: 1.2rem;
  height: 1.2rem;
}
.van-checkbox {
  position: absolute;
  left: 0;
}
.coach-review {
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
