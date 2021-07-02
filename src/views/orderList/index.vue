<template>
  <div id="container">
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active" sticky @click="handleClick">
      <van-tab v-for="(item, index) in tabList" :title="item" :key="index">
        <!-- 卡片开始 -->
        <ul class="order">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onload"
          >
            <li class="order-card" @click="handleView(i,item)" v-for="(item,i) in list" :key="item.id">
              <div class="order-card-title">
                <span>{{ item.cgxxName }}</span>
                <span :class="['used-state', mapStateClass(item.isPay)]">
                  {{
                  mapState(item.isPay)
                  }}
                </span>
              </div>
              <div class="order-card-cont">
                <img src="../../assets/ymq@2x.png" />
                <strong>{{ item.createTime }}</strong>
                <!-- <p>{{ item.startTime1}} - {{ item.endTime1}}</p> -->
              </div>
              <div class="order-card-btn">
                <span class="total-price">总价 ¥{{ item.amount || 0 }}</span>
                <div>
                  <button
                    class="unsubscribe"
                    v-if="item.state == 1"
                    @click.stop="handleUnsubscribe(item.id)"
                  >退订</button>
                  <button v-if="item.state == 1">使用</button>
                </div>
              </div>
            </li>
          </van-list>
        </ul>
        <!-- <div class="no-data">暂无数据</div> -->
        <!-- 卡片结束 -->
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
import { Dialog } from "vant";
import { mapGetters } from "vuex";
import { getMyOrderList, refund, userImg,findBillList } from "@/http/api";
export default {
  data() {
    return {
      originPath: "", //判断是否是首页跳转
      active: 0,
      tabList: ["未支付", "已支付", "已取消", "全部订单"],
      list: [],
      page: 1, //页数
      loading: false,
      finished: false,
      params: {
        status: "1"
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path == "/oneself") {
        vm.originPath = "y";
      } else {
        vm.originPath = "";
      }
    });
  },
  computed: {
    ...mapGetters(["userMsg"])
  },
  created() {
    this.getOrderList();
  },
  methods: {
    onload(){
      this.page++
      this.getOrderList()
    },
    onClickLeft() {
      if (this.originPath) {
        this.$router.go(-1);
      } else {
        window.location.href = "sxty://back";
        this.$router.push("/");
      }
    },
    //图片
    orderImg(img) {
      if (img) return userImg + img;
      else return require("../../assets/zwltsy.jpg");
    },
    mapState(state) {
      console.log(state)
      switch (state) {
        case 0:
        case 1:
          return "未支付";
          break;
        case -1:
          return "已取消";
          break;
        case 2:
          return "已支付";
          break;
        case 3:
          return "已退款";
          break;
      }
    },
    mapStateClass(state) {
      switch (state) {
        case 0:
        case 1:
          return "noused";
          break;
        case -1:
          return "unsubscribe";
          break;
        case 2:
          return "used";
          break;
      }
    },
    // 预定时间
    // orderDate(date) {
    //   return date.split(' ')[0]
    // },
    handleClick(event) {
      console.log(event, "eventevent");
      this.page = 1;
      this.list = [];
      this.finished = false
      switch (event) {
        case 0:
          this.params.status = "1";
          break;
        case 1:
          this.params.status = "2";
          break;
        case 2:
          this.params.status = "-1";
          break;
        case 3:
          this.params.status = "";
          break;
      }
      this.getOrderList();
    },
    getOrderList() {
      // this.list = [
      //   {
      //     venueName: "羽毛球训练馆",
      //     state: 1,
      //     fieldName: "羽毛球01",
      //     startTime: "2019-07-10",
      //     startTime1: "10:00",
      //     endTime1: "11:30",
      //     bookCost: "80"
      //   },
      //   {
      //     venueName: "羽毛球训练馆",
      //     state: 2,
      //     fieldName: "羽毛球01",
      //     startTime: "2019-07-10",
      //     startTime1: "10:00",
      //     endTime1: "11:30",
      //     bookCost: "80"
      //   },
      //   {
      //     venueName: "羽毛球训练馆",
      //     state: 3,
      //     fieldName: "羽毛球01",
      //     startTime: "2019-07-10",
      //     startTime1: "10:00",
      //     endTime1: "11:30",
      //     bookCost: "80"
      //   }
      // ];
      findBillList({
        page: this.page,
        limit: 10,
        memberId: this.$route.query.id,
        isPay: this.params.status
      }).then(res => {
        if (res.resp_code == 0) {
          this.list = this.list.concat(res.datas.data);
          this.loading = false;
          if(this.list.length>=res.datas.count){
            this.finished = true
          }
        } 
      });
    },
    // 查看详情
    handleView(index,item) {
      this.$router.push({
        name: "orderCont",
        params:{
          info: JSON.stringify(item)
        }
      });
    },
    // 退订
    handleUnsubscribe(id) {
      Dialog.confirm({
        title: "您是否退订",
        message:
          "2小时内退订需缴纳预定金额20%违约金,1小时内退订需缴纳预定金额50%违约金"
      })
        .then(() => {
          this.$toast("退订功能暂时关闭");
          // window.setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style>
#container .van-tabs__line {
  height: 2px;
  background-color: #1492ff;
}
#container .van-tab.van-tab--active {
  color: #1492ff;
}
#container .van-tabs__content {
  border-top: 0;
}
</style>
<style scoped lang="less">
#container {
  height: 100vh;
  width: 100vw;
  background: #f5f5f5;
  .order {
    padding: 0.6rem;
    background-color: #f5f5f5;
    .order-card {
      padding: 0.8rem;
      margin-bottom: 0.6rem;
      border-radius: 0.2rem;
      box-shadow: 0 1px 3px #d2d2d2;
      background-color: white;

      .order-card-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.6rem;
        font-size: 0.7rem;
        line-height: 0.7rem;
        .used-state.noused {
          color: #ffa007;
        }
        .used-state.used {
          color: #1492ff;
        }
        .used-state.unsubscribe {
          color: #999;
        }
      }
      .order-card-cont {
        position: relative;
        margin-bottom: 0.6rem;
        padding-left: 6rem;
        height: 4rem;
        border-bottom: 1px solid #e2e2e2;
        font-size: 0.7rem;
        line-height: 0.7rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        img {
          position: absolute;
          left: 0;
          height: 3.4rem;
          width: 5.1rem;
          background-color: #eee;
        }
        strong {
          color: #000;
        }
        p {
          overflow: hidden;
          margin-top: 0.4rem;
          color: #999;
        }
      }
      .order-card-btn {
        position: relative;
        line-height: 0.7rem;
        .total-price {
          font-size: 0.7rem;
          line-height: 0.7rem;
          font-weight: 600;
        }
        .unsubscribe {
          color: #ffc107;
          border: 1px solid;
        }
        div {
          position: absolute;
          top: -0.15rem;
          right: 0;
          button {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-left: 0.4rem;
            height: 1.2rem;
            width: 2.6rem;
            border: 1px solid;
            border-radius: 0.6rem;
            color: #1492ff;
            font-size: 0.6rem;
            background-color: #fff;
          }
        }
      }
    }
  }
  .no-data {
    padding: 10px;
    font-size: 14px;
    text-align: center;
  }
}
</style>
