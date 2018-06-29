<template>
  <section>
    <el-col :span="24">
      <el-form :inline="true" ref="form" :model="form" size="mini" label-width="80px"  class="demo-form-inline">
        <el-form-item label="组单状态">
          <el-select v-model="form.orderStatus" placeholder="全部状态" clearable>
            <el-option v-for="(value,key) in orderStatusMap" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住房号">
          <el-input v-model="form.roomNumbers" placeholder="请输入入住房号" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="虚拟客单">
          <el-input v-model="form.orderGuestNo" placeholder="请输入虚拟客单" clearable style="width: 178px;"></el-input>
        </el-form-item> -->
        <el-form-item label="组单号">
          <el-input v-model="form.orderNo" placeholder="请输入组单号" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="团体名称">
          <el-input v-model="form.name" placeholder="请输入团体名称" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="房间数量">
          <el-input v-model="form.roomNum" placeholder="请输入房间数量" clearable style="width: 178px;"></el-input>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker
            v-model="form.beginDate"
            align="right"
            type="date"
            placeholder="请选择入住时间"
            value-format="yyyy-MM-dd"
            :picker-options="startTimeOptions">
          </el-date-picker>
        </el-form-item>
        <!-- yyyy-MM-dd HH:mm:ss -->
        <el-form-item label="结账时间">
          <el-date-picker
            v-model="form.endDate" 
            align="right"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择结账时间"
            :picker-options="endTimeOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4"></el-col>
    <el-table v-loading="loading" 
    :data="tableData" 
    filter-change="handlerFilterChange" border style="width:98%;margin:auto">
      <el-table-column label="组单" align="center" width="110" prop="orderNo" fixed="left">
      </el-table-column>
      <el-table-column label="团体名称" align="center" width="80" prop="name">
      </el-table-column>
      <el-table-column label="入住房数" align="center" width="80" prop="roomNum">
      </el-table-column>
      <el-table-column label="入住房号" align="center" width="200" prop="roomNumbers">
        <template slot-scope="scope">
          <span v-for="(v,i) in scope.row.roomNumbers" v-if="v!='' && v!=null ">
            {{v}}<span v-if="i!=scope.row.roomNumbers.length-1">,</span>
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="虚拟客单号" align="center" width="100" prop="orderGuestNo">
      </el-table-column> -->
      <el-table-column label="入住时间" align="center" width="180"  prop="beginDate">
      </el-table-column>
      <el-table-column label="结账时间" align="center" width="180" prop="endDate">
      </el-table-column>
      <el-table-column label="团付金额" align="center" width="80" prop="teamAmount">
      </el-table-column>
      <el-table-column label="个付金额" align="center" width="80" prop="personalAmount">
      </el-table-column>
      <el-table-column label="消费金额"  align="center" width="80" prop="consumerPrice">
      </el-table-column>
      <el-table-column label="结算金额"  align="center" width="80" prop="settlementPrice">
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark">
      </el-table-column>
      <el-table-column label="操作" align="center" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showOrderInfo(scope.row)">查看订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block teamPagination"  >
        <el-pagination @current-change="getchenkTeamGird" @size-change="sizeChange" :page-sizes="[5,10,20,30,40,50]" :current-page="form.pageNum" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
    <!-- 订单弹出 -->
    <!-- <el-dialog class="patternDialog" top="1vh" :title="orderNo" :visible.sync="dialogVisible" width="980px" :before-close="handleClose"> -->
      <div class="pattern-dialog-container">
        <DialogCheckinVisible ref="checkinDialogRef" />
      </div>
    <!-- </el-dialog> -->
  </section>
</template>
<script>
  import bus from '@/utils/bus'
  import {orderStatusMap} from '@/utils/orm'
  import DialogCheckinVisible from '@/pages/atrialCenter/roomPattern/DialogVisible'
  import {listType} from '@/api/utils/pmsTypeController'
  import {listProject,teamListProject} from '@/api/checkInManage/pmsCheckInManage'
  export default {
    components: {DialogCheckinVisible},
    data () {
      return {
        total: 0,
        form: {
          roomNumbers: '',
          orderGuestNo: '',
          orderNo: '',
          name: '',
          roomNum: '',
          beginDate: '', 
          endDate: '',
          pageNum:1,
          pageSize:10
        },
        orderStatusMap:orderStatusMap,
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {systemName: '', realName: ''},
        filterTable: [],
        filterDatea:'',
        tableData: [],
        total:0,
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
        dialogVisible:false,
        orderNo:'',
      }
    },
    created () {
      this.getList();
    },
    watch: {
      filterText: function (value) {}
    },
    methods: {
      showOrderInfo(row) {//查看订单
        this.dialogVisible = true
        this.orderNo = '组单号：'+row.orderNo
        setTimeout(() => {
          this.$refs.checkinDialogRef.initOrderInfo(row.orderPk, 'visitor')
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
        // this.total = value.length
        // var offset = (index - 1) * size
        // return items.slice(offset, offset + size)
      },
      getList () {
        const self = this;
        var parameters = self.form;
        this.loading = true
        teamListProject(parameters).then(res => {
          this.loading = false
          console.log(res.data)
          this.tableData = res.data.data;
          this.total = res.data.total;
        })  
      },
      getchenkTeamGird(val){
        this.form.pageNum = val;
        this.getList();
      },
      sizeChange(val){
        this.form.pageSize = val;
        this.getList();
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
.teamPagination{
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
.el-table--border{
  top: 10px;
}

</style>
