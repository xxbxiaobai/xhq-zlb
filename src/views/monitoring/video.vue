<template>
  <div class="details">
    <van-nav-bar title="直播中" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="conetent">
      <div class="video" v-if="detailData.episodeList.length">
        <video
          class="video-box video-js vjs-big-play-centered vjs-fluid"
          id="myVideo"
          ref="video"
          width="100%"
          controls="true"
          controlslist="nodownload"
          :poster="detailData.fitguidancefileList[0].url"
        >
          <source v-if="isVideoUrl" :src="detailData.episodeList[0].fileId" type="video/mp4" />
          <source v-else :src="videoUrl" type="video/mp4" />
          <!-- <source src="https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-06/535adc2214bc47fe80d7c64d93870e0e-file.mp4"  type="video/mp4"/> -->
        </video>
        <div class="play-btn" v-show="isPlay" @click="handlePlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import H5VideoPlayer from 'h5-video-player';
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
      currentIndex: 0,
      isFold: false,
      poster: poster, // 视频第一帧
      detailData: {},
      videoFileList: [],
      fileId: "",
      videoUrl:require('../../assets/zb.mp4'),
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
        this.$refs.video.src = this.videoUrl;
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
      this.$router.go(-1);
    },
    // 获取视频详情
    getVideoList() {
      setTimeout(() => {
        this.detailData = {
          majorTermName: "健美健身",
          unitName: "浙江省体育局",
          createTime: "2020-03-23 11:52:32",
          minorTermId: 22,
          episodeList: [
            {
              originalFileName:
                "D:\\体育总会\\2020\\宅家也爱做运动项目相关资料——浙江省体育局\\各期视频汇总\\“宅家也爱做运动”第二十四期视频\\a6f0199fc4d2d90a50bb54d4c08d4d73.mp4",
              fileName: "腹部练习",
              fileUrl:
                "https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2020-03-23/b9739dd6a33b43a2ad817b786e582772-file.mp4",
              episode: 1,
              type: 0,
            },
            {
              originalFileName:
                "D:\\体育总会\\2020\\宅家也爱做运动项目相关资料——浙江省体育局\\各期视频汇总\\“宅家也爱做运动”第二十四期视频\\e99f5727a802f84de772cf8f66943d0a.mp4",
              fileName: "平板支撑",
              fileUrl:
                "https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2020-03-23/f7c8edb007f14281af4fd0b0fdfe54af-file.mp4",
              episode: 2,
              type: 0,
            },
            {
              originalFileName:
                "D:\\体育总会\\2020\\宅家也爱做运动项目相关资料——浙江省体育局\\各期视频汇总\\“宅家也爱做运动”第二十四期视频\\021e4f03c61c3d5c331a5c334652da7e.mp4",
              fileName: "产后盆骨训练收髋",
              fileUrl:
                "https://cn-hangzhou-zjzwy01-d01/zjsport_filehost/2020-03-23/2797530090d146a296aab5fca9c760a7-file.mp4",
              episode: 3,
              type: 0,
            }
          ],
          fitguidanceIntroduce:
            "本期乐刻运动的Matts方、乔鹏和十三姨Daisy三位教练传授健身秘籍，让您“宅”家也爱做运动！",
          id: 1114,
          fitguidanceTitle:
            "【专栏】宅家也爱做运动：三个动作让你拥有迷人腹肌（第二十四期）",
          browseNum: "35",
          fitguidancefileList: [
            {
              id: "1847683fa77d40339b770fea36d58ffd",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url: require("../../assets/zb.jpg"),
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ],
          minorTermName: "健身",
          majorTermId: 21
        };
        this.videoFileList = this.detailData.episodeList;

        this.fileId = this.videoFileList[0].fileId;

        // 0是fileId 1是外部链接
        this.isVideoUrl = this.videoFileList[0].type == 1 ? true : false;
      }, 100);
    },
    // 获取推荐列表
    getRecommendedData() {
      this.recommendedList = [
        {
          episodeNum: 3,
          titleImageId: "1847683fa77d40339b770fea36d58ffd",
          fitguidanceTitle:
            "【专栏】宅家也爱做运动：三个动作让你拥有迷人腹肌（第二十四期）",
          type: 1,
          minorTermName: "健身",
          majorTermId: 21,
          majorTermName: "健美健身",
          minorTermId: 22,
          fitguidanceIntroduce:
            "本期乐刻运动的Matts方、乔鹏和十三姨Daisy三位教练传授健身秘籍，让您“宅”家也爱做运动！",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-23/70f8333309de45d680488605c3a56b5e-file.jpg",
          id: 1114,
          browseNum: "26",
          fileList: [
            {
              id: "1847683fa77d40339b770fea36d58ffd",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-23/70f8333309de45d680488605c3a56b5e-file.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: 3,
          titleImageId: "81634e6da1944a5390676b4e7233ba81",
          fitguidanceTitle:
            "【专栏】宅家也爱做运动：每天练一练，轻松回到18岁（第二十三期））",
          type: 1,
          minorTermName: "健身",
          majorTermId: 21,
          majorTermName: "健美健身",
          minorTermId: 22,
          fitguidanceIntroduce:
            "本期乐刻运动的小碗、Matts方和安妮三位教练传授健身秘籍，让您“宅”家也爱做运动！",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-16/3dbd708db9674e6ba48e38c5ab0c6c97-file.jpg",
          id: 1113,
          browseNum: "33",
          fileList: [
            {
              id: "81634e6da1944a5390676b4e7233ba81",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-16/3dbd708db9674e6ba48e38c5ab0c6c97-file.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: 3,
          titleImageId: "be8e08e017be42ffbc8cca1f78be5f41",
          fitguidanceTitle:
            "【专栏】宅家也爱做运动：学会三个动作，小奶狗秒变小狼狗（第二十二期）",
          type: 1,
          minorTermName: "健身",
          majorTermId: 21,
          majorTermName: "健美健身",
          minorTermId: 22,
          fitguidanceIntroduce:
            "本期乐刻运动的乔鹏、安妮和刺猬三位教练传授健身秘籍，让您“宅”家也爱做运动！",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-09/9c1073ac2e6140358dce8c031e7c3f88-file.jpg",
          id: 1112,
          browseNum: "84",
          fileList: [
            {
              id: "be8e08e017be42ffbc8cca1f78be5f41",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-09/9c1073ac2e6140358dce8c031e7c3f88-file.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: 3,
          titleImageId: "02a9be4a158149599e6fc404135e6995",
          fitguidanceTitle:
            "【专栏】宅家也爱做运动：四个动作让产后身材重回巅峰（第二十一期）",
          type: 1,
          minorTermName: "健身",
          majorTermId: 21,
          majorTermName: "健美健身",
          minorTermId: 22,
          fitguidanceIntroduce:
            "本期乐刻运动的刺猬、乔鹏和高强三位教练传授健身秘籍，让您“宅”家也爱做运动！",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-02/cf6f83c1d20e40638ae56da5b6c0233c-file.jpg",
          id: 1111,
          browseNum: "70",
          fileList: [
            {
              id: "02a9be4a158149599e6fc404135e6995",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-02/cf6f83c1d20e40638ae56da5b6c0233c-file.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        }
      ];
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
    height: calc(100vh - 46px);
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
      background: url("../../assets/liulan.png") center no-repeat;
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
        background: url("../../assets/jiantoux.png") center no-repeat;
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
        background: url("../../assets/jiantoux.png") center no-repeat;
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
          background: url("../../assets/jiantoux.png") center no-repeat;
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
