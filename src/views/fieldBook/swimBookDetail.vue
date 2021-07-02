<template>
  <div id="bookDetail">
    <van-nav-bar title="购票详情" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="info">请认真核对信息</div>
    <div class="content">
      <ul>
        <li>
          <span class="title">场馆：</span>
          <span class="con">{{cgxxName}}</span>
        </li>
        <li>
          <span class="title">门票：</span>
          <span class="con">{{datas.cdhmName}}</span>
        </li>
        <li>
          <span class="title">使用时间：</span>
          <span class="con">仅限当天，{{datas.startTimeName}}--{{datas.endTimeName}}</span>
        </li>
        <li>
          <span class="title">门票价格：</span>
          <span class="con">{{datas.price}}元</span>
        </li>
        <li>
          <span class="title">数量：</span>
          <van-stepper v-model="count" />
        </li>
      </ul>
    </div>
    <div class="info" style="margin-top:10px;">购买须知</div>
    <div style="padding:1rem;">
      <p style="font-size:14px;">1、请在当天使用，过期作废</p>
    </div>
    <div class="footer">
      <div class="line_bottom"></div>
      <div class="promise">
        <van-checkbox v-model="checked">
          购买即视为同意
          <span>《购买须知》</span>
        </van-checkbox>
      </div>
      <button @click="submit" :disabled="isAble">
        <span style="font-size；12px;">合计：</span>
        <span style="font-size:16px;">￥{{count*datas.price}}</span>提交订单
      </button>
    </div>
  </div>
</template>
<script>
import { swimOrderNumber } from "@/http/api";
import wx from "weixin-jsapi";
export default {
  data() {
    return {
      isAble: false,
      count: 1,
      checked: true,
      datas: "",
      cdlxName: "",
      cgxxName: "",
      appId: "",
      orderNum: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      if (!this.checked) {
        return this.$toast("请同意购买须知");
      }
      this.isAble = true;
      setTimeout(() => {
        this.isAbled = false;
      }, 2000);
      swimOrderNumber({
        cdlxId: this.datas.cdlxId,
        cdhmId: this.datas.cdhmId,
        votes: this.count,
        memberId: JSON.parse(localStorage.getItem("userLoginMsg")).id
      }).then(res => {
          console.log(res);
          this.isAble = false;
          if (res.resp_code == 0) {
            this.orderNum = res.datas.orderNum;
            this.appId = res.datas.appId;
            this.$router.push({
              name: 'identityOrder',
              query: {
                orderNum: res.datas.orderNum,
                appId: res.datas.appId,
                cgxxName: this.cgxxName,
                cdlxName: this.cdlxName,
                datas: JSON.stringify(this.datas),
                count: this.count
              }
            });
          } else {
            this.$toast(res.resp_msg);
          }
        }).catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.datas = JSON.parse(this.$route.query.info);
    this.cgxxName = this.$route.query.cgxxName;
    this.cdlxName = this.$route.query.cdlxName
  }
};
</script>
<style lang="less" scoped>
#bookDetail {
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    .line_bottom {
      height: 1rem;
      background-color: #f6f8f7;
    }
    button {
      width: 100%;
      background: #1492ff;
      vertical-align: middle;
      height: 42px;
      color: #fff;
      font-size: 16px;
      position: absolute;
      bottom: 0;
      & > span:first-child {
        font-size: 12px;
      }
      & > span:nth-child(2) {
        font-size: 16px;
        margin: 0 10px;
      }
    }
    .promise {
      font-size: 14px;
      padding: 1rem;
      span {
        color: #1989fa;
      }
    }
  }
  .info {
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 14px;
    background-color: #f6f8f7;
    padding: 0 1rem;
    color: #999;
  }
  .content {
    padding: 0 1rem;
    /deep/.van-stepper {
      display: inline;
      vertical-align: middle;
    }
    li {
      height: 2.5rem;
      line-height: 2.5rem;
      &::after {
        content: "";
        height: 1px;
        width: 100%;
        background-color: #ccc;
        display: block;
        transform: scaleY(0.5);
      }
    }
    .con {
      font-size: 14px;
    }
  }
  .title {
    font-size: 14px;
    color: #999;
  }
}
</style>