<template>
  <div class="app1">
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="onchangeAction"
      />
      <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
    </van-dropdown-menu>
    <div class="school_site">
      <span class="school_label">学校场地热度</span>
    </div>
    <div class="school_one" v-for="(item, key) in listconten" :key="key">
      <span class="school_name">{{ item.name }}</span>
      <div class="school_jd">
        <van-progress
          :percentage="item.pointNum"
          stroke-width="15"
          :show-pivot="false"
          :color="
            key == 0
              ? 'linear-gradient(to right, #F9A473, #FE347D)'
              : 'linear-gradient(to right, #6766F1, #5EBDF0)'
          "
        />
      </div>
      <span class="school_bf">{{ item.point }}</span>
    </div>
    <div class="school_site">
      <span class="school_label">健身情况</span>
    </div>
    <div class="fitness_qk">
      <div class="fitness_by1">
        <span style="color: #6986f1">{{ month }}</span>
        <span>本月健身次数</span>
      </div>
      <div class="fitness_by2">
        <span style="color: #f27c37">{{ year }}</span>
        <span>年度健身次数</span>
      </div>
      <div class="fitness_by3">
        <span style="color: #50ce80">{{ sort }}</span>
        <span>年度健身排名</span>
      </div>
    </div>
    <div class="school_site">
      <span class="school_label">健身次数</span>
    </div>
    <div id="timesEchart" ></div>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="friends-o">
        人员列表
      </van-tabbar-item>
      <van-tabbar-item replace to="/perMap" icon="location-o">
        地图
      </van-tabbar-item>
      <van-tabbar-item replace to="/DataStatistics" icon="chart-trending-o">
        数据统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  Image as VanImage,
  Progress,
  DropdownMenu,
  DropdownItem,
  Field,
  Button,
  Cell,
  CellGroup,
  Toast,
  Tabbar,
  TabbarItem,
} from "vant";
// import domain from '../../domain.js'
import { PersonnelInformation, wxPersonRe, frequency } from "../../http/api";
export default {
  components: {
    [VanImage.name]: VanImage,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Progress.name]: Progress,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },

  data() {
    return {
      //   title: '赛事活动',
      listconten: [],
      phone: "",
      listimg: require("./images/icon_more@2x.png"),
      value1: "",
      option1: [],
      year: "",
      month: "",
      sort: "",
      Cyear:[],
      Cmonth:[],
      Ctime:[]
    };
  },
  // 计算属性
  computed: {
    // submitBarText() {
    //   const count = this.checkedGoods.length;
    //   return '结算' + (count ? `(${count})` : '');
    // },
    // totalPrice() {
    //   return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
    // }
  },
  // 函数要在这个方法下面添加
  methods: {
    echart() {
      console.log(123);
      console.log(this.Cyear)
      var chartDom = document.getElementById("timesEchart");
      var myChart = this.$echarts.init(chartDom);
      var option;
      
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.Cmonth,
           axisLine: {
                    lineStyle: {
                        // type: 'solid',
                        color: 'grad',//左边线的颜色
                        width:'1'//坐标线的宽度
                    },
                    symbol:['none','arrow']
                },
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
           axisLine: {
                    lineStyle: {
                       // type: 'solid',
                        color: 'grad',//左边线的颜色
                        width:'1'//坐标线的宽度
                    },
                     symbol:['none','arrow']
                },
        },
        series: [
          {
            data: this.Ctime,
            type: "bar",
            // label:{
            //   normal:{
            //     show:true,
            //     position:'inside',
            //     rotate:'90',
            //     verticalAlign:'middle',
            //     algin:'left',
            //     textStyle:{
            //       color:'black',
            //       formatter:function(value){
            //           return value.split("").join("\n");
            //       }
            //     }
            //   }
            // }
          },
        ],
        textStyle: {
          color: "gray",
        },
        itemStyle: {
          //---图形形状
          color: 'rgb(31,173,248)',
          barBorderRadius: [15, 15, 0, 0],
        },
        
      };
      myChart.resize();
      myChart.setOption(option);
    },
    onchangeAction(val) {
      console.log(val);
      this.StaffFitness(val);
      this.Times(val)
    },
    DataRequest(phone) {
      Toast.loading({
        message: "请稍等...",
        forbidClick: true,
        duration: 0,
      });
      PersonnelInformation({
        mobile: phone,
      })
        .then((response) => {
          console.log(response.data);
          // eslint-disable-next-line eqeqeq
          if (response.code == 0) {
            response.data.forEach((item) => {
              var obj = { text: item.username, value: item.idCardNo }
              this.option1.push(obj)  
            });
            this.value1 = response.data[0].idCardNo;
            // alert(response.data[0].data[0].idCardNo);
            this.StaffFitness(this.value1);
            this.Times(this.value1);
          }
        })
        .catch(function (error) {
          console.log(error);
          // 取消等待
          Toast.clear();
        });
    },
    StaffFitness(key) {
       Toast.loading({
        message: "请稍等...",
        forbidClick: true,
        duration: 0,
      });
      wxPersonRe({
        idCardNo: key,
      })
        .then((response) => {
          // eslint-disable-next-line eqeqeq
          if (response.code == 0) {
            var data = []
            this.year = response.data[0].yearFit;
            this.month = response.data[0].monthFit;
            this.sort = response.data[0].yearFitOrder;
            response.data[0].schoolData.forEach((item) => {
              // console.log(item)
              data.push(item)
              this.listconten =data ;
            });
          }
          // 取消等待
          Toast.clear();
        })
        .catch(function (error) {
          // 取消等待
          Toast.clear();
          console.log(error);
        });
    },
    Times(key) {
      frequency({
        idCardNo: key,
      }).then((res) => {
        var cyearData = [];
        var ctimeData = [];
        for(var i = 0; i<res.list.length; i++){
          //  this.Cyear.push(res.list[i].month.slice(0,4)+'年')
          cyearData.push(res.list[i].month.slice(5,7))
          ctimeData.push(res.list[i].count)
          this.Cmonth = cyearData
          this.Ctime = ctimeData
        }
         this.echart();
      });
    },
    Persdetails(key) {
      this.$router.push({
        path: "/persondetails",
        name: "persondetails",
        query: {
          key: key,
          phone: this.phone,
        },
      });
    },
    addperson() {
      this.$router.push({
        path: "/PersonInfo",
        name: "PersonInfo",
        query: {
          phone: this.phone,
        },
      });
    },
  },
  created() {
    // this.echarts()
    // this.title = '个人信息'
    // this.RightText = '提交'
    //备注备注
    console.log(JSON.parse(localStorage.getItem("userDetails")))
    this.phone = JSON.parse(localStorage.getItem("userDetails")).mobile;
    // alert(phone)
    // eslint-disable-next-line no-undef
    this.DataRequest(this.phone);
    // this.Times()
    // this.SchoolHeat()
  },
  //   beforeCreate() {
  //     document.querySelector('body').setAttribute('style', 'background:#F6FAFD')
  //   },
  //   beforeDestroy() {
  //     document.querySelector('body').setAttribute('style', '')
  //   }
  mounted() { 
   
  },
};
</script>
<style>
.app1 {
  font-family: "Avenir", Helvetica, Arial, sans-serif !important;
  -moz-osx-font-smoothing: grayscale;
  text-align: center !important;
  color: #2c3e50;
}
</style>
<style lang="less">
body {
  width: 100%;
  height: 100%;
  //   position: relative;
  background-color: #f6fafd;
}
.van-dropdown-menu__title::after {
  margin-top: -5px;
}
.van-cell__title {
  text-align: left;
  color: #666;
  font-size: 12px;
  margin-right: -80px;
}
.van-cell__label {
  font-weight: bolder;
  color: #000;
  font-size: 14px;
}

.van-cell-group {
  margin: 10px;
  border-radius: 5px;
}
.school_site {
  text-align: left;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
  span {
    font-weight: bold;
  }
}
.school_one {
  line-height: 30px;
  margin-top: 5px;
  span {
    font-size: 14px;
  }
}
.school_name {
  float: left;
  margin-left: 0px;
  width: 120px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.school_jd {
  float: left;
  margin-left: 10px;
  margin-top: 8px;
  width: 50%;
}
.fitness_qk {
  line-height: 25px;
}
.fitness_by1 {
  float: left;
  width: 33%;
  background-color: white;
  span {
    display: block;
    font-size: 14px;
  }
}
.fitness_by2 {
  float: left;
  width: 33%;
  background-color: white;
  span {
    display: block;
    font-size: 14px;
  }
}
.fitness_by3 {
  // float: left;
  // width: 33%;
  background-color: white;
  span {
    display: block;
    font-size: 14px;
  }
}
#timesEchart {
  position: relative;
  width: 100%;
  height: 300px;
  margin: 0 auto;
  margin-top: 60px;
  bottom: 50px;
  background-color: #fff;
}
</style>
