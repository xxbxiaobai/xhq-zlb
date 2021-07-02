<template>
  <div class="graphic-wrap">
    <div class="graphic-content">
      <div class="details-head">
        <h2>{{detailData.fitguidanceTitle }}</h2>
        <div class="view">
          <span>{{detailData.browseNum }}次播放</span>
          <span class="separator">|</span>
          <span>{{detailData.minorTermName }}</span>
        </div>
      </div>
      <div class="details-content">
        <div class="img-box">
          <img :src="detailData.fitguidancefileList[0].url" alt />
        </div>
        <p>{{detailData.fitguidanceIntroduce }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool";
import { Regionalitying } from "../../http/api";
export default {
  name: "",
  data() {
    return {
      ImageUrl: this.ImageUrl,
      detailData: []
    };
  },
  created() {
    zlbFun('图文详情')
    var id = this.$route.query.id;
    Regionalitying({ id }).then(res => {
      console.log(res);
      this.detailData = res.data;
    });
  },

  methods: {
    onClickLeft() {
       this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.graphic-wrap {
  background: #fff;
  height: 100%;
  .graphic-content {
    padding: 0.5rem 0.3rem 0;
    .details-head {
      position: relative;
      // padding: 0.3rem 0.45rem 0.4rem 0.3rem;
      h2 {
        text-align: left;
  font-size:1rem;
 font-family:PingFang SC;
 font-weight:bold;
 color:rgba(51,51,51,1);
 line-height:1.35rem;
      }
      .view {
        position: relative;
        margin-top:0.625rem;
        margin-bottom: 1.25rem;
        padding-left: 1.075rem;
        line-height: 0.25rem;
        span {
          font-size: 0.25rem;
          color: rgba(153, 153, 153, 1);
          line-height: 0.25rem;
        }
        .separator {
          padding: 0 0.25rem;
        }
        &::before {
          position: absolute;
          top: 0.075rem;
          left: 0;
          display: block;
          width: 0.625rem;
          height: 0.5rem;
          background: url("img/yan.png") center no-repeat;
          background-size: 100% 100%;
          content: "";
        }
      }
      .introduce {
        position: absolute;
        top: 0.375rem;
        right: 0.675rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.3rem;
        padding-right: 0.075rem;
        &::after {
          position: absolute;
          top: -0.075rem;
          right: -0.45rem;
          display: block;
          width: 0.5rem;
          height: 0.5rem;
          // background: url("../../../assets/jiantoux.png") center no-repeat;
          background-size: 100% 100%;
          content: "";
        }
      }
    }
    .details-content {
      .img-box {
        width: 100%;
        // height: 5rem;
        margin-bottom: 0.45rem;
        img {
        width:100%;
//  height:10rem;
        }
      }
      p {
        text-indent: 2em;
       font-size:0.7rem;
 font-family:PingFang SC;
 font-weight:400;
 color:rgba(51,51,51,1);
 line-height:1.2rem;
      }
    }
  }
}
</style>
