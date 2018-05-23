// 初始化价格
<template>
  <div>
    <el-dialog :title="'初始化价格'" :visible.sync="dialogInitPrice" width="600px">
      <el-form ref="form" :model="form" size="mini" label-width="80px">
        <el-form-item label="日期">
          <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="form.beginDate" :picker-options="pickerOptions0" placeholder="开始日期">
          </el-date-picker>
          <el-select v-model="form.months" placeholder="选择月数">
            <el-option label="1个月" value="1"></el-option>
            <el-option label="2个月" value="2"></el-option>
            <el-option label="3个月" value="3"></el-option>
            <el-option label="4个月" value="4"></el-option>
            <el-option label="5个月" value="5"></el-option>
            <el-option label="6个月" value="6"></el-option>
            <el-option label="7个月" value="7"></el-option>
            <el-option label="8个月" value="8"></el-option>
            <el-option label="9个月" value="9"></el-option>
            <el-option label="10个月" value="10"></el-option>
            <el-option label="11个月" value="11"></el-option>
            <el-option label="12个月" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平均价" style="width:300px">
          <el-input size="mini" type="text" v-model="form.price"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitForm">初始化</el-button>
        <el-button size="mini" @click="dialogInitPrice = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  initPrice,
  getInitEndDate
} from "@/api/systemSet/pmsRoomTypePriceController";
import { addDate, formatDate } from "@/utils/index";
export default {
  data() {
    return {
      dialogInitPrice: false,
      initEndDate: "",
      currRoomTypePk: "",
      form: {
        roomTypePk: "",
        beginDate: formatDate(new Date(), "yyyy-MM-dd"),
        months: null,
        price: null
      },
      pickerOptions0: {
        //限制今天以前的日期不可选择
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    /**
     * 初始化
     * @augments roomTypePk 房间类型主键
     * */
    init(roomTypePk) {
      this.currRoomTypePk = roomTypePk;
      this.form.roomTypePk = roomTypePk;
      this.form.beginDate = formatDate(new Date(), "yyyy-MM-dd");
      this.form.months = null;
      this.form.price = null;
      this.dialogInitPrice = true;
      this.iiendDate();
    },
    iiendDate() {
      // 获取初始化截止日期
      getInitEndDate({ roomTypePk: this.currRoomTypePk }).then(res => {
        if (res.data) {
          this.initEndDate = res.data;
        } else {
          this.initEndDate = "未初始化";
        }
      });
    },
    submitForm() {
      //提交表单
      if (!this.form.beginDate) {
        this.$message({ type: "warning", message: "请选择开始日期" });
        return;
      }
      if (!this.form.months) {
        this.$message({ type: "warning", message: "请选择月数" });
        return;
      }
      if (
        this.form.price == null ||
        this.form.price == undefined ||
        this.form.price == ""
      ) {
        this.$message({ type: "warning", message: "请输入平均价" });
        return;
      }
      if (Number(this.form.price) < 0) {
        this.$message({ type: "warning", message: "平均价不能小于0" });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "正在初始化...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.form.endDate = addDate(this.form.beginDate, 30 * this.form.months);
      initPrice(this.form)
        .then(res => {
          loading.close();
          this.iiendDate();
          this.$message({ type: "success", message: "初始化完成" });
        })
        .catch(error => {
          loading.close();
        });
    }
  }
};
</script>

<style>

</style>
