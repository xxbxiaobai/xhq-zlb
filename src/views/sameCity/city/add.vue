<template>
  <div id="container">
    <van-nav-bar title="申请加入同城约" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="data.name"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="data.phoneNumber"
        name="phoneNumber"
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
      <van-field
        v-model="data.district"
        name="district"
        label="区县"
        placeholder="请选择区县"
        @click="show = true"
        readonly
        is-link
        :rules="[{ required: true, message: '请选择区县' }]"
      />

      <van-field
        v-model="data.addr"
        name="addr"
        label="详细地址"
        placeholder="请输入详细地址"
        type="textarea"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <van-popup v-model="show" position="bottom">
      <van-picker
        title="区县"
        show-toolbar
        :columns="columns"
        @confirm="district"
        @cancel="show=!show"
      />
    </van-popup>
  </div>
</template>


<script>
import { applyCityTreaty } from "@/http/api";
export default {
  data() {
    return {
      show: false,
      columns: ["越城区", "柯桥区", "上虞区", "新昌县", "诸暨市", "嵊州市"],
      data: {
        name: "",
        identityCard: "",
        phoneNumber: "",
        district: "",
        addr: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 提交
    onSubmit(val) {
      val.cityTreatyId = this.$route.query.id;
      val.zuserId = JSON.parse(localStorage.getItem('userLoginMsg')).id;
      applyCityTreaty(val).then(res => {
        if (res.code) return this.$toast(res.msg);
        this.$router.push("/success");
      });
    },
    district(val) {
      this.data.district = val;
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
