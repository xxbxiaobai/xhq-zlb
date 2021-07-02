<template>
  <div id="search">
    <van-search
      v-model="params.name"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
    >
      <div slot="action" @click="handleSearch">搜索</div>
    </van-search>
    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      :offset="100"
      class="video-list"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
      @load="onLoad"
    >
      <video-item :videoList="videoList"></video-item>
    </van-list>
  </div>
</template>

<script>
import { getEventInfoVideo } from "@/http/api";

import VideoItem from "./video-item";
export default {
  data() {
    return {
      loading: false,
      error: false,
      finished: false,
      videoList: [],
      count: 0,
      params: {
        limit: 10,
        page: 1,
        name: ""
      }
    };
  },
  methods: {
    handleSearch() {
      this.getVideoList();
    },
    // 初始化
    onLoad() {
      this.params.page++;
      this.getVideoList();
    },
    // 请求数据列表
    getVideoList() {
      this.videoList = [];
      getEventInfoVideo(this.params).then(res => {
        if (res.code != 0) return;
        if (res.data && res.data.length) {
          this.videoList = [...this.videoList, ...res.data];
        } else {
          this.videoList = [];
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.videoList.length >= this.count) {
          this.finished = true;
        }
      });
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

  created() {
    zlbFun("赛事活动视频搜索");
  },

  components: {
    "video-item": VideoItem
  }
};
</script>

<style lang='less' scoped>
#search {
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
