<template>
  <div>
    <el-button type="text" size="mini" @click="dialogHistoryVisible = true">住店历史</el-button>
    <el-button type="text" size="mini" @click="dialogChangeVipVisible = true">转会员</el-button>
    <el-button type="text" size="mini" @click="dialogToBlackListVisible = true">加入黑名单</el-button>
    <el-button type="text" size="mini" @click="dialogEditInfoVisible = true">修改资料</el-button>
    
    <!-- 住店历史dialog -->
    <el-dialog title="住店历史记录" :visible.sync="dialogHistoryVisible" :append-to-body="true">
      <div class="body-conten">
        <el-table
          border
          :data="historyInData"
          size="mini"
          style="width: 100%">
          <el-table-column
            prop="companyName"
            label="所属分店"
            align="center"
            width="130">
          </el-table-column>
          <el-table-column
            prop="roomNumber"
            label="房号"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="beginDate"
            label="抵店时间"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="离店时间"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="days"
            label="天数"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="houseType"
            label="房间类型"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="房价"
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="discount"
            label="折扣"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="discountPrice"
            label="折扣价"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="totalRoomPrice"
            label="房费总额"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="consumeTotalPrice"
            label="消费品总额"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="guestSource"
            label="客人来源"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="isReserve"
            align="center"
            label="是否预订">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogHistoryVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogHistoryVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户级别转换 -->
    <el-dialog title="用户级别转换" :visible.sync="dialogChangeVipVisible" :append-to-body="true">
       <div class="body-conten">
         用户级别转换
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogChangeVipVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogChangeVipVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 加入黑名单 -->
    <el-dialog title="加入黑名单" :visible.sync="dialogToBlackListVisible" :append-to-body="true">
       <div class="body-conten">
         加入黑名单
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogToBlackListVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogToBlackListVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改资料 -->
    <el-dialog title="用户信息" :visible.sync="dialogEditInfoVisible" :append-to-body="true">
       <div class="body-conten">
         用户信息
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogEditInfoVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogEditInfoVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      props: ['row'],//操作当前行对象
      data() {
          return {
            dialogHistoryVisible: false,
            dialogChangeVipVisible: false,
            dialogToBlackListVisible: false,
            dialogEditInfoVisible: false,
            // 住店历史记录数据
            historyInData: [{
              companyName: '华发世纪城',
              roomNumber: '9033',
              beginDate: '2017-08-02',
              endDate: '2018-09-09',
              days: '4',
              houseType: '浪漫公寓',
              price: '999',
              discount: '9.8',
              discountPrice: '888',
              totalRoomPrice: '300',
              consumeTotalPrice: '3333',
              guestSource: '公总号',
              isReserve: '是'
            }],

          }
      },
      updated() {
        // 获取当前行的数据，进行处理
        console.log(this.row);
      }
    }
</script>