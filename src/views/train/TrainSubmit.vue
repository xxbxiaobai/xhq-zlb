<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="imgblock">
      <img src="./images/success.png" />
    </div>
    <div class="text">提交完成</div>
    <div>请等待审核，可在我的培训查看进度</div>
    <div class="btn">
      <button @click="submit">完成</button>
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool"
import Tabar from "../../components/Tabar"
export default {
  data() {
    return {
      title: "提交完成",
      status: null
    }
  },
  components: { Tabar },
  methods: {
    submit() {
      if (this.status == 0) {
        this.$router.push({ path: "/trainlist" })
      } else {
        this.$router.push({ path: "/train" })
      }
    }
  },

  created() {
    zlbFun("提交完成")
    this.status = this.$route.params.status
    console.log(this.status)
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #ffffff;
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
    margin-top: 3.5rem;
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
