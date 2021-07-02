<template>
  <div class="scienific">
    <van-nav-bar
      title="科学健身"
      left-text="返回"
      v-if="isShow"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="scienific-content">
      <!-- 搜索 -->
      <van-sticky class="sticky" v-if="isShow">
        <van-search
          placeholder="请输入搜索内容"
          v-model="searchVal"
          @click="handleSearch"
          style="width:90%;"
          disabled="true"
        />
        <!-- <i class="fenlei" @click="openFilter"></i> -->
        <img src="../../assets/fenleishaixuan@2x.png" alt @click="openFilter" />
      </van-sticky>
      <!-- 列表 -->
      <van-list
        v-model="loading2"
        :finished="finished2"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="inquireList"
      >
        <div class="info-list">
          <van-cell v-for="item in advianceList" :key="item.id" class="info-item">
            <div class="item-wrap" @click="handleViewDetail(item.type, item.id)">
              <h4>{{ item.fitguidanceTitle }}</h4>
              <div class="info-content" v-if="item.fileList.length">
                <van-image
                  width="100%"
                  height="100%"
                  class="poster"
                  :src="ImageUrl+item.fileList[0].id"
                />
                <span class="tag">{{ item.type == 1 ? "视频" : "图文" }}</span>
                <div class="type">{{ item.minorTermName }}</div>
              </div>
            </div>
          </van-cell>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
let zwltsy = require("../../assets/zwltsy.jpg");
import { getFitguidancePage } from "@/http/api";
export default {
  name: "",

  data() {
    return {
      ImageUrl: this.ImageUrl,
      originPath:'', //判断是否是首页跳转
      isShow: false,
      loading2: false,
      finished2: false,
      pageSize2: 4, // 每页条数
      pageIndex2: 1, // 页码
      advianceList: [],
      zwltsy: zwltsy,
      isFilter: false,
      currentIndex: 0,
      filterList: [],
      searchVal: "",
      loading: false,
      error: false,
      finished: false,

      count: 0,
      params: {
        limit: 10,
        page: 1
      }
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.path) {
        vm.isShow = true;
      }
      if(from.path == '/scientific-list'){
        vm.originPath = 'y'
      }else{
        vm.originPath = ''
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.isShow = false
    next();
  },
  created() {
    this.getFitnessList();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
    this.onLoad();
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  methods: {
    inquireList() {
      this.pageIndex2++;
      this.getFitnessList();
    },
    //获取科学健身列表
    getFitnessList(p_val) {
      this.loading2 = true;
      console.log(this.finished2)
      getFitguidancePage({
        limit: this.pageSize2,
        page: this.pageIndex2,
        fitguidanceTitle: this.$route.query.name || p_val
      }).then(res => {
        if (res.code == 0) {
          this.loading2 = false;
          this.advianceList = this.advianceList.concat(res.data);
          if (this.advianceList.length >= res.count) {
            this.finished2 = true;
          }
        }
        console.log(res);
      });
    },
    openFilter() {
      this.$router.push({
        name: "filter",
        query: {
          minorTermId: this.$route.query.minorTermId || ""
        }
      });
    },
    onClickLeft() {
      if(this.originPath){
        this.$router.push("/scientific-list");
      }else{
        window.location.href = "sxty://back"
        this.$router.push("/scientific-list");
      }
      
    },
    selectedItem(index) {
      this.currentIndex = index;
    },
    handleSearch() {
      this.$router.push("/search");
    },
    handleViewDetail(type, id) {
      if (type == 1) {
        this.$router.push({
          name: "fitnessDetails",
          query: {
            id: id,
            type: type
          }
        });
      } else {
        this.$router.push({
          name: "graphicDetails",
          query: {
            id: id
          }
        });
      }
    },
    // 初始化
    onLoad() {
      if (this.$route.query.minorTermId) {
        this.params.minorTermId = this.$route.query.minorTermId;
      }
      this.initData();
    },
    // 获取数据
    initData() {
      this.filterList = [
        {
          episodeNum: 3,
          titleImageId: "1847683fa77d40339b770fea36d58ffd",
          fitguidanceTitle:
            "【专栏】宅家也爱做运动：三个动作让你拥有迷人腹肌（第二十四期）",
          type: 1,
          minorTermName: "健身",
          majorTermId: 21,
          majorTermName: "健美健身",
          minorTermId: 22,
          fitguidanceIntroduce:
            "本期乐刻运动的Matts方、乔鹏和十三姨Daisy三位教练传授健身秘籍，让您“宅”家也爱做运动！",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-23/70f8333309de45d680488605c3a56b5e-file.jpg",
          id: 1114,
          browseNum: "14",
          fileList: [
            {
              id: "1847683fa77d40339b770fea36d58ffd",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/mini_zjsport_filehost/2020-03-23/70f8333309de45d680488605c3a56b5e-file.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "946f5fd672304e7a9198e5ffa42dbada",
          fitguidanceTitle: "羽毛球运动双打中五种常用战术技巧",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            '<p style="text-align:center"><img alt="" src="https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/99a32c5b5a044cde9cbf0ba7872cf44e-1.5757855672894062E12.png.png" style="height:334px; width:500px" /></p>\n\n<p>　　今天，浙江省全民健身公共服务平台小编向大家分享以下关于羽毛球双打五种常用战术技巧，希望对大家有所帮助。<br />\n　　<br />\n<strong>　　1、攻人</strong><br />\n　　<br />\n　　这是双打中常用的一种战术，就是以人为攻击目标。对付两名技术水平高低不一的对手时，一般都采用这种战术。对付两名队员实力相当也可采用这一战术。它几种攻势于对方一名队员，常能起到&ldquo;集中优势兵力打歼灭战&rdquo;的作用；在另一队员过来协助时，又会暴露出空档，可在其仓促接应、立足不稳时偷袭他。<br />\n　　<br />\n<strong>　　2、攻中路</strong><br />\n　　<br />\n　　(1)守方左右站位时把球打在俩人的中间<br />\n　　<br />\n　　这种战术可以造成守方两人抢接一球或同时让球，彼此难于协调；限制对手在接杀球时挑大角度高球调动攻方；有利于攻方的封网，由于打对方中路，对方回球的角度也小，网前队员封网的难度就小了。<br />\n　　<br />\n　　(2)守方前后站位时把球下压或轻推在边线半场处<br />\n　　<br />\n　　这种战术多半是在接发网前球和守中反攻抢网时运用。这种球守方前场队员拦截不到，后场队员又只能以下手击球放网或挑高球，后场两角便会露出很大空档，因而有隙可乘，攻击他的空档或身体位。<br />\n　　<br />\n　<strong>　3、攻后场</strong><br />\n　　<br />\n　　这种战术常用来对付后场扣杀能力较差的对手，把对方弱者调动到后场后也可以使用。此战术多采用平高球、平推球、挑底线把对方一人紧逼在底线，使其在底线两角移动击球，在其还击出半场高球或网前高球时即可大力扣杀，取得该球的胜利或主动。如在逼底线两角时对方同伴要后退支援，则可攻击网前空档或打后退者的追身球。<br />\n　　<br />\n<strong>　　4、后攻前封</strong><br />\n　　<br />\n　　后场队员积极大力扣杀创造机会，在对方接杀放网、挑高球或企图反击抽球时，前场队员以扑、搓、勾、推控制网前，或拦截吊、点封住前半场，使整个进攻连贯而又有节奏变化，使对方防不胜防。<br />\n　　<br />\n<strong>　　5、防守</strong><br />\n　　<br />\n　　(1)调整站位<br />\n　　<br />\n　　为了摆脱被动，伺机转入反攻，首先要调整好防守时的站位。如果是网前挑高球，那么击球者应该直线后退，切忌对角后退。直线后退路线短、站位快、对角后退路线长，也容易被对方打追身球。另一名队员应根据同伴移动后的情况补到空档位。双打防守时的站位调整，都是一名队员在跑动击球时，另一名队员根据同伴的移动情况填补空档。<br />\n　　<br />\n　　(2)防守球路<br />\n　　<br />\n　　A、攻方杀球者和封网队员在半边场前后一条直线上，接杀球应打到另半边前场或后场。<br />\n　　<br />\n　　B、攻方杀球者和封网者在前后对角位上，接杀球可还击到杀球者的网前或封网者的后场。<br />\n　　<br />\n　　C、攻方杀球者杀对角后，另一名队员想要退到后场去助攻时，接杀球时可以还击到网前中路或直线网前。<br />\n　　<br />\n　　D、把攻方杀来的直线球挑对角，杀来的对角球挑直线以调动杀球者。<br />\n　　<br />\n　　浙江省全民健身公共服务平台小编提醒：关于防守的方法还有许多，但目的都是为了破坏攻方的进攻节奏和进攻的势头，在攻方进攻势头一减时即可平抽或蹲挡，若攻方站位混乱出现空档时，守方即可抓住战机转守为攻取得主动。</p>\n',
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/cfa3b9a66714471c82d473cd156e6fe4-1.5757855673550251E12.jpg.jpg",
          id: 1023,
          browseNum: "2",
          fileList: [
            {
              id: "946f5fd672304e7a9198e5ffa42dbada",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/cfa3b9a66714471c82d473cd156e6fe4-1.5757855673550251E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "a9a953bdef614bf782bee6b32f7892cf",
          fitguidanceTitle: "羽毛球双打时接发球要采取的一些战术",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            '<p style="text-align:center"><img alt="" src="https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/b1a1eaf615044e12a1a226d14654266d-1.5757855670347476E12.png.png" style="height:329px; width:500px" /></p>\n\n<p>　　羽毛球比赛中，接发球虽然受发球方的牵制，属于被动等待，但由于规则对发球作了击球点不能过腰、球拍上沿须明显低于手、动作必须连续向前挥动(不许做假动作)、不能迟迟不发等等的诸多限制，所以使发球者发出的球不能具有太大的威胁。<br />\n　　<br />\n　　浙江省全民健身公共服务平台小编提醒：接发球方如果判断准确，启动快、还击及时，就能在对方发球质量稍差时杀、扑得手或取得主动；反之，也会接发球失误或还击不利使自己陷入被动。<br />\n　　<br />\n<strong>　　(1)接发内角位网前球</strong><br />\n　　<br />\n　　以扑或轻压对方两边中场及发球者身体为主要攻击点，配合网前搓、勾等其他线路。<br />\n　　<br />\n<strong>　　(2)接发外角位网前球</strong><br />\n　　<br />\n　　除了以上打的点外，还可以平推对方底线两角以调动对方一名队员至边角，扩大对方另一队员的防守范围。<br />\n　　<br />\n<strong>　　(3)接发内角、外角位后场球</strong><br />\n　　<br />\n　　应以发球者为攻击点，力争扣杀追身球。如启动慢了，可用平高球打到对方底线两角。一般发球者在后场球发出后，后退准备接杀的情况居多，这时可用拦截吊球，落点可选择在发球者的对角。</p>\n',
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/eb2000c8ae4a43f7af877c215c3f6cd4-1.5757855671779368E12.jpg.jpg",
          id: 1022,
          browseNum: "2",
          fileList: [
            {
              id: "a9a953bdef614bf782bee6b32f7892cf",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/eb2000c8ae4a43f7af877c215c3f6cd4-1.5757855671779368E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "a4d100c0d5354feda78efd4565bfce9c",
          fitguidanceTitle: "疼痛部位与羽毛球技术缺陷之关联",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            "<p><strong>　　1、手腕</strong><br />\n　　<br />\n　　此处是羽毛球击球最关键的发力部位，按照标准的发力动作而言，手腕承载的应该是小臂内外旋的力，也就是类似于旋开茶杯盖子时那种受力。运动后手腕疼痛的话，很可能是因为你发力时手腕承载了错误方向的力，比如类似于拧摩托车油门时那种力。手腕的肌肉群被暴力拉伸，从而产生疼痛。请记住正确的发力动作，手腕应该是在旋转，而不是被过度拉伸的感觉。<br />\n　　<br />\n<strong>　　2、小臂和肘部</strong><br />\n　　<br />\n　　击球发力时主要依靠的是小臂和肘部肌肉群的收缩，产生内外旋的力量。同样参见上一条，请体验一下自己发力时是否在过度的拉伸小臂，这样是不正确的。应该在挥大臂到位后，通过肘部制动，小臂自然伸展的同时急速旋转，把所有动能集中在手腕手指上。而正确的发力动作不应该引起小臂附近的肌肉拉伤。<br />\n　　<br />\n<strong>　　3、大臂和肩部</strong><br />\n　　<br />\n　　此部位的疼痛主要来源于两点，一是发力时没有充分利用腰腹力量的带动，纯靠肩部肌肉群强行驱动手臂挥动；二是击球后没有让手臂顺势自然下摆，而是用肩部肌肉的收缩强行使手臂制动。这两个不良习惯都在让肩部肌肉受到过度激烈的收缩和拉伸，从而产生疼痛。<br />\n　　<br />\n<strong>　　4、腰背部</strong><br />\n　　<br />\n　　此部位的疼痛主要来自于脚步不够灵活，经常在移动不到位的情况下，处于过度的后仰或侧扭身体状态时强行发力。这样导致腰背的肌肉在扭曲状态下强行收缩，容易造成拉伤疼痛。<br />\n　　<br />\n<strong>　　5、臀部和大腿疼痛</strong><br />\n　　<br />\n　　此部位的肌肉相对来说是比较厚实强健的，如果有异常的疼痛，可能是来自大幅度跨步救球之后的回位动作不正确。一般大幅度跨步救球之后，你是否习惯性保持着双脚前后大弓箭步的姿态，身前位单腿强行发力使身体迅速站直呢？这种状态下，由于人的重心极度靠前，基本上是靠单侧的臀大肌和股三头肌剧烈收缩，使重心上升、直至回位。简单点说，就像做了一次单足深蹲后迅速单足起立一样，次数多了当然会酸痛。解决办法是，救球时大弓箭步跨出去之后，后面的脚也自然跟上，击球动作结束之后，后面的脚也移动到离身前脚不远的位置了，此时双脚可以一同发力，使身体站立、回位。这样就合理的把深蹲后起立的力量分配给了两侧大腿，肌肉的负荷减少近一半，能有效避免臀部和大腿的酸痛现象。<br />\n　　<br />\n<strong>　　6、小腿和脚踝疼痛</strong><br />\n　　<br />\n　　此部位疼痛往往是来自于步伐快速移动时脚尖的指向不正确。注意跨步救球的时候，脚尖要指向你跨步方向的正前，回位时可以充分利用脚掌的支撑力，这样可以有效的保护脚踝，不会受到过于激烈的侧向压力。跨步时如果脚是侧着落地，那么不但脚踝受到侧向冲击力巨大，还容易造成崴伤。请记住一定要把脚正过来落地，就像跳芭蕾一样优雅。<br />\n<strong>　　<br />\n　　7、膝盖部位疼痛</strong><br />\n　　<br />\n　　参见上一条，尽量让膝盖对正冲击的方向，避免侧向受力过猛。力量剧烈爆发的时候 保持脚踝和小腿一定的角度，尽可能的缓冲压力，不要让膝盖直愣愣的承受冲击；比如起跳扣杀之后，落地一定要脚尖先缓冲，曲腿承压等等。同时平时注意保暖驱湿，膝盖部位包含很复杂的肌肉和软组织系统，著名的半月板就在里面埋着，受损之后比较麻烦。</p>\n",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/43f65d9239b3437f9459895ff8e11088-1.5757855669181216E12.jpg.jpg",
          id: 1021,
          browseNum: "2",
          fileList: [
            {
              id: "a4d100c0d5354feda78efd4565bfce9c",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/43f65d9239b3437f9459895ff8e11088-1.5757855669181216E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "59ef60b0181b4c1b80c184eeda566891",
          fitguidanceTitle: "如何选购健康安全的羽毛球鞋",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            "<p>　　一双合适的羽毛球鞋是打羽毛球的基础装备，也是最重要的装备。因为脚下的一双鞋将与健康及安全有直接关系。据浙江省全民健身公共服务平台小编了解，选择羽毛球鞋一定要比平常的鞋略大一点，不然跑动起来脚会包的很难受。羽毛球鞋选择时应注重前松侧紧。侧紧，为了避免侧滑，防止扭伤;前松，上网时可起到缓冲作用。<br />\n　　<br />\n　　一般来说，羽毛球鞋要比平常的鞋大半码到一码，不过记得要穿专业的羽毛球袜，一双袜子半码，留半码给脚，刚刚好。激烈的羽毛球运动中双脚的血液循环要比平时快的多，双脚充血也较平常严重，别说小了，就是试穿的时候正好合适下场以后都有可能觉得紧。<br />\n　　<br />\n　　很多羽毛球爱好者总是觉得鞋买大了一码以后会非常别扭，每次买鞋都要考虑买正好甚至略小的，这是非常错误的：<br />\n　　<br />\n　　1、我们平常不会穿专门的羽毛球袜去试鞋，试出来的感觉本身就不够准确。<br />\n　　<br />\n　　2、鞋头不宽松的话，上网时极有可能会顶到最长的脚趾，严重的还会使脚趾甲受损。<br />\n　　<br />\n　　球鞋尺寸大了，有可能走路会觉得别扭，甚至会出现上楼梯踢台阶的现象，这是因为我们的大脑已经习惯了鞋+脚的尺寸，在做上楼梯这个动作时，大脑发令总是以我们常用鞋码的尺寸来作为抬腿出脚距离的标准，这是为了最大限度节省体力，是本能。<br />\n　　<br />\n　　但羽毛球步法和上楼梯完全不是一回事，与平时走路也完全不是一回事。这也是为什么尽量到场馆以后才换鞋的另一个原因。<br />\n　　<br />\n<strong>　　选购基本篇</strong><br />\n　　<br />\n　　1、应选择一双重量轻，穿着舒适的球鞋，假如是羽毛球专用鞋，那效果更好。<br />\n　　<br />\n　　2、好的羽毛球鞋可以使你键步如飞，选择时注重鞋底最好采用牛筋底，这样韧性会比较好，适合在室内运动。如在室外，可选择高级的橡皮合成鞋底，效果也不错。羽球鞋的鞋底大都由生胶或人工橡胶所合成，生胶的鞋底因抓地力强所以适合于木板场地，因此排球鞋都可当羽排两用鞋。但不同厂牌的鞋底又会因制作过程时，生胶掺杂粉的比例过多使鞋底较硬，并且打没多久鞋底没什么磨损就会非常滑，所以在购买时须谨慎以免花冤枉钱。<br />\n　　<br />\n　　人工橡胶的鞋底分硬底和软底，硬底就比如网球鞋，适合水泥或磨石子地，软底则被设计来打PU场地。目前的羽球场地分水泥地、木板和PU场地，在水泥场地上一遇有摔跌等情形发生，情况往往比木板和PU场地严重，所以不适合当作比赛场地。至于木板和PU场地则各有千秋，木板地比较轻易因潮湿或比赛时选手所流下的汗造成场地湿滑，而PU场地虽与木板地同样具有弹性，但PU具有吸震能力，因此国际比赛都采PU场地做比赛场地。<br />\n　　<br />\n　　3、不论穿着的鞋子如何，最重要是要有个观念：就是在室内打球的鞋子最好在要打时才穿，一来可以避免鞋子弄脏，二来可避免鞋底沾满灰尘而变滑，如此便能延长鞋子的使用寿命。<br />\n　　<br />\n　　4、最后要注重的是，羽毛球鞋穿上时要合脚，不能太大也不能太小，尺度选择上感觉比平时的休闲鞋前面鞋头空一些为最佳。这样具备了充分的缓冲空间一来可助你在运动中的发挥，二来可以减少你受伤的机会。</p>\n",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/7a951a89eec848d9a186040c49ddb76c-1.5757855666725808E12.png.png",
          id: 1020,
          browseNum: "5",
          fileList: [
            {
              id: "59ef60b0181b4c1b80c184eeda566891",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/7a951a89eec848d9a186040c49ddb76c-1.5757855666725808E12.png.png",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "84e95a3592ba48b28db0ccdd2add5ea2",
          fitguidanceTitle:
            "怎样根据酸疼部位发现自己打羽毛球时的发力技术问题？",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            '<p style="text-align:center"><img alt="" src="https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/da2f7f8d0ebc453ab5699fe913506f6e-1.5757855663509863E12.png.png" style="height:329px; width:500px" /></p>\n\n<p>　　经常打羽毛球的同学可能有经常感到身体部位酸痛的问题，其实是你打球的发力技术存在着问题。今天，浙江省全民健身公共服务平台小编就针对怎样根据酸疼部位发现自己打羽毛球时的发力技术问题来跟大家聊一聊，希望对大家有所帮助。<br />\n　　<br />\n<strong>　　1、打羽毛球引起的手腕酸疼</strong><br />\n　　<br />\n　　手腕酸疼在业余球友中一般主要有两个原因造成。<br />\n　　<br />\n　　一是正手球翻腕不正确，业余球手容易在挥臂时就将手腕向前，造成击球时的翻腕动作更象压腕动作。规范的翻腕动作是在挥臂时手掌外沿向前（象挥锤子的前段动作一样），在即将击球时手腕外展旋腕翻腕。这一点我在今晚打球时格外注意了，打完后手腕确实不酸疼了，还发现了一点好处，击球时的爆发力增强了。<br />\n　　<br />\n　　手腕酸疼的第二个主要原因是业余球友在反手击球时靠翻腕翻臂发力，这样会造成手腕及肘部酸疼（呼呼，这点错误俺没有犯）。正确方式是手臂带动手腕外展，发力点是在手指上（拇指外顶，小指、无名指、中指内收）。<br />\n　　<br />\n<strong>　　2、打羽毛球引起的肘部酸疼</strong><br />\n　　<br />\n　　肘部酸疼分肌肉酸疼和关节酸疼两点，肌肉酸疼大部分是因为压腕的翻腕姿势造成肘部前方肌肉（这块肌肉她告诉我名称，我忘了）负担过重，产生酸疼。关节酸疼的主要原因一是反手发力不正确（参考手腕酸疼部分），二是发力过程中（特别是在击球前瞬间）手臂肘关节弯曲，造成反馈力主要加于肘部。<br />\n　　<br />\n　<strong>　3、打羽毛球引起的腰部酸疼</strong><br />\n　　<br />\n　　腰部酸疼在业余球手中70％以上的原因是在拉后场球时发力后消力过程没有注意，简单点说就是在拉后场发力后一定要注意右脚顺势向前踏出（右手持拍），这点很重要。我就是在发力后经常没有做到，造成腰部肌肉未完全舒展，承担反作用力过大造成酸疼。<br />\n　　<br />\n<strong>　　4、打羽毛球引起的肩部酸疼</strong><br />\n　　<br />\n　　肩部酸疼的大部分原因是后场球击球点靠后（球已飞过头顶）和靠臂力击球，比如有些朋友会在球飞过头顶后靠勾手发力救球，这极容易造成肩部酸疼。<br />\n　　<br />\n　<strong>　5、打羽毛球引起的膝部酸疼</strong><br />\n　　<br />\n　　业余选手膝部酸疼的主要原因一般都是步法最后一步步幅不够，没有脚跟落地同时没有脚尖向外，造成身体前冲重量未通过腿部到足部，而集中压在膝部，造成酸疼。<br />\n　　<br />\n<strong>　　6、打羽毛球引起的踝部酸疼</strong><br />\n　　<br />\n　　踝部酸疼的主要原因是移动时（特别是左右移动）脚尖没有外展，造成身体重量不能通过足部到地面，直接作用在踝部引起的。<br />\n　　<br />\n<strong>　　7、打羽毛球引起的脚趾酸疼</strong><br />\n　　<br />\n　　鞋买的太小，应该稍大一点，大半码样子！<br />\n　　<br />\n　　以上各部位酸疼还会有别的原因，浙江省全民健身公共服务平台小编这里列举的只是业余球友中最容易犯的问题。也请各位朋友补充。相互交流，共同提高。</p>\n',
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/b1eabedc05e64776a5dc2488ce133849-1.5757855664585688E12.png.png",
          id: 1019,
          browseNum: "3",
          fileList: [
            {
              id: "84e95a3592ba48b28db0ccdd2add5ea2",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/b1eabedc05e64776a5dc2488ce133849-1.5757855664585688E12.png.png",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "e88e575ce66c415d9222b4042c3dd28a",
          fitguidanceTitle: "打羽毛球要防软组织损伤",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            "<p>　　如今，羽毛球运动普及程度越来越高。但是，多数爱好者都是没有经过专业人员指导，凭自己的感觉和习惯打球。殊不知，不注意动作规范、科学，长期以错误的姿势打球，很容易造成运动损伤。浙江省全民健身公共服务平台小编提醒，羽毛球运动的损伤绝大部分属于软组织损伤，主要涉及肌肉、筋膜、肌腱、腱鞘、关节囊与韧带等。<br />\n　　<br />\n　　那么如何在打羽毛球时，有效防止软组织损伤？浙江省全民健身公共服务平台小编将从各个软组织部分详细为您解析损伤原因以及如何有效规避防治，希望对你有所帮助。<br />\n<strong>　　<br />\n　　■肩、肘关节损伤</strong><br />\n　　<br />\n　　在羽毛球运动中，以肘关节内侧韧带损伤最为常见。它的发生，主要是在完成羽毛球扣杀动作过程中，上臂往往处于外展位，而肘关节屈曲90度，如此时肘关节在低于肩关节的情况下进行大力扣杀，极易使肘内侧受剪力的作用而损伤该部位组织。另外，扣杀球时应将力量集中在腕关节，击球瞬间肌肉收缩，其他时间肌肉应放松。如果击球时将力量集中在了肩关节且肌肉始终保持紧张，就很容易使肩关节受伤。<br />\n　　<br />\n<strong>　　■膝关节损伤</strong><br />\n　　<br />\n　　膝关节损伤，往往与跳起扣杀后落地姿势不佳有关。做跳起动作时要格外小心，因为跳起后落地时，人体容易失去平衡或两腿靠拢不够，使小腿突然外展、外旋或小腿固定，大腿突然内收、内旋，即有可能造成膝内侧韧带损伤，甚至内侧半月板损伤；如果屈曲的膝关节、小腿突然内收、内旋或小腿固定、大腿突然外展、外旋，则会引起膝外侧韧带损伤，甚至外侧半月板损伤。<br />\n　　<br />\n　<strong>　■踝关节损伤</strong><br />\n　　<br />\n　　踝关节也是羽毛球运动中极易受伤的部位。由于羽毛球落点变化大，打球者需要脚下不停移动，很多人冲到网前跨步接球时，因速度太快而习惯用脚尖着地，这样的做法很容易使踝关节局部负荷过重。加上肌肉力量不足，导致踝关节韧带扭伤，姿势长期错误，还会造成踝关节创伤性滑膜炎。<br />\n　　<br />\n　　正确的着地方法应该是，前跨步时脚跟外后侧最先着地，依次向前直至整个脚掌落地。落地时应尽量将脚步放轻，避免突然、猛烈地着地。最好能在木制地板的场馆里打球，运动鞋的鞋底要有一定厚度和弹性，以降低对踝、膝等关节损伤的几率。据调查，羽毛球运动踝关节损伤的原因多达七种，而其中所占比例最大的两个，一是局部负荷过重，二是场地不良。<br />\n<strong>　　<br />\n　　■肌肉拉伤</strong><br />\n　　<br />\n　　肌肉拉伤在几乎所有的运动中都有可能发生。在羽毛球运动中，最多见的是大腿后肌群和肘内侧肌群拉伤。姿势、技术上的错误是造成肌肉拉伤的主要原因，如不正确的跨步、蹬步、垫步及后场扣杀等。<br />\n　　<br />\n　　肌肉拉伤有主动拉伤和被动拉伤两种。前者主要由于肌肉猛烈收缩，使肌肉的收缩力超越了其本身所能承受的能力而引起；后者是由于肌肉在一定的紧张、僵硬或牵拉状态下受到猛烈、超限的牵伸，超越了肌肉本身的伸展程度所至。要避免肌肉拉伤，除应掌握正确的打球姿势和技巧外，还应在平时加强肌肉锻炼，因为身体素质差是发生损伤的内在因素。<br />\n　　<br />\n　　城市里25~50岁这一年龄段的人是最缺乏锻炼的群体。他们长期不参加体育运动，使肌肉弹性、伸展性变差，肌力变弱。加之打球前准备活动不充分，不当地使用暴力牵拉肌肉，以及场地不良等，容易发生肌肉拉伤。<br />\n　　<br />\n　　有些人为避免损伤，在打球时使用各种护具，如护腕、护肩、护膝、护踝等。虽然这些护具可以起到一定的防护作用，但是，要在羽毛球运动中避免运动损伤，最好的办法就是掌握打球的正确方法和技巧，选择合适的场地和运动鞋，做好充分的准备活动。</p>\n",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/243df8ef0654457ab0a93a9f7ff472cf-1.5757855662593828E12.jpg.jpg",
          id: 1018,
          browseNum: "3",
          fileList: [
            {
              id: "e88e575ce66c415d9222b4042c3dd28a",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/243df8ef0654457ab0a93a9f7ff472cf-1.5757855662593828E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "b951befc431b463fba43daeb1f8414d1",
          fitguidanceTitle: "羽毛球正手平高球",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            "<p>　　有不少的羽毛球爱好者由于水平比较业余，对方发平高球也不能一拍杀死，回高远求又因为平高球球速快而有时不到底线，所以常常使自己处于被动的状态。其实你需要有一个正确的接发球站姿，平高球是所有发球中最难的，因为平高球要求出手动作和发网前球的动作一致，区别是在击球的一瞬间发力。起到出其不意的效果，为什么说最难呢？就是因为一致性，所以我们不能用上大臂的力量，只能用手腕和手指的力量，所以要求发球者有很好的基本功。<br />\n　　<br />\n　　打羽毛球的技巧之正手平高球理论知识：<br />\n　　<br />\n　　正手高球是后场正手上手击球技术的基础。击球前，身体先半侧对球网，右脚在后，左脚在前，两脚尖均踮起，身体重心自然落在右脚掌上。右手采用正手握拍法握拍，自然将球拍举到右肩侧上方，左手自然上举，眼睛注视来球。当球下落到接近击球点高度时，右腿开始蹲伸，并以髋关节带动身体由右向左转动，做左腿后撤，右腿前迈的两腿交叉动作。伴随下肢蹲转动作的同时，胸部舒张，两侧肩关节外展，左手自然上举，持拍臂的前臂向后移动，保持高肘后撤球拍。在腰腹协调用力的配合下，上臂带动前臂利用伸肘关节、前臂旋内和屈腕的力量，向前上方&ldquo;甩臂&rdquo;挥拍击球。在球拍与球接触的瞬间，迅速握紧球拍将球击出。<br />\n　　<br />\n　　打羽毛球的技巧之正手平高球的训练方法：<br />\n　　<br />\n　　1.用吊线球进行正手排球练习：将球系在5米以上吊线的下端，球的高度调至与练习者膝关节手齐或稍低一些。用球拍向前上方击球，模仿正手发高球动作。要求以完整的发球动作击吊线球&mdash;&mdash;即吊线球击出后，立即摆出发球的准备姿势，包括左手的持球动作（假设），等待球回摆到一定的位置再按发球的要领击球，左手也要同时作好放球、回收动作。<br />\n　　<br />\n　　2.正手向上颠球练习：先要求保持展腕，握拍放松，用前臂内旋动作台球～加上中指、无名指和小指由松到紧发力击球&mdash;&mdash;加上手腕的回环动作击球&mdash;&mdash;加上前臂的回环动作以加强击球的力量。<br />\n　　<br />\n　　3.对墙发球练习，体会球下落时间与挥拍速度之间的时空关系。首先强调注意技术动作的准确性，可暂不顾球是否击中，在不断重复正确动作的基础上，自然地发展到拍面能触球将球击出。为此，练习时可先闭上眼睛练习发球，利用想象球下落的时间，而将注意力集中在动作上。然后，将眼向前凝视面对的墙，按上述要求发球，逐步掌握其时空规律。<br />\n　　<br />\n　　4.在场地上正式发球练习。始终要强调注意动作的正确性，然后才是飞行弧度和落点的质量要求。<br />\n　　<br />\n　　5.正手发高注意事项<br />\n　　<br />\n　　左手动作不协调，妨碍转体动作；动作未定型却追求击球力量，出现甩臂发球；发球过手或过腰犯规；发球脚移动犯规。<br />\n　　<br />\n　　打羽毛球的技巧之正手平高球易犯错误：<br />\n　　<br />\n　　l.没有采用正确的正手握拍法握拍。习惯&ldquo;一把抓&rdquo;，用类似于网球的&ldquo;西方式&rdquo;握拍法握拍去拍打来球。<br />\n　　<br />\n　　2.身体正对球网击球，准备时没有先半侧对球网。如此，不但影响了击球动作的隐蔽性，而且也影响了有效利用身体蹬转的力量来协助上肢发力击球。<br />\n　　<br />\n　　3.击球点没有选择在右肩的前上方，偏低、偏前或偏后。通常是偏低的更普遍。<br />\n　　<br />\n　　4.在击球前已握紧球拍，整个动作显得紧张僵硬，而影响发力。<br />\n　　<br />\n　　5.发力的方法不对。主要用肩和伸肘关节的力量击球，而不是主要采用前臂内旋和屈腕的力量，向前上方&ldquo;甩臂&rdquo;挥拍击球的正确方法。<br />\n　　<br />\n　　6.击球后，球拍不是顺惯性收拍于体前，而是将球拍朝右下方挥动，收拍于身体右侧。<br />\n　　<br />\n　　掌握住了以上的这些，平高球还是挺轻松的！</p>\n",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/2f141dc3b5e74cb18d7303e696defbe5-1.5757851064250674E12.jpg.jpg",
          id: 153,
          browseNum: "21",
          fileList: [
            {
              id: "b951befc431b463fba43daeb1f8414d1",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/2f141dc3b5e74cb18d7303e696defbe5-1.5757851064250674E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "65e6f2b32b724adf958a17f9dca4d796",
          fitguidanceTitle: "四方球技巧",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            "<p>　　很多人会因为身体条件所限（身高和体力方面），不能像众多高手那样以重扣和大力劈杀来迅速解决战斗，所以平常打球时多以四方球，通过前后场的调动与对手周旋，赢球的话也会赢得辛苦，输球也输得窝囊。其实这种打法是进攻型的打法，能够快速上网高点控制网前，速度耐力和力量耐力也要求较高。这种打法，体力消耗较大，如果碰上防守技术好的对手，体力就往往成为成败的关键因素。首先肯定的是拉四方球配合突击进攻的战术打法是当今羽毛球比赛中普遍采用的一种战术打法。在双方实力相当的比赛中，任何一方选手很难仅靠大力的扣杀取得速战速决。在这种情况下，提高制胜能力可从两方面着手训练，一是提高自身出球质量，只有击球落点到位，才能有效控制对手。二是要练就制胜的绝招，通过拉吊控制与反控制，获得了有利时机后要有手段把优势变为得分，如果没有制胜的杀手锏，纵然有机会也很难得分。四方步也称米字步即向前左右上网和后退至左右后场的步法统称四方步，其中包括了以下各种步法的组合。<br />\n　　<br />\n　<strong>　打羽毛球技巧之四方球技巧一：上网步法</strong><br />\n　<strong>　<br />\n　</strong>　1.上右网前。如果站位靠前，可用两步交叉步上网，若站位靠后场，则采用三步交叉跨步的移动。方法，即右脚向右前方迈一小步，左脚接着前交叉迈过右脚，然后右腿顺着这一方向跨一大步到位。为了加速上网，还可采用垫步上网，即右脚向右前迈一小步后，左脚快速踉进到右脚跟后，利用左脚掌内侧后蹬，右脚向右前跨出一大步。<br />\n　　<br />\n　　2.上左网前。基本方法同上右网前，只是方向相反。如两步跨步上网。<br />\n　　<br />\n　　<strong>打羽毛球技巧之四方球技巧二：后退步法</strong><br />\n　　<br />\n　　1.正手后退右后场。后退步法一般都用侧身后退，以便于到位后挥拍击球。如果右脚稍前的站位，则先完成右脚后蹬&mdash;髓部右后转&mdash;成侧身站位，然后采用三步并步后退或交叉步后退。<br />\n　　<br />\n　　2.后退左后场。后退左后场正手绕头顶击球的步法基本同正手后退右后场步法，只是移动方向是向左后而已。<br />\n　　<br />\n　　3.反手后退左后场。反手击球时，必须先使身体向左后转、背向网，在后退左后场时，无论是两步后退或三步后交叉后退都要注意这一点。<br />\n　　<br />\n　<strong>　打羽毛球技巧之四方球技巧三：两侧移动步法</strong><br />\n　　<br />\n　　1.向右侧移动。两脚开立，右脚跟稍提起，上体稍倒向左侧，左脚掌内侧用力起蹬，右脚同时向右侧蹬跨一大步到位击球。若距来球较远，则左脚可向右垫一小步再起蹬，右脚同时向右跨一大步到位。<br />\n　　<br />\n　　2.向左侧移动<br />\n　　<br />\n　　两脚开立，上体稍倒向右侧用力起蹬，左脚同时向左蹬跨一步到位击球。离球较远时，左脚可先向左移一小步，然后向左转身，右脚向左(前交叉)跨大步(背向网)到位同反手击球。<br />\n　　<br />\n　　<strong>打羽毛球技巧之四方球技巧四：起跳腾空步法</strong><br />\n　　<br />\n　　步子到位后，为了争取战机和更高的击球点，用单脚或双脚起跳，居高临下，凌空一击，称为起跳腾空击球。在上网、后退和两侧移动中都可运用腾跳步。一般说来，腾跳步较多用于向左、右两侧进行跳起突击。当对方打平高球(弧线较低)球从右侧上空飞向底线时，用左脚向右侧蹬地，右脚起跳，上体向右侧上空腾起截住来球，突击扣杀对方空当，当球从左侧上空飞向底线时，则右脚向左侧蹬地，右脚起跳，用头顶击球法突击。在正手后退步法中，步子到位后，也可以右脚起跳腾空击球。击球后，左脚后摆在身体重心的后面着地，一经制动缓冲，便应立即回动至中心位置。</p>\n",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/1b6f2fd90ef94127a76e437fa30a4da5-1.5757851063600933E12.jpg.jpg",
          id: 152,
          browseNum: "18",
          fileList: [
            {
              id: "65e6f2b32b724adf958a17f9dca4d796",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/1b6f2fd90ef94127a76e437fa30a4da5-1.5757851063600933E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "85222cd4e0844d709e7c5d27d9b9ed4c",
          fitguidanceTitle: "前场勾对角技巧",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            "<p>　　前场的击球技术，击球力量和动作弧度较小，主要以肘为轴，在前臂的带动下靠手腕、手指发力击球。同后场击球技术相比，要求手法更灵活、更细腻。要掌握好前场击球技术，首先要求握拍灵活，松紧适宜；其次，击球时出手动作要快，击球点要高，手指、手腕控制球拍要灵活。下面我们就一起来学习下打羽毛球的技巧中的前场勾对角。<br />\n　　<br />\n　　打羽毛球的技巧一：前场勾对角动作要领<br />\n　　<br />\n　　1.准备动作：侧身，反手握拍于身体左侧，右脚在前，屈膝，前脚掌着地。<br />\n　　<br />\n　　2.引拍：右脚向反手位来球方向跨出一步，提高身体重心，采用反手握拍方式，前臂向前上方伸，斜对球网。<br />\n　　<br />\n　　3.击球：肘部突然下沉，同时前臂稍外旋，手腕由稍屈至上伸，闲腕，拇指内侧和中指把拍柄往右侧一拉，其他手指紧握拍柄，勾击球托的左侧面，使球沿着对角线方向飞行。整个击球技术动作的关键是肘&ldquo;下沉&rdquo;和手腕&ldquo;背屈&rdquo;要同步完成，拍面由准备迎击来球时的平伸变为向上翘起，击球的动力就来源于这一拍面的变化。击球时，要求球拍的前伸准备位置要稍稍超前于来球的下落路线，以获得回拉手臂击球的空间。<br />\n　　<br />\n　　打羽毛球的技巧二：前场勾对角原地勾球<br />\n　　<br />\n　　1．采用多球练习的方式，甲持拍原地站在右前场网前位置，乙站在左前场连续把球&mdash;个&mdash;个地扔过网，让甲连续练习正手网前勾对角线球。<br />\n　　<br />\n　　2．甲持拍原地站在左前场网前位置，乙站在右前场连续把球一个一个地扔过网，让甲连续练习反手网前勾对角线球。<br />\n　　<br />\n　　3．甲站在自己的右前场区内，乙也站在右前场区内，两人均按勾对角线球的技术要领，相互用正手从自己的右前场区域将球轻轻勾到对方的右前场区域内。连续练习，直至球落地为止。<br />\n　　<br />\n　　4．甲站在自己的左前场区内，乙也站在左前场区内，两人均按勾对角线球的技术要领，相互用反手从自己的左前场区域将球轻轻勾到对方的左前场区域内。连续练习，直至球落地为止。</p>\n",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/2dbc647c7322446984beedd0b66c3769-1.5757851062933525E12.jpg.jpg",
          id: 151,
          browseNum: "20",
          fileList: [
            {
              id: "85222cd4e0844d709e7c5d27d9b9ed4c",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/2dbc647c7322446984beedd0b66c3769-1.5757851062933525E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        },
        {
          episodeNum: null,
          titleImageId: "315a4cf471ce49c8a3c9c4b4afe65497",
          fitguidanceTitle: "假动作技巧",
          type: 0,
          minorTermName: "羽毛球",
          majorTermId: 12,
          majorTermName: "球类运动",
          minorTermId: 15,
          fitguidanceIntroduce:
            "<p>　　玩战术的时候如果采用声东击西的方法，往往能出其不意。由于羽毛球的特点所决定，球拍轻巧灵活，正反拍面都可以击球，还有时间差、空间差、距离差、力度差，速度差、判断及反应差的存在，再加上有一幅网在整个球场的中间作为楚河汉界，所以任何的击球动作中都存在假动作和它们的运用，甚至包括在发球中（一般发球要求最严，最容易被判BALK和违规），都也有在规则允许范围内的假动作。正是这样，令得羽毛球的比赛引人入胜和趣妙无比。下面就举例综述在羽毛球比赛中较典型的假动作。<br />\n　　<br />\n　　羽毛球假动作技巧一：在发球中的假动作<br />\n　　<br />\n　　羽毛球有正反手的发球，而在正手发球方面，由于引拍动作可大可小，较容易使用假动作去迷惑对手。<br />\n　　<br />\n　　1.正手发球假动作<br />\n　　<br />\n　　站位在发球区靠中一些，丁字步，上身朝向边线。球拍放到离身体最远的地方，以便最大距离的引拍。<br />\n　　<br />\n　　这样一来，对手以为你要发高远球，其心里判断和准备你要发高球，所以注意力在后场，重心就靠后了。<br />\n　　<br />\n　　而你在实施发球时，开始是快速挥拍，当球拍将要击球的刹那间，收力，拍面轻薄的切击球脱，发出一个正手短球，并且落点在对方接球区前场的内角或者外角，从而使得对手无法接发球抢攻和回球质量差，你就从开始就抢占主动权了。<br />\n　　<br />\n　　2.正手发网前球假动作、<br />\n　　<br />\n　　正手似象要发网前球，球拍的位置距离击球点的位置较近，没有什么引拍距离。你的站位和姿势让对手以为你要发网前球，先入为主的判断使对手将注意力放到前场，而你在发球时，利用手腕的快速闪动来带动球拍，发出正手平快球、平高球或者高远球。<br />\n　　<br />\n　　由于对手在开始就受你的站位和姿势的假象影响，反应一下没跟上而处于被动，也就难保有高质量的回球了。<br />\n　　<br />\n　　3.反手发球假动作一<br />\n　　<br />\n　　站位在T字区近处（注意不要踏线违规），持球手将羽毛球举到规则允许的最高位置，将球拍的反拍面正向对着羽毛球，似要发一个近角的网前球。<br />\n　　<br />\n　　而在真正实施发球时，开始的手势也象以反拍面正向击球，而在球拍将要触球的一刹那，手腕变向，以斜拍面去削击球托，发了对方一个远角的网前球。这样对方上网扑发球的成功要打折扣了。<br />\n　　<br />\n　　4.反手发网前球假动作<br />\n　　<br />\n　　还是站位在T字区近处（注意不要踏线违规），持球手将羽毛球举到规则允许的最高位置，将球拍的反拍面正向对着羽毛球，似要发一个近角的网前球。<br />\n　　<br />\n　　而在真正实施发球时，开始的引拍也象反拍面正向，但引拍动作较慢。而当球拍要击到球的一瞬间，大拇指发力弹击球拍，发出一个反手的平快球或者平高球，让对手只能仓促地应付，其结果是无法接发球抢攻而失去先机。<br />\n　　<br />\n　　羽毛球假动作技巧二：在接发球中的假动作<br />\n　　<br />\n　　接发球是每个回合的开始，其重要性是不言而喻。如果接发球处理得好，无论单打还是双打，都能取得先机，占到主动地位，有利赢得对打而夺回发球权。<br />\n　　<br />\n　　由于接发球的假动作有许多，不可能一一列举，就只能讲述一些典型的。但接发球中的假动作的要领都是：判断要好，起动要快，引拍动作要隐蔽和快捷，有虚晃一枪之招，真正出球要让对手捉摸不清。<br />\n　　<br />\n　　1.接发球中的假动作<br />\n　　<br />\n　　首先站位应中偏前，准备姿势都是大同小异，一种蓄势待发的状态。当对方发出一个网前小球时，如果打算以反拍面击球，就将持拍的脚向前跨一大步，以反拍面去回击球。引拍动作有点象在侧身的下手区划了一个由下至上的S形，在最后时利用手腕将拍面变向，把球击到反手网前区。<br />\n　　<br />\n　　如果是用正手接发球，就将球拍在自己的正手区划一个由下至上的反写的S形，要点也是在拍面将要接触球的一刹那，利用手腕将拍面转变，从而将球击到对方网前另一边角或者对方场地的中腰位置，让对手很难防。<br />\n　　<br />\n　　2.虚扑实放网前球<br />\n　　<br />\n　　动作要领是判断要准，在对方发来的网前小球一出手（离开球拍后），马上举拍上网似要扑杀，移步要快和作势凶猛，用身体语言给对手一个假象你要扑杀，对手就本能举拍准备防守反击，其双脚就会扎稳。<br />\n　　<br />\n　　这时你在球拍接触球前一刹那收势收力，将球轻挡回对方的网前或者利用手腕的细小的动作改变拍面，将球切击到对方的网前两个边角处，回放了对方一个网前球，让对手只能处于防守，由下向上的起球，你就抢到主动权了。<br />\n　　<br />\n　　3.虚放实挑后场<br />\n　　<br />\n　　动作要领是利用击球的时间差来迷惑对手。当对手发来网前小球时，马上持拍迎上去象似用正手或者反手去轻挑球，但不是第一时间就回击球，而是球拍随既按照球飞行的轨迹向后退，好象似被球推着向后退一样。<br />\n　　<br />\n　　当球拍回退到一定的位置（高度）时，突然小手臂和手腕发力，将球快速回击挑到对方的后场。如果整个动作逼真，对手就被迷惑，认为你会挑网前，哪知你实际是挑后场的高远球。一上当受骗就被动了。</p>\n",
          titleImageUrl:
            "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/427d9257fc9f4121bce1153e4cd1f7e6-1.5757851062107104E12.jpg.jpg",
          id: 150,
          browseNum: "27",
          fileList: [
            {
              id: "315a4cf471ce49c8a3c9c4b4afe65497",
              msgId: null,
              fieldName: null,
              name: null,
              isImg: null,
              contentType: null,
              size: 0,
              path: null,
              url:
                "https://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/zjty-oss/zjsport_filehost/2019-12-08/427d9257fc9f4121bce1153e4cd1f7e6-1.5757851062107104E12.jpg.jpg",
              ossurl: null,
              source: null,
              status: null,
              mark: null,
              insetsUrl: null,
              insetsOss: null,
              createTime: null,
              pathDir: null
            }
          ]
        }
      ];
      this.count = 78;
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less'>
.van-sticky--fixed {
  background-color: #ffffff;
}
.fenlei:before {
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  width: 20px;
  height: 20px;
  background: url("../../assets/fenlei@2x.png") center no-repeat;
  background-size: 100% 100%;
  content: "";
}
.van-tabs__nav--card .van-tab {
  background: #fff;
}
.van-tabs__nav.van-tabs__nav--card {
  margin: 0 12px;
  background-color: #fff;
}
.van-tabs__content {
  margin-top: 7px;
  border-top: 1px solid #e7e7e7;
}
.van-search {
  position: relative;
  padding: 8px 12px 8px 12px;
}
.van-search__content {
  border-radius: 16px;
}
.scienific-content {
  position: relative;
  padding-top: 7px;
  background-color: #fff;
  .sticky {
    position: relative;
    img {
      height: 1rem;
      position: absolute;
      right: 0.5rem;
      width: 1rem;
      top: 50%;
      transform: translate(0px, -50%);
    }
  }
}
.van-tabs--card {
  padding: 0;
}
</style>

<style lang='less' rel='stylesheet/less' scoped>
.info-list {
  padding: 7px 12px;
  background-color: #f6f7f8;
  .info-item {
    width: 100%;
    margin-bottom: 8px;
    padding: 16px 15px 11px 15px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
    border-radius: 3px;
    .item-wrap {
      display: block;
      width: 100%;
      height: 100%;
      h4 {
        margin-bottom: 14px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
      }
      .info-content {
        position: relative;
        .poster {
          max-height: 180px;
          overflow: hidden;
          border-radius: 3px;
        }
        img {
          width: 100%;
          max-height: 170px;
          border-radius: 3px;
          overflow: hidden;
        }
        .tag {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 11px;
          color: rgba(255, 255, 255, 1);
          line-height: 15px;
        }
        .type {
          margin-top: 10px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 11px;
        }
      }
    }
  }
}
</style>
<style>
body {
  background: #f6f7f8;
}
</style>


