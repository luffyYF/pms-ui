
<template>
    <div>
        <!-- 会员管理 dialog -->
        <el-dialog title="会员管理" :visible.sync="dialogMemberVisible" width="930px" :before-close="handleClose" class="dialogMemberManage">
            <el-row>
                <el-button size="mini" type="primary" @click="memberExchangeCard(memberInfo)" :disabled="memberInfo.rechargeFlag == 'N'">换卡</el-button>
                <el-button size="mini" type="primary">补卡</el-button>
                <el-button size="mini" type="primary" @click="memberUpdatePasswordClick(memberInfo)" :disabled="memberInfo.rechargeFlag == 'N'">改密码</el-button>
                <el-button size="mini" type="primary"  @click="memberRechargeClick(memberInfo)"  :disabled="memberInfo.rechargeFlag == 'N'">充值</el-button>
                <el-button size="mini" type="primary" @click="memberIntegralExchangeClick(memberInfo)" :disabled="memberInfo.rechargeFlag == 'N'">积分增减</el-button>
                <el-button size="mini" type="primary">积分兑换</el-button>
                <el-button size="mini" type="primary" @click="memberRoomChangeClick(memberInfo)">积分换房</el-button>
                <el-button size="mini" type="primary">会员升级</el-button>
                <el-button size="mini" type="primary" @click="openLogout(memberInfo)">注销</el-button>
                <el-button size="mini" type="primary">挂失</el-button>
                <el-button size="mini" type="primary" @click="openPrint">登记补打</el-button>
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
                <el-tab-pane label="积分换房明细" name="MemberIntegralRoomChangeRecord">
                    <MemberIntegralRoomChangeRecord ref="MemberIntegralRoomChangeRecord"/>
                </el-tab-pane>
            </el-tabs>
            
                
        </el-dialog>
        <member-recharge ref="memberRechargeRefs" @callback="memberListData(form.pageNum)"></member-recharge>
        <MemberIntegralRoomChange ref="MemberIntegralRoomChange" />
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
import MemberExchangeCardDetailDialog from "./MemberCardExchange/MemberExchangeCardDetailDialog.vue"
import MemberUpdatePassword from "./MemberUpdatePassword.vue";
import MemberConsumptionDetailDialog from "./MemberConsumption/MemberConsumptionDetailDialog.vue"
import MemberIntegralRoomChange from "./MemberIntegralRoomChange/MemberIntegralRoomChange.vue"
import MemberExchangeCard from "./MemberCardExchange/MemberExchangeCard.vue"
import MemberExchangeCardDetail from "./MemberCardExchange/MemberExchangeCardDetail.vue"

import MemberRechargeTable from "./MemberRecharge/MemberRechargeDetailTable.vue"
import  MemberConsumptionDetailTable from './MemberConsumption/MemberConsumptionDetailTable.vue'
import  MemberIntegralDetailTable from './MemberIntegral/MemberIntegralDetailTable.vue'
import  MemberIntegralRoomChangeRecord from './MemberIntegralRoomChange/MemberIntegralRoomChangeRecord.vue'
import {delMember} from '@/api/customerRelation/pmsMemberController'

export default {
    components: { MemberInfo, MemberRecharge,MemberIntegralExchange,MemberUpdatePassword,MemberExchangeCard, MemberRechargeDetailDialog, MemberIntegralDetailDialog, MemberConsumptionDetailDialog,MemberRechargeTable,MemberConsumptionDetailTable,MemberIntegralDetailTable,MemberExchangeCardDetail,MemberExchangeCardDetailDialog,MemberIntegralRoomChangeRecord,MemberIntegralRoomChange },
  data() {
    return {
      dialogMemberVisible: false,
      memberInfo: {}, //会员资料
      total: 0,
      activeName:"MemberInfo"
    };
  },
  mounted() {
//       console.log(this.$refs)
//     this.activeName = this.$refs.checkTabs.panes[0].name
  },
  methods: {
      //登记补打印
       openPrint() {
        this.$confirm('是否要打印?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '打印成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消打印'
          });          
        });
      },
      //注销会员卡
      // openLogout(memberInfo) {
      //   this.$confirm('确认注销改会员卡?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     delMember({cardExchangeId:row.cardExchangeId})
      //     this.$message({
      //       type: 'success',
      //       message: '注销成功!'
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消注销'
      //     });          
      //   });
      // },
      openLogout (memberInfo) {
        this.$confirm('确定注销该会员卡?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        delMember({memPk:memberInfo.memPk}).then(res => {
              if(res.code == 1){
                  this.$message({ type: 'success', message: "注销成功！" })
                  //this.listSearch()
              }else{
                 this.$message({ type: 'warning', message: "注销失败！" })
              }
          })
        })
      },
    handleClose () {
            this.dialogMemberVisible = false
            this.$emit('callback')
        },
    handleClick (tab, event) {
        if(this.activeName == "MemberRechargeTable"){
            this.$nextTick(()=>{
                this.$refs.MemberRechargeTable.init(this.memberInfo.memPk,0)
            })
        }else if(this.activeName == "MemberConsumptionDetailTable" || this.activeName == "MemberIntegralRoomChangeRecord"){
            this.$nextTick(()=>{
                this.$refs[this.activeName].init(this.memberInfo.memPk)
            })
        }else if(this.activeName == "MemberIntegralDetailTable"){
            this.$nextTick(()=>{
                this.$refs.MemberIntegralDetailTable.init(this.memberInfo.memPk,1)
            })
        }else if(this.activeName == "MemberExchangeCardDetail"){
            this.$nextTick(()=>{
                this.$refs.MemberExchangeCardDetail.init(this.memberInfo.memPk,1)
            })
        }
        else if(this.activeName){
            this.$refs[this.activeName].init()
        }
    },
    showDialog(row){
        this.dialogMemberVisible = true
        this.memberInfo = row
        this.activeName = "MemberInfo"
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
    memberRoomChangeClick(memberInfo){
        this.$refs.MemberIntegralRoomChange.showDialog(memberInfo)
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


