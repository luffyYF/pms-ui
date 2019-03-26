<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <!-- 营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" @change="roomStateReport"></el-date-picker> -->
        楼栋：<el-select v-model="buildingPk" placeholder="请选择楼栋" size="mini">
                <el-option value="" label="全部"></el-option>
                <el-option
                  v-for="item in buildingArray"
                  :key="item.buildingPk"
                  :label="item.buildingName"
                  :value="item.buildingPk">
                </el-option>
              </el-select>
        楼层：<el-select v-model="storeyPk" placeholder="请选择楼层" size="mini">
                <el-option value="" label="全部"></el-option>
                <el-option
                  v-for="item in storeyArray"
                  :key="item.storeyPk"
                  :label="item.storeyName"
                  :value="item.storeyPk">
                </el-option>
              </el-select>
        <div style="margin-top: 10px">
          房态：<el-radio-group v-model="roomStatus" size="mini">
                  <el-radio label="" border>全部</el-radio>
                  <el-radio label="1" border>空净</el-radio>
                  <el-radio label="2" border>空脏</el-radio>
                  <el-radio label="3" border>住人净</el-radio>
                  <el-radio label="4" border>住人脏</el-radio>
                  <el-radio label="5" border>维修房</el-radio>
                  <el-radio label="6" border>停用房</el-radio>
                </el-radio-group>
        </div>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="roomStateReport()">网页预览</el-button>
          <!-- <el-button type="primary" size="mini">PDF预览</el-button> -->
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-roomstateprint">
      <div class="tabs">
        <div class="tavs-title">
          <h3>{{activeCompany.companyName}}</h3>
          <h3>房态报表</h3>
        </div>
        <div class="tabs-contetn">
          <div>
            <p style="color: red">注"★"代表预离房</p>
          </div>
          <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :data="tableData"
            border
            style="width: 100%; margin-top: 5px">
            <el-table-column prop="roomStatusName" label="房态"></el-table-column>
            <el-table-column prop="buildingName" label="楼栋"></el-table-column>
            <el-table-column prop="storeyName" label="楼层"></el-table-column>
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="roomNum" label="房数"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.upmsUserName}}</span></p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import { roomStateReport } from '@/api/reportCenter/pmsReportFormController'
import {listStorey} from '@/api/systemSet/roomSetting/floorRoom'
import {listBuilding} from '@/api/systemSet/roomSetting/buildingController'
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'
import moment from "moment"
export default {
  data() {
    return {
      datepicker: moment().format("YYYY-MM-DD"),
      datepickerTime:  moment().format("YYYY-MM-DD HH:mm:ss"),
      tableData: [],
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      buildingArray:[],
      storeyArray:[],
      buildingPk: '',
      storeyPk: '',
      roomStatus: '',
      baseUrl:common.baseUrl,
      ziurl:"/report/roomStateReportExcel"
    }
  },
  created(){
    var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
    this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'));
    this.init();
  },
  methods: {
    init () {
      listStorey().then(res=>{
        this.storeyArray = res.data
      })
      listBuilding().then(res=>{
        this.buildingArray = res.data
      })
      this.roomStateReport()
    },
    roomStateReport(){
      let data = {
        buildingPk: this.buildingPk,
        storeyPk: this.storeyPk,
        roomStatus: this.roomStatus,
      }
      roomStateReport(data).then(res => {
        this.tableData = res.data
      })
    },
    //导出EXCEL
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?buildingPk=" + this.buildingPk + "&storeyPk=" + this.storeyPk + "&roomStatus=" + this.roomStatus);
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-roomstateprint").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    }
  }
}
</script>
<style scoped>
.exportLink{
  color: white;
  text-decoration: none;
}
.title{
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title{
  text-align: center;
}
.left{
  float: left;
}
.right{
  float: right;
}
.tabsAdd{
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
.tabs {
  padding: 0 50px;
}
.el-radio.is-bordered+.el-radio.is-bordered,.el-radio--mini.is-bordered {
  margin-right: 10px;
}
</style>