<template>
  <div id="home">
    <Tabar :title="title"></Tabar>
    <div class="table">
      <div class="project">{{cont.groupName}}</div>

      <!-- <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>社团地点</span>
        </div>
        <div class="time">绍兴市新昌县里家亭</div>
      </div> -->
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>申请时间</span>
        </div>
        <div class="time">{{cont.createTime}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>当前状态</span>
        </div>
        <div class="time">{{cont.checkStatus==0?'待审核':cont.checkStatus==1?'审核通过':'审核不通过'}}</div>
      </div>

      <div class="card" v-if="cont.checkRemark">
        <div class="tip">
          <i class="block"></i>
          <span>失败原因</span>
        </div>
        <div class="time">{{cont.checkRemark}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { zlbFun } from "@/util/Tool";
import { mapState } from "vuex";
import Tabar from "../../components/Tabar";
import { traindetail } from "@/http/api";
export default {
  data() {
    return {
      title: "申请详情",
      listdata: null,
      trainPlace: null,
      url: "https://uri.amap.com/marker?position=",
      trainlist: null,
      cont: {}
    };
  },

  methods: {
    getrainlist() {
      traindetail({
        id: this.listdata.trainInfo.id
      }).then(res => {
        this.trainlist = res.data.trainItem;
        console.log(this.trainlist);
      });
    }
  },
  components: {
    Tabar
  },
  created() {
    this.cont = this.$route.query;
    console.log(this.cont);
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  // background-color: #f6f8f7;
  .table {
    width: 17.55rem;
    height: 27.5rem;
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
}
</style>
