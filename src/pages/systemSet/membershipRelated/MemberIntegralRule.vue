<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-button type="primary" size="mini" class="add-pro" @click="addRows">添加规则</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="companyName" label="所属酒店" align="center">
        </el-table-column>
        <el-table-column prop="companyName" label="规则名称" align="center">
        </el-table-column>
        <el-table-column prop="companyName" label="方式类型" align="center" width="90">
        </el-table-column>
        <el-table-column prop="companyName" label="会员等级" align="center" width="90">
        </el-table-column>
        <el-table-column prop="companyName" label="天数/金额" align="center" width="90">
        </el-table-column>
        <el-table-column prop="companyName" label="积多少分" align="center" width="90">
        </el-table-column>
        <el-table-column prop="companyName" label="备注" align="center" width="100">
        </el-table-column>
        <el-table-column prop="companyName" label="操作" align="center" width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {listGrade,addGrade,updateGrade} from '@/api/systemSet/member/pmsMemberIntegralRule'
  export default {
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
        listGrade(this.pageObj).then(result => {
            this.tableData = result.data.data
            this.pageObj.total = res.data.total
            self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.loading = false
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
      }
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
