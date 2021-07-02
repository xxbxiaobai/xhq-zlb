<template>
  <div>
    <van-nav-bar 
      title="群成员"
      left-text="返回"
      left-arrow 
      @click-left="onClickLeft"
    >
      <template #right >
        <span v-if="adminShow" class="navRight" @click="onClickRight">删除</span>
      </template>
    </van-nav-bar>
    <van-search v-model="value" placeholder="请输入要搜索的成员" />
    <div class="member_count">群主、群成员（{{ this.allPeople }}人）</div>
    <div class="master">
        <img :src="comment_img" alt="">
        <span class="owner">群主</span>
        <span>{{(this.card.owner === this.card.userid) ? '本人' : this.card.ownerName}}</span>
    </div>
    <van-list 
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-checkbox-group v-if="adminShow" v-model="result">
        <van-checkbox :name="item.id" class="user" v-for="(item, index) in userList" :key="index">
          <img :src="item.url ? item.url : comment_img" alt="">
          <span class="name">{{ item.userName }}</span>
        </van-checkbox>
      </van-checkbox-group>
       <div v-else label-disabled :name="item.id" class="user" v-for="(item, index) in userList" :key="index">
        <img :src="item.url ? item.url : comment_img" alt="">
        <span class="name">{{ item.userName }}</span>
      </div>
    </van-list>
  </div>
</template>
<script>
var comment_img = require("@/assets/benpao.png");
import { getFitnessGroupMemberList, deleteMoreMember } from '@/http/api'
export default {
  data() {
    return {
      value: "",
      comment_img,
      result: [],
      card: {},
      userList: [],
      allPeople: 1,
      loading: false,
      finished: false,
      page: 1,
      listLength: 1,
      adminShow: false,
    };
  },
  created() {
    this.card = this.$route.query
    if (String(this.card.owner) === String(this.card.userid)) {
      return this.adminShow = true
    } else {
      return this.adminShow = false
    }
    // this.getFitnessGroupMemberList()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if(this.result.length === 0) {
        return this.$toast.fail('未选择群成员！')
      }
      this.$dialog.confirm({
        title: '确定要删除嘛?',
      }).then(() => {
        this.deleteMoreMember()
      }).catch(err => {
        this.result === []
        console.log(err);
      });
    },
    // 获取群员
    getFitnessGroupMemberList(page) {
      getFitnessGroupMemberList({
        name: '',
        groupId: this.card.groupId,
        page: page,
        limit: 20
      }).then(res => {
        if(res.code === 0) {
          this.listLength = res.count
          this.allPeople = res.count + 1
          this.loading = false
          res.data.forEach(item => {
            this.userList.push(item)
          })
        } else {
          this.loading = false
        }
      })
    },
    // 删除群成员
    deleteMoreMember() {
      let userList = ''
      this.result.forEach(item => {
        userList = item + ',' + userList
      })
      deleteMoreMember({
        Ids: userList
      }).then(res => {
        this.$toast.success('删除成功')
        this.allPeople = this.allPeople - this.result.length
        this.result = []
        this.userList = []
        this.finished = false
        this.getFitnessGroupMemberList()
      })
    },
    onLoad() {
      if((this.page * 10 - this.listLength) > 9){
        this.finished = true;
      } else {
        this.getFitnessGroupMemberList(this.page)
        this.page++
      }
    }
  }
};
</script>
<style lang="less" scoped>
.navRight{
  color: #1493FF;
}
.member_count{
  font-size: 14px;
  padding:0 1rem;
}
.master{
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  font-size: 14px;
  img{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    vertical-align: middle;
  }
  .owner{
    display: block;
    background-color: #1493FF;
    color: #FFFFFF;
    border-radius: 20px;
    text-align: center;
    margin: 0 0.5rem;
    padding: 0 10px;
  }
}
.user{
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 1rem;
  font-size: 14px;
  img{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    vertical-align: middle;
  }
  .name{
    padding: 0 10px;
  }
  // /deep/ .van-checkbox__icon{
  //   display: none;
  // }
}
</style>