//公共打印页面【不要用】
<template>
  <div>
    <el-dialog class="pattern-dialog" title="账单打印" :visible.sync="dialogBillPrint" width="50%" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <!--begin1-->
        <div id="printarea1">
          <el-col :span="24" style="margin-top:10px;background: #fff;">
            <p style="text-align: center;">
              <strong>{{oprCompanyName}}消费明细账单</strong>
            </p>
            <table border="1" cellspacing="0">
              <tr>
                <td>姓名(Name):</td>
                <td colspan="2">
                  <!-- <span>导游 导游 导游 导游 导游 导游 导游 导游 导游 导游 导游 导游</span> -->
                  <span v-for="name in filterMemName(tableData)">{{name}} </span>
                </td>
                <td>房号(Room):</td>
                <td colspan="2">
                  <!-- <span >301 302 303 304 305 306 307 308 309 310 311 312</span> -->
                  <span v-for="roomNumber in filterRoom(tableData)">{{roomNumber}} </span>
                </td>
              </tr>
              <tr>
                <td colspan="6">
                  <span>人数(Pax): {{personCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>到日(Arr): {{beginDate}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>离日(Dep): {{endDate}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>操作员: {{oprUserName}}</span>
                </td>
              </tr>
              <tr>
                <td>时间</td>
                <td>房号</td>
                <td>房型</td>
                <td>项目</td>
                <td>消费</td>
                <td>结算</td>
              </tr>
              <tr v-for="y in tableData">
                <td>{{y.businessDate}}</td>
                <td>{{y.roomNumber}}</td>
                <td>{{y.roomTypeName}}</td>
                <td>{{y.projectName}}</td>
                <td>{{y.consumptionAmount}}</td>
                <td>{{y.settlementAmount}}</td>
              </tr>
            </table>
            <p>
              <span>消费总计: {{totalConsumptionAmount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>实收: {{totalSettlementAmount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span v-if="diffAmount>=0">找零: {{Math.abs(diffAmount)}}</span>
              <span v-else>应收: {{Math.abs(diffAmount)}}</span>
            </p>
          </el-col>
        </div>
        <!--end1-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="print(1)">打印</el-button>
        <el-button size="mini" type="primary" @click="dialogBillPrint = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 可继续添加其他打印页面dialog ... -->

    <!-- 公共的打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      dialogBillPrint: false,
      tableData: [],
      beginDate:'',
      endDate:'',
      personCount: 0,//人数
      oprUserName:'',//操作员
      oprCompanyName:'',//公司名称
      totalConsumptionAmount: 0, //消费总计
      totalSettlementAmount: 0, //实收
      diffAmount:0 // 找零/应收
    };
  },
  methods: {
    /**
     * 打印账单，调用初始化
     * @augments data 数据
     * */
    printBill(data, beginDate, endDate) {
      this.oprUserName = JSON.parse(localStorage.getItem('pms_userinfo')).realName
      this.oprCompanyName = JSON.parse(localStorage.current_logon_company).companyName
      this.dialogBillPrint = true;
      this.beginDate = moment(beginDate).format('YYYY-MM-DD HH:mm');
      this.endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
      this.totalConsumptionAmount = 0;
      this.totalSettlementAmount = 0;
      this.diffAmount = 0;
      this.tableData = data;
      this.calcSum(data);
      this.calcPersonCount(data);
      // console.log(this.tableData);
    },
    //统计金额： 消费总计、实收、应收
    calcSum(data) {
      data.forEach(bill => {
        this.totalConsumptionAmount += bill.consumptionAmount;
        this.totalSettlementAmount += bill.settlementAmount;
      });
      this.diffAmount = this.totalSettlementAmount - this.totalConsumptionAmount
    },
    //统计人数:根据账单主键
    calcPersonCount(data){
      let obj = {};
      data.forEach(row => {
        if(row.guestOrderPk != null && row.guestOrderPk != undefined && row.guestOrderPk != ""){
          obj[row.guestOrderPk] = true;
        }
      });
      this.personCount = Object.keys(obj).length
    },
    //过滤出房间数组
    filterRoom(tableData) {
      let obj = {};
      tableData.forEach(row=>{
        if(row.roomNumber != null && row.roomNumber != undefined && row.roomNumber != ""){
          obj[row.roomNumber] = true;
        }
      })
      return Object.keys(obj);
    },
    //过滤出姓名
    filterMemName(tableData) {
      let obj = {};
      tableData.forEach(row=>{
        if(row.memName != null && row.memName != undefined && row.memName != ""){
          obj[row.memName] = true;
        }
      })
      return Object.keys(obj);
    },
    print(oper) {
      //获取当前页的html代码
      let bodyhtml = document.getElementById("printarea" + oper).innerHTML;
      // 生成并打印iframe
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    },
  }
};
</script>

<style>

</style>
