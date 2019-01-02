<template>
  <div class="content-body">
    <el-row style="margin-top:15px;">
      <span class="title-span">角色列表</span>
      <el-button type="primary" size="mini" @click="addListRole">添加角色</el-button>
      <span style="color:red;">*注：角色级别低的操作员不能修改和创建角色级别高的操作员</span>
    </el-row>
    <hr>
    <el-table :data="tableData" border height="450" style="width: 100%">
      <!-- <el-table-column
        prop="name"
        label="编号">
      </el-table-column> -->
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="roleLevel"
        label="角色级别">
      </el-table-column>
      <el-table-column
        prop="controlDayFlag"
        label="报表日期范围控制">
      </el-table-column>
      <el-table-column
        prop="viewNumDay"
        label="报表允许查看天数">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="updateRoleBtn(scope.row)"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            @click.native.prevent="deleteRole(scope.$index, tableData)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- 
      :before-close="handleClose" -->
      <add-role-manage ref="addRoleFormRef" @showParentComp="eventFromChild"/>
    
  </div>
</template>

<script>
import AddRoleManage from './AddRoleManage'
import {listRole,delRole} from '@/api/operators/pmsRoleController'
// import {powerJudge} from '@/utils/permissionsOperation.js'

  export default {
    components: {AddRoleManage},
    data() {
      return {
        checkedAll:false,
        tableData: [],
        delVisible:false,
        rolePo:{},//当前选中要修改的角色
      };
    },

    mounted() {
      this.getList();
      console.log(this.rolePo);
    },
    methods: {
      eventFromChild(dataIf){
        if(!dataIf){
          this.getList()
        }
      },
      getList(){//加载列表getList(){//加载列表
        listRole().then(res => {
          this.tableData = res.data;
        }).catch(()=>{
          // this.$message({type:'danger', message: '网络异常'})
          console.log("网络异常");
        })
      },
      addListRole(){
        this.$nextTick(()=>{
          this.$refs.addRoleFormRef.addData();
        })
      },
      updateRoleBtn(row){//修改角色按钮
        this.rolePo = [];
        this.rolePo = row;
        this.dialogVisible = true;
        this.$refs.addRoleFormRef.editData(row);
      },
      deleteRole(index,rows){//删除
        this.$confirm('确认删除？')
          .then(_ => {
            var nowItem = rows[index];
            delRole(nowItem).then(res => {
              this.$message({type:'success', message: '删除成功'})
              this.getList();
              this.delVisible = false;
            }).catch(()=>{
              this.delVisible = false;
              // this.$message({type:'danger', message: '网络异常'})
              console.log("网络异常");
            })
          })
          .catch(_ => {});
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // powerJudge(id){
      //   return powerJudge(id);
      // }
    }
  }
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px 0;
    display: inline-block;
}
.el-row {
    margin-bottom: 0px;
}
.border-sty{
  border: 1px solid #e8d3d3;
}
.el-radio+.el-radio {
    margin-left: 5px;
}
.el-tree {
    cursor: default;
    background: #fff;
    color: #606266;
    height: 300px;
    overflow: auto;
}
</style>


