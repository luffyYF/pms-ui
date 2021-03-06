import moment from 'moment'

 //夜审时间 单位：小时
export const nightTrialTime=6;

export const getNightDateTime = () =>{
  if(moment().hour()<nightTrialTime) {
    return moment().subtract(1, 'days').hours(23).minutes(59).seconds(59).format("YYYY-MM-DD HH:mm:ss");
  }else{
    return moment().format("YYYY-MM-DD HH:mm:ss");
  }
}

export const getNightDate = () =>{
  if(moment().hour()<nightTrialTime){
    return moment().subtract(1, 'days').format("YYYY-MM-DD");
  }else{
    return moment().format("YYYY-MM-DD");
  }
}

/**
 * 枚举映射
 */
export const genderMap = {
  'M':'男',
  'W': '女'
}
export const certTypeMap = {
  'DL':'大陆',
  'GAT':'港澳台',
  'GW':'国外'
}
//订单状态
export const orderStatusMap = {
  RESERVE: "预定",
  OBLIGATION:'待付款',
  CHECKIN: "在住",
  LEAVE: "结账离店",
  LEAVENOPAY: "不结账退房",
  CANCEL:"订单取消",
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
  //账单分类
  NORMAL: '普通',
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
//房态状态
export const roomStatusMap = {
  1: "空净",
  2: "空脏",
  3: "住净",
  4: "住脏",
  5: "维修",
}
//实时房态
export const realTimeRoomStatusMap = {
  'KJ': {
    icon: false,
    name: "空净"
  },
  'KZ': {
    icon: false,
    name: "空脏"
  },
  'ZJ': {
    icon: false,
    name: "住净"
  },
  'ZZ': {
    icon: false,
    name: "住脏"
  },
  'WX': {
    icon: false,
    name: "维修"
  },
  'YD': {
    icon: true,
    name: "预抵"
  },
  'YL': {
    icon: true,
    name: "预离"
  },
  'QF': {
    icon: true,
    name: "欠费"
  },
  'SR': {
    icon: true,
    name: "生日"
  },
  'TD': {
    icon: true,
    name: "团队"
  },
  'ZDF': {
    icon: true,
    name: "钟点房"
  },
  'TSF': {
    icon: true,
    name: "特殊房"
  },
  'MFF': {
    icon: true,
    name: "免费房"
  }
}

// 停用：#f75e5e  #dd4b4b；
export const realTimeRoomStatusColor = {
  'KJ': {
    color1: "#669bff",
    color2: "#587fff"
  },
  'KZ': {
    color1: "#677399",
    color2: "#8291c1"
  },
  'ZJ': {
    color1: "#ffc24b",
    color2: "#fc953a"
  },
  'ZZ': {
    color1: "#ff9b5f",
    color2: "#fc773d"
  },
  'WX': {
    color1: "#5ed07b",
    color2: "#38a855"
  },
  'YD': "预抵",
  'YL': "预离",
  'QF': "生日",
  'SR': "生日",
  'TD': "团队",
  'ZDF': "钟点房",
  'TSF': "特殊房",
  'MFF': "免费房"
}

//预订单状态
export const reserveOrderStatusMap = {
  '0': "待付款",
  '1': "待接单",
  '2': "已接单",
  '3': "已入住",
  '4': "取消申请",
  '5': "已取消",
  '6': "已完成"
}

export const hotelHardware = {
  "AMX":"艾美信",
  "HAXEM-4305":"宏安兴EM-4305",

  "MHURD-R310":"明华KRF-310",
  "MHURD-R330":"明华KRF-330",
  "MHKRF-35":"明华KRF-35",
  "MHSRD-U010":"明华SRD-U010",
  "MHSRD-U100":"明华SRD-U100",
  "YTT":"英泰通",

  "HSCVR-110UA":"华视阅读器CVR-110UA",
}
