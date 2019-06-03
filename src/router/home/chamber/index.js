/**
 * 房间
 */
import chamber from '$pages/chamber/index.vue'
import SysFloorRoom from '$pages/chamber/SysFloorRoom.vue'
import SysTypeOfRoom from '$pages/chamber/SysTypeOfRoom.vue'
import SysTypeOfVirtualRoom from '$pages/chamber/SysTypeOfVirtualRoom.vue'
import SysLeasehold from '$pages/chamber/SysLeasehold.vue'
import SysRoomCompensation from '$pages/chamber/SysRoomCompensation.vue'
import SysBan from '$pages/chamber/SysBan.vue'
import SysRepairReason from '$pages/chamber/SysRepairReason.vue'

const router = {
    path: '/chamber',
    component: chamber,
    name: '房间',
    prem: 'pms',
    icon: './static/img/menu/mean_icon9.png',
hidden: true,
    children: [
        {path: '/', component: SysFloorRoom, prem: 'pms', name: '楼层房间管理',icon: ''},
        {path: '/chamber/sysFloorRoom', component: SysFloorRoom, prem: 'pms', name: '楼层房间管理',icon: ''},
        {path: '/chamber/sysTypeOfRoom', component: SysTypeOfRoom, prem: 'pms', name: '房间类型管理',icon: ''},
        {path: '/chamber/sysTypeOfVirtualRoom',  component: SysTypeOfVirtualRoom, prem: 'pms', name: '虚拟房型管理',icon: ''},
        {path: '/chamber/sysLeasehold',  component: SysLeasehold, prem: 'pms', name: '租赁物品管理',icon: ''},
        {path: '/chamber/sysRoomCompensation',  component: SysRoomCompensation, prem: 'pms', name: '客房赔偿设置',icon: ''},
        {path: '/chamber/sysBan',  component: SysBan, prem: 'pms', name: '楼栋管理',icon: ''},
        {path: '/chamber/sysRepairReason',  component: SysRepairReason, prem: 'pms', name: '维修停用原因设置',icon: ''},
    ]
}

export default router
