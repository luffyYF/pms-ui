<template>
  <div class="container">
    <el-form
      :inline="true"
      size="mini"
      style="margin-top:10px;"
      :model="queryObj"
      class="demo-form-inline"
    >
      <el-form-item label="日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">
          <span class="el-icon-tickets p-r-5"></span>网页预览
        </el-button>
        <!-- <el-button type="primary">PDF预览</el-button> -->
        <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button>
        <el-button type="primary" @click="print">
          <span class="el-icon-printer p-r-5"></span>打印预览
        </el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div id="print-managerdailyreportTitle">
        <div style="margin-left: 7px;text-align: left;">
          <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
        </div>
        <h3 style="text-align: center">{{tableName}}</h3>
      </div>
      <div class="table-box" id="print-managerdailyreportTable">
        <table
          width="100%"
          border="0"
          style="border-collapse:collapse;font-family: 宋体;font-size: 12px;margin:0 auto;color:black;text-align: center;"
        >
          <thead>
            <tr>
              <th
                colspan="3"
                style="text-align: left;font-size: 12px;"
              >店铺：{{activeCompany.companyName}}</th>
              <th colspan="10" style="text-align: right;font-size: 14px;">营业日期：{{queryObj.begin}}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tbrow">
              <th
                rowspan="2"
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;"
              >房型</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >当天</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >当月</th>
              <th
                colspan="5"
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >当天统计数</th>
              <th
                colspan="5"
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >当天统计数</th>
            </tr>
            <tr class="tbrow">
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >总房数</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >总房数</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >入住数</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >出租率</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >总收入</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >平均房价</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >单房收益</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >入住数</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >出租率</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >总收入</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >平均房价</th>
              <th
                style="background-color: rgb(220, 220, 220);border: 1px solid #000;padding:6px 0px"
              >单房收益</th>
            </tr>

            <tr v-for="(item,index) in tableData" :key="index" class="tbrow">
              <!-- 房型 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.monReport==undefined?item.reportPos==undefined?'-':item.reportPos.roomTypeName:item.monReport.roomTypeName}}</td>
              <!-- 当天总房数 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.reportPos==undefined?'0':item.reportPos.onlineRoomNum}}</td>
              <!-- 当月总房数 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.monReport==undefined?'0':item.monReport.onlineRoomNum}}</td>

              <!-- 当天统计数 -->
              <!-- 入住数 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.reportPos==undefined?'0':item.reportPos.rentalRoomNum}}</td>
              <!-- 出租率 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.reportPos==undefined?'0.00%':item.reportPos.onlineRoomNum==0?'0.00%':(item.reportPos.rentalRoomNum/item.reportPos.onlineRoomNum*100).toFixed(2)+'%'}}</td>
              <!-- 总收入 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.reportPos==undefined?'0.00':item.reportPos.houseFeeIncome.toFixed(2)}}</td>
              <!-- 平均房价 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.reportPos==undefined?'0.00':item.reportPos.averageRoomRate.toFixed(2)}}</td>
              <!-- 单房收益 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.reportPos==undefined?'0.00':item.reportPos.onlineRoomNum==0?'0.00':(item.reportPos.houseFeeIncome/item.reportPos.onlineRoomNum).toFixed(2)}}</td>

              <!-- 当月统计数 -->
              <!-- 入住数 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.monReport==undefined?'0':item.monReport.rentalRoomNum}}</td>
              <!-- 出租率 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.monReport==undefined?'0.00%':item.monReport.onlineRoomNum==0?'0.00%':(item.monReport.rentalRoomNum/item.monReport.onlineRoomNum*100).toFixed(2)+'%'}}</td>
              <!-- 总收入 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.monReport==undefined?'0.00':item.monReport.houseFeeIncome.toFixed(2)}}</td>
              <!-- 平均房价 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.monReport==undefined?'0.00':item.monReport.houseFeeIncome==0?'0.00':(item.monReport.houseFeeIncome/item.monReport.rentalRoomNum).toFixed(2)}}</td>
              <!-- 单房收益 -->
              <td
                style=" border: 1px solid #000;padding:6px 0px"
              >{{item.monReport==undefined?'0.00':item.monReport.onlineRoomNum==0?'0.00':(item.monReport.houseFeeIncome/item.monReport.onlineRoomNum).toFixed(2)}}</td>
            </tr>
            <tr class="tbrow">
              <!-- 合计 -->
              <td style=" border: 1px solid #000;padding:5px 0px">合计</td>
              <!-- 当天总房数 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.todayRoomCount==0?'0':total.todayRoomCount}}</td>
              <!-- 当月总房数 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.monthRoomCount==0?'0':total.monthRoomCount}}</td>

              <!-- 当天统计数 -->
              <!-- 入住数 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.todayCheckIn==0?'0':total.todayCheckIn}}</td>
              <!-- 出租率 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.todayCheckIn==0?'0.00%':(total.todayCheckIn/total.todayRoomCount*100).toFixed(2)+'%'}}</td>
              <!-- 总收入 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.todayInCome==0?'0.00':total.todayInCome.toFixed(2)}}</td>
              <!-- 平均房价 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.todayInCome==0?'0.00':(total.todayInCome/total.todayCheckIn).toFixed(2)}}</td>
              <!-- 单房收益 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.todayInCome==0?'0.00':(total.todayInCome/total.todayRoomCount).toFixed(2)}}</td>

              <!-- 当月统计数 -->
              <!-- 入住数 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.monthCheckIn==0?'0':total.monthCheckIn}}</td>
              <!-- 出租率 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.monthCheckIn==0?'0.00%':(total.monthCheckIn/total.monthRoomCount*100).toFixed(2)+'%'}}</td>
              <!-- 总收入 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.monthInCome==0?'0.00':total.monthInCome.toFixed(2)}}</td>
              <!-- 平均房价 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.monthInCome==0?'0.00':(total.monthInCome/total.monthCheckIn).toFixed(2)}}</td>
              <!-- 单房收益 -->
              <td
                style=" border: 1px solid #000;padding:5px 0px"
              >{{total.monthInCome==0?'0.00':(total.monthInCome/total.monthRoomCount).toFixed(2)}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: left;font-size: 12px;">
                打印人：
                <span>{{userInfo.realName}}</span>
              </td>
              <td colspan="10" style="text-align: right;font-size: 12px;">
                打印日期：
                <span>{{sDate}}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import { roomTypeCheckInAnalysis } from "@/api/reportCenter/pmsReportFormController";
import { getLodop } from "@/utils/lodop";
import downloadExcel from "@/components/download/downloadExcel";
import moment from "moment";

export default {
  data() {
    return {
      userInfo: {},
      sDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      queryObj: {
        userName: "",
        shift: "",
        userPk: "",
        shiftPk: "",
        begin: moment().format("YYYY-MM-DD"),
        end: moment()
          .add(1, "days")
          .format("YYYY-MM-DD")
      },
      activeCompany: {},
      tableData: [],
      //合计
      total: {
        monthRoomCount: 0,
        monthCheckIn: 0,
        monthInCome: 0,
        todayRoomCount: 0,
        todayCheckIn: 0,
        todayInCome: 0
      },
      LODOP: null,
      tableName: "入住分析表（按房型）"
    };
  },

  created() {
    var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
    this.userInfo = JSON.parse(localStorage.getItem("pms_userinfo"));
    this.init();
  },
  methods: {
    init() {
      let self = this;
      this.getList();
    },
    getList() {
      let self = this;

      roomTypeCheckInAnalysis({ begin: self.queryObj.begin }).then(res => {
        if (res.code == 1) {
          console.log(res.data);
          var total = {
            monthRoomCount: 0,
            monthCheckIn: 0,
            monthInCome: 0,
            todayRoomCount: 0,
            todayCheckIn: 0,
            todayInCome: 0
          };
          self.tableData = [];
          for (var i = 0; i < res.data.monReport.length; i++) {
            var obj = {};
            if (res.data.reportPos.length > 0) {
              total.monthRoomCount += res.data.monReport[i].onlineRoomNum;
              total.monthCheckIn += res.data.monReport[i].rentalRoomNum;
              total.monthInCome += res.data.monReport[i].houseFeeIncome;
              total.todayRoomCount += res.data.reportPos[i].onlineRoomNum;
              total.todayCheckIn += res.data.reportPos[i].rentalRoomNum;
              total.todayInCome += res.data.reportPos[i].houseFeeIncome;
            } else {
              total.monthRoomCount += res.data.monReport[i].onlineRoomNum;
              total.monthCheckIn += res.data.monReport[i].rentalRoomNum;
              total.monthInCome += res.data.monReport[i].houseFeeIncome;
              total.todayRoomCount += 0;
              total.todayCheckIn += 0;
              total.todayInCome += 0;
            }

            self.total.monthRoomCount = total.monthRoomCount;
            self.total.monthCheckIn = total.monthCheckIn;
            self.total.monthInCome = total.monthInCome;
            self.total.todayRoomCount = total.todayRoomCount;
            self.total.todayCheckIn = total.todayCheckIn;
            self.total.todayInCome = total.todayInCome;

            obj.monReport = res.data.monReport[i];
            obj.reportPos = res.data.reportPos[i];
            self.tableData.push(obj);
          }
          console.log(self.tableData);
        }
      });
    },

    //导出EXCEL
    downloadExcel() {
      let url = "/pms/report/mg/managerDailyExcel?begin=" + this.queryObj.begin;
      let that = this;
      downloadExcel(url, that.tableName);
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-managerdailyreport").innerHTML;
    //   var f = document.getElementById("printIframe");
    //   f.contentDocument.write(bodyhtml);
    //   f.contentDocument.close();
    //   f.contentWindow.print();
    // },
    //打印预览
    print() {
      this.createOneFormPage();
      if (this.LODOP) {
        this.LODOP.PREVIEW();
      }
    },
    createOneFormPage() {
      let that = this;
      this.LODOP = getLodop();
      if (!this.LODOP) {
        return;
      }
      // this.LODOP.PRINT_INIT("经理日报表打印");
      var sdf = this.LODOP.PRINT_INITA(0, 0, "794px", "1123px", that.tableName);
      console.log(sdf);
      this.LODOP.NewPageA(); // 自动分页
      // LODOP.SET_PREVIEW_WINDOW(1,);
      // this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1); // 显示背景
      this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Full-Page"); // 打印页整宽显示
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题 1123 1023 963
      this.LODOP.ADD_PRINT_TABLE(
        90,
        10,
        772,
        "100%",
        document.getElementById("print-managerdailyreportTable").innerHTML
      );
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",0);
      // LODOP.ADD_PRINT_TABLE(128,"5%","90%",314,strStyle+document.getElementById("div2").innerHTML);
      this.LODOP.ADD_PRINT_HTM(
        10,
        10,
        772,
        80,
        document.getElementById("print-managerdailyreportTitle").innerHTML
      );
      this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      this.LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
      this.LODOP.ADD_PRINT_HTM(
        "1083px",
        15,
        "794px",
        "30px",
        "<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>"
      );
      this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      this.LODOP.SET_PRINT_STYLEA(0, "Horient", 0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 0);
    }
  }
};
</script>

<style scoped>
table td {
  height: 30px;
  line-height: 30px;
}
table th {
  height: 30px;
  line-height: 30px;
}
table:nth-child(1),
table:nth-child(2) {
  border-top-color: transparent;
}
.container {
  height: 100%;
}
.table-container {
  padding: 20px;
  text-align: center;
  height: calc(100% - 200px);
  overflow-y: auto;
  border-top: 3px solid #eee;
}
.head-item {
  display: inline-block;
  padding: 0 15px;
}
.item-type {
  /* border-left:1px solid #ebeef5;
  border-right:1px solid #ebeef5; */
  margin: 0;
  line-height: 60px;
  /* font-size: 14px; */
  color: #909399;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>


