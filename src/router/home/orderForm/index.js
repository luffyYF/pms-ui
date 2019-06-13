/**
 * 订单
 */
import orderForm from '$pages/orderForm/index.vue'
import orderDetails from '$pages/orderForm/orderDetails/index.vue'
import advanceOrder from '$pages/orderForm/advanceOrder/index.vue'
import orderInquiry from '$pages/orderForm/orderInquiry/index.vue'
import teamManage from '$pages/orderForm/teamManage/index.vue'


const router = {
    path: '/orderForm',
    component: orderForm,
    name: '订单',
    prem: 'pms',
    icon: './static/img/menu/mean_icon5.png',
    hidden: true,
    children: [
        { path: '/', component: orderDetails, prem: 'pms', name: '订单详情', icon: '', hidden: true, },
        { path: '/orderForm/orderDetails', component: orderDetails, prem: 'pms', name: '订单详情', icon: '', hidden: true, },
        { path: '/orderForm/advanceOrder', component: advanceOrder, prem: 'pms', name: '预定单', icon: '', hidden: true, },
        { path: '/orderForm/orderInquiry', component: orderInquiry, prem: 'pms', name: '订单查询', icon: '', hidden: true, },
        { path: '/orderForm/teamManage', component: teamManage, prem: 'pms', name: '团队管理', icon: '', hidden: true, }
    ]
}

export default router
