//会员积分规则
<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro"  @click="listIntegralExchangeLog()">查询</el-button>
      <!-- <el-button type="primary" size="mini" class="add-pro" v-if="hasPerm('pms:memberIntegralRule:add')" @click="addClick()">添加明细</el-button> -->
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        :summary-method="getSummaries"
        show-summary
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="companyName" label="所属酒店" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="积分时间" align="center">
        </el-table-column>
        <!-- <el-table-column prop="type" label="方式类型" align="center" width="200">
           <template slot-scope="scope">
                <span v-if="scope.row.type == 0 ">按房费</span>
                <span v-else-if="scope.row.type == 1 ">按房夜数</span>
                <span v-else-if="scope.row.type == 2 ">按总消费</span>
            </template>
        </el-table-column> -->
        <el-table-column prop="roomNumber" label="房号" align="center" width="200">
        </el-table-column>
        <el-table-column prop="moneyAmount" label="消费" align="center" width="150">
        </el-table-column>
        <el-table-column sortable prop="integral" label="积分" align="center" width="150">
        </el-table-column>
         <el-table-column prop="createUserName" label="操作人" align="center" width="150">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="200">
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" width="200" fixed="right">
            <template slot-scope="scope">
                <el-button type="primary" v-if="hasPerm('pms:memberIntegralRule:update')" @click="editClick(scope.row)" 
                        size="mini">编辑
                </el-button>
                <el-button type="danger" v-if="hasPerm('pms:memberIntegralRule:delete')" @click="deleteClick(scope.row.rulePk)"
                    size="mini">删除
                </el-button>
            </template>
        </el-table-column> -->
      </el-table>
      <!-- <el-pagination
          style="margin: 10px 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageObj.total">
        </el-pagination> -->
    </div>
    <!-- <MemberIntegralRuleEdit ref="MemberIntegralRuleEditRef" @callback="listRule"/> -->
  </div>
</template>

<script>
import {listIntegralExchangeLog} from '@/api/systemSet/member/pmsMemberIntegralExchangeLog'
  export default {
//    components: { MemberIntegralRuleEdit },
    data() {
      return {
        tableData: [],
        //gradeList:[],
        loading:false,
        // pageObj:{
        //     total:0,
        //     pageNum:1,
        //     pageSize:10
        // },
        // queryPower:this.hasPerm("pms:memberIntegralRule:list")
      }
    },
    mounted(){
      // this.init()
    },
    methods: {
      init() {
        this.listIntegralExchangeLog();
      },
      listIntegralExchangeLog(){
        // if(!this.queryPower){
        //   this.$message({ type: 'warning', message: "权限不足" })
        //   return
        // }
        listIntegralExchangeLog(this.pageObj).then(result => {
            this.tableData = result.data.data
            // this.pageObj.total = result.data.total
            self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.loading = false
        })
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if (index == 2) {
             sums[index] = 'N/A';
          }
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
    //   addClick(){
    //     this.$refs.MemberIntegralRuleEditRef.showDialog()
    //   },
    //   editClick(row){
    //     var temoObj = JSON.parse(JSON.stringify(row))
    //     this.$refs.MemberIntegralRuleEditRef.showDialog(temoObj)
    //   },
    //   deleteClick (id) {
    //     this.$confirm('确定删除数据?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       delRule(id).then(res => {
    //           if(res.code == 1){
    //               this.listRule()
    //           }
    //         this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
    //       })
    //     })
    //   },
    //   listGrade(row){
    //     const self = this
    //     self.gradeList = [];
    //     listIntegralExchangeLog().then(result => {
    //         if(row){
    //             self.gradeList.push({
    //                 gradePk:row.gradePk,
    //                 gradeName:row.grade
    //             })
    //         }
    //         self.gradeList = self.gradeList.concat(result.data)
    //     }).catch(() => {
    //     }).finally(()=>{
    //     })
    //   },
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
