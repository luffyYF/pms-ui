// 钟点房设置
<template>
  <div class="content-body">
    <el-form ref="form" :model="form" size="mini">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">钟点房基本参数设置</h5>
        <div class="info-li">
          <el-form-item>
            允许入住时间段设置
            <el-time-picker
            v-model="form.beginTime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
            </el-time-picker>
            至
            <el-time-picker
            v-model="form.endTime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
          <el-form-item>
            钟点房计费缓冲时间&nbsp;&nbsp;
            <el-input v-model="form.bufferTime" size="mini" clearable></el-input>
            &nbsp;&nbsp;分钟<span class="red">&nbsp;&nbsp;&nbsp;&nbsp;（*注：如果起步时间配置是180分钟，缓冲：20分钟,则真正计费的起步时间是200分钟，超过的时间顺延。）</span>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checkExceedTime"></el-checkbox>
            &nbsp;&nbsp;钟点房超过最晚停留时间&nbsp;&nbsp;
            <el-time-picker
            :disabled="!checkExceedTime"
            value-format="HH:mm:ss"
            v-model="form.exceedTime"
            placeholder="任意时间点">
            </el-time-picker>&nbsp;&nbsp;转为正常入住
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checkCheckInLongNum"></el-checkbox>
            &nbsp;&nbsp;钟点房入住超过&nbsp;&nbsp;
            <el-input v-model="form.checkInLongNum" size="mini" :disabled="!checkCheckInLongNum"></el-input>
            &nbsp;&nbsp;分钟自动转为正常入住
          </el-form-item>
          <!-- <el-form-item>
            <el-checkbox v-model="checkOverStartTime"></el-checkbox>
            &nbsp;&nbsp;钟点房入住超过起步时间&nbsp;&nbsp;
            <el-input size="mini" v-model="form.overStartTime" :disabled="!checkOverStartTime"></el-input>
            &nbsp;&nbsp;分钟自动转为正常入住
          </el-form-item> -->
          <el-form-item>
            钟点房提前&nbsp;&nbsp;<el-input v-model="form.remindTimeNum" size="mini" clearable></el-input>&nbsp;&nbsp;分钟提醒操作员
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRuleHour" size="mini">确定</el-button>
            <el-button type="danger" size="mini">取消</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- table -->
   
      <div class="bg-reserve">
        <h5 class="info-title">钟点房房价方案参数设置</h5>
        <el-button type="primary" size="mini" style="margin-left:20px;" @click="addRow(tableData)">添加钟点房房价方案</el-button>
        <div class="info-li">
          <el-table
            :data="tableData"
            border
            style="width:100%">
            <el-table-column
              prop="date"
              align="center"
              width="140px"
              label="房型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.roomTypePk" :disabled="!scope.row.isNew" style="width:120px" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in roomTypeList"
                    :key="item.value"
                    :label="item.typeName"
                    :value="item.typePk">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="方案名称">
              <template slot-scope="scope">
                  <el-input  v-model="scope.row.schemeName" size="mini" placeholder="请输入方案名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="起步时间">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.startTime"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="起步价格">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.startPrice"></el-input>
                </template>
              </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="标准计费时间">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.standardBillingTime"></el-input>
                </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="标准计费金额">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.standardBillingPrice" ></el-input>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="date"
              align="center"
              label="最小计费时间">
               <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.minimumBillingTime" ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="最小计费金额">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.minimumBillingPrice" ></el-input>
              </template>
            </el-table-column> -->
            <el-table-column
              fixed="right"      
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
                <el-button @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>

<script>
import {
  roomRuleHour,
  roomRuleUpdate,
  roomRuleSchemeAdd,
  roomRuleSchemeDel,
  roomRuleSchemeList,
  roomRuleSchemeUpdate
} from "@/api/systemSet/pmsRoomRuleController";
import { listType } from "@/api/utils/pmsTypeController";
export default {
  data() {
    return {
      form: {},
      checkExceedTime: true,
      checkCheckInLongNum: true,
      checkOverStartTime: true,
      rulePk: "",
      tableData: [],
      roomTypeList: [],

      value1: new Date(),
      value2: new Date(),
      checked: true,

      value1: "",
      options: []
    };
  },
  created() {
    this.selectRuleHour();
    this.selectRoomType();
  },
  methods: {
    selectRuleHour() {
      roomRuleHour().then(res => {
        this.form = res.data;
        this.rulePk = this.form.rulePk;
        this.form.exceedTimeFlag == "N"
          ? (this.checkExceedTime = false)
          : (this.checkExceedTime = true);
        this.form.checkInLongNumFlag == "N"
          ? (this.checkCheckInLongNum = false)
          : (this.checkCheckInLongNum = true);
        this.form.overStartTimeFlag == "N"
          ? (this.checkOverStartTime = false)
          : (this.checkOverStartTime = true);
        this.selectSchemeList();
      });
    },
    selectSchemeList() {
      roomRuleSchemeList({ rulePk: this.rulePk }).then(res => {
        if (res.code == 1) {
          this.tableData = res.data;
        }
      });
    },
    selectRoomType() {
      this.roomTypeList = []
      var typeList = JSON.parse(localStorage.getItem("pms_type"))
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE"){
          this.roomTypeList.push(item);
        }
      })
    },
    submitRuleHour() {
      this.checkExceedTime
        ? (this.form.exceedTimeFlag = "Y")
        : (this.form.exceedTimeFlag = "N");
      this.checkCheckInLongNum
        ? (this.form.checkInLongNumFlag = "Y")
        : (this.form.checkInLongNumFlag = "N");
      this.checkOverStartTime
        ? (this.form.overStartTimeFlag = "Y")
        : (this.form.overStartTimeFlag = "N");
      roomRuleUpdate(this.form).then(res => {
        if (res.code == 1) {
          this.$message.success("保存成功");
        } else {
          this.$message.error(res.msg);
        }
        this.selectRuleHour();
      });
    },
    addRow(rows) {
      var item = {
        roomTypePk: "",
        schemeName: "",
        startTime: "",
        startPrice: "",
        standardBillingTime: "",
        standardBillingPrice: "",
        // minimumBillingTime: "",
        // minimumBillingPrice: "",
        isNew: true
      };
      this.tableData.push(item);
    },
    saveClick(row) {
      row.rulePk = this.rulePk;
      if (this.verification(row)) {
        if (row.isNew) {
          roomRuleSchemeAdd(row).then(res => {
            if (res.code == 1) {
              this.$message.success("保存成功");
            } else {
              this.$message.error(res.msg);
            }
            this.selectSchemeList();
          });
        } else {
          roomRuleSchemeUpdate(row).then(res => {
            if (res.code == 1) {
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.msg);
            }
            this.selectSchemeList();
          });
        }
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
      // else if (row.minimumBillingTime == "") {
      //   content = "请输入最小计费时间";
      // } else if (row.minimumBillingPrice == "") {
      //   content = "请输入最小计费价格";
      // }
      if (content != "") {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    deleteClick(row) {
      this.$confirm("此操作将永久删除该房价方案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          roomRuleSchemeDel(row).then(res => {
            if (res.code == 1) {
              this.$message.success("删除成功！");
            } else {
              this.$message.error(res.msg);
            }
            this.selectSchemeList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-input-number--mini {
  width: 110px;
}
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
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
