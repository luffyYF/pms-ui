<template>
  <div style="padding:30px;">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="conferenceList">
          <p class="title">会议室</p>
          <el-button type="primary" v-for="item in meetingRoomList" 
            :key="item.roomPk"
            @click="changeRoom(item)"
            :title="'位置：'+item.address+'\r\n容纳人数：'+item.roomCapacity+'\r\n管理员：'
            +item.administrators+'\r\n面积：'+item.roomArea+'\r\n规格：'
            +item.roomSpec+'\r\n设备：'+item.equipment+'\r\n描述：'
            +item.roomDesc">{{item.roomName}}</el-button>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="conferenceList" style="padding-top:0;height:620px;">
          <p style="font-weight:600;margin-bottom:0;">
            会议室日程安排
            <span><span class="tip-block bg-red"></span>预订已确认</span>
            <span><span class="tip-block bg-family"></span>预订未确认</span>
          </p>
          <full-calendar :events="meetingEventList" lang="zh"
            @eventClick="eventClick"
            @changeMonth="changeMonth"
            @dayClick="dayClick">
          </full-calendar>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="会议室预订"
      :visible.sync="orderBookDialog"
      width="40%">
      <div class="bg-reserve">  
          <el-form :model="meetingBookObj" :rules="meetBookRules" ref="meetingBookObj" size="mini" label-width="100px" class="demo-ruleForm">
            <div class="bg-reserve">
              <h5 class="info-title">预订登记</h5>
              <el-form-item label="会议室名称" prop="roomPk">
                <el-select v-model="meetingBookObj.roomPk" :disabled="true" placeholder="请选择会议室">
                  <el-option v-for="item in meetingRoomList" :key="item.roomPk" :label="item.roomName" :value="item.roomPk"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预定公司名称" prop="companyName">
                <el-input v-model="meetingBookObj.companyName"></el-input>
              </el-form-item>
              <el-form-item label="会议主题">
                <el-input v-model="meetingBookObj.bookTheme"></el-input>
              </el-form-item>
              <el-form-item label="预订人姓名" prop="bookUserName">
                <el-input v-model="meetingBookObj.bookUserName"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="bookUserPhone">
                <el-input v-model="meetingBookObj.bookUserPhone"></el-input>
              </el-form-item>
              <el-form-item label="预订人数" prop="bookNum">
                <el-input v-model="meetingBookObj.bookNum"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="meetingBookObj.remark"></el-input>
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">档期</h5>
              <el-button type="primary" size="mini" @click="addSchedule" style="margin-bottom:10px;">添加档期</el-button>
              <el-table
                :data="book_scheduleList"
                border
                size="mini"
                empty-text=" "
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="mtgDate"
                  label="开会日期">
                  <template slot-scope="scope" >
                     <el-date-picker
                      align="center"
                      v-model="scope.row.mtgDate"
                      size="mini"
                      type="date"
                      :disabled="!scope.row.isNew"
                      placeholder="选择日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="mtgTimeType"
                  width="140"
                  label="开会时段">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.mtgTimeType"
                      :disabled="!scope.row.isNew" size="mini" placeholder="选择时段">
                      <el-option label="上午" value="MORNING"></el-option>
                      <el-option label="下午" value="AFTERNOON"></el-option>
                      <el-option label="晚上" value="EVENING"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="isNew"
                  width="100"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button v-show="scope.row.isNew" @click="saveClick(scope.$index,book_scheduleList)" type="text" size="mini">保存</el-button>
                    <el-button v-show="!scope.row.isNew" @click="deleteClick(scope.$index,book_scheduleList)" type="text" size="mini">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
              <el-button @click="submitForm('meetingBookObj')" type="primary" size="small" style="margin:20px auto;display:block;">提交订单</el-button>
          </el-form>
          <p>注：<i style="color:red;">*</i>为必填项</p>
      </div>
    </el-dialog>
    <el-dialog
      title="订单管理"
      :visible.sync="orderManageDialog"
      :fit="false"
      width="70%">
      <div class="bg-reserve">
        <div class="bg-reserve">    
          <h5 class="info-title">档期</h5>
          <el-form size="mini" :inline="true" :model="manager_eventDetail" class="demo-form-inline">
            <el-form-item label="会议室名称：">
              <el-select v-model="nowSelectBook.roomPk" :disabled="true" placeholder="">
                <el-option v-for="item in meetingRoomList" :key="item.roomPk" :label="item.roomName" :value="item.roomPk"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开会日期">
              <el-input :disabled="true" v-model="nowSelectBook.mtgDate" placeholder="开会日期"></el-input>
            </el-form-item>
            <el-form-item label="预订时段">
              <template slot-scope="scope">
                <el-select v-model="nowSelectBook.mtgTimeType" :disabled="true" size="mini" placeholder="">
                  <el-option label="上午" value="MORNING"></el-option>
                  <el-option label="下午" value="AFTERNOON"></el-option>
                  <el-option label="晚上" value="EVENING"></el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reAddBook(null)">增加预订</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="bg-reserve">    
          <h5 class="info-title">订单列表</h5>
          <el-table
            :data="manager_orderList"
            border
            style="width: 100%">
            <el-table-column
              prop="bookTheme"
              align="center"
              label="会议主题">
            </el-table-column>
            <el-table-column
              prop="companyName"
              align="center"
              label="公司名称">
            </el-table-column>
            <el-table-column
              prop="bookUserName"
              align="center"
              label="预订人">
            </el-table-column>
            <el-table-column
              prop="bookUserPhone"
              align="center"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="bookNum"
              align="center"
              label="预订人数">
            </el-table-column>
            <el-table-column
              prop="allSchedule"
              align="center"
              label="全部档期">
              <template slot-scope="scope">
                <el-button @click="showAllSchedule(scope.row)" type="text" size="mini">全部档期</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="billFlag"
              align="center"
              label="挂账标志">
              <template slot-scope="scope">
                <span>{{scope.row.billFlag=='Y'?'已挂账':'未挂账'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              align="center"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="confirm"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button v-show="!scope.row.confirmFlag&&scope.row.billFlag=='N'" @click="reAddBook(scope.row)" type="text" size="mini">添加</el-button>
                <el-button v-show="!scope.row.confirmFlag&&scope.row.billFlag=='N'" @click="modifyBook(scope.row)" type="text" size="mini">修改</el-button>
                <el-button v-show="!scope.row.confirmFlag&&scope.row.billFlag=='N'" @click="operAllDq(scope.row,'Y')" type="text" size="mini">确认</el-button>
                <el-button v-show="!scope.row.confirmFlag&&scope.row.billFlag=='N'" @click="operAllDq(scope.row,'N')"  type="text" size="mini">取消</el-button>
                <el-button v-show="scope.row.confirmFlag=='Y'&&scope.row.billFlag=='N'" @click="submitBillBtn(scope.row)" type="text" size="mini">挂账</el-button>
                <span v-show="scope.row.confirmFlag=='N'">此订单已取消</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div> 
    </el-dialog>
    <el-dialog
      title="档期查看"
      :visible.sync="scheduleDialog"
      :fit="false"
      width="60%">
      <div class="bg-reserve">
        <div class="bg-reserve">    
          <h5 class="info-title">全部档期</h5>
          <el-button @click="confirmAllDq(allScheduleList)" type="success" size="mini">全部确定</el-button>
          <el-button @click="cancelAllDq(allScheduleList)" type="success" size="mini">全部取消</el-button>
          <el-table
            :data="allScheduleList"
            border
            style="width: 100%;margin-top:10px;">
            <el-table-column
              prop="companyName"
              label="预定公司名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="bookTheme"
              label="会议主题"
              align="center">
            </el-table-column>
            <el-table-column
              prop="mtgDate"
              label="开会日期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="mtgTimeType"
              label="开会时段"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.mtgTimeType=='MORNING'?'上午':scope.row.confirmFlag=='AFTERNOON'?'下午':'EVENING'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="confirmFlag"
              label="状态"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.confirmFlag=='Y'?'已确认':scope.row.confirmFlag=='N'?'已取消':'未确认'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="confirm"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button @click="confirmDq(scope.row)" v-show="!scope.row.confirmFlag" type="text" size="mini">确认</el-button>
                <el-button @click="cancelDq(scope.row)" v-show="!scope.row.confirmFlag" type="text" size="mini">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog 
      title="会议室预订"
      :visible.sync="modifyBookDialog"
      :fit="false"
      width="40%">
      <div class="bg-reserve">  
        <div class="bg-reserve">    
          <h5 class="info-title">修改预订</h5>
          <el-form :model="modifyBookDetail" :rules="meetBookRules" ref="meetingBookObj" size="mini" label-width="100px" class="demo-ruleForm">
            <el-form-item label="会议室名称" prop="roomPk">
                <el-select v-model="modifyBookDetail.roomPk" :disabled="true" placeholder="请选择会议室">
                  <el-option v-for="item in meetingRoomList" :key="item.roomPk" :label="item.roomName" :value="item.roomPk"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="预定公司名称" prop="companyName">
              <el-input :disabled="true" v-model="modifyBookDetail.companyName"></el-input>
            </el-form-item>
            <el-form-item label="会议主题">
              <el-input v-model="modifyBookDetail.bookTheme"></el-input>
            </el-form-item>
            <el-form-item label="预订人姓名" prop="bookUserName">
              <el-input v-model="modifyBookDetail.bookUserName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="bookUserPhone">
              <el-input v-model="modifyBookDetail.bookUserPhone"></el-input>
            </el-form-item>
            <el-form-item label="预订人数" prop="bookNum">
              <el-input v-model="modifyBookDetail.bookNum"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="modifyBookDetail.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="modifyBookConfirm" type="primary">确认</el-button>
              <el-button  type="primary">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="会议室费用挂账"
      :visible.sync="billDialog"
      :fit="false"
      width="400px">
        <el-form :model="billDetail" size="mini" label-width="80px" class="demo-ruleForm">
          <el-form-item label="账单号">
            <el-input disabled v-model="billDetail.billId"></el-input>
          </el-form-item>
          <el-form-item label="预定公司名称">
            <el-input disabled v-model="billDetail.companyName"></el-input>
          </el-form-item>
          <el-form-item label="会议主题">
            <el-input disabled v-model="billDetail.bookTheme"></el-input>
          </el-form-item>
          <el-form-item label="挂账金额">
            <el-input v-model="billDetail.money"></el-input>
          </el-form-item>
          <el-form-item label="挂账组单">
            <el-input disabled v-model="billDetail.singleGroupPk" ></el-input>
            <el-button type="text" @click="choseGroup">选择</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitBill" type="primary">挂账</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
      title="选择组单"
      :visible.sync="groupDialog"
      :fit="false"
      width="80%">
      <div class="bg-reserve">
        <div class="bg-reserve">    
          <h5 class="info-title">查询</h5>
          <el-form :inline="true" size="mini" :model="selectGroupObj" class="demo-form-inline">
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
            <el-form-item label="单据类别：">
              <el-select v-model="selectGroupObj.groupType">
                <el-option label="客单" value="ORDERGUEST"></el-option>
                <el-option label="哑房单" value="DUMBHOUSE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getOrderList(selectGroupObj.groupType)" type="primary">查询</el-button>
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
              prop="checkoutUserName"
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
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// var demoEvents = [
//   {
//     title: "（下）测试",
//     start: "2018-03-07",
//     cssClass: "confirmed",
//     YOUR_DATA: {
//       status: "confirmed", //事件状态，作用：来判断cssClass使用family样式还是
//       timeSlot: "下"
//     }
//   },
//   {
//     title: "（晚）公司会议",
//     start: "2018-03-07",
//     cssClass: "unconfirmed",
//     YOUR_DATA: {
//       status: "unconfirmed",
//       timeSlot: "晚"
//     }
//   }
// ];
import {addDumbAndBill,mtgRoomGroupOrderList,listDumbHouse,updateBook,batchOperateDq ,listMtgRoom,listBookDqByRoomPkAndDate,addBookAndDq,listBookDqByDate,listBookDqByRoomPkAndBookPk} from '@/api/conferenceRoom/mtgRoomController'
import Moment from 'Moment'
export default {
  components: {
    "full-calendar": require("vue-fullcalendar")
  },
  data() {
    return {
      selectRoomPk: '',
      nowSelectRoom:{roomPk:null},//当前选择的会议室
      nowSelectBook:{},//当前选择的会议室预定
      currBook:{},//当前订单管理选中的预定对象
      currBill:{},//当前订单管理选中的挂账对象
      currGroupType:'ORDERGUEST',
      meetingEventList: [],     //  当月会议事件demoEvents
      meetingRoomList:[],   //会议室列表集合
      orderBookDialog: false,           //  是否显示订单预订模态框
      orderManageDialog: false,         //  是否显示订单管理模态框
      scheduleDialog:false,             //  是否显示全部档期模态框
      modifyBookDialog: false,          //  是否显示修改预订模态框
      billDialog:false,                 //  是否显示挂账模态框
      groupDialog:false,
      meetingBookObj:{                  //  预订会议室表单对象
      },
      meetBookRules: {                           //  预订会议室表单验证规则
        roomPk: [
          { required: true, message: "请选择会议室", trigger: "blur" }
        ],
        conpanyName: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        bookUserName: [
          { required: true, message: "请填写预订人姓名", trigger: "blur" }
        ],
        bookUserPhone: [{ required: true, message: "请填写联系电话", trigger: "blur" }]
      },
      book_scheduleList:[],              //预订会议室时的档期列表
      manager_eventDetail:{          //订单管理模态框显示的当前档期详情
      },
      manager_orderList: [        //订单管理模态框显示的当前订单详情
      ],
      allScheduleList:[    //全部档期
      ],   
      modifyBookDetail:{   //修改预订内容
      },
      billDetail:{      //费用挂账
      },
      selectGroupObj:{     //查询组单对象
        roomNum:'',
        name:'',
        phone:'',
        groupNum:'',
        groupType:''
      },
      groupList:[     //组单表格列表
      ],
    };
  },
  mounted() {
    this.initDate();
  },
  methods: {
    //初始化方法
    initDate(){
      //获取会议室列表
      listMtgRoom().then(res => {
        if(res.code==1){
          this.meetingRoomList = res.data;
          //默认选中第一个会议室
          this.changeRoom(this.meetingRoomList[0]);
        }
      }).catch(error=>{
        // this.$message({type:'danger', message: error})
      })
    },
    //切换会议室
    changeRoom(item){
      // console.log(item);
      // console.log("-------=======");
      this.nowSelectRoom = item;
      this.selectRoomPk = item.roomPk;
      var date_ = new Date();    
      var year = date_.getFullYear();    
      var month = date_.getMonth() + 1;  
      month = month>9?month:'0'+month;
      let firstDay = year + '-' + month + '-01';//当月第一天  
      var tempDay = new Date(year,month,0);        
      let lastDay = year + '-' + month + '-' + tempDay.getDate();//当月最后一天  
      let nowDay = Moment(new Date()).format("YYYY-MM-DD");//今天
      this.changeMonth(firstDay,lastDay,nowDay);
    },
    //日历月份点击事件
    changeMonth(start, end, current) {
      //获取选中会议室指定时间段的日程数据
      this.initRoomClendar(this.nowSelectRoom.roomPk,start,end);
    },
    //初始化指定会议室指定时间段的预定档期
    initRoomClendar(roomPk,beginDate,endDate){
      var data = {
        roomPk:this.nowSelectRoom.roomPk,
        beginDate:beginDate,
        endDate:endDate
      };
      if(data.roomPk==null){  //处理日历初始化自动调用改变月份初始化数据获取不到roomPK的bug
        return false;
      }
      listBookDqByRoomPkAndDate(data).then(res => {
        if(res.code==1){
          this.meetingEventList = res.data;
        }else{
          this.$message({type:'danger', message: res.msg})
        }
      }).catch(error=>{
          // console.log("==--------=====!!!!!");
        this.$message({type:'danger', message: error})
      })
    },
    //会议室事件点击函数
    eventClick(event, jsEvent, pos) {
      this.manager_eventDetail = event;
      this.nowSelectBook = event.data?event.data:event;
      this.nowSelectBook.mtgDate = Moment(this.nowSelectBook.mtgDate).format("YYYY-MM-DD");
      let data = {
        roomPk:this.nowSelectBook.roomPk,
        date:this.nowSelectBook.mtgDate,
        timeType:this.nowSelectBook.mtgTimeType
      };
      listBookDqByDate(data).then(res => {
        if(res.code==1){
          this.manager_orderList = res.data;
          this.orderManageDialog = true;
        }else{
          this.$message({type:'danger', message: res.msg})
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      })
    },
    //日历日期点击函数
    dayClick(day, jsEvent) {
      this.meetingBookObj = {roomPk:this.nowSelectRoom.roomPk};
      this.book_scheduleList = [];
      // console.log("dayClick", day, jsEvent);
      this.orderBookDialog = true;
    },
    //添加档期
    addSchedule() {
      this.book_scheduleList.unshift({
        meetingTime: Moment(new Date()).format("YYYY-MM-DD"),
        meetingInterval: "",
        isNew: true
      });
    },
    //保存档期
    saveClick(index,rows) {
      var row = rows[index];
      if(row.mtgDate==null||row.mtgDate==""){
        this.$message({type:'danger', message: '请选择日期'})
        return false;
      }
      if(row.mtgTimeType==null||row.mtgTimeType==""){
        this.$message({type:'danger', message: '请选择时段'})
        return false;
      }
      row.mtgDate = Moment(row.mtgDate).format("YYYY-MM-DD")
      let num = 0;
      rows.forEach(ele => {
        if(ele.mtgDate == row.mtgDate 
          && ele.mtgTimeType == ele.mtgTimeType){
            num++;
          }
      });
      if(num>1){
        this.$message({type:'danger', message: '该档期已存在'});
        rows.splice(index,1);
        return false;
      }
      row.isNew = false;
    },
    //删除档期
    deleteClick(index,rows) {
      rows.splice(index, 1);
    },
    //提交会议室预定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //处理数据
          let data = {
            bookPo:this.meetingBookObj,
            bookDqList:this.book_scheduleList
          };
          if(data.bookDqList.size<=0){
            this.$message({type:'waring', message: '请添加档期'})
            return false;
          }
          addBookAndDq(data).then(res=>{
            if(res.code==1){
              this.$message({type:'success', message: '新增成功'})
              this.book_scheduleList = [];
              this.$refs[formName].resetFields();
              this.initDate();
              this.orderBookDialog = false;
            }
          }).catch(error=>{
            this.$message({type:'danger', message: error})
          })
        } else {
          return false;
        }
      });
    },
    //增加预订
    reAddBook(row) {
      this.meetingBookObj = row!=null?row:{};
      this.meetingBookObj.roomPk = this.selectRoomPk;
      this.book_scheduleList = [];
      this.orderBookDialog = true;
    },
    //显示全部档期
    showAllSchedule(row){
      this.currBook = row;
      let data = {
        roomPk:row.roomPk,
        bookPk:row.bookPk
      };
      listBookDqByRoomPkAndBookPk(data).then(res=>{
        if(res.code==1){
          this.allScheduleList = res.data;
          this.scheduleDialog = true;
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      })
    },
    //订单管理订单列表页面档期数据操作
    operAllDq(row,status){
      let data = {
        roomPk:row.roomPk,
        bookPk:row.bookPk
      };
      listBookDqByRoomPkAndBookPk(data).then(res=>{
        if(res.code==1){
          var tempData = res.data;

          let dqPks = [];
          let dqPk = "";
          tempData.forEach(obj => {
            dqPk = obj.dqPk
            dqPks.push(dqPk);
          });
          var data2={
            dqPks:dqPks,
            status:status
          };
          batchOperateDq(data2).then(res=>{
            if(res.code==1){
              this.eventClick(this.nowSelectBook);
              this.initDate();
            }
          }).catch(error=>{
            this.$message({type:'danger', message: error})
          })
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      })
    },
    //查看档期页面档期数据操作
    operDq(data){
      batchOperateDq(data).then(res=>{
        if(res.code==1){
          this.showAllSchedule(this.currBook);
          this.initDate();
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      })
    },
    //确认全部档期
    confirmAllDq(rows){
      let dqPks = [];
      let dqPk = "";
      rows.forEach(obj => {
        dqPk = obj.dqPk
        dqPks.push(dqPk);
      });
      var data={
        dqPks:dqPks,
        status:'Y'
      };
      this.operDq(data);
    },
    //取消全部档期
    cancelAllDq(rows){
      let dqPks = [];
      let dqPk = "";
      rows.forEach(obj => {
        dqPk = obj.dqPk
        dqPks.push(dqPk);
      });
      var data={
        dqPks:dqPks,
        status:'N'
      };
      this.operDq(data);
    },
    //确认档期
    confirmDq(row){
      let dqPks = [row.dqPk];
      var data={
        dqPks:dqPks,
        status:'Y'
      };
      this.operDq(data);
    },
    //取消档期
    cancelDq(row){
      let dqPks = [row.dqPk];
      var data={
        dqPks:dqPks,
        status:'N'
      };
      this.operDq(data);
    },
    //修改预订信息按钮
    modifyBook(row){
      this.modifyBookDetail = row;
      this.modifyBookDialog = true;
    },
    //修改预订信息
    modifyBookConfirm(){
      updateBook(this.modifyBookDetail).then(res=>{
        if(res.code==1){
          this.modifyBookDialog = false;
          this.eventClick(this.nowSelectBook);
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      })
    },
    //挂账按钮
    submitBillBtn(row){
      this.billDetail = row;
      this.billDetail.billId = 'CRO'+Moment(new Date()).format("YYYYMMDDhhmmss");
      this.billDialog = true;
    },
    //挂账租单选择按钮
    choseGroup(){
      this.selectGroupObj.groupType = this.currGroupType;
      this.getOrderList(this.currGroupType);
      this.groupDialog = true;
    },
    //获取组单列表
    getOrderList(groupType){
      this.currGroupType = groupType;
      this.groupList=[];
      if("ORDERGUEST"==groupType){
        mtgRoomGroupOrderList().then(res=>{
          if(res.code==1){
            this.groupList = res.data;
          }
        }).catch(error=>{
          this.$message({type:'danger', message: error})
        })
      }else if("DUMBHOUSE"==groupType){
        listDumbHouse().then(res=>{
          if(res.code==1){
            this.groupList = res.data;
          }
        }).catch(error=>{
          this.$message({type:'danger', message: error})
        })
      }
    },
    //选中挂账账单
    choseGroupConfirm(row){
      this.currBill = row;
      if("ORDERGUEST"==this.currGroupType){
        this.billDetail.singleGroupPk = this.currBill.orderPk;
      }else{
        this.billDetail.singleGroupPk = this.currBill.orderNo;
      }
      this.groupDialog = false;
    },
    //挂账
    submitBill(){
      let dumbHousePo={
        name:this.billDetail.companyName,
        balance:0,
        checkoutFlag:"N",
        businessDate:Moment(new Date()).format("YYYY-MM-DD"),
        remark:'会议室挂账，会议室账单号：'+this.billDetail.billId
      };
      let billPo = {
        projectName:'会议费',
        billStatus:'UN_SET',//未结账/未处理
        consumptionAmount:this.billDetail.money,
        settlementAmount:0,
        billType: 'DUMB',
        // dumbPk: this.billDetail.singleGroupPk,
        businessDate:Moment(new Date()).format("YYYY-MM-DD")
      };
      let data = {
        dumbHousePo:dumbHousePo,
        billPo:billPo
      }
      addDumbAndBill(data).then(res=>{
        if(res.code==1){
          this.$message({type:'danger', message: '挂账成功'})
          this.eventClick(this.nowSelectBook);
          this.billDialog = false;
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      })
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
  height: 590px;
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
.conferenceList .full-calendar-body .dates .dates-events .events-week .events-day {
  min-height: 79px;
}
.conferenceList .comp-full-calendar p {
  font-size: 12px;
}
</style>

