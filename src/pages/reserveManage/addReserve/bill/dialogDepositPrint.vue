<template>
    <div>
        <el-dialog class="pattern-dialog" title="押金打印" :visible.sync="dialogDepositPrint" width="50%" :before-close="handleClose" :append-to-body=true>
            <div class="pattern-dialog-container" style="padding: 25px 4px;">
                <el-col :span="24">
                  <div class="demo-input-suffix">
                      请选择客单：
                      <el-select v-model="guestOrderPk" size="mini" style="width:80%" @change="handleChange">
                        <el-option label="=========所有客单=========" value=""></el-option>
                        <el-option
                          v-for="item in userInfo"
                          :key="item.guestOrderPk"
                          :label="'房间号：' + item.roomNumber + ' 客人姓名：' + item.memName"
                          :value="item.guestOrderPk">
                          <span>房间号：{{ item.roomNumber }} 客人姓名：{{ item.memName }}</span>
                        </el-option>
                      </el-select>
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-table 
                    :data="tableData" 
                    ref="multipleTabel"
                    height="420" 
                    border 
                    style="width: 100%;margin-top: 15px" 
                    v-loading="loading" 
                    @selection-change="handleSelectionChange">
                      <el-table-column type="selection" width="55" align="center"></el-table-column>			
                      <el-table-column prop="settlementAmount" label="金额" header-align="center" align="right">
                        <template slot-scope="scope">
                          <span>{{scope.row.settlementAmount}}</span>
                          <br />
                          <span>{{scope.row.projectName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="roomNumber" label="房号" align="center"></el-table-column>
                      <el-table-column prop="orderGuestNo" label="客单号" align="center"></el-table-column>
                      <el-table-column prop="createTime" label="发生日期" min-width="110" align="center"></el-table-column>
                      <el-table-column prop="createUserName" label="操作员" align="center"></el-table-column>
                      <el-table-column prop="businessDate" label="营业日期" align="center"></el-table-column>
                  </el-table>
                </el-col>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-checkbox v-model="checked">不显示房价</el-checkbox>
              <el-button size="mini" type="primary" @click="depositPrint">打印</el-button>
              <el-button size="mini" type="primary" @click="dialogDepositPrint = false">取消</el-button>
            </span>
        </el-dialog> 
    </div>
</template>

<script>
import {findDepositFromBills, recoverBillEndRecord} from '@/api/bill'
import {formatDate} from '@/utils/index'

export default {
  data() {
    return {
      dialogDepositPrint:false,
      tableData:[],
      form: {
          orderPk: null,
          pks: null
      },
      guestOrderPk: '',
      pks: null,
      userInfo: [],
      loading: false,
      multipleSelection: [],
      orderNo: null,
      checked: false,
      companyObj: JSON.parse(localStorage.getItem("current_logon_company")),
      userObj: JSON.parse(localStorage.getItem('pms_userinfo'))
    }
  },
  methods: {
    showDialog(orderPk, pks, userInfo) {
      this.dialogDepositPrint = true
      this.loading = true
      this.tableData = []
      this.userInfo = []
      this.guestOrderPk = ''
      this.form.orderPk = orderPk
      this.form.pks = pks
      this.pks = pks
      this.userInfo = userInfo
      this.orderNo = null

      findDepositFromBills(this.form).then(res => {
        this.tableData = res.data
        res.data.forEach(element => {
          this.orderNo = element.orderNo
          if(element.businessDate == formatDate(new Date(), 'yyyy-MM-dd')) {
            this.$nextTick(() => {
              this.$refs.multipleTabel.toggleRowSelection(element, true)
            })
          }
        });
      }).finally(() => {
        this.loading = false
      })
    },
    handleClose() {
      this.dialogDepositPrint = false;
    },
    handleChange (val) {
      this.loading = true
      if (val == '') {
        this.form.pks = this.pks
      } else {
        this.form.pks = val
      }

      findDepositFromBills(this.form).then(res => {
        this.tableData = res.data
        res.data.forEach(element => {
          this.orderNo = element.orderNo
          if(element.businessDate == formatDate(new Date(), 'yyyy-MM-dd')) {
            this.$nextTick(() => {
              this.$refs.multipleTabel.toggleRowSelection(element, true)
            })
          }
        });
      }).finally(() => {
        this.loading = false
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    depositPrint () {
      if(this.multipleSelection.length <= 0){
        this.$message({type:'warning',message:'至少选择一条押金'})
        return;
      }
      //组装billPk
      let billPks = ""
      this.multipleSelection.forEach(item => {
        billPks += item.billPk + ","
      })
      billPks = billPks.substring(0, (billPks.length - 1))
      
      window.open(process.env.PRINT_ROOT+"/#/depositPrint?shopName="+this.companyObj.companyName
      +"&billPks="+billPks+"&pks="+this.pks+"&operator="+this.userObj.realName+"&tel="+this.userObj.realName+"&orderNo="+this.orderNo+"&checked="+this.checked);
    }
  }
}
</script>