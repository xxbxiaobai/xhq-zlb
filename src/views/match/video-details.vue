<template>
  <div class="video-container">
    <div class="video-box">
      <video autoplay="autoplay"  preload ref="video" width="100%" controls="true" controlslist="nodownload" >
        <source :src="videoInfo.fileUrl" />
      </video>
      <div class="play-btn" v-show="isPlay" @click="handlePlay"></div>
    </div>
    <div class="info">
      <p class="match-name">{{ videoInfo.eventName }}</p>
      <p class="item-name">{{ videoInfo.itemName }}</p>
      <p class="address icon">{{ videoInfo.eventAddress }}</p>
      <p class="time icon">赛事时间：{{ videoInfo.eventTime }}</p>
    </div>
  </div>
</template>

<script>
import { openFullscreen, zlbFun } from "@/util/Tool";
export default {
  name: "",

  data() {
    return {
      isPlay: true,
      videoInfo: {}
    };
  },
  created() {
    zlbFun("赛事活动视频");
    this.videoInfo = JSON.parse(this.$route.query.item);
  },
  mounted() {
    openFullscreen(this.$refs.video);
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  methods: {
    onClickLeft() {
      this.$router.push("/match-video");
    },
    handlePlay() {
      this.$refs.video.play();
      this.isPlay = false;
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.video-container {
  .video-box {
    position: relative;
    .play-btn {
      position: absolute;
      top: 45%;
      left: 50%;
      display: block;
      transform: translate3d(-50%, -50%, 0);
      width: 4rem;
      height: 4rem;
      background: transparent;
      z-index: 999;
    }
  }
  .info {
    margin-top: -0.5rem;
    padding: 1rem;
    background: #fff;
    .match-name {
      font-size: 0.8rem;
      font-weight: 600;
      line-height: 0.8rem;
      margin-bottom: 0.8rem;
      color: #000;
    }
    .item-name {
      margin-bottom: 0.8rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      color: #666666;
    }
    .icon {
      position: relative;
      margin-bottom: 2px;
      padding-left: 20px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      line-height: 17px;
      &::before {
        position: absolute;
        top: 1px;
        left: 0;
        display: block;
        width: 15px;
        height: 15px;
        content: "";
      }
      &.time::before {
        background: url("../../assets/icon/weizhi-lan.png") center no-repeat;
        background-size: 100% 100%;
      }
      &.address::before {
        background: url("../../assets/icon/shijian-lan.png") center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
