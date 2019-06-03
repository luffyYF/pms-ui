/**
 * 会议室
 */
import conferenceRoom from '$pages/conferenceRoom/index.vue'

const router = {
    path: '/conferenceRoom',
    component: conferenceRoom,
    name: '会议室',
    prem: 'pms',
    icon: './static/img/menu/mean_icon17.png',
    hidden: true,
    children: []
}

export default router
