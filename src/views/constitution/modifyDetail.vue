<template>
  <div class="container_p">
    <div class="nickname" v-show="p_id==1">
      <van-nav-bar title="昵称修改" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
      <van-form>
        <van-field
          v-model="username"
          name="昵称"
          label
          placeholder="请输入您的昵称"
          :rules="[{ required: true,}]"
        />
        <div>
          <van-button round block type="info" native-type="submit" @click="submitInfo">保存</van-button>
        </div>
      </van-form>
    </div>
    <div class="real_name" v-show="p_id==2">
      <van-nav-bar title="姓名修改" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
      <van-form>
        <van-field
          v-model="realName"
          name="姓名"
          label
          placeholder="请输入您的真实姓名"
          :rules="[{ required: true, }]"
        />
        <div>
          <van-button round block type="info" native-type="submit" @click="submitInfo">保存</van-button>
        </div>
      </van-form>
    </div>
    <div class="sexy" v-show="p_id==3">
      <van-nav-bar title="资料修改" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
      <van-cell is-link title="请选择您的性别" @click="show = true" />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
        @select="onSelect"
      />
    </div>
  </div>
</template>
<script>
import { psersonInfoModify } from "@/http/api";
export default {
  data() {
    return {
      username: "",
      realName: "",
      p_id: "",
      show: "",
      actions: [
        { name: "男", value: "1", color: "#1492FF" },
        { name: "女", value: "0", color: "#1492FF" }
      ]
    };
  },
  created() {
    this.p_id = this.$route.query.p_id;
  },
  methods: {
    submitInfo() {
      if (this.p_id == 1) {
        var data = {
          id: JSON.parse(sessionStorage.getItem("userInfo")).id,
          username: this.username
        };
      } else if (this.p_id == 2) {
        var data = {
          id: JSON.parse(sessionStorage.getItem("userInfo")).id,
          realName: this.realName
        };
      }
      psersonInfoModify(data)
        .then(res => {
          if (res.code == 0) {
            if (this.p_id == 1) {
              this.$store.commit("modifyUserName", this.username);
            } else if (this.p_id == 2) {
              this.$store.commit("modifyRealName", this.realName);
            }
            this.$toast('修改成功')
            this.$router.go(-1)
          }else{
           this.$toast(res.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSelect(item) {
      console.log(item);
      if (this.p_id == 3) {
        var data = {
          id: JSON.parse(sessionStorage.getItem("userInfo")).id,
          sex: item.value
        };
        psersonInfoModify(data)
          .then(res => {
            if (res.code == 0) {
              this.$store.commit("modifySex", item.value);
               this.$toast('修改成功')
               this.$router.go(-1)
            }else{
              this.$toast(res.msg)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goBack() {
      this.$router.back();
    },
    onCancel() {
      this.$toast("取消");
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-popup--bottom.van-popup--round {
  border-radius: 20px 20px 20px 20px;
  width: 85%;
  position: absolute;
  bottom: 4%;
  left: 50%;
  transform: translate(-50%, 0px);
}
/deep/.van-action-sheet__gap{
  height: 0;
}
.container_p {
  height: 100%;
  background-color: #f6f8f7;
  /deep/.van-nav-bar__title {
    font-weight: 700;
    font-size: 18px;
  }
  /deep/.van-button--round {
    border-radius: 0;
    margin-top: 3rem;
  }
  .sexy_btn {
  }
  /deep/.van-action-sheet__cancel {
    color: #1492ff;
  }
  /deep/.van-action-sheet__item {
    border-bottom: 1px solid #f6f8f7;
    &:first-child{
      border: none;
    }
  }
}
</style>