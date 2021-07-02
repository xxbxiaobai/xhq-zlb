<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <van-nav-bar title="报名详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 报名成功 -->
    <div class="steps" v-show="listdata.checkStatus==3&&listdata.applyStatus==6">
      <div class="step">
        <div class="sure"></div>
        <div class="text">已提交</div>
        <div class="line1"></div>
      </div>
      <div class="step">
        <div class="sure"></div>
        <div class="text">主办方审核</div>
        <div class="line"></div>
      </div>
      <div class="step">
        <div class="sure"></div>
        <div class="text">报名成功</div>
      </div>
    </div>
    <!-- 审核中  -->
    <div class="steps" v-show="listdata.checkStatus==0">
      <div class="step">
        <div class="sure"></div>
        <div class="text">已提交</div>
        <div class="line5"></div>
      </div>
      <div class="step">
        <div class="sure2">
          <div class="circle"></div>
        </div>
        <div class="text">主办方审核</div>
        <div class="line3 line-state"></div>
      </div>
      <div class="step">
        <div class="sure3"></div>
        <div class="text">报名成功</div>
      </div>
    </div>
    <!-- 已取消 -->
    <div class="steps" v-show="listdata.checkStatus==5">
      <div class="step">
        <div class="sure"></div>
        <div class="text">站点确认中</div>
        <div class="line"></div>
      </div>
      <div class="step">
        <div class="sure"></div>
        <div class="text">主办方审核中</div>
        <div class="line4"></div>
      </div>
      <div class="step">
        <div class="sure"></div>
        <div class="text">已取消</div>
      </div>
    </div>
    <div class="table">
      <div class="project">{{listdata.actName}}</div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>开赛时间</span>
        </div>
        <div class="time">{{listdata.actStartTime}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>主办方</span>
        </div>
        <div class="time">{{listdata.sponsor}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>报名项目</span>
        </div>
        <div class="time">{{listdata.itemName}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>服务电话</span>
        </div>
        <div class="time">{{listdata.serviceLine}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>比赛地址</span>
        </div>
        <div class="time">{{listdata.actAddress}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>报名状态</span>
        </div>
        <div class="time" v-if="listdata.checkStatus==3&&listdata.applyStatus==6">未缴费</div>
        <div class="time" v-if="listdata.checkStatus==0">审核中</div>
        <div class="time" v-if="listdata.applyStatus==1">待开赛</div>
        <div class="time" v-if="listdata.checkStatus==2">审核不通过</div>
        <div class="time" v-if="listdata.checkStatus==5">取消报名</div>
        <div class="time" v-if="listdata.applyStatus==2">已参赛</div>
        <div class="boxline" v-if="(listdata.checkStatus==3&&listdata.applyStatus==6)||(listdata.checkStatus==0)||(listdata.applyStatus==1)"></div>
        <button class="cancel" v-if="(listdata.checkStatus==3&&listdata.applyStatus==6)||(listdata.checkStatus==0)||(listdata.applyStatus==1)" @click="cancelitem">取消报名</button>
        <div class="card" v-if="listdata.checkStatus==5">
          <div class="tip">
            <i class="block"></i>
            <span>取消原因</span>
          </div>
          <div class="time">{{listdata.cancelReason}}</div>
        </div>
        <div class="card" v-if="listdata.checkStatus==2">
          <div class="tip">
            <i class="block"></i>
            <span>失败原因</span>
          </div>
          <div class="time">{{listdata.checkResult}}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button class="btn1">
        <img src="./images/nav.png" />
        <a class="nav" :href="url+trainPlace[0]+','+trainPlace[1]+'&'+'name='+(listdata.actAddress?listdata.actAddress:'无地址')">导航</a>
      </button>
      <!-- <button>电话</button> -->
      <a :href="'tel:'+listdata.phone">电话</a>
    </div>
    <div class="bottom" v-if="listdata.applyStatus==2">
      <button class="btn1" @click="$router.push({name: 'preview',params:{url:listdata.gradeFileUrl}})">预览成绩</button>
      <!-- <button>下载成绩</button> -->
      <a :href="listdata.gradeFileUrl" download>下载成绩</a>
    </div>
    <div class="bottom-agin" v-if="listdata.checkStatus==2||listdata.checkStatus==5">
      <button @click="$router.push({name: 'personal',params:{id:listdata.actId,status:0,idcard:listdata.actIdcardWay,healthid:listdata.actHeathReport,startTime:listdata.startTime}})">重新报名</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar"
import { mapState } from "vuex"
import { zlbFun } from "@/util/Tool"
var map
export default {
  data() {
    return {
      title: "我的报名",
      active: 1,
      // isshow: this.$route.params.status,
      text: { name1: "未缴费", name2: "审核中", name3: "待参赛" },
      url: "https://uri.amap.com/marker?position=",
      trainPlace: [],
      status: null,
      listdata: null,
      fileimg: ""
    }
  },
  components: {
    Tabar
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    playCall() {
      zlbFun("", () => {
        dd.biz.telephone.call({
          corpId: this.listdata.serviceLine,
          onSuccess: function(data) {},
          onFail: function(error) {}
        })
      })
    },
    cancelitem() {
      this.$router.push({ name: "cancelreservation", params: { id: this.listdata.id } })
    }
  },

  created() {
    zlbFun("我的报名")
    this.listdata = JSON.parse(this.$route.query.data)
    console.log(this.listdata)
    if (this.listdata.coordinate) {
      this.trainPlace = this.listdata.coordinate.split(",")
    }
    this.status = this.$route.query.status
  },
  computed: {
    // ...mapState(["listdata", "status"])
  },
  mounted() {}
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  // background-color: #f4f6f5;
  .steps {
    width: 100%;
    height: 4.8rem;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    .step {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.3rem;
      .sure {
        width: 1.05rem;
        height: 1.05rem;
        background: url("./images/sure.png") no-repeat;
        background-size: 100%;
      }
      .sure2 {
        width: 1.05rem;
        height: 1.05rem;
        background-color: #1492ff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
        .circle {
          width: 0.45rem;
          height: 0.45rem;
          background-color: #fff;
          border-radius: 50%;
        }
      }
      .sure3 {
        width: 1.05rem;
        height: 1.05rem;
        background-color: #9cd1ff;
        border-radius: 50%;
        transform: scale(0.5);
      }
      .text {
        font-size: 0.6rem;
        color: #1492ff;
        margin-top: 0.55rem;
      }
      .line {
        position: absolute;
        top: 0.5rem;
        left: 1.8rem;
        width: 6rem;
        height: 0.1rem;
        background-color: #1492ff;
        z-index: 1;
      }
      .line5 {
        position: absolute;
        top: 0.5rem;
        left: 1.4rem;
        width: 6rem;
        height: 0.1rem;
        background-color: #1492ff;
        z-index: 1;
      }
      .line4 {
        position: absolute;
        top: 0.5rem;
        left: 2.3rem;
        width: 5.3rem;
        height: 0.1rem;
        background-color: #1492ff;
        z-index: 1;
      }
      .line1 {
        position: absolute;
        top: 0.5rem;
        left: 1.45rem;
        width: 5.2rem;
        height: 0.1rem;
        background-color: #1492ff;
        z-index: 1;
      }
      .line3 {
        position: absolute;
        top: 0.5rem;
        left: 1.6rem;
        width: 6.3rem;
        height: 0.1rem;
        background-color: #1492ff;
        z-index: 1;
      }
      .line-state {
        background-color: #9cd1ff;
      }
    }
  }
  .table {
    width: 17.55rem;
    // height: 23rem;
    padding-bottom: 2rem;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: #fff;
    padding-left: 0.85rem;
    box-sizing: border-box;
    .project {
      width: 16.65rem;
      padding: 0.75rem 0.75rem 0.75rem 0;
      font-size: 0.9rem;
      color: #333333;
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
    }
    .card {
      margin-top: 0.8rem;
      width: 16.65rem;
      position: relative;
      .tip {
        display: flex;
        align-items: center;
        i {
          display: inline-block;
          width: 0.1rem;
          height: 0.35rem;
          background-color: #1492ff;
        }
        span {
          font-size: 0.7rem;
          color: #333333;
          margin-left: 0.2rem;
        }
      }
      .time {
        margin-top: 0.2rem;
        color: #999999;
        font-size: 0.55rem;
      }
      .boxline {
        position: absolute;
        top: 0.4rem;
        left: 9rem;
        width: 0.05rem;
        height: 1.4rem;
        background: rgba(231, 231, 231, 1);
      }
      .cancel {
        width: 4.5rem;
        height: 1.5rem;
        position: absolute;
        left: 10.5rem;
        top: 0.3rem;
        background-color: #fff;
        font-size: 0.65rem;
        color: #000000;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 0.3rem;
      }
    }
  }
  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.09);
    button {
      width: 8rem;
      height: 1.6rem;
      background-color: #1492ff;
      font-size: 0.7rem;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.3rem;
    }
    a {
      display: inline-block;
      width: 8rem;
      height: 1.6rem;
      background-color: #1492ff;
      font-size: 0.7rem;
      color: #ffffff;
      font-weight: 500;
      text-align: center;
      line-height: 1.6rem;
      border-radius: 0.3rem;
    }
    .nav {
      color: #000000;
      background-color: #fff;
      display: inline;
    }
    .btn1 {
      background-color: #fff;
      color: #000000;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 0.3rem;
      img {
        width: 0.65rem;
        height: 0.75rem;
        vertical-align: middle;
        margin-right: 0.25rem;
      }
    }
  }
  .bottom-agin {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    button {
      width: 17.5rem;
      height: 2rem;
      font-size: 0.9rem;
      background-color: #1492ff;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.25rem;
    }
  }
}
</style>
