<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  props:{
    title:String
  },
  data() {
    return {
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar{
  box-shadow:0px 1px 0px 0px rgba(0, 0, 0, 0.08);
}
.van-nav-bar__title {
  font-weight: 700;
}
</style>
