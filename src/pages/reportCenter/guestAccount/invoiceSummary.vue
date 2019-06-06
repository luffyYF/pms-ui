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
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
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
          collpadding="4"
          style="border-collapse:collapse;
          text-align:center;
          width:100%;
          height:100%;
          font-family: 宋体;
          font-size: 14px;
          color:black;"
        >
          <thead>
            <tr>
              <th colspan="2" style="background-color:rgb(220, 220, 220);border:1px solid black;">项目</th>
              <th
                colspan="2"
                style="background-color:rgb(220, 220, 220);border:1px solid black;"
              >房间号</th>
              <th colspan="2" style="background-color:rgb(220, 220, 220);border:1px solid black;">姓名</th>
              <th colspan="2" style="background-color:rgb(220, 220, 220);border:1px solid black;">金额</th>
              <th
                colspan="2"
                style="background-color:rgb(220, 220, 220);border:1px solid black"
              >营业详情</th>
              <th
                colspan="2"
                style="background-color:rgb(220, 220, 220);border:1px solid black;"
              >营业时间</th>
              <th
                colspan="2"
                style="background-color:rgb(220, 220, 220);border:1px solid black;"
              >订单号</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="obj in tableData">
              <tr :key="obj.item.projectPk" style="page-break-after:always">
                <td
                  :rowspan="(obj.item.length+2)"
                  colspan="2"
                  style="border:1px solid black"
                >{{obj.projectName}}</td>
              </tr>

              <tr v-for="(item,index) in obj.item" :key="item.projectPk+index">
                <td colspan="2" style="border:1px solid black;">{{item.roomNumber}}</td>
                <td colspan="2" style="border:1px solid black;">{{item.memName}}</td>
                <td colspan="2" style="border:1px solid black;">{{item.settlementAmount.toFixed(2)}}</td>
                <td colspan="2" style="border:1px solid black;">{{item.remark}}</td>
                <td colspan="2" style="border:1px solid black;">{{item.createTime}}</td>
                <td colspan="2" style="border:1px solid black;">{{item.orderGuestNo}}</td>
              </tr>

              <tr :key="obj.item.projectPk" >
                <td colspan="2" style="border:1px solid black;">合计</td>
                <td colspan="2" style="border:1px solid black;"></td>
                <td colspan="2" style="border:1px solid black;">{{amountTotal(obj.item).toFixed(2)}}</td>
                <td colspan="2" style="border:1px solid black;"></td>
                <td colspan="2" style="border:1px solid black;"></td>
                <td colspan="2" style="border:1px solid black;"></td>
              </tr>
            </template>
          </tbody>
          <tfoot></tfoot>
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
      pickerOptions2: {
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
      DateRange: [],
      tableData: [],
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
      self.DateRange.push(self.queryObj.begin);
      self.DateRange.push(self.queryObj.begin);

      this.getList();
    },
    //转换格林尼治时间为

    format(time, format) {
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? "0" : "") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
            break;
          case "MM":
            return tf(t.getMonth() + 1);
            break;
          case "mm":
            return tf(t.getMinutes());
            break;
          case "dd":
            return tf(t.getDate());
            break;
          case "HH":
            return tf(t.getHours());
            break;
          case "ss":
            return tf(t.getSeconds());
            break;
        }
      });
    },
    getList() {
      let self = this;

      customClassDetailsReport({
        beginDate: self.format(self.DateRange[0], "yyyy-MM-dd HH:mm:ss"),
        endDate: self.format(self.DateRange[1], "yyyy-MM-dd HH:mm:ss")
      }).then(res => {
        var map = {}; //键值对
        var dest = []; //存装好后的对象
        if (res.code == 1) {
          res.data.forEach(element => {
            if (!map[element.projectPk]) {
              dest.push({
                projectName: element.projectName,
                projectPk: element.projectPk,
                item: [element]
              });
              map[element.projectPk] = element;
            } else {
              dest.forEach(obj => {
                if (obj.projectPk == element.projectPk) {
                  obj.item.push(element);
                }
              });
            }
          });
          self.tableData = dest;
          console.log("self.tableData :", self.tableData);
        }
      });
    },
    //合计金额
    amountTotal(items) {
      var total = 0;
      for (var i = 0; i < items.length; i++) {
        total += items[i].settlementAmount;
      }
      return total;
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

      this.LODOP.PRINT_INITA(0, 0, "794px", "1123px", that.tableName);

      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1); // 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);

      this.LODOP.ADD_PRINT_HTM(
        "90px",
        0,
        "100%",
        "970px",
        document.getElementById("print-managerdailyreportTable").innerHTML
      );
      this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
      this.LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1); //高度包含头部和尾部

      this.LODOP.ADD_PRINT_HTM(
        "10px",
        0,
        "100%",
        "80px",
        document.getElementById("print-managerdailyreportTitle").innerHTML
      );

      this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      this.LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
      this.LODOP.ADD_PRINT_HTM(
        "1070px",
        0,
        "100%",
        "33px",
        "<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>"
      );
      // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 3);
      // this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);

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


