<template>
  <div id="search_top">
    <div class="container">
      <img src="../../assets/icon_back@2x.png" alt @click="goBack" />
      <van-dropdown-menu class="menu">
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <input type="text" placeholder="请输入搜索关键字" v-model="p_val" />
      <button @click="search">搜索</button>
    </div>
    <catalog v-show="isShow === 0" ref="s_search"></catalog>
    <scientific v-show="isShow === 1" ref="s_fit"></scientific>
    <instructor v-show="isShow === 2" ref="fit_instructor"></instructor>
    <sameCity v-show="isShow === 3" ref="same_city"></sameCity>
    <organization v-show="isShow === 4" ref="organization"></organization>
    <crowd v-show="isShow === 5" ref="crowd"></crowd>
  </div>
</template>
<script>
import catalog from "@/views/match/Catalog.vue";
import scientific from "@/views/scientific-fitness";
import instructor from "@/views/constitution/instructor.vue";
import sameCity from "@/views/sameCity/city";
import organization from "@/views/sameCity/organization";
import crowd from "@/views/sameCity/crowd";
export default {
  //   name: "topSearch",
  data() {
    return {
      p_val: "",
      value1: 0,
      isShow: "",
      option1: [
        { text: "赛事活动", value: 0 },
        { text: "科学健身", value: 1 },
        { text: "健身指导员", value: 2 },
        { text: "健身同城", value: 3 },
        { text: "健身社团", value: 4 },
        { text: "健身群", value: 5 }
      ]
    };
  },
  components: {
    catalog,
    scientific,
    instructor,
    sameCity,
    organization,
    crowd
  },
  methods: {
    search() {
      this.isShow = this.value1;
      if (!this.p_val) {
        this.p_val = "";
      }
      if (this.value1 == 0) {
        this.$refs.s_search.eventlists = [];
        this.$refs.s_search.Search(this.p_val);
      } else if (this.value1 == 1) {
        this.$refs.s_fit.advianceList = [];
        this.$refs.s_fit.pageIndex2 = 1
        this.$refs.s_fit.finished2 = false
        this.$refs.s_fit.getFitnessList(this.p_val);
      } else if (this.value1 == 2) {
        // this.$refs.fit_instructor.teacher = [];
        // this.$refs.fit_instructor.transfer.page = 1
        // this.$refs.fit_instructor.finished = false
        // this.$refs.fit_instructor.page = 1
        this.$refs.fit_instructor.Searchs(this.p_val);
      } else if (this.value1 == 3) {
        this.$refs.same_city.cont = [];
        this.$refs.same_city.getList(this.p_val);
      } else if (this.value1 == 4) {
        this.$refs.organization.organizationList = [];
        this.$refs.organization.getData(this.p_val);
      } else if (this.value1 == 5) {
        this.$refs.crowd.cont = [];
        this.$refs.crowd.getList(this.p_val);
      }
    },
    goBack() {
      window.location.href = "sxty://back"
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" scoped>
#search_top {
  height: 100%;
  background-color: #f6f8f7;
  padding-top: 1rem;
  .container {
    background-color: #fff;
    display: flex;
    height: 2.2rem;
    align-items: center;
    /deep/.van-cell__value {
      display: none;
    }
    /deep/.van-overlay {
      background-color: rgba(0, 0, 0, 0);
    }
    /deep/.van-popup--top {
      top: 2px;
      left: 12%;
      border-radius: 5px;
      width: auto;
    }
    /deep/.van-dropdown-menu__bar {
      height: 1.625rem;
      background-color: #eeeeee;
      border-radius: 5px 0px 0px 5px;
      .van-ellipsis {
        font-size: 14px;
      }
    }
    .menu {
      background-color: #eeeeee;
      width: 6rem;
      margin-right: 1px;
    }
    input {
      height: 1.625rem;
      background-color: #eeeeee;
      width: 7rem;
      padding: 10px;
      font-size: 14px;
      border-radius: 0px 5px 5px 0px;
    }
    button {
      font-size: 14px;
      color: #4790f3;
      background-color: #fff;
      padding: 0.5rem;
      padding-left: 1rem;
    }
    img {
      width: 1rem;
      height: 1rem;
      vertical-align: middle;
      padding: 0.5rem;
    }
  }
}
</style>