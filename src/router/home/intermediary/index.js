/**
 * 中介
 */
import intermediary from '$pages/intermediary/index.vue'

const router = {
    path: '/intermediary',
    component: intermediary,
    name: '中介',
    prem: 'pms',
    icon: './static/img/menu/mean_icon8.png',
    hidden: true,
    children: []
}

export default router
