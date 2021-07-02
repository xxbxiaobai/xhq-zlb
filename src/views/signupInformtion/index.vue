<template>
  <div id="container" class="signupInformtion">
    <!-- 头部开始 -->
    <!-- <van-nav-bar title="报名信息" left-arrow @click-left="onClickLeft">
      <span class="check" slot="right" @click="submit">提交</span>
    </van-nav-bar>-->
    <!-- 头部结束 -->
    <p class="commont-title-p">组别信息</p>
    <ul class="group-content">
      <li v-for="(item,index) in list" :key="index" @click="goCrewInformtion(item,index)">
        <span>{{item.groupName}}</span>
        <van-icon name="arrow" />
        <span>报名人数{{item.num}}</span>
      </li>
    </ul>
    <p class="commont-title-p">团体及联系人</p>
    <van-cell-group>
      <van-field label="团体名称" v-model="teamName" input-align="right" placeholder="非必填" />
      <van-field label="紧急联系人" v-model="name" input-align="right" placeholder="请输入紧急联系人" />
      <van-field label="手机号" v-model="phone" input-align="right" placeholder="请输入手机号" />
    </van-cell-group>
    <div class="btn-box">
      <button id="btn" @click="submit">提交</button>
    </div>
  </div>
</template>


<script>
import { zlbFun } from "@/util/Tool";
import { mapGetters } from "vuex";
import { addSocialApplyer, getSocialEventGroup } from "../../http/api";
export default {
  data() {
    return {
      teamName: "",
      name: "",
      phone: "",
      list: [],
      indexarr: []
    };
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
  methods: {
    //去详情
    goCrewInformtion(item, index) {
      this.$router.push({
        path: "/crewInformtion",
        name: "crewInformtion",
        query: { eventId: item.eventId, groupId: item.id, index: index }
      });
    },
    onClickLeft() {
       this.$router.go(-1);
      window.sessionStorage.removeItem("indexarr");
    },
    // 点击提交
    submit() {
      let sum = 0;
      this.list.forEach(item => {
        sum = sum + item.num;
      });
      if (sum == 0) {
        this.$toast("请添加报名人");
        return;
      }
      if (this.name == "" || this.phone == "") {
        this.$toast("请添加联系人和手机号");
        return;
      }
      this.$dialog
        .confirm({
          message: "是否确定提交?"
        })
        .then(() => {
          let paramsArr = JSON.parse(window.sessionStorage.getItem("indexarr"));
          let paramsData = [];
          paramsArr.forEach((item, index) => {
            if (item.allApplyer) {
              paramsData.push(item);
            }
          });
          paramsData.forEach(item => {
            item.teamName = this.teamName;
            item.name = this.name;
            item.teamPhone = this.phone;
            item.zuserId = JSON.parse(this.userMsg).userId;
            item.allApplyer.forEach(item => {
              delete item.select;
            });
            item.allApplyer = JSON.stringify(item.allApplyer);
          });
          addSocialApplyer({ params: JSON.stringify(paramsData) }).then(res => {
            if (res.code == 0) {
              this.$router.push({ path: "/signupSuccess" });
              window.sessionStorage.removeItem("indexarr");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  created() {
    zlbFun("报名信息");
    //获取列表信息
    getSocialEventGroup({ eventId: this.$route.query.eventId }).then(res => {
      console.log(res.data);
      this.list = res.data;
      if (window.sessionStorage.getItem("indexarr")) {
        this.indexarr = JSON.parse(window.sessionStorage.getItem("indexarr"));
        this.indexarr.forEach((item, index) => {
          if (item.allApplyer !== "") {
            this.list[index].num = item.allApplyer.length;
          } else {
            this.list[index].num = 0;
          }
        });
        // console.log(this.list)
      } else {
        this.list.forEach((item, index) => {
          this.list[index].num = 0;
          this.indexarr.push({
            allApplyer: "",
            eventId: item.eventId,
            teamName: this.teamName,
            teamPhone: this.phone,
            name: this.name
          });
        });
        window.sessionStorage.setItem(
          "indexarr",
          JSON.stringify(this.indexarr)
        );
      }
    });
  }
};
</script>
<style scoped lang="less">
.btn-box {
  margin: 1rem 0;
  text-align: center;
  #btn {
    width: 90%;
    height: 2rem;
    background-color: #0091ff;
    font-size: 0.7rem;
    color: #ffffff;
    border-radius: 0.2rem;
  }
}
#container {
  font-size: 0.7rem;
  // padding-top: 2.3rem;
  height: 100%;
  background: rgba(241, 241, 241, 1);
  .van-nav-bar {
    background-color: #0091ff;
    div,
    .van-icon,
    .van-nav-bar__text {
      color: white;
    }
    .check {
      display: inline-block;
      margin-left: 0.6rem;
    }
  }
  .commont-title-p {
    padding: 0.5rem 1rem;
  }
  .group-content {
    background-color: #ffffff;
    & > li {
      padding: 0 1.9rem 0 1rem;
      line-height: 2rem;
      border-bottom: 1px solid #e7e7e7;
      .van-icon {
        float: right;
        line-height: 2rem;
        margin-left: 0.3rem;
      }
      span:last-child {
        float: right;
        color: #9fa7b3;
        font-size: 0.6rem;
      }
    }
  }
}
</style>
<style lang="less">
.signupInformtion {
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem 1.9rem 0.5rem 1rem;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
  }
  .van-cell:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #e7e7e7;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
