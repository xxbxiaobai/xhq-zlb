<template>
  <div id="match-head">
    <!-- 搜索开始 -->
    <div class="match-head-search">
      <input type="text" placeholder="请输入搜索内容" @keyup.enter="$emit('input', $event.target.value)" />
    </div>
    <!-- 搜索结束 -->

    <!-- 下拉开始 -->
    <van-dropdown-menu>
      <van-dropdown-item :title="region.title" ref="region">
        <!-- 地区 -->
        <van-tree-select
          :items="region.cont"
          :active-id.sync="region.activeId"
          :main-active-index.sync="region.activeIndex"
          @click-item="searchRegion"
          @click-nav="searchCity"
        /> 
      </van-dropdown-item>

      <van-dropdown-item :title="dateTitle" ref="item">
        <!-- 时间 -->
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @confirm="searchOkTime"
          @cancel="searchNoTime"
        />
      </van-dropdown-item>

      <van-dropdown-item
        :options="option.cont"
        :title="option.title"
        @change="searchLevel"
        v-model="option.index"
      />
      <van-dropdown-item
        :options="sportEvent.cont"
        :title="sportEvent.title"
        @change="searchProject"
        v-model="sportEvent.index"
      />
    </van-dropdown-menu>
    <!-- 下拉结束 -->
  </div>
</template>


<script>
import { findRegionArea, selectItem } from "@/http/api";
import { dateFormat } from "@/util/Tool";
export default {
  data() {
    return {
      //日期年月日
      dateTitle: "赛事时间",
      currentDate: new Date(),
      minDate: new Date(2009, 0, 0),

      //归属地区
      region: {
        title: "归属地区",
        activeId: 0,
        activeIndex: 0,
        cont: []
      },
      //赛事级别
      option: {
        index: 0,
        title: "赛事级别",
        cont: [
          { text: "全部", value: 0 },
          { text: "区县级", value: 1 },
          { text: "市级", value: 2 },
          { text: "省级", value: 3 },
          { text: "全国级", value: 4 },
          { text: "国际级", value: 5 }
        ]
      },

      //赛事项目
      sportEvent: {
        index: 0,
        title: "赛事项目",
        cont: [{}]
      }
    };
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.initRegion();
      this.initSport();
    },
    /**
     * 竞赛时间
     */
    searchOkTime(value) {
      this.$refs.item.toggle();
      let date = this.dateFormat(value, "yyyy-MM-dd");
      this.dateTitle = date;
      this.$emit("date", date);
    },
    searchNoTime() {
      this.$emit("date", '');
      this.dateTitle = '赛事时间';
      this.$refs.item.toggle();
    },

    /**
     * 赛事项目
     */
    searchProject(value) {
      const msg = this.sportEvent.cont.filter(item => item.value == value);
      this.sportEvent.title = msg[0].text;
      this.$emit("project", value);
    },

    /**
     * 赛事级别
     */
    searchLevel(value) {
      console.log(value);
      this.option.title =
        this.option.cont[value].text === "全部"
          ? "赛事级别"
          : this.option.cont[value].text;
      value = value !== 0 ? value-- : "";
      this.$emit("level", value);
    },

    /**
     * 归属地区
     */
    searchRegion(value) {
      this.$refs.region.toggle();
      this.region.title = value.text;
      this.$emit("region", value);
    },
    // 选择市
    searchCity(index) {
      this.region.title = this.region.cont[index].text;
      this.$emit("city", this.region.cont[index].id);
    },

    /**
     * 时间格式化工具
     */
    dateFormat(time, format) {
      return dateFormat(time, format);
    },

    /**
     * 初始化地区
     */
    initRegion() {
      findRegionArea().then(res => {
        if (res.data.length) {
          const region = res.data.map(item => {
            let children = item.data.map(item => {
              return {
                text: item.name,
                id: item.id
              };
            });
            return {
              text: item.name,
              id: item.id,
              children
            };
          });
          this.region.cont = region;
        }
      });
    },

    /**
     * 初始化运动类型
     */
    initSport() {
      selectItem().then(res => {
        if (res.data.length) {
          const sport = res.data.map(item => {
            return { text: item.dataName, value: item.dataValue };
          });
          this.sportEvent.cont = [{ text: "全部", value: "" }, ...sport];
        }
      });
    }
  },

  //查询初始化
  created() {
    this.init();
  }
};
</script>


<style scoped lang="less">
#match-head {
  background-color: white;
  margin-bottom: 0.3rem;
  // 搜索
  .match-head-search {
    position: relative;
    padding-top: 0.5rem;
    input {
      padding-left: 1.8rem;
      margin: 0 0.6rem;
      width: calc(100% - 1.2rem);
      height: 1.7rem;
      border-radius: 3rem;
      font-size: 0.75rem;
      line-height: 1.7rem;
      background-color: #f7f8fa;
    }
    &::before {
      content: "";
      position: absolute;
      left: 1.3rem;
      top: 50%;
      margin-top: -0.25rem;
      height: 1rem;
      width: 1rem;
      background: url("../assets/sousuohui.png") no-repeat center;
      background-size: 80%;
    }
  }

  //===================================
  //   更改原始样式
  //===================================
  /deep/ [class*="van-hairline"]::after {
    display: none;
  }
  /deep/ .van-tree-select__item {
    font-weight: 400;
  }
  /deep/ .van-dropdown-menu {
    height: 2.25rem;
    margin-right: 0.6rem;
  }
  /deep/ .van-ellipsis {
    font-size: 0.7rem;
  }
  /deep/ .van-dropdown-menu__title::after {
    position: absolute;
    top: 50%;
    right: -0.5rem;
    margin-top: -0.5rem;
    height: 1rem;
    width: 1rem;
    border: none;
    -webkit-transform: none;
    transform: none;
    opacity: 1;
    background: url("../assets/jiantoux.png") no-repeat center;
    background-size: cover;
    content: "";
  }
  /deep/ .van-dropdown-menu__title--down::after {
    -webkit-transform: none;
    transform: none;
    background: url("../assets/jiantoushang.png") no-repeat center;
    background-size: cover;
  }
  /deep/ .van-sidebar-item--select {
    border-color: #1989fa;
  }
  /deep/ .van-tree-select__item--active {
    color: #1989fa;
  }
  /deep/ .van-dropdown-menu__item:first-child::after {
    background-color: white;
  }
  //更改颜色
  //=================================
  .placeholder {
    color: #999;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    .placeholder;
  }
  input:-moz-placeholder,
  textarea:-moz-placeholder {
    .placeholder;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    .placeholder;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    .placeholder;
  }
}
</style>
