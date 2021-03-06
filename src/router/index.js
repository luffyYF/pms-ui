import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
// import IndexPage from '@/pages/Index.vue'
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
import TeamReserve from '@/pages/reserveManage/TeamReserve.vue'
import AddReserve from '@/pages/reserveManage/addReserve.vue'
import MiniappOrderList from '@/pages/reserveManage/miniapp/MiniappOrderList.vue'

//客户关系
import MemberManage from '@/pages/customerRelation/memberManage/tab.vue'
import GuestManage from '@/pages/customerRelation/guestManage/tab.vue'
import VirtualOrder from '@/pages/customerRelation/VirtualOrder.vue'
import ProtocolManage from '@/pages/customerRelation/ProtocolManage/tab.vue'
import intermediaryTab from '@/pages/customerRelation/ProtocolManage/intermediaryTab.vue'
import Invoice from '@/pages/customerRelation/invoice/tab.vue'
import PassengerInformationUploading from '@/pages/customerRelation/passengerInformationUploading/tab.vue'

//操作员管理
import OperatorsTag from '@/pages/operators/tab.vue'
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
import AttendanceClassList from '@/pages/operators/attendanceManagement/AttendanceClassList'
import AttendancePlanList from '@/pages/operators/attendanceManagement/AttendancePlanList'
import AttendanceGroupSettingEdit from '@/pages/operators/attendanceManagement/AttendanceGroupSettingEdit.vue'

//前台交接班和查账
import ReceiptsReportPage from '@/pages/reportCenter/shiftAndAudit/ReceiptsReport.vue'
import AdmissionAccountPage from '@/pages/reportCenter/shiftAndAudit/AdmissionAccount.vue'
import AccountSummaryReportPage from '@/pages/reportCenter/shiftAndAudit/AccountSummaryReport.vue'
import NightAuditRentPriceCheck from '@/pages/reportCenter/shiftAndAudit/NightAuditRentPriceCheck.vue'

//报表中心
import InvoiceSummary from '@/pages/reportCenter/guestAccount/invoiceSummary.vue'
import RoomTypeCheckInAnalysis from '@/pages/reportCenter/commonStatements/roomTypeCheckInAnalysis.vue'
import ReportDefaultPage from '@/pages/reportCenter/DefaultPage.vue'
import ManagDailyReport from '@/pages/reportCenter/managementLayer/DailyReport.vue'
import ManagRoomDailyReport from '@/pages/reportCenter/managementLayer/roomDailyReport.vue'
import ManagerDailyReport from '@/pages/reportCenter/managementLayer/managerDailyReport.vue'
import ManagerDailyTimeReport from '@/pages/reportCenter/managementLayer/managerDailyTimeReport.vue'

import ManaghouseDoBusinessStatistics from '@/pages/reportCenter/houseDoBusinessStatistics/houseDoBusinessStatistics.vue'
import ManagSalesGuests from '@/pages/reportCenter/managementSales/SalesGuests.vue'
import ManagSalesAgreement from '@/pages/reportCenter/managementSales/SalesAgreement.vue'
import ManagSalesAgreementConsumptionDetails from '@/pages/reportCenter/managementSales/SalesAgreementConsumptionDetails.vue'
import HistoricalRoomExchange from '@/pages/reportCenter/financialAuditing/HistoricalRoomExchange.vue'
import OffsetDetail from '@/pages/reportCenter/financialAuditing/offsetDetail.vue'
import RentContract from '@/pages/reportCenter/financialAuditing/RentContract.vue'
import HistoryHousePriceInfo from '@/pages/reportCenter/financialAuditing/HistoryHousePriceInfo.vue'
import HourRoomCancel from '@/pages/reportCenter/financialAuditing/HourRoomCancel.vue'
import HistoryStore from '@/pages/reportCenter/financialAuditing/HistoryStore.vue'
import ReceptionRoom from '@/pages/reportCenter/financialAuditing/ReceptionRoom.vue'
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
import TurnoverDaily from '@/pages/reportCenter/turnoverReport/TurnoverDaily.vue'
import TurnoverMonthDetail from '@/pages/reportCenter/turnoverReport/TurnoverMonthDetail.vue'
import LeaseRateDaily from '@/pages/reportCenter/turnoverReport/LeaseRateDaily.vue'
import LeaseRateMonth from '@/pages/reportCenter/turnoverReport/LeaseRateMonth.vue'
import EmergencyReport from '@/pages/reportCenter/emergencyReport/tab.vue'
import BusinessDetail from '@/pages/reportCenter/turnoverReport/BusinessDetail.vue'
import TurnoverMonth from '@/pages/reportCenter/turnoverReport/turnoverMonth.vue'
import TurnoverYear from '@/pages/reportCenter/turnoverReport/TurnoverYear.vue'

import TurnoverTimeQuantum from '@/pages/reportCenter/turnoverReport/TurnoverTimeQuantum.vue'

import CashFlowDetails from '@/pages/reportCenter/turnoverReport/CashFlowDetails.vue'

//库存
import StockTab from '@/pages/stock/tab';
import StockFunction from "@/pages/stock/stockFunction/tab";
import StockSetUp from "@/pages/stock/stockSetUp/tab";
import InventoryConsumeDetail from "@/pages/stock/stockFunction/InventoryConsumeDetail.vue"
import Application from "@/pages/stock/stockFunction/Application.vue"
import ApplicationList from "@/pages/stock/stockFunction/ApplicationList.vue"
import InventoryIn from "@/pages/stock/stockFunction/InventoryIn.vue"
import StockList from "@/pages/stock/stockFunction/StockList.vue"
import InventoryConsume from "@/pages/stock/stockFunction/InventoryConsume.vue"
import InventoryConsumeList from "@/pages/stock/stockFunction/InventoryConsumeList.vue"
import TakeStock from "@/pages/stock/stockFunction/TakeStock.vue"
import TakeStockList from "@/pages/stock/stockFunction/TakeStockList.vue"
import StorageSetting from "@/pages/stock/stockSetUp/StorageSetting.vue"

//系统设置
import SystemParameter from '@/pages/systemSet/SystemParameter/tab'
import HotelSetting from '@/pages/systemSet/HotelSetting/tab'
import MembershipRelated from '@/pages/systemSet/MembershipRelated/tab'
import RoomSetting from '@/pages/systemSet/RoomSetting/tab'
import HourRoomSetting from '@/pages/systemSet/HourRoomSetting/Tab'
import SpecialRoomSetting from '@/pages/systemSet/SpecialRoomSetting/Tab'
import DailyRoomSetting from '@/pages/systemSet/DailyRoomSetting/Tab'
import ConsumerProjects from '@/pages/systemSet/ConsumerProjects'
import ChannelManagement from '@/pages/systemSet/ChannelManagement'
import ProjectSetting from '@/pages/systemSet/projectSetting/tab'
import PriceSetting from '@/pages/systemSet/PriceSetting/tab'
import marketingSetting from '@/pages/systemSet/marketing/tab'
import payConfig from '@/pages/systemSet/pay/tab'
import hotelHardware from '@/pages/systemSet/hotelHardware/tab'
import roomLockParam from '@/pages/systemSet/roomLockParam/tab'
// import zlRoomStatusSetting from '@/pages/systemSet/zlRoomStatusSetting/tab'
// import zlPriceSetting from '@/pages/systemSet/zlRoomStatusSetting/zlPriceSetting'

//直连
import zl from '@/pages/zl/tab'
import zlRoomStatusSetting from '@/pages/zl/zlRoomStatusSetting'
import zlPriceSetting from '@/pages/zl/zlPriceSetting'

import zlCtripConfig from '@/pages/zl/ZlCtripConfig/ZlCtripConfigList'
import zlFliggyConfig from '@/pages/zl/ZlFliggyConfig/ZlFliggyConfigList'
import zlOpenConfig from '@/pages/zl/zlOpenConfig/zlOpenConfigList'
import housePriceCode from '@/pages/zl/housePriceCode/housePriceCode'

// 财务稽核
import FinancialAuditTag from '@/pages/financialAudit/tab.vue'
import BillChecking from '@/pages/financialAudit/BillChecking'
import BillCheckingLog from '@/pages/financialAudit/billCheckingLog/BillCheckingLog'
import BillPostilLog from '@/pages/financialAudit/billPostilLog'
import InvoiceList from '@/pages/financialAudit/invoiceManage/invoiceList.vue'
import OutsideBillOrder from '@/pages/financialAudit/OutsideBillOrder/OutsideBillOrder.vue'

// 房务管理
import roomServiceTab from '@/pages/roomService/tab.vue'
import LostArticlesList from '@/pages/roomService/lostArticles/LostArticlesList.vue'
import RoomPatternPage from '@/pages/roomService/roomState/RoomPattern.vue'
import RoomManager from '@/pages/roomService/roomManager/RoomManager.vue'
import RepairRecordList from '@/pages/roomService/repairRecord/RepairRecordList.vue'
import RoomStatePrint from '@/pages/roomService/roomStatePrint/RoomStatePrint.vue'
import StateLogList from '@/pages/roomService/stateLog/StateLogList.vue'
import RoomSweepingLogList from '@/pages/roomService/RoomSweepingLog/RoomSweepingLogList.vue'

//交班
import shiftData from '@/pages/shiftData/tab.vue'
import advanceClass from '@/pages/shiftData/advanceClass.vue'
import advanceClassInf from '@/pages/shiftData/advanceClass.vue'
import advanceClassView from '@/pages/shiftData/advanceClassView.vue'

import TestVue from '@/pages/systemSet/TestVue'


Vue.use(Router)
/**
 * 项目启动就有权限
 * @type {*[]}
 */
export const constantRouterMap = [
  // 登录
  { path: '/login', hidden: true, component: Login, name: '登录' },
  { path: '/404', hidden: true, component: NotFound, name: '404页面' },
  { path: '/classSelection', hidden: true, component: ClassSelection, name: '班次选择' },
  {
    path: '/',
    component: Home,
    name: '首页',
    alias: 'Home',
    meta: { icon: 'fa-bank', noCache: true },
    children: [
      // {path: '/index', component: IndexPage, name: '首页1'},
      // {path: '/index', component: AtrialCenterTab, name: '首页1'},
      {
        path: '/atrialCenter',
        component: AtrialCenterTab,
        name: '房态图',
        meta: { icon: 'fa-home', noCache: true },
        hidden: false,
        children: [
          { path: '/atrialCenter/RoomPattern', component: RoomPattern, label: '房态图' },
          { path: '/atrialCenter/RoomTable', component: RoomTable, label: '房态表' },
          { path: '/atrialCenter/ForwardHousing', component: ForwardHousing, label: '远期房态' },
          { path: '/atrialCenter/HousekeepingList', component: HousekeepingList, label: '问题房态列表' },
          { path: '/atrialCenter/GoodsManageTag', component: GoodsManageTag, label: '物品管理' },
          { path: '/atrialCenter/AccountStatement', component: AccountStatement, label: '催账报表' },
          { path: '/atrialCenter/JointRealManage', component: JointRealManage, label: '联房管理' },
          { path: '/reportCenter/ShiftReport', component: ShiftTab, label: '交班报表' },
          { path: '/reportCenter/EmergencyReport', component: EmergencyReport, label: '应急报表' },
        ]
      },
      {
        path: '/reserveManage',
        component: ReserveManageTag,
        name: '预定管理',
        hidden: false,
        children: [
          { path: '/reserveManage/addReserve', component: AddReserve, label: '新增预定' },
          { path: '/reserveManage/teamReserve', component: TeamReserve, label: '团队预定' },
          { path: '/reserveManage/listReserve', component: ListReserve, label: '订单列表' },
          { path: '/reserveManage/miniappOrder', component: MiniappOrderList, label: '小程序订单' }
        ]
      },
      {
        path: '/checkInManage',
        component: CheckInManageTab,
        name: '入住管理',
        hidden: false,
        children: [
          { path: '/checkInManage/checkInSearch', component: CheckInSearch, label: '入住查询' },
          { path: '/checkInManage/teamSearch', component: TeamSearch, label: '团队查询' },
        ]
      },
      {
        path: '/shiftData',
        component: shiftData,
        name: '交班',
        hidden: false,
        children: [
          { path: '/shiftData/advanceClass', component: advanceClass, label: '交班预览' },
          { path: '/shiftData/advanceClassInf', component: advanceClassInf, label: '交班信息查询' },
          { path: '/shiftData/advanceClassView', component: advanceClassView, label: '交班账务查询' },
        ]
      },
      { path: '/wxOpen', component: WxOpenTab, name: '微信开门', hidden: false },
      {
        path: '/customerRelation',
        component: CustomerRelationTag,
        name: '客户关系',
        hidden: false,
        children: [
          { path: '/customerRelation/memberManage', component: MemberManage, label: '会员管理' },
          { path: '/customerRelation/guestManage', component: GuestManage, label: '客人管理' },
          { path: '/customerRelation/protocolManage', component: ProtocolManage, label: '协议管理' },
          { path: '/customerRelation/intermediary', component: intermediaryTab, label: '协议管理' },

          { path: '/customerRelation/virtualOrder', component: VirtualOrder, label: '虚拟账单' },
          { path: '/customerRelation/invoice', component: Invoice, label: '发票' },
          { path: '/customerRelation/passengerInformationUploading', component: PassengerInformationUploading, label: '旅客信息上传' }
        ]
      },
      { path: '/smsMarketing', component: SmsMarketingTag, name: '短息营销', hidden: false },
      {
        path: '/reportCenter',
        component: ReportCenterTag,
        name: '报表中心',
        alias: 'ReportCenterTag',
        hidden: false,
        children: [
          { path: '/reportCenter', component: ReportDefaultPage, label: '默认页' },
          { path: '/reportCenter/receiptsReport', component: ReceiptsReportPage, label: '收银员收款报表' },
          { path: '/reportCenter/admissionAccount', component: AdmissionAccountPage, label: '收银入账明细报表' },
          { path: '/reportCenter/accountSummaryReport', component: AccountSummaryReportPage, label: '收银入账汇总报表' },
          { path: '/reportCenter/narpCheck', component: NightAuditRentPriceCheck, label: '夜审房费前核对报表' },
          { path: '/reportCenter/dailyReport', component: ManagDailyReport, label: '管理层日报表' },
          { path: '/reportCenter/roomDailyReport', component: ManagRoomDailyReport, label: '查看每天的订房报表情况' },
          { path: '/reportCenter/managerDailyReport', component: ManagerDailyReport, label: '经理日报' },
          { path: '/reportCenter/managerDailyTimeReport', component: ManagerDailyTimeReport, label: '经理时间段报表' },
          { path: '/reportCenter/houseDoBusinessStatistics', component: ManaghouseDoBusinessStatistics, label: '查看每天的订房报表情况' },
          { path: '/reportCenter/salesGuests', component: ManagSalesGuests, label: '销售分析报表-客人来源' },
          { path: '/reportCenter/salesAgreement', component: ManagSalesAgreement, label: '销售分析报表-协议单位' },
          { path: '/reportCenter/salesAgreementConsumptionDetails', component: ManagSalesAgreementConsumptionDetails, label: '销售分析报表-协议单位' },
          { path: '/reportCenter/historicalRoomExchange', component: HistoricalRoomExchange, label: '历史换房报表' },
          { path: '/reportCenter/offsetDetail', component: OffsetDetail, label: '冲减明细报表' },
          { path: '/reportCenter/rentContract', component: RentContract, label: '房租合约报表' },
          { path: '/reportCenter/historyHousePriceInfo', component: HistoryHousePriceInfo, label: '历史房价信息报表' },
          { path: '/reportCenter/hourRoomCancel', component: HourRoomCancel, label: '日租钟点取消报表' },
          { path: '/reportCenter/historyStore', component: HistoryStore, label: '历史离店报表' },
          { path: '/reportCenter/receptionRoom', component: ReceptionRoom, label: '接待房报表' },
          { path: '/reportCenter/turnoverOfBusinessIncome', component: TurnoverOfBusinessIncome, label: '历史离店报表' },
          { path: '/reportCenter/goodsConsumeList', component: GoodsConsumeList, label: '商品部商品消费明细表' },
          { path: '/reportCenter/bookingAnalysisReport', component: BookingAnalysisReportPage, label: '预订分析报表' },
          { path: '/reportCenter/historyExchangeHouses', component: HistoryExchangeHouses, label: '历史换房报表' },
          { path: '/reportCenter/historyGuestsBalance', component: HistoryGuestsBalance, label: '历史在店宾客余额及押金报表' },
          { path: '/reportCenter/memberRechargeBill', component: MemberRechargeBill, label: '会员充值发票报表' },
          { path: '/reportCenter/memberBenefit', component: MemberBenefit, label: '会员发展效益表' },
          { path: '/reportCenter/integralDetailList', component: IntegralDetailList, label: '会员积分明细报表' },
          { path: '/reportCenter/regionTouristsList', component: RegionTouristsList, label: '地域客源统计报表' },
          { path: '/reportCenter/memberCardList', component: MemberCardList, label: '会员发卡报表' },
          { path: '/reportCenter/warehouseBalanceList', component: WarehouseBalanceList, label: '仓库结存统计报表' },
          { path: '/reportCenter/companyDetail', component: CompanyDetail, label: '协议单位佣金明细报表' },
          { path: '/reportCenter/boardroomList', component: BoardroomList, label: '会议室报表' },
          { path: '/reportCenter/linenLossReport', component: LinenLossReport, label: '布草损耗明细报表' },
          { path: '/reportCenter/wxPaymentBalance', component: WxPaymentBalance, label: '微信支付对账明细查询' },
          { path: '/reportCenter/TurnoverDailyDetail', component: TurnoverDailyDetail, label: '营业收入日报' },
          { path: '/reportCenter/TurnoverMonthDetail', component: TurnoverMonthDetail, label: '营业收入月报' },
          { path: '/reportCenter/leaseRateDaily', component: LeaseRateDaily, label: '入住率日报' },
          { path: '/reportCenter/leaseRateMonth', component: LeaseRateMonth, label: '入住率月报' },
          { path: '/reportCenter/businessDetail', component: BusinessDetail, label: '入住率月报' },
          { path: '/reportCenter/TurnoverDaily', component: TurnoverDaily, label: '营业日报' },
          { path: '/reportCenter/TurnoverMonth', component: TurnoverMonth, label: '营业月报' },
          { path: '/reportCenter/TurnoverYear', component: TurnoverYear, label: '营业年报' },
          { path: '/reportCenter/TurnoverTimeQuantum', component: TurnoverTimeQuantum, label: '营业月报' },
          { path: '/reportCenter/roomTypeCheckInAnalysis', component: RoomTypeCheckInAnalysis, label: '入住分析表（按房型）' },
          { path: '/reportCenter/invoiceSummary', component: InvoiceSummary, label: '结账汇总表（自定义类明细）' },
          { path: '/reportCenter/CashFlowDetails', component: CashFlowDetails, label: '现金流明细报表' },
        ]
      },
      {
        path: '/stock',
        component: StockTab,
        name: '库存',
        hidden: false,
        children: [
          // {path: '/stock/stockopr', name: 'stockopr', component: StockFunction, label: '库存功能'},
          // {path: '/stock/setting',  component: StockSetUp, label: '库存相关设置'},
          { path: '/stock/applications', component: Application, label: '物品申领' },
          { path: '/stock/applicationList', component: ApplicationList, label: '申领记录' },
          { path: '/stock/inventoryIn/O:outId', component: InventoryIn, label: '入库' },
          { path: '/stock/stockList', component: StockList, label: '库存' },
          { path: '/stock/inventoryConsumes', component: InventoryConsume, label: '消耗' },
          { path: '/stock/inventoryConsumeList', component: InventoryConsumeList, label: '消耗记录' },
          { path: '/stock/InventoryConsumeRecord/O:outId', component: InventoryConsumeDetail, label: '消耗详细' },
          { path: '/stock/takeStocks', component: TakeStock, label: '库存盘点' },
          { path: '/stock/takeStockList', component: TakeStockList, label: '盘点记录' },
          { path: '/stock/storageSetting', component: StorageSetting, label: '仓库设置' },
        ]
      },

      {
        path: '/financialAudit',
        component: FinancialAuditTag,
        name: '财务稽核',
        hidden: false,
        children: [
          { path: '/financialAudit/billChecking', component: BillChecking, label: '订单对账' },
          { path: '/financialAudit/billCheckingLog', component: BillCheckingLog, label: '对账记录' },
          { path: '/financialAudit/billPostilLog', component: BillPostilLog, label: '账单批注记录' },
          { path: '/financialAudit/InvoiceList', component: InvoiceList, label: '发票管理' },
          { path: '/financialAudit/outsideBillOrder', component: OutsideBillOrder, label: '外账单管理' },
          // {path: '/financialAudit', component: OffsetDetail, label: '冲减明细报表'}
        ]
      },
      { path: '/dumbHouse', component: DumbHouseTag, name: '哑房账', hidden: false },
      { path: '/commodityDept', component: CommodityDeptTag, name: '商品部', hidden: false },
      { path: '/stock', component: StockTag, name: '库存', hidden: false },
      { path: '/conferenceRoom', component: ConferenceRoomTag, name: '会议室', hidden: false },
      {
        path: '/operators',
        perm: 'pms:dir:operatorManage',
        component: OperatorsTag,
        name: '操作员管理',
        hidden: false,
        children: [
          // {path: '/operators/operManager' component: Operators, label: '操作员管理'},
          { path: '/operators/modifyThePassword', component: ModifyThePassword, label: '修改密码' },
          { path: '/operators/logBrowsing', component: LogBrowsing, label: '日志浏览' },
          { path: '/operators/logRflRecord', component: LogRflRecord, label: '制卡日志' },
          // {path: '/operators/roleManagement', component: RoleManagement, label: '角色管理'},
          { path: '/operators/employeeManagement', component: EmployeeManagement, label: '员工管理' },
          { path: '/operators/nightTrialRecord', component: NightTrialRecord, label: '夜审记录查询' },
          { path: '/operators/attendanceClass', component: AttendanceClassList, label: '班次管理' },
          { path: '/operators/attendanceGroup', component: AttendanceGroupList, label: '排班管理' },
          { path: '/operators/attendancePlan', component: AttendancePlanList, label: '排班' },
          { path: '/operators/attendanceSetting/:groupId', component: AttendanceGroupSettingEdit, label: '设置参数' },
        ]
      },
      {
        path: '/systemSet',
        perm: 'pms:dir:systemSet',
        component: SystemSetTag,
        name: '系统设置',
        hidden: false,
        children: [
          { path: '/systemSet/paramsSetting', component: SystemParameter, label: '系统参数设置' },
          { path: '/systemSet/hotelSetting', component: HotelSetting, label: '酒店设置' },
          { path: '/systemSet/userSetting', component: MembershipRelated, label: '会员相关设置' },
          { path: '/systemSet/roomSetting', component: RoomSetting, label: '客房设置' },
          { path: '/systemSet/hourRoomSetting', component: HourRoomSetting, label: '钟点房设置' },
          { path: '/systemSet/specialRoomSetting', component: SpecialRoomSetting, label: '特殊房设置' },
          { path: '/systemSet/dailyRoomSetting', component: DailyRoomSetting, label: '全天房设置' },
          { path: '/systemSet/settleSetting', component: ConsumerProjects, label: '消费项目设置' },
          { path: '/systemSet/channelManage', component: ChannelManagement, label: '渠道管理' },
          { path: '/systemSet/projectSetting', component: ProjectSetting, label: '入账项目显示设置' },
          { path: '/systemSet/priceSetting', component: PriceSetting, label: '价格设置' }, ,
          { path: '/systemSet/marketingSetting', component: marketingSetting, label: '营销' },
          { path: '/systemSet/pay', component: payConfig, label: '支付配置' },
          { path: '/systemSet/hotelHardware', component: hotelHardware, label: '酒店硬件' },
          { path: '/systemSet/roomLockParam', component: roomLockParam, label: '房锁设置' },
          // {path: '/systemSet/zlRoomStatusSetting', component: zlRoomStatusSetting, label: '直连房态设置'},
          // {path: '/systemSet/zlPriceSetting', component: zlPriceSetting, label: '直连价格设置'},
          { path: '/systemSet/iframe', component: TestVue, label: '支付配置' },
        ]
      },
      {
        path: '/zl',
        perm: '',
        component: zl,
        name: '直连',
        hidden: false,
        children: [
          { path: '/zl/zlOpenConfig', component: zlOpenConfig, label: '直连配置' },
          { path: '/zl/zlCtripConfig', component: zlCtripConfig, label: '携程直连配置' },
          { path: '/zl/zlFliggyConfig', component: zlFliggyConfig, label: '飞猪直连配置' },
          { path: '/zl/zlRoomStatusSetting', component: zlRoomStatusSetting, label: '直连房态设置' },
          { path: '/zl/zlPriceSetting', component: zlPriceSetting, label: '直连价格设置' },
          { path: '/zl/housePriceCode', component: housePriceCode, label: '房价代码设置' },
        ]
      },
      {
        path: '/roomService',
        component: roomServiceTab,
        name: '房务管理',
        hidden: false,
        children: [
          { path: '/roomService/RoomPattern', component: RoomPatternPage, label: '房态' },
          { path: '/roomService/RoomManager', component: RoomManager, label: '房间管理' },
          { path: '/roomService/RepairRecordList', component: RepairRecordList, label: '维修记录管理' },
          { path: '/roomService/RoomStatePrint', component: RoomStatePrint, label: '房态打印' },
          { path: '/roomService/StateLogList', component: StateLogList, label: '房态日志' },
          { path: '/roomService/RoomSweepingLogList', component: RoomSweepingLogList, label: '房扫查询' },
          { path: '/roomService/LostArticlesList', component: LostArticlesList, label: '客人物品管理' },
        ]
      },
      { path: '/linen', component: LinenTag, name: '布草', hidden: false }
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
