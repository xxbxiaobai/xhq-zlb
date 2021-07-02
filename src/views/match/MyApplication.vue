<template>
  <div id="home">
    <!-- 头部 -->
    <van-nav-bar title="活动报名" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- tab标签栏 -->
    <div id="tab">
      <van-tabs v-model="active" color="#1492FF" @click="onClickTabs">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :error.sync="error"
          :offset="10"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoadList(index)"
          :immediate-check="false"
        >
          <van-tab v-for="(i,index) in list" :title="i.title" :key="index">
            <!-- //noshow:(item.teamId != null&&item.checkStatus==3&&item.applyStatus==6)||(item.teamId != null&&item.checkStatus==5), -->
            <div
              :class="{
              cardunpaid:item.teamId != null&&item.checkStatus==3&&item.applyStatus==6,
              Unpaid:item.checkStatus==3&&item.applyStatus==6&&item.teamId == null,
              noshow:item.teamId != null&&item.checkStatus==5,
              already:item.applyStatus==2&&item.teamId == null,
              watchpe:item.applyStatus==1&&item.teamId == null,
              cancelled:item.checkStatus==5&&item.teamId == null,
              look:item.checkStatus==2&&item.teamId == null,
              lookwait:item.checkStatus==0&&item.teamId == null,
              card:item.checkStatus==0&&item.teamId != null,
              waitwatch:item.applyStatus==1&&item.teamId != null,
              alreadyteam:item.applyStatus==2&&item.teamId != null,
              cardno:item.checkStatus==2&&item.teamId != null}"
              v-for="item in infoList"
              :key="item.id"
            >
              <div class="top">
                <p>{{item.actName}}</p>
                <span v-if="item.checkStatus==3&&item.applyStatus==6">未缴费</span>
                <span v-if="item.checkStatus==0">审核中</span>
                <span v-if="item.applyStatus==1">待开赛</span>
                <span v-if="item.applyStatus==2">已参赛</span>
                <span v-if="item.checkStatus==5">取消报名</span>
                <span v-if="item.checkStatus==2">审核不通过</span>
              </div>
              <div class="bottom">
                <div class="text">
                  <p>开赛时间：{{item.actStartTime}}</p>
                </div>
                <span class="btn">
                  <van-button
                    type="default"
                    size="small"
                    @click="cancelitem(item)"
                    v-if="item.checkStatus==0&&item.teamId == null"
                  >取消报名</van-button>
                  <van-button
                    type="default"
                    size="small"
                    @click="cancelitem(item)"
                    v-if="item.checkStatus==3&&item.applyStatus==6&&item.teamId == null"
                  >取消报名</van-button>
                  <van-button
                    type="default"
                    size="small"
                    @click="cancelitem(item)"
                    v-if="item.applyStatus==1&&item.teamId == null"
                  >取消报名</van-button>
                  <van-button type="info" class="btn-sm" size="small" @click="details(item)">查看详情</van-button>
                </span>
              </div>
            </div>
          </van-tab>
        </van-list>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import "../../style/globel.css";
import Tabar from "../../components/Tabar";
import { findapply, reqcancelled } from "../../http/api";
import { mapGetters } from "vuex";
import { zlbFun } from "@/util/Tool";
export default {
  data() {
    return {
      originPath: "", //判断是否是首页跳转
      login: true,
      active: 0,
      pageIndex: 1,
      pageSize: 6,
      isUpLoading: false,
      upFinished: false,
      applyStatus: 0,
      list: [
        {
          title: "全部"
        },
        {
          title: "已报名"
        },
        {
          title: "未开赛"
        },
        {
          title: "已参赛"
        },
        {
          title: "已取消"
        }
      ],
      infoList: [],
      active: 0,
      // title: "活动报名",
      status: 3,
      status1: 2,
      status2: 1,
      status3: 4,
      all: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path == "/oneself") {
        vm.originPath = "y";
      } else {
        vm.originPath = "";
      }
    });
  },
  components: {
    Tabar
  },
  computed: {
    ...mapGetters(["userMsg"])
  },
  created() {
    this.getlists();
  },
  methods: {
    onLoadList(i) {
      this.pageIndex++;
      this.getlists(i);
    },
    getlists(index) {
      console.log(index);
      let data = {};
      if (!index || index == 0) {
        data = {
          applyerId: JSON.parse(sessionStorage.getItem("userInfo")).id,
          // applyStatus: "",
          page: this.pageIndex,
          limit: this.pageSize
        };
      } else {
        data = {
          applyerId: JSON.parse(sessionStorage.getItem("userInfo")).id,
          applyStatus: index - 1,
          page: this.pageIndex,
          limit: this.pageSize
        };
      }
      this.isUpLoading = true;
      findapply(data).then(res => {
        this.isUpLoading = false;
        if (res.code == 0) {
          this.infoList = this.infoList.concat(res.data);
          if (this.infoList.length >= res.count) {
            this.upFinished = true;
          }
        }
      });
    },
    onClickTabs(index) {
      // window.scrollTo(0, 0)
      this.infoList = [];
      this.login = true;
      this.pageIndex = 1;
      // console.log(index)
      this.getlists(index);
    },
    onClickLeft() {
      // this.$router.push({ path: "/oneself" });
       if (this.originPath) {
        this.$router.go(-1);
      } else {
        window.location.href = "sxty://back";
        this.$router.push("/");
      }
    },
    // 详情页
    details(item) {
      if (item.teamId != null) {
        this.$router.push({
          path: "/lookgroup",
          query: { data: JSON.stringify(item) }
        });
      } else if (item.teamId == null) {
        this.$router.push({
          path: "/status",
          query: { data: JSON.stringify(item) }
        });
      }
    },
    cancelitem(item) {
      this.$router.push({ name: "cancelreservation", params: { id: item.id } });
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
  }
};
</script>
<style lang='less' scoped>
#home {
  width: 100%;
  // background-color: #ffffff;
  .van-nav-bar {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
  .van-nav-bar__right {
    font-size: 0.85rem;
  }
  .top {
    border-bottom: 1px solid rgba(247, 245, 246, 1);
    padding-bottom: 0.65rem;
  }
  .noshow {
    display: none;
  }
  // 团队审核中
  .card {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 2.15rem;
      height: 2.15rem;
      background: url(./images/footer.png) no-repeat;
      background-size: 100%;
    }
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #fe3116;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  //团队未缴费
  .cardunpaid {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 2.15rem;
      height: 2.15rem;
      background: url(./images/footer.png) no-repeat;
      background-size: 100%;
    }
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #ffa007;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 团队审核不通过
  .cardno {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 2.15rem;
      height: 2.15rem;
      background: url(./images/footer.png) no-repeat;
      background-size: 100%;
    }
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #fe3116;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 未缴费
  .Unpaid {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #ffa007;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 审核不通过
  .look {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #fe3116;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 个人审核中
  .lookwait {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #fe3116;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 团体待开赛
  .waitwatch {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 2.15rem;
      height: 2.15rem;
      background: url(./images/footer.png) no-repeat;
      background-size: 100%;
    }
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #3aa856;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  //已参赛
  .already {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #1492ff;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 团体已参赛
  .alreadyteam {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 2.15rem;
      height: 2.15rem;
      background: url(./images/footer.png) no-repeat;
      background-size: 100%;
    }
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #1492ff;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 个人待开赛
  .watchpe {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #3aa856;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 报名失败
  .cancelled {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1.45rem;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      p {
        width: 10.65rem;
        font-size: 0.8rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      span {
        font-size: 0.7rem;
        color: #999999;
      }
    }
    .bottom {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.55rem;
      color: #999999;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        p {
          width: 6.45rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      .van-button--default {
        border: 1px solid #e7e7e7;
      }
      .van-button {
        // margin-right: 0.4rem;
      }
      .btn-sm {
        margin-left: 0.6rem;
      }
    }
  }
  // 加载中  样式
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
