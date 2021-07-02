<template>
  <div id="container">
    <van-nav-bar title="申请加入健身社团" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="data.name"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="data.gender"
        name="gender"
        label="性别"
        placeholder="请选择性别"
        @click="show = true"
        readonly
        is-link
        :rules="[{ required: true, message: '请选择性别' }]"
      />
      <van-field
        v-model="data.phone"
        name="phone"
        label="手机号"
        type="tel"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="data.identityCard"
        name="identityCard"
        label="身份证号"
        placeholder="请输入身份证号"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <van-popup v-model="show" position="bottom">
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @confirm="gender"
        @cancel="show=!show"
      />
    </van-popup>
  </div>
</template>


<script>
import { addOrganizationVip } from "@/http/api";
export default {
  data() {
    return {
      show: false,
      columns: ["男", "女"],
      data: {
        name: "",
        gender: "",
        identityCard: "",
        phone: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 提交
    onSubmit(val) {
      val.organizationId = this.$route.query.id;
      val.userId = JSON.parse(localStorage.getItem('userLoginMsg')).id;
      val.gender == "男" ? 1 : 2;
      addOrganizationVip(val).then(res => {
        if (res.code) return this.$toast(res.msg);
        this.$router.push("/success");
      });
    },
    gender(val) {
      this.data.gender = val;
      this.show = false;
    }
  }
};
</script>


<style scoped lang="less">
#container {
  /deep/ .van-calendar__selected-day {
    width: 54px;
    height: 54px;
    color: #fff;
    background-color: #1989fa;
    border-radius: 4px;
  }
  /deep/ .van-button--danger {
    color: #fff;
    background-color: #1989fa;
    border: 1px solid #1989fa;
  }
}
</style>
