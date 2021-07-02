// 表单验证
export default {
  // 姓名验证
  checkname: function (name) {
    if (name.length == 0) {
      // console.log("用户名不能为空")
    } else if (name.length < 2) {
      // console.log("用户名至少2个字符")
    } else {
      console.log("")
    }
    return name.length >= 2;
  },
  //内容不能weikong
  checktext: function (text) {
    if (text.length == 0) {
      // console.log("内容不能为空")
    }
    return text.length > 0;
  },
  // 密码验证
  checkpassword: function (password) {
    var word = password.trim();
    if (word.length == 0)
      // console.log("密码不能为空")
    var count = 0;
    if (/[0-9]/.test(word)) {
      count++;
    }
    if (/[A-Za-z]/.test(word)) {
      count++;
    }
    if (/[^0-9A-Za-z]/.test(word)) {
      count++;
    }
    if (count == 3 && word.length >= 6) {
      console.log("高强度")
    } else if (count == 2 && word.length >= 6) {
      console.log("中强度")
    } else {
      console.log("低强度")
    }
    return word >= 0;
  },
  //身份证验证
  identify: function (card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(card)) {
      // console.log("身份证输入不合法")
      return false
    }
    return true
  },
  // 联系电话验证
  number:function(num){
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if(!reg.test(num)){
      return false
    }
    return true
  },
  //至少n位的数字 --人数
  people:function(num){
   var reg = /^\d{1,}$/
   if(!reg.test(num)){
    return false
  }
  return true
  },
  register: function (event) {
    if (this.checkname() & this.checkpassword() & this.checkagree()) {

    } else {
      console.log(1);
      event.preventDefault();
    }
  }

}

