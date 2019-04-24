<template>
  <div>
    <!-- form -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">账务管理</h5>
            
            <el-form-item label="返佣时间">
                <el-date-picker
                v-model="datepicker"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker> 
            </el-form-item>
            <el-form-item label="　　房号">
            <el-input v-model="listQuery.roomNumber" placeholder="请输入房间号" clearable style="width: 178px;"></el-input>
            </el-form-item>
            <el-form-item label="　预订人">
            <el-input v-model="listQuery.memName" placeholder="请输入预定人姓名" clearable style="width: 178px;"></el-input>
            </el-form-item>
            <el-form-item label="协议单位" prop="type">
                <el-select style="width:150px;" size="mini" v-model="listQuery.agreementPk" placeholder="协议单位" :clearable="false" >
                    <el-option v-for="y in agreementList" :label="y.unitName" :value="y.agreementPk" :key="y.agreementPk"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList(1)" style="margin-left:15px">查询</el-button>
            <!-- <el-button type="primary" icon="el-icon-download" @click="getList">导出excel</el-button> -->
            </el-form-item>
          
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">账务列表</h5>
      <el-table v-loading="loading" style="top: 10px;width:98%;margin:auto"
    :data="tableData"
    filter-change="handlerFilterChange"
    height="450"
    border
    stripe>
      <el-table-column label="返佣时间" align="center" width="200" prop="commissionTime" fixed="left">
      </el-table-column>
      <el-table-column label="房号" align="center" width="80" prop="roomNumber">
      </el-table-column>
      <el-table-column label="姓名" align="center" width="100" prop="memName">
      </el-table-column>
      <el-table-column label="所属中介" align="center" prop="agreementPk">
          <template slot-scope="scope">
            {{agreementObj[scope.row.agreementPk]}}
          </template>
      </el-table-column>
      <el-table-column label="房费" align="center" prop="roomPrice">
      </el-table-column>
      <el-table-column label="消费" align="center" prop="consumption">
      </el-table-column>
      <el-table-column label="挂账金额" align="center" prop="amountAccount">
      </el-table-column>
      <el-table-column label="返佣金额" align="center"  prop="commission">
      </el-table-column>
      <el-table-column label="审核状态" align="center" width="80" prop="consumption">
          <template slot-scope="scope">
            <span v-if="scope.row.commissionAudit == 'N'">未审核</span>
            <span v-else>已审核</span>
          </template>
          
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
             <el-button type="primary" size="mini" @click="updatePriceClick(scope.row)" style="margin-left:15px">修改</el-button>
             <el-button type="primary" size="mini" v-if="scope.row.commissionAudit == 'N'" @click="updateStatus({commissionPk:scope.row.commissionPk,commissionAudit:'Y'})" style="margin-left:15px">审核</el-button>
          </template>
          
      </el-table-column>
    </el-table>
      <div class="block checkPagination">
      <el-pagination @current-change="getchenkGird" @size-change="sizeChange"  :current-page="listQuery.pageNum" :page-sizes="[5,10,20,30,40,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog class="setBillSettle" title="修改返佣金额" top="150px" :visible.sync="updatePriceDialog" width="400px"
             :close-on-click-modal="false" :before-close="handlemdClose">
            
        <el-form ref="updatePriceObj" size="mini" :rules="rules" :model="updatePriceObj" label-width="110px">
            <el-form-item label="" ></el-form-item>
            <el-form-item label="返佣金额" prop="price" >
                <el-input-number style="width:100%;" :controls="false" v-model="updatePriceObj.price" :precision="2" :min="1" :step="1" size="mini"></el-input-number>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="updatePrice()">确定</el-button>
            <el-button @click="updatePriceDialog = false" size="mini">取 消</el-button>
        </span>
    </el-dialog>
    </div>
  </div>
</template>
<script>
  import {updateStatus, listCommission,updatePrice} from '@/api/customerRelation/ProtocolManage/agreementCommission'
import {allAgreement} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
import { RSA_PKCS1_PADDING } from 'constants';

  export default {
    data () {
      return {
        updatePriceDialog:false,
        dialogVisible:false,
        total:0,
        loading:false,
        priceList:[],
        listQuery:{
            pageNum:1,
            pageSize:10,
            beginDate:"",
            endDate:"",
            roomNumber:"",
            memName:"",
            agreementType:0
        },
        total: 0,
        datepicker:[],
        tableData:[],
        agreementList:[],
        agreementObj:{},
        updatePriceObj:{
            price:0,
            commissionPk:""
        },
        rules: {
          price: [{ required: true, message: '请填写金额', trigger: 'blur' }],
        },
      }
    },
    created () {
      this.getList();
    },
    computed: {
    },
    methods: {
        updatePrice(){
            this.$refs.updatePriceObj.validate(valid => {
                if (valid) {
                    updatePrice(this.updatePriceObj).then(res=>{
                        if(res.code == 1){
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: res.sub_msg
                            });
                            this.updatePriceDialog = false
                        }
                    })
                }
            })
        },
        handlemdClose(){
            this.updatePriceDialog = false
        },
        updatePriceClick(row) {
            this.updatePriceObj.price = row.commission
            this.updatePriceObj.commissionPk = row.commissionPk
            this.updatePriceDialog = true            
        },
        updateStatus(data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                updateStatus(data).then(res=>{
                    if(res.code == 1){
                        this.getList()
                        this.$message({
                            type: 'success',
                            message: res.sub_msg
                        });
                    }
                })
            }).catch(() => {
                     
            });
        },
        allAgreement(){
            allAgreement({type:this.listQuery.agreementType}).then(res=>{
                this.agreementList = res.data
                this.agreementObj = {}
                for(var i=0;i<this.agreementList.length;i++){
                    this.agreementObj[this.agreementList[i].agreementPk] = this.agreementList[i].unitName
                }
                this.agreementList.unshift({
                    agreementPk:"",
                    unitName:"全部"
                })
            })
        },
        init(){
            this.allAgreement()
            this.getList()
        },
      getList () {
        if(this.datepicker != null && this.datepicker.length >0){
          this.listQuery.beginDate = this.datepicker[0]
          this.listQuery.endDate = this.datepicker[1]
        }else{
          this.listQuery.beginDate = ""
          this.listQuery.endDate = ""
        }
        this.loading = true
        listCommission(this.listQuery).then(res => {
          this.loading = false
          this.tableData = res.data.data;
          this.total = res.data.total;
        }).catch(()=>{
          this.loading = false
        })
      },
      getchenkGird(val){
        const self = this;
        this.listQuery.pageNum = val
        self.getList();
      },
      sizeChange(val){
        const self = this;
        this.listQuery.pageSize = val
        this.listQuery.pageNum = 1
        self.getList();
      }
    },
    mounted () {
      
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
.el-select {
  width: 178px;
}
.el-date-editor.el-input {
  width: 178px;
}
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.body-conten{
  position: relative;
  width: 100%;
  background: #f7f7f7;
}
.protocolPrice-tabs{
  box-shadow: none;
}
.addPriceBtn{
  position: absolute;
  z-index: 999;
  top: 6px;
  margin-left: 300px;
}
.fontColor{
  color: red;
  font-style: normal;
}
.distance{
  margin: 0;
}
.width-ipt{
  width: 60px;
}
.price-li{
  width: 60px;
  display: inline-block;
  text-align: center;
}
.positions {
  float: right;
}
</style>
<style>
.protocolPrice-contenter .el-dialog .el-dialog__body {
    padding: 0;
}
.el-dialog{
  width:680px;
}
</style>
