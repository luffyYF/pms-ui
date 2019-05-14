// 会员积分换房规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
<div>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="700px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="账套名称"  prop="setBillName">
            <el-input size="mini" style="width:300px;" v-model="dataForm.setBillName" type="text"/>
        </el-form-item>
        <el-form-item :label="dataForm.type == 1?'协议单位':'中介'" prop="type">
            <el-select size="mini" style="width:300px;" @change="agreementChange()" :disabled="this.dataForm.setBillPk != null && this.dataForm.setBillPk != '' " v-model="dataForm.agreementPk" placeholder="协议单位" :clearable="false" >
                <el-option v-for="y in agreementList" :label="y.unitName" :value="y.agreementPk" :key="y.agreementPk"></el-option>
            </el-select>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="listBillByAgreement">选择账单</el-button>
        </el-form-item>
         <el-form-item label="账务">
            <!-- <el-button type="primary" icon="el-icon-search">选择</el-button> -->
        </el-form-item>
        <el-table
            size="mini" 
            border 
            highlight-current-row
            :data="currentBillList" 
            v-loading="loading"
            height="400px">
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
            <el-table-column label="操作员" prop="userName" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-delete" size="mini" @click="removeClick(scope.$index)" >移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
    <span style="margin-top:5px;">总计{{currentBillList.length}}笔财务,共计{{currentBillList | momeyFilter}}元</span>
  </el-dialog>

    <el-dialog class="add-permission" title="选择账单" top="100px" :visible.sync="billDialogVisible" width="800px"
                :close-on-click-modal="false" :before-close="handleBillClose">
            <el-table
            size="mini" 
            border 
            highlight-current-row
            :data="billList" 
            v-loading="billLoading"
            height="400px"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column label="消费时间" prop="createTime"  align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column label="房号" prop="roomNumber" align="center">
            </el-table-column>
            <el-table-column label="客人姓名" prop="memName" align="center">
            </el-table-column>
            <el-table-column label="单位名称" prop="contactName" align="center">
            </el-table-column>
            <el-table-column label="营业项目" prop="projectName" align="center">
            </el-table-column>
            <el-table-column label="消费金额" prop="consumptionAmount" align="center">
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="billDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="billChangeClick()">确定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import Moment from 'moment'
import {addSetBill,updateSetBill} from '@/api/customerRelation/ProtocolManage/setBill'
import {allAgreement} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
import {listBillByAgreement,listBillBySetBillPk} from '@/api/bill'
import { debug } from 'util';

  export default {
    data () {
      return {
        billDialogVisible:false,
        dialogVisible: false,
        loading: false,
        billLoading:false,
        dataForm: {
            billPks:[]
        },
        rules: {
          ruleName: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
        },
        title:"添加账套",
        pageObj:{
            total:0,
            pageNum:1,
            pageSize:10
        },
        currentBillList:[],
        billList:[
        ],
        agreementList:[],
        tempBillList:[],
        type:1
      }
    },
    methods: {
        removeClick(index){
            this.currentBillList.splice(index,1)
        },
        billChangeClick(){
            for(var i = 0;i<this.tempBillList.length;i++){
                var isNew = true
                for(var j=0;j<this.currentBillList.length;j++){
                    if(this.tempBillList[i].billPk == this.currentBillList[j].billPk){
                        isNew = false
                        break;
                    }
                }
                if(isNew){
                    this.currentBillList.push(this.tempBillList[i])
                }
            }
            this.billDialogVisible = false
        },
        handleSelectionChange(val){
            this.tempBillList = val
        },
        agreementChange(){
            this.currentBillList = []
        },
        showDialog (row,type) {
            this.dialogVisible = true
            this.allAgreement()
            this.currentBillList = []
            this.billList = []
            this.tempBillList = []

            if (row) {
                this.dataForm = row
                this.title = "编辑账套"
                this.listBillBySetBillPk(this.dataForm.setBillPk,"UN_SET","CONSUMER")
            }else{
                this.title = "添加账套"
                this.dataForm = {
                    //0中介账套,1协议单位账套
                    type:type
                }
            }
        },
        listBillBySetBillPk(setBillPk,status,projectType){
            listBillBySetBillPk({setBillPk:setBillPk,status:status,projectType:projectType}).then(res=>{
                this.currentBillList = res.data;
            })
        },
        listBillByAgreement(){
            if(!this.dataForm.agreementPk){
                this.$message({ type: 'warning', message: '请选择'+(this.dataForm.type == 1?"协议单位":"中介") })
                return 
            }
            this.billDialogVisible = true
            this.billLoading = true;
            var data = {agreementPk:this.dataForm.agreementPk}
            if(this.dataForm.setBillPk){
                data.setBillPk = this.dataForm.setBillPk
            }
            listBillByAgreement(data).then(res=>{
                var data = res.data
                var billList = []
                //old
                var currentBillList = this.currentBillList
                if(currentBillList.length == 0 || currentBillList == null){
                    billList = data
                }else{
                    for(var i=0;i<data.length;i++){
                        var isNew = true
                        for(var j=0;j<currentBillList.length;j++){
                            if(currentBillList[j].billPk == data[i].billPk){
                                isNew = false;
                                break;
                            }
                        }
                        if(isNew){
                            billList.push(data[i])
                        }
                    }
                }
                this.billList = billList;
                this.billLoading = false
            })
        },
        allAgreement(){
            allAgreement({type:this.dataForm.type}).then(res=>{
                this.agreementList = res.data
            })
        },
        handleClose () {
            this.dialogVisible = false
        },
        handleBillClose () {
            this.billDialogVisible = false
        },
        // 保存数据
        saveData () {
            let refs = this.$refs
            refs.dataForm.validate(valid => {
            if (valid) {
                if(this.currentBillList.length == 0){
                    this.$message({ type: 'warning', message: "至少选择一条账单" })
                    return
                }
                var list = this.currentBillList
                var momey = 0;
                for(var i=0;i<list.length;i++){
                    momey = momey + parseFloat(list[i].consumptionAmount)
                }
                this.dataForm.consumptionAmount = momey
                this.dataForm.createTime = null
                this.loading = true
                var billPks = []
                for(var i=0;i<this.currentBillList.length;i++){
                    billPks.push(this.currentBillList[i].billPk)
                }
                var data = {
                    setBillPo:this.dataForm,
                    billPks:billPks
                }
                let api
                
                if (this.dataForm.setBillPk) {
                api = updateSetBill(data)
                } else {
                api = addSetBill(data)
                }
                api.then(res => {
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
            }
            })
        },
        // // 分页相关
        // handleSizeChange (val) {
        //     this.pageObj.pageSize = val
        //     this.couponList()
        // },
        // // 分页相关
        // handleCurrentChange (val) {
        //     this.pageObj.pageNum = val
        //     this.couponList()
        // }
    },filters: {
      /* 格式化时间戳 */
      formatDate (val) {
          return Moment(new Date()).format("YYYY-MM-DD")
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
