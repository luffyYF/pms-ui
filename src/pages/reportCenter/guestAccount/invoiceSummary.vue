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
          v-model="DateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-DD HH:mm:ss"
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
        <h3 style="text-align: center;font-size:16px">{{tableName}}</h3>
      </div>
      <div class="table-box" id="print-managerdailyreportTable">
        <table
          width="100%"
           cellpadding="5"
          style="border-collapse:collapse;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;"
        >
          <tr>
            <th colspan="2" style="background-color:rgb(220, 220, 220);border:1px solid black">项目</th>
            <th style="background-color:rgb(220, 220, 220);border:1px solid black">房间号</th>
            <th style="background-color:rgb(220, 220, 220);border:1px solid black">姓名</th>
            <th style="background-color:rgb(220, 220, 220);border:1px solid black">金额</th>
            <th colspan="2" style="background-color:rgb(220, 220, 220);border:1px solid black">营业详情</th>
            <th colspan="2" style="background-color:rgb(220, 220, 220);border:1px solid black">营业时间</th>
            <th colspan="4" style="background-color:rgb(220, 220, 220);border:1px solid black">订单号</th>
          </tr>
          <tr>
            <td rowspan="2" colspan="2" style="border:1px solid black">微信</td>
            <td style="border:1px solid black">203</td>
            <td style="border:1px solid black">zhengyuhuong</td>
            <td style="border:1px solid black">50.00</td>
            <td colspan="2" style="border:1px solid black">微信收款</td>
            <td colspan="2" style="border:1px solid black">5/30 17：10</td>
            <td colspan="4" style="border:1px solid black">YDFJ14354543543543543434</td>
          </tr>
          <tr>
            <td style="border:1px solid black">合计</td>
            <td style="border:1px solid black"></td>
            <td style="border:1px solid black">50.00</td>
            <td colspan="2" style="border:1px solid black"></td>
            <td colspan="2" style="border:1px solid black"></td>
            <td colspan="4" style="border:1px solid black"></td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import { customClassDetailsReport } from "@/api/reportCenter/pmsReportFormController";
import { getLodop } from "@/utils/lodop";
import downloadExcel from "@/components/download/downloadExcel";
import moment from "moment";

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      DateRange: "",
      userInfo: {},
      sDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      queryObj: {
        userName: "",
        shift: "",
        userPk: "",
        shiftPk: "",
        begin: moment().format("YYYY-MM-DD HH:mm:ss"),
        end: moment()
          .add(1, "days")
          .format("YYYY-MM-DD HH:mm:ss")
      },
      activeCompany: {},

      LODOP: null,
      tableName: "结账汇总表-自定义类明细"
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
      // console.log(" DateRange :", self.DateRange);
      // console.log("sDate :", self.sDate);
      // console.log("sDate :", self.queryObj);
      customClassDetailsReport({
        beginDate: self.DateRange[0],
        endDate: self.DateRange[1]
      }).then(res => {
        if (res.code == 1) {
          console.log(res.data);
          // var total = {
          //   monthRoomCount: 0,
          //   monthCheckIn: 0,
          //   monthInCome: 0,
          //   todayRoomCount: 0,
          //   todayCheckIn: 0,
          //   todayInCome: 0
          // };
          // self.tableData = [];
          // for (var i = 0; i < res.data.monReport.length; i++) {
          //   var obj = {};
          //   if (res.data.reportPos.length > 0) {
          //     total.monthRoomCount += res.data.monReport[i].onlineRoomNum;
          //     total.monthCheckIn += res.data.monReport[i].rentalRoomNum;
          //     total.monthInCome += res.data.monReport[i].houseFeeIncome;
          //     total.todayRoomCount += res.data.reportPos[i].onlineRoomNum;
          //     total.todayCheckIn += res.data.reportPos[i].rentalRoomNum;
          //     total.todayInCome += res.data.reportPos[i].houseFeeIncome;
          //   } else {
          //     total.monthRoomCount += res.data.monReport[i].onlineRoomNum;
          //     total.monthCheckIn += res.data.monReport[i].rentalRoomNum;
          //     total.monthInCome += res.data.monReport[i].houseFeeIncome;
          //     total.todayRoomCount += 0;
          //     total.todayCheckIn += 0;
          //     total.todayInCome += 0;
          //   }

          //   self.total.monthRoomCount = total.monthRoomCount;
          //   self.total.monthCheckIn = total.monthCheckIn;
          //   self.total.monthInCome = total.monthInCome;
          //   self.total.todayRoomCount = total.todayRoomCount;
          //   self.total.todayCheckIn = total.todayCheckIn;
          //   self.total.todayInCome = total.todayInCome;

          //   obj.monReport = res.data.monReport[i];
          //   obj.reportPos = res.data.reportPos[i];
          //   self.tableData.push(obj);
          // }
          // console.log(self.tableData);
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


