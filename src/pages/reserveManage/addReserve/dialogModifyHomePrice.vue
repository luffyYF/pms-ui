// 修改合约价
<template>
  <div>
    <el-dialog class="son-dialog" title="修改房价" :visible.sync="dialogModifyHomePrice" width="60%" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container" style="padding: 0px 4px;">
        <el-col :span="24">
          <el-table :data="tableData" border height="300" style="width: 100%" @selection-change="changeCheck" @row-click="rowClick">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="rentPrice" label="房租（元）"></el-table-column>
            <el-table-column prop="promotionPrice" label="促销价（元）"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="roomTypeName" label="房型"></el-table-column>
            <el-table-column prop="personNames" label="姓名"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span>{{contractMap[scope.row.status]}}</span>
              </template>
            </el-table-column>
          </el-table>
          <span style="margin-top: 10px;display: block;text-align: right;">
            <!-- <el-button size="mini" type="primary" @click="cancelContract">取消合约</el-button> -->

          </span>
        </el-col>
        <el-col :span="24" style="margin: 10px 0;">
          <el-tabs type="border-card" v-model="activeName">

            <!-- <el-tab-pane label="添加合约" name="tab-add">
                            <el-form :inline="true" :model="addForm" size="mini" class="demo-form-inline">
                                <el-col :span="24">
                                    <el-form-item label="房号" required>
                                        <el-select v-model="addForm.guestOrderPk" placeholder="请选择客单号" @change="changeGuestSelect">
                                            <el-option v-for="y in guestSelectArr" :key="y.guestOrderPk" :label="'房间号：'+y.roomNumber+'  客人姓名：'+y.memName" :value="y.guestOrderPk"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="渠道">
                                        <el-input v-model="addForm.channelTypeName" :disabled="true" placeholder="渠道名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="原因">
                                        <el-select v-model="addForm.region" placeholder="原因" :disabled="true">
                                            <el-option label="入住房合租" value="shanghai"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="日期">
                                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="addForm.date" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="房价">
                                        <el-input v-model="addForm.rentPrice"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备注">
                                        <el-input v-model="addForm.remark"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="addContract">添加合约</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </el-tab-pane> -->

            <el-tab-pane label="修改合约" name="tab-modify">
              <el-form :inline="true" :model="modifyForm" size="mini" class="demo-form-inline">
                <el-col :span="24">
                  <!-- <el-form-item label="渠道">
                                        <el-input v-model="modifyForm.channelTypeName" :disabled="true" placeholder="渠道名称"></el-input>
                                    </el-form-item> -->
                  <!-- <el-form-item label="日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="modifyForm.date" style="width: 100%;" :disabled="true"></el-date-picker>
                                    </el-form-item> -->
                </el-col>
                <el-col :span="24">
                  <!-- <el-form-item label="原因">
                                        <el-select v-model="modifyForm.region" placeholder="原因" :disabled="true">
                                            <el-option label="入住房合租" value="shanghai"></el-option>
                                            <el-option label="房价调整" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item> -->
                  <el-form-item label="房租">
                    <!-- <el-input v-model="modifyForm.rentPrice"></el-input> -->
                    <el-input-number v-model="modifyForm.rentPrice" :controls="false" :min="0"></el-input-number>
                  </el-form-item>
                  <el-form-item label="促销价">
                    <!-- <el-input v-model="modifyForm.promotionPrice"></el-input> -->
                    <el-input-number v-model="modifyForm.promotionPrice" :controls="false" :min="0"></el-input-number>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="modifyForm.remark"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="modifyContract">修改价格</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import { contractMap } from "@/utils/orm";
import {
  // guestSelect,
  addContract,
  listContract,
  cancelContract,
  modifyContract
} from "@/api/order/pmsContractControll";
export default {
  data() {
    return {
      activeName: "",
      currOrderPk: "",
      currGuestOrderPk: '',
      contractMap: contractMap,
      dialogModifyHomePrice: false,
      tableData: [],
      modifyForm: {
        channelTypeName: null,
        date: null,
        rentPrice: null,
        promotionPrice: null,
        remark: null
      },
      addForm: {
        channelTypeName: null,
        guestOrderPk: null,
        date: null,
        rentPrice: null
      },
      // guestSelectArr: [],
      selectionRows: [] //已勾选的数据
    };
  },
  methods: {
    /**
     * 初始化
     * @augments orderPk 主订单主键 */
    init(orderPk, guestOrderPk) {
      this.activeName = "tab-modify";
      this.dialogModifyHomePrice = true;
      this.currOrderPk = orderPk;
      this.currGuestOrderPk = guestOrderPk;
      this.initAddForm();
      this.initModifyForm();
      // guestSelect({ orderPk: orderPk, type: 1 }).then(res => {
      //   this.guestSelectArr = res.data;
      // });
      this.initTable();
    },
    /**
     * 窗口关闭
     * @augments */
    handleClose(done) {
      this.dialogModifyHomePrice = false;
      bus.$emit("refreshOrderInfo", this.currOrderPk);
    },
    initTable() {
      listContract({ orderPk: this.currOrderPk, guestOrderPk: this.currGuestOrderPk }).then(res => {
        this.tableData = res.data;
      });
    },
    initAddForm() {
      this.addForm.guestOrderPk = null;
      this.addForm.channelTypeName = null;
      this.addForm.date = null;
      this.addForm.rentPrice = null;
      this.addForm.remark = null;
    },
    initModifyForm() {
      this.modifyForm.channelTypeName = null;
      this.modifyForm.date = null;
      this.modifyForm.rentPrice = 0;
      this.modifyForm.promotionPrice = 0;
      this.modifyForm.remark = null;
    },

    // changeGuestSelect(guestOrderPk) {
    //   //选择客单改变
    //   this.guestSelectArr.forEach(guestSel => {
    //     if (guestSel.guestOrderPk == guestOrderPk) {
    //       this.initAddForm();
    //       this.addForm.guestOrderPk = guestSel.guestOrderPk;
    //       this.addForm.rentPrice = guestSel.price;
    //       this.addForm.date = guestSel.beginDate.substring(0, 10);
    //       this.addForm.channelTypeName = guestSel.channelTypeName;
    //       //   this.addForm.roomPk = guestSel.roomPk;
    //       //   this.addForm.roomNumber = guestSel.roomNumber;
    //     }
    //   });
    // },
    changeCheck(val) {
      //勾选触发
      this.selectionRows = val;
    },
    rowClick(row, event, column) {
      //单击Table
      this.modifyForm.channelTypeName = row.channelTypeName;
      this.modifyForm.date = row.date;
      this.modifyForm.rentPrice = row.rentPrice;
      this.modifyForm.promotionPrice = row.promotionPrice;
      this.modifyForm.remark = row.remark;

    },
    addContract() {
      //添加合约
      if (!this.addForm.guestOrderPk) {
        this.$message({ type: "warning", message: "房号不能为空！" });
        return;
      }
      if (!this.addForm.date) {
        this.$message({ type: "warning", message: "日期不能为空！" });
        return;
      }
      if (!this.addForm.price) {
        this.$message({ type: "warning", message: "价格不能为空！" });
        return;
      }
      this.addForm.rentPrice = Number(this.addForm.rentPrice);
      addContract(this.addForm).then(res => {
        this.$message({ type: "success", message: "添加成功" });
        this.init(this.currOrderPk);
      });
    },
    cancelContract() {
      //取消合约
      this.$confirm("是否取消选中的合约?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = [];
        this.selectionRows.forEach(row => {
          data.push({ contractPk: row.contractPk });
        });
        cancelContract(data).then(res => {
          this.init(this.currOrderPk);
          this.$message({ type: "success", message: "取消成功" });
        });
      });
    },
    modifyContract() {
      //修改合约
      if (this.selectionRows.length <= 0) {
        this.$message({ type: "warning", message: "请先勾选合约" });
        return;
      }
      this.$confirm("确定修改吗？房租："+this.modifyForm.rentPrice+"，促销价："+this.modifyForm.promotionPrice, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = [];
        this.selectionRows.forEach(row => {
          let obj = {
            contractPk: row.contractPk,
            rentPrice: Number(this.modifyForm.rentPrice),
            promotionPrice: Number(this.modifyForm.promotionPrice),
            remark: this.modifyForm.remark
          };
          data.push(obj);
        });
        modifyContract(data).then(res => {
          this.init(this.currOrderPk);
          this.$message({ type: "success", message: "修改成功" });
        });
      });
    }
  }
};
</script>

<style>

</style>
