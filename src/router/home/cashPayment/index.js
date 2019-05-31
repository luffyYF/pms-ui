/**
 * 现金付
 */
import cashPayment from '$pages/cashPayment/index.vue'

const router = {
    path: '/cashPayment',
    component: cashPayment,
    name: '现付账',
    prem: 'pms',
    icon: './static/img/menu/mean_icon15.png',
    hidden: true,
    children: []
}

export default router
