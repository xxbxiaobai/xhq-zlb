<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="table">
      <div class="project">{{datalist.actName}}</div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>开赛时间</span>
        </div>
        <div class="time">{{datalist.startTime | date}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>主办方</span>
        </div>
        <div class="time">{{datalist.sponsor}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>报名项目</span>
        </div>
        <div class="time">{{datalist.itemName}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>服务电话</span>
        </div>
        <div class="time">{{datalist.phone}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>比赛地址</span>
        </div>
        <div class="time">{{datalist.actAddress}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>报名状态</span>
        </div>
        <div class="time">已参赛</div>
      </div>
    </div>
    <div class="bottom">
      <button class="btn1" @click="$router.push({name: 'preview',params:{id:datalist.id}})">预览成绩</button>
      <!-- <button>下载成绩</button> -->
      <a :href="fileimg" download>下载成绩</a>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar"
import { mapState } from "vuex"
import { details } from "../../http/api"
import { zlbFun } from "@/util/Tool"
export default {
  data() {
    return {
      title: "我的报名",
      datalist: {},
      fileimg: "",
      listdata: null
    }
  },

  methods: {
    getdetail() {
      details({
        id: this.datalist.id
      }).then(res => {
        this.fileimg = res.data.fileUrl
        // console.log(this.fileimg)
      })
    }
  },
  components: { Tabar },

  computed: {
    // ...mapState(["listdata"])
  },
  created() {
    zlbFun("我的报名")
    this.listdata = JSON.parse(this.$route.query.data)
    this.datalist = this.listdata
    this.getdetail()
    // console.log(this.datalist.id)
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
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #f4f6f5;
  .table {
    width: 17.55rem;
    height: 28rem;
    margin: 0.5rem auto 0;
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
        padding-right: 2rem;
        color: #999999;
        font-size: 0.55rem;
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
      border-radius: 0.3rem;
      text-align: center;
      line-height: 1.6rem;
    }
    .btn1 {
      background-color: #fff;
      color: #000000;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 0.3rem;
    }
  }
}
</style>
