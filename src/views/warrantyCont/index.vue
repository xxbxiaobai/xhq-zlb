<template>
  <div id="container">
    <!-- 头部开始 -->
    <van-nav-bar title="我的报修" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 头部结束 -->

    <!-- 保修基本信息开始 -->
    <div class="box-cont">
      <strong>报修场地：{{pointAddr}}</strong>
      <p>上报时间：{{date}}</p>
      <div class="inform">
        体育中心通知您：{{
        status === 1?'您的报修已通过审核，请耐心等待!':
        status === 3?'您的报修已完成!':
        status === 2?'经管理员审核，该设施无需报修。':
        '您的报修正在受理，请耐心等待!'
        }}
      </div>
    </div>
    <!-- 保修基本信息结束 -->

    <!-- 时间线开始 -->
    <div :class="{'box-date':true,'no-pass':status===2,'pass':status===1,'finish':status===3}">
      <div class="box-status">
        <i></i>
      </div>
      <div class="box-status">
        <i></i>
      </div>
      <div class="box-status">
        <i></i>
      </div>
      <div class="line">
        <div></div>
        <div></div>
      </div>
    </div>
    <!-- 时间线结束 -->

    <!-- 内容开始 -->
    <div class="box-particulars">
      <!-- 维修完成反馈开始 -->
      <div v-if="status===3">
        <h3>报修完成图片</h3>
        <div class="img">
          <img v-for="(item,i) in succeedImgs" :key="i" :src="item" @click="imgClick2(i)"/>
        </div>
      </div>
      <!-- 维修完成反馈结束 -->

      <!-- 报修图片开始 -->
      <div>
        <h3>报修图片</h3>
        <div class="img">
          <img v-for="(item,i) in imgs" :key="i" :src="item" @click="imgClick(i)" />
        </div>
      </div>
      <!-- 报修图片结束 -->

      <!-- 报修说明开始 -->
      <div>
        <h3>报修说明</h3>
        <div id="warrantytext">{{cont}}</div>
      </div>
      <!-- 报修说明结束 -->
    </div>
    <!-- 内容结束 -->
  </div>
</template>


<script>
import { repairDetail } from "../../http/api";
import { renderTime } from "../../util/Tool";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      // 0待审核 1通过 2驳回 3完成
      // 0:详情:  1.详情通过:ok  2.详情完成:finish  -1.详情驳回:no
      pointAddr: '',
      active: 1,
      status: 3,
      title: "",
      date: "",
      cont: "",
      imgs: [],
      succeedImgs: []
    };
  },
  methods: {
    onClickLeft() {
      // this.$router.push("/warrantylist");
      this.$router.go(-1);
    },
    onLoad() {
      repairDetail({ repairId: this.$route.query.repairId }).then(res => {
        console.log(res);
        res.data.fileList.forEach(item => {
          this.imgs.push(this.ImageUrl+item.id);
        });
        if (res.fileList) {
          res.fileList.forEach(item => {
            this.succeedImgs.push(this.ImageUrl+item.id);
          });
        }
        this.title = res.data.point.pointName;
        this.date = renderTime(res.data.repair.createTime);
        this.status = res.data.repair.status;
        this.cont = res.data.repair.repairContent;
        this.pointAddr = res.data.repair.repairAddr
      });
    },
    imgClick(index) {
      ImagePreview({
        images: this.imgs,
        startPosition: index
      });
    },
    imgClick2(index) {
      ImagePreview({
        images: this.succeedImgs,
        startPosition: index
      });
    }
  },
  created() {
    this.onLoad();
  }
};
components: {
}
</script>


<style scoped lang="less">
//==========================
//时间线
.statusDate(@start:#1492ff,@march:#e7e7e7,@end:#e7e7e7,@pass:"已通过",@passicon:"../../assets/yitongguo.png") {
  > .box-status {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 50%;
    z-index: 10;
    &:nth-child(1) {
      background-color: @start;
    }
    &:nth-child(2) {
      background-color: @march;
    }
    &:nth-child(3) {
      background-color: @end;
    }
    &:nth-child(1)::before {
      content: "待受理";
      position: absolute;
      bottom: -1rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      white-space: nowrap;
    }
    &:nth-child(2)::before {
      content: @pass;
      position: absolute;
      bottom: -1rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      white-space: nowrap;
    }
    &:nth-child(3)::before {
      content: "已完成";
      position: absolute;
      bottom: -1rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      white-space: nowrap;
    }
    &:nth-child(1) > i {
      background: url("../../assets/dengdai.png") no-repeat center;
      background-size: cover;
    }
    &:nth-child(2) > i {
      background: url(@passicon) no-repeat center;
      background-size: cover;
    }
    &:nth-child(3) > i {
      background: url("../../assets/yiwancheng.png") no-repeat center;
      background-size: cover;
    }
    > i {
      display: inline-block;
      height: 1rem;
      width: 1rem;
      background-color: red;
    }
  }
  > .line {
    display: flex;
    position: absolute;
    height: 1px;
    width: 100%;
    z-index: 1;
    > div {
      width: 100%;
      font-weight: 200;
      border-width: 1px;
    }
  }
  > .line {
    > div {
      border-bottom: 1px dashed #ccc;
    }
  }
}
//==========================

#container {
  min-height: 100vh;
  width: 100vw;
  background-color: white;
  // 基本信息
  .box-cont {
    min-height: 5.5rem;
    padding: 0.9rem 0.6rem 1rem 0.6rem;
    border-bottom: 0.4rem solid #f6f8f7;
    background-color: white;
    strong {
      display: block;
      font-size: 0.8rem;
    }
    p {
      margin-top: 0.5rem;
      line-height: 0.6rem;
      font-size: 0.6rem;
      color: #999;
    }
    .inform {
      display: flex;
      align-items: center;
      padding-top: 1rem;
      font-size: 0.65rem;
      line-height: 0.65rem;
      color: #1492ff;
      &::before {
        content: "";
        display: inline-block;
        margin-right: 0.35rem;
        height: 0.65rem;
        width: 0.75rem;
        background: url("../../assets/laba.png") no-repeat center;
        background-size: cover;
        vertical-align: middle;
      }
    }
  }

  //时间线
  .box-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-bottom: 1rem;
    margin: 0 0.7rem;
    height: 5rem;
    background-color: white;
    .statusDate();
  }
  //已通过
  .pass {
    .statusDate(#1492ff, #1492ff, #e7e7e7);
  }
  // 未通过
  .no-pass {
    .statusDate(
      #1492ff,
      #d51f1f,
      #e7e7e7,
      "未通过",
      "../../assets/butongguo.png"
    );
  }
  // 已完成
  .finish {
    .statusDate(#1492ff, #1492ff, #1ddd97);
  }
  //内容开始
  .box-particulars {
    position: relative;
    padding: 0 0.6rem;
    padding-bottom: 1.5rem;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 1px;
      width: 96.5vw;
      background-color: #e7e7e7;
    }
    div {
      font-size: 0.7rem;
      line-height: 0.7rem;
      h3 {
        padding: 0.9rem 0;
        font-size: 0.8rem;
        line-height: 0.8rem;
      }
      .img {
        display: flex;
        flex-flow: wrap;
        margin: -0.3rem -0.3rem 0.2rem -0.3rem;
        img {
          padding: 0.3rem;
          height: 5.4rem;
          width: 30%;
        }
      }
    }
  }
}
#warrantytext {
  font-size: 0.8rem !important;
  word-break: break-all;
}
</style>