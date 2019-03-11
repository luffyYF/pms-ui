<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" v-if="queryPower" @click="listRule()">查询</el-button>
      <el-button type="primary" size="mini" class="add-pro" v-if="hasPerm('pms:rechargeGiveRule:add')" @click="addClick()">添加规则</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="ruleName" label="规则名称" align="center">
        </el-table-column>
        <el-table-column prop="gradeName" label="卡类型" align="center">
        </el-table-column>
        <el-table-column prop="count" label="规则类型" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.type == 1 ">活动赠送</span>
                <span v-else>常规赠送</span>
            </template>
        </el-table-column>
        <el-table-column prop="integral" label="生效时间" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.type == 1 ">{{scope.row.beginDate}}至{{scope.row.endDate}}</span>
                <span v-else>***至***</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
            <template slot-scope="scope">
                <el-button type="primary" v-if="hasPerm('pms:rechargeGiveRule:update')" @click="editClick(scope.row)" 
                        size="mini">编辑
                </el-button>
                <el-button type="danger" v-if="hasPerm('pms:rechargeGiveRule:delete')" @click="deleteClick(scope.row.rulePk)"
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
    <MemberRechargeGiveRuleEdit ref="MemberRechargeGiveRuleEditRef" @callback="listRule"/>
  </div>
</template>

<script>
  import {listGrade,delRule,listRule } from '@/api/systemSet/member/pmsMemberRechargeGiveRule'
  import MemberRechargeGiveRuleEdit from './MemberRechargeGiveRuleEdit'
  export default {
   components: { MemberRechargeGiveRuleEdit },
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
        },
        queryPower:this.hasPerm("pms:rechargeGiveRule:list")
      }
    },
    mounted(){
      // this.init()
    },
    methods: {
      init() {
        this.listRule()
      },
      listRule(){
        if(!this.queryPower){
          this.$message({ type: 'warning', message: "权限不足" })
          return
        }
        listRule(this.pageObj).then(result => {
            this.tableData = result.data.data
            this.pageObj.total = result.data.total
            self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.loading = false
        })
      },
      addClick(){
        this.$refs.MemberRechargeGiveRuleEditRef.showDialog()
      },
      editClick(row){
        var temoObj = JSON.parse(JSON.stringify(row))
        this.$refs.MemberRechargeGiveRuleEditRef.showDialog(temoObj)
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
