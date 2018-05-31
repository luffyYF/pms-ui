//寄存
<template>
  <div class="bg-server">
    <el-form ref="form" :inline="true" :model="form1" size="mini" label-width="80px">  
      <el-form-item label="寄存状态">
        <el-select v-model="form.status" placeholder="请选择寄存状态">
          <el-option label="未领取" value="UNCLAIM"></el-option>
          <el-option label="已领取" value="CLAIM"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="寄存时间">
        <!-- <el-date-picker v-model="datepicker1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
        <el-date-picker
            v-model="form.beginDate"
            align="right"
            type="date"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd"
            :picker-options="startTimeOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="寄存房号">
        <el-input v-model="form.roomNumber"></el-input>
      </el-form-item>
      <el-form-item label="客人姓名">
        <el-input v-model="form.guestName"></el-input>
      </el-form-item>
      <el-form-item label="领取时间">
        <!-- <el-date-picker v-model="datepicker1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
        <el-date-picker
            v-model="form.endDate"
            align="right"
            type="date"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd"
            :picker-options="startTimeOptions">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item>
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="查询全部" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="selectGood">查找</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="goodsList" height="300" v-loading="loading" border style="width: 100%" @row-dblclick="cellClickHandle">		
      <el-table-column prop="orderGuestNo" label="客单号" width="180"></el-table-column>
      <el-table-column prop="roomNumber" label="房号" width="180"></el-table-column>
      <el-table-column prop="voucherNo" label="凭证号"></el-table-column>
      <el-table-column prop="guestName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="beginDate" label="寄存时间" width="180"></el-table-column>
      <el-table-column prop="createUserName" label="寄存员"></el-table-column>
      <el-table-column prop="details" label="寄存内容" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{depositMap[scope.row.status]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-row class="top20">
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="客人姓名">
              <el-input v-model="form.guestName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="寄存操作员" class="label100">
              <el-input v-model="form.createUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证号" class="label100">
              <el-input v-model="form.voucherNo"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="寄存时间">
              <el-input v-model="form.beginDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="寄存内容" class="label100">
              <el-input v-model="form.details"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" class="label100">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="领取时间">
              <el-input v-model="form.endDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="领取操作员" class="label100">
              <el-input v-model="form.endUserName"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item class="form-item-center">
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''"  @click="receive">领取</el-button>
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''"  @click="cancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {depositMap} from '@/utils/orm'
import { pmsGoodsAdd, pmsGoodsDel, pmsGoodsList, pmsGoodsUpdate,pmsGoodsEditFinish,pmsGoodsCancel,pmsGoodsListCondition } from "@/api/atrialCenter/goodsManageController";
  export default {
    created(){
      this.selectGoods();
      // this.addGoods();
    },
    data() {
      return {
        depositMap:depositMap,
        goodsList:[],
        form: {
        name:'',
        type:'JC',
        status:'',
        guestName:'',
        roomNumber:'',
        beginDate:'',
        endDate:'',
        msgPerson:''
      },
        form1:{},
        tableData: [],
        loading:false,
        datepicker1: '',
        datepicker2: '',
      }
    },
    methods: {
      selectGoods(){
        pmsGoodsListCondition({type:'JC'}).then(res => {
          if(res.code == 1) {
            this.goodsList = res.data;
          }
        });
      },
      selectGood(){
      this.loading = true;
      pmsGoodsListCondition(this.form)
        .then(res => {
          this.loading = false;
          if (res.code == 1) {
            this.goodsList = res.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
      cellClickHandle(row) {
        this.form = row;
      },
      receive(){
        this.$confirm("确定领取？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            this.form.status = "CLAIM";
            pmsGoodsEditFinish(this.form).then(res => {
              if (res.code == 1) {
                this.$message.success("领取成功");
                this.form = {};
              } else {
                this.$message.error(res.msg);
              }
              this.selectGoods();
            });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
      },
      cancel(){
        this.$confirm("取消寄存？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            pmsGoodsCancel(this.form).then(res => {
              if (res.code == 1) {
                this.$message.success("取消成功");
                this.form = {};
              } else {
                this.$message.error(res.msg);
              }
              this.selectGoods();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped>
.line,.form-item-center{
  text-align: center;
}
.top20{
  margin-top: 20px;
}
.bg-server {
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding: 15px;
  width: 1000px;
}
</style>
<style>
.label100 .el-form-item__label{
  width: 100px !important;
}
.label100 .el-form-item__content{
  margin-left: 100px !important;
}
</style>
