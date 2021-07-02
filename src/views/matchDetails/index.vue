<template>
  <div class="detail-wrap">
    <!-- <Tabar :title="title"></Tabar> -->
    <!-- <van-nav-bar title="比赛详情" left-text="返回" @click-left="onClickLeft" left-arrow></van-nav-bar> -->
    <div class="banner">
      <img
        v-if="img"
        :src="'http://223.4.72.248:10084/api-file/files-anon/download?fileID='+img[0].id"
        alt
      />
      <img style="width:100%;" v-else src="../../assets/zwltsy.jpg" alt />
    </div>
    <div class="info">
      <h1>{{obj.name}}</h1>
      <!-- <p class="type">{{obj.itemName}}</p> -->
      <p class="adress icon">{{obj.address}}</p>
      <p class="match-time icon">赛事时间：{{obj.startTime | renderTime}}-{{obj.endTime | renderTime}}</p>
    </div>
    <div class="match-indroduce">
      <div class="title">赛事简介</div>
      <div class="content">{{obj.introduction}}</div>
    </div>
    <div class="match-hold">
      <div class="title">赛事主办</div>
      <div class="content">{{obj.sponsor}}</div>
    </div>
    <div class="match-undertake">
      <div class="title">赛事承办</div>
      <div class="content">{{obj.organizer}}</div>
    </div>
    <div class="match-assisting">
      <div class="title">赛事协办</div>
      <div class="content">{{obj.coSponsor}}</div>
    </div>
    <div class="match-rules" v-if="fileList">
      <div class="title">竞赛规程</div>
      <div class="content">
        <a
          v-for="(item,index) in fileList"
          :key="index"
          :href="'http://223.4.72.248:10084/api-file/files-anon/download?fileID='+item.id"
          :download="item.name"
        >{{item.name}}</a>
      </div>
    </div>
    <div class="match-publish">
      <div class="title">发布人</div>
      <div class="content">{{obj.publisher}}</div>
    </div>
    <div v-show="isApply" class="sign-up">
      <button class="sign-up-btn" @click="join">参加报名</button>
    </div>
  </div>
</template>

<script>
import { findAnnouncementById, getEventInfobyId } from "../../http/api";
import { renderTime } from "@/util/Tool";
import { zlbFun } from "@/util/Tool";
export default {
  name: "",
  data() {
    return {
      isApply: true,
      obj: {},
      fileList: [],
      img: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    join() {
      window.sessionStorage.removeItem("indexarr");
      this.$router.push({
        path: "/signupInformtion",
        query: { eventId: this.obj.id }
      });
    }
  },
  created() {
    zlbFun("比赛详情");
    getEventInfobyId({ eventId: this.$route.query.id }).then(res => {
      this.img = res.fileImgList;
      this.fileList = res.fileList;
      this.obj = res.eventInfo;
      if (res.eventInfo.isApply == 1 && res.eventInfo.eventStatus == 1) {
        this.isApply = true;
      } else {
        this.isApply = false;
      }
    });
  },
  filters: {
    renderTime
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
// .van-nav-bar {
//   // background-color: #0091ff;
//   div,
//   .van-icon,
//   .van-nav-bar__text {
//     color: #333333;
//   }
//   .check {
//     display: inline-block;
//     margin-left: 0.6rem;
//   }
// }
.detail-wrap {
  background-color: #f6f8f7;
  & > div:first-child {
    margin-bottom: 0;
  }
  & > div {
    // margin-bottom: 8px;
  }
  .banner {
    width: 100%;
    height: 200px;
    margin-bottom: 0;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    padding: 16px 0 10px 20px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    border-bottom: 1px solid #e7e7e7;
    background-color: #fff;
  }
  .content {
    padding: 16px 20px 18px 20px;
    background-color: #fff;
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 19px;
  }
  .info {
    margin-bottom: 8px;
    padding: 20px 10px 8px 20px;
    background-color: #fff;
    h1 {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 16px;
    }
    p {
      margin-bottom: 12px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 12px;
    }
    .icon {
      position: relative;
      padding-left: 23px;
      line-height: 15px;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 15px;
        height: 15px;
        content: "";
      }
    }
    .adress.icon::before {
      background: url("../../assets/adress@2x.png") no-repeat center;
      background-size: cover;
    }
    .match-time.icon::before {
      background: url("../../assets/time@2x.png") no-repeat center;
      background-size: cover;
    }
  }
  .sign-up {
    margin-bottom: 0;
    .sign-up-btn {
      width: 100%;
      height: 40px;
      font-size: 14px;
      background: rgba(0, 145, 255, 1);
      color: #fff;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
