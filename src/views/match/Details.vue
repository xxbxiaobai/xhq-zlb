<template>
  <div id="home">
    <van-nav-bar title="报名详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="banner" ref="banner_con">
          <span v-if="Status==0" class="tig tig_blue">未开始</span>
          <span v-if="Status==1" class="tig tig_red">报名中</span>
          <span v-if="Status==2" class="tig tig_yellow">报名截止</span>
          <span v-if="Status==3" class="tig tig_orange">比赛中</span>
          <span v-if="Status==4" class="tig tig_gray">已结束</span>
    </div>
    <div class="notice">
      <p>{{grouplists.actName}}</p>
      <div class="line"></div>
      <div class="item1">
        <span>报名时间</span>
        {{grouplists.regStartTime}} 至 {{grouplists.regEndTime}}
      </div>
      <div class="item1">
        <span>赛事地点</span>
        {{grouplists.actAddress}}
      </div>
      <div class="item1">
        <span>赛事时间</span>
        {{grouplists.startTime}} 至 {{grouplists.endTime}}
      </div>
    </div>
    <div class="number">
      <div class="num_all">
        <span v-if="grouplists.id==66||grouplists.id==64">100</span>
        <span v-else>{{num}}</span>
        <p>已报名</p>
      </div>
      <div class="num_all">
        <span>{{grouplists.totalNum}}</span>
        <p>总人数</p>
      </div>
    </div>
    <div class="address">
      <p>举办单位</p>
      <div class="line"></div>
      <div class="item2">
        <span>主办方</span>
        &nbsp;&nbsp;
        {{grouplists.contractor}}
      </div>
      <div class="item2">
        <span>承办方</span>
        &nbsp;&nbsp;
        {{grouplists.organizer}}
      </div>
      <div class="item2" v-show="grouplists.coSponsor?true:false">
        <span>协办方</span>
        {{grouplists.coSponsor}}
      </div>
    </div>
    <div class="details">
      <p>赛事详情</p>
      <div class="line"></div>
      <p class="text">{{grouplists.actIntroduce}}</p>
    </div>
    <div class="rules">
      <span>详细赛事规则见赛事公告</span>
      <div
        class="btn"
        @click="$router.push({path: '/noticedetails',query:{id:$route.query.id,aType:$route.query.aType}})"
      >
        <img src="./images/look.png" />
        <span>去查看</span>
      </div>
    </div>
    <div class="bottom" v-if="grouplists.isApply == 1">
      <button
        @click="$router.push({path: '/team',query:{id:id,healthid:grouplists.actHeathReport,startTime:grouplists.startTime}})"
        v-show="grouplists.actApplyWay==1||grouplists.actApplyWay==2"
        :class="{}"
      >团体报名</button>
      <button
        v-show="grouplists.actApplyWay==0||grouplists.actApplyWay==2"
        @click="$router.push({name: 'personal',params:{id:id}})"
        :class="{}"
      >个人报名</button>
    </div>
    <div class="bottom" v-else-if="grouplists.isApply == 2||num==grouplists.totalNum">
      <button class="beforeapply">已满员</button>
    </div>
    <div class="bottom" v-else-if="grouplists.isApply == 0">
      <button class="beforeapply">报名未开始</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar";
import { zlbFun } from "@/util/Tool";
import { details } from "@/http/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      originPath:'', //判断是否是首页跳转
      title1: "报名详情",
      img1: { url: require("../../assets/507.png") },
      aType: null,
      show: null,
      grouplists: "",
      num: null,
      id: "",
      Status:''
    };
  },
  components: { Tabar },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(from.path == '/catalog'){
        vm.originPath = 'y'
      }else{
        vm.originPath = ''
      }
    });
  },
  methods: {
    onClickLeft() {
      // if(this.originPath){
        this.$router.go(-1);
      // }else{
      //   window.location.href = "sxty://back"
      //   // this.$router.go(-1);
      //   this.$router.push('/')
      // }
    },
    getdata() {
      details({
        id: this.id
      })
        .then(res => {
          if (res.code == 0) {
            this.grouplists = res.data;
            this.num = res.count;
            sessionStorage.setItem(
              "datadetails",
              JSON.stringify(this.grouplists)
            );
            sessionStorage.setItem("num", JSON.stringify(res.count));
            let _this = this
            if (res.data.fileCoverUrl === null) {
              // _this.url = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
              _this.url = ''
            } else {
              _this.url = this.ImageUrl +
              res.data.fileCoverUrl
            }
            this.$refs.banner_con.style.backgroundImage = "url(" + _this.url + ")";
            this.$refs.banner_con.style.backgroundRepeat = "no-repeat";
            this.$refs.banner_con.style.backgroundSize = "100%";
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    this.id = this.$route.query.id;
    this.getdata();
    this.aType = this.$route.query.aType;
    this.Status= this.$route.query.sta;
  },
  computed: {}
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #f6f8f7;
  position: relative;
  .van-nav-bar {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
  .van-nav-bar__right {
    font-size: 0.85rem;
  }
  .fancybutton {
    width: 18rem !important;
    height: 1.8rem !important;
    font-size: 0.8rem !important;
  }
  .banner {
    width: 100%;
    height: 10.5rem;
    // background: url("../../assets/507.png") no-repeat;
    // background-size: 100% !important;
  }
  .notice {
    width: 100%;
    // height: 8rem;
    background-color: #ffffff;
    margin-top: -1.2rem;
    border-radius: 0.5rem;
    padding: 1rem 0.65rem 0.5rem 0.65rem;
    p {
      font-size: 0.8rem;
      color: #000000;
      font-weight: 500;
    }
    .line {
      width: 100%;
      height: 0.05rem;
      background-color: #e7e7e7;
      margin: 0.5rem 0 0.6rem 0;
    }
    .item1 {
      font-size: 0.7rem;
      margin-bottom: 0.35rem;
      color: #333333;
      span {
        display: inline-block;
        width: 3rem;
        height: 0.95rem;
        box-sizing: border-box;
        text-align: center;
        line-height: 0.95rem;
        font-size: 0.55rem;
        font-weight: bold;
        color: #1492ff;
        border: 0.05rem solid #1492ff;
        border-radius: 0.25rem;
        margin-right: 0.2rem;
      }
    }
  }
  .number {
    width: 100%;
    height: 2.5rem;
    background-color: #fff;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-around;
    .num_all {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.75rem;
        color: #1492ff;
      }
      p {
        font-size: 0.55rem;
        color: #666666;
      }
    }
  }
  .address {
    // height: 6.25rem;
    margin-top: 0.4rem;
    background-color: #fff;
    padding: 0.5rem 0.65rem 0.85rem 0.65rem;
    p {
      font-size: 0.8rem;
      color: #000000;
      font-weight: 500;
    }
    .line {
      width: 100%;
      height: 0.05rem;
      background-color: #e7e7e7;
      margin: 0.5rem 0 0.3rem 0;
    }
    .item2 {
      line-height: 1rem;
      font-size: 0.65rem;
      color: #333333;
      span {
        font-size: 0.65rem;
        font-weight: bold;
        color: #999999;
      }
      p {
        display: inline-block;
        font-size: 0.65rem;
        color: #333333;
        margin-left: 0.5rem;
      }
    }
  }
  .details {
    // height: 9rem;
    // height: 100%;
    margin-top: 0.4rem;
    background-color: #fff;
    padding: 0.5rem 0.65rem 0.85rem 0.65rem;
    p {
      font-size: 0.8rem;
      color: #000000;
      font-weight: 500;
    }
    .line {
      width: 100%;
      height: 0.05rem;
      background-color: #e7e7e7;
      margin: 0.5rem 0 0.3rem 0;
    }
    .text {
      font-size: 0.7rem;
      color: #333333;
      word-wrap: break-word;
    }
  }
  .rules {
    height: 2.75rem;
    background-color: #fff;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.65rem 0.85rem 0.65rem;
    margin-bottom: 0.5rem;
    span {
      display: inline-block;
      width: 4.85rem;
      height: 1.55rem;
      font-size: 0.7rem;
      color: #333333;
      text-align: center;
    }
    .btn {
      display: flex;
      width: 6rem;
      height: 1.6rem;
      align-items: center;
      border: 1px solid rgba(231, 231, 231, 1);
      border-radius: 0.25rem;
      padding: 0.45rem 1.2rem;
      box-sizing: border-box;
      img {
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.3rem;
      }
      span {
        width: 3.05rem;
        height: 1.1rem;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    .beforeapply {
      width: 17.5rem;
      height: 2rem;
      font-size: 0.8rem;
      background-color: rgba(51, 51, 51, 0.4);
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.25rem;
    }
    button {
      width: 8rem;
      height: 1.6rem;
      background-color: #1492ff;
      font-size: 0.7rem;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.3rem;
    }
    .btn1 {
      background-color: #fff;
      color: #000000;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 0.3rem;
    }
  }
  .tig{
    display: block;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.6rem;
    color: #ffffff;
    background-color: red;
    padding: 0 0.25rem;
    position: absolute;
    top: 10.6rem;
    right: 10px;
    border-radius: 0.15rem;
}
}
</style>
