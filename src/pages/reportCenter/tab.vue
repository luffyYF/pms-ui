<template>
  <div class="reportCenter-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="报表中心" name="first" class="reportCenter-tabpane">
        <el-col :span="5" class="reportCenter-navmenu">
          <div class="collection-folder">
            <span class="titl"><i class="el-icon-star-on"></i>收藏夹</span>
          </div>
          <div class="common-report">
            <span class="titl"><i class="el-icon-share"></i>常用报表</span>
            <el-tree :data="commonReport" @node-click="handleNodeCommonReport"></el-tree>
          </div>
          <!-- <div class="report-center">    
            <span class="titl"><i class="el-icon-setting"></i>报表中心</span>
            <el-tree :data="reportCenter" @node-click="handleNodeCommonReport"></el-tree>
          </div> -->
        </el-col>
        <el-col :span="19" style="height:100%">
          <el-main style="height:100%">
            <router-view></router-view>
          </el-main>
        </el-col>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {commonReport, reportCenter} from './data/ReportNavList'
  import {powerJudge} from '@/utils/permissionsOperation.js'

  export default {
    data () {
      return {
        commonReport: commonReport,
        reportCenter: reportCenter,
        reportRouter: [],
        activeName: 'first',
      }
    },
    created() {
      this.jurisdictionOne(commonReport);
      this.jurisdictionTwo(reportCenter)
    },
    methods: {
      //权限
      jurisdictionOne (commonReport) {
        if (commonReport) {
          for(let i = 0; i < commonReport.length; i++) {
            var pointer = commonReport[i].pointer;
            if (!this.powerJudge(pointer)) {
              commonReport.splice(i--, 1)
              continue
            }
            this.jurisdictionOne(commonReport[i].children)
          }
        }
      },
      jurisdictionTwo (reportCenter) {
        if (reportCenter) {
          for(let i = 0; i < reportCenter.length; i++) {
            var pointer = reportCenter[i].pointer;
            if (!this.powerJudge(pointer)) {
              reportCenter.splice(i--, 1)
              continue
            }
            this.jurisdictionTwo(reportCenter[i].children)
          }
        }
      },
      decomposeRouter(){
        var routerList = this.$router.options.routes;
        var subjectRouter = [];
        for (let index = 0; index < routerList.length; index++) {
          var element = routerList[index].alias; //alias 路由别名
          if(element == 'Home'){//获取主体首页下属路由
            subjectRouter = routerList[index].children;
          }
        }
        for (let k = 0; k < subjectRouter.length; k++) {
          console.log(subjectRouter[k].alias)
          var subjName = subjectRouter[k].alias;
          if(subjName == 'ReportCenterTag'){//获取报表中心下属路由
            this.reportRouter = subjectRouter[k].children;
          }
        }
      },
      handleNodeCommonReport(data) {
        console.log(data.label)
        this.decomposeRouter();
        for (let index = 0; index < this.reportRouter.length; index++) {
          var labelName = this.reportRouter[index].pointer;
          var pathRoute = this.reportRouter[index].path;
          if(pathRoute == data.path){
            this.$router.push(data.path)
          }
        }
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      powerJudge(id){
        return powerJudge(id);
      }
      
    }
  }
</script>
<style>
.reportCenter-container,
.reportCenter-container>.el-tabs,
.reportCenter-container>.el-tabs>.el-tabs__content,
.reportCenter-tabpane{
  height: 100%;
}
.reportCenter-navmenu{
  height: calc(100% - 80px);
  border-right: 2px solid #dddddd;
  overflow: auto;
}
</style>
<style scoped>
.collection-folder .titl, 
.common-report .titl, 
.report-center .titl{
  height: 25px;
  line-height: 25px;
}
</style>

