<template>
  <div class="">
      <h3>学校场地开放人脸识别系统使用说明</h3>
<!-- 最多显示一行 -->
<div class="van-ellipsis--l100">现已陆续对西湖区学校场地开放人员识别系统进行升级改造，完成升级后的人脸识别系统
使用方法如下： </div>
<div class="van-ellipsis--l100">一、 原开通过西湖健身卡的用户，在未提交新的照片前可继续持卡在设备上（设备外接的方
形读卡器）读卡认证。 </div>
<div class="van-ellipsis--l100">二、 原西湖健身卡持卡用户和新注册用户开通人脸识别功能方式如下：
</div>
<div class="van-ellipsis--l100">1、进入“西湖文旅发布”公众号，点击“活力体育”—“校园健身”</div>
  <div class="van-ellipsis--l100 imageell"><img class="vanimageage" src="./images/1js.jpeg" alt=""></div>
    <div class="van-ellipsis--l100 imageell"><img class="vanimageage" src="./images/2js.jpeg" alt=""></div>
   <div class="van-ellipsis--l100 imageell"><img class="vanimageage" src="./images/3js.jpeg" alt=""></div>

  <div class="van-ellipsis--l100">2、 进行手机号验证：输入手机号-获取验证码后-登录。</div>
  <div class="van-ellipsis--l100">3、 进入后 :
 A、原西湖健身卡注册用户可以看到列表中已注册的用户信息，点击进入--更改照片后拍
照提交。（如未出现用户列表，可能是现在手机号与原注册时手机号不同，可电话联系原
开卡社区，更改手机号码后，再提交照片。）B、未注册过西湖健身卡用户，点“添加人员”，完成信息录入和照片上传，并提交审核。</div>
  <div class="van-ellipsis--l100">4、原西湖健身卡注册用户照片信息的更改和新用户注册也可以到户籍所属社区通过平台
办理。</div>
  <div class="van-ellipsis--l100">5、 老用户更改照片和新用户注册后，次日
可在注册地街道内所属学校识别人脸健身。</div>
  <div class="van-ellipsis--l100">6、 上传的照片需要清晰的正面头像。
注意：头像的方向，大小，清晰度</div>
   <div class="van-ellipsis--l100 imageell"><img class="vanimageage" src="./images/tpsl.png" alt=""></div>
  <div class="van-ellipsis--l100">三、 可能出现的问题的解决方法：</div>
    <div class="van-ellipsis--l100">1、用户注册后，可以在注册地街道内所属学校开放时段进校健身，到其它街道无法识别，可以按以上方法通过手机公众号更换所属街道。</div>
      <div class="van-ellipsis--l100">2、已办理过西湖健身卡的用户，手机验证后，没有用户列表信息，或注册提示身份证已被注册。可能是之前注册时登记的手机号和现在手机号不同。可以电话联系社区更改用户信息里的手机号，更改后再按以上步骤操作。</div>
        <div class="van-ellipsis--l100">3、照片信息提交后次日仍无法人脸识别成功，请检查照片是否清晰、大小是否合适、是否为正面照。可进入公众号更换新的头像照片。</div>
        <div class="van-ellipsis--l100">4、同一手机号(公众号)下，可以添加多个人员，代家人注册，但需提交家人真实身份信息。</div>
<h3>技术支持联系</h3>
        <div class="van-ellipsis--l100 text_con">【如有问题请拨打社区服务电话】</div>
        <div class="Contact_phone" v-for="(item, key) in contactList" :key="key">
          <div class="Contact_p">{{item.serial}}</div>
          <div class="Contact_p1">{{item.street}}</div>
          <div class="Contact_p2">{{item.school}}</div>
          <div class="Contact_p3">{{item.community}}</div>
          <div class="Contact_p4">{{item.phone}}</div>
          </div>
        <div class="van-ellipsis--l100">技术支持：  0571-87968598</div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      //   title: '赛事活动',
      contactList: [
        {
          serial: '序号',
          street: '街道',
          school: '学校名称',
          community: '主要社区',
          phone: '联系电话'
        },
        {
          serial: '1',
          street: '北山街道',
          school: '保实松木场',
          community: '金祝社区',
          phone: '0571-85214125'
        },
        {
          serial: '2',
          street: '翠苑街道',
          school: '翠一翠苑',
          community: '翠苑一区社区',
          phone: '0571-56113015'
        }, {
          serial: '3',
          street: '翠苑街道',
          school: '翠中翠苑',
          community: '翠苑二区社区',
          phone: '0571-88841571'
        }, {
          serial: '4',
          street: '翠苑街道',
          school: '翠苑二小',
          community: '翠苑三区社区',
          phone: '0571-86501706'
        }, {
          serial: '1',
          street: '北山街道',
          school: '保实松木场',
          community: '金祝社区',
          phone: '0571-85214125'
        }, {
          serial: '5',
          street: '翠苑街道',
          school: '省教附小北区',
          community: '翠苑四区社区',
          phone: '0571-87358601'
        }, {
          serial: '6',
          street: '翠苑街道',
          school: '省教附小南区',
          community: '翠苑五区社区',
          phone: '0571-88914949'
        }, {
          serial: '7',
          street: '翠苑街道',
          school: '九莲小学',
          community: '九莲社区',
          phone: '0571-56885236'
        }, {
          serial: '8',
          street: '翠苑街道',
          school: '行知小学文二校区',
          community: '九莲社区',
          phone: '0571-56885236'
        }, {
          serial: '9',
          street: '翠苑街道',
          school: '杭十三中',
          community: '花园社区',
          phone: '0571-89935047'
        }, {
          serial: '10',
          street: '翠苑街道',
          school: '行知小学',
          community: '花园社区',
          phone: '0571-89935047'
        }, {
          serial: '11',
          street: '文新街道',
          school: '翠中文华',
          community: '湖畔社区',
          phone: '0571-88858302'
        }, {
          serial: '12',
          street: '文新街道',
          school: '翠一文华',
          community: '湖畔社区',
          phone: '0571-88858302'
        }, {
          serial: '13',
          street: '文新街道',
          school: '竞舟小学',
          community: '竞舟社区',
          phone: '0571-88220539'
        }, {
          serial: '14',
          street: '文新街道',
          school: '文三文苑',
          community: '香樟社区',
          phone: '0571-88269329'
        }, {
          serial: '15',
          street: '文新街道',
          school: '星洲小学',
          community: '星洲社区',
          phone: '0571-88489532'
        }, {
          serial: '16',
          street: '文新街道',
          school: '西溪中学',
          community: '府新社区',
          phone: '0571-88302527'
        }, {
          serial: '17',
          street: '文新街道',
          school: '文新小学',
          community: '桂花园社区',
          phone: '0571-88107163'
        }, {
          serial: '18',
          street: '文新街道',
          school: '公益中学',
          community: '登云圩',
          phone: '0571-86822372'
        }, {
          serial: '19',
          street: '古荡街道',
          school: '省府路小学',
          community: '莲花社区',
          phone: '0571-87858993'
        }, {
          serial: '20',
          street: '古荡街道',
          school: '丰潭中学',
          community: '古南社区',
          phone: '0571-87970735'
        }, {
          serial: '21',
          street: '古荡街道',
          school: '古荡一小',
          community: '古东社区',
          phone: '0571-85024424'
        }, {
          serial: '22',
          street: '古荡街道',
          school: '嘉绿苑小学',
          community: '嘉绿苑社区',
          phone: '0571-89966676'
        }, {
          serial: '23',
          street: '古荡街道',
          school: '嘉绿苑中学',
          community: '华星社区',
          phone: '0571-88086677'
        }, {
          serial: '24',
          street: '转塘街道',
          school: '西湖一实',
          community: '葛衙庄社区',
          phone: '0571-86099172'
        }, {
          serial: '25',
          street: '转塘街道',
          school: '求是之江二小',
          community: '五云梦湖社区',
          phone: '0571-86653559'
        }, {
          serial: '26',
          street: '蒋村街道',
          school: '西小府苑',
          community: '府苑社区',
          phone: '0571-88252515'
        }, {
          serial: '27',
          street: '蒋村街道',
          school: '西溪实验',
          community: '诚园社区',
          phone: '0571-87973927'
        }, {
          serial: '28',
          street: '蒋村街道',
          school: '育才文溪小学',
          community: '竞渡社区',
          phone: '0571-81387753'
        }, {
          serial: '29',
          street: '蒋村街道',
          school: '文溪中学',
          community: '竞渡社区',
          phone: '0571-81387753'
        }, {
          serial: '30',
          street: '蒋村街道',
          school: '竞舟二小',
          community: '河滨社区',
          phone: '0571-86931612'
        }, {
          serial: '31',
          street: '蒋村街道',
          school: '行知第二小学',
          community: '西溪里社区',
          phone: '0571-81387759'
        }, {
          serial: '32',
          street: '蒋村街道',
          school: '十五中崇德',
          community: '西溪里社区',
          phone: '0571-81387759'
        }, {
          serial: '33',
          street: '三墩镇',
          school: '学军紫金港',
          community: '文鼎苑社区',
          phone: '0571-88965100'
        }, {
          serial: '34',
          street: '三墩镇',
          school: '大禹路小学',
          community: '颐兰社区',
          phone: '0571-88963900'
        }, {
          serial: '35',
          street: '三墩镇',
          school: '保实申花',
          community: '西苑社区',
          phone: '0571-88859817'
        }, {
          serial: '36',
          street: '三墩镇',
          school: '三墩小学',
          community: '振华社区',
          phone: '0571-85379212'
        }, {
          serial: '37',
          street: '三墩镇',
          school: '紫金港中学',
          community: '政苑社区',
          phone: '0571-89966418'
        }, {
          serial: '38',
          street: '三墩镇',
          school: '文一政苑',
          community: '政苑社区',
          phone: '0571-89966418'
        }, {
          serial: '39',
          street: '三墩镇',
          school: '文三文理',
          community: '自在城东苑社区',
          phone: '0571-87759173'
        }, {
          serial: '40',
          street: '三墩镇',
          school: '三墩中学',
          community: '振华社区',
          phone: '0571-85379212'
        }, {
          serial: '41',
          street: '三墩镇',
          school: '西湖紫萱',
          community: '紫萱社区',
          phone: '0571-86939632'
        }, {
          serial: '42',
          street: '三墩镇',
          school: '大禹路小学甲来路',
          community: '嘉苑社区',
          phone: '0571-87761169'
        }, {
          serial: '43',
          street: '三墩镇',
          school: '嘉绿苑小学景汇校区',
          community: '景溪社区',
          phone: '0571-85359150'
        }, {
          serial: '44',
          street: '三墩镇',
          school: '三墩小学双桥校区',
          community: '山联社区',
          phone: '0571-88960332'
        }, {
          serial: '45',
          street: '三墩镇',
          school: '星洲二小',
          community: '五幸社区',
          phone: '0571-88960298'
        }, {
          serial: '46',
          street: '三墩镇',
          school: '景汇中学',
          community: '景溪社区',
          phone: '0571-85359150'
        }, {
          serial: '47',
          street: '三墩镇',
          school: '弘益中学',
          community: '厚诚桥社区',
          phone: '0571-88951270'
        }, {
          serial: '48',
          street: '三墩镇',
          school: '求是浙大第二附小',
          community: '紫金港社区',
          phone: '0571-88869518'
        }, {
          serial: '49',
          street: '三墩镇',
          school: '三墩中学文理校区',
          community: '自在城东苑社区',
          phone: '0571-87759173'
        }
      ]
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
  },
  created() {
    // this.title = '个人信息'
    // this.RightText = '提交'
    // this.phone = this.$route.query.phone
    // localStorage.setItem('phone', '15839263540');
    // localStorage.setItem('openid', 'oHpRbs7-k77iPeIbL6GgXgT97iq0');
    // alert(phone)
    // eslint-disable-next-line no-undef
    // this.phone = localStorage.getItem('phone')
    // // alert(this.phone)
    // this.DataRequest(this.phone)
  }

}
</script>
<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif  !important; 
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
font-size: 16px !important;
}
</style>
<style lang="less" scoped>
body {
  width: 100%;
  height: 100%;
  //   position: relative;
  background-color: #f6fafd;
}
.text_con{
  display: flex;
justify-content: center;
}
.Contact_phone{
  display: flex;
margin: 10px;
font-size: 12px;
margin-top: 0px;
margin-bottom: 0px;
}
.Contact_p{
border: 0.5px solid black;
width: 10%;
}
.Contact_p1{
  border: 0.5px solid black;
width: 20%;
}
.Contact_p2{
  border: 0.5px solid black;
width: 22.5%;
}
.Contact_p3{
  border: 0.5px solid black;
width: 22.5%;
}
.Contact_p4{
  border: 0.5px solid black;
width: 25%;
}
.van-cell__title {
  text-align: left;
  color: #666;
  font-size: 12px;
  margin-right: -80px;
}
.van-cell__label {
  font-weight: bolder;
  color: #000;
  font-size: 14px;
}

.van-cell-group {
  margin: 10px;
  border-radius: 5px;
}
.van-ellipsis--l100{
    text-align: left;
margin: 15px;
}
.vanimageage{
    width: 300px;
}
.imageell{
    text-align: center;
}
</style>
