/**
 * 预订管理
 */
import BookingForm from '$pages/bookingForm/index.vue'
import AllBooking from '$pages/bookingForm/allBooking.vue'
import WalkinBooking from '$pages/bookingForm/walkinBooking.vue'
import TeamBooking from '$pages/bookingForm/teamBooking.vue'
import HourBooking from '$pages/bookingForm/hourBooking.vue'
// import AddReserve from '$pages/bookingForm/addReserve.vue'
// import MiniappOrderList from '$pages/reserveManage/miniapp/MiniappOrderList.vue'

const router = {
    path: '/bookingForm',
    component: BookingForm,
    name: '预定',
    prem: 'pms',
    icon: './static/img/menu/mean_icon3.png',
    children: [
        {path: '/bookingForm/AllBooking', component: AllBooking, prem: 'pms', name: '全部',icon: ''},
        {path: '/bookingForm/walkinBooking', component: WalkinBooking, prem: 'pms', name: '散客预定单',icon: ''},
        {path: '/bookingForm/teamBooking',  component: TeamBooking, prem: 'pms', name: '团队预订单',icon: ''},
        {path: '/bookingForm/hourBooking',  component: HourBooking, prem: 'pms', name: '钟点房预订单',icon: ''},
    ]
}

export default router
