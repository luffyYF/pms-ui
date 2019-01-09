<template>
    <el-dialog
      title="选择组单"
      :visible.sync="groupDialog"
      :fit="false"
      width="1200px">
      <div class="bg-reserve">
        <div class="bg-reserve">    
          <h5 class="info-title">查询</h5>
          <el-form :inline="true" size="mini" :model="selectGroupObj" class="demo-form-inline">
            <div v-if="selectGroupObj.groupType == 'ORDERGUEST'">
              <el-form-item label="房号：">
                <el-input v-model="selectGroupObj.roomNum"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input v-model="selectGroupObj.name"></el-input>
              </el-form-item>
              <el-form-item label="手机：">
                <el-input v-model="selectGroupObj.phone"></el-input>
              </el-form-item>
              <el-form-item label="组单号：">
                <el-input v-model="selectGroupObj.groupNum"></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="名称：">
                <el-input v-model="selectDubmObj.name"></el-input>
              </el-form-item>
              <el-form-item label="创建人：">
                <el-input v-model="selectDubmObj.createUserName"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="单据类别：">
              <el-select v-model="selectGroupObj.groupType">
                <el-option label="客单" value="ORDERGUEST"></el-option>
                <el-option label="哑房单" value="DUMBHOUSE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getOrderList(selectGroupObj.groupType,1)" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 哑房单列表 -->
          <el-table
            :data="groupList"
            border
            v-if="currGroupType=='DUMBHOUSE'"
            key="DUMBHOUSE"
            height="350"
            style="width: 100%">
            <el-table-column
              prop="orderNo"
              label="组单号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="balance"
              align="center"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="createTime"
              align="center"
              label="创建日期">
            </el-table-column>
            <el-table-column
              prop="businessDate"
              align="center"
              label="创建营业日期">
            </el-table-column>
            <el-table-column
              prop="createUserName"
              align="center"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="remark"
              align="center"
              label="备注">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button @click="choseGroupConfirm(scope.row)" type="text" size="mini">选中</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 客单列表 -->
          <el-table
            :data="groupList"
            border
            v-if="currGroupType=='ORDERGUEST'"
            key="ORDERGUEST"
            height="350"
            style="width: 100%">
            <el-table-column
              prop="orderNo"
              label="组单号"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="orderGuestNo"
              align="center"
              label="客单号">
            </el-table-column>
            <el-table-column
              prop="roomNumber"
              align="center"
              label="房间号码">
            </el-table-column>
            <el-table-column
              prop="guestName"
              align="center"
              width="80"
              label="客户姓名">
            </el-table-column>
            <el-table-column
              prop="guestPhone"
              align="center"
              label="电话号码">
            </el-table-column>
            <el-table-column
              prop="consumptionAmount"
              align="center"
              label="消费总额">
            </el-table-column>
            <el-table-column
              prop="settlementAmount"
              align="center"
              label="结算总额">
            </el-table-column>
            <el-table-column
              prop="balance"
              align="center"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="memberCardNo"
              align="center"
              label="客人会员卡号">
            </el-table-column>
            <el-table-column
              prop="guestGender"
              width="60"
              align="center"
              label="性别">
              <template slot-scope="scope">
                <span>{{scope.row.guestGender=='M'?'男':'女'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="certificateTypeDesc"
              align="center"
              label="证件类型">
            </el-table-column>
            <el-table-column
              label="操作"
              width="60"
              align="center">
              <template slot-scope="scope">
                <el-button @click="choseGroupConfirm(scope.row)" type="text" size="mini">选中</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          style="margin: 10px 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="selectPageParm.total">
        </el-pagination>
        </div>
      </div>
    </el-dialog>
</template>
<script>
import bus from '@/utils/bus'
import {addDumbAndBill,mtgRoomGroupOrderList,listDumbHouse,updateBook,batchOperateDq ,listMtgRoom,listBookDqByRoomPkAndDate,addBookAndDq,listBookDqByDate,listBookDqByRoomPkAndBookPk} from '@/api/conferenceRoom/mtgRoomController'
import Moment from 'moment'
export default {
  components: {
    "full-calendar": require("vue-fullcalendar")
  },
  data() {
    return {
        //组单类型
        currGroupType:'ORDERGUEST',
      groupDialog:false,
      meetingBookObj:{                  //  预订会议室表单对象
      },
      billDetail:{      //费用挂账
      },
      selectPageParm:{
        total:0,
        pageSize:10,
        pageNum:1
      },
      selectGroupObj:{     //查询组单对象
        roomNum:'',
        name:'',
        phone:'',
        groupNum:'',
        groupType:'',
        pageSize:10,
        pageNum:1
      },
      selectDubmObj:{
        name:"",
        createTime:"",
        createUserName:"",
        pageSize:10,
        pageNum:1
      }
      ,
      groupList:[     //组单表格列表
      ],
      bookPk: '',
      desc:""
    };
  },
  mounted() {
  },
  methods: {
    //挂账租单选择按钮
    choseGroup(desc){
      this.selectGroupObj.groupType = this.currGroupType;
      this.getOrderList(this.currGroupType);
      this.desc = desc
      this.groupDialog = true;
    },
    //获取组单列表
    getOrderList(groupType,pageNum){
      if(pageNum){
        this.selectPageParm.pageNum = 1
      }
      this.currGroupType = groupType;
      this.groupList=[];
      if("ORDERGUEST"==groupType){
        this.selectGroupObj.pageSize = this.selectPageParm.pageSize
        this.selectGroupObj.pageNum = this.selectPageParm.pageNum
        mtgRoomGroupOrderList(this.selectGroupObj).then(res=>{
          if(res.code==1){
            this.groupList = res.data.data
            this.selectPageParm.total = res.data.total
          }
        }).catch(error=>{
          this.$message({type:'danger', message: error})
        })
      }else if("DUMBHOUSE"==groupType){
        this.selectDubmObj.pageSize = this.selectPageParm.pageSize
        this.selectDubmObj.pageNum = this.selectPageParm.pageNum
        listDumbHouse(this.selectDubmObj).then(res=>{
          if(res.code==1){
            this.groupList = res.data.data
            this.selectPageParm.total = res.data.total
          }
        }).catch(error=>{
          this.$message({type:'danger', message: error})
        })
      }
    },
    //选中挂账账单
    choseGroupConfirm(row){
      this.$emit('callback',row,"ORDERGUEST"==this.currGroupType)
    //   this.currBill = row;
    //   if("ORDERGUEST"==this.currGroupType){
    //     this.billDetail.isDumb = false
    //     this.billDetail.singleGroupPk = this.currBill.orderPk;
    //     this.billDetail.orderGuestNo = this.currBill.orderNo;
    //   }else{
    //     this.billDetail.singleGroupPk = this.currBill.orderNo;
    //     this.billDetail.dumbPk = this.currBill.dumbPk
    //     this.billDetail.name =  this.currBill.name
    //     this.billDetail.isDumb = true
    //   }
    },
    
    // 分页相关
      handleSizeChange (val) {
        this.selectPageParm.pageSize = val
        this.getOrderList(this.currGroupType)
      },
      // 分页相关
      handleCurrentChange (val) {
        this.selectPageParm.pageNum = val
        this.getOrderList(this.currGroupType)
      },
  },
};
</script>

<style scoped>
.bg-reserve {
  background-color: #f7f7f7;
  position: relative;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 15px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -10px;
  display: inline-block;
  margin: 0;
  margin-left: 9px;
  background: #f7f7f7;
}
.tip-block {
  width: 38px;
  height: 12px;
  display: inline-block;
  margin: 0 8px;
}
.bg-red {
  background-color: red;
}
.bg-family {
  background-color: #409eff;
}
.conferenceList {
  border: 1px solid #eee;
  height: 620px;
  overflow-y: auto;
  background: #fff;
}
.conferenceList .title {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.conferenceList .el-button {
  display: block;
  margin: 10px auto;
  width: 60%;
}
</style>
<style >
/* 插件样式 */
.conferenceList .full-calendar-header .header-center .prev-month,
.conferenceList .full-calendar-header .header-center .next-month,
.conferenceList .full-calendar-header .header-center .title {
  font-size: 16px;
  font-weight: 600;
}
.conferenceList .full-calendar-body .weeks {
  background-color: #a2d2f0;
  border: none;
}
.conferenceList .full-calendar-body .weeks .week {
    flex: 1;
    text-align: center;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
}
.conferenceList .full-calendar-body .dates .week-row .day-cell {
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background-color: #e8f6ff;
}
.conferenceList .full-calendar-body .event-item.confirmed {
  background-color: red !important;
  color: #fff !important;
}

.conferenceList .full-calendar-body .event-item.unconfirmed {
  background-color: #409eff !important;
  color: #fff !important;
}
.conferenceList .full-calendar-body .dates .week-row .day-cell .day-number,
.conferenceList .full-calendar-body .dates .dates-events .events-week .events-day .day-number {
  text-align: center;
  padding-bottom: 0px;
}
.conferenceList .full-calendar-body .dates .week-row .day-cell {
  min-height: 70px;
}
.conferenceList .full-calendar-body .dates .week-row{
  border: none;
}
.conferenceList .full-calendar-body .dates .dates-events .events-week .events-day {
  min-height: 79px;
}
.conferenceList .comp-full-calendar p {
  font-size: 12px;
}
</style>

