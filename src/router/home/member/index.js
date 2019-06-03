/**
 * 会员
 */
import member from '$pages/member/index.vue'

const router = {
    path: '/member',
    component: member,
    name: '会员',
    prem: 'pms',
    icon: './static/img/menu/mean_icon6.png',
    hidden: true,
    children: []
}

export default router
