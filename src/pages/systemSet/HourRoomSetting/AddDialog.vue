// 钟点房设置
<template>
  <el-dialog title="钟点房设置" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="form" :model="form" size="mini">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">钟点房基本参数设置</h5>
        <div class="info-li">
          <el-form-item>
            规则名称&nbsp;&nbsp;<el-input type="text" v-model="form.ruleName" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item>
            允许入住时间段设置
            <el-time-picker
            v-model="form.beginTime"
            value-format="HH:mm:ss"
            placeholder="开始时间">
            </el-time-picker>
            至
            <el-time-picker
            v-model="form.endTime"
            value-format="HH:mm:ss"
            placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
          <el-form-item>
            钟点房计费缓冲时间&nbsp;&nbsp;
            <el-input v-model="form.bufferTime" size="mini" clearable></el-input>&nbsp;&nbsp;分钟<br/>
            <span class="red">&nbsp;&nbsp;&nbsp;&nbsp;（注：如果起步时间配置是180分钟，缓冲：20分钟,则真正计费的起步时间是200分钟，超过的时间顺延。）</span>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.exceedTimeFlag" true-label="Y" false-label="N" ></el-checkbox>
            &nbsp;&nbsp;钟点房超过最晚停留时间&nbsp;&nbsp;
            <el-time-picker
            :disabled="form.exceedTimeFlag=='N'"
            value-format="HH:mm:ss"
            v-model="form.exceedTime"
            placeholder="任意时间点">
            </el-time-picker>&nbsp;&nbsp;转为正常入住
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.checkInLongNumFlag" true-label="Y" false-label="N" ></el-checkbox>
            &nbsp;&nbsp;钟点房入住超过&nbsp;&nbsp;
            <el-input v-model="form.checkInLongNum" size="mini" :disabled="form.checkInLongNumFlag=='N'"></el-input>
            &nbsp;&nbsp;分钟自动转为正常入住
          </el-form-item>
          <el-form-item>
            钟点房提前&nbsp;&nbsp;<el-input v-model="form.remindTimeNum" size="mini" clearable></el-input>&nbsp;&nbsp;分钟提醒操作员
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="submitRuleHour" size="mini">确定</el-button>
            <el-button type="danger" size="mini">取消</el-button>
          </el-form-item> -->
        </div>
      </div>
    </el-form>
    <!-- table -->
      <div class="bg-reserve">
        <h5 class="info-title">钟点房房价方案参数设置</h5>
        <!-- <el-button type="primary" size="mini" style="margin-left:20px;" @click="addRow(tableData)">添加钟点房房价方案</el-button> -->
        <div class="info-li">
          <el-table
            size="mini"
            :data="tableData"
            border
            style="width:100%">
            <el-table-column
              prop="date"
              align="center"
              width="140px"
              label="房型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.roomTypePk" :disabled="true" style="width:120px" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in roomTypeList"
                    :key="item.value"
                    :label="item.typeName"
                    :value="item.typePk">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
              <!-- <el-table-column
              prop="name"
              align="center"
              label="方案名称">
              <template slot-scope="scope">
                  <el-input  v-model="scope.row.schemeName" size="mini" placeholder="请输入方案名称"></el-input>
                </template>
              </el-table-column> -->
            <el-table-column
              prop="name"
              align="center"
              label="起步时间（分钟）">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.startTime" ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="起步价格（元）">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.startPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="标准计费时间（分钟）">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.standardBillingTime"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="标准计费金额（元）">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.standardBillingPrice" ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="预收费金额（元）">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.preChargePrice" ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"      
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="deleteClick(scope.$index, scope.row)" type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="save" :loading="loading" v-if="hasPerm('pms:hourRoomSetting:update')">保存</el-button>
      <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  hourRoomRuleFind,
  hourRoomRuleAdd,
  hourRoomRuleUpdate
  // roomRuleSchemeDel,
  // roomRuleSchemeList,
  // roomRuleSchemeUpdate,
} from "@/api/systemSet/pmsHourRoomController";
import { listType } from "@/api/utils/pmsTypeController";
export default {
  data() {
    return {
      dialogVisible:false,
      loading:false,
      form: {
        ruleName:'',
        beginTime:null,
        endTime:null,
        bufferTime:null,
        exceedTimeFlag:'N',
        exceedTime:null,
        checkInLongNumFlag:'N',
        checkInLongNum:null,
        remindTimeNum:null,
      },
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
  methods: {
    showDialog(rulePk) {
      this.rulePk = rulePk
      this.dialogVisible = true
      this.selectRoomType();

      if(rulePk) {
        //修改
        hourRoomRuleFind(rulePk).then(res=>{
          this.form = res.data.rule
          // let tempSchemes = res.data.schemes
          this.tableData = []
          let tempSchemes = {}
          res.data.schemes.forEach(item=>{
            tempSchemes[item.roomTypePk] = item
          })

          this.roomTypeList.forEach(item=>{
            let matchScheme = tempSchemes[item.typePk]
            this.tableData.push({
              roomTypePk: item.typePk,
              schemeName: matchScheme ? matchScheme.schemeName:"",
              startTime: matchScheme ? matchScheme.startTime:"",
              startPrice: matchScheme ? matchScheme.startPrice:"",
              standardBillingTime: matchScheme ? matchScheme.standardBillingTime:"",
              standardBillingPrice: matchScheme ? matchScheme.standardBillingPrice:"",
              preChargePrice:  matchScheme ? matchScheme.preChargePrice:"",
              schemePk: matchScheme ? matchScheme.schemePk:null,
            })
          })

        })
      }else {
        //新增
        this.tableData = []
        this.form.ruleName=''
        this.form.beginTime=null
        this.form.endTime=null
        this.form.bufferTime=null
        this.form.exceedTimeFlag='N'
        this.form.exceedTime=null
        this.form.checkInLongNumFlag='N'
        this.form.checkInLongNum=null
        this.form.remindTimeNum=null

        this.roomTypeList.forEach(item=>{
          this.tableData.push({
            roomTypePk: item.typePk,
            schemeName: "",
            startTime: "",
            startPrice: "",
            standardBillingTime: "",
            standardBillingPrice: "",
            preChargePrice: "",
          })
        })
      }
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

    save() {
      this.loading = true
      let schemes = []

      //校验
      let timeReg = /^[0-9]+$/ ;
      for(let item of this.tableData) {
        if(item.startTime) {
          if(Number(item.startTime)<=0 || !timeReg.test(item.startTime)) {
            this.$message.warning("起步时间输入有误，必须为大于0的整数")
            this.loading = false
            return 
          }
        }
        if(item.standardBillingTime) {
          if(Number(item.standardBillingTime)<=0 || !timeReg.test(item.standardBillingTime)) {
            this.$message.warning("标准计费时间输入有误，必须为大于0的整数")
            this.loading = false
            return 
          }
        }
        if(item.startPrice) {
          if(Number(item.startPrice)<=0 ) {
            this.$message.warning("起步价格输入有误，必须大于0")
            this.loading = false
            return 
          }
        }
        if(item.standardBillingPrice) {
          if(Number(item.standardBillingPrice)<=0 ) {
            this.$message.warning("标准计费金额输入有误，必须大于0")
            this.loading = false
            return 
          }
        }
        if(item.preChargePrice) {
          if(Number(item.preChargePrice)<0 ) {
            this.$message.warning("预收费金额输入有误，不能小于0")
            this.loading = false
            return 
          }
        }
        // if(item.startTime || item.startPrice || item.standardBillingTime || item.standardBillingPrice || item.preChargePrice) {
        //   if(!(item.startTime && item.startPrice && item.standardBillingTime && item.standardBillingPrice && item.preChargePrice)) {
        //     this.$message.warning("数据未填写完整")
        //     this.loading = false
        //     return
        //   }
        // }
      }

      this.tableData.forEach(item=>{
        if(item.startTime && item.startPrice && item.standardBillingTime && item.standardBillingPrice && item.preChargePrice>=0) {
          for(let type of this.roomTypeList) {
            if(type.typePk==item.roomTypePk) {
              this.$set(item, 'roomTypeName', type.typeName)
            }
          }
          schemes.push(item)
        }
      })
      let data = {
        rulePk: this.rulePk,
        ruleName: this.form.ruleName,
        beginTime: this.form.beginTime,
        endTime: this.form.endTime,
        bufferTime: this.form.bufferTime,
        exceedTimeFlag: this.form.exceedTimeFlag,
        exceedTime: this.form.exceedTime,
        checkInLongNumFlag: this.form.checkInLongNumFlag,
        checkInLongNum: this.form.checkInLongNum,
        remindTimeNum: this.form.remindTimeNum,
        priceSchemes: schemes
      }
      if(this.rulePk) {
        //更新
        hourRoomRuleUpdate(data).then(res=>{
          this.$message.success('保存成功')
          this.loading = false
          this.handleClose()
        }).finally(()=>{
          this.loading = false
        })
      }else {
        //添加
        hourRoomRuleAdd(data).then(res=>{
          this.$message.success('保存成功')
          this.loading = false
          this.handleClose()
        }).finally(()=>{
          this.loading = false
        })
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
    deleteClick(index,row) {
      this.$set(this.tableData[index], 'preChargePrice', null)
      this.$set(this.tableData[index], 'standardBillingPrice', null)
      this.$set(this.tableData[index], 'standardBillingTime', null)
      this.$set(this.tableData[index], 'startPrice', null)
      this.$set(this.tableData[index], 'startTime', null)
    },
    handleClose(){
      this.dialogVisible = false
      this.$emit("callback")
    },
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
