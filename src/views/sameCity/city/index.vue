<template>
  <div id="container">
    <!-- 头部 -->
    <van-nav-bar
      v-if="isShow"
      title="健身同城约"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <!-- <van-icon name="records" size="1rem" /> -->
        <img src="../../../assets/faqiyue@2x.png" alt class="yue_img" />
      </template>
    </van-nav-bar>

    <!-- 搜索 -->
    <van-search
      v-if="isShow"
      v-model="params.cityTreatyName"
      placeholder="请输入搜索同城约主题搜索"
      shape="round"
      @keypress="handleSearch"
    />
    <van-list
      v-model="loading2"
      :finished="finished2"
      finished-text="没有更多了"
      :immediate-check="true"
      @load="inquireList"
    >
      <!-- 列表 -->
      <van-panel
        v-for="(item,i) in cont"
        :key="i"
        :title="item.cityTreatyName"
        :desc="'发布时间：'+item.actTime"
        :status="!item.isFee?'收费':''"
      >
        <template #footer>
          <router-link :to="{path:'/same-city/city/details',query:{id:item.id}}">
            <van-button size="small">详情</van-button>
          </router-link>

          <router-link :to="{path:'/same-city/city/add',query:{id:item.id}}">
            <van-button
              size="small"
              type="info"
              :disabled="item.maxNum<item.partNum"
            >报名（{{item.numShow}}）</van-button>
          </router-link>
        </template>
      </van-panel>
    </van-list>
    <van-empty description="没有更多啦" v-show="!cont.length" />
  </div>
</template>


<script>
import { findCityTreatyList } from "@/http/api";
export default {
  data() {
    return {
      cont: [],
      isShow: false,
      loading2: false,
      finished2: false,
      params: {
        cityTreatyName: "",
        district: "",
        limit: 10,
        page: 1
      }
    };
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
    this.getList();
  },
  methods: {
    inquireList() {
      this.page++;
      this.getList();
    },
    onClickLeft() {
      window.location.href = "sxty://back"
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/same-city/city/edit");
    },
    bao() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您确认要加入吗？"
        })
        .then(() => {
          this.$toast.success("报名成功");
        });
    },

    getList(p_val) {
      if (p_val || p_val === "") {
        this.params.cityTreatyName = p_val;
      }
      this.loading2 = true;
      findCityTreatyList(this.params).then(res => {
        if (res.code) return;
        this.loading2 = false;
        this.cont = this.cont.concat(res.data);
        if (this.cont.length >= res.count) {
          this.finished2 = true;
        }
      });
    },

    /**
     * 搜索
     */
    handleSearch(event) {
      if (event.keyCode == 13) {
        event.preventDefault(); //禁止默认事件（默认是换行）
        this.cont = [];
        this.getList();
      }
    }
  }
};
</script>


<style scoped lang="less">
#container {
  .yue_img {
    width: 1rem;
    height: 1rem;
  }
  .add {
    padding: 0.5rem 0.8rem;
    font-size: 0.6rem;
    line-height: 0.9rem;
  }
  .van-panel {
    margin: 0.5rem 0.7rem;
    box-shadow: 0 0.2rem 0.25rem #e8e8e8;
  }
  .van-cell__title,
  .van-cell__value {
    flex: auto;
  }

  .van-panel__footer {
    padding: 0.6rem 0.8rem;
    text-align: right;

    .van-button--small {
      margin-left: 0.5rem;
    }
  }
}
</style>
