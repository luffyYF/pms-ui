y<template>
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
        </el-form-item>
    </el-form>
    <el-table v-loading="loading" ref="singleTable" size="mini" :cell-style="function() {return 'font-size:10px;-webkit-text-size-adjust: none;'}" :expand-row-keys="orderExpands" row-key="orderNo" :data="tableData" filter-change="handlerFilterChange" @expand-change="handExpandChange" border max-height="628">
      <el-table-column type="expand" width="30">
      
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
      <el-table-column label="渠道" width="80">
        <template slot-scope="scope">
          {{scope.row.guestDtos[0].channelTypeName}}
        </template>
      </el-table-column>
      <el-table-column label="抵店日期" width="160" prop="beginDate">
      </el-table-column>
      <el-table-column label="离店时间" width="160" prop="endDate">
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
      <el-table-column label="状态" width="100">
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
  </section>
</template>
<script>

  export default {
    components: {},
    data () {
      return {
        tableData:[],
        formInline:{}
      }
    },
    created () {
    },
    watch: {
      filterText: function (value) {}
    },
    methods: {
      init() {
        this.list()
      },
      list(){}
    },
    filters: {

    },
    mounted () {
      this.init()
    }
  }
</script>
<style scoped>

</style>
