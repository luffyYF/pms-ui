//  激活会员
<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">未激活会员</h5>
      <el-button type="primary" class="active-button" size="mini" @click="activeClick">激活会员并重置密码为会员卡号(10000条/次)</el-button>
      <el-table size="mini" border :data="tableData" style="width: 98.5%; margin:10px;">
        <el-table-column prop="number" label="序号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="memberCarNo" label="会员卡号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" width="90">
        </el-table-column>
        <el-table-column prop="memberLevel" label="级别" align="center" width="90">
        </el-table-column>
        <el-table-column prop="nativePlace" label="籍贯" align="center" width="90">
        </el-table-column>
        <el-table-column prop="certificateType" label="证件类型" align="center" width="100">
        </el-table-column>
        <el-table-column prop="certificateNo" label="证件号" align="center" width="200">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" align="center" width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    init(){},
    activeClick() {
      this.$confirm("激活会员并重置密码为会员卡号,是否激活?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        this.$message({ type: "success", message: "激活成功" });
      });
    }
  },
  data() {
    return {
      tableData: [
        {
          number: '1',
          memberCarNo: "995882",
          userName: "王小虎",
          memberLevel: "普通会员",
          nativePlace: "广东",
          certificateType: "二代身份证",
          certificateNo: "440823199403240035",
          address: "上海市普陀区金沙江路 1516",
          phone: "13246520683"
        }
      ]
    };
  }
};
</script>

<style scoped>
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
.active-button {
  float: right;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>