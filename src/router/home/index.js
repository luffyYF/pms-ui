/**
 * 首页
 */

import Home from '$pages/Home.vue'
//index
import index from '@/router/home/home/index'
//房态图
import roomPattern from '@/router/home/roomPattern/index'
//可售
import vendibility from '@/router/home/vendibility/index'
//预定管理
import bookingForm from '@/router/home/bookingForm/index'
//入住管理
import checkIn from '@/router/home/checkIn/index'
//订单
import orderForm from '@/router/home/orderForm/index'
//订单详情
import orderDetails from '@/router/home/orderDetails/index'
//会员
import member from '@/router/home/member/index'
//单位
import agreementUnit from '@/router/home/agreementUnit/index'
//中介
import intermediary from '@/router/home/intermediary/index'

//房间
import chamber from '@/router/home/chamber/index'
//资产
import assets from '@/router/home/assets/index'
//交班
import handOverDuty from '@/router/home/handOverDuty/index'
//财务
import finance from '@/router/home/finance/index'
//报表
import reportForm from '@/router/home/reportForm/index'
//会议室
import conferenceRoom from '@/router/home/conferenceRoom/index'
//系统
import system from '@/router/home/system/index'
//现金付
import cashPayment from '@/router/home/cashPayment/index'
//更多功能
import moreFunctions from '@/router/home/moreFunctions/index'

const router = {
    path: '/',
    component: Home,
    name: '首页',
    alias: 'Home',
    meta: { icon: 'fa-bank', noCache: true },
    hidden: false,
    children: []
}

const children = []
children.push(index)
children.push(roomPattern)
children.push(vendibility)
children.push(bookingForm)
children.push(checkIn)
children.push(orderForm)
children.push(member)
children.push(agreementUnit)
children.push(intermediary)
children.push(chamber)
children.push(assets)
children.push(handOverDuty)
children.push(finance)
children.push(reportForm)
children.push(conferenceRoom)
children.push(system)
children.push(cashPayment)
children.push(moreFunctions)
children.push(orderDetails)


router.children = children

export default router
