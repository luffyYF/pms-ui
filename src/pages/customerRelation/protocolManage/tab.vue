<template>
  <div>
    <el-tabs type="border-card" ref='checkTabs' v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="协议单位管理" name="protocolUnitManagement" >
        <protocol-unit-management ref="protocolUnitManagement"/>
      </el-tab-pane>
      <el-tab-pane label="协议类别" name="protocolCategory" >
        <protocol-category ref="protocolCategory"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="行业分类" name="industryClassification" >
        <industry-classification ref="industryClassification"/>
      </el-tab-pane> -->
      <el-tab-pane label="账套管理" name="setBillList" >
        <setBillList ref="setBillList"/>
      </el-tab-pane>
      <el-tab-pane label="账务处理" name="unitBillList" >
        <unitBillList ref="unitBillList"/>
      </el-tab-pane>
      <el-tab-pane label="远期房价" name="MemberForwardPrice" >
        <MemberForwardPrice ref="MemberForwardPrice"/>
      </el-tab-pane>
      <el-tab-pane label="账务查询" name="consumerBillList" >
        <consumerBillList ref="consumerBillList"/>
      </el-tab-pane>
      <el-tab-pane label="收款查询" name="settlementBillList" >
        <settlementBillList ref="settlementBillList"/>
      </el-tab-pane>
      <el-tab-pane label="销售员管理" name="salesmanManagement" >
        <salesman-management ref="salesmanManagement"/>
      </el-tab-pane>
      
      <!-- <el-tab-pane label="协议价格调控" name="agreementPriceRegulation" v-if="powerJudge('150306')">
        <agreement-price-regulation ref="agreementPriceRegulation"/>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  import ProtocolUnitManagement from './ProtocolUnitManagement'
  import SalesmanManagement from './SalesmanManagement'
  import ProtocolCategory from './ProtocolCategory'
  import IndustryClassification from './IndustryClassification'
  import AgreementPriceRegulation from './AgreementPriceRegulation'
  import setBillList from './setBill/setBillList'
  import unitBillList from './setBill/unitBillList'
  import MemberForwardPrice from './forwardPrice/MemberForwardPrice'
  import consumerBillList from './billQuery/consumerBillList'
  import settlementBillList from './billQuery/settlementBillList'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {
      ProtocolUnitManagement,
      SalesmanManagement,
      ProtocolCategory,
      IndustryClassification,
      AgreementPriceRegulation,
      setBillList,
      unitBillList,
      MemberForwardPrice,
      consumerBillList,
      settlementBillList
    },
    data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
      this.$refs.protocolUnitManagement.init(1)
    },
    methods: {
      handleClick (tab, event) {
        this.$refs[this.activeName].init(1)
        // if(this.activeName == 'protocolUnitManagement'){
        //   var child = this.$refs.protocolUnitManagement
        //   child.init(1)
        // }else if(this.activeName == 'salesmanManagement'){
        //   var child = this.$refs.salesmanManagement
        //   child.init()
        // }else if(this.activeName == 'protocolCategory'){
        //   var child = this.$refs.protocolCategory
        //   child.init()
        // }else if(this.activeName == 'industryClassification'){
        //   var child = this.$refs.industryClassification
        //   child.init()
        // }else if(this.activeName == 'agreementPriceRegulation'){
        //   var child = this.$refs.agreementPriceRegulation
        //   child.init()
        // }else if(this.activeName == 'setBillList'){
        //   var child = this.$refs.setBillList
        //   child.init(1)
        // }else if(this.activeName == 'unitBillList'){
        //   var child = this.$refs.unitBillList
        //   child.init(1)
        // }else if(this.activeName == 'MemberForwardPrice'){
        //   var child = this.$refs.MemberForwardPrice
        //   child.init(1)
        // }else if(this.activeName == 'consumerBillList'){
        //   var child = this.$refs.consumerBillList
        //   child.init(1)
        // }else if(this.activeName == 'settlementBillList'){
        //   var child = this.$refs.settlementBillList
        //   child.init(1)
        // }

        

        console.log(tab, event)
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

