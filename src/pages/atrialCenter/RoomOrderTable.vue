<template>
  <div>
    <el-table
      border
      :data="roomOrderData"
      style="width: 100%">
      <el-table-column
        prop="roomNumber"
        label="房间号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="roomStatus"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="price"
        label="房间价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="客人姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="houseType"
        label="房间类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="beginDate"
        label="到店日期"
        width="110">
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="预离日期"
        width="110">
      </el-table-column>
      <el-table-column
        prop="platform"
        label="客人来源">
      </el-table-column>
    </el-table>
    {{houseTypePk}} <br>
    {{date}}
  </div>
</template>

<script>
export default {
  props: ["houseTypePk", "date"], //父组件传递的单元格坐标数据
  mounted () {
    //请求数据
    console.log(this.houseTypePk+"-"+this.date)
  },
  updated () {
    //请求数据
    console.log(this.houseTypePk+"-"+this.date)
  },
  data() {
    return {
      roomOrderData: [
        {
          roomNumber: 905,
          roomStatus: "入住",
          price: 159,
          userName: "李东方",
          houseType: "浪漫",
          beginDate: "2018-02-28",
          endDate: "2018-03-01",
          platform: "途家"
        },
        {
          roomNumber: 905,
          roomStatus: "入住",
          price: 159,
          userName: "李东方",
          houseType: "浪漫",
          beginDate: "2018-02-28",
          endDate: "2018-03-01",
          platform: "途家"
        }
      ]
    };
  }
};
</script>
