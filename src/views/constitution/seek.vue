<template>
  <div id="home">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <div class="back" @click="returns">
        <van-icon name="arrow-left" color="#1492FF" size="25px" />
        <span >返回</span>
      </div>
      <div class="search">
        <div class="search-icon">
          <img src="./img/suosuo.png" />
        </div>
        <div class="input-box">
          <input type="text" placeholder="请输入搜索内容" v-model="value" @focus="showDel = true" @blur="showDel = false" />
        </div>
        <div class="search-close" @click="del" v-show="showDel">
          <img src="./img/cuo.png" />
        </div>
      </div>
      <div class="search-action" @click="Search">搜索</div>
    </div>
    <!-- 搜索的内容 -->
    <div class="card">
      <div class="top">2019年浙江西湖区某某联赛‘某某杯’游泳比游泳比</div>
      <div class="middle">赛事地点：杭州市西湖区留下街道244号</div>
      <div class="bottom">
        <span>发布时间：2019-03-29</span>
        <span>比赛时间：2019-03-29</span>
      </div>
    </div>
    <div class="card">
      <div class="top">2019年浙江西湖区某某联赛‘某某杯’游泳比</div>
      <div class="middle">赛事地点：杭州市西湖区留下街道244号</div>
      <div class="bottom">
        <span>发布时间：2019-03-29</span>
        <span>比赛时间：2019-03-29</span>
      </div>
    </div>
    <div class="card">
      <div class="top">2019年浙江西湖区某某联赛‘某某杯’游泳比某杯’游泳比</div>
      <div class="middle">赛事地点：杭州市西湖区留下街道244号</div>
      <div class="bottom">
        <span>发布时间：2019-03-29</span>
        <span>比赛时间：2019-03-29</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant';
import {zlbFun} from "@/util/Tool";
Vue.use(Icon);
export default {
  data() {
    return {
      value: "",
      showDel: false,
      list: [], //  请求的数据
      searchData: [] //搜索后的展示数据
    }
  },

  methods: {
    // 返回
    returns(){
       this.$router.go(-1);
      //   this.$router.push({
      //   path: "/instructor"
      // });
    },
    del() {
      this.value = ""
    },
    // 搜索过滤方法
    Search() {
      var search = this.value.trim()
      if (search) {
        this.searchData = this.list.filter(function(item) {
          return Object.keys(item).some(function(key) {
            return String(item[key]).toLowerCase.indexof(search) > -1
          })
        })
      }
    }
  },

  created() {
    zlbFun('')
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .search-bar {
    height: 2.7rem;
    width: 100%;
    font-size: 0.75rem;
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
    height: 5rem;
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
}
</style>
