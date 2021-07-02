<template>
  <div id="container">
    <!-- 头部组件开始 -->
    <match-search
      v-model="search"
      @input="searchFile"
      @project="searchProject"
      @level="searchLevel"
      @region="searchRegion"
      @city="searchCity"
      @date="searchDate"
    />
    <!-- 头部组件结束 -->
 
    <!-- 内容展示开始 -->
    <ul class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="searchCont">
        <li v-for="(item,i) in cont" :key="i">
          <a :href="preview(item.fileUrl)">{{item.eventName}}</a>
        </li>
      </van-list>
    </ul>
    <!-- 内容展示结束 -->

    <!-- loading开始 -->
    <div class="loginMap" v-show="login">
      <div class="login">
        <van-loading />
      </div>
    </div>
    <!-- loading结束 -->
  </div>
</template>


<script>
import matchSearch from "@/components/matchSearch";
import { getEventResultFile } from "@/http/api";
import { zlbFun } from "../../util/Tool";
var msg = {
  itemId: "", //项目
  level: "", //等级
  city: "", //市
  district: "", //区
  startTime: "", //时间
  name: "", //内容
  limit: 10,
  page: 0
};
export default {
  data() {
    return {
      //上拉加载
      login: false,
      loading: false,
      finished: false,

      search: "", //搜索内容
      cont: [] //列表内容
    };
  },
  methods: {
    /**
     * 跳转预览
     */
    preview(value) {
      if (!value) return false;
      const type = value.substring(value.lastIndexOf(".") + 1); //文档类型
      if (type !== "doc" && type !== "docx" && type !== "pdf") return false; //类型限制
      return type === "doc" || type === "docx"
        ? `http://view.officeapps.live.com/op/view.aspx?src=${value}`
        : `#/match-result/particulars?url=${value}`;
    },

    /**
     * 搜索内容
     */
    searchFile(value) {
      this.interceptor();
      this.cont = [];
      msg.page = 0;
      if (value) {
        msg.name = value;
      } else {
        msg = {
          itemId: "",
          level: "",
          city: "",
          district: "",
          startTime: "",
          name: "",
          limit: 10,
          page: 0
        };
      }
      this.searchCont();
    },
    /**
     *赛事时间
     */
    searchDate(value) {
      this.interceptor();
      msg.startTime = value;
      msg.page = 0;
      this.cont = [];
      this.searchCont();
    },

    /**
     *赛事项目
     */
    searchProject(value) {
      this.interceptor();
      msg.itemId = value;
      msg.page = 0;
      this.cont = [];
      this.searchCont();
    },

    /**
     *赛事级别
     */
    searchLevel(value) {
      this.interceptor();
      msg.level = value;
      msg.page = 0;
      this.cont = [];
      this.searchCont();
    },

    /**
     * 归属地区
     */
    searchRegion(value) {
      this.interceptor();
      msg.district = value.id;
      msg.page = 0;
      this.cont = [];
      this.searchCont();
    },
    /**
     * 所属市
     */
    searchCity(value) {
      console.log(value);
      this.interceptor();
      msg.city = value;
      msg.page = 0;
      this.cont = [];
      this.searchCont();
    },

    /**
     * 拦截器
     */
    interceptor() {
      if (this.login) return;
      this.login = true;
    },

    /**
     * 列表查询
     */
    searchCont() {
      this.interceptor();
      console.log(msg, "weisuo1");
      msg.page++;
      getEventResultFile(msg).then(res => {
        if (res.data.length) {
          this.loading = false;
          this.finished = false;
          res.data.forEach(item => {
            this.cont.push(item);
          });
          if (res.data.length < 10) {
            this.finished = true;
            this.loading = false;
          }
        } else {
          this.finished = true;
          this.loading = false;
        }
        this.login = false;
      });
    },

    /**
     * 初始化
     */
    init() {
      zlbFun("赛事活动成绩");
      msg = {
        itemId: "",
        level: "",
        city: "",
        district: "",
        startTime: "",
        name: "",
        limit: 10,
        page: 0
      };
    }
  },
  //初始化
  created() {
    this.init();
  },
  components: {
    matchSearch
  }
};
</script>


<style scoped lang="less">
#container {
  min-height: 100vh;
  width: 100vw;
  color: #333;
  background-color: #f6f7f8;
  .list {
    li {
      padding: 0.65rem 0.6rem;
      border-bottom: 1px solid #f1f1f1;
      font-size: 0.7rem;
      line-height: 0.7rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: white;
    }
  }
  .loginMap {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background-color: transparent;
    z-index: 999;
    .login {
      position: absolute;
      top: 50%;
      right: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: -1.5rem;
      margin-top: -1.5rem;
      height: 3rem;
      width: 3rem;
      border-radius: 0.25rem;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>