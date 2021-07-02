<template>
  <div id="container">
    <!-- 头部开始 -->
    <van-nav-bar title="群介绍" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 头部结束 -->

    <!-- 图片展示开始 -->
    <van-swipe>
      <van-swipe-item v-for="(item,i) in img" :key="i">
        <div class="box-img" :style="{background:'url('+item+')center center / cover no-repeat'}"></div>
      </van-swipe-item>
    </van-swipe>

    <!-- 图片展示结束 -->

    <!-- 基本信息开始 -->
    <div class="box-card">
      <div class="box-title">
        <strong>{{card.name}}</strong>
      </div>
      <div class="box-msg">
        <p class="box-date">联系人：{{card.contactPerson||'暂无'}}</p>
        <div class="box-site">
          <!-- <p>地址：绍兴市越城区现代大厦</p> -->
          <p>咨询电话：{{card.phone||'暂无'}}</p>
          <phone class="icon-phone" :num="card.phone"></phone>
        </div>
      </div>
    </div>
    <!-- 基本信息结束 -->

    <!-- 介绍列表开始 -->
    <div class="box-introduce">
      <div class="box-title headline">群介绍</div>
      <div class="introduce">
        <p v-html="card.intro||'暂无'"></p>
      </div>
    </div>
    <!-- 介绍列表结束 -->
    <router-link to="/personal1">
      <button id="go">申请加入</button>
    </router-link>
  </div>
</template>

<script>
// import fitnessGuidance from "./components/fitness-guidance";
import { mapGetters } from "vuex";
import { zlbFun } from "@/util/Tool";
import { OrganizationById } from "@/http/api";
import phone from "@/components/Phone";
export default {
  data() {
    return {
      img: [require("@/assets/zwltsy.jpg")],
      card: {}
    };
  },
  components: {
    phone
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //提示
    issue() {
      this.$toast({
        message: "免费或低收费向社会开放\n的公共体育场馆",
        duration: 5000
      });
    }
  },
  created() {
    let item = {
      phone: "13357105335",
      intro:
        '<p class="MsoNormal">团结和组织全省自行车运动工作者和爱好者，多形式、多层次地宣传和开展自行车运动，在推动全民健身活动的基础上，促进该项目运动技术水平的不断提高，为社会主义精神文明和物质文明建设服务。</span><span><o:p></o:p></span></p>',
      name: "自行车运动群",
      contactPerson: "李瀚",
      typeId: 1,
      id: 1923,
      fileList: [
        {
          id: "609079dc80534b9bad8b0559f2bf0484",
          msgId: "1923",
          fieldName: "organizationFilePath",
          name: "图片5.png",
          isImg: true,
          contentType: "image/png",
          size: 1659110,
          path: null,
          url:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-06/903d08f833c74f0b9b5bb7d712ab74d7-file.png",
          ossurl:
            "zjsport_filehost/2019-12-06/903d08f833c74f0b9b5bb7d712ab74d7-file.png",
          source: "ALIYUN",
          status: 1,
          mark: 2,
          insetsUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2019-12-06/903d08f833c74f0b9b5bb7d712ab74d7-file.png",
          insetsOss:
            "mini_zjsport_filehost/2019-12-06/903d08f833c74f0b9b5bb7d712ab74d7-file.png",
          createTime: "2019-12-06T02:20:30.000+0000",
          pathDir: null
        }
      ]
    };
    if (item.fileList.length) {
      this.img = item.fileList.map(img => img.url);
    }
    this.card = item;
  }
};
</script>
<style>
#container .van-swipe .van-swipe__indicators {
  bottom: 1.2rem;
}
</style>
<style scoped lang="less">
//=======================
//      公用混合
.icon(@w,@h,@l,@r,@img) {
  &::before {
    content: "";
    position: absolute;
    left: @l; //-1.05rem
    right: @r;
    height: @h; //0.75rem
    width: @w;
    background: url(@img) no-repeat center;
    background-size: 95%;
  }
}

.i(@img, @h: 1rem, @w: 1rem) {
  content: "";
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
//=======================

#container {
  min-height: 100vh;
  min-width: 100vw;
  color: #333;
  background-color: #fff;
  //=======================
  //      图片展示
  //=======================
  .box-img {
    height: 10.85rem;
    width: 100vw;
  }

  #go {
    display: block;
    width: 95vw;
    height: 2rem;
    background-color: #1492ff;
    font-size: 0.7rem;
    color: #ffffff;
    font-weight: 500;
    margin: 20px auto;
    border-radius: 3px;
  }

  //=======================
  //      基本信息
  //=======================
  .box-card {
    position: relative;
    top: -0.8rem;
    width: 100vw;
    margin-bottom: -0.75rem;
    border-radius: 0.5rem;
    background-color: white;
    .box-msg {
      padding: 0 0.85rem 1rem 0.75rem;
      font-size: 0.7rem;
      color: #999;
      .box-phone {
        font-family: PingFang SC;
        position: absolute;
        left: 0.6rem;
        bottom: 0.7rem;
        color: #333333;
        font-size: 0.8rem;
        line-height: 0.8rem;
      }
      .box-site {
        position: relative;
        margin-right: 3rem;
        p {
          position: relative;
          padding-top: 0.6rem;
          padding-right: 1rem;
          font-size: 0.7rem;
          line-height: 0.7rem;
          span {
            font-size: 0.5rem;
            line-height: 0.5rem;
          }
        }
        .icon-phone {
          position: absolute;
          top: 50%;
          right: -2.95rem;
          height: 1.15rem;
          width: 1.15rem;
          background: url("../../../assets/phone.png") no-repeat center;
          background-size: 100%;
          transform: translateY(-50%);
        }
      }
      .box-date {
        position: relative;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
    }
  }
  //公用标题头
  .box-title {
    font-family: PingFang SC;
    display: flex;
    align-items: center;
    padding: 0.8rem 0.75rem 0 0.65rem;
    font-size: 0.8rem;
    font-weight: 500;
    &.headline::before {
      content: "";
      display: inline-block;
      margin-right: 0.5rem;
      height: 0.8rem;
      width: 0.15rem;
      background-color: #1492ff;
    }
    strong {
      display: block;
      margin-bottom: 0.8rem;
      font-size: 0.8rem;
      line-height: 1.2rem;
      color: #000000;
    }
  }
  //=======================
  //      介绍列表
  //=======================
  .box-introduce {
    border-top: 0.5rem solid #f6f7f8;
    background-color: white;
    .introduce {
      padding: 0.5rem 0.6rem 2rem 0.6rem;
      font-size: 0.7rem;
      h3 {
        margin-top: 1.4rem;
        margin-bottom: 0.7rem;
        font-size: 0.8rem;
      }
      p {
        font-size: 0.7rem;
        line-height: 1.4rem;
      }
    }
  }
}
</style>
