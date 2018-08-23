//寄存
<template>
    <div>
        <el-dialog class="pattern-dialog" title="寄存" :visible.sync="dialogBorrow" width="80%" :append-to-body="true" :before-close="toClose">
            <div class="pattern-dialog-container">
                <h4 class="borrowFrom-h4">物品寄存管理</h4>
                <el-form ref="searchForm" :inline="true" :model="searchForm" size="mini" label-width="80px">
                    <el-col :span="24">
                        <el-form-item label="寄存状态">
                            <el-select v-model="searchForm.status">
                                <el-option label="全部状态" value=""></el-option>
                                <el-option v-for="(val, key, index) in depositMap" :key="key" :label="val" :value="key"></el-option>
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
                        <el-form-item label="寄存时间">
                            <el-date-picker type="date" placeholder="寄存时间" value-format="yyyy-MM-dd" v-model="searchForm.beginDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="领取时间">
                            <el-date-picker type="date" placeholder="领取时间" value-format="yyyy-MM-dd" v-model="searchForm.endDate"></el-date-picker>
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
                        <!-- <el-table-column prop="price" label="租金"></el-table-column> -->
                        <el-table-column prop="beginDate" label="寄存时间"></el-table-column>
                        <el-table-column prop="createUserName" label="寄存员"></el-table-column>
                        <el-table-column prop="details" label="寄存内容"></el-table-column>
                        <el-table-column prop="status" label="状态">
                          <template slot-scope="scope">
                            <span>{{depositMap[scope.row.status]}}</span>
                          </template>
                        </el-table-column>
                        <!-- <el-table-column prop="itemsName" label="租借物品"></el-table-column> -->
                    </el-table>
                </el-col>
                <h1></h1>
                <h4 class="borrowFrom-h4">新增寄存</h4>
                <el-form ref="form" :inline="true" :model="form" size="mini" label-width="90px">
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
                        <el-form-item label="寄存操作员">
                            <el-input v-model="form.createUserName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="凭证号" required>
                            <el-input v-model="form.voucherNo"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="租金">
                            <el-input v-model="form.price" :disabled="true"></el-input>
                        </el-form-item> -->
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="寄存时间">
                            <el-date-picker type="datetime" placeholder="租借时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.beginDate" :disabled="true"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="寄存内容" required>
                            <el-input v-model="form.details"></el-input>
                        </el-form-item>
                         <el-form-item label="备注">
                            <el-input v-model="form.remark"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="租借物" required>
                            <el-select v-model="form.itemsPk" placeholder="请选择租借物" @change="changeItems">
                                <el-option v-for="y in rentalItemArr" :key="y.itemsPk" :label="y.itemsName" :value="y.itemsPk"></el-option>
                            </el-select>
                        </el-form-item> -->
                        
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="领取时间">
                            <el-date-picker type="datetime" placeholder="归还时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.endDate" :disabled="true"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="领取操作员">
                            <el-input v-model="form.endUserName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" style="text-align: center;">
                        <el-form-item>
                            <el-button type="primary" @click="btnAdd" :disabled="currRow!=null">增加</el-button>
                            <el-button type="primary" @click="giveBack" :disabled="!(this.currRow!=null && this.currRow.status=='UNCLAIM')">领取</el-button>
                            <!-- <el-button type="primary" @click="payfor" :disabled="!(this.currRow!=null && this.currRow.status=='NORETURN')">赔偿</el-button> -->
                            <el-button type="primary" @click="cancel" :disabled="!(this.currRow!=null && this.currRow.status=='UNCLAIM')">取消</el-button>
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
import { depositMap } from "@/utils/orm";
import { formatDate } from "@/utils/index";
import {
  guestSelect,
  addGM,
  listCondition,
  editFinish,
  cancelGM,
  // payfor
} from "@/api/goods/goodsManageController";
// import { listRentalItems } from "@/api/systemSet/roomSetting/pmsRentalItemsController";
export default {
  data() {
    return {
      depositMap: depositMap,
      dialogBorrow: false,
      currOrderPk: "", //主订单主键
      currRow: null, //当前选中的行
      form: {
        // currGoodsPk: "" //当前选中的物品管理条目主键
      },
      searchForm: {},
      tableData: [],
      guestSelectArr: [],
      // rentalItemArr: []
    };
  },
  methods: {
    /**
     * 初始化
     * @augments orderPk 主订单主键 */
    init(orderPk) {
      this.dialogBorrow = true;
      this.currOrderPk = orderPk;
      guestSelect({ orderPk: orderPk, typeEnum: "JC" }).then(res => {
        this.guestSelectArr = res.data;
      });
      // listRentalItems().then(res => {
      //   this.rentalItemArr = res.data;
      // });
      //   this.form = {};
      this.searchForm = {
        status: ""
      };
      this.listTable();
      this.initForm();
    },
    listTable() {
      //查询，加载列表
      this.searchForm.orderPk = this.currOrderPk;
      this.searchForm.type = "JC";
      listCondition(this.searchForm).then(res => {
        this.tableData = res.data;
        this.initForm();
      });
    },
    initForm() {
      //初始化提交表单
      this.currRow = null;
      this.form = {};
      this.form.orderPk = this.currOrderPk;
      this.form.createUserName = JSON.parse(localStorage.getItem('pms_userinfo')).upmsUserName;
      this.form.beginDate = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.form.type = "JC";
      this.form.status = "UNCLAIM";

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
    // changeItems(itemsPk) {
    //   //选择租借物改变
    //   this.rentalItemArr.forEach(item => {
    //     if (item.itemsPk == itemsPk) {
    //       this.form.price = item.itemsPrice;
    //     }
    //   });
    // },
    btnAdd() {
      if (!this.form.guestOrderPk) {
        this.$message({ type: "warning", message: "请先选择客单号！" });
        return;
      }
      if (!this.form.voucherNo) {
        this.$message({ type: "warning", message: "请填写凭证号！" });
        return;
      }
      if (!this.form.details) {
        this.$message({ type: "warning", message: "请填写寄存内容！" });
        return;
      }
      //增加寄存
      this.$confirm("寄存确认？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        addGM(this.form).then(res => {
          this.$message({ type: "success", message: "添加成功" });
          this.listTable();
          this.initForm();
        });
      });
    },
    tableRowClick(row, event, column) {
      //单击 table
      //   console.log(row);
      this.currRow = row;
      this.form = row;
      this.form.guestOrderPk = null;
    },
    giveBack() {
      //领取
      this.$confirm("确认领取？")
        .then(_ => {
          let data = {
            goodsPk: this.currRow.goodsPk,
            type: "JC"
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
      this.$confirm("确认取消寄存？")
        .then(_ => {
          let data = {
            goodsPk: this.currRow.goodsPk,
            type: "JC"
          };
          cancelGM(data).then(res => {
            this.$message({ type: "success", message: "取消成功" });
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
      this.dialogBorrow = false;
      bus.$emit("togmcount");
    }
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



