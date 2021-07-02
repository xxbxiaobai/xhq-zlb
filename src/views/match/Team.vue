<template>
  <div id="home">
    <Tabar :title="title"></Tabar>
    <div class="box">
      <p>团体名称</p>
      <input type="text" placeholder="请输入团体名称" @blur="checkname" v-model="name" />
    </div>
    <div class="box">
      <p>身份证号</p>
      <input
        type="text"
        placeholder="请输入证件号码"
        @blur="checkcard"
        v-model="card"
        :readonly="showCard"
      />
    </div>
    <div class="box">
      <p>手机号码</p>
      <input type="text" placeholder="请输入电话号码" @blur="checktel" v-model="tel" :readonly="showNum" />
    </div>
    <div class="box-number">
      <div class="number">
        <p>团体人数</p>
        <input type="text" v-model="people" placeholder="请输入" @blur="checkpeople" />
      </div>
      <div class="number">
        <p>领队</p>
        <input
          type="text"
          v-model="bossname"
          placeholder="请输入"
          @blur="checkname1"
          :readonly="showName"
        />
      </div>
    </div>
    <div class="bottom">
      <button @click="submit">创建团体</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar";
import { mapGetters } from "vuex";
import { insertTeam } from "../../http/api";
export default {
  data() {
    return {
      title: "团体报名",
      name: "",
      card: "",
      tel: "",
      people: "",
      bossname: "",
      showName: false,
      showNum: false,
      showCard: false,
      teamId: ""
    };
  },
  components: {
    Tabar
  },
  methods: {
    checkname() {
      var pass = this.validata.checkname(this.name);
      if (!pass) {
        this.$toast("名称不正确");
        return false;
      }
      return true;
    },
    checkcard() {
      var id = this.validata.identify(this.card);
      if (!id) {
        this.$toast("身份证号码输入错误");
        return false;
      }
      return true;
    },
    checktel() {
      var num = this.validata.number(this.tel);
      if (!num) {
        this.$toast("电话号码输入错误");
        return false;
      }
      return true;
    },
    checkpeople() {
      var num = this.validata.people(this.people);
      if (!num) {
        this.$toast("输入错误");
        return false;
      }
      return true;
    },
    checkname1() {
      var num = this.validata.checkname(this.bossname);
      if (!num) {
        this.$toast("输入格式错误");
        return false;
      }
      return true;
    },
    submit() {
      insertTeam({
        teamMember: this.people,
        teamName: this.name,
        leadIdCard: this.card,
        leadName: this.bossname,
        leadPhone: this.tel,
        actId: this.$route.query.id
      }).then(res => {
        if (res.code == 0) {
          this.teamId = res.teamId
          this.$router.push({
            path: "/establish",
            query: {
              teamId: this.teamId,
              id: this.$route.query.id,
              healthid: this.$route.query.healthid,
              startTime: this.$route.query.startTime
            }
          });
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //脱敏
    noPassByName(str) {
      console.log(str);
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
    },
    idCardNo(value, row, index) {
      var len = value.length;
      var xx = value.substring(1, len - 1);
      var values = value.replace(xx, "****************");
      return values;
    },
    mobile(value, row, index) {
      var len = value.length;
      var xx = value.substring(3, len - 4);
      var values = value.replace(xx, "****");
      return values;
    }
  },
  computed: {
    ...mapGetters(["userMsg", "userInformation"])
  },
  created() {
    console.log(this.$route.query.id)
    // if (this.userInformation.realname) {
    //   this.showName = true;
    //   this.bossname = this.userInformation.realname;
    // }
    // if (this.userInformation.mobile) {
    //   this.showNum = true;
    //   this.tel = this.userInformation.mobile;
    // }
    // if (this.userInformation.idCardNo) {
    //   this.showCard = true;
    //   this.card = this.userInformation.idCardNo;
    // }
    // this.bossname = this.noPassByName(this.bossname);
    // this.card = this.idCardNo(this.card);
    // this.tel = this.mobile(this.tel);
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #fff;
  .box {
    padding: 0.5rem 0.6rem 0 0.6rem;
    p {
      font-size: 0.7rem;
      color: #333333;
      margin-bottom: 0.5rem;
    }
    input {
      -webkit-appearance: none;
      border: 1px solid rgba(231, 231, 231, 1);
      width: 100%;
      height: 1.8rem;
      padding-left: 0.5rem;
      font-size: 0.7rem;
      border-radius: 0.25rem;
      &::placeholder {
        transform: translate(0, -0.1rem);
      }
    }
  }
  .box-number {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.6rem 0 0.6rem;
    .number {
      p {
        font-size: 0.7rem;
        color: #333333;
        margin-bottom: 0.5rem;
      }
      input {
        -webkit-appearance: none;
        border: 1px solid rgba(231, 231, 231, 1);
        width: 8.25rem;
        height: 1.8rem;
        padding-left: 0.5rem;
        font-size: 0.7rem;
        border-radius: 0.25rem;
        // input输入框placeholder文字居中
        &::placeholder {
          transform: translate(0, -0.1rem);
        }
      }
    }
  }
  .bottom {
    margin-top: 8rem;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    button {
      width: 17.5rem;
      height: 2rem;
      background-color: #1492ff;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.25rem;
    }
  }
}
</style>
