// 房扫日志表列表
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <div class="app-container">
    <!--搜索条件-->
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form :model="listQuery" label-width="70px" size="mini" :inline="true">
          <el-form-item label="房扫时间">
            <el-date-picker
              v-model="listQuery.beginDate"
              type="date"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd"
              style="width: 166px">
            </el-date-picker>
            <span class="span-block">至</span>
            <el-date-picker
              v-model="listQuery.endDate"
              type="date"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
              style="width: 166px">
            </el-date-picker>
          </el-form-item>
          <br />
          <el-form-item label="房扫人员">
            <el-input placeholder="请输入房扫人员" v-model="listQuery.userName" @keyup.enter.native="listSearch" size="mini" clearable/>
          </el-form-item>
          <el-form-item label="房间号" label-width="54px">
            <el-input placeholder="请输入房间号" v-model="listQuery.roomNumber" @keyup.enter.native="listSearch" size="mini" clearable/>
          </el-form-item>
          <el-form-item label="房型" label-width="40px">
            <el-select v-model="listQuery.roomTypePk" placeholder="请选择房型">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in roomTypeArray"
                :key="item.typePk"
                :label="item.typeName"
                :value="item.typePk">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="listSearch">查询</el-button>
        </el-form>
      </el-col>
      <el-col :span="6" class="btn-right">
      </el-col>
    </el-row>
    <!--表格-->
    <div class="table-container">
      <el-table
        :data="rows"
        border
        fit
        size="small"
        highlight-current-row
        max-height="451" style="width: 100%; margin-top: 5px" 
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column prop="createTime" label="房扫时间" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="userName" label="房扫人员" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="roomNumber" label="房间号" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="roomTypeName" label="房型" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="createUserName" label="操作人" align="left" min-width="150" show-overflow-tooltip/>
      </el-table>
      <!--分页-->
      <el-pagination
        style="margin: 10px 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { roomServiceListApi } from '@/api/roomService/pmsRoomServiceLogApi'

  export default {
    data () {
      return {
        loading: false,
        rows: [],
        listQuery: {
          systemId: null,
          title: null,
          permType: null,
          pageNum: 1,
          pageSize: 10,
          roomNumber: null,
          userName: null,
          roomTypePk: '',
          beginDate: null,
          endDate: null,
          companyPk: JSON.parse(localStorage.getItem('current_logon_company')).companyPk,
        },
        total: 0,
        roomTypeArray:[],
        userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
      }
    },
    mounted () {
      this.roomTypeArray = []
      let typeList = JSON.parse(localStorage.getItem("pms_type"))
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE"){
          this.roomTypeArray.push(item);
        }
      })
      this.listSearch()
    },
    methods: {
      listSearch () {
        this.loading = true
        roomServiceListApi(this.listQuery).then(res => {
          this.total = Number(res.data.total)
          this.rows = res.data.list
          res.data.list.forEach(element => {
            element.createTime = element.createTime.substring(0,element.createTime.length-3)
          });
        }).finally(() => {
          this.loading = false
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
    }
  }
</script>

<style scoped>
.btn-right {
  text-align: right;
}
.el-form-item--mini.el-form-item__label {
  line-height: 28px;
}
.el-radio.is-bordered+.el-radio.is-bordered,.el-radio--mini.is-bordered {
  margin-right: 10px;
}
.span-block {
  display: inline-block;
  margin: 0 10px;
  font-size: 14px;
  color: #606266;
}
</style>
