<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
          营业日期：<el-date-picker v-model="datepicker"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  :picker-options="startTimeOptions"
                  @change="rentContractDate" size="mini">
              </el-date-picker>
          房号：<el-input v-model="srcRoomNumber" size="mini" style="width:120px;margin-bottom:5px"></el-input>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini">网页预览</el-button>
          <!-- <el-button type="primary" size="mini">PDF预览</el-button> -->
          <el-button type="primary" size="mini">导出EXCEL</el-button>
          <el-button type="primary" size="mini">添加到收藏夹</el-button>
          <el-button type="primary" size="mini">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>房租合约报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table :data="tableData" border height="200" style="width: 100%; margin-top: 5px">
            <el-table-column prop="srcRoomNumber" label="房号"></el-table-column>
            <el-table-column prop="createTime" label="开始营业时间"></el-table-column>
            <el-table-column prop="originalPrice" label="门市价"></el-table-column>
            <el-table-column prop="amouroomPricent2" label="房价"></el-table-column>
            <el-table-column prop="roomPrice" label="状态"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="schemeName" label="会员信息"></el-table-column>
            <el-table-column prop="date" label="修改时间"></el-table-column>
            <el-table-column prop="schemeName" label="修改人"></el-table-column>
            <el-table-column prop="guestName" label="授权人"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import {rentContract} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
export default {
  data() {
    return {
      datepicker: '',
      srcRoomNumber: '',
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      value: '',
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  created(){
    this.rentContractDate();
  },
  methods: {
    rentContractDate(){
      const datepicker = this.datepicker;
      rentContract({begin: datepicker[0], end: datepicker[1]}).then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
    }


  }
}
</script>
<style scoped>
.title{
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title{
  text-align: center;
}
.left{
  float: left;
}
.right{
  float: right;
}
.tabsAdd{
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
</style>


