<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="imgblock">
      <img src="./images/success.png" />
    </div>
    <div class="text">创建成功</div>
    <!-- <div>分享链接，邀请队员加入</div> -->
    <div class="btn">
      <button @click="into">点击添加队员</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar";
import { zlbFun } from "@/util/Tool";
import { teamevent } from "../../http/api";
export default {
  data() {
    return {
      title: "团体报名",
      href: null,
      teamname: "",
      actname: "",
      peoplename: ""
    };
  },
  components: { Tabar },
  methods: {
    getteamid() {
      teamevent({
        id: this.$route.query.teamId
      }).then(res => {
        console.log(res);
        this.teamname = res.data.teamName;
        this.actname = res.data.actName;
        this.peoplename = res.data.leadName;
      });
    },
    into() {
      this.$router.push({
        path: "/addPeople",
        query: {
          id: this.$route.query.id,
          teamId: this.$route.query.teamId,
          people: this.$route.query.people
        }
      });

      // this.href ='https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=qmjsggfwyy&goto='+ window.location.protocol+"//"+window.location.host + "/clickinto?teamId=" + this.$route.query.teamId + "&id=" + this.$route.query.id+"&status=1"
      // console.log(this.href)
      // this.href = window.location.href.split("#")[0] + "#/clickinto?teamId=" +  this.$route.query.teamId + "&id=" + this.$route.query.id + "&idcard=" + this.$route.query.idcard + "&healthid=" + this.$route.query.healthid + "&startTime=" + this.$route.query.startTime
      // console.log(this.href)
      // zlbFun("", () => {
      //   dd.biz.util.share({
      //     arg: { titleStr: this.peoplename + "团长邀请你加入" + this.teamname, contentStr: this.actname, imageStr: "分享图片路径", shareUrlStr: this.href },
      //     onSuccess: function(data) {},
      //     onFail: function(error) {}
      //   })
      // })
    }
  },

  created() {
    zlbFun("团体报名");
    this.getteamid();
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  height: 100%;
  padding-top: 3.5rem;
  background-color: #ffffff;
  div {
    font-size: 0.7rem;
    color: #666666;
    text-align: center;
    img {
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  .imgblock {
  }
  .text {
    font-size: 0.9rem;
    color: #000000;
    font-weight: 700;
    margin-top: 2.25rem;
    margin-bottom: 0.8rem;
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 8rem;
    button {
      width: 9.5rem;
      height: 2.05rem;
      background-color: #1492ff;
      color: #ffffff;
      font-size: 0.9rem;
      margin-top: 2.7rem;
      border-radius: 0.25rem;
    }
  }
}
</style>
