<template>
  <div id="container" class="coach-review">
    <!-- 头部开始 -->
    <!-- <van-nav-bar title="人员信息" left-arrow @click-left="onClickLeft">
      <span v-show="!isShow" class="check" slot="right" @click="remove">删除</span>
      <span v-show="isShow" class="check" slot="right" @click="add">添加</span>
    </van-nav-bar>-->
    <!-- 头部结束 -->
    <!-- 列表展示开始 -->
    <ul class="list">
      <li class="list-card" v-for="(item,i) in indexarr[suoyin].allApplyer" :key="i">
        <strong>
          <van-checkbox v-model="item.select" shape="square" @click="checkClick(item)">
            <img
              class="check-icon"
              slot="icon"
              slot-scope="props"
              :src="item.select ? activeIcon : inactiveIcon"
            />
          </van-checkbox>
          {{item.name}}
        </strong>
        <div>
          <p class="commont-lineheight">
            <!-- <span>jdkfj</span> -->
            <span class="phone-text">手机号：{{item.phone}}</span>
          </p>
          <p class="commont-lineheight">
            身份证号：{{item.idCode}}
            <!-- <span class="date">2019-10-10</span> -->
          </p>
        </div>
      </li>
    </ul>
    <!-- <div class="footer">
      <div class="footer-button">保存</div>
    </div>-->
    <!-- 列表展示结束 -->
    <!-- 遮罩开始 -->
    <van-overlay style="z-index:3;" :show="show" @click="show = false" />
    <!-- 遮罩结束 -->
    <!-- 弹窗 -->
    <div class="popup-window-top" v-show="show">
      <div class="title"></div>
      <ul>
        <li>
          <van-field
            label="姓名："
            :error="errorName"
            v-model="name"
            placeholder="请输入姓名"
            :error-message="nameErr"
            maxlength="4"
          />
        </li>
        <li>
          <van-field
            label="身份证号："
            :error="errorIdCard"
            v-model="idCard"
            placeholder="请输入身份证号"
            :error-message="idCardErr"
            maxlength="18"
          />
        </li>
        <li>
          <van-field
            label="联系方式："
            :error="errorPhone"
            v-model="phone"
            type="number"
            placeholder="请输入联系方式"
            :error-message="phoneErr"
            maxlength="11"
          />
        </li>
      </ul>
      <button class="pop-confirm" @click="confirm" :disabled="isCanClick">确定</button>
    </div>
    <!-- 弹窗结束 -->
    <div class="btn-box">
      <button v-show="isShow" class="btn" @click="add">添加</button>
      <button v-show="!isShow" class="btn" @click="remove">删除</button>
    </div>
  </div>
</template>
<script>
import {
  cardid2,
  isvalidatemobile2,
  validatename,
  zlbFun
} from "../../util/Tool";
const noChecked = require("../../assets/yuyuexuanzhong.png");
const iconCheckde = require("../../assets/yueyue.png");
export default {
  data() {
    return {
      isCanClick: false,
      isShow: true, //切换删除或添加
      show: false, //遮罩
      activeIcon: noChecked, //选中图表
      inactiveIcon: iconCheckde, //默认图标
      name: "", //名字
      errorName: false, //名字错误状态
      nameErr: "", //名字错误信息
      idCard: "",
      errorIdCard: false,
      idCardErr: "",
      phone: "",
      errorPhone: false,
      phoneErr: "",
      list: [],
      indexarr: [],
      suoyin: ""
    };
  },
  methods: {
    //点击多选框
    checkClick(item) {
      let arr = [];
      if (!item.select) {
        this.isShow = false;
      } else {
        this.indexarr[this.suoyin].allApplyer.forEach((item, index) => {
          if (item.select === false) {
            arr.push(item);
          }
        });
        if (arr.length + 1 === this.indexarr[this.suoyin].allApplyer.length) {
          this.isShow = true;
        }
      }
      console.log(this.indexarr[this.suoyin].allApplyer);
    },
    //点击添加
    add() {
      this.name = "";
      this.idCard = "";
      this.phone = "";
      this.show = true;
    },
    //删除
    remove(event) {
      console.log();
      this.$dialog
        .confirm({
          title: "",
          message: "确定要删除吗?"
        })
        .then(() => {
          // on confirm
          for (
            let i = this.indexarr[this.suoyin].allApplyer.length - 1;
            i >= 0;
            i--
          ) {
            if (this.indexarr[this.suoyin].allApplyer[i].select) {
              this.indexarr[this.suoyin].allApplyer.splice(i, 1);
              this.list.splice(i, 1);
            }
          }
          window.sessionStorage.setItem(
            "indexarr",
            JSON.stringify(this.indexarr)
          );
          this.isShow = true;
        })
        .catch(() => {
          // on cancel
        });
    },
    // 点击返回
    // onClickLeft() {
    //   this.$router.back();
    // },
    // 确定添加
    confirm() {
      this.isCanClick = true;
      setTimeout(() => {
        this.isCanClick = false;
      }, 500);
      if (validatename(this.name) === false) {
        this.nameErr = "请输入正确的姓名";
      } else {
        this.nameErr = "";
      }
      if (cardid2(this.idCard)[0] === false) {
        this.idCardErr = cardid2(this.idCard)[1];
      } else {
        this.idCardErr = "";
      }
      if (isvalidatemobile2(this.phone)[0] === false) {
        this.phoneErr = isvalidatemobile2(this.phone)[1];
      } else {
        this.phoneErr = "";
      }
      if (
        validatename(this.name) &&
        cardid2(this.idCard)[0] &&
        isvalidatemobile2(this.phone)[0]
      ) {
        let isdo = 0;
        if (this.indexarr[this.$route.query.index].allApplyer != "") {
          this.indexarr[this.$route.query.index].allApplyer.forEach(item => {
            if (item.idCode == this.idCard) {
              this.$toast("身份证号已存在");
              isdo = 1;
            }
          });
        }
        if (isdo != 1) {
          this.list.push({
            groupId: this.$route.query.groupId,
            name: this.name,
            phone: this.phone,
            idCode: this.idCard,
            select: false
          });
          this.indexarr[this.$route.query.index].allApplyer = this.list;
          window.sessionStorage.setItem(
            "indexarr",
            JSON.stringify(this.indexarr)
          );
          this.indexarr = JSON.parse(window.sessionStorage.getItem("indexarr"));
          this.show = false;
        }
      }
    }
  },
  created() {
    zlbFun("人员信息");
    this.suoyin = this.$route.query.index;
    let indexarr = JSON.parse(window.sessionStorage.getItem("indexarr"));
    this.indexarr = indexarr;
    if (this.indexarr[this.suoyin].allApplyer === "") {
      this.list = [];
    } else {
      this.list = this.indexarr[this.suoyin].allApplyer;
    }
    console.log(this.indexarr);
  }
};
</script>
<style scoped lang="less">
.btn-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  background-color: #f1f1f1;
  .btn {
    width: 90%;
    height: 2rem;
    background-color: #0091ff;
    font-size: 0.7rem;
    color: #ffffff;
    border-radius: 0.2rem;
  }
}
//========================
.icon(@img, @h: 1rem, @w: 1rem) {
  content: "";
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
.icon-absolute(@img, @h: 1rem, @w: 1rem) {
  content: "";
  position: absolute;
  top: 50%;
  left: 1.25rem;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
  transform: translateY(-50%);
}
//========================
#container {
  padding-top: 0.3rem;
  height: 100%;
  background: #f1f1f1;
  .van-nav-bar {
    background-color: #0091ff;
    div,
    .van-icon,
    .van-nav-bar__text {
      color: white;
    }
    .check {
      display: inline-block;
      margin-left: 0.6rem;
    }
  }
  //list列表展示
  .list {
    margin: 0.3rem 1rem;
    padding-bottom: 3.5rem;
    .list-card {
      position: relative;
      padding: 0.25rem 0.6rem 0.35rem 0.6rem;
      margin: 0.3rem 0;
      border-radius: 0.3rem;
      background-color: white;
      .commont-lineheight {
        line-height: 1rem;
        .phone-text {
          float: left;
        }
      }
      strong {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding-left: 1.3rem;
        height: 1.45rem;
        color: #353a41;
        font-size: 0.7rem;
        line-height: 1.45rem;
        .check-icon {
          width: 100%;
          height: 100%;
        }
        span {
          color: #f7b500;
          font-size: 0.6rem;
          line-height: 0.6rem;
        }
        .ok {
          color: #6dd400;
        }
        .no {
          color: #fa6400;
        }
      }
      p {
        color: #9fa7b3;
        font-size: 0.6rem;
        line-height: 0.85rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .date {
        float: right;
      }
    }
  }
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popup-window-top {
    position: fixed;
    top: 3rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    width: 16.8rem;
    height: 15.15rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.6rem;
    .title {
      height: 2.4rem;
      border-bottom: 1px solid #f1f1f1;
    }
    li {
      border-bottom: 1px solid #f1f1f1;
    }
    .pop-confirm {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 0.7rem;
      color: #0091ff;
      background-color: #ffffff;
      line-height: 2rem;
      border-top: 1px solid #f1f1f1;
      border-radius: 0.6rem;
    }
  }
  // .footer {
  //   position: fixed;
  //   bottom: 0;
  //   width: 100%;
  //   height: 3.5rem;
  //   font-size: 0.7rem;
  //   color: #ffffff;
  //   text-align: center;
  //   padding: 0 1rem;
  //   background-color: #f1f1f1;
  //   .footer-button {
  //     height: 2.1rem;
  //     line-height: 2.1rem;
  //     background: rgba(0, 145, 255, 1);
  //     border-radius: 0.2rem;
  //   }
  // }
}
</style>
<style lang="less">
.van-checkbox__icon {
  width: 1.2rem;
  height: 1.2rem;
}
.van-checkbox {
  position: absolute;
  left: 0;
}
.coach-review {
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
