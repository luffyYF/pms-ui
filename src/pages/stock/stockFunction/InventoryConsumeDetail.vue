<template>
  <div class="content-body">
    <div :span="24" class="title-item">
      <el-breadcrumb separator="/">
        <i class="el-icon-arrow-left"></i>
        <el-breadcrumb-item :to="{}"><a @click="toPage" class="color99">消耗记录</a></el-breadcrumb-item>
        <el-breadcrumb-item>消耗详细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="货单编号">
            <el-input readonly v-model="form.inventoryNo"></el-input>
          </el-form-item>
          <!-- <el-form-item label="出库仓库" v-if="applyStatus != 2">
            <el-select v-model="storageId" placeholder="请选择出库仓库" @change="chooseStorage">
              <el-option
                v-for="item in storageData"
                :key="item.storageId"
                :label="item.name"
                :value="item.storageId">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="操作人">
            <el-input readonly v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="消耗日期">
            <div class="block">
              <el-date-picker
                v-model="form.createTime"
                readonly
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- table -->
    <el-row>
      <el-col :span="24" class="bg-reserve book-info">
        <h5 class="info-title">消耗列表</h5>
        <el-table size="mini" 
          border 
          :data="inventoryOutData"
          height="370"
          style="width: 98.5%; margin:10px;">
          <el-table-column prop="inventoryNo" label="编号" align="center" width="150">
          </el-table-column>
          <el-table-column prop="inventoryName" label="名称" align="center" width="150">
          </el-table-column>
          <el-table-column prop="shortName" label="简拼" align="center" width="150">
          </el-table-column>
          <el-table-column prop="typeName" label="类型" align="center" width="150">
          </el-table-column>
          <el-table-column prop="spec" label="规格" align="center" width="150">
          </el-table-column>
          <el-table-column prop="unit" label="单位" align="center" width="150">
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center" width="150">
          </el-table-column>
          <el-table-column prop="amount" label="消耗数量" align="center" width="150">
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center" min-width="150">
          </el-table-column>
          <el-table-column prop="storageId" label="消耗仓库" align="center" width="150">
            <template slot-scope="scope">
              <div v-for="item in storageData" :key="item.storageId">
                <span v-if="item.storageId == scope.row.storageId">
                  {{item.name}}
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24">
          <el-col :span="6" :offset="18">
            <a target="_blank" :href="PRINT_ROOT+'#/inventoryConsume?outId='+form.outId">
              <el-button size="mini" type="primary">打印</el-button>
            </a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from 'moment'
import { findConsumeAndDetailApi,getAllStorageApi } from '@/api/upmsStorage'

export default {
  data() {
    return {
      loading: false,
      form: {//货单表单
        outId: this.$route.params.outId,
        inventoryNo: null,
        createTime: null,
        userName: null,
      },
      storageId: null,
      inventoryOutData:[],//详单对象集合
      storageData: [],//仓库列表
      PRINT_ROOT:process.env.PRINT_ROOT,
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      //查询全部仓库
      getAllStorageApi().then(res => {
        this.storageData = res.list;
      });
      //查询入库
      findConsumeAndDetailApi({outId: this.form.outId}).then(res => {
        this.inventoryOutData = res.data.list;
        this.form.inventoryNo = res.data.inData.inventoryNo;
        this.form.createTime = res.data.inData.createTime;
        this.form.userName = res.data.inData.userName;
      });
    },
    toPage() {
      this.$router.push({name: 'stockopr', params: {activeName: 'night'}})
    },
  },
};
</script>

<style scoped>
.title-item {
  margin: 20px 0 30px;
  padding: 0 !important;
}
.el-icon-arrow-left {
  float: left;
}
.content-body{
  background-color: #ffffff;
  padding: 5px 20px 20px 20px;
}
.bg-reserve {
  position: relative;
  background: #ffffff;
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
  background: #ffffff;
}
.book-info{
  height: 466px;
}
.el-select {
  width: 178px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 178px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 19px;
    margin-left: 10px;
}
.in-input {
  width: 50%;
}
</style>
<style>
.el-breadcrumb__inner .color99 {
  color: #98999a;
}
.in-input .el-input__inner {
  padding: 0 5px!important;
  text-align: center;
}
</style>
