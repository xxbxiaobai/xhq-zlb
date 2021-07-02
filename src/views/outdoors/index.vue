<template>
  <div id="box">
    <!-- 头部开始 -->
    <van-nav-bar title="全域户外" left-text="返回" left-arrow @click-left="goBack">
      <van-icon name="search" />
    </van-nav-bar>
    <van-search
      v-model="name"
      @blur="searchInfo"
      placeholder="请输入要搜索的内容"
      input-align="center"
      shape="round"
    />
    <div class="big">
      <van-list
        :v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="true"
      >
        <div class="container" v-for="(item,i) in infoList" :key="item.id" @click="goDetail(item.id)">
          <div class="left">
            <img
              :src="ImageUrl+item.fileList[0].id"
              alt
            />
          </div>
          <div class="right">
            <p>{{item.name}}</p>
            <p>{{item.shortDescription}}</p>
            <img src="../../assets/addressOut.png" />
            <span>{{item.addr}}</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { distance, zlbFun, gcj02 } from "../../util/Tool";
import { allOutdoorList } from "@/http/api";
export default {
  data() {
    return {
      ImageUrl: this.ImageUrl,
      page: 1,
      limit: 6,
      loading: false,
      finished: false,
      infoList: [],
      name: ""
    };
  },
  methods: {
    goBack() {
      window.location.href = "sxty://back"
      this.$router.push('/');
    },
    goDetail(id){
      this.$router.push({
        path: '/outdoors/particulars',
        query: {
          id: id
        }
      })
    },
    searchInfo() {
      this.infoList = [];
      this.page = 1
      this.getInfoList();
    },
    onLoad() {
      this.page++;
      this.getInfoList();
    },
    getInfoList() {
      this.loading = true;
      var data = {
        page: this.page,
        limit: this.limit
      };
      if(this.name){
        data.name = this.name
      }
      allOutdoorList(data)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.infoList = this.infoList.concat(res.data);
            if (this.infoList.length >= res.count) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  destroyed() {},
  created() {
    this.getInfoList();
  }
};
</script>

<style scoped lang="less">
#box {
  height: 100%;
}
.big {
  padding: 0.5rem;
  height: 100%;
  background-color: #f6f8f7;
}
.container {
  height: 4.75rem;
  background-color: #fff;
  border-radius: 9px;
  padding: 4px;
  display: flex;
  .left {
    img {
      width: 6.65rem;
      height: 4.25rem;
      border-radius: 9px;
    }
  }
  .right {
    padding: 10px 15px;
    & > p:first-child {
      font-size: 16px;
    }
    & > p:nth-child(2) {
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    img {
      width: 10px;
      vertical-align: middle;
      margin-right: 5px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
