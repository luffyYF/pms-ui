/**
 * 首页默认显示
 * 房态图
 */
import RoomChart from '$pages/roomPattern/roomPattern.vue'

const router = {
    path: '/',
    component: RoomChart,
    name: '房态',
    prem: 'pms',
    icon: './static/img/menu/mean_icon1.png',
    children: []
}

export default router
