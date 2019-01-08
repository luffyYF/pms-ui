<template>
  <div class="content-body">
    <el-form ref="form" :model="form" :inline="true" size="mini" label-width="80px">
      <div class="bg-reserve">
            <h5 class="info-title">虚拟账单查询</h5>
            <el-form-item  label="组单号" prop="orderNo">
              <el-input v-model="form.orderNo"></el-input>
            </el-form-item>
            <el-form-item  label="房间号" prop="userPk" >
              <el-input v-model="form.roomNumber"></el-input>
            </el-form-item>
            <el-form-item  label="姓名" prop="userPk">
              <el-input v-model="form.memName"></el-input>
            </el-form-item>
            <el-form-item  label="起始日期" prop="beginDate">
            <el-date-picker
              v-model="form.beginDate"
              type="datetime"
              placeholder="起始日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="截止日期" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              type="datetime"
              placeholder="截止日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="getVirtualList" class="btn-margin" type="primary" size="mini">搜索</el-button>
          </el-form-item>
      </div>
      <div class="bg-reserve">
      <h5 class="info-title">协议单位列表</h5>
      <el-table
        :data="tableData"
        border
        fit
        v-loading="loading"
        max-height="600"
        style="width: 100%">
        <el-table-column
          fixed
          prop="orderNo"
          label="账单序号">
        </el-table-column>
        <el-table-column
          prop="memNames"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="roomNumbers"
          label="房号">
        </el-table-column>
        <el-table-column
          fixed
          prop="createTime"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="操作员">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="getVirtualPrint(scope.row.virtualBillPk)">查看</el-button>
            <el-dialog title="虚拟账单明细" 
              width="1200px"
              :append-to-body="true"
              :visible.sync="dialogTableVisible">
              <div class="bg-reserve">
                <h5 class="info-title">虚拟账单明细</h5>
                <div class="info-li">
                  组单号：{{virOrder.pmsVirtualBillPo.orderNo}} 房间号：{{virOrder.pmsVirtualBillPo.roomNumbers}} 姓名： {{virOrder.pmsVirtualBillPo.memNames}}
                  <!-- 人数：9 房价：0.0,0.0,0.0,0.0,0.0,0.0,0.0,500.0,500.0 日期：2018-01-31 10:39:50.0 -->
                </div>
              </div>
              <el-table 
                :data="virOrder.pmsVirtualBillDetailPos"
                border
                fit
                height="400"
                style="width: 100%; margin-top:10px;">
                <el-table-column property="projectName" label="项目"></el-table-column>
                <el-table-column property="consumptionAmount" width="80px" label="消费金额"></el-table-column>
                <el-table-column property="settlementAmount" width="80px" label="结算金额"></el-table-column>
                <el-table-column property="number" width="60px" label="数量"></el-table-column>
                <el-table-column property="roomNumber" width="60px" label="房号"></el-table-column>
                <el-table-column property="name" label="客单号"></el-table-column>
                <el-table-column property="createTime"  width="180px" label="发生日期"></el-table-column>
                <el-table-column property="createUserName" label="操作员"></el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
                <el-table-column property="businessDate" label="营业日期" show-overflow-tooltip></el-table-column>
              </el-table>
              <div style="margin-top:5px;">
                  消费:
                  {{consumptionAmount}}
                  元
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  应收:
                  {{settlementAmount}}
                  元 &nbsp;&nbsp;&nbsp;&nbsp;
                  应收:{{consumptionAmount-settlementAmount}}元
              </div>
            </el-dialog>
            <el-button type="text" @click="dialogVisible = true">删除</el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :append-to-body="true"
              :before-close="handleClose">
              <span>确认删除此账单</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin: 10px 20px;float:right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {virtualList,virtualPrint} from '@/api/pmsVirtualBill/pmsVirtualBill'
  export default {
    components: {},
    data() {
      return {
        form: {
          pageNum:1,
          pageSize:10,
          orderNo:'',
          roomNumber:'',
          memName:'',
          beginDate:'',
          endDate:''
        },
        tableData: [],
        dialogVisible:false,
        dialogTableVisible:false,
        consumptionAmount:0.00,
        settlementAmount:0.00,
        total:0,
        loading: false,
        virOrder:{
          pmsVirtualBillDetailPos:[],
          pmsVirtualBillPo:{}
        },
      };
    },
    methods: {
      getVirtualList(){
        this.loading = true
        virtualList(this.form).then(res=>{
          if(res.code == 1){
            this.tableData = res.data.data
            this.total = res.data.total
          }
          this.loading = false
        })
      },
      getVirtualPrint(virtualBillPk){
        virtualPrint({virtualBillPk:virtualBillPk}).then(res=>{
          this.virOrder = res.data
          this.dialogTableVisible = true;
          this.virMomeyChange();
        })

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleSizeChange(val) {
        this.form.pageSize = val;
        this.pageNum = 1;
        this.getVirtualList();
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.getVirtualList();
      },
      virMomeyChange(){
          var consumptionAmount = 0.00
          var settlementAmount = 0.00
          for(var i=0;i<this.virOrder.pmsVirtualBillDetailPos.length;i++){
            consumptionAmount = consumptionAmount + parseFloat(this.virOrder.pmsVirtualBillDetailPos[i].consumptionAmount)
            settlementAmount = settlementAmount + parseFloat(this.virOrder.pmsVirtualBillDetailPos[i].settlementAmount)
          }
          this.consumptionAmount = consumptionAmount
          this.settlementAmount = settlementAmount
      }
    },
    mounted() {
      this.getVirtualList()
    },
    filters:{
        consumptionAmount(list){
            var money = 0
            for(var i=0;i<list.length;i++){
              if(list[i].consumptionAmount){
                money = money + parseFloat(list[i].consumptionAmount)
              }
            }
            return money.toFixed(2)
        }
    }
  };
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 30px 20px;
  height: 100%;
  overflow: auto;
}
.btn-margin{
  margin:1px 0 0 10px !important;
}
.el-col-6 {
    width: 25%;
    height: 30px;
}
.el-row-heard {
    margin: 10px 0 0 0;
}

.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px 0;
    display: inline-block;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.info-li {
  margin-bottom: 0 !important;
  padding: 0 10px 10px;
}
.el-dialog__body {
    padding: 0px 20px 40px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
.el-table{
  margin-top: 10px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
</style>


