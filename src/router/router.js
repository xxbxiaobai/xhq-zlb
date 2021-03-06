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
  //?????????????????????????????????????????????????????????????????????
  { path: '/homePage', name: 'homePage', meta:{index:1}, component: () => import('@/views/index') },
  { path: '/login', name: 'login', meta:{index:0}, component: () => import('@/views/login') },
  { path: '/identityOrder', name: 'identityOrder', component: () => import('@/views/fieldBook/identityOrder') },
  { path: '/swimBook', name: 'swimBook', component: () => import('@/views/fieldBook/swimBook') },
  { path: '/swimBookDetail', name: 'swimBookDetail', component: () => import('@/views/fieldBook/swimBookDetail') },
  { path: '/userAgreement', name: 'userAgreement', component: () => import('@/components/userAgreement') },
  { path: '/topSearch', name: 'topSearch', meta:{index:2}, component: () => import('@/views/search') },
  { path: '/bookDetail', name: 'bookDetail', component: () => import('@/views/fieldBook/bookDetail/') },
  { path: '/applyDetails', name: 'applyDetails', component: () => import('@/views/applyDetails') },//????????????
  { path: '/myApply', name: 'myApply', component: () => import('@/views/myApply') },//????????????
  { path: '/signupSuccess', name: 'signupSuccess', component: () => import('@/views/signupSuccess') },//????????????
  { path: '/signupInformtion', name: 'signupInformtion', component: () => import('@/views/signupInformtion') },//????????????
  { path: '/crewInformtion', name: 'crewInformtion', component: () => import('@/views/crewInformtion') },//??????????????????
  { path: '/matchDetails', name: 'matchDetails', component: () => import('@/views/matchDetails') },  //??????????????????
  { path: '/competitionNotice', name: 'competitionNotice', component: () => import('@/views/competitionNotice') },//????????????
  { path: '/checkDetail', name: 'checkDetail', component: () => import('@/views/checkDetail') },//????????????
  { path: '/coachReview', name: 'coachReview', component: () => import('@/views/coachReview') },  //?????????????????????
  { path: '/warrantyCont', name: 'warrantyCont', meta:{index:3}, component: () => import('@/views/warrantyCont') },  //????????????
  { path: '/warrantylist', name: 'warrantyList', meta:{index:2}, component: () => import('@/views/warrantyList') },  //????????????
  { path: '/warrantyEdit', name: 'warrantyEdit', meta:{index:4}, component: () => import('@/views/warrantyEdit') },  //??????
  { path: '/orderSubmit', name: 'orderSubmit', component: () => import('@/views/fieldBook/orderSubmit') }, //????????????
  { path: '/repairService', name: 'repairService', meta:{index:4}, component: () => import('@/views/warrantyEdit/repairService.vue') }, //????????????
  /**
   * ??????
   */
  { path: '/map/searchPlace', name: 'searchPlace', meta:{index:2}, component: () => import('@/views/map/searchPlace.vue') },  //????????????
  { path: '/map/goodParticulars', name: 'goodParticulars', meta:{index:3}, component: () => import('@/views/map/goodPathParticulars.vue') },  //??????????????????
  { path: '/map/goodPathList', name: 'goodList', meta:{index:2},component: () => import('@/views/map/goodPathList.vue') },  //??????????????????
  { path: '/map/goodPathMap', name: 'goodMap', meta:{index:1}, component: () => import('@/views/map/goodPathMap.vue') },



  /**
   * ?????????
   */
  { path: '/same-city', name: 'sameCity',meta:{index:2}, component: () => import('@/views/sameCity') }, //???????????????
  { path: '/same-city/city', name: 'city', meta:{index:3}, component: () => import('@/views/sameCity/city') }, //???????????????
  { path: '/same-city/city/edit', name: 'city-edit', meta:{index:4}, component: () => import('@/views/sameCity/city/edit') },//???????????????
  { path: '/same-city/city/details', name: 'city-details', meta:{index:4}, component: () => import('@/views/sameCity/city/details') },//???????????????
  { path: '/same-city/city/add', name: 'city-add', meta:{index:4}, component: () => import('@/views/sameCity/city/add') },//???????????????

  { path: '/same-city/organization', name: 'organization', meta:{index:4}, component: () => import('@/views/sameCity/organization') }, //????????????
  { path: '/same-city/organization/add', name: 'organization-add', component: () => import('@/views/sameCity/organization/add') }, //????????????
  { path: '/same-city/organization/details', name: 'organization-details', component: () => import('@/views/sameCity/organization/details') }, //????????????

  { path: '/same-city/crowd', name: 'crowd', meta:{index:3}, component: () => import('@/views/sameCity/crowd') }, //???????????????
  { path: '/same-city/crowdMember', name: 'crowdMember', component: () => import('@/views/sameCity/crowd/crowdMember') }, //?????????
  { path: '/same-city/postNews', name: 'postNews', component: () => import('@/views/sameCity/crowd/postNews') }, //????????????
  { path: '/same-city/crowd/details', name: 'crowd-details', meta:{index:4}, component: () => import('@/views/sameCity/crowd/details') },//???????????????
  { path: '/same-city/crowd/edit', name: 'crowd-edit', meta:{index:4}, component: () => import('@/views/sameCity/crowd/edit') },//???????????????
  { path: '/same-city/crowd/add', name: 'crowd-add', meta:{index:4}, component: () => import('@/views/sameCity/crowd/add') },//???????????????

  //????????? / ??????
  { path: '/same-city/user/organization', name: 'user-organization', component: () => import('@/views/sameCity/user/organization') },//???????????????
  { path: '/same-city/user/crowd', name: 'user-crowd', component: () => import('@/views/sameCity/user/crowd') },//???????????????
  { path: '/user/myCommunity', name: 'user-community', meta:{index:2}, component: () => import('@/views/user/myCommunity') },//??????????????????
  // { path: '/sports-organization-particulars', name: 'organizationParticulars', component: () => import('@/views/scientific-fitness/components/sports-organization-particulars') }, 
  { path: '/user/myCrowd', name: 'user-subcrowd', meta:{index:2}, component: () => import('@/views/user/myCrowd') },


  /**
   * ????????????
   * outdoors
   */
  { path: '/outdoors', name: 'outdoors', meta:{index:2}, component: () => import('@/views/outdoors') }, //??????????????????
  { path: '/outdoors/particulars', name: 'outdoors-particulars', meta:{index:3}, component: () => import('@/views/outdoors/particulars') }, //??????????????????











  { path: '/ranking', name: 'ranking', component: () => import('@/views/ranking') },
  { path: '/user', name: 'user', component: () => import('@/views/user') },



  //??????
  { path: '/monitoring', name: 'monitoring', component: () => import('@/views/monitoring') },
  { path: '/monitoring/video', name: 'monitoring-video', component: () => import('@/views/monitoring/video') },


  //??????
  { path: '/pay', name: 'pay', component: () => import('@/views/pay') },
  //?????????
  { path: '/physicalMeasurements', name: 'physical-measurements', meta:{index:3}, component: () => import('@/views/physicalMeasurements') },

  // ????????????
  { path: '/goodPathParticular', name: 'goodPathParticular', component: () => import('@/views/goodPathParticular') },

  //?????????
  { path: '/promotion', name: 'promotion', meta:{index:2}, component: () => import('@/views/promotion') },


  // ????????????
  //??????????????????
  {
    path: '/match', name: 'match', component: Match, children: [{ path: 'competition', name: 'competition', component: Competition }]
  },
  // { path: '/competition-match', name: 'matchPage', component: () => import('@/views/match') },  //????????????
  { path: '/match-video', name: 'matchVideo', component: () => import('@/views/match/match-video') },  //????????????
  { path: '/video-datails', name: 'videoDetails', component: () => import('@/views/match/video-details') }, // ????????????
  { path: '/video-search', name: 'videoSearch', component: () => import('@/views/match/video-search') }, // ????????????
  { path: '/addPeople', name: 'addPeople', component: () => import('@/views/match/addPeople') },  //????????????

  // ??????
  // ??????
  { path: '/orderList', name: 'orderList', meta:{index:2}, component: () => import('@/views/orderList') },  //??????
  { path: '/orderCont', name: 'orderCont', component: () => import('@/views/orderCont') },  //??????
  // ????????????????????????
  { path: '/scientific-list', name: 'fitnessList', meta:{index:2}, component: () => import('@/views/scientific-fitness-home') },
  // ????????????
  { path: '/scientific-fitness', name: 'fitness',meta:{index:3}, component: () => import('@/views/scientific-fitness') },
  { path: '/scientific-fitness/details', name: 'fitnessDetails', component: () => import('@/views/scientific-fitness/components/fitness-details') },  // ????????????????????????
  { path: '/scientific-fitness/graphic-details', name: 'graphicDetails', meta:{index:4}, component: () => import('@/views/scientific-fitness/components/graphic-details') },  // ????????????????????????
  { path: '/filter', name: 'filter', component: () => import('@/views/scientific-fitness/components/filter') },  // ??????????????????
  { path: '/search', name: 'search', component: () => import('@/views/scientific-fitness/components/search') },  // ??????????????????
  // ??????????????????
  { path: '/sports-organization', name: 'search', component: () => import('@/views/scientific-fitness/components/sports-organization') },
  { path: '/sports-organization-particulars1', name: 'organizationParticulars1', component: () => import('@/views/scientific-fitness/components/sports-organization-particulars1') },  //??????????????????

  //??????
  { path: '/searchPlace', name: 'searchPlace', component: () => import('@/views/searchPlace') },  //????????????
  { path: '/goodParticulars', name: 'goodParticulars', component: () => import('@/views/goodPathParticulars') },  //??????????????????
  { path: '/goodPathList', name: 'goodList', component: () => import('@/views/goodPathList') },  //??????????????????
  { path: '/goodPathMap', name: 'goodMap', component: () => import('@/views/goodPathMap') },  //??????????????????

  { path: '/match-result', name: 'result', component: () => import('@/views/match/match-result') },  //??????
  { path: '/match-result/particulars', name: 'particulars', component: () => import('@/views/match/match-result-particulars') },  //??????



  // ??????????????????
  { path: '/lookfail', name: 'lookfail', component: Lookgroupdefail },
  //??????
  { path: '/searcha', name: 'searcha', component: Search },
  //????????????
  { path: '/myapplication', name: 'myapplication', meta:{index:2}, component: MyApplication },
  //????????????
  { path: '/failure', name: 'failure', component: Failure },
  //????????????
  { path: '/cancel', name: 'cancel', component: Cancel },
  //????????????
  { path: '/lookgroup', name: 'lookgroup', component: LookGroup },
  // ????????????
  { path: '/status', name: 'status', component: Status },
  //????????????
  { path: '/preview', name: 'preview', component: Preview },
  //????????????
  { path: '/success', name: 'success', component: Success },
  //??????????????????
  { path: '/cancelreservation', name: 'cancelreservation', component: CancelReservation },
  //????????????????????????
  { path: '/cancelsubmit', name: 'cancelsubmit', component: CancelSubmit },
  //????????????
  { path: '/signsuccess', name: 'signsuccess', component: SignSuccess },
  //????????????????????????
  { path: '/establish', name: 'establish', component: Establish },
  //????????????
  { path: '/catalog', name: 'catalog', meta:{index:2}, component: Catalog },
  //????????????
  { path: '/presentation', name: 'presentation', component: Presentation },
  //????????????
  { path: '/competition', name: 'competition', component: Competition },
  //????????????
  { path: '/information', name: 'information', component: Information },
  //????????????
  { path: '/determination', name: 'Determination', component: Determination },
  //????????????
  { path: '/personal', name: 'personal', component: Personal },
  { path: '/personal1', name: 'personal1', component: Personal1 },
  //????????????
  { path: '/team', name: 'Team', component: Team },
  //????????????
  { path: '/clickinto', name: 'clickinto', component: ClickInto },
  //????????????
  { path: '/details', name: 'details', meta:{index:3}, component: Details, },
  //????????????
  { path: '/noticedetails', name: 'noticedetails', meta:{index:4}, component: NoticeDetails },
  //????????????
  { path: '/train', name: 'train', meta:{index:2}, component: Train },
  //????????????????????????
  { path: '/trainfailure', name: 'trainfailure', component: TrainFailure },
  //????????????????????????????????????
  { path: '/trainsuccess', name: 'trainsuccess', component: TrainSuccess },
  //??????????????????????????????
  { path: '/cancelreason', name: 'cancelreason', component: CancelReason },
  //??????????????????
  { path: '/trainsubmit', name: 'trainsubmit', component: TrainSubmit },
  // ?????????????????????To examine
  { path: '/toexamine', name: 'toexamine', component: ToExamine },
  //??????????????????
  { path: '/trainnotice', name: 'TrainNotice', component: TrainNotice },
  //????????????????????????
  { path: '/traininformation', name: 'traininformation', component: TrainInformation },
  //????????????????????????
  { path: '/traincancel', name: 'traincancel', component: TrainCancel },
  // ?????????????????????
  { path: '/trainpassed', name: 'trainpassed', component: TrainPassed },
  //????????????
  { path: '/trainlist', name: 'trainlist', component: TrainList },

  //jy
  // ?????????????????????
  {
    path: '/constitu',
    name: 'constitu',
    component: () => import('../views/constitution/constitu.vue')
  },
  // ?????????????????????
  {
    path: '/parti',
    name: 'parti',
    component: () => import('../views/constitution/parti.vue')
  },
  // ?????????????????????
  {
    path: '/datum',
    name: 'datum',
    component: () => import('../views/constitution/datum.vue')
  },
  // ???????????????????????????
  {
    path: '/submit',
    name: 'submit',
    component: () => import('../views/constitution/submit.vue')
  },
  // ???????????????
  {
    path: '/instructor',
    name: 'instructor',
    meta:{index:3},
    component: () => import('../views/constitution/instructor.vue')
  },
  // ???????????????
  {
    path: '/instructors',
    name: 'instructors',
    meta:{index:4},
    component: () => import('../views/constitution/instructors.vue')
  },
  // ???????????????
  {
    path: '/instructorEdit',
    name: 'instructorEdit',
    component: () => import('../views/constitution/instructorEdit.vue')
  },
  // ???????????????
  {
    path: '/seek',
    name: 'seek',
    component: () => import('../views/constitution/seek.vue')
  },
  // ???????????????????????????
  {
    path: '/graphicdetails',
    name: 'graphicdetails',
    component: () => import('../views/constitution/graphicdetails.vue')
  },
  // ????????????
  {
    path: '/myMeasure',
    name: 'myMeasure',
    component: () => import('../views/constitution/myMeasure.vue')
  },
  // ????????????
  {
    path: '/noMake',
    name: 'noMake',
    component: () => import('../views/constitution/noMake.vue')
  },
  // ????????????
  {
    path: '/awaitMeasure',
    name: 'awaitMeasure',
    component: () => import('../views/constitution/awaitMeasure.vue')
  },
  // ?????????????????????
  {
    path: '/underway',
    name: 'underway',
    component: () => import('../views/constitution/underway.vue')
  },
  // ????????????
  {
    path: '/previews',
    name: 'preview',
    component: () => import('../views/constitution/preview.vue')
  },
  // ????????????
  {
    path: '/oneself',
    name: 'oneself',
    meta:{index:1},
    component: () => import('../views/constitution/oneself.vue')
  },
  //????????????
  {
    path: '/sysConfig',
    name: 'sysConfig',
    meta:{index:2},
    component: () => import('../views/constitution/sysConfig.vue')
  },
  //????????????
  {
    path: '/modifyPassword',
    name: 'modifyPassword',
    meta:{index:3},
    component: () => import('../views/constitution/modifyPassword.vue')
  },
  //???????????????
  {
    path: '/feedback',
    name: 'feedback',
    meta:{index:3},
    component: () => import('../views/constitution/feedback.vue')
  },
  //????????????
  {
    path: '/aboutUs',
    name: 'aboutUs',
    meta:{index:3},
    component: () => import('../views/constitution/aboutUs.vue')
  },
  //??????
  {
    path: '/userProtocol',
    name: 'userProtocol',
    component: () => import('../views/constitution/userProtocol.vue')
  },
  //??????
  {
    path: '/userPrivacy',
    name: 'userPrivacy',
    component: () => import('../views/constitution/userPrivacy.vue')
  },
  //????????????
  {
    path: '/personalInfo',
    name: 'personalInfo',
    meta:{index:2},
    component: () => import('../views/constitution/modifyPersonalInfo.vue')
  },
  //????????????????????????
  {
    path: '/modifyDetail',
    name: 'modifyDetail',
    meta:{index:3},
    component: () => import('../views/constitution/modifyDetail.vue')
  },
  //????????????
  {
    path: '/modifySuccess',
    name: 'modifySuccess',
    component: () => import('../views/constitution/modifySuccess.vue')
  },
  //????????????
  {
    path: '/ScientificIndex',
    name: 'ScientificIndex',
    component: () => import('../views/constitution/ScientificIndex.vue')
  },
  //??????
  {
    path: '/lottery',
    name: 'lottery',
    meta:{index:3},
    component: () => import('../views/user/lottery.vue')
  },
  //??????
  {
    path: '/activity',
    name: 'activity',
    meta:{index:2},
    component: () => import('../views/user/myActivity.vue')
  },
  //????????????
  {
    path: '/lotteryRecord',
    name: 'lotteryRecord',
    meta:{index:4},
    component: () => import('../views/user/lotteryRecord.vue')
  },
  //????????????
  //?????????????????????????????????????????????????????????????????????
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
