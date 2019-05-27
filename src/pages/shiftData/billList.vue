<template>
  <div class="shiftDataBillList" style="max-height:550px;overflow:auto;">
      <el-table v-loading="loading" 
      size="mini" 
      border 
      :data="tableData" 
      row-key="userProjectKey" 
      
      @expand-change="operatorExpandChange"
      :expand-row-keys="orderExpands"
      style="width: 98.5%; margin:10px;">
              <el-table-column type="expand" >
                  <template slot-scope="scope">
                      <billTable v-loading="childLoading" :ref="scope.row.userProjectKey" /> 
                      <el-pagination class="positions" @size-change="ChildHandleSizeChange" @current-change="ChildHandleCurrentChange" :current-page="childQuery.pageNum" :page-size="childQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="childTotal"></el-pagination>
                  </template>
              </el-table-column>
              <el-table-column prop="userName" label="操作员" align="center" >
              </el-table-column>
              <el-table-column prop="projectName" label="营业项目" align="center" >
              </el-table-column>
              <el-table-column prop="shiftNo" label="班次" align="center" >
              </el-table-column>
              <el-table-column label="小计" align="center" >
                      <template slot-scope="scope">
                      <span v-if="scope.row.settlementAmount == 0">{{scope.row.consumptionAmount}}</span>
                      <span v-else>{{scope.row.settlementAmount}}</span>
                  </template>
              </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {shiftDataView} from "@/api/shiftData/shiftData";
import billTable from './billTable'
  import Moment from 'moment'
  export default {
    components:{billTable},
    data () {
      return {
        tableData: [],
        loading:false,
        listQuery:{

        },
        orderExpands:[],
        childLoading:false,
        childQuery:{
            pageNum:1,
            pageSize:10,
            shiftType:1,
            billType:0,
            viewType:0
        },
        childTotal:0
      }
    },
    methods: {
      //操作员展开
      operatorExpandChange(row, expandedRows){
        var that = this
        var bol = false
        var userProjectKey = row.userProjectKey
        for(var i=0;i<expandedRows.length;i++){
          if(userProjectKey == expandedRows[i].userProjectKey){
            bol = true
            break;
          }
        }
        if(bol){
            that.orderExpands = [userProjectKey]
            let param = JSON.parse(JSON.stringify(that.listQuery)) 
            param.userId = row.userId
            param.projectPk = row.projectPk
            param.viewType = 0
            param.projectPk = row.projectPk
            param.userProjectKey = userProjectKey
            that.childQuery = param
            that.operatorShiftDataView()
        }else{
          that.orderExpands = []
        }
      },
      operatorShiftDataView(){
        var that = this
        that.childLoading = true
        shiftDataView(that.childQuery).then(res=>{
            that.$nextTick(()=>{
                that.$refs[that.childQuery.userProjectKey].init(res.data.data)
                that.childTotal = res.data.total
            })
        }).finally(() => {
            that.childLoading = false
        })
      },
      // 分页相关
      ChildHandleSizeChange (val) {
          var that = this
          that.childQuery.pageNum = 1
          that.childQuery.pageSize = val
          that.operatorShiftDataView()
      },
      // 分页相关
      ChildHandleCurrentChange (val) {
          var that = this
          that.childQuery.pageNum = val
          that.operatorShiftDataView()
      },
      //初始化
      init(data,listQuery) {
          this.tableData = data
          this.listQuery = listQuery
          this.orderExpands = []
      }
    }
  }
</script>
<style>

</style>

<style scoped>
.positions {
  float: right;
}
</style>

