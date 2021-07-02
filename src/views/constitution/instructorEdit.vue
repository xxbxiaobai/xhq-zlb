<template>
  <div class="edit">
    <van-nav-bar
      title="指导项目发布"
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field class="project" v-model="project" label="项目" placeholder="请填写项目名称" />
    <div class="pictures">
      <span class="title">图片</span>
      <div class="picture">
       <van-uploader v-model="fileList" :after-read="afterRead" @delete="afterDelete"  preview-size="96px" multiple :max-count="3" />
    </div>
    </div>
    <van-field class="address"  v-model="time" label="发布时间" placeholder="点击选择时间" readonly @click="pickTime"/>
    <van-field class="address" rows="3" v-model="remark" label="备注" placeholder="请填写备注（非必填）" autosize type="textarea" />
    <van-field class="address" v-model="address" label="位置" placeholder="请填写位置" autosize type="textarea" />


    <van-popup v-model="showDatetime" round position="bottom" :style="{ height: '50%' }" > 
      <van-datetime-picker
        type="date"
        title="选择发布时间"
        :min-date="minDate"
        @confirm="confirmTime"
        @cancel="cancelTime"
      />
    </van-popup>

  </div>
</template>

<script>
import { modifyUserImg, saveInstructorRecord } from '@/http/api'
import axios from 'axios'
import { formatDateTimeBack } from '../../util/Tool'
export default {
  name: 'instructorEdit',
  data () {
    return {
      project: '',
      address: '',
      remark: '', // 备注
      fileList: [],
      imageList: [],
      userId: '', // 用户id
      time: '', // 选择时间
      showDatetime: false, // 选择时间
      minDate: new Date(2020, 0, 1),
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('userLoginMsg')).id
    
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      if(this.project === '' || this.address === '' || this.time === '') {
        return this.$toast.fail('缺少必填信息')
      }
      this.$dialog.confirm({
        title: '是否发布',
      }).then(() => {
        const title = this.project
        const address = this.address
        const time = this.time
        this.saveInstructorRecord(title, address, time)
      }).catch(err => {
        console.log(err);
      });

      
    },
    // 图片上传处理
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
    // 选择发布时间
    pickTime() {
      this.showDatetime = true
    },
    // 确定时间选择
    confirmTime(value) {
      this.time = formatDateTimeBack(value)
      this.showDatetime = false
    },
    //取消时间选择
    cancelTime() {
      this.showDatetime = false
    },

    // 发布/编辑指导记录
    saveInstructorRecord(title, address, time) {
      // 确认发布
      let imageListStr = ''
      this.imageList.forEach(item => {
        imageListStr = item + ',' + imageListStr
      })
      saveInstructorRecord({
        fileId: imageListStr,
        addr: address,
        guideTime: time,
        title: title,
        remark: this.remark,
        instructorId: this.$route.query.instructorId,
        userId: this.userId,
      }).then(res => {
        if(res.code === 0) {
          this.$router.push('/success')
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.edit {
  height: 100%;
  background-color: #f6f8f7;
}
.project{
  margin-top: 10px;
}
.pictures{
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 16px;
  .title{
    font-size: 14px;
    display: block;
  }
  .picture{
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0.6rem;
  }
}
.address{
  margin-top: 10px;
}
</style>