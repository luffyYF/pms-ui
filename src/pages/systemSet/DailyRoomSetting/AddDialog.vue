// 钟点房设置
<template>
  <el-dialog
    title="正常入住标准"
    :visible.sync="dialogVisible"
    width="800px"
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <el-form
      ref="form"
      :model="form"
      size="mini"
      label-width="90px">
      <div class="bg-reserve">
        <h5 class="info-title">基础信息</h5>
        <div class="info-li">
          <el-form-item label="规则名称：">
            <el-input
              type="text"
              v-model="form.ruleName"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input
              type="text"
              v-model="form.remark"
              style="width:500px"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="bg-reserve">
        <h5 class="info-title">退房标准</h5>
        <div class="info-li">
          <el-form-item>
            <el-radio-group v-model="form.checkoutStandard">
              <el-radio :label="'FIXED'" border size="mini">固定时间退房模式</el-radio>
              <el-radio :label="'HOUR24'" border size="mini">24小时退房模式</el-radio>
              <el-radio :label="'HOUR24_ROLL'" border size="mini">24小时轮转计费退房模式</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            退房时间次日：
            <el-time-picker v-model="form.nextDayCheckoutTime" value-format="HH:mm:ss" :disabled="form.checkoutStandard!='FIXED'">
            </el-time-picker>
          </el-form-item>
        </div>
      </div>
      <div class="bg-reserve">
        <h5 class="info-title">计费标准</h5>
        <div class="info-li">

          <div v-if="form.checkoutStandard=='FIXED' || form.checkoutStandard=='HOUR24'">
            <el-form-item label="入住起步收费：" label-width="160px">
              <el-input type="text" v-model="form.beginNum" style="width:80px"></el-input>分钟收起步费，
              <el-input type="text" v-model="form.fullNum" style="width:80px"></el-input>分钟收全日房费
            </el-form-item>

            <el-form-item label="确定全日房费时间：" label-width="160px">
              <el-select v-model="form.confirmDailyFreeType" placeholder="请选择" style="width:100px">
                <el-option label="固定时间" value="FIXED"></el-option>
                <el-option label="入住后" value="CHECKIN"></el-option>
              </el-select>
              <el-time-picker v-if="form.confirmDailyFreeType=='FIXED'" v-model="form.confirmFixedTime" value-format="HH:mm:ss"></el-time-picker>
              <span v-if="form.confirmDailyFreeType=='CHECKIN'" >
                <el-input type="text" v-model="form.confirmCheckinNum" style="width:80px"></el-input>分钟
              </span>
            </el-form-item>

            <el-form-item label="退房超时收费：" label-width="160px">
              超过<el-input type="text" v-model="form.addedBufferNum" style="width:80px"></el-input>分钟开始加收。
              按<el-select v-model="form.addedType" placeholder="请选择" style="width:100px">
                  <el-option label="每小时" value="HOUR"></el-option>
                  <el-option label="半日租" value="HALF"></el-option>
                </el-select>加收。
                <el-radio v-if="form.addedType=='HOUR'" v-model="form.overtimeAddedTop" label="Y">加收封顶</el-radio>
            </el-form-item>

            <el-form-item label="加收全日租时间：" label-width="160px">
              <el-select v-model="form.addedDailyFreeType" placeholder="请选择" style="width:100px">
                <el-option label="固定时间" value="FIXED"></el-option>
                <el-option label="超过退房时间" value="OVERTIME"></el-option>
              </el-select>
              <el-time-picker v-if="form.addedDailyFreeType=='FIXED'" v-model="form.addedDailyFixedTime" value-format="HH:mm:ss" placeholder="开始时间"></el-time-picker>
              <span v-if="form.addedDailyFreeType=='OVERTIME'">
                <el-input type="text" v-model="form.addedDailyOvertimeNum" style="width:80px"></el-input>分钟
              </span>
            </el-form-item>

            <el-form-item label="确定加收全日租时间：" label-width="160px">
              <el-select v-model="form.confirmAddedDailyFreeType" placeholder="请选择" style="width:100px">
                <el-option label="固定时间" value="FIXED"></el-option>
                <el-option label="超过退房时间" value="OVERTIME"></el-option>
              </el-select>
              <el-time-picker v-if="form.confirmAddedDailyFreeType=='FIXED'" v-model="form.confirmAddedDailyFixedTime" value-format="HH:mm:ss" placeholder="开始时间">
              </el-time-picker>
              <span v-if="form.confirmAddedDailyFreeType=='OVERTIME'">
                <el-input type="text" v-model="form.confirmAddedDailyOvertimeNum" style="width:80px"></el-input>分钟
              </span>
            </el-form-item>
          </div>

          <div v-if="form.checkoutStandard=='HOUR24_ROLL'">
            <el-form-item label="起步房费有效时长：" label-width="160px">
              <el-input type="text" v-model="form.beginNum" style="width:80px"></el-input>分钟
            </el-form-item>
            <el-form-item label="超时按小时加收：" label-width="160px">
              <el-radio v-model="form.overtimeAddedTop" label="Y">是否加收封顶</el-radio>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-input type="text" v-model="form.fullNum" style="width:80px"></el-input>分钟，计全价房费
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <span slot="footer"  class="dialog-footer">
      <el-button size="mini" type="primary" @click="save" :loading="loading">保存</el-button>
      <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  dailyRoomRuleAdd,
  dailyRoomRuleFind,
  dailyRoomRuleUpdate
} from "@/api/systemSet/pmsDailyRoomController";
import { listType } from "@/api/utils/pmsTypeController";
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {
        rulePk: "",
        ruleName: "",
        remark: "",
        checkoutStandard: null,
        nextDayCheckoutTime: null,
        confirmDailyFreeType:null,
        addedType:null,
        addedDailyFreeType:null,
        beginNum:null,
        fullNum:null,
        confirmFixedTime:null,
        confirmCheckinNum:null,
        addedDailyFixedTime:null,
        addedDailyOvertimeNum:null,
        overtimeAddedTop:null,
      },
      tableData: [],
      roomTypeList: [],

      value1: new Date(),
      value2: new Date(),
      checked: true,

      value1: "",
      options: []
    };
  },
  methods: {
    showDialog(rulePk) {
      this.form.rulePk = rulePk;
      this.dialogVisible = true;
      if (rulePk) {
        //修改
        dailyRoomRuleFind(rulePk).then(res => {
          this.form = res.data
        });
      } else {
        //新增
        this.form.ruleName= ""
        this.form.remark= ""
        this.form.checkoutStandard='FIXED'
        this.form.nextDayCheckoutTime=null
        this.form.confirmDailyFreeType='FIXED'
        this.form.addedType='HALF'
        this.form.addedDailyFreeType='FIXED'
        this.form.beginNum=null
        this.form.fullNum=null
        this.form.confirmFixedTime=null
        this.form.confirmAddedDailyFreeType='FIXED'
        this.form.confirmCheckinNum=null
        this.form.addedDailyFixedTime=null
        this.form.addedDailyOvertimeNum=null
        this.form.overtimeAddedTop=null
      }
    },
    save() {
      this.loading = true;
      if (this.form.rulePk) {
        //更新
        dailyRoomRuleUpdate(this.form)
          .then(res => {
            this.$message.success("保存成功");
            this.loading = false;
            this.handleClose();
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        //添加
        dailyRoomRuleAdd(this.form)
          .then(res => {
            this.$message.success("保存成功");
            this.loading = false;
            this.handleClose();
          }).finally(() => {
            this.loading = false;
          });
      }
    },
    verification(row) {
      var content = "";
      if (row.roomTypePk == "") {
        content = "请选择房型";
      } else if (row.schemeName == "") {
        content = "请输入方案名称";
      } else if (row.startTime == "") {
        content = "请输入起步时间";
      } else if (row.startPrice == "") {
        content = "请输入起步价格";
      } else if (row.standardBillingTime == "") {
        content = "请输入标准计费时间";
      } else if (row.standardBillingPrice == "") {
        content = "请输入标准计费金额";
      }
      if (content != "") {
        this.$message.warning(content);
        return false;
      }
      return true;
    },
    deleteClick(index, row) {
      this.$set(this.tableData[index], "preChargePrice", null);
      this.$set(this.tableData[index], "standardBillingPrice", null);
      this.$set(this.tableData[index], "standardBillingTime", null);
      this.$set(this.tableData[index], "startPrice", null);
      this.$set(this.tableData[index], "startTime", null);
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("callback");
    }
  }
};
</script>

<style scoped>
.el-input-number--mini {
  width: 110px;
}
/* .content-body {
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
} */
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
.book-info {
  height: 537px;
}
.el-input {
  width: 80px;
}
.el-select {
  width: 178px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
  padding: 18px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 178px;
}
.red {
  color: red;
}
</style>
