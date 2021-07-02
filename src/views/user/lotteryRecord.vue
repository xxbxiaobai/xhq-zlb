<template>
  <div class="lottery">
    <van-nav-bar title="奖励记录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="info">
      <div class="info_top"></div>
      <div class="info_content">
        <span class="title">获奖清单</span>
        <div class="tab">
          <span>时间</span>
          <span>奖品</span>
        </div>
        <div class="tab_content">
          <span>{{ Time }}</span>
          <span>{{ prizeName }}</span>
        </div>
        <div class="gold"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { findLotteryRecord } from '@/http/api'
import { formatDateTimeBack } from '@/util/Tool'
export default {
  name: 'lotteryRecord',
  data () {
    return {
      Time: '',
      prizeName: '',
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('userLoginMsg')).id
    this.findLotteryRecord()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 查询抽奖结果
    findLotteryRecord() {
      findLotteryRecord({
        userId: this.userId
      }).then(res => {
        if(res.code === 0) {
          this.Time = res.data.createTime
          this.prizeName = res.data.prizeName
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.lottery {
  width: 100%;
  height: 100%;
  background:linear-gradient(180deg,rgba(123,189,245,1) 66%,rgba(173,211,251,1) 100%);
}
  .info {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    .info_top {
      width: 100%;
      background: url('./image/info_top.png') no-repeat center;
      height: 47px;
      background-size: contain;
    }
    .info_content {
      position: relative;
      top: -22px;
      margin: 0 auto;
      width: 90%;
      height: 80vh;
      background-color: #fff;
      .title {
        display: flex;
        justify-content: center;
        padding-top: 10px;
      }
      .tab {
        width: 60%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 16px;
        color: #999999;
      }
      .tab_content {
        width: 70%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        font-size: 16px;
        color: #999999;
      }
      .gold{
        width: 62px;
        height: 40px;
        position: absolute;
        left: -24px;
        bottom: -10px;
        background: url('./image/gold.png') no-repeat;
      }
    }
  }
</style>