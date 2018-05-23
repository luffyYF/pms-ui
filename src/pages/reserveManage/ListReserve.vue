<template>
  <section>
    <el-form :inline="true" size="mini" label-width="80px"  class="demo-form-inline">
      <el-col :span="24">
        <el-form-item label="快捷搜索:">
          <el-radio-group v-model="radio5" size="small">
            <el-radio-button label="今日抵店预订"></el-radio-button>
            <el-radio-button label="取消预订"></el-radio-button>
            <el-radio-button label="NoShow预订"></el-radio-button>
            <el-radio-button label="有效预订"></el-radio-button>
            <el-radio-button label="全部状态"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="预订人:">
          <el-input v-model="filterText" placeholder="请输入预订人" clearable></el-input>
        </el-form-item>
        <el-form-item label="预订卡号:">
          <el-input v-model="filterText" placeholder="请输入预订卡号" clearable></el-input>
        </el-form-item>
        <el-form-item label="入住人:">
          <el-input v-model="filterText" placeholder="请输入入住人" clearable></el-input>
        </el-form-item>
        <el-form-item label="房间数量:">
          <el-input v-model="filterText" placeholder="请输入房间数量" clearable></el-input>
        </el-form-item>
        <el-form-item label="入住时间:">
          <el-date-picker
            v-model="startTime"
            align="right"
            type="date"
            placeholder="请选择入住时间"
            :picker-options="startTimeOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预离时间:">
          <el-date-picker
            v-model="endTime"
            align="right"
            type="date"
            placeholder="请选择结账时间"
            :picker-options="endTimeOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道:">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="价格方案:">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="房型:">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队名称:">
          <el-input v-model="filterText" placeholder="请输入团队名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="组单号:">
          <el-input v-model="filterText" placeholder="请输入组单号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button type="primary" icon="el-icon-search" @click="list">查询</el-button>
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-form>
    <el-table v-loading="loading" :data="tableData | globalFilter(filterText) | pagingFilter(pagination)" filter-change="handlerFilterChange" border>
      <el-table-column label="预订单" prop="orderNo" width="120">
      </el-table-column>
      <!-- numberOfOccupancy-->
      <el-table-column label="操作员" prop="createUserName">
      </el-table-column>
      <el-table-column label="预订人" prop="userName">
      </el-table-column>
      <el-table-column label="预订卡号" prop="reserveCardNo">
      </el-table-column>
      <el-table-column label="预订手机" prop="userPhone" min-width="130">
      </el-table-column>
      <el-table-column label="渠道" min-width="150">
        <template slot-scope="scope">
          <!-- <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{matchChannel(y.channelTypePk)}}</p> -->
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.channelTypeName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="入住人">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.guestName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="入住手机" min-width="130">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.guestPhone}}</p>
        </template>
      </el-table-column>
      <el-table-column label="房型" min-width="130">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.roomTypeName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="房价">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">￥ {{y.currPrice}}</p>
        </template>
      </el-table-column>
      <el-table-column label="担保">
        <template slot-scope="scope">
          <span v-if="scope.row.guaranteeType=='GUARANTEE_ARRIVAL'">担保到达</span>
          <span v-if="scope.row.guaranteeType=='GUARANTEE_ALL'">全程担保</span>
        </template>
      </el-table-column>
      <el-table-column label="时效" prop="keepTime">
      </el-table-column>
      <el-table-column label="抵店日期" width="180">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.beginDate}}</p>
        </template>
      </el-table-column>
      <el-table-column label="离店时间" width="180">
        <template slot-scope="scope">
          <p class="guest-item" v-for="(y,index) in scope.row.guestDtos" :key="index">{{y.endDate}}</p>
        </template>
      </el-table-column>
      <el-table-column label="房间数">
        <template slot-scope="scope">
          <span>{{scope.row.guestDtos.length}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排房情况" min-width="140">
        <template slot-scope="scope">
          <template v-if="getRowrooms(scope.row.guestDtos).rowRooms">
            <span >已排房号：{{getRowrooms(scope.row.guestDtos).rowRooms}}</span><br>
          </template>
          <template v-if="getRowrooms(scope.row.guestDtos).noRowRooms">
            <span >未排房数：{{getRowrooms(scope.row.guestDtos).noRowRooms}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="settlementAmount">
      </el-table-column>
      <el-table-column label="备注" prop="remark">
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showOrderInfo(scope.row)">查看订单</el-button>
          <el-button size="mini" type="danger" :disabled="!powerJudge('400401')" @click="cancelOrder(scope.row)">取消订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-model="pagination"/>

    <!-- DIALOG -->
    <!-- 订单页面 -->
    <DialogCheckinVisible ref="checkinDialogRef" />
    
    <!-- <el-dialog class="patternDialog" top="1vh" :title="orderNo" :visible.sync="dialogVisible" width="980px" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <DialogCheckinVisible ref="checkinDialogRef" />
      </div>
    </el-dialog> -->

  </section>
</template>
<script>
  import bus from '@/utils/bus'
  import DialogCheckinVisible from '@/pages/atrialCenter/roomPattern/DialogVisible'
  import {listReserve, cancelGuestOrder} from '@/api/order/pmsOrderController'
  import {listType} from '@/api/utils/pmsTypeController'
  import {powerJudge} from '@/utils/permissionsOperation.js'

  export default {
    components: {DialogCheckinVisible},
    data () {
      return {
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        radio5: '',
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
      // this.getList()
      //获取渠道
      listType({typeMaster:'CHANNEL'}).then(res=>{
        this.channelArr = res.data
      }).catch(error=>{
      })
    },
    watch: {
      filterText: function (value) {}
    },
    methods: {
      powerJudge(id){
        return powerJudge(id);
      },
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
            guestOrderPks.push(guest.guestOrderPk)
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
      init() {
        this.list()
      },
      list(){
        this.loading = true
        listReserve().then(result => {
          this.tableData = result.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      getRowrooms(guestDots) {
        let rowRooms = []
        let noRowRooms = 0
        guestDots.forEach(guest => {
          if(guest['roomPk'] && guest['roomNumber']){
            rowRooms.push(guest.roomNumber)
          }else{
            noRowRooms++
          }
        });
        return {rowRooms:rowRooms.join(','), noRowRooms: noRowRooms}
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
      }
    },
    filters: {
      
    },
    mounted () {
      bus.$on('closeOrder', () => { this.closeOrderDialog() })
      this.init()
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
  line-height: 4px;
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
</style>
