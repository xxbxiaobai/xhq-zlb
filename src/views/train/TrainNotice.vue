<template>
  <div id="home">
    <van-nav-bar title="培训详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- <div class="text">
      <p>{{trainlist.trainName}}</p>
      <i>发布时间：{{trainlist.issueTime | dateFormat}}</i>
      <div class="mess">培训名称：{{trainlist.trainName}}</div>
      <div class="mess">培训时间：{{trainlist.trainStartTime | dateFormat}} 至 {{trainlist.trainEndTime | dateFormat}}</div>
      <div class="mess">报名时间：{{trainlist.applyStartTime| dateFormat}} 至 {{trainlist.applyEndTime | dateFormat}}</div>
      <div class="mess bottom">培训地点：{{trainlist.trainPlace}}</div>
      <div class="mess-m">主办单位：{{trainlist.hostUnit}}</div>
      <div class="mess-m">承办单位：{{trainlist.undertakeUnit}}</div>
      <div class="mess-m">协办单位：{{trainlist.coOrganizer}}</div>
      <p class="title">培训详情 :</p>
      <div class="content content-train-img" v-html="trainlist.trainContent"></div>
      <p class="title">培训项目 ：</p>
      <div class="content">{{trainlist.trainItem}}</div>
      <p class="title">出证等级 ：</p>
      <div class="content">{{trainlist.certificateLevel==1?'一':(trainlist.certificateLevel==2?'二':'三')}}级体育指导员</div>
      <p class="title" v-show="trainlist.fileInfo&&trainlist.fileInfo.length > 0">附件</p>
      <div class="down" v-show="trainlist.fileInfo&&trainlist.fileInfo.length > 0">点击下载 ：</div>
      <div class="box" v-show="trainlist.fileInfo&&trainlist.fileInfo.length > 0">
        <a v-for="(item,index) in filelist" :key="index" :href="item.url" :download="item.name">
          <img src="./images/pdf.png" alt />
          <p>{{item.name}}</p>
        </a>
      </div>
      <div class="people">发布单位:{{trainlist.issueUnit}}</div>
    </div>

    <div class="btn">
      <button class="beforeapply" v-show="trainlist.isApply==0">报名未开始</button>
      <button @click="$router.push({ name: 'traininformation',params:{item:trainlist.trainItem,status:0,id:trainlist.id,level:trainlist.certificateLevel}})" v-show="trainlist.isApply==1">报名</button>
      <button class="beforeapply" v-show="trainlist.isApply==2">报名结束</button>
    </div>-->

    <div data-v-08a6c3a2 class="text">
      <p data-v-08a6c3a2>关于举办 2019 年浙江省一级社会体育指导员 等级培训（嘉兴市）的通知</p>
      <i data-v-08a6c3a2>发布时间：2019-12-06</i>
      <div data-v-08a6c3a2 class="mess">培训名称：关于举办 2019 年浙江省一级社会体育指导员 等级培训（嘉兴市）的通知</div>
      <div data-v-08a6c3a2 class="mess">培训时间：2019-10-25 至 2019-12-29</div>
      <div data-v-08a6c3a2 class="mess">报名时间：2019-09-20 至 2019-10-10</div>
      <div data-v-08a6c3a2 class="mess bottom">培训地点：嘉兴市秀洲区嘉兴市秀洲区蓬莱路 181 号</div>
      <div data-v-08a6c3a2 class="mess-m">主办单位：浙江省体育局</div>
      <div data-v-08a6c3a2 class="mess-m">承办单位：嘉兴市体育局 浙江省社会体育指导员协会</div>
      <div data-v-08a6c3a2 class="mess-m">协办单位：嘉兴市社会体育指导员协会</div>
      <p data-v-08a6c3a2 class="title">培训项目 ：</p>
      <div data-v-08a6c3a2 class="content">太极拳,其他</div>
      <p data-v-08a6c3a2 class="title">出证等级 ：</p>
      <div data-v-08a6c3a2 class="content">一级体育指导员</div>
      <p data-v-08a6c3a2 class="title" style>附件</p>
      <div data-v-08a6c3a2 class="down" style>点击下载 ：</div>
      <div data-v-08a6c3a2 class="box" style>
        <a
          data-v-08a6c3a2
          href="https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-06/747b8bb143094b8ab3d3d0e5af19ed81-file.pdf"
          download="嘉兴市关于举办2019年浙江省一级社会体育指导员培训的通知.pdf"
        >
          <img
            data-v-08a6c3a2
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTAzRjhCRUUxMUQxMUU5QTE1Q0QxNzY1M0JEMkYyRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTAzRjhCRkUxMUQxMUU5QTE1Q0QxNzY1M0JEMkYyRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFMDNGOEJDRTExRDExRTlBMTVDRDE3NjUzQkQyRjJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFMDNGOEJERTExRDExRTlBMTVDRDE3NjUzQkQyRjJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3UV8jwAABXFJREFUeNrsXGlsVFUUvjPKUhYpJlpkkXYgkKAGSVoFgqYioggYCSRAGqKJiCYETSAuiUR/mACBQEQiJqAxLVg0gAlbIrIENNCyKW4ICiX9IyqggAsiQ8v3MWfKmds308600pl330m+3HeXmXn367nnnnOXhowlRyKRcUieAkYABUDI+Fd+AfYA5YNqajbpipAi5HYklcDDxk3ZCUwFQb81ECOk7AX6GbflBDAU5JwJS0FlQMo1IQerr2mM2JRNAScJ8lBYDG0giVIWltknkEQpITE9Ah4aSX444MBbAmKSyM1t/Ps/AO8BF4ABwNPAba4TQ1d8NJypf5T3vQRJNdDX5aE0XZNCQZ6xyxyXbcxBkHBUaUqxqtsoQ8tJYnYpUoYgOYB0hGjNZSTfu0rMPu1+S1qqympdJeYn9Xyrx0RwyVViflbPXSQ9q8ryXCXmsnqOE/KNKrvDVWI6qudfgSiwX5X1dJWYAvX8HXAYs9FFmaXaIyl0lZiB6vkQUKXyDA1ucpWYYuXtcgZ6y6vORWJKrVCgRmXvc5mYYtiSZFF0icvEcNtmjF0IsjojGewyMZRka82XXCemyi6ArfkbSYXLxNQBm5PULXeZmL3QjtNeFSjnksM2V4nZoAwud0NnWfWvO08MhAtVb4KcfKU11VYbJ4g5go7r9ZjHgW7A81a7uRJcOkPMGis/WtLZ0Jo8pTUMLpe4REylsi8cPsMlS094poet+dYFYqqtuOgxK5Keq0MFCTAnAef8TsxKK/+klaetWWZN3z8KgRf8Ssx54CM1jDogGevRbjLqZljkcFfhfhNb1PIdMeXWziNJ6ZKk7dsgZ5hFzlFZkljuJ2Lq2Vmr7JkU7alNG0BOkUXORWCmROBc0OoDdKedQjkj9jwx4v2BUcBL4kXXpR3+48frbwAx6/Hik9Qw6m1im2pN/WG4UF6Gz+5okeMUiZCod4Ws5kjtjTrtsMjKT2+CFM5GHDpfU1HQsS9Azn9JOk3bw+0W1v8JnAFOov2/StOOox0dye3Ag9miMbvxYqWqI+344kAvKeKB4y8FX4mBPY7PRJuhCSFxEF+UmSukhi5J/QB4B991Rdo/guSzbNGYl608j89+LtilTz2kK/gsCdhKoNO0N1PEqA8F7gWWSlgRN9jnssXGVOLly1o92IpEuuN7/0hRT+NdCHQ1sT2rqJRzOG1pS42h6vKE9SsZdJobbjxRVSSdK5TZp5fgTqAj2h1EulAMe52lSbRRxzy+fkxbasx64FUavCYI6CDqfhdwN/sj6G3Su/HC2W0V/xD4zWMpfm8iko9N8zbzaluTGB4T4/GxLSlejmf1pwKPirPWvpX/KDTqVRJ48rAAHcoeoinp3KpptaH0CTADpJxVwyGqVRxlfeWF/88jHkWCrPB8X2MErEjh9LnAHvcmtg3b5udemist0Zg60ZL3lVbQn5gvdkMPobEekXRWS0s0ZrZFyizRCmrLSVV+i7jjxgViGCkvVZ0fJ87UYRJjtV0s063vieHs84I109Bn+Yuep45pUDde4qKck0xsDIeKXk3jilsn4AntR8iSQYXJUclEYz5UnS+VaHUCSPlUlXcVRy8/V4lJV2PO84apytOLHIyyE5ZLT1KGmByWTDzfgvjdZA/PlpqyzlzfK8pVqc1kKM0DAZ08SCkRdzzXSWlREPk7sFamZy5ojxJC/PLvDjKOlXj+/znjYwnuRKYg5kpAQyOJkphTAQ+N5BSJ2Rnw0Ei2k5gVAQ8JwitDFWE4a7zmuybgo0EWctkkPis9axLvKboqPPf3RsN0LQePR5rYrfl6R4fPPGBifNcy5OHa34NkGvCAiV248quvE5UZmQcGyvWqI+WqAAMAbza5vbOFXocAAAAASUVORK5CYII="
            alt
          />
          <p data-v-08a6c3a2>嘉兴市关于举办2019年浙江省一级社会体育指导员培训的通知.pdf</p>
        </a>
      </div>
      <div data-v-08a6c3a2 class="people">发布单位:浙江省社会体育指导员协会</div>
    </div>

    <div data-v-08a6c3a2 class="btn">
      <button data-v-08a6c3a2 @click="traininformation">报名</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tabar from "../../components/Tabar";
import { traindetail } from "@/http/api";
export default {
  data() {
    return {
      title: "培训详情",
      filelist: [],
      trainlist: []
    };
  },
  components: { Tabar },
  methods: {
    getrainlist() {
  
    },
    onClickLeft() {
      this.$router.push("/scientific-list");
    },
    traininformation() {
      this.$router.push("/traininformation");
    },
    into(url) {
    }
  },
  created() {
    zlbFun("培训详情");
    this.getrainlist();
    // var supportDownload = "download" in document.createElement("a")
    // if (!supportDownload) {
    //   // 这里发起 一个请求， 并在请求头里设置
    //   response.addHeader("Content-Disposition", "attachment; filename=" + response.encodeURL(downloadfile))
    // }
  }
};
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  background-color: #ffffff;
  .text {
    padding: 1.05rem 0.5rem 0 0.65rem;
    background-color: #fff;
    p {
      font-size: 0.9rem;
      color: #000000;
      font-weight: 700;
    }
    i {
      display: inline-block;
      font-size: 0.6rem;
      color: #999999;
      margin-bottom: 0.4rem;
    }
    .mess {
      font-size: 0.65rem;
      color: #333333;
      margin-bottom: 0.2rem;
    }
    .mess-m {
      font-size: 0.7rem;
      color: #333333;
      // font-weight: bold;
      margin-bottom: 0.2rem;
      // padding-left: 1.5rem;
    }
    .bottom {
      margin-bottom: 0.5rem;
    }
    h1 {
      font-size: 0.9rem;
    }
    .title {
      font-size: 0.75rem;
      margin-bottom: 0.2rem;
      margin-top: 0.2rem;
    }
    .content {
      font-size: 0.75rem;
      width: 100%;
      color: #333333;
      // text-indent: 1rem;
      // line-height: 1rem;
    }
    .down {
      font-size: 0.75rem;
      color: #999999;
    }
    .box {
      margin-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      a {
        display: flex;
        width: 5.5rem;
        height: 3.5rem;
        background-color: #e7f4ff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.25rem;
        margin-right: 0.25rem;
        padding: 0 0.5rem;
        img {
          width: 1.75rem;
          height: 1.75rem;
        }
        p {
          font-size: 0.3rem;
          color: #333333;
          text-align: center;
          margin-top: 0.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
        }
      }
    }
    .people {
      font-size: 0.75rem;
      color: #000000;
      font-weight: 700;
      margin-top: 0.5rem;
      padding-left: 1rem;
    }
  }
  .btn {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-top: 1rem;
    .beforeapply {
      width: 17.5rem;
      height: 2rem;
      font-size: 0.8rem;
      background-color: rgba(51, 51, 51, 0.4);
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.25rem;
    }
    button {
      width: 17.5rem;
      height: 2rem;
      background-color: #1492ff;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0.25rem;
    }
  }
}
</style>
<style>
.content-train-img img {
  width: 100% !important;
}
</style>
