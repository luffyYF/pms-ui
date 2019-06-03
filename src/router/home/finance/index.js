/**
 * 财务
 */
import finance from '$pages/finance/index.vue'

const router = {
    path: '/finance',
    component: finance,
    name: '财务',
    prem: 'pms',
    icon: './static/img/menu/mean_icon12.png',
    hidden: true,
    children: []
}

export default router
