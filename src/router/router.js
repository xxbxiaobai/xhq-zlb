import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Search = () => import('../views/match/Search.vue')
const MyApplication = () => import('../views/match/MyApplication.vue')
const Failure = () => import('../views/match/Failure.vue')
const Cancel = () => import('../views/match/Cancel.vue')
const LookGroup = () => import('../views/match/LookGroup.vue')
const Status = () => import('../views/match/Status.vue')
const Preview = () => import('../views/match/Preview.vue')
const Success = () => import('../views/match/Success.vue')
const CancelReservation = () => import('../views/match/CancelReservation.vue')
const CancelSubmit = () => import('../views/match/CancelSubmit.vue')
const SignSuccess = () => import('../views/match/SignSuccess.vue')
const Establish = () => import('../views/match/Establish.vue')
const Catalog = () => import('../views/match/Catalog.vue')
const Presentation = () => import('../views/match/Presentation.vue')
const Competition = () => import('../views/match/Competition.vue')
const Information = () => import('../views/match/Information.vue')
const Determination = () => import('../views/match/Determination.vue')
const Personal = () => import('../views/match/Personal.vue')
const Personal1 = () => import('../views/match/Personal1.vue')
const Team = () => import('../views/match/Team.vue')
const ClickInto = () => import('../views/match/ClickInto.vue')
const Details = () => import('../views/match/Details.vue')
const NoticeDetails = () => import('../views/match/NoticeDetails.vue')
const Train = () => import('../views/train/Train.vue')
const TrainFailure = () => import('../views/train/TrainFailure.vue')
const TrainSuccess = () => import('../views/train/TrainSuccess.vue')
const CancelReason = () => import('../views/train/CancelReason.vue')
const TrainSubmit = () => import('../views/train/TrainSubmit.vue')
const ToExamine = () => import('../views/train/ToExamine.vue')
const TrainNotice = () => import('../views/train/TrainNotice.vue')
const TrainInformation = () => import('../views/train/TrainInformation.vue')
const TrainCancel = () => import('../views/train/TrainCancel.vue')
const TrainPassed = () => import('../views/train/TrainPassed.vue')
const Lookgroupdefail = () => import('../views/match/LoookGroupdefail.vue')
const TrainList = () => import('../views/train/TrainList.vue')
const Match = () => import('../views/match/index.vue')
export const constantRouterMap = [
  //西湖区项目首页（暂时把校园健身项目作为主入口）
  { path: '/homePage', name: 'homePage', meta:{index:1}, component: () => import('@/views/index') },
  { path: '/login', name: 'login', meta:{index:0}, component: () => import('@/views/login') },
  { path: '/identityOrder', name: 'identityOrder', component: () => import('@/views/fieldBook/identityOrder') },
  { path: '/swimBook', name: 'swimBook', component: () => import('@/views/fieldBook/swimBook') },
  { path: '/swimBookDetail', name: 'swimBookDetail', component: () => import('@/views/fieldBook/swimBookDetail') },
  { path: '/userAgreement', name: 'userAgreement', component: () => import('@/components/userAgreement') },
  { path: '/topSearch', name: 'topSearch', meta:{index:2}, component: () => import('@/views/search') },
  { path: '/bookDetail', name: 'bookDetail', component: () => import('@/views/fieldBook/bookDetail/') },
  { path: '/applyDetails', name: 'applyDetails', component: () => import('@/views/applyDetails') },//报名详情
  { path: '/myApply', name: 'myApply', component: () => import('@/views/myApply') },//我的报名
  { path: '/signupSuccess', name: 'signupSuccess', component: () => import('@/views/signupSuccess') },//报名成功
  { path: '/signupInformtion', name: 'signupInformtion', component: () => import('@/views/signupInformtion') },//报名信息
  { path: '/crewInformtion', name: 'crewInformtion', component: () => import('@/views/crewInformtion') },//赛事人员信息
  { path: '/matchDetails', name: 'matchDetails', component: () => import('@/views/matchDetails') },  //赛事公告详情
  { path: '/competitionNotice', name: 'competitionNotice', component: () => import('@/views/competitionNotice') },//赛事公告
  { path: '/checkDetail', name: 'checkDetail', component: () => import('@/views/checkDetail') },//审核详情
  { path: '/coachReview', name: 'coachReview', component: () => import('@/views/coachReview') },  //教练审核运动员
  { path: '/warrantyCont', name: 'warrantyCont', meta:{index:3}, component: () => import('@/views/warrantyCont') },  //保修详情
  { path: '/warrantylist', name: 'warrantyList', meta:{index:2}, component: () => import('@/views/warrantyList') },  //保修列表
  { path: '/warrantyEdit', name: 'warrantyEdit', meta:{index:4}, component: () => import('@/views/warrantyEdit') },  //保修
  { path: '/orderSubmit', name: 'orderSubmit', component: () => import('@/views/fieldBook/orderSubmit') }, //订单确认
  { path: '/repairService', name: 'repairService', meta:{index:4}, component: () => import('@/views/warrantyEdit/repairService.vue') }, //扫码报修
  /**
   * 地图
   */
  { path: '/map/searchPlace', name: 'searchPlace', meta:{index:2}, component: () => import('@/views/map/searchPlace.vue') },  //查询场所
  { path: '/map/goodParticulars', name: 'goodParticulars', meta:{index:3}, component: () => import('@/views/map/goodPathParticulars.vue') },  //精品路线详情
  { path: '/map/goodPathList', name: 'goodList', meta:{index:2},component: () => import('@/views/map/goodPathList.vue') },  //精品路线列表
  { path: '/map/goodPathMap', name: 'goodMap', meta:{index:1}, component: () => import('@/views/map/goodPathMap.vue') },



  /**
   * 健身圈
   */
  { path: '/same-city', name: 'sameCity',meta:{index:2}, component: () => import('@/views/sameCity') }, //健身圈主页
  { path: '/same-city/city', name: 'city', meta:{index:3}, component: () => import('@/views/sameCity/city') }, //同城约主页
  { path: '/same-city/city/edit', name: 'city-edit', meta:{index:4}, component: () => import('@/views/sameCity/city/edit') },//同城约新建
  { path: '/same-city/city/details', name: 'city-details', meta:{index:4}, component: () => import('@/views/sameCity/city/details') },//同城约详情
  { path: '/same-city/city/add', name: 'city-add', meta:{index:4}, component: () => import('@/views/sameCity/city/add') },//同城约报名

  { path: '/same-city/organization', name: 'organization', meta:{index:4}, component: () => import('@/views/sameCity/organization') }, //社团主页
  { path: '/same-city/organization/add', name: 'organization-add', component: () => import('@/views/sameCity/organization/add') }, //社团报名
  { path: '/same-city/organization/details', name: 'organization-details', component: () => import('@/views/sameCity/organization/details') }, //社团详情

  { path: '/same-city/crowd', name: 'crowd', meta:{index:3}, component: () => import('@/views/sameCity/crowd') }, //健身群主页
  { path: '/same-city/crowdMember', name: 'crowdMember', component: () => import('@/views/sameCity/crowd/crowdMember') }, //群成员
  { path: '/same-city/postNews', name: 'postNews', component: () => import('@/views/sameCity/crowd/postNews') }, //发布动态
  { path: '/same-city/crowd/details', name: 'crowd-details', meta:{index:4}, component: () => import('@/views/sameCity/crowd/details') },//健身群详情
  { path: '/same-city/crowd/edit', name: 'crowd-edit', meta:{index:4}, component: () => import('@/views/sameCity/crowd/edit') },//健身群新建
  { path: '/same-city/crowd/add', name: 'crowd-add', meta:{index:4}, component: () => import('@/views/sameCity/crowd/add') },//健身群申请

  //我的群 / 社团
  { path: '/same-city/user/organization', name: 'user-organization', component: () => import('@/views/sameCity/user/organization') },//健身群申请
  { path: '/same-city/user/crowd', name: 'user-crowd', component: () => import('@/views/sameCity/user/crowd') },//健身群申请
  { path: '/user/myCommunity', name: 'user-community', meta:{index:2}, component: () => import('@/views/user/myCommunity') },//我的社团列表
  // { path: '/sports-organization-particulars', name: 'organizationParticulars', component: () => import('@/views/scientific-fitness/components/sports-organization-particulars') }, 
  { path: '/user/myCrowd', name: 'user-subcrowd', meta:{index:2}, component: () => import('@/views/user/myCrowd') },


  /**
   * 全域户外
   * outdoors
   */
  { path: '/outdoors', name: 'outdoors', meta:{index:2}, component: () => import('@/views/outdoors') }, //全域户外地图
  { path: '/outdoors/particulars', name: 'outdoors-particulars', meta:{index:3}, component: () => import('@/views/outdoors/particulars') }, //全域户外详情











  { path: '/ranking', name: 'ranking', component: () => import('@/views/ranking') },
  { path: '/user', name: 'user', component: () => import('@/views/user') },



  //监控
  { path: '/monitoring', name: 'monitoring', component: () => import('@/views/monitoring') },
  { path: '/monitoring/video', name: 'monitoring-video', component: () => import('@/views/monitoring/video') },


  //支付
  { path: '/pay', name: 'pay', component: () => import('@/views/pay') },
  //测定站
  { path: '/physicalMeasurements', name: 'physical-measurements', meta:{index:3}, component: () => import('@/views/physicalMeasurements') },

  // 全域户外
  { path: '/goodPathParticular', name: 'goodPathParticular', component: () => import('@/views/goodPathParticular') },

  //优惠码
  { path: '/promotion', name: 'promotion', meta:{index:2}, component: () => import('@/views/promotion') },


  // 竞赛赛事
  //赛事活动首页
  {
    path: '/match', name: 'match', component: Match, children: [{ path: 'competition', name: 'competition', component: Competition }]
  },
  // { path: '/competition-match', name: 'matchPage', component: () => import('@/views/match') },  //赛事视频
  { path: '/match-video', name: 'matchVideo', component: () => import('@/views/match/match-video') },  //赛事视频
  { path: '/video-datails', name: 'videoDetails', component: () => import('@/views/match/video-details') }, // 视频详情
  { path: '/video-search', name: 'videoSearch', component: () => import('@/views/match/video-search') }, // 视频搜索
  { path: '/addPeople', name: 'addPeople', component: () => import('@/views/match/addPeople') },  //添加成员

  // 杨浩
  // 首页
  { path: '/orderList', name: 'orderList', meta:{index:2}, component: () => import('@/views/orderList') },  //订单
  { path: '/orderCont', name: 'orderCont', component: () => import('@/views/orderCont') },  //订单
  // 科学健身综合页面
  { path: '/scientific-list', name: 'fitnessList', meta:{index:2}, component: () => import('@/views/scientific-fitness-home') },
  // 科学健身
  { path: '/scientific-fitness', name: 'fitness',meta:{index:3}, component: () => import('@/views/scientific-fitness') },
  { path: '/scientific-fitness/details', name: 'fitnessDetails', component: () => import('@/views/scientific-fitness/components/fitness-details') },  // 健身指导视频详情
  { path: '/scientific-fitness/graphic-details', name: 'graphicDetails', meta:{index:4}, component: () => import('@/views/scientific-fitness/components/graphic-details') },  // 健身指导图文详情
  { path: '/filter', name: 'filter', component: () => import('@/views/scientific-fitness/components/filter') },  // 科学健身筛选
  { path: '/search', name: 'search', component: () => import('@/views/scientific-fitness/components/search') },  // 健身指导详情
  // 体育社会组织
  { path: '/sports-organization', name: 'search', component: () => import('@/views/scientific-fitness/components/sports-organization') },
  { path: '/sports-organization-particulars1', name: 'organizationParticulars1', component: () => import('@/views/scientific-fitness/components/sports-organization-particulars1') },  //精品路线详情

  //地图
  { path: '/searchPlace', name: 'searchPlace', component: () => import('@/views/searchPlace') },  //查询场所
  { path: '/goodParticulars', name: 'goodParticulars', component: () => import('@/views/goodPathParticulars') },  //精品路线详情
  { path: '/goodPathList', name: 'goodList', component: () => import('@/views/goodPathList') },  //精品路线列表
  { path: '/goodPathMap', name: 'goodMap', component: () => import('@/views/goodPathMap') },  //精品路线地图

  { path: '/match-result', name: 'result', component: () => import('@/views/match/match-result') },  //成绩
  { path: '/match-result/particulars', name: 'particulars', component: () => import('@/views/match/match-result-particulars') },  //成绩



  // 团体报名失败
  { path: '/lookfail', name: 'lookfail', component: Lookgroupdefail },
  //搜索
  { path: '/searcha', name: 'searcha', component: Search },
  //我的报名
  { path: '/myapplication', name: 'myapplication', meta:{index:2}, component: MyApplication },
  //报名失败
  { path: '/failure', name: 'failure', component: Failure },
  //取消报名
  { path: '/cancel', name: 'cancel', component: Cancel },
  //查看团体
  { path: '/lookgroup', name: 'lookgroup', component: LookGroup },
  // 缴费状态
  { path: '/status', name: 'status', component: Status },
  //预览报告
  { path: '/preview', name: 'preview', component: Preview },
  //提交成功
  { path: '/success', name: 'success', component: Success },
  //取消预约原因
  { path: '/cancelreservation', name: 'cancelreservation', component: CancelReservation },
  //取消预约原因提交
  { path: '/cancelsubmit', name: 'cancelsubmit', component: CancelSubmit },
  //报名成功
  { path: '/signsuccess', name: 'signsuccess', component: SignSuccess },
  //团体报名创建成功
  { path: '/establish', name: 'establish', component: Establish },
  //报名目录
  { path: '/catalog', name: 'catalog', meta:{index:2}, component: Catalog },
  //报名报告
  { path: '/presentation', name: 'presentation', component: Presentation },
  //赛事公告
  { path: '/competition', name: 'competition', component: Competition },
  //资料填写
  { path: '/information', name: 'information', component: Information },
  //成绩确认
  { path: '/determination', name: 'Determination', component: Determination },
  //个人报名
  { path: '/personal', name: 'personal', component: Personal },
  { path: '/personal1', name: 'personal1', component: Personal1 },
  //团体报名
  { path: '/team', name: 'Team', component: Team },
  //点击加入
  { path: '/clickinto', name: 'clickinto', component: ClickInto },
  //报名详情
  { path: '/details', name: 'details', meta:{index:3}, component: Details, },
  //公告详情
  { path: '/noticedetails', name: 'noticedetails', meta:{index:4}, component: NoticeDetails },
  //我的培训
  { path: '/train', name: 'train', meta:{index:2}, component: Train },
  //我的培训报名失败
  { path: '/trainfailure', name: 'trainfailure', component: TrainFailure },
  //我的培训取消报名提交成功
  { path: '/trainsuccess', name: 'trainsuccess', component: TrainSuccess },
  //我的培训取消报名原因
  { path: '/cancelreason', name: 'cancelreason', component: CancelReason },
  //我的培训提交
  { path: '/trainsubmit', name: 'trainsubmit', component: TrainSubmit },
  // 我的培训审核中To examine
  { path: '/toexamine', name: 'toexamine', component: ToExamine },
  //培训公告详情
  { path: '/trainnotice', name: 'TrainNotice', component: TrainNotice },
  //我的培训资料填写
  { path: '/traininformation', name: 'traininformation', component: TrainInformation },
  //我的培训取消报名
  { path: '/traincancel', name: 'traincancel', component: TrainCancel },
  // 我的培训已通过
  { path: '/trainpassed', name: 'trainpassed', component: TrainPassed },
  //培训目录
  { path: '/trainlist', name: 'trainlist', component: TrainList },

  //jy
  // 体质测站点首页
  {
    path: '/constitu',
    name: 'constitu',
    component: () => import('../views/constitution/constitu.vue')
  },
  // 体质测站点详情
  {
    path: '/parti',
    name: 'parti',
    component: () => import('../views/constitution/parti.vue')
  },
  // 体质测站点预约
  {
    path: '/datum',
    name: 'datum',
    component: () => import('../views/constitution/datum.vue')
  },
  // 体质测站点预约成功
  {
    path: '/submit',
    name: 'submit',
    component: () => import('../views/constitution/submit.vue')
  },
  // 指导员列表
  {
    path: '/instructor',
    name: 'instructor',
    meta:{index:3},
    component: () => import('../views/constitution/instructor.vue')
  },
  // 指导员详情
  {
    path: '/instructors',
    name: 'instructors',
    meta:{index:4},
    component: () => import('../views/constitution/instructors.vue')
  },
  // 指导员发布
  {
    path: '/instructorEdit',
    name: 'instructorEdit',
    component: () => import('../views/constitution/instructorEdit.vue')
  },
  // 搜索指导员
  {
    path: '/seek',
    name: 'seek',
    component: () => import('../views/constitution/seek.vue')
  },
  // 指导员详情推荐内容
  {
    path: '/graphicdetails',
    name: 'graphicdetails',
    component: () => import('../views/constitution/graphicdetails.vue')
  },
  // 我的测定
  {
    path: '/myMeasure',
    name: 'myMeasure',
    component: () => import('../views/constitution/myMeasure.vue')
  },
  // 取消预约
  {
    path: '/noMake',
    name: 'noMake',
    component: () => import('../views/constitution/noMake.vue')
  },
  // 查看详情
  {
    path: '/awaitMeasure',
    name: 'awaitMeasure',
    component: () => import('../views/constitution/awaitMeasure.vue')
  },
  // 测定后等待页面
  {
    path: '/underway',
    name: 'underway',
    component: () => import('../views/constitution/underway.vue')
  },
  // 预览报告
  {
    path: '/previews',
    name: 'preview',
    component: () => import('../views/constitution/preview.vue')
  },
  // 个人中心
  {
    path: '/oneself',
    name: 'oneself',
    meta:{index:1},
    component: () => import('../views/constitution/oneself.vue')
  },
  //个人设置
  {
    path: '/sysConfig',
    name: 'sysConfig',
    meta:{index:2},
    component: () => import('../views/constitution/sysConfig.vue')
  },
  //修改密码
  {
    path: '/modifyPassword',
    name: 'modifyPassword',
    meta:{index:3},
    component: () => import('../views/constitution/modifyPassword.vue')
  },
  //反馈与建议
  {
    path: '/feedback',
    name: 'feedback',
    meta:{index:3},
    component: () => import('../views/constitution/feedback.vue')
  },
  //关于我们
  {
    path: '/aboutUs',
    name: 'aboutUs',
    meta:{index:3},
    component: () => import('../views/constitution/aboutUs.vue')
  },
  //协议
  {
    path: '/userProtocol',
    name: 'userProtocol',
    component: () => import('../views/constitution/userProtocol.vue')
  },
  //隐私
  {
    path: '/userPrivacy',
    name: 'userPrivacy',
    component: () => import('../views/constitution/userPrivacy.vue')
  },
  //修改资料
  {
    path: '/personalInfo',
    name: 'personalInfo',
    meta:{index:2},
    component: () => import('../views/constitution/modifyPersonalInfo.vue')
  },
  //修改资料具体信息
  {
    path: '/modifyDetail',
    name: 'modifyDetail',
    meta:{index:3},
    component: () => import('../views/constitution/modifyDetail.vue')
  },
  //修改成功
  {
    path: '/modifySuccess',
    name: 'modifySuccess',
    component: () => import('../views/constitution/modifySuccess.vue')
  },
  //我的预约
  {
    path: '/ScientificIndex',
    name: 'ScientificIndex',
    component: () => import('../views/constitution/ScientificIndex.vue')
  },
  //抽奖
  {
    path: '/lottery',
    name: 'lottery',
    meta:{index:3},
    component: () => import('../views/user/lottery.vue')
  },
  //活动
  {
    path: '/activity',
    name: 'activity',
    meta:{index:2},
    component: () => import('../views/user/myActivity.vue')
  },
  //抽奖记录
  {
    path: '/lotteryRecord',
    name: 'lotteryRecord',
    meta:{index:4},
    component: () => import('../views/user/lotteryRecord.vue')
  },
  //校园健身
  //西湖区项目首页（暂时把校园健身项目作为主入口）
  {
    path: '/',
    name: 'personList',
    meta:{index:4},
    component: () => import('../views/TheCampusFitness/personList.vue')
  },
  {
    path: '/persondetails',
    name: 'persondetails',
    meta:{index:4},
    component: () => import('../views/TheCampusFitness/persondetails.vue')
  },
  {
    path: '/PersonInfo',
    name: 'PersonInfo',
    meta:{index:4},
    component: () => import('../views/TheCampusFitness/PersonInfo.vue')
  },
  {
    path: '/DataStatistics',
    name: 'DataStatistics',
    meta:{index:4},
    component: () => import('../views/TheCampusFitness/DataStatistics.vue')
  },
  {
    path: '/perMap',
    name: 'perMap',
    meta:{index:4},
    component: () => import('../views/TheCampusFitness/perMap.vue')
  },
  {
    path: '/schoolList',
    name: 'schoolList',
    meta:{index:4},
    component: () => import('../views/TheCampusFitness/schoolList.vue')
  },
  {
    path: '/Techical',
    name: 'Techical',
    meta:{index:4},
    component: () => import('../views/TheCampusFitness/Techical.vue')
  }

]



export default new Router({
  // mode:'history',
  routes: constantRouterMap
})
