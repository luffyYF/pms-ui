<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-button type="primary" size="mini" class="add-pro" @click="addRows">添加会员级别</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="gradeLevel" label="级别" align="center" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.gradePk != ''">{{scope.row.gradeLevel}}</span>
            <el-input v-model="scope.row.gradeLevel" v-if="scope.row.gradePk == ''" size="mini" placeholder="级别"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="gradeName" label="级别名称" align="center" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.gradeName" class="claName" size="mini" placeholder="请输入会员级别名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="autoUpgradeFlag" label="自动升级" align="center" width="110">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.autoUpgradeFlag">
              <el-radio size="mini" label="Y">自动升级</el-radio>
              <el-radio size="mini" label="N">手工升级</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="upgradeMemPk" label="升级后级别" align="center" width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.upgradeMemPk" size="mini" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.gradePk"
                :label="item.gradeName"
                :value="item.gradePk">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="totalFraction" label="升级条件" align="center" width="220">
          <template slot-scope="scope">
            <div class="checked"><el-checkbox v-model="scope.row.totalFractionFlag" true-label="Y" false-label="N" size="mini">总积分数</el-checkbox><el-input size="mini"  v-model="scope.row.totalFraction" placeholder="0"></el-input>分</div>
            <div class="checked" style="padding-left:52px;">扣除<el-input size="mini" v-model="scope.row.deductionFraction" placeholder="0"></el-input>分</div>
            <div class="checked"><el-checkbox size="mini" v-model="scope.row.occupancyNumFlag" true-label="Y" false-label="N">入住次数</el-checkbox><el-input size="mini" v-model="scope.row.occupancyNum" placeholder="0"></el-input>次</div>
            <div class="checked"><el-checkbox size="mini" v-model="scope.row.websiteReserveFlag" true-label="Y" false-label="N">网站预订</el-checkbox><el-input size="mini" v-model="scope.row.websiteReserve" placeholder="0"></el-input>次</div>
          </template>
        </el-table-column>
        <el-table-column prop="checkOutDelay" label="本店退房延迟" align="center" width="150">
          <template slot-scope="scope">
            <el-time-picker
              size="mini"
              :value="scope.row.checkOutDelay"
              v-model="scope.row.checkOutDelay"
              value-format="HH:mm:ss"
              :picker-options="{
                format:'HH:mm'
              }"
              placeholder="任意时间点">
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column prop="bookRetain" label="预订保留" align="center" width="150">
          <template slot-scope="scope">
            <el-time-picker
              size="mini"
              :value="scope.row.bookRetain"
              v-model="scope.row.bookRetain"
              value-format="HH:mm:ss"
              :picker-options="{
                format:'HH:mm:ss'
              }"
              placeholder="任意时间点">
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column prop="autoCancelFlag" label="预订保留自动取消" align="center" width="160">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.autoCancelFlag">
              <el-radio size="mini" label="Y" class="span">取消</el-radio>&nbsp;&nbsp;
              <el-radio size="mini" label="N" class="span">不取消</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="integralFlag" label="超出有效期积分设置" align="center" width="160">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.integralFlag">
              <el-radio size="mini" label="Y" class="span">清零</el-radio>&nbsp;&nbsp;
              <el-radio size="mini" label="N" class="span">保留</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="discountFlag" label="超出有效期折扣设置" align="center" width="160">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.discountFlag">
              <el-radio size="mini" label="Y">不能打折</el-radio>&nbsp;&nbsp;
              <el-radio size="mini" label="N">可以打折</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="registerIntegral" label="注册送积分" align="center" width="120px">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.registerIntegral" placeholder="0"></el-input>分
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button v-if="scope.row.gradePk == ''" @click="deleteRow(scope.$index,tableData)" type="text" size="mini">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {listGrade,addGrade,updateGrade} from '@/api/systemSet/member/pmsMemberGradeController'
  export default {
    data() {
      return {
        options:[],
        tableData: [],
        loading:false,
      }
    },
    methods: {
      init() {
        this.listGrade()
      },
      saveClick(row) {
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
        console.log(row)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      addRows() {
        if(this.tableData.length == 0 || this.tableData[0].gradePk != ''){
          this.tableData.unshift({
            "autoCancelFlag": "Y",
            "autoUpgradeFlag": "Y",
            "bookRetain": '00:00:00',
            "checkOutDelay": '00:00:00',
            "deductionFraction": 0,
            "discountFlag": "Y",
            "gradeLevel": 0,
            "gradeName": '',
            "gradePk": '',
            "integralFlag": "Y",
            "occupancyNum": 0,
            "registerIntegral": 0,
            "totalFraction": 0,
            "upgradeMemPk": '',
            "websiteReserve": 0
          })
        }
      },
      listGrade(){
        const self = this
        this.loading = true;
        listGrade().then(result => {
          self.tableData = result.data
          self.options = [];
          self.tableData.forEach(element => {
            self.options.push({
              "gradeName": element.gradeName,
              "gradePk": element.gradePk
            })
          });
          self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.options.unshift({
            "gradeName": '非自动升级',
            "gradePk": ''
          })
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
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.span{
  margin-right: 5px;
}
</style>
