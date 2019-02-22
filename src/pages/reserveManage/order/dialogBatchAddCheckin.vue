// 批量入住
<template>
  <section>
    <el-dialog class="pattern-dialog dialog-batch-addChckin" title="批量入住" :visible.sync="dialogVisible" width="1100px" :close-on-click-modal="false" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <el-row>
          <el-col :span="12" style="    padding-right: 12px;">
            <el-form ref="form" size="mini" :model="form" :inline="true" label-width="90px">
              <el-form-item label="抵店日期" required>
                <el-date-picker v-model="form.beginDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" :disabled="true" :clearable="false" style="width:150px"></el-date-picker>
              </el-form-item>
              <el-form-item label="离店日期" required>
                <el-date-picker v-model="form.endDate" :picker-options="pickerOptions0" @change="loadList" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择离店时间" :clearable="false"  style="width:150px"></el-date-picker>
              </el-form-item>
              <el-form-item label="客源渠道" required>
                <channel-select ref="channelRef" v-model="form.channelTypePk" style="width:150px"></channel-select>
              </el-form-item>
              <el-form-item label="入住类型" required>
                <el-select v-model="form.checkInType" style="width:150px">
                  <el-option v-for="(v, k) in checkInTypeMap" :key="k" :value="k" :label="v"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否团体">
                <el-select v-model="form.isTeam" style="width:150px" :disabled="orderPk!=null">
                  <el-option label="否" value="N"></el-option>
                  <el-option label="是" value="Y"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="协议单位" :required="form.isTeam=='Y'">
                <el-input v-model="form.agreementName" :readonly="true" style="width:150px" :disabled="orderPk!=null">
                  <el-button slot="append" icon="el-icon-search" @click="openAgreement" title="查询协议单位" :disabled="orderPk!=null"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="支付方式">
                <el-select v-model="form.payment" style="width:150px" :disabled="orderPk!=null">
                  <el-option v-for="(value,index) in paymentMap" :key="index" :value="index" :label="value"></el-option>
                </el-select>
              </el-form-item> 
              <el-form-item label="每房人数" >
                <el-input-number v-model="form.guestNumber" :min="1" :step="1" style="width:150px"></el-input-number>
              </el-form-item>
              <el-form-item label="备注" >
                <el-input v-model="form.remark" style="width:404px" :disabled="orderPk!=null"></el-input>
              </el-form-item>
            </el-form>

            <el-table
              border
              tooltip-effect="dark"
              style="width: 100%"
              height="280"
              :data="tableData1"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
              <el-table-column label="房型"  prop="roomTypePk">
                <template slot-scope="scope">
                  <span>{{roomTypeMap[scope.row.roomTypePk].typeName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="房价" prop="price"></el-table-column>
            </el-table>
            <el-button @click="addRoom" type="primary" size="mini" style="margin-top:10px">添加</el-button>
          </el-col>
          <el-col :span="12">
            <el-table
              border
              tooltip-effect="dark"
              style="width: 100%"
              height="456"
              :data="tableData2">
              <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
              <el-table-column label="房型"  prop="roomTypeName" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{roomTypeMap[scope.row.roomTypePk].typeName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="人数"  prop="guestNumber" width="110">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.guestNumber" :min="1" :step="1" style="width:90px" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="离店日期"  prop="endDate" width="180">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.endDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择离店时间" :clearable="false"  style="width:150px" size="mini"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="delRoom(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submit()" :loading="loading">确认入住</el-button>
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 协议单位 -->
    <Agreement ref="agreementRef" @sendData="agreementCallback($event)"></Agreement>
  </section>
</template>

<script>
import moment from 'moment'
import {deepClone} from '@/utils/index'
import { paymentMap,checkInTypeMap } from '@/utils/orm'
import {listEmptyRoom, batchAddCheckin} from '@/api/order/pmsOrderController'
import {listType} from '@/api/utils/pmsTypeController'

import Agreement from "@/components/Agreement/Agreement";

export default {
  components:{Agreement},
  data(){
    return {
      dialogVisible:false,
      loading: false,
      form: {
        beginDate:null,
        endDate:null,
        agreementPk:null,
        agreementName:null,
        isTeam:null,
        payment:null,
        remark:null,
        guestNumber:1,
        channelTypePk:null,
        checkInType:null,
      },
      roomTypeMap: {},
      sourceData: [],
      tableData1: [],
      tableData2: [],
      orderPk: null,
      multipleSelection:[],
      continueDate:null,
      paymentMap: paymentMap,
      checkInTypeMap: checkInTypeMap,
      pickerOptions0: null
    }
  },
  methods: {
    /**
     * @param orderPk 可选
     */
    showDialog(orderPo) {
      this.dialogVisible = true
      this.loading = false
      this.$nextTick(()=>{
        this.$refs.channelRef.load(true);
      })
      if(moment().hour()<6){
        this.form.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss")
      }else{
        this.form.beginDate = moment().format("YYYY-MM-DD HH:mm:ss")
      }
      //限制今天以前的日期不可选择
      const currForm = this.form
      this.pickerOptions0 = {
        disabledDate(time) {
          return time.getTime() < moment(currForm.beginDate) - 8.64e7;
        },
      }
      this.form.endDate = moment(this.form.beginDate).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
      this.form.agreementPk=null
      this.form.agreementName=null
      this.form.isTeam='N'
      this.form.payment='-1'
      this.form.remark=null
      this.form.guestNumber=1
      // this.form.channelTypePk = 
      this.form.checkInType = '0'
      this.roomTypeMap = {}
      this.tableData1 = []
      this.tableData2 = []
      this.sourceData = []
      // 获取房型
      listType({typeMaster:'ROOM_TYPE'}).then(res=>{
        res.data.data.forEach(ele => {
          this.$set(this.roomTypeMap, ele.typePk, ele)
        });

        this.loadList()
      })

      //有主订单信息传入，需要补充数据
      if(orderPo !=null && orderPo.orderPk!=null && orderPo.orderPk!=undefined && orderPo.orderPk!=''){
        this.orderPk = orderPo.orderPk
        this.form.isTeam = orderPo.isTeam
        this.form.agreementPk = orderPo.agreementPk
        this.form.agreementName = orderPo.agreementName
        this.form.payment = orderPo.payment+''
        this.form.remark = orderPo.remark
      }else{
        this.orderPk = null
      }
    },
    
    loadList() {
      this.sourceData = []
      let data = {
        roomTypePks:'',
        beginDate:moment(this.form.beginDate).format("YYYY-MM-DD"),
        endDate:moment(this.form.endDate).format("YYYY-MM-DD"),
      }
      listEmptyRoom(data).then(res=>{
        let temp = []
        res.data.forEach(ele=>{
          if(this.tableData2.findIndex(t=>t.roomPk===ele.roomPk) ==-1){
            temp.push(ele)
          }
        })
        this.tableData1 = temp
        this.sourceData = deepClone(res.data)
      })
    },
    submit() {
      this.loading = true
      if(!this.form.channelTypePk){
        this.$message.warning('请选择渠道')
        this.loading = false
        return
      }
      if(this.form.isTeam==='Y'){
        if(!this.form.agreementPk){
          this.$message.warning('请选择协议单位')
          this.loading = false
          return
        }
      }
      if(this.tableData2.length<=0){
        this.$message.warning('未选择房间')
        this.loading = false
        return
      }

      //补全列表数据
      this.tableData2.forEach(ele=>{
        this.$set(ele,'checkInType', this.form.checkInType)
        this.$set(ele,'channelTypePk', this.form.channelTypePk)
      })
      let data = {
        order: {
          orderPk:this.orderPk, //若主键为空，则会新增主订单
          name: '批量入住',
          remark: this.form.remark,
          payment: this.form.payment,
          isTeam: this.form.isTeam,
          agreementPk: this.form.agreementPk,
        },
        guestDtoList: this.tableData2
      }
      batchAddCheckin(data).then(res=>{
        this.$message.success('入住成功')
        this.$emit('callback', res.data, 'visitor') 
        this.dialogVisible = false
      }).finally(()=>{
        this.loading = false
      })

    },
    addRoom(){
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach(ele=>{
          this.tableData2.push({
            roomPk: ele.roomPk,
            roomNumber: ele.roomNumber,
            roomTypePk: ele.roomTypePk,
            beginDate: this.form.beginDate,
            endDate: this.form.endDate,
            guestNumber: this.form.guestNumber,
            currPrice: ele.price
          })
          this.tableData1.splice(this.tableData1.findIndex(t=>t.roomPk===ele.roomPk), 1)
        })
        this.multipleSelection = []
      }
    },
    delRoom(index) {
      let room = this.tableData2[index]
      this.tableData2.splice(index,1)
      let recoverObj = this.sourceData[this.sourceData.findIndex(t=>t.roomPk===room.roomPk)]
      if(recoverObj){
        this.tableData1.unshift(recoverObj)
      }
    },
    //打开选择协议单位
    openAgreement() {
      this.$refs.agreementRef.init();
    },
    //选择协议回调
    agreementCallback(data) {
      this.$set(this.form,"agreementPk",data.agreementPk)
      this.$set(this.form,"agreementName",data.unitName)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(){
      this.dialogVisible = false
    }
  }
}
</script>
<style scope>
.dialog-batch-addChckin .date-opr{
  text-align: right;
  margin: 16px;
}
</style>

<style>
.dialog-batch-addChckin .el-dialog__body{
  height: 500px;
  padding:10px 10px;
}
.dialog-batch-addChckin .el-form-item--mini.el-form-item{
  margin-bottom: 6px !important
}
</style>
