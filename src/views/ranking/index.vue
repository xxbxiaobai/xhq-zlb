<template>
  <div id="container">
    <!-- 标题 -->
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 内容 -->
    <van-cell>
      <template #title>
        <div class="r">
          <span>步数</span>
          <span>同城约</span>
        </div>     
      </template>
    </van-cell>

    <van-cell v-for="(item,i) in list" :key="i">
      <template #title>
        <span class="num">{{i+1}}</span>
        <van-image round width="1.5rem" height="1.5rem" :src="img" />
        <span class="custom-title">{{item.name}}</span>
        <div class="r">
          <span class="num1">12003</span>
          <span class="num2">12</span>
        </div>
      </template>
      <template #right-icon>
        <van-icon
          color="red"
          :name="item.xin? 'like':'like-o'"
          style="line-height: inherit;"
          @click="item.xin=!item.xin"
          size="1rem"
        />
      </template>
    </van-cell>
  </div>
</template>


<script>
let img = require("../../assets/nan.png");
export default {
  data() {
    return {
      img,
      xin: 0,
      list: [
        {
          name: "小王",
          xin: false
        },
        {
          name: "李秀丽",
          xin: false
        },
        {
          name: "邓小军",
          xin: false
        },
        {
          name: "李明",
          xin: false
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped lang="less">
#container {
  background-color: #f5f5f5;
  height: 100vh;
  .num {
    padding-right: 20px;
  }
  .num1 {
    font-family: PingFang SC;
    font-weight: 500;
  }
  .num2 {
    font-family: PingFang SC;
    font-weight: 500;
    color: #7e7e7e;
  }

  .r {
    width: 50%;
    position: absolute;
    right: 0;
    span {
      display: inline-block;
      width: 35%;
      text-align: center;
    }
  }

  .van-cell__title {
    display: flex;
    align-items: center;
    .van-image {
      margin-right: 0.5rem;
    }
  }
  .van-cell--clickable {
    align-items: center;
  }

  /deep/ .van-image--round img {
    object-position: 50% 50%;
    object-fit: cover;
  }
}
</style>
