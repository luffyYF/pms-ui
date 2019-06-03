/**
 * 交班
 */
import handOverDuty from '$pages/handOverDuty/index.vue'

const router = {
    path: '/handOverDuty',
    component: handOverDuty,
    name: '交班',
    prem: 'pms',
    icon: './static/img/menu/mean_icon11.png',
    hidden: true,
    children: []
}

export default router
