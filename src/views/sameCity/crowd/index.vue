<template>
  <div id="container">
    <van-nav-bar
      v-if="isShow"
      title="健身群"
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

    <ul class="cont-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <li class="list" v-for="(item,i) in cont" :key="i">
          <router-link
            :to="{path:'/same-city/crowd/details',query:{
            groupDetails:item.groupDetails,
            createTime:item.createTime,
            linkMan:item.linkMan,
            phone:item.phone,
            name:item.name,
            id:item.id
            }}"
          >
            <div class="list-cont">
              <img src="../../../assets/jianshenqun@2x.png" />
              <strong>{{item.name}}</strong>
              <div>
                <span>{{item.groupDetails}}</span>
              </div>
            </div>
          </router-link>
        </li>
      </van-list>
      <van-empty description="没有更多啦" v-show="!cont.length" />
    </ul>
  </div>
</template>


<script>
import { getFitnessGroupList } from "@/http/api";
export default {
  data() {
    return {
      originPath: "", //判断是否是首页跳转
      loading: false,
      finished: false,
      cont: [],
      isShow: false,
      typeOptions: [
        { text: "羽毛球", value: "" },
        { text: "篮球", value: 1 },
        { text: "乒乓球", value: 2 },
        { text: "排球", value: 2 },
        { text: "长跑", value: 2 },
        { text: "自行车", value: 2 },
        { text: "健身", value: 2 },
        { text: "毽子", value: 2 },
        { text: "跳绳", value: 2 },
        { text: "游泳", value: 2 },
        { text: "足球", value: 3 }
      ],
      // selectVal: "绍兴市", // 区域
      activeId: 1,
      activeIndex: 0,
      organizationList: [],
      params: {
        name: "",
        district: "",
        limit: 10,
        page: 1
      },
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
      ]
    };
  },
  created() {
    const a = [
      // {
      //   text: "绍兴市",
      //   value: 126,
      //   children: [
      //     { text: "全部", id: "" },
      //     { text: "越城区", id: 1299 },
      //     { text: "柯桥区", id: 1300 },
      //     { text: "上虞区", id: 1301 },
      //     { text: "新昌县", id: 1302 },
      //     { text: "诸暨市", id: 1303 },
      //     { text: "嵊州市", id: 1304 }
      //   ]
      // }
    ];
    this.regionItems = a;
    this.getList();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.path) {
        vm.isShow = true;
      }
      if (from.path == "/same-city") {
        vm.originPath = "y";
      } else {
        vm.originPath = "";
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.isShow = false;
    next();
  },
  methods: {
    onLoad() {
      this.params.page++;
      this.getList();
    },
    onClickLeft() {
      if (this.originPath) {
        this.$router.go(-1);
      } else {
        window.location.href = "sxty://back";
        this.$router.push("/");
      }
    },
    onClickRight() {
      this.$router.push({
        path: "/same-city/crowd/edit",
        query: {
          district: this.activeId
        }
      });
    },

    handleSearch(event) {
      if (event.keyCode == 13) {
        event.preventDefault(); //禁止默认事件（默认是换行）
        this.cont = [];
        this.getList();
      }
    },

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
      this.cont = []
      this.getList();
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

    getList(p_val) {
      if (p_val || p_val === "") {
        this.params.name = p_val;
        this.params.district= 1257
      }
      this.loading = true;
      getFitnessGroupList(this.params).then(res => {
        this.loading = false;
        if (res.code) return this.$toast(res.msg);
        this.cont = this.cont.concat(res.data);
        if (this.cont.length >= res.count) {
          this.finished = true;
        }
      });
    }
  }
};
</script>


<style scoped lang="less">
.yue_img {
  width: 1rem;
  height: 1rem;
}
.nav-wrap {
  box-shadow: 0 0 6px 0 rgba(153, 153, 153, 0.24);
}
.profile-photo(@h,@w) {
  height: @h;
  width: @w;
  border-radius: 50%;
  object-position: 50% 50%;
  object-fit: cover;
}

.fitness-list {
  margin: -0.6rem;
  padding: 0.6rem;
  /deep/ .van-pull-refresh {
    overflow: initial;
  }
  .fitness-list-wrap {
    .fitness-item {
      position: relative;
      width: 100%;
      // height: 4.5rem;
      margin-bottom: 0.5rem;
      padding: 0.75rem 0 0.7rem 0.65rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 0 10px 0 rgba(153, 153, 153, 0.3);
      border-radius: 3px;

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

//列表
.cont-list {
  margin: 16px;

  .list {
    position: relative;
    padding: 0 12px;
    margin-bottom: 12px;
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(153, 153, 153, 0.3);
    border-radius: 3px;
    //内容
    .list-cont {
      padding-top: 16px;
      height: 72px;
      border-bottom: 1px solid #f6f6f6;

      img {
        position: absolute;
        right: 16px;
        .profile-photo(40px, 40px);
      }

      strong {
        font-family: PingFangSC-Regular;
        display: block;
        padding-bottom: 11px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: 500;
      }

      div {
        display: flex;

        span {
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #999999;
          letter-spacing: 0;
          line-height: 13px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 80%;
        }
      }
    }

    //运动员
    .list-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 42px;

      .list-img {
        text-align: right;
        width: 95%;

        img {
          position: relative;
          margin-right: -15px;
          .profile-photo(26px, 26px);
          border: 2px solid #fff;

          &:nth-child(1) {
            z-index: 5;
          }
          &:nth-child(2) {
            z-index: 4;
          }
          &:nth-child(3) {
            z-index: 3;
          }
          &:nth-child(4) {
            z-index: 2;
          }
          &:nth-child(5) {
            z-index: 1;
          }
        }
      }

      span {
        font-family: PingFangSC-Regular;
        display: inline-block;
        padding: 0 8px;
        height: 18px;
        background: #1492ff;
        border-radius: 2px;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        line-height: 18px;
        white-space: nowrap;
      }
    }
  }
}
</style>
