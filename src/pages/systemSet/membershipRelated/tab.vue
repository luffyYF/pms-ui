<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">

      <el-tab-pane label="会员级别管理" name="memberLevel">
        <member-level ref="memberLevel"/>
      </el-tab-pane>
      <el-tab-pane label="会员积分规则" name="MemberIntegralRule" v-if="hasPerm('pms:member:memberIntegralRule')">
        <MemberIntegralRule ref="MemberIntegralRule"/>
      </el-tab-pane>

      <!-- <el-tab-pane label="会员积分明细" name="MemberIntegralExchangeLog">
        <MemberIntegralExchangeLog ref="MemberIntegralExchangeLog"/>
      </el-tab-pane> -->

      <el-tab-pane label="充值赠送规则" name="MemberRechargeGiveRule" v-if="hasPerm('pms:member:rechargeGiveRule')">
        <MemberRechargeGiveRule ref="MemberRechargeGiveRule"/>
      </el-tab-pane>
      <el-tab-pane label="积分换房活动" name="MemberIntegralRoomChangeRule" v-if="hasPerm('pms:member:integralRoomChange')">
        <MemberIntegralRoomChangeRule ref="MemberIntegralRoomChangeRule"/>
      </el-tab-pane>
      <el-tab-pane label="会员远期房价" name="MemberForwardPrice" v-if="hasPerm('pms:member:memberForwardPrice')">
        <MemberForwardPrice ref="MemberForwardPrice"/>
      </el-tab-pane>
      <el-tab-pane label="积分兑换规则" name="IntegralExchangeRule" v-if="hasPerm('pms:member:integralExchangeRule')">
        <IntegralExchangeRule ref="IntegralExchangeRule"/>
      </el-tab-pane>
      <el-tab-pane label="积分商品管理" name="memberIntegralCommodity">
        <member-integral-commodity ref="memberIntegralCommodity"/>
      </el-tab-pane>
      <el-tab-pane label="会员积分活动" name="memberIntegralActivity">
        <member-integral-activity ref="memberIntegralActivity"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="充值优惠管理" name="memberRechargeDiscount">
        <member-recharge-discount ref="memberRechargeDiscount"/>
      </el-tab-pane>
      <el-tab-pane label="会员卡费管理" name="memberCardFee">
        <member-card-fee ref="memberCardFee"/>
      </el-tab-pane> -->

    </el-tabs>
  </div>
</template>

<script>
  import MemberIntegralCommodity from './MemberIntegralCommodity'
  import MemberRechargeDiscount from './MemberRechargeDiscount'
  import MemberCardFee from './MemberCardFee'
  import MemberLevel from './MemberLevel'
  import MemberIntegralRule from './MemberIntegralRule'
  import MemberRechargeGiveRule from './MemberRechargeGiveRule'
  import MemberIntegralRoomChangeRule from './MemberIntegralRoomChangeRule'
  import MemberForwardPrice from './MemberForwardPrice'
  import IntegralExchangeRule from './IntegralExchangeRule'
  import memberIntegralActivity from './memberIntegralActivity'
  // import MemberIntegralExchangeLog from './MemberIntegralExchangeLog'




  // import {powerJudge} from '@/utils/permissionsOperation.js'

  export default {
    components: {
      MemberIntegralCommodity,
      MemberRechargeDiscount,
      MemberCardFee,
      MemberLevel,
      MemberIntegralRule,
      MemberRechargeGiveRule,
      MemberIntegralRoomChangeRule,
      MemberForwardPrice,
      IntegralExchangeRule,
      memberIntegralActivity,
      // MemberIntegralExchangeLog
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
      handleClick (tab, event) {
        console.log(tab, event)
        if(this.activeName == 'memberLevel'){
          var child = this.$refs.memberLevel
          child.init()
        }else if(this.activeName == 'memberCardFee'){
          var child = this.$refs.memberCardFee
          child.init()
        }else if(this.activeName == 'memberIntegralCommodity'){
          var child = this.$refs.memberIntegralCommodity
          child.init()
        }else if(this.activeName == 'memberRechargeDiscount'){
          var child = this.$refs.memberRechargeDiscount
          child.init()
        }else if(this.activeName == 'MemberIntegralRule'){
          var child = this.$refs.MemberIntegralRule
          child.init()
        }
        // else if(this.activeName == 'MemberIntegralExchangeLog'){
        //   var child = this.$refs.MemberIntegralExchangeLog
        //   child.init()
        // }
        else if(this.activeName == 'MemberRechargeGiveRule'){
          var child = this.$refs.MemberRechargeGiveRule
          child.init()
        }else if(this.activeName == 'MemberIntegralRoomChangeRule'){
          var child = this.$refs.MemberIntegralRoomChangeRule
          child.init()
        }else if(this.activeName == 'MemberForwardPrice'){
          var child = this.$refs.MemberForwardPrice
          child.init()
        }else if(this.activeName == 'IntegralExchangeRule'){
          var child = this.$refs.IntegralExchangeRule
          child.init()
        }else if(this.activeName == 'memberIntegralActivity'){
          var child = this.$refs.memberIntegralActivity
          child.init()
        }




      },
      // powerJudge(id){
      //   return powerJudge(id);
      // }

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

