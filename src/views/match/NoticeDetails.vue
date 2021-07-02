<template>
  <div id="home">
    <Tabar title="公告详情"></Tabar>
    <div class="text" v-show="showtext">
      <p>{{detailist.title}}</p>
      <i>发布时间：{{detailist.createTime | dateFormat}}</i>
      <div class="mess" v-if="this.aType == 1">赛事名称：{{detailist.actName}}</div>
      <div class="mess" v-else>赛事名称：{{detailist.title}}</div>
      <div
        class="mess"
      >赛事时间：{{detailist.startTime | dateFormat}} 至 {{detailist.endTime | dateFormat}}</div>
      <!-- <div class="mess bottom">赛事地点：{{detailist.actAddress}}</div>
      <p class="title" v-show="detailist.actContent?true:false">赛事内容（项目）:</p>
      <div
        class="content"
        v-show="detailist.actContent?true:false"
      >{{detailist.actContent}}</div>-->
      <div v-if="aType==1" class="mess bottom">赛事地点：{{detailist.actAddress}}</div>
      <div v-else class="mess bottom">赛事地点：{{detailist.actAddress}}</div>
      <p v-if="aType==1" class="title" v-show="detailist.actContent?true:false">赛事内容（项目）:</p>
      <div
        v-if="aType==1"
        class="content"
        v-show="detailist.actContent?true:false"
      >{{detailist.actContent}}</div>
      <p v-if="aType==2" class="title" v-show="detailist.itemName?true:false">赛事内容（项目）:</p>
      <div
        v-if="aType==2"
        class="content"
        v-show="detailist.itemName?true:false"
      >{{detailist.itemName}}</div>
      <p class="title">赛事简介 :</p>
      <div class="content">{{detailist.actIntroduction}}</div>
      <div class="content-main">
        <span>主办单位：{{detailist.sponsor}}</span>
        <br />
        <span>承办单位：{{detailist.organizer}}</span>
        <br />
        <span v-if="detailist.coOrganizer?true:false">协办单位： {{detailist.coOrganizer}}</span>
      </div>
      <p class="title">参赛条件 :</p>
      <div class="content" v-html="content"></div>
      <p class="title">奖惩方法 :</p>
      <div class="content" v-html="condition"></div>
      <p class="title" v-show="filelist.length > 0">赛事规程 :</p>
      <div class="down" v-show="filelist.length > 0">点击图片下载</div>
      <div class="box">
        <a v-for="(item,index) in filelist" :key="index" :href="item.url" target="_blank">
          <img src="./images/pdf.png" alt />
          <p>{{item.name}}</p>
        </a>
      </div>
      <div class="people">发布人:{{detailist.issuer}}</div>
      <div class="tig">注：以上发布内容由发布人承担责任</div>
    </div>
  </div>
</template>
<script>
import { actdetails } from "@/http/api";
import Tabar from "../../components/Tabar";
export default {
  data() {
    return {
      aType: "",
      id: this.$route.query.id,
      detailist: [],
      filelist: [],
      content: "",
      condition: "",
      login: true,
      showtext: false
    };
  },
  components: { Tabar },
  methods: {
    reqdetails() {
      actdetails({
        id: this.id
      })
        .then(res => {
          if (res.code == 0) {
            this.login = false;
            this.showtext = true;
            this.detailist = res.data[0].movementActivityAnnouncementBean;
            this.content = this.detailist.eligibility.replace(/\n/g, "<br/>");
            this.condition = this.detailist.rewardsAndPunishments.replace(
              /\n/g,
              "<br/>"
            );
            this.filelist = res.data[0].fileList;
            console.log(filelist)

          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.aType = this.$route.query.aType;
    console.log(this.aType)
    if (this.aType && this.aType == 1) {
      this.login = false;
      this.showtext = true;
      this.detailist = JSON.parse(sessionStorage.getItem("datadetails"));
      this.content = this.detailist.actEntryConditions.replace(/\n/g, "<br/>");
      this.condition = this.detailist.actRewPub.replace(/\n/g, "<br/>");
      this.filelist = this.detailist.fileList;
    } else {
      this.reqdetails();
    }
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #f6f8f7;
  .text {
    padding: 1.05rem 0.5rem 0 0.65rem;
    background-color: #fff;
    p {
      font-size: 0.9rem;
      color: #000000;
      font-weight: 700;
    }
    i {
      display: inline-block;
      font-size: 0.6rem;
      color: #999999;
      margin-bottom: 0.4rem;
    }
    .mess {
      font-size: 0.65rem;
      color: #333333;
      margin-bottom: 0.2rem;
    }
    .bottom {
      margin-bottom: 0.5rem;
    }
    h1 {
      font-size: 0.9rem;
    }
    .title {
      font-size: 0.75rem;
      margin-bottom: 0.2rem;
      margin-top: 0.2rem;
    }
    .content {
      font-size: 0.7rem;
      color: #444444;
      line-height: 1.25rem;
      // text-indent: 1.2rem;
    }
    .content-main {
      color: #333333;
      padding-left: 1.2rem;
      font-size: 0.7rem;
      line-height: 1.25rem;
    }
    .down {
      font-size: 0.7rem;
      color: #999999;
    }
    .box {
      margin-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      a {
        display: flex;
        width: 5.5rem;
        height: 3.5rem;
        background-color: #e7f4ff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.25rem;
        margin-right: 0.25rem;
        padding: 0 0.5rem;
        img {
          width: 1.75rem;
          height: 1.75rem;
        }
        p {
          font-size: 0.3rem;
          color: #333333;
          text-align: center;
          margin-top: 0.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
        }
      }
    }
    .people {
      font-size: 0.65rem;
      color: #000000;
      font-weight: 700;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      margin-left: 1rem;
    }
    .tig {
      font-size: 0.6rem;
      color: #999999;
      margin-bottom: 1rem;
      margin-left: 1rem;
    }
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
