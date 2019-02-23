<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
          修改日期自：<el-date-picker
                      v-model="form.beginDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :clearable="false" size="mini">
                    </el-date-picker>
          至：<el-date-picker
              v-model="form.endDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :clearable="false" size="mini">
            </el-date-picker>
          房号：<el-input v-model="form.roomNumber" size="mini" style="width:120px;margin-bottom:5px"></el-input>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="rentContractDate">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-historyHousePriceInfo">
      <div class="tabs">
        <div class="tavs-title">
          <h3>{{activeCompany.companyName}}</h3>
          <h3>历史房价信息报表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="text-align: center;">
            修改日期：自&nbsp;&nbsp;{{form.beginDate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{form.endDate}}
          </p>
          <el-table 
            v-loading="loading" 
            :data="tableData" 
            border 
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            style="width: 100%; margin-top: 5px">
            <el-table-column prop="orderNo" label="组单号"></el-table-column>
            <el-table-column prop="channelTypeName" label="客源渠道"></el-table-column>
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="roomTypeName" label="房型"></el-table-column>
            <el-table-column prop="rentPrice" label="房价"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 'RESERVE'">预定</span>
                <span v-else-if="scope.row.status == 'VALID'">有效</span>
                <span v-else>取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="memName" label="会员信息">
              <template slot-scope="scope">
                <span>
                  {{scope.row.cardNumber != null ? scope.row.cardNumber : ""}}
                  {{(scope.row.cardNumber != null && scope.row.memName != null) ? "," : ""}}
                  {{scope.row.memName != null ? scope.row.memName : ""}}
                  {{((scope.row.memName != null && scope.row.certificateNo != null) || (scope.row.cardNumber != null && scope.row.certificateNo != null)) ? "," : ""}}
                  {{scope.row.certificateNo != null ? scope.row.certificateNo : ""}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="营业日期"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
          <p style="height:60px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	打印人：	{{userInfo.upmsUserName}}</span></p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import {rentContract} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
import moment from "moment"
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'

export default {
  data() {
    return {
      loading: false,
      form: {
        beginDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        roomNumber: ''
      },
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      tableData: [],
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/rentContractExcel"
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
    this.rentContractDate();
  },
  methods: {
    rentContractDate(){
      this.loading = true
      rentContract(this.form).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-historyHousePriceInfo").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.beginDate + "&endDate=" + this.form.endDate + "&roomNumber=" + this.form.roomNumber);
    },
  }
}
</script>
<style scoped>
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
</style>


