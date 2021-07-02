<template>
  <div id="container">
    <!-- 列表开始 -->
    <main>
      <ul class="list">
        <li class="list-card" v-for="(item, index) in userCards" :key="index">
          <i class="num">{{index+1}}</i>
          <div class="list-card-cont">
            <div id="charact" v-show="item.character === '运动员' || item.character === '替补运动员'">
              <div class="p_act">组别</div>
              <van-dropdown-menu>
                <van-dropdown-item v-model="item.groupId" :options="groupList" @change="getProject(index, item.groupId)"  />
              </van-dropdown-menu>
            </div>
            <div id="charact" v-show="item.character === '运动员' || item.character === '替补运动员'">
              <div class="p_act">项目</div>
              <van-dropdown-menu>
                <van-dropdown-item  v-model="item.itemId" :options="item.projectList" />
              </van-dropdown-menu>
            </div>
            <van-field v-model="item.applyerName" label="姓名" placeholder="请输入姓名" maxlength="6" />
            <van-field v-model="item.idCard" label="身份证号" placeholder="请输入证件号码" maxlength="18" />
            <van-field
              v-model="item.phone"
              type="number"
              label="手机号码"
              placeholder="请输入手机号码"
              maxlength="11"
            />
            <van-field
              v-model="item.unitPlace"
              label="所在单位"
              placeholder="请输入所在单位"
            />
            <div id="charact">
              <div class="p_act">角色</div>
              <van-dropdown-menu>
                <van-dropdown-item  v-model="item.character" :options="option1" />
              </van-dropdown-menu>
            </div>
             <van-field
              v-model="item.remark"
              label="备注信息"
              placeholder="请输入备注信息"
            />
          </div>
          <van-icon name="clear" @click="del(index)" />
        </li>
      </ul>
    </main>
    <!-- 列表结束 -->
    <!-- 底部按钮开始 -->
    <footer>
      <button class="add" @click="add">新成员</button>
      <button class="submit" @click="submit">提交</button>
    </footer>
    <!-- 底部按钮结束 -->
  </div>
</template>


<script>
import { cardid2, isvalidatemobile2, zlbFun } from '@/util/Tool'
import { group, project, insertTeamApplyer, getGroupConfig } from '@/http/api'
import { Dialog } from "vant"
export default {
  name: 'addPeople',
  data() {
    return {
      option1: [
        { text: '领队', value: '领队' },
        { text: "教练", value: "教练" },
        { text: '运动员', value: '运动员' },
        { text: '替补运动员', value: '替补运动员' }
      ],
      userCards: [
        {
          applyerName: '',
          idCard: '',
          phone: '',
          character: '领队',
          groupId: '',
          itemId: '',
          unitPlace:'',
          remark:'',
          projectList: [
            { text: '报名项目', value: '' }
          ]
          
        }
      ],
      groupList: [
        { text: '报名组别', value: '' }
      ],
      limitStart: "",
      limitEnd: "",
      startDate: "",
      endDate: "",
      issubm:false,
      countDown: false,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  created() {
    zlbFun('添加成员');
    this.initGroup();
  },
  methods: {
    //初始化组别
    initGroup() {
      group({
        actId: this.$route.query.id
      }).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            const arr = {
              text: item.groupName,
              value: item.id
            }
            this.groupList.push(arr)
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取项目配置
    getProject(index, value) {
      this.userCards[index].projectList = [
        { text: '报名项目', value: '' }
      ]
      this.userCards[index].itemId = ''
      if(value !== '') {
        this.initProject(index, value);
      }
      // this.getConfig(value);
    },
    // 初始化项目
    initProject(index, val) {
      project({
        actId: this.$route.query.id,
        groupId: val
      }).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            const arr = {
              text: item.itemName,
              value: item.id
            }
            this.userCards[index].projectList.push(arr)
          })
        }
      })
    },
    //获取组别配置
    getConfig(g_id) {
      getGroupConfig({
        groupId: g_id
      }).then(res => {
        if (res.code == 0) {
          this.startDate = res.birthStartTime;
          this.endDate = res.birthEndTime;
          this.limitStart = Number(res.birthStartTime.replace(/-/g, ''));
          this.limitEnd = Number(res.birthEndTime.replace(/-/g, ''));
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 添加新成员
    add() {
      this.userCards.push({
        applyerName: '',
        idCard: '',
        phone: '',
        character: '领队',
        groupId : '',
        itemId: '',
        unitPlace:'',
        remark:'',
        projectList: [
          { text: '报名项目', value: '' }
        ]
      })
    },
    // 删除新成员
    del(i) {
      this.userCards.splice(i, 1);
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
    /*
     提交
    */
    submit() {
      if (!this.interceptor()) return;
      const data = this.verify();
      if(this.issubm)return;
      const flag = data.movementActivityApplyer.some((val, index) => {
        return val.character === '运动员' || val.character === '替补运动员';
      });
      if (flag) {
        let arr = [];
        data.movementActivityApplyer.forEach((item, i) => {
          if(item.character === '运动员' || item.character === '替补运动员') {
            if(this.limitStart&&this.limitEnd){
            if (
              Number(item.idCard.substring(6, 14)) < this.limitStart ||
              Number(item.idCard.substring(6, 14)) > this.limitEnd
            ) {
              arr.push(item);
            }
            }
          }
        });
        if (arr.length > 0) {
          var str = '';
          arr.forEach((item, i) => {
            str += item.applyerName + ",";
          });
          return this.$toast(
            str +
              "出生日期超出限制，范围：" +
              this.startDate +
              "至" +
              this.endDate
          );
        }
      }
      if (data.movementActivityApplyer) {
        data.movementActivityApplyer.forEach(item => {
          delete item.projectList
          if(item.character === '教练' || item.character === '领导') {
            item.groupId = ''
            item.itemId = ''
          }
        })
        console.log(data);
        insertTeamApplyer(data).then(res => {
          if (res.code == 0) {
            Dialog.confirm({
              message: "保存成功，是否继续选择其他组别"
            })
              .then(() => {
                this.$router.go(0);
              })
              .catch(() => {
                this.$router.go(-3);
              });
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    /*
    groupId 组别id
    itemId 项目id
    actId 赛事id
    */
    verify() {
      this.issubm=false;
      const data = {
        teamId: this.$route.query.teamId,
        actId: this.$route.query.id,
        movementActivityApplyer: this.userCards
      }
      if (!data.actId) return this.$toast('无法获取赛事')
      if (!this.userCards.length) return this.$toast('至少选择一人')
      this.userCards.every(item => {
        const idCard = cardid2(item.idCard)
        const phone = isvalidatemobile2(item.phone)
        if(item.applyerName === '') {
          this.issubm=true;
          return this.$toast('姓名不能为空');
        }
        // alert(idCard[1] );
        // alert(phone[1] );
        // console.log(idCard);
        // console.log(phone);
        if(!idCard[0] || !phone[0]) {
          this.issubm=true;
          return this.$toast('手机号或身份证有误');
        }
        if(!item.unitPlace){
          this.issubm=true;
          return this.$toast('所在单位不能为空');
        }
        if ((item.character === '运动员' || item.character === '替补运动员') && (item.itemId === '' || item.groupId === '')) {
          this.issubm=true;
          return this.$toast('请完善组员信息');
        }
      })
      return data
    }
  },

};
</script>


<style scoped lang="less">
#charact {
  display: flex;
  padding: 5px 16px;
  .p_act {
    font-size: 14px;
    font-weight: normal;
    font-family: "Microsoft Yahei", serif;
    color: #646566;
  }
  /deep/.van-ellipsis {
    font-size: 14px;
  }
  /deep/.van-dropdown-menu__bar {
    height: 20px;
    box-shadow: none;
    padding-left: 3rem;
    font-size: 14px;
  }
  /deep/.van-popup--top {
    top: 0;
    left: 40%;
    width: 6rem;
  }
  /deep/.van-cell {
    padding: 6px 12px;
    justify-content: space-between;
  }
  /deep/.van-overlay {
    background-color: rgba(0, 0, 0, 0);
  }
  /deep/.van-cell__title, .van-cell__value{
    flex: none;
  }
}
#container {
  .list {
    padding-bottom: 5rem;
    .list-card {
      position: relative;
      margin: 10px 12px;
      background: #ffffff;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      .num {
        font-family: PingFangSC-Regular;
        position: absolute;
        height: 24px;
        width: 24px;
        color: white;
        text-align: center;
        font-size: 14px;
        line-height: 24px;
        background-color: #3bc531;
        border-radius: 2px 0 0 0;
      }
      .list-card-cont {
        margin-left: 48px;
        margin-right: 40px;
        padding: 10px 0;
        .van-cell {
          padding: 5px 16px;
        }
        /deep/ .van-dropdown-menu__title{
          padding: 0;
        }
        /deep/ .van-dropdown-menu__title::after {
          right: -20px;
        }
      }
      .van-icon-clear {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #ccc;
      }
      /deep/ .van-field__label {
        width: 70px;
      }
      .van-cell:not(:last-child)::after {
        display: none;
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66px;
    width: 100vw;
    line-height: 66px;
    padding: 0 7px;
    border-top: 1px solid #eee;
    button {
      margin: 5px;
      width: 50%;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
    }
    .add {
      font-family: PingFangSC-Regular;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #1492ff;
      background: #fafafa;
      border: 1px solid #1492ff;
      border-radius: 2px;
      &::before {
        content: "";
        display: inline-block;
        margin-right: 4px;
        height: 20px;
        width: 20px;
        background: url("../../assets/addddd.png") no-repeat center;
        background-size: cover;
      }
    }
    .submit {
      font-family: PingFangSC-Regular;
      color: #fff;
      background: #1492ff;
      border-radius: 2px;
    }
  }
}
</style>
