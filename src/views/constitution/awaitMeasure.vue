<template>
  <div style="height: 100%;
    background: #fff;">
    <!-- 头部 -->
    <van-nav-bar title="我的测定" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div v-show="audit" class="timeline">
      <div>
        <div>
          <img src="./img/dui.png" alt />
          <span>已提交</span>
        </div>

        <div>
          <img src="./img/dui.png" alt />
          <span>站点审核</span>
        </div>
        <div>
          <img src="./img/dui.png" alt />
          <span>预约成功</span>
        </div>
      </div>
      <p></p>
    </div>
    <div v-show="cancel" class="timeline">
      <div>
        <div>
          <img src="./img/dui.png" alt />
          <span>站点确认中</span>
        </div>

        <div>
          <img src="./img/dui.png" alt />
          <span>站点已确认</span>
        </div>
        <div>
          <img src="./img/dui.png" alt />
          <span>已取消</span>
        </div>
      </div>
      <p></p>
    </div>
    <div v-show="determination " class="timeline">
      <div>
        <div>
          <img src="./img/dui.png" alt />
          <span>已提交</span>
        </div>

        <div>
          <section
            style=" width: 1.05rem;
        height: 1.05rem;
        z-index:277;
        background: #ffffff;
        border-radius: 50%;
        border: 0.3rem solid #1492FF;
        margin:0 auto"
          ></section>
          <span>站点审核</span>
        </div>
        <div>
          <section
            style=" width: 0.4rem;
            
        height: 0.4rem;
        background: #ffffff;
        border-radius: 50%;
        border: 0.25rem solid #9CD1FF;
        margin:0 auto"
          ></section>
          <span>预约成功</span>
        </div>
      </div>
      <p></p>
      <article></article>
    </div>
    <!-- 内容 -->
    <div style="background:#fff">
      <section class="contents">
        <h4>3月15日体质测定</h4>
        <ul>
          <li>
            <h6>测定站点</h6>
            <p>体质测定站点1</p>
          </li>
          <li>
            <h6>预约时间</h6>
            <p>2019.3.15  14：00</p>
          </li>
          <li >
            <h6>测定项目</h6>
            <p>
              <!-- {{datas.projectList[0].name}} -->
              <span>肺活量   身高体重   血糖血脂   X光   视力   心电图</span>
            </p>
          </li>
          <li>
            <h6>服务电话</h6>
            <p>123-4567-8998</p>
          </li>
          <li>
            <h6>测定站地址</h6>
            <!-- <p>绍兴市体育场路212号</p> -->
          </li>
          <li>
            <h6>测定状态</h6>
            <p>待测定</p>
          </li>
        </ul>
      </section>
    </div>
    <!-- 底部导航 -->
    <footer>
      <a
        :href="url+datas.longitude+','+datas.latitude+'&'+'name='+(datas.siteAddr?datas.siteAddr:'无地址')"
      >
        <div>
          <img src="./img/daohang@2x.png" alt />
          <span>导航</span>
        </div>
      </a>
      <a :href="'tel:'+123">
      <div @click="playcall" style="background:#1492FF;border:1px solid #fff">
        <span style="color:#fff">电话</span>
      </div>
      </a>
    </footer>
  </div>
</template>
<script>
import { zlbFun } from "@/util/Tool";
export default {
  data() {
    return {
      audit: true, //待测定
      fot: "",
      url: "https://uri.amap.com/marker?position=",
      shaa: false,
      datas: [],
      cancel: false, //取消
      determination: false, //审核中
      IdIs: "", //重新预约跳转页面传参
      defeated: false, //失败
      sTore: "",
      name: ""
    };
  },
  created() {
    zlbFun("我的测定");
    this.datas.status = 3;

    this.name;
    switch (this.datas.status) {
      case 3:
        this.name = "预约失败";
        this.fot = 3;
        this.defeated = true;
        console.log("预约失败");
        break;
      case 1:
        this.name = "待测定";
        this.audit = true;
        this.fot = 1;
        console.log("待测定");
        break;
      case 0:
        this.name = "审核中";
        this.determination = true;
        this.fot = 1;
        console.log("审核中");

        break;
      case 4:
        this.name = "取消";
        this.cancel = true;
        this.fot = 3;
        console.log("取消");
        break;
      case 5:
        this.name = "已测定";
        console.log("已测定");
        break;
    }
    // this.datas.push(this.name)
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
      // console.log(1);
      // this.$router.push({
      //   path: "/myMeasure"
      // });
    },
    // 查看预览报告
    preview() {
      let i = this.datas.siteId;
      console.log(i);
      // this.$store.state.siteId = { siteId: i };
      this.$router.push({
        path: "/datum",
        query: {
          siteId: i
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
// 进度条
.timeline {
  width: 100%;
  height: 5.775rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.125rem;
  > div {
    width: 14.5rem;
    height: 5.775rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 3rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      img {
        width: 1.05rem;
        height: 1.05rem;
        margin: 0 auto;
      }
      span {
        width: 3rem;
        height: 0.575rem;
        text-align: center;
        font-size: 0.6rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(20, 146, 255, 1);
      }
    }
  }
  p {
    // content: "";
    width: 11.15rem;
    margin: 0 auto;
    border: 0.025rem solid #1492ff;
    margin-top: -3.188rem;
  }
  article {
    width: 5.5rem;
    border: 0.05rem solid #9cd1ff;
    z-index: 123;
    position: absolute;
    margin-left: 52.5%;
    margin-top: -0.05rem;
  }
}
// 内容
.contents {
  width: 17.55rem;
  height: 25.125rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 0.25rem 0rem rgba(0, 0, 0, 0.08);
  border-radius: 0.25rem;
  margin: 0 auto;
  padding: 0.75rem 0 0 0.75rem;
  margin-top: -0.5rem;
  h4 {
    //  width:7rem;
    //  height:0.85rem;
    font-size: 0.9rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e7e7e7;
  }
  ul {
    li {
      margin: 1.3rem 0.4rem;
      h6 {
        line-height: 0.4rem;
        height: 0.35rem;
        font-size: 0.7rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.3rem;
        padding-left: 0.3rem;
        border-left: 0.1rem solid #1492ff;
      }
      p {
        //   width:3.5rem;
        height: 0.55rem;
        font-size: 0.55rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        padding-left: 0.3rem;
      }
    }
  }
}
// 底部导航
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.025rem 0rem 0rem rgba(0, 0, 0, 0.09);
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
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
  section {
    width: 17.55rem;
    height: 2.025rem;
    line-height: 2.025rem;
    background: rgba(20, 146, 255, 1);
    border-radius: 0.125rem;
    font-size: 0.9rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
}
</style>