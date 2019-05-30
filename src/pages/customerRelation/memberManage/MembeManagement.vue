// 会员管理
<template>
  <div>
    <!-- form -->
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">会员查询</h5>
        <el-form-item label="卡号">
          <el-input v-model="form.cardNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.memName" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.memPhone" clearable></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="form.certificateNo" clearable></el-input>
        </el-form-item>
        <el-form-item label="会员级别">
          <!-- <el-select class="member-level" v-model="form.memberGradeName" @change="memberLevelChange">
            <el-option label="全部" value="全部"></el-option>
            <el-option
              v-for="(item,index) in memberLevel"
              :key="index"
              :label="item.gradeName"
              :value="item.gradeName">
            </el-option>
          </el-select> -->
          <member-grade v-model="form.gradePk"/>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker v-model="form.invalidDateCard" value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="seaechFromList" style="margin-left:30px">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">会员列表</h5>
      <el-table v-loading="loading"
      size="mini"
      border

:data="tableData"      style="width: 98.5%; margin:10px;">
        <el-table-column prop="cardNumber" label="卡号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="memName" label="姓名" align="center" width="90">
        </el-table-column>
        <el-table-column prop="gradeName" label="级别" align="center" width="90">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.memberGrade == 'FIT'">散客</span>
            <span v-if="scope.row.memberGrade == 'ORDINARY'">普通会员</span>
            <span v-if="scope.row.memberGrade == 'SENIOR'">高级会员</span>
            <span v-if="scope.row.memberGrade == 'VIP'">VIP会员</span>
            <span v-if="scope.row.memberGrade == 'PLATINUM'">铂金会员</span>
            <span v-if="scope.row.memberGrade == 'HONORABLE'">尊贵会员</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="nativePlace" label="籍贯" align="center" width="90">
        </el-table-column>
        <el-table-column prop="certificateType" label="证件类型" align="center" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.certificateType == 'TWO_IDENTITY'">二代身份证</span>
            <span v-if="scope.row.certificateType == 'ONE_IDENTITY'">一代身份证</span>
            <span v-if="scope.row.certificateType == 'ORDER'">其他</span>
            <span v-if="scope.row.certificateType == 'DRIVER'">驾驶证</span>
            <span v-if="scope.row.certificateType == 'PASSPORT'">护照</span>
            <span v-if="scope.row.certificateType == 'OFFICERS'">军官证</span>
            <span v-if="scope.row.certificateType == 'SOLDIER'">士兵证</span>
            <span v-if="scope.row.certificateType == 'HK_MACAO_PASS'">港澳通行证</span>
            <span v-if="scope.row.certificateType == 'RETURN_HOME'">回乡证</span>
            <span v-if="scope.row.certificateType == 'TEMP_IDENTITY'">临时身份证</span>
            <span v-if="scope.row.certificateType == 'BOOKLET'">户口簿</span>
            <span v-if="scope.row.certificateType == 'POLICE_OFFICER'">警官证</span>
          </template>
        </el-table-column>
        <el-table-column prop="certificateNo" label="证件号" align="center" width="200">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center" width="200">
        </el-table-column>
        <el-table-column prop="memPhone" label="手机号码" align="center" width="120">
        </el-table-column>
        <el-table-column prop="availableBalance" label="可用余额" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.availableBalance|toMoney}}
          </template>
        </el-table-column>

        <el-table-column prop="rechargeGiftAmount" label="充值赠送合计" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.rechargeGiftAmount|toMoney}}
          </template>
        </el-table-column>
        <el-table-column prop="frozenBalance" label="冻结金额" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.frozenBalance|toMoney}}
          </template>
        </el-table-column>
        <el-table-column prop="totalConsume" label="消费合计" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.totalConsume|toMoney}}
          </template>
        </el-table-column>
        <el-table-column prop="totalIntegral" label="累计积分" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.totalIntegral|toMoney}}
          </template>
        </el-table-column>
        <el-table-column prop="availableIntegral" label="可用积分" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.availableIntegral|toMoney}}
          </template>
        </el-table-column>
         <el-table-column prop="housingDays" label="住房天数" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.housingDays|toMoney}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <el-button @click="memberMangerClick(scope.row)" type="text" size="mini">会员管理</el-button>
            <el-button @click="memberRechargeClick(scope.row)" type="text" size="mini" :disabled="scope.row.rechargeFlag == 'N'">充值</el-button>
            <el-button @click="rechargeDetailClick(scope.row)" type="text" size="mini">充值明细</el-button>
            <el-button @click="integralDetailClick(scope.row)" type="text" size="mini">积分明细</el-button>
            <el-button @click="consumptionDetailClick(scope.row)" type="text" size="mini">消费明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="memberListData" :current-page="form.pageNum" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <MemberInfoDialog ref="MemberInfoDialogRef" @callback="memberListData(1)" />
    <member-recharge ref="memberRechargeRefs" @callback="memberListData(form.pageNum)"></member-recharge>
    <member-recharge-detail-dialog ref="memberRechargeDetailDialogRefs" @callback="memberListData(form.pageNum)"></member-recharge-detail-dialog>
    <member-integral-detail-dialog ref="memberIntegralDetailDialogRefs" @callback="memberListData(form.pageNum)"></member-integral-detail-dialog>
    <member-consumption-detail-dialog ref="memberConsumptionDetailDialogRefs" @callback="memberListData(form.pageNum)"></member-consumption-detail-dialog>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import MemberGrade from "@/components/MemberGrade/MemberGrade";
import MemberInfoDialog from "./MemberInfoDialog";
import {
  listMember,
  recoverMember,
  updateMember,
  listMemberById
} from "@/api/customerRelation/pmsMemberController";
import { findGrade } from "@/api/customerRelation/pmsMemberGradeController";
import MemberRecharge from "./MemberRecharge/MemberRecharge.vue"
import MemberRechargeDetailDialog from "./MemberRecharge/MemberRechargeDetailDialog.vue"
import MemberIntegralDetailDialog from "./MemberIntegral/MemberIntegralDetailDialog.vue"
import MemberConsumptionDetailDialog from "./MemberConsumption/MemberConsumptionDetailDialog.vue"

export default {
  components: { MemberGrade, MemberRecharge, MemberRechargeDetailDialog, MemberIntegralDetailDialog, MemberConsumptionDetailDialog,MemberInfoDialog },
  data() {
    return {
      memberLevel: [],
      dialogMemberVisible: false,
      loading: false,
      form: {
        deleteFlag: "N",
        pageNum: 1,
        pageSize: 10
      },
      tableData: [], //列表数据
      membeInfo: "", //会员资料
      total: 0
    };
  },
  mounted() {
    bus.$on("memberGrade", res => {
      this.memberLevelChange(res);
    });
  },
  methods: {
    init() {
      this.memberListData(1);
    },
    memberListData(val) {
      if(!this.hasPerm("pms:memberManage:list")){
        this.$message({type:'warning', message:'权限不足'})
        return
      }
      this.loading = true;
      this.form.pageNum = val;
      listMemberById(this.form).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.data.pageSize;
        console.log(this.tableData);
      });
    },
    getSizeChange(val) {
      this.loading = true;
      this.form.pageSize = val;
      listMemberById(this.form).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.data.pageSize;
        this.form.pageNum = 1;
        console.log(this.tableData);
      });
    },
    seaechFromList() {
      this.memberListData(this.form.pageNum);
    },
    memberMangerClick(row) {
      // this.membeInfo = row;
      // this.dialogMemberVisible = true;
      this.$refs.MemberInfoDialogRef.showDialog(row);
    },
    delMemberList() {
      this.memberListData(1);
    },
    //会员等级改变触发
    memberLevelChange(res) {
      this.form.gradePk = res.form.memberGrade;
      // this.form.cardFee=res.form.cardFee;
      // this.form.invalidDateCard=res.form.invalidDateCard;
    },
    memberRechargeClick (row) {
      this.$nextTick(()=>{
        this.$refs.memberRechargeRefs.showDialog(row,true)
      })
    },
    rechargeDetailClick (row) {
      this.$nextTick(()=>{
         this.$refs.memberRechargeDetailDialogRefs.showDialog(row.memPk, 0)
      })
    },
    integralDetailClick (row) {
      this.$nextTick(()=>{
        this.$refs.memberIntegralDetailDialogRefs.showDialog(row.memPk, 1)
      })
    },
    consumptionDetailClick (row) {
      this.$nextTick(()=>{
        this.$refs.memberConsumptionDetailDialogRefs.showDialog(row.memPk)
      })
      
    }
  },
  filters: {
    toMoney: function(num) {
      if(num){
        if(isNaN(num)) {
          alert("金额中含有不能识别的字符");
          return;
        }
        num = typeof num == "string"?parseFloat(num):num//判断是否是字符串如果是字符串转成数字
        num = num.toFixed(2);//保留两位
        num = parseFloat(num);//转成数字
        num = num.toLocaleString();//转成金额显示模式
        //判断是否有小数
        if(num.indexOf(".")==-1){
            num = num+".00";
        }else{
            num = num.split(".")[1].length<2?num+"0":num;
        }
        return num;//返回的是字符串23,245.12保留2位小数
      } else {
        return num = 0;
      }
    }
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
.body-conten {
  background: #f7f7f7;
  padding: 10px;
}
.height38 {
  height: 38px;
  padding: 20px 10px 0 10px;
}
.height110 {
  height: 110px;
  padding: 20px 10px 0 10px;
}
.positions {
  float: right;
}
</style>
<style>
.dialogMemberManage .el-dialog .el-dialog__body {
  padding: 0;
}
</style>

