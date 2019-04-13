<template>
  <section>
    <el-form :inline="true" size="mini" label-width="120px"  class="demo-form-inline">
      <el-col :span="24">
        <el-form-item label="快捷搜索:">
          <el-radio-group v-model="formInline.orderStatus" @change="getListForStatus" size="small">
            <el-radio-button label="RESERVE">今日抵店预订</el-radio-button>
            <el-radio-button label="CANCEL">取消预订</el-radio-button>
            <el-radio-button label="NOSHOW">NoShow预订</el-radio-button>
            <el-radio-button label="PAYMENT">有效预订</el-radio-button>
            <el-radio-button label="">全部状态</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="24"> -->
        <el-form-item label="预订人:">
          <el-input v-model="formInline.userName" placeholder="请输入预订人" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="预订卡号:">
          <el-input v-model="filterOrderNo" placeholder="请输入预订卡号" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="预订手机号:">
          <el-input v-model="formInline.userPhone" placeholder="预订人手机号" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="入住人:">
          <el-input v-model="formInline.guestName" placeholder="请输入入住人" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="入住人手机号:">
          <el-input v-model="formInline.guestPhone" placeholder="请输入入住人手机号" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="房间数量:">
          <el-input v-model="formInline.rentCount" placeholder="请输入房间数量" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="抵店日期:">
          <el-date-picker
            v-model="formInline.beginDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入住时间"
            :picker-options="startTimeOptions" style="width: 178px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离店日期:">
          <el-date-picker
            v-model="formInline.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结账时间"
            :picker-options="endTimeOptions"
            style="width: 178px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="　　渠道">
          <channel-select ref="channelRef" v-model="formInline.channelTypePk" style="width: 178px;"/>
        </el-form-item>
        <el-form-item label="房型:">
          <el-select v-model="formInline.roomTypePk" placeholder="全部房型" clearable style="width: 178px;">
            <el-option
              v-for="(item,index) in roomTypeOptions"
              :key="index"
              :label="item.typeName"
              :value="item.typePk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="　　房号">
          <el-input v-model="formInline.roomNumber" placeholder="请输入房间号" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="入住类型:">
          <el-select v-model="formInline.checkInType" placeholder="全部入住类型" clearable style="width: 178px;">
            <el-option
              v-for="(item,index) in checkInTypeMap"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组单号:">
          <el-input v-model="formInline.orderNo" placeholder="请输入组单号" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" @click="list">查询</el-button>
          <el-button type="primary" @click="createExcel" size="mini" >下载预订模板</el-button>
          <el-button size="mini" type="primary" @click="reserveClick">上传预订信息</el-button>
          <!-- <el-upload
            style="display: inline-block;margin-left: 10px"
            :action="getUploadExcelAction()"
            :headers="headers"
            :show-file-list="false">
            <el-button size="mini" type="primary" @click="yuClick">上传预订信息</el-button>
          </el-upload> -->
        </el-form-item>
      <!-- </el-col> -->
    </el-form>
    <el-table v-loading="loading" ref="singleTable" size="mini" cell-style="font-size:10px;-webkit-text-size-adjust: none;" :expand-row-keys="orderExpands" row-key="orderNo" :data="tableData" filter-change="handlerFilterChange" @expand-change="handExpandChange" border max-height="628">
      <el-table-column type="expand" width="30">
        <template slot-scope="scope">
          <orderGuestList  :ref="scope.row.orderNo"/>
          <!-- <el-table :data="scope.row.guestDots" border max-height="500">
           <el-table-column label="入住人" prop="guestName">
          </el-table-column>
          <el-table-column label="入住手机" min-width="180" prop="guestPhone">
          </el-table-column>
          <el-table-column label="房型" min-width="180" prop="roomTypeName" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="房价">
            <template slot-scope="scopes">
              <span v-if="scopes.row.mainFlag == 'Y'">￥ {{scopes.row.currPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="房间号" min-width="180" prop="roomNumber">
            <template slot-scope="scopes">
              <span v-if="scopes.row.roomNumber != null">{{scopes.row.roomNumber}}</span>
              <span v-else>未排房</span>
            </template>
          </el-table-column>
          <el-table-column label="渠道" min-width="180" prop="channelTypeName">
          </el-table-column>
          <el-table-column label="预抵时间" min-width="180" prop="beginDate">
          </el-table-column>
          <el-table-column label="预离时间" min-width="180" prop="endDate">
          </el-table-column>
        </el-table> -->
        </template>
    </el-table-column>
      <el-table-column label="预订单" prop="orderNo" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.orderNo}}</span><br>
          <span v-if="scope.row.auditStatus==0">(审批中...)</span>
          <span v-if="scope.row.auditStatus==1">(审批通过)</span>
          <span v-if="scope.row.auditStatus==2">(审批拒绝)</span>
        </template>
      </el-table-column>
      <el-table-column label="预订人" prop="userName"  width="110">
        <template slot-scope="scope">
          <p class="guest-item">{{scope.row.userName}}</p>
          <p class="guest-item">{{scope.row.userPhone}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column label="预订卡号" prop="reserveCardNo">
      </el-table-column> -->
      <!-- <el-table-column label="预订手机" prop="userPhone" min-width="130">
      </el-table-column> -->
      <el-table-column label="渠道" width="80">
        <template slot-scope="scope">
          <!-- <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.channelTypeName}}</p> -->
          {{scope.row.guestDtos[0].channelTypeName}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="入住人">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.guestName}}</p>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="入住手机" min-width="180">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.guestPhone}}</p>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="房型" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index"><span v-if="y.mainFlag == 'Y'">{{y.roomTypeName}}</span></p>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="房价">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index"><span v-if="y.mainFlag == 'Y'">￥ {{y.currPrice}}</span></p>
        </template>
      </el-table-column> -->
      <el-table-column label="抵店日期" width="160" prop="beginDate">
        <!-- <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.beginDate}}</p>
        </template> -->
      </el-table-column>
      <el-table-column label="离店时间" width="160" prop="endDate">
        <!-- <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.endDate}}</p>
        </template> -->
      </el-table-column>
      <el-table-column label="房间数" width="70" align="center">
        <template slot-scope="scope">
          <span>{{roomCount(scope.row.guestDtos)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排房情况">
        <template slot-scope="scope">
          <template v-if="getRowrooms(scope.row.guestDtos).rowRooms">
            <span >已排房号：{{getRowrooms(scope.row.guestDtos).rowRooms}}</span><br>
          </template>
          <template v-if="getRowrooms(scope.row.guestDtos).noRowRooms">
            <span >未排房数：{{getRowrooms(scope.row.guestDtos).noRowRooms}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
            <template v-if="getOrderStatus(scope.row.guestDtos).noShowCount > 0" >
              <span>NOSHOW：{{getOrderStatus(scope.row.guestDtos).noShowCount}}</span><br>
            </template>
            <template v-if="getOrderStatus(scope.row.guestDtos).reserveCount > 0" >
              <span>预定：{{getOrderStatus(scope.row.guestDtos).reserveCount}}</span><br>
            </template>
            <template v-if="getOrderStatus(scope.row.guestDtos).paymentCount > 0" >
              <span>已支付：{{getOrderStatus(scope.row.guestDtos).paymentCount}}</span><br>
            </template>
            <template v-if="getOrderStatus(scope.row.guestDtos).cancelCount > 0" >
              <span>取消：{{getOrderStatus(scope.row.guestDtos).cancelCount}}</span><br>
            </template>
            <template v-if="getOrderStatus(scope.row.guestDtos).checkinCount > 0" >
              <span>在住：{{getOrderStatus(scope.row.guestDtos).checkinCount}}</span><br>
            </template>
            <template v-if="getOrderStatus(scope.row.guestDtos).leaveCount > 0" >
              <span>结账离店：{{getOrderStatus(scope.row.guestDtos).leaveCount}}</span><br>
            </template>
            <template v-if="getOrderStatus(scope.row.guestDtos).leaveNoPayCount > 0" >
              <span>不结账退房：{{getOrderStatus(scope.row.guestDtos).leaveNoPayCount}}</span><br>
            </template>
            <template v-if="getOrderStatus(scope.row.guestDtos).obligAtionCount > 0" >
              <span>待付款：{{getOrderStatus(scope.row.guestDtos).obligAtionCount}}</span><br>
            </template>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作员" prop="createUserName">
      </el-table-column> -->
      <!-- <el-table-column label="备注" prop="remark">
      </el-table-column> -->
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-if="(scope.row.orderStatus == 'LEAVE' || scope.row.orderStatus == 'LEAVENOPAY') && hasPerm('pms:listReserve:onInvoice') " @click="onInvoiceClick(scope.row.orderNo)">开发票</el-button>
          <el-button size="mini" type="primary" v-if="hasPerm('pms:listReserve:orderDetail')" @click="showOrderInfo(scope.row)">查看</el-button>
          <template v-if="getOrderStatus(scope.row.guestDtos).reserveCount > 0">
            <el-button size="mini" type="danger" v-if="hasPerm('pms:listReserve:cancelOrder')" @click="cancelOrder(scope.row)">取消</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="positions" @size-change="getSizeChange" @current-change="getList" :current-page="formInline.pageNum" :page-size="formInline.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

    <!-- DIALOG -->
    <!-- 订单页面 -->
    <DialogCheckinVisible ref="checkinDialogRef" v-on:closecheckin="init()" />

    <invoice-edit ref="invoiceEditRef"  @callback="listMastersType"></invoice-edit>
    <!-- 预订信息编辑页面 -->
    <reserve-edit ref="reserveEditRef" @freshback="list"></reserve-edit>
  </section>
</template>
<script>
  import invoiceEdit from '@/pages/financialAudit/invoiceManage/invoiceEdit'
  import bus from '@/utils/bus'
  import {orderStatusMap, checkInTypeMap} from '@/utils/orm'
  import DialogCheckinVisible from '@/pages/reserveManage/order/OrderDialog'
  import {listReserve, cancelGuestOrder} from '@/api/order/pmsOrderController'
  import {listChannelType} from '../../api/systemSet/type/typeController'
  import {listType} from '@/api/utils/pmsTypeController'
  import exportExcel from '@/components/download/exportExcel'
  import reserveEdit from './reserveEdit'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  import orderGuestList from './orderGuestList'

  export default {
    components: {DialogCheckinVisible,invoiceEdit,reserveEdit,orderGuestList},
    data () {
      return {
        orderStatusMap:orderStatusMap,
        checkInTypeMap:checkInTypeMap,
        // orderNo:'',
        channelArr: [],
        total: 0,
        filterDate: [],
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {systemName: '', realName: ''},
        filterTable: [],
        filterDatea:'',
        filterDate:'',
        tableData: [],
        roomTypeOptions: [],
        channelOptions: [],
        agreementOptions: [],
        industryOptions: [],
        saleOptions: [],
        value: '',
        startTimeOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        endTimeOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        startTime: '',
        endTime: '',
        formInline: {
          roomTypePk: '',
          orderStatus: 'RESERVE',
          roomNumber:'',
          pageSize: 10,
          pageNum: 1
        },
        typeMaster: 'CHANNEL',
        total: 0,
        companyPk: JSON.parse(localStorage.getItem("current_logon_company")).companyPk,
        orderExpands:[]
      }
    },
    created () {
      this.listMastersType();
      // this.getList()
    },
    watch: {
      filterText: function (value) {}
    },
    methods: {
      onInvoiceClick(orderNo){
        this.$refs.invoiceEditRef.showDialog(null,orderNo);
      },
      // powerJudge(id){
      //   return powerJudge(id);
      // },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.init()
          })
          .catch(_ => {});
      },
      closeOrderDialog() {
        this.init()
      },
      cancelOrder(row) {//取消订单
        this.$confirm('是否取消该预订?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let guestOrderPks = []
          row.guestDtos.forEach(guest => {
            if(guest.mainFlag=='Y') {
              guestOrderPks.push(guest.guestOrderPk)
            }
          })
          cancelGuestOrder({guestOrderPks: guestOrderPks}).then(res=>{
          this.$message({
            type: "success",
            message: "取消成功!"
          });
          this.init();
        })
        })
      },
      listMastersType() {//查询分类类型
        const self = this;
        self.roomTypeOptions = [];
        self.channelOptions = [];
        self.agreementOptions = [];
        self.industryOptions = [];
        self.saleOptions = [];
        // self.roomTypeOptions.push({typeName: '全部房型', typePk: ''});
        listType({typeMasters: 'ROOM_TYPE,CHANNEL,AGREEMENT,INDUSTRY,SALE'}).then(result => {
          const listTypeData = result.data.data;
          for (let index = 0; index < listTypeData.length; index++) {
            const element = listTypeData[index].typeMaster;
            if(element == 'ROOM_TYPE'){
              self.roomTypeOptions.push(listTypeData[index])
            }else if(element == 'CHANNEL'){
              self.channelOptions.push(listTypeData[index])
            }else if(element == 'AGREEMENT'){
              self.agreementOptions.push(listTypeData[index]);
            }else if(element == 'INDUSTRY'){
              self.industryOptions.push(listTypeData[index]);
            }else{
              self.saleOptions.push(listTypeData[index]);
            }
          }
        })
      },
      showOrderInfo(row) {//查看订单
        // this.dialogVisible = true
        // this.orderNo = '组单号：' + row.orderNo;
        setTimeout(() => {
          this.$refs.checkinDialogRef.initOrderInfo(row.orderPk, 'visitor', row.guestDtos[0].guestOrderPk)
        },1)
      },
      handlerFilterChange (value) {
        this.total = value.length
      },
      setRowKey(row){
        return row.orderNo
      },
      handExpandChange(row, expandedRows){
        var that = this
        var bol = false
        for(var i=0;i<expandedRows.length;i++){
          if(row.orderNo == expandedRows[i].orderNo){
            bol = true
            break;
          }
        }
        if(bol){
          this.orderExpands = [row.orderNo]
          console.log(that.$refs)
          this.$nextTick(()=>{
            that.$refs[row.orderNo].showDialog(row.guestDtos)
          })
        }else{
          this.orderExpands = []
        }
      },
      init() {
        this.list()
      },
      list(){
        if(!this.hasPerm('pms:listReserve:list')){
          this.$message({type:'warning', message:'权限不足'})
          return
        }
        this.loading = true
        this.formInline.pageNum = 1;
        listReserve(this.formInline).then(result => {
          this.tableData = result.data.data;
          this.total = result.data.pageSize;
          this.formInline.pageNum = 1;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      getListForStatus() {
        if(!this.hasPerm('pms:listReserve:list')){
          this.$message({type:'warning', message:'权限不足'})
          return
        }
        this.loading = true;
        this.formInline.pageNum = 1;
        listReserve(this.formInline).then(result => {
          this.tableData = result.data.data;
          this.total = result.data.pageSize;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      getList(val){
        if(!this.hasPerm('pms:listReserve:list')){
          this.$message({type:'warning', message:'权限不足'})
          return
        }
        this.loading = true;
        this.formInline.pageNum = val;
        listReserve(this.formInline).then(result => {
          this.tableData = result.data.data;
          this.total = result.data.pageSize;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      getSizeChange(val) {
        if(!this.hasPerm('pms:listReserve:list')){
          this.$message({type:'warning', message:'权限不足'})
          return
        }
        this.loading = true;
        this.formInline.pageSize = val;
        listReserve(this.formInline).then(result => {
          this.tableData = result.data.data;
          this.total = result.data.pageSize;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      getRowrooms(guestDots) {
        let rowRooms = []
        let noRowRooms = 0
        var roomNumber = '无';
        guestDots.forEach(guest => {

          if (guest['mainFlag'] == 'Y') {
            if(guest['roomPk'] && guest['roomNumber']){
              if(guest['roomNumber']!= roomNumber  ){
                rowRooms.push(guest.roomNumber);
                roomNumber = guest['roomNumber']
              }
            }else if(guest['orderStatus'] != "CANCEL" ){
                 noRowRooms++
            }
          }
        });
        return {rowRooms:rowRooms.join(','), noRowRooms: noRowRooms}
      },
      roomCount(guestDots){
        var count = 0;
        // var roomNumber = null;
        for(var i=0 ;i<guestDots.length;i++){
          if(guestDots[i].mainFlag == "Y"){
            // roomNumber = guestDots[i].roomNumber;
            count = count+1;
          }
        }
        return count;
      }
      ,
      getOrderStatus(guestDots) {
        let noShowCount = 0;
        let reserveCount = 0;
        let checkinCount = 0;
        let paymentCount = 0;
        let leaveCount = 0;
        let cancelCount = 0;
        let leaveNoPayCount = 0;
        let obligAtionCount = 0;
        guestDots.forEach(guest => {
          if (guest.mainFlag == "Y") {
            if(guest['orderStatus'] == "RESERVE"){
              reserveCount++;
            }
            if(guest['orderStatus'] == "CHECKIN"){
              checkinCount++;
            }
            if(guest['orderStatus'] == "PAYMENT"){
              paymentCount++;
            }
            if(guest['orderStatus'] == "LEAVE"){
              leaveCount++;
            }
            if(guest['orderStatus'] == "CANCEL"){
              cancelCount++;
            }
            if(guest['orderStatus'] == "NOSHOW"){
              noShowCount++;
            }
            if(guest['orderStatus'] == "LEAVENOPAY"){
              leaveNoPayCount++;
            }
            if(guest['orderStatus'] == "OBLIGATION"){
              obligAtionCount++;
            }
          }
        });
        return {reserveCount: reserveCount,checkinCount: checkinCount,paymentCount: paymentCount,leaveCount: leaveCount,cancelCount: cancelCount,noShowCount: noShowCount,leaveNoPayCount: leaveNoPayCount,obligAtionCount: obligAtionCount}
      },
      matchChannel(typePk) {
        let name = ""
        this.channelArr.forEach(function(channel){
          // console.log("changel:"+channel.typePk)
          if(channel.typePk==typePk){
             name = channel.typeName
          }
        })
        return name
      },
      // 生成excel
      createExcel () {
        exportExcel("/back/order/downloadTemplate?companyPk=" + this.companyPk);
      },
      reserveClick () {
        this.$refs.reserveEditRef.showDialog()
      },
    },
    filters: {

    },
    mounted () {
      bus.$on('closeOrder', () => { this.closeOrderDialog() })
      this.init()
      this.$refs.channelRef.load(false);
    }
  }
</script>
<style>
.patternDialog .el-dialog__body{
  /* display: table; */
  min-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
  padding: 0 4px;
}
</style>

<style scoped>

.guest-item{
  /* line-height: 4px; */
}
.el-select{
  width: 158px;
}
.el-date-editor.el-input{
  width: 158px;
}
.el-form--inline .el-form-item {
    margin-right: 0px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 10px;
}
.el-table--border{
  top: 15px;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 5px 15px;
}
.positions {
  margin-top: 1%;
  float: right;
}
</style>
