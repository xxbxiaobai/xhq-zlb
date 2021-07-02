<template>
  <div id="container">
    <!-- 头部开始 -->
    <van-nav-bar title="群介绍" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-icon name="add-o" class="icon_more" @click="show_tip = true" />
    <van-popup v-model="show_tip">
      <div class="more_tip">
        <ul>
          <li>
            <router-link :to="{
            path: '/same-city/crowdMember',
            query: {
              groupId: this.card.id,
              owner: this.card.userId,
              ownerName: this.card.linkMan,
              userid: this.userid,
            }
          }"> 群成员 </router-link>
          </li>
          <li v-show="this.card.flag !== '1'">
            <router-link :to="{
            path: '/same-city/postNews',
            query: {
              groupId: this.card.id,
              userid: this.userid
            }
          }"> 发布动态 </router-link>
          </li>
        </ul>
      </div>
    </van-popup>
    <!-- 头部结束 -->

    <!-- 基本信息开始 -->
    <div class="box-card">
      <div class="box-title">
        <strong>{{card.name}}</strong>
      </div>
      <div class="box-msg">
        <p class="box-date">联系人：{{card.linkMan||'暂无'}}</p>
        <div class="box-site">
          <p>咨询电话：{{card.phone||'暂无'}}</p>
          <a :href="'tel:'+card.phone" class="icon-phone"></a>
        </div>
      </div>
    </div>
    <!-- 基本信息结束 -->

    <!-- 介绍列表开始 -->
    <div class="box-introduce">
      <div class="box-title headline">群介绍</div>
      <div class="introduce">
        <p v-html="card.groupDetails||'暂无'"></p>
      </div>
    </div>
    <!-- 群动态开始 -->
    <div class="box-introduce">
      <div class="box-title headline">群动态</div>
      <!-- <div class="introduce"> -->
        <van-list 
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="introduce"
        >
          <div class="container" v-for="(item, index) in this.dynamicList" :key="index">
            <div class="left">
              <span class="data">{{ item.createTime.split('-')[1] }}/{{ item.createTime.split('-')[2] }}</span>
              <span class="year">{{ item.createTime.split('-')[0] }}</span>
            </div>
            <div class="right">
              <div class="img">
                <img :src="image.url" v-for="(image, key) in item.fileList" :key="key" />
              </div>
              <p> {{ item.content }}</p>
              <div class="comment" >
                <ul >
                  <li v-for="(comment, index) in item.commentList" :key="index">
                    <span class="name">{{ comment.userName }}:</span>
                    <span class="content">{{ comment.content }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="delete">
              <van-icon name="chat-o" class="icon_delete" @click="addChat(item.id)" />
              <van-icon name="delete" class="icon_delete" @click="deleteActivity(item.id)" />
            </div>
          </div>
        </van-list>
      <!-- </div> -->
    </div>
    <!-- 介绍列表结束 -->
    <!-- <router-link
      :to="{path:'/same-city/crowd/add',query:{id:card.id}}"
      v-if="!$route.query.flag == '1'"
    >
      <button id="go">申请加入</button>
    </router-link> -->
    <!-- 评论的弹出窗口 -->
    <van-dialog 
      v-model="show_chat" 
      @close="cancelChat" 
      show-cancel-button
      @confirm="confirmChat"
      >
       <van-field 
        v-model="chatMessage"
        rows="6"
        maxlength="100"
        autosize
        type="textarea"
        show-word-limit
        placeholder="请输入评论..." />
    </van-dialog>
  </div>
</template>

<script>
// import fitnessGuidance from "./components/fitness-guidance";
import { mapGetters } from "vuex";
import { zlbFun } from "@/util/Tool";
import { OrganizationById, findActivitylist, deleteGroupActivity , saveActivityComment, findCommentlist } from "@/http/api";
import phone from "@/components/Phone";
var comment_img = require("@/assets/benpao.png");
export default {
  data() {
    return {
      img: [require("@/assets/zwltsy.jpg")],
      comment_img,
      card: {},
      show_tip: false,
      show_chat: false,
      userid: '', // 用户id
      dynamicList: [], // 群动态列表
      chatMessage: '', // 评论内容
      activityId: '', // 评论的动态id
      loading: false,
      finished: false,
      page: 1,
      listLength: 1,
    };
  },
  components: {
    phone
  },
  created() {
    this.card = this.$route.query;
    this.userid = JSON.parse(localStorage.getItem("userLoginMsg")).id
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 删除群动态
    deleteActivity(id) {
      this.$dialog.confirm({
        title: '确定要删除嘛?',
      }).then(() => {
        deleteGroupActivity({
          id: id
        }).then(res => {
          if(res.code === 0) {
            this.findActivitylist()
            this.$toast.success('删除成功')
          }
        })
      }).catch(err => {
        console.log(err);
      });
    },
    addChat(index) {
      this.activityId = index
      this.show_chat = true
    },
    // 评论成功
    confirmChat() {
      if(this.chatMessage === '') {
        return this.$toast.fail('请输入评论内容')
      }
      saveActivityComment({
        content: this.chatMessage,
        groupId: this.card.id,
        activityId: this.activityId,
        userId: this.userid
      }).then(res => {
        if(res.code === 0) {
          this.$toast.success(res.msg)
          this.findCommentlist(this.activityId) // 刷新评论显示的列表
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 查询评论列表
    findCommentlist(activityId) {
      findCommentlist({
        activityId: activityId,
        page: 1,
        limit: 5
      }).then(res => {
        if(res.code === 0) {
          const activityId = res.data[0].activityId
          this.dynamicList.forEach(item => {
            if(item.id === activityId) {
              item.commentList = res.data
              return this.dynamicList
            }
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    cancelChat() {
      this.chatMessage = ''
    },
    // 获取群动态
    findActivitylist(page) {
      findActivitylist({
        groupId: this.card.id,
        page: page,
        limit: 3
      }).then(res => {
        if(res.code === 0) {
          this.loading = false
          res.data.forEach(item => {
            this.dynamicList.push(item)
          })
          this.listLength = res.count
        }
      }).catch(err => {
        this.loading = false
        console.log(err);
      })
    },
    onLoad() {
      if((this.page * 3 - this.listLength) > 2){
        this.finished = true;
      } else {
        this.findActivitylist(this.page)
        this.page++
      }
    },
  }
};
</script>
<style>
#container .van-swipe .van-swipe__indicators {
  bottom: 1.2rem;
}
</style>
<style scoped lang="less">
//=======================
//      公用混合
.icon(@w,@h,@l,@r,@img) {
  &::before {
    content: "";
    position: absolute;
    left: @l; //-1.05rem
    right: @r;
    height: @h; //0.75rem
    width: @w;
    background: url(@img) no-repeat center;
    background-size: 95%;
  }
}

.i(@img, @h: 1rem, @w: 1rem) {
  content: "";
  display: inline-block;
  height: @h;
  width: @w;
  background: url(@img) no-repeat center;
  background-size: 100%;
}
//=======================

#container {
  min-height: 100vh;
  min-width: 100vw;
  color: #333;
  background-color: #fff;
  //=======================
  //      图片展示
  //=======================
  .box-img {
    height: 10.85rem;
    width: 100vw;
  }
  /deep/.van-popup--center {
    top: 12%;
    left: 80%;
    border-radius: 5px;
  }
  .more_tip {
    font-size: 14px;
    li {
      width: 4rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }
  }
  .icon_more {
    position: absolute;
    right: 0;
    top: 0.6rem;
    z-index: 1001;
    padding: 0 10px;
    color: #1989fa;
  }
  #go {
    display: block;
    width: 95vw;
    height: 2rem;
    background-color: #1492ff;
    font-size: 0.7rem;
    color: #ffffff;
    font-weight: 500;
    margin: 20px auto;
    border-radius: 3px;
  }

  //=======================
  //      基本信息
  //=======================
  .box-card {
    position: relative;
    top: -0.8rem;
    margin-top: 1rem;
    width: 100vw;
    margin-bottom: -0.75rem;
    border-radius: 0.5rem;
    background-color: white;
    .box-msg {
      padding: 0 0.85rem 1rem 0.75rem;
      font-size: 0.7rem;
      color: #999;
      .box-phone {
        font-family: PingFang SC;
        position: absolute;
        left: 0.6rem;
        bottom: 0.7rem;
        color: #333333;
        font-size: 0.8rem;
        line-height: 0.8rem;
      }
      .box-site {
        position: relative;
        margin-right: 3rem;
        p {
          position: relative;
          padding-top: 0.6rem;
          padding-right: 1rem;
          font-size: 0.7rem;
          line-height: 0.7rem;
          span {
            font-size: 0.5rem;
            line-height: 0.5rem;
          }
        }
        .icon-phone {
          position: absolute;
          top: 50%;
          right: -2.95rem;
          height: 1.15rem;
          width: 1.15rem;
          background: url("../../../assets/phone.png") no-repeat center;
          background-size: 100%;
          transform: translateY(-50%);
        }
      }
      .box-date {
        position: relative;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
    }
  }
  //公用标题头
  .box-title {
    font-family: PingFang SC;
    display: flex;
    align-items: center;
    padding: 0.8rem 0.75rem 0 0.65rem;
    font-size: 0.8rem;
    font-weight: 700;
    &.headline::before {
      content: "";
      display: inline-block;
      margin-right: 0.5rem;
      height: 0.8rem;
      width: 0.15rem;
      background-color: #1492ff;
    }
    strong {
      display: block;
      margin-bottom: 0.8rem;
      font-size: 0.8rem;
      line-height: 1.2rem;
      color: #000000;
    }
  }
  //=======================
  //      介绍列表
  //=======================
  .box-introduce {
    border-top: 0.5rem solid #f6f7f8;
    background-color: white;
    .introduce {
      padding: 0.5rem 0.6rem 2rem 0.6rem;
      font-size: 0.7rem;
      .container {
        display: flex;
        position: relative;
        margin-bottom: 2rem;
        .left {
          padding: 0 10px;
          display: flex;
          width: 3.3rem;
          flex-direction: column;
          .data{
            font-size: 18px;
            font-weight: 700;
            display: flex;
            justify-content: flex-end;
          }
          .year{
            font-size: 14px;
            display: flex;
            justify-content: flex-end;
          }
        }
        .right {
          width: 100%;
          .comment {
            padding: 10px;
            background: #f8f8fa;
            border-radius: 5px;
            li {
              display: flex;
              margin: 5px 0;
              & > span:first-child {
                flex: 1;
                color: #3396ed;
              }
              & > span:last-child {
                flex: 5;
              }
            }
          }
          img {
            width: 4.5rem;
            height: 3.25rem;
            margin-right: 5px;
          }
        }
        .delete{
          position: absolute;
          bottom: -1.2rem;
          right: 0;
          display: flex;
          justify-content: center;
          .word_delete{
            margin-right:0.2rem;
            background-color: #E7E7E7;
            color: #FE3116;
            padding: 0 10px;
          }
          .icon_delete{
            margin-right: 0.8rem;
            font-size: 20px;
            color: #1989fa;
          }
        }
      }

      h3 {
        margin-top: 1.4rem;
        margin-bottom: 0.7rem;
        font-size: 0.8rem;
      }
      p {
        font-size: 0.7rem;
        line-height: 1.4rem;
      }
    }
  }
}
</style>
