<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <!-- 未缴费是的状态 -->
    <div class="steps" v-show="!show">
      <div class="step">
        <div class="sure"></div>
        <div class="text">已提交</div>
        <div class="line1"></div>
      </div>
      <div class="step">
        <div class="sure"></div>
        <div class="text">主办方审核</div>
        <div class="line2"></div>
      </div>
      <div class="step">
        <div class="sure"></div>
        <div class="text">已取消</div>
      </div>
    </div>
    <div class="table">
      <div class="project">{{listdata.trainInfo.trainName}}</div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>培训时间</span>
        </div>
        <div class="time">{{listdata.trainInfo.trainStartTime}} 至 {{listdata.trainInfo.trainEndTime}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>培训地点</span>
        </div>
        <div class="time">{{listdata.trainInfo.trainPlace}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>培训项目</span>
        </div>
        <div class="time">{{listdata.trainInfo.trainItem}}</div>
      </div>
      <div class="card">
        <div class="tip">
          <i class="block"></i>
          <span>培训等级</span>
        </div>
        <div class="time">{{listdata.trainInfo.certificateLevel==1?'一':(listdata.trainInfo.certificateLevel==2?'二':'三')}}级体育指导员</div>
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
        <div class="time">{{listdata.cancelRemark}}</div>
      </div>
    </div>
    <div class="bottom">
      <button class="btn1">
        <div class="map" v-show="false">
          <div id="container"></div>
        </div>
        <img src="./images/nav.png" />
        <a :href="url+trainPlace[0]+','+trainPlace[1]+'&'+'name='+listdata.trainInfo.trainPlace">导航</a>
      </button>
      <button @click="$router.push({ name: 'traininformation',params:{item:trainlist,id:listdata.trainInfo.id,level:listdata.trainInfo.certificateLevel}})">重新报名</button>
      <!-- <button  @click="st">取消报名</button> -->
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool"
import { mapState } from "vuex"
import Tabar from "../../components/Tabar"
import { traindetail } from "@/http/api"
var map
export default {
  data() {
    return {
      title: "我的培训",
      active: 1,
      show: false,
      id: 22,
      trainPlace: [],
      url: "https://uri.amap.com/marker?position=",
      listdata: null,
      trainlist:null
    }
  },
  components: {
    Tabar
  },
  methods: {
    getrainlist() {
      traindetail({
        id: this.listdata.trainInfo.id
      }).then(res => {
        this.trainlist = res.data.trainItem
        console.log(this.trainlist)
      })
    }
  },
  mounted() {
    // init() 方法请在 mounted 生命周期中调用，因为如果在 created 阶段调用，会找不到 html 元素 div#container
  },
  created() {
    zlbFun("我的培训")
    this.listdata = JSON.parse(this.$route.query.data)
    console.log(this.listdata)
    this.trainPlace = this.listdata.trainInfo.trainCenter.split(",")
    this.getrainlist()
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  // background-color: #f4f6f5;
  a {
    color: #000000;
  }
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
      .line1 {
        position: absolute;
        top: 0.5rem;
        left: 1.45rem;
        width: 5.4rem;
        height: 0.1rem;
        background-color: #1492ff;
        z-index: 1;
      }
      .line2 {
        position: absolute;
        top: 0.5rem;
        left: 1.7rem;
        width: 6rem;
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
    height: 23rem;
    margin: -1rem auto 0;
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
      .cancel {
        width: 5.5rem;
        height: 1.6rem;
        position: absolute;
        left: 10.5rem;
        top: 0.3rem;
        background-color: #fff;
        font-size: 0.7rem;
        color: #000000;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 0.3rem;
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
