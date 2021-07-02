<template>
  <div class="graphic-wrap">
    <van-nav-bar title="图文详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="graphic-content">
      <div class="details-head">
        <h2>{{ detailData.fitguidanceTitle }}</h2>
        <div class="view">
          <span>{{ detailData.browseNum }}次浏览</span>
          <span class="separator">|</span>
          <span>{{ detailData.minorTermName }}</span>
        </div>
      </div>
      <div class="details-content">
        <p class="text" v-html="detailData.fitguidanceIntroduce"></p>
      </div>
    </div>
    <div class="margin"></div>
    <div class="recommended-list">
      <div class="list-head">推荐文章</div>
      <ul class="list-wrap">
        <van-list
          v-model="loading2"
          :finished="finished2"
          finished-text="没有更多了"
          :immediate-check="true"
          @load="inquireList"
        >
          <li v-for="item in recommendedList" :key="item.id">
            <div class="item-wrap" @click="viewDetail(item.id, item.type, item.minorTermId)">
              <div class="img-box">
                <van-image
                  width="100%"
                  height="100%"
                  :src="ImageUrl+item.titleImageId"
                />
              </div>
              <div class="list-cont">
                <h2>{{ item.fitguidanceTitle }}</h2>
                <div class="view">
                  <span>{{ item.browseNum }}次播放</span>
                  <span class="separator">|</span>
                  <span>{{ item.minorTermName }}</span>
                </div>
              </div>
            </div>
          </li>
        </van-list>
      </ul>
    </div>
  </div>
</template>

<script>
import { selectfitguidance, getFitguidancePage } from "@/http/api";
const poster = require("@/assets/default-img.png");
export default {
  name: "",
  created() {
    // 图文详情
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.minorTermId = this.$route.query.minorTermId;
    this.majorTermId = this.$route.query.majorTermId;
    this.getDetails();
    // 推荐列表
    this.getRecommendedList();
  },
  data() {
    return {
      ImageUrl: this.ImageUrl,
      loading2: false,
      finished2: false,
      pageSize2: 4, // 每页条数
      pageIndex2: 1, // 页码

      defaultImg: poster,
      detailData: {},
      recommendedList: [],
      id: "",
      type: "",
      minorTermId: "",
      majorTermId: ""
    };
  },
  watch: {
    $route(to, from) {
      // 图文详情
      this.id = to.query.id;
      this.type = to.query.type;
      this.minorTermId = to.query.minorTermId;
      this.recommendedList = []
      this.getDetails();
      this.getRecommendedList();
    }
  },
  methods: {
    inquireList() {
      this.pageIndex2++;
      this.getRecommendedList();
    },
    //获取推荐列表
    getRecommendedList() {
      this.loading2 = true;
      getFitguidancePage({
        page: this.pageIndex2,
        limit: this.pageSize2,
        isCommend: 1
      })
        .then(res => {
          if (res.code == 0) {
            this.loading2 = false;
            this.recommendedList = this.recommendedList.concat(res.data);
            if (this.recommendedList.length >= res.count) {
              this.finished2 = true;
            }
          }
          console.log(res);
        })
        .catch(err => {
          console;
        });
    },
    //获取图文详情
    getDetails() {
      selectfitguidance({
        id: this.id
      }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.detailData = res.data;
        }
      });
    },
    onClickLeft() {
      window.location.href = "sxty://back";
      this.$router.push("/");
    },
    viewDetail(id, type, minorTermId) {
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
            id: id
          }
        });
      }
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.graphic-wrap {
  overflow-x: hidden;
  .graphic-content {
    padding: 20px 12px;
    background-color: #fff;
    .details-head {
      position: relative;
      // padding: 12px 18px 16px 12px;
      h2 {
        text-align: left;
        // max-width: 270px;
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
      .view {
        position: relative;
        margin-bottom: 17px;
        padding-left: 15px;
        line-height: 10px;
        span {
          font-size: 10px;
          color: rgba(153, 153, 153, 1);
          line-height: 10px;
        }
        .separator {
          padding: 0 10px;
        }
        &::before {
          position: absolute;
          top: 4px;
          left: 0;
          display: block;
          width: 10px;
          height: 7px;
          background: url("../../../assets/liulan.png") center no-repeat;
          background-size: 100% 100%;
          content: "";
        }
      }
      .introduce {
        position: absolute;
        top: 15px;
        right: 27px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 12px;
        padding-right: 3px;
        &::after {
          position: absolute;
          top: -3px;
          right: -18px;
          display: block;
          width: 20px;
          height: 20px;
          background: url("../../../assets/jiantoux.png") center no-repeat;
          background-size: 100% 100%;
          content: "";
        }
      }
    }
    .details-content {
      .img-box {
        width: 100%;
        height: 200px;
        margin-bottom: 18px;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
    }
  }
  .margin {
    width: 100%;
    height: 8px;
    background-color: #f6f8f7;
  }
  .recommended-list {
    .list-head {
      padding: 15px 12px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 14px;
      border-bottom: 1px solid #e7e7e7;
      background-color: #fff;
    }
    .item-wrap {
      display: flex;
      padding: 16px 15px 16px 12px;
      border-bottom: 1px solid #e7e7e7;
      background-color: #fff;
      .img-box {
        flex: 115px 0 0;
        height: 82px;
        margin-right: 12px;
        border-radius: 3px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .list-cont {
        position: relative;
        flex: auto;
        h2 {
          margin-top: 7px;
          margin-bottom: 12px;
          font-size: 16px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .view {
          position: absolute;
          bottom: 0;
          margin-bottom: 7px;
          // position: relative;
          padding-left: 15px;
          line-height: 10px;
          span {
            font-size: 10px;
            color: rgba(153, 153, 153, 1);
            line-height: 10px;
          }
          .separator {
            padding: 0 10px;
          }
          &::before {
            position: absolute;
            top: 4px;
            left: 0;
            display: block;
            width: 10px;
            height: 7px;
            background: url("../../../assets/liulan.png") center no-repeat;
            background-size: 100% 100%;
            content: "";
          }
        }
        p {
          span {
          }
        }
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
<style>
.text img {
  max-width: 100%;
}
</style>
