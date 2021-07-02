<template>
  <div class="onself_big">
    <header>
      <div class="left_top">
        <div @click="goPersonal">
          <article class="son" ref="sonImg"></article>
        </div>
        <h4>{{userInfo.userName}}</h4>
      </div>
      <!-- <div class="right_top">
        <p><img src="./img/huo.png" alt />0分</p>
        <p>卡路里银行</p>
      </div> -->
    </header>
    <ul class="row">
      <div class="row_container">
        <li>
          <router-link to="/user/myCommunity">
            <img src="./img/saishi@2x.png" alt />
            <p>我的社团</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myapplication">
            <img src="./img/huodong.png" alt />
            <p>活动报名</p>
          </router-link>
        </li>
        <li>
          <router-link to="/train">
            <img src="./img/peixun.png" alt />
            <p>我的申请</p>
          </router-link>
        </li>
      </div>
    </ul>
    <ul class="line">
      <li>
        <router-link :to="{
          path: '/orderList',
          query:{
            id:userInfo.id
          }
        }">
          <img src="./img/dingdan.png" alt />
          <p>我的订单</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/warrantyList">
          <img src="./img/baoxiu.png" alt />
          <p>我的报修</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>-->
      <!-- <li v-if="showcoach==1">
        <router-link to="/coachReview">
          <img src="./img/shenqing.png" alt />
          <p>教练审核</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>-->
      <!-- <li v-else>
        <router-link to="/athleteRegister">
          <img src="./img/shenqing.png" alt />
          <p>注册申请</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>-->
      <!-- <li>
        <router-link to="/myMeasure">
          <img src="./img/ceding.png" alt />
          <p>体质测定</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>-->
      <li>
        <router-link
          :to="{
          path: '/warrantyList',
          query: {
            id: userInfo.id
          }
        }"
        >
          <img src="./img/baoxiu.png" alt />
          <p>我的报修</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>
      <li>
        <router-link
          :to="{
          path: '/promotion',
          query: {
            id:userInfo.id
          }
        }"
        >
          <img src="./img/yueke.png" alt />
          <p style="margin-left: -64%;">优惠码</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>
       <li>
        <router-link
          :to="{
          path: '/user/myCrowd',
          query: {
            id:userInfo.id
          }
        }"
        >
          <img src="./img/wodejianshenqun.png" alt />
          <p style="margin-left: -64%;">健身群</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>
       <!-- <li>
        <router-link :to="'/activity'">
          <img src="./img/activity.png" alt />
          <p style="margin-left: -69%;">活动</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li> -->
      <li>
        <router-link to="/sysConfig">
          <img src="./img/shezhi.png" alt />
          <p style="margin-left: -69%;">设置</p>
          <img src="./img/jt.png" alt />
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { zlbFun } from "@/util/Tool";
import { mobileUserInfo, instructorGroup, getUserDetail } from "@/http/api";
import { mapGetters } from "vuex";
import cookieTool from "@/util/cookie";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      userInfo: "",
      showcoach: 0,
      userName: "",
      image: "",
      sex: 5,
      name: "",
      tel: "",
      code: ""
    };
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },

  methods: {
    //获取用户详情
    getUserInfo() {
      getUserDetail()
        .then(res => {
          if (res.code == 0) {
            if (res.data.image.id) {
              this.$refs.sonImg.style.backgroundImage =
                "url(" + this.ImageUrl + res.data.image.id + ")";
            }
            console.log(res.data);
            this.userInfo = res.data;
            this.$refs.sonImg.style.backgroundRepeat = "no-repeat";
            this.$refs.sonImg.style.backgroundPosition = "center";
            this.$refs.sonImg.style.backgroundSize = "cover";
            this.$store.state.userInfo = {
              id: res.data.id,
              imageid: this.ImageUrl + res.data.image.id,
              realName: res.data.realName,
              userName: res.data.userName,
              sex: res.data.sex
            };
            console.log(this.$store.state.userInfo);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                id: res.data.id,
                imageid: this.ImageUrl + res.data.image.id,
                realName: res.data.realName,
                userName: res.data.userName,
                sex: res.data.sex
              })
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    goPersonal() {
      this.$router.push({
        path: "/personalInfo",
        query: {
          id: this.userInfo.id
        }
      });
    },
    onClickLeft() {
      this.$router.push({
        path: "/"
      });
    },
    // 我的测定
    vd() {
      this.$router.push({
        path: "/myMeasure"
      });
    },
    gowarrant() {
      this.$router.push({
        path: "/warrantyList"
      });
    }
  },
  filters: {
    //姓名脱敏
    noPassByName(str) {
      if (null != str && str != undefined) {
        if (str.length <= 3) {
          return "*" + str.substring(1, str.length);
        } else if (str.length > 3 && str.length <= 6) {
          return "**" + str.substring(2, str.length);
        } else if (str.length > 6) {
          return str.substring(0, 2) + "****" + str.substring(6, str.length);
        }
      } else {
        return "";
      }
    }
  },
  computed: {
    ...mapGetters(["userMsg", "userInformation"])
  },
  mounted() {
    //  alert(document.cookie)
    //  alert(cookieTool.getCookie("front-token"));
    //  alert(cookieTool.getCookie("tabbar",true));
    // if (cookieTool.getCookie("tabbar", true)) {
    //   //app端隐藏底部tab
    //   localStorage.setItem("flag", cookieTool.getCookie("tabbar", true));
    //   this.$store.state.flag = "yes";
    // }
  },
  created() {
    //用户详情
    this.getUserInfo();
    //记录首页状态判断返回个人中心还是首页
    window.sessionStorage.setItem("fromindex", 0);
    zlbFun("个人中心");
    this.$store.state.states = { stateings: 1 };
    if (JSON.parse(this.userMsg).role.indexOf("CompCoach") != -1) {
      this.showcoach = 1;
    }
    const userId = JSON.parse(this.userMsg).userId;
    //  const userId=21
    mobileUserInfo({ userId: userId }).then(res => {
      this.userName = res.user.username;
      this.sex = res.user.sex;
      this.image = res.user.image;
      // console.log(res.user.sex=='');
    });
    console.log(JSON.parse(this.userMsg));
    let code = this.userInformation.mobile;
    // console.log(this.userInformation);
    this.name = this.userInformation.realname;
    this.tel = this.userInformation.mobile;
    instructorGroup({ code }).then(res => {
      // console.log(res);
      this.code = res.data;
    });
  }
};
</script>
<style lang="less" scoped>
.onself_big {
  height: 100%;
  background-color: #f6f8f7;
}
header {
  width: 100%;
  height: 7.65rem;
  //  opacity:0.79;
  // background: url('./img/header_bgc.png') no-repeat;
  background: url(./img/header_bgc.png) no-repeat center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left_top {
    display: flex;
  }
  .right_top {
    color: #fff;
    font-size: 12px;
    margin-right: 1rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      border: none;
      box-shadow: none;
      margin-right: 5px;
      margin-left: 0;
    }
    p {
      text-align: center;
    }
  }
  img {
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    margin-left: 0.65rem;
    border: 4px solid #fff;
    box-shadow: 0px 0px 12px 0px rgba(35, 52, 61, 0.3);
  }
  h4 {
    margin: 0.9rem;
    color: #fff;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 1.05rem;
  }
  .woman {
    background: url(img/nv.png) no-repeat center;
    background-size: cover;
    width: 3.5rem;
    height: 3.5rem;
    // background-position: -0.8rem 0;
    border-radius: 50%;
    margin-left: 0.65rem;
    border: 0.15rem solid white;
  }
  .son {
    width: 2.5rem;
    height: 2.5rem;
    // background-position: -0.8rem 0;
    border-radius: 50%;
    margin-left: 1rem;
    background-image: url(./img/nan.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}

.row {
  display: flex;
  justify-content: center;
  margin-top: 0.875rem;
  height: 2.9rem;
  position: relative;
  .row_container {
    display: flex;
    width: 93%;
    height: 4.875rem;
    justify-content: space-between;
    position: absolute;
    top: -2.4rem;
    background-color: #fff;
    border-radius: 5px;
    padding: 0.75rem;
    left: 50%;
    transform: translate(-50%, 0px);
    img {
      width: 2.1rem;
      height: 2.1rem;
    }
  }
  li {
    width: 3rem;
    img {
      display: block;
      margin: 0 auto;
      width: 1.5rem;
      height: 1.5rem;
    }
    p {
      font-size: 0.6rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 1.05rem;
      text-align: center;
    }
  }
}
.line {
  li {
    width: 93%;
    height: 2rem;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rem 0.25rem 0.6rem 0rem rgba(174, 178, 198, 0.3);
    // border:1px solid black;
    padding: 0 0.9rem;
    display: flex;
    align-items: center;
    & > a {
      margin-top: 0.05rem;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      img:nth-of-type(1) {
        width: 0.8rem;
        height: 0.8rem;
      }
      p {
        // height:0.675rem;
        font-size: 0.7rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 1.05rem;
        margin-left: -60%;
      }
      img:nth-of-type(2) {
        width: 0.8rem;
        height: 0.9rem;
        float: right !important;
      }
    }
  }
  & > li:last-child {
    margin-top: 0.5rem;
  }
}
</style>