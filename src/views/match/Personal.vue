<template>
  <div id="home">
    <Tabar :title="title"></Tabar>
    <div class="box">
      <p>姓名</p>
      <input type="text" placeholder="请输入姓名" v-model="name" @blur="checkname" :readonly="showName" />
    </div>
    <div class="box">
      <p>身份证号</p>
      <input
        type="text"
        placeholder="请输入证件号码"
        v-model="card"
        @blur="checkcard"
        :readonly="showCard"
      />
    </div>
    <div class="box">
      <p>手机号码</p>
      <input
        type="text"
        placeholder="请输入手机号码"
        v-model="number"
        @blur="checktel"
        :readonly="showNum"
      />
    </div>
    <div class="box">
      <p>所在单位</p>
      <input
        type="text"
        placeholder="请输入所在单位"
        v-model="unitPlace"
        @blur="checkunit"
      />
    </div>
    <div class="box-number">
      <div class="select">
        <p>报名组别</p>
        <div class="list" @click="onlist">
          <span>{{value}}</span>
          <ul :class="{clicklist:isshow}">
            <li
              @click.stop="onclick(index)"
              v-for=" (i,index) in group"
              :key="index"
            >{{i.groupName}}</li>
          </ul>
        </div>
      </div>
      <div class="select">
        <p>报名项目</p>
        <div class="list" @click="onproject">
          <span>{{valuepro}}</span>
          <ul :class="{clicklist:showproject}">
            <li
              @click.stop="onpro(index)"
              v-for=" (i,index) in grouplist"
              :key="index"
            >{{i.itemName}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box">
      <p>备注信息</p>
      <input
        type="text"
        placeholder="请输入备注信息"
        v-model="remark"
      />
    </div>
    <div class="bottom">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar";
import { mapGetters } from "vuex";
import "../../style/globel.css";
import { project, submitform, group } from "../../http/api";
var i = 0;
var j = 0;
export default {
  data() {
    return {
      id: "",
      title: "个人报名",
      value: "- 请选择 -",
      valuepro: "- 请选择 -",
      isshow: false,
      isitem: false,
      fileList1: [],
      fileList2: [],
      name: "",
      passname: "",
      card: "",
      number: "",
      group: [],
      groupId: "",
      itemId: "",
      unitPlace:"",
      remark:"",
      showproject: false,
      grouplist: [],
      status: this.$route.params.status,
      identity: [],
      application: [],
      delfile1: "",
      delfile2: "",
      upimgshow: true,
      idcard: this.$route.params.idcard,
      healthid: this.$route.params.healthid,
      showidcard: true,
      showhealthid: true,
      showbox: false,
      imgBase64: null,
      delindex: [],
      delimg: [],
      showName: false,
      showNum: false,
      showCard: false,
      countDown: false,
    };
  },
  components: { Tabar },
  methods: {
    //获得报名组别信息
    // getGroupInfo(){
    //  getGroup({
    //    id:this.id
    //  })
    //  .then(res=>{
    //    console.log(res)
    //    if(res.code == 0){
    //      this.group = res.data
    //    }
    //  })
    // },
    //获得报名项目信息

    checkteamname() {
      var pass = this.validata.checkname(this.teamname);
      if (!pass) {
        this.$toast("格式不正确");
        return false;
      }
      return true;
    },
    checkname() {
      var pass = this.validata.checkname(this.name);
      if (!pass) {
        this.$toast("姓名格式不正确");
        return false;
      }
      return true;
    },
    checkcard() {
      var id = this.validata.identify(this.card);
      if (!id) {
        this.$toast("身份证号码输入错误");
        return false;
      }
      return true;
    },
    checktel() {
      var num = this.validata.number(this.number);
      if (!num) {
        this.$toast("电话号码输入错误");
        return false;
      }
      return true;
    },
    // 验证下拉框
    checkselect() {
      if (this.value === "- 请选择 -") {
        this.$toast("请选择组别");
        return false;
      } else if (this.valuepro === "- 请选择 -") {
        this.$toast("请选择项目");
        return false;
      }
      return true;
    },
    //验证身份证上传
    checkuploadidentity() {
      if (this.showidcard) {
        if (this.identity.length) {
          return true;
        }
        this.$toast("请上传图片");
        return false;
      }
    },
    //验证体检报告
    checkuploadapplication() {
      if (this.showhealthid) {
        if (this.application.length) {
          return true;
        }
        this.$toast("请上传图片");
        return false;
      }
    },
    //验证所在单位
    checkunit(){
     if(!this.checkunit){
       this.$toast("请输入所在单位信息");
       return false;
     }
    },
    onlist() {
      this.isshow = true;
      group({
        actId: this.$route.params.id
      }).then(res => {
        this.group = res.data;
        console.log(this.group);
      });
    },
    onproject() {
      this.showproject = true;
      project({
        actId: this.$route.params.id,
        groupId: this.groupId
      }).then(res => {
        this.grouplist = res.data;
      });
    },
    onclick(index) {
      this.valuepro = "- 请选择 -";
      this.value = this.group[index].groupName;
      this.groupId = this.group[index].id;
      this.isshow = false;
    },
    onpro(index) {
      this.valuepro = this.grouplist[index].itemName;
      this.itemId = this.grouplist[index].id;
      this.showproject = false;
    },
    onitems() {
      this.isitem = true;
    },
    onclickitem(index) {
      this.value = this.datalist[index];
      this.isitem = false;
    },
    cancel1() {
      this.show1 = false;
    },
    cancel2() {
      this.show2 = false;
    },
    cancel3() {
      this.show3 = false;
    },
        /**
     * 拦截器
     */
    interceptor() {
      if (this.countDown) return false;
      this.countDown = true;
      setTimeout(() => {
        this.countDown = false;
      }, 2500);
      return true;
    },
    submit() {
      if (!this.interceptor()) return;
      var pass = this.validata.checkname(this.name);
      var id = this.validata.identify(this.card);
      var num = this.validata.number(this.number);
      if(!pass || !id || !num){
        alert("请完善报名信息");
        return false
      }
var nowDate = new Date();
 var year = nowDate.getFullYear();
 var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
  : nowDate.getMonth() + 1;
 var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
  .getDate();
 var dateStr = month+day;
      var agess=1953+dateStr;
      if(Number(this.card.substring(6, 14)) < Number(agess)){
        alert("年龄超出限制");
        return false;
      }
       submitform({
         groupId: this.groupId,
         actId: this.$route.params.id,
         itemId: this.itemId,
        applyerName: this.name,
        idCard: this.card,
        phone:this.number,
        unitPlace:this.unitPlace,
        remark:this.remark

       })
       .then(res=>{
         if(res.code == 0){
          this.$router.push({ path: "/success", query: {} });
         }else{
           alert('保存失败')
         }
       })
        .catch(err=>{
          console.log(err)
        })


      console.log(333);
    },
    // afterRead1(file) {
    //   file.index = i++;
    //   console.log(file);
    //   this.$toast.loading({
    //     message: "上传中...",
    //     forbidClick: true,
    //     loadingType: "spinner"
    //   });
    //   const that = this;
    //   that.avatar_filename = file.file.name;
    //   const img = new Image();
    //   img.src = file.content;
    //   this.compress(img, compressRes => {
    //     // base({
    //     //   base: compressRes
    //     // }).then(res => {
    //     //   console.log(res);
    //     //   if (res.resp_code == 0) {
    //     //     this.identity.push(res.datas.id);
    //     //   }
    //     //   console.log(this.identity);
    //     // });
    //   });
    //   // 此时可以自行将文件上传至服务器
    // },
    //删除图片
    delImgidcard(file) {
      console.log(file);
      console.log(file.index);
      this.delindex.push(file.index);
      console.log(this.delindex);
    },
    // afterRead2(file) {
    //   file.index = j++;
    //   console.log(file);
    //   this.$toast.loading({
    //     message: "上传中...",
    //     forbidClick: true,
    //     loadingType: "spinner"
    //   });
    //   const that = this;
    //   that.avatar_filename = file.file.name;
    //   const img = new Image();
    //   img.src = file.content;
    //   this.compress(img, compressRes => {
    //     // base({
    //     //   base: compressRes
    //     // }).then(res => {
    //     //   console.log(res);
    //     //   if (res.resp_code == 0) {
    //     //     this.application.push(res.datas.id);
    //     //   }
    //     //   console.log(this.application);
    //     // });
    //   });
    //   // 此时可以自行将文件上传至服务器
    // },
    //删除图片
    delImgapp(file) {
      console.log(file);
      console.log(file.index);
      this.delimg.push(file.index);
      // this.application.splice(file.index, 1)
      // console.log(this.application)
    },
    beforeRead(file) {
      // console.log(file)
      if (file.type == "image/jpeg" || file.type == "image/png") {
        return true;
      }
      return this.$toast.fail("请上传 jpg 格式图片");
    },
    //最终上传的图片
    sureimga() {
      this.delindex = this.delindex.sort(this.mysort);
      console.log(this.delindex);
      var len = this.delindex.length;
      console.log(len);
      console.log();
      while (len--) {
        console.log(len);
        this.identity.splice(this.delindex[len], 1);
      }
      console.log(this.identity);
    },
    sureimgb() {
      this.delimg = this.delimg.sort(this.mysort);
      console.log(this.delimg);
      var len = this.delimg.length;
      console.log(len);
      console.log();
      while (len--) {
        console.log(len);
        this.application.splice(this.delimg[len], 1);
      }
      console.log(this.application);
    },
    //排序
    mysort(a, b) {
      return a - b;
    },
    //图片压缩
    compress(img, callback) {
      img.onload = () => {
        const limitWidth = arguments[2] ? arguments[2] : 640;
        const width = img.width > limitWidth ? limitWidth : img.width;
        const height =
          img.width > limitWidth
            ? parseInt((img.height * limitWidth) / img.width)
            : img.width;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL("img/jpeg"));
      };
    }

    // idCardNo(value, row, index) {
    //   var len = value.length;
    //   var xx = value.substring(1, len - 1);
    //   var values = value.replace(xx, "****************");
    //   return values;
    // },
    // mobile(value, row, index) {
    //   var len = value.length;
    //   var xx = value.substring(3, len - 4);
    //   var values = value.replace(xx, "****");
    //   return values;
    // }
  },
  created() {

    // if (this.idcard == 0) {
    //   this.showidcard = false;
    // } else if (this.idcard == 1) {
    //   this.showidcard = true;
    // }
    // if (this.healthid == 0) {
    //   this.showhealthid = false;
    // } else if (this.healthid == 1) {
    //   this.showhealthid = true;
    // }
    // if (this.idcard == 0 && this.healthid == 0) {
    //   console.log(111);
    //   this.showbox = true;
    // } else {
    //   this.showbox = false;
    // }
    // if (this.userInformation.realname) {
    //   this.showName = true;
    //   this.name = this.userInformation.realname;
    // }
    // if (this.userInformation.mobile) {
    //   this.showNum = true;
    //   this.number = this.userInformation.mobile;
    // }
    // if (this.userInformation.idCardNo) {
    //   this.showCard = true;
    //   this.card = this.userInformation.idCardNo;
    // }
    // this.name = this.noPassByName(this.name);
    // this.card = this.idCardNo(this.card);
    // this.number = this.mobile(this.number);
    console.log(this.showbox);
  },
  computed: {
    ...mapGetters(["userMsg", "userInformation"])
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #fff;
  height: 100vh;
  // position: relative;
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
      border-radius: 0.25rem;
      -webkit-appearance: none;
      // &::placeholder {
      //   transform: translate(0, -0.1rem);
      // }
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
        border-radius: 0.25rem;
        -webkit-appearance: none;
        // input输入框placeholder文字居中
        // &::placeholder {
        //   transform: translate(0, -0.1rem);
        // }
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
  .file {
    font-size: 0.7rem;
    color: #333333;
    // height: 13rem;
    padding: 0.5rem 0.6rem 0 0.6rem;
    p {
      margin-bottom: 0.5rem;
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
      background: url("./images/tj.png") no-repeat;
      background-size: 100%;
    }
    input {
      width: 3.5rem;
      height: 3.5rem;
      overflow: hidden;
      cursor: pointer;
      opacity: 0;
      -webkit-appearance: none;
      border-radius: 0.25rem;
    }
  }
  .filenoimg {
    height: 13rem !important;
  }
  .bottom {
    // position: absolute;
    // bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-top: 0.5rem;
    button {
      width: 17.5rem;
      height: 2rem;
      background-color: #1492ff;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.25rem;
    }
  }
  .eject {
    p {
      display: block;
      height: 3.15rem;
      text-align: center;
      line-height: 3.15rem;
      font-size: 20px;
      color: #333333;
      border-bottom: 1px solid #999999;
      .select {
        .van-button--default {
          border: none;
        }
      }
    }
  }
}
</style>
