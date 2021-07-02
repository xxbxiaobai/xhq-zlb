<template>
  <div id="home">
    <!-- <Tabar :title="title"></Tabar> -->
    <div class="imgblock">{{peoplename}}团长邀请你加入</div>
    <div class="text">{{teamname}}</div>
    <div class="content">所属赛事：{{actname}}</div>
    <div class="btn">
      <button @click="$router.push({path: '/information',query:{id:$route.query.id,teamId:$route.query.teamId,idcard:$route.query.idcard,healthid:$route.query.healthid,startTime:$route.query.startTime}})">点击加入</button>
    </div>
  </div>
</template>

<script>
import Tabar from "../../components/Tabar"
import { zlbFun } from "@/util/Tool"
import { teamevent } from "../../http/api"
export default {
  data() {
    return {
      title: "团体报名",
      peoplename:'',
      teamname:'',
      actname:''

    }
  },
  components: { Tabar },
  methods: {
    getteamid(){
      teamevent({
        id:this.$route.query.teamId
      }).then(res=>{
        console.log(res)
        this.peoplename = res.data.leadName
        this.teamname = res.data.teamName
        this.actname = res.data.actName

      })
    }
  },

  created() {
    zlbFun("团体报名")
    this.getteamid()
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  height: 100%;
  padding-top: 3.5rem;
  background-color: #ffffff;
  div {
    font-size: 0.7rem;
    color: #666666;
    text-align: center;
    img {
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  .imgblock {

    font-size: .9rem;
    color: #000000;
    font-weight: 700;
  }
  .text {
    font-size: .7rem;
    color: #000000;
    font-weight: 700;
    margin-top: 2.25rem;
    margin-bottom: 0.8rem;
  }
  .content{
    padding:0 3rem;
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 9.3rem;
    button {
      width: 9.5rem;
      height: 2.05rem;
      background-color: #1492ff;
      color: #ffffff;
      font-size: 0.9rem;
      margin-top: 2.7rem;
      border-radius: .25rem;
    }
  }
}
</style>
