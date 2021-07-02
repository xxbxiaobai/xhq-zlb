<template>
  <div class="feedback">
    <van-nav-bar title="反馈与建议" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <van-field
      v-model="message"
      rows="4"
      autosize
      label
      type="textarea"
      maxlength="200"
      placeholder="请输入您的建议（必填）"
      show-word-limit
    />
    <div class="contect">
        <van-field v-model="message" rows="2" autosize label="" type="textarea" placeholder="请输入联系方式（非必填）" />
    </div>
       <div class="button" @click="submit">提交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    submit(){
      if(!this.message){
        return alert("请输入建议")
      }
      alert("保存成功")
    }
  }
};
</script>
<style lang="less" scoped>
.feedback {
  height: 100%;
  background-color: #f6f8f7;
  /deep/.van-nav-bar__title {
    font-weight: 700;
    font-size: 18px;
  }
  .contect{
      .van-cell{
          margin-top: 0.5rem;
      }
  }
   .button {
    width: 100%;
    height: 2.15rem;
    line-height: 2.15rem;
    text-align: center;
    font-size: 0.7rem;
    color: #fff;
    background: linear-gradient(
      90deg,
      rgba(68, 141, 254, 1) 0%,
      rgba(76, 179, 254, 1) 100%
    );
    margin-top: 2.5rem;
  }
}
</style>