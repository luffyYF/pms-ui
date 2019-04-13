<template>
  <div>
    <!-- form -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">收款管理</h5>
            <el-form-item label="收款时间" prop="type">
                <el-date-picker
                style="width:160px;"
                v-model="listQuery.beginDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
                </el-date-picker>
                -
                <el-date-picker
                style="width:160px;"
                v-model="listQuery.endDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item :label="this.listQuery.agreementType == 1?'协议单位':'中介'">
                <el-select style="width:150px;" size="mini" v-model="listQuery.agreementPk" placeholder="协议单位" :clearable="false" >
                    <el-option v-for="y in agreementList" :label="y.unitName" :value="y.agreementPk" :key="y.agreementPk"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收款方式" >
                <el-select style="width:150px;" size="mini" v-model="listQuery.projectPk" placeholder="收款方式" :clearable="false" >
                    <el-option v-for="y in settleProjectList" :label="y.projectName" :value="y.projectPk" :key="y.projectPk"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" icon="el-icon-search" @click="agreementBillQuery()">查询</el-button>
            </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">收款列表</h5>
      <el-table 
      size="mini" 
      border 
      v-loading="loading" 
      :data="tableData" 
      height="450" 
      style="width: 98.5%; margin:10px;">
        
        <el-table-column prop="createTime" min-width="200"  label="收款时间" align="center">
        </el-table-column>
        <el-table-column prop="unitName" :label="this.listQuery.agreementType == 1?'挂账单位':'挂账中介'" align="center" min-width="200">
        </el-table-column>
        <el-table-column prop="projectName" label="收款类型" align="center" min-width="90">
        </el-table-column>
        <el-table-column prop="settlementAmount" label="金额" align="center" >
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="createUserName" label="操作员" align="center">
        </el-table-column>
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="getNumChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>

import {agreementBillQuery} from '@/api/bill'
import {allAgreement} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
  import { listByProjectType } from '@/api/systemSet/pmsProjectController'
import moment from "moment"
export default {
  components:{
    moment
  },
  data() {
    return {
        loading:false,
        listQuery:{
            pageSize:10,
            pageNum:1,
            billType:"SETTLEMENT",
            billStatus:null,
            agreementPk:"",
            agreementType:1,
            projectPk:""
        },
        tableData: [],
        total: 0,
        agreementList:[],
        statusList:[
            {label:"全部",value:null},
            {label:"未结账",value:'UN_SET'},
            {label:"已结账",value:'FINISH'}
        ],
        settleProjectList:[]
    };
  },
  created () {
  },
  methods: {
    initProject(){
        listByProjectType({projectType:'SETTLEMENT'}).then(res => {
            var data = res.data
            this.settleProjectList = data
            var project = {
                projectName:"免单",
                projectPk:"0",
                code:null
            }
            this.settleProjectList.push(project)
            this.settleProjectList.unshift({
                projectName:"全部",
                projectPk:"",
                code:null
            })
        })
    },
    allAgreement(){
        allAgreement({type:this.listQuery.agreementType}).then(res=>{
            this.agreementList = res.data
            this.agreementList.unshift({
                agreementPk:"",
                unitName:"全部"
            })
        })
    },
    init(type) {
        this.listQuery.agreementType = type
        this.agreementBillQuery()
        this.allAgreement()
        this.initProject()
    },
    agreementBillQuery(){
        this.loading = true
        agreementBillQuery(this.listQuery).then(res=>{
            this.tableData = res.data.data;
            this.total = res.data.total
            this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    getSizeChange(val) {
      this.listQuery.pageSize = val
      this.agreementBillQueryv()
    },
    getNumChange(val) {
      this.listQuery.pageNum = val
      this.agreementBillQuery()
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
