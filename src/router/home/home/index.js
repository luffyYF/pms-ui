/**
 * 首页默认显示
 * 房态图
 */
import RoomChart from '$pages/roomPattern/index.vue'

const router = {
    path: '/',
    component: RoomChart,
    name: '房态',
    prem: 'pms',
    icon: './static/img/menu/mean_icon1.png',
    hidden: true,
    children: []
}

export default router
