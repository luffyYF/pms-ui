<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">充值优惠管理</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addProtocolClick">添加优惠项目</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="rechargeName" label="名称" align="center" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.rechargeName" class="el-Name" size="mini" placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="rechargeMoney" label="充值金额" align="center" width="150">
          <template slot-scope="scope">
            ￥<el-input v-model="scope.row.rechargeMoney" size="mini" placeholder="请输入充值金额"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="discount" label="折扣" align="center" width="110">
          <template slot-scope="scope">
            <el-input v-model="scope.row.discount" @blur="discountBlur(scope.row)"  size="mini" placeholder="请输入折扣"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="donationMoney" label="赠送金额" align="center" width="150">
         <template slot-scope="scope">
            ￥<el-input v-model="scope.row.donationMoney" size="mini" placeholder="请输入赠送金额"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="howMoney" label="赠送积分" align="center">
         <template slot-scope="scope">
            每<el-input v-model="scope.row.howMoney" size="mini" @blur="howMoneyBlur(scope.row)"  placeholder="请输入钱"></el-input>元 赠送<el-input v-model="scope.row.donationIntegral" @blur="howMoneyBlur(scope.row)" size="mini" placeholder="请输入赠送积分"></el-input>个积分， 赠送积分数<el-input v-model="scope.row.totalIntegral" size="mini" placeholder="请输入赠送积分"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="usingFlag" label="状态" align="center" width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.usingFlag" size="mini" placeholder="请选择状态">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="beginDate" label="有效期" align="center" width="250">
         <template slot-scope="scope">
           <DatePicker v-model="scope.row.datePicker"/>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button v-if="scope.row.rechargePk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
            <el-button v-if="scope.row.rechargePk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {listRecharge,addRecharge,updateRecharge,delRecharge} from '@/api/systemSet/member/pmsMemberRechargeController'
import DatePicker from '@/components/DateComponent/DatePicker'
import Moment from 'moment'
  export default {
    components:{DatePicker},
    data() {
      return {
        loading:false,
        datePicker: {
          begin:new Date(),
          end:new Date()
        },
        tableData: [],
        options1: [{
          value: 'Y',
          label: '启动'
        }, {
          value: 'N',
          label: '停用'
        }]
      }
    },
    methods: {
      init() {
        this.list()
      },
      list(){
        const self = this
        console.info()
        this.loading = true;
        listRecharge().then(result => {
          self.tableData = result.data
          self.tableData.forEach(element => {
            element.datePicker = {
              begin: element.beginDate,
              end: element.endDate
            }
          })
          self.loading = false;
        }).catch(() => {
          self.loading = false
        })
      },
      saveClick(row) {
        console.log(row)
        const self = this
        row.beginDate = Moment(row.datePicker.begin).format("YYYY-MM-DD");
        row.endDate = Moment(row.datePicker.end).format("YYYY-MM-DD");
        if(row.rechargePk == ''){
          addRecharge(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            self.list();
          })
        }else{
          delete row.createTime
          delete row.updateTime
          updateRecharge(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '修改成功',
                type: 'success'
              });
            }
            self.list();
          })
        }
      },
      deleteClick(row) {
        console.log(row)
        const self = this
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRecharge({rechargePk:row.rechargePk}).then(result => {
            if(result.code == 1){
              self.$message({
                message: '删除成功',
                type: 'success'
              })
            }
            self.list()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });         
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      addProtocolClick() {
        if(this.tableData.length == 0 || this.tableData[0].rechargePk != ''){
          this.tableData.unshift({
            "beginDate": '',
            "companyPk": '',
            "discount": 0,
            "donationIntegral": 0,
            "donationMoney": 0,
            "endDate": '',
            "howMoney": 1,
            "rechargeMoney": 0,
            "rechargeName": '',
            "rechargePk": '',
            "totalIntegral": 0,
            "usingFlag": 'Y',
            datePicker:{
              begin:new Date(),
              end:new Date()
            }
          })
        }
      },
      discountBlur(row){
        let money = row.rechargeMoney * row.discount
        row.donationMoney = money.toFixed(1)
      },
      howMoneyBlur(row){
        let money = (row.rechargeMoney / row.howMoney) * row.donationIntegral
        row.totalIntegral = money.toFixed(1)
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
.el-date-editor--datetimerange.el-input__inner,.el-date-editor--daterange.el-input__inner{
  width: 215px;
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
