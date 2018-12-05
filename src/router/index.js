import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import IndexPage from '@/pages/Index.vue'
import NotFound from '@/pages/404.vue'

//案例
import tinymce from '@/pages/demo/tinymce.vue'
import FormPage from '@/pages/demo/FormDome.vue'
import DataPage from '@/pages/demo/DataDome.vue'
import EchartsPage from '@/pages/demo/Echarts.vue'
import AMapDomePage from '@/pages/demo/AMapDome.vue'
import TreePage from '@/pages/demo/TreeDome.vue'
import AddressPage from '@/pages/demo/AddressPage.vue'
// import UmpsSystemManage from '@/pages/upms/UmpsSystemManage.vue'
// import UmpsLogManage from '@/pages/upms/UmpsLogManage.vue'
// import UmpsUserManage from '@/pages/upms/UmpsUserManage.vue'
// import UmpsRoleManage from '@/pages/upms/UmpsRoleManage.vue'
// import UmpsPermissionManage from '@/pages/upms/UmpsPermissionManage.vue'

//一级菜单
import ClassSelection from '@/pages/ClassSelection.vue'
import AtrialCenterTab from '@/pages/atrialCenter/tab.vue'
import WxOpenTab from '@/pages/wxOpen/tab.vue'
import ReserveManageTag from '@/pages/reserveManage/tab.vue'
import CheckInManageTab from '@/pages/checkInManage/tab.vue'
import CheckInSearch from '@/pages/checkInManage/CheckInSearch.vue'
import TeamSearch from '@/pages/checkInManage/TeamSearch.vue'
import CustomerRelationTag from '@/pages/customerRelation/tab.vue'
import SmsMarketingTag from '@/pages/smsMarketing/tab.vue'
import ReportCenterTag from '@/pages/reportCenter/tab.vue'
import DumbHouseTag from '@/pages/dumbHouse/tab.vue'
import CommodityDeptTag from '@/pages/commodityDept/tab.vue'
import StockTag from '@/pages/stock/tab.vue'
import ConferenceRoomTag from '@/pages/conferenceRoom/tab.vue'
import OperatorsTag from '@/pages/operators/tab.vue'
import SystemSetTag from '@/pages/systemSet/tab.vue'
import LinenTag from '@/pages/linen/tab.vue'

//房态图
import RoomPattern from '@/pages/atrialCenter/RoomPattern.vue'
import RoomTable from '@/pages/atrialCenter/RoomTable.vue'
import ForwardHousing from '@/pages/atrialCenter/ForwardHousing.vue'
import HousekeepingList from '@/pages/atrialCenter/HousekeepingList.vue'
import GoodsManageTag from '@/pages/atrialCenter/goodsManage/tab.vue'
import AccountStatement from '@/pages/atrialCenter/AccountStatement.vue'
import JointRealManage from '@/pages/atrialCenter/JointRealManage.vue'
import ShiftTab from '@/pages/atrialCenter/shiftReport/tab.vue'


//预订管理
import ListReserve from '@/pages/reserveManage/ListReserve.vue'
import GroupReserve from '@/pages/reserveManage/GroupReserve.vue'
import AddReserve from '@/pages/reserveManage/addReserve.vue'

//客户关系
import MemberManage from '@/pages/customerRelation/memberManage/tab.vue'
import GuestManage from '@/pages/customerRelation/guestManage/tab.vue'
import VirtualOrder from '@/pages/customerRelation/VirtualOrder.vue'
import ProtocolManage from '@/pages/customerRelation/ProtocolManage/tab.vue'
import Invoice from '@/pages/customerRelation/invoice/tab.vue'
import PassengerInformationUploading from '@/pages/customerRelation/passengerInformationUploading/tab.vue'

//操作员管理
import Operators from '@/pages/operators/Operators.vue'
import ModifyThePassword from '@/pages/operators/ModifyThePassword.vue'
import LogBrowsing from '@/pages/operators/LogBrowsing.vue'
import LogRflRecord from '@/pages/operators/LogRflRecord.vue'
import RoleManagement from '@/pages/operators/roleManagement/RoleManagement.vue'
import EmployeeManagement from '@/pages/operators/EmployeeManagement.vue'
import MACBindingSettings from '@/pages/operators/MACBindingSettings.vue'
import NightTrialRecord from '@/pages/operators/NightTrialRecord.vue'
import MobileClientAccessAuthorization from '@/pages/operators/MobileClientAccessAuthorization.vue'
import AttendanceGroupList from '@/pages/operators/attendanceManagement/AttendanceGroupList.vue'

//前台交接班和查账
import ReceiptsReportPage from '@/pages/reportCenter/shiftAndAudit/ReceiptsReport.vue'
import AdmissionAccountPage from '@/pages/reportCenter/shiftAndAudit/AdmissionAccount.vue'
import AccountSummaryReportPage from '@/pages/reportCenter/shiftAndAudit/AccountSummaryReport.vue'
import NightAuditRentPriceCheck from '@/pages/reportCenter/shiftAndAudit/NightAuditRentPriceCheck.vue'

//报表中心
import ReportDefaultPage from '@/pages/reportCenter/DefaultPage.vue'
import ManagDailyReport from '@/pages/reportCenter/managementLayer/DailyReport.vue'
import ManagRoomDailyReport from '@/pages/reportCenter/managementLayer/roomDailyReport.vue'
import ManagSalesGuests from '@/pages/reportCenter/managementSales/SalesGuests.vue'
import HistoricalRoomExchange from '@/pages/reportCenter/financialAuditing/HistoricalRoomExchange.vue'
import OffsetDetail from '@/pages/reportCenter/financialAuditing/offsetDetail.vue'
import RentContract from '@/pages/reportCenter/financialAuditing/RentContract.vue'
import HourRoomCancel from '@/pages/reportCenter/financialAuditing/HourRoomCancel.vue'
import HistoryStore from '@/pages/reportCenter/financialAuditing/HistoryStore.vue'
import TurnoverOfBusinessIncome from '@/pages/reportCenter/financialAuditing/TurnoverOfBusinessIncome.vue'
import GoodsConsumeList from '@/pages/reportCenter/otherCommonReports/GoodsConsumeList.vue'
import BookingAnalysisReportPage from '@/pages/reportCenter/reservationReport/BookingAnalysisReport.vue'
import HistoryExchangeHouses from '@/pages/reportCenter/receptionReport/HistoryExchangeHouses.vue'
import HistoryGuestsBalance from '@/pages/reportCenter/guestReport/HistoryGuestsBalance.vue'
import MemberRechargeBill from '@/pages/reportCenter/cashRegister/MemberRechargeBill.vue'
import MemberBenefit from '@/pages/reportCenter/businessReport/MemberBenefit.vue'
import IntegralDetailList from '@/pages/reportCenter/integralReport/IntegralDetailList.vue'
import RegionTouristsList from '@/pages/reportCenter/graphicReport/RegionTouristsList.vue'
import MemberCardList from '@/pages/reportCenter/clientRelations/MemberCardList.vue'
import WarehouseBalanceList from '@/pages/reportCenter/inventoryReport/WarehouseBalanceList.vue'
import CompanyDetail from '@/pages/reportCenter/commissionReport/CompanyDetail.vue'
import BoardroomList from '@/pages/reportCenter/boardroomReport/BoardroomList.vue'
import LinenLossReport from '@/pages/reportCenter/linenReport/LinenLossReport.vue'
import WxPaymentBalance from '@/pages/reportCenter/wxPaymentReport/WxPaymentBalance.vue'
import TurnoverDailyDetail from '@/pages/reportCenter/turnoverReport/TurnoverDailyDetail.vue'
import TurnoverMonthDetail from '@/pages/reportCenter/turnoverReport/TurnoverMonthDetail.vue'
import LeaseRateDaily from '@/pages/reportCenter/turnoverReport/LeaseRateDaily.vue'
import LeaseRateMonth from '@/pages/reportCenter/turnoverReport/LeaseRateMonth.vue'
import EmergencyReport from '@/pages/reportCenter/emergencyReport/tab.vue'
import BusinessDetail from '@/pages/reportCenter/turnoverReport/BusinessDetail.vue'

//库存
import StockTab from '@/pages/stock/tab';
import StockFunction from "@/pages/stock/stockFunction/tab";
import StockSetUp from "@/pages/stock/stockSetUp/tab";

//系统设置
import SystemParameter from '@/pages/systemSet/SystemParameter/tab'
import ClassManagement from '@/pages/systemSet/ClassManagement'
import MembershipRelated from '@/pages/systemSet/MembershipRelated/tab'
import RoomSetting from '@/pages/systemSet/RoomSetting/tab'
import BellSpecialRoom from '@/pages/systemSet/BellSpecialRoom/tab'
import ConsumerProjects from '@/pages/systemSet/ConsumerProjects'
import ChannelManagement from '@/pages/systemSet/ChannelManagement'
import AccountEntry from '@/pages/systemSet/AccountEntry/tab'
import PriceSetting from '@/pages/systemSet/PriceSetting/tab'

// 财务稽核
import FinancialAuditTag from '@/pages/financialAudit/tab.vue'
import BillChecking from '@/pages/financialAudit/BillChecking'
import BillCheckingLog from '@/pages/financialAudit/billCheckingLog/BillCheckingLog'
import BillPostilLog from '@/pages/financialAudit/billPostilLog'
import InvoiceList from '@/pages/financialAudit/invoiceManage/invoiceList.vue'

Vue.use(Router)
/**
 * 项目启动就有权限
 * @type {*[]}
 */
export const constantRouterMap = [
  // 登录
  {path: '/login', hidden: true, component: Login, name: '登录'},
  {path: '/404', hidden: true, component: NotFound, name: '404页面'},
  {path: '/classSelection', hidden: true,component: ClassSelection, name: '班次选择'},
  // {
  //   path: '/',
  //   component: Home,
  //   name: 'demo',
  //   meta: {icon: 'fa-home', noCache: true},
  //   hidden: false,
  //   children: [
  //     {path: '/tinymce', component: tinymce, name: '富文本编辑器'},
  //     {path: '/form', component: FormPage, name: '表单'},
  //     {path: '/data', component: DataPage, name: '数据列表'},
  //     {path: '/echarts', component: EchartsPage, name: 'echarts统计图'},
  //     {path: '/map', component: AMapDomePage, name: '高德地图'},
  //     {path: '/tree', component: TreePage, name: '树结构数据'},
  //     {path: '/address', component: AddressPage, name: '地址管理'}
  //   ]
  // },
  {
    path: '/',
    component: Home,
    name: '首页',
    alias: 'Home',
    meta: {icon: 'fa-bank', noCache: true},
    children: [
      // {path: '/index', component: IndexPage, name: '首页1'},
      // {path: '/index', component: AtrialCenterTab, name: '首页1'},
      {
        path: '/atrialCenter',
        component: AtrialCenterTab,
        name: '房态图',
        meta: {icon: 'fa-home', noCache: true},
        hidden: false,
        children: [
          {path: '/atrialCenter/RoomPattern', component: RoomPattern, label: '房态图'},
          {path: '/atrialCenter/RoomTable', component: RoomTable, label: '房态表'},
          {path: '/atrialCenter/ForwardHousing',component: ForwardHousing, label: '远期房态'},
          {path: '/atrialCenter/HousekeepingList', component: HousekeepingList, label: '问题房态列表'},
          {path: '/atrialCenter/GoodsManageTag', component: GoodsManageTag, label: '物品管理'},
          {path: '/atrialCenter/AccountStatement',  component: AccountStatement, label: '催账报表'},
          {path: '/atrialCenter/JointRealManage', component: JointRealManage, label: '联房管理'},
          {path: '/reportCenter/ShiftReport', component: ShiftTab, label: '交班报表'},
          {path: '/reportCenter/EmergencyReport', component: EmergencyReport, label: '应急报表'},
        ]
      },
      {
        path: '/reserveManage',
        component: ReserveManageTag,
        name: '预定管理',
        hidden: false,
        children: [
          {path: '/reserveManage/addReserve', component: AddReserve, label: '新增预定'},
          {path: '/reserveManage/groupReserve',  component: GroupReserve, label: '团队预定'},
          {path: '/reserveManage/listReserve', component: ListReserve, label: '订单列表'}
        ]
      },
      { 
        path: '/checkInManage', 
        component: CheckInManageTab, 
        name: '入住管理', 
        hidden: false,
        children:[
          {path: '/checkInManage/checkInSearch',  component: CheckInSearch, label: '入住查询'},
          {path: '/checkInManage/teamSearch',  component: TeamSearch, label: '团队查询'},
        ]
      },
      {path: '/wxOpen', component: WxOpenTab, name: '微信开门', hidden: false},
      {
        path: '/customerRelation',
        component: CustomerRelationTag,
        name: '客户关系',
        hidden: false,
        children: [
          {path: '/customerRelation/memberManage',  component: MemberManage, label: '会员管理'},
          {path: '/customerRelation/guestManage', component: GuestManage, label: '客人管理'},
          {path: '/customerRelation/protocolManage',component: ProtocolManage, label: '协议管理'},
          {path: '/customerRelation/virtualOrder', component: VirtualOrder, label: '虚拟账单'},
          {path: '/customerRelation/invoice', component: Invoice, label: '发票'},
          {path: '/customerRelation/passengerInformationUploading', component: PassengerInformationUploading, label: '旅客信息上传'}
        ]
      },
      {path: '/smsMarketing', component: SmsMarketingTag, name: '短息营销', hidden: false},
      {
        path: '/reportCenter',
        component: ReportCenterTag,
        name: '报表中心',
        alias: 'ReportCenterTag',
        hidden: false,
        children: [
          {path: '/reportCenter', component: ReportDefaultPage, label: '默认页'},
          {path: '/reportCenter/receiptsReport', component: ReceiptsReportPage, label: '收银员收款报表'},
          {path: '/reportCenter/admissionAccount', component: AdmissionAccountPage, label: '收银入账明细报表'},
          {path: '/reportCenter/accountSummaryReport', component: AccountSummaryReportPage, label: '收银入账汇总报表'},
          {path: '/reportCenter/narpCheck', component: NightAuditRentPriceCheck, label: '夜审房费前核对报表'},
          {path: '/reportCenter/dailyReport', component: ManagDailyReport, label: '管理层日报表'},
          {path: '/reportCenter/roomDailyReport', component: ManagRoomDailyReport, label: '查看每天的订房报表情况'},
          {path: '/reportCenter/salesGuests', component: ManagSalesGuests, label: '销售分析报表-客人来源'},
          {path: '/reportCenter/historicalRoomExchange', component: HistoricalRoomExchange, label: '历史换房报表'},
          {path: '/reportCenter/offsetDetail', component: OffsetDetail, label: '冲减明细报表'},
          {path: '/reportCenter/rentContract', component: RentContract, label: '房租合约报表'},
          {path: '/reportCenter/hourRoomCancel', component: HourRoomCancel, label: '日租钟点取消报表'},
          {path: '/reportCenter/historyStore', component: HistoryStore, label: '历史离店报表'},
          {path: '/reportCenter/turnoverOfBusinessIncome', component: TurnoverOfBusinessIncome, label: '历史离店报表'},
          {path: '/reportCenter/goodsConsumeList', component: GoodsConsumeList, label: '商品部商品消费明细表'},
          {path: '/reportCenter/bookingAnalysisReport', component: BookingAnalysisReportPage, label: '预订分析报表'},
          {path: '/reportCenter/historyExchangeHouses', component: HistoryExchangeHouses, label: '历史换房报表'},
          {path: '/reportCenter/historyGuestsBalance', component: HistoryGuestsBalance, label: '历史在店宾客余额及押金报表'},
          {path: '/reportCenter/memberRechargeBill', component: MemberRechargeBill, label: '会员充值发票报表'},
          {path: '/reportCenter/memberBenefit', component: MemberBenefit, label: '会员发展效益表'},
          {path: '/reportCenter/integralDetailList', component: IntegralDetailList, label: '会员积分明细报表'},
          {path: '/reportCenter/regionTouristsList', component: RegionTouristsList, label: '地域客源统计报表'},
          {path: '/reportCenter/memberCardList', component: MemberCardList, label: '会员发卡报表'},
          {path: '/reportCenter/warehouseBalanceList', component: WarehouseBalanceList, label: '仓库结存统计报表'},
          {path: '/reportCenter/companyDetail', component: CompanyDetail, label: '协议单位佣金明细报表'},
          {path: '/reportCenter/boardroomList', component: BoardroomList, label: '会议室报表'},
          {path: '/reportCenter/linenLossReport', component: LinenLossReport, label: '布草损耗明细报表'},
          {path: '/reportCenter/wxPaymentBalance', component: WxPaymentBalance, label: '微信支付对账明细查询'},
          {path: '/reportCenter/TurnoverDailyDetail', component: TurnoverDailyDetail, label: '营业收入日报'},
          {path: '/reportCenter/TurnoverMonthDetail', component: TurnoverMonthDetail, label: '营业收入月报'},
          {path: '/reportCenter/leaseRateDaily', component: LeaseRateDaily, label: '入住率日报'},
          {path: '/reportCenter/leaseRateMonth', component: LeaseRateMonth, label: '入住率月报'},
          {path: '/reportCenter/businessDetail', component: BusinessDetail, label: '入住率月报'},
        ]
      },
      {
        path: '/stock',
        component: StockTab,
        name: '库存',
        hidden: false,
        children: [
          {path: '/stock/stockopr', component: StockFunction, label: '库存功能'},
          {path: '/stock/setting',  component: StockSetUp, label: '库存相关设置'},
        ]
      },

      {
        path: '/financialAudit', 
        component: FinancialAuditTag, 
        name: '财务稽核', 
        hidden: false,
        children: [
          {path: '/financialAudit/billChecking', component: BillChecking, label: '订单对账'},
          {path: '/financialAudit/billCheckingLog', component: BillCheckingLog, label: '对账记录'},
          {path: '/financialAudit/billPostilLog', component: BillPostilLog, label: '账单批注记录'},
          {path: '/financialAudit/InvoiceList', component: InvoiceList, label: '发票管理'},
          // {path: '/financialAudit', component: OffsetDetail, label: '冲减明细报表'}
        ]
      },
      {path: '/dumbHouse', component: DumbHouseTag, name: '哑房账', hidden: false},
      {path: '/commodityDept', component: CommodityDeptTag, name: '商品部', hidden: false},
      {path: '/stock', component: StockTag, name: '库存', hidden: false},
      {path: '/conferenceRoom', component: ConferenceRoomTag, name: '会议室', hidden: false},
      {
        path: '/operators',
        perm:'pms:dir:operatorManage',
        component: OperatorsTag,
        name: '操作员管理',
        hidden: false,
        children: [
          // {path: '/operators/operManager' component: Operators, label: '操作员管理'},
          {path: '/operators/modifyThePassword', component: ModifyThePassword, label: '修改密码'},
          {path: '/operators/logBrowsing',  component: LogBrowsing, label: '日志浏览'},
          {path: '/operators/logRflRecord',  component: LogRflRecord, label: '制卡日志'},
          // {path: '/operators/roleManagement', component: RoleManagement, label: '角色管理'},
          {path: '/operators/employeeManagement', component: EmployeeManagement, label: '员工管理'},
          {path: '/operators/nightTrialRecord', component: NightTrialRecord, label: '夜审记录查询'},
          {path: '/operators/attendanceGroupList', component: AttendanceGroupList, label: '排班管理'},
        ]
      },
      {
        path: '/systemSet',
        perm:'pms:dir:systemSet',
        component: SystemSetTag, 
        name: '系统设置', 
        hidden: false,
        children: [
          {path: '/systemSet/paramsSetting', component:SystemParameter , label: '系统参数设置'},
          {path: '/systemSet/shiftManage', component: ClassManagement, label: '班次管理'},
          {path: '/systemSet/userSetting',  component: MembershipRelated, label: '会员相关设置'},
          {path: '/systemSet/roomSetting', component: RoomSetting , label: '客房设置'},
          {path: '/systemSet/clockSpecial',  component: BellSpecialRoom, label: '钟点特殊房'},
          {path: '/systemSet/settleSetting',  component: ConsumerProjects, label: '消费项目设置'},
          {path: '/systemSet/channelManage', component: ChannelManagement, label: '渠道管理'},
          {path: '/systemSet/projectSetting', component: AccountEntry, label: '入账项目显示设置'},
          {path: '/systemSet/priceSetting', component: PriceSetting, label: '价格设置'},
        ]
      },
      {path: '/linen', component: LinenTag, name: '布草', hidden: false}
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

// /**
//  * 异步加载权限
//  * @type {*[]}
//  */
// export const asyncRouterMap = [
//   {
//     path: '/',
//     name: '操作日志',
//     component: Home,
//     meta: {icon: 'fa-tasks', noCache: true},
//     children: [
//       {path: '/upmsSystem', component: UmpsSystemManage, name: '系统管理', hidden: true},
//       {path: '/upmsLog', component: UmpsLogManage, name: '操作日志'},
//       {path: '/upmsPermission', component: UmpsPermissionManage, name: '权限管理', hidden: true},
//       {path: '/upmsUser', component: UmpsUserManage, name: '用户管理', hidden: true},
//       {path: '/upmsRole', component: UmpsRoleManage, name: '角色管理', hidden: true}
//     ]
//   },
//   {path: '*', hidden: true, redirect: {path: '/404'}}
// ]
