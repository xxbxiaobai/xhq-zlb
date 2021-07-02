<template>
  <div id="container">
    <van-nav-bar title="实时监控" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

    <ul class="list">
      <router-link to="/monitoring/video">
        <li>
          <div>
            <div>
              <img src="../../assets/zb.jpg" />
            </div>
            <p>阳台</p>
            <i>直播中</i>
          </div>
        </li>
      </router-link>
      <li>
        <div>
          <div>
            <img src="../../assets/jk1.jpg" />
          </div>
          <p>侧门</p>
          <i>直播中</i>
        </div>
      </li>
      <li>
        <div>
          <div>
            <img src="../../assets/jk2.jpg" />
          </div>
          <p>过道A</p>
          <i>直播中</i>
        </div>
      </li>
      <li>
        <div>
          <div>
            <img src="../../assets/jk3.jpg" />
          </div>
          <p>街区</p>
          <i>直播中</i>
        </div>
      </li>
      <li>
        <div>
          <div>
            <img src="../../assets/jk4.jpg" />
          </div>
          <p>过道B</p>
          <i>直播中</i>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
// import H5VideoPlayer from 'h5-video-player';
const poster = require("@/assets/default-img.png");
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped lang="less">
#container {
  .list {
    li {
      display: inline-block;
      width: 50%;

      > div {
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 5px #aaa;
        background-color: #fff;
        > div {
          position: relative;
          overflow: hidden;
          height: 100px;
          border-radius: 5px;
          background-color: #eee;
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 50%;
            height: 2.5rem;
            width: 2.5rem;
            background: url("../../assets/zanting.png") no-repeat center;
            background-size: cover;
            transform: translateY(-50%) translateX(50%);
          }
          img {
            object-position: 50% 50%;
            object-fit: cover;
            height: 100%;
            width: 100%;
          }
        }
        p {
          font-size: 0.7rem;
          padding: 5px 0;
        }
        i {
          font-size: 0.7rem;
          display: inline-block;
          // height: 30%;
          // width: 30%;
          color: #488adf;
          background-color: #f6f6fc;
        }
      }
    }
  }
}
</style>
