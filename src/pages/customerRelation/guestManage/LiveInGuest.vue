//在住客人
<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">在住客人账户查询</h5>
        <div class="info-li">
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
          <el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="guestSearch">搜索</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- table -->
    <el-row class="bg-reserve">
      <el-col :span="24" class="book-info">
        <h5 class="info-title">账户列表</h5>
        <el-table v-loading="loading"
          size="mini"
          height="450"
          border 
          :data="tableData" 
          style="width: 98.5%; margin:10px;"> 
          <el-table-column prop="cardNumber" label="会员号" align="center" width="100">
          </el-table-column>
          <el-table-column prop="memberGrade" label="类型" align="center" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.memberGrade == 'FIT'">散客</span>
              <span v-if="scope.row.memberGrade == 'ORDINARY'">普通会员</span>
              <span v-if="scope.row.memberGrade == 'SENIOR'">高级会员</span>
              <span v-if="scope.row.memberGrade == 'VIP'">VIP会员</span>
              <span v-if="scope.row.memberGrade == 'PLATINUM'">铂金会员</span>
              <span v-if="scope.row.memberGrade == 'HONORABLE'">尊贵会员</span>
            </template>
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
          <el-table-column prop="beginAndEnd" label="起止时间" align="center" width="160">
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" align="center" min-width="160">
            <template slot-scope="scope">
              <Operation :row="scope.row" />
            </template>
          </el-table-column> -->
        </el-table>
        <div class="block teamPagination"  >
        <el-pagination @current-change="getLiveGuestPageNum" @size-change="getLiveGuestPageSize" :page-sizes="[5,10,20,30,40,50]" :current-page="form.pageNum" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Operation from "./LiveInGuestOperation";
import {liveInProject,historyLiveInProject} from '@/api/customerRelation/GuestManagement/pmsGuestManagement'
export default {
  components: { Operation },
  data() {
    return {
      dialogHistoryVisible: false,
      loading: false,
      form: {
        memName:'', 
        certificateNo:'', 
        memPhone:'', 
        cardNumber:'', 
        carNumber:'',
        pageNum:1,
        pageSize:10
      },
      tableData: [],
      total:0
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
      liveInProject(parameters).then(res => {
        console.log(res.data.data)
        this.loading = false
        this.tableData = res.data.data;
        this.total = res.data.total;
        console.log(this.tableData)
      });
    },
    getLiveGuestPageNum(val){
        this.form.pageNum = val;
        this.liveInListData();
    },
    getLiveGuestPageSize(val){
        this.form.pageSize = val;
        this.liveInListData();
    }
    ,
    guestSearch(){
      this.liveInListData();
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
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
}
</style>
