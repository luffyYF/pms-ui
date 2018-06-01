// 历史客人
<template>
  <div>
    <!-- form -->
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">历史客人账户查询</h5>
        <el-form-item label="姓名">
          <el-input v-model="form.memName"></el-input> 
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="form.certificateNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.memPhone"></el-input>
        </el-form-item>
        <el-form-item label="会员号">
          <el-input v-model="form.cardNumber"></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="form.carNumber"></el-input>
        </el-form-item>
        <!-- <el-form-item label="房间类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="房间号">
          <el-input v-model="form.roomNumber"></el-input>
        </el-form-item>
        <el-form-item label="发票">
          <el-input v-model="form.invoiceTitle"></el-input>
        </el-form-item>
        <!-- <el-form-item label="协议单位">
          <el-input v-model="form.xxx" :disabled="true"></el-input>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-button type="text" @click="agreementUnit = true">选择</el-button>
          <el-button type="text">清除</el-button>
        </el-form-item>
        <br> -->
        <!-- <el-form-item label="起始日期">
          <el-date-picker v-model="beginDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker v-model="endDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="guestSearch">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve pd">
      <h5 class="info-title">账户列表</h5>
      <el-table v-loading="loading" 
      size="mini" 
      border 
      :data="tableData" 
      style="width: 98.5%; margin:10px;" height="450">
        <el-table-column prop="cardNumber" label="会员号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="gradeName" label="类型" align="center" width="90">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.memberGrade == 'FIT'">散客</span>
            <span v-if="scope.row.memberGrade == 'ORDINARY'">普通会员</span>
            <span v-if="scope.row.memberGrade == 'SENIOR'">高级会员</span>
            <span v-if="scope.row.memberGrade == 'VIP'">VIP会员</span>
            <span v-if="scope.row.memberGrade == 'PLATINUM'">铂金会员</span>
            <span v-if="scope.row.memberGrade == 'HONORABLE'">尊贵会员</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="memName" label="姓名" align="center" width="90">
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
        <el-table-column prop="carNumber" label="车牌号" align="center" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center" width="200">
        </el-table-column>
        <el-table-column prop="memPhone" label="手机号码" align="center" width="120">
        </el-table-column>
        <el-table-column prop="roomNumber" label="房号" align="center" width="90">
        </el-table-column>
        <el-table-column prop="invoiceTitle" label="发票" align="center" width="160">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="mini">修改资料</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="block HistoryGuestPagination"  >
        <el-pagination @current-change="getHistoetGuestPageNum" @size-change="getHistoetGuestPageSize" :page-sizes="[5,10,20,30,40,50]" :current-page="form.pageNum" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        </div>
    </div>

    <el-dialog title="选择协议单位" :visible.sync="agreementUnit" width="55%">
      <el-col :span="24">
        <div class="demo-input-suffix">
          协议号：<el-input v-model="protocolNumber" size="mini" style="width:120px"></el-input>
          协议类别：<el-select v-model="protocolNumber" placeholder="请选择协议类别" size="mini" style="width:120px">
                   <el-option label="全部" value="shanghai"></el-option>
                   <el-option label="旅游团" value="beijing"></el-option>
                 </el-select>
          单位名称：<el-input v-model="protocolNumber" size="mini" style="width:120px"></el-input>
                <el-button type="primary" size="mini">查询</el-button>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 10px;">
        <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="vipNumber" label="协议号"></el-table-column>
          <el-table-column prop="nativePlace" label="单位名称"></el-table-column>
          <el-table-column prop="type" label="协议分类"></el-table-column>
          <el-table-column prop="name" label="联系人"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="margin: 10px 0;">
        <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="vipNumber" label="房类"></el-table-column>
          <el-table-column prop="nativePlace" label="原价"></el-table-column>
          <el-table-column prop="type" label="折扣"></el-table-column>
          <el-table-column prop="name" label="折扣价"></el-table-column>
          <el-table-column prop="name" label="佣金"></el-table-column>
          <el-table-column prop="name" label="备注"></el-table-column>
        </el-table>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="agreementUnit = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="agreementUnit = false">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
import {liveInProject,historyLiveInProject} from '@/api/customerRelation/GuestManagement/pmsGuestManagement'
export default {
  data() {
    return {
      form: {
        memName: '', 
        certificateNo: '', 
        memPhone: '', 
        cardNumber: '', 
        carNumber: '', 
        roomNumber: '', 
        invoiceTitle: '',
        pageNum:1,
        pageSize:10
      },
      agreementUnit: false,
      loading: false,
      protocolNumber: '',
      tableData: [],
      total:0, //账户列表数据
      beginDate: new Date(),
      endDate: new Date()
    };
  },
  created () {
    this.liveInListData();
  },
  methods: {
    liveInListData(){
      const self = this;
      const parameters = self.form;
      this.loading = true
      historyLiveInProject(parameters).then(res => {
        this.loading = false
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    getHistoetGuestPageNum(val){
        this.form.pageNum = val;
        this.liveInListData();
    },
    getHistoetGuestPageSize(val){
        this.form.pageSize = val;
        this.liveInListData();
    },
    guestSearch(){
      this.liveInListData();
    }
  }



};
</script>

<style scoped>
.pd{
  padding-bottom: 40px;
}
.HistoryGuestPagination{
  float:right;
  margin: 0 20px 10px 0;
}
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
</style>
