<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" ref='checkTabs'>
      <el-tab-pane label="注册会员" name="registeredMember" v-if="hasPerm('pms:memberManage:regMember')">
        <registered-member ref="registeredMember"/>
      </el-tab-pane>
      <el-tab-pane label="会员管理" name="membeManagement" v-if="hasPerm('pms:memberManage:memberManage')">
        <membe-management ref="membeManagement"/>
      </el-tab-pane>
      <el-tab-pane label="恢复删除会员" name="resumeDeletingMembers" v-if="hasPerm('pms:memberManage:recoveryDelMem')">
        <resume-deleting-members ref="resumeDeletingMembers"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="激活会员" name="activatingMember" v-if="powerJudge('150104')">
        <activating-member ref="activatingMember"/>
      </el-tab-pane> 
      <el-tab-pane label="会员发展报表" name="memberDevelopmentReport" v-if="powerJudge('150105')">
        <member-development-report ref="memberDevelopmentReport"/>
      </el-tab-pane>
      <el-tab-pane label="会员消费排名" name="membershipConsumptionRanking" v-if="powerJudge('150106')">
        <membership-consumption-ranking ref="membershipConsumptionRanking"/>
      </el-tab-pane>
      <el-tab-pane label="会员消费报表" name="memberConsumptionStatement" v-if="powerJudge('150107')">
        <member-consumption-statement ref="memberConsumptionStatement"/>
      </el-tab-pane>
      <el-tab-pane label="会员充值报表" name="memberRechargeReport" v-if="powerJudge('150109')">
        <member-recharge-report ref="memberRechargeReport"/>
      </el-tab-pane>
      <el-tab-pane label="会员余额报表" name="memberBalanceReport" v-if="powerJudge('150110')">
        <member-balance-report ref="memberBalanceReport"/>
      </el-tab-pane>
      <el-tab-pane label="会员储值卡消费报表" name="storageCardConsumption" v-if="powerJudge('150111')">
        <storage-card-consumption ref="storageCardConsumption"/>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import RegisteredMember from './RegisteredMember'
  import MembeManagement from './MembeManagement'
  import ResumeDeletingMembers from './ResumeDeletingMembers'
  import ActivatingMember from './ActivatingMember'
  import MemberDevelopmentReport from './MemberDevelopmentReport'
  import MembershipConsumptionRanking from './MembershipConsumptionRanking'
  import MemberConsumptionStatement from './MemberConsumptionStatement'
  import MemberRechargeReport from './MemberRechargeReport'
  import MemberBalanceReport from './MemberBalanceReport'
  import StorageCardConsumption from './StorageCardConsumption'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      RegisteredMember,
      MembeManagement,
      ResumeDeletingMembers,
      ActivatingMember,
      MemberDevelopmentReport,
      MembershipConsumptionRanking,
      MemberConsumptionStatement,
      MemberRechargeReport,
      MemberBalanceReport,
      StorageCardConsumption
    },
    data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
    },
    methods: {
      // powerJudge(id){
      //   return powerJudge(id);
      // },
      handleClick (tab, event) {
        console.log(tab, event)
        if(this.activeName == "registeredMember"){
          var child = this.$refs.registeredMember
          child.init()
        }else if(this.activeName == "membeManagement"){
          var child = this.$refs.membeManagement
          child.init()
        }else if(this.activeName == "resumeDeletingMembers"){
          var child = this.$refs.resumeDeletingMembers
          child.init()
        }else if(this.activeName == "activatingMember"){
          var child = this.$refs.activatingMember
          child.init()
        }else if(this.activeName == "memberDevelopmentReport"){
          var child = this.$refs.memberDevelopmentReport
          child.init()
        }else if(this.activeName == "membershipConsumptionRanking"){
          var child = this.$refs.membershipConsumptionRanking
          child.init()
        }else if(this.activeName == "memberConsumptionStatement"){
          var child = this.$refs.memberConsumptionStatement
          child.init()
        }else if(this.activeName == "memberRechargeReport"){
          var child = this.$refs.memberRechargeReport
          child.init()
        }else if(this.activeName == "memberBalanceReport"){
          var child = this.$refs.memberBalanceReport
          child.init()
        }else if(this.activeName == "storageCardConsumption"){
          var child = this.$refs.storageCardConsumption
          child.init()
        }
      }
    }
  }
</script>
<style scoped>
.el-tabs--border-card{
  background: #fff;
  border: none !important;
  border-top: 1px solid #dcdfe6 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
<style>
.goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
}
</style>

