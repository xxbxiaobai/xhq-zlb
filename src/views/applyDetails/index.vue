<template>
  <div id="container" class="applyDetails">
    <!-- 头部开始 -->
    <!-- <van-nav-bar title="报名详情" left-arrow left-text="返回" @click-left="onClickLeft"></van-nav-bar> -->
    <!-- 头部结束 -->
    <div class="details-header">
      <!-- 时间线开始 -->
      <div
        :class="{'box-date':true,'no-pass':Team.applyStatus===2,'pass':Team.applyStatus===0,'finish':Team.applyStatus===1}"
      >
        <div class="box-status">
          <i></i>
        </div>
        <div style="display:none;" class="box-status">
          <i></i>
        </div>
        <div class="box-status">
          <i></i>
        </div>
        <div class="line">
          <div></div>
          <div></div>
        </div>
      </div>
      <!-- 时间线结束 -->
      <ul class="details-header-bottom">
        <li v-if="Team.teamName">{{Team.teamName}}</li>
        <li>{{Team.name}}</li>
        <li>{{Team.phone}}</li>
      </ul>
      <div style="height:0.8rem;background:#F1F1F1;"></div>
    </div>
    <div class="details-main">
      <van-tabs v-model="active">
        <van-tab v-for="(item,index) in applyerlist" :key="index" :title="item.groupName">
          <div class="main-card" v-for="(item,index) in item.applyList" :key="index">
            <div class="main-card-top">
              报名人{{index+1}}
              <span class="pull-right">{{item.checkOpinion}}</span>
            </div>
            <div class="main-card-bottom">
              <p>
                姓名
                <span>{{item.name}}</span>
              </p>
              <p>
                身份证号
                <span>{{item.idCode}}</span>
              </p>
              <p>
                手机号
                <span>{{item.phone}}</span>
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>


<script>
import { zlbFun } from "../../util/Tool";
import { getMyApplyDetail } from "../../http/api";
export default {
  data() {
    return { active: 0, Team: {}, applyerlist: [], event: {} };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  },
  created() {
    zlbFun("报名详情");
    getMyApplyDetail({ teamId: this.$route.query.teamId }).then(res => {
      this.Team = res.Team;
      this.applyerlist = res.applyerlist;
      this.event = res.event;
    });
  }
};
</script>
<style scoped lang="less">
.pull-right {
  float: right;
}
//时间线
.statusDate(@color1:#F1F1F1,@color2:#F1F1F1,@icon1:"../../assets/Group_gray.png",@icon2:"../../assets/Group_gray.png") {
  > .box-status {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 0.9rem;
    width: 0.9rem;
    border-radius: 50%;
    z-index: 10;
    font-size: 0.7rem;
    &:nth-child(1) {
      color: @color1;
    }
    &:nth-child(3) {
      color: @color2;
    }
    &:nth-child(1)::before {
      content: "已提交";
      position: absolute;
      bottom: -1rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      white-space: nowrap;
    }
    &:nth-child(2)::before {
      content: "";
      position: absolute;
      bottom: -1rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      white-space: nowrap;
    }
    &:nth-child(3)::before {
      content: "已审核";
      position: absolute;
      bottom: -1rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      white-space: nowrap;
    }
    &:nth-child(1) > i {
      width: 0.9rem;
      height: 0.9rem;
      background: url(@icon1) no-repeat center;
      background-size: cover;
    }
    &:nth-child(2) > i {
      background: url("../../assets/dengdai.png") no-repeat center;
      background-size: cover;
    }
    &:nth-child(3) > i {
      width: 0.9rem;
      height: 0.9rem;
      background: url(@icon2) no-repeat center;
      background-size: cover;
    }
    > i {
      display: inline-block;
      height: 1rem;
      width: 1rem;
      background-color: red;
    }
  }
  > .line {
    display: flex;
    position: absolute;
    height: 1px;
    width: 100%;
    z-index: 1;
    > div {
      width: 100%;
      font-weight: 200;
      border-width: 1px;
    }
  }
  > .line {
    > div {
      border-bottom: 1px solid rgba(241, 241, 241, 1);
    }
  }
}
// =======================
#container {
  //   padding-top: 2.3rem;
  background-color: #ffffff;
  height: 100%;
  .van-nav-bar .van-icon {
    color: #1989fa;
    vertical-align: middle;
  }
  .van-nav-bar {
    background-color: #ffffff;
    div {
      color: #323233;
    }
  }
  // .van-nav-bar {
  //   background-color: #0091ff;
  //   div,
  //   .van-icon,
  //   .van-nav-bar__text {
  //     color: white;
  //   }
  //   .check {
  //     display: inline-block;
  //     margin-left: 0.6rem;
  //   }
  // }
  .details-header {
    // height: 5.8rem;
    background: rgba(255, 255, 255, 1);
    border: 0.05rem solid rgba(255, 255, 255, 1);
    //时间线
    .box-date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding-bottom: 1rem;
      margin: 0 3.5rem;
      height: 5rem;
      background-color: white;
      .statusDate();
    }
    //待审核
    .pass {
      .statusDate(
        #1492ff,
        #f1f1f1,
        "../../assets/Group_bule.png",
        "../../assets/Group_gray.png"
      );
    }
    // 已取消
    .no-pass {
      .statusDate();
    }
    // 已审核
    .finish {
      .statusDate(
        #1492ff,
        #1492ff,
        "../../assets/Group_bule.png",
        "../../assets/Group_bule.png"
      );
    }
    .details-header-bottom {
      display: flex;
      text-align: center;
      font-size: 0.6rem;
      color: #9fa7b3;
      & > li {
        padding-bottom: 0.25rem;
        flex: auto;
        line-height: 20px;
      }
      & > li:nth-child(1)::before {
        position: relative;
        top: 0.05rem;
        content: "";
        display: inline-block;
        height: 0.5rem;
        width: 0.5rem;
        background: url("../../assets/baoming_tuanti.png") no-repeat center;
        background-size: 100%;
      }
      & > li:nth-child(2)::before {
        content: "";
        display: inline-block;
        height: 0.5rem;
        width: 0.45rem;
        background: url("../../assets/baoming_ren.png") no-repeat center;
        background-size: 100%;
      }
      & > li:nth-child(3)::before {
        content: "";
        display: inline-block;
        height: 0.5rem;
        width: 0.4rem;
        background: url("../../assets/baoming_shouji.png") no-repeat center;
        background-size: 100%;
      }
    }
  }
  .details-main {
    .main-card {
      margin-top: 0.3rem;
      border: 0.05rem solid #0091ff;
      border-radius: 0.2rem;
      .main-card-top {
        padding-right: 1.3rem;
        padding-left: 1.05rem;
        font-size: 0.7rem;
        line-height: 2.15rem;
        border-bottom: 0.05rem solid #0091ff;
      }
      .main-card-bottom {
        padding-bottom: 0.3rem;
        padding-left: 0.5rem;
        font-size: 0.8rem;
        > p {
          margin-top: 0.3rem;
        }
      }
    }
  }
}
</style>
<style lang="less">
.applyDetails {
  .van-tabs__content {
    padding: 0 0.5rem;
  }
  .van-tab--active {
    color: #0091ff;
    font-weight: 500;
  }
  .van-tabs__line {
    position: absolute;
    bottom: 15px;
    left: 0;
    z-index: 1;
    height: 3px;
    background-color: #0091ff;
    border-radius: 3px;
  }
  .van-tabs__content {
    background-color: #ffffff;
  }
}
</style>
