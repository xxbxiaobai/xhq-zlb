<template>
  <div class="details">
    <van-nav-bar title="健身指导" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="conetent">
      <div class="video" v-if="detailData.episodeList">
        <video
          class="video-box video-js vjs-big-play-centered vjs-fluid"
          id="myVideo"
          ref="video"
          width="100%"
          controls="true"
          autoplay='autoplay'
          controlslist="nodownload"
          :poster="ImageUrl+detailData.fitguidancefileList[0].id"
        >
          <source v-if="isVideoUrl" :src="detailData.episodeList[0].fileId" type="video/mp4" />
          <source v-else :src="ImageUrl + detailData.episodeList[0].fileId" type="video/mp4" />
        </video>
        <div class="play-btn" v-show="isPlay" @click="handlePlay"></div>
      </div>
      <div class="details-head" v-if="!isFold">
        <h2>{{ detailData.fitguidanceTitle }}</h2>
        <span class="introduction" @click="show.cont = !show.cont" v-if="show.unfold">简介</span>
        <div class="view">
          <span>{{ detailData.browseNum }}次播放</span>
          <span class="separator">|</span>
          <span>{{ detailData.minorTermName }}</span>
        </div>
        <p
          class="text"
          :class="{ more: show.cont }"
          style="font-size:14px;"
          ref="introductionText"
          v-html="detailData.fitguidanceIntroduce"
        ></p>
      </div>
      <div :class="['video-collection', { fold: isFold === true }]" v-if="videoFileList.length">
        <div class="list-title">
          <span class="title">选集</span>
          <span class="total" v-if="!isFold" @click="viewMore">全{{ videoFileList.length }}集</span>
          <van-icon v-else name="cross" @click="handleClick" />
        </div>
        <div :class="['list-wrap', { fold: isFold === true }]">
          <ul>
            <li
              v-for="(file, index) in videoFileList"
              :key="file.id"
              :class="{ current: currentIndex === index }"
              @click="selectVideo(index, file.type)"
            >
              <span>{{ index + 1 }}</span>
              <span class="video-item">{{ file.fileName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="recommended-list" v-if="recommendedList.length">
        <ul class="list-wrap">
          <van-list
            v-model="loading2"
            :finished="finished2"
            finished-text="没有更多了"
            :immediate-check="true"
            @load="inquireList"
          >
            <li
              v-for="item in recommendedList"
              @click="viewDetail(item.id, item.type, item.minorTermId)"
              :key="item.id"
            >
              <div class="img-box">
                <van-image width="100%" height="100%" :src="ImageUrl+item.titleImageId" />
              </div>
              <div class="list-cont">
                <h2>{{ item.fitguidanceTitle }}</h2>
                <div class="view">
                  <span>{{ item.browseNum }}次播放</span>
                  <span class="separator">|</span>
                  <span>{{ item.minorTermName }}</span>
                </div>
              </div>
            </li>
          </van-list>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import H5VideoPlayer from 'h5-video-player';
import { selectfitguidance, getFitguidancePage } from "@/http/api";
const poster = require("@/assets/default-img.png");
export default {
  name: "",
  created() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.minorTermId = this.$route.query.minorTermId;
    // 视频详情
    this.getVideoList();
    // 推荐列表
    this.getRecommendedData();
  },
  mounted() {
    this.$nextTick(() => {
      this.initVideo();
    });
  },
  data() {
    return {
      ImageUrl: this.ImageUrl,
      originPath: "",
      loading2: false,
      finished2: false,
      pageSize2: 4, // 每页条数
      pageIndex2: 1, // 页码
      currentIndex: 0,
      isFold: false,
      poster: poster, // 视频第一帧
      detailData: {},
      videoFileList: [],
      fileId: "",
      recommendedList: [],
      id: "",
      type: "",
      minorTermId: "",
      isVideoUrl: false, // 是否是链接 0.fileId  1.链接
      show: {
        unfold: false,
        cont: true
      },
      isPlay: true
    };
  },
  watch: {
    $route(to, from) {
      // 图文详情
      this.id = to.query.id;
      this.type = to.query.type;
      this.minorTermId = to.query.minorTermId;
      this.recommendedList = [];
      this.getVideoList();
      this.getRecommendedData();
    },
    detailData: function() {
      this.$nextTick(function() {
        let rem = parseFloat(this.getRem());
        if (!this.$refs.introductionText) {
          return console.log("内容为 null");
        }
        let descHeight = window
          .getComputedStyle(this.$refs.introductionText)
          .height.replace("px", "");
        console.log(descHeight, "descHeightdescHeight");
        if (descHeight > 2 * rem) {
          console.log("if");
          this.show.unfold = true;
          this.show.cont = false;
        } else {
          console.log("else");
          this.show.unfold = false;
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path == "/scientific-fitness") {
        vm.originPath = "y";
      } else {
        vm.originPath = "";
      }
    });
  },
  methods: {
    viewMore() {
      this.isFold = !this.isFold;
    },
    selectVideo(index, type) {
      this.currentIndex = index;
      this.fileId = this.videoFileList[index].fileId;
      if (type == 1) {
        this.$refs.video.src = this.fileId;
      } else {
        this.$refs.video.src = this.ImageUrl + this.fileId;
      }
    },
    handleClick() {
      this.isFold = !this.isFold;
    },
    viewDetail(id, type, minorTermId) {
      this.$router.push({
        name: "fitnessDetails",
        query: {
          id: id,
          type: type,
          minorTermId: minorTermId
        }
      });
    },
    onClickLeft() {
      if (this.originPath) {
        this.$router.go(-1);
      } else {
        window.location.href = "sxty://back";
        this.$router.push('/')
      }
    },
    // 获取视频详情
    getVideoList() {
      selectfitguidance({
        id: this.id
      }).then(res => {
        // console.log('-=-=-=-=-=-=-='+res);
        if (res.code == 0) {
          this.detailData = res.data;
          console.log(res);
          if(res.data.episodeList[0].type == 1){
            this.isVideoUrl = true
          }else{
            this.isVideoUrl = false
          }
        }
      });
    },
    // 获取推荐列表
    inquireList() {
      this.pageIndex2++;
      this.getRecommendedData();
    },
    getRecommendedData() {
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
    // 视频封面
    getVideoPoster(id) {
      return (
        "http://223.4.72.248:10084/api-file/files-anon/download?fileID=" + id
      );
    },
    getRem() {
      console.log("getRem");
      const defaultRem = 20;
      let winWidth = window.innerWidth;
      console.log("winWidth:" + winWidth);
      let rem = (winWidth / 375) * defaultRem;
      return rem;
    },
    initVideo() {
      //初始化视频方法
      // let myVideo =;
      let myPlayer = this.$video(this.$refs.video, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        autoplay: false,
        //自动播放属性,muted:静音播放
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto"
      });
    },
    handlePlay() {
      this.$refs.video.play();
      this.isPlay = false;
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.details {
  background-color: #fff;

  .video {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;

    video {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 999;
    }
    .play-btn {
      position: absolute;
      top: 45%;
      left: 50%;
      display: block;
      transform: translate3d(-50%, -50%, 0);
      width: 80px;
      height: 80px;
      background: transparent;
      z-index: 999;
    }
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

  .details-head {
    position: relative;
    padding: 12px 18px 16px 12px;

    h2 {
      max-width: 13.5rem;
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }

    .introduction {
      position: absolute;
      top: 13px;
      right: 24px;
      font-size: 12px;
      color: #666;

      &::after {
        position: absolute;
        top: 0;
        right: -18px;
        display: block;
        width: 20px;
        height: 20px;
        background: url("../../../assets/jiantoux.png") center no-repeat;
        background-size: 100% 100%;
        content: "";
      }
    }

    .text {
      font-size: 12px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &.more {
        height: auto;
        -webkit-line-clamp: initial;
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

  .video-collection {
    padding: 12px 12px 15px 12px;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    transition: height 1s ease-in;

    &.fold {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 99;
      background: #fff;
    }

    .list-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;

      .title {
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 14px;
      }

      .total {
        position: relative;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 12px;
        margin-right: 12px;

        &::after {
          position: absolute;
          top: -4px;
          right: -18px;
          display: block;
          width: 20px;
          height: 20px;
          background: url("../../../assets/jiantoux.png") center no-repeat;
          background-size: 100% 100%;
          transform: rotateZ(-90deg);
          content: "";
        }
      }
    }

    .list-wrap {
      overflow: hidden;

      ul {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;

        li {
          width: 100px;
          height: 50px;
          margin-right: 12px;
          padding: 8px 0 8px 6px;
          background: rgba(242, 242, 242, 1);
          border-radius: 3px;

          span {
            display: block;
            font-size: 13px;
            color: #666;
            line-height: 13px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            &:first-child {
              margin-bottom: 8px;
            }
          }

          .video-item {
            display: block;
            width: 100%;
            font-size: 13px;
            font-weight: 500;
            color: #666;
            line-height: 13px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }

        li.current {
          span,
          a {
            color: #1492ff;
          }
        }
      }

      &.fold {
        ul {
          flex-wrap: wrap;

          li {
            width: 48%;
            height: 75px;
            margin-bottom: 11px;

            &:nth-child(2n) {
              margin-right: 0;
            }

            span {
              line-height: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              white-space: pre-wrap;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }

  .recommended-list {
    li {
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
