<template>
  <div id="home">
    <Tabar :title="title"></Tabar>
   <div class="title">
      <div class="imgblock">
      <img src="./images/success.png" />
    </div>
    <div class="text">提交成功</div>
    <div class="btn">
      <button @click="complete">完成</button>
    </div>
   </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar"
export default {
  data() {
    return {
      title: "提交成功"
    }
  },
  components: { Tabar },
  methods: {
    complete() {
        this.$router.go(-2);
    }
  },
}
</script>

<style lang='less' scoped>
.title {
  width: 100%;
  background-color: #ffffff;
  padding-top: 3.5rem;
  height: 100%;
  div {
    font-size: 0.7rem;
    color: #666666;
    text-align: center;
    img {
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  .imgblock {

  }
  .text {
    font-size: 0.9rem;
    color: #000000;
    font-weight: 700;
    margin-top: 2.25rem;
    margin-bottom: 0.8rem;
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 7rem;
    button {
      width: 9.5rem;
      height: 2.05rem;
      background-color: #1492ff;
      color: #ffffff;
      font-size: 0.9rem;
      margin-top: 2.7rem;
    }
  }
}
</style>
