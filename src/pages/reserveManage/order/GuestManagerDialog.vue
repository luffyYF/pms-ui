<template>
  <el-dialog class="guest-manager-page" title="客单管理" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :before-close="handleClose">
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
      <el-table-column prop="certificateNo" label="证件号码" width="180" align="center">
        <template slot-scope="scope">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="scope.row.certificateNo"
            :fetch-suggestions="querySearch"
            placeholder="请输入或选择身份证号"
            size="mini"
            value-key="peopleIdCode"
            @select="setIdCardInfo(scope.$index, $event)">
            <i class="el-icon-delete el-input__icon" slot="suffix" @click="clearCardInfo(scope.$index)"></i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.peopleName }}</div>
              <span class="addr">{{ item.peopleIdCode }}</span>
            </template>
          </el-autocomplete>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.guestOrderPk" title="移除" icon="el-icon-remove" size="mini" type="text" @click="removeGuest(scope.$index)" style="color:#f56c6c"></el-button>
          <el-button v-if="scope.row.mainFlag=='Y'" title="添加客人" icon="el-icon-circle-plus" size="mini" type="text" @click="addGuest(scope.$index)"></el-button>
          <IDCardScan @callback="readIdCardInfo(scope.$index, $event)"></IDCardScan>
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
import {list as idCardInfoList} from '@/api/order/pmsIdCardInfoController'
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
      multipleSelection: [],
      tempIdCardInfo:[],
      deleteIdCardInfo:[]
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
      this.tempIdCardInfo = []
      this.deleteIdCardInfo = []
      this.dialogVisible = true;
      this.getList()
    },
    getList(){
      listSimpleGuestMemberInfo({orderPk:this.currOrderPk}).then(res=>{
        this.guestTable = res.data;
        idCardInfoList({orderPk:this.currOrderPk}).then(res=>{
          this.tempIdCardInfo = res.data
          // let idNos = ""
          // this.guestTable.forEach(item=>[
          //   idNos += item.certificateNo + ","
          // ])
          // this.tempIdCardInfo = res.data.filter(ele=>{
          //   if (idNos.indexOf(ele.peopleIdCode)==-1) {
          //     return true
          //   }else {
          //     this.deleteIdCardInfo.push(ele)
          //     return false
          //   }
          // })
        })
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

    readIdCardInfo(index, data) {
      let idNos = ""
      this.guestTable.forEach(item=>{
        idNos += item.certificateNo+','
      })
      if(idNos.indexOf(data.peopleIdCode)!=-1) {
        this.$message.warning("该身份信息已存在，请不要重复读取")
        return
      }
      this.setIdCardInfo(index, data)
    },
    //设置身份证信息
    setIdCardInfo(index, data) {
      this.$set(this.guestTable[index], 'guestName', data.peopleName)
      this.$set(this.guestTable[index], 'certificateNo', data.peopleIdCode)
      this.$set(this.guestTable[index], 'birthday', data.peopleBirthday)
      this.$set(this.guestTable[index], 'address', data.peopleAddress)
      this.$set(this.guestTable[index], 'memSex', data.peopleSex)
      this.$set(this.guestTable[index], 'nationality', data.certType)
      this.$set(this.guestTable[index], 'certificateType', 'TWO_IDENTITY')

      // this.tempIdCardInfo.forEach( (item,index) =>{
      //   if(data.peopleIdCode==item.peopleIdCode) {
      //     this.tempIdCardInfo.splice(index, 1)
      //     this.deleteIdCardInfo.push(item)
      //   }
      // })
    },
    //清除身份信息
    clearCardInfo(index) {
      // let inputIdNo = this.guestTable[index].certificateNo;
      this.$set(this.guestTable[index], 'guestName', '新客人')
      this.$set(this.guestTable[index], 'certificateNo', '')
      this.$set(this.guestTable[index], 'birthday', null)
      this.$set(this.guestTable[index], 'address', null)
      this.$set(this.guestTable[index], 'memSex', null)
      this.$set(this.guestTable[index], 'nationality', null)
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
      // this.clearCardInfo(index)
      this.guestTable.splice(index, 1)
    },
    handleClose() {
      this.$emit('refresh', this.currOrderPk, 'visitor');
      this.dialogVisible = false;
    },
    querySearch(queryString, cb) {
      let idNos = ""
      this.guestTable.forEach(item=>[
        idNos += item.certificateNo + ","
      ])
      let restaurants = this.tempIdCardInfo.filter(ele=>{
        return idNos.indexOf(ele.peopleIdCode)==-1
      })
      var results = restaurants.filter(this.createFilter(queryString));
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        if(queryString) {
          let temp = restaurant.peopleName + restaurant.peopleIdCode
          return (temp.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        }else {
          return true
        }
      };
    },
  }
};
</script>

<style lang="less">
.el-table .success-row {
  background: #f6faff
}
.my-autocomplete li{
  line-height: normal;
  padding: 1px 14px;
}
.my-autocomplete li .name{
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr{
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr{
  color: #ddd;
}
</style>
