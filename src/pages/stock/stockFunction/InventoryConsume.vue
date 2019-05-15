<template>
  <div class="content-body">
    <div :span="24" class="title-item">
    </div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="货单编号">
            <el-input readonly v-model="form.inventoryNo"></el-input>
          </el-form-item>
          <el-form-item label="消耗仓库" >
            <el-select v-model="storageId" placeholder="请选择消耗仓库" :disabled="applyStatus == 1" @change="chooseStorage">
              <el-option
                v-for="item in storageData"
                :key="item.storageId"
                :label="item.name"
                :value="item.storageId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作人">
            <el-input readonly v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="消耗日期">
            <div class="block">
              <el-date-picker
                v-model="form.outTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss" 
                :readonly="applyStatus == 1">
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
          <el-table-column prop="inventoryNo" label="编号" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="inventoryName" label="名称" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="shortName" label="简拼" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="typeName" label="类型" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="spec" label="规格" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="unit" label="单位" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="total" label="数量" align="center" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="amount" label="消耗数量" align="center" width="130">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" type="number" class="in-input" size="mini" :step="1" :min="0" :max="scope.row.total" @blur="handleBlur(scope.row,scope.$index)" :disabled="applyStatus == 1"/>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center" min-width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" type="text" size="mini" :disabled="applyStatus == 1" />
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24">
          <el-col :span="6" :offset="18">
            <el-button size="mini" type="primary" @click="createOutForm" v-if="applyStatus == 1">新建消耗单</el-button>
            <a target="_blank" :href="PRINT_ROOT+'#/inventoryConsume?outId='+form.outId">
              <el-button size="mini" type="primary" v-if="applyStatus == 1">打印</el-button>
            </a>
            <el-button size="mini" type="primary" @click="saveInfo" v-if="applyStatus != 1">保存</el-button>
            <el-button size="mini" type="primary" @click="clearTable" v-if="applyStatus != 1">重置</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from 'moment'
import { xhSequenceApi, getAllAndStockApi, getStorageList, consumeApi, findStockByStorageIdApi } from '@/api/upmsStorage'

export default {
  components: {  },
  data() {
    return {
      loading: false,
      form: {//货单表单
        outId: null,
        inventoryNo: null,
        outTime: null,
        userName: JSON.parse(localStorage.getItem("pms_userinfo")).realName,
        companyPk: null,
        userId: JSON.parse(localStorage.getItem("pms_userinfo")).upmsUserId,
        status: 0,
      },
      inventoryOutData:[],//详单对象集合
      storageData: [],//仓库列表
      applyStatus: 0,
      PRINT_ROOT: process.env.PRINT_ROOT,
      storageId: null,
      applyForm: [],
      company: JSON.parse(localStorage.getItem('current_logon_company')),
    };
  },
  mounted () {
    this.init()
  },
  methods: {
    init(){
      let self = this
      self.form.outTime = Moment().format("YYYY-MM-DD HH:mm:ss");
      // 查询全部仓库
      getStorageList({companyPk: self.company.companyPk}).then(res => {
        self.storageData = res.data;
        if (res.data.length > 0) {
          self.form.companyPk = res.data[0].companyPk;
          self.storageId = res.data[0].storageId;
          if (self.storageId != null) {
            self.$nextTick(() => {
              self.findDetail()
            })
          }
        }
      });
      // 加载出库单号
      xhSequenceApi().then(res => {
        self.form.inventoryNo = res.data
      });
    },
    findDetail () {
      let self = this;
      // 查询详情
      findStockByStorageIdApi({storageId: self.storageId}).then(res => {
        self.inventoryOutData = res.data;
        self.inventoryOutData.forEach(data => {
          self.$set(data,"total", data.amount);
          self.$set(data,"remark", null);
          self.$set(data,"amount", 0);
          self.$set(data,"inventoryName", data.name);
          self.$set(data,"storageId", self.storageId);
          self.$set(data,"price", (Number(data.price)).toFixed(2));
        });
      });
    },
    //选择仓库
    chooseStorage(value){
      this.storageData.forEach(element => {
        if (element.storageId == value) {
          this.form.companyPk = element.companyPk;
        }
      })
      this.findDetail();
    },
    //离开input-number的方法
    handleBlur (row, index) {
      let data = {
        storageId: row.storageId,
        inventoryId: row.inventoryId,
        total: row.total
      }
      getAllAndStockApi(data).then(res => {
        if (row.total <= res.data.total) {
          if (row.amount > row.total) {
            this.$set(this.inventoryOutData[index], "amount", row.total);
            this.avgPrice(res.data.tackNum, row.total, res.data, index)
          } else {
            this.avgPrice(res.data.tackNum, row.amount, res.data, index)
          }
        } else {
          if (row.amount > res.data.total) {
            this.$set(this.inventoryOutData[index], "amount", res.data.total);
            this.avgPrice(res.data.tackNum, res.data.total, res.data, index)
          } else {
            this.avgPrice(res.data.tackNum, row.amount, res.data, index)
          }
        }
      });
    },
    // 计算价格
    avgPrice (amount,total,data,index) {
      if (total == 0) {
        this.$set(this.inventoryOutData[index], "price", (Number(this.inventoryOutData[index].price)).toFixed(2));
      }else if (amount >= total) {
        this.$set(this.inventoryOutData[index], "price", (data.tackPrice).toFixed(2));
      } else {
        let num = total - amount
        let beginPrice = amount * data.tackPrice
        let endPrice = 0
        for (let i = 0; i < data.list.length; i++) {
          num = num - data.list[i].amount + data.list[i].usedNum
          if (num > 0) {
            endPrice = endPrice + ((data.list[i].amount - data.list[i].usedNum) * data.list[i].price)
          } else {
            endPrice = endPrice + ((num + data.list[i].amount - data.list[i].usedNum) * data.list[i].price)
            break
          }
        }
        this.$set(this.inventoryOutData[index], "price", ((beginPrice + endPrice)/total).toFixed(2));
      }
    },
    clearTable(){
      this.inventoryOutData.forEach(data => {
        this.$set(data,"amount", 0);
        this.$set(data,"remark", null);
      });
    },
    createOutForm () {
      this.inventoryOutData = [];
      this.applyStatus = 0;
      this.form.outId = null
      this.init()
    },
    saveInfo(){
      //验证
      let i = 0;
      let sum = 0;
      this.inventoryOutData.forEach(item => {
        if (item.amount == 0) {
          i++
        }
        sum += item.total
      });

      if (i == this.inventoryOutData.length) {
        this.$message({type:'warning', message: '至少有一个物品的消耗数量大于0'})
        return;
      }
      if (sum == 0) {
        this.$message({type:'warning', message: '暂无物品可消耗'})
        return;
      }

      var data = {
        inventoryOut: this.form,
        details: this.inventoryOutData
      };
      consumeApi(data).then(res => {
        if(res.code==1){
          this.$message({type:'success', message: '保存成功'});
          this.applyStatus = 1;
          this.form.outId = res.data;
        }
      })
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
  width: 70%;
}
</style>
<style>
.color99 .el-breadcrumb__inner {
  color: #98999a;
}
.in-input .el-input__inner {
  padding: 0 5px!important;
  text-align: left;
}
</style>
