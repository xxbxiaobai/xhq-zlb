<template>
  <div id="box_user">
    <van-nav-bar title="我的社团" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="nav-wrap">
      <!-- 搜索 -->
      <van-search
        class="serach-box"
        placeholder="请输入搜索关键词"
        @blur="handleSearch"
        v-model="params.name"
      />
    </div>
    <!-- 列表 -->
    <div class="container">
      <div class="fitness-list" v-show="organizationList.length!=0">
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="fitness-list-wrap">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">-->
        <router-link
          :to="{
              path: '/same-city/user/organization',
              query: { id: item.id }
            }"
          tag="van-cell"
          class="fitness-item"
          v-for="item in organizationList"
          :key="item.id"
        >
          <h2 class="name">{{ item.name }}</h2>
          <p class="contact">
            <span>联系人：</span>
            <span>{{ item.contactPerson }}</span>
          </p>
          <a :href="'tel:'+item.phone" class="relation">
            <span>去联系</span>
            <!-- <i class="relation-call"></i> -->
            <img src="../../assets/qulianxi@2x.png" alt class="qulianxi" />
          </a>
        </router-link>

        <!-- <van-empty description="没有更多啦" v-show="!organizationList.length" />
        </van-list>
        </van-pull-refresh>-->
      </div>
    </div>

    <!-- 回到顶部 -->
    <div v-if="btnFlag" class="scroll-top" @click="backTop"></div>
  </div>
</template>
<script>
import { communityInfo } from "@/http/api";
export default {
  data() {
    return {
      params: {
        name: ""
      },
      btnFlag: false,
      organizationList: [],
      subList: []
    };
  },
  methods: {
    getCommunity() {
      communityInfo({
        userId: JSON.parse(sessionStorage.getItem("userInfo")).id
      })
        .then(res => {
          if (res.code == 0) {
            this.organizationList = res.data;
            this.subList = res.data
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    handleSearch() {
      if (!this.params.name) {
        return false;
      }
      this.organizationList = this.subList.filter((item, i) => {
        return item.name.includes(this.params.name);
      });
      console.log( this.organizationList)
    }
  },
  created() {
    this.getCommunity();
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
#box_user {
  height: 100vh;
  width: 100vw;
  background: #f6f7f8;
  .container {
    padding: 0.6rem;
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
      background: url("../../assets/phone_big.png") center no-repeat;
      background-size: 100% 100%;
    }
  }
  .name {
    font-size: 0.8rem;
    font-weight: 700;
  }
  .fitness-list {
    position: relative;
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.75rem 0 0.7rem 0.65rem;
    background: #ffffff;
    box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.09);
    border-radius: 0.4rem;
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
    background-image: url("../../assets/jiantou-xia.png");
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: center;
    box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.09);
  }

  .van-loading {
    text-align: center;
  }
}
</style>