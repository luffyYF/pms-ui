<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-button type="primary" size="mini" class="add-pro" @click="addClick()">添加规则</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="companyName" label="所属酒店" align="center">
        </el-table-column>
        <el-table-column prop="ruleName" label="规则名称" align="center">
        </el-table-column>
        <el-table-column prop="type" label="方式类型" align="center" width="200">
        </el-table-column>
        <el-table-column prop="gradeName" label="会员等级" align="center" width="200">
        </el-table-column>
        <el-table-column prop="count" label="天数/金额" align="center" width="150">
        </el-table-column>
        <el-table-column prop="integral" label="积多少分" align="center" width="150">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="200">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
                <el-button type="primary" @click="editClick(scope.row)" 
                        size="mini">编辑
                </el-button>
                <el-button type="danger" @click="deleteClick(scope.row.rulePk)"
                    size="mini">删除
                </el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin: 10px 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageObj.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageObj.total">
        </el-pagination>
    </div>
    <MemberIntegralRuleEdit ref="MemberIntegralRuleEditRef" @callback="listRule"/>
  </div>
</template>

<script>
  import {listGrade,delRule,listRule } from '@/api/systemSet/member/pmsMemberIntegralRule'
  import MemberIntegralRuleEdit from './MemberIntegralRuleEdit'
  export default {
   components: { MemberIntegralRuleEdit },
    data() {
      return {
        options:[],
        tableData: [],
        gradeList:[],
        loading:false,
        pageObj:{
            total:0,
            pageNum:1,
            pageSize:10
        }
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init() {
        this.listRule()
      },
      listRule(){
        listRule(this.pageObj).then(result => {
            this.tableData = result.data.data
            this.pageObj.total = res.data.total
            self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.loading = false
        })
      },
      addClick(){
        this.$refs.MemberIntegralRuleEditRef.showDialog()
      },
      editClick(row){
        this.$refs.MemberIntegralRuleEditRef.showDialog(row)
      },
      deleteClick (id) {
        this.$confirm('确定删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRule(id).then(res => {
              if(res.code == 1){
                  this.listRule()
              }
            this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
          })
        })
      },
      listGrade(row){
        const self = this
        self.gradeList = [];
        listGrade().then(result => {
            if(row){
                self.gradeList.push({
                    gradePk:row.gradePk,
                    gradeName:row.grade
                })
            }
            self.gradeList = self.gradeList.concat(result.data)
        }).catch(() => {
        }).finally(()=>{
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.pageObj.pageSize = val
        this.listRule()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.pageObj.pageNum = val
        this.listRule()
      },
    }
  }
</script> 

<style scoped>
.checked{
  margin-bottom: 5px;
}
.el-input{
  width: 60px;
}
.el-input.claName{
  width: 90px;
}
.el-date-editor--time{
  width: 120px;
}
.el-Name{
  width: 120px;
}
.el-radio+.el-radio{
  margin-left: 0;
}
.el-radio .el-radio__label {
  padding-left: 3px;
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
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.span{
  margin-right: 5px;
}
</style>
