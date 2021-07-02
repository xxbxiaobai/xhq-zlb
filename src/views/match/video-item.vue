<template>
    <div>
      <van-cell
      v-for="item in videoList"
      :key="item.id"
      @click="handlePlayVideo(item)"
    >
      <div class="video-item">
        <div class="img-box">
          <img :src="item.videoCoverImgUrl" alt="" />
        </div>
        <div class="video-detail">
          <h5>{{ item.eventName }}</h5>
          <div class="detail-info">
            <p class="name">{{ item.sponsor }}</p>
            <p class="time">{{ item.eventTime }}</p>
            <p class="address">{{ item.eventAddress }}</p>
          </div>
        </div>
      </div>
    </van-cell>
    </div>
</template>

<script>
export default {
  name: "",
  props: ['videoList'],
  data() {
    return {
      loading: false,
      error: false,
      finished: false,
      count: 0
    };
  },

  methods: {
    handlePlayVideo(item) {
      this.$router.push({
        name: "videoDetails",
        query: {
          item: JSON.stringify(item)
        }
      });
    },
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.video-item {
  display: flex;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
  border-radius: 0.25rem;
  padding: 0.8rem 0.75rem;
  box-sizing: border-box;
  border-radius: 6px;
  .img-box {
    flex: 6rem 0 0;
    height: 4rem;
    margin-right: 0.6rem;
    border-radius: 2px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .video-detail {
    width: calc(100% - 6.5rem);
    h5 {
      width: 98%;
      margin-bottom: 0.5rem;
      font-size: 0.7rem;
      font-weight: 400;
      color: rgba(53, 58, 65, 1);
      line-height: 1rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .detail-info {
      p {
        position: relative;
        margin-bottom: 0.1rem;
        padding-left: 1rem;
        font-size: 0.6rem;
        font-weight: 400;
        color: #333;
        line-height: 0.85rem;
        &::before {
          position: absolute;
          top: 1px;
          left: 0;
          display: block;
          width: 0.75rem;
          height: 0.75rem;
          content: "";
        }
        &.name {
          width: 98%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &.name::before {
          background: url("../../assets/zbdw.png") center no-repeat;
          background-size: 100% 100%;
        }
        &.time::before {
          background: url("../../assets/shijian@2x.png") center no-repeat;
          background-size: 100% 100%;
        }
        &.address::before {
          background: url("../../assets/dizhi@2x.png") center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
