// 会员管理
<template>
  <div>
    <!-- form -->
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">交班数据查询</h5>
        <el-form-item label="日期">
           <el-date-picker style="width:100%;" v-model="datePicker2" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search"  style="margin-left:30px" @click="listShiftData(1)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="shiftData" v-if="hasPerm('pms:handoverDuty:view')" style="margin-left:30px">交班</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">交班数据</h5>
      <el-table v-loading="loading" 
      size="mini" 
      border 
      :data="tableData"      style="width: 98.5%; margin:10px;">
        <el-table-column label="">
            <el-table-column prop="shiftNo" label="班次" align="center" width="180">
            </el-table-column>
            <el-table-column prop="beginDate" label="开始时间" align="center" width="180">
            </el-table-column>
            <el-table-column prop="endDate" label="结束时间" align="center" width="180">
            </el-table-column>
            <el-table-column prop="userName" label="当班人" align="center" width="80">
            </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="本班权责汇总">
            <el-table-column prop="qzCash" label="现金" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzBankCard" label="银行卡" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzMemberCard" label="会员卡" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzHangBill" label="挂账" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzFreeSheet" label="免单" align="center" width="80">
            </el-table-column>
            <el-table-column fixed="qzCheck" label="支票" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzCashCoupon" label="代金券" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzOther" label="其他" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzRoomCharge" label="房费" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzGoods" label="商品销售" align="center" width="80">
            </el-table-column>
            <el-table-column prop="qzMemberReCharge" label="会员充值" align="center" width="80">
            </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="本班收付汇总">
            <el-table-column prop="rpCash" label="现金" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpBankCard" label="银行卡" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpMemberCard" label="会员卡" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpHangBill" label="挂账" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpFreeSheet" label="免单" align="center" width="80">
            </el-table-column>
            <el-table-column fixed="rpCheck" label="支票" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpCashCoupon" label="代金券" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpOther" label="其他" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpRoomCharge" label="房费" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpGoods" label="商品销售" align="center" width="80">
            </el-table-column>
            <el-table-column prop="rpMemberReCharge" label="会员充值" align="center" width="80">
            </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination class="positions" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageNum" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="form.total"></el-pagination>
    </div>

    <!-- 会员管理 dialog -->
    <el-dialog title="预交班信息" :visible.sync="dialogMemberVisible" width="800px" top="60px" class="dialogMemberManage">
        <el-form ref="preShiftData" size="mini" :rules="rules" :model="preShiftData" label-position="right" label-width="110px">
            <div class="body-conten">
                <div class="bg-reserve ">
                    <h5 class="info-title">交班基础信息</h5>
                    <el-form-item label="班次时间" prop="ruleName">
                        <el-date-picker style="width:100%;" v-model="datePicker" @change="shiftData" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"/>
                    </el-form-item>
                    <el-form-item label="交班操作员" prop="ruleName">
                        {{preShiftData.userName}}
                    </el-form-item>
                </div>
            </div>
            <div class="body-conten">
                <div class="bg-reserve ">
                    <h5 class="info-title">本班交班账务汇总</h5>
                    <el-form-item label="客房总收入" >
                        {{preShiftData.qz.cons.income}}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span v-if="preShiftData.qz.cons.detail.length>0">(</span>
                            <span v-for="(obj,i) in preShiftData.qz.cons.detail" :key="i">{{obj.projectName}}:{{obj.price}}<i v-if="i != preShiftData.qz.cons.detail.length-1">，</i></span>
                            <span v-if="preShiftData.qz.cons.detail.length>0">)</span>
                    </el-form-item>
                    <el-form-item label="总结算" >
                        {{preShiftData.qz.settl.income}}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span v-if="preShiftData.qz.settl.detail.length>0">(</span>
                            <span v-for="(obj,i) in preShiftData.qz.settl.detail" :key="i">{{obj.projectName}}:{{obj.price}}<i v-if="i != preShiftData.qz.settl.detail.length-1">，</i></span>
                            <span v-if="preShiftData.qz.settl.detail.length>0">)</span>
                    </el-form-item>
                </div>
            </div>
            <div class="body-conten">
                <div class="bg-reserve ">
                    <h5 class="info-title">本次已结账账务汇总(本班收付)</h5>
                    <el-form-item label="客房总收入" >
                        {{preShiftData.settl.cons.income}}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span v-if="preShiftData.settl.cons.detail.length>0">(</span>
                            <span v-for="(obj,i) in preShiftData.settl.cons.detail" :key="i">{{obj.projectName}}:{{obj.price}}<i v-if="i != preShiftData.settl.cons.detail.length-1">，</i></span>
                            <span v-if="preShiftData.settl.cons.detail.length>0">)</span>
                    </el-form-item>
                    <el-form-item label="总结算" >
                        {{preShiftData.settl.settl.income}}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span v-if="preShiftData.settl.settl.detail.length>0">(</span>
                            <span v-for="(obj,i) in preShiftData.settl.settl.detail" :key="i">{{obj.projectName}}:{{obj.price}}<i v-if="i != preShiftData.settl.settl.detail.length-1">，</i></span>
                            <span v-if="preShiftData.settl.settl.detail.length>0">)</span>
                    </el-form-item>
                </div>
            </div>

            <div class="body-conten">
                <div class="bg-reserve ">
                    <h5 class="info-title">会员充值</h5>
                    <el-form-item label="会员充值" >
                        {{preShiftData.recharge.income}}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span v-if="preShiftData.recharge.detail.length>0">(</span>
                            <span v-for="(obj,i) in preShiftData.recharge.detail" :key="i">{{obj.projectName}}:{{obj.price}}<i v-if="i != preShiftData.recharge.detail.length-1">，</i></span>
                            <span v-if="preShiftData.recharge.detail.length>0">)</span>
                    </el-form-item>
                </div>
            </div>

            <div class="body-conten">
                <div class="bg-reserve ">
                    <h5 class="info-title">单位中介收款</h5>
                    <el-form-item label="单位结算" >
                        {{preShiftData.agreementSettlement}}
                    </el-form-item>
                    <el-form-item label="单位预收款" >
                        {{preShiftData.agreementAdvanceCollection}}
                    </el-form-item>
                    <el-form-item label="中介结算" >
                        {{preShiftData.intermediarySettlement}}
                    </el-form-item>
                    <el-form-item label="中介预收款" >
                        {{preShiftData.intermediaryAdvanceCollection}}
                    </el-form-item>
                </div>
            </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMemberVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" v-if="hasPerm('pms:handoverDuty:add')"  @click="addShiftData" :loading="loading" >保存</el-button>
       
        </span>
    </el-dialog>
    
  </div>
</template>

<script>
import {getPreShiftInf,addShiftData,listShiftData} from "@/api/shiftData/shiftData";
export default {
  components: {   },
  data() {
    return {
        tableData: [],
        dialogMemberVisible: false,
        loading: false,
        form: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            beginDate:"",
            endDate:"",
            
        },
        preShiftDataObj:{
            beginDate:"",
            endDate:""
        },
        preShiftData:{
            qz:{
                cons:{
                    icome:0,
                    detail:[]
                },
                settl:{
                    icome:0,
                    detail:[]
                },
            },
            settl:{
                cons:{
                    icome:0,
                    detail:[]
                },
                settl:{
                    icome:0,
                    detail:[]
                },
            },
            recharge:{
            income:0,
            detail:[

            ]
        },
        },
        datePicker:[],
        datePicker2:[],
        rules: {
        },
    };
  },
  mounted() {
      this.init()
  },
  methods: {
    listShiftData(val){
        if(val){
            this.form.pageNum = 1
        }
        console.log(this.datePicker2 != null && this.datePicker2.length == 2)
        if(this.datePicker2 != null && this.datePicker2.length == 2){
            this.form.beginDate = this.datePicker2[0]
            this.form.endDate = this.datePicker2[1]
        }else{
            this.form.beginDate = ""
            this.form.endDate = ""
        }
        listShiftData(this.form).then(res=>{
            this.tableData = res.data.data
            this.form.total = res.data.total
        })
    },
    init() {
      this.listShiftData()
    },
    shiftData(){
        var that = this
        if(that.datePicker != null && that.datePicker.length == 2){
            that.preShiftDataObj.beginDate = that.datePicker[0]
            that.preShiftDataObj.endDate = that.datePicker[1]
        }
        getPreShiftInf(that.preShiftDataObj).then(res=>{
            that.datePicker = [
                res.data.beginDate,
                res.data.endDate,
            ]
            that.preShiftData = res.data
            that.dialogMemberVisible = true
        })
    },
    addShiftData(){
        var that = this
        var data = {
            beginDate:that.preShiftData.beginDate,
            endDate:that.preShiftData.endDate,
            agreementSettlement:that.preShiftData.agreementSettlement,
            agreementAdvanceCollection:that.preShiftData.agreementAdvanceCollection,
            intermediarySettlement:that.preShiftData.intermediarySettlement,
            intermediaryAdvanceCollection:that.preShiftData.intermediaryAdvanceCollection,
        }
        addShiftData(data).then(res=>{
            this.$message({ type: 'success', message: res.sub_msg })
            that.dialogMemberVisible = false
        })
    },
    // 分页相关
      handleSizeChange (val) {
        this.form.pageNum = 1
        this.form.pageSize = val
        this.listRule()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.form.pageNum = val
        this.listRule()
      },
  }
};
</script>

<style scoped>
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
.el-select {
  width: 178px;
}
.el-date-editor.el-input {
  width: 178px;
}
.body-conten {
  background: #f7f7f7;
  padding: 10px;
}
.height38 {
  height: 38px;
  padding: 20px 10px 0 10px;
}
.height110 {
  height: 110px;
  padding: 20px 10px 0 10px;
}
.positions {
  float: right;
}
</style>
<style>
.dialogMemberManage .el-dialog .el-dialog__body {
  padding: 0;
}
</style>

