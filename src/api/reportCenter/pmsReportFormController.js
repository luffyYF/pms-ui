import request from '@/utils/requestJson';
/**
 * 所有报表
 */
export const roomStatus = {
    "OCCUPY":"占用房",
    "DIRTY":"脏房",
    "CLEAN_NOCHECK":"清洁未检查",
    "CLEAN_CHECKED":"清洁已检查",
    "SELF_USE":"自用房",
    "FREE_ROOM":"免费房",
    "DISABLE_ROOM":"维修房",
    "REPAIR_ROOM":"免费房",
}

/**
 * 查看每天的订房报表情况
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportDailyRoom = params => {
    return request.get('/pms/report/daily/room',{params:params})
}

/**
 * 历史换房报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportHistoryRoomExchange = params => {
    return request.get('/pms/report/historyRoomExchange',{params:params})
}

/**
 * 历史离店报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportHistoryStore = params => {
    return request.get('/pms/report/historyStore',{params:params})
}

/**
 * 日租钟点取消报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportHourRoomCancel = params => {
    return request.get('/pms/report/hourRoomCancel',{params:params})
}

/**
 * 今日预抵已排房预订报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportJinRiYuDiYiPaiFangYuDing = params => {
    return request.get('/pms/report/jinRiYuDiYiPaiFangYuDing',{params:params})
}

/**
 * 管理层日报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportMgDaily = params => {
    return request.get('/pms/report/mg/daily',{params:params})
}

/**
 * 冲减明细报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportOffsetDetail = params => {
    return request.get('/pms/report/offsetDetail',{params:params})
}

/**
 * 房租合约报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportRentContract = params => {
    return request.get('/pms/report/rentContract',{params:params})
}



/**
 * 房态报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportRoomStatus = params => {
    return request.get('/pms/report/roomStatus',{params:params})
}

/**
 * 实时房态报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportShiShiFangTai = params => {
    return request.get('/pms/report/shiShiFangTai',{params:params})
}

/**
 * 收银员收款报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportShouYinYuanShouKuan = params => {
    return request.get('/pms/report/shouYinYuanShouKuan',{params:params})
}
export const uploadShouYinYuanShouKuanExcel = params => {
    return request.get('/pms/report/uploadShouYinYuanShouKuanExcel',{params:params})
}
//在住客人财务详细 excel
export const zaiZhuKeRenCaiWuMingXiExcel = params => {
    return request.get('/pms/report/zaiZhuKeRenCaiWuMingXiExcel',{params:params})
}
/**
 * 收银入账明细报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportShouYinYuanRuZhangMingXi = params => {
    return request.get('/pms/report/shouYinYuanRuZhangMingXi',{params:params})
}

/**
 * 收银入账汇总报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportShouYinYuanHuiZong = params => {
    return request.get('/pms/report/shouYinYuanHuiZong',{params:params})
}

/**
 * 营业收入上缴
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportTurnoverOfBusinessIncome = params => {
    return request.get('/pms/report/turnoverOfBusinessIncome',{params:params})
}

/**
 * 营业收入报表
 * businessDate 日期
 */
export const reportBusinessIncome = params => {
    return request.get('/pms/report/businessIncome',{params:params})
}

/**
 * 在店宾客余额及押金报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportZaiDianBinKeYueJiYaJin = params => {
    return request.get('/pms/report/zaiDianBinKeYueJiYaJin',{params:params})
}

/**
 * 在住客人账务明细报表
 * begin 开始时间
 * end 结束时间
 * roomPk 房间主键
 * roomTypePk 房间类型主键
 */
export const reportZaiiZhuKeRenCaiWuMingXi = params => {
    return request.get('/pms/report/zaiZhuKeRenCaiWuMingXi',{params:params})
}

/**
 * 催账报表
 */
export const reportCuiZhangBaoBiao = params => {
    return request.get('/pms/report/cuiZhangBaoBiao',{params:params})
}

/**
 * 经理日报表
 * begin 开始时间
 */
export const reportJingLiRiBao = params => {
    return request.get('/pms/report/jingLiRiBao',{params:params})
}

/**
 * 营业日报
 */
export const turnoverDaily = params =>{
    return request.get('/dailyReport/turnover/daily',{params:params})
}
/**
 * 营业月报
 */
export const turnoverMoth = params =>{
    return request.get('/dailyReport/turnover/month',{params:params})
}
/**
 * 入住率日报
 */
export const leaseRateDaily = params =>{
    return request.get('/dailyReport/leaseRate/daily',{params:params})
}
/**
 * 入住率月报
 */
export const leaseRateMonth = params =>{
    return request.get('/dailyReport/leaseRate/month',{params:params})
}
/**
 * 营业日报详细
 */
export const turnoverDailyDetail = params =>{
    return request.get('/dailyReport/turnover/dailyChannelDetail',{params:params})
}
/**
 * 营业月报详细
 */
export const turnoverMonthDetail = params =>{
    return request.get('/dailyReport/turnover/monthChannelDetail',{params:params})
}
/**
 * 营业数据详细
 */
export const businessDeatil = params =>{
    return request.get('/pms/report/businessDeatil',{params:params})
}


