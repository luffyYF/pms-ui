import request from '@/utils/requestJson'

/**
 * 报表中心
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 管理层日报表
export const dailyMgReport = params => {   
    return request.get('/pms/report/mg/daily', {params:params})
}
// 查看每天的订房报表情况
export const roomDailyReport = params => {   
    return request.get('/pms/report/daily/room', {params:params})
}
// 历史换房报表
export const historyRoomExchange = params => {   
    return request.get('/pms/report/historyRoomExchange', {params:params})
}
// 历史离店报表
export const historyStore = params => {   
    return request.get('/pms/report/historyStore', {params:params})
}
// 日租钟点取消报表
export const hourRoomCancel = params => {   
    return request.get('/pms/report/hourRoomCancel', {params:params})
}
// 冲减明细报表
export const offsetDetail = params => {   
    return request.get('/pms/report/offsetDetail', {params:params})
}
// 房租合约报表
export const rentContract = params => {   
    return request.get('/pms/report/rentContract', {params:params})
}
// 营业收入上缴
export const turnoverOfBusinessIncome = params => {   
    return request.get('/pms/report/turnoverOfBusinessIncome', {params:params})
}
// 接待房报表
export const receptionRoom = params => {   
    return request.get('/pms/report/receptionRoom', {params:params})
}

