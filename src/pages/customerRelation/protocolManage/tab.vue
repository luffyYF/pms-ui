<template>
  <div>
    <el-tabs type="border-card" ref='checkTabs' v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="协议单位管理" name="protocolUnitManagement" v-if="powerJudge('150301')">
        <protocol-unit-management ref="protocolUnitManagement"/>
      </el-tab-pane>
      <el-tab-pane label="销售员管理" name="salesmanManagement" v-if="powerJudge('150302')">
        <salesman-management ref="salesmanManagement"/>
      </el-tab-pane>
      <el-tab-pane label="协议类别" name="protocolCategory" v-if="powerJudge('150303')">
        <protocol-category ref="protocolCategory"/>
      </el-tab-pane>
      <el-tab-pane label="行业分类" name="industryClassification" v-if="powerJudge('150304')">
        <industry-classification ref="industryClassification"/>
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
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {
      ProtocolUnitManagement,
      SalesmanManagement,
      ProtocolCategory,
      IndustryClassification,
      AgreementPriceRegulation
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
        if(this.activeName == 'protocolUnitManagement'){
          var child = this.$refs.protocolUnitManagement
          child.init()
        }else if(this.activeName == 'salesmanManagement'){
          var child = this.$refs.salesmanManagement
          child.init()
        }else if(this.activeName == 'protocolCategory'){
          var child = this.$refs.protocolCategory
          child.init()
        }else if(this.activeName == 'industryClassification'){
          var child = this.$refs.industryClassification
          child.init()
        }else if(this.activeName == 'agreementPriceRegulation'){
          var child = this.$refs.agreementPriceRegulation
          child.init()
        }
        console.log(tab, event)
      },
      powerJudge(id){
        return powerJudge(id);
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

