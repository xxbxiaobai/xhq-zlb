<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="report">
      <img :src="$route.params.url" alt />
    </div>
    <div class="btn">
      <!-- <button @click="download">下载成绩单</button> -->
      <a :href="$route.params.url" download>下载成绩单</a>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar"
import { details } from "../../http/api"
import { zlbFun } from "@/util/Tool"
export default {
  data() {
    return {
      title: "预览报告",
      fileimg: ""
    }
  },
  components: { Tabar },

  methods: {
    // getdetail() {
    //   details({
    //     id: this.$route.params.id
    //   }).then(res => {
    //     this.fileimg = res.data.fileUrl
    //     // console.log(this.fileimg)
    //   })
    // }
  },

  created() {
    zlbFun("预览报告")
    // console.log(this.$route.params.id)
    // this.getdetail()
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #ffffff;
  .report {
    width: 17.5rem;
    height: 17.5rem;
    background-color: #f4f6f5;
    margin: 0.5rem auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    a {
      display: block;
      width: 9.5rem;
      height: 2.05rem;
      background-color: #1492ff;
      color: #ffffff;
      font-size: 0.9rem;
      margin-top: 2.7rem;
      text-align: center;
      line-height: 2.05rem;
      border-radius: .2rem;
    }
  }
}
</style>
