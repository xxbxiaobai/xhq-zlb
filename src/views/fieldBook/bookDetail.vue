<template>
  <div>
    <div v-cloak id="popup" @click="popupHide">
      <div class="overlay"></div>
      <div class="content">
        <section class="srv-time-selector" v-show="switchShow">
          <div class="bar bar-1">
            <img width="8" src="./static/images/fanhui_weici2_icon.png" @click="onclickLeft" />
            <!-- <h1>{{cdlxName}}</h1> -->
            <van-dropdown-menu>
              <van-dropdown-item v-model="value_item" :options="option1" @change="selectItem"/>
            </van-dropdown-menu>
          </div>
          <div class="bd">
            <div class="header">
              <div class="data-picker">
                <div class="wrapper">
                  <button
                    v-for="(date, index) in dates.nowMonth"
                    :key="index"
                    :id="'scroll-' + index"
                    :class="[{current: date.current}]"
                    @click="selectedNow(index, date,$event)"
                  >
                    {{date.week}} {{date.month}}/{{date.day}}
                    <!-- <span>{{date.appointment ? '可预约' : '暂不可约'}}</span> -->
                  </button>
                  <!-- <button
                    v-for="(date, index) in dates.nextMonth"
                    :id="'scroll-next-' + index"
                    :class="[{current: date.current}, {'appointment': !date.appointment}]"
                    @click="selectedNext(index, $event)"
                  >
                    {{date.week}} {{date.month}}/{{date.day}}
                    <span>{{date.appointment ? '可预约' : '暂不可约'}}</span>
                  </button>-->
                </div>
              </div>
              <!-- <button class="cal" @click="tableShow">
                <img width="16" src="static/images/rili_weici2_icon@2x.png" alt />
                <span>30天</span>
              </button>-->
            </div>
            <!-- <div
              :class="['no-sel', {'not-chose-time': isChoseTime}]"
              @click="notChoseTime"
              v-show="isChoseTimeShow"
            >
              <p>暂不选择服务时间</p>
              <p>之后可以在我的订单页面选择</p>
            </div>-->
            <div class="hours">
              <div class="left">
                <ul>
                  <li v-for="(item,i) in times" :key="i">{{item}}</li>
                </ul>
              </div>
              <div class="wrapper" v-for="(date,i) in list" :key="i">
                <div
                  :class="{'chose-time': !isChoseTime}"
                  v-if="isFirstDay === 0"
                  class="close_con"
                >
                  <div style="text-align: center;margin-bottom: 10px;">{{date.cdhmData[0].cdhmName}}</div>
                  <button
                    :class="['hour-this',{'not-can-use':hour.status == 2}]"
                    v-for="(hour, key) in date.cdhmData"
                    @click="timeChose(key, $event)"
                    :key="key"
                  >
                    ￥{{hour.price}}
                    <input type="hidden" :value="hour.cdhmName" class="sysplace" />
                    <input type="hidden" :value="hour.cdhmId" class="sysplace_id" />
                    <input type="hidden" :value="hour.startTime" class="sysplace_time" />
                    <input type="hidden" :value="hour.cdlxId" class="sysplace_cdlxId" />
                  </button>
                </div>
                <!-- <div :class="{'chose-time': !isChoseTime}" v-else class="close_con">
                  <div style="text-align: center;margin-bottom: 10px;">{{i+1}}号场地</div>
                  <button
                    class="hour-this"
                    v-for="(hour, key) in date.cdhmData"
                    @click="timeChose(key, $event)"
                    :key="key"
                  >{{hour.startTimeName + '-' + hour.endTimeName}}
                    <br>￥{{hour.price}}
                  </button>
                </div>-->
              </div>
              <!-- <div class="wrapper" v-else-if="date.current && !date.appointment">
                <div class="tips">
                  <img class="null-tips" src="static/images/baoqian_weici2_icon.png" alt />
                  <p>抱歉，今天的服务暂时不能预约哦~</p>
                </div>
              </div>-->
              <!-- <div
                class="wrapper"
                v-for="date in dates.nextMonth"
                v-if="date.current && date.appointment"
              >
                <div :class="{'chose-time': !isChoseTime}">
                  <button
                    class="hour-this"
                    v-for="hour in date.hours"
                    @click="timeChose(key, $event)"
                  >{{hour.hour}}</button>
                </div>
              </div>
              <div class="wrapper" v-else-if="date.current && !date.appointment">
                <div class="tips">
                  <img class="null-tips" src="static/images/baoqian_weici2_icon.png" alt />
                  <p>抱歉，今天的服务暂时不能预约哦~</p>
                </div>
              </div>-->
            </div>
            <div class="out">
              <button class="submit" @click="submitFunc">确定</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import "@/util/jquery.min.js";
import { gymsBookList } from "@/http/api";
export default {
  data() {
    return {
      id: "35073",
      // id: "",
      value_item: '',
      value_text: '',
      date_select: '',
      option1: [],
      cdlxName: "",
      list: [],
      switchShow: true,
      currentMonth: null,
      currentHours: null,
      isFirstDay: 0,
      popupShow: false,
      isChoseTime: true,
      isChoseTimeShow: true,
      nextProtoWeek: null,
      nullDay: [],
      nextNullDay: [],
      dates: {
        nowMonth: [],
        nextMonth: []
      },
      times: [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00"
      ]
    };
  },
  methods: {
    onclickLeft() {
      this.$router.go(-1);
    },
    getGymList(time) {
      gymsBookList(this.id, {
        cdDate: time
      })
        .then(res => {
          if (res.resp_code === 0) {
            this.list = res.datas.data;
            this.cdlxName = res.datas.cdlxName;
            this.option1 = res.datas.cdlxData.map((item, i) => {
              return Object.assign(item, {
                type: item.type,
                text: item.name,
                value: item.cdForeignId
              });
            });
             var vals = res.datas.cdlxData.find((item, i) => {
              return item.name == this.cdlxName;
            })
            this.value_item = vals.cdForeignId
          }else{
            this.list = []
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择项目
    selectItem(val){
      console.log(val);
      this.value_text = this.option1.find((item,i) => {
        console.log(item);
        return item.value === val
      }).type
      console.log(this.value_text);
      if(this.value_text === 3){
        this.$router.push({
          path:'/swimBook',
          query: {
            id: this.value_item
          }
        })
      }
      this.id = this.value_item
      this.getGymList(this.date_select)
    },
    //选择日期
    selectedNow: function(index, date, event) {
      console.log(date);
      this.date_select = String(date.year) + "-" + String(date.month) + "-" + String(date.day)
      this.getGymList(
        String(date.year) + "-" + String(date.month) + "-" + String(date.day)
      );
      for (var date in this.dates.nowMonth) {
        this.dates.nowMonth[date].current = false;
      }
      for (date in this.dates.nextMonth) {
        this.dates.nextMonth[date].current = false;
      }

      // if (!this.dates.nowMonth[index].appointment) {
      //   this.isChoseTimeShow = false;
      // } else {
      //   this.isChoseTimeShow = true;
      //   this.isChoseTime = true;
      // }

      this.tableHide();
      this.dates.nowMonth[index].current = true;
    },
    // selectedNext: function(index, event) {
    //   for (date in this.dates.nextMonth) {
    //     this.dates.nextMonth[date].current = false;
    //   }
    //   for (date in this.dates.nowMonth) {
    //     this.dates.nowMonth[date].current = false;
    //   }

    //   if (!this.dates.nextMonth[index].appointment) {
    //     this.isChoseTimeShow = false;
    //   } else {
    //     this.isChoseTimeShow = true;
    //     this.isChoseTime = true;
    //   }

    //   this.isChoseTime = true;
    //   this.tableHide();

    //   this.dates.nextMonth[index].current = true;
    // },

    // tableShow: function() {
    //   this.switchShow = false;
    // },

    tableHide: function() {
      this.switchShow = true;
    },

    timeChose: function(key, event) {
      this.isChoseTime = false;
      //   $(event.target)
      //     .siblings()
      //     .removeClass("chosed");
      $(event.target).toggleClass("chosed");
    },

    notChoseTime: function() {
      this.isChoseTime = true;
    },

    popupHide: function() {
      //   popupShow = false;
    },

    // submit
    submitFunc: function() {
      var time, subInfo;
      var choseH = [];

      for (var ts in this.dates.nowMonth) {
        if (this.dates.nowMonth[ts].current == true) {
          time = this.dates.nowMonth[ts];
        }
      }
      for (var tc in this.dates.nextMonth) {
        if (this.dates.nextMonth[tc].current == true) {
          time = this.dates.nextMonth[tc];
        }
      }

      var choseHours = $(".hour-this");
      var noSel = $(".no-sel");
      if (noSel.hasClass("not-chose-time")) {
        choseH = null;
      } else {
        for (var h = 0; h < choseHours.length; h++) {
          if (choseHours.eq(h).hasClass("chosed")) {
            var sysplace = choseHours
              .eq(h)
              .find(".sysplace")
              .val();
            var sys_id = choseHours
              .eq(h)
              .find(".sysplace_id")
              .val();
            var start_time = choseHours
              .eq(h)
              .find(".sysplace_time")
              .val();
            var sysplace_cdlxId = choseHours
              .eq(h)
              .find(".sysplace_cdlxId")
              .val();
            choseH.push({
              price: choseHours.eq(h).text(),
              place: sysplace,
              cdhmId: sys_id,
              startTime: start_time,
              cdlxId: sysplace_cdlxId
            });
          }
        }
      }

      subInfo = {
        day: time,
        hour: choseH
      };
      console.log(subInfo);
      this.$store.state.placeInfo = subInfo;
      sessionStorage.setItem('placeInfo', JSON.stringify(subInfo));
      if (subInfo.hour.length > 0) {
        this.$router.push({
          path: '/orderSubmit',
          query: {
            cdlxName: this.cdlxName,
            id: this.id
          }
        });
      } else {
        this.$toast("请选择场次");
      }
    }
  },
  created: function() {
    // this.id = this.$route.query.id
    this.getGymList();
    var totalDays = 7,
      date = new Date(),
      currentYears = date.getFullYear(),
      week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"),
      currentMonth = date.getMonth() + 1,
      currentDay = date.getDate(),
      protoWeek = date.getDay(),
      currentHours = date.getHours(),
      hours = [
        { hour: "8:00-9:00" },
        { hour: "9:00-10:00" },
        { hour: "10:00-11:00" },
        { hour: "11:00-12:00" },
        { hour: "12:00-13:00" },
        { hour: "13:00-14:00" },
        { hour: "14:00-15:00" },
        { hour: "15:00-16:00" },
        { hour: "16:00-17:00" },
        { hour: "17:00-18:00" },
        { hour: "18:00-19:00" },
        { hour: "19:00-20:00" },
        { hour: "20:00-21:00" },
        { hour: "21:00-22:00" },
        { hour: "22:00-23:00" },
        { hour: "23:00-24:00" }
      ];

    this.currentYears = currentYears;
    this.currentMonth = currentMonth;
    this.currentDay = currentDay;
    this.currentHours = currentHours;
    console.log(this.currentDay);

    for (var i = 0; i < totalDays; i++) {
      var month = date.getMonth() + 1,
        month = String(month).length == 1 ? "0" + month : month;
      var day =
          String(date.getDate()).length == 1
            ? "0" + date.getDate()
            : date.getDate(),
        proteWeek = date.getDay(),
        timestamp = date.getTime();

      // if (proteWeek == 0 || proteWeek == 6) {
      //   appointment = false;
      // }

      var d = {
        timestamp: timestamp,
        year: currentYears,
        month: month,
        day: day,
        proteWeek: proteWeek,
        week: week[proteWeek],
        hours: hours,
        current: false
      };

      // if (month == currentMonth) {
      //   this.dates.nowMonth.push(d);
      // } else {
      //   this.dates.nextMonth.push(d);
      // }
      this.dates.nowMonth.push(d);

      date.setDate(date.getDate() + 1);
    }

    this.dates.nowMonth[0].current = true;
    // this.nextProtoWeek = this.dates.nextMonth[0].proteWeek;
    console.log(this.nextProtoWeek);
    console.log(this.dates);

    for (var j = 0; j < protoWeek; j++) {
      this.nullDay.push("");
    }

    for (var k = 0; k < this.nextProtoWeek; k++) {
      this.nextNullDay.push("");
    }
  }
};
</script>
<style lang="less" scoped>
@import "./static/style.css";
.close_con {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.hours {
  .left {
    margin-top: 1.3rem;
    margin-right: 0.5rem;
    li {
      height: 2.15rem;
    }
  }
}
</style>