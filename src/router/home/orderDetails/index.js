/**
 * 订单
 */
import orderForm from '$pages/orderForm/index.vue'
import orderDetails from '$pages/orderForm/orderDetails/index.vue'

const router = {
    path: '/orderDetails',
    component: orderDetails,
    name: '订单',
    prem: 'pms',
    icon: './static/img/menu/mean_icon5.png',
    hidden: false,
    children: []
}

export default router
