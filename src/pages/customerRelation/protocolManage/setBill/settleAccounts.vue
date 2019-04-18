// 会员积分换房规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
<div>
  <el-dialog class="setBillSettle" :title="title" top="100px" :visible.sync="dialogVisible" width="800px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="账套名称"  prop="setBillName">
            {{dataForm.setBillName}}
        </el-form-item>
    </el-form>
        <el-table
            size="mini" 
            border 
            highlight-current-row
            :data="consumerBillList" 
            v-loading="loading"
            height="300px">
            <el-table-column label="消费时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column label="客人姓名" prop="memName" align="center">
            </el-table-column>
            <el-table-column label="房号" prop="roomNumber" align="center">
            </el-table-column>
            <el-table-column label="消费金额" prop="consumptionAmount" align="center">
            </el-table-column>
            
            <el-table-column label="营业项目" prop="projectName" align="center">
            </el-table-column>
            <el-table-column label="操作员" prop="userName" align="center">
            </el-table-column>
        </el-table>
        <span style="margin-top:5px;">总计{{consumerBillList.length}}笔财务,共计{{consumerBillList | momeyFilter}}元</span>
        <p style="text-align:right;">
            <el-button type="primary" size="mini" @click="shouKuanClick(true,'财务结算')">收款</el-button>
            <!-- <el-button type="primary" size="mini" >支付宝</el-button>
            <el-button type="primary" size="mini" >微信</el-button> -->
            <el-button type="primary" size="mini" @click="shouKuanClick(false,'退款')">退款</el-button>
            <el-button type="primary" size="mini" @click="ctClick()">冲调</el-button>
            <el-button type="primary" size="mini" @click="freeSheetClick()">免单</el-button>
            <!-- <el-button type="primary" size="mini" >预收款</el-button>
            <el-button type="primary" size="mini" >支票</el-button> -->
            <el-button type="primary" size="mini" @click="otherClick()">其他</el-button>
        </p>
        
        <el-table
            style="margin-top:5px;"
            size="mini" 
            border 
            ref="singleTable"
            highlight-current-row
            :data="settlementBillList" 
            @current-change="handleCurrentChange"
            v-loading="loading"
            height="300px">
            <el-table-column label="营业项目" prop="projectName" align="center">
            </el-table-column>
            <el-table-column label="业务详情" prop="remark" align="center">
            </el-table-column>
            <el-table-column label="消费金额" prop="settlementAmount" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-delete" size="mini" v-if="scope.row.billPk == null || scope.row.billPk == ''" @click="removeClick(scope.$index)" >移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span style="margin-top:5px;">平衡数{{consumerBillList | momeyFilter2(settlementBillList)}}元</span>
        <span slot="footer" class="dialog-footer">
            
            <el-button type="primary" size="mini" @click="saveBillClik()">保存</el-button>
            <el-button type="primary" size="mini" @click="saveBillClik('Y')">结账</el-button>
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        </span>
  </el-dialog>

  <el-dialog class="setBillSettle" title="账务结算" top="150px" :visible.sync="otherDialog" width="400px"
             :close-on-click-modal="false" :before-close="handleOtherClose">
            
        <el-form ref="otherObj" size="mini" :rules="rules" :model="otherObj" label-width="110px">

            <el-form-item label="收款方式" prop="projectPk" >
                <el-select size="mini" v-model="otherObj.projectPk"  style="width:100%;" placeholder="收款方式">
                    <el-option v-for="y in otherProjectList" :label="y.projectName" :value="y.projectPk" :key="y.projectPk">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="money">
                <el-input-number style="width:100%;" :controls="false" v-model="otherObj.money" :precision="2" :min="1" :step="1" size="mini"></el-input-number>
            </el-form-item>
             <el-form-item label="备注" prop="remark">
                <el-input size="mini" style="width:100%;" v-model="otherObj.remark" type="text"/>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="otherSaveClick()">确定</el-button>
            <el-button @click="otherDialog = false" size="mini">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog class="setBillSettle" :title="sktitle" top="150px" :visible.sync="shoukuanDialog" width="400px"
             :close-on-click-modal="false" :before-close="handleShouKuanClose">
            
        <el-form ref="shoukuanObj" size="mini" :rules="rules" :model="shoukuanObj" label-width="110px">

            <el-form-item label="收款方式" prop="projectPk" v-if="isPlus">
                <el-radio v-model="shoukuanObj.projectPk" :key="y.projectPk" v-for="y in quickProjectList" :label="y.projectPk">{{y.projectName}}</el-radio>
            </el-form-item>
            <el-form-item label="收款方式" prop="projectPk" v-else>
                <el-radio v-model="shoukuanObj.projectPk" :key="y.projectPk" v-for="y in refundProjectList" :label="y.projectPk">{{y.projectName}}</el-radio>
            </el-form-item>
            <el-form-item label="金额" prop="money">
                <el-input-number style="width:100%;" :controls="false" v-model="shoukuanObj.money" :precision="2" :min="1" :step="1" size="mini"></el-input-number>
            </el-form-item>
             <el-form-item label="备注" prop="remark">
                <el-input size="mini" style="width:100%;" v-model="shoukuanObj.remark" type="text"/>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="shouKuanSaveClick()">确定</el-button>
            <el-button @click="shoukuanDialog = false" size="mini">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog class="setBillSettle" title="冲调" top="150px" :visible.sync="ctDialog" width="400px"
             :close-on-click-modal="false" :before-close="handlectClose">
            
        <el-form ref="ctObj" size="mini" :rules="rules" :model="ctObj" label-width="110px">
            <el-form-item label="收款方式" prop="type">
                <el-radio v-model="ctObj.type" label="1">完全冲调</el-radio>
                <el-radio v-model="ctObj.type" label="0">冲调</el-radio>
            </el-form-item>
            <el-form-item label="金额" prop="money" v-if="ctObj.type == '0' || ctObj.type == 0 ">
                <el-input-number style="width:100%;" :controls="false" v-model="ctObj.money" :precision="2" :min="1" :step="1" size="mini"></el-input-number>
            </el-form-item>
             <el-form-item label="备注" prop="remark">
                <el-input size="mini" style="width:100%;" v-model="ctObj.remark" type="text"/>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="ctSaveClick()">确定</el-button>
            <el-button @click="ctDialog = false" size="mini">取 消</el-button>
        </span>
    </el-dialog>

     <el-dialog class="setBillSettle" title="结算收款-免单" top="150px" :visible.sync="mdDialog" width="400px"
             :close-on-click-modal="false" :before-close="handlemdClose">
            
        <el-form ref="mdObj" size="mini" :rules="rules" :model="mdObj" label-width="110px">

            <el-form-item label="收款方式" prop="projectPk" >
                <el-select size="mini" v-model="mdObj.projectPk" :disabled="true" style="width:100%;" placeholder="收款方式">
                    <el-option v-for="y in mdProjectList" :label="y.projectName" :value="y.projectPk" :key="y.projectPk">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="金额" prop="money" >
                <el-input-number style="width:100%;" :controls="false" v-model="mdObj.money" :precision="2" :min="1" :step="1" size="mini"></el-input-number>
            </el-form-item>
             <el-form-item label="备注" prop="remark">
                <el-input size="mini" style="width:100%;" v-model="mdObj.remark" type="text"/>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="mdSaveClick()">确定</el-button>
            <el-button @click="mdDialog = false" size="mini">取 消</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import Moment from 'moment'
import {addSetBill,updateSetBill,addBill} from '@/api/customerRelation/ProtocolManage/setBill'
import {allAgreement} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
  import { listByProjectType } from '@/api/systemSet/pmsProjectController'
import {listBillByAgreement,listBillBySetBillPk} from '@/api/bill'

  export default {
    data () {
      return {

        otherDialog:false,
        mdDialog:false,
        ctDialog:false,
        shoukuanDialog:false,
        billDialogVisible:false,
        dialogVisible: false,
        loading: false,
        billLoading:false,
        dataForm: {
            billPks:[]
        },
        rules: {
          ruleName: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
          projectPk: [{ required: true, message: '请填写收款项目', trigger: 'blur' }],
          money: [{ required: true, message: '请填写金额', trigger: 'blur' }],
        },
        title:"财务结算",
        pageObj:{
            total:0,
            pageNum:1,
            pageSize:10
        },
        consumerBillList:[],
        settlementBillList:[],
        settleProjectList:[],
        quickProjectList:[],
        refundProjectList:[],
        mdProjectList:[],
        otherProjectList:[],
        shoukuanObj:{
            projectPk:"",
            money:0,
            remark:""
        },
        ctObj:{
            type:1,
            money:0,
            remark:""
        },
        mdObj:{
            projectPk:"",
            money:0,
            remark:""
        },
        projectObj:{

        },
        otherObj:{
            projectPk:"",
            money:0,
            remark:""
        },
        isPlus:false,
        currentRow:null,
        sktitle:"",
        settlementAmount:0
      }
    },
    methods: {
        
        handleOtherClose(){
            this.otherDialog = false
        },
        handlemdClose(){
            this.mdDialog = false
        },
        mdSaveClick(){
            this.$refs.mdObj.validate(valid => {
                var project = this.projectObj[this.mdObj.projectPk]
                var isNew = true
                for(var i=0;i<this.settlementBillList.length;i++){
                    //判断当前是否有未保存的同项目账单
                    if(this.settlementBillList[i].projectPk == this.mdObj.projectPk && (this.settlementBillList[i].billPk == null || this.settlementBillList[i].billPk == "")){
                        var settle = this.isPlus?parseFloat(this.mdObj.money):-parseFloat(this.mdObj.money)
                        this.settlementBillList[i].settlementAmount = parseInt(this.settlementBillList[i].settlementAmount)+settle
                        this.settlementBillList[i].remark = this.settlementBillList[i].remark+((this.mdObj.remark == null || this.mdObj.remark == "")?"":"-"+this.mdObj.remark)
                        isNew = false
                        break
                    }
                }
                console.log(this.dataForm.agreementPk)
                if(isNew){
                    var bill = {
                        settlementAmount:this.isPlus?parseFloat(this.mdObj.money):-parseFloat(this.mdObj.money),
                        projectPk:project.projectPk,
                        projectCode:project.code,
                        projectName:project.projectName,
                        remark:project.projectName+(this.mdObj.remark == null?"":"-"+this.mdObj.remark),
                        agreementPk:this.dataForm.agreementPk,
                        setBillPk:this.dataForm.setBillPk
                    }
                    this.settlementBillList.push(bill)
                }

                this.mdDialog = false
            })
        },
        freeSheetClick(){
            var momey = 0;
            var list = this.consumerBillList
            var list2 = this.settlementBillList
            for(var i=0;i<list.length;i++){
                momey = momey + parseFloat(list[i].consumptionAmount)
            }
            var momey2 = 0;
            for(var i=0;i<list2.length;i++){
                momey2 = momey2 + parseFloat(list2[i].settlementAmount)
            }
            this.settlementAmount = momey-momey2
            // if(this.settlementAmount <= 0){
            //     this.$message({ type: 'warning', message: '当前账套不需要免单' })
            //     return
            // }
            this.mdObj.money = 0
            this.mdObj.remark = ""
            this.isPlus = true
            this.mdDialog = true

        },
        //冲调
        handlectClose(){
            this.ctDialog = false
        },
        ctSaveClick(){
            if(this.ctObj.money > this.currentRow.settlementAmount){
                this.$message({ type: 'warning', message: '冲调金额不能大于当前账务金额' })
                return
            }
            var bill = JSON.parse(JSON.stringify(this.currentRow))
            bill.billPk = null
            bill.settlementAmount = -this.ctObj.money
            var type = this.ctObj.type == "1"?"完全冲调":"部分冲调"
            bill.remark = type+"-"+bill.projectName+"-"+this.ctObj.remark
            this.settlementBillList.push(bill)
            this.ctDialog = false
        },
        ctClick(){
            if(this.currentRow == null){
                this.$message({ type: 'warning', message: '请选择下面的账单进行冲调' })
                return
            }
            if(this.currentRow.settlementAmount < 0 || this.currentRow.projectPk == "0"){
                this.$message({ type: 'warning', message: '此数据不能冲调' })
                return
            }
            this.ctObj = {
                type:"1",
                money:this.currentRow.settlementAmount,
                remark:""
            }
            this.ctDialog = true
        },
        //冲调end 
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        saveBillClik(isSettle){
           var momey = 0;
           var list = this.settlementBillList
            for(var i=0;i<list.length;i++){
                list[i].createTime = null
                momey = momey + parseFloat(list[i].settlementAmount)
            }
            this.dataForm.settlementAmount = momey
            if(isSettle && this.dataForm.settlementAmount != this.dataForm.consumptionAmount){
                this.$message({ type: 'warning', message: '所选账务未平,不能结账' })
                return
            }
            this.dataForm.createTime = null
            var data = {
                setBillPo:this.dataForm,
                billPos:list
            }
            if(isSettle){
                data.isSettle = isSettle
            }
            addBill(data).then(res => {
                if(res.code == 1){
                    this.$message({ type: 'success', message: res.sub_msg })
                    this.dialogVisible = false
                    this.$emit('callback')
                }else{
                    this.$message({ type: 'warning', message: res.sub_msg })
                }
            }).finally(() => {
                this.loading = false
            })

        },
        shouKuanSaveClick(){
            this.$refs.shoukuanObj.validate(valid => {
                if(this.shoukuanObj.money.isNaN){
                    this.$message({ type: 'warning', message: '请输入正确的收款金额' })
                    return
                }
                var project = this.projectObj[this.shoukuanObj.projectPk]
                var isNew = true
                
                for(var i=0;i<this.settlementBillList.length;i++){
                    //判断当前是否有未保存的同项目账单
                    if(this.settlementBillList[i].projectPk == this.shoukuanObj.projectPk && (this.settlementBillList[i].billPk == null || this.settlementBillList[i].billPk == "")){
                        var settle = this.isPlus?parseFloat(this.shoukuanObj.money):-parseFloat(this.shoukuanObj.money)
                        this.settlementBillList[i].settlementAmount = parseInt(this.settlementBillList[i].settlementAmount)+settle
                        isNew = false
                        break
                    }
                }
                console.log(project)
                if(isNew){
                    var bill = {
                        settlementAmount:this.isPlus?parseFloat(this.shoukuanObj.money):-parseFloat(this.shoukuanObj.money),
                        projectPk:project.projectPk,
                        projectCode:project.code,
                        projectName:project.projectName,
                        remark:project.projectName+(this.shoukuanObj.remark == null?"":"-"+this.shoukuanObj.remark),
                        agreementPk:this.dataForm.agreementPk,
                        setBillPk:this.dataForm.setBillPk
                    }
                    this.settlementBillList.push(bill)
                }

                this.shoukuanDialog = false
            })
        },
        otherSaveClick(){
            this.$refs.otherObj.validate(valid => {
                if(this.otherObj.money.isNaN){
                    this.$message({ type: 'warning', message: '请输入正确的收款金额' })
                    return
                }
                var project = this.projectObj[this.otherObj.projectPk]
                var isNew = true
                
                for(var i=0;i<this.settlementBillList.length;i++){
                    //判断当前是否有未保存的同项目账单
                    if(this.settlementBillList[i].projectPk == this.otherObj.projectPk && (this.settlementBillList[i].billPk == null || this.settlementBillList[i].billPk == "")){
                        var settle = this.isPlus?parseFloat(this.otherObj.money):-parseFloat(this.otherObj.money)
                        this.settlementBillList[i].settlementAmount = parseInt(this.settlementBillList[i].settlementAmount)+settle
                        isNew = false
                        break
                    }
                }
                if(isNew){
                    var bill = {
                        settlementAmount:project.inoutFlag?-parseFloat(this.otherObj.money):parseFloat(this.otherObj.money),
                        projectPk:project.projectPk,
                        projectCode:project.code,
                        projectName:project.projectName,
                        remark:project.projectName+(this.otherObj.remark == null?"":"-"+this.otherObj.remark),
                        agreementPk:this.dataForm.agreementPk,
                        setBillPk:this.dataForm.type == 1?this.currentSetBill.setBillPk:null
                    }
                    this.settlementBillList.push(bill)
                }

                this.otherDialog = false
            })
        },
        otherClick(){
            this.otherObj = {}
            this.otherDialog = true
        },
        shouKuanClick(isPlus,sktitle){
            this.isPlus = isPlus
            this.sktitle = sktitle
            this.shoukuanObj = {}
            this.shoukuanDialog = true
        },
        initProject(){
            let that = this
        listByProjectType({projectType:'SETTLEMENT'}).then(res => {
            var data = res.data
            this.settleProjectList = data
            this.quickProjectList = []
            this.refundProjectList = []
            this.otherProjectList = []
            this.mdProjectList = []
            console.log(JSON.stringify(data));
            for(var i=0;i<data.length;i++){
                this.projectObj[data[i].projectPk] = data[i]
                //退款
                if(data[i].code == 238 || data[i].code == 239 || data[i].code == 240 || data[i].code == 241){
                    this.refundProjectList.push(data[i])
                }
                //收款
                if(data[i].code == 211 || data[i].code == 237 || data[i].code == 236
                || data[i].code == 235 || data[i].code == 234 ){
                    this.quickProjectList.push(data[i])
                }
                if(data[i].code == 0){
                    this.mdProjectList.push(data[i])
                    that.mdObj.projectPk = data[i].projectPk
                }
                if(data[i].defaultFlag == "N"){
                    this.otherProjectList.push(data[i])
                }
            }
          })
        },
        removeClick(index){
            this.settlementBillList.splice(index,1)
        },
        showDialog (row) {
            this.dialogVisible = true
            this.dataForm = row
            this.consumerBillList = []
            this.listBillBySetBillPk(this.dataForm.setBillPk,"UN_SET","CONSUMER")
            this.listBillBySetBillPk(this.dataForm.setBillPk,"UN_SET","SETTLEMENT")
            this.initProject()
        },
        listBillBySetBillPk(setBillPk,status,projectType){
            listBillBySetBillPk({setBillPk:setBillPk,status:status,projectType:projectType}).then(res=>{
                if(projectType == "CONSUMER"){
                    this.consumerBillList = res.data;
                }else{
                    this.settlementBillList = res.data
                }
            })
        },
        handleClose () {
            this.dialogVisible = false
        },
        handleShouKuanClose() {
            this.shoukuanDialog = false
        },
    },filters: {
      /* 格式化时间戳 */
      formatDate (val) {
          return Moment(new Date()).format("YYYY-MM-DD")
      },
      momeyFilter2(list,list2){
        var momey = 0;
        for(var i=0;i<list.length;i++){
            momey = momey + parseFloat(list[i].consumptionAmount)
        }
        var momey2 = 0;
        for(var i=0;i<list2.length;i++){
            momey2 = momey2 + parseFloat(list2[i].settlementAmount)
        }
        return momey2-momey
      },
      momeyFilter(list){
        var momey = 0;
        for(var i=0;i<list.length;i++){
            momey = momey + parseFloat(list[i].consumptionAmount)
        }
        return momey;
      }
    }
  }
</script>

<style>
.setBillSettle .el-dialog__body{

    padding: 0px 20px;

}

</style>
