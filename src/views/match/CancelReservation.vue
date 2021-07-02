<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="box">
      <textarea placeholder="取消原因" v-model="text"></textarea>
    </div>
    <div class="btn">
      <button @click="cancel">取消预约</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar"
import { reqcancelled } from "../../http/api"
import { zlbFun } from "@/util/Tool"
export default {
  data() {
    return {
      title: "取消预约",
      cancelledlist: [],
      id:this.$route.params.id,
      text:''
    }
  },
  components: { Tabar },
  methods: {
    //取消报名
    cancel() {
      reqcancelled({
      id:this.id,
      cancelReason:this.text
      }).then(res => {
        // console.log(res)
       this.$router.push({path: '/cancelsubmit'})
      }).catch(err=>{
        this.$toast('取消失败');
      })
    },
  },

  created() {
    zlbFun("取消预约")
    // console.log(this.$route.params.id)
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #ffffff;
  .box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    textarea {
      width: 17.5rem;
      height: 9.5rem;
      font-size: 0.6rem;
      border: 1px solid rgba(231, 231, 231, 1);
      border-radius: 0.25rem;
      margin: 0.4rem auto;
      resize: none;
      padding-left: 0.5rem;
      padding-top: 0.1rem;
    }
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 12rem;
    button {
      width: 9.5rem;
      height: 2.05rem;
      background-color: #1492ff;
      color: #ffffff;
      font-size: 0.9rem;
    }
  }
}
</style>
