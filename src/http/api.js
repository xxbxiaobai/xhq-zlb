// ===================================
// 公用请求文件
// ===================================
import {
    request,
    request2
} from './request'
// 测试
// const baseUrlTrue = 'http://192.168.0.198:10094/'
// const baseUrlTrue = 'http://dahdfhadj.cn.utools.club/'
// const returnUrl = 'http://ggfw.tyj.zj.gov.cn/sxs/'

// 西湖正式
//备注备注
// const baseUrlTrue = '/api'
const baseUrlTrue = 'https://xhszty.hzxh.gov.cn/'
const returnUrl = 'https://xhszty.hzxh.gov.cn/'

const userId = 1,
    userImg = baseUrlTrue + 'api-file/files-anon/download?fileID=',
    ImageUrl = baseUrlTrue + 'api-file/foreign/files-anon/download?fileID=',
    modifyUserImg = baseUrlTrue + 'api-file/foreign/files-blob', //头像上传
    url = {
        selectByIDCardAndName: baseUrlTrue + "api-movement/movement/api/teenager/selectByIDCardAndName",//获取学籍
        sure: baseUrlTrue + "api-movement/movement/api/agreement/sure",
        mobileUserInfo: baseUrlTrue + "api-map/map/api/user/mobileUserInfo",//获取用户信息
        loginByUsername: baseUrlTrue + "api-map/map/api/user/zlbLogin",//登录

        codegetToken: baseUrlTrue + 'api-movement/map/api/user/getToken', //获取token
        codeLogin: baseUrlTrue + 'api-movement/map/api/user/login', //验证码登录
        repairList: baseUrlTrue + "api-map/map/api/fitness/point/repair/list", //查询保修列表
        repairSubmit: baseUrlTrue + "api-map/map/api/fitness/point/repair/submit", //报修提交接口
        repairDetail: baseUrlTrue + "api-map/map/api/fitness/point/repair/detail", //保修详情接口
        baseFiles: baseUrlTrue + "api-file/files-anon/base", //Base64文件上传
        athleteList: baseUrlTrue + "api-movement/movement/api/teenager/selectTeenagerByCoachId", //教练查询运动员
        coachCheck: baseUrlTrue + "api-movement/movement/api/check/coachCheck", //教练审核
        selectOtherCoach: baseUrlTrue + "api-movement/movement/api/coach/selectOtherCoach", //添加副教练
        findAnnouncementByCondition: baseUrlTrue + "api-movement/movement/api/findAnnouncementByCondition", //竞赛赛事公告
        findAnnouncementById: baseUrlTrue + "api-movement/movement/api/findAnnouncementById", //竞赛赛事公告详情
        getSocialEventGroup: baseUrlTrue + "api-movement/movement/api/getSocialEventGroup", //根据赛事查询赛事下组别列表
        addSocialApplyer: baseUrlTrue + "api-movement/movement/api/addSocialApplyer", //报名提交,
        getMyApplyList: baseUrlTrue + "api-movement/movement/api/getMyApplyList", //获取我的报名列表
        getMyApplyDetail: baseUrlTrue + "api-movement/movement/api/getMyApplyDetail", //我的报名详情
        changeApplyerStatus: baseUrlTrue + "api-movement/movement/api/changeApplyerStatus", //取消报名
        delTeamById: baseUrlTrue + "api-movement/movement/api/delTeamById", //删除报名
        //杨浩
        orderList: baseUrlTrue + "api-map/map/api/orderlists/list", // 场馆订单列表
        swimBookList: baseUrlTrue + "api-gyms/gyms/cdapi/swimmingAll/", //游泳场馆列表
        refund: baseUrlTrue + "api-movement/movement/api/venue/orderform/refund/", // 取消订单
        organizationList: baseUrlTrue + "api-movement/movement/api/organizationList", // 查询社会体育组织列表
        findRegion: baseUrlTrue + "api-movement/movement/api/findRegionByZjAndParentId", // 查询省市区
        getFitguidancePage: baseUrlTrue + "api-movement/movement/api/getFitguidancePage", // 查询健身指导信息列表
        findItem: baseUrlTrue + "api-movement/movement/api/findItem", // 查询健身指导热门搜索
        selectfitguidance: baseUrlTrue + "api-movement/movement/api/selectfitguidanceById", // 查询健身指导信息列表详情
        videoFile: baseUrlTrue + "file-api/files-anon/download/play", // 视频
        findminortermsub: baseUrlTrue + "api-movement/movement/api/selectfitguidanceById", // 查询健身指导小项
        findAllItem: baseUrlTrue + "api-movement/movement/api/allItem", // 获取所有的健康指导项目(筛选)
        getEventInfoVideo: baseUrlTrue + "api-movement/movement/api/getEventInfoVideo", // 获取所有的健康指导项目(筛选)
        getDictionaryDataListForAthlete: baseUrlTrue + "api-movement/movement/api/getDictionaryDataListForAthlete", // 获取所有的健康指导项目(筛选)
        getOrderList: baseUrlTrue + "api-movement/movement/api/venue/orderform/page", // 订单列表接口
        getOrderDetail: baseUrlTrue + "api-movement/movement/api/venue/orderform/detail", // 订单详情
        //小马
        point: baseUrlTrue + "api-map/map/api/fitness/point/pageMapList", //查询信息点列表接口
        pointAll: baseUrlTrue + "api-map/map/api/fitness/point/bigDataPage", //查询海量信息点接口
        pointCont: baseUrlTrue + "api-map/map/api/fitness/point/detail/", //场馆详情    需要:{id}
        region: baseUrlTrue + "api-map/map/api/fitness/region/list", //查询省市区
        motionType: baseUrlTrue + "api-map/map/api/fitness/bigtype/page", //运动类型
        hotType: baseUrlTrue + "api-map/map/api/fitness/type/page", //运动类型
        // detail: baseUrlTrue + "api-movement/map/api/orderlists/detail",//单个场馆订单查询
        detail: "http://192.168.1.75:10084/api-movement/map/api/orderlists/detail",//单个场馆订单查询

        athleteAnnounceList: baseUrlTrue + "api-movement/movement/api/athleteAnnounceList",//单个场馆订单查询
        gymsBookList: baseUrlTrue + "api-gyms/gyms/cdapi/siteAll/", //场馆预定场次列表
        createOrderNumber: baseUrlTrue + "api-gyms/gyms/cdapi/createOrderNumber",  //生成订单号
        swimOrderNumber: baseUrlTrue + "api-gyms/gyms/cdapi/swimmingOrderNumber", //游泳生成订单号
        findBillList: baseUrlTrue + "api-gyms/gyms/cdapi/finBill", //获取会员订单列表
        getApplyWxPay: baseUrlTrue + "api-gyms/gyms/cdapi/wxPay", //获取微信支付参数
        getApplyAliPay: baseUrlTrue + "api-gyms/gyms/cdapi/alPay", //支付宝发起支付


        getEventResultFile: baseUrlTrue + "api-movement/movement/api/getEventResultFile",//成绩
        OrganizationById: baseUrlTrue + "api-movement/movement/api/OrganizationById",//社会体育组织详情
        findRegionByParentId: baseUrlTrue + "api-movement/movement/api/findRegionByParentId",//获取曲线

        /**
         * 健身圈
         */
        insertCityTreaty: baseUrlTrue + "api-movement/movement/api/fintnessCircle/insertCityTreaty",//发起同城约
        findCityTreatyList: baseUrlTrue + "api-movement/movement/api/fintnessCircle/findCityTreatyList",//获查询同城约列表
        selectCityTreatyById: baseUrlTrue + "api-movement/movement/api/fintnessCircle/selectCityTreatyById",//同城约详情
        applyCityTreaty: baseUrlTrue + "api-movement/movement/api/fintnessCircle/applyCityTreaty",//加入同城约

        // 健身群
        getFitnessGroupList: baseUrlTrue + "api-movement/movement/api/fintnessCircle/getFitnessGroupList",//获取健身群列表
        addFitnessGroup: baseUrlTrue + "api-movement/movement/api/fintnessCircle/addFitnessGroup",//添加健身群

        addFitnessGroupMember: baseUrlTrue + "api-movement/movement/api/fintnessCircle/addFitnessGroupMember",//申请加入健身群
        addOrganizationVip: baseUrlTrue + "api-movement/movement/api/fintnessCircle/addOrganizationVip",//申请加入社团


        findMyApply: baseUrlTrue + "api-movement/movement/api/fintnessCircle/findMyApply",//申请加入社团
        //全域户外
        allOutdoorApi: baseUrlTrue + "api-movement/movement/api/qyhw/info/page", //全域户外列表接口
        allOutdoorDetail: baseUrlTrue + 'api-movement/movement/api/qyhw/info/detail/', //全域户外详情
        //曹亚南
        getUserDetail: baseUrlTrue + 'api-movement/map/api/user/detail', // 获取当前用户详情
        uploadUserImg: baseUrlTrue + 'api-movement/map/api/user/updateImage', //修改用户当前头像
        psersonInfoModify: baseUrlTrue + 'api-movement/map/api/user/updateUserInfo', //修改用户个人信息
        communityInfo: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/findOrganizationVipByUserId', //查询社团信息
        sendEditPasswordCode: baseUrlTrue + 'api-movement/map/api/user/sendEditPasswordCode', //发送修改密码验证码
        editPasswordCode: baseUrlTrue + 'api-movement/map/api/user/editPasswordByCode', //通过验证码修改密码
        findUserPromoCode: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/findPromoCodeByUserId', //查询用户优惠码
        receivePromoCode: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/receivePromoCode', //领取健身优惠码
        findFitnessGroup: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/findFitnessGroupByUserId', //获取我的健身群
        findActivitylist: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/findFitnessGroupActivitylistByGroupId', //获取我的健身群
        saveFitnessGroupActivity: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/saveFitnessGroupActivity', //发布/编辑群动态
        deleteGroupActivity: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/deleteFitnessGroupActivity', //删除群动态
        saveActivityComment: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/saveFitnessGroupActivityComment', //发布动态回复
        findCommentlist: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/findFitnessGroupActivityCommentlistByActivityId', //查询群动态回复列表
        getFitnessGroupMemberList: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/getFitnessGroupMemberList', //查询健身群员列表
        deleteMoreMember: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/deleteMoreMember', //群管理-删除群成员
        saveInstructorRecord: baseUrlTrue + 'api-movement/movement/api/saveInstructorRecord', //发布/编辑指导记录
        editInstructorInfo: baseUrlTrue + 'api-movement/movement/api/editInstructorInfo', //体育指导员信息编辑
        getInstructorRecordList: baseUrlTrue + 'api-movement/movement/api/getInstructorRecordList', //查询指导员指导记录

        findGroupMemberMe: baseUrlTrue + 'api-movement/movement/api/fintnessCircle/findFitnessGroupMemberByUserId', //获取我加入的健身群
        sendLoginCode: baseUrlTrue + 'api-movement/map/api/user/sendLoginCode', //发送验证码
        pointRepairList: baseUrlTrue + 'api-movement/map/api/fitness/point/repair/list', //场地保修列表
        pointRepairDetail: baseUrlTrue + '/api-movement/map/api/fitness/point/repair/detail', //场地报修详情
        /**
         * 青少年注册
         */
        findUnifiedConfigByTitle: baseUrlTrue + "api-movement/movement/api/findUnifiedConfigByTitle",//判断注册功能是否开放
        findlogonModeById: baseUrlTrue + "api-movement/movement/api/findlogonModeById",//判断来源
        findRegionArea: baseUrlTrue + "api-movement/movement/api/findRegionByZjAndParentId",   //省市
        findRegionList: baseUrlTrue + "api-movement/movement/api/findRegionByZj", // 查询浙江省所有的市
        trainingUnit: baseUrlTrue + "api-movement/movement/api/findApiUnit", // 查询训练单位
        findSportItem: baseUrlTrue + "api-movement/movement/api/item/selectItem", // 查询注册项目
        getVcode: baseUrlTrue + "api-movement/movement/api/vcode", // 验证码
        dxCoach: baseUrlTrue + "api-movement/movement/api/coach/selectCoach", // 带训教练
        findNational: baseUrlTrue + "api-movement/movement/api/coach/findnation", // 查询民族
        teenRegister: baseUrlTrue + "api-movement/movement/api/athlete/athleteInsert", // 青少年注册
        filesAnon: baseUrlTrue + "api-file/foreign/files-anon",//头像上传
        selectStatus: baseUrlTrue + "api-movement/movement/api/teenager/selectStatus",//状态查询(h5)
        findApiUnit: baseUrlTrue + "api-movement/movement/api/findApiUnit",//根据区县选择单位(h5)
        teenagerInsert: baseUrlTrue + "api-movement/movement/api/teenager/teenagerInsert",//青少年注册(h5)
        coachInsert: baseUrlTrue + "api-movement/movement/api/coach/coachInsert",//注册教练信息(h5)
        guarderInsert: baseUrlTrue + "api-movement/movement/api/guarder/guarderInsert",//注册监护人信息(h5)
        commitAll: baseUrlTrue + "api-movement/movement/api/teenager/commitAll",//提交(h5)
        selectItem: baseUrlTrue + "api-movement/movement/api/getDictionaryDataListForAthlete",//查询所有运动类型(h5)
        selectTeenager: baseUrlTrue + 'api-movement/movement/api/teenager/selectTeenager',//信息回填
        teenagerCheck: baseUrlTrue + "api-movement/movement/api/check/teenagerCheck", // 查看审核状态
        uploadImages: baseUrlTrue + "api-movement/movement/api/athlete/athleteImg",//头像上传

        registerAgreement: baseUrlTrue + "api-movement/movement/api/agreement/registerAgreement",//(废弃)协议
        AgreementDeatil: baseUrlTrue + "api-movement/movement/api/teenager/AgreementDeatil",//(新)协议

        athleteFindregion: baseUrlTrue + 'api-movement/movement/api/findAllRegion',//省查询

        //彭强
        insertTeamApplyer: baseUrlTrue + 'api-movement/movement/api/insertTeamApplyer',//团队报名提交

        activities: baseUrlTrue + 'api-movement/movement/api/getCompetitionAndMovementAnouncement',//赛事活动接口
        actdetails: baseUrlTrue + 'api-movement/movement/api/findMovementActivityAnnouncementById',//赛事公告详情
        eventlistbanner: baseUrlTrue + 'api-movement/movement/api/findMovementActivity',//赛事活动目录
        eventlist: baseUrlTrue + 'api-movement/movement/api/findMovementActivity',//赛事活动目录
        competitionList: baseUrlTrue + 'api-movement/movement/api/getEventAndActivityList',
        getEventInfobyId: baseUrlTrue + 'api-movement/movement/api/getEventInfobyId',
        details: baseUrlTrue + 'api-movement/movement/api/selectMovementByKey', //报名详情页
        group: baseUrlTrue + 'api-movement/movement/api/findGroupByActId',//根据赛事id查询组别信息
        teamevent: baseUrlTrue + 'api-movement/movement/api/selectMovementTeamByKey',//根据teamid查询赛事
        project: baseUrlTrue + 'api-movement/movement/api/findMovementItemByActId', //根据赛事id和组别id查询项目信息
        submitform: baseUrlTrue + 'api-movement/movement/api/insertApplyer',//赛事报名
        insertTeam: baseUrlTrue + 'api-movement/movement/api/insertTeam',//团体报名
        base: baseUrlTrue + "api-file/foreign/files-anon/base",//base64
        uploadImage: baseUrlTrue + "api-map/map/api/user/uploadImage",//头像上传
        download: baseUrlTrue + 'api-file/files-anon/download',//下载文档
        findapply: baseUrlTrue + 'api-movement/movement/api/findApplyerByAppId',//根据用户id查询报名信息
        reqcancelled: baseUrlTrue + 'api-movement/movement/api/cancelApplyer',//取消报名
        findteam: baseUrlTrue + 'api-movement/movement/api/findInTeam',//根据用户id查询团队及队员信息
        delpeople: baseUrlTrue + 'api-movement/movement/api/deleteApplyerByTeamId',//根据用户id删除队内成员
        train: baseUrlTrue + 'api-movement/movement/api/trainApplyList', //培训报名
        canceltrain: baseUrlTrue + 'api-movement/movement/api/cancelTrainApply', //取消培训报名
        area: baseUrlTrue + 'api-movement/movement/api/findRegionByZjAndParentId', //地区筛选
        subtrain: baseUrlTrue + 'api-movement/movement/api/saveTrainApply',//我的培训 填写资料报名
        trainlist: baseUrlTrue + 'api-movement/movement/api/instructorTrainList',//培训目录
        traindetail: baseUrlTrue + 'api-movement/movement/api/instructorTrainById',//培训详情
        //剑雨
        Area: baseUrlTrue + "api-movement/movement/api/findRegionByZjAndParentId", //体育指导员地区筛选
        InstructorDetails: baseUrlTrue + "api-movement/movement/api/instructorList", //指导员列表
        InstructorProject: baseUrlTrue + 'api-movement/movement/api/itemTypeList', //指导员项目筛选
        InstructorParticulars: baseUrlTrue + 'api-movement/movement/api/instructorDetail', //指导员详情
        measurementFitnessapi: baseUrlTrue + 'api-map/map/api/monitor/site/page', //体质测量列表
        measurementntparticulars: baseUrlTrue + 'api-map/map/api/monitor/site/detail', //体质测量详情
        examinationItem: baseUrlTrue + 'api-map/map/api/monitor/site/project/list', //体质项目详情
        Regionality: baseUrlTrue + 'api-movement/movement/api/findfitguidance', //指导员详情底部推荐
        Regionalitying: baseUrlTrue + 'api-movement/movement/api/selectfitguidanceById', //指导员详情底部推荐详情
        Submit: baseUrlTrue + 'api-map/map/api/monitor/site/submit', //指导员预定提交
        MyDetection: baseUrlTrue + 'api-map/map/api/monitor/site/user/testResultList', //我的检测报告列表
        MyDetectionsing: baseUrlTrue + 'api-map/map/api/monitor/site/user/testResultDetail', //我的检测报告-查看详情
        MyMeasure: baseUrlTrue + 'api-map/map/api/monitor/site/user/bookList', //我的测定预定
        CallOff: baseUrlTrue + 'api-map/map/api/monitor/site/user/cancelBook', //测定预约取消
        instructorGroup: baseUrlTrue + 'api-movement/movement/api/aes/encode',//体育指导员团课加密
        lotteryStart: baseUrlTrue + 'api-movement/movement/api/lotteryStart',//抽奖
        isLottery: baseUrlTrue + 'api-movement/movement/api/isLottery',// 是否有抽奖资格
        findLotteryRecord: baseUrlTrue + 'api-movement/movement/api/findLotteryRecordByUserId',//查询抽奖记录
        mobileUserInfoNew: baseUrlTrue + 'map/api/user/mobileUserInfo',//用户详细信息 备注备注备注备注
    
        //校园健身  
        PersonnelInformation: baseUrlTrue + 'movement/api/school/card/page',//人员信息列表  备注备注备注备注
        PersonareaAction: baseUrlTrue + 'api-movement/movement/api/school/card/area',//区域街道选择
        Persondetail: baseUrlTrue + 'api-movement/movement/api/school/card/detail',//获取用户详情信息
        detailUpdate: baseUrlTrue + 'api-movement/movement/api/school/card/update',//用户信息编辑提交
        wxPersonRe: baseUrlTrue + 'api-movement/movement/api/school/wxPersonRe',//健身情况+场地热度  备注备注备注
        frequency: baseUrlTrue + 'api-movement/movement/api/school/frequency', //健身次数 备注备注备注
        fitnessSiteInfo:baseUrlTrue + 'api-movement/movement/api/siteDetails/fitnessSiteInfo',//街道列表 备注备注
        fitnessMap:baseUrlTrue + 'api-movement/movement/api/siteDetails/fitnessMap',//场地地图信息(信息点)  备注备注
        fitnessDetails:baseUrlTrue + 'api-movement/movement/api/siteDetails/fitnessDetails',//场地详情信息 备注备注
        addcardsave: baseUrlTrue + 'api-movement/movement/api/school/card/save',//新增用户信息
        csdnLoginAction: baseUrlTrue + 'api-movement/map/api/user/csdnLogin',//获取城市大脑用户信息

    };

export {
    userId
} //用户id
export {
    userImg,
    ImageUrl
} //图片地址
export {
    returnUrl
}
// 访问的url
export {
    modifyUserImg
}
//查询报修列表
export function repairList(data) {
    return request('post', url.repairList, data);
}
//保修提交接口
export function repairSubmit(data) {
    return request('post', url.repairSubmit, data);
}
//保修详情接口
export function repairDetail(data) {
    return request('post', url.repairDetail, data);
}
//Base64文件上传
export function baseFiles(data) {
    return request('post', url.baseFiles, data);
}
// ===================================
// 健身圈
// ===================================
export function insertCityTreaty(data) {
    return request('get', url.insertCityTreaty, data)
}
export function findCityTreatyList(data) {
    return request('get', url.findCityTreatyList, data)
}
export function getFitnessGroupList(data) {
    return request('get', url.getFitnessGroupList, data)
}
export function addFitnessGroup(data) {
    return request('post', url.addFitnessGroup, data)
}
export function selectCityTreatyById(data) {
    return request('get', url.selectCityTreatyById, data)
}
export function addFitnessGroupMember(data) {
    return request('get', url.addFitnessGroupMember, data)
}
export function addOrganizationVip(data) {
    return request('post', url.addOrganizationVip, data)
}
export function applyCityTreaty(data) {
    return request('get', url.applyCityTreaty, data)
}
export function findMyApply(data) {
    return request('get', url.findMyApply, data)
}
export function allOutdoorList(data) {
    return request('get', url.allOutdoorApi, data)
}
export function uploadUserImg(data) {
    return request('get', url.uploadUserImg, data)
}
export function psersonInfoModify(data) {
    return request('get', url.psersonInfoModify, data)
}
export function allOutdoorDetail(data) {
    return request('get', url.allOutdoorDetail + data)
}
export function sendEditPasswordCode(data) {
    return request('get', url.sendEditPasswordCode, data)
}
export function editPasswordCode(data) {
    return request('get', url.editPasswordCode, data)
}
export function findUserPromoCode(data) {
    return request('get', url.findUserPromoCode, data)
}
export function receivePromoCode(data) {
    return request('get', url.receivePromoCode, data)
}
export function findFitnessGroup(data) {
    return request('get', url.findFitnessGroup, data)
}
export function findActivitylist(data) {
    return request('get', url.findActivitylist, data)
}
export function saveFitnessGroupActivity(data) {
    return request('get', url.saveFitnessGroupActivity, data)
}
export function deleteGroupActivity(data) {
    return request('get', url.deleteGroupActivity, data)
}
export function saveActivityComment(data) {
    return request('get', url.saveActivityComment, data)
}
export function findCommentlist(data) {
    return request('get', url.findCommentlist, data)
}
export function getFitnessGroupMemberList(data) {
    return request('get', url.getFitnessGroupMemberList, data)
}
export function deleteMoreMember(data) {
    return request('get', url.deleteMoreMember, data)
}
export function saveInstructorRecord(data, headers) {
    return request('post', url.saveInstructorRecord, data, headers)
}
export function editInstructorInfo(data, headers) {
    return request('post', url.editInstructorInfo, data, headers)
}
export function getInstructorRecordList(data) {
    return request('get', url.getInstructorRecordList, data)
}
export function pointRepairList(data) {
    return request('get', url.pointRepairList, data)
}
export function createOrderNumber(data) {
    return request('get', url.createOrderNumber, data)
}
export function swimOrderNumber(data) {
    return request('get', url.swimOrderNumber, data)
}
export function getApplyWxPay(data) {
    return request('get', url.getApplyWxPay, data)
}
export function getApplyAliPay(data) {
    return request('get', url.getApplyAliPay, data)
}
export function findBillList(data) {
    return request('get', url.findBillList, data)
}
export function findGroupMemberMe(data) {
    return request('get', url.findGroupMemberMe, data)
}
export function swimBookList(data) {
    return request('get', url.swimBookList + data)
}






// ===================================
// 群体 - 场地保修模块
// ===================================
//查询报修列表
// export function repairList(data) {
//     return request('post', url.repairList, data);
// }
// //保修提交接口
// export function repairSubmit(data) {
//     return request('post', url.repairSubmit, data);
// }
//获取市区县
export function findRegion(data) {
    return request('get', url.findRegion, data);
}
//获取区县
export function findRegionByParentId(data) {
    return request('get', url.findRegionByParentId, data);
}
//教练查询运动员
export function athleteList(data) {
    return request('get', url.athleteList, data);
}
//教练员审核
export function coachCheck(data) {
    return request('post', url.coachCheck, data);
}
//教练员审核
export function selectOtherCoach(data) {
    return request('post', url.selectOtherCoach, data);
}

//竞赛赛事公告
export function findAnnouncementByCondition(data) {
    return request('get', url.findAnnouncementByCondition, data);
}
//竞赛赛事公告详情
export function findAnnouncementById(data) {
    return request('get', url.findAnnouncementById, data);
}
//根据赛事查询赛事下组别列表
export function getSocialEventGroup(data) {
    return request('get', url.getSocialEventGroup, data);
}
//报名提交
export function addSocialApplyer(data) {
    return request('post', url.addSocialApplyer, data);
}
//获取我的报名列表
export function getMyApplyList(data) {
    return request('get', url.getMyApplyList, data);
}
//获取我的报名详情
export function getMyApplyDetail(data) {
    return request('get', url.getMyApplyDetail, data);
}
//cancelApplyer
export function changeApplyerStatus(data) {
    return request('post', url.changeApplyerStatus, data);
}
//删除报名订单
export function delTeamById(data) {
    return request('post', url.delTeamById, data);
}
//杨浩
// 社会体育组织列表
export function findOrganizationList(data) {
    return request('get', url.organizationList, data);
}
export function OrganizationById(data) {
    return request('get', url.OrganizationById, data);
}

//查询省市区
export function findfitGuidance(data) {
    return request('get', url.findfitguidance, data);
}

// 科学健身列表页
export function getFitguidancePage(data) {
    return request('get', url.getFitguidancePage, data);
}

// 热门搜索
export function findItem(data) {
    return request('get', url.findItem, data);
}
// 查询健身指导信息列表详情
export function selectfitguidance(data) {
    return request('get', url.selectfitguidance, data);
}

// 视频播放
export function videoFile(data) {
    return request('get', url.videoFile, data);
}

// 查询健身指导小项
export function findminortermsub(data) {
    return request('get', url.findminortermsub, data);
}

// 获取所有的健康指导项目
export function findAllItem(data) {
    return request('get', url.findAllItem, data);
}

// 获取所有的健康指导项目
export function getEventResultFile(data) {
    return request('get', url.getEventResultFile, data);
}

// 赛事活动视频
export function getEventInfoVideo(data) {
    return request('get', url.getEventInfoVideo, data);
}

// 赛事活动视频 获取赛事项目
export function getMatchItem(data) {
    return request('get', url.getDictionaryDataListForAthlete, data);
}

// 订单列表
export function getMyOrderList(data) {
    return request('get', url.getOrderList, data);
}

// 订单列表
export function getOrderDetail(data) {
    return request('get', url.getOrderDetail, data);
}



// ===================================
// 赛事 - 运动员注册模块
// ===================================
export function athleteAnnounceList(data) {
    return request('get', url.athleteAnnounceList, data);
}
// ===================================
// 群体 - 地图模块
// ===================================
export function hotType(data) {
    return request('get', url.hotType, data);
}
export function point(data) {
    return request('get', url.point, data);
}
export function pointAll(data) {
    return request('get', url.pointAll, data);
}
export function pointCont(id, data) {
    return request('get', url.pointCont + id, data);
}
export function region(data) {
    return request('get', url.region, data);
}
export function motionType(data) {
    return request('get', url.motionType, data);
}

//赛事活动接口
export function insertTeamApplyer(data) {
    return request2('post', url.insertTeamApplyer, data, false);
}
export function activities(data) {
    return request('get', url.activities, data);
}
//赛事公告详情
export function actdetails(data) {
    return request('get', url.actdetails, data);
}
//赛事活动目录
export function eventlist(data) {
    return request('get', url.eventlist, data);
}
export function eventlistbanner(data) {
    return request('get', url.eventlistbanner, data);
}
export function teamevent(data) {
    return request('get', url.teamevent, data);
}
// 报名详情页
export function details(data) {
    return request('get', url.details, data);
}
export function group(data) {
    return request('get', url.group, data);
}
export function project(data) {
    return request('get', url.project, data);
}
export function submitform(data) {
    return request('post', url.submitform, data);
}
export function insertTeam(data) {
    return request('post', url.insertTeam, data);
}
export function base(data) {
    return request('post', url.base, data);
}
export function download(data) {
    return request('get', url.download, data);
}
export function findapply(data) {
    return request('get', url.findapply, data);
}
export function reqcancelled(data) {
    return request('post', url.reqcancelled, data);
}
export function uploadImage(data) {
    return request('post', url.uploadImage, data);
}
export function findteam(data) {
    return request('get', url.findteam, data);
}
export function delpeople(data) {
    return request('post', url.delpeople, data);
}
export function train(data) {
    return request('get', url.train, data);
}
export function canceltrain(data) {
    return request('post', url.canceltrain, data);
}
export function area(data) {
    return request('get', url.area, data);
}
export function subtrain(data) {
    return request('post', url.subtrain, data);
}
export function trainlist(data) {
    return request('get', url.trainlist, data);
}
export function traindetail(data) {
    return request('get', url.traindetail, data);
}
export function codeLogin(data) {
    return request('get', url.codeLogin, data);
}
export function sendLoginCode(data) {
    return request('get', url.sendLoginCode, data);
}
export function gymsBookList(id, data) {
    return request('get', url.gymsBookList + id, data);
}
//体育指导员地区筛选
export function Area(data) {
    return request('get', url.Area, data);
}
//指导员列表
export function InstructorDetails(data) {
    return request('get', url.InstructorDetails, data);
}
// 指导员项目筛选

export function InstructorProject(data) {
    return request('get', url.InstructorProject, data);
}
// 指导员详情
export function InstructorParticulars(data) {
    return request('get', url.InstructorParticulars, data);
}
// 指导员详情底部推荐
export function Regionality(data) {
    return request('get', url.Regionality, data);
}
// 指导员详情底部推荐详情
export function Regionalitying(data) {
    return request('get', url.Regionalitying, data);
}
// 指导员预约提交
export function Submit(data) {
    return request('get', url.Submit, data);
}
// 体质测量列表
export function measurementFitnessapi(data) {
    return request('post', url.measurementFitnessapi, data);
}
//体质测量详情
export function measurementntparticulars(data) {
    return request('post', url.measurementntparticulars, data);
}
//体检项目
export function examinationItem(data) {
    return request('post', url.examinationItem, data);
}
// 我的测定预约
export function MyMeasure(data) {
    return request('post', url.MyMeasure, data);
}
//我的检测报告
export function MyDetection(data) {
    return request('post', url.MyDetection, data);
}

//我的检测报告查看详情
export function MyDetectionsing(data) {
    return request('post', url.MyDetectionsing, data);
}
//我的检测预约取消
export function CallOff(data) {
    return request('post', url.CallOff, data);
}
//指导员团体报名加密
export function instructorGroup(data) {
    return request('get', url.instructorGroup, data);
}

// ===================================
// 赛事 - 运动员注册模块
// ===================================

//协议
export function findUnifiedConfigByTitle(data) {
    return request('get', url.findUnifiedConfigByTitle, data);
}

//协议
export function registerAgreement(data) {
    return request('post', url.registerAgreement, data);
}
//协议（新版）
export function AgreementDeatil(data) {
    return request('post', url.AgreementDeatil, data);
}

//省级查询
export function athleteFindregion(data) {
    return request('get', url.athleteFindregion, data);
}

//身份校验
export function findlogonModeById(id) {
    return request('get', url.findlogonModeById, id);
}

//地区查询
export function findRegionArea() {
    return request('get', url.findRegionArea);
}
//项目查询
export function selectItem() {
    return request('get', url.selectItem);
}
//根据地区查询单位
export function findApiUnit(data) {
    return request('get', url.findApiUnit, data);
}
//根据单位查询带训教练
export function dxCoach(data) {
    return request('get', url.dxCoach, data);
}
//运动员注册
export function teenagerInsert(data) {
    return request('post', url.teenagerInsert, data);
}
//监护人信息
export function guarderInsert(data) {
    return request('post', url.guarderInsert, data);
}
//教练信息注册
export function coachInsert(data) {
    return request('post', url.coachInsert, data);
}
//状态查询(h5)
export function selectStatus(data) {
    return request('post', url.selectStatus, data);
}
//查询进度(h5)
export function teenagerCheck(data) {
    return request('post', url.teenagerCheck, data);
}
//短信验证
export function getVcode(data) {
    return request('post', url.getVcode, data);
}
//头像上传
export function uploadImages(data) {
    return request('post', url.uploadImages, data);
}
//提交总汇
export function commitAll(data) {
    return request('post', url.commitAll, data);
}
//信息回填
export function selectTeenager(data) {
    return request('post', url.selectTeenager, data);
}
//查询所有的运动员列表
export function selectTeenagerByCoachId(data) {
    return request('get', url.selectTeenagerByCoachId, data);
}

// 退订
export function refund(id, data) {
    return request('get', url.refund + id, data);
}
//订单单挑查询
export function detail(data) {
    return request('get', url.detail, data);
}
// 订单列表
export function orderList(data) {
    return request('get', url.orderList, data);
}
export function competitionList(data) {
    return request('get', url.competitionList, data);
}
export function getEventInfobyId(data) {
    return request('get', url.getEventInfobyId, data);
}
export function loginByUsername(data) {
    return request('post', url.loginByUsername, data);
}
export function getUserDetail(data) {
    return request('get', url.getUserDetail, data);
}
export function mobileUserInfo(data) {
    return request('get', url.mobileUserInfo, data);
}
export function sure(data) {
    return request('get', url.sure, data);
}
export function findNational(data) {
    return request('get', url.findNational, data);
}
//头像上传
export function filesAnon(data) {
    return request('post', url.filesAnon, data);
}
export function selectByIDCardAndName(data) {
    return request('get', url.selectByIDCardAndName, data);
}
//社团信息
export function communityInfo(data) {
    return request('get', url.communityInfo, data);
}
//抽奖
export function lotteryStart(data) {
    return request('post', url.lotteryStart, data);
}
//抽奖资格
export function isLottery(data) {
    return request('get', url.isLottery, data);
}
//查询抽奖
export function findLotteryRecord(data) {
    return request('post', url.findLotteryRecord, data);
}
export function codegetToken(data) {
    return request('get', url.codegetToken, data);
}
//校园健身 
export function PersonnelInformation(data) {
    return request('get', url.PersonnelInformation, data);
}
export function PersonareaAction(data) {
    return request('get', url.PersonareaAction, data);
} 
export function Persondetail(data) {
    return request('get', url.Persondetail, data);
}
export function detailUpdate(data) {
    return request('post', url.detailUpdate, data);
}
export function wxPersonRe(data) {
    return request('get', url.wxPersonRe, data);
}
export function frequency(data) {
    return request('get', url.frequency, data);
}
export function fitnessSiteInfo(data) {
    return request('get', url.fitnessSiteInfo, data);
}
export function fitnessMap(data) {
    return request('get', url.fitnessMap, data);
}
export function fitnessDetails(data) {
    return request('get', url.fitnessDetails, data);
}
export function addcardsave(data) {
    return request('post', url.addcardsave, data);
}
export function mobileUserInfoNew(data) {
    return request('get', url.mobileUserInfoNew, data);
}
export function csdnLoginAction(data) {
    return request('get', url.csdnLoginAction, data);
}

