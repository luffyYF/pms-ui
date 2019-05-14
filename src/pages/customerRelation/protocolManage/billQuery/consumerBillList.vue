<template>
  <div>
    <!-- form -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">账务管理</h5>
            
            <el-form-item label="入住时间" prop="type">
                <!-- <el-date-picker
                style="width:110px;"
                v-model="datepicker"
                type="daterange"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
                </el-date-picker> -->
                <el-date-picker
                v-model="datepicker"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>                
            </el-form-item>
            <el-form-item label="消费时间" prop="type">
                <el-date-picker
                  v-model="datetimepicker"
                  type="datetimerange"
                  range-separator="至"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item :label="this.listQuery.agreementType == 1?'协议单位':'中介'" prop="type">
                <el-select style="width:150px;" size="mini" v-model="listQuery.agreementPk" placeholder="协议单位" :clearable="false" >
                    <el-option v-for="y in agreementList" :label="y.unitName" :value="y.agreementPk" :key="y.agreementPk"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="agreementType">
                <el-select style="width:100px;" size="mini" v-model="listQuery.billStatus" placeholder="状态" :clearable="false" >
                    <el-option v-for="y in statusList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房号">
            <el-input style="width:150px;" v-model="listQuery.roomNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input style="width:150px;" v-model="listQuery.memName" clearable></el-input>
            </el-form-item>
          
            <el-form-item label="">
                <el-button type="primary" icon="el-icon-search" @click="agreementBillQuery()">查询</el-button>
            </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">账务列表</h5>
      <el-table 
      size="mini" 
      border 
      v-loading="loading" 
      :data="tableData" 
      height="450" 
      style="width: 98.5%; margin:10px;">
        <el-table-column prop="checkInDate" width="200" label="入住时间" align="center">
          <template slot-scope="scope">
              {{scope.row.checkInDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="checkOutDate" width="200"  label="离店时间" align="center">
          <template slot-scope="scope">
              {{scope.row.checkOutDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="memName" label="姓名" align="center" width="90">
        </el-table-column>
        <el-table-column prop="certificateNo" label="证件号" align="center" >
        </el-table-column>
        <el-table-column prop="roomNumber" label="房号" align="center" width="120">
        </el-table-column>
        <el-table-column prop="roomTypeName" label="房型" align="center">
        </el-table-column>
        <el-table-column prop="createTime" width="200"  label="消费时间" align="center">
         <template slot-scope="scope">
              {{scope.row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="consumptionAmount" label="挂账金额" align="center" width="100">
        </el-table-column>
        <el-table-column prop="unitName" :label="this.listQuery.agreementType == 1?'挂账单位':'挂账中介'" align="center" width="200">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="100">
            <template slot-scope="scope">
                <span v-if="scope.row.status == 'UN_SET'">未结帐</span>
                <span v-else>已结账</span>
            </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" align="center" width="160">
        </el-table-column> -->
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="getNumChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>

import {agreementBillQuery} from '@/api/bill'
import {allAgreement} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
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
            billType:"CONSUMER",
            billStatus:null,
            agreementPk:"",
            agreementType:1,
            beginDate:"",
            endDate:"",
            checkInDate:"",
            checkOutDate:""
        },
        datepicker:[],
        datetimepicker:[],
        tableData: [],
        total: 0,
        agreementList:[],
        statusList:[
            {label:"全部",value:null},
            {label:"未结账",value:'UN_SET'},
            {label:"已结账",value:'FINISH'}
        ]
    };
  },
  created () {
  },
  methods: {
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
    },
    agreementBillQuery(){
        this.loading = true
        if(this.datepicker != null){
          this.listQuery.checkInDate = this.datepicker[0]
          this.listQuery.checkOutDate = this.datepicker[1]
        }else{
          this.listQuery.checkInDate = ""
          this.listQuery.checkOutDate = ""
        }
        if(this.datetimepicker != null){
          this.listQuery.beginDate = this.datetimepicker[0]
          this.listQuery.endDate = this.datetimepicker[1]
        }else{
          this.listQuery.beginDate = ""
          this.listQuery.endDate = ""
        }
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
    
    
  },filters: {
      /* 格式化时间戳 */
      formatDate (val) {
          if(!val){
            return ""
          }
          return moment(new Date(val)).format("YYYY-MM-DD HH:mm:ss")
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
