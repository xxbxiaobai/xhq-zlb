<template>
  <div id="container">
    <!-- 遮罩层 -->
    <van-overlay
      :show="show"
      :custom-style="{
        'background-color': 'rgba(0,0,0,.1)'
      }"
      @click="closePopup"
    />
    <!-- 提示弹窗 -->
    <div v-if="backShow" class="prompot-popup">
      <p class="prompot-title">提示</p>
      <div class="prompot-content">
        <img src="../../assets/take_a_note.png" alt />
        <p>退出后编写的内容将不会保存</p>
      </div>
      <div class="prompot-footer">
        <button @click="tuichu">退出</button>
        <button @click="closeBackShow">我再想想</button>
      </div>
    </div>

    <div v-if="successShow" class="prompot-popup">
      <p class="prompot-title">提示</p>
      <div class="prompot-content">
        <img class="commont-img" src="../../assets/marketing.png" alt />
        <p>恭喜您提交成功</p>
      </div>
    </div>

    <div v-if="failShow" class="prompot-popup">
      <p class="prompot-title">提示</p>
      <div class="prompot-content">
        <img class="commont-img" src="../../assets/network.png" alt />
        <p>当前网络状态不佳</p>
      </div>
    </div>
    <!-- 头部开始 -->
    <van-nav-bar title="设备报修" left-text="返回" @click-left="goBack" left-arrow>
      <!-- <van-icon name="search" slot="right" /> -->

      <van-button plain hairline type="info" slot="right" @click="submit">提交</van-button>
    </van-nav-bar>
    <!-- 头部结束 -->

    <!-- 身体开始 -->
    <div class="cont-body">
      <textarea placeholder="请输入报修详情（最多200字，最少6字）" maxlength="200" v-model="repairContent"></textarea>

      <!-- 图片上传开始 -->
      <div class="box-img">
        <van-uploader
          v-model="fileList"
          multiple
          :max-count="6"
          :after-read="afterRead"
          :before-read="beforeRead"
        />
      </div>
      <!-- 图片上传结束 -->

      <span class="site">{{repairAddr}}</span>
    </div>
    <!-- 身体结束 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { repairSubmit, baseFiles } from "../../http/api";
export default {
  data() {
    return {
      backShow: false,
      failShow: false,
      successShow: false,
      show: false,
      repairContent: "",
      repairAddr: "", //场地
      pointId: "", //场地id
      fileList: [], //图片
      repairTitle: "" //标题
    };
  },
  created() {
    this.repairAddr = this.$route.query.pointAddr;
    this.pointId = this.$route.query.pointId;
  },
  computed: {
    ...mapGetters(["userMsg"])
  },
  methods: {
    //提交验证
    submit() {
      let isNull =
        this.repairContent !== "" &&
        this.repairAddr !== "" &&
        this.pointId !== "";
      console.log(isNull);
      if (isNull) {
        this.repairContent = this.repairContent.trim();
        if (this.repairContent.length >= 6) {
          let repairFileId = [];
          this.fileList.forEach(item => {
            repairFileId.push(item.id);
          });
          console.log(localStorage.getItem('userLoginMsg'))
          repairSubmit({
            repairContent: this.repairContent,
            repairAddr: this.repairAddr,
            pointId: this.pointId,
            repairUserId: JSON.parse(localStorage.getItem('userLoginMsg')).id,
            repairFileId: repairFileId.join(",")
          }).then(res => {
            this.$toast("报修成功");
            setTimeout(() => {
              // this.$router.push(-1);
              this.$router.go(-1);
            }, 2000);
          });
        } else {
          this.$toast("内容不能少于6字");
        }
      } else {
        this.$toast("请填写报修详情");
      }
    },
    //图片上传前校验
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("请上传jpg或者png格式图片");
        return false;
      }
      return true;
    },
    //图片上传回调
    afterRead(file, even) {
      baseFiles({ base: file.content }).then(res => {
        this.fileList[even.index].id = res.datas.id;
      });
    },
    //返回
    goBack() {
      this.show = true;
      this.backShow = true;
    },
    //关闭返回弹窗
    closeBackShow() {
      this.show = false;
      this.backShow = false;
    },
    //关闭弹窗
    closePopup() {
      this.show = false;
      this.backShow = false;
      this.failShow = false;
      this.successShow = false;
    },
    tuichu() {
      // this.$router.push(-1);
      this.$router.go(-1);
    }
  },
  mounted() {}
};

components: {
}
</script>
<style scoped lang="less">
// @import "../../style/blend.css";
#container {
  min-height: 100vh;
  width: 100vw;
  background-color: white;
  // 提示弹窗
  .prompot-popup {
    position: absolute;
    z-index: 2;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    width: 15rem;
    height: 12rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.6rem;
    img {
      margin-top: 1.2rem;
      width: 5rem;
    }
    .commont-img {
      margin-bottom: 1.25rem;
    }
    .prompot-title {
      font-size: 0.9rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 2rem;
      border-bottom: 0.05rem solid #e7e7e7;
    }
    .prompot-content {
      font-size: 0.7rem;
    }
    .prompot-footer {
      position: absolute;
      bottom: 0.6rem;
      width: 100%;
      button {
        font-size: 0.7rem;
        width: 6.7rem;
        height: 1.6rem;
        border: 1px solid #1492ff;
        border-radius: 0.12rem;
      }
      button:nth-child(1) {
        margin-right: 0.4rem;
        background-color: #ffffff;
      }
      button:nth-child(2) {
        color: #ffffff;
        background-color: #1492ff;
      }
    }
  }
  //   身体
  .cont-body {
    padding: 0.6rem;
    textarea {
      height: 9.5rem;
      padding: 0.55rem;
      width: 100%;
      border-radius: 0.25rem;
      border: 0.05rem solid #999;
      font-size: 0.7rem;
      line-height: 1.05rem;
    }
    // 图片
    .box-img {
      .van-uploader div {
        display: inline-block;
        height: 5.4rem;
        width: 5.4rem;
        background-color: #e1e1e1;
      }
    }
    .site {
      font-size: 0.6rem;
      color: #333;
      &::before {
        content: "";
        display: inline-block;
        margin-right: 0.35rem;
        height: 0.8rem;
        width: 0.65rem;
        background: url("../../assets/zhongdian.png") no-repeat center;
        background-size: cover;
        vertical-align: middle;
      }
    }
  }

  //多行文本样式
  textarea::-webkit-input-placeholder {
    font-size: 0.7rem;
    color: #999999;
  }
  textarea:-moz-placeholder {
    font-size: 0.7rem;
    color: #999999;
  }
  textarea::-moz-placeholder {
    font-size: 0.7rem;
    color: #999999;
  }
  textarea::-ms-input-placeholder {
    font-size: 0.7rem;
    color: #999999;
  }

  //   提交按钮
  button {
    padding: 0;
    height: 1.2rem;
    width: 2.2rem;
    color: #1492ff;
    line-height: 1.2rem;
    white-space: nowrap;
  }
}
</style>
<style>
#container .van-uploader__upload {
  background-color: #e1e1e1;
}
#container .van-uploader__preview-image,
#container .van-uploader__upload {
  height: 5.4rem;
  width: 5.4rem;
}
#container .van-uploader__upload-icon {
  color: #b6b6b6;
  font-size: 28px;
}
#container .van-uploader__preview {
  position: relative;
  margin: 0 0.4rem 0.7rem 0;
}
</style>