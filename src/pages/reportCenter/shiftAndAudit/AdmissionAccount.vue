// 收银入账明细报表
<template>
  <div class="container">
    <p style="margin-top:0; margin-bottom:5px;">项目：</p>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      size="mini"
      :checked="true"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-checkbox-group
      v-model="checkedItem"
      @change="handleCheckedItemChange"
      style="height: 100px;overflow-y: auto;"
    >
      <el-checkbox
        class="checkboxgrou"
        size="mini"
        v-for="item in itemList"
        :label="item.projectPk"
        :key="item.projectPk"
      >{{item.projectName}}</el-checkbox>
    </el-checkbox-group>
    <el-form
      :inline="true"
      size="mini"
      style="margin-top:10px;"
      :model="queryObj"
      class="demo-form-inline"
    >
      <!-- <el-form-item label="营业日期">
        <el-date-picker
          v-model="queryObj.begenAndEnd"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
        ></el-date-picker>
      </el-form-item> -->
        <el-form-item label="开始日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="queryObj.end"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收银员">
        <el-select v-model="queryObj.userPk" placeholder="选择收银员">
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in listCashierOperatorData"
            :key="item.userPk"
            :label="item.userName"
            :value="item.userPk"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次">
        <el-select v-model="queryObj.shiftPk" placeholder="选择班次">
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in selectShiftData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span
              style="float: right; color: #8492a6; font-size: 13px"
            >({{ item.beginTime.substring(0,5) }}-{{item.endTime.substring(0,5)}})</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <!-- <el-button type="primary">PDF预览</el-button> -->
        <!-- <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+queryObj.begin+'&end='+queryObj.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk+'&projectPks='+checkedItem.join(',')" class="exportLink" target="_blank">导出EXCEL</a></el-button> -->
        <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button>
        <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
        <el-button type="primary" @click="print">
          <span class="el-icon-printer p-r-5"></span>打印预览
        </el-button>
      </el-form-item>
    </el-form>

    <div class="table-container">
      <div id="print-admissionaccount">
        <div style="margin-left: 7px;text-align: left;">
          <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
        </div>
        <!-- <h3 style="text-align:center;">{{activeCompany.companyName}}</h3> -->
        <h3 style="text-align:center;">收银入账明细报表</h3>
        <!-- <p style="text-align:center;">
          营业日期从：{{reportBeginDate}}&nbsp;&nbsp;到&nbsp;&nbsp;{{reportEndDate}}&nbsp;&nbsp;&nbsp;&nbsp;收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:
          <span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}}</span>
        </p> -->
      </div>
      <!-- <p style="text-align:center;">打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.upmsUserName}}</span></p> -->
      <!-- <el-table
        :header-cell-style="tableStyleObj"
        :cell-style="tableStyleObj"
        :data="admissionBank"
        border style="width: 100%;border:1px solid black;">
        <el-table-column prop="createUserName" align="center" label="收银员" min-width="80px"></el-table-column>
        <el-table-column prop="projectName" align="center" label="项目" min-width="100px"></el-table-column>
        <el-table-column prop="orderGuestNo" align="center" label="组单" min-width="100px"></el-table-column>
        <el-table-column prop="orderNo" align="center" label="客单" min-width="100px"></el-table-column>
        <el-table-column prop="roomNumber" align="center" label="房号" min-width="100px"></el-table-column>
        <el-table-column prop="memName" align="center" label="姓名" min-width="100px"></el-table-column>
        <el-table-column prop="consumptionAmount" align="center" label="消费" min-width="100px"></el-table-column>
        <el-table-column prop="settlementAmount" align="center"  label="结算" min-width="100px"></el-table-column>
        <el-table-column prop="createTime" align="center" label="发生日期" min-width="100px"></el-table-column>
        <el-table-column prop="remark" align="center" label="备注" min-width="100px"></el-table-column>
      </el-table>-->
      <div id="print-admissionaccountTable">
        <table
          width="100%"
          border="0"
          style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;"
          cellpadding="6"
          cellspacing="0"
        >
          <thead>
            <tr>
              <td colspan="2" style="text-align: left;font-size: 14px;"
              >店铺：{{activeCompany.companyName}}</td>
              <td colspan="8" style="text-align:right;">营业日期从：{{queryObj.begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;&nbsp;收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}}</span></td>
            </tr>
          </thead>
          <tr>
            <th style="border: 1px solid #000;">收银员</th>
            <th style="border: 1px solid #000;">项目</th>
            <th style="border: 1px solid #000;">组单</th>
            <th style="border: 1px solid #000;">客单</th>
            <th style="border: 1px solid #000;">房号</th>
            <th style="border: 1px solid #000;">姓名</th>
            <th style="border: 1px solid #000;">消费</th>
            <th style="border: 1px solid #000;">结算</th>
            <th style="border: 1px solid #000;">发生日期</th>
            <th style="border: 1px solid #000;">备注</th>
          </tr>
          <tr v-for="(item, index) in admissionBank" :key="index">
            <td style="border: 1px solid #000;">{{item.createUserName}}</td>
            <td style="border: 1px solid #000;">{{item.projectName}}</td>
            <td style="border: 1px solid #000;">{{item.orderGuestNo}}</td>
            <td style="border: 1px solid #000;">{{item.orderNo}}</td>
            <td style="border: 1px solid #000;">{{item.roomNumber}}</td>
            <td style="border: 1px solid #000;">{{item.memName}}</td>
            <td style="border: 1px solid #000;">{{item.consumptionAmount}}</td>
            <td style="border: 1px solid #000;">{{item.settlementAmount}}</td>
            <td style="border: 1px solid #000;">{{item.createTime}}</td>
            <td style="border: 1px solid #000;">{{item.remark}}</td>
          </tr>
          <tfoot>
            <tr>
              <td colspan="5" style="text-align: left;font-size: 14px;">
                打印人：
                <span>{{userInfo.realName}}</span>
              </td>
              <td colspan="5" style="text-align: right;font-size: 14px;">
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
import {
  roomStatus,
  reportShouYinYuanRuZhangMingXi
} from "@/api/reportCenter/pmsReportFormController";
import { listProject } from "@/api/systemSet/pmsProjectController";
import { selectShift } from "@/api/utils/pmsShiftController";
import { listCashierOperator } from "@/api/operators/pmsUserController";
import downloadExcel from "@/components/download/downloadExcel";
import common from "@/api/common";
import moment from "moment";
import { getLodop } from "@/utils/lodop";

export default {
  data() {
    return {
      checkAll: false,
      checkedItem: [],
      allItemList: [],
      itemList: [],
      isIndeterminate: true,
      userInfo: {},
      admissionBank: [],
      sDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      sTime: moment().format("HH:mm:ss"),
      queryObj: {
        userName: "",
        shift: "",
        userPk: "",
        shiftPk: "",
        begin:moment().format("YYYY-MM-DD"),
        end:  moment().add(1, "days").format("YYYY-MM-DD")
        // begenAndEnd: [
        //   moment().format("YYYY-MM-DD"),
        //   moment()
        //     .add(1, "days")
        //     .format("YYYY-MM-DD")
        // ]
      },
      selectShiftData: [],
      listCashierOperatorData: [],
      tableStyleObj: {
        border: "1px solid black",
        padding: "8px",
        "text-align": "center",
        "font-family": "宋体",
        "font-size": "14px",
        color: "black"
      },
      reportBeginDate: null,
      reportEndDate: null,
      LODOP: null
      // baseUrl:common.baseUrl,
      // ziurl:"/pms/report/shouYinYuanRuZhangMingXiExcel?"
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
      selectShift().then(data => {
        self.selectShiftData = data.data;
      });
      listCashierOperator().then(data => {
        self.listCashierOperatorData = data.data;
      });
      listProject({ projectMaster: "CONSUMER" }).then(data => {
        self.itemList = data.data;
        self.itemList.forEach(data => {
          self.allItemList.push(data.projectPk);
          self.checkedItem.push(data.projectPk);
        });
        this.getList();
      });
      this.handleCheckAllChange();
    },
    getList() {
      this.autoChagneReportDate();

      let self = this;
      self.queryObj.shift = "";
      self.queryObj.userName = "";
      self.selectShiftData.forEach(data => {
        if (data.value == self.queryObj.shiftPk) {
          self.queryObj.shift = data.label;
        }
      });
      self.listCashierOperatorData.forEach(data => {
        if (data.userPk == self.queryObj.userPk) {
          self.queryObj.userName = data.userName;
        }
      });
      let params = {
        userName: this.queryObj.userName,
        shift: this.queryObj.shift,
        userPk: this.queryObj.userPk,
        shiftPk: this.queryObj.shiftPk,
        // begin: this.queryObj.begenAndEnd[0],
        // end: this.queryObj.begenAndEnd[1],
        begin:this.queryObj.begin,
        end:this.queryObj.end,
        projectPks: this.checkedItem.join(",")
      };
      reportShouYinYuanRuZhangMingXi(params).then(data => {
        if (data.code == 1) {
          self.admissionBank = data.data;
        }
      });
    },
    /**
     * 设置报表日期显示
     */
    autoChagneReportDate() {
      let beginTime;
      let endTime;
      //循环班次
      this.selectShiftData.forEach(item => {
        if (item.value == this.queryObj.shiftPk) {
          beginTime = item.beginTime;
          endTime = item.endTime;
        }
      });
      if (this.queryObj.shiftPk) {
        if (beginTime && endTime && beginTime > endTime) {
          // if (this.queryObj.begenAndEnd[0] == this.queryObj.begenAndEnd[1]) {
          //   this.$set(
          //     this.queryObj.begenAndEnd,
          //     1,
          //     moment(this.queryObj.begenAndEnd[0])
          //       .add(1, "days")
          //       .format("YYYY-MM-DD")
          //   );
          //   this.$alert(
          //     "日期已自动变更为" +
          //       this.queryObj.begenAndEnd[0] +
          //       " 至 " +
          //       this.queryObj.begenAndEnd[1],
          //     "提示",
          //     { type: "warning" }
          //   );
          // }
           if (this.queryObj.begin == this.queryObj.end) {
            this.$set(
              this.queryObj.begin,
              1,
              moment(this.queryObj.begin)
                .add(1, "days")
                .format("YYYY-MM-DD")
            );
            this.$alert(
              "日期已自动变更为" +
                this.queryObj.begin +
                " 至 " +
                this.queryObj.end,
              "提示",
              { type: "warning" }
            );
          }
        }
        // this.reportBeginDate =this.queryObj.begenAndEnd[0] + " " + beginTime.substring(0, 5);
        // this.reportEndDate =this.queryObj.begenAndEnd[1] + " " + endTime.substring(0, 5);
          this.reportBeginDate =this.queryObj.begin + " " + beginTime.substring(0, 5);
        this.reportEndDate =this.queryObj.end + " " + endTime.substring(0, 5);
      } else {
        //班次选择全部
        // if (this.queryObj.begenAndEnd[0] == this.queryObj.begenAndEnd[1]) {
        //   this.$set(
        //     this.queryObj.begenAndEnd,
        //     1,
        //     moment(this.queryObj.begenAndEnd[0])
        //       .add(1, "days")
        //       .format("YYYY-MM-DD")
        //   );
        //   this.$alert(
        //     "日期已自动变更为" +
        //       this.queryObj.begenAndEnd[0] +
        //       " 至 " +
        //       this.queryObj.begenAndEnd[1],
        //     "提示",
        //     { type: "warning" }
        //   );
        // }
        // this.reportBeginDate = this.queryObj.begenAndEnd[0] + " 06:00";
        // this.reportEndDate = this.queryObj.begenAndEnd[1] + " 05:59";
        if (this.queryObj.begin == this.queryObj.end) {
          this.$set(
            this.queryObj.begin,
            1,
            moment(this.queryObj.begin)
              .add(1, "days")
              .format("YYYY-MM-DD")
          );
          this.$alert(
            "日期已自动变更为" +
              this.queryObj.begin +
              " 至 " +
              this.queryObj.end,
            "提示",
            { type: "warning" }
          );
        }
        this.reportBeginDate = this.queryObj.begin + " 06:00";
        this.reportEndDate = this.queryObj.end + " 05:59";
      }
    },

    handleCheckAllChange(val) {
      this.checkedItem = val ? this.allItemList : [];
      this.isIndeterminate = false;
    },
    handleCheckedItemChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allItemList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allItemList.length;
    },
    //导出EXCEL
    downloadExcel() {
      // let url =
      //   "/pms/report/shouYinYuanRuZhangMingXiExcel?begin=" +
      //   this.queryObj.begenAndEnd[0] +
      //   "&end=" +
      //   this.queryObj.begenAndEnd[1] +
      //   "&userPk=" +
      //   this.queryObj.userPk +
      //   "&userName=" +
      //   this.queryObj.userName +
      //   "&shift=" +
      //   this.queryObj.shift +
      //   "&shiftPk=" +
      //   this.queryObj.shiftPk +
      //   "&projectPks=" +
      //   this.checkedItem.join(",");
       let url =
        "/pms/report/shouYinYuanRuZhangMingXiExcel?begin=" +
        this.queryObj.begin +
        "&end=" +
        this.queryObj.end +
        "&userPk=" +
        this.queryObj.userPk +
        "&userName=" +
        this.queryObj.userName +
        "&shift=" +
        this.queryObj.shift +
        "&shiftPk=" +
        this.queryObj.shiftPk +
        "&projectPks=" +
        this.checkedItem.join(",");
      downloadExcel(url, "收银入账明细报表");
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-admissionaccount").innerHTML;
    //   var f = document.getElementById("printIframe");
    //   f.contentDocument.write(bodyhtml);
    //   f.contentDocument.close();
    //   f.contentWindow.print();
    // }
    print() {
      this.createOneFormPage();
      if (this.LODOP) {
        this.LODOP.PREVIEW();
      }
    },
    createOneFormPage() {
      this.LODOP = getLodop();
      if (!this.LODOP) {
        return;
      }
      // this.LODOP.NewPageA(); // 自动分页
      // this.LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //1指定纵向打印，指定A4纸，
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1); // 显示背景
      // this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Full-Width"); // 打印页整宽显示
      // this.LODOP.ADD_PRINT_TABLE(90,10,772,903,document.getElementById("print-admissionaccountTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-admissionaccount").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      // this.LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0, "Horient", 0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "收银员入账明细报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-admissionaccountTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-admissionaccount").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    }
  }
};
</script>

<style scoped>
.exportLink {
  color: white;
  text-decoration: none;
}
.container {
  height: 100%;
}
.el-checkbox {
  margin-top: 5px;
  margin-left: 30px;
}
.table-container {
  padding: 20px;
  text-align: center;
  height: calc(100% - 320px);
  overflow-y: auto;
  border-top: 3px solid #eee;
}
.head-item {
  display: inline-block;
  padding: 0 15px;
}
</style>
<style>
.checkboxgrou span.el-checkbox__label {
  width: 100px;
}
</style>
