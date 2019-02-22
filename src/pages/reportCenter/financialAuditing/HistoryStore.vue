<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="datepicker"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  :picker-options="startTimeOptions"
                  size="mini" :clearable="false">
              </el-date-picker>
        房号：<el-input v-model="roomNumber" size="mini" style="width:120px;margin-bottom:5px"></el-input>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="historyStoreDate">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-historystore">
      <div class="tabs">
        <div class="tavs-title">
          <h3>{{activeCompany.companyName}}</h3>
          <h3>历史离店报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table 
            v-loading="loading" 
            :data="tableData" 
            border 
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            style="width: 100%; margin-top: 5px">
            <el-table-column prop="orderNo" label="组单号"></el-table-column>
            <el-table-column prop="roomNumber" label="房号">
              <template slot-scope="scope">
                <span>{{scope.row.roomNumber == 'null' ? "" : scope.row.roomNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="typeName" label="房间类型"></el-table-column>
            <el-table-column prop="price" label="房价">
              <template slot-scope="scope">
                <span>{{scope.row.price == 'null' ? "" : scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="memName" label="宾客姓名"></el-table-column>
            <el-table-column prop="beginDate" label="入住时间"></el-table-column>
            <el-table-column prop="endDate" label="离店时间"></el-table-column>
            <el-table-column prop="amount3" label="消费">
              <template>		
                <el-table-column prop="totalRoomPrice" label="房费"></el-table-column>
                <!-- <el-table-column prop="amount3" label="商品"></el-table-column> -->
                <el-table-column prop="totalOrderPrice" label="其他"></el-table-column>
              </template>
            </el-table-column>					
            <el-table-column prop="consumptionAmount" label="消费合计	"></el-table-column>
            <el-table-column prop="amount3" label="结算">
              <template>		
                <el-table-column prop="cash" label="现金"></el-table-column>
                <el-table-column prop="bankCard" label="银行卡"></el-table-column>
                <!-- <el-table-column prop="amount3" label="储值卡"></el-table-column> -->
                <el-table-column prop="aliPay" label="支付宝"></el-table-column>
                <el-table-column prop="wxPay" label="微信支付"></el-table-column>
                <el-table-column prop="amount3" label="其他">
                  <template slot-scope="scope">
                    {{scope.row.preLicensing + scope.row.check + scope.row.remittance + scope.row.order}}
                  </template>
                </el-table-column>
              </template>
            </el-table-column>		
            <el-table-column prop="settlementAmount" label="结算合计	"></el-table-column>
            <el-table-column prop="createUserName" label="操作员	">
              <template slot-scope="scope">
                <span>{{scope.row.createUserName == 'null' ? "" : scope.row.createUserName}}</span>
              </template>
            </el-table-column>
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
import {historyStore} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'

export default {
  data() {
    return {
      datepicker: [formatDate(new Date(), 'yyyy-MM-dd'), formatDate(new Date(), 'yyyy-MM-dd')],
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      roomNumber: '',
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      loading: false,
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/historyStoreExcel"
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
    this.historyStoreDate();
  },
  methods: {
    historyStoreDate(){
      this.loading = true
      const datepicker = this.datepicker;
      historyStore({begin: datepicker[0], end: datepicker[1], roomNumber: this.roomNumber}).then(res => {
        console.log(res.data)
        this.tableData = res.data
        this.loading = false
      })
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-historystore").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?begin=" + this.datepicker[0] + "&end=" + this.datepicker[1] + "&roomNumber=" + this.roomNumber);
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


