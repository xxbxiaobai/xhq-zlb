<template>
  <div>
    <!-- 头部 -->
    <!-- <van-nav-bar title="提交完成" left-text="返回" left-arrow @click-left="onClickLeft" /> -->

    <div class="achieve">
      <img src="./img/wancheng@2x.png" alt />
      <h4>提交完成</h4>
      <p>审核完成后会通知到您，可在个人中心查看进度。</p>
      <div @click="accomplish">完成</div>
    </div>
  </div>
</template>
<script>
import {zlbFun} from "@/util/Tool";
export default {
  data() {
    return {};
  },
  created() {
    zlbFun('提交完成')
  },
  components: {},
  methods: {
    // 返回
    onClickLeft() {
       this.$router.go(-1);
      console.log(1);
      // this.$router.push({
      //   path: "/datum"
      // });
    },
    // 完成
    accomplish(){
     this.$router.push({
        path: "/constitu"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.achieve{
     width: 18.75rem;
     padding-bottom:5rem;
     background: white;
     display: flex;
     flex-direction:column;
     justify-content: center;
     text-align: center;
     img{
         width: 3.25rem;
         height: 3.25rem;
         margin: 0 auto;
         margin-top: 6.85rem;
    }
     h4{
         // width:3.55rem;
         //height:0.85rem;
         font-size:0.9rem;
         font-family:PingFang SC;
         font-weight:800;
         color:rgba(0,0,0,1);
         margin-top: 2.25rem;
    }
     p{
         // width:29.85rem;
         height:0.7rem;
         font-size:0.7rem;
         font-family:PingFang SC;
         font-weight:500;
         color:rgba(102,102,102,1);
         margin: 0.85rem 0 9.25rem 0;
    }
     div{
         margin: 0 auto;
         width: 9.5rem;
         height: 2rem;
         background: #1492FF;
         font-size: 0.9rem;
         color:#FFFFFF;
         line-height: 2rem;
         border-radius:0.15rem;
    }
}
 
</style>