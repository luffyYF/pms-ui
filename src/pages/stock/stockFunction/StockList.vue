// 库存列表
<template>
  <div>
    <el-form ref="form" size="mini" :model="form" label-width="80px">
      <el-form-item label="所在仓库">
        <!-- <el-checkbox-group v-model="form.storageIds">
          <el-checkbox v-for="item in storageOptions" :label="item.storageId" :key="item.storageId">{{item.name}}</el-checkbox>
        </el-checkbox-group> -->
        <el-select v-model="form.storageIds">
          <el-option v-for="item in storageOptions" :label="item.name" :key="item.storageId" :value="item.storageId"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="部门">
        <el-checkbox-group v-model="form.deptPk">
          <el-checkbox label="商品部"></el-checkbox>
          <el-checkbox label="布草部"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="出入标识">
        <el-checkbox-group v-model="form.entryExitSign">
          <el-checkbox label="1">出库</el-checkbox> 
          <el-checkbox label="0">入库</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="事件">
        <el-checkbox-group v-model="form.event">
          <el-checkbox label="0">采购</el-checkbox>
          <el-checkbox label="1">总部出库</el-checkbox>
          <el-checkbox label="2">总部下拨</el-checkbox>
          <el-checkbox label="3">二级库退库</el-checkbox>
          <el-checkbox label="4">二级库调拨</el-checkbox>
          <el-checkbox label="5">二级库直入</el-checkbox>
          <el-checkbox label="6">直拨入部门</el-checkbox>
          <el-checkbox label="7">部门退库</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-row>
        <el-col :span="3.5">
          <el-form-item label="货物类型">
            <el-cascader clearable :options="cascaderList" v-model="form.typeIds" change-on-select>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="货物编号">
            <el-input v-model="form.inventoryNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="名称/简拼">
            <el-input v-model="form.nameOrShortName"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item label="供应商">
            <el-select v-model="form.supplierPk" placeholder="请选择供应商">
              <el-option v-for="item in supplierPkList"
                         :key="item.supplierPk"
                         :label="item.supplierName"
                         :value="item.supplierPk">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <div class="block">
          <!--  <el-form-item  label="">
            <el-date-picker
              v-model="pickerTime"
              type="daterange"
              :picker-storageOptions="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
          </el-form-item> -->
          <el-button type="primary" @click="searchList(form)" size="mini">搜索</el-button>
        </div>
      </el-row>
    </el-form>
    <el-table :data="tableData" border height="400" style="width: 100%">
      <el-table-column prop="inventoryNo" label="货物编号"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="shortName" label="简拼"> </el-table-column>
      <el-table-column prop="typeName" label="类别"> </el-table-column>
      <el-table-column prop="amount" label="数量"> </el-table-column>
      <el-table-column prop="unit" label="单位"> </el-table-column>
      <!-- <el-table-column prop="storageName" label="仓库"> </el-table-column> -->
      <!-- <el-table-column prop="goodsSpec" label="规格"> </el-table-column> -->
      <!-- <el-table-column prop="costPrice" label="进价"> </el-table-column> -->
      <!-- <el-table-column prop="totalPrice" label="总价"> </el-table-column> -->
      <!-- <el-table-column prop="preSalePrice" label="预售价"> </el-table-column> -->
      <!-- <el-table-column prop="invalidDate" label="保质期"></el-table-column> -->
    </el-table>

    <el-pagination
      style="margin: 10px 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Moment from "moment";
import { getStorageList, typeCascaderList, stockList } from "@/api/upmsStorage";

export default {
  data() {
    return {
      form: {
        storageIds: null,
        typeIds: [],
        inventoryNo: null,
        nameOrShortName:null,
      },
      storageOptions: [], //所在仓库
      supplierPkList: [], //供应商
      tableData: [],
      pickerTime: "",
      currCompanyPk: localStorage.getItem("select_company_pk"),
      cascaderList: [],
      pageNum:1,
      pageSize:10,
      total:0,
    };
  },
  // created() {
  //   this.init();
  // },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      //加载仓库列表
      getStorageList({ companyPk: this.currCompanyPk }).then(res => {
        this.storageOptions = res.data;
        //加载库存列表
        this.form.storageIds = this.storageOptions[0].storageId
        this.stockList();
      });
      //加载货物类型
      typeCascaderList().then(res => {
        this.cascaderList = res.data;
      });
      
    },
    stockList() {
      var data = {
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        storageIds: this.form.storageIds,
        typeIds: this.form.typeIds.join(','),
        inventoryNo: this.form.inventoryNo,
        nameOrShortName: this.form.nameOrShortName,
        companyPk:this.currCompanyPk,
      };
      stockList(data).then(res => {
        this.tableData = res.data.list;
        this.total = Number(res.data.total);
      });
    },
    searchList(formList) {
      this.stockList();
    },
    //分页相关
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.pageNum = 1;
      this.stockList();
    },
    //分页相关
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val
      this.stockList();
    },
  }
};
</script>
<style scoped>
.block {
  margin-left: 13px;
  margin-bottom: 20px;
}
</style>
