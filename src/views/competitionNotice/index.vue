<template>
  <div id="container" class="coach-review">
    <!-- 头部开始 -->
    <van-nav-bar title="赛事公告" left-arrow @click-left="onClickLeft">
      <!-- <span class="check" slot="right">审核</span> -->
    </van-nav-bar>
    <!-- 头部结束 -->
    <!-- 头部选择展示开始 -->
    <div class="head">
      <div class="head-card">
        <p :class="{up:tabStatus.region}" @click="tab('region')">归属地区</p>
        <p :class="{up:tabStatus.date}" @click="tab('date')">赛事时间</p>
        <p :class="{up:tabStatus.project}" @click="tab('project')">赛事项目</p>
        <p :class="{up:tabStatus.type}" @click="tab('type')">赛事类型</p>
      </div>
      <div
        class="select"
        v-show="tabStatus.region||tabStatus.date||tabStatus.project||tabStatus.type"
      >
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

        <ul :class="{project:tabStatus.project}">
          <li
            :class="{checkedStatus:index===activeProject}"
            v-for="(item,index) in projectList"
            :key="index"
            @click="projectClick(item,index)"
          >{{item.itemName}}</li>
        </ul>

        <ul :class="{type:tabStatus.type}">
          <li
            :class="{typeStatus:index===activeType}"
            v-for="(item,index) in typeList"
            :key="index"
            @click="typeClick(index)"
          >{{item.itemName}}</li>
        </ul>
        <div
          class="shade"
          @click="tabStatus.region = tabStatus.date = tabStatus.project = tabStatus.type = false"
        ></div>
      </div>
    </div>
    <!-- 头部选择展示关闭 -->

    <!-- 列表展示开始 -->
    <!-- <van-pull-refresh v-model="isDownLoading">
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        :immediate-check="false"
        :offset="10"
        finished-text
    >-->
    <ul class="list">
      <li
        class="list-card"
        v-for="(item,index) in findAnnouncementByCondition"
        :key="index"
        @click="goDetail(item)"
      >
        <div
          :class="{'img-box':true,'img-gf':item.comType==1,'img-xh':item.comType==2,'img-sh':item.comType==3}"
        >
          <img class="gf-icon" src="../../assets/156051040397.jpg" alt />
        </div>
        <div class="text-box">
          <p>{{item.comIntroduction}}</p>
          <span>{{item.itemName}}</span>
          <p class="commont-p">{{item.startTime |dateSlice}}-{{item.endTime |dateSlice}}</p>
          <p class="commont-p last-icon">{{item.area}}</p>
        </div>
      </li>
    </ul>
    <!-- </van-list>
    </van-pull-refresh>-->
    <!-- 列表展示结束 -->
    <!-- 遮罩开始 -->
    <div class="shade=box">
      <div></div>
    </div>
    <van-overlay :show="show" @click="show = false" />
    <!-- 遮罩结束 -->
  </div>
</template>


<script>
import {
  findRegion,
  selectItem,
  findAnnouncementByCondition
} from "../../http/api";
export default {
  data() {
    return {
      // nullTip: "空空如也~",
      // pageSize: 6, // 每页条数
      // pageIndex: 1, // 页码
      // isDownLoading: false, // 下拉刷新
      // isUpLoading: false, // 上拉加载
      // upFinished: false, // 上拉加载完毕
      // offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      // city市   district区 checkStatus状态
      city: "",
      district: "",
      regionItems: [
        {
          text: "全部",
          value: "",
          children: []
        }
      ],
      itemId: "", //赛事项目id
      comStartTime: "", //筛选时间
      comType: "", //筛选类型
      activeId: "",
      activeIndex: 0,
      activeDate: 0, //选中时间状态
      activeProject: 0, //选中审核状态
      activeType: 0,
      show: false, //遮罩
      tabStatus: {
        region: false,
        date: false,
        project: false,
        type: false
      },
      findAnnouncementByCondition: [],
      dateList: ["全部", "近三天", "近七天", "近一个月", "近半年", "近一年"],
      projectList: [{ itemName: "全部", id: "" }],
      typeList: [
        { itemName: "全部", id: "" },
        { itemName: "官方", id: "1" },
        { itemName: "协会", id: "2" },
        { itemName: "社会", id: "3" }
      ]
    };
  },
  filters: {
    dateSlice: function(value) {
      return value.slice(0, 10);
    }
  },
  methods: {
    onClickLeft(){
      this.$router.back();
    },
    tab: function(msg) {
      for (const key in this.tabStatus) {
        if (key !== msg) this.tabStatus[key] = false;
      }
      this.tabStatus[msg] = !this.tabStatus[msg];
    },
    //点击日期
    dateClick: function(index) {
      this.activeDate = index;
      this.tabStatus.date = false;
      if (index === 0) {
        this.comStartTime = "";
      } else {
        this.comStartTime = index;
      }
      this.getFindAnnouncementByCondition();
    },
    //点击项目
    projectClick: function(item, index) {
      this.activeProject = index;
      this.tabStatus.project = false;
      if (index === 0) {
        this.itemId = "";
      } else {
        this.itemId = item.id;
      }
      this.getFindAnnouncementByCondition();
    },
    //点击类型
    typeClick: function(index) {
      this.activeType = index;
      this.tabStatus.type = false;
      if (index === 0) {
        this.comType = "";
      } else {
        this.comType = index;
      }
      this.getFindAnnouncementByCondition();
    },
    //关闭弹窗
    closePopup() {
      this.show = false;
    },
    //点击区县
    selectRegion(data) {
      this.tabStatus.region = false;
      this.district = data.id;
      this.getFindAnnouncementByCondition();
    },
    //点击市
    selectLeft(data) {
      console.log(data);
      if (data === 0) {
        this.city = "";
        this.tabStatus.region = false;
        this.getFindAnnouncementByCondition();
      } else {
        this.city = data;
      }
    },
    //赛事公告
    getFindAnnouncementByCondition() {
      let data = {};
      if (this.city === "") {
        data = {
          city: this.city,
          itemId: this.itemId,
          comType: this.comType,
          comStartTime: this.comStartTime
        };
      } else {
        data = {
          district: this.district,
          itemId: this.itemId,
          comType: this.comType,
          comStartTime: this.comStartTime
        };
      }
      console.log(data);
      findAnnouncementByCondition(data).then(res => {
        if (res.data.length != 0) {
          this.findAnnouncementByCondition = res.data;
        } else {
          this.$toast("暂无数据");
          this.findAnnouncementByCondition = res.data;
        }
      });
    },
    //去详情
    goDetail(item) {
      console.log(item);
      this.$router.push({ path: "/matchDetails", query: { id: item.id } });
    }
  },
  created() {
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
    //获取项目
    selectItem().then(res => {
      res.data.forEach(item => {
        this.projectList.push(item);
      });
    });

    this.getFindAnnouncementByCondition();
  },
  mounted: function() {
    //地图高度
    let head =
        document.getElementsByClassName("head-card")[0].clientHeight ||
        o.offsetHeight,
      nav =
        document.getElementsByClassName("van-nav-bar")[0].clientHeight ||
        o.offsetHeight,
      mapHeight = document.body.clientHeight - head - nav;
    document.getElementsByClassName("select")[0].style.height =
      mapHeight + "px";
  }
};
</script>
<style scoped lang="less">
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
  padding-top: 4.5rem;
  .van-nav-bar {
    background-color: #0091ff;
    div,
    .van-icon,
    .van-nav-bar__text {
      color: white;
    }
    .check {
      display: inline-block;
      margin-left: 0.6rem;
    }
  }
  //头部展示
  .head {
    background-color: white;
    position: fixed;
    top: 46px;
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
        font-size: 0.65rem;
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

  //筛选
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
    .project {
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
    .type {
      font-size: 0.7rem;
      font-weight: 900;
      display: block;
      li {
        padding: 0.5rem;
        border-bottom: 0.05rem solid #e7e7e7;
      }
      li.typeStatus {
        position: relative;
        color: #0091ff;
        &::after {
          .icon("../../assets/xuanzhong.png");
          position: absolute;
          right: 1rem;
          top: 0.7rem;
        }
      }
    }
    .shade {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.507);
    }
  }
  //list列表展示
  .list {
    margin: 0.3rem 0;
    .list-card {
      display: flex;
      padding: 0.8rem 0.7rem;
      border-radius: 0.3rem;
      background-color: #ffffff;
      margin-bottom: 0.2rem;
      .img-box > img {
        display: block;
        width: 6rem;
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
          color: rgb(104, 119, 141);
        }
        .commont-p::after {
          position: absolute;
          left: 0;
          content: "";
          display: inline-block;
          height: 0.75rem;
          width: 0.75rem;
          background: url("../../assets/time@2x.png") no-repeat center;
          background-size: 100%;
        }
        .last-icon::after {
          position: absolute;
          left: 0;
          content: "";
          display: inline-block;
          height: 0.75rem;
          width: 0.75rem;
          background: url("../../assets/adress@2x.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.5);
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
