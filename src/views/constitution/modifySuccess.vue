<template>
  <div>
    <div class="logo">
      <div class="nav">
      </div>
      <img src="./img/icon_finish@2x.png" alt />
      <p>修改成功</p>
    </div>
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
    }
  }
};
</script>
<style lang="less" scoped>
.logo {
  width: 7.2rem;
  height: 7.2rem;
  margin: 7rem auto;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    font-size: 30px;
    color: #0d90ff;
    text-align: center;
    margin-top: 20px;
  }
}
</style>