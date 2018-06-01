<template>
  <div class="bg-server">
    <el-form ref="form" :inline="true" :model="form1" border size="mini" label-width="80px">
      <el-form-item label="外借状态">
        <el-select v-model="form.region" placeholder="请选择外借状态">
          <el-option label="未归还" value="shanghai"></el-option>
          <el-option label="归还" value="beijing"></el-option>
          <el-option label="赔偿" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租借时间">
        <el-date-picker v-model="datepicker1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="外借房号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="客人姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="归还时间">
        <el-date-picker v-model="datepicker2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="查询全部" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查找</el-button>
      </el-form-item>
    </el-form>
    <p style="margin-top:0;color:red;">*双击表格可进行操作</p>
    <el-table :data="goodsList" border height="300" style="width: 100%" v-loading="loading" empty-text="未查到当前有物品外借"  @row-dblclick="cellClickHandle">							
      <el-table-column prop="orderGuestNo" align="center" label="客单号" width="140" ></el-table-column>
      <el-table-column prop="roomNumber" align="center" label="房号" width="90"></el-table-column>
      <el-table-column prop="voucherNo" align="center" width="140" label="凭证号"></el-table-column>
      <el-table-column prop="guestName" align="center" label="姓名" width="80"></el-table-column>
      <el-table-column prop="price" align="center" label="租金" width="80"></el-table-column>
      <el-table-column prop="beginDate" align="center" width="200" label="租借时间"></el-table-column>
      <el-table-column prop="createUserName" align="center" label="租借操作员" width="100"></el-table-column>
      <el-table-column prop="itemsName" align="center" label="租借物品" min-width="130"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{letoutMap[scope.row.status]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form"  :model="form" border size="mini" label-width="80px">
      <el-row class="top20">
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="客人姓名">
              <el-input v-model="form.guestName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记人">
              <el-input v-model="form.createUserName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="租金">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="租借时间">
              <el-input v-model="form.beginDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="租借物">
              <el-input v-model="form.itemsName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证号">
              <el-input v-model="form.voucherNo"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="归还人">
              <el-input v-model="form.endUserName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归还时间">
              <el-input v-model="form.endDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item class="form-item-center">
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''" @click="giveBack">归还</el-button>
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''" @click="payFor">赔偿</el-button>
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''" @click="cancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {letoutMap} from '@/utils/orm'
import {
  pmsGoodsAdd,
  pmsGoodsDel,
  pmsGoodsList,
  pmsGoodsUpdate,
  pmsGoodsEditFinish,
  pmsGoodsPayfor,
  pmsGoodsCancel,
  pmsGoodsListCondition
} from "@/api/atrialCenter/goodsManageController";
export default {
  created() {
    this.selectGoods();
  },
  data() {
    return {
      letoutMap: letoutMap,
      goodsList: [],
      form: {},
      form1: {},
      tableData: [],
      datepicker1: "",
      datepicker2: ""
    };
  },
  methods: {
    selectGoods() {
      this.loading = true;
      pmsGoodsListCondition({ type: "WJ" })
        .then(res => {
          this.loading = false;
          if (res.code == 1) {
            this.goodsList = res.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    cellClickHandle(row) {
      this.form = row;
    },
    giveBack() {
      this.$confirm("确定归还？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.status = "RETURN";
          pmsGoodsEditFinish(this.form).then(res => {
            if (res.code == 1) {
              this.$message.success("归还成功");
              this.form = {};
            } else {
              this.$message.error(res.msg);
            }
            this.selectGoods();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    payFor() {
      this.$confirm("确定赔偿？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.status = "PAYFOR";
          pmsGoodsPayfor(this.form).then(res => {
            if (res.code == 1) {
              this.$message.success("赔偿成功");
              this.form = {};
            } else {
              this.$message.error(res.msg);
            }
            this.selectGoods();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    cancel(){
      this.$confirm("取消外借？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pmsGoodsCancel(this.form).then(res => {
            if (res.code == 1) {
              this.$message.success("取消成功");
              this.form = {};
            } else {
              this.$message.error(res.msg);
            }
            this.selectGoods();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style scoped>
.line,
.form-item-center {
  text-align: center;
}
.top20 {
  margin-top: 20px;
}
.bg-server {
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding: 15px;
  width: 1000px;
}
/* .height-programme-one .el-tabs .el-tabs__content{
  height: calc(100% - 70px);
  overflow-y: auto;
} */
</style>
