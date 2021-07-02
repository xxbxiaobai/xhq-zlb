<template>
  <div style="background:#F6F8F7">
    <!-- 头部 -->
    <van-nav-bar title="站点详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 轮播 -->
    <div class="swiper">
      <div class="noimg" v-if="dates.imageList==''">
        <img src="../../assets/zwltsy.jpg" alt />
      </div>
      <van-swipe v-else :autoplay="3000">
        <van-swipe-item v-for="(image, index) in dates.imageList" :key="index">
          <!-- <img :src="imgs+image.id?(imgs+image.id):img1.url" style="width:100%" alt /> -->
          <div
            :style="{backgroundImage: 'url('+(imgs+image.id)+')',backgroundRepeat:'no-repeat',backgroundSize:'cover',width:'100%',height:'12.5rem'}"
          ></div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 内容 -->
    <ul>
      <li style="  border-bottom: 0.08rem solid rgb(247, 247, 247);">
        <h3>{{dates.name}}</h3>
        <p>服务人数：{{dates.fullTimeNum}}名</p>
      </li>
      <li>
        <div class="site">
          <img
            style="width:0.5rem;height: 0.6rem;margin-top:-1.1rem"
            src="./img/icon_weizhi.png"
            alt
          />
          <p>
            <span style="font-size:0.7rem;color:#666">{{dates.address}}</span>
            <br />
            <span style="font-size:0.5rem;">{{dates.name}}</span>
          </p>
          <!-- <a :href="'tel:'+dates.servicePhone"> -->
          <span @click="playCall" class="call"></span>
          <!-- </a> -->
        </div>
        <p style="margin-top:1rem">
          <img
            style="margin-right:0.2rem;width:0.55rem; height: 0.55rem"
            src="./img/icon_shijian@2x.png"
            alt
          />
          开放时间：{{dates.openTime}}
        </p>
      </li>
    </ul>
    <article>
      <h5>测定站介绍</h5>
      <p style="word-break: break-all;">{{dates.description}}</p>
    </article>
    <footer v-if="datatime" class="noOrder">
      <!-- <a style="color:#000" :href="url+dates.atitude+','+dates.longitude+'&'+'name='+dates.name"> -->
      <a
        :href="url+dates.longitude+','+dates.latitude+'&'+'name='+(dates.address?dates.address:'无地址')"
      >
        <!-- <a class="nav" :href="url+trainPlace[0]+','+trainPlace[1]+'&'+'name='+(listdata.actAddress?listdata.actAddress:'无地址')">导航</a > -->
        <!-- </a> -->
        <!-- {{dates.longitude}}
        {{dates.latitude}}-->
        <div style=" border: 1px solid #cccccc;">
          <img src="./img/daohang@2x.png" alt />导航
        </div>
      </a>
      <!-- <div v-if="datatime" style="color:#fff;background:gray">不可预约</div> -->
      <!-- <div  style="color:#fff;background:#1492FF" @click="datum">预约</div> -->
    </footer>
    <footer v-else>
      <!-- <a style="color:#000" :href="url+dates.atitude+','+dates.longitude+'&'+'name='+dates.name"> -->
      <a
        :href="url+dates.longitude+','+dates.latitude+'&'+'name='+(dates.address?dates.address:'无地址')"
      >
        <!-- <a class="nav" :href="url+trainPlace[0]+','+trainPlace[1]+'&'+'name='+(listdata.actAddress?listdata.actAddress:'无地址')">导航</a > -->
        <!-- </a> -->
        <!-- {{dates.longitude}}
        {{dates.latitude}}-->
        <div style=" border: 1px solid #cccccc;">
          <img src="./img/daohang@2x.png" alt />导航
        </div>
      </a>
      <!-- <div style="color:#fff;background:gray">不可预约</div> -->
      <div style="color:#fff;background:#1492FF" @click="datum">预约</div>
    </footer>
  </div>
</template>
<script>
//swiper样式
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { zlbFun } from "@/util/Tool";
Vue.use(Swipe).use(SwipeItem);
// import "swiper/dist/css/swiper.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { measurementntparticulars, userImg } from "../../http/api";
export default {
  data() {
    return {
      num: 10,
      dates: [],
      dataTims: "",
      imgs: userImg,
      datatime: false,
      times: "",
      url: "https://uri.amap.com/marker?position=",
      texts: {
        titil: "体质测定站点2",
        distance: "距离您1.6公里",
        region: "浙江省杭州市",
        datas: "9:00-17:00"
      }
    };
  },
  created() {
    this.dates = {
      bookDateType: 0,
      address: "杭州市黄龙路6号",
      servicePhone: "18958067991",
      latitude: 30.267275,
      display: 0,
      description: "国民体质测试11项、骨密度、体成分",
      partTimeNum: 0,
      areaName: "西湖区",
      openSituation: "固定时间开放",
      name: "杭州市国民体质监测中心",
      id: 1,
      openTime: "每周二、四上午",
      imageList: [
        {
          id: "a91a39ab288347318e2c45a4af88c3b6",
          msgId: "1",
          fieldName: "MAP_MONITOR_SITE_LABEL",
          name: "下载 (2).jpg",
          isImg: true,
          contentType: "image/jpeg",
          size: 22218,
          path: null,
          url:
            "https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg",
          ossurl:
            "zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg",
          source: "ALIYUN",
          status: 1,
          mark: 1,
          insetsUrl:
            "https://cn-hangzhou-zjzwy01-d01/mini_zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg",
          insetsOss:
            "mini_zjsport_filehost/2019-11-04/c6fc6ef648bc4cc787bd4d2ab4bee054-file.jpg",
          createTime: "2019-11-03T22:12:47.000+0000",
          pathDir: null
        }
      ],
      principalPhone: "18958067991",
      longitude: 120.137255,
      fullTimeNum: 7
    };
    let id = this.$route.query.Id;
    this.times = id;
  },
  components: {
    // swiper,
    // swiperSlide
  },
  methods: {
    //拨打电话
    playCall() {
      zlbFun("", () => {
        dd.biz.telephone.call({
          corpId: this.dates.servicePhone,
          onSuccess: function(data) {},
          onFail: function(error) {}
        });
      });
    },
    // 返回列表
    onClickLeft() {
      this.$router.go(-1);
      // console.log(1);
      // this.$router.push({
      //   path: "/constitu"
      // });
    },
    //预约
    datum() {
      // console.log(this.times)
      var i = this.times;
      this.$router.push({
        path: "/datum",
        query: {
          siteId: i
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.swiper {
  width: 100%;
  #swiper {
    width: 100%;
    // height: 9rem;
    background-color: #ffffff !important;
    // padding: 0 0.6rem;
    .swiper-slide {
      width: 100% !important;
      // border: 0.15rem solid #ffffff;
      // border-radius: 0.5rem;
    }
    img {
      width: 100%;
      height: 100%;
      // border-radius: 0.5rem;
    }
  }
}
ul {
  // margin-top: -1.5rem;
  background: #fff;
  height: 8rem;
  //  border-radius: 1rem;
  border-radius: 0.4rem 0.4rem 0 0;
  // overflow: hidden;
  z-index: 100;
  margin-top: -2.5rem;
  position: relative;
  li {
    // padding: 1.2rem 0;
    margin: 0 0 0 0.75rem;
    height: 3.85rem;
    h3 {
      padding-top: 1.2rem;
      line-height: 0.8rem;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.5rem;
      line-height: 0.5rem;
      color: #747474;
    }

    .site {
      display: flex;
      height: 1.25rem;
      align-items: center;
      margin-top: 0.7rem;
      p {
        color: #666666;
        font-size: 0.5rem;
        width: 75%;
        margin: 0 7% 0 0.4rem;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 1rem;
        border-right: 0.05rem solid rgb(217, 219, 218);
      }
    }
  }
}
.call {
  width: 1.15rem;
  height: 1.3rem;
  background-image: url(img/phone.png);
  background-repeat: no-repeat;
  background-size: 100%;
  float: right;
}
article {
  margin-top: 0.4rem;
  background: white;
  padding-bottom: 5rem;
  h5 {
    padding: 0.75rem 0.75rem 0.75rem 0;
    margin-left: 0.75rem;
    font-size: 0.8rem;
    border-bottom: 0.08rem solid rgb(247, 247, 247);
  }
  p {
    font-size: 0.7rem;
    color: #666;
    padding: 0.75rem;
  }
}
footer {
  border-top: 0.05rem solid rgb(217, 219, 218);
  width: 100%;
  height: 3rem;
  position: fixed;
  background: #fff;
  bottom: 0;
  // background: red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    width: 8rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid #cccccc;
    border-radius: 0.2rem;
    font-size: 0.7rem;
    img {
      width: 0.65rem;
      height: 0.75rem;
      margin-right: 0.25rem;
    }
  }
}
.noimg {
  width: 100%;
  height: 12rem;
  display: flex;
  justify-content: center;
  color: gray;
  align-items: center;
  img {
    width: 6rem;
    height: 6rem;
  }
}
.swiper {
  width: 100%;
  height: 12.5rem;
  img {
    width: 100%;
    height: 12.5rem;
  }
}
.noOrder {
  a {
    display: block;
    width: 100%;
  }
  div {
    width: 90%;
    height: 2rem;
    margin: 0 auto;
  }
}
</style>
