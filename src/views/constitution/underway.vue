<template>
  <div style="background:#fff;height:100%">
    <!-- 头部 -->
    <!-- <van-nav-bar title="等待完成" left-text="返回" left-arrow @click-left="onClickLeft" /> -->

    <section >
      <!-- <img src="./img/ing.png" alt /> -->
<span>生成中</span>
     
    </section>
     <p >测定报告生成中</p>
  
       <footer>
      <div>
        <img src="./img/daohang@2x.png" alt />
        <span>导航</span>
      </div>
      <div style="background:#1492FF;color:#fff">
        <span >电话</span>
      </div>
    </footer>
  </div>
</template>
<script>
import {zlbFun} from "@/util/Tool";
export default {
  data() {
    return {};
  },
  created() {
    zlbFun('等待完成')
  },
  components: {},
  methods: {
    // 返回
    onClickLeft() {
       this.$router.go(-1);
      // console.log(1);
      // this.$router.push({
      //   path: "/myMeasure"
      // });
    },
 
  }
};
</script>
<style lang="less" scoped>


section{
         width:18.75rem;
 height:12.975rem;
 background-image: url(img/ing.png);
 background-size: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 span{
     width:2.5rem;
 height:0.65rem;
 font-size:0.65rem;
 font-family:PingFang SC;
 font-weight:bold;
 color:rgba(255,255,255,1);
 line-height:0.775rem;
 margin-top: 1rem;
 
 }
    }
p{
    // width:4.825rem;
 height:0.65rem;
 font-size:0.7rem;
 font-family:PingFang SC;
 font-weight:500;
 text-align: center;
 margin-top: 3.4rem;
 color:rgba(102,102,102,1);
 line-height:1.1rem;
}
 // 底部导航
footer {
  position: fixed;
  bottom: 0;
  width: 18.75rem;
  height: 3rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.025rem 0rem 0rem rgba(0, 0, 0, 0.09);
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    text-align: center;
    width: 8rem;
    height: 1.6rem;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(204, 204, 204, 1);
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 1.4rem;
    img {
      width: 0.65rem;
      height: 0.725rem;
      margin-right: 0.3rem;
    }
  }
}
</style>