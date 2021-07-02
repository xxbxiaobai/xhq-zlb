<template>
  <div id="swim">
    <div class="bar bar-1">
      <img width="8" src="./static/images/fanhui_weici2_icon.png" @click="goBack" />
      <van-dropdown-menu>
        <van-dropdown-item v-model="value_item" :options="option1" @change="selectItem"/>
      </van-dropdown-menu>
    </div>
    <ul>
      <li @click="gotoDetail(item)" v-for="(item,i) in listInfo" :key="i">
        <div class="img">
          <img src="../../assets/youyong.png" alt />
        </div>
        <div class="center">
          <p>{{item.cdhmName}}</p>
          <p>{{item.startTimeName}}--{{item.endTimeName}}</p>
          <p>仅限当天使用</p>
        </div>
        <div class="rigth">
          <p>￥{{item.price}}</p>
          <button>立即购买</button>
        </div>
        <div class="icon_top"></div>
        <div class="line"></div>
        <div class="icon_bottom"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import { swimBookList, swimmingAll } from "@/http/api";
export default {
  data() {
    return {
      // id: "27746",
      id: "",
      value_item: "",
      option1: [],
      value_text: "",
      listInfo: [],
      datas: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    gotoDetail(item) {
      this.$router.push({
        name: 'swimBookDetail',
        query: {
          cdlxName: this.datas.cdlxName,
          cgxxName: this.datas.cgxxName,
          info: JSON.stringify(item)
        }
      });
    },
    getList() {
      swimBookList(this.id)
        .then(res => {
          console.log(res);
          if (res.resp_code == 0) {
            this.listInfo = res.datas[0].cdhmData;
            this.datas = res.datas[0];
            this.option1 = res.datas[0].cdlxData.map((item, i) => {
              return Object.assign(item, {
                text: item.name,
                value: item.cdForeignId
              });
            });
            var vals = res.datas[0].cdlxData.find((item, i) => {
              return item.name == this.datas.cdlxName;
            });
            this.value_item = vals.cdForeignId;
          } else {
            this.listInfo = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
     //选择项目
    selectItem(val){
      this.value_text = this.option1.find((item,i)=>{
        return item.value == val
      }).text
      if(this.value_text !== '游泳'){
        this.$router.push({
          path:'/bookDetail',
          query: {
            id: this.value_item
          }
        })
      }
    },
  },
  created() {
    this.id = this.$route.query.id
    this.getList();
  }
};
</script>
<style lang="less" scoped>
#swim {
  background-color: #f6f8f7;
  height: 100%;
  .bar-1 {
    position: relative;
    img {
      position: absolute;
      left: 10px;
      top: 0;
      z-index: 10;
      padding: 15px;
    }
  }
  ul {
    height: 100%;
    padding: 0.5rem;
    li {
      height: 5rem;
      background-color: #fff;
      border-radius: 8px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      margin-top: 0.5rem;
      .rigth {
        position: absolute;
        right: 15px;
        p {
          font-size: 20px;
          color: #ff7517;
        }
        button {
          background-color: #ff7517;
          color: #fff;
          font-size: 12px;
          padding: 5px;
          border-radius: 10px;
        }
      }
      .center {
        padding-left: 10px;
        p {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
        }
        & > p:first-child {
          font-size: 14px;
          color: #000;
        }
      }
      img {
        height: 2rem;
        width: 2rem;
      }
      .icon_bottom {
        width: 24px;
        height: 12px;
        border-radius: 12px 12px 0 0;
        background-color: #f6f8f7;
        position: absolute;
        right: 4rem;
        bottom: -1px;
      }
      .icon_top {
        width: 24px;
        height: 15px;
        border-radius: 0px 0px 15px 15px;
        background-color: #f6f8f7;
        position: absolute;
        right: 4rem;
        top: -1px;
      }
      .line {
        height: 50%;
        width: 1px;
        border-right: 1px dotted #ccc;
        position: absolute;
        right: 4.6rem;
        top: 1.3rem;
      }
    }
  }
}
</style>