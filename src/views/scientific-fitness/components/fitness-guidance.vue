<template>
  <div>
    <!-- 搜索 -->
    <van-sticky>
      <van-search
        placeholder="请输入搜索内容"
        v-model="searchVal"
        @click="handleSearch"
      />
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      class="info-list"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        class="info-item"
      >
        <div
          class="item-wrap"
          @click="handleViewDetail(item.type, item.id, item.minorTermId)"
        >
          <h4>{{ item.fitguidanceTitle }}</h4>
          <div class="info-content">
            <van-image
              width="100%"
              height="100%"
              :src="ImageUrl +
                  item.fileList[0].id
              "
            />
            <span class="tag">{{ item.type == 1 ? "视频" : "图文" }}</span>
            <div class="type">{{ item.minorTermName }}</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["list"],
  data() {
    return {
      ImageUrl: this.ImageUrl,
      searchVal: "",
      loading: false,
      finished: false
    };
  },

  methods: {
    handleSearch() {
      this.$router.push("/search");
    },
    handleViewDetail(type, id, minorTermId) {
      if (type == 1) {
        this.$router.push({
          name: "fitnessDetails",
          query: {
            id: id,
            type: type,
            minorTermId: minorTermId
          }
        });
      } else {
        this.$router.push({
          name: "graphicDetails",
          query: {
            id: id,
            type: type,
            minorTermId: minorTermId
          }
        });
      }
    },
    // 滚动加载
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.info-list {
  padding: 7px 12px;
  background-color: #f6f7f8;
  .info-item {
    width: 100%;
    margin-bottom: 8px;
    padding: 16px 15px 11px 15px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
    border-radius: 3px;
    .item-wrap {
      display: block;
      width: 100%;
      height: 100%;
      h4 {
        margin-bottom: 14px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
      }
      .info-content {
        position: relative;
        img {
          width: 100%;
          max-height: 170px;
          border-radius: 3px;
          overflow: hidden;
        }
        .tag {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 11px;
          color: rgba(255, 255, 255, 1);
          line-height: 15px;
        }
        .type {
          margin-top: 10px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 11px;
        }
      }
    }
  }
}
.no-data {
  font-size: 14px;
  padding: 10px 0;
  text-align: center;
  background-color: #f6f7f8;
}
</style>
<style>
body {
  background: #f6f7f8;
}
</style>
