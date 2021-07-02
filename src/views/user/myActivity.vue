<template>
  <div>
    <van-nav-bar title="活动" left-text="返回" left-arrow @click-left="onClickLeft" />
    <ul class="box-list">
      <router-link
        :to="'/lottery'"
        tag="li"
        class="list-card"
      >
        <div class="bgm"></div>
        <div class="cover">
          <div class="left">
            <img
              src="./image/image.png"
              alt
            />
          </div>
          <div class="right">
            <p>第三届女子节抽奖活动</p>
            <p class="time">2020年8月6日</p>
            <div class="look">
              查看详情
            </div>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  }
}
</script>

<style lang="less" scoped>
  .box-list {
    overflow: auto;
    .list-card {
      position: relative;
      margin: 0.6rem 0.6rem;
      border-radius: 0.4rem;
      background-color: #fff;
      margin-top: 0;
      .bgm {
        height: 6.375rem;
        border-radius: 5px;
        width: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
        margin-top: 5px;
      }
      p {
        font-size: 16px;
        font-weight: 700;
      }
      .cover {
        height: 6.375rem;
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
          font-size: 16px;
          & > p:last-child {
            font-size: 16px;
            color: #666;
            margin-top: 10px;
          }
          & > p:last-child {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .time{
            background-size: contain;
            color: #999999;
            font-size: 14px;
            margin-top: 8px;
            &::before {
              content: "";
              display: inline-block;
              margin-right: 0.25rem;
              height: 0.7rem;
              width: 0.7rem;
              background: url('./image/time.png') no-repeat center;
              background-size: cover;
            }
          }
          .look{
            color: #fff;
            width: 100px;
            padding: 4px 8px;
            margin-top: 1.25rem;
            text-align: center;
            background-color: #5B9DFD;
            font-size: 15px;
            border-radius: 20px;
          }

        }
      }
    }
  }
</style>