<template>
  <div id="container">
    <van-nav-bar title="发起同城约" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="data.cityTreatyName"
        name="cityTreatyName"
        label="主题"
        placeholder="请输入主题"
        :rules="[{ required: true, message: '请输入主题' }]"
      />
      <van-field
        v-model="data.maxNum"
        name="maxNum"
        label="人数"
        placeholder="请输入人数"
        :rules="[{ required: true, message: '请输入人数' }]"
      />

      <van-field
        v-model="data.actContent"
        rows="1"
        autosize
        name="actContent"
        label="内容"
        type="textarea"
        placeholder="请输入活动内容"
        :rules="[{ required: true, message: '请输入活动内容' }]"
      />

      <van-field
        readonly
        clickable
        name="actTime"
        :value="data.actTime"
        label="活动时间"
        placeholder="选择活动日期"
        @click="showCalendar = true"
        :rules="[{ required: true, message: '请选择活动日期' }]"
      />
      <van-field name="isFee" label="是否收费">
        <template #input>
          <van-switch v-model="data.isFee" size="20" />
        </template>
      </van-field>

      <div v-if="data.isFee">
        <van-field
          v-model="data.allocationWay"
          name="allocationWay"
          label="分摊方式"
          placeholder="请选择分摊方式"
          @click="show=!show"
          readonly
          is-link
          :rules="[{ required: true, message: '请选择分摊方式' }]"
        />
        <van-field
          v-model="data.cost"
          name="cost"
          label="费用"
          type="digit"
          placeholder="请输入费用"
          :rules="[{ required: true, message: '请输入费用' }]"
        />
      </div>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <!-- 选择器开始 -->
    <van-calendar v-model="showCalendar" @confirm="onConfirm" />

    <van-popup v-model="show" position="bottom">
      <van-picker
        title="分摊方式"
        show-toolbar
        :columns="columns"
        @confirm="allocationWay"
        @cancel="!show"
      />
    </van-popup>
  </div>
</template>


<script>
import { insertCityTreaty } from "@/http/api";
export default {
  data() {
    return {
      show: false,
      columns: ["AA", "发起人支付"],
      data: {
        cityTreatyName: "", //同城约名称
        publisher: "", //发布人
        actTime: "", //活动时间
        actContent: "", //活动内容
        maxNum: "", //最大人数
        isFee: "", //是否收费
        allocationWay: "", //分摊方式
        cost: "" //费用
      },

      message: "",
      value: "",
      switchChecked: false,
      showCalendar: false,
      username: "",
      password: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 提交
    onSubmit(values) {
      const user = JSON.parse(sessionStorage.getItem("SET_USERMSG"));
      values.isFee = Number(!values.isFee);
      if (!values.isFee) {
        if (values.allocationWay === "AA") values.allocationWay = 1;
        if (values.allocationWay === "发起人支付") values.allocationWay = 2;
      }
      values.district = 1257 //区域ID
      values.actTime = values.actTime
        .replace(/(年|月|日)/g, "-")
        .slice(0, values.actTime.length - 1);

      insertCityTreaty(values).then(res => {
        if (res.code) return this.$toast(res.msg);
        this.$router.push("/success");
      });
    },
    // 选择时间
    onConfirm(date) {
      this.data.actTime = `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`;
      this.showCalendar = false;
    },
    allocationWay(val) {
      this.data.allocationWay = val;
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
