<template>
  <section>
    <div class="title">
      <span>团队管理</span>
    </div>
    <el-form :inline="true" size="mini" label-width="100px" class="demo-form-inline">
      <el-col :span="24">
        <el-form-item label="状态：">
          <el-radio-group v-model="formInline.orderStatus" size="small">
            <el-radio-button label="1">不限</el-radio-button>
            <el-radio-button label="2">未入住</el-radio-button>
            <el-radio-button label="3">在住</el-radio-button>
            <el-radio-button label="4">离店</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="预离时间：">
          <el-radio-group v-model="scheduledDate" size="small">
            <el-radio-button label="0">不限</el-radio-button>
            <el-radio-button label="1">当天</el-radio-button>
            <el-radio-button label="2">昨天</el-radio-button>
            <el-radio-button label="3">明天</el-radio-button>
            <el-radio-button label="4">后三天</el-radio-button>
            <el-radio-button label="5">近七天</el-radio-button>
            <el-radio-button label="6">上月</el-radio-button>
            <el-radio-button label="7">本月</el-radio-button>
            <el-radio-button label="8">下月</el-radio-button>
            <el-radio-button label="9">自定义</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-show="scheduledDate==9"
            v-model="scheduledTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="结账状态：">
          <el-radio-group v-model="formInline.checkInWay" size="small">
            <el-radio-button label="0">不限</el-radio-button>
            <el-radio-button label="1">已结</el-radio-button>
            <el-radio-button label="2">未结</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-form-item label="入住日期：">
        <el-date-picker
          v-model="scheduledTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="团名：">
        <el-input v-model="formInline.userName" placeholder="请输入姓名" clearable style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label style="float:right;">
        <el-button type="primary" icon="el-icon-search" @click="list">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%;font-size:12px" size="mini">
      <el-table-column prop="userName" label="团名" align="center"></el-table-column>
      <el-table-column prop="reserveType" label="入住时间" align="center"></el-table-column>
      <el-table-column label="预离时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.scheduledTime[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userPhone" label="客户" align="center"></el-table-column>
      <el-table-column prop="roomNumber" label="公付费用" align="center"></el-table-column>
      <el-table-column prop="roomTypePk" label="房型" align="center"></el-table-column>
      <el-table-column prop="idNumber" label="在住状态" align="center"></el-table-column>
      <el-table-column prop="totalRoomCharge" label="结账状态" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">结账</el-button>
        <el-button type="text" size="small">开发票</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align:center;margin:10px 0;"
      @size-change="handleSizeChange"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next"
      :total="400"
    ></el-pagination>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          orderStatus: "43434",
          reserveType: 0,
          userName: "34324",
          userPhone: "432343243243",
          roomTypePk: "温馨大床房",
          roomNumber: "435",
          idNumber: 3443,
          totalRoomCharge: 4323,
          estimatedTime: ["2019-02-05", "2019-02-05"],
          scheduledTime: ["2019-02-05", "2019-02-05"]
        },
        {
          orderStatus: "43434",
          reserveType: 0,
          userName: "34324",
          userPhone: "432343243243",
          roomTypePk: "温馨大床房",
          roomNumber: "435",
          idNumber: 3443,
          totalRoomCharge: 4323,
          estimatedTime: ["2019-02-05", "2019-02-05"],
          scheduledTime: ["2019-02-05", "2019-02-05"]
        },
        {
          orderStatus: "43434",
          reserveType: 0,
          userName: "34324",
          userPhone: "432343243243",
          roomTypePk: "温馨大床房",
          roomNumber: "435",
          idNumber: 3443,
          totalRoomCharge: 4323,
          estimatedTime: ["2019-02-05", "2019-02-05"],
          scheduledTime: ["2019-02-05", "2019-02-05"]
        }
      ],
      formInline: {
        orderStatus: 1, //订单状态
        checkInWay: 0,
        checkInType: 0, //入住类型
        reserveType: 0, //预定方式
        userName: "", //预订人:团名
        reservationNo: "", //预订单号
        externalNo: "", //外部单号
        userPhone: "", //手机号
        roomTypePk: "", //房型
        roomNumber: "" //房间号
      },
      preArrivalDate: "0", //所选预抵日期
      scheduledDate: "0", //所选预定日期
      checkInTypeMap: [
        "全部",
        "正常",
        "长包",
        "团队",
        "自用",
        "免费",
        "时租",
        "午夜房"
      ], //入住类型选项
      reserveTypeMap: ["全部", "微信", "携程旅行"], //预定方式选项
      roomTypeOptions: [
        { typeName: "高级公寓", typePk: "FFEEFE" },
        { typeName: "高级公寓", typePk: "FFEEFE" },
        { typeName: "高级公寓", typePk: "FFEEFE" },
        { typeName: "高级公寓", typePk: "FFEEFE" },
        { typeName: "高级公寓", typePk: "FFEEFE" },
        { typeName: "高级公寓", typePk: "FFEEFE" },
        { typeName: "高级公寓", typePk: "FFEEFE" }
      ], //房型选项
      estimatedTime: "", //预抵日期
      scheduledTime: "", //预定日期
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  }
};
</script>
<style scoped lang='scss'>
.title {
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 20px;
  span {
    padding-left: 10px;
    border-left: 5px solid #21324e;
    margin-left: 10px;
  }
}
</style>



