/**
 * 入住管理
 */
import index from '$pages/checkIn/index.vue'
import All from '$pages/checkIn/allCheckIn.vue'
import Walkin from '$pages/checkIn/walkinCheckIn.vue'
import Team from '$pages/checkIn/teamCheckIn.vue'
import Hour from '$pages/checkIn/hourCheckIn.vue'
// import AddReserve from '$pages/bookingForm/addReserve.vue'
// import MiniappOrderList from '$pages/reserveManage/miniapp/MiniappOrderList.vue'

const router = {
    path: '/checkIn',
    component: index,
    name: '入住',
    prem: 'pms',
    icon: './static/img/menu/mean_icon4.png',
    children: [
        {path: '/checkIn/allCheckIn', component: All, prem: 'pms', name: '全部',icon: ''},
        {path: '/checkIn/walkinCheckIn', component: Walkin, prem: 'pms', name: '散客入住单',icon: ''},
        {path: '/checkIn/teamCheckIn',  component: Team, prem: 'pms', name: '团队入住单',icon: ''},
        {path: '/checkIn/hourCheckIn',  component: Hour, prem: 'pms', name: '钟点房入住单',icon: ''},
        // {path: '/bookingForm/listReserve', component: ListReserve, name: 'OTA预订单'},
        // {path: '/bookingForm/miniappOrder', component: MiniappOrderList, name: '小程序订单'}
    ]
}

export default router
