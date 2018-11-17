// 申领列表
<template>
  <div class="application-list">
    <el-form ref="form" size="mini" :model="form" label-width="80px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="货单编号">
            <el-input v-model="form.applyNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="操作人">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="审批状态">
            <el-select v-model="form.approvalStatus" placeholder="请选择" clearable>
              <el-option v-for="(v,k) in approvalStatusMap" :key="k" :label="v" :value="k">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="申领状态">
            <el-select v-model="form.status" placeholder="请选择" clearable>
              <el-option v-for="(v,k) in outStatusMap" :key="k" :label="v" :value="k">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="block">
          <el-button type="primary" @click="searchList(form)" size="mini">搜索</el-button>
        </div>
      </el-row>
    </el-form>
    <el-table :data="tableData" border height="400" style="width: 100%">
      <el-table-column prop="applyNo" label="货单编号"> </el-table-column>
      <el-table-column prop="oaApplyNo" label="OA申请单号"> </el-table-column>
      <el-table-column prop="userName" label="操作人"> </el-table-column>
      <el-table-column prop="approvalStatus" label="审批状态">
        <template slot-scope="scope">
          <span>{{approvalStatusMap[scope.row.approvalStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="申领状态">
        <template slot-scope="scope">
          <span>{{outStatusMap[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isConfirm" label="确认收货">
        <template slot-scope="scope">
          <span v-if="scope.row.outId && scope.row.isConfirm==1">已确认</span>
          <span v-else>未确认</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间">
        <template slot-scope="scope">
          {{moment(scope.row.createTime).format('YYYY-MM-DD HH:MM:ss')}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="clickDetail(scope.row)">详细</el-button>

          <template v-if="scope.row.approvalStatus == 1">
            <el-button type="success" size="mini" @click="clickTake(scope.row)" v-if="scope.row.outStatus==2">入库完成</el-button>
            <el-button type="primary" size="mini" @click="clickTake(scope.row)" v-else-if="scope.row.isConfirm==1">入库</el-button>
            <el-button type="primary" size="mini" :disabled="true" v-else-if="scope.row.status==0">等待出库</el-button>
            <el-button type="primary" size="mini" @click="clickTake(scope.row)" v-else-if="scope.row.status>0">确认收货</el-button>
          </template>

          <el-button type="danger" size="mini" @click="cancelApply(scope.row.oaApplyNo)" v-if="scope.row.approvalStatus==0">取消申请</el-button>
          <!-- <el-button type="danger" size="mini" v-else-if="scope.row.approvalStatus==0">已取消</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="margin: 10px 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 申领详细 -->
    <el-dialog title="申领详细" :visible.sync="dialogVisible" width="800px">
      <div class="forminfo">
        <el-row>
          <el-col :span="12">货单编号：{{currApplyForm.applyNo}} </el-col>
          <el-col :span="12">OA申请单号：{{currApplyForm.oaApplyNo}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">审批状态：{{approvalStatusMap[currApplyForm.approvalStatus]}} </el-col>
          <el-col :span="12">申领状态：{{outStatusMap[currApplyForm.status]}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">操作人：{{currApplyForm.userName}} </el-col>
          <el-col :span="12">申请时间：{{moment(currApplyForm.createTime).format('YYYY-MM-DD HH:MM:ss')}}</el-col>
        </el-row>
      </div>
      <el-table :data="detailTableData" height="250" border style="width: 100%">
        <el-table-column prop="inventoryNo" label="货物编号">
        </el-table-column>
        <el-table-column prop="inventoryName" label="货物名称">
        </el-table-column>
        <el-table-column prop="shortName" label="简称">
        </el-table-column>
        <el-table-column prop="typeName" label="货物类型">
        </el-table-column>
        <el-table-column prop="price" label="货物单价">
        </el-table-column>
        <el-table-column prop="unit" label="单位">
        </el-table-column>
        <el-table-column prop="spec" label="规格">
        </el-table-column>
        <el-table-column prop="amount" label="货物数量">
        </el-table-column>
        <!-- <el-table-column prop="quantityNum" label="出库数量">
        </el-table-column> -->
        <el-table-column prop="remark" label="备注">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button> -->
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 出库详细 -->
    <el-dialog title="出库详细" :visible.sync="dialogVisible2" width="800px">
      <div class="forminfo">
        <el-row>
          <el-col :span="12">货单编号：{{outForm.inventoryNo}} </el-col>
          <el-col :span="12">收货确认：{{outForm.isConfirm==1?'已收货':'未确认'}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">操作人：{{outForm.userName}} </el-col>
          <el-col :span="12">出货时间：{{outForm.createTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">入库状态：{{inStatusMap[outForm.status]}} </el-col>
        </el-row>
      </div>
      <el-table :data="outDetails" height="250" border style="width: 100%">
        <el-table-column prop="inventoryNo" label="货物编号">
        </el-table-column>
        <el-table-column prop="inventoryName" label="货物名称">
        </el-table-column>
        <el-table-column prop="shortName" label="简称">
        </el-table-column>
        <el-table-column prop="typeName" label="货物类型">
        </el-table-column>
        <el-table-column prop="price" label="货物单价">
        </el-table-column>
        <el-table-column prop="unit" label="单位">
        </el-table-column>
        <el-table-column prop="spec" label="规格">
        </el-table-column>
        <el-table-column prop="amount" label="货物数量">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickOutConfirm(outForm.outId)" v-if="outForm.isConfirm==0" size="mini">确认收货</el-button>
        <el-button type="primary" @click="clickToInventoryIn(outForm.outId)" v-if="outForm.isConfirm==1 && outForm.status<2" size="mini">入库</el-button>
        <el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import moment from "moment";
import Cookies from "js-cookie";
import { approvalStatusMap, outStatusMap,inStatusMap } from "@/utils/orm";
import { applyList, applyDetailList,outInventoryInfo,outConfirm } from "@/api/upmsStorage";
import { cancelApply } from "@/api/oaApi";


export default {
  data() {
    return {
      moment: moment,
      dialogVisible: false,
      dialogVisible2: false,
      approvalStatusMap: approvalStatusMap,
      outStatusMap: outStatusMap,
      inStatusMap:inStatusMap,
      form: {
        applyNo: null,
        userName: null,
        approvalStatus: null,
        status: null,
        companyPk: Cookies.get("select_company_pk")
      },
      currApplyForm:{},
      outForm:{},//出货单
      outDetails:[],//出货详细
      tableData: [],
      detailTableData:[],
      pickerTime: "",
      cascaderList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    init() {
      this.applyFromList();
    },
    applyFromList() {
      var data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        applyNo: this.form.applyNo,
        userName: this.form.userName,
        approvalStatus: this.form.approvalStatus,
        status: this.form.status,
        companyPk: this.form.companyPk
      };
      applyList(data).then(res => {
        this.tableData = res.data.list;
        this.total = Number(res.data.total);
      });
    },
    searchList(formList) {
      this.applyFromList();
    },
    //分页相关
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageNum = 1;
      this.applyFromList();
    },
    //分页相关
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.applyFromList();
    },
    //查看详细
    clickDetail(row) {
      this.currApplyForm = row
      applyDetailList({applyId:row.applyId}).then(res=>{
        this.detailTableData = res.data;
      })
      this.dialogVisible = true;
    },
    //查看收货
    clickTake(row){
      this.outForm = {};
      this.outDetails = [];
      outInventoryInfo({applyId:row.applyId}).then(res=>{
        this.outForm = res.data.invOut;
        this.outDetails = res.data.outDetails;
      })
      this.dialogVisible2 = true;
    },
    //确认收货
    clickOutConfirm(outId){
      outConfirm(outId).then(res=>{
        this.$message.success("收货成功！");
        this.dialogVisible2 = false;
        this.init();
      })
    },
    //取消申请
    cancelApply(oaApplyNo){
      this.$confirm('此操作将取消申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelApply({exNo:oaApplyNo}).then(res=>{
          this.$message.success("取消成功！");
          this.init();
        })
      });

    },
    //跳转到出库TAB
    clickToInventoryIn(outId) {
      this.dialogVisible2 = false;
      this.$emit('to-inventory-in', outId);
    },
    
  }
};
</script>
<style scoped>

.block {
  margin-left: 13px;
  margin-bottom: 20px;
}
.forminfo{
  line-height: 26px;
  margin-bottom: 16px;
}
</style>
<style>
.application-list .el-dialog__body{
  padding: 0px 20px !important;
}
</style>
