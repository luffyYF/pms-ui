<template>
  <div class="content-body">
    <span class="title-span">夜审记录</span>
    <el-button @click="selectList" type="primary"  icon="el-icon-refresh" size="mini">刷新</el-button>
    <hr>
    <el-form :inline="true" size="mini" :model="searchObj" class="demo-form-inline">
      <el-form-item label="营业日期">
        <el-date-picker
          v-model="searchObj.createTime"
          type="date"
          size="mini"
          value-format="yyyy-MM-dd"
          placeholder="请选择营业日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectList('query')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="nightRecordList"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="taskName"
        align="center"
        label="任务名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="发生时间">
      </el-table-column>
      <el-table-column
        prop="result"
        align="center"
        label="状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { nightTrialRecordList } from '../../api/operators/pmsNightTrialRecordController'
export default {
  created(){
    this.selectList();
  },
  data() {
    return {
      searchObj:{
        createTime:''
      },
      loading:false,
      nightRecordList:[],
    };
  },
  methods: {
    selectList(){
      if(arguments[0] != 'query') {
        this.searchObj.createTime = '';
      }
      this.loading = true;
      console.log(this.searchObj)
      nightTrialRecordList(this.searchObj).then(res => {
        this.loading = false;
        if(res.code == 1) {
          this.nightRecordList = res.data;
          console.log(this.nightRecordList)
        }
      }).catch(()=>{
        this.loading = false;
      })
    },
  }
};
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px 30px 20px;
  width: 900px;
  overflow-y: auto;
}
.title-span {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px 0;
  display: inline-block;
}
.input-width {
  width: 194px;
}
.input-width-80 {
  width: 80px;
}
</style>


