<template>
  <div>
    <!-- form -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">账套管理</h5>     
          <el-form-item label="账套名称">
            <el-input v-model="listQuery.setBillName" clearable></el-input>
          </el-form-item>
          <el-form-item :label="this.listQuery.type == 1?'协议单位':'中介'" v-if="this.listQuery.type == 1" prop="type">
            <el-select size="mini" v-model="listQuery.agreementPk" placeholder="协议单位" :clearable="false" >
                <el-option v-for="y in agreementList" :label="y.unitName" :value="y.agreementPk" :key="y.agreementPk"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="type">
            <el-select size="mini" v-model="listQuery.status" placeholder="状态" :clearable="false" >
                <el-option v-for="y in statusList" :label="y.label" :value="y.value" :key="y.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="listSetBill()">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" size="mini" icon="el-icon-plus" @click="addClick()" >添加账套</el-button>
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
      height="450" 
      style="width: 98.5%; margin:10px;">
        <!-- <el-table-column prop="companyPk" label="所属分店" align="center" width="120">
        </el-table-column> -->
        <el-table-column prop="contactName" :label="this.listQuery.type == 1?'协议单位':'中介'" align="center">
        </el-table-column>
        <el-table-column prop="setBillName" label="账套名称" align="center">
        </el-table-column>
        <el-table-column prop="consumptionAmount" label="挂账金额" align="center" width="90">
        </el-table-column>
        <el-table-column prop="settlementAmount" label="结算金额" align="center" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="70">
            <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未结帐</span>
                <span v-else>已结账</span>
            </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人" align="center" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="200">
        </el-table-column>
        <el-table-column prop="settleAccountName" label="结账人" align="center" width="150">
        </el-table-column>
        <el-table-column prop="companyName" label="来源" align="center" width="200">
        </el-table-column>
        <el-table-column prop="settleAccountTime" label="结账时间" align="center" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="160">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" v-if="scope.row.status == 0 " type="primary" size="mini">修改</el-button>
            <el-button type="primary" @click="settleAccountClick(scope.row)" v-if="scope.row.status == 0" size="mini">结账</el-button>
            <el-button type="danger" @click="revokeSetBillStatus(scope.row.setBillPk)" v-if="scope.row.status == 1" size="mini">撤销结账</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="getNumChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <setBillEdit ref="setBillEditRef" @callback="listSetBill()"/>
    <settleAccounts ref="settleAccountsRef" @callback="listSetBill()"/>
  </div>
</template>

<script>

import setBillEdit from './setBillEdit'
import settleAccounts from './settleAccounts'
import {addSetBill,updateSetBill,listSetBill,revokeSetBillStatus} from '@/api/customerRelation/ProtocolManage/setBill'
import {allAgreement} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
import moment from "moment"
export default {
  components:{
    moment,setBillEdit,settleAccounts
  },
  data() {
    return {
        loading:false,
        listQuery:{
            pageSize:10,
            pageNum:1,
            setBillName:"",
            status:null,
            agreementPk:"",
            type:1
        },
        tableData: [],
        total: 0,
        agreementList:[],
        statusList:[
            {label:"全部",value:null},
            {label:"未结账",value:0},
            {label:"已结账",value:1}
        ]
    };
  },
  created () {
  },
  methods: {
    revokeSetBillStatus(id){
      this.$confirm('确定要撤销结账吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        revokeSetBillStatus(id).then(res=>{
          if(res.code == 1){
            this.listSetBill()
          }
          this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
      } )
      })
      
    },
    allAgreement(){
        allAgreement({type:this.listQuery.type}).then(res=>{
            this.agreementList = res.data
            this.agreementList.unshift({
                agreementPk:"",
                unitName:"全部"
            })
        })
    },
    addClick(){
        this.$refs.setBillEditRef.showDialog(null,this.listQuery.type)
    },
    editClick(row){
        this.$refs.setBillEditRef.showDialog(JSON.parse(JSON.stringify(row)))
    },
    settleAccountClick(row){
      this.$refs.settleAccountsRef.showDialog(JSON.parse(JSON.stringify(row)))
    },
    init(type) {
        this.listQuery.type = type
        this.listSetBill()
        this.allAgreement()
    },
    listSetBill(){
        this.loading = true
        listSetBill(this.listQuery).then(res=>{
            this.tableData = res.data.data;
            this.total = res.data.total
            this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    getSizeChange(val) {
      this.listQuery.pageSize = val
      this.listSetBill()
    },
    getNumChange(val) {
      this.listQuery.pageNum = val
      this.listSetBill()
    },
    
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
