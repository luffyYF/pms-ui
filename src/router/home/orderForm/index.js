/**
 * 订单
 */
import orderForm from '$pages/orderForm/index.vue'

const router = {
    path: '/orderForm',
    component: orderForm,
    name: '订单',
    prem: 'pms',
    icon: './static/img/menu/mean_icon5.png',
    children: []
}

export default router
