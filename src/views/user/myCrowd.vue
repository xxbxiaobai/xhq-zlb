<template>
  <div id="container">
    <van-nav-bar title="健身群" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="nav-wrap">
      <!-- 搜索 -->
      <van-search
        class="serach-box"
        placeholder="请输入搜索关键词"
        @blur="handleSearch"
        v-model="params.name"
      />
    </div>
    <van-tabs v-model="activeName" color="#469AFE">
      <van-tab title="我创建的" name="a">
        <ul class="cont-list">
          <li class="list" v-for="(item,i) in contMe" :key="i">
            <router-link
              :to="{path:'/same-city/crowd/details',query:{
            groupDetails:item.groupDetails,
            createTime:item.createTime,
            linkMan:item.linkMan,
            phone:item.phone,
            name:item.name,
            id:item.id,
            userId:item.userid,
            }}"
            >
              <div class="list-cont">
                <img src="../../assets/jianshenqun@2x.png" />
                <strong>{{item.name}}</strong>
                <div>
                  <span>{{item.groupDetails}}</span>
                </div>
              </div>
            </router-link>
          </li>
          <van-empty description="没有更多啦" v-show="!contMe.length" />
        </ul>
      </van-tab>
      <van-tab title="我加入的" name="b">
        <ul class="cont-list">
          <li class="list" v-for="(item,i) in contP" :key="i">
            <router-link
              :to="{path:'/same-city/crowd/details',query:{
            groupDetails:item.groupDetails,
            createTime:item.createTime,
            linkMan:item.linkMan,
            phone:item.phone,
            name:item.name,
            id:item.id,
            flag:'1',
            }}"
            >
              <div class="list-cont">
                <img src="../../assets/jianshenqun@2x.png" />
                <strong>{{item.name}}</strong>
                <div>
                  <span>{{item.groupDetails}}</span>
                </div>
              </div>
            </router-link>
          </li>
          <van-empty description="没有更多啦" v-show="!contP.length" />
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { findFitnessGroup, findGroupMemberMe} from "@/http/api";
export default {
  data() {
    return {
      activeName: "a",
      params: {
        name: ""
      },
      contMe: [],
      contP: [],
      sub_contMe: [],
      sub_contP: []
    };
  },
  created() {
    this.getMyGroup();
    this.getMyApply()
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    handleSearch() {
       if(this.activeName == "a" && this.params.name){
           this.contMe = this.sub_contMe.filter((item,i)=>{
               return item.name.includes(this.params.name)
           })
       }else if(this.activeName == "b" && this.params.name){
           this.contP = this.sub_contP.filter((item,i)=>{
               return item.name.includes(this.params.name)
           })
       }else{
           this.contMe = this.sub_contMe
           this.contP = this.sub_contP
       }
    },
    getMyGroup() {
      findFitnessGroup({
        userId: JSON.parse(localStorage.getItem("userLoginMsg")).id
      })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.contMe = res.data
            this.sub_contMe = JSON.parse(JSON.stringify(this.contMe))
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMyApply(){
      findGroupMemberMe({
        userId: JSON.parse(localStorage.getItem("userLoginMsg")).id
      })
      .then(res=>{
        if(res.code == 0){
          this.contP = res.data
          this.sub_contP = JSON.parse(JSON.stringify(this.contP))
        }
      })
    }
  }
};
</script>
<style scoped lang="less">
/deep/.van-hairline--top-bottom::after {
  border: none;
}
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
