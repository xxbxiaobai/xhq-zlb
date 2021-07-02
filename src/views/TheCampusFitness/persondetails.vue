<template>
  <div class="Bigcont">
    <!-- 3.在页面使用这个组件 -->
    <van-form ref="checkfrom" @submit="onSubmit">
      <!-- 全边框 -->
      <div class="van-hairline--surround">
        <van-cell title="个人照片" icon="location-o">
          <van-uploader :after-read="afterRead" capture="camera">
            <div style="font-weight: bold; color: #33A870;">
              <label for="" slot="default">更换照片</label>
            </div>
          </van-uploader>
          <van-icon class="iconfont icon-shuxian" slot="icon"></van-icon>
          <!-- <van-cell title="头像" icon="location-o"  > -->
          <van-image
            @click="PreviewPicture"
            round
            width="4rem"
            height="4rem"
            :src="avatar"
            fit="cover"
          />
        </van-cell>
        <!-- 输入任意文本 -->
        <van-field
          class="iconfont icon-shuxian"
          v-model="username"
          name="username"
          label="姓名"
          placeholder="请输入姓名"
          input-align="right"
          readonly
        />
        <van-field
          class="iconfont icon-shuxian"
          v-model="cardNumb"
          name="cardNumb"
          type="digit"
          label="卡号"
          placeholder="请输入卡号"
          input-align="right"
        />
        <van-field
          v-model="sex"
          readonly
          clickable
          label="性别"
          placeholder="请选择性别"
          input-align="right"
          @click="showPicker = true"
        >
          <van-icon class="iconfont icon-shuxian" slot="left-icon"></van-icon>
          <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
        </van-field>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>

        <van-field
          v-model="cerType"
          readonly
          clickable
          name="DocumentType"
          label="证件类型"
          placeholder="请选择证件类型"
          input-align="right"
        >
          <van-icon class="iconfont icon-shuxian" slot="left-icon"></van-icon>
          <!-- <van-icon class="iconfont icon-next" slot="right-icon"></van-icon> -->
        </van-field>
        <!-- <van-popup v-model="showPicker1" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns1"
            @confirm="onConfirm1"
            @cancel="showPicker1 = false"
          />
        </van-popup> -->
        <van-field
          class="iconfont icon-shuxian"
          v-model="cerNum"
          name="idnum"
          label="身份证"
          placeholder="请输入证件号"
          input-align="right"
          readonly
        />
        <van-field
          class="iconfont icon-shuxian"
          v-model="Phone"
          name="mobile"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
          input-align="right"
          @blur="focusPrice($event)"
          readonly
        />
        <van-field
          v-model="community"
          readonly
          clickable
          label="所属社区"
          placeholder="请选择社区"
          input-align="right"
          @click="showPicker2 = true"
        >
          <van-icon class="iconfont icon-shuxian" slot="left-icon"></van-icon>
          <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
        </van-field>
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns2"
            @confirm="onConfirm2"
            @cancel="showPicker2 = false"
            @change="onChange"
          />
        </van-popup>

        <van-field
          v-model="Record"
          label="学历"
          readonly
          clickable
          placeholder="请选择学历"
          input-align="right"
          @click="showPicker3 = true"
        >
          <van-icon class="iconfont icon-shuxian" slot="left-icon"></van-icon>
          <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
        </van-field>
        <van-popup v-model="showPicker3" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns3"
            @confirm="onConfirm3"
            @cancel="showPicker3 = false"
          />
        </van-popup>
        <van-field
          class="iconfont icon-shuxian"
          v-model="Address"
          label="现住址"
          placeholder="请输入现住地址"
          input-align="right"
        />
      </div>
      <center style="text-align: -moz-center;">
        <van-button
          style=" background-color: #28CFB3; border: 0; margin-top: 20px; font-size: 16px; width: 230px; height: 40px;"
          round
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </center>
      <van-field style="display: none;" name="id" v-model="keyID"></van-field>
      <van-field
        style="display: none;"
        name="cmyId"
        v-model="cmyId"
      ></van-field>
      <!-- <van-field style="display: none;" name="upload" v-model="upload"></van-field> -->
      <van-field style="display: none;" name="sex" v-model="sexStr"></van-field>
    </van-form>
  </div>
</template>

<script>
import { PersonareaAction,Persondetail,userImg,detailUpdate,baseFiles } from "../../http/api";
// import NavBar from '@/components/NavBar/Navbar'
// import domain from '../../domain.js'
// import imageConversion from 'image-conversion'
import {
  Toast,
  ImagePreview,
  Dialog
} from 'vant'
export default {
  components: {
    [Toast.name]: Toast,
    [ImagePreview.name]: ImagePreview,
    [Dialog.name]: Dialog
  },

  data() {
    return {
      username: '',
      cardNumb: '',
      sex: '',
      cerType: '身份证',
      cerNum: '',
      Phone: '',
      community: '',
      Record: '',
      Address: '',
      keyID: '',
      cmyId: '3',
      upload: '',
      sexStr: '',
      isHead: '',
      phoneStr: '',
      columns: ['男', '女'],
      //   columns1: ['身份证', '驾驶证'],
      columns2: [
        {
          // eslint-disable-next-line no-undef
          values: '',
          className: 'column1'
        },
        {
          values: '',
          className: 'column2'
        }
      ],
      columns3: ['博士生', '研究生', '本科', '专科', '高中', '初中', '小学'],
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,

      avatar: require('./images/Mrtx2.png'),
      RecordID: '',
      headerimage: null,
      identity: ''
    }
  },
  // 计算属性
  computed: {

  },
  // 函数要在这个方法下面添加
  methods: {
    focusPrice($even) {
      // alert($even.target.value)
      if ($even.target.value !== this.phoneStr) {
        Dialog.alert({
          title: '提示',
          message: '您修改的手机号和登录手机号不一致！'
        }).then(() => {
          // on close
        })
      }
    },
    // 头像预览
    PreviewPicture() {
      if (this.isHead === '') {
        return
      }
      ImagePreview({
        images: [this.avatar]
        // showIndex: false
      })
    },
    Listdetails(idCardNo) {
     Persondetail({
        idCardNo: idCardNo,
      })
        .then(response => {
          console.log(response.data)
          // eslint-disable-next-line eqeqeq
          if (response.code == 0) {
            var str = response.data
            // alert(str)
            this.username = str.username
            this.cardNumb = str.cardNo
            this.cerNum = str.idCardNo
            this.sex = str.sex === 1 ? '男' : '女'
            this.sexStr = str.sex
            this.Phone = str.mobile
            this.community = str.cmyName
            this.cmyId = str.cmyId
            var index11 = parseInt(str.education)
            // console.log(index11)
            this.Record = this.columns3[index11 - 1]
            this.RecordID = str.education
            this.Address = str.curAddress
            this.avatar =userImg +str.headFileId
            // 判断头像数据
            this.isHead = str.headFileId
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    TabonClick(name, title) {
      // Toast(title);
    },
    onConfirm(val) {
      this.sex = val
      this.sexStr = val === '男' ? '1' : '0'
      this.showPicker = false
    },
    onConfirm1(val) {
      this.cerType = val
      this.showPicker1 = false
    },
    onConfirm2(val) {
      this.community = val[1].text
      this.showPicker2 = false
      this.cmyId = val[1].id
    },
    onConfirm3(val, index) {
      this.Record = val
      this.showPicker3 = false
      this.RecordID = index + 1
    },
    onChange(picker, value, index) {
      console.log(picker.className)
      console.log(`当前值：${value[0].text}, 当前索引：${index}`)
      // eslint-disable-next-line eqeqeq
      if (this.columns2[1]) {
        // alert(111111)
      }
      this.TheStreet(value[0].id)
    },
    onSubmit() {
      if (this.isHead === '' && this.isHead.length === 0) {
        Toast('个人照片不能为空')
        return
      } else if (this.username === '') {
        Toast('姓名不能为空')
        return
      } else if (this.sexStr === '') {
        Toast('性别不能为空')
        return
      } else if (this.cerNum === '') {
        Toast('身份证号不能为空')
        return
      } else if (this.Phone === '') {
        Toast('手机号不能为空')
        return
      } else if (this.cmyId === '' || this.community.length === 0 || !this.cmyId) {
        Toast('所属社区不能为空')
        return
      } else if (this.RecordID === '' || this.RecordID.length === 0 || !this.RecordID) {
        Toast('学历不能为空')
        return
      } else if (this.Address === '') {
        Toast('现住址不能为空')
        return
      }
      this.FormValidation()
    },
    // 表单验证
    FormValidation() {
      // alert(1111111111);
      Toast.loading({
        message: '请稍等...',
        forbidClick: true,
        duration: 0
      })
      // var formdata = new FormData()
      // if (!this.identity) {
      //   formdata.append('headFileId', this.isHead)
      // } else {
      //   formdata.append('headFileId', this.identity)
      // }
      // formdata.append('cmyId', this.cmyId)
      // formdata.append('idCardNo', this.cerNum)
      // formdata.append('mobile', "15839263540")
      // formdata.append('username', this.username)
      // formdata.append('sex', this.sexStr)
      // formdata.append('education', this.RecordID)
      // formdata.append('curAddress', this.Address)
      // console.log(formdata)

      // console.log(formdata.get('cmyId'))
      // console.log(formdata.get('idCardNo'))
      this.SubmitToSave()
    },
    // 提交保存
    SubmitToSave(va) {
      //   console.log(Qs.stringify(va))
      var fileID;
      if (!this.identity) {
        fileID= this.isHead;
      } else {
        fileID=this.identity;
      }
      detailUpdate({
        headFileId: fileID,
        cmyId: this.cmyId,
        idCardNo: this.cerNum,
        mobile: this.Phone,
        username: this.username,
        sex: this.sexStr,
        education: this.RecordID,
        curAddress: this.Address,
      })
        .then(response => {
          console.log(response.data)
          // 取消等待
          Toast.clear()
          // eslint-disable-next-line eqeqeq
          if (response.code == 0) {
            var str = response.data
            // alert('11111111');
            // this.count = response.data.data.length
            // this.list = response.data;
            // response.data.data.forEach(item => {
            //   this.listconten.push(item);
            // })
            Dialog.alert({
              title: '提示',
              message: '修改成功'
            }).then(() => {
              // on close
              this.$router.push({
                path: '/personList',
                name: 'personList',
                query: {
                  phone: str.mobile
                }
              })
            })
          } else {
            Toast(response.msg)
          }
        })
        .catch(function(error) {
          console.log(error)
          // 取消等待
          Toast.clear()
          Toast(error)
        })
    },
    // 区域街道选择
    BelongingTheCommunity() {
    PersonareaAction({
        parentId: 4,
      })
        .then((response) => {
          console.log(response);
          if (response.code == 0) {
            this.TheStreet(response.data[0].id)
            response.data.forEach(item => {
              this.columns2[0].values = Object.values(response.data).map(
                function(e) {
                  return { text: e.name, id: e.id }
                }
              )
            })
          }
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    TheStreet(id) {
      PersonareaAction({
        parentId: id,
      })
        .then((response) => {
          console.log(response);
          if (response.code == 0) {
            response.data.forEach(item => {
              this.columns2[1].values = Object.values(response.data).map(
                function(e) {
                  return { text: e.name, id: e.id }
                }
              )
            })
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 图片上传
    afterRead(file) {
      // console.log(file)
      Toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0
      })
      baseFiles({
        base: file.content,
      })
        .then(response => {
          if (response.resp_code === 0) {
            // alert(1111111111);
            this.avatar =userImg +response.datas.id
            this.identity = response.datas.id
            this.isHead = response.datas.id
            // 取消等待
            Toast.clear()
          } else {
            Toast(response.resp_msg)
            // 取消等待
            Toast.clear()
          }
        })
        .catch(function(error, XMLHttpRequest, textStatus, errorThrown) {
          console.log(error)
          // 取消等待
          Toast.clear()
        })
      // })
      // 此时可以自行将文件上传至服务器
    },
    // 图片压缩
    compress(img, callback) {
      img.onload = () => {
        const limitWidth = arguments[2] ? arguments[2] : 640
        const width = img.width > limitWidth ? limitWidth : img.width
        const height =
          img.width > limitWidth
            ? parseInt((img.height * limitWidth) / img.width)
            : img.width
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, width, height)
        callback(canvas.toDataURL('img/jpeg'))
      }
    }
  },

  // eslint-disable-next-line no-dupe-keys
  created() {
    this.idCardNo = this.$route.query.idCardNo
    this.phoneStr = JSON.parse(sessionStorage.getItem("userInfo")).mobile
    // alert(this.keyID);
    this.Listdetails(this.idCardNo)
    this.BelongingTheCommunity()
  }
  //   beforeCreate() {
  //     document.querySelector('body').setAttribute('style', 'background:#F6FAFD')
  //   },
  //   beforeDestroy() {
  //     document.querySelector('body').setAttribute('style', '')
  //   }
}
</script>
<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif  !important; 
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
</style>
<style lang="less" scoped>
body {
  width: 100%;
  height: 100%;
  //   position: relative;
  background-color: #f6fafd;
}
/deep/.van-nav-bar__right .van-nav-bar__text {
  color: #33a870;
  font-size: 16px;
}
/deep/.icon-shuxian::before {
  color: #33a76f;
}
/deep/.van-tabs__line {
  background-color: #33a76f;
}
/deep/.iconfont {
  font-size: 14px;
  align-self: center;
}
/deep/.van-field__left-icon {
  margin-right: 0px;
}
/deep/.van-form {
  padding: 10px;
}
/deep/.van-cell__title {
  text-align: left;
  align-self: center;
}
/deep/.van-uploader {
  float: left;
  margin-top: 23px;
  margin-left: 20px;
}
</style>
