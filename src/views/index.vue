<template>
  <div class="container">
    <!-- <div class="bgcImg">
      <div class="top">
        <router-link to="/topSearch">
        <div class="search">
          <img src="../assets/home_bg_search@2x.png" alt />
          <img src="../assets/icon_search@2x.png" alt class="s_icon" />
          <span class="word_s">搜索关键字</span>
        </div>
        </router-link> 
        <div class="people" @click="$router.push('/same-city/crowd')">
          <img src="../assets/home_head_icon_group@2x.png" alt />
        </div>
        <div class="more">
          <van-cell @click="show_tip = true">
            <img src="../assets/home_head_icon_more@2x.png" alt />
          </van-cell>
        </div>
        <van-popup v-model="show_tip">
          <div class="more_tip">
            <ul>
              <li @click="$router.push('/myapplication')">我的赛事</li>
              <li @click="$router.push({
                path: '/orderList',
                query: {
                  id: userId
                }
              })">我的订单</li>
              <li @click="$router.push('/train')">我的申请</li>
            </ul>
          </div>
        </van-popup>
      </div>

    </div> -->
    <!-- 分类结束 -->
    <!-- 轮播图 -->
    <swiper id="swiper_index" :options="swiperOption" ref="mySwiper_i" v-if="goodVisibility">
      <swiper-slide v-for="(item,index) in banner" :key="index">
        <!-- <p class="banner-title">{{ item.actName ||''}}</p> -->
        <img :src="(item.fileImgList[0] === undefined) ? require('../assets/zwltsy.jpg') : (ImageUrl + item.fileImgList[0].id)" @click="goDetail(item.id,item.aType,item.isThematic,item.annId)" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
          <!-- 分类开始 -->
          <div style="">
      <ul class="top_grid">
        <li v-for="(item,i) in menuList" :key="i" @click="gotoPath(item.path)">
          <img :src="item.iconUrl" alt />
          <div>
              <span>{{item.iconText}}</span>
          </div>         
        </li>
      </ul>
          </div>
          <!--预约场馆-->
          <div class="an_instructor">
            <div class="an_appointment" @click="$router.push('/map/goodPathList')">              
              <span class="title">预约场馆</span>
              <div><span class="content">提供各类运动场馆预约</span></div>
            </div>
            <div class="an_appointment_right" @click="$router.push('/same-city/city')"><span class="title" style="color:#00B655">发起同城约</span>
              <div><span class="content" style="color:#58C681">健身同城约</span></div></div>
           <div class="an_appointment_bottom_right" @click="$router.push('/instructor')"><span class="title" style="color:#9755FE">查找指导员</span>
              <div><span class="content" style="color:#B292E8">提供各类运动指导员</span></div></div>
          </div>
    <!-- 通知 -->
    <!-- <div class="info_t">
      <img src="../assets/home_icon_note@2x.png" alt />
      <span>{{ noticeName }}</span>
    </div> -->
    <div>
      <div class="navinfo"><img src="../assets/icon_nofo3@2x.png" alt=""></div>
    <van-notice-bar
     scrollable
     :text="noticeName"
     />
     </div>
    <div class="content_list">
      <!-- 热门活动 -->
      <van-tabs>
  <van-tab title="热门活动">
          <div
        class="box"
        v-for="(item,index) in activityList"
        :key="index"
        @click="detailspage(item.id,item.aType,item.isThematic,item.annId,item.eventStatus)"
      >
        <div class="img">
          <img
            v-if="item.fileImgList.length>0"
            :src="ImageUrl+item.fileImgList[0].id"
          />
          <img v-else src="../assets/zwltsy.jpg" />
          <span v-if="item.eventStatus==0" class="tig tig_blue">未开始</span>
          <span v-if="item.eventStatus==1" class="tig tig_red">报名中</span>
          <span v-if="item.eventStatus==2" class="tig tig_yellow">报名截止</span>
          <span v-if="item.eventStatus==3" class="tig tig_orange">比赛中</span>
          <span v-if="item.eventStatus==4" class="tig tig_gray">已结束</span>
        </div>
        <div class="box-text">
          <p>
            <i class="special" v-if="item.isThematic">专</i>
            {{item.actName}}
          </p>
          <span>
            <img src="../assets/spor.png" />
            <i>{{item.organizer}}</i>
          </span>
          <span>
            <img src="../assets/time.png" />
            <i>{{item.startTime |dateSlice}}-{{item.endTime |dateSlice}}</i>
          </span>
          <span>
            <img src="../assets/address.png" />
            <i>{{item.actAddress}}</i>
          </span>
        </div>
          <!-- <span v-if="item.eventStatus==1" class="tig_m tig_blue"  @click.stop="gotoPlay(item.actApplyWay,item.id,item.actHeathReport,item.startTime)">去报名</span> -->
      </div>
  </van-tab>
  <van-tab title="健身指导">
           <div class="info-list">
          <van-cell v-for="item in advianceList" :key="item.id" class="info-item">
            <div class="item-wrap" @click="handleViewDetail(item.type, item.id)">
              <h4>{{ item.fitguidanceTitle }}</h4>
              <div class="info-content" v-if="item.fileList.length">
                <van-image
                  width="100%"
                  height="100%"
                  class="poster"
                  :src="ImageUrl+item.fileList[0].id"
                />
                <span class="tag">{{ item.type == 1 ? "视频" : "图文" }}</span>
                <div class="type">{{ item.minorTermName }}</div>
              </div>
            </div>
          </van-cell>
        </div> 
  </van-tab>
  <van-tab title="户外推荐">
        <ul class="box-list" id="container_list">
        <router-link
          :to="{path:'/outdoors/particulars',query:{id:item.id}}"
          tag="li"
          class="list-card"
          v-for="item in outdoorList"
          :key="item.id"
        >
          <div class="bgm"></div>
          <div class="cover">
            <div class="left">
              <img
                :src="ImageUrl + item.fileList[0].id"
                alt
              />
            </div>
            <div class="right">
              <p>{{item.name}}</p>
              <p>{{item.shortDescription}}</p>
            </div>
          </div>
        </router-link>
            </ul>
  </van-tab>
</van-tabs>
      <!-- <div class="r_activity">
        <div class="left">
          <img style="width: 20px; height: 20px;" src="../assets/icon_head@2x.png" alt />
          <span>热门活动</span>
        </div>
        <div class="right" @click="$router.push('/catalog')">查看更多></div>
      </div>
      <ul class="box-fitness">
        <li
          v-for="item in activityList"
          :key="item.id"
          class="activity_p"
          @click="detailspage(item.id,item.aType,item.isThematic,item.annId)"
        >
        <img v-if="item.fileImgList === undefined" src="../assets/zwltsy.png" />

          <img :src="(item.fileImgList[0] === undefined) ? require('../assets/zwltsy.png') : (ImageUrl + item.fileImgList[0].id)" alt>
         
          <p class="remen">{{item.actName}}</p>
        </li>
      </ul> -->
      <!-- 健身指导 -->
      <!-- <div class="r_activity" style="margin-top:10px;">
        <div class="left">
          <img style="width: 20px; height: 20px;" src="../assets/icon_head@2x.png" alt />
          <span>健身指导</span>
        </div>
        <div class="right" @click="$router.push('/scientific-fitness')">查看更多></div>
      </div>
      <ul class="box-fitness">
        <li
          v-for="item in advianceList"
          :key="item.id"
          class="adviance_li"
          @click="handleViewDetail(item.type, item.id)"
        >
          <img
            :src="ImageUrl + item.fileList[0].id"
          />
          <p class="adviance_P">{{item.fitguidanceTitle}}</p>
        </li>
      </ul> -->
      <!-- 户外推荐 -->
      <!-- <div class="r_activity">
        <div class="left">
          <img style="width: 20px; height: 20px;" src="../assets/icon_head@2x.png" alt />
          <span>户外推荐</span>
        </div>
        <div class="right" @click="$router.push('/outdoors')">查看更多></div>
      </div> -->
    </div>

      <van-list
        v-model="loading3"
        :finished="finished3"
        finished-text="没有更多了"
        :immediate-check="true"
        @load="inquire"
      >
        <!-- <router-link
          :to="{path:'/outdoors/particulars',query:{id:item.id}}"
          tag="li"
          class="list-card"
          v-for="item in outdoorList"
          :key="item.id"
        >
          <div class="bgm"></div>
          <div class="cover">
            <div class="left">
              <img
                :src="ImageUrl + item.fileList[0].id"
                alt
              />
            </div>
            <div class="right">
              <p>{{item.name}}</p>
              <p>{{item.shortDescription}}</p>
            </div>
          </div>
        </router-link> -->
      </van-list>

<!--是否有抽奖资格-->
    <!-- <van-overlay class="canlottery" :show="canlottery" @click="canlottery = false">
        <img  @click="goLottery" src="@/assets/canlottery.png" />
  </van-overlay> -->

    <footer>
      <!-- <p>本服务由xx省政务网、xx省体育局提供</p>
      <p>
        服务咨询热线:
        <a href="tel:0571-88808110">0571-88801120</a>
      </p> -->
    </footer>
  </div>
</template>

<script>
let jianshenditu = require("../assets/Home_jsdt@2x.png");
let saishihuodong = require("../assets/Home_sshd@2x.png");
let kexuejianshen = require("../assets/Home_jstcy@2x.png");
let zhuceshenqing = require("../assets/Home_jsst@2x.png");
let jianshenzhidaoyuan = require("../assets/Home_jsq@2x.png");
let tizhiceding = require("../assets/tizhiceding@2x.png");
import { zlbFun, getQueryString } from "@/util/Tool";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import cookieTool from "@/util/cookie";
import {
  selectStatus,
  mobileUserInfo,
  dxCoach,
  competitionList,
  getFitguidancePage,
  allOutdoorList,
  getUserDetail,
  isLottery,
  mobileUserInfoNew 
} from "@/http/api";
import { mapGetters } from "vuex";

export default {
  name: "homePage",
  data() {
    return {
      ImageUrl: this.ImageUrl,
      userId: '', 
      show_tip: false, //更多弹出层
      goodVisibility: false,
      swiperOption: {
        notNextTick: true,
        // 分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // 循环
        loop: true,
        // 切换时长
        autoplay: {
          delay: 2000
        },
        // 速度
        speed: 600,
        //使最后一张不出现断层的现象
        loopAdditionalSlides: 1
      },
      noticeName: '',
      value_s: "",
      loading1: false,
      finished1: false,
      loading2: false,
      finished2: false,
      loading3: false,
      finished3: false,
      banner: [], //banner图的数据
      activityList: [], //活动列表数据
      advianceList: [],
      outdoorList: [],
      pageSize: 4, // 每页条数
      pageIndex: 1, // 页码
      pageSize2: 4, // 每页条数
      pageIndex2: 1, // 页码
      pageIndex3: 1,
      pageSize3: 4,
      activeName: "a", //标签页
      showcoach: 0,
      msg: "",
      canlottery: false, // 是否有抽奖资格
      menuList: [

        {
          iconUrl: saishihuodong,
          iconText: "赛事活动",
          path: "/catalog"
        },
        {
          iconUrl: kexuejianshen,
          iconText: "健身同城约",
          path: "/same-city/city"
        },
        {
          iconUrl: zhuceshenqing,
          iconText: "健身社团",
          path: "/same-city/organization"
        },
        {
          iconUrl: jianshenzhidaoyuan,
          iconText: "健身圈",
          path: "/same-city"
        },
        {
          iconUrl: jianshenditu,
          iconText: "健身地图",
          path: "/map/goodPathMap"
        }
      ],
      userTypeStr:'',//用户类型
      latitudeStr:'',
      longitudeStr:'',
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper_i.swiper;
    }
  },
  methods: {
    gotoPath(path){
      this.$router.push(path)
    },
    //查询全域户外
    getOutdoorList() {
      this.loading3 = true;
      allOutdoorList({
        page: this.pageIndex3,
        limit: this.pageSize3
      })
        .then(res => {
          this.finished3 = true;
          this.loading3 = false;
          if (res.code == 0) {
            this.outdoorList = this.outdoorList.concat(res.data);
            if (this.outdoorList.length >= res.count) {
              this.finished3 = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询健身指导
    getAdvianceList() {
      this.loading2 = true;
      getFitguidancePage({
        limit: this.pageSize2,
        page: this.pageIndex2
      }).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.loading2 = false;
          this.advianceList = this.advianceList.concat(res.data);
          if (this.advianceList.length >= res.count) {
            this.finished2 = true;
          }
        }
      });
    },
    //热门活动
    onLoad() {
      this.pageIndex++;
      this.getActivityList();
    }, //底部加载热门活动
    //去详情页
    goDetail(id, type, special, annId) {
      if (special == 1) {
        return this.$router.push({
          path: "/details-column",
          query: { id, annId }
        });
      }
      if (type == 1) {
        this.$router.push({ path: "/details", query: { id, aType: type } });
      } else {
        this.$router.push({
          path: "/matchDetails",
          query: { id, aType: type }
        });
      }
    },
    //获取轮播图赛事报名信息
    getActivity() {
      competitionList({
        rotationStatus: 1
      }).then(res => {
          if (res.code == 0) {
            this.noticeName = res.eventList[0].actName
            this.banner = res.eventList;
            // 处理swiper渲染动态数据时，不循环的方法
            this.goodVisibility = false;
            this.$nextTick(() => {
              this.goodVisibility = true;
            });
          }
        }).catch(err => {
          console.log(err);
        });
    },
    //获取赛事活动列表
    getActivityList() {
      this.loading1 = true;
      competitionList({
        rotationStatus: 1,
        limit: this.pageSize,
        page: this.pageIndex
      }).then(res => {
          if (res.code == 0) {
            console.log(res.eventList)
            this.loading1 = false;
            this.activityList = this.activityList.concat(res.eventList);
            if (this.activityList.length >= res.count) {
              this.finished1 = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    inquireList() {
      this.pageIndex2++;
      this.getAdvianceList();
    },
    inquire() {
      this.pageIndex3++
      this.getOutdoorList();
    },
    handleViewDetail(type, id) {
      if (type == 1) {
        this.$router.push({
          name: "fitnessDetails",
          query: {
            id: id,
            type: type
          }
        });
      } else {
        this.$router.push({
          name: "graphicDetails",
          query: {
            id: id
          }
        });
      }
    },
    detailspage(id, type, special, annId) {
      if (special == 1) {
        return this.$router.push({
          path: "/details-column",
          query: { id, annId }
        });
      }
      if (type == 1) {
        this.$router.push({ path: "/details", query: { id, aType: type } });
      } else {
        this.$router.push({
          path: "/matchDetails",
          query: { id, aType: type }
        });
      }
    },
    onClickRight() {
      this.$router.push("/oneself");
    },
    // isLottery() {
    //   isLottery ({
    //     userId: this.userId
    //   }).then(res => {
    //     if(res.code === 0) {
    //       this.canlottery = res.isLottery
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    goLottery() {
      this.$router.push('/lottery')
    },
  //获取用户信息
    ObtainingUserInformation(id) {
      mobileUserInfoNew({
        userId: id
      }).then(res => {
        console.log(res);
          if (res.code == 0) {
    localStorage.setItem("userDetails",JSON.stringify(res.user))
          sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                id: res.user.id,
                imageid: res.user.image,
                realName: res.user.realName,
                userName: res.user.userName,
                sex: res.user.sex
              })
            );
            this.ZhejiangDoBuriedPoint(res.user.id,res.user.realname)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
        //浙里办埋点
    ZhejiangDoBuriedPoint(id,realname){
      // alert(id);
// 如采集用户信息是异步行为需要先执行这个 BLOCK 埋点 
aplus_queue.push({ 
  action: 'aplus.setMetaInfo', 
  arguments: ['_hold', 'BLOCK'] 
  }); 
  // 设置会员昵称 
aplus_queue.push({ 
    action: "aplus.setMetaInfo", 
    arguments: ["_user_nick", realname] 
  }); 
    // 设置会员 ID 
aplus_queue.push({ 
    action: "aplus.setMetaInfo", 
    arguments: ["_user_id", id] 
  }); 
aplus_queue.push({ 
    action: "aplus.setMetaInfo", 
    arguments: ["_dev_id", "yourDeviceId"] 
  }); 
  aplus_queue.push({ 
    action: 'aplus.sendPV', 
    arguments: [{ 
      // 写死即可 
      is_auto: false, 
      }, 
      {
        isMini: true, 
        // args 自定义参数，注意：参数值只支持字符串类型，不支持多层 json 嵌套 
        long:this.longitudeStr, 
        lati:this.latitudeStr, 
        userType:this.userTypeStr, 
        miniAppName:'智慧体育', 
        miniAppId:'2001401448' 
       }] 
       });
// 如采集用户信息是异步行为，需要在设置完用户信息后执行这个 START 埋点 
// 此时被 block 住的日志会携带上用户信息逐条发出 
aplus_queue.push({ 
  action: 'aplus.setMetaInfo', 
  arguments: ['_hold', 'START'] 
  });
    }
  },
  beforeCreate() {
      // const haveTonke = localStorage.getItem('token')
      // if(haveTonke === null) {
      //   const cookie = cookieTool.getCookie('front-token')
      //   localStorage.setItem('token', cookie)
      //   getUserDetail().then(res => {
      //     localStorage.setItem('userLoginMsg', JSON.stringify(res.data))
      //     this.userId = res.data.id
      //   })
      // }
      
  },
  created() {
            //获取浙里办用户类型
    ZWJSBridge.getUserType().then((result) => { 
      console.log(result); 
      if(result.userType==0||result.userType==1){
      this.userTypeStr='个人';
      }else{
      this.userTypeStr='企业';
      }
      }).catch((error) => { 
        console.log(error); 
      });
      //获取浙里办经纬度
      ZWJSBridge.getLocation() .then((result) => { 
        console.log(result); 
        this.latitudeStr=result.latitude;
        this.longitudeStr=result.longitude;
        }).catch((error) => { 
          console.log(error); 
        });
    // alert(window.location.href);
          if (window.location.href.split('=')[1] === "false#/"){
                  this.$dialog
                  .alert({
                    title: "",
                    message: "请您完成实名制认证，谢谢"
                  })
                  .then(() => { 
                    dd.biz.util.close();
                  });
                return;
              }
            // alert(getQueryString("user"));
            // console.log(getQueryString("user"));
        //备注备注测试
        // localStorage.setItem("tokenandUserId", '{"apiToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMDlGNzk1NDNDRDBFQjQ5Q0ZBODdFOTM3QkQyQkVGNSIsInVzZXJOYW1lIjoiMTU4MzkyNjM1NDAiLCJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAmICM0MElOVkFMSURpUGhvbmVJTlZBTElEIENQVSBpUGhvbmUgT1MgMTRfNF8yIGxpa2UgTWFjIE9TIFgmICM0MUlOVkFMSUQgQXBwbGVXZWJLaXQvNjA1LjEuMTUgJiAjNDBJTlZBTElES0hUTUwsIGxpa2UgR2Vja28mICM0MUlOVkFMSUQgTW9iaWxlLzE4RDcwIEFyaXZlci8xLjAuMTAgSnVwaXRlci8xLjAuMCAwMDAwMDFAWkxCX2lwaG9uZV82LjguMSBoYW53ZWJfaXBob25lXy9oYW53ZWIvZHRkcmVhbXdlYi9idW5kbGVWZXJzaW9uNi44LjEifQ.MhBWcDWzaYY_QSlM93nP76w_RxiBvr8TuH1UpMblUs4","userId":18956}');
        //正式
        localStorage.setItem("tokenandUserId", getQueryString("user"));
       localStorage.setItem("token", JSON.parse(localStorage.getItem("tokenandUserId")).apiToken);
       this.ObtainingUserInformation(JSON.parse(localStorage.getItem("tokenandUserId")).userId)
      // this.isLottery() // 查询抽奖资格
      this.getActivity(); //赛事报名
      this.getActivityList(); //热门活动列表
      this.getAdvianceList(); //健身指导
      this.getOutdoorList(); //户外推荐
  },
  watch: {
    $route(to, from) {
      if (to.path == "/") {
        // 处理swiper渲染动态数据时，不循环的方法
        this.goodVisibility = false;
        this.$nextTick(() => {
          this.goodVisibility = true;
        });
      }
    }
  },
    filters: {
    dateSlice: function(date) {
      let dt = date.slice(0, 10);
      return dt.replace(/-/g, "/");
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.canlottery {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 10rem;
  }
}
// .info-list {
//     padding: 7px 12px;
//     background-color: #f6f7f8;
// }
.info-list .info-item {
    width: 100%;
    margin-bottom: 10px;
    padding: 16px 15px 11px 15px;
    background: #ffffff;
    box-shadow:0px 0px  5px 0.1px #9999;
    border-radius: 3px;
}
.info-list .info-item .item-wrap .info-content .tag {
    position: absolute;
    // top: 5px;
    left: 5px;
    font-size: 11px;
    color: #ffffff;
    line-height: 15px;
}
.container {
  width: 100%;
  .box-fitness {
    padding: 0.4rem;
    white-space: nowrap;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    display: flex;
    &::-webkit-scrollbar {
      display: none;
    }

    li {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.6rem;
      position: relative;
      img {
        width: 7rem;
        height: 4rem;
        border-radius: 0.25rem;
      }
      p {
        position: absolute;
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
        width: 100%;
        padding: 5px;
        color: #fff;
        bottom: 0;
      }
    }
    .remen {
      background: linear-gradient(to top, #0a0604 0%, rgba(0, 0, 0, 0) 100%);
    }
    .adviance_li {
      align-items: start;
      height: 7rem;
      img {
        border-radius: 0;
      }
      .adviance_P {
        bottom: 1rem;
        color: #000;
        height: 2rem;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
        border-radius: 0 0 0.25rem 0.25rem;
      }
    }
  }
  .content_list {
    padding: 10px;
    .r_activity {
      display: flex;
      justify-content: space-between;
      /* font-size: 15px; */
      align-items: center;
      .left {
        img {
          width: 4px;
          height: 0.75rem;
          vertical-align: middle;
          // margin-right: 4px;
        }
        span {
          font-size: 15px;
          font-weight: 700;
        }
      }
      .right {
        font-size: 11px;
        color: #0066FF;
      }
    }
  }
  .an_instructor{
    padding: 10px;
    height: 75px;
    .an_appointment{
    //  background-color: #DAEEFF;
     width: 32.3%;
     height: 56px;
     padding-left: 9px;
     border-radius: 10px;
     float: left;
     background-image:url(../assets/btm_img_1@2x.png);
     background-size:100% 100%;
     .insBtn{
       float: left;
       color: white;
       font-size: 10px;
       margin-top: 35px;
     }
     img{
       float: right;
       height: 90px;
       margin-top: -5px;
     }
    }
    .an_appointment_right{
      float: left;
      width: 32.3%;
      background: linear-gradient(to right ; #CAFDE5 , #1FE187);
      padding-left: 8px;
      height: 56px;
      border-radius: 8px;
      margin-left: 5px;
      background-image:url(../assets/btn_img_2@2x.png);
     background-size:100% 100%;
    }
    .an_appointment_bottom_right{
           float: left;
      width: 32.3%;
      background: linear-gradient(to right ; #ECEDFF , #B4BBFF); 
      padding-left: 8px;
      height: 56px;
      border-radius: 8px;
      margin-left: 5px;
      background-image:url(../assets/btn_img_3@2x.png);
     background-size:100% 100%;
    }
  }
           .title{
      font-size: 12px;
      color: #0099FF;
      font-weight: bold;
    }
     .content{
       font-size: 11px;
      color: #4AB7FF;
      display: flex;
     }
     .navinfo{
       display: flex;
       font-size: 12px;
       background-color: #EAF8F7
       ;
       float: left;
       margin-left: 8px;
       padding: 6px;
      //  border-radius: 15px;
       color: #2E6BFF;
       img{
         margin-right: 3px;
       }
     }
     .van-notice-bar{
         padding: 0 8px;
         height: 30px;
         font-size: 12px;
       }
  .info_t {
    height: 2.5rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 10px 0 rgba(153, 153, 153, 0.3);
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    img {
      width: 1rem;
      height: 1rem;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  #swiper_index {
    .swiper-pagination {
      display: none;
    }
    // margin-top: 8.2rem;
    width: 100%;
    height: 9rem;
    // background-color: #ffffff !important;
    padding: 0.6rem 0.6rem;
    padding-bottom: 0;
    padding-top: 0;
    // margin-top: -20px;
    .swiper-slide {
      // border: 0.15rem solid #ffffff;
      border-radius: 0.5rem;
      transition: 1s;
      transform: scale(1, 0.85);
      // height: 7.1rem;
      padding: 3px;
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1, 1);
      // height: 8.1rem;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
    }

    .banner-title {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      position: absolute;
      padding: 0.3rem 0.6rem;
      font-size: 0.7rem;
      // color: #eee;
    }
  }
  background-color: #fff;
  /deep/.van-hairline--top-bottom::after {
    border: none;
  }
  /deep/.van-tabs__nav--line {
    padding-right: 6rem;
  }
  /deep/.van-tabs__line{
   background-color: #33A33B;
  }
  #advince {
    .list-card {
      position: relative;
      margin: 0.6rem 0.6rem;
      border-radius: 0.4rem;
      background-color: #fff;
      padding: 20px;
      box-shadow: 0 0 10px 0 rgba(153, 153, 153, 0.3);
      margin-top: 5px;
      img {
        height: 7.625rem;
        border-radius: 10px;
        width: 100%;
        margin-top: 5px;
      }
      p {
        font-size: 15px;
        font-weight: 700;
      }
    }
  }
  .box-list {
    // overflow: auto;
    .list-card {
      position: relative;
      margin: 0.1rem 0.1rem;
      border-radius: 0.4rem;
      background-color: #fff;
      margin-top: 0;
      box-shadow:0px 0px  5px 0.1px #9999;
      .bgm {
        height: 6.2rem;
        border-radius: 5px;
        width: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
        margin-top: 10px;
      }
      p {
        font-size: 13px;
        font-weight: 700;
      }
      .cover {
        height: 6.2rem;
        border-radius: 5px;
        width: 100%;
        position: absolute;
        top: 0;
        padding: 8px;
        display: flex;
        background: rgba(0, 0, 0, 0);
        .left {
          img {
            width: 6.325rem;
            height: 5.4rem;
            border-radius: 5px;
          }
        }
        .right {
          color: #000;
          padding-left: 10px;
          & > p:last-child {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
          }
          & > p:last-child {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
    }
  }
  /deep/.van-tabs__content {
    border: none;
    margin-top: 10px;
  }
  .bgcImg {
    height: 4.5rem;
    background: url("../assets/home_bg@2x.png") no-repeat center;
    background-size: cover;
    // position: fixed;
    top: -1px;
    z-index: 10;
    width: 100%;
    .top {
      display: flex;
      padding: 1.25rem 0.5rem;
      align-items: center;
      .more_tip {
        font-size: 14px;
        li {
          width: 4rem;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
        }
      }
    }
    .people,
    .more {
      flex: 1;
      text-align: right;
      .van-cell {
        padding: 0;
        background-color: rgba(0, 0, 0, 0);
      }
      .van-cell__value--alone {
        text-align: right;
      }
      img {
        // width: 1rem;
        height: 1rem;
      }
    }
    /deep/.van-popup--center {
      top: 18%;
      left: 85%;
      border-radius: 5px;
    }
    .search {
      position: relative;
      .word_s {
        font-size: 12px;
        position: absolute;
        left: 2rem;
        top: 5px;
      }
      .s_icon {
        width: 0.9rem;
        height: 0.9rem;
        position: absolute;
        left: 0.5rem;
        top: 5px;
      }
      flex: 2;
      img {
        width: 13.5rem;
        height: 1.4rem;
      }
    }
  }
  /deep/.van-tab--active {
    font-size: 15px;
    color: #33A33B;
    font-weight: 700 !important;
  }
  /deep/.top_grid {
    // position: absolute;
    top: 3rem;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    li{
      text-align: center;
      div{
        margin-top: -5px;
      }
    }
    // /deep/.van-grid-item__content--center {
    //   background: rgba(0, 0, 0, 0);
    // }
    // /deep/.van-grid-item__text {
    //   color: #fff;
    // }
    // /deep/.van-grid-item--square{
    //   background: rgba(0, 0, 0, 0);
    // }
    display: flex;
    justify-content: space-around;
    margin-top: 0.5rem;
    img {
      width: 2rem;
      height: 2rem;
    }
    span{
      font-size: 12px;
      color: #707070;
    }
  }
  /deep/.van-grid-item__icon {
    font-size: 2rem;
  }
  /deep/ .van-swipe {
    height: 8rem;
    position: absolute;
    top: 1rem;
    width: 17.25rem;
    left: 50%;
    transform: translate(-50%, 0px);
    z-index: 10;
    border-radius: 10px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 100%;
      height: 100%;
    }
  }


  .box {
    // width: 17.55rem;
    height: 5.3rem;
    // padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 8px;
    margin-top: 10px;
    justify-content: space-between;
    // border-bottom: 1px solid #eaeaea;
    box-shadow:0px 0px  5px 0.1px #9999;
    border-radius: 8px;
    .img {
      width: 6rem;
      height: 4rem;
      // background-color: red;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
      .tig {
        display: block;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.6rem;
        color: #ffffff;
        background-color: #0091ff;
        padding: 0 0.25rem;
        position: absolute;
        top: -0.35rem;
        left: -0.35rem;
        border-radius: 0.15rem;
      }
      .tig_blue {
        background-color: #0091ff;
      }
      .tig_red {
        background-color: #e02020;
      }
      .tig_yellow {
        background-color: #f7b500;
      }
      .tig_orange {
        background-color: #fa6400;
      }
      .tig_gray {
        background-color: #dddddd;
      }
    }
    .box-text {
      width: 10.5rem;
      height: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.7rem;
        font-weight: 400;
      }
      span {
        color: #9fa7b3;
        font-size: 0.6rem;
        display: flex;
        align-items: center;
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
        i {
          width: 9.5rem;
          margin-left: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  footer {
    width: 100%;
    // height: 2.75rem;
    // padding-top: 0.5rem;
    background-color: #fff;
    text-align: center;
    margin-bottom: 3rem;
    p {
      font-size: 0.6rem;
      color: #999;
    }
  }
}
</style>
