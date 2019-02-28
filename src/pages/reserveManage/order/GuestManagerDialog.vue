<template>
  <el-dialog class="son-dialog" title="客单管理" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :before-close="handleClose">
    <el-table ref="guestManagerTab" :data="guestTable" tooltip-effect="dark" style="width: 100%" height="400" size="mini" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="roomNumber" label="房号" width="90" align="center">
      </el-table-column>
      <el-table-column prop="guestName" label="姓名"  align="center">
        <template slot-scope="scope"> 
          <el-input type="text" size="mini" v-model="scope.row.guestName"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="guestPhone" label="手机号码" align="center">
        <template slot-scope="scope"> 
          <el-input type="text" size="mini" v-model="scope.row.guestPhone"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="certificateType" label="证件类型" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.certificateType" placeholder="请选择" size="mini" clearable>
            <el-option
              v-for="(v,k) in credentialsMap"
              :key="k"
              :label="v"
              :value="k">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="certificateNo" label="证件号码" width="160" align="center">
        <template slot-scope="scope"> 
          <el-input type="text" size="mini" v-model="scope.row.certificateNo"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <IDCardScan @callback="getIDCardInfo(scope.$index, $event)"></IDCardScan>
          <el-button size="mini" type="text" @click="submitItem(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
    <el-button size="mini" type="primary" @click="submitBatch" :loading="loading">批量保存</el-button>
    <el-button size="mini" @click="handleClose">关闭</el-button>
  </span>
  </el-dialog>
  
</template>

<script>

import {credentialsMap} from '@/utils/orm'
import {validatePhone} from '@/utils/validate'
import {listSimpleGuestMemberInfo, editOrderMemberBatch} from '@/api/order/pmsOrderController'
import IDCardScan from '@/components/Idcard/IDCardScan'

export default {
  components:{IDCardScan},
  data() {
    return {
      loading: false,
      dialogVisible: false,
      credentialsMap:credentialsMap,
      guestTable: [],
      currOrderPk: null,
      multipleSelection: []
    };
  },
  methods: {
    /**
     * 主订单主键
     */
    showDialog(orderPk) {
      this.currOrderPk=orderPk;
      this.guestTable = [];
      this.multipleSelection = []
      listSimpleGuestMemberInfo({orderPk:orderPk}).then(res=>{
        this.guestTable = res.data;
      })
      this.dialogVisible = true;
    },
    submitBatch(){
      if(this.multipleSelection.length<=0) {
        this.$message.warning('至少选择一条')
        return
      }
      this.loading = true;
      if(!this.validate(this.multipleSelection)){
        this.loading = false;
        return
      }
      editOrderMemberBatch(this.multipleSelection).then(res=>{
        this.$message.success('修改成功')
      }).finally(()=>{
        this.loading = false;
      })
    },
    submitItem(row) {
      if(!this.validate([row])){
        return
      }
      editOrderMemberBatch([row]).then(res=>{
        this.$message.success('修改成功')
      })
    },
    validate(dataList) {
      for(let item of dataList) {
        if(item.guestPhone) {
          if(!validatePhone(item.guestPhone)) {
            this.$message({type:'warning', message:item.guestName +' 手机号不合法'})
            return false
          }
        }
      }
      
      return true;
    },
    //获取身份证信息
    getIDCardInfo(index, data){
      this.$set(this.guestTable[index], 'guestName', data.guestName)
      this.$set(this.guestTable[index], 'certificateNo', data.certificateNo)
      this.$set(this.guestTable[index], 'birthday', data.bornDate)
      this.$set(this.guestTable[index], 'address', data.detailAddress)
      this.$set(this.guestTable[index], 'memSex', data.guestGender)
      this.$set(this.guestTable[index], 'nationality', data.nationality)
      this.$set(this.guestTable[index], 'certificateType', 'TWO_IDENTITY')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose() {
      this.$emit('refresh', this.currOrderPk, 'visitor');
      this.dialogVisible = false;
      // this.initOrderInfo(this.currOrderPk, 'visitor')
    }

  }
};
</script>

<style>
</style>
