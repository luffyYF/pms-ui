// 组订单弹出
<template>
  <div>
    <el-dialog class="dialogVisibleClass" top="5vh" 
    :title="dialogVisibleTitle" 
    :visible.sync="dialogVisible" 
    :close-on-click-modal="false" 
    :before-close="dialogVisibleClose"
    width="1120px" >
    <!-- :append-to-body="true" -->
      <div class="pattern-dialog-container">
        <div class="pattern-dialog-title">
          <h5 class="info-title">预定信息</h5>
          <div class="dialog-form-con">
            <el-form ref="form" :inline="true" size="mini" :model="form" label-width="68px">
              <el-col class="dialog-li">
                <el-form-item label="名   称" required>
                  <el-input v-model="form.name" :disabled="currConfirmType=='edit-guest'"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="预订卡号">
                  <el-input v-model="form.reserveCardNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="预订人">
                  <el-input v-model="form.userName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="预订手机">
                  <el-input v-model="form.userPhone" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="是否团体">
                  <el-select v-model="form.isTeam" :disabled="true">
                      <el-option label="否" value="N"></el-option>
                      <el-option label="是" value="Y"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="担 保 方">
                  <el-input v-model="form.guarantee" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="担保类型">
                  <el-select v-model="form.guaranteeType" :disabled="true">
                      <el-option label="无担保" value=""></el-option>
                      <el-option label="担保到达" value="GUARANTEE_ARRIVAL"></el-option>
                      <el-option label="全程担保" value="GUARANTEE_ALL"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="支付方式">
                  <!-- :disabled="currConfirmType=='edit-guest'" -->
                  <el-select v-model="form.payment" >
                    <el-option v-for="(value,index) in paymentMap" :key="index" :value="index" :label="value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="保留时效">
                  <el-input v-model="form.keepTime" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="登记时间">
                  <el-date-picker v-model="reserveTime" type="datetime" placeholder="选择日期时间" :disabled="true"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="dialog-li">
                <el-form-item label="备   注">
                  <el-input v-model="form.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
        <div class="pattern-dialog-content">
          <el-col :span="24" class="reserve-contert">
            <div class="pattern-visitor-button" v-if="currConfirmType!='add-checkin'">
              <!--<el-button size="mini" @click="dialogCommodity = true">商品部</el-button>
               <el-button size="mini" @click="dialogRegimentPayment = true">团付账</el-button> -->
              <el-button size="mini" @click="toDialogPriceChangeHistory">房价变更记录</el-button>
              <el-button size="mini" @click="toDialogOperationLog">操作记录</el-button>
              <!-- <el-button size="mini" @click="dialogPrint = true">打印RC单</el-button> -->
              <!-- <el-popover ref="wakeSort" placement="top">
                <el-button type="primary" size="mini" @click="dialogWake = true">叫醒</el-button>
                <el-button type="primary" size="mini" @click="dialogGroupPrinting = true">团会打印</el-button>
              </el-popover> -->
              <el-button size="mini" v-popover:wakeSort><i class="el-icon-sort"></i></el-button>
              <el-button size="mini" @click="toDialogBorrow">外借<span>({{goodsManageCountMap.wjCount}})</span></el-button>
              <el-button size="mini" @click="toDialogDeposit">寄存<span>({{goodsManageCountMap.jcCount}})</span></el-button>
              <el-button size="mini" @click="toDialogNote">留言<span>({{goodsManageCountMap.lyCount}})</span></el-button>
              <!-- <el-button size="mini" @click="dialogBusinessCard = true">制门卡</el-button> -->
            </div>
            <el-tabs type="border-card" class="card-tabs"  v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="客单" name="visitor">
                <visitor-tag ref="visitorForm" @changeCurrGuest="changeCurrGuest"/>
                <div class="cardtabs-visitor-button">
                  <!-- ========底部按钮操作======== -->
                  <template v-if="currConfirmType=='leave-info'">

                  </template>
                  <template v-else-if="currConfirmType=='add-checkin'">
                    <!-- <el-button size="mini" @click="dialogBatchOccupancy = true">批量入住</el-button> -->
                    <!-- <el-button size="mini" @click="dialogHoldHisCard = true">持他卡入住</el-button> -->
                    <el-button size="mini" @click="saveCheckin" :disabled="islock">保存入住</el-button>
                  </template>
                  <template v-else-if="currOrderInfo.order.auditStatus==null || currOrderInfo.order.auditStatus==1">
                    <el-button size="mini" @click="addGuest" :disabled="this.currGuest.pmsCancelFlag=='Y' || currConfirmType == 'add-checkin' || this.currGuest.orderStatus=='RESERVE' || this.currGuest.orderStatus=='OBLIGATION'">添加客人</el-button>
                    <el-popover ref="occupancySort" placement="top">
                      <el-button type="primary" size="mini">复制入住</el-button>
                      <el-button type="primary" size="mini">添加入住</el-button>
                      <el-button type="primary" size="mini" @click="dialogContinuedLive = true">续住</el-button>
                      <el-button type="primary" size="mini" @click="dialogGroupManag = true">组单管理</el-button>
                      <el-button type="primary" size="mini">减少客人</el-button>
                    </el-popover>
                    <!-- <el-button size="mini" v-popover:occupancySort><i class="el-icon-sort"></i></el-button> -->
                    <el-button size="mini" @click="addReserveGuest" :disabled="currConfirmType == 'add-checkin' || this.currGuest.pmsCancelFlag=='Y' || this.currGuest.orderStatus=='OBLIGATION'">添加预订</el-button>
                    <el-button size="mini" @click="reserveRowRoom" :disabled="this.currGuest.pmsCancelFlag=='Y' || currConfirmType == 'add-checkin' || this.currGuest.orderStatus=='OBLIGATION'">预订排房</el-button>
                    <el-button size="mini" @click="toDialogModifyHomePrice" :disabled="currConfirmType == 'add-checkin' || currGuest.mainFlag=='N' || this.currGuest.pmsCancelFlag=='Y' || this.currGuest.orderStatus=='OBLIGATION'">修改房价</el-button>
                    <el-button size="mini" @click="toReserveManager" :disabled="currConfirmType == 'add-checkin' || this.currGuest.pmsCancelFlag=='Y' || this.currGuest.orderStatus=='OBLIGATION'">预订管理</el-button>
                    <el-button size="mini" @click="showChangeRoom" v-if="form.orderPk" :disabled="this.currGuest.pmsCancelFlag=='Y' || currConfirmType == 'add-checkin' || !this.currGuest.roomPk || this.currGuest.orderStatus=='OBLIGATION'">换房</el-button>
                    <el-button size="mini" @click="confirmClick" :disabled="this.currGuest.pmsCancelFlag=='Y' || this.currGuest.orderStatus=='OBLIGATION'">确定</el-button>
                  </template>
                </div>
              </el-tab-pane>
              <el-tab-pane label="账单" name="bill" :disabled="disabledBill" v-if="currConfirmType!='add-checkin'">
                <bill ref="billTagForm"></bill>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
      </div>
    </el-dialog>

    <el-dialog class="son-dialog" top="8vh" title="换房" :visible.sync="dialogChangeRoom" width="600px" :append-to-body="true">
      <!--<div class="pattern-dialog-container">-->
        <h4>当前房型：{{roomFilterObj.roomTypeName}}</h4>
        <el-row>
          <el-col :span="12">
            可选房型
            <el-select size="mini" v-model="roomFilterObj.roomTypePk" @change="listRowRoomList" :clearable="true" placeholder="全部房型">
              <el-option v-for="item in roomTypeArr"
                :key="item.typePk"
                :label="item.typeName"
                :value="item.typePk">
            </el-option>
          </el-select>
          </el-col>
          <el-col :span="12">
            可选房间号
            <el-input size="mini" type="text" v-model="roomFilterObj.roomNumber"></el-input>
          </el-col>
        </el-row>
        <el-table
          ref="changeRoomTable"
          :data="changeRoomTableData | globalFilter(roomFilterObj.roomNumber)"
          tooltip-effect="dark"
          style="width: 100%"
          height="300"
          size="mini">
          <el-table-column prop="roomNumber" label="房号" width="130" align="center">
          </el-table-column>
          <el-table-column prop="roomTypeName" label="类型" width="130" align="center">
          </el-table-column>
          <el-table-column prop="roomRoomPrice" label="房价" width="100" align="center">
          </el-table-column>
          <el-table-column label="操作"  align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toChangeRoom(scope.row.roomPk)">更换</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!--</div>-->
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogChangeRoom = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog class="son-dialog" title="预定排房" :visible.sync="dialogRowRoom" width="50%" :append-to-body="true" :before-close="handleCloseRowRoom">
      <div class="pattern-dialog-container" style="padding: 0px 4px;">
        <el-table
          ref="rowRoomTable"
          :data="rowRoomTableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="300"
          size="mini">
          <el-table-column prop="roomNumber" label="房号" width="90" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.roomPk">{{scope.row.roomNumber}}</span>
              <el-button size="mini" type="primary" @click="clickForRowRoom(scope.row)" v-else>排房</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="roomTypeName" label="类型" width="100" align="center">
          </el-table-column>
          <el-table-column prop="beginDate" label="预抵日期" width="110" align="center">
          </el-table-column>
          <el-table-column prop="endDate" label="预离日期" width="110" align="center">
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.roomPk" style="color:blue">已排房</span>
              <span v-else style="color:red">未排房</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleCloseRowRoom">关闭</el-button>
      </span>
    </el-dialog>


    <el-dialog class="son-dialog" title="选择房间" :visible.sync="dialogSelectRoom" width="30%" :append-to-body="true">
      <div class="pattern-dialog-container" style="padding: 0px 4px;">
        <div class="select-title">可选房型：{{select_room_type_name}}</div>
        <el-table
          :data="selectRoomTableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="300"
          border
          size="mini">
          <el-table-column prop="roomNumber" label="房号" width="90" align="center">
          </el-table-column>
          <el-table-column prop="roomTypeName" label="类型" width="120" align="center">
          </el-table-column>
          <el-table-column prop="roomStatusName" label="房态" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="submitRowRoom(scope.row)">选择房间</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogSelectRoom = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 外借 -->
    <dialogBorrow ref="dialogBorrowRef" ></dialogBorrow>
    <!-- 寄存 -->
    <dialogDeposit ref="dialogDepositRef" ></dialogDeposit>
    <!-- 留言 -->
    <dialogNote ref="dialogNoteRef" ></dialogNote>
    <!-- 操作记录 -->
    <dialogOperationLog ref="dialogOperationLogRef"></dialogOperationLog>
    <!-- 修改房价 -->
    <dialogModifyHomePrice ref="dialogModifyHomePriceRef"></dialogModifyHomePrice>
    <!-- 价格变更记录 -->
    <dialogPriceChangeHistory ref="dialogPriceChangeHistoryRef"></dialogPriceChangeHistory>

  </div>
</template>
<script>
// 组件通讯
import bus from '@/utils/bus'
// 静态数据
import { paymentMap } from '@/utils/orm'
// 工具
import {formatDate, copyObj} from '@/utils/index'
import {validatePhone} from '@/utils/validate'

// API
import {gmCount} from "@/api/goods/goodsManageController";
import {saveCheckin, findOrder, rowRoomList, rowRoom, changeRoom, editOrder} from '@/api/order/pmsOrderController'
import {listProject,addBill,authBill,checkoutauthBill,listBill,offsetBill,partialCheckoutBill,singleRoomCheckoutBill,splitBill,transBill} from '@/api/bill'
import {listType} from '@/api/utils/pmsTypeController'

// 组件
import VisitorTag from '@/pages/reserveManage/addReserve/Visitor'
// import bill from '@/pages/reserveManage/addReserve/bills'
import bill from '@/pages/reserveManage/addReserve/bill'
import dialogPriceChangeHistory from '@/pages/reserveManage/addReserve/dialogPriceChangeHistory'
import dialogModifyHomePrice from '@/pages/reserveManage/addReserve/dialogModifyHomePrice'
import dialogOperationLog from '@/pages/reserveManage/addReserve/dialogOperationLog'
import dialogBorrow from '@/pages/reserveManage/addReserve/dialogBorrow'
import dialogNote from '@/pages/reserveManage/addReserve/dialogNote'
import dialogDeposit from '@/pages/reserveManage/addReserve/dialogDeposit'

export default {
  components: {
    VisitorTag,
    bill, 
    dialogBorrow, 
    dialogDeposit, 
    dialogNote,
    dialogOperationLog, 
    dialogModifyHomePrice,
    dialogPriceChangeHistory
  },
  data() {
    return {
      /**
       * 页面操作类型
       * edit-guest : 修改客人信息
       * add-guest : 添加客人操作
       * add-reserve : 添加预定操作
       * add-checkin : 保存入住操作
       */
      currConfirmType: '',
      activeName: '',
      dialogVisibleTitle: '',
      disabledBill: false,
      activeCommodity: 'frontGoods',
      openCloseTree: '展开',
      select_room_type_name:'',
      rowRoomSelectGuestPk:'',
      goodsManageCountMap: {},
      currGuestIndex: 0,//当前客单下标
      currOrderPk: '',//当前主订单
      currOrderInfo: {order:{}, guestList:[]},
      reserveTime: new Date(),
      currGuest: {},//当前选中的客单
      regimentPaymentTree: false,
      paymentMap: paymentMap,
      islock:false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogVisible:false,
      dialogCommodity: false,
      dialogRegimentPayment: false,
      batchModification: false,
      dialogPrint: false,
      dialogWake: false, 
      dialogGroupPrinting: false,
      dialogBusinessCard: false,
      dialogChangeRoom: false,
      dialogRowRoom: false,
      dialogSelectRoom: false,
      selectRoomTableData:[],
      changeRoomTableData: [],
      rowRoomTableData: [],
      roomTypeArr:[],
      roomFilterObj: {//过滤可选择的房间数据
        roomTypeName:'',
        roomTypePk:'',
        roomNumber:''
      },
      form:{
        orderPk: null,
        name:'新散客入住',
        reserveCardNo: '',
        userPhone: '',
        isTeam: 'N',
        guarantee: '',
        userName: '',
        guaranteeType:'',
        payment: '0',
        keepTime: '',
        remark: ''
      },
      tableData:[{
        name: ''
      }],
      isIndeterminate: true,
      commodityAddTo:false
    }
  },
  methods: {
    /**
      初始化空表单:保存入住
      @augments room 从房态图传递过来的房间对象
     */
    initEmpty(room) {
      this.dialogVisibleTitle = '办理入住'
      this.dialogVisible = true
      this.form={
        orderNo:null,
        orderPk: null,
        name:'新散客入住',
        reserveCardNo: '',
        userPhone: '',
        isTeam: 'N',
        guarantee: '',
        userName: '',
        guaranteeType:'',
        payment: '0',
        keepTime: '',
        remark: ''
      },
      this.activeName = 'visitor'
      this.disabledBill = true
      this.reserveTime = new Date()
      this.currConfirmType = 'add-checkin'

      //回显房间数据到客单组件
      setTimeout(() => {
        this.$refs.visitorForm.initRoomData(room)
      }, 0);
    },
    /**
      初始化订单数据
      @augments orderPk 主订单主键
      @augments guestOrderPk 客单主键 （可选）
     */
    initOrderInfo(orderPk, activeName, guestOrderPk) {
      this.dialogVisible = true
      this.currOrderPk = orderPk;
      this.activeName = activeName
      this.disabledBill = false
      findOrder({orderPk: orderPk}).then(res=>{
        this.currOrderInfo = res.data;
        this.form = {
          orderPk: res.data.order.orderPk,
          name: res.data.order.name,
          reserveCardNo: res.data.order.reserveCardNo,
          userPhone: res.data.order.userPhone,
          isTeam: res.data.order.isTeam,
          guarantee: res.data.order.guarantee,
          userName: res.data.order.userName,
          guaranteeType: res.data.order.guaranteeType,
          payment: res.data.order.payment+'',
          keepTime: res.data.order.keepTime,
          remark: res.data.order.remark,
          orderNo: res.data.order.orderNo
        }
        this.reserveTime = new Date(res.data.order.createTime)
        this.dialogVisibleTitle = '组单号：'+this.form.orderNo 
        if(this.currOrderInfo.order.auditStatus==0){
          this.dialogVisibleTitle += " (审批中...)";
        }else if(this.currOrderInfo.order.auditStatus==1){
          this.dialogVisibleTitle += " (审批通过)";
        }else if(this.currOrderInfo.order.auditStatus==2){
          this.dialogVisibleTitle += " (审批拒绝)";
        }
        //设置页面类型
        if(res.data.order.pmsCancelFlag=='Y' || res.data.order.orderStatus=='LEAVENOPAY' || res.data.order.orderStatus=='LEAVE' || res.data.order.orderStatus=='NOSHOW'){
          this.currConfirmType = 'leave-info'
        }else{
          this.currConfirmType = 'edit-guest'
        }
          
        //设置下标
        if(guestOrderPk!=null && guestOrderPk!=undefined && guestOrderPk!=''){
          res.data.guestList.forEach((guest,index)=>{
            if(guest.guestOrderPk == guestOrderPk){
              this.currGuestIndex = index
            }
          })
        }
        //初始化客单数据
        this.$nextTick(() => {
          this.$refs.visitorForm.initGuestData(res.data.guestList, this.currGuestIndex)
        });
        //设置当前选中的客单,默认第一个
        this.currGuest = res.data.guestList[this.currGuestIndex]
      });
      //查找物品管理数量
      this.goodsManageCount()
      //加载账单数据
      if(this.activeName=='bill'){
        this.$nextTick(()=>{
           this.$refs.billTagForm.lookupBillList(orderPk);
        })
      }
    },
    // /**
    //  * 打开结账退房
    //  * @augments */
    // initOrderBill(orderPk) {
    //   // this.initOrderInfo(orderPk)
    //   // this.dialogVisible = true
    //   // this.disabledBill = false
    //   // this.activeName = 'bill'
    //   // this.$nextTick(()=>{
    //   //   this.$refs.billTagForm.lookupBillList(orderPk);
    //   // })
    //   // this.activeName = 'bill'
    //   this.initOrderInfo(orderPk, 'bill')
    // },
    goodsManageCount() {
      gmCount({orderPk: this.currOrderPk}).then(res=>{
        this.goodsManageCountMap = res.data
      })
    },
    showChangeRoom() {//更换房间
      this.dialogChangeRoom = true
      // this.listRowRoomList(this.currGuest.roomTypePk)
      this.roomFilterObj.roomTypePk=this.currGuest.roomTypePk
      this.roomFilterObj.roomTypeName = this.currGuest.roomTypeName
      this.listRowRoomList(this.currGuest.roomTypePk)
    },
    listRowRoomList(roomTypePk) { //查找可更换的房间
      let data = {
        roomTypePk: roomTypePk,
        beginDateTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        endDateTime: this.currGuest.endDate
      }
      rowRoomList(data).then(res => {
        this.changeRoomTableData=res.data
      })
    },
    toChangeRoom(roomPk) {//确认更换房间
      this.$confirm('是否更换到该房间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {guestOrderPk:this.currGuest.guestOrderPk, targetRoomPk:roomPk}
        changeRoom(data).then(res=>{
          this.dialogChangeRoom = false
          //更新客单
          this.initOrderInfo(this.currGuest.orderPk, 'visitor')
          this.$message({
            type: 'success',
            message: '更换成功!'
          });
        })
        
      })
    },
    saveCheckin() {//保存入住
      if(this.islock){ 
        return;
      }
      if(!this.formValidate()){
        return;
      }
      const orderPo = this.form
      const guestOrderPo = this.$refs.visitorForm.form
      var submitData = {
        order: orderPo,
        guestOrder: guestOrderPo
      }
      let data = copyObj(submitData)
      //请求参数做特殊处理
      data.order.guaranteeType = submitData.order.guaranteeType ? submitData.order.guaranteeType : null
      data.order.keepTime = submitData.order.keepTime ? submitData.order.keepTime : null
      data.guestOrder.beginDate = submitData.guestOrder.beginDate
      data.guestOrder.endDate = submitData.guestOrder.endDate
      this.islock = true
      saveCheckin(data).then(res=>{
        this.$message({type:'success', message:'入住成功'})
        this.initOrderInfo(res.data, 'visitor')
        this.islock = false;
      }).catch(error=>{
        this.islock = false;
      })
    },
    //表单校验
    formValidate(){
      const orderPo = this.form
      const guestOrderPo = this.$refs.visitorForm.form

      //校验
      if(!guestOrderPo.channelTypePk){
        this.$message({type:'warning', message:'客源渠道不能为空'})
        return false
      }
      if(!guestOrderPo.guestName){
        this.$message({type:'warning', message:'客人姓名不能为空'})
        return false
      }
      if(guestOrderPo.currPrice==null) {
        this.$message({type:'warning', message:'当前房租不能为空'})
        return false
      }
      if(Number(guestOrderPo.currPrice)<0){
        this.$message({type:'warning', message:'当前房租不能小于0'})
        return false
      }
      if(guestOrderPo.deposit==null){
        this.$message({type:'warning', message:'押金不能为空'})
        return false
      }
      if(Number(guestOrderPo.deposit)<0){
        this.$message({type:'warning', message:'请输入正确的押金'})
        return false
      }
      if(!guestOrderPo.beginDate){
        this.$message({type:'warning', message:'抵店日期不能为空'})
        return false
      }
      if(!guestOrderPo.endDate){
        this.$message({type:'warning', message:'离店日期不能为空'})
        return false
      }
      if(!guestOrderPo.guestPhone){
        this.$message({type:'warning', message:'请填写手机号'})
        return false
      }
      if(!validatePhone(guestOrderPo.guestPhone)){
        this.$message({type:'warning', message:'手机号不合法'})
        return false
      }
      if(orderPo.isTeam=='Y'){
        if(guestOrderPo.agreementPk==null || guestOrderPo.agreementPk==''){
          this.$message({type:'warning', message: '协议单位不能为空'})
          return false
        }
      }

      return true
    },
    toCheckout() {//跳转退房
       this.$refs.billTagForm.lookupBillList(this.currOrderPk);
    },
    reserveRowRoom() {//预定排房
      this.rowRoomTableData = []
      this.currOrderInfo.guestList.forEach(guest=>{
        if(guest.orderStatus=='RESERVE' && !guest.roomPk){
          let obj = {
            guestOrderPk: guest.guestOrderPk,
            roomPk: guest.roomPk,
            roomTypePk: guest.roomTypePk,
            roomNumber: guest.roomNumber,
            roomTypeName: guest.roomTypeName,
            beginDate: guest.beginDate,
            endDate: guest.endDate
          }
          if(typeof guest.beginDate == 'object'){
            obj.beginDate = formatDate(guest.beginDate, 'yyyy-MM-dd hh:mm:ss')
            guest.beginDate = formatDate(guest.beginDate, 'yyyy-MM-dd hh:mm:ss')
          }
          if(typeof guest.endDate == 'object'){
            obj.endDate = formatDate(guest.endDate, 'yyyy-MM-dd hh:mm:ss')
            guest.endDate = formatDate(guest.endDate, 'yyyy-MM-dd hh:mm:ss')
          }
          this.rowRoomTableData.push(obj)
        }
      })
      this.dialogRowRoom = true
    },
    clickForRowRoom(row) {//查找可排房的房间列表
      this.selectRoomTableData = []
      this.select_room_type_name = row.roomTypeName
      this.rowRoomSelectGuestPk = row.guestOrderPk
      let data = {
        roomTypePk:row.roomTypePk,
        beginDateTime:row.beginDate,
        endDateTime:row.endDate
      }
      rowRoomList(data).then(res=>{
        this.selectRoomTableData = res.data
        this.dialogSelectRoom = true
      })
    },
    submitRowRoom(room) {//提交排房
      let data = {
        guestOrderPk:this.rowRoomSelectGuestPk,
        roomPk: room.roomPk
      }
      rowRoom(data).then(res=>{
        this.rowRoomTableData.forEach(row=>{
          if(row.guestOrderPk==this.rowRoomSelectGuestPk){
            row.roomPk = room.roomPk
            row.roomNumber = room.roomNumber
          }
        })
        this.dialogSelectRoom = false
        this.$message({type:'success', message:'已排房'})
      })
    },
    toBillTab() {//切换到账单
      this.activeName = 'bill'
      this.$refs.billTagForm.lookupBillList(this.currOrderPk);
    },
    handleCloseRowRoom() {//排房窗口关闭
      this.dialogRowRoom = false
      this.initOrderInfo(this.currOrderPk, 'visitor')
    },
    handleClick(tab, event){
      // if(this.activeName == 'bill') {
      //   // this.$refs.billTagForm.lookupBillList(this.currOrderPk);
      //   this.initOrderBill(this.currOrderPk)
      // }else if(this.activeName=='visitor'){
      // }
      this.initOrderInfo(this.currOrderPk, this.activeName)
      
    },
    dialogVisibleClose() {
      this.dialogVisible = false
      this.$emit('closecheckin')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log('submit!');
    },
    commodityTabsEnter(){
      this.commodityAddTo = true;
    },
    commodityTabsLeave(){
      this.commodityAddTo = false;
    },
    regimenttTree(){
      if(this.regimentPaymentTree) {
        this.regimentPaymentTree = false;
        this.openCloseTree = '展开';
      }else{
        this.regimentPaymentTree = true;
        this.openCloseTree = '收起';
      }
    },
    addGuest() {//添加客人
      this.currConfirmType = 'add-guest'
      this.$refs.visitorForm.parentClearGuest()
    },
    addReserveGuest() {//添加预定
      this.currConfirmType='add-reserve'
      this.$refs.visitorForm.cleanAddReserveGuest()
    },
    changeCurrGuest(guest, index) {//点击客单改变
      this.currGuest = guest
      this.currGuestIndex = index
      if(this.currConfirmType !='leave-info'){
        this.currConfirmType='edit-guest'
      }
    },
    confirmClick() {
      //点击确定  
      if(this.currConfirmType=='edit-guest'){
        //修改客人信息
         if(!this.formValidate()){
          return;
        }
        this.$refs.visitorForm.editGuestInfo()
        //修改主订单信息
        let data = {
          orderPk: this.form.orderPk,
          payment: this.form.payment,
          remark: this.form.remark
        }
        editOrder(data).then(res=>{})
      }
      if(this.currConfirmType=='add-guest'){
        //添加客人操作
        if(!this.formValidate()){
          return;
        }
        this.$refs.visitorForm.parentAddGuest()
      }
      if(this.currConfirmType=='add-reserve'){
        //添加预定操作
         if(!this.formValidate()){
          return;
        }
        this.$refs.visitorForm.addReserveGuest()
      }
    },
    toReserveManager() {//预定管理
      this.$refs.visitorForm.reserveManager()
    },
    toDialogBorrow() {//打开物品外借
      this.$refs.dialogBorrowRef.init(this.currOrderPk);
    },
    toDialogDeposit() {//打开物品寄存
      this.$refs.dialogDepositRef.init(this.currOrderPk);
    },
    toDialogNote() {//打开留言
      this.$refs.dialogNoteRef.init(this.currOrderPk);
    },
    toDialogOperationLog() {//打开操作记录
      this.$refs.dialogOperationLogRef.init(this.currOrderPk);
    },
    toDialogModifyHomePrice() {
      this.$refs.dialogModifyHomePriceRef.init(this.currOrderPk, this.currGuest.guestOrderPk)
    },
    toDialogPriceChangeHistory() {
      this.$refs.dialogPriceChangeHistoryRef.init(this.currOrderPk)
    }
  },
  mounted() {
    bus.$on('toCheckout', () => { this.toBillTab() })
    bus.$on('togmcount', () => { this.goodsManageCount() })
    bus.$on('refreshOrderInfo', (orderPk) => { this.initOrderInfo(orderPk, 'visitor') })
    bus.$on('dialogVisibleClose', () => { this.dialogVisibleClose() })
    listType({typeMaster:'ROOM_TYPE'}).then(res=>{
      this.roomTypeArr = res.data.data;
    }).catch(error=>{
    })
  }
}
</script>
<style scoped>
.pattern-dialog-container{
  padding: 10px;
  padding-top: 20px;

}
.select-title{
  font-weight: bold;
  font-size: 18px;
}
.son-dialog .el-dialog__header{
  padding: 10px 15px;
}
.son-dialog .el-dialog__body{
  padding: 0 4px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
}
.dialog-li{
  width: calc(100% / 5);
}
.dialog-li .el-form-item--mini{
  margin-bottom: 5px;
  margin-right: 0;
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0px 10px;
}
.pattern-dialog-title{
  border: 1px solid #ccc;
  padding-top: 10px;
  margin-bottom: 5px;
  /* height: 145px; */
}
.info-title{
  position: relative;
  z-index: 11;
  top: -22px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.dialog-form-con{
  margin-top: -22px;
  overflow: hidden;
  padding: 10px;
}
.dialog-li .el-form-item--mini{
  margin-bottom: 5px;
  margin-right: 0;
}
.pattern-dialog-content{
  position: relative;
}
.pattern-visitor-button{
  position: absolute;
  z-index: 10;
  margin-top: 4px;
  right: 10px;
  display: block;
}
.pattern-visitor-button .el-button+.el-button{
  margin-left: 3px;
}
.cardtabs-visitor-button{
  margin-bottom: 10px;
  text-align: right;
}
.batchOccupancy-title{
  position: relative;
  right: 0px;
  text-align: right;
  z-index: 999;
  display: inline-block;
}
.batchOccupancy-content .el-form-item{
  margin-bottom: 5px;
}
.batchOccupancy-content .el-date-editor.el-input,
.batchOccupancy-content .el-date-editor.el-input__inner{
  width: 100%;
} 
.el-select--mini,.el-input--mini{
  width: 130px;
}
.commodity-dialog-container{
  width: 100%;
}
.commodity-dialog-title,.regimentPayment-dialog-content{
  padding: 0 15px;
}
.regimentPayment-dialog-title{
  padding: 15px;
}
.batchModification-title{
  padding: 10px 15px;
  display: inline-block;
}
.regimentPayment-li{
  margin-bottom: 5px;
}
.font-size18{
  width: 30px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  color: #f60;
  font-size: 18px;
}
.left{
  float: left;
}
.right{
  float: right;
}
.delClose{
  cursor: pointer;
}
.price{
  color: #ff6600;
  font-size: 18px;
  font-style: normal;
  padding-right: 10px;
}
.print-content{
  background: #fff;
}
.print-sign{
  width: 12px;
  height: 12px;
  display: inline-block;
  background: #fff;
  border: 1px solid #dddddd;
}
.color000{
  background: #000;
  border: 1px solid #000;
}
.book-info {
    padding-top: 15px;
    padding-bottom: 10px;
}
</style>

<style>
.dialogVisibleClass .el-dialog__body{
  min-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
  padding: 0 4px;
}
/* .patternDialog .el-dialog__body{
  min-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
  padding: 0 4px;
} */
</style>
