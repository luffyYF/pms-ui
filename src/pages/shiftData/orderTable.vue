<template>
  <div class="shiftDataBillList">
      <el-table v-loading="loading" 
      size="mini" 
      border 
      :data="tableData" 
      row-key="orderPkRoomNumberKey" 
      @expand-change="orderExpandChange"
      :expand-row-keys="orderExpands"
      height="500px"
      style="width: 98.5%;min-width:1150px; margin:10px;">
              <!-- <el-table-column align="center" width="30"> -->
                    <el-table-column type="expand" style="padding:0;" >
                        <template slot-scope="scope">
                            <billTable v-loading="childLoading" :ref="scope.row.orderPkRoomNumberKey" /> 
                            <el-pagination class="positions" @size-change="ChildHandleSizeChange" @current-change="ChildHandleCurrentChange" :current-page="childQuery.pageNum" :page-size="childQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="childTotal"></el-pagination>
                        </template>
                    </el-table-column>
              <!-- </el-table-column> -->
              <el-table-column align="center" label="" >
                  <el-table-column prop="roomNumber" label="房号" align="center" >
                  </el-table-column>
                  <el-table-column show-overflow-tooltip prop="memName" label="客人姓名" align="center" >
                  </el-table-column>
                  <el-table-column prop="channelName" label="客源" align="center" >
                  </el-table-column>
                  <el-table-column prop="guestOrderNo" label="订单号" align="center" >
                  </el-table-column>
                  <el-table-column prop="shiftNo" label="班次" align="center" >
                  </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="收入" >
                  <el-table-column prop="roomPrice" label="房费" align="center" >
                  </el-table-column>
                  <el-table-column prop="goods" label="商品" align="center" >
                  </el-table-column>
                  <el-table-column prop="consumptionOther" label="其他" align="center" >
                  </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="结算" >
                  <el-table-column prop="cash" label="现金" align="center" >
                  </el-table-column>
                  <el-table-column prop="bankCard" label="银行卡" align="center" >
                  </el-table-column>
                  <el-table-column prop="memberCard" label="会员卡" align="center" >
                  </el-table-column>
                  <el-table-column prop="credit" label="挂账" align="center" >
                  </el-table-column>
                  <el-table-column prop="settlementOther" label="其他" align="center" >
                  </el-table-column>
              </el-table-column>
      </el-table>
      
  </div>
</template>

<script>
import {shiftDataView} from "@/api/shiftData/shiftData";
import Moment from 'moment'
import billTable from './billTable'
  export default {
    components:{billTable},
    data () {
      return {
        tableData: [],
        loading:false,
        childLoading:false,
        listQuery:{

        },
        orderExpands:[],
        childData:[],
        childQuery:{
            pageNum:1,
            pageSize:10,
            shiftType:1,
            billType:0,
            viewType:0
        },
        childTotal:0
      }
    },
    methods: {
      //订单展开
      orderExpandChange(row, expandedRows){
        var that = this
        var bol = false
        var orderPkRoomNumberKey = row.orderPkRoomNumberKey
        for(var i=0;i<expandedRows.length;i++){
          if(orderPkRoomNumberKey == expandedRows[i].orderPkRoomNumberKey){
            bol = true
            break;
          }
        }
        if(bol){
           
            that.orderExpands = [orderPkRoomNumberKey]
            let param = JSON.parse(JSON.stringify(that.listQuery)) 
            param.orderPk = row.orderPk
            param.viewType = 0
            param.roomNumber = row.roomNumber
            param.orderPkRoomNumberKey = row.orderPkRoomNumberKey
            this.childQuery = param
            that.orderShiftDataView()
        }else{
          that.orderExpands = []
        }
      },
      orderShiftDataView(){
        var that = this
        that.childLoading = true
        shiftDataView(that.childQuery).then(res=>{
            that.$nextTick(()=>{
                that.$refs[that.childQuery.orderPkRoomNumberKey].init(res.data.data)
                this.childTotal = res.data.total
            })
        }).finally(() => {
            that.childLoading = false
        })
      },
      // 分页相关
      ChildHandleSizeChange (val) {
          var that = this
          that.childQuery.pageNum = 1
          that.childQuery.pageSize = val
          that.orderShiftDataView()
      },
      // 分页相关
      ChildHandleCurrentChange (val) {
          var that = this
          that.childQuery.pageNum = val
          that.orderShiftDataView()
      },
      //订单初始化
      init(data,listQuery) {
          this.tableData = data
          this.listQuery = listQuery
          this.orderExpands = []
      }
    }
  }
</script>
<style>
  .shiftDataBillList .el-table__expanded-cell{
    padding: 0 !important;
  }
</style>
<style scoped>
  .positions {
    float: right;
  }
</style>

