<template>
  <el-dialog class="guest-manager-dialog" title="客单管理" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :before-close="handleClose">
    <el-table ref="guestManagerTab" 
      :row-class-name="tableRowClassName"
      :data="guestTable" 
      tooltip-effect="dark"
      style="width: 100%"
      height="400" 
      size="mini"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="roomNumber" label="房号" width="90" align="left">
        <template slot-scope="scope">
          <div style="float:left;width:18px;height: 17px;">
            <img v-if="scope.row.mainFlag=='Y'" src="../../../assets/image/main_guest.png" width="15" height="16" alt="主客人">
          </div>
          <div style="float:left;">{{scope.row.roomNumber}}</div>
        </template>
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
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.guestOrderPk" title="移除" icon="el-icon-remove" size="mini" type="text" @click="removeGuest(scope.$index)" style="color:#f56c6c"></el-button>
          <el-button v-if="scope.row.mainFlag=='Y'" title="添加客人" icon="el-icon-circle-plus" size="mini" type="text" @click="addGuest(scope.$index)"></el-button>
          <IDCardScan @callback="getIDCardInfo(scope.$index, $event)"></IDCardScan>
          <el-button size="mini" type="text" @click="submitItem(scope.row)">保存</el-button>
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
      this.dialogVisible = true;
      this.getList()
    },
    getList(){
      listSimpleGuestMemberInfo({orderPk:this.currOrderPk}).then(res=>{
        this.guestTable = res.data;
      })
    },
    tableRowClassName({row, rowIndex}) {
      // if(row.mainFlag=='Y'){
      //   return 'success-row';
      // }
      return '';
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
      let data = {
        orderPk: this.currOrderPk,
        guestList: this.multipleSelection
      }
      editOrderMemberBatch(data).then(res=>{
        this.$message.success('保存成功')
        this.getList()
      }).finally(()=>{
        this.loading = false;
      })
    },
    submitItem(row) {
      if(!this.validate([row])){
        return
      }
      let data = {
        orderPk: this.currOrderPk,
        guestList: [row]
      }
      editOrderMemberBatch(data).then(res=>{
        this.$message.success('保存成功')
        this.getList()
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

    //添加客人
    addGuest(index){
      let currRow = this.guestTable[index];
      let temp = {
        address: null,
        birthday: null,
        certificateNo: null,
        certificateType: "TWO_IDENTITY",
        guestName: "新客人",
        guestOrderPk: null,
        guestPhone: null,
        mainFlag: "N",
        memSex: null,
        nationality: null,
        roomNumber: currRow.roomNumber,
        mainGuestPk: currRow.guestOrderPk
      }
      // this.$set(this.guestTable,index, temp)
      this.guestTable.splice(index+1,0,temp)
      this.$refs.guestManagerTab.toggleRowSelection(this.guestTable[index+1]);
    },
    //移除客人
    removeGuest(index){
      this.guestTable.splice(index,1)
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
.guest-manager-dialog .el-table .success-row {
  background: #f6faff
}
</style>
