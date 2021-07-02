<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="steps">
      <div class="step">
        <div class="sure"></div>
        <div class="text">站点确认中</div>
        <div class="line"></div>
      </div>
      <div class="step">
        <div class="sure"></div>
        <div class="text">主办方审核中</div>
        <div class="line"></div>
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
        <div class="time">{{listdata.startTime | date}}</div>
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
        <div class="time">{{listdata.phone}}</div>
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
        <div class="time">取消报名</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>取消原因</span>
        </div>
        <div class="time">{{listdata.cancelReason}}</div>
      </div>
    </div>
    <div class="bottom">
      <button @click="$router.push({name: 'personal',params:{id:listdata.actId,status:0}})">重新报名</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import Tabar from "../../components/Tabar"
import { zlbFun } from "@/util/Tool"
export default {
  data() {
    return {
      title: "我的报名",
      listdata: null
    }
  },
  components: {
    Tabar
  },
  methods: {},

  created() {
    zlbFun("我的报名")
    this.listdata = JSON.parse(this.$route.query.data)
    console.log(this.listdata)
  },
  filters: {
    date: function(ol) {
      const dt = new Date(ol)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + "").padStart(2, "0")
      const d = (dt.getDate() + "").padStart(2, "0")
      const hh = (dt.getHours() + "").padStart(2, "0")
      const mm = (dt.getMinutes() + "").padStart(2, "0")
      const ss = (dt.getSeconds() + "").padStart(2, "0")
      // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      return `${y}.${m}.${d}`
    }
  },
  computed: {
    // ...mapState(["listdata"])
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  // background-color: #f4f6f5;
  .steps {
    width: 100%;
    height: 5.8rem;
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
      .text {
        font-size: 0.6rem;
        color: #1492ff;
        margin-top: 0.55rem;
      }
      .line {
        position: absolute;
        top: 0.5rem;
        left: 2rem;
        width: 6rem;
        height: 0.1rem;
        background-color: #1492ff;
      }
    }
  }
  .table {
    width: 17.55rem;
    height: 26rem;
    margin: -1rem auto 0;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 0.5rem;
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
      // height: 1.8rem;
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
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    margin-top: -2.7rem;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    button {
      width: 17.5rem;
      height: 2rem;
      background-color: #1492ff;
      color: #ffffff;
      font-weight: 500;
    }
  }
}
</style>
