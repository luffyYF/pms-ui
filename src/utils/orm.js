/**
 * 枚举映射
 */

//订单状态
export const orderStatusMap = {
  RESERVE: "预定",
  OBLIGATION:'待付款',
  CHECKIN: "在住",
  LEAVE: "结账离店",
  LEAVENOPAY: "不结账退房",
  NOSHOW: "NoShow"
}
//外借状态
export const letoutMap = {
  NORETURN: "未归还",
  RETURN: "归还",
  PAYFOR: "赔偿"
}
//寄存状态
export const depositMap = {
  UNCLAIM: "未领取",
  CLAIM: "已领取"
}
//留言状态
export const noteMap = {
  NOREAD: "未读取",
  READ: "已读取"
}
export const msgTypeMap = {
  DGDH: "打过电话",
  HDH: "回电话",
  LKN: "来看你",
  JZLD: "将再来电",
  ORDER: "其他"
}
export const resultMap = {
  SUCCESS: "成功",
  FAILED: "失败",
}
//合约状态
export const contractMap = {
  RESERVE: "预定",
  VALID: "有效",
  INVALID: "取消",
}
//支付方式
export const paymentMap = {
  '-1': '无',
  0: '现金',
  1: '微信',
  2: '支付宝',
  3: '银行卡',
  4: '预授权',
  5: 'AR帐',
  6: '支票',
  7: '汇款',
  8: 'POS机'
}
//账单状态
export const billStatusMap = {
  UN_SET: '未结账',
  FINISH: '已结算',
  OFFSET: '冲减',
  FORWARD: '转账'
}
//问题房态类型
export const problemStatusMap = {
  0: '当前维修和停用房',
  1: '当前维修房间',
  2: '当前停用房间',
  3: '历史维修房间',
  4: '历史停用房间',
}
//证件类型
export const credentialsMap = {
  TWO_IDENTITY : "二代身份证",
  ONE_IDENTITY : "一代身份证",
  OTHER : "其他",
  DRIVER : "驾驶证",
  PASSPORT : "护照",
  OFFICERS : "军官证",
  SOLDIER : "士兵证",
  HK_MACAO_PASS : "港澳通行证",
  RETURN_HOME : "回乡证",
  TEMP_IDENTITY : "临时身份证",
  BOOKLET : "户口簿",
  POLICE_OFFICER : "警官证"
}
//入住类型
export const checkInTypeMap = {
  0:  "普通",
  1:  "钟点房",
  // 2:  "特殊房",
  // 3:  "自用房",
  4:  "接待房",
  // 5:  "公寓房"
}

// 申领单审批状态
export const approvalStatusMap = {
  0: '审批中',
  1: '审批通过',
  2: '审批拒绝',
  3: '取消申请'
}

// 申领单出库状态
export const outStatusMap = {
  0: '未出库',
  1: '部分出库',
  2: '全部出库',
}

// 入库状态
export const inStatusMap = {
  0: '未入库',
  1: '部分入库',
  2: '已入库',
}

//盘库状态
export const takeStockStatusMap = {
  '-1': '已取消',
  '0': '已创建',
  '1': '已预审',
  '2': '已入库',
}

//考勤类型
export const attendanceTypeMap = {
  'NONE': '无班次',
  'FIXED': '固定排班',
  'TURN': '轮班排班',
}