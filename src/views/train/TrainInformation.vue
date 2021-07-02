<template>
  <div id="home">
    <Tabar :title="title"></Tabar>
    <div class="box">
      <p>姓名</p>
      <input type="text" placeholder="请输入姓名" v-model="name" @blur="checkname" :readonly="showName" />
    </div>
    <div class="box">
      <p>证件号码</p>
      <input type="text" placeholder="请输入证件号码" v-model="card" @blur="checkcard" :readonly="showCard" />
    </div>
    <div class="box">
      <p>手机号码</p>
      <input type="text" placeholder="请输入手机号码" v-model="number" @blur="checktel" :readonly="showNum" />
    </div>
    <div class="box-number">
      <div class="select">
        <p>联系地址</p>
        <div class="list" @click="onlist">
          <span>{{value1}}</span>
          <ul :class="{clicklist:isshow}">
            <li @click.stop="onclick(index,item.id)" v-for=" (item,index) in arealist" :key="item.id">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="select distance">
        <!-- <p>&nbsp;</p> -->
        <div class="list" @click="sonlist">
          <span>{{value2}}</span>
          <ul :class="{clicklist:sonisshow}">
            <li @click.stop="onclickson(index,item.id)" v-for=" (item,index) in sonarealist" :key="index">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box">
      <input type="text" v-model="address" @blur="checktext" />
    </div>
    <div class="select-item">
      <p>培训项目</p>
      <div class="list" @click="onitems">
        <span>{{value}}</span>
        <ul :class="{clickitems:isitem}">
          <li @click.stop="onclickitem(index)" v-for=" (i,index) in datalist" :key="index">{{i}}</li>
        </ul>
      </div>
    </div>
    <div class="tig">*上传材料（复印件、扫描件、或照片）</div>
    <div class="file">
      <div class="certificates-a" v-show="$route.params.level===1||$route.params.level===2">
        <p>社会体育指导员证书</p>
        <van-uploader v-model="fileList1" multiple :after-read="afterRead" @delete="delImgidcard" :before-read="beforeRead">
          <div class="box-a"></div>
        </van-uploader>
      </div>
      <div class="certificates-b">
        <p>身份证照片</p>
        <van-uploader v-model="fileList2" :max-count="2" multiple :after-read="afterRead1" :before-read="beforeRead" @delete="delImgapp">
          <div class="box-b"></div>
        </van-uploader>
      </div>
      <div class="physical">
        <p>申请审批表</p>
        <van-uploader v-model="fileList3" multiple :after-read="afterRead2" :before-read="beforeRead" @delete="delImgtable">
          <div class="box-t"></div>
        </van-uploader>
      </div>
    </div>
    <div class="bottom">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import { zlbFun } from "@/util/Tool"
import { area, base, uploadImage, subtrain } from "../../http/api"
import Tabar from "../../components/Tabar"
import { mapGetters } from "vuex"
var i = 0
var j = 0
var k = 0
export default {
  data() {
    return {
      status: null,
      title: "填写资料",
      value: "- 请选择 -",
      value1: "- 请选择 -",
      value2: "- 请选择 -",
      datalist: [],
      arealist: [],
      sonarealist: [],
      isshow: false,
      sonisshow: false,
      isitem: false,
      fileList1: [],
      fileList2: [],
      fileList3: [],
      name: "",
      card: "",
      number: "",
      address: "",
      instructor: [], //指导员证书
      identity: [], //身份证照片
      application: [], //申请审批表
      sid: 0, //市的id,
      qid: 0, //区的id
      upimgshow: true, //上传图片延迟加载
      delindex: [],
      delimg: [],
      deltab: [],
      showName: false,
      showNum: false,
      showCard: false
    }
  },
  components: {
    Tabar
  },
  methods: {
    onlist() {
      this.isshow = true
    },
    sonlist() {
      this.sonisshow = true
    },
    onclick(index, id) {
      // console.log(index)
      // console.log(this.arealist[index].data)
      this.value2 = "- 请选择 -"
      this.sid = id
      this.sonarealist = this.arealist[index].data
      this.value1 = this.arealist[index].name
      this.isshow = false
      // console.log(this.sid)
    },
    onclickson(index, id) {
      this.value2 = this.sonarealist[index].name
      this.qid = id
      this.sonisshow = false
      // console.log(this.qid)
    },
    onitems() {
      this.isitem = true
    },
    onclickitem(index) {
      this.value = this.datalist[index]
      this.isitem = false
    },
    getarea() {
      area({}).then(res => {
        console.log(res)
        this.arealist = res.data
        console.log(this.arealist)
      })
    },
    checkname() {
      var pass = this.validata.checkname(this.userInformation.realname)
      if (!pass) {
        this.$toast("姓名格式不正确")
        return false
      }
      return true
    },
    checktext() {
      var pass = this.validata.checktext(this.address)
      // console.log(pass)
      if (!pass) {
        this.$toast("内容不能为空")
        return false
      }
      return true
    },
    checkcard() {
      var id = this.validata.identify(this.userInformation.idCardNo)
      if (!id) {
        this.$toast("身份证号码输入错误")
        return false
      }
      return true
    },
    checktel() {
      var num = this.validata.number(this.userInformation.mobile)
      if (!num) {
        this.$toast("电话号码输入错误")
        return false
      }
      return true
    },
    checkupload() {
      if (this.identity.length && this.application.length) {
        return true
      }
      this.$toast("请上传图片")
      return false
    },
    // 验证下拉菜单
    checkselect() {
      if (this.value === "- 请选择 -") {
        return false
      } else if (this.value === "- 请选择 -") {
        return false
      } else if (this.value1 === "- 请选择 -") {
        return false
      } else if (this.value1 === "- 请选择 -") {
        return false
      }
      return true
    },
    //证书
    afterRead(file) {
      file.index = i++
      console.log(file)
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner"
      })
      const that = this
      that.avatar_filename = file.file.name
      const img = new Image()
      img.src = file.content
      this.compress(img, compressRes => {
        base({
          base: compressRes
        }).then(res => {
          console.log(res)
          if (res.resp_code == 0) {
            this.instructor.push(res.datas.id)
          }
          console.log(this.instructor)
        })
      })
      // 此时可以自行将文件上传至服务器
    },
    //身份
    afterRead1(file) {
      file.index = j++
      console.log(file)
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner"
      })
      const that = this
      that.avatar_filename = file.file.name
      const img = new Image()
      img.src = file.content
      this.compress(img, compressRes => {
        base({
          base: compressRes
        }).then(res => {
          console.log(res)
          if (res.resp_code == 0) {
            this.identity.push(res.datas.id)
          }
          console.log(this.identity)
        })
      })
      // 此时可以自行将文件上传至服务器
    },
    //审批表
    afterRead2(file) {
      file.index = k++
      console.log(file)
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner"
      })
      const that = this
      that.avatar_filename = file.file.name
      const img = new Image()
      img.src = file.content
      this.compress(img, compressRes => {
        base({
          base: compressRes
        }).then(res => {
          console.log(res)
          if (res.resp_code == 0) {
            this.application.push(res.datas.id)
          }
          console.log(this.application)
        })
      })
    },
    //校验图片
    beforeRead(file) {
      // console.log(file)
      if (file.type == "image/jpeg" || file.type == "image/png") {
        return true
      }
      return this.$toast.fail("请上传 jpg 格式图片")
    },
    submit() {
       this.$router.push({ name: "trainsubmit", params: { status: this.status||1 } })
    },
    //排序
    mysort(a, b) {
      return a - b
    },
    //图片压缩
    compress(img, callback) {
      img.onload = () => {
        const limitWidth = arguments[2] ? arguments[2] : 640
        const width = img.width > limitWidth ? limitWidth : img.width
        const height = img.width > limitWidth ? parseInt((img.height * limitWidth) / img.width) : img.width
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = width
        canvas.height = height
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, width, height)
        callback(canvas.toDataURL("img/jpeg"))
      }
    },
    //删除上传图片
    delImgidcard(file) {
      console.log(file)
      console.log(file.index)
      this.delindex.push(file.index)
      console.log(this.delindex)
    },
    delImgapp(file) {
      console.log(file)
      console.log(file.index)
      this.delimg.push(file.index)
      // this.application.splice(file.index, 1)
      // console.log(this.application)
    },
    delImgtable(file) {
      console.log(file)
      console.log(file.index)
      this.deltab.push(file.index)
      // this.application.splice(file.index, 1)
      // console.log(this.application)
    },
    //最终上传的图片
    sureimga() {
      this.delindex = this.delindex.sort(this.mysort)
      console.log(this.delindex)
      var len = this.delindex.length
      console.log(len)
      console.log()
      while (len--) {
        console.log(len)
        this.instructor.splice(this.delindex[len], 1)
      }
      console.log(this.instructor)
    },
    sureimgb() {
      this.delimg = this.delimg.sort(this.mysort)
      console.log(this.delimg)
      var len = this.delimg.length
      while (len--) {
        this.identity.splice(this.delimg[len], 1)
      }
      console.log(this.identity)
    },
    sureimgc() {
      this.deltab = this.deltab.sort(this.mysort)
      console.log(this.deltab)
      var len = this.deltab.length
      console.log(len)
      console.log()
      while (len--) {
        console.log(len)
        this.application.splice(this.deltab[len], 1)
      }
      console.log(this.application)
    },
    //脱敏
    noPassByName(str) {
      console.log(str)
      if (null != str && str != undefined) {
        if (str.length <= 3) {
          return "*" + str.substring(1, str.length)
        } else if (str.length > 3 && str.length <= 6) {
          return "**" + str.substring(2, str.length)
        } else if (str.length > 6) {
          return str.substring(0, 2) + "****" + str.substring(6, str.length)
        }
      } else {
        return ""
      }
    },
    idCardNo(value, row, index) {
      var len = value.length
      var xx = value.substring(1, len - 1)
      var values = value.replace(xx, "****************")
      return values
    },
    mobile(value, row, index) {
      var len = value.length
      var xx = value.substring(3, len - 4)
      var values = value.replace(xx, "****")
      return values
    }
  },
  computed: {
    ...mapGetters(["userMsg", "userInformation"])
  },

  created() {
    console.log(11)
    console.log(this.$route.params.level)
    console.log(JSON.parse(this.userMsg).userId, 11)
    zlbFun("填写资料")
    this.getarea()
    this.datalist = this.$route.params.item.split(",")
    console.log(this.userInformation)
    if (this.userInformation.realname) {
      this.showName = true
      this.name = this.userInformation.realname
    }
    if (this.userInformation.mobile) {
      this.showNum = true
      this.number = this.userInformation.mobile
    }
    if (this.userInformation.idCardNo) {
      this.showCard = true
      this.card = this.userInformation.idCardNo
    }
    this.name = this.noPassByName(this.name)
    this.card = this.idCardNo(this.card)
    this.number = this.mobile(this.number)
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #fff;
  position: relative;
  .box {
    padding: 0.5rem 0.6rem 0 0.6rem;
    p {
      font-size: 0.7rem;
      color: #333333;
      margin-bottom: 0.5rem;
    }
    input {
      border: 1px solid rgba(231, 231, 231, 1);
      width: 100%;
      height: 1.8rem;
      padding-left: 0.5rem;
      font-size: 0.7rem;
      -webkit-appearance: none;
      &::placeholder {
        // transform: translate(0, -0.1rem);
      }
    }
  }
  .box-number {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.6rem 0 0.6rem;
    .number {
      p {
        font-size: 0.7rem;
        color: #333333;
        margin-bottom: 0.5rem;
      }
      input {
        border: 1px solid rgba(231, 231, 231, 1);
        width: 8.25rem;
        height: 1.8rem;
        padding-left: 0.5rem;
        font-size: 0.7rem;
        -webkit-appearance: none;
        // input输入框placeholder文字居中
        &::placeholder {
          // transform: translate(0, -0.1rem);
        }
      }
    }
    .select {
      font-size: 0.7rem;
      color: #333333;
      p {
        margin-bottom: 0.5rem;
      }
      .list {
        width: 8.25rem;
        height: 1.8rem;
        position: relative;
        border: 1px solid rgba(231, 231, 231, 1);
        border-radius: 0.25rem;
        span {
          display: block;
          height: 1.8rem;
          line-height: 1.8rem;
          font-size: 0.65rem;
          color: #999999;
          box-sizing: border-box;
          padding-left: 0.25rem;
        }
        ul {
          position: absolute;
          top: 1.75rem;
          left: 0;
          width: 100%;
          margin: 0;
          padding-left: 0.5rem;
          border: 0.05rem solid #f1f1f1;
          border-radius: 0.15rem;
          overflow: hidden;
          display: none;
          background-color: #fff;
          z-index: 22;
          li {
            height: 1.5rem;
            line-height: 1.5rem;
            font-size: 0.7rem;
            background: #fff;
          }
        }
        .clicklist {
          display: block !important;
        }
      }
    }
    .distance {
      margin-top: 1.48rem;
    }
  }
  .select-item {
    font-size: 0.7rem;
    color: #333333;
    padding: 0.5rem 0.6rem 0 0.6rem;
    p {
      margin-bottom: 0.5rem;
    }
    .list {
      width: 100%;
      height: 1.8rem;
      position: relative;
      border: 1px solid rgba(231, 231, 231, 1);
      border-radius: 0.25rem;
      span {
        display: block;
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 0.65rem;
        color: #999999;
        box-sizing: border-box;
        padding-left: 0.25rem;
      }
      ul {
        position: absolute;
        top: 1.75rem;
        left: 0;
        width: 100%;
        margin: 0;
        padding-left: 0.5rem;
        border: 0.05rem solid #f1f1f1;
        border-radius: 0.15rem;
        overflow: hidden;
        display: none;
        z-index: 22;
        background: #ffffff;
        li {
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: 0.7rem;
          background: #ffffff;
        }
      }
      .clickitems {
        display: block !important;
      }
    }
  }
  .tig {
    font-size: 0.6rem;
    color: #999999;
    padding-left: 0.6rem;
    margin-top: 1rem;
  }
  .file {
    font-size: 0.7rem;
    color: #333333;
    // display: flex;
    // margin-top: .5rem;
    padding: 0.5rem 0.6rem 0 0.6rem;
    p {
      margin-bottom: 0.5rem;
    }
    .box-a {
      width: 4rem;
      height: 4rem;
      background: url("./images/sz.png") no-repeat;
      background-size: 100%;
    }
    .box-b {
      width: 4rem;
      height: 4rem;
      background: url("./images/sf.png") no-repeat;
      background-size: 100%;
    }
    .box-t {
      width: 4rem;
      height: 4rem;
      background: url("./images/table.png") no-repeat;
      background-size: 100%;
    }
    input {
      width: 3.5rem;
      height: 3.5rem;
      overflow: hidden;
      cursor: pointer;
      -webkit-appearance: none;
      opacity: 0;
    }
  }
  .bottom {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-top: 1rem;
    button {
      width: 17.5rem;
      height: 2rem;
      background-color: #1492ff;
      color: #ffffff;
      font-weight: 500;
      border-radius: 5px;
    }
  }
  input {
    border-radius: 0.25rem;
    -webkit-appearance: none;
  }
}
</style>
