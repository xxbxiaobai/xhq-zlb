<template>
  <div
    class="container"
    id="app"
    style="background-color: #F6FAFD; width: 100%; height: 100%; position: absolute;"
  >
    <!--<div>
				<van-nav-bar title="在线报修" />
			</div>-->
    <van-form @submit="onClickRight">
      <div class="content">
        <div id="">
          <van-cell-group>
            <van-field
              v-model="title"
              label="标题"
              placeholder="请输入标题"
              :rules="[{ required: true, message: '请输入标题' }]"
            />
          </van-cell-group>
        </div>
        <div>
          <van-field
            readonly
            clickable
            label="报修场地"
            :value="value"
            placeholder="选择报修场地"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择报修场地' }]"
          />
        </div>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            title="选择场地"
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <div id="">
          <van-cell-group>
            <van-field
              v-model="name"
              label="联系人"
              placeholder="请输入联系人"
              :rules="[{ required: true, message: '请输入联系人' }]"
            />
          </van-cell-group>
        </div>
        <div id="">
          <van-cell-group>
            <van-field
              v-model="mobile"
              label="手机号"
              placeholder="请输入联系人电话"
              :rules="[{ required: true, message: '请输入联系人电话' }]"
            />
          </van-cell-group>
        </div>
        <div>
          <van-cell-group>
            <van-field
              v-model="message"
              rows="3"
              autosize
              label="报修内容"
              type="textarea"
              maxlength="100"
              placeholder="请输入报修内容"
              show-word-limit
              :rules="[{ required: true, message: '请输入报修内容' }]"
            />
          </van-cell-group>
        </div>

        <div class="imgup">
          <span id="">图片上传</span>
        </div>
        <div>
          <van-uploader
            v-model="fileList"
            :max-count="3"
            multiple
            :after-read="afterRead1"
          />
        </div>
      </div>
      <center style=" bottom: 60px; width: 100%;">
        <van-button
          style="background-color: #28CFB3; border: 0; margin-top: 30px; font-size: 16px; width: 230px; height: 40px;"
          type="info"
          round
          block
          native-type="submit"
        >
          提交
        </van-button>
      </center>
    </van-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { repairSubmit, base, point } from "../../http/api";
export default {
  data() {
    return {
      list: [],
      fileList: [],
      title: "",
      value: "",
      showPicker: false,
      columns: [],
      message: "",
      longitude: 0, //经度
      latitude: 0, //纬度
      city: "",
      locationStr: "", //转换之后的高德地图经纬度
      identity: [], //图片数组
      siteID: "",
      pointAddr: "",
      name: "",
      mobile: "",
    };
  },
  created() {
    this.getMyLocation();
  },
  computed: {
    ...mapGetters(["userMsg"]),
  },
  methods: {
    //第一部分
    //定位获得当前位置信息
    getMyLocation() {
      var geolocation = new qq.maps.Geolocation(
        "IWFBZ-NH7WF-5C5JS-JDWYX-7H74H-3OFTR",
        "我的报修"
      );
      //              geolocation.getIpLocation(this.showPosition, this.showErr);
      geolocation.getLocation(this.showPosition, this.showErr); //或者用getLocation精确度比较高
    },
    showPosition(position) {
      console.log(position);
      this.latitude = position.lat;
      this.longitude = position.lng;
      this.city = position.city;
      this.NearTheSite(this.latitude, this.longitude);
    },
    showErr() {
      console.log("定位失败");
      this.getMyLocation(); //定位失败再请求定位，测试使用
    },
    onConfirm(value) {
      this.value = value.text;
      this.siteID = value.id;
      this.pointAddr = value.addr;
      this.showPicker = false;
    },
    onClickRight() {
      //				alert(111111);
      this.TheReportSubmitted();
    },
    TheReportSubmitted() {
      this.$toast.loading({
        message: "请稍等...",
        forbidClick: true,
        loadingType: "spinner",
      });
      repairSubmit({
        repairContent: this.message,
        repairAddr: this.pointAddr,
        pointId: this.siteID,
        repairUserName: this.name,
        repairUserPhone: this.mobile,
        repairFileId: this.identity.join(","),
      })
        .then((response) => {
          console.log(response);
          if (response.code == 0) {
            this.$toast("报修成功");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    NearTheSite(lat, lng) {
      point({
        orderType: 1,
        pointX: lat,
        pointY: lng,
        page: 1,
        limit: 10,
      })
        .then((response) => {
          console.log(response);
          if (response.code == 0) {
            response.data.forEach((item) => {
              var val = {
                text: item.pointName,
                id: item.id,
                addr: item.pointAddr,
              };
              this.columns.push(val);
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //图片上传
    afterRead1(file) {
      console.log(file);
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      const that = this;
      const img = new Image();
      img.src = file.content;
      this.compress(img, (compressRes) => {
        base({
          base: compressRes,
        }).then((res) => {
          console.log(res);
          if (res.resp_code == 0) {
            this.identity.push(res.datas.id);
          }
          console.log(this.identity);
        });
      });
      // 此时可以自行将文件上传至服务器
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
    },
  },
  mounted() {},
};

components: {
}
</script>
<style scoped lang="less">
// @import "../../style/blend.css";
.content {
  background-color: white;
  margin: 10px;
  height: 58%;
  border-radius: 10px;
}
.imgup {
  margin-top: 10px;
  margin-left: 15px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
.van-uploader {
  margin-left: 15px;
}
.van-field__label {
  color: black;
  font-weight: bold;
}

.van-card__desc {
  padding-top: 25px;
  font-size: 11px;
  color: #999999;
}

.van-card__title {
  font-size: 13px;
  color: #464646;
}

.van-card__price {
  font-size: 11px;
  color: #999999;
}

.van-card__num {
  font-size: 10px;
  color: #00e3aa;
}

.van-card__thumb {
  width: 120px;
  height: 90px;
}

.van-card {
  padding: 0px;
}
</style>
<style>
/* #container .van-uploader__upload {
  background-color: #e1e1e1;
}
#container .van-uploader__preview-image,
#container .van-uploader__upload {
  height: 5.4rem;
  width: 5.4rem;
}
#container .van-uploader__upload-icon {
  color: #b6b6b6;
  font-size: 28px;
}
#container .van-uploader__preview {
  position: relative;
  margin: 0 0.4rem 0.7rem 0;
} */
</style>
