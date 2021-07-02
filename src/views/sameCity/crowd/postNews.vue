<template>
  <div>
    <van-nav-bar title="发布群动态" left-text="返回" right-text="发布" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-field
      v-model="content"
      class="input"
      rows="6"
      autosize
      type="textarea"
      maxlength="300"
      placeholder="输入要发布的内容..."
      show-word-limit
    />
    <div class="picture">
       <van-uploader v-model="fileList" :after-read="afterRead" @delete="afterDelete"  preview-size="96px" multiple :max-count="3" />
    </div>
  </div>
</template>

<script>
import { saveFitnessGroupActivity, modifyUserImg } from '@/http/api'
import axios from 'axios'
export default {
  name: 'postNews',
  data () {
    return {
      content: '',
      groupId: '',
      fileList: [],
      queryInfo: {}, // 传参信息
      imageList: [],
      addLoading: false,
    }
  },
  created() {
    this.queryInfo = this.$route.query
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    afterRead(e) {
      let img = new FormData()
      img.append("file", e.file)
      const config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" }
      }
      axios.post(
        modifyUserImg,
        img,
        config
      ).then(res => {
        if(res.data.resp_code === 0) {
          const image = res.data.datas.id
          this.imageList.push(image) 
        }
      }).catch(err => {
        console.log(err);
      });
    },
    afterDelete(file, index) {
      this.imageList.splice(index.index , 1)
    },
    onClickRight() {
      if(this.content === '') {
        return this.$toast.fail('请输入动态内容')
      }
     this.$dialog.confirm({
        title: '是否发布?',
      }).then(() => {
        // 确认发布
        let imageListStr = ''
        this.imageList.forEach(item => {
          imageListStr = item + ',' + imageListStr
        })
        // 调用发布的方法
        saveFitnessGroupActivity({
          fileId: imageListStr,
          content: this.content,
          groupId: this.queryInfo.groupId,
          userid: this.queryInfo.userid,
        }).then(res => {
          if(res.code === 0) {
            this.$router.push('/success')
          }
        }).catch(err => {
          console.log(err)
          this.addLoading
        })
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style lang="less" scoped>
.input{
  padding: 0.5rem 1.2rem;
}
.picture{
  padding: 0.8rem 1.4rem;
}
.navRight{
  color: #1989fa;
}
</style>