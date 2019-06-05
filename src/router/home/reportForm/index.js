/**
 * 报表
 */
import reportForm from '$pages/reportForm/index.vue'

const router = {
    path: '/reportForm',
    component: reportForm,
    name: '报表',
    prem: 'pms',
    icon: './static/img/menu/mean_icon13.png',
    hidden: true,
    children: []
}

export default router
