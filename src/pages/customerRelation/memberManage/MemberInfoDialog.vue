
<template>
    <div>
        <!-- 会员管理 dialog -->
        <el-dialog title="会员管理" :visible.sync="dialogMemberVisible" width="930px" :before-close="handleClose" class="dialogMemberManage">
            <el-row>
                <el-button size="mini" type="primary" @click="memberExchangeCard(membeInfo)" :disabled="membeInfo.rechargeFlag == 'N'">换卡</el-button>
                <el-button size="mini" type="primary">补卡</el-button>
                <el-button size="mini" type="primary" @click="memberUpdatePasswordClick(membeInfo)" :disabled="membeInfo.rechargeFlag == 'N'">改密码</el-button>
                <el-button size="mini" type="primary"  @click="memberRechargeClick(membeInfo)"  :disabled="membeInfo.rechargeFlag == 'N'">充值</el-button>
                <el-button size="mini" type="primary" @click="memberIntegralExchangeClick(membeInfo)" :disabled="membeInfo.rechargeFlag == 'N'">积分增减</el-button>
                <el-button size="mini" type="primary">积分兑换</el-button>
                <el-button size="mini" type="primary">积分换房</el-button>
                <el-button size="mini" type="primary">会员升级</el-button>
                <el-button size="mini" type="primary">注销</el-button>
                <el-button size="mini" type="primary">挂失</el-button>
                <el-button size="mini" type="primary">登记补打</el-button>
            </el-row>
            <el-tabs type="border-card" style="margin-top:10px;" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="MemberInfo">
                    <MemberInfo ref="MemberInfo" @callback="delCallback" />
                </el-tab-pane>
                <el-tab-pane label="充值明细" name="MemberRechargeTable">
                     <MemberRechargeTable ref="MemberRechargeTable" />
                </el-tab-pane>
                <el-tab-pane label="卡支付明细" name="0">

                </el-tab-pane>
                <el-tab-pane label="消费明细" name="MemberConsumptionDetailTable">
                    <MemberConsumptionDetailTable ref="MemberConsumptionDetailTable" />
                </el-tab-pane>
                <el-tab-pane label="积分明细" name="MemberIntegralDetailTable">
                    <MemberIntegralDetailTable ref="MemberIntegralDetailTable" />
                </el-tab-pane>
                <el-tab-pane label="换卡明细" name="MemberExchangeCardDetail">
                    <MemberExchangeCardDetail ref="MemberExchangeCardDetail"/>
                </el-tab-pane>
                <el-tab-pane label="积分兑换明细" name="2">

                </el-tab-pane>
                <el-tab-pane label="卡升级明细" name="3">

                </el-tab-pane>
                <el-tab-pane label="积分换房明细" name="4">
                    
                </el-tab-pane>
            </el-tabs>
            
                
        </el-dialog>
        <member-recharge ref="memberRechargeRefs" @callback="memberListData(form.pageNum)"></member-recharge>
        <member-integral-exchange ref="memberIntegralExchangeRefs" @callback="memberListData(form.pageNum)"></member-integral-exchange>
        <member-update-password ref="memberUpdatePasswordRefs" @callback="memberListData(form.pageNum)"></member-update-password>
        <member-exchange-card ref="memberExchangeCardRefs" @callback="memberListData(form.pageNum)"></member-exchange-card>

    </div>
</template>

<script>

import MemberInfo from "./MemberInfo";
import MemberRecharge from "./MemberRecharge/MemberRecharge.vue"
import MemberIntegralExchange from "./MemberIntegral/MemberIntegralExchange.vue"
import MemberRechargeDetailDialog from "./MemberRecharge/MemberRechargeDetailDialog.vue"
import MemberIntegralDetailDialog from "./MemberIntegral/MemberIntegralDetailDialog.vue"
import MemberExchangeCardDetailDialog from "./MemberExchangeCardDetailDialog.vue"
import MemberUpdatePassword from "./MemberUpdatePassword.vue";
import MemberConsumptionDetailDialog from "./MemberConsumption/MemberConsumptionDetailDialog.vue"
import MemberExchangeCard from "./MemberExchangeCard.vue"
import MemberExchangeCardDetail from "./MemberExchangeCardDetail.vue"

import MemberRechargeTable from "./MemberRecharge/MemberRechargeDetailTable.vue"
import  MemberConsumptionDetailTable from './MemberConsumption/MemberConsumptionDetailTable.vue'
import  MemberIntegralDetailTable from './MemberIntegral/MemberIntegralDetailTable.vue'

export default {
    components: { MemberInfo, MemberRecharge,MemberIntegralExchange,MemberUpdatePassword,MemberExchangeCard, MemberRechargeDetailDialog, MemberIntegralDetailDialog, MemberConsumptionDetailDialog,MemberRechargeTable,MemberConsumptionDetailTable,MemberIntegralDetailTable,MemberExchangeCardDetail,MemberExchangeCardDetailDialog },
  data() {
    return {
      dialogMemberVisible: false,
      membeInfo: {}, //会员资料
      total: 0,
      activeName:"MemberInfo"
    };
  },
  mounted() {
//       console.log(this.$refs)
//     this.activeName = this.$refs.checkTabs.panes[0].name
  },
  methods: {
    handleClose () {
            this.dialogMemberVisible = false
            this.$emit('callback')
        },
    handleClick (tab, event) {
        if(this.activeName == "MemberRechargeTable"){
            this.$nextTick(()=>{
                this.$refs.MemberRechargeTable.init(this.membeInfo.memPk,0)
            })
        }else if(this.activeName == "MemberConsumptionDetailTable"){
            this.$nextTick(()=>{
                this.$refs.MemberConsumptionDetailTable.init(this.membeInfo.memPk)
            })
        }else if(this.activeName == "MemberIntegralDetailTable"){
            this.$nextTick(()=>{
                this.$refs.MemberIntegralDetailTable.init(this.membeInfo.memPk,1)
            })
        }else if(this.activeName == "MemberExchangeCardDetail"){
            this.$nextTick(()=>{
                this.$refs.MemberExchangeCardDetail.init(this.membeInfo.memPk,1)
            })
        }
        else if(this.activeName){
            this.$refs[this.activeName].init()
        }
    },
    showDialog(row){
        this.dialogMemberVisible = true
        this.membeInfo = row
        this.$nextTick(()=>{
            this.$refs[this.activeName].init(row)
        })
        
    },
    delCallback(){
        this.dialogMemberVisible = false
        this.$emit('callback')
    },
    parentCallback(){
        this.dialogMemberVisible = false
        this.$emit('callback')
    },
    memberRechargeClick (row) {
        this.$refs.memberRechargeRefs.showDialog(row,false)
    },
     memberIntegralExchangeClick (row) {
        this.$refs.memberIntegralExchangeRefs.showDialog(row,false)
    },
    memberUpdatePasswordClick(row){
        this.$refs.memberUpdatePasswordRefs.showDialog(row,false)
    },
    memberExchangeCard(row){
        this.$refs.memberExchangeCardRefs.showDialog(row,false);
    },

  }
}
</script>


<style scoped>
.body-conten {
  background: #f7f7f7;
  padding: 10px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.height38 {
  height: 38px;
  padding: 20px 10px 0 10px;
}
.height110 {
  height: 110px;
  padding: 20px 10px 0 10px;
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
</style>


