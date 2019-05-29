// 停用房、维修房
<template>
  <section>
     <el-dialog
      class="pattern-dialog2"
      title="转维修房"
      :visible.sync="dialogRepairRoom"
      width="500px"
      :before-close="handleClose"
    >
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-form ref="repairForm" :model="repairForm" label-width="80px" size="mini">
          <el-form-item label="房号">
            <el-input v-model="repairForm.roomNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                placeholder="起始日期"
                v-model="repairForm.beginDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
                :disabled="true"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                placeholder="结束日期"
                v-model="repairForm.endDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-row class="no-bottom">
            <el-col :span="12">
              <el-form-item label="原因">
                <el-select v-model="repairForm.reasonTypePk" placeholder="选择原因">
                  <el-option
                    v-for="t in repairType"
                    :key="t.typePk"
                    :label="t.typeName"
                    :value="t.typePk"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="损坏级别">
                <el-select v-model="repairForm.level" placeholder="选择损坏级别">
                  <el-option label="0" value="0"></el-option>
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="是否提醒">
            <el-select v-model="repairForm.remindFlag">
              <el-option label="不提醒" value="N"></el-option>
              <el-option label="提醒" value="Y"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明">
            <el-input type="textarea" v-model="repairForm.remark"></el-input>
          </el-form-item>

          <el-row class="no-bottom">
            <el-col :span="12">
              <el-form-item label="设置人">
                <el-input v-model="repairForm.createUserName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解除人">
                <el-input v-model="repairForm.relieveName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="submitRoomReason('REPAIR')"
          v-if="repairForm.reasonPk==null"
          :disabled="btnlock"
        >确认</el-button>
        <el-button size="mini" type="primary" @click="dialogRepairRoom = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="pattern-dialog2"
      title="转停用房"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-form ref="disableForm" :model="disableForm" label-width="80px" size="mini">
          <el-form-item label="房号">
            <el-input v-model="disableForm.roomNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                placeholder="起始日期"
                v-model="disableForm.beginDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
                :disabled="true"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                placeholder="结束日期"
                v-model="disableForm.endDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-row class="no-bottom">
            <el-col :span="12">
              <el-form-item label="原因">
                <el-select v-model="disableForm.reasonTypePk" placeholder="选择原因">
                  <el-option
                    v-for="t in disableRoomType"
                    :key="t.typePk"
                    :label="t.typeName"
                    :value="t.typePk"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="损坏级别">
                <el-select v-model="disableForm.level" placeholder="选择损坏级别">
                  <el-option label="0" value="0"></el-option>
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="是否提醒">
            <el-select v-model="disableForm.remindFlag">
              <el-option label="不提醒" value="N"></el-option>
              <el-option label="提醒" value="Y"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明">
            <el-input type="textarea" v-model="disableForm.remark"></el-input>
          </el-form-item>

          <el-row class="no-bottom">
            <el-col :span="12">
              <el-form-item label="设置人">
                <el-input v-model="disableForm.createUserName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解除人">
                <el-input v-model="disableForm.relieveName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="submitRoomReason('DISABLE')"
          v-if="disableForm.reasonPk==null"
          :disabled="btnlock"
        >确认</el-button>
        <el-button size="mini" type="primary" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>

import {
  addRoomReason,
  delRoomReason,
  findRoomReason,
} from "@/api/roomStatus/pmsRoomStatusController";
export default {
  components:{},
  data() {
    return {
      dialogVisible: false,
      //维修房/停用房
      repairForm: {}, //维修房表单
      disableForm: {}, // 停用房表单
      dialogRepairRoom: false,
      dialogDisableRoom: false,
      btnlock: false,
    }
  },
  methods: {
    showDialog(data) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.disableForm = data
      })
    },
    handleClose(){
      this.dialogVisible = false;
      this.$emit('callback')
    },
    showRepair(room) {
      //转维修房
      this.dialogRepairRoom = true;
      this.btnlock = false;
      this.repairForm = {
        reasonPk: null,
        roomPk: room.roomPk,
        roomNumber: room.roomNumber,
        roomTypePk: room.roomTypePk,
        roomTypeName: room.roomTypeName,
        beginDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        level: 0,
        remindFlag: "N",
        createUserName: JSON.parse(localStorage.getItem("pms_userinfo"))
          .realName
      };
      if (moment().hour() < 6) {
        this.repairForm.beginDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss");
      }
    },
    showDisable(room) {
      //转停用房
      this.dialogDisableRoom = true;
      this.btnlock = false;
      this.disableForm = {
        reasonPk: null,
        roomPk: room.roomPk,
        roomNumber: room.roomNumber,
        roomTypePk: room.roomTypePk,
        roomTypeName: room.roomTypeName,
        beginDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        level: 0,
        remindFlag: "N",
        createUserName: JSON.parse(localStorage.getItem("pms_userinfo"))
          .realName
      };
      if (moment().hour() < 6) {
        this.disableForm.beginDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss");
      }
    },
    submitRoomReason(submitType) {
      //添加房间原因
      let data = {};
      if (submitType == "REPAIR") {
        //校验
        if (!this.repairForm.endDate) {
          this.$message({ type: "warning", message: "请选择结束日期" });
          return;
        }
        if (!this.repairForm.reasonTypePk) {
          this.$message({ type: "warning", message: "请选择原因" });
          return;
        }
        if (
          this.repairForm.remark == null ||
          this.repairForm.remark == undefined ||
          this.repairForm.remark == ""
        ) {
          this.$message({ type: "warning", message: "请填写说明" });
          return;
        }
        data.roomPk = this.repairForm.roomPk;
        data.roomNumber = this.repairForm.roomNumber;
        data.roomTypePk = this.repairForm.roomTypePk;
        data.roomTypeName = this.repairForm.roomTypeName;
        data.beginDate = this.repairForm.beginDate;
        data.endDate = this.repairForm.endDate;
        data.createUserName = this.repairForm.createUserName;
        data.reasonTypePk = this.repairForm.reasonTypePk;
        data.level = this.repairForm.level;
        data.remindFlag = this.repairForm.remindFlag;
        data.remark = this.repairForm.remark;
        data.typeMaster = submitType;
      } else if (submitType == "DISABLE") {
        //校验
        if (!this.disableForm.endDate) {
          this.$message({ type: "warning", message: "请选择结束日期" });
          return;
        }
        if (!this.disableForm.reasonTypePk) {
          this.$message({ type: "warning", message: "请选择原因" });
          return;
        }
        if (
          this.disableForm.remark == null ||
          this.disableForm.remark == undefined ||
          this.disableForm.remark == ""
        ) {
          this.$message({ type: "warning", message: "请填写说明" });
          return;
        }
        data.roomPk = this.disableForm.roomPk;
        data.roomNumber = this.disableForm.roomNumber;
        data.roomTypePk = this.disableForm.roomTypePk;
        data.roomTypeName = this.disableForm.roomTypeName;
        data.beginDate = this.disableForm.beginDate;
        data.endDate = this.disableForm.endDate;
        data.createUserName = this.disableForm.createUserName;
        data.reasonTypePk = this.disableForm.reasonTypePk;
        data.level = this.disableForm.level;
        data.remindFlag = this.disableForm.remindFlag;
        data.remark = this.disableForm.remark;
        data.typeMaster = submitType;
      }
      if (this.btnlock) {
        return;
      } else {
        this.btnlock = true;
      }
      addRoomReason(data)
        .then(res => {
          this.roomList.forEach((room, index) => {
            if (room.roomPk == data.roomPk) {
              room.reasonPk = res.data;
              if (submitType == "REPAIR") {
                room.roomStatus = "REPAIR_ROOM";
                this.dialogRepairRoom = false;
              } else if (submitType == "DISABLE") {
                room.roomStatus = "DISABLE_ROOM";
                this.dialogDisableRoom = false;
              }
            }
          });
          this.btnlock = false;
          this.$message({ type: "success", message: "操作成功" });
        })
        .catch(() => {
          this.btnlock = false;
        });
    },
    finshRoomReason(room, reasonType) {
      //删除房间原因
      delRoomReason({ reasonPk: room.reasonPk, roomPk: room.roomPk }).then(
        res => {
          if (res.code == 1) {
            room.reasonPk = null;
            room.roomStatus = "DIRTY";
            this.$message({ type: "success", message: "操作成功" });
          }
        }
      );
    },
    seeRoomReason(room, type) {
      //查看房间原因
      findRoomReason({ reasonPk: room.reasonPk }).then(res => {
        if (res.code == 1) {
          let data = {
            reasonPk: res.data.reasonPk,
            roomPk: res.data.roomPk,
            roomNumber: res.data.roomNumber,
            roomTypePk: res.data.roomTypePk,
            roomTypeName: res.data.roomTypeName,
            beginDate: res.data.beginDate,
            endDate: res.data.endDate,
            level: res.data.level,
            remindFlag: res.data.remindFlag,
            createUserName: res.data.createUserName,
            relieveName: res.data.relieveName,
            reasonTypePk: res.data.reasonTypePk,
            remark: res.data.remark
          };
          if (type == "REPAIR") {
            this.repairForm = data;
            this.dialogRepairRoom = true;
          } else if (type == "DISABLE") {
            this.disableForm = data;
            this.dialogDisableRoom = true;
          }
        }
      });
    }
  }
}
</script>
<style lang='scss' scoped>
//停用
.pattern-dialog {
  .el-dialog__header {
    padding: 10px 15px;
  }

  .el-dialog__body {
    padding   : 0 4px;
    height    : 500px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #f7f7f7;
    border    : 1px solid #ddd;
  }

  .pattern-dialog-container {
    padding: 15px;
    display: inline-block;
    width  : 97%;
  }

  .pattern-dialog-title {
    border     : 1px solid #ccc;
    padding-top: 10px;
    height     : 145px;
  }
}
//维修
.pattern-dialog2 {
  .el-dialog__header {
    padding: 10px 15px;
  }

  .el-dialog__body {
    padding   : 0 4px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #f7f7f7;
    border    : 1px solid #ddd;
  }

  .pattern-dialog-container {
    padding: 15px;
    display: inline-block;
    width  : 97%;
  }

  .pattern-dialog-title {
    border     : 1px solid #ccc;
    padding-top: 10px;
    height     : 145px;
  }
}
</style>
