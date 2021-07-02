<template>
  <div style="background:#F6F8F7">
    <!-- 头部 -->
    <van-nav-bar title="体育指导员详情" left-text="返回" left-arrow @click-left="onClickLeft" >
      <template #right>
        <img 
          @click="goEdit"
          v-if="instructorEdit"
          src="./img/edit.png">
        <!-- <router-link v-if="instructorEdit">
          <img  src="./img/edit.png" alt="">
        </router-link> -->
      </template>
    </van-nav-bar>
    <div class="swiper">
      <img v-if="date.profilePhoto" :src="ImageUrl + date.profilePhoto" alt />
      <div v-else>
        <article class="son" v-if="date.gender === 1"></article>
        <article class="woman" v-else></article>
      </div>
    </div>
    <!-- 内容 -->
    <div class="message">
      <h3 class="call">
        <span>{{date.name}}</span>
        <div>
          <!-- <p @click="playCall(date.phone)">
            <a ref="ph_a"></a>
          </p>-->
          <p>
            <phone class="icon-phone" :num="date.phone"></phone>
          </p>
        </div>
      </h3>
      <div class="project">
        <p>
          <span>所在区域</span>
          <span>{{date.regionDistrict}}</span>
        </p>
        <p>
          <span>指导级别</span>
          <span>{{date.instructorLevel}}</span>
        </p>
        <p>
          <span>执教项目</span>
          <span>{{date.itemTypeName}}</span>
        </p>
      </div>
    </div>
    <!-- 体育指导员简介 -->
    <section>
      <h3>体育指导员简介</h3>
      <p
        :class="textDs == 1 ? 'textData':'textDatas'"
        ref="ele"
      >{{date.intro||'竞技体育、学校体育、部队体育以外的群众性体育活动中从事技能传授、锻炼指导和组织管理工作的人员。凡符合条件，履行社会体育指导员职责者，均可根据本制度的规定，申请并获得社会体育指导员技术等级称号'}}</p>
      <article @click="textData" v-show="gduo">
        <div v-if="textDs==1">
          <span>查看更多</span>
          <img src="./img/shai.png" alt />
        </div>
        <div v-else>
          <span style="color:#1492FF">返回内容</span>
          <img src="./img/cha.png" alt />
        </div>
      </article>
    </section>

    <!-- 指导记录 -->
    <section v-show="this.recordList.length > 0">
      <h3 >指导记录</h3>
      <div class="record" v-for="(item, index) in recordList" :key="index">
        <div class="data">
          <span><span class="day">{{ item.guideTime.split('-')[2] }}</span>/{{ item.guideTime.split('-')[1] }}</span>
        </div>
        <div class="record_info">
          <span class="title">{{ item.title }}</span>
          <span class="introduction">{{ item.remark }}</span>
          <div class="record_img">
            <img class="img" :src="image.url" v-for="(image, key) in item.fileList" :key="key" />
          </div>
          <span class="adress">{{ item.addr }}</span>
        </div>
      </div>
    </section>
    <!-- 热门推荐 -->
    <ul>
      <h4>热门推荐</h4>
      <van-list
        v-model="loading2"
        :finished="finished2"
        finished-text="没有更多了"
        :immediate-check="true"
        @load="inquireList"
      >
        <li
          v-for="(item,index) in recommend"
          :key="index"
          @click="handleViewDetail(item.type, item.id, item.minorTermId)"
        >
          <article>
            <van-image
              width="5.75rem"
              height="4.15rem"
              border-radius="0.15rem"
              v-if="item.fileList"
              :src="ImageUrl + item.fileList[0].id"
            />
            <div>
              <h6>{{item.fitguidanceTitle}}</h6>
              <p>
                <img src="./img/yan.png" alt />
                <span style="border-right:1px solid #e7e7e7">{{item.browseNum}}次播放</span>
                <span>{{item.minorTermName}}</span>
              </p>
            </div>
          </article>
          <!-- </router-link> -->
        </li>
      </van-list>
    </ul>
  </div>
</template>
<script>
//swiper样式
import "swiper/dist/css/swiper.css";
import { zlbFun } from "@/util/Tool";
import phone from "@/components/Phone";
import {
  InstructorParticulars,
  Regionality,
  getFitguidancePage,
  getInstructorRecordList
} from "../../http/api";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      loading2: false,
      finished2: false,
      page: 1,
      pageSize: 5,
      gduo: false,
      recommend: [],
      naTure: false,
      date: [],
      textDs: 1,
      num: 213,
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
          delay: 3000
        },
        // 速度
        speed: 600,
        //使最后一张不出现断层的现象
        loopAdditionalSlides: 1
      },
      userPhone: '',
      instructorEdit: false, // 是否有编辑权限
      recordList: [], // 指导记录列表
    };
  },
  mounted() {
    var heightCss = window.getComputedStyle(this.$refs.ele).height;
    heightCss = heightCss.substring(0, heightCss.length - 2);
    if (heightCss > 55) {
      this.gduo = true;
    } else {
      this.gduo = false;
    }
  },
  created() {
    this.userPhone = JSON.parse(localStorage.getItem('userLoginMsg')).mobile
    // const instructor = this.$route.query.id
    // if(userId !== instructor) {
    //   this.instructorEdit = true
    // } else {
    //   this.instructorEdit = false
    // }
    this.getInstructorRecordList()
    this.getInstructorDetail();
    this.getInstructorList();
  },
  components: {
    swiper,
    swiperSlide,
    phone
  },
  methods: {
    inquireList() {
      this.page++;
      this.getInstructorList();
    },
    //获取体育指导列表
    getInstructorList() {
      this.loading2 = true;
      getFitguidancePage({
        page: this.page,
        limit: this.pageSize
      })
        .then(res => {
          this.loading2 = false;
          if (res.code == 0) {
            this.recommend = this.recommend.concat(res.data);
            if (this.recommend.length >= res.count) {
              this.finished2 = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取体育指导详情
    getInstructorDetail() {
      InstructorParticulars({
        instructorId: this.$route.query.id
      })
        .then(res => {
          if (res.code == 0) {
            this.date = res.data;
            if(res.data.phone === this.userPhone) {
              this.instructorEdit = true
            } else {
              this.instructorEdit = false
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //拨打电话
    // playCall(num) {
    //   if(num){
    //    this.$refs.ph_a = "tel:"+num
    //   }
    // },
    // 返回列表
    onClickLeft() {
      this.$router.go(-1);
    },
    //隐现
    textData() {
      if (this.textDs == 1) {
        this.textDs = 2;
      } else if (this.textDs == 2) {
        this.textDs = 1;
      }
    },
    handleViewDetail(type, id, minorTermId) {
      if (type == 1) {
        this.$router.push({
          name: "fitnessDetails",
          query: {
            id: id,
            type: type,
            minorTermId: minorTermId
          }
        });
      } else {
        this.$router.push({
          name: "graphicDetails",
          query: {
            id: id,
            type: type,
            minorTermId: minorTermId
          }
        });
      }
    },

    // 查询指导员指导记录
    getInstructorRecordList() {
      getInstructorRecordList({
        instructorId: this.$route.query.id,
        page: 1,
        limit: 3,
      }).then(res => {
        if(res.code === 0) {
          this.recordList = res.data
        }
      }).catch(err => {
        console.log(err);
      })
    },

    goEdit() {
      this.$router.push({
        path:'/instructorEdit',
        query:{ 
          instructorId: this.$route.query.id
        }
      })
    },


  }
};
</script>
<style lang="less" scoped>
.icon-phone {
  display: block;
  width: 1.125rem;
  height: 1.125rem;
}
.swiper {
  // width: 18.75rem;
  width: 100%;
  height: 11.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #8ac7ff;
  #swiper {
    background-color: #ffffff !important;
    // padding: 0 0.6rem;
    .swiper-slide {
      width: 18.75rem !important;
    }

  }
  img {
    width: 8.05rem;
    height: 8.05rem;
    border-radius: 50%;
  }
}
.message {
  width: 100%;
  position: relative;
  z-index: 123;
  margin: 0 auto;
  height: 5rem;
  margin-top: -0.6rem;
  padding: 0.7rem 0rem 0.6rem 0.65rem;
  background: #ffffff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .project {
    margin-top: 0.3rem;
    display: flex;
    p {
      flex: 1;
      display: flex;
      height: 1.25rem;
      flex-direction: column;
      margin-top: 0.35rem;
      span {
        font-size: 0.55rem;
        line-height: 1rem;
        margin-top: -0.35rem;
      }
      span:nth-of-type(2) {
        font-size: 0.7rem;
        margin-top: -0.15rem;
      }
    }
    p:nth-of-type(2),
    p:nth-of-type(3) {
      padding-left: 0.75rem;
      border-left: 1px solid #e7e7e7;
    }
  }
}

section {
  margin-top: 0.4rem;
  padding: 0.6rem 0 0.6rem 0.6rem;
  background: #ffffff;
  h3 {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    border-bottom: 0.015rem solid #e7e7e7;
  }
  article {
    margin-top: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: 2.5rem;
      height: 1rem;
      font-size: 0.6rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 1.05rem;
    }
    img {
      margin-left: 0.25rem;
      width: 0.45rem;
      height: 0.25rem;
    }
  }
}
ul {
  padding: 0.65rem 0 0.65rem 0.65rem;
  background: #ffffff;
  margin-top: 0.4rem;
  // height: 25.3rem;
  // overflow: hidden;
  li:last-of-type {
    border-bottom: 0.05rem solid white;
  }
  h4 {
    // width:6.3rem;
    // height: 0.8rem;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    // margin-bottom: 1.25rem;
    padding-bottom: 0.6rem;
    border-bottom: 0.012rem solid gainsboro;
  }
  li {
    padding: 0.8rem 0;
    border-bottom: 0.05rem solid gainsboro;
    article {
      display: flex;
    }
    img {
      width: 5.75rem;
      height: 4.15rem;
      border-radius: 0.15rem;
    }
    div {
      margin: 0.25rem 0rem;
      width: 11.35rem;

      h6 {
        // width:22.15rem;
        height: 2.45rem;
        font-size: 0.8rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1.2rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      img {
        width: 0.5rem;
        height: 0.35rem;
        margin-top: 0.1rem;
        margin-right: 0.2rem;
      }
      p {
        // height: 2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          // width: 2.7rem;
          height: 0.5rem;
          font-size: 0.5rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          // line-height: 3.1rem;
          line-height: 0.5rem;
          padding: 0 0.5rem;
        }
        span:nth-of-type(1) {
          padding: 0 0.5rem 0 0;
        }
      }
    }
    div:nth-of-type(2) {
      margin: 0.25rem 0.6rem;
    }
  }
}
// 内容的展现
.textData {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  // height: 3rem;
  font-size: 0.7rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 1rem;
  word-break: break-all;
}
.textDatas {
  // height: 2.95rem;
  font-size: 0.7rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 1rem;
  word-break: break-all;
}
.call {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  border-bottom: 0.05rem solid #e7e7e7;
  padding-bottom: 0.5rem;
  div {
    width: 3.3rem;
    border-left: 0.05rem solid #e7e7e7;
  }
  p {
    width: 1.125rem;
    height: 1.125rem;
    background-image: url(img/call.png);
    background-repeat: no-repeat;
    background-size: 100%;
    // border-bottom: 0.1rem solid white !important;
    margin-left: 1.55rem;
  }
}
.woman {
  background: url(img/nv.png) no-repeat center;
  background-size: cover;
  width: 8.05rem;
  height: 8.05rem;
  border-radius: 50%;
  margin: 0.8rem auto;
}
.son {
  background: url(img/nan.png) no-repeat center;
  background-size: cover;
  width: 8.05rem;
  height: 8.05rem;
  border-radius: 50%;
  margin: 0.8rem auto;
}
.record{
  display: flex;
  .data{
    padding: 0 0.5rem;
    color: #d8cbcb;
    font-size: 12px;
    .day{
      font-size: 16px;
    }
  }
  .record_info{
    .title {
      display: block;
      font-size: 16px;
    }
    .introduction{
      font-size: 14px;
      color: #666666;
    }
    .record_img {
      .img{
        width: 4.5rem;
        height: 3.25rem;
        margin-right: 5px;
      }
    }
    .adress{
      font-size: 14px;
      position: relative;
      bottom: 10px;
      color: #666666;
    }
  }
}
</style>