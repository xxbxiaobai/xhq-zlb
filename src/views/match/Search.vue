<template>
  <div id="home">
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="Search">
      <div slot="action" @click="Search">搜索</div>
    </van-search>
    <!-- 搜索的内容 -->
    <div
      class="card"
      v-show="status==0"
      v-for="(item,index) in list"
      :key="index"
      @click="$router.push({name: 'noticedetails',params:{id:item.id,aType:item.aType}})"
    >
      <div class="top">{{item.title}}</div>
      <div class="middle">赛事地点：{{item.actAddress}}</div>
      <div class="bottom">
        <span>发布时间：{{item.createTime | dateFormat}}</span>
        <span>比赛时间：{{item.startTime | dateFormat}}</span>
      </div>
    </div>
    <div class="card1" v-show="status==1" v-for="(item,index) in list" :key="index.id">
      <div class="top">{{item.actName}}</div>
      <div class="middle">赛事地点：{{item.actAddress}}</div>
      <div class="bottom">
        <div class="time">
          <p>发布时间：{{item.createTime |dateFormat}}</p>
          <p>比赛时间：{{item.startTime |dateFormat}}</p>
        </div>
        <button @click="detailspage(item.id,item.aType)">报名</button>
      </div>
    </div>
  </div>
</template>

<script>
import { activities, competitionList } from "@/http/api";
export default {
  data() {
    return {
      value: "",
      status: this.$route.query.status,
      showDel: false,
      list: [] //  请求的数据
      // searchData: this.$route.params.data //搜索后的展示数据
    };
  },

  methods: {
    del() {
      this.value = "";
    },
    listdata() {
      activities({
        title: this.value
      })
        .then(res => {
          console.log(res);
          this.list = res.eventList;
        })
        .catch(err => {});
    },
    reqevent() {
      competitionList({
        actName: this.value
      })
        .then(res => {
          console.log(res);
          this.list = res.eventList;
          // console.log(22)
        })
        .catch(err => {});
    },
    //搜索
    Search() {
      if (this.status == 0) {
        this.listdata();
      } else if (this.status == 1) {
        this.reqevent();
      }
    },
    detailspage(id, type) {
      if (type === 2) {
        this.$router.push({ path: "/matchDetails", query: { id: id } });
      } else {
        this.$router.push({ path: "/details", query: { id: id, aType: type } });
        // this.$router.push({ path: "/details" })
      }
    }
  },
  created() {
    // console.log(this.status)
    if (this.$route.query.data) {
      this.list = JSON.parse(this.$route.query.data);
    }
    return;
    // console.log(this.$route.query.data)
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #fff;
  .search-bar {
    height: 2.7rem;
    width: 100%;
    font-size: 0.6rem;
    background-color: #fff;
    display: flex;
    padding: 0.5rem 0.5rem 0.5rem 0.1rem;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
    .back {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      color: #1492ff;
      span {
        margin-left: 0.25rem;
      }
    }
    .search {
      border-radius: 0.85rem;
      flex: 1;
      background-color: #f2f2f2;
      margin-left: 0.4rem;
      display: flex;
      padding: 0.25rem 0.5rem;
      justify-content: space-between;
      align-items: center;
      .search-icon,
      .search-close {
        width: 1rem;
        height: 1rem;
        margin-top: 0.05rem;
        img {
          width: 100%;
        }
      }
      .input-box {
        flex: 1;
        margin-left: 0.25rem;
        width: 9rem;
        input {
          background-color: transparent;
          &::placeholder {
            color: #999999;
            font-size: 0.65rem;
          }
        }
      }
    }
    .search-action {
      line-height: 1.7rem;
      font-size: 0.75rem;
      color: #1492ff;
      margin-left: 0.45rem;
    }
  }
  .card {
    width: 17.55rem;
    // height: 5rem;
    margin: 8px auto;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      color: #444444;
      font-size: 0.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
    }
    .middle {
      color: #999999;
      font-size: 0.6rem;
      padding: 0.5rem 0;
    }
    .bottom {
      color: #999999;
      font-size: 0.55rem;
      border-top: 0.05rem solid #e7e7e7;
      padding-top: 0.45rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .card1 {
    width: 17.55rem;
    // height: 5.75rem;
    margin: 8px auto;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      color: #444444;
      font-size: 0.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
    }
    .middle {
      color: #999999;
      font-size: 0.6rem;
      padding: 0.5rem 0;
    }
    .bottom {
      color: #999999;
      font-size: 0.55rem;
      display: flex;
      justify-content: space-between;
      p {
        padding-bottom: 0.2rem;
      }
      button {
        width: 4rem;
        height: 1.6rem;
        background-color: #1492ff;
        color: #ffffff;
        font-size: 0.7rem;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>
