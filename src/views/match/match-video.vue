<template>
  <div class="match-video">
    <van-search placeholder="请输入搜索关键词" v-model="params.name" shape="round" @focus="handleSearch" />
    <van-dropdown-menu>
      <!-- 归属地区 -->
      <van-dropdown-item :title="selectVal" ref="item">
        <van-tree-select :items="regionItems" :active-id.sync="activeId" :main-active-index.sync="activeIndex" @click-nav="handleSelectCity" @click-item="handleClick" />
      </van-dropdown-item>
      <!-- 赛事时间 -->
      <van-dropdown-item title="赛事时间" ref="matchDate">
        <van-datetime-picker v-model="currentDate" type="date" cancel-button-text="全部" @confirm="onConfirm" @cancel="onConfirmcancel"/>
      </van-dropdown-item>
      <!-- 赛事级别 -->
      <van-dropdown-item v-model="params.level" :options="matchLevel" @change="changeMatchLevel" />
      <!-- 赛事项目 -->
      <van-dropdown-item v-model="params.itemId" :options="matchItems" @change="changeMatchItem" />
    </van-dropdown-menu>
    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" :error.sync="error" :offset="100" class="video-list" finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="onLoad">
      <video-item :videoList="videoList"></video-item>
    </van-list>
  </div>
</template>

<script>
import { zlbFun, openFullscreen } from "@/util/Tool"
import { getEventInfoVideo, findRegion, getMatchItem } from "@/http/api"
import VideoItem from "./video-item"
export default {
  data() {
    return {
      selectVal: "归属区域", // 区域
      activeId: 1,
      activeIndex: 0,
      regionItems: [{
        text: "全部",
        value: ""
      }],
      // 赛事等级
      matchLevel: [{ text: "赛事等级", value: "" }, { text: "区县级", value: 0 }, { text: "市级", value: 1 }, { text: "省级", value: 2 }, { text: "全国级", value: 3 }, { text: "国际级", value: 4 }],
      // 赛事项目
      matchItems: [{ text: "赛事项目", value: "" }],
      currentDate: new Date(),

      loading: false,
      error: false,
      finished: false,
      videoList: [],
      count: 0,
      params: {
        limit: 10,
        page: 0,
        name: "",
        city: "",
        district: "",
        startTime: "", // 赛事时间
        level: "", // 赛事等级
        itemId: "" // 赛事项目
      }
    }
  },
  watch: {
    "params.district"(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getVideoList()
      }
    },
    "params.name"(newVal, oldVal) {
      if (newVal == "") {
        this.getVideoList()
      }
    }
  },
  created() {
    zlbFun("赛事活动视频")
    findRegion().then(res => {
      res.data.forEach(item => {
        item.data.unshift({
          name: "全部",
          id: ""
        })
        this.regionItems.push({
          text: item.name,
          value: item.id,
          children: item.data.map(child => ({
            text: child.name,
            id: child.id
          }))
        })
      })
    })
    this.getMatchIitems()
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener("popstate", this.onClickLeft, false)
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false)
  },

  methods: {
    // 选择市
    handleSelectCity(index) {
      if(index == 0) {
        this.$refs.item.toggle()
      }
      this.params.city = this.regionItems[index].value
      this.getVideoList()
    },
    // 选择区
    handleClick(data) {
      this.params.district = data.id // 区id
      this.selectVal = data.text
      this.$refs.item.toggle()
    },
    // 赛事时间
    onConfirm() {
      this.params.startTime = this.datatime(this.currentDate)
      this.$refs.matchDate.toggle()
      this.getVideoList()
    },
    // 全部赛事时间
    onConfirmcancel() {
      this.params.startTime = null
      this.$refs.matchDate.toggle()
      this.getVideoList()
    },
    // 赛事等级
    changeMatchLevel(val) {
      this.params.level = val
      this.getVideoList()
    },
    // 赛事项目
    changeMatchItem(id) {
      this.params.itemId = id
      this.getVideoList()
    },
    //时间格式化
    datatime(date) {
      let dt = new Date(date)
      let y = dt.getFullYear()
      let m = (dt.getMonth() + 1 + "").padStart(2, "0")
      let d = (dt.getDate() + "").padStart(2, "0")
      let hh = (dt.getHours() + "").padStart(2, "0")
      let mm = (dt.getMinutes() + "").padStart(2, "0")
      let ss = (dt.getSeconds() + "").padStart(2, "0")
      return `${y}-${m}-${d}`
    },
    handleSearch() {
      this.$router.push({
        name: "videoSearch"
      })
    },
    // 请求数据列表
    getVideoList() {
      this.videoList = []
      getEventInfoVideo(this.params).then(res => {
        if (res.code != 0) return
        if (res.data && res.data.length) {
          this.videoList = [...this.videoList, ...res.data]
          this.count = res.count
        } else {
          this.videoList = []
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.videoList.length >= this.count) {
          this.finished = true
        }
      })
    },
    // 赛事项目
    getMatchIitems() {
      getMatchItem().then(res => {
        if (res.code != 0) return
        res.data.forEach(item => {
          this.matchItems.push({
            text: item.dataName,
            value: item.dataValue
          })
        })
      })
    },
    // 初始化
    onLoad() {
      this.params.page++
      this.getVideoList()
    },
    onClickLeft() {
      this.$router.push("/match")
    }
  },
  components: {
    "video-item": VideoItem
  }
}
</script>

<style lang='less' scoped>
body {
  background: #f1f1f1;
}
.match-video {
  width: 100%;
  /deep/ .van-ellipsis {
    font-size: 0.7rem;
  }
  /deep/ .van-dropdown-menu__item {
    margin-left: -0.75rem;
  }
  /deep/ .van-sidebar-item--select {
    border-color: #1989fa;
  }
  /deep/ .van-tree-select__item--active {
    color: #1989fa;
  }
  /deep/ .van-sidebar-item__text {
    margin-left: 0.5rem;
  }
  /deep/ .van-cell__title {
    margin-left: 0.5rem;
  }
  /deep/ .van-tree-select__item {
    font-weight: 400;
  }
  /deep/ .van-dropdown-menu__title--down::after {
    -webkit-transform: none;
    transform: none;
    background: url("../../assets/jiantoushang.png") no-repeat center;
    background-size: cover;
  }
  .van-nav-bar {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
  .van-nav-bar__right {
    font-size: 0.85rem;
  }
  /deep/ .video-list .van-cell {
    padding: 0;
    margin-bottom: 0.4rem;
  }
  /deep/ .video-list .van-cell:not(:last-child)::after {
    display: none;
  }
}
</style>
<style>
body {
  background: #f6f7f8;
}
.van-dropdown-menu .van-dropdown-menu__item:first-child::after {
  display: none;
}

.van-dropdown-menu {
  height: 2rem;
  margin-bottom: 0.3rem;
  background: #fff;
}

.serach-box .van-search__content {
  border-radius: 1rem;
}

.van-dropdown-menu__item {
  position: relative;
}

.van-dropdown-menu__item:first-child::after {
  position: absolute;
  top: 0.2rem;
  right: 0;
  display: block;
  width: 0.05rem;
  height: 1.6rem;
  background-color: #e7e7e7;
  content: "";
}

.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: 0;
}

.van-icon-search:before {
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 0.4rem;
  background: url("../../assets/sousuohui.png") center no-repeat;
  background-size: 100% 100%;
  content: "";
}

.van-dropdown-menu__title::after {
  top: 80%;
  right: -0.6rem;
  display: block;
  width: 1rem;
  height: 1rem;
  background: url("../../assets/jiantoux.png") center no-repeat;
  background-size: 100% 100%;
  transform: rotate(0);
  opacity: 1;
  transform: translateY(-50%);
  border: 0;
  content: "";
}

.van-dropdown-menu__title.van-dropdown-menu__title--active::after {
  top: 0;
  transform: rotateZ(180deg);
  transition: all 0.3s;
}

.van-tree-select__item--active {
  color: #1989fa;
}

.van-sidebar-item--select {
  border-color: #1989fa;
}

.van-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}

.van-tree-select__item {
  font-weight: 400;
}

.van-icon-checked:before {
  content: "\F0C8";
}
</style>

