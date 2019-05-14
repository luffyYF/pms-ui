<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-button type="primary" size="mini" class="add-pro" @click="addClick">添加会员级别</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        max-height="650"
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="gradeLevel" label="级别" align="center" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gradeName" label="名称" align="center" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="upgradeMemPk" label="升级后级别" align="center" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            {{udGradeMember[scope.row.upgradeMemPk]}}
          </template>
        </el-table-column>
        <el-table-column prop="cardFee" label="卡费" align="center" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rechargeFlag" label="是否可充值" align="center" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.rechargeFlag == 'Y' ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="overdrawFlag" label="是否可透支" align="center" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.overdrawFlag == 'Y' ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="accumulatedPoints" label="累计积分要求" align="center" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulatedValue" label="累计储值要求" align="center" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="upgradePointsDeduction" label="升级积分扣除" align="center" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="upgradeCardFeeDeduction" label="升级卡费扣除" align="center" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="autoUpgradeFlag" label="是否自动升级" align="center" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoUpgradeFlag == 'Y' ? '启用' : '禁用'}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.status == 1 ? '启用' : '禁用'}}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="110" show-overflow-tooltip></el-table-column>

        <el-table-column fixed="right" label="操作" align="center" min-width="150">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="mini">修改</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
            <el-button @click="disabledClick(scope.row)" type="text" size="mini">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <MemberLevelEdit ref="MemberLevelEditRef" @callback="listGrade" />
  </div>
</template>

<script>
  import {listGrade,addGrade,updateGrade,delGrade,updStatusGrade} from '@/api/systemSet/member/pmsMemberGradeController'
  import MemberLevelEdit from './MemberLevelEdit'
  export default {
    components: { MemberLevelEdit },
    data() {
      return {
        options:[],
        tableData: [],
        loading:false,
        udGradeMember: {},
      }
    },
    created() {
    this.init();
    },
    methods: {
      init() {
        this.listGrade()
      },
      editClick(row){
        // var temoObj = JSON.parse(JSON.stringify(row))
        this.$refs.MemberLevelEditRef.showDialog(row.gradePk, this.options)
      },
      saveClick(row) {
        row.autoUpgradeFlag = (row.upgradeMemPk == null || row.upgradeMemPk == "")?"N":"Y"
        console.log(row)
        const self = this
        if(row.gradePk == ''){
          addGrade(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            self.listGrade();
          })
        }else{
          delete row.createTime;
          delete row.updateTime;
          updateGrade(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '修改成功',
                type: 'success'
              });
            }
            self.listGrade();
          })
        }
      },
      deleteClick(row) {
        this.$confirm('确定删除当前选中项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delGrade(row).then(res => {
            if (res.code == 1) {
              this.$message({type: 'success', message: '删除成功!'});
              this.listGrade()
            } else {
              this.$message({type: 'error', message: sub_msg});
            }
          })
        }).catch(() => {
        });
      },
      disabledClick (row) {
        let str = ''
        if (row.status == 1) {
          str = '禁用'
        } else {
          str = '启用'
        }
        this.$confirm('确定' + str + '当前选中项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            gradePk: row.gradePk,
            status: row.status == 1 ? 0 : 1
          }

          updStatusGrade(data).then(res => {
            if (res.code == 1) {
              this.$message({type: 'success', message: '操作成功!'});
              this.listGrade()
            } else {
              this.$message({type: 'error', message: sub_msg});
            }
          })
        }).catch(() => {
        });
      },
      addClick() {
        this.$refs.MemberLevelEditRef.showDialog(null, this.options)
      },
      listGrade(){
        const self = this
        this.loading = true;
        listGrade().then(result => {
          self.tableData = result.data
          self.options = [];
          self.tableData.forEach(element => {
            if(element.upgradeMemPk == null){
              element.upgradeMemPk =""
            }
            self.options.push({
              "gradeName": element.gradeName,
              "gradePk": element.gradePk
            })
            self.udGradeMember[element.gradePk] = element.gradeName
          });
          self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.options.unshift({
            "gradeName": '无',
            "gradePk": '0'
          })
          self.udGradeMember['0'] = '无'
          self.loading = false
        })
      }
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
  float: left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.span{
  margin-right: 5px;
}
</style>
