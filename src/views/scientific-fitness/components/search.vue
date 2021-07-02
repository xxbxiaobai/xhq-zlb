<template>
  <div class="search-content">
    <!-- 搜索 -->
    <van-search
      v-model="params.fitguidanceTitle"
      @focus="searchFocus"
      placeholder="请输入搜索内容"
      show-action
      @clear="clearSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- 热搜，历史 -->
    <div class="key-word-container" v-if="isShowKeyWord">
      <div class="hot-search search-list">
        <p class="title">热门搜索</p>
        <ul class="hot-keyword keyword">
          <li
            v-for="item in hotSearchList"
            @click="handleHistorySearch(item.name)"
            :key="item.id"
          >{{ item.name }}</li>
        </ul>
      </div>
      <div class="history-search search-list" v-if="historySearchArr.length">
        <p class="title">历史搜索</p>
        <ul class="history-keyword keyword">
          <li
            v-for="(item, index) in historySearchArr"
            @click="handleHistorySearch(item)"
            :key="index"
          >{{ item }}</li>
        </ul>
      </div>
      <div class="clear-history-list" v-if="historySearchArr.length">
        <span @click="clearHistory">清空搜索记录</span>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="content">
      <!-- 列表 -->
      <van-list
        v-model="isLoading"
        :finished="finished"
        :error.sync="error"
        :offset="100"
        class="info-list"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :immediate-check="false"
      >
        <van-cell class="search-wrap" v-if="searchResultList.length">
          <li
            class="item"
            @click="handleClick(item.id, item.type)"
            v-for="item in searchResultList"
            :key="item.id"
          >
            <!-- <div class="img-box" v-if="item.fileList.length">
              <van-image width="100%" height="100%" :src="item.titleImageUrl" />
            </div>-->
            <div class="img-box">
              <van-image
                width="100%"
                height="100%"
                :src="ImageUrl+item.titleImageId"
              />
            </div>
            <div class="info-box">
              <p class="title">{{ item.fitguidanceTitle }}</p>
              <p class="info-type">
                <span class="sport-item">{{ item.minorTermName }}</span>
                <span class="type">{{ item.type == 0 ? "图文" : "视频" }}</span>
              </p>
            </div>
          </li>
        </van-cell>
        <div class="no-data" v-if="noData">
          <img :src="noDataPic" class="no-data-img" alt />
          <p class="no-data">暂无数据</p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getFitguidancePage } from "@/http/api";
const noDataPic = require("@/assets/zanwushuju.png");
export default {
  name: "",

  data() {
    return {
      ImageUrl: this.ImageUrl,
      isShowKeyWord: true,
      isLoading: false,
      error: false,
      finished: false,
      noData: false,
      count: 0,
      noDataPic: noDataPic,
      hotSearchList: [], // 热搜
      historySearchArr: [],
      searchResultList: [],
      params: {
        fitguidanceTitle: "",
        limit: 10,
        page: 1
      }
    };
  },
  created() {
    if (
      window.localStorage.getItem("historySearchArr") &&
      window.localStorage.getItem("historySearchArr") != "undefind"
    ) {
      this.historySearchArr = JSON.parse(
        window.localStorage.getItem("historySearchArr")
      );
    }
    this.hotSearchList = [{ name: "瑜伽", id: 24 }];
  },
  watch: {
    fitguidanceTitle(newVal, oloVal) {
      if (newVal != oloVal) {
        this.isShowKeyWord = false;
      }
      if (!newVal) {
        this.isShowKeyWord = true;
        this.noData = false;
      }
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  methods: {
    onSearch() {
      this.setHistory();
      this.isLoading = true;
      this.isShowKeyWord = false;
      this.params.page = 1;
      this.searchResultList = [];
      this.initData();
    },
    onClickLeft() {
      this.$router.push("/scientific-fitness");
    },
    clearHistory() {
      this.historySearchArr = [];
      window.localStorage.removeItem("historySearchArr");
    },
    setHistory() {
      if (this.historySearchArr && this.historySearchArr.length) {
        // 如果搜索过就不记录
        if (this.historySearchArr.indexOf(this.params.fitguidanceTitle) < 0) {
          this.historySearchArr.push(this.params.fitguidanceTitle);
        }
      } else {
        this.historySearchArr.push(this.params.fitguidanceTitle);
      }
      localStorage.setItem(
        "historySearchArr",
        JSON.stringify(this.historySearchArr)
      );
    },
    clearSearch() {
      this.searchResultList = [];
    },
    // 查看详情
    handleClick(itemId, type) {
      if (type == 1) {
        this.$router.push({
          name: "fitnessDetails",
          query: {
            id: itemId,
            type: type,
            minorTermId: minorTermId
          }
        });
      }else{
         this.$router.push({
          name: "graphicDetails",
          query: {
            id: itemId
          }
        });
      }
    },
    // 点击历史搜索
    handleHistorySearch(val) {
      this.isLoading = true;
      this.isShowKeyWord = false;
      this.params.fitguidanceTitle = val;
      this.params.page = 1;
      this.searchResultList = [];
      this.initData();
    },
    // 输入框聚焦
    searchFocus() {
      this.isShowKeyWord = true;
      this.noData = false;
    },
    onLoad() {
      this.params.page++;
      this.initData();
    },
    initData() {
      //获取搜索列表
      getFitguidancePage({
        fitguidanceTitle: this.params.fitguidanceTitle,
        page: this.params.page,
        limit: this.params.limit
      })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.isLoading = false;
            this.searchResultList = this.searchResultList.concat(res.data);
            if (this.searchResultList.length >= res.count) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });

      // getFitguidancePage(this.params).then(res => {
      //   this.isLoading = false;
      //   this.isShowKeyWord = false;
      //   if (res.data && res.data.length) {
      //     = [...this.searchResultList, ...res.data];
      //     this.count = res.count;
      //     // 加载状态结束
      //     this.loading = false;
      //     console.log(this.searchResultList.length, this.count)
      //     // 数据全部加载完成
      //     if (this.searchResultList.length >= this.count) {
      //       this.finished = true;
      //     }
      //   } else {
      //     this.isLoading = false;
      //     this.finished = true;
      //     this.searchResultList = [];
      //     this.noData = true;
      //   }
      // });
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.van-search {
  margin-top: 0;
  padding-top: 7px;
}
.van-loading {
  text-align: center;
}
.van-search__content {
  border-radius: 15px;
}
.search-content {
  .key-word-container {
    min-height: 100%;
    background-color: #fff;
    .search-list {
      padding: 26px 12px 15px 12px;
      .title {
        margin-bottom: 14px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(180, 180, 180, 1);
      }
      .keyword {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-bottom: 10px;
          min-width: 18%;
          margin-right: 6px;
          padding: 4px 6px;
          font-size: 13px;
          font-weight: 500;
          line-height: 13px;
          color: rgba(180, 180, 180, 1);
          background: rgba(242, 242, 242, 1);
          border-radius: 13px;
          text-align: center;
        }
      }
    }
  }
  .history-search {
    padding-top: 13px;
  }
  .clear-history-list {
    margin-top: 55px;
    padding-bottom: 20px;
    text-align: center;
    span {
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
  }
  .content {
    .search-wrap {
      padding: 8px 12px 0;
      min-height: 100vh;
      background-color: #f2f2f2;
      .item {
        display: flex;
        width: 100%;
        max-height: 115px;
        margin-bottom: 10px;
        padding: 16px 22px 16px 12px;
        background-color: #fff;
        .img-box {
          flex: 115px 0 0;
          // background-color: #333;
          border-radius: 3px;
          overflow: hidden;
        }
        .info-box {
          position: relative;
          flex: auto;
          min-height: 83px;
          margin-left: 12px;
          .title {
            font-size: 16px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 21px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .info-type {
            position: absolute;
            bottom: 2px;
            left: 0;
            span {
              display: inline-block;
              margin-right: 5px;
              padding: 0 9px;
              font-size: 11px;
              font-weight: 400;
              color: rgba(180, 180, 180, 1);
              line-height: 17px;
              background: rgba(242, 242, 242, 1);
              border-radius: 3px;
            }
          }
        }
      }
    }
    .no-data {
      width: 193px;
      height: 138px;
      margin: 107px auto 0;
      text-align: center;
      .no-data-img {
        max-width: 100%;
      }
      p {
        margin-top: 24px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
      }
    }
  }
}
</style>
