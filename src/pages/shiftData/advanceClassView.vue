// 会员管理
<template>
  <div>
    <!-- form -->
    <el-form ref="form" :inline="false" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">交班账务</h5>
        <el-form-item label="班次">
            <el-radio-group size="mini" @change="paramChange"  v-model="listQuery.shiftType">
                <el-radio-button :label="0">上班</el-radio-button>
                <el-radio-button :label="1">本班</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="账务类型">
            <el-radio-group size="mini" @change="paramChange"  v-model="listQuery.billType">
                <el-radio-button :label="0">权责</el-radio-button>
                <el-radio-button :label="1">收付</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="查询方式">
            <el-radio-group size="mini" @change="paramChange" v-model="listQuery.viewType ">
                <el-radio-button :label="0">消费时间</el-radio-button>
                <el-radio-button :label="1">营业项目</el-radio-button>
                <el-radio-button :label="2">订单</el-radio-button>
                <el-radio-button :label="3">操作员</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="listShiftData(1)">搜索</el-button>
        </el-form-item> -->
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
        <h5 class="info-title">账务列表</h5>
        <billTable ref="billTableRef" v-if="viewType == 0 " /> 

        <div class="shiftDataBillList" v-else-if="viewType == 1 "> 
            <el-table v-loading="loading" 
            size="mini" 
            border 
            :data="tableData" 
            row-key="projectPk"
            height="500px"
            @expand-change="projectExpandChange"
            :expand-row-keys="orderExpands"
                style="width: 98.5%; min-width:1150px;margin:10px;">
                    <el-table-column type="expand" >
                        <template slot-scope="scope">
                            <billTable v-loading="childLoading" :ref="scope.row.projectPk" /> 
                            <el-pagination class="positions" @size-change="ChildHandleSizeChange" @current-change="ChildHandleCurrentChange" :current-page="childQuery.pageNum" :page-size="childQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="childTotal"></el-pagination>
                        </template>
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
        <orderTable v-loading="loading" v-else-if="viewType == 2 " ref="orderTableRef" />
        <billList ref="operatorRef" v-else-if="viewType == 3 " /> 
      <el-pagination class="positions" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>    
  </div>
</template>

<script>
import {getPreShiftInf,addShiftData,listShiftData,shiftDataView} from "@/api/shiftData/shiftData";
import {getAttendanceClasses} from "@/api/oaApi"
import orderTable from './orderTable'
import billTable from './billTable'
import billList from './billList'
export default {
  components: { orderTable,billTable,billList  },
  data() {
    return {
        tableData: [],
        tableData2: [],
        dialogMemberVisible: false,
        loading: false,
        childLoading:false,
        total:0,
        childTotal:0,
        rules: {
        },
        shiftList:[],
        shiftPeople:[],
        listQuery:{
            pageNum:1,
            pageSize:10,
            shiftType:1,
            billType:0,
            viewType:0
        },
        childQuery:{
            pageNum:1,
            pageSize:10,
            shiftType:1,
            billType:0,
            viewType:0
        },
        viewType:0,
        orderExpands:[]
    };
  },
  mounted() {
      // this.init()
  },
  methods: {
    //项目展开详情 begin
    projectExpandChange(row, expandedRows){
        var that = this
        var bol = false
        var projectPk = row.projectPk
        for(var i=0;i<expandedRows.length;i++){
          if(projectPk == expandedRows[i].projectPk){
            bol = true
            break;
          }
        }
        if(bol){
            that.childLoading = true
            that.orderExpands = [projectPk]
            let param = JSON.parse(JSON.stringify(that.listQuery)) 
            param.projectPk = projectPk
            param.viewType = 0
            that.childQuery = param
            that.projectShiftDataView(projectPk)
        }else{
          that.orderExpands = []
        }
    },
    projectShiftDataView(){
        var that = this
        shiftDataView(that.childQuery).then(res=>{
            that.$nextTick(()=>{
                that.$refs[that.childQuery.projectPk].init(res.data.data)
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
        that.projectShiftDataView()
    },
    // 分页相关
    ChildHandleCurrentChange (val) {
        var that = this
        that.childQuery.pageNum = val
        that.projectShiftDataView()
    },
    //项目展开详情 end
    paramChange(){
        this.listQuery.pageNum = 1;
        this.shiftDataView()
        this.orderExpands = []
    },
    shiftDataView(val){
        var that = this
        if(val){
            that.listQuery.pageNum = 1
        }
        that.loading = true
        shiftDataView(that.listQuery).then(res=>{
            that.total = res.data.total
            that.viewType = that.listQuery.viewType
            if(that.listQuery.viewType == 0){
                that.$nextTick(()=>{
                    that.$refs.billTableRef.init(res.data.data) 
                })
            }else if(that.listQuery.viewType == 2){
                that.$nextTick(()=>{
                    that.$refs.orderTableRef.init(res.data.data,this.listQuery) 
                })
            }else if(that.listQuery.viewType == 3){
                that.$nextTick(()=>{
                    that.$refs.operatorRef.init(res.data.data,this.listQuery) 
                })
            }else{
                that.tableData = res.data.data          
            }
            
            
        }).finally(() => {
            that.loading = false
        })
    },
    init() {
      this.shiftDataView()
    },
    getAttendanceClasses(){
        getAttendanceClasses({companyPk:localStorage.getItem("select_company_pk")}).then(res=>{
            this.shiftList = res.data;
        })
    },
    // 分页相关
    handleSizeChange (val) {
        this.listQuery.pageNum = 1
        this.listQuery.pageSize = val
        this.shiftDataView()
    },
    // 分页相关
    handleCurrentChange (val) {
        this.listQuery.pageNum = val
        this.shiftDataView()
    }
  }
};
</script>
<style>
  .shiftDataBillList .el-table__expanded-cell{
    padding: 0 !important;
  }
</style>
</style>

<style scoped>
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
  min-width:1150px;
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

