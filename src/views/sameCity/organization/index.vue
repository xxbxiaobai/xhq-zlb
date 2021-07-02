<template>
  <div id="box">
    <van-nav-bar title="健身社团" v-if="isShow" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="nav-wrap" v-if="isShow">
      <!-- 搜索 -->
      <van-search
        class="serach-box"
        placeholder="请输入搜索关键词"
        @keypress="handleSearch"
        v-model="params.name"
      />
      <!-- <van-dropdown-menu> -->
        <!-- <van-dropdown-item v-model="params.typeId" :options="typeOptions" /> -->
        <!-- <van-dropdown-item :title="selectVal" ref="item">
          <van-tree-select
            :items="regionItems"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
            @click-nav="handleSelectCity"
            @click-item="handleClick"
          />
        </van-dropdown-item>
      </van-dropdown-menu> -->
    </div>
    <!-- 列表 -->
    <div class="fitness-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="fitness-list-wrap">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <router-link
            :to="{
              path: '/same-city/organization/details',
              query: { id: item.id }
            }"
            tag="van-cell"
            class="fitness-item"
            v-for="item in organizationList"
            :key="item.id"
          >
            <h2>{{ item.name }}</h2>
            <p class="contact">
              <span>联系人：</span>
              <span>{{ item.contactPerson }}</span>
            </p>
            <a :href="'tel:'+item.phone" class="relation">
              <span>去联系</span>
              <!-- <i class="relation-call"></i> -->
              <img src="../../../assets/qulianxi@2x.png" alt class="qulianxi" />
            </a>
          </router-link>

          <van-empty description="没有更多啦" v-show="!organizationList.length" />
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 回到顶部 -->
    <div v-if="btnFlag" class="scroll-top" @click="backTop"></div>
  </div>
</template>

<script>
import { findOrganizationList, findRegion } from "@/http/api";
import { zlbFun } from "@/util/Tool";
import phone from "@/components/Phone";
const noDataPic = require("@/assets/zanwushuju.png");
export default {
  name: "",
  data() {
    return {
      isShow: false,
      p_val: '',
      // typeId: "",
      typeOptions: [
        { text: "类型", value: "" },
        { text: "社会团体", value: 1 },
        { text: "民办非企单位", value: 2 },
        { text: "基金会", value: 3 }
      ],
      isNodata: false,
      isLoading: false,
      noDataPic: noDataPic,
      // selectVal: "绍兴市", // 区域
      activeId: 1,
      activeIndex: 0,
      organizationList: [],
      regionItems: [
        {
          text: "省本级",
          value: "",
          children: [
            {
              text: "全部",
              id: "",
              flag: true
            }
          ]
        }
      ],
      list: [],
      loading: false,
      finished: false,
      params: {
        limit: 10,
        page: 0,
        typeId: "",
        city: "",
        district: "",
        name: "",
        findType: ""
      },
      btnFlag: false
    };
  },
  components: {
    phone
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.path) {
        vm.isShow = true;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.isShow = false;
    next();
  },
  created() {
    zlbFun("体育社会组织");

    // findRegion().then(res => {
    //   res.data.forEach(item => {
    //     item.data.unshift({
    //       name: "全部",
    //       id: ""
    //     });
    //     this.regionItems.push({
    //       text: item.name,
    //       value: item.id,
    //       children: item.data.map(child => ({
    //         text: child.name,
    //         id: child.id
    //       }))
    //     });
    //   });
    // });

    const a = [
      {
        // text: "绍兴市",
        value: 126,
        children: [
          { text: "全部", id: "" },
          { text: "越城区", id: 1299 },
          { text: "柯桥区", id: 1300 },
          { text: "上虞区", id: 1301 },
          { text: "新昌县", id: 1302 },
          { text: "诸暨市", id: 1303 },
          { text: "嵊州市", id: 1304 }
        ]
      }
    ];
    this.regionItems = a;
    // this.getData();
  },
  // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  watch: {
    "params.typeId"(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getData();
      }
    },
    "params.district"(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getData();
      }
    },
    "params.name"(newVal, oldVal) {
      if (newVal == "") {
        this.getData();
      }
    }
  },
  methods: {
    // 选择区
    handleClick(data) {
      this.params.district = data.id; // 区id
      this.selectVal = data.text;
      this.$refs.item.toggle();
      // 省本级
      if (data.flag) {
        this.params.findType = "province";
      } else {
        this.params.findType = "";
      }
      this.getData();
    },
    // 选择市
    handleSelectCity(index) {
      this.params.city = this.regionItems[index].value;
      if (index == 0) {
        this.params.findType = "province";
      } else {
        this.params.findType = "";
      }
    },
    getData(p_val) {
      this.params.page = 1;
      this.isNodata = false;
      this.params.district =1257
      if(p_val || p_val === ""){
        this.p_val = p_val
        this.params.name = p_val
      }
      findOrganizationList(this.params).then(res => {
        this.isLoading = false;
        this.organizationList = [];
        if (res.data && res.data.length) {
          this.organizationList = [...res.data, ...this.organizationList];
        } else {
          this.isNodata = true;
          this.organizationList = [];
        }
      });
    },
    handleSearch(event) {
      if (event.keyCode == 13) {
        event.preventDefault(); //禁止默认事件（默认是换行）
        this.isNodata = false;
        this.organizationList = [];
        this.params.name = event.target.value;
        this.getData(this.params);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onRefresh() {
      setTimeout(() => {
        this.onLoad("refresh");
        this.isLoading = false;
      }, 500);
    },
    onLoad(flag) {
      // 异步更新数据
      this.params.page++;
      if(this.p_val){
        this.params.name = p_val
      }
      findOrganizationList(this.params)
        .then(res => {
          if (flag) {
            this.organizationList = [...res.data, ...this.organizationList];
          } else {
            this.organizationList = [...this.organizationList, ...res.data];
          }
          this.count = res.count;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.organizationList.length >= this.count) {
            this.finished = true;
          }

          // 下拉加载提示
          if (flag) {
            if (res.data && res.data.length) {
              this.$toast("加载成功");
            } else {
              this.$toast("没有更多了");
            }
          }
        })
        .catch(err => {
          this.error = true;
          this.loading = false;
        });
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      // 滚动距离大于60，出现按钮
      that.scrollTop > 60 ? (that.btnFlag = true) : (that.btnFlag = false);
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
#box {
  height: 100vh;
  width: 100vw;
  background: #f6f7f8;
}
.fitness-list {
  .qulianxi {
    width: 1.5rem;
    height: 1.5rem;
  }
  padding: 0.6rem;
  .fitness-list-wrap {
    .fitness-item {
      position: relative;
      width: 100%;
      // height: 4.5rem;
      margin-bottom: 0.5rem;
      padding: 0.75rem 0 0.7rem 0.65rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.09);
      border-radius: 0.4rem;

      h2 {
        font-family: PingFang;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 0.6rem;
        width: 70%;
        font-size: 0.8rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
      }

      .contact {
        margin-bottom: 0.5rem;
        font-size: 0.6rem;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.65rem;
      }

      .telphone {
        font-size: 0.6rem;
        font-weight: 400;
        color: #1492ff;
        line-height: 0.6rem;
      }

      .relation {
        position: absolute;
        top: 50%;
        right: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.5rem;
        height: 1.8rem;
        width: 4.2rem;
        border-radius: 2rem;
        background-color: #ecf3f8;
        transform: translateY(-50%);

        span {
          font-family: PingFang SC;
          color: #1492ff;
          font-size: 0.6rem;
          white-space: nowrap;
        }

        .relation-call {
          display: block;
          margin: 0.15rem;
          width: 1.4rem;
          height: 1.4rem;
          background: url("../../../assets/phone_big.png") center no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    .no-data {
      width: 9.65rem;
      height: 6.9rem;
      margin: 5.35rem auto 0;
      text-align: center;

      .no-data-img {
        max-width: 100%;
      }

      p {
        margin-top: 1.2rem;
        font-size: 0.8rem;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 1.05rem;
      }
    }
  }
}
.scroll-top {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  background-image: url("../../../assets/jiantou-xia.png");
  background-repeat: no-repeat;
  background-size: 50% 50%;
  background-position: center;
  box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.09);
}

.van-loading {
  text-align: center;
}
</style>