<template>
  <div>
    <!-- form -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">账务管理</h5>     
          <el-form-item v-if="this.listQuery.type == 1" label="单位名称">
            <el-input v-model="listQuery.contactName" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="this.listQuery.type == 0" label="中介名称">
            <el-input v-model="listQuery.contactName" clearable></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="listAgreement()">查询</el-button>
          </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">账套列表</h5>
      <el-table 
      size="mini" 
      border 
      v-loading="loading" 
      :data="tableData" 
      @expand-change="handExpandChange" 
      height="450" 
      
        :expand-row-keys="orderExpands" row-key="agreementPk"   
      style="width: 99%; margin:10px;">
        <!-- <el-table-column prop="companyPk" label="所属分店" align="center" width="120">
        </el-table-column> -->
         <el-table-column type="expand">
            <template slot-scope="props">
                <el-tabs type="border-card" :ref='props.row.agreementPk' v-model="currentRow.activeName" @tab-click="handleClick()">
                    <el-tab-pane label="未结算消费" name="unsettled" >
                        <el-table
                            size="mini" 
                            border 
                            highlight-current-row
                            :data="currentRow.unsettledData" 
                            v-loading="minLoading"
                            height="400px">
                            <el-table-column label="消费时间" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.createTime | formatDate}}
                                </template>
                            </el-table-column>
                            <el-table-column label="客人姓名" prop="memName" align="center">
                            </el-table-column>
                            <el-table-column label="房号" prop="roomNumber" align="center">
                            </el-table-column>
                            <el-table-column label="消费金额" prop="consumptionAmount" align="center">
                            </el-table-column>
                            <el-table-column label="操作员" prop="userName" align="center">
                            </el-table-column>
                            <!-- <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" icon="el-icon-delete" size="mini" @click="removeClick(scope.$index)" >移除</el-button>
                                </template>
                            </el-table-column> -->
                        </el-table> 
                    </el-tab-pane>
                    <el-tab-pane label="已结算消费" name="settled" >
                        <el-table
                            size="mini" 
                            border 
                            highlight-current-row
                            :data="currentRow.settledData" 
                            v-loading="minLoading"
                            height="400px">
                            <el-table-column label="消费时间" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.createTime | formatDate}}
                                </template>
                            </el-table-column>
                            <el-table-column label="客人姓名" prop="memName" align="center">
                            </el-table-column>
                            <el-table-column label="房号" prop="roomNumber" align="center">
                            </el-table-column>
                            <el-table-column label="消费金额" prop="consumptionAmount" align="center">
                            </el-table-column>
                            <el-table-column label="操作员" prop="userName" align="center">
                            </el-table-column>
                        </el-table> 
                    </el-tab-pane>
                    <el-tab-pane label="收款" name="receivables" >
                        <el-table
                            size="mini" 
                            border 
                            highlight-current-row
                            :data="currentRow.receivablesData" 
                            v-loading="minLoading"
                            height="400px">
                            <el-table-column label="消费时间" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.createTime | formatDate}}
                                </template>
                            </el-table-column>
                            <el-table-column label="营业项目" prop="projectName" align="center">
                            </el-table-column>
                            <el-table-column label="结算金额" prop="settlementAmount" align="center">
                            </el-table-column>
                            <el-table-column label="操作员" prop="userName" align="center">
                            </el-table-column>
                        </el-table> 
                    </el-tab-pane>
                    <el-tab-pane label="账套" name="setBill" >
                       <el-table
                            size="mini" 
                            border 
                            highlight-current-row
                            :data="currentRow.setBillData" 
                            v-loading="minLoading"
                            height="400px">
                            <el-table-column label="账套名称" prop="setBillName" align="center">
                            </el-table-column>
                            <el-table-column label="挂账金额" prop="consumptionAmount" align="center">
                            </el-table-column>
                            <el-table-column label="结算金额" prop="settlementAmount" align="center">
                            </el-table-column>
                            <el-table-column label="状态" prop="status" align="center">
                            </el-table-column>
                            <el-table-column label="创建人" prop="userName" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status == 0">未结帐</span>
                                    <span v-else>已结账</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="结账人" prop="settleAccountName" align="center">
                            </el-table-column>
                            <el-table-column label="结账时间" prop="settleAccountTime" align="center">
                            </el-table-column>
                        </el-table> 
                    </el-tab-pane>
                </el-tabs>
            </template>
         </el-table-column>
        <el-table-column label="" align="center">
            <el-table-column prop="contactName" :label="this.listQuery.type == 1?'协议单位':'中介'" align="center" width="100">
            </el-table-column>
            <el-table-column prop="totalAccount" label="已挂账总额" align="center" width="100">
            </el-table-column>
        </el-table-column>
        <el-table-column label="已结算总额" align="center">
            <el-table-column prop="cash" label="现金" align="center" width="100">
            </el-table-column>
            <el-table-column prop="bankCard" label="银行卡" align="center" width="100">
            </el-table-column>
            <el-table-column prop="freeSheet" label="免单" align="center" width="100">
            </el-table-column>
            <el-table-column prop="other" label="其他" align="center" width="100">
            </el-table-column>
        </el-table-column>

        <el-table-column label="" align="center" width="90">
            <el-table-column prop="totalUnsettled" label="未结算总额" align="center" width="100">
            </el-table-column>
            <!-- <el-table-column prop="settleAccountName" label="结账人" align="center" width="150">
            </el-table-column> -->
            <el-table-column prop="billPrice" label="挂账额度" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.billPrice == 0">无限制</span>
                    <span v-else>{{scope.row.billPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="挂账剩余额度" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.billPrice == 0">无限制</span>
                    <span v-else>{{scope.row.billPrice - scope.row.totalAccount}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="160">
                <!-- 操作 -->
                <template slot-scope="scope">
                    <el-button type="primary" @click="settleAccountClick(scope.row,listQuery.type)" size="mini">结账</el-button>
                </template>
            </el-table-column>

        </el-table-column>
        
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="getNumChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- <setBillEdit ref="setBillEditRef" @callback="listAgreement()"/> -->
    <settleAccounts ref="settleAccountsRef" @callback="listAgreement()"/>
  </div>
</template>

<script>

// import setBillEdit from './setBillEdit'
import settleAccounts from './unitSettleAccounts'
import {addSetBill,updateSetBill,listAgreement} from '@/api/customerRelation/ProtocolManage/setBill'
import {listBillByAgreement,listSettleBillByAgreement,listSetBillByAgreementPk} from '@/api/bill'
// import {allAgreement} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
import moment from "moment"
export default {
  components:{
    moment,settleAccounts
  },
  data() {
    return {
        loading:false,
        listQuery:{
            pageSize:10,
            pageNum:1,
            contactName:"",
            type:1
        },
        tableData: [],
        total: 0,
        orderExpands:[],
        activeName:"",
        currentAgreementPk:"",
        currentRow:{},
        minLoading:false
        
    };
  },
  created () {
  },
  methods: {
    handleClick (tab, event) {
        if(this.currentRow.activeName == 'unsettled'){
            var data = {
                agreementPk:this.currentRow.agreementPk,
                status:"UN_SET"
            }
            this.listBillByAgreement(data,this.currentRow.activeName)
        }else if(this.currentRow.activeName == 'settled'){
            var data = {
                agreementPk:this.currentRow.agreementPk,
                status:"FINISH"
            }
            this.listBillByAgreement(data,this.currentRow.activeName)
        }else if(this.currentRow.activeName == 'receivables'){
            this.listSettleBillByAgreement()
        }else if(this.currentRow.activeName == 'setBill'){
            this.listSetBillByAgreementPk()
        }
    },
    listSetBillByAgreementPk(){
        this.minLoading = true
        listSetBillByAgreementPk({agreementPk:this.currentRow.agreementPk}).then(res=>{
            this.currentRow.setBillData = res.data
            this.minLoading = false
        })
    },
    listSettleBillByAgreement(){
        this.minLoading = true
        listSettleBillByAgreement({agreementPk:this.currentRow.agreementPk}).then(res=>{
            this.currentRow.receivablesData = res.data
            this.minLoading = false
        })
    },
    listBillByAgreement(data,activeName){
            if(!data.agreementPk){
                this.$message({ type: 'warning', message: '请选择'+(this.listQuery.type == 1?"协议单位":"中介") })
                return 
            }
            this.minLoading = true
            listBillByAgreement(data).then(res=>{
                if("unsettled" == activeName){
                    this.$nextTick(()=>{
                        this.currentRow.unsettledData = res.data
                    })
                }else{
                    this.currentRow.settledData = res.data
                }
                this.minLoading = false
            })
        },
    handExpandChange(row, expandedRows){
    var that = this
    var bol = false
    for(var i=0;i<expandedRows.length;i++){
        if(row.agreementPk == expandedRows[i].agreementPk){
            bol = true
            break;
        }
    }
    if(bol){
        this.orderExpands = [row.agreementPk]
        this.currentAgreementPk = row.agreementPk
        this.$nextTick(()=>{
            row.activeName = this.$refs[row.agreementPk].panes[0].name
        })
        // this.$nextTick(()=>{
        //     that.$refs[row.agreementPk].showDialog(row.guestDtos)
        // })
        if(this.currentRow.agreementPk != row.agreementPk){
            this.currentRow = row
            this.currentRow.activeName = "unsettled"
            var data = {
                    agreementPk:this.currentRow.agreementPk,
                    status:"FINISH"
            }
            this.listBillByAgreement(data,this.currentRow.activeName)
        }
        
    }else{
        if(this.currentRow.agreementPk != row.agreementPk){
            this.currentRow = {}
        }
        
        this.currentAgreementPk = ""
        this.orderExpands = []
    }
    },
    settleAccountClick(row,type){
        row.type = 0
      this.$refs.settleAccountsRef.showDialog(JSON.parse(JSON.stringify(row)),type)
    },
    init(type) {
        this.listQuery.type = type
        this.listAgreement()
    },
    listAgreement(){
        this.loading = true
        listAgreement(this.listQuery).then(res=>{
            this.tableData = res.data.data;
            this.total = res.data.total
            this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    getSizeChange(val) {
      this.listQuery.pageSize = val
      this.listAgreement()
    },
    getNumChange(val) {
      this.listQuery.pageNum = val
      this.listAgreement()
    },
  },filters: {
      /* 格式化时间戳 */
      formatDate (val) {
          return moment(new Date(val)).format("YYYY-MM-DD")
      }
    }
};
</script>

<style scoped>
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
  min-width: 1200px ;
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
