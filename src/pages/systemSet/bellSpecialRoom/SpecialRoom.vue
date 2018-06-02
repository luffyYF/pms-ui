<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">特殊房设置</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addRoom">添加特殊房</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        style="width: 98%; margin:10px;">
        <el-table-column prop="roomRuleName" label="方案名称" align="center" width="90">
        </el-table-column>
        <el-table-column prop="billingMethod" label="计费方式" align="center" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.billingMethod == 1">小时计费</span>
            <span v-if="scope.row.billingMethod == 2">时段计费</span>
            <span v-if="scope.row.billingMethod == 3">全天计费</span>
            <span v-if="scope.row.billingMethod == 4">午夜计费</span>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" align="center" width="90">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center" width="90">
        </el-table-column>
        <el-table-column prop="exceedTime" label="最晚停留" align="center" width="90">
        </el-table-column>
        <el-table-column prop="checkInLongNum" label="超时转正常入住" align="center" width="120">
        </el-table-column>
        <el-table-column prop="remindTimeNum" label="提前提醒" align="center" width="90">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="modifyRoom(scope.row)" type="text" size="mini">修改特殊房</el-button>
            <el-button @click="deleteRoom(scope.row)" type="text" size="mini">删除特殊房</el-button>
            <el-button @click="disableRoom(scope.row)" type="text" size="mini">{{scope.row.usingFlag == "Y"?'停用特殊房':'激活特殊房'}}</el-button>
            <el-button @click="setPrice(scope.row)" type="text" size="mini">房价设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加特殊房" width="600px" :visible.sync="dialogTableVisible" class="dialogss">
      <el-form v-model="form" size="mini"  style="width: 100%;">
        <el-form-item label="方案名称：" :label-width="formLabelWidth">
          <el-input v-model="form.roomRuleName" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="计费方式：" :label-width="formLabelWidth">
          <el-select @change="changeBillingMethod" v-model="form.billingMethod" placeholder="请选择计费方式" :disabled="form.isModify">
            <el-option label="小时计费" value="1"></el-option>
            <el-option label="时段计费" value="2"></el-option>
            <el-option label="全天计费" value="3"></el-option>
            <el-option label="午夜计费" value="4"></el-option>
          </el-select>
        </el-form-item>
        <p v-if="form.billingMethod == 4" style="color:red;">*注：午夜计费方式会在夜审时生成一笔相应的夜核房费。</p>
        <div v-if="form.billingMethod == 2">
          <el-form-item label="跨天：" :label-width="formLabelWidth">
            <el-input v-model="form.interDay" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="时间段：" :label-width="formLabelWidth">
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
        </div>
        <div v-if="form.billingMethod == 1 || form.billingMethod == 2">
          <el-form-item label="最晚停留时间：" :label-width="formLabelWidth">
            <el-time-picker
              v-model="form.exceedTime"
              value-format="HH:mm:ss"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="提前提醒：" :label-width="formLabelWidth">
            <el-input v-model="form.remindTimeNum" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="计费缓冲时间：" :label-width="formLabelWidth">
            <el-input v-model="form.bufferTime" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-checkbox v-model="checkExceedTime">超出最晚停留时间是否转为正常入住</el-checkbox>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
              特殊房超过&nbsp;&nbsp;<el-input v-model="form.checkInLongNum" class="jiage" auto-complete="off" clearable></el-input>&nbsp;分钟自动转为正常入住
          </el-form-item>
        </div>
        <div v-if="form.billingMethod == 4">
          <el-form-item label="入住时间控制:" :label-width="formLabelWidth">
            <el-time-picker
            v-model="form.beginTime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
            </el-time-picker>
            至
            <el-time-picker
            :disabled="form.billingMethod == 4"
            v-model="form.endTime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </div>
        <p style="color:red">*（如果起步时间为180分钟，缓冲：20分钟,则真正计费的起步时间是200分钟，超过的时间顺延。）</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAdd" v-if="!form.isModify">确定</el-button>
        <el-button type="primary" @click="submitModify" v-if="form.isModify">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="特殊房房价设置" width="1000px" :visible.sync="dialogSpecialVisible">
      <el-button type="primary" size="mini" @click="addSchemePrice" style="margin-bottom:10px;">增加特殊房价</el-button>
      <el-table
        :data="tableData1"
        border
        style="width:100%">
        <el-table-column
          prop="date"
          align="center"
          width="100px"
          label="房型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.roomTypePk" :disabled="!scope.row.isNew" style="width:80px" size="mini" placeholder="请选择">
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
          width="110"
          label="方案名称">
          <template slot-scope="scope">
              <el-input  v-model="scope.row.schemeName" size="mini" placeholder="请输入方案名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            width="110"
            align="center"
            label="起步时间">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.startTime"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            width="110"
            align="center"
            label="起步价格">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.startPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
          prop="name"
          width="110"
          align="center"
          label="标准计费时间">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.standardBillingTime"></el-input>
            </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="110"
          align="center"
          label="标准计费金额">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.standardBillingPrice" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          width="110"
          align="center"
          label="最小计费时间">
            <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.minimumBillingTime" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="110"
          align="center"
          label="最小计费金额">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.minimumBillingPrice" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"      
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="saveShemePrice(scope.row)" type="text" size="mini">保存</el-button>
            <el-button @click="delSchemePeice(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  roomRuleAdd,
  roomRuleDel,
  roomRuleHour,
  roomRuleUpdate,
  roomRuleSchemeUpdate,
  roomRuleSpecial,
  roomRuleSchemeList,
  roomRuleSchemeAdd,
  roomRuleSchemeDel
} from "@/api/systemSet/pmsRoomRuleController";
import { listType } from "@/api/utils/pmsTypeController";
export default {
  created() {
    this.selectSpecialList();
  },
  methods: {
    init() {
      this.selectSpecialList();
      this.selectRoomType();
    },
    selectSpecialList() {
      roomRuleSpecial().then(res => {
        if (res.code == 1) {
          this.tableData = res.data;
          console.log(this.tableData);
        }
      });
    },
    submitAdd() {
      this.checkExceedTime
        ? (this.form.exceedTimeFlag = "Y")
        : (this.form.exceedTimeFlag = "N");
      console.log(this.form);
      if (this.verification(this.form)) {
        roomRuleAdd(this.form).then(res => {
          if (res.code == 1) {
            this.$message.success("保存成功");
            this.dialogTableVisible = false;
            this.initialization();
          } else {
            this.$message.error(res.msg);
          }
          this.selectSpecialList();
        });
      }
    },
    verification(obj) {
      var content = "";
      if (obj.roomRuleName == "") {
        content = "方案名称不能为空";
      }
      if (content != "") {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    changeBillingMethod() {
      if (this.form.billingMethod == 4) {
        this.form.endTime = "01:00:00";
      } else {
        this.form.endTime = null;
      }
    },
    modifyRoom(row) {
      console.log(row);
      this.form = row;
      console.log(this.form);
      this.form.isModify = true;
      this.dialogTableVisible = true;
      this.form.billingMethod = this.form.billingMethod.toString();
    },
    addRoom() {
      this.dialogTableVisible = true;
      this.initialization();
    },
    initialization() {
      this.form = {
        billingMethod: "1",
        bufferTime: null,
        checkInLongNum: null,
        exceedTime: null,
        exceedTimeFlag: "Y",
        remindTimeNum: null,
        roomRuleName: null,
        interDay: null,
        beginTime: null,
        endTime: null,
        usingFlag: "Y"
      };
    },
    submitModify() {
      roomRuleUpdate(this.form).then(res => {
        if (res.code == 1) {
          this.$message.success("修改成功");
          this.dialogTableVisible = false;
        } else {
          this.$message.error(res.msg);
        }
        this.selectSpecialList();
      });
    },
    deleteRoom(row) {
      this.$confirm("此操作将永久删除该特殊房方案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          roomRuleDel(row).then(res => {
            if (res.code == 1) {
              this.$message.success("删除成功");
            } else {
              this.$message.error(res.msg);
            }
            this.selectSpecialList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    disableRoom(row) {
      var msg = row.usingFlag == "Y" ? "停用该方案？" : "激活该方案？";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.usingFlag == "Y" ? (row.usingFlag = "N") : (row.usingFlag = "Y");
          roomRuleUpdate(row).then(res => {
            if (res.code == 1) {
              this.$message.success("操作成功");
            } else {
              this.$message.error(res.msg);
            }
            this.selectSpecialList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    setPrice(row) {
      console.log(row);
      this.dialogSpecialVisible = true;
      this.roomRulePk = row.roomRulePk;
      this.selectRoomRuleSchemeList();
    },
    selectRoomRuleSchemeList() {
      roomRuleSchemeList({ roomRulePk: this.roomRulePk }).then(res => {
        if (res.code == 1) {
          this.tableData1 = res.data;
          console.log(this.tableData1);
        }
      });
    },
    selectRoomType() {
      listType({ typeMaster: "ROOM_TYPE" }).then(res => {
        if (res.code == 1) {
          this.roomTypeList = res.data;
        }
      });
    },
    addSchemePrice() {
      var item = {
        roomRulePk: this.roomRulePk,
        isNew: true,
        roomTypePk: "",
        schemeName: "",
        startTime: "",
        startPrice: "",
        standardBillingTime: "",
        standardBillingPrice: "",
        minimumBillingTime: "",
        minimumBillingPrice: ""
      };
      this.tableData1.push(item);
    },
    saveShemePrice(row) {
      console.log(row);
      if (this.verification(row)) {
        if (row.isNew) {
          roomRuleSchemeAdd(row).then(res => {
            if (res.code == 1) {
              this.$message.success("添加成功");
            }
            this.selectRoomRuleSchemeList();
          });
        } else {
          roomRuleSchemeUpdate(row).then(res => {
            if (res.code == 1) {
              this.$message.success("修改成功");
            }
            this.selectRoomRuleSchemeList();
          });
        }
      }
    },
    verification(row) {
      var content = "";
      if (row.roomTypePk == "") {
        content = "房间类型不能为空";
      } else if (row.schemeName == "") {
        content = "价格方案名称不能为空";
      }
      if (content != "") {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    delSchemePeice(row) {
      this.$confirm(' 确定删除该房价方案？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          roomRuleSchemeDel(row).then(res => {
            if (res.code == 1) {
              this.$message.success("操作成功");
            } else {
              this.$message.error(res.msg);
            }
            this.selectRoomRuleSchemeList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    saveClick(row) {
      console.log(row);
    },
    deleteClick(row) {
      console.log(row);
    },
    addProtocolClick() {
      //添加协议类别
      this.tableData.unshift({ code: "", name: "", order: "", isNew: true });
    }
  },
  data() {
    return {
      checkExceedTime: true,
      formLabelWidth: "120px",
      form: {
        billingMethod: "1",
        bufferTime: null,
        checkInLongNum: null,
        exceedTime: null,
        exceedTimeFlag: "Y",
        remindTimeNum: null,
        roomRuleName: null,
        interDay: null,
        beginTime: null,
        endTime: null
      },
      dialogTableVisible: false,
      tableData: [],
      dialogSpecialVisible: false,
      tableData1: [],
      roomRulePk: "",
      roomTypeList: []
    };
  }
};
</script> 

<style scoped>
.el-input {
  width: 80px;
}
.el-Name {
  width: 120px;
}
.el-select {
  width: 70px;
}
.dialogss .el-select,
.dialogss .el-Name,
.dialogss .el-input {
  width: 208px;
}
.dialogss .jiage {
  width: 80px;
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
.add-pro {
  float: left;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
