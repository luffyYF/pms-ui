// 价格变更记录
<template>
  <div>
    <el-dialog class="pattern-dialog" title="房价变更记录" :visible.sync="dialogPriceChange" width="80%" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <el-col :span="24" style="margin:10px 0;">
          房号筛选：
          <el-select placeholder="全部" size="mini" v-model="searchGuestOrderPk" @change="listTable">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="y in guestSelectArr" :key="y.guestOrderPk" :label="'房间号：'+y.roomNumber+'  客人姓名：'+y.memName" :value="y.guestOrderPk"></el-option>
          </el-select>
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span>{{contractMap[scope.row.status]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="srcRoomNumber" label="房号" width="180"></el-table-column>
            <el-table-column prop="roomPrice" label="房价"></el-table-column>
            <el-table-column prop="date" label="营业日期"></el-table-column>
            <el-table-column prop="createTime" label="操作时间"></el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="channelTypeName" label="渠道"></el-table-column>
            <el-table-column prop="schemeName" label="方案"></el-table-column>
          </el-table>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { contractMap } from "@/utils/orm";
import { guestSelect, listHistory } from "@/api/order/pmsContractControll";
export default {
  data() {
    return {
      currOrderPk: "",
      contractMap: contractMap,
      dialogPriceChange: false,
      tableData: [],
      guestSelectArr: [],
      searchGuestOrderPk: ""
    };
  },
  methods: {
    init(orderPk) {
      this.dialogPriceChange = true;
      this.currOrderPk = orderPk;
      this.searchGuestOrderPk = "";
      guestSelect({ orderPk: orderPk, type: 2 }).then(res => {
        this.guestSelectArr = res.data;
      });
      this.listTable();
    },
    listTable() {
      let data = {
        orderPk: this.currOrderPk,
        guestOrderPk: this.searchGuestOrderPk
      }
      listHistory(data).then(res => {
        this.tableData = res.data;
      });
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {

      //   })
      //   .catch(_ => {});
      this.dialogPriceChange = false;
    }
  }
};
</script>

<style>

</style>
