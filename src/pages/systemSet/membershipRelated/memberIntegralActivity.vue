// 会员积分活动
<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
       <h5 class="info-title">会员积分活动管理</h5>
      <el-col :span="24" class="book-info">
        <el-form ref="pageObj" size="mini" :inline="true" :model="pageObj" label-width="110px">
          <el-row class="info-li">
              <el-form-item label="状态" prop="ruleName">
                  <el-select size="mini" style="width:100%;" v-model="pageObj.status" placeholder="状态" clearable >
                      <el-option v-for="y in statusList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="是否启用" prop="ruleName">
                  <el-select size="mini" style="width:100%;" v-model="pageObj.enableFlag" placeholder="是否启用" clearable >
                      <el-option v-for="y in enableFlagList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="时间段:">
              <div class="block">
              <el-date-picker
                v-model="timeValue"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              </div>
              </el-form-item>
              <el-form-item label="活动名称" prop="activityName">
                  <el-input placeholder="请输入活动" v-model="pageObj.activityName" style="width: 100px;"
                size="mini" clearable/>
              </el-form-item>
              <el-form-item label="活动名称" prop="activityName">
                <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" v-if="queryPower" @click="listMemberIntegralActivity()">查询</el-button>
                <el-button type="primary" size="mini" class="add-pro" v-if="hasPerm('pms:IntegralRoomChange:add')" @click="addClick()">添加规则</el-button>
              </el-form-item>
          </el-row>
        </el-form>
      </el-col>

      <el-table
        size="mini"
        border
        highlight-current-row
        :data="tableData"
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="activityName" label="活动名称" align="center">
        </el-table-column>
        <el-table-column label="会员类型" prop="gradeName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="活动日期" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.beginDate}}至{{scope.row.endDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="活动方式" prop="gradeName" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
                <span v-if="scope.row.activityMode == '0' ">多倍积分</span>
                <span v-else>额外积分</span>
            </template>
        </el-table-column>
        <el-table-column label="额度" prop="activityQuota" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">
                <span v-if="scope.row.enableFlag == '1' ">启用</span>
                <span v-else>禁用</span>
            </template>
        </el-table-column>
        <el-table-column label="创建人" prop="createUser" align="center">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="修改时间" prop="updateDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="修改人" prop="updateUser" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" v-if="hasPerm('pms:IntegralRoomChange:delete')" @click="deleteClick(scope.row.activityId,scope.row.enableFlag)"
                    size="mini">{{scope.row.enableFlag==0?'启用':'禁用'}}
                </el-button>
                <el-button type="primary" v-if="hasPerm('pms:IntegralRoomChange:update')" @click="editClick(scope.row)"
                        size="mini">编辑
                </el-button>

            </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin: 10px 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageObj.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageObj.total">
        </el-pagination>
    </div>
    <!-- <MemberIntegralRoomChangeRuleEdit ref="MemberIntegralRoomChangeRuleEditRef" @callback="listRule"/> -->

    <memberIntegralActivityEdit ref="memberIntegralActivityEditRef" @callback="listMemberIntegralActivity"/>
  </div>
</template>

<script>
  import memberIntegralActivityEdit from './memberIntegralActivityEdit'
  import {listMemberIntegralActivity,updateMemberIntegralActivity,deleteMemberIntegralActivity,insertMemberIntegralActivity,listMember } from '@/api/systemSet/member/pmsMemberIntegralActivity'
import { request } from 'https';
  export default {
   components: { memberIntegralActivityEdit },
    data() {
      return {
        options:[],
        tableData: [],
        gradeList:[],
        loading:false,
        pageObj:{
            enableFlag:'',
            pageNum:1,
            pageSize:10,
            beginDate:null,
            endDate:null,
            activityName:null,
            total:0,
            status:''
        },
        timeValue:[],
        member:[],
        gradeObj:{

        },
        statusList:[
          {label:"全部",value:""},
          {label:"当前生效",value:"1"},
          {label:"未过期",value:"2"},
          {label:"已过期",value:"3"}
        ],
        enableFlagList:[
          {label:"全部",value:""},
          {label:"启用",value:"1"},
          {label:"禁用",value:"0"}
        ],
        queryPower:this.hasPerm("pms:IntegralRoomChange:list")
      }
    },
    mounted(){
      // this.init()
    },
    methods: {
      init() {
        // this.listRule()
        // this.listGrade()
        this.listMemberIntegralActivity();
        // this.listMember();
      },


      listMemberIntegralActivity(){
        self.loading = true
        if (this.timeValue != null && this.timeValue.length == 2) {
        this.pageObj.beginDate = this.timeValue[0];
        this.pageObj.endDate = this.timeValue[1];
      } else {
        this.pageObj.beginDate = "";
        this.pageObj.endDate = "";
      }
        listMemberIntegralActivity(this.pageObj).then(result => {
            var data = result.data.list;
            this.tableData = data
            this.pageObj.total = parseInt(result.data.total)
            console.log(this.pageObj)
            self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.loading = false
        })
      },
      addClick(){
        this.$refs.memberIntegralActivityEditRef.showDialog()
      },
      editClick(row){
        var temoObj = JSON.parse(JSON.stringify(row))
        this.$refs.memberIntegralActivityEditRef.showDialog(temoObj)
      },
      deleteClick (id,enableFlag) {
        this.$confirm('确定要禁用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMemberIntegralActivity({activityId:id,enableFlag:enableFlag}).then(res => {
              if(res.code == 1){
                  this.listMemberIntegralActivity()
              }
            this.$message({ type: res.code == 1?'success':'warning', message:'删除成功' })
          })
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.pageObj.pageSize = val
        //this.listRule()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.pageObj.pageNum = val
        //this.listRule()
      },
    }
  }
</script>

<style scoped>
.checked{
  margin-bottom: 5px;
}
.el-input{
  width: 60px;
}
.el-input.claName{
  width: 90px;
}
.el-date-editor--time{
  width: 120px;
}
.el-Name{
  width: 120px;
}
.el-radio+.el-radio{
  margin-left: 0;
}
.el-radio .el-radio__label {
  padding-left: 3px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
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
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.span{
  margin-right: 5px;
}
</style>
