// 排版
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <div class="content-body">
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="120px">
      <!-- <el-form-item label="考勤组" prop="groupId">
        <el-select v-model="listQuery.groupId" placeholder="请选择" @change="listSearch">
          <el-option v-for="(v,i) in groupList" :key="i" :label="v.groupName" :value="v.groupId"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="日期" prop="currDate">
        <el-date-picker
          v-model="listQuery.currDate"
          @change="listSearch"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="listSearch()" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="addClick">批量排班</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <div class="table-container">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        @cell-click="cellClick"
        border
        size="small"
        highlight-current-row
        style="width: 100%;"
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column type="selection" :selectable="disableCheck" width="58" fixed></el-table-column>
        <el-table-column v-for="(value,index) in header1" :prop="value.code" :label="value.desc" :key="value.code" align="left" fixed>
        </el-table-column>
        
        <el-table-column v-for="(value,index) in header2" :prop="value.code" :label="value.desc" :key="value.code" align="left" min-width="80">
          <template slot-scope="scope">
            <span v-if="classMap[scope.row[value.code]]">
              <el-popover trigger="hover" placement="top" width="210">
                <span style="float: left">{{groupMap[scope.row[value.code]]}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{companyMap[scope.row[value.code]]}}</span>
                <br />
                <span style="float: left">{{nameMap[scope.row[value.code]]}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{timeMap[scope.row[value.code]]}}</span>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" :type="companyPk == companyPks[scope.row[value.code]] ? '' : 'success'" closable v-on:close.stop="deleteClick(scope.row[value.code], scope.row.userPk, value.desc)">{{classMap[scope.row[value.code]]}}</el-tag>
                  <!-- <el-button style="color:red" type="text" icon="el-icon-delete" v-on:click.stop="deleteClick(scope.row[value.code], scope.row.userPk, value.desc)"></el-button> -->
                </div>
              </el-popover>
            </span>
            <span v-else>{{scope.row[value.code]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
      <el-row>
        <el-col :span="23" style="margin: 20px 12px 0 12px;">
          <p v-for="(item, index) in companyIds" :key="index">
            {{item.companyName}}：<span v-for="(y, index) in classIds" :key="index"><span v-if="y.companyPk == item.companyPk">{{classMap[y.classId]}}（{{nameMap[y.classId]}}）{{timeMap[y.classId]}}&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
          </p>
        </el-col>
      </el-row>
    </div>
    <!--添加、修改组件-->
    <PlanAdd ref="planAddRef" @callback="listSearch"/>
  </div>
</template>
<script>
  import moment from 'moment'
  import {attendanceTypeMap} from '@/utils/orm'
  import { attendanceListSelect, attendancePlanList,attendanceClassSelect,attendancePlanDelete } from '@/api/oaApi'
  import PlanAdd from './PlanAdd'

  export default {
    components: { PlanAdd },
    data () {
      return {
        attendanceTypeMap: attendanceTypeMap,
        loading: false,
        header1:[],
        header2:[],
        tableData: [],
        groupList: [],
        listQuery: {
          currDate:moment().format("YYYY-MM"),
          // groupId: null,
          pageNum: 1,
          pageSize: 10
        },
        total: 0,
        multipleSelection:[],
        classMap:{},//班次名称
        // timeMap:{},//班次时间
        // timeMap:{},//组id
        classIds: [],
        companyIds: [],
        nameMap: {},
        timeMap: {},
        groupMap: {},
        companyPks: {},
        companyMap: {},
        companyPkData: [],
        classIdData: [],
        companyPk: JSON.parse(localStorage.getItem('current_logon_company')).companyPk,
      }
    },
    mounted () {
      this.groupList = []
      this.listSearch()
    },
    methods: {
      //搜索
      listSearch () {
        this.classIds = [];
        this.companyIds = [];
        this.classMap = {};
        this.nameMap = {};
        this.timeMap = {};
        this.groupMap = {};
        this.companyPks = {};
        this.companyMap = {};
        this.companyPkData = [];
        this.classIdData = [];
        this.planList();
      }, 
      //查找排班数据列表 
      planList() {
        let data = {
          date:this.listQuery.currDate+'-01',
          // groupId:this.listQuery.groupId,
          companyPk:localStorage.getItem('select_company_pk')
        }
        this.header1 = []
        this.header2 = []
        attendancePlanList(data).then(res => {
          res.data.header.forEach(item=>{
            if(item.code.indexOf('column')!=-1){
              this.header2.push(item)
            }else{
              this.header1.push(item)
            }
          })
          if (res.data.planData.length > 0) {
            res.data.planData.forEach(item => {
              this.$set(this.classMap, item.classId, item.classCode);
              this.$set(this.nameMap, item.classId, item.className);
              this.$set(this.timeMap, item.classId, item.beginTime + '-' + item.endTime);
              this.$set(this.groupMap, item.classId, item.groupName);
              this.$set(this.companyMap, item.classId, item.companyName);
              this.$set(this.companyPks, item.classId, item.companyPk);
              if (this.classIdData.indexOf(item.classId) == -1) {
                this.classIdData.push(item.classId);
                this.classIds.push({"classId": item.classId, "companyPk": item.companyPk});
              }
              if (this.companyPkData.indexOf(item.companyPk) == -1) {
                this.companyPkData.push(item.companyPk);
                this.companyIds.push({"companyPk": item.companyPk, "companyName": item.companyName});
              }
            });
          }
          this.tableData = res.data.tableData
        }).finally(() => {
          this.loading = false
        })
      },
      //添加排班按钮
      addClick () {
        if(this.multipleSelection.length<=0){
          this.$message.warning('至少选择一个人')
          return;
        }
        let users = []
        this.multipleSelection.forEach(item=>{
          users.push({userName:item.userName, userPk:item.userPk})
        })
        this.$refs.planAddRef.showDialog(users, null, [moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")])
      },
      deleteClick (classId, userPk, day) {
        this.$confirm('将删除该排班, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            userId: userPk,
            classId: classId,
            day: this.listQuery.currDate+'-'+(Array(2).join(0) + day).slice(-2)
          }
          attendancePlanDelete(data).then(res=>{
            this.$message({type: 'success',message: '删除成功!'});
            this.listSearch()
          })
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.listQuery.pageSize = val
        this.listSearch()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.listQuery.pageNum = val
        this.listSearch()
      },
      //列表选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      disableCheck(row, index){
        return index>0
      },
      //点击单元格
      cellClick(row, column, cell, event) {
        if(column.property.indexOf('column')!=-1 && row.userPk){
          let users = [{
            userPk: row.userPk,
            userName: row.userName
          }]
          let date = this.listQuery.currDate+'-'+(Array(2).join(0) + column.label).slice(-2)
          let classId = row[column.property]
          this.$refs.planAddRef.showDialog(users, classId, [date,date])
        }
      }
    }
  }
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px -5px 20px;
  overflow-y: auto;
}
.title-span {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px 0;
  display: inline-block;
}
</style>
