// 恢复删除会员
<template>
  <div>
    <!-- form -->
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">删除会员查询</h5>
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
          <!-- <el-select class="member-level" v-model="form.memberGradeName" @change="selectMember">
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
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchDateList" style="margin-left:30px">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">删除会员列表</h5>
      <el-table v-loading="loading" 
      size="mini" 
      border 
      :data="tableData" 
      height="450" 
      style="width: 98.5%; margin:10px;">
        <el-table-column prop="cardNumber" label="卡号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="memName" label="姓名" align="center" width="90">
        </el-table-column>
        <el-table-column prop="memberGrade" label="级别" align="center" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.memberGrade == 'FIT'">散客</span>
            <span v-if="scope.row.memberGrade == 'ORDINARY'">普通会员</span>
            <span v-if="scope.row.memberGrade == 'SENIOR'">高级会员</span>
            <span v-if="scope.row.memberGrade == 'VIP'">VIP会员</span>
            <span v-if="scope.row.memberGrade == 'PLATINUM'">铂金会员</span>
            <span v-if="scope.row.memberGrade == 'HONORABLE'">尊贵会员</span>
          </template>
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
        <el-table-column fixed="right" label="操作" align="center" min-width="160">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="recoverMangerClick(scope.row)" v-if="hasPerm('pms:memberManage:recoveryMember')" type="text" size="mini">恢复会员</el-button>
            <!-- <el-button @click="editMangerClick(scope.row)" type="text" size="mini">修改资料</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="deleteMemberList" :current-page="form.pageNum" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <!-- 用户信息 dialog -->
    <el-dialog title="会员管理" :visible.sync="dialogMemberVisible">
      <div class="body-conten">
        用户信息
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary">修改用户信息</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import bus from '@/utils/bus'
import MemberGrade from '@/components/MemberGrade/MemberGrade'
// import {listGrade} from '@/api/systemSet/member/pmsMemberGradeController'
import {listMember,recoverMember,updateMember} from '@/api/customerRelation/pmsMemberController'
export default {
  components: {MemberGrade},
  data() {
    return {
      dialogMemberVisible: false,
      loading: false,
      memberLevel: [],
      form: {
        deleteFlag: 'Y',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [], //列表数据
      total: 0
    };
  },
  mounted(){
    bus.$on('memberGrade', (res) => { this.memberLevelChange(res) })
  },
  methods: {
    init(){
      this.deleteMemberList();
    },
    searchDateList(){
      this.deleteMemberList(1);
    },
    deleteMemberList(val) {
      this.loading = true
      this.form.pageNum = val;
      listMember(this.form).then(res => {
        this.loading = false;
        this.tableData = res.data.data;
        this.total = res.data.pageSize;
      });
    },
    getSizeChange(val) {
      this.loading = true
      this.form.pageSize = val;
      listMember(this.form).then(res => {
        this.loading = false
        this.tableData = res.data.data;
        this.total = res.data.pageSize;
      });
    },
    recoverMangerClick(row) {
      //恢复会员
      this.$confirm('确定恢复此会员？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        //确认操作
        recoverMember({memPk: row.memPk}).then(res => {
          console.log(res.code)
          if(res.code == 1){
            this.$message({
              type: 'success',
              message: '恢复成功'
            });
            this.deleteMemberList();
          }
        });
      })
    },
    editMangerClick(row) {
      //修改资料
      this.dialogMemberVisible = true
      console.log(row);
    },
    //会员等级改变触发
    memberLevelChange(res){
      this.form.gradePk=res.form.memberGrade;
      // this.form.cardFee=res.form.cardFee;
      // this.form.invalidDateCard=res.form.invalidDateCard;
    },
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
.positions {
  float: right;
}
</style>

