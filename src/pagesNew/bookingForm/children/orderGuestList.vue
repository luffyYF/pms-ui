
<template>
        <el-table :data="tableData" border max-height="500">
           <el-table-column label="入住人" prop="guestName">
          </el-table-column>
          <el-table-column label="入住手机" min-width="180" prop="guestPhone">
          </el-table-column>
          <el-table-column label="房型" min-width="180" prop="roomTypeName" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="房价">
            <template slot-scope="scopes">
              <span v-if="scopes.row.mainFlag == 'Y'">￥ {{scopes.row.currPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="房间号" min-width="180" prop="roomNumber">
            <template slot-scope="scopes">
              <span v-if="scopes.row.roomNumber != null">{{scopes.row.roomNumber}}</span>
              <span v-else>未排房</span>
            </template>
          </el-table-column>
          <el-table-column label="渠道" min-width="180" prop="channelTypeName">
          </el-table-column>
          <el-table-column label="预抵时间" min-width="180" prop="beginDate">
          </el-table-column>
          <el-table-column label="预离时间" min-width="180" prop="endDate">
          </el-table-column>
        </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      showDialog (data) {
        // this.dialogVisible = true
        this.tableData = data
      },
      handleClose () {
        // this.dialogVisible = false
      }
    }
  }
</script>
