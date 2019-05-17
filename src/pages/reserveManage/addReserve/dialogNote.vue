// 留言
<template>
  <div>
    <el-dialog class="pattern-dialog" title="留言" :visible.sync="dialogBorrow" width="80%" :append-to-body="true" :before-close="toClose">
      <div class="pattern-dialog-container">
        <h4 class="borrowFrom-h4">留言记录</h4>
        <el-form ref="searchForm" :inline="true" :model="searchForm" size="mini" label-width="80px">
          <el-col :span="24">
            <el-form-item label="留言状态">
              <el-select v-model="searchForm.status">
                <el-option label="留言状态" value=""></el-option>
                <el-option v-for="(val, key, index) in noteMap" :key="key" :label="val" :value="key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="留言人名">
              <el-input v-model="searchForm.msgPerson"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名">
              <el-input v-model="searchForm.guestName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="房号">
              <el-input v-model="searchForm.roomNumber"></el-input>
            </el-form-item>
            <el-form-item label="登记时间">
              <el-date-picker type="date" placeholder="登记时间" value-format="yyyy-MM-dd" v-model="searchForm.beginDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="读取时间">
              <el-date-picker type="date" placeholder="读取时间" value-format="yyyy-MM-dd" v-model="searchForm.endDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="listTable">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%" @row-click="tableRowClick" :row-class-name="tableRowClassName">
            <!-- <el-table-column prop="orderGuestNo" label="客单号"></el-table-column> -->
            <el-table-column prop="roomNumber" label="房号" width="180"></el-table-column>
            <el-table-column prop="guestName" label="客人姓名"></el-table-column>
            <el-table-column prop="msgPerson" label="留言人"></el-table-column>
            <el-table-column prop="beginDate" label="登记时间"></el-table-column>
            <el-table-column prop="createUserName" label="登记人"></el-table-column>
            <!-- <el-table-column prop="voucherNo" label="凭证号"></el-table-column> -->
            <el-table-column prop="details" label="留言内容"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span>{{noteMap[scope.row.status]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <h1></h1>
        <h4 class="borrowFrom-h4">新增留言</h4>
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
            <el-form-item label="留言人">
              <el-input v-model="form.msgPerson"></el-input>
            </el-form-item>
            <el-form-item label="登记员">
              <el-input v-model="form.createUserName" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item label="凭证号" required>
                            <el-input v-model="form.voucherNo"></el-input>
                        </el-form-item> -->
          </el-col>
          <el-col :span="24">
            <el-form-item label="登记时间">
              <el-date-picker type="datetime" placeholder="登记时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.beginDate" :disabled="true"></el-date-picker>
            </el-form-item>
            <el-form-item label="修改人">
              <el-input v-model="form.updateUserName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="修改时间">
              <el-date-picker type="datetime" placeholder="修改时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.updateTime" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="读取人">
              <el-input v-model="form.endUserName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="读取时间">
              <el-date-picker type="datetime" placeholder="读取时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.endDate" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="留言内容">
              <el-input v-model="form.details"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="消息类别">
              <el-radio-group v-model="form.msgType">
                <el-radio v-for="(val, key, index) in msgTypeMap" :key="key" :label="key">{{val}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: center;">
            <el-form-item>
              <el-button type="primary" @click="btnAdd" :disabled="currRow!=null">增加</el-button>
              <el-button type="primary" @click="editNote" :disabled="!(this.currRow!=null && this.currRow.status=='NOREAD')">修改</el-button>
              <el-button type="primary" @click="giveBack" :disabled="!(this.currRow!=null && this.currRow.status=='NOREAD')">读取</el-button>
              <el-button type="primary" @click="cancel" :disabled="!(this.currRow!=null && this.currRow.status=='NOREAD')">取消</el-button>
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
import bus from "@/utils/bus";
import { noteMap, msgTypeMap } from "@/utils/orm";
import { formatDate } from "@/utils/index";
import {
  guestSelect,
  addGM,
  listCondition,
  editFinish,
  cancelGM,
  editNote
} from "@/api/goods/goodsManageController";
export default {
  data() {
    return {
      noteMap: noteMap,
      msgTypeMap: msgTypeMap,
      dialogBorrow: false,
      currOrderPk: "", //主订单主键
      currRow: null, //当前选中的行
      form: {},
      searchForm: {},
      tableData: [],
      guestSelectArr: []
    };
  },
  methods: {
    /**
     * 初始化
     * @augments orderPk 主订单主键 */
    init(orderPk) {
      this.dialogBorrow = true;
      this.currOrderPk = orderPk;
      guestSelect({ orderPk: orderPk, typeEnum: "LY" }).then(res => {
        this.guestSelectArr = res.data;
      });
      this.searchForm = {
        status: ""
      };
      this.listTable();
      this.initForm();
    },
    listTable() {
      //查询，加载列表
      this.searchForm.orderPk = this.currOrderPk;
      this.searchForm.type = "LY";
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
      this.form.createUserName = JSON.parse(localStorage.getItem('pms_userinfo')).realName;
      this.form.beginDate = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.form.type = "LY";
      this.form.status = "NOREAD";
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
    btnAdd() {
      if (!this.form.guestOrderPk) {
        this.$message({ type: "warning", message: "请先选择客单号！" });
        return;
      }
      if (!this.form.msgPerson) {
        this.$message({ type: "warning", message: "请填写留言人！" });
        return;
      }
      //增加寄存
      this.$confirm("留言确认？", "提示", {
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
      //读取
      this.$confirm("确认读取？")
        .then(_ => {
          let data = {
            goodsPk: this.currRow.goodsPk,
            type: "LY"
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
      this.$confirm("确认取消留言？")
        .then(_ => {
          let data = {
            goodsPk: this.currRow.goodsPk,
            type: "LY"
          };
          cancelGM(data).then(res => {
            this.$message({ type: "success", message: "取消成功" });
            this.listTable();
            this.initForm();
          });
        })
        .catch(_ => {});
    },
    editNote() {
      // 修改留言
      this.$confirm("是否修改？")
        .then(_ => {
          editNote(this.form).then(res => {
            this.listTable();
            this.initForm();
            this.$message({ type: "success", message: "修改成功" });
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



