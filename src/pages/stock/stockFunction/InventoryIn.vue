
// 入库
<template>
  <div class="content-body">
    <el-form ref="form" :inline="true" :model="inForm" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="货单编号">
            <el-input readonly v-model="inForm.inventoryNo"></el-input>
          </el-form-item>
          <el-form-item label="操作人">
            <el-input readonly v-model="inForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="填单日期">
            <div class="block">
              <el-date-picker
                v-model="inForm.inTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- table -->
    <el-row>
      <el-col :span="8" style="padding-right:10px;">
        <div class="bg-reserve">
          <h5 class="info-title">出货单信息</h5>
          <div class="forminfo">
            <el-row>
              <el-col :span="12">货单编号：{{outForm.inventoryNo}} </el-col>
              <el-col :span="12">收货确认：{{outForm.isConfirm==1?'已确认':'未确认'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">操作人：{{outForm.userName}} </el-col>
              <el-col :span="12">出货时间：{{outForm.createTime}}</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="16" class="bg-reserve book-info">
        <h5 class="info-title">待入货货物列表</h5>
        <!-- 查找的是出库单的详细 -->
        <el-table size="mini"
          border 
          :data="outDetails"
          height="440"
          style="width: 98.5%; margin:10px;">
          <el-table-column prop="inventoryNo" label="货物编号">
          </el-table-column>
          <el-table-column prop="inventoryName" label="货物名称">
          </el-table-column>
          <el-table-column prop="shortName" label="简称">
          </el-table-column>
          <el-table-column prop="typeName" label="货物类型">
          </el-table-column>
          <el-table-column prop="price" label="货物单价">
          </el-table-column>
          <el-table-column prop="unit" label="单位">
          </el-table-column>
          <el-table-column prop="spec" label="规格">
          </el-table-column>
          <el-table-column prop="amount" label="货物数量">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
          <el-table-column prop="inStorageId" label="选择入库仓库" align="center" width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.inStorageId" placeholder="选择仓库" size="mini">
                <el-option v-for="item in scope.row.storageList"
                          :key="item.storageId"
                          :label="item.name"
                          :value="item.storageId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24">
          <el-col :span="6" :offset="18">
            <el-button size="mini" type="primary" @click="saveInfo" :loading="loading">确认入库</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from 'moment'
import {getInSequence,findOutInfo, inventoryIn, getStorageList} from '@/api/upmsStorage'

export default {
  data() {
    return {
      inForm: {
        inventoryNo: null,
        userName: null,
        companyPk: localStorage.getItem("select_company_pk"),
        supplierPk: null,
        inTime: null,
        outId:null,
      },
      outForm:{},//出库表单
      outDetails:[],//出库详细
      depotNameType: '',
      loading:false
    };
  },
  mounted () {
    this.init(this.$route.params.outId)
  },
  methods: {
    /**
     * 初始化 
     * @param outId 出库单主键
     */
    init(outId){
      this.inForm.userName = JSON.parse(localStorage.getItem('pms_userinfo')).realName;
      this.inForm.inTime = Moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      //获取入库编号
      getInSequence().then(res=>{
        this.inForm.inventoryNo= res.data
      })

      //加载仓库列表
      getStorageList({companyPk: this.inForm.companyPk}).then(res1 => {
        let tempStorageList = res1.data;

        //加载出库单信息
        this.outForm = {};
        this.outDetails = [];
        findOutInfo({outId:outId}).then(res2=>{
          this.outForm = res2.data.invOut;
          this.inForm.supplierPk = res2.data.invOut.companyPk;
          this.outDetails = res2.data.outDetails;
          console.log("出库详情",this.outDetails);

          //入库单绑定出库单
          this.inForm.outId = this.outForm.outId

          //库存下拉列表
          this.outDetails.forEach(detail=>{
            detail.storageList = tempStorageList;
          })
        })
      });
     
    },
    saveInfo(){
      if(this.outDetails.length<=0){
        this.$message.warning('没有出库单');
        return;
      }
      
      let error = 0;
      this.outDetails.forEach(detail=>{
        //入库明细绑定要入的仓库
        detail.storageId = detail.inStorageId
        //入库明细绑定出库明细主键
        detail.outDetailId = detail.detailId

        if(!detail.storageId){
          error++;
        }
      })

      if(error>0){
        this.$message.warning("没有选择入库仓库");
        return;
      }


      let data = {
        invIn: this.inForm,
        inDetails: this.outDetails
      }
      console.log("提交详情",data.inDetails);
      this.loading = true
      inventoryIn(data).then(res=>{
        this.$message.success('入库成功');
        this.outForm={};
        this.outDetails=[];
      }).finally(()=>{
        this.loading = false;
      })
    }
  },
};
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
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
.book-info{
  height: 537px;
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
.forminfo{
  line-height: 32px;
  padding: 14px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 178px;
}
</style>
