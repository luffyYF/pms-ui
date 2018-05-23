<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <!--  name="first" -->
      <el-tab-pane v-for="item in goodsDeptList" 
                  :key="item.deptPk" 
                  :label="item.deptName" 
                  :value="item.deptPk" 
                  :name="item.deptPk" class="aLayerOfPage">
        <front-goods ref="frontGoods"/>
      </el-tab-pane>
      <el-tab-pane label="商品部管理" name="first" class="aLayerOfPage" v-if="powerJudge('2001')">
        <commodity-management/>
      </el-tab-pane>
      <el-tab-pane label="退单管理" name="third" class="aLayerOfPage" v-if="powerJudge('2002')">
        <refund-Management/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import RefundManagement from './RefundManagement'
  import FrontGoods from './FrontGoods'
  import CommodityManagement from './CommodityManagement'
  import { goodsDeptList } from "@/api/goods/goodsDeptController";
  import {getUpGoodsTypeList,listUpGoodsInfo} from "@/api/goods/goodsTypeController";
  import {powerJudge} from '@/utils/permissionsOperation.js'

  export default {
    components: {
      RefundManagement,
      FrontGoods, 
      CommodityManagement
    },
    data () {
      return {
        activeName: '',
        deptPk:"",
        frontGoods:[],
        goodsDeptList:[],
        listGoodsInfo: []
      }
    },
    created(){
      this.getGoodsDeptList();
    },
    mounted() {
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
      this.getGoodsDeptList();
    },
    methods: {
      powerJudge(id){
        return powerJudge(id);
      },
      handleClick (tab, event) {
        console.log(tab, event)
        if(this.activeName != "second" && this.activeName != "third"){
          this.deptPk = tab.name;
          var num;
          for (let index = 0; index < this.goodsDeptList.length; index++) {
            const element = this.goodsDeptList[index];
            if(element.deptPk==this.deptPk){
              num = index;
              break;
            }
          }
          listUpGoodsInfo({deptPk:this.deptPk,typePk:this.goodsFilter,upFlag:'Y'}).then(res => {
            console.log(res.data)
            this.listGoodsInfo = res.data
            this.$refs.frontGoods[num].getList(this.deptPk,this.listGoodsInfo);
          })
        }
      },
      //获取商品部列表
      getGoodsDeptList(){
        goodsDeptList().then(res => {
          if (res.code == 1) {
            console.log(res.data)
            this.goodsDeptList=res.data;
            this.activeName = this.goodsDeptList[0].deptPk;
            listUpGoodsInfo({deptPk:this.activeName,typePk:this.goodsFilter,upFlag:'Y'}).then(res => {
              console.log(res.data)
              this.listGoodsInfo = res.data
              this.$refs.frontGoods[0].getList(this.activeName,this.listGoodsInfo);
            })
          } else {
            this.$message({type:'danger',message:res.msg});
          }
        }).catch(error=>{
          this.$message({type:'danger',message:error});
        })
      },
      
    },
  }
</script>
