<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="站点详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 填选内容 -->
    <section>
      <h5 style="margin-top:-0.5rem">姓名：</h5>
      <!-- <input class="input" v-model="names" placeholder="请输入姓名" /> -->
      <van-field
        :readonly="showName"
        v-model="names"
        label
        :error="warn.nameId!=''&&warn.nameId!='请输入'"
        :placeholder="warn.nameId"
        maxlength="18"
        @blur="onNameId"
        @click="warn.nameId='请输入'"
      />

      <h5>证件号码：</h5>
      <!-- <input class="input" v-model="identity" placeholder="请输入证件号码" @blur="vula" /> -->
      <van-field
        :readonly="showId"
        v-model="identity"
        label
        :error="warn.identification!=''&&warn.identification!='请输入'"
        :placeholder="warn.identification"
        maxlength="18"
        @blur="onIdentification"
        @click="warn.identification='请输入'"
      />
      <!-- <div style="height:20px">
        <p v-if="zheng" style="color:red;font-size:11px">证件号码输入错误</p>
      </div>-->
      <h5>手机号码：</h5>
      <!-- <input class="input" v-model="tel" placeholder="请输入手机号码" @blur="vulb" /> -->
      <van-field
        :readonly="showCall"
        v-model="tel"
        label
        :error="warn.playcall!=''&&warn.playcall!='请输入'"
        :placeholder="warn.playcall"
        maxlength="18"
        @blur="onplaycall"
        @click="warn.playcall='请输入'"
      />
      <!-- <div style="height:20px">
        <p v-if="shou" style="color:red;font-size:11px">手机号码输入错误</p>
      </div>-->
      <h5>时间选择</h5>
      <!-- <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
      />-->
      <nobr>
        <article class="times">
          <button @click="btz">
            <img src="./img/zuo.png" alt />
          </button>
          <button @click="bty">
            <img src="./img/you.png" alt />
          </button>
          <ul class="week">
            <li>日期</li>
            <li>周</li>
            <li>上午</li>
            <li>下午</li>
          </ul>
          <div class="box">
            <ul ref="btn">
              <li>
                <div v-for="(i,index) in timess" :key="index">
                  <p>{{i.dateDay}}</p>
                  <p>{{i.dayOfWeek}}</p>
                  <p :class="{backg:i.dayMorning==0,backg1:index == bgt}" @click="check(index,i)">
                    <span></span>
                  </p>
                  <p
                    :class="{backg:i.dayAfternoon==0,backg1:index == bga}"
                    @click="checks(index,i)"
                  >
                    <span></span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </nobr>
      <h5>测定项目</h5>
      <ul class="choice">
        <li
          v-for=" (item,index) in states"
          :class="{color:item.state}"
          :key="index"
          @click="bt(index,item)"
        >{{item.name}}</li>
        <!-- tive = !tive -->
      </ul>
      <div class="tj" @click="tijiao">提交</div>
    </section>
  </div>
</template>
<script>
import Vue from "vue";
import { zlbFun, cardid } from "@/util/Tool";
import { mapGetters } from "vuex";
import { DatetimePicker, Toast } from "vant";
import {
  measurementntparticulars,
} from "../../http/api";
Vue.use(DatetimePicker).use(Toast);

export default {
  data() {
    return {
      showId: false,
      showCall: false,
      showName: false,
      value: "",

      date: "",
      states: [],
      tive: false,
      timess: [],
      names: "", //用户姓名
      identity: "", //省份证
      tel: "", //手机号
      arr: [],
      button: [], //获取点击状态
      zheng: false, //省份证验证
      shou: false, //手机验证
      time: [], // 时间选择
      bookDate: "", // 时间选择
      day: "", //选择状态
      dayMorn: [],
      bgt: 1000,
      bga: 1000,
      warn: {
        identification: "请输入", //身份证
        playcall: "请输入",
        nameId: "请输入"
      }
      // projectIds: [] //选择项目
    };
  },
  methods: {
    onplaycall() {
      let msg = cardid(this.tel);
      this.warn.playcall = msg[1];
      console.log(msg);
    },
    onIdentification() {
      console.log(cardid(this.user));
      console.log(1);
      let msg = cardid(this.identity);
      this.warn.identification = msg[1];
      console.log(msg);
    },
    onNameId() {
      let msg = cardid(this.names);
      this.warn.nameId = msg[1];
    },
    // 身份证验证
    vula() {
      const pattern1 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!pattern1.test(this.identity)) {
        Toast("身份证输入错误");
        console.log(123);
      }
    },
    //手机号验证
    vulb() {
      const call = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (!call.test(this.tel)) {
        Toast("手机号输入错误");
        console.log(123);
      }
    },
    // 返回上一层
    onClickLeft() {
      this.$router.go(-1);
      // this.$router.push({
      //   path: "/parti"
      // });
    },
    // 体检项目

    bt(index, item) {
      this.states[index].state = !this.states[index].state;
    },
    // 提交
    tijiao() {
      this.$router.push({
        path: "/submit"
      });
      // console.log(projectIds);
      // console.log(siteId, bookDate, day, projectIds, name, idCard, mobile);
    },
    // z左按钮
    btz() {
      console.log("左");
    },
    // 右按钮
    bty() {
      console.log("右");
    },
    // 上午选择时间
    check(i, e) {
      if (this.timess[i].dayMorning == 0) {
        (this.bookDate = this.time[i].dateDay), (this.day = 0);
        this.bgt = i;
        this.bga = 1000;
      }
      console.log(this.day);
      console.log(this.bookDate);
    },
    // 下午选择时间
    checks(i, e) {
      if (this.timess[i].dayAfternoon == 0) {
        (this.bookDate = this.time[i].dateDay), (this.day = 1);
        this.bga = i;
        this.bgt = 1000;
      }
      console.log(this.day);
      console.log(this.bookDate);
    },
    
    async funcawait() {
      let id = this.$route.query.siteId;
this.dayMorn={"projectList":[{"name":"选择反应时","id":258},{"name":"闭眼单脚站立","id":257},{"name":"身高","id":2},{"name":"体重","id":250},{"name":"肺活量","id":251},{"name":"台阶测试","id":252},{"name":"握力","id":253},{"name":"纵跳","id":254},{"name":"俯卧撑","id":255},{"name":"坐位体前屈","id":256},{"name":"仰卧起坐","id":312},{"name":"骨密度","id":314},{"name":"人体成分","id":315}],"site":{"bookDateType":0,"address":"杭州市黄龙路6号","servicePhone":"18958067991","latitude":30.267275,"display":0,"description":"国民体质测试11项、骨密度、体成分","partTimeNum":0,"areaName":"西湖区","openSituation":"固定时间开放","name":"杭州市国民体质监测中心","id":1,"openTime":"每周二、四上午","imageList":[{"id":"a91a39ab288347318e2c45a4af88c3b6","msgId":"1","fieldName":"MAP_MONITOR_SITE_LABEL","name":"下载 (2).jpg","isImg":true,"contentType":"image/jpeg","size":22218,"path":null,"url":"https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","ossurl":"zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","source":"ALIYUN","status":1,"mark":1,"insetsUrl":"https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","insetsOss":"mini_zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg","createTime":"2019-11-03T22:12:47.000+0000","pathDir":null}],"principalPhone":"18958067991","longitude":120.137255,"fullTimeNum":7},"bookDateList":[{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-03-30","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-03-31","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-01","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-02","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-03","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-04","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-05","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-04-06","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-04-07","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-08","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-09","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-10","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-11","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-12","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-04-13","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-04-14","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-15","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-16","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-17","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-18","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-19","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-04-20","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-04-21","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-22","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-23","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-24","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-25","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-26","dayMorning":1}]}
this.time=[{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-03-30","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-03-31","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-01","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-02","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-03","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-04","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-05","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-04-06","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-04-07","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-08","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-09","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-10","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-11","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-12","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-04-13","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-04-14","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-15","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-16","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-17","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-18","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-19","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":1,"dateDay":"2020-04-20","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":2,"dateDay":"2020-04-21","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":3,"dateDay":"2020-04-22","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":4,"dateDay":"2020-04-23","dayMorning":0},{"dayAfternoon":1,"dayOfWeek":5,"dateDay":"2020-04-24","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":6,"dateDay":"2020-04-25","dayMorning":1},{"dayAfternoon":1,"dayOfWeek":7,"dateDay":"2020-04-26","dayMorning":1}]
      this.funaws();
    },
    funaws() {
      this.date = this.dayMorn.site.bookDateType;
      // 星期筛选

      this.dayMorn.bookDateList.forEach(e => {
        switch (e.dayOfWeek) {
          case 1:
            e.dayOfWeek = "一";
            //  console.log(213)
            break;
          case 2:
            e.dayOfWeek = "二";
            break;
          case 3:
            e.dayOfWeek = "三";
            break;
          case 4:
            e.dayOfWeek = "四";
            break;
          case 5:
            e.dayOfWeek = "五";
            break;
          case 6:
            e.dayOfWeek = "六";
            break;
          case 7:
            e.dayOfWeek = "日";
            break;
        }
        e.dateDay = e.dateDay.slice(5, 10);
      });
      this.timess = this.dayMorn.bookDateList;

      // 项目

      this.dayMorn.projectList.forEach(i => {
        this.states.push({
          name: i.name,
          id: i.id,
          state: false
        });
      });
      // console.log(this.times);
      // });
    },
    user() {
      // let userInformation=JSON.parse(this.userInformation).userInformation
      console.log(this.userInformation);
      console.log(JSON.parse(this.userMsg).userId);
      //  selectTeenager({
      //         id: this.id || "",
      //         zuserId: JSON.parse(this.userMsg).userId
      //       }).then(res => {
      // console.log(res)
      //       })
    },
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
    // this.user()
    console.log(this.user);
    this.funcawait();
    // this.onNameId()
    if (this.userInformation.idCardNo) {
      this.showId = true;
      this.identity = this.userInformation.idCardNo;
      this.identity = this.idCardNo(this.identity);
    }
    if (this.userInformation.mobile) {
      this.showCall = true;
      this.tel = this.userInformation.mobile;
      this.tel = this.mobile(this.tel);
    }
    if (this.userInformation.realname) {
      this.showName = true;
      this.names = this.userInformation.realname;
      this.names = this.noPassByName(this.names);
    }
    console.log(this.userInformation);
  }
};
</script>
<style lang="less" scoped>
section {
  background: white;
  padding: 1.2rem 0.6rem;
  h5 {
    font-size: 0.7rem;
    color: #333333;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }
  .choice {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    li {
      // width: 4rem;
      height: 1.55rem;
      background: rgba(242, 242, 242, 1);
      border-radius: 0.15rem;
      text-align: center;
      line-height: 1.55rem;
      font-size: 0.7rem;
      color: #b4b4b4;
      margin: 0.15rem;
      overflow: hidden;
      padding: 0 0.625rem;
    }
  }
}
.types {
  display: flex;
  justify-content: space-around;
  div {
    margin: 0.5rem 0rem;
  }
  select {
    width: 8rem;
    color: #333333;
    border: 1px solid rgba(231, 231, 231, 1);
    height: 1.8rem;
    border-radius: 0.15rem;
  }
}
.input {
  width: 100%;
  padding: 0rem 0.8rem;
  line-height: 1.5rem;
  height: 1.8rem;
  font-size: 0.7rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border: 0.01rem solid rgba(231, 231, 231, 1);
  // box-shadow: 0 0 0  white;
  -webkit-appearance: none;
  border-radius: 0.15rem;
}
.tj {
  margin-top: 1.5rem;
  width: 100%;
  height: 2rem;
  background: #1492ff;
  line-height: 2rem;
  text-align: center;
  font-size: 0.9rem;
  font-family: PingFang SC;

  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border-radius: 0.15rem;
}
.times {
  position: relative;
  height: 6.275rem;
  margin: 0.5rem 0;
  button {
    width: 1.5rem;
    height: 6.375rem;
    background: #e5e5e5;
    border-radius: 0.125rem 0rem 0rem 0.125rem;
    float: left;
    img {
      width: 0.65rem;
      height: 0.85rem;
    }
  }
  button:nth-of-type(2) {
    float: right;
    border-radius: 0rem 0.125rem 0.125rem 0rem;
  }
  .week {
    width: 16%;
    height: 6.275rem;
    float: left;
    font-size: 0.6rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    li {
      border: 1px solid rgba(231, 231, 231, 1);
    }
    li:nth-of-type(1) {
      height: 1.25rem;
      line-height: 1.25rem;
    }
    li:nth-of-type(2) {
      height: 1.5rem;
      line-height: 1.5rem;
    }
    li:nth-of-type(3) {
      height: 1.8rem;
      line-height: 1.75rem;
    }
    li:nth-of-type(4) {
      height: 1.8rem;
      line-height: 1.8rem;
    }
  }
}
.box {
  width: 66%;
  height: 6.75rem;
  float: left;
  font-size: 0.6rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  overflow-x: auto;
  ul {
    display: flex;
  }
  li {
    width: 2.9rem;
    display: flex;

    p {
      width: 2.9rem;
      border: 0.01rem solid rgba(231, 231, 231, 1);
      margin: 0;
    }
    p:nth-of-type(1) {
      height: 1.25rem;
      line-height: 1.25rem;
    }
    p:nth-of-type(2) {
      height: 1.5rem;
      line-height: 1.5rem;
    }
    p:nth-of-type(3) {
      height: 1.8rem;
      line-height: 1.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p:nth-of-type(4) {
      height: 1.8rem;
      line-height: 1.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.color {
  background: #1492ff !important;
  color: #fff !important;
}
.backg {
  span {
    width: 26px;
    height: 22px;
    background-image: url(./img/duihao.png);
    background-size: 100%;
  }
}
.backg1 {
  background: #1492ff !important;
  span {
    width: 26px !important;
    height: 22px !important;
    background-image: url(./img/duihao1.png) !important;
    background-size: 100 !important;
  }
}
/deep/.van-field__label {
  width: 0;
}
/deep/.van-cell {
  // position: absolute;
  padding: 0.25rem 0.35rem;
  border: 0.05rem solid gainsboro;
}
</style>