// 批量入账
<template>
  <el-dialog class="pattern-dialog dialog-batch-addbill" title="批量入账" :visible.sync="dialogBatchEntry" width="800px" :close-on-click-modal="false" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container" >
        <div>
            <el-button size="mini" type="text" @click="addFormAddBillsClick()">添加</el-button>
             <!-- v-if="addBillMultipleSelection.length > 0" -->
            <el-button size="mini" type="text" @click="delFormAddBillsClicks()">删除</el-button>
        </div>
        <el-form ref="formAddBills" size="mini" label-width="80px">
          <el-table ref="multipleTable" size="mini" :data="formAddBills" @selection-change="addBillHandleSelectionChange" tooltip-effect="dark" border height="430" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="projectName" label="项目" width="150">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.projectPk" placeholder="请选择项目" style="width:100%">
                <el-option
                  v-for="item in conProjectList"
                  :key="item.projectPk"
                  :label="item.code+' - '+item.projectName"
                  :value="item.projectPk">
                </el-option>
                <el-option
                  v-for="item in settlProjectList"
                  :key="item.projectPk"
                  :label="item.code+' - '+item.projectName"
                  :value="item.projectPk">
                </el-option>
              </el-select>
              </template>
            </el-table-column>
            <el-table-column label="客单" v-if="!isDubm" width="120">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.guestOrderPk" placeholder="请选择客单" style="width:100%">
                  <el-option
                    v-for="(item,index) in guestOrderSelect"
                    :key="index"
                    :label="'房间号:'+ifRoomNumber(item.roomNumber)+' 客人姓名:'+item.memName"
                    :value="item.guestOrderPk">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="settlementAmount" label="支付方式">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.payment" placeholder="请选择支付方式" style="width:100%">
                  <el-option
                    v-for="(value, key) in paymentMap"
                    :key="key"
                    :label="value"
                    :value="key">
                  </el-option>
                </el-select>
              </template>
            </el-table-column> -->
            <el-table-column label="金额">
              <template slot-scope="scope">
                 <el-input size="mini" @change="addBillMomeyChange()" v-model="scope.row.consumptionAmount"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="备注" width="200">
              <template slot-scope="scope">
                 <el-input size="mini" v-model="scope.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                 <el-button size="mini" type="text" @click="addFormAddBillsClick(scope.$index)" >添加</el-button>
                  <!-- v-if="formAddBills.length > 1"  -->
                 <el-button size="mini" type="text" @click="delFormAddBillsClick(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div style="margin-top:5px;">
          消费总计:{{addBillsConsumptionAmount}}元&nbsp;&nbsp;&nbsp;&nbsp;结算总价:{{addBillsSettlementAmount}}元
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary"  @click="addBillLists(formAddBills)">确认</el-button>
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
</template>

<script>
// import {paymentMap} from '@/utils/orm'
import {addBills, selectGuestOrderBill,addDumbBills } from '@/api/bill'
import { listByProjectType } from '@/api/systemSet/pmsProjectController'

export default {
  data(){
    return {
      dialogBatchEntry: false,
      addBillMultipleSelection:[],
      guestOrderSelect: [],
      formAddBills:[{
        projectPk:'',
        guestOrderPk: null,
        channelTypePk: null,
        projectName: '',
        consumptionAmount: '',
        remark: '',
        // payment: '0',
      }],
      // paymentMap:paymentMap,
      isDubm:false,
      addBillsConsumptionAmount:0,
      addBillsSettlementAmount:0,
      conProjectList:[],
      settlProjectList:[],
      orderPk:null,
      billItems:null,
      dumbPk:'',
      remindFlag: null,
    }
  },
  methods: {
    /**
     * 打开初始化
     * @augments orderPk (必传) 
     * @augments isDubm (必传)  true是哑房账  false不是哑房账
     * @augments billItems (可选) 
     * @augments remindFlag (可选) 已提醒标识 1:钟点房收取 2:超时收取 3:提前退房收取
    */
    showDialog(orderPk, isDubm, billItems, dumbPk, remindFlag) {
      this.orderPk = orderPk
      this.billItems = billItems
      this.remindFlag = remindFlag
      this.dialogBatchEntry = true
      this.isDubm = isDubm
      this.dumbPk = dumbPk
      this.loadGuestSelect(orderPk)
      let cons = this 
      this.loadProject(function() {
        if(billItems==null || billItems.length<=0) {
          //空客单
          cons.formAddBills = [{
            projectPk:'',
            guestOrderPk: null,
            channelTypePk: null,
            projectName: '',
            consumptionAmount: '',
            remark: '',
            // payment: '0',
          }]
        }else {
          //回显客单
          cons.formAddBills = []
          /*
          {
            projectCode:112,
            guestOrderPk:,
            price:
          }
          */
          billItems.forEach(item=>{
            let projectObj = cons.selectDefaultProject(item.projectCode);
            cons.formAddBills.push({
              projectPk: projectObj ? projectObj.projectPk:'',
              guestOrderPk: item.guestOrderPk,
              channelTypePk: null,
              projectName: projectObj ? projectObj.projectName:'',
              consumptionAmount: item.price,
              remark: '',
              // payment: '0',
            })
          })
        }
      });
    },
    /**
     * 选中默认的消费、结算项目
     * @augments projectCode 项目编码
     * return 项目Obj
     */
    selectDefaultProject(projectCode) {
      let tempProject = null;
      this.conProjectList.forEach(item=>{
        if(item.code==projectCode){
          tempProject = item
        }
      })
      this.settlProjectList.forEach(item=>{
        if(item.code==projectCode){
          tempProject = item
        }
      })
      return tempProject
    },
    //加载客单下拉框列表
    loadGuestSelect(orderPk) {
      this.guestOrderSelect = []
      console.log("当前主单",orderPk)
      selectGuestOrderBill({orderPk: orderPk}).then(res=>{
        res.data.forEach(item=>{
          if(item.orderStatus=="CHECKIN" || item.orderStatus=='RESERVE' || item.orderStatus=='LEAVENOPAY') {
            this.guestOrderSelect.push(item)
          }
        })
      })
    },
    //加载结算项目、消费项目
    loadProject(callback){
      listByProjectType({projectType:'CONSUMER'}).then(res => {
        this.conProjectList = res.data

        listByProjectType({projectType:'SETTLEMENT'}).then(res => {
          this.settlProjectList = res.data

          if(callback){
            callback()
          }
        })
      })
    },
    addFormAddBillsClick(index){
      if(index != null){
        var temp = JSON.parse(JSON.stringify(this.formAddBills[index]))
        temp.t = '122'
        this.formAddBills.push(temp)
        return
      }
      this.formAddBills.push({
        projectPk:'',
        guestOrderPk: null,
        channelTypePk: null,
        projectName: '',
        consumptionAmount: '',
        remark: '',
        // payment: '0',
      })
    },
    delFormAddBillsClick(index){
      this.formAddBills.splice(index,1)
      this.addBillMomeyChange()
    },
    delFormAddBillsClicks(){
      for(var i=0;i<this.addBillMultipleSelection.length;i++){
        for(var j=0;j<this.formAddBills.length;j++){
          if(this.addBillMultipleSelection[i] == this.formAddBills[j]){
            this.formAddBills.splice(j,1)
            break;
          }
        }
      }
      this.addBillMomeyChange()
    },
    addBillMomeyChange(){
      var money = 0
      for(var i=0;i<this.formAddBills.length;i++){
        if(this.formAddBills[i].consumptionAmount){
          money = money + parseFloat(this.formAddBills[i].consumptionAmount)
        }
      }
      this.addBillsConsumptionAmount = money.toFixed(2)
    },
    addBillLists(formAddBills){
      for(var i=0;i<formAddBills.length;i++){
        if(!formAddBills[i].projectPk){
          this.$message({type:'warning', message:'请选择账单'+(i+1)+"的项目"})
          return
        }
        if(!formAddBills[i].guestOrderPk && !this.isDubm){
          this.$message({type:'warning', message:'请选择账单'+(i+1)+"的客单"})
          return
        }
        // if(!formAddBills[i].payment){
        //   this.$message({type:'warning', message:'请选择账单'+(i+1)+"的支付方式"})
        //   return
        // }
        if(!formAddBills[i].consumptionAmount){
          this.$message({type:'warning', message:'请输入账单'+(i+1)+"的消费金额"})
          return
        }
        if(Number(formAddBills[i].consumptionAmount)<=0){
          this.$message({type:'warning', message:'请输入正确的账单'+(i+1)+"的消费金额"})
          return
        }
        formAddBills[i].orderPk = this.orderPk
        formAddBills[i].dumbPk = this.dumbPk,
        formAddBills[i].billType =  this.isDubm?'DUMB':'ROOM'
      }
      if(!this.isDubm){
        let data = {
          bills:formAddBills,
          remindFlag:this.remindFlag
        }
        addBills(data).then(res => {
          if(res.code == 1){
            this.$message({
              message: '入账成功！',
              type: 'success'
            });
          }
          // if(this.billItems!=null && this.billItems.length>0) {
          //   //回调到退房
          //   this.$emit('to-settle', this.billItems[0])
          // }else{
          //   //普通回调
          //   this.$emit('callback', this.orderPk)
          // }
          this.$emit('callback', this.orderPk)
          this.dialogBatchEntry = false;
          // this.lookupBillList(this.orderPk);
        })
      }else{
        let data = {
          bills:formAddBills,
          remindFlag:null
        }
        addDumbBills(data).then(res => {
          this.$message({
            message: '入账成功！',
            type: 'success'
          });
          this.$emit('callback')
          this.dialogBatchEntry = false;
        })
      }
    },
    addBillHandleSelectionChange(val){
      this.addBillMultipleSelection = val
    },
    ifRoomNumber(roomNumber){
      if(roomNumber==null || roomNumber==undefined || roomNumber=='')
        return '未排房'
      else
        return roomNumber
    },

    handleClose(){
      this.dialogBatchEntry = false
      this.$emit('callback')
    }
  }
}
</script>

<style>
.dialog-batch-addbill .el-dialog__body{
  height: 500px;
  padding:0 10px;
}
</style>
