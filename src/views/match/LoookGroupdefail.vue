<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="table">
      <div class="project">{{listdata.actName}}</div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>团体名称</span>
        </div>
        <div class="time">{{teamlist.teamName}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>领队</span>
        </div>
        <div class="time">{{teamlist.leadName}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>已加入人数</span>
        </div>
        <div class="time">{{teamlist.regCount}}/{{teamlist.teamMember}}</div>
      </div>
      <div class="edit" v-if="!showBtn" @click="edit">编辑</div>
      <div class="edit" v-else @click="complete">完成</div>
      <table collspacing="0">
        <tr>
          <th width="50px"></th>
          <th width="70px">姓名</th>
          <th>项目</th>
        </tr>
        <tr v-for="(item,index) in peoplelist" :key="index">
          <td>{{index+1}}</td>
          <td class="names">{{item.applyerName}}</td>
          <td>{{item.itemName}}</td>
          <td class="buttons" @click="deletepeople(item.id)">
            <span v-show="showBtn">
              <img src="./images/edit.png" alt />
            </span>
          </td>
        </tr>
      </table>
    </div>
    <!-- <div class="bottom"> -->
    <!-- <button class="btn1" @click="$router.push({path: '/information'})">报名</button> -->
    <!-- <button @click="$router.push({path: '/clickinto'})">分享链接</button> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex"
import Tabar from "../../components/Tabar"
import { findteam, delpeople } from "../../http/api"
import { zlbFun } from "@/util/Tool"
export default {
  inject: ["reload"],
  data() {
    return {
      title: "查看团体",
      showBtn: false,
      teamlist: [],
      peoplelist: [],
      listdata:null
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
        id: this.listdata.id
      })
        .then(res => {
          console.log(res.data)
          this.teamlist = res.data[0]
          this.peoplelist = res.data[0].Result
          // console.log(this.peoplelist)
        })
        .catch(err => {})
    },
    deletepeople(id) {
      // console.log(id)
      delpeople({
        id: id
      }).then(res => {
          console.log(res)
        })
        .catch(err => {})
      this.reload()
    }
  },
  components: { Tabar },
  created() {
    zlbFun("查看团体")
    this.listdata = JSON.parse(this.$route.query.data)
    this.lookteam()
  },
  computed: {
    // ...mapState(["listdata"])
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
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    button {
      width: 15rem;
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
