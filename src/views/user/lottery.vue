<template>
  <div class="lottery" >
    <van-nav-bar title="活动抽奖" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="title_img"></div>
    <div class="content">
      <div class="eggs">
        <li v-for="item in eggs" :key="item" @click="clickEgg(item)" :class="{ afterClick:item === number }"  class="beforeClick"></li>
      </div>
      <div class="record">
        奖励记录
        <router-link class="record_button" :to="{path:'/lotteryRecord'}">
          <div >
            去查看
          </div>
        </router-link>
      </div>
    </div>
    <div class="info">
      <div class="info_top"></div>
      <div class="info_content">
        <div class="info_activity">
          <span class="activity_span">活动说明</span>
        </div>
        <div class="info_rule">
          <!-- <p>1、凡在活动当天规定时间内通过西湖体育App、微信公众号、成功注册成为绍兴市全民健身公共服务平台用户者均可获得一次抽奖机会。</p> -->
          <p>2、每个手机号码只能参与一次抽奖。</p>
          <p>3、中奖者凭中奖结果可在现场领取T恤衫一件。</p>
        </div>
        <div class="gold"></div>
      </div>
    </div>
    <van-overlay class="isWin" :show="showWin" @click="showWin = false" >
      <img v-show="winner === 1" src="./image/Win.png" alt="">
      <img v-show="winner === 0" src="./image/noWin.png" alt="">
    </van-overlay>
  </div>
</template>

<script>
import { lotteryStart, findLotteryRecord } from '@/http/api'
export default {
  name: 'lottery',
  data () {
    return {
      eggs: ['1', '2', '3'],
      number: -1,
      isClick: false,
      showWin: false,
      winner: '2'

    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('userLoginMsg')).id
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    clickEgg(number) {
      if(this.isClick === false) {
        this.number = number
        this.isClick = true
        this.lotteryStart()
      } else {
        this.$toast('已经参与过抽奖')
      }
    },
    // 抽奖方法
    lotteryStart() {
      lotteryStart({
        userId: this.userId
      }).then(res => {
        if(res.code === 0 && res.msg === '谢谢参与') {
          this.winner = 0
          this.showWin = true
        } else if (res.code === 0 && res.msg === '恭喜您，抽中了') {
          this.winner = 1
          this.showWin = true
        } else {
          return this.$toast(res.msg)
        }
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style lang="less" scoped>
/deep/ #app{
  background-color: #7BBDF5;
}
.lottery {
  min-height: 100%;
  background-color: #7BBDF5;
  .isWin {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title_img{
    width: 100%;
    height: 68px;
    background: url('./image/title.png') no-repeat center;
    background-size: contain;
  }
  .content {
    background: url('./image/bg.png') no-repeat center;
    width: 100%;
    height: 270px;
    background-size: contain;
    position: relative;
    top: -24px;
    .eggs {
      display: flex;
      position: relative;
      top: 68px;
      width: 14.2rem;
      margin: 0 auto;
      justify-content: center;
      .beforeClick {
        width: 86px;
        height: 124px;
        margin-left: 10px;
        background: url('./image/egg.png') no-repeat center;
        background-size: contain;
      }
      .afterClick {
        width: 86px;
        height: 87px;
        margin-top: 36px;
        background: url('./image/egg2.png') no-repeat center;
        background-size: contain;
      }
    }
    .record {
      display: flex;
      justify-content: center;
      color: #fff;
      text-align: center;
      position: relative;
      bottom: -92px;
      .record_button {
        margin-left: 1rem;
        background-color:#FFEA5E;
        color: #F57B40;
        padding: 3px 15px;
        font-size: 16px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .info {
    width: 90%;
    margin: 0 auto;
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
      min-height: 10rem;
      background-color: #fff;
      .info_activity{
        margin: 0 auto;
        position: relative;
        top: 5px;
        background: url('./image/activity.png') no-repeat center;
        width: 241px;
        height: 36px;
        background-size: contain;
        .activity_span{
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 30px;
          font-size: 18px;
          color: #fff;
        }
      }
      .info_rule{
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        font-size: 14px;
      }
      .gold{
        width: 62px;
        height: 40px;
        position: absolute;
        left: -24px;
        bottom: -10px;
        background: url('./image/gold.png');
      }
    }
  }
}
</style>