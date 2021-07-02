<template>
  <div class="Bigcont">
    <!-- 3.在页面使用这个组件 -->
    <!-- <NavBar
      :title="title"
      :RightText="RightText"
      :LeftText="LeftText"
      :isleftarrow="isleftarrow"
      @click.native="onClickRight"
    ></NavBar> -->
    <van-tabs @click="TabonClick">
      <van-form ref="checkfrom" @submit="submit">
        <van-tab title="基本信息">
          <!-- 全边框 -->
          <div class="van-hairline--surround">
            <van-cell title="个人照片" icon="location-o">
              <label for="" slot="title"
                >个人照片<span style="color:red;">*</span></label
              >
              <van-uploader :after-read="afterRead" capture="camera">
                <div style=" font-weight: bold; color: #33A870;">
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
            >
              <label for="" slot="label"
                >姓名<span style="color:red;">*</span></label
              >
            </van-field>
            <!-- <van-field class="iconfont icon-shuxian" v-model="cardNumb" type="digit" label="卡号" placeholder="请输入卡号" input-align="right"/> -->
            <van-field
              v-model="sex"
              readonly
              clickable
              name="gender"
              label="性别"
              placeholder="请选择性别"
              input-align="right"
              @click="showPicker = true"
            >
              <label for="" slot="label"
                >性别<span style="color:red;">*</span></label
              >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
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
              <label for="" slot="label"
                >证件类型<span style="color:red;">*</span></label
              >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
              <!-- <van-icon class="iconfont icon-next"  slot="right-icon"></van-icon> -->
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
              label="证件号"
              placeholder="请输入证件号"
              input-align="right"
            >
              <label for="" slot="label"
                >证件号<span style="color:red;">*</span></label
              >
            </van-field>
            <van-cell title="是否浙江户籍" icon="location-o">
              <label for="" slot="title"
                >是否浙江户籍<span style="color:red;">*</span></label
              >
              <van-icon class="iconfont icon-shuxian" slot="icon"></van-icon>
              <van-radio-group v-model="Whether" @change="WhetherZhejiang" direction="horizontal">
                <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
               </van-radio-group>
               <div class="prompt_text">*非浙江户籍请在工作日08:00~18:00注册及修改信息</div>
            </van-cell>
            <van-field
              class="iconfont icon-shuxian"
              v-model="Phone"
              type="tel"
              label="手机号"
              placeholder="请输入手机号"
              input-align="right"
              @blur="focusPrice($event)"
              readonly
            >
              <label for="" slot="label"
                >手机号<span style="color:red;">*</span></label
              >
            </van-field>
            <van-field
              v-model="community"
              readonly
              clickable
              label="所属社区"
              placeholder="请选择社区"
              input-align="right"
              @click="showPicker2 = true"
            >
              <label for="" slot="label"
                >所属社区<span style="color:red;">*</span></label
              >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
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
              <label for="" slot="label"
                >学历<span style="color:red;">*</span></label
              >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
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
            >
              <label for="" slot="label"
                >现住址<span style="color:red;">*</span></label
              >
            </van-field>
          </div>
          <!-- <center
        style="text-align: -moz-center;position: fixed; bottom: 30px; width: 100%;"
      > -->
          <center style=" bottom: 30px; width: 100%;">
            <van-button
              style="background-color: #28CFB3; border: 0; margin-top: 30px; font-size: 16px; width: 230px; height: 40px;"
              type="info"
              round
              block
              @click="onClickRight"
            >
              提交
            </van-button>
          </center>
        </van-tab>
        <van-tab title="详情信息">
          <!-- 全边框 -->
          <div class="van-hairline--surround">
            <!-- 允许输入正整数，调起纯数字键盘 -->
            <!-- <van-field class="iconfont icon-shuxian" v-model="digit" label="出生年月" placeholder="请输入出生年月" input-align="right" /> -->
            <!-- 输入任意文本 -->
            <van-field
              class="iconfont icon-shuxian"
              v-model="contact"
              label="紧急联系人"
              placeholder="请输入紧急联系人"
              input-align="right"
            />
            <!-- 输入手机号，调起手机号键盘 -->
            <van-field
              class="iconfont icon-shuxian"
              v-model="contacttel"
              type="tel"
              label="紧急联系电话"
              placeholder="请输入联系电话"
              input-align="right"
            />
            <van-field
              class="iconfont icon-shuxian"
              v-model="familytel"
              type="tel"
              label="家庭电话"
              placeholder="请输入家庭电话"
              input-align="right"
            />
            <van-field
              v-model="permanent"
              readonly
              clickable
              label="是否常住"
              placeholder="请选择是否常住"
              input-align="right"
              @click="showPicker4 = true"
            >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
              <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
            </van-field>
            <van-popup v-model="showPicker4" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns4"
                @confirm="onConfirm4"
                @cancel="showPicker4 = false"
              />
            </van-popup>
            <van-field
              v-model="Registered"
              readonly
              clickable
              label="户口性质"
              placeholder="请选择户口性质"
              input-align="right"
              @click="showPicker5 = true"
            >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
              <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
            </van-field>
            <van-popup v-model="showPicker5" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns5"
                @confirm="onConfirm5"
                @cancel="showPicker5 = false"
              />
            </van-popup>
            <van-field
              v-model="housing"
              readonly
              clickable
              label="住房性质"
              placeholder="请选择住房性质"
              input-align="right"
              @click="showPicker6 = true"
            >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
              <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
            </van-field>
            <van-popup v-model="showPicker6" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns6"
                @confirm="onConfirm6"
                @cancel="showPicker6 = false"
              />
            </van-popup>
            <van-field
              v-model="health"
              readonly
              clickable
              label="健康状况"
              placeholder="请选择健康状况"
              input-align="right"
              @click="showPicker7 = true"
            >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
              <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
            </van-field>
            <van-popup v-model="showPicker7" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns7"
                @confirm="onConfirm7"
                @cancel="showPicker7 = false"
              />
            </van-popup>
            <van-field
              v-model="major"
              readonly
              clickable
              label="重大疾病"
              placeholder="请选择疾病状况"
              input-align="right"
              @click="showPicker8 = true"
            >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
              <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
            </van-field>
            <van-popup v-model="showPicker8" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns8"
                @confirm="onConfirm8"
                @cancel="showPicker8 = false"
              />
            </van-popup>
            <van-field
              v-model="Political"
              readonly
              clickable
              label="政治面貌"
              placeholder="请选择政治面貌"
              input-align="right"
              @click="showPicker9 = true"
            >
              <van-icon
                class="iconfont icon-shuxian"
                slot="left-icon"
              ></van-icon>
              <van-icon class="iconfont icon-next" slot="right-icon"></van-icon>
            </van-field>
            <van-popup v-model="showPicker9" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns9"
                @confirm="onConfirm9"
                @cancel="showPicker9 = false"
              />
            </van-popup>
            <!-- <van-field v-model="national" readonly clickable label="民族" placeholder="请选择民族" input-align="right" @click="showPicker10 = true">
    <van-icon class="iconfont icon-shuxian"  slot="left-icon" ></van-icon>
    <van-icon class="iconfont icon-next"  slot="right-icon"></van-icon>
  </van-field>
      <van-popup v-model="showPicker10" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns10"
    @confirm="onConfirm10"
    @cancel="showPicker10 = false"
  />
</van-popup> -->
            <!-- 输入任意文本 -->
            <van-field
              class="iconfont icon-shuxian"
              v-model="household"
              label="户籍地址"
              placeholder="请输入户籍地址"
              input-align="right"
            />
            <!-- 输入任意文本 -->
            <van-field
              class="iconfont icon-shuxian"
              v-model="email"
              label="电子邮箱"
              placeholder="请输入电子邮箱"
              input-align="right"
            />
            <!-- 输入任意文本 -->
            <van-field
              class="iconfont icon-shuxian"
              v-model="Theunit"
              label="所在单位"
              placeholder="请输入所在单位"
              input-align="right"
            />
          </div>
          <!-- <center
        style="text-align: -moz-center;position: fixed; bottom: 30px; width: 100%;"
      > -->
          <center style=" bottom: 60px; width: 100%;">
            <van-button
              style="background-color: #28CFB3; border: 0; margin-top: 30px; font-size: 16px; width: 230px; height: 40px;"
              type="info"
              round
              block
              @click="onClickRight"
            >
              提交
            </van-button>
          </center>
        </van-tab>
      </van-form>
    </van-tabs>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar/Navbar'
// import lrz from 'lrz'
import { PersonareaAction,userImg,addcardsave,baseFiles } from "../../http/api";
import {
  Toast,
  ImagePreview,
  Dialog,
} from 'vant'
// import indexVue from './index.vue'
// import domain from '../../domain.js'
// import Qs from 'qs'
export default {
  components: {
    [Toast.name]: Toast,
    [ImagePreview.name]: ImagePreview,
    [Dialog.name]: Dialog,
  },

  data() {
    return {
      // title: '个人信息',
      // RightText: '提交',
      // LeftText: '返回',
      // isleftarrow: true,
      username: '',
      sex: '',
      // cardNumb: '',
      cerType: '身份证',
      cerNum: '',
      Phone: '',
      community: '',
      Record: '',
      Address: '',
      digit: '',
      contact: '',
      contacttel: '',
      familytel: '',
      household: '',
      email: '',
      Theunit: '',
      permanent: '',
      Registered: '',
      housing: '',
      health: '',
      major: '',
      Political: '',
      phoneStr: '',
      columns: ['男', '女'],
      // columns1: ['身份证', '驾驶证'],
      columns2: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ],
      columns3: ['博士生', '研究生', '本科', '专科', '高中', '初中', '小学'],
      columns4: ['常住', '临时'],
      columns5: ['农业', '非农业'],
      columns6: ['自有', '租赁', '其他'],
      columns7: ['良好', '其他'],
      columns8: ['有精神疾病或心血管类疾病', '没有精神疾病或心血管类疾病'],
      columns9: ['团员', '党员', '其他'],
      // columns10: ['汉族', '汉族2'],
      showPicker: false,
      // showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      showPicker6: false,
      showPicker7: false,
      showPicker8: false,
      showPicker9: false,
      // showPicker10: false,
      avatar: require('./images/Mrtx2.png'),
      upload: '',
      cmyID: '3',
      sexStr: '',
      RecordID: '',
      permanentID: '',
      RegisteredID: '',
      housingID: '',
      healthID: '',
      majorID: '',
      PoliticalID: '',
      identity: '',
      Whether: '1'// 是否浙江户口
    }
  },
  // 计算属性
  computed: {
    // submitBarText() {
    //   const count = this.checkedGoods.length;
    //   return '结算' + (count ? `(${count})` : '');
    // },
    // totalPrice() {
    //   return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
    // }
  },
  // 函数要在这个方法下面添加
  methods: {
    // 是否浙江户籍
    WhetherZhejiang() {
      // alert(this.Whether);
    },
    focusPrice($even) {
      // alert($even.target.value)
      if ($even.target.value !== this.phoneStr) {
        Dialog.alert({
          title: '提示',
          message: '您输入的手机号和登录手机号不一致！'
        }).then(() => {
          // on close
        })
      }
    },
    // afterRead(file) {
    // 此时可以自行将文件上传至服务器
    // console.log(file)
    // this.avatar = file.content
    // this.upload = file.file
    // },
    // 头像预览
    PreviewPicture() {
      if (!this.identity) {
        return
      }
      ImagePreview({
        images: [this.avatar]
        // showIndex: false
      })
    },
    TabonClick(name, title) {
      // Toast(title);
    },
    onConfirm(val) {
      this.sex = val
      this.sexStr = val === '男' ? '1' : '0'
      // alert(this.sexStr)
      // alert(this.sex)
      this.showPicker = false
    },
    // onConfirm1(val) {
    //   this.cerType = val;
    //   this.showPicker1 = false;
    // },
    onConfirm2(val) {
      this.community = val[1].text
      this.showPicker2 = false
      this.cmyId = val[1].id
    },
    onConfirm3(val, index) {
      this.Record = val
      this.showPicker3 = false
      this.RecordID = index + 1
      // console.log(this.RecordID);
    },
    onConfirm4(val, index) {
      this.permanent = val
      this.showPicker4 = false
      this.permanentID = index
    },
    onConfirm5(val, index) {
      this.Registered = val
      this.showPicker5 = false
      this.RegisteredID = index
    },
    onConfirm6(val, index) {
      this.housing = val
      this.showPicker6 = false
      this.housingID = index
    },
    onConfirm7(val, index) {
      this.health = val
      this.showPicker7 = false
      this.healthID = index
    },
    onConfirm8(val, index) {
      this.major = val
      this.showPicker8 = false
      this.majorID = index
    },
    onConfirm9(val, index) {
      this.Political = val
      this.showPicker9 = false
      this.PoliticalID = index
    },
    onChange(picker, value, index) {
      console.log(value[0].id)
      console.log(`当前值：${value[0].text}, 当前索引：${index}`)
      // eslint-disable-next-line eqeqeq
      // if (this.columns2[1]) {
      // alert(111111)
      // }
      this.TheStreet(value[0].id)
    },
    // 区域街道选择
    BelongingTheCommunity() {
    PersonareaAction({
        parentId: 4,
      })
        .then((response) => {
          // alert(1111111);
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
        })
    },
    // onConfirm10(val) {
    //   this.national = val;
    //   this.showPicker10 = false;
    // },
    submit(val) {
      // alert('3333333333')
      // console.log(val)
    },
    // 提交
    onClickRight() {
      if (!this.identity) {
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
      Toast.loading({
        message: '请稍等...',
        forbidClick: true,
        duration: 0
      })
      // var formdata = new FormData()
      // formdata.append('headFileId', this.identity)
      // formdata.append('cmyId', this.cmyId)
      // formdata.append('idCardNo', this.cerNum)
      // formdata.append('mobile', this.Phone)
      // formdata.append('username', this.username)
      // formdata.append('sex', this.sexStr)
      // formdata.append('education', this.RecordID)
      // formdata.append('curAddress', this.Address)
      // formdata.append('emergencyPerson', this.contact)
      // formdata.append('emergencyMobile', this.contacttel)
      // formdata.append('familyPhone', this.familytel)
      // formdata.append('permanentFlag', this.permanentID)
      // formdata.append('householdPrty', this.RegisteredID)
      // formdata.append('housingPrty', this.housingID)
      // formdata.append('health', this.healthID)
      // formdata.append('illness', this.majorID)
      // formdata.append('policicalAprce', this.PoliticalID)
      // formdata.append('idCardAddress', this.household)
      // formdata.append('email', this.email)
      // formdata.append('companyAddress', this.Theunit)
      // formdata.append('zj', this.Whether)

      // console.log(formdata.get('username'))

      this.SubmitToSave()
    },
    // 提交保存
    SubmitToSave(va) {
      // console.log(va)
      addcardsave({
        headFileId: this.identity,
        cmyId: this.cmyId,
        idCardNo: this.cerNum,
        mobile: this.Phone,
        username: this.username,
        sex: this.sexStr,
        education: this.RecordID,
        curAddress: this.Address,
        emergencyPerson: this.contact,
        emergencyMobile: this.contacttel,
        permanentFlag: this.permanentID,
        householdPrty: this.RegisteredID,
        housingPrty: this.housingID,
        health: this.healthID,
        illness: this.majorID,
        policicalAprce: this.PoliticalID,
        idCardAddress: this.household,
        email: this.email,
        companyAddress: this.Theunit,
        zj: this.Whether,
      })
        .then(response => {
          console.log(response)
          // 取消等待
          Toast.clear()
          // eslint-disable-next-line eqeqeq
          if (response.code == 0) {
            var str = response.data
            Dialog.alert({
              title: '提示',
              message:
                '您已完成注册，次日可去所属街道内学校识别健身（在学校开放时间内）'
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
    this.phoneStr = this.$route.query.phone;
    this.Phone = JSON.parse(sessionStorage.getItem("userInfo")).mobile;
    this.BelongingTheCommunity();
  }
  // beforeCreate() {
  //   document.querySelector('body').setAttribute('style', 'background:#F6FAFD')
  // },
  // beforeDestroy() {
  //   document.querySelector('body').setAttribute('style', '')
  // }
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
  // position: relative;
  background-color: #f6fafd;
}
/deep/.van-nav-bar__right .van-nav-bar__text {
  color: #33a870;
  font-size: 16px;
}
/deep/label.xrequired:before {
  content: '*';
  color: red;
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
/deep/.van-radio-group--horizontal{
  justify-content: right;
  position: absolute;
  right: 0px;
}
/deep/.van-radio--horizontal{
  margin-left: 20px;
  margin-right: 0px;
}
.prompt_text{
  font-size: 12px;
  color: red;
  line-height: 12px;
  padding-top: 3px;
padding-top: 23px;
}
</style>
