// 常用报表----------------------------------
export const commonReport = [{
  label: '管理层',
  pointer: 'pms:reportCenter:managerFloor',
  hidden: true,
  children: [{
      label: '每日日报',
      path: '/reportCenter/dailyReport',
      pointer: 'pms:reportCenter:dailyReptor'
    },
    {
      label: '经理日报',
      path: '/reportCenter/roomDailyReport',
      pointer: 'pms:reportCenter:dailyManage'
    }
  ]
}, {
  label: '前台交接班和查账',
  pointer: 'pms:reportCenter:foreground',
  children: [{
      label: '收银员收款报表',
      path: '/reportCenter/receiptsReport',
      pointer: 'pms:reportCenter:receiptReport'
    },{
      label: '收银入账明细报表',
      path: '/reportCenter/admissionAccount',
      pointer: 'pms:reportCenter:detailReport'
    },{
      label: '收银入账汇总报表',
      path: '/reportCenter/accountSummaryReport',
      pointer: 'pms:reportCenter:gatherReport'
    },{
      label: '夜审房费前核对报表',
      path: '/reportCenter/narpCheck',
      pointer: 'pms:reportCenter:yeshenqianhedui'
    }
  ]
},
{
    label: '管理层和销售',
    pointer: 'pms:reportCenter:manageAndsale',
    children: [{
      label: '销售分析报表-客人来源',
      path: '/reportCenter/salesGuests',
      pointer: 'pms:reportCenter:saleSourceGuest'
    }
    , {
      label: '销售分析报表-协议单位',
      path: '/reportCenter/salesAgreement',
      pointer: 'pms:reportCenter:saleAgreement'
    }
    , {
      label: '销售员发展协议单位明细报表',
      path: '/reportCenter/salesAgreementConsumptionDetails',
      pointer: 'pms:reportCenter:saleAgreeDetail'
    }
  ]
  },
{
  label: '财务稽核',
  pointer: 'pms:reportCenter:financial',
  children: [
  // {
  //   label: '历史换房报表',
  //   path: '/reportCenter/historicalRoomExchange',
  //   pointer: '500205'
  // }, 
  // {
  //   label: '冲减明细报表',
  //   path: '/reportCenter/offsetDetail',
  //   pointer: '500403'
  // },
  //  {
  //   label: '房租合约报表',
  //   path: '/reportCenter/rentContract',
  //   pointer: '500407'
  // }, 
  // {
  //   label: '日租钟点取消报表',
  //   path: '/reportCenter/hourRoomCancel',
  //   pointer: '500414'
  // }, 
  // {
  //   label: '历史离店报表',
  //   path: '/reportCenter/historyStore',
  //   pointer: '500208'
  // },
  //  {
  //   label: '自用房免费房报表',
  //   path: '/reportCenter/historicalRoomExchange',
  //   pointer: '500518'
  // }, 
  {
    label: '营业收入报表',
    path: '/reportCenter/turnoverOfBusinessIncome',
    pointer: 'pms:reportCenter:businessIncome'
  }]
},{
  label:'经营报表',
  pointer:'pms:reportCenter:operStatement',
  children:[
    {label:'营业收入日报',path:'/reportCenter/TurnoverDailyDetail',pointer:'pms:reportCenter:tdd'},
    {label:'营业收入月报',path:'/reportCenter/TurnoverMonthDetail',pointer:'pms:reportCenter:tmd'},
    {label:'入住率日报',path:'/reportCenter/leaseRateDaily',pointer:'pms:reportCenter:leaseRateDaily'},
    {label:'入住率月报',path:'/reportCenter/leaseRateMonth',pointer:'pms:reportCenter:leaseRateMonth'},
    {label:'营业数据明细',path:'/reportCenter/businessDetail',pointer:'pms:reportCenter:businessDetail'},
  ]
}
// , {
//   label: '其他常用报表',
//   pointer: '500526',
//   children: [{
//     label: '商品部商品消费明细表',
//     path: '/reportCenter/goodsConsumeList',
//     pointer: '500526'
//   }, {
//     label: '商品部商品消费汇总表',
//     path: '/reportCenter/goodsConsumeList',
//     pointer: '500527'
//   }, {
//     label: '积分换房明细报表',
//     path: '/reportCenter/goodsConsumeList',
//     pointer: '500527'
//   }, {
//     label: '商品销售报表',
//     path: '/reportCenter/goodsConsumeList',
//     pointer: '500519'
//   }]
// }
];

// 报表中心----------------------------------
export const reportCenter = [{
label: '预订报表',
pointer: '5001',
children: [{
  label: '预订分析报表',
  path: '/reportCenter/bookingAnalysisReport',
  pointer: '500101'
}]
}, {
label: '接待报表',
pointer: '5002',
children: [{
  label: '历史换房报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500205'
}, {
  label: '历史离店报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500208'
}, {
  label: '历史离店报表(时间)',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500211'
}, {
  label: '在住当日生日会员报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500206'
}, {
  label: '在住房当天早餐券发放报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500207'
}, {
  label: '客房出租率报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500209'
}, {
  label: '当日取消预订报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500202'
}, {
  label: '当日换房报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500204'
}, {
  label: '当日来店报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500201'
}, {
  label: '当日预订未到报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500203'
}, {
  label: '钟点、特殊房入住报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500212'
}, {
  label: '钟点、特殊房转正常房报表',
  path: '/reportCenter/historyExchangeHouses',
  pointer: '500210'
}]
}, {
label: '宾客报表',
pointer: '5003',
children: [{
  label: '历史在店宾客余额及押金报表',
  path: '/reportCenter/historyGuestsBalance',
  pointer: '500303'
}, {
  label: '在店宾客余额及押金报表',
  path: '/reportCenter/historyGuestsBalance',
  pointer: '500302'
}, {
  label: '地域客源统计报表',
  path: '/reportCenter/historyGuestsBalance',
  pointer: '500305'
}, {
  label: '客房开房一览表',
  path: '/reportCenter/historyGuestsBalance',
  pointer: '500306'
}, {
  label: '客房退房一览表',
  path: '/reportCenter/historyGuestsBalance',
  pointer: '500307'
}, {
  label: '当天来当天走报表',
  path: '/reportCenter/historyGuestsBalance',
  pointer: '500304'
}, {
  label: '当日离店报表',
  path: '/reportCenter/historyGuestsBalance',
  pointer: '500301'
}]
}, {
label: '收银报表',
pointer: '5004',
children: [{
  label: '会员充值发票报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500419'
}, {
  label: '信用卡预授权报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500402'
}, {
  label: '冲减明细报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500403'
}, {
  label: '客人消费预授权剩余金额',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500415'
}, {
  label: '宾客客房消费汇总报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500411'
}, {
  label: '已开发票报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500401'
}, {
  label: '房租合约报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500407'
}, {
  label: '房费调整明细报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500421'
}, {
  label: '收银入账按项目类别汇总报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500412'
}, {
  label: '收银入账明细报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500404'
}, {
  label: '收银入账明细报表(时间)',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500424'
}, {
  label: '收银入账明细报表-按项目类别',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500413'
}, {
  label: '收银入账项目汇总报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500405'
}, {
  label: '收银员收款报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500432'
}, {
  label: '收银员收款报表(时间)',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500429'
}, {
  label: '收银员收款报表（收付）',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500417'
}, {
  label: '收银员收款挂账明细报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500425'
}, {
  label: '收银员收款权责收付报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500430'
}, {
  label: '收银汇总报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500406'
}, {
  label: '收银汇总报表(时间查询)',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500422'
}, {
  label: '日租钟点取消报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500414'
}, {
  label: '结账明细报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500418'
}, {
  label: '结账明细报表(2)',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500426'
}, {
  label: '结账明细报表(时间)',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500423'
}, {
  label: '营业收入报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500416'
}, {
  label: '营业收入报表(财务月)',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500427'
}, {
  label: '账单恢复报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500409'
}, {
  label: '账单恢复项目明细报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500410'
}, {
  label: '转账报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500408'
}, {
  label: '退房恢复报表',
  path: '/reportCenter/memberRechargeBill',
  pointer: '500420'
}]
}, {
label: '经营报表',
pointer: '5005',
children: [{
  label: '会员发展效益表',
  path: '/reportCenter/memberBenefit',
  pointer: '500523'
}, {
  label: '会员发展数量部门比较表',
  path: '/reportCenter/memberBenefit',
  pointer: '500522'
}, {
  label: '停用房报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500509'
}, {
  label: '协议单位发展效益表',
  path: '/reportCenter/memberBenefit',
  pointer: '500525'
}, {
  label: '协议单位发展数量部门比较表',
  path: '/reportCenter/memberBenefit',
  pointer: '500524'
}, {
  label: '哑房账日报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500506'
}, {
  label: '哑房账明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500539'
}, {
  label: '哑房账月报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500507'
}, {
  label: '商品消费明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500543'
}, {
  label: '商品部商品消费明细表',
  path: '/reportCenter/memberBenefit',
  pointer: '500526'
}, {
  label: '商品部商品消费明细表（按楼层）',
  path: '/reportCenter/memberBenefit',
  pointer: '500533'
}, {
  label: '商品部商品消费汇总表',
  path: '/reportCenter/memberBenefit',
  pointer: '500527'
}, {
  label: '商品销售报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500519'
}, {
  label: '商品销售报表(时间)',
  path: '/reportCenter/memberBenefit',
  pointer: '500538'
}, {
  label: '团队明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500531'
}, {
  label: '团队汇总报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500530'
}, {
  label: '在住客人报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500505'
}, {
  label: '在住客人账务明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500502'
}, {
  label: '在住房明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500504'
}, {
  label: '客人修改资料报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500517'
}, {
  label: '客房打扫明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500532'
}, {
  label: '客房类别收益分析报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500501'
}, {
  label: '客房类别收益时段分析报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500514'
}, {
  label: '开房统计表 - 年龄、性别',
  path: '/reportCenter/memberBenefit',
  pointer: '500515'
}, {
  label: '房退未结报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500503'
}, {
  label: '持它卡入住报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500542'
}, {
  label: '挂账回款明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500521'
}, {
  label: '操作员业绩统计表（办理入住优先）',
  path: '/reportCenter/memberBenefit',
  pointer: '500535'
}, {
  label: '操作员业绩统计表（办理预定优先）',
  path: '/reportCenter/memberBenefit',
  pointer: '500534'
}, {
  label: '日报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500536'
}, {
  label: '查房明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500528'
}, {
  label: '特殊用房报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500508'
}, {
  label: '管理层日报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500536'
}, {
  label: '管理层时段分析报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500512'
}, {
  label: '经理日报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500520'
}, {
  label: '维修房报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500510'
}, {
  label: '自用房免费房报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500518'
}, {
  label: '营业统计日报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500529'
}, {
  label: '销售分析报表 - 协议单位',
  path: '/reportCenter/memberBenefit',
  pointer: '500513'
}, {
  label: '销售分析报表 - 客人来源',
  path: '/reportCenter/memberBenefit',
  pointer: '500537'
}, {
  label: '销售分析报表 - 客人来源（房型）',
  path: '/reportCenter/memberBenefit',
  pointer: '500537'
}, {
  label: '销售员发展协议单位明细报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500540'
}, {
  label: '门锁发卡报表',
  path: '/reportCenter/memberBenefit',
  pointer: '500516'
}]
}, {
label: '积分报表',
pointer: '5006',
children: [{
  label: '会员积分明细报表',
  path: '/reportCenter/integralDetailList',
  pointer: '500610'
}, {
  label: '会员积分汇总统计表',
  path: '/reportCenter/integralDetailList',
  pointer: '500606'
}, {
  label: '夜审积分明细表',
  path: '/reportCenter/integralDetailList',
  pointer: '500602'
}, {
  label: '手工积分调整报表',
  path: '/reportCenter/integralDetailList',
  pointer: '500605'
}, {
  label: '注册会员积分汇总统计表(截止到营业日期)',
  path: '/reportCenter/integralDetailList',
  pointer: '50067'
}, {
  label: '积分兑换商品明细表',
  path: '/reportCenter/integralDetailList',
  pointer: '500601'
}, {
  label: '积分换房明细表',
  path: '/reportCenter/integralDetailList',
  pointer: '50068'
}, {
  label: '积分换房汇总表',
  path: '/reportCenter/integralDetailList',
  pointer: '500609'
}, {
  label: '积分换现金明细表',
  path: '/reportCenter/integralDetailList',
  pointer: '500603'
}, {
  label: '积分换现金汇总表',
  path: '/reportCenter/integralDetailList',
  pointer: '500604'
}]
}, {
label: '图形报表',
pointer: '5007',
children: [{
  label: '地域客源统计报表',
  path: '/reportCenter/regionTouristsList',
  pointer: '500708'
}, {
  label: '客房类别收益时段分析报表',
  path: '/reportCenter/regionTouristsList',
  pointer: '500704'
}, {
  label: '开房统计表 - 年龄',
  path: '/reportCenter/regionTouristsList',
  pointer: '500705'
}, {
  label: '收银入账按项目类别汇总报表',
  path: '/reportCenter/regionTouristsList',
  pointer: '500702'
}, {
  label: '收银入账项目汇总报表',
  path: '/reportCenter/regionTouristsList',
  pointer: '500701'
}, {
  label: '管理层日报表',
  path: '/reportCenter/regionTouristsList',
  pointer: '500707'
}, {
  label: '销售分析报表 - 客人来源',
  path: '/reportCenter/regionTouristsList',
  pointer: '500703'
}, {
  label: '预订分析报表',
  path: '/reportCenter/regionTouristsList',
  pointer: '500706'
}]
}, {
label: '客户关系报表',
pointer: '5008',
children: [{
  label: '会员发卡报表',
  path: '/reportCenter/memberCardList',
  pointer: '500803'
}, {
  label: '会员注册时段分析报表',
  path: '/reportCenter/memberCardList',
  pointer: '500802'
}, {
  label: '会员级别调整报表',
  path: '/reportCenter/memberCardList',
  pointer: '500805'
}, {
  label: '协议单位排名报表',
  path: '/reportCenter/memberCardList',
  pointer: '500804'
}, {
  label: '销售员注册会员报表',
  path: '/reportCenter/memberCardList',
  pointer: '500801'
}]
}, {
label: '库存报表',
pointer: '5009',
children: [{
  label: '仓库结存统计报表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500901'
}, {
  label: '供应商供货统计报表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500910'
}, {
  label: '出入库时间段报表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500902'
}, {
  label: '商品销售时段明细报表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500903'
}, {
  label: '库存出入库余额实时统计表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500911'
}, {
  label: '库存出入库结存时段统计表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500905'
}, {
  label: '库存盘点明细报表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500906'
}, {
  label: '部门出入库余额实时统计表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500908'
}, {
  label: '部门出入库结存时段统计表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500909'
}, {
  label: '部门盘点明细报表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500907'
}, {
  label: '部门结存统计报表',
  path: '/reportCenter/warehouseBalanceList',
  pointer: '500904'
}]
}, {
label: '佣金报表',
pointer: '5010',
children: [{
  label: '协议单位佣金明细报表',
  path: '/reportCenter/companyDetail',
  pointer: '501001'
}, {
  label: '协议单位佣金明细报表（退房后统计）',
  path: '/reportCenter/companyDetail',
  pointer: '501003'
}, {
  label: '协议单位佣金汇总报表',
  path: '/reportCenter/companyDetail',
  pointer: '501002'
}, {
  label: '协议单位佣金汇总报表（退房后统计）',
  path: '/reportCenter/companyDetail',
  pointer: '501004'
}, {
  label: '渠道佣金明细报表',
  path: '/reportCenter/companyDetail',
  pointer: '501005'
}, {
  label: '渠道佣金汇总报表',
  path: '/reportCenter/companyDetail',
  pointer: '501006'
}]
}, {
label: '会议室报表',
pointer: '5011',
children: [{
  label: '会议室报表',
  path: '/reportCenter/boardroomList',
  pointer: '501101'
}, {
  label: '会议室订单报表',
  path: '/reportCenter/boardroomList',
  pointer: '501103'
}, {
  label: '会议室账单明细报表',
  path: '/reportCenter/boardroomList',
  pointer: '501102'
}]
}, {
label: '布草报表',
pointer: '5013',
children: [{
  label: '布草损耗明细报表',
  path: '/reportCenter/linenLossReport',
  pointer: '501301'
}, {
  label: '布草日汇总统计报表',
  path: '/reportCenter/linenLossReport',
  pointer: '501304'
}, {
  label: '布草月汇总统计报表',
  path: '/reportCenter/linenLossReport',
  pointer: '501303'
}, {
  label: '布草盘点历史记录报表',
  path: '/reportCenter/linenLossReport',
  pointer: '501302'
}]
}, {
label: '微信支付报表',
pointer: '5015',
children: [{
  label: '微信支付对账明细查询',
  path: '/reportCenter/wxPaymentBalance',
  pointer: '501503'
}, {
  label: '微信支付明细查询',
  path: '/reportCenter/wxPaymentBalance',
  pointer: '501501'
}, {
  label: '微信支付月汇总查询',
  path: '/reportCenter/wxPaymentBalance',
  pointer: '501502'
}]
}]
