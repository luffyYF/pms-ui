// 身份证录入
<template>
  <section>
    <el-dialog class="idcard-input-dialog" title="录入身份证信息" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :before-close="handleClose">
      <el-table ref="idcardInputTab" 
        :data="idcardTable" 
        tooltip-effect="dark"
        style="width: 100%"
        height="300" 
        size="mini">
        <el-table-column prop="peopleName" label="姓名"  align="center">
        </el-table-column>
        <el-table-column prop="peopleSex" label="性别"  align="center">
        </el-table-column>
        <el-table-column prop="peopleIdCode" label="证件号"  align="center">
        </el-table-column>
        <el-table-column prop="certType" label="证件类别"  align="center">
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showDetail(scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="deleteIdcard(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <div style="float: left;width: 361px;">
          <IDCardScan css-style="BUTTON" @callback="loadIDCardInfo"></IDCardScan>
        </div>
        <!-- <el-button size="mini" type="primary" @click="readIdCard" :loading="loading">录入身份证信息</el-button> -->
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
    
    <el-dialog class="idcard-input-dialog" title="详细信息" :visible.sync="dialogVisible2" width="600px">
      <el-row>
        <el-col :span="12">姓名：{{detailForm.peopleName}}</el-col>
        <el-col :span="12">性别：{{detailForm.peopleSex}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">证件类别：{{detailForm.certType}}</el-col>
        <el-col :span="12">身份证号：{{detailForm.peopleIdCode}} </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">居民民族代码/外国人国籍代码：{{detailForm.nationCode}}</el-col>
        <el-col :span="12">出生日期：{{detailForm.peopleBirthday}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">民族/国籍：{{detailForm.peopleNation}}</el-col>
        <el-col :span="12">地址信息：{{detailForm.peopleAddress}} </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">有效开始日期：{{detailForm.startDate}}</el-col>
        <el-col :span="12">有效截止日期：{{detailForm.endDate}} </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">发证机关信息：{{detailForm.department}}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">关闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>

import IDCardScan from '@/components/Idcard/IDCardScan'
import {list,add} from '@/api/order/pmsIdCardInfoController'
export default {
  components:{IDCardScan},
  data(){
    return {
      dialogVisible:false,
      dialogVisible2:false,
      orderPk:'',
      idcardTable:[],
      detailForm: {}
    }
  },
  methods: {
    showDialog(orderPk){
      this.dialogVisible = true,
      this.orderPk = orderPk
      this.getList();
    },
    getList() {
      list().then(res=>{
        this.idcardTable = res.data
      })
    },
    readIdCard(data) {
      add(data).then(res=>{
        this.$message.success("录入成功")
        this.getList();
      })
    },
    deleteIdcard(){
      
    },
    showDetail(row){
      this.detailForm = row
    },
    loadIDCardInfo(data){
      console.log(data)
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
}
</script>

<style>
</style>
