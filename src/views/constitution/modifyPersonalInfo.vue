<template>
  <div class="personal_info">
    <van-nav-bar title="资料修改" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <ul class="config_item">
      <li @click="modify(0)">
        <span>头像</span>
        <div>
          <span class="photo" ref="userImg_sub"></span>
          <router-link to>
            <img src="./img/jt.png" alt />
          </router-link>
        </div>
        <input
          type="file"
          id="selectImg"
          accept="image/*"
          ref="in_img"
          name="file"
          @change="takePhoto"
        />
      </li>
      <li @click="modify(1)">
        <span>昵称</span>
        <div>
          <span>{{$store.state.userInfo.userName}}</span>
          <router-link :to="{path:'/modifyDetail',query:{p_id:1}}">
            <img src="./img/jt.png" alt />
          </router-link>
        </div>
      </li>
      <li @click="modify(2)">
        <span>姓名</span>
        <div>
          <span>{{$store.state.userInfo.realName}}</span>
          <router-link :to="{path:'/modifyDetail',query:{p_id:2}}">
            <img src="./img/jt.png" alt />
          </router-link>
        </div>
      </li>
      <li @click="modify(3)">
        <span>性别</span>
        <div>
          <span>{{$store.state.userInfo.sex == "1"?"男":"女"}}</span>
          <router-link :to="{path:'/modifyDetail',query:{p_id:3}}">
            <img src="./img/jt.png" alt />
          </router-link>
        </div>
      </li>
    </ul>
    <!-- 上传头像对话框 -->
    <!-- <van-dialog v-model="show" :showConfirmButton="false" :showCancelButton="true">
      <input
        type="file"
        accept="image/*"
        capture="camera"
        id="camera"
        ref="in_camera"
        name="file"
        @change="takePhoto"
      />
      <div @click="selectBtn(0)" class="selectBtn">拍照</div>
      <input type="file" id="selectImg" ref="in_img" name="file" @change="takePhoto" />
      <div class="selectBtn" @click="selectBtn(1)">从相册选择</div>
    </van-dialog>-->
    <van-loading type="spinner" vertical style="margin-top:5rem;" v-show="showLoading">
      <slot name="default">正在上传...</slot>
    </van-loading>
  </div>
</template>
<script>
import { modifyUserImg, uploadUserImg, psersonInfoModify, getUserDetail } from "@/http/api";
import axios from "axios";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      showLoading: false,
      userInfo: "",
      show: false,
      fileId: "",
      userId: "",
    };
  },
  created() {
    this.userId = this.$route.query.id;
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  },
  mounted() {
    this.uploadImg()
    this.$refs.userImg_sub.style.backgroundImage =
      "url(" + this.userInfo.imageid + ")";
    this.$refs.userImg_sub.style.backgroundRepeat = "no-repeat";
    this.$refs.userImg_sub.style.backgroundPosition = "center";
    this.$refs.userImg_sub.style.backgroundSize = "cover";
  },
  methods: {
    //头像上传兼容ios
    uploadImg() {
      var nav = navigator.userAgent.toLowerCase();
      var isIos = nav.indexOf("iphone") != -1 || nav.indexOf("ipad") != -1;
      if (isIos) {
        // this.$refs.in_img.removeAttribute("accept")
      }
    },
    takePhoto(e) {
      this.showLoading = true;
      //拍照功能---上传头像
      var file = e.target.files[0]; //获取文件对象
      var fd = new FormData(); //构造formdata对象
      fd.append("file", file); //向formdata里面存放键值对
      let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post(modifyUserImg, fd, config)
        .then(res => {
          if (res.data.resp_code == 0) {
            this.fileId = res.data.datas.id;
            this.$refs.userImg_sub.style.backgroundImage =
              "url(" + this.ImageUrl + res.data.datas.id + ")";
            this.modifyCurrentImg();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改用户当前头像
    modifyCurrentImg() {
      uploadUserImg({
        id: this.userId,
        fileId: this.fileId
      }).then(res => {
        this.showLoading = false;
        if (res.code == 0) {
          this.getUserInfo()
          this.$toast("修改成功");
        } else {
          this.$toast(res.msg);
        }
      });
    },
      //获取用户详情
    getUserInfo() {
      getUserDetail()
        .then(res => {
          if (res.code == 0) {
            sessionStorage.removeItem('userInfo')
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                id: res.data.id,
                imageid: this.ImageUrl + res.data.image.id,
                realName: res.data.realName,
                userName: res.data.userName,
                sex: res.data.sex
              })
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectBtn(n) {
      if (n == 0) {
        this.$refs.in_camera.dispatchEvent(new MouseEvent("click"));
      } else {
        this.$refs.in_img.dispatchEvent(new MouseEvent("click"));
      }
    },
    goBack() {
      this.$router.back();
    },
    modify(id) {
      if (id == 0) {
        // this.show = true;
        this.$refs.in_img.dispatchEvent(new MouseEvent("click"));
      } else if (id == 1) {
        this.$router.push({
          path: "/modifyDetail",
          query: { p_id: id }
        });
      } else if (id == 2) {
        this.$router.push({
          path: "/modifyDetail",
          query: { p_id: id }
        });
      } else if (id == 3) {
        this.$router.push({
          path: "/modifyDetail",
          query: { p_id: id }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-dialog {
  top: 85%;
  width: 85%;
}
#camera,
#selectImg {
  display: none;
}
/deep/.van-dialog .van-button {
  color: #1492ff;
}
.selectBtn {
  color: #1492ff;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
}
.personal_info {
  height: 100%;
  background-color: #f6f8f7;
  /deep/.van-nav-bar__title {
    font-weight: 700;
    font-size: 18px;
  }
  .config_item {
    font-size: 0.7rem;
    li {
      height: 2.15rem;
      line-height: 2.15rem;
      background-color: #fff;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 0.8rem;
        height: 0.9rem;
        vertical-align: middle;
      }
      div {
        span {
          margin-right: 0.5rem;
          color: #999;
          vertical-align: middle;
        }
      }
      .photo {
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        // background: url("./img/nan.png") no-repeat;
        // background-position: center center;
        // background-size: cover;
        display: inline-block;
      }
    }
    & > li {
      border-bottom: 1px solid #f6f8f7;
    }
  }
}
</style>