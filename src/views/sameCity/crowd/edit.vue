<template>
  <div id="container">
    <van-nav-bar title="添加健身群" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="data.name"
        name="name"
        label="群名称"
        placeholder="请输入群名称"
      />
      <van-field
        v-model="data.linkMan"
        name="linkMan"
        label="联系人"
        placeholder="请输入联系人"
      />
      <van-field
        v-model="data.phone"
        name="phone"
        label="手机号"
        type="number"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="data.identityCard"
        name="identityCard"
        label="身份证号"
        type="tel"
        placeholder="请输入身份证号"
      />
      <van-field
        v-model="data.scale"
        name="scale"
        label="群规模"
        type="number"
        placeholder="请输入人数"
      />
      <van-field
        v-model="data.groupDetails"
        rows="1"
        autosize
        name="groupDetails"
        label="群介绍"
        type="textarea"
        placeholder="请输入群介绍"
      />
      <!-- <van-dropdown-menu>
        <van-dropdown-item :title="selectVal" ref="item">
          <van-tree-select
            :items="regionItems"
            :active-id.sync="data.district"
            :main-active-index.sync="activeIndex"
            @click-item="handleClick"
          />
        </van-dropdown-item>
      </van-dropdown-menu> -->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <van-calendar v-model="showCalendar" @confirm="onConfirm" />
  </div>
</template>


<script>
import { addFitnessGroup } from '@/http/api'
// import { number } from '@/util/validata'
export default {
  data() {
    return {
      // selectVal: '绍兴市', // 区域
      activeId: 1,
      activeIndex: 0,
      regionItems: [
        {
          text: '省本级',
          value: "",
          children: [
            {
              text: '全部',
              id: "",
              flag: true
            }
          ]
        }
      ],
      data: {
        name: "", //同城约名称
        linkMan: "", //联系人
        phone: "", //手机号
        identityCard: "", //身份证号
        actContent: "", //活动内容
        scale: "", //群规模人数
        groupDetails: "", //群介绍
        district: ''
      },

      message: "",
      value: "",
      switchChecked: false,
      showCalendar: false,
      username: "",
      password: ""
    };
  },
  created() {
    const a = [
      {
        text: "绍兴市",
        value: 126,
        children: [
          { text: "全部", id: "" },
          { text: "越城区", id: 1299 },
          { text: "柯桥区", id: 1300 },
          { text: "上虞区", id: 1301 },
          { text: "新昌县", id: 1302 },
          { text: "诸暨市", id: 1303 },
          { text: "嵊州市", id: 1304 }
        ]
      }
    ];
    this.regionItems = a;
  },
  methods: {
    // 选择区
    handleClick(data) {
      this.data.district = data.id; // 区id
      this.selectVal = data.text;
      this.$refs.item.toggle();
     
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 提交
    onSubmit(values) {
      const phone = this.validata.number(values.phone)
      const identityCard = this.validata.identify(values.identityCard)
      if (!phone) {
        this.$toast('手机号码格式错误')
        return false;
      }
      if (!identityCard) {
        this.$toast('身份证号码格式错误')
        return false
      }
      if(values.groupDetails === '' || values.linkMan === '' || values.name === '' || values.scale === '' ) {
        this.$toast('缺少必填数据')
        return false
      } else {
        this.data.userid = JSON.parse(localStorage.getItem('userLoginMsg')).id
        this.data.district= 1257
        addFitnessGroup(this.data).then(res => {
          if (res.code) return this.$toast(res.msg)
          this.$router.push('/success')
        })
      }

    },
    // 选择时间
    onConfirm(date) {
      this.data.actTime = `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`;
      this.showCalendar = false;
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
