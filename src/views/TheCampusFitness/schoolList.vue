<template>
    <div class="app">   
        <div class="top">
        <div class="schoolName">{{schoolList.schoolName}}</div>
        <div class="schoolAddress"><div>地址：</div>{{schoolList.schoolSite}}</div>
        <div class="top_img">
            <img src="../../assets/school.jpg" alt="" style="width:100%">
        </div> 
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="text">开放时段</div>
            <div class="text1">开放时段：{{schoolList.schoolOpenTime}}</div>
            <div class="text">备注信息</div>
            <div class="text1">备注信息：{{schoolList.remarks}}</div>
        </div>
    </div>
  
</template>

<script>
import {
 fitnessDetails
} from "../../http/api";
export default {
    data(){
        return{
            schoolList:[]
        }
    },
    methods:{
        getFitnessDetails(){
            fitnessDetails({schoolName:this.$route.query.id}).then(res=>{
                console.log(res)
                this.schoolList = res.data
            })
        },
        goBack(){
            console.log(123)
            sessionStorage.clear();
            // window.history.back();
            this.$router.push({
            path:'/perMap',
            query:{
                index:'1',
                showLoading:false
            }
            })
        }
    },
     created(){
        console.log(this.$route.query.id)
        this.getFitnessDetails()
    },
    mounted(){
         if (window.history && window.history.pushState) {
        // 向历史记录中插入了当前页
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
    }
    },
    destroyed (){
        window.removeEventListener('popstate', this.goBack, false);
    }
}
</script>
<style >
body{
    background-color: #fff;
    text-align: left;
}
</style>
<style scoped>

.top{
    width: 100%;
    padding: 0 12px;
    color: #333;
    background-color:#fff;
    /* height: 20px; */
}
.schoolName{
    margin-top: 33px;
    width: 100%;
    font-size: 14px;
    font-weight:bold
}
.schoolAddress{
    margin-top: 13px;
    display: inline-flex;
    font-size: 12px;
    color: #333;
}
.top_img{
    height: 145px;
    margin: 19px 12px 28px;
}
.line{
    height: 16px;
    background-color: rgb(244, 244, 244);
}
.content{
    width: 100%;
    padding: 0 12px;
    color: #333;
    background-color:#fff;
}
.text{
    font-size: 14px;
    margin-top: 20px;
    font-weight: bold;
}
.text1{
     font-size: 13px;
    margin-top: 15px;
}
</style>