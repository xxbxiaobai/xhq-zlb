<template>
  <div id="home">
    <Tabar title="同城约详情"></Tabar>
    <div class="text">
      <p>
        {{cont.cityTreatyName}}&nbsp;&nbsp;
        <van-tag type="danger" plain v-if="!cont.isFee">收费</van-tag>
      </p>
      <i>发布时间：{{cont.actTime}}</i>
      <div class="mess">发布人：{{cont.publisher}}</div>
      <div class="mess">总人数：{{cont.numShow}} 人</div>
      <div class="mess">地址：{{cont.addr}}</div>
      <van-divider content-position="left">活动内容</van-divider>
      <div class="content">{{cont.actContent}}</div>
    </div>
    <div class="btn">
      <router-link :to="{path:'/same-city/city/add',query:{id:cont.id}}">
        <van-button type="info" round block>提交报名</van-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import Tabar from "@/components/Tabar";
import { selectCityTreatyById } from "@/http/api";
export default {
  data() {
    return {
      cont: {}
    };
  },
  created() {
    selectCityTreatyById({
      id: this.$route.query.id
    }).then(res => {
      if (res.code) return this.$toast(res.msg);
      this.cont = res.data;
    });
  },
  components: { Tabar }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #f6f8f7;

  .btn {
    position: absolute;
    bottom: 0;
    width: 92%;
    margin: 4%;
  }
  .text {
    padding: 1.05rem 0.5rem 0 0.65rem;
    background-color: #fff;
    p {
      font-size: 0.9rem;
      color: #000000;
      font-weight: 700;
    }
    i {
      display: inline-block;
      font-size: 0.6rem;
      color: #999999;
      margin-bottom: 0.4rem;
    }
    .mess {
      font-size: 0.65rem;
      color: #333333;
      margin-bottom: 0.2rem;
    }
    .bottom {
      margin-bottom: 0.5rem;
    }
    h1 {
      font-size: 0.9rem;
    }
    .title {
      font-size: 0.75rem;
      margin-bottom: 0.2rem;
      margin-top: 0.2rem;
    }
    .content {
      font-size: 0.7rem;
      color: #444444;
      line-height: 1.25rem;
      // text-indent: 1.2rem;
    }
    .content-main {
      color: #333333;
      padding-left: 1.2rem;
      font-size: 0.7rem;
      line-height: 1.25rem;
    }
    .down {
      font-size: 0.7rem;
      color: #999999;
    }
    .box {
      margin-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      a {
        display: flex;
        width: 5.5rem;
        height: 3.5rem;
        background-color: #e7f4ff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.25rem;
        margin-right: 0.25rem;
        padding: 0 0.5rem;
        img {
          width: 1.75rem;
          height: 1.75rem;
        }
        p {
          font-size: 0.3rem;
          color: #333333;
          text-align: center;
          margin-top: 0.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
        }
      }
    }
    .people {
      font-size: 0.65rem;
      color: #000000;
      font-weight: 700;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      margin-left: 1rem;
    }
    .tig {
      font-size: 0.6rem;
      color: #999999;
      margin-bottom: 1rem;
      margin-left: 1rem;
    }
  }
  .login-map {
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