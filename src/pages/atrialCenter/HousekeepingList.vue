//管家房态列表
<template>
  <div class="about_spacing">
    <el-row class="margin_bottom_z">
      <el-col :span="24"><div class="bg-purple-dark">注："占" 表示计划当日的维修或停用房被占用！</div></el-col>
    </el-row>  
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formProblem" size="mini" class="demo-form-inline">
          <el-form-item>
            <el-select v-model="formProblem.type" @change="listData" placeholder="搜索房型">
            <!-- <el-option label="当前维修和停用房" value=""></el-option>
            <el-option label="当前维修房" value="REPAIR"></el-option>
            <el-option label="当前停用房" value="DISABLE"></el-option> -->
            <el-option v-for="(value,key) in problemStatusMap" :key="key" :label="value" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="disableFlag1" @click="unlock">解除维修房</el-button>
            <el-button type="primary" :disabled="disableFlag2" @click="unlock">解除停用房</el-button>
            <el-button type="primary" :disabled="disableFlag3" @click="unlock">解除选定房间</el-button>
            <!-- <el-button type="primary">转清洁检查房</el-button> -->
            <!-- <el-button type="primary">转清洁未检查房</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>   
      <el-col :span="24">
        <el-table ref="multipleTable" :data="keepingData" border tooltip-effect="dark" height="500" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>									
          <el-table-column prop="roomNumber" label="房号" width="120"></el-table-column>
          <el-table-column prop="roomTypeName" label="房间类型" width="120"></el-table-column>
          <el-table-column prop="createUserName" label="设置者" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="beginDate" label="开始时间" width="180"><template slot-scope="scope">{{ scope.row.beginDate }}</template></el-table-column>
          <el-table-column prop="preEndDate" label="预结束时间" width="180"><template slot-scope="scope">{{ scope.row.preEndDate }}</template></el-table-column>
          <el-table-column prop="relieveName" label="解除设置者" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="endDate" label="结束时间" width="180"><template slot-scope="scope">{{ scope.row.endDate }}</template></el-table-column>
          <el-table-column prop="reason" label="原因" show-overflow-tooltip></el-table-column>
          <el-table-column prop="level" label="级别" width="60"></el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-col> 
    </el-row>  
  </div>
</template>

<script>
import { problemStatusMap } from '@/utils/orm'
import { roomReasonList, roomReasonDelBatch } from "@/api/atrialCenter/roomStatusController"
  export default {
    // created(){
    //   this.listData();
    // },
    data() {
      return {
        problemStatusMap: problemStatusMap,
        formProblem: {
          type:'0',
        },
        keepingData: [],
        multipleSelection: [],
        disableFlag1:true,
        disableFlag2:true,
        disableFlag3:true,
      }
    },
    methods: {
      listData(){
        this.resetData()
        roomReasonList({searchType: this.formProblem.type}).then(res => {
          this.keepingData = res.data;
        })
      },
      resetData() {
        this.disableFlag1 = true
        this.disableFlag2 = true
        this.disableFlag3 = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.resetData()
        if(this.multipleSelection.length>0){
          if(this.formProblem.type=='0'){
            this.disableFlag3 = false
          }else if(this.formProblem.type=='1'){
            this.disableFlag1 = false
          }else if(this.formProblem.type=='2'){
            this.disableFlag2 = false
          }
        }
      },
      unlock(){//解锁勾选的
        if(this.multipleSelection.length<=0){
          this.$message({type:'warning', message:'请至少选择一条'})
          return
        }
        let pksArr = []
        this.multipleSelection.forEach(sel =>{
          pksArr.push(sel.reasonPk)
        })
        roomReasonDelBatch({reasonPk: pksArr.toString()}).then(res=>{
          this.listData()
          this.$message({type:'success', message:'操作成功'})
        })
      }
    },
    mounted() {
      this.listData()
    }

  }
</script>
<style scoped>
.bg-purple-dark {
  background-color: #fdf7f7;
  border-color: #eed3d7;
  padding: 10px;
}
.keeping-content{
  padding: 10px;
}
</style>
