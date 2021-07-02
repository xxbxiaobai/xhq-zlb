<template>
  <div id="container" class="detail-list">
    <!-- 头部开始 -->
    <!-- <van-nav-bar
      :title="title"
      right-text="审核"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />-->
    <div class="head">
      <div class="head-img">
        <img v-if="!!selectTeenager.fileInfoUrl" :src="img" alt />
        <img v-else src="../../assets/head.png" alt />
      </div>
    </div>
    <!-- 头部结束 -->

    <!-- 表单开始 -->
    <div>
      <van-cell-group>
        <div class="van-cell van-cell--clickable van-field">
          <div class="van-cell__title van-field__label">
            <span>注册点:</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body popup">
              <div class="black">{{selectTeenager.teenRegiPlaceName}}</div>
              <span>市</span>
            </div>
          </div>
        </div>
        <div class="van-cell van-cell--clickable van-field">
          <div class="van-cell__title van-field__label">
            <span>代表地区:</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body popup">
              <div class="black">{{selectTeenager.teenRepresentCityName}}</div>
              <span>市</span>
              <div class="black">{{selectTeenager.teenRepresentAreaName}}</div>
              <span>区/县</span>
            </div>
          </div>
        </div>
        <!-- <van-field
          :value="selectTeenager.teenIdCard"
          type="number"
          label="身份证号："
          placeholder
          maxlength="18"
          disabled
        />-->
        <div class="van-cell idcard-text">
          <span>身份证号：</span>
          {{selectTeenager.teenIdCard|hideMiddle}}
        </div>
        <div class="van-cell van-cell--clickable van-field">
          <div class="van-cell__title van-field__label">
            <span>户籍派出所：</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body popup">
              <div class="black">{{selectTeenager.teenHouseholdProvinceName}}</div>
              <div class="black">{{selectTeenager.teenHouseholdCityName}}</div>
              <div class="black">{{selectTeenager.teenHouseholdAreaName}}</div>
            </div>
          </div>
        </div>
        <van-field
          v-model="selectTeenager.teenName"
          clearable
          label="姓名："
          placeholder
          maxlength="4"
          disabled
        />
        <van-field label="性别：" :value="selectTeenager.teenSex" placeholder disabled />
        <van-field label="出生年月：" :value="selectTeenager.teenBirthday" placeholder disabled />
        <van-field v-model="selectTeenager.teenNation" clearable label="民族：" placeholder disabled />
        <van-field
          v-model="selectTeenager.teenHeight"
          clearable
          label="身高(cm)："
          placeholder
          disabled
        />
        <van-field
          v-model="selectTeenager.teenWeight"
          clearable
          label="体重(kg)："
          placeholder
          disabled
        />
        <van-field v-model="selectTeenager.teenAddress" clearable label="住址：" placeholder disabled />
        <van-field
          v-model="selectTeenager.teenSchoolProvince"
          clearable
          label="就读省份："
          placeholder
          disabled
        />
        <van-field
          v-model="selectTeenager.teenSchool"
          clearable
          label="就读学校："
          placeholder
          disabled
        />
        <!-- <van-field
          v-model="selectTeenager.teenSchoolNumber"
          clearable
          label="学籍辅号："
          placeholder
          disabled
        />-->
        <div class="van-cell idcard-text">
          <span>学籍辅号：</span>
          {{selectTeenager.teenSchoolNumber|hideMiddle2}}
        </div>
        <van-field
          v-model="selectTeenager.teenSchoolGrade"
          clearable
          label="年级："
          placeholder
          disabled
        />
        <!-- <div class="van-cell van-cell--clickable van-field">
          <div class="van-cell__title van-field__label">
            <span>所属地区</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body popup">
              <div>{{selectTeenager}}</div>
              <span>市</span>
              <div>{{selectTeenager}}</div>
              <span>区/县</span>
            </div>
          </div>
        </div>-->
        <van-field
          readonly
          clickable
          label="训练单位："
          :value="selectTeenager.teenTrainUnitName"
          placeholder
          disabled
        />
        <van-field
          v-model="selectTeenager.teenAgreementTime"
          clearable
          label="协议期："
          placeholder
          disabled
        />
        <div
          class="start-time"
        >入训时间：&nbsp;&nbsp;&nbsp;&nbsp;{{selectTeenager.teenTrainStart}}——{{selectTeenager.teenTrainEnd}}</div>
        <van-field
          v-model="selectTeenager.teenRegiItemName"
          clearable
          label="注册项目："
          placeholder
          disabled
        />
      </van-cell-group>
    </div>
    <div v-if="selectTeenager.competitionGuarder">
      <p class="split">监护人信息</p>
      <!-- <van-field
      v-model="selectTeenager.competitionGuarder.guarderIdCard"
      clearable
      label="身份证号："
      placeholder
      disabled
      />-->
      <div class="van-cell idcard-text">
        <span>身份证号：</span>
        {{selectTeenager.competitionGuarder.guarderIdCard |hideMiddle}}
      </div>
      <van-field
        label="性别："
        :value="selectTeenager.competitionGuarder.guarderSex"
        placeholder
        disabled
      />
      <van-field
        v-model="selectTeenager.competitionGuarder.guarderName"
        clearable
        label="姓名："
        placeholder
        maxlength="4"
        disabled
      />
      <van-field
        v-model="selectTeenager.competitionGuarder.guarderPhone"
        clearable
        label="联系方式："
        placeholder
        maxlength="11"
        disabled
      />
    </div>
    <p class="split">教练信息</p>
    <div class="van-cell van-cell--clickable van-field">
      <div class="van-cell__title van-field__label">
        <span>所属区县</span>
      </div>
      <div class="van-cell__value">
        <div class="van-field__body popup">
          <div class="black">{{selectTeenager.competitionCoach.unitBean.cityName}}</div>
          <span>市</span>
          <div class="black">{{selectTeenager.competitionCoach.unitBean.districtName}}</div>
          <span>区/县</span>
        </div>
      </div>
    </div>
    <van-field
      v-model="selectTeenager.competitionCoach.unitBean.unitType"
      clearable
      label="单位："
      placeholder
      disabled
    />
    <van-field
      v-model="selectTeenager.competitionCoach.coachRegiItemName"
      clearable
      label="项目："
      placeholder
      disabled
    />
    <van-field
      v-model="selectTeenager.competitionCoach.coachName"
      clearable
      label="带训教练"
      placeholder
      disabled
    />
    <van-field
      v-model="selectTeenager.competitionCoach.coachPhone"
      clearable
      label="联系方式："
      placeholder
      disabled
    />
    <van-field
      v-model="selectTeenager.competitionCoach.coachTechnicalGrade"
      clearable
      label="技术等级："
      placeholder
      disabled
    />
    <section>
      <article class="coach" v-for="(item,i) in coach" :key="i">
        <div class="coach-title">
          <p class="split">教练员</p>
          <i class="van-icon van-icon-cross" @click="delCoach(i)" v-if="status"></i>
        </div>
        <div class="van-cell van-cell--clickable van-field" @click="getArea(i)">
          <div class="van-cell__title van-field__label">
            <span>所属区县</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body popup">
              <div class="black">{{item.city||'请选择'}}</div>
              <span>市</span>
              <div class="black">{{item.area||'请选择'}}</div>
              <span>区/县</span>
            </div>
          </div>
        </div>
        <van-field
          v-model="item.unit"
          clearable
          label="单位："
          placeholder
          disabled
          @click="getUnit(i)"
        />
        <van-field
          v-model="item.project"
          clearable
          label="项目："
          placeholder
          disabled
          @click="getProject(i)"
        />
        <van-field
          v-model="item.coach"
          clearable
          label="带训教练"
          placeholder
          disabled
          @click="getCoach(i)"
        />
        <van-field v-model="item.phone" clearable label="联系方式：" placeholder disabled />
        <van-field v-model="item.grade" clearable label="技术等级：" placeholder disabled />
      </article>
    </section>

    <p data-v-531dee12 class="split">处理进度</p>
    <div class="date">
      <!-- 时间线 90 -->
      <div :class="classStatus">
        <p>
          <span>{{schedule[0]}}</span>
        </p>
        <p>
          <span>{{schedule[1]}}</span>
        </p>
        <p>
          <span>{{schedule[2]}}</span>
        </p>
        <p>
          <span>{{schedule[3]}}</span>
        </p>
      </div>
    </div>
    <!-- 表单结束 -->
    <!-- 遮罩层 -->
    <van-overlay :show="show" />
    <!-- 弹窗 -->
    <div class="popup-window-top" v-show="show">
      <div class="title">
        审核意见
        <van-icon @click="closePopup" size="1rem" name="cross" />
      </div>
      <div class="main">
        <textarea v-model="textareaText" placeholder="请输入审核意见"></textarea>
      </div>
    </div>
    <!-- 弹窗 -->
    <div v-if="coach.length">
      <van-popup v-model="showPopup.area" position="bottom">
        <van-picker
          show-toolbar
          title="选择地区"
          :columns="columns"
          @confirm="onRegion"
          @change="onChange"
          @cancel="showPopup.area=false"
        />
      </van-popup>
      <van-popup v-model="showPopup.unit" position="bottom">
        <van-picker
          show-toolbar
          :columns="coach[index].unitList"
          @cancel="showPopup.unit=false"
          @confirm="onUnit"
        />
      </van-popup>
      <van-popup v-model="showPopup.project" position="bottom">
        <van-picker
          show-toolbar
          :columns="coach[index].projectList"
          @cancel="showPopup.project=false"
          @confirm="onProject"
        />
      </van-popup>
      <van-popup v-model="showPopup.coach" position="bottom">
        <van-picker
          show-toolbar
          :columns="coach[index].coachList"
          @cancel="showPopup.coach=false"
          @confirm="onCoach"
        />
      </van-popup>
    </div>
    <div class="popup-button" v-show="show">
      <button @click="passClick" :disabled="isCanClick">审核通过</button>
      <button @click="noPassClick" :disabled="isCanClick">审核不通过</button>
    </div>
    <!-- 弹窗结束 -->
    <div class="btn-warp" v-if="status">
      <button class="btn1" @click="addCoach">添加教练员</button>
      <button class="btn2" @click="onClickRight">审核</button>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import {
  selectTeenager,
  coachCheck,
  findRegionArea,
  findApiUnit,
  dxCoach,
  selectItem,
  selectOtherCoach,
  userImg
} from "../../http/api";
import { formatDateTime, zlbFun } from "@/util/Tool";
const region = {}; //地区
const sportEvent = []; //运动项目
var citys = { 浙江: ["杭州"] };
export default {
  data() {
    return {
      index: 0,
      status: true,
      img: "",
      columns: [
        {
          values: Object.keys(citys),
          className: "column1"
        },
        {
          values: citys["浙江"],
          className: "column2",
          defaultIndex: 2
        }
      ],
      isCanClick: false,
      title: "",
      textareaText: "",
      show: false,
      showPopup: {
        area: false,
        unit: false,
        project: false,
        coach: false
      },
      coach: [], //教练
      coachId: sessionStorage.getItem("coachId"), //获取当前教练id
      //====================================
      //  参数
      //====================================
      selectTeenager: {
        // teenRegiPlace: "", //注册点
        // teenRepresentCity: "", //代表城市
        // teenRepresentArea: "", //代表地区
        // teenIdCard: "", //身份证号
        // teenHouseholdCity: "", //户籍城市
        // teenHouseholdArea: "", //户籍地区
        // teenName: "", //姓名
        // teenSex: "", //性别
        // teenBirthday: "", //出生日期
        // teenNation: "", //民族
        // teenHeight: "", //身高
        // teenWeight: "", //体重
        // teenAddress: "", //住址
        // teenSchoolProvince: "", //就读省份
        // teenSchool: "", //就读学校
        // teenSchoolNumber: "", //学籍辅号
        // teenSchoolGrade: "", //年级
        // teenTrainUnit: "", //训练单位
        // teenAgreementTime: "", //协议期
        // teenTrainStart: "", //入训时间
        // teenTrainEnd: "", //入训结束时间
        // teenRegiItemId: "", //注册项目
        competitionGuarder: {
          // guarderIdCard: "",
          // guarderSex: "",
          // guarderName: "",
          // guarderPhone: ""
        },
        competitionCoach: {
          // coachRepresentCity: "",
          // coachRepresentArea: "",
          // coachRegiUnit: "",
          // coachName: "",
          // coachPhone: "",
          // coachRegiItemId: "",
          // coachTechnicalGrade: ""
          unitBean: {}
        }
      },
      classStatus: "", //审核样式状态
      schedule: ["教练审核", "区县审核", "市体育局审核", "省体育局审核"] //审核进度
    };
  },
  computed: {
    ...mapGetters(["userMsg"])
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  filters: {
    hideMiddle(val) {
      if (!val) return;
      return `${val.substring(0, 1)}************${val.substring(
        val.length - 1
      )}`;
    },
    hideMiddle2(val) {
      if (!val) return;
      return `${val.substring(0, 3)}**********${val.substring(val.length - 3)}`;
    }
  },
  methods: {
    /**
      审核状态
      1：数据存在 2:数据不存在  3:未提交   4:教练待审核(coach-wait)  5:教练审核未通过(coach-no)   6:区县待审核(county-wait)  
      7:区县审核未通过(county-no)  8:单位待审核(unit-wait)   9:单位审核未通过(unit-no)     10:市待审核(city-wait)   
      11:市审核未通过(city-no)   12:省待审核(province-wait)   13:省审核未通过(province-no)   14:省审核通过(province-ok)
     */
    statusCheck(status) {
      switch (Number(status)) {
        case 4:
          this.schedule = [
            "教练审核中",
            "区县审核",
            "市体育局审核",
            "省体育局审核"
          ];
          return "coach-wait";
        case 5:
          this.schedule = [
            "教练审核未通过",
            "区县审核",
            "市体育局审核",
            "省体育局审核"
          ];
          return "coach-no";
        case 6:
          this.schedule = [
            "教练确认通过",
            "区县/单位审核中",
            "市体育局审核",
            "省体育局审核"
          ];
          return "county-wait";
        case 7:
          this.schedule = [
            "教练确认通过",
            "区县审核未通过",
            "市体育局审核",
            "省体育局审核"
          ];
          return "county-no";
        case 8:
          console.log("代码块");
          this.schedule = [
            "教练确认通过",
            "区县/单位审核中",
            "市体育局审核",
            "省体育局审核"
          ];
          return "unit-wait";
        case 9:
          this.schedule = [
            "教练确认通过",
            "单位审核未通过",
            "市体育局审核",
            "省体育局审核"
          ];
          return "unit-no";
        case 10:
          this.schedule = [
            "教练确认通过",
            "区县/单位确认通过",
            "市体育局审核中",
            "省体育局审核"
          ];
          return "city-wait";
        case 11:
          this.schedule = [
            "教练确认通过",
            "区县/单位确认通过",
            "市体育局审核未通过",
            "省体育局审核"
          ];
          return "city-no";
        case 12:
          this.schedule = [
            "教练确认通过",
            "区县/单位确认通过",
            "市体育局确认通过",
            "省体育局审核中"
          ];
          return "province-wait";
        case 13:
          this.schedule = [
            "教练确认通过",
            "区县/单位确认通过",
            "市体育局确认通过",
            "省体育局审核未通过"
          ];
          return "province-no";
        case 14:
          this.schedule = [
            "教练确认通过",
            "区县/单位确认通过",
            "市体育局确认通过",
            "省体育局确认通过"
          ];
          return "province-ok";

        case 15:
          this.schedule = [
            "教练确认通过",
            "区县/单位审核中",
            "市级驳回至区县",
            "省体育局审核"
          ];
          return "unit-wait";
        case 16:
          this.schedule = [
            "教练确认通过",
            "区县/单位确认通过",
            "市体育局审核中",
            "省级驳回到市级"
          ];
          return "city-wait";
        default:
          return "status";
      }
    },

    //点击跳转
    onClickLeft() {
      this.$router.push("/coachReview");
    },
    //点击审核
    onClickRight() {
      if (this.$route.query.status == 4) {
        this.show = true;
      } else {
        this.$toast("已审核过");
      }
    },
    /**
     * 点击获取地区
     */
    getArea(i) {
      if (!this.status) return;
      this.index = i;
      this.showPopup.area = true;
    },
    /**
     * 点击获取单位
     */
    getUnit(i) {
      if (!this.status) return;
      this.index = i;
      if (!this.coach[i].unitList) return this.$toast("请选择地区");
      this.showPopup.unit = true;
    },
    /**
     * 点击获取项目
     */
    getProject(i) {
      if (!this.status) return;
      this.index = i;
      if (!this.coach[i].projectList) return this.$toast("请选择单位");
      this.showPopup.project = true;
    },
    /**
     * 点击获取教练
     */
    getCoach(i) {
      if (!this.status) return;
      this.index = i;
      if (!this.coach[i].coachList) return this.$toast("请选择项目");
      if (!this.coach[i].coachList.length) return this.$toast("暂无教练");
      this.showPopup.coach = true;
    },

    /**
     * 添加教练
     */
    addCoach() {
      if (!this.status) return;
      if (this.coach.length >= 2) return;
      this.coach.push({
        city: "", //市内
        area: "", //区县
        unit: "请选择", //单位
        unitId: "", //单位ID
        unitList: "", //单位列表
        project: "请选择", //项目
        projectList: "", //项目列表
        coach: "请选择", //教练
        coachId: "", //教练Id
        coachList: "", //教练列表
        phone: "", //联系方式
        grade: "" //技术等级
      });
    },

    /**
     * 删除教练
     */
    delCoach(i) {
      this.coach.splice(i, 1);
      console.log(i);
    },

    //关闭弹窗
    closePopup() {
      this.show = false;
      console.log(this.selectTeenager);
    },
    //审核通过（验证）
    passClick() {
      this.isCanClick = true;
      setTimeout(() => {
        this.isCanClick = false;
      }, 2000);
      if (this.textareaText) {
        const teenagerId = this.$route.query.teenagerId;
        const coach = this.coach;
        const data = {
          id: teenagerId,
          coachId2: "",
          coachId3: ""
        };
        if (!coach.length) return this.okPassClick();
        if (coach.length == 1) {
          data.coachId2 = coach[0].coachId;
          if (!data.coachId2) return this.$toast("请完善教练信息");
        } else {
          data.coachId2 = coach[0].coachId;
          data.coachId3 = coach[1].coachId;
          if (!data.coachId2 || !data.coachId3) {
            return this.$toast("请完善教练信息");
          }
        }
        selectOtherCoach(data).then(res => {
          if (res.code) return;
          this.okPassClick();
        });
      } else {
        this.isCanClick = false;
        this.$toast("请输入审核意见");
      }
    },

    //审核通过
    okPassClick() {
      const teenagerId = this.$route.query.teenagerId;
      coachCheck({
        coachId: this.coachId,
        teenagerId,
        coachCheckOpinion: this.textareaText,
        coachCheckStatus: 1
      }).then(res => {
        this.$router.go(-1);
        this.$toast(res.msg);
        this.show = false;
      });
    },

    //审核不通过
    noPassClick() {
      this.isCanClick = true;
      setTimeout(() => {
        this.isCanClick = false;
      }, 2000);
      const teenagerId = this.$route.query.teenagerId;
      if (this.textareaText !== "") {
        coachCheck({
          coachId: this.coachId,
          teenagerId: teenagerId,
          coachCheckOpinion: this.textareaText,
          coachCheckStatus: 2
        }).then(res => {
          this.$router.go(-1);
          this.$toast(res.msg);
          this.show = false;
        });
      } else {
        this.isCanClick = false;
        this.$toast("请输入审核意见");
      }
    },
    idMessage(val) {
      if (!val) return;
      return `${val.substring(0, 4)}************${val.substring(
        val.length - 2
      )}`;
    },

    /**
     * 获取城市
     */
    region() {
      findRegionArea().then(res => {
        let [list, key] = [{}, []];
        res.data.forEach((item, i) => {
          let text = item.name.substr(0, item.name.length - 1);
          key[i] = { id: item.id, text: text };
          list[item.name.substr(0, item.name.length - 1)] = [
            { id: item.id, text: "市本级" },
            ...item.data.map(msg => {
              let length = msg.name.length;
              let text = msg.name.substr(0, length - 1);
              return {
                id: msg.id,
                text: text
              };
            })
          ];
        });
        citys = list;
        this.columns = [
          {
            values: Object.keys(citys),
            className: "column1"
          },
          {
            values: citys["杭州"],
            className: "column2",
            defaultIndex: 0
          }
        ];
      });
    },

    //点击获取城市
    onRegion(value) {
      console.log(value);
      const i = this.index;
      this.coach[i].city = value[0];
      this.coach[i].area = value[1].text;
      if (value[1].text === "市本级") {
        this.unit(value[1].id, 2, true);
      } else {
        this.unit(value[1].id, 2);
      }
      this.showPopup.area = false;
      this.coach[i].unit = "请选择";
      this.coach[i].project = "请选择";
      this.coach[i].coach = "请选择";
      this.coach[i].phone = "";
      this.coach[i].grade = "";
    },

    //点击获取单位
    onUnit(value) {
      const i = this.index;
      this.coach[i].unit = value.text;
      this.coach[i].unitId = value.id;
      this.project(value.id);
      this.showPopup.unit = false;
      this.coach[i].project = "请选择";
      this.coach[i].coach = "请选择";
      this.coach[i].phone = "";
      this.coach[i].grade = "";
    },

    //点击获取项目
    onProject(value) {
      const i = this.index;
      console.log(value);
      this.coach[i].project = value.text;
      this.setCoachId(this.coach[i].unitId, value.id);
      this.showPopup.project = false;
      this.coach[i].coach = "请选择";
      this.coach[i].phone = "";
      this.coach[i].grade = "";
    },

    //点击获取教练信息
    onCoach(value) {
      const i = this.index;
      console.log(value);
      this.coach[i].coach = value.text;
      this.coach[i].coachId = value.id;
      this.coach[i].phone = value.phone;
      this.coach[i].grade = value.grade;
      this.showPopup.coach = false;
    },

    //滚动效果
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },

    /**
     *  查询单位
     */
    unit(district, unitDifferent, city) {
      let unit = { district, unitDifferent };
      if (city) {
        unit.city = district;
        unit.district = -1;
      }
      findApiUnit(unit).then(res => {
        let list = res.data.map(msg => {
          return {
            id: msg.id,
            text: msg.unitType
          };
        });
        this.coach[this.index].unitList = list;
      });
    },

    /**
     * 查询运动项目
     */
    project(coachUnit) {
      selectItem({ coachUnit }).then(res => {
        this.coach[this.index].projectList = res.data.map(item => {
          return {
            id: item.dataValue,
            text: item.dataName
          };
        });
      });
    },

    /**
     * 教练Id查询
     * unit:单位    project:项目
     */
    setCoachId(unit, project) {
      dxCoach({
        coachUnit: unit,
        coachRegiItem: project
      }).then(res => {
        let list = res.data.map(msg => {
          return {
            id: msg.id,
            text: msg.coachName,
            phone: msg.coachPhone,
            grade:
              msg.coachTechnicalGrade && msg.coachTechnicalGrade !== "请选择"
                ? msg.coachTechnicalGrade
                : "暂无"
          };
        });
        this.coach[this.index].coachList = list;
      });
    }
  },

  created() {
    const teenagerId = this.$route.query.teenagerId;
    this.title = this.$route.query.teenName;
    zlbFun(this.title);
    //获取青少年信息
    selectTeenager({ id: teenagerId }).then(res => {
      const data = (this.selectTeenager = res.data[0]);

      let project = `${data.competitionCoach.coachRegiItemName || ""}  ${data
        .competitionCoach.coachRegiItemName2 || ""}  ${data.competitionCoach
        .coachRegiItemName3 || ""}`;
      this.selectTeenager.competitionCoach.coachRegiItemName = project;
      this.classStatus = this.statusCheck(this.$route.query.status); //新的
      if (data.fileInfoUrl) this.img = userImg + data.fileInfoUrl;
      if (data.competitionCoach2 && this.$route.query.status != 4) {
        const coach2 = data.competitionCoach2;
        const coach3 = data.competitionCoach3;
        this.coach.push({
          city: coach2.unitBean.cityName || " ", //市内
          area: coach2.unitBean.districtName || " ", //区县
          unit: coach2.coachUnitName, //单位
          project: coach2.coachRegiItemName, //项目
          coach: coach2.coachName, //教练
          phone: coach2.coachPhone, //联系方式
          grade:
            !coach2.coachRefereeGrade || coach2.coachRefereeGrade === "请选择"
              ? "暂无"
              : coach2.coachRefereeGrade //技术等级
        });
        if (!data.competitionCoach3) return;
        this.coach.push({
          city: coach3.unitBean.cityName || "", //市内
          area: coach3.unitBean.districtName || "", //区县
          unit: coach3.coachUnitName, //单位
          project: coach3.coachRegiItemName, //项目
          coach: coach3.coachName, //教练
          phone: coach3.coachPhone, //联系方式
          grade:
            !coach3.coachRefereeGrade || coach3.coachRefereeGrade === "请选择"
              ? "暂无"
              : coach3.coachRefereeGrade //技术等级
        });
      }
    });
    //初始化城市信息
    this.region();
    if (this.$route.query.status != 4) {
      this.status = false;
    }
  }
};
</script>


<style scoped lang="less">
@wait: "okno";
@ok: "tongguo";
@no: "butongguo";

.check(@colorText,@colorStatus,@color:#eee) {
  margin-left: 0.35rem;
  padding-left: 0.9rem;
  height: 6rem;
  text-align: left;
  border-left: 2px solid @color;
  p {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.2rem;
    color: #999999;
    font-size: 0.7rem;
    line-height: 0.7rem;
    > span:nth-child(2) {
      color: #999999;
      font-size: 0.6rem;
      line-height: 0.6rem;
    }
    &::before {
      content: "";
      position: absolute;
      left: -1.3rem;
      height: 0.7rem;
      width: 0.7rem;
      background: url("../../assets/@{ok}.png") no-repeat center;
      background-size: cover;
    }
    .Status(4);
  }
}

//循环
.Status(@i:3) when (@i > 0) {
  &:nth-child(@{i}) {
    color: extract(@colorText, @i);
    &::before {
      .backgroundcard(extract(@colorStatus, @i));
    }
  }
  .Status(@i - 1);
}

.backgroundcard(@img) {
  background: url("../../assets/@{img}.png") no-repeat center;
  background-size: cover;
}

.date {
  padding: 15px 25px;
  background-color: white;
  &::before {
    content: "";
    position: absolute;
    right: 0;
    margin-top: -0.8rem;
    width: 100vw;
    height: 0.05rem;
    background-color: #f1f1f1;
  }

  // 状态开始
  .status,
  .coach-wait {
    // @check:@
    @color: #bdbdbd, #bdbdbd, #bdbdbd, #bdbdbd;
    @status: "okno", "okno", "okno", "okno";
    .check(@color, @status);
  }
  .coach-no {
    @color: #e02020, #bdbdbd, #bdbdbd, #bdbdbd;
    @status: "butongguo", "okno", "okno", "okno";
    .check(@color, @status);
  }
  .county-wait,
  .unit-wait {
    @color: #0091ff, #bdbdbd, #bdbdbd, #bdbdbd;
    @status: "tongguo", "okno", "okno", "okno";
    .check(@color, @status);
  }
  .county-no,
  .unit-no {
    @color: #0091ff, #e02020, #bdbdbd, #bdbdbd;
    @status: "tongguo", "butongguo", "okno", "okno";
    .check(@color, @status);
  }
  .city-wait {
    @color: #0091ff, #0091ff, #bdbdbd, #bdbdbd;
    @status: "tongguo", "tongguo", "okno", "okno";
    .check(@color, @status);
  }
  .city-no {
    @color: #0091ff, #0091ff, #e02020, #bdbdbd;
    @status: "tongguo", "tongguo", "butongguo", "okno";
    .check(@color, @status);
  }
  .province-wait {
    @color: #0091ff, #0091ff, #0091ff, #bdbdbd;
    @status: "tongguo", "tongguo", "tongguo", "okno";
    .check(@color, @status);
  }
  .province-no {
    @color: #0091ff, #0091ff, #0091ff, #e02020;
    @status: "tongguo", "tongguo", "tongguo", "butongguo";
    .check(@color, @status);
  }
  .province-ok {
    @color: #0091ff, #0091ff, #0091ff, #0091ff;
    @status: "tongguo", "tongguo", "tongguo", "tongguo";
    .check(@color, @status, #80c8ff);
  }
}

.coach {
  .coach-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      position: absolute;
      right: 20px;
      height: 20px;
      width: 20px;
      color: #a6b0bd;
    }
  }
}

.idcard-text > span {
  width: 90px;
}
.btn-warp {
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
  font-size: 0.7rem;
  background-color: #f1f1f1;

  .btn1,
  .btn2 {
    margin-bottom: 0.5rem;
    width: 90%;
    height: 2rem;
    border-radius: 0.2rem;
  }
  .btn1 {
    margin-right: 5px;
    background-color: #fff;
  }
  .btn2 {
    margin-left: 5px;
    color: #ffffff;
    background-color: #0091ff;
  }
}
#container {
  .start-time {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
  }
  .start-time::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .black {
    color: #333333;
  }
  min-height: 100vh;
  width: 100vw;
  background-color: #f1f1f1;
  .van-nav-bar .van-icon {
    color: #1989fa;
    vertical-align: middle;
  }
  .van-nav-bar {
    background-color: #ffffff;
    .van-nav-bar__right {
      .van-nav-bar__text {
        color: #333333;
      }
    }
    div {
      color: #323233;
    }
  }
  // .van-nav-bar {
  //   background-color: #0091ff;

  //   div,
  //   .van-icon,
  //   .van-nav-bar__text {
  //     color: white;
  //   }
  // }
  //头部
  .head {
    padding-top: 2rem;
    width: 100vw;
    height: 10rem;
    text-align: center;
    background: url("../../assets/timg.png") no-repeat center;
    background-size: cover;
    .head-img {
      margin: auto;
      margin-bottom: 0.6rem;
      height: 6rem;
      width: 6rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-position: 50% 50%;
        object-fit: cover;
      }
    }
  }
  .popup {
    div {
      max-width: 50%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      display: inline-block;
      margin: 0 0.8rem 0 0.5rem;
      font-weight: 600;
      color: #333;
    }
  }
  .split {
    font-size: 0.7rem;
    margin: 0.6rem;
  }
  .popup-button {
    position: fixed;
    bottom: 1.25rem;
    z-index: 2;
    text-align: center;
    font-family: "PingFangSC-Medium,PingFangSC";
    button {
      font-size: 0.7rem;
      width: 16.8rem;
      height: 2.1rem;
      line-height: 2.1rem;
      border-radius: 0.2rem;
      background-color: #eaeef3;
    }
    button:nth-child(1) {
      margin-bottom: 0.6rem;
      background-color: #0091ff;
      color: #ffffff;
    }
  }
  .popup-window-top {
    position: fixed;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 16.8rem;
    height: 14.05rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.6rem;
    .title {
      padding: 0.9rem 1.4rem 0.6rem 1.4rem;
      border-bottom: 0.05rem solid #eaeef3;
      font-size: 0.7rem;
      color: #a6b0bd;
      .van-icon {
        float: right;
      }
    }
    .main {
      text-align: center;
      textarea {
        font-size: 0.7rem;
        padding: 0.4rem;
        margin-top: 0.5rem;
        width: 14.8rem;
        height: 10.5rem;
        background: rgba(241, 241, 241, 1);
        border-radius: 4px;
      }
    }
  }
}
</style>
<style lang="less">
.detail-list {
  .van-field__control:disabled {
    color: #333333 !important;
    -webkit-text-fill-color: #333333 !important;
    background-color: transparent;
    opacity: 1;
  }
}
</style>