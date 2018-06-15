<template>
  <section>
    <el-col :span="24">
      <el-form ref="chenkInSearchData" :inline="true" :model="chenkInSearchData" size="mini" label-width="80px"  class="demo-form-inline">
        <el-row>
          <!-- <el-form-item label="快捷搜索">
            <el-radio-group v-model="chenkInSearchData.quickSearch" size="small">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="在住"></el-radio-button>
              <el-radio-button label="预离"></el-radio-button>
            </el-radio-group>
          </el-form-item> -->
        </el-row>
        <el-form-item label="　　房型">
          <el-select v-model="chenkInSearchData.roomTypePk" placeholder="全部房型" clearable>
            <el-option
              v-for="(item,index) in roomTypeOptions"
              :key="index"
              :label="item.typeName"
              :value="item.typePk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="　　房号">
          <el-input v-model="chenkInSearchData.roomNumber" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="　预订人">
          <el-input v-model="chenkInSearchData.userName" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="　入住人">
          <el-input v-model="chenkInSearchData.guestName" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="　入住人手机号">
          <el-input v-model="chenkInSearchData.guestPhone" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="　组单号">
          <el-input v-model="chenkInSearchData.orderNo" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="组单名称">
          <el-input v-model="chenkInSearchData.name" clearable style="width: 178px;"></el-input> 
        </el-form-item>
        <el-form-item label="组单状态">
          <el-select v-model="chenkInSearchData.orderStatus" placeholder="全部状态" clearable>
            <el-option v-for="(value,key) in orderStatusMap" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="价格方案">
          <el-select v-model="chenkInSearchData.price" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(price,index) in priceList.tableList" :key="index" :label="price.schemeName" :value="price.schemePk"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="房间数量">
          <el-input v-model="filterText" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="开始时间"> 
          <el-date-picker
            v-model="chenkInSearchData.beginDate"
            align="right"
            type="date"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd"
            :picker-options="startTimeOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="chenkInSearchData.endDate"
            align="right"
            type="date"
            placeholder="请选择结束时间"
            value-format="yyyy-MM-dd"
            :picker-options="endTimeOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="　　渠道">
          <channel-select v-model="chenkInSearchData.channelTypePk"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList" style="margin-left:15px">搜索订单</el-button>
          <el-button type="primary" icon="el-icon-download" @click="getList" v-if="powerJudge('401602')">导出excel</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4"></el-col>
    <el-table v-loading="loading" style="top: 10px;width:98%;margin:auto"
    :data="tableData" 
    filter-change="handlerFilterChange" 
    height="450"
    border
    stripe>
    <!--  条件过滤
    | globalFilter(chenkInSearchData.roomTypeName) 
    | globalFilter(chenkInSearchData.roomNumber)
    | globalFilter(chenkInSearchData.userName) 
    | globalFilter(chenkInSearchData.guestName) 
    | globalFilter(chenkInSearchData.orderNo) 
    | globalFilter(chenkInSearchData.channelTypePk) 
    | globalFilter(chenkInSearchData.price)
    | globalFilter(chenkInSearchData.name) 
    | globalFilter(chenkInSearchData.beginDate) 
    | globalFilter(chenkInSearchData.endDate)
     -->
      <!-- <el-table-column label="组单号" prop="orderNo">
      </el-table-column>
      <el-table-column label="组单名称" prop="name">
      </el-table-column> -->
      <el-table-column label="预订人" align="center" width="80" prop="userName" fixed="left">
      </el-table-column>
      <el-table-column label="入住人" align="center" width="80" prop="guestName">
      </el-table-column>
      <el-table-column label="渠道" align="center" width="100" prop="channelTypeName">
      </el-table-column>
      <el-table-column label="入住卡号" align="center" width="100" prop="memberCardNo">
      </el-table-column>
      <el-table-column label="入住人手机" align="center" width="120" prop="guestPhone">
      </el-table-column>
      <el-table-column label="证件号码" align="center" width="140" prop="certificateNo">
      </el-table-column>
      <el-table-column label="房号" align="center" width="80" prop="roomNumber">
      </el-table-column>
      <el-table-column label="房型" align="center" width="80" prop="roomTypeName">
      </el-table-column>
      <el-table-column label="房价" align="center" width="80"  prop="price">
      </el-table-column>
      <el-table-column label="已交押金" align="center" width="80" prop="virtualTicketNumber">
      </el-table-column>
      <el-table-column label="消费总额" align="center" width="80" prop="consumerPrice">
      </el-table-column>
      <el-table-column label="余额" align="center" width="80" prop="settlementPrice">
      </el-table-column>
      <el-table-column label="预授权金额" align="center" width="100" prop="groupPayTheAmount">
      </el-table-column>
      <el-table-column label="抵店日期" align="center" width="180" prop="beginDate"> 
      </el-table-column>
      <el-table-column label="离店时间" align="center" width="180" prop="endDate">
      </el-table-column>
      <el-table-column label="状态"  align="center" width="90" prop="orderStatusName">
      </el-table-column>
      <el-table-column label="备注"  align="center"  prop="remark">
      </el-table-column>
      <el-table-column label="操作" align="center" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showOrderInfo(scope.row)">查看订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block checkPagination"  >
        <el-pagination @current-change="getchenkGird" @size-change="sizeChange"  :current-page="chenkInSearchData.pageNum" :page-sizes="[5,10,20,30,40,50]" :page-size="chenkInSearchData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
    <!-- <el-dialog class="patternDialog" top="1vh" :title="orderNo" :visible.sync="dialogVisible" width="980px" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <DialogCheckinVisible ref="checkinDialogRef" />
      </div>
    </el-dialog> -->

    <!-- 订单弹出 -->
    <DialogCheckinVisible ref="checkinDialogRef" />
    
  </section>

</template>
<script>
  import bus from '@/utils/bus'
  import {orderStatusMap} from '@/utils/orm'
  import DialogCheckinVisible from '@/pages/atrialCenter/roomPattern/DialogVisible'
  import {listType} from '@/api/utils/pmsTypeController'
  import {listProject,teamListProject} from '@/api/checkInManage/pmsCheckInManage'
  import { listPriceScheme } from "@/api/systemSet/priceScheme/priceSchemeController";
  import {powerJudge} from '@/utils/permissionsOperation.js'

  export default {
    components: {DialogCheckinVisible},
    data () {
      return {
        orderStatusMap:orderStatusMap,
        dialogVisible:false,
        roomTypeOptions: [],
        channelOptions: [],
        agreementOptions: [],
        industryOptions: [], 
        saleOptions: [],
        chenkInSearchData:{
          // quickSearch: '在住',
          roomTypePk: '',
          channelTypePk:'',
          roomNumber: '',
          userName: '',  
          guestName: '',  
          guestPhone:'',
          orderNo: '', 
          beginDate: '', 
          endDate: '',
          orderStatus: 'CHECKIN',
          name:'',
          pageNum:1,
          pageSize:10
        },
        total:0,
        priceList:[],
        total: 0,
        filterDate: [],
        filterText: '',
        loading: false,
        filters: {systemName: '', realName: ''},
        filterTable: [],
        filterDatea:'',
        filterDate:'',
        radio5:'',
        tableData: [],
        value: '',
        startTimeOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
      }
    },
    created () {
      this.getList();
      this.listMastersType();
      this.selectPriceList();
    },
    watch: {
      filterText: function (value) {}
    },
    methods: {
      showOrderInfo(row) {//查看订单
        // this.dialogVisible = true
        setTimeout(() => {
          this.$refs.checkinDialogRef.initOrderInfo(row.orderPk, 'visitor', row.guestOrderPk)
        },1)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.init()
          })
          .catch(_ => {});
      },
      handlerFilterChange (value) {
        this.total = value.length
        // var offset = (index - 1) * size
        // return items.slice(offset, offset + size)
      },
      selectPriceList(){
        listPriceScheme().then(res =>{
          if(res.code == 1) {
            this.priceList = res.data;
          }
        })
      },
      listMastersType() {//查询分类类型
        const self = this;
        self.roomTypeOptions = [];
        self.channelOptions = [];
        self.agreementOptions = [];
        self.industryOptions = [];
        self.saleOptions = [];
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
      getList () {
        this.loading = true
        const self = this;
        const parameters = self.chenkInSearchData;
        listProject(parameters).then(res => {
          this.loading = false
          this.tableData = res.data.data;
          this.total = res.data.total;
        }).catch(()=>{
          this.loading = false
        })
      },
      getchenkGird(val){
        this.loading = true;
        const self = this;
        self.chenkInSearchData.pageNum = val;
        self.getList();
      },
      sizeChange(val){
        this.loading = true;
        const self = this;
        self.chenkInSearchData.pageSize = val;
        self.getList();
      }
      ,
      powerJudge(id){
        return powerJudge(id);
      }

    },
    mounted () {
      bus.$on('refresh-listReserve', () => { this.getList() })
    }
  }
</script>
<style scoped>
.checkPagination{
  float: right;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 20px;
}
.el-select{
  width: 178px;
}
.el-date-editor.el-input{
  width: 178px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 10px;
}
</style>
<style>
.patternDialog .el-dialog__body{
  display: table;
  min-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
  padding: 0 4px;
}
</style>