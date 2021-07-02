<template>
  <div id="home">
    <Tabar :title="title"></Tabar>
    <div class="table">
      <div class="project">举办2019年绍兴市健身气功站点交流比赛</div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>团体名称</span>
        </div>
        <div class="time">皇朝花园跑步俱乐部</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>领队</span>
        </div>
        <div class="time">李小王</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>已加入人数</span>
        </div>
        <div class="time">18/20</div>
      </div>
      <table collspacing="0">
        <tr>
          <th width="50px"></th>
          <th width="70px">姓名</th>
          <th>项目</th>
        </tr>
        <tr>
          <td>1</td>
          <td class="names">李秀丽</td>
          <td>200米自由泳</td>
        </tr>
         <tr>
          <td>2</td>
          <td class="names">孙晓雨</td>
          <td>200米自由泳</td>
        </tr>
         <tr>
          <td>3</td>
          <td class="names">周敏</td>
          <td>200米自由泳</td>
        </tr>
         <tr>
          <td>4</td>
          <td class="names">张艳华</td>
          <td>200米自由泳</td>
        </tr>

      </table>
    </div>
    <div class="bottom">
      <button @click="into" :class="{visibled:listdata.applyStatus==1||listdata.checkStatus==0}">分享链接</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Tabar from "../../components/Tabar"
import { zlbFun } from "@/util/Tool"
import { findteam, delpeople, teamevent } from "../../http/api"
export default {
  inject: ["reload"],
  data() {
    return {
      title: "查看团体",
      showBtn: false,
      teamlist: [],
      peoplelist: [],
      listdata: [],
      href: null,
      teamname: "",
      actname: "",
      peoplename: "",
      leader: 1
    }
  },

  methods: {
    edit() {
      this.showBtn = true
    },
    complete() {
      this.showBtn = false
    },
    lookteam() {
      findteam({
        applyerId: JSON.parse(this.userMsg).userId,
        teamId: this.listdata.teamId
      })
        .then(res => {
          console.log(res.data)
          this.leader = res.data[0].leaderCode
          this.teamlist = res.data[0]
          this.peoplelist = res.data[0].Result
        })
        .catch(err => {})
    },
    deletepeople(id) {
      delpeople({
        id: id
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {})
      this.reload()
    },
    getteamid() {
      teamevent({
        id: this.listdata.teamId
      }).then(res => {
        this.teamname = res.data.teamName
        this.actname = res.data.actName
        this.peoplename = res.data.leadName
      })
    },
    into() {
      // idcard:grouplists.actIdcardWay,healthid:grouplists.actHeathReport,startTime:grouplists.startTime
      this.href =
        window.location.href.split("#")[0] + "#/clickinto?teamId=" + this.listdata.teamId + "&id=" + this.listdata.actId + "&idcard=" + this.listdata.actIdcardWay + "&healthid=" + this.listdata.actHeathReport + "&startTime=" + this.listdata.startTime
      console.log(this.href)
      zlbFun("", () => {
        dd.biz.util.share({
          arg: { titleStr: this.peoplename + "团长邀请你加入" + this.teamname, contentStr: this.actname, imageStr: "分享图片路径", shareUrlStr: this.href },
          onSuccess: function(data) {},
          onFail: function(error) {}
        })
      })
    }
  },
  components: { Tabar },
  created() {
    zlbFun("查看团体")
    this.listdata = JSON.parse(this.$route.query.data)
    console.log(this.listdata)
    this.lookteam()
    this.getteamid()
  },
  computed: {
    ...mapGetters(["userMsg", "userInformation"])
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  // background-color: #f4f6f5;
  .visibled {
    display: block !important;
  }
  .table {
    width: 17.55rem;
    // height: 28rem;
    padding-bottom: 3rem;
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
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    button {
      display: none;
      width: 17.5rem;
      height: 2rem;
      font-size: 0.9rem;
      background-color: #1492ff;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.25rem;
    }
  }
  .edit {
    width: 14.5rem;
    font-size: 0.7rem;
    color: #1492ff;
    text-align: right;
  }
  table {
    width: 16.3rem;
    border: 1px solid rgba(231, 231, 231, 1);
    font-size: 0.6rem;
    color: #666666;
    border-collapse: collapse;
    margin-top: 0.55rem;
    th,
    td {
      border: 1px solid rgba(231, 231, 231, 1);
    }
    th {
      height: 1.4rem;
    }
    td {
      height: 1.8rem;
      text-align: center;
    }
    .names {
      color: #333333;
      font-weight: 500;
    }
    .buttons {
      width: 1.6rem;
      border: 1px solid #ffffff;
      span {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
