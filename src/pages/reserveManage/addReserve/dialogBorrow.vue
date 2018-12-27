//外借
<template>
    <div>
        <el-dialog class="pattern-dialog" title="外借" :visible.sync="dialogBorrow" width="80%" :append-to-body="true" :before-close="toClose">
            <div class="pattern-dialog-container">
                <h4 class="borrowFrom-h4">物品外借管理</h4>
                <el-form ref="searchForm" :inline="true" :model="searchForm" size="mini" label-width="80px">
                    <el-col :span="24">
                        <el-form-item label="外借状态">
                            <el-select v-model="searchForm.status" clearable placeholder="全部状态">
                                <!-- <el-option label="全部状态" value=""></el-option> -->
                                <el-option v-for="(val, key, index) in letoutMap" :key="key" :label="val" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="客人姓名">
                            <el-input v-model="searchForm.guestName"></el-input>
                        </el-form-item>
                        <el-form-item label="房号">
                            <el-input v-model="searchForm.roomNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="租借时间">
                            <el-date-picker type="date" placeholder="租借时间" value-format="yyyy-MM-dd" v-model="searchForm.beginDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="归还时间">
                            <el-date-picker type="date" placeholder="归还时间" value-format="yyyy-MM-dd" v-model="searchForm.endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="listTable">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
                <el-col :span="24">
                    <el-table :data="tableData" border style="width: 100%" @row-click="tableRowClick" :row-class-name="tableRowClassName">
                        <el-table-column prop="orderGuestNo" label="客单号"></el-table-column>
                        <el-table-column prop="roomNumber" label="房号" width="180"></el-table-column>
                        <el-table-column prop="voucherNo" label="凭证号"></el-table-column>
                        <el-table-column prop="guestName" label="姓名"></el-table-column>
                        <el-table-column prop="price" label="租金"></el-table-column>
                        <el-table-column prop="beginDate" label="租借时间"></el-table-column>
                        <el-table-column prop="createUserName" label="租借操作员"></el-table-column>
                        <el-table-column prop="itemsName" label="租借物品"></el-table-column>
                        <el-table-column prop="status" label="状态">
                          <template slot-scope="scope">
                            <span>{{letoutMap[scope.row.status]}}</span>
                          </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <h1></h1>
                <h4 class="borrowFrom-h4">物品外借</h4>
                <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
                    <el-col :span="24">
                        <el-form-item label="客单号" required>
                            <el-select v-model="form.guestOrderPk" placeholder="请选择客单号" @change="changeGuestSelect">
                                <el-option v-for="y in guestSelectArr" :key="y.guestOrderPk" :label="'房间号：'+y.roomNumber+'  客人姓名：'+y.memName" :value="y.guestOrderPk"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="客人姓名">
                            <el-input v-model="form.guestName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="登记人">
                            <el-input v-model="form.createUserName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="价值">
                            <el-input v-model="form.price" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="租借时间">
                            <el-date-picker type="datetime" placeholder="租借时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.beginDate" :disabled="true"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="租借物" required>
                            <el-select v-model="form.itemsPk" placeholder="请选择租借物" @change="changeItems">
                                <el-option v-for="y in rentalItemArr" :key="y.itemsPk" :label="y.itemsName" :value="y.itemsPk"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="凭证号">
                            <el-input v-model="form.voucherNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="归还时间">
                            <el-date-picker type="datetime" placeholder="归还时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.endDate" :disabled="true"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="归还人">
                            <el-input v-model="form.endUserName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" style="text-align: center;">
                        <el-form-item>
                            <el-button type="primary" @click="btnAdd" :disabled="currRow!=null">增加</el-button>
                            <el-button type="primary" @click="giveBack" :disabled="!(this.currRow!=null && this.currRow.status=='NORETURN')">归还</el-button>
                            <el-button type="primary" @click="payfor" :disabled="!(this.currRow!=null && this.currRow.status=='NORETURN')">赔偿</el-button>
                            <el-button type="primary" @click="cancel" :disabled="!(this.currRow!=null && this.currRow.status=='NORETURN')">取消</el-button>
                            <el-button type="primary" @click="toClose">关闭</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
import bus from '@/utils/bus'
import { letoutMap } from "@/utils/orm";
import { formatDate } from "@/utils/index";
// import {powerJudge} from '@/utils/permissionsOperation.js'

import {
  guestSelect,
  addGM,
  listCondition,
  editFinish,
  cancelGM,
  payfor
} from "@/api/goods/goodsManageController";
import { listRentalItems } from "@/api/systemSet/roomSetting/pmsRentalItemsController";
export default {
  data() {
    return {
      letoutMap: letoutMap,
      dialogBorrow: false,
      currOrderPk: "", //主订单主键
      currRow: null, //当前选中的行
      form: {
        // currGoodsPk: "" //当前选中的物品管理条目主键
      },
      searchForm: {
        status:null,
        guestName:'',
        roomNumber:'',
        beginDate: null,
        endDate: null
      },
      tableData: [],
      guestSelectArr: [],
      rentalItemArr: []
    };
  },
  methods: {
    /**
     * 初始化
     * @augments orderPk 主订单主键
     * @augments status 筛选状态，（可选）
     *  */
    init(orderPk,status) {
      this.dialogBorrow = true
      this.currOrderPk = orderPk
      guestSelect({ orderPk: orderPk, typeEnum: "WJ" }).then(res => {
        this.guestSelectArr = res.data;
      });
      listRentalItems().then(res => {
        this.rentalItemArr = res.data
      });
      this.initForm()
      this.initSearchForm(status)
      this.listTable()
    },
    listTable() {
      //查询，加载列表
      this.searchForm.orderPk = this.currOrderPk;
      this.searchForm.type = "WJ";
      listCondition(this.searchForm).then(res => {
        this.tableData = res.data;
        this.initForm();
      });
    },
    initSearchForm(status) {
      //初始化搜索表单
      this.searchForm.status = status
      this.searchForm.guestName = ''
      this.searchForm.roomNumber = ''
      this.searchForm.beginDate = null
      this.searchForm.endDate = null
    },
    initForm() {
      //初始化提交表单
      this.currRow = null;
      this.form = {};
      this.form.orderPk = this.currOrderPk;
      this.form.createUserName = JSON.parse(localStorage.getItem('pms_userinfo')).upmsUserName;
      this.form.beginDate = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.form.type = "WJ";
      this.form.status = "NORETURN";

      // this.form.memName = '',
    },
    changeGuestSelect(guestOrderPk) {
      //选择客单改变
      this.guestSelectArr.forEach(guestSel => {
        if (guestSel.guestOrderPk == guestOrderPk) {
          this.initForm();
          this.form.guestOrderPk = guestOrderPk;
          this.form.guestName = guestSel.memName;
          this.form.roomPk = guestSel.roomPk;
          this.form.roomNumber = guestSel.roomNumber;
        }
      });
    },
    changeItems(itemsPk) {
      //选择租借物改变
      this.rentalItemArr.forEach(item => {
        if (item.itemsPk == itemsPk) {
          this.form.price = item.itemsPrice;
        }
      });
    },
    btnAdd() {
      if (!this.form.guestOrderPk) {
        this.$message({ type: "warning", message: "请先选择客单号！" });
        return;
      }
      if (!this.form.itemsPk) {
        this.$message({ type: "warning", message: "请先选择租借物！" });
        return;
      }
      //增加物品外借
      this.$confirm("外借确认？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.rentalItemArr.forEach(item=>{
          if(this.form.itemsPk==item.itemsPk){
            this.form.itemsName = item.itemsName
          }
        })
        addGM(this.form).then(res => {
          this.$message({ type: "success", message: "添加成功" });
          this.listTable();
          this.initForm();
        });
      });
    },
    tableRowClick(row, event, column) {
      //单击 table
      this.currRow = row;
      this.form = row;
      this.form.guestOrderPk = null;
    },
    giveBack() {
      //归还
      this.$confirm("确认归还？")
        .then(_ => {
          let data = {
            goodsPk: this.currRow.goodsPk,
            type: "WJ"
          };
          editFinish(data).then(res => {
            this.listTable();
            this.initForm();
            this.$message({ type: "success", message: "操作成功" });
          });
        })
        .catch(_ => {});
    },
    cancel() {
      //取消
      this.$confirm("确认取消外借？")
        .then(_ => {
          let data = {
            goodsPk: this.currRow.goodsPk,
            type: "WJ"
          };
          cancelGM(data).then(res => {
            this.$message({ type: "success", message: "取消成功" });
            this.listTable();
            this.initForm();
          });
        })
        .catch(_ => {});
    },
    payfor() {
      //赔偿
      this.$confirm("确认赔偿？赔偿价为 ￥" + this.currRow.price)
        .then(_ => {
          let data = {
            goodsPk: this.currRow.goodsPk,
            type: "WJ"
          };
          payfor(data).then(res => {
            this.$message({ type: "success", message: "操作成功" });
            this.listTable();
            this.initForm();
          });
        })
        .catch(_ => {});
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.currRow != null && this.currRow.goodsPk == row.goodsPk) {
        return "success-row";
      }
      return "";
    },
    toClose() {
      this.dialogBorrow = false
      bus.$emit('billload')
      bus.$emit("togmcount")
    },
    // powerJudge(id){
    //   return powerJudge(id);
    // }

  }
};
</script>

<style scoped>
.pattern-dialog-container {
  /* display: table; */
  overflow: auto;
}

</style>
<style>
.el-table tr.success-row {
  background: #f0f9eb;
}
</style>



