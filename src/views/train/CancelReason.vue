<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="box">
      <textarea placeholder="取消原因" v-model="reason"></textarea>
    </div>
    <div class="btn">
      <button @click="cancal">取消报名</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar"
import { zlbFun } from "@/util/Tool"
import { canceltrain } from "../../http/api"
export default {
  data() {
    return {
      title: "取消报名",
      reason:''
    }
  },
  components: { Tabar },
  methods: {
    cancal() {
      // console.log(this.$route.params.id)
      canceltrain({
        id: this.$route.params.id,
        cancelRemark:this.reason
      }).then(res => {
        // console.log(res)
        if(res.code==0){
          this.$router.push({ path: '/trainsuccess'})
        }else{
          this.$toast.fail('取消失败')
        }
      })
    }
  },

  created() {
    zlbFun("取消报名")
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
