<template>
  <div id="home">
    <!-- 头部 -->
    <van-nav-bar title="我的申请" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- tab标签栏 -->
    <div id="tab">
      <van-tabs v-model="active" color="#1492FF" @click="onClickTabs">
        <van-tab v-for="(item,index) in list" :title="item.title" :key="index">
          <div
            :class="{card:item.checkStatus==2,Unpaid:item.checkStatus==0,already:item.checkStatus==1}"
            v-for="item in item.contList"
            :key="item.id"
          >
            <div class="top">
              <p>
                {{item.groupName||'无'}}
                <van-tag color="#1989fa" plain>{{item.type==1?'健身群':item.type==2?'健身社团':'同城约'}}</van-tag>
              </p>
              <span v-show="item.checkStatus==0">待审核</span>
              <span v-show="item.checkStatus==1">审核通过</span>
              <span v-show="item.checkStatus==2">审核不通过</span>
            </div>
            <div class="bottom">
              <div class="text">
                <p>申请时间：{{item.createTime}}</p>
                <!-- <p>地点：绍兴市新昌县里家亭</p> -->
              </div>
              <span class="btn">
                <van-button type="info" class="btn-sm" size="small" @click="lookdetail(item)">查看详情</van-button>
              </span>
            </div>
          </div>
        </van-tab>
        <van-empty description="没有更多啦" v-show="!list[active].contList.length" />
      </van-tabs>
    </div>
  </div>
</template>
<script>
import "../../style/globel.css";
import Tabar from "../../components/Tabar";
import { formatDateTimeBack } from "../../util/Tool";
import { findMyApply } from "../../http/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      originPath: "", //判断是否是首页跳转
      login: true,
      active: 0,
      pageIndex: 0,
      pageSize: 6,
      isUpLoading: false,
      upFinished: false,
      list: [
        {
          title: "全部",
          contList: []
        },
        {
          title: "审核中",
          contList: []
        },
        {
          title: "已通过",
          contList: []
        },
        {
          title: "未通过",
          contList: []
        }
      ]
    };
  },
  components: {
    Tabar
  },
  methods: {
    cancelevent(item) {
      if (item.isCancel == 0) {
        this.$toast("不可以取消报名");
      } else {
        this.$router.push({ name: "cancelreason", params: { id: item.id } });
      }
    },
    onLoadList(i) {
      this.pageIndex++;
      this.getlists(i);
    },
    //点击tab切换
    onClickTabs(index) {
      // window.scrollTo(0, 0)
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

    getlists(index = 0) {
      let data = {
        userId: 2,
        checkStatus: index ? index - 1 : ""
      };
      findMyApply(data).then(res => {
        if (!res.data.length) return;
        this.list[index].contList = res.data;
      });
    },

    //查看详情页--审核中
    lookdetail(item) {
      this.$router.push({ path: "/trainfailure", query: item });
    }
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
  computed: {
    ...mapGetters(["userMsg"])
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
    this.getlists();
  }
};
</script>
<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #ffffff;

  .van-tag--plain {
    margin-left: 5px;
    transform: scale(0.8);
  }
  .van-nav-bar {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
  .van-nav-bar__right {
    font-size: 0.85rem;
  }
  .card {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1rem;
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
          width: 100%;
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
  .Unpaid {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1rem;
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
          width: 100%;
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
          width: 100%;
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
  .already {
    width: 17.5rem;
    // height: 5rem;
    background-color: #ffffff;
    margin: 0.4rem auto;
    box-shadow: 0px 3px 9px 0px rgba(11, 11, 11, 0.08);
    position: relative;
    border-radius: 0.4rem;
    padding: 0.65rem 0.85rem 0.75rem 1rem;
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
          width: 100%;
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
