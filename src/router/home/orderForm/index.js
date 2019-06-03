/**
 * 订单
 */
import orderForm from '$pages/orderForm/index.vue'
import orderDetails from '$pages/orderForm/orderDetails/index.vue'

const router = {
    path: '/orderForm',
    component: orderForm,
    name: '订单',
    prem: 'pms',
    icon: './static/img/menu/mean_icon5.png',
    hidden: true,
    children: [
        {path: '/', component: orderDetails, prem: 'pms', name: '订单详情',icon: '', hidden: true,},
        {path: '/orderForm/orderDetails', component: orderDetails, prem: 'pms', name: '订单详情',icon: '',hidden: true,}
    ]
}

export default router
