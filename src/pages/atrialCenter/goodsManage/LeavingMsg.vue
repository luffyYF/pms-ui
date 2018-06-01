//留言
<template>
  <div class="bg-server">
    <el-form ref="form" :inline="true" :model="form1" size="mini" label-width="80px">
      <el-form-item label="留言状态">
        <el-select v-model="form.status" placeholder="请选择留言状态">
          <el-option label="未读取" value="NOREAD"></el-option>
          <el-option label="已读取" value="READ"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登记时间">
        <!-- <el-date-picker v-model="datepicker1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
        <el-date-picker
            v-model="form.beginDate"
            align="right"
            type="date"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd"
            :picker-options="startTimeOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="留言房号">
        <el-input v-model="form.roomNumber"></el-input>
      </el-form-item>
      <el-form-item label="客人姓名">
        <el-input v-model="form.guestName"></el-input>
      </el-form-item>
      <el-form-item label="读取时间">
        <!-- <el-date-picker v-model="datepicker2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
        <el-date-picker
            v-model="form.endDate"
            align="right"
            type="date"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd"
            :picker-options="startTimeOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="留言人">
        <el-input v-model="form.msgPerson"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="查询全部" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="selectGood">查找</el-button>
      </el-form-item>
    </el-form> 
    <el-table :data="goodsList" v-loading="loading" height="300" border style="width: 100%" empty-text="未查到当前有留言" @row-dblclick="cellClickHandle">												
      <el-table-column prop="roomNumber" align="center" label="房号" width="100"></el-table-column>
      <el-table-column prop="guestName" align="center" label="客人姓名" width="100"></el-table-column>
      <el-table-column prop="msgPerson" align="center" width="100" label="留言人"></el-table-column>
      <el-table-column prop="beginDate" align="center"  label="登记时间" width="190"></el-table-column>
      <el-table-column prop="createUserName" align="center" label="登记人" width="100"></el-table-column>
      <el-table-column prop="remark" align="center" label="留言内容"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{noteMap[scope.row.status]}}</span>
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
            <el-form-item label="房间号">
              <el-input v-model="form.roomNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记员">
              <el-input v-model="form.createUserName" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="登记时间">
              <el-input v-model="form.beginDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="留言人">
              <el-input v-model="form.msgPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="修改人">
              <el-input v-model="form.updateUserName" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="修改时间">
              <el-input v-model="form.endDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="读取人">
              <el-input v-model="form.endUserName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="读取时间">
              <el-input v-model="form.endDate" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="10">
            <el-form-item label="留言内容">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
          </el-col>
        <el-col :span="24">
          <el-form-item class="form-center">
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''" @click="editNote">修改</el-button>
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''" @click="read">读取</el-button>
            <el-button type="primary" :disabled="this.form.orderPk == null || this.form.orderPk == ''" @click="cancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
 
  </div>
</template>
<script>
import {noteMap} from '@/utils/orm'
import {
  pmsGoodsAdd,
  pmsGoodsDel,
  pmsGoodsList,
  pmsGoodsUpdate,
  pmsGoodsEditNote,
  pmsGoodsEditFinish,
  pmsGoodsCancel,
  pmsGoodsListCondition
} from "@/api/atrialCenter/goodsManageController";
export default {
  created() {
    this.selectGoods();
  },
  data() {
    return {
      noteMap:noteMap,
      goodsList: [],
      form: {
        name:'',
        type:'LY',
        status:'',
        guestName:'',
        roomNumber:'',
        beginDate:'',
        endDate:'',
        msgPerson:''
      },
      form1:{},
      tableData: [],
      loading:false,
      datepicker1: "",
      datepicker2: "",
        startTimeOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
    };
  },
  methods: {
    selectGoods() {
      this.loading = true;
      pmsGoodsListCondition({ type: "LY" }).then(res => {
        this.loading = false;
        if (res.code == 1) {
          this.goodsList = res.data;
        }
      }).catch(()=>{
        this.loading= false;
      });
    },
    selectGood(){
      this.loading = true;
      pmsGoodsListCondition(this.form)
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
    editNote(){
      this.$confirm("确定修改留言？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pmsGoodsEditNote(this.form).then(res => {
            if (res.code == 1) {
              this.$message.success("修改成功");
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
    read(){
      this.$confirm("确定读取留言？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.status = "READ";
          pmsGoodsEditFinish(this.form).then(res => {
            if (res.code == 1) {
              this.$message.success("读取成功");
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
      this.$confirm("取消留言？", "提示", {
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
.form-center {
  text-align: center;
}
.top20 {
  margin-top: 20px;
}
.item-right {
  float: right;
}
.bg-server {
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding: 15px;
  width: 1000px;
}
</style>
<style>
.form-center .el-form-item__content {
  margin-left: 0 !important;
}
</style>
