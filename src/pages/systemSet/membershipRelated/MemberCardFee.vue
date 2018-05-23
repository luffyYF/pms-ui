<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">会员卡费管理</h5>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="gradeName" label="会员级别" align="center">
        </el-table-column>
        <el-table-column prop="cardFee" label="卡费" align="center">
          <template slot-scope="scope">
            ￥<el-input v-model="scope.row.cardFee" size="mini" placeholder="请输入卡费"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="modifiedFlag" label="是否可修改" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.modifiedFlag" size="mini" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="giveFlag" label="是否赠送" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.giveFlag" size="mini" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {listGradeCardFee,updateGradeCardFee} from '@/api/systemSet/member/pmsMemberGradeController'
  export default {
    data() {
      return {
        options:[
          {
            value:'N',
            label:'否'
          },
          {
            value:'Y',
            label:'是'
          }
        ],
        loading:false,
        tableData: []
      }
    },
    methods: {
      init() {
        this.list()
      },
      list(){
        const self = this
        this.loading = true;
        listGradeCardFee({typeMaster: this.typeMaster}).then(result => {
          self.tableData = result.data
          self.loading = false
        }).catch(() => {
          self.loading = false
        })
      },
      saveClick(row) {
        console.log(row)
        const self = this
        row.cardFee = Number(row.cardFee)
        updateGradeCardFee(row).then(result => {
          if(result.code == 1){
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          }
          self.list();
        })
      }
    }    
  }
</script> 

<style scoped>
.el-input{
  width: 80px;
}
.el-Name{
  width: 120px;
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
</style>
