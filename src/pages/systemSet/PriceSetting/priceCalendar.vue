// 价格日历
<template>
  <div>
    <el-dialog title="房价修改" :visible.sync="dialogVisible" width="600px" center class="fullCalendar" :before-close="closeDialog">
      <div class="calendar-box" ref="fullcalendarRef">
        <full-calendar ref="calendar" :events="meetingEventList"  lang="zh" @eventClick="eventClick" @changeMonth="changeMonth" @dayClick="dayClick">
        </full-calendar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="closeDialog">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改价格" center :visible.sync="modifyPriceDialog" width="300px" class="modifyPrice">
      <el-form :model="form" size="mini">
      <span style="font-weight:600;padding-bottom:20px;">{{form.beginDate}} 房价修改</span>
        <el-form-item>
          <el-input v-model="form.price" placeholder="请输入新价格"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="modifyPriceDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
var demoEvents = [
  {
    title: "元宵节",
    start: "2018-03-02",
    cssClass: "festival", //节日所用样式
    YOUR_DATA: {}
  },
  {
    title: "妇女节",
    start: "2018-03-09",
    cssClass: "festival", //节日所用样式
    YOUR_DATA: {}
  },
  {
    title: "￥666",
    start: "2018-03-08",
    cssClass: "price", //价格所用样式
    YOUR_DATA: {}
  },
  {
    title: "￥666",
    start: "2018-03-09",
    cssClass: "price", //价格所用样式
    YOUR_DATA: {}
  },
  {
    title: "￥666",
    start: "2018-03-10",
    cssClass: "price", //价格所用样式
    YOUR_DATA: {}
  }
];
import { PrefixInteger,formatDate } from "@/utils/index";
import { calendarPrice,editPrice } from "@/api/systemSet/pmsRoomTypePriceController";
export default {
  components: {
    "full-calendar": require("vue-fullcalendar")
  },
  data() {
    return {
      meetingEventList: demoEvents,
      dialogVisible: false,
      modifyPriceDialog: false,
      roomTypePk: '',
      currDate:null,
      form: {
        beginDate:'',
        price:'',
      },
    };
  },
  methods: {
    /**
     * 初始化
     * @augments roomTypePk 房间类型主键
     * */
    init(roomTypePk) {
      this.roomTypePk = roomTypePk;
      this.dialogVisible = true;
      this.calendarPrice('2018-05-04')
    },
    // setBeginDate() {
    //   let firstCell = this.$refs.fullcalendarRef.getElementsByClassName(
    //     "day-number"
    //   )[0].innerHTML;
    //   let cellMonth = this.$refs.fullcalendarRef
    //     .getElementsByClassName("full-calendar-header")[0]
    //     .getElementsByClassName("title")[0].innerHTML;
    //   cellMonth = cellMonth.replace("年", "-").replace("月", "-");
    //   let beginDate = cellMonth + PrefixInteger(firstCell, 2);
    //   this.beginDate = beginDate;
    //   console.log("第一次：" + beginDate);
    // },

    //加载日历价格数据 
    calendarPrice(beginDate) {
      let data = {
        roomTypePk: this.roomTypePk,
        beginDate: beginDate
      }
      calendarPrice(data).then(res=>{
        this.meetingEventList = res.data.concat(demoEvents)
      })
    },
    //日历月份点击事件 （页面打开自动调用）
    changeMonth(start, end, current) {
      this.calendarPrice(current);
      this.currDate = current
    },
    //日历事件点击函数
    eventClick(event, jsEvent, pos) {},
    //日历日期点击函数
    dayClick(day, jsEvent) {
      this.form.beginDate = formatDate(day, 'yyyy-MM-dd')
      this.form.price = null
      this.modifyPriceDialog = true;
    },
    editConfirm(){//确定修改价格
      let data = {
        roomTypePk: this.roomTypePk,
        beginDate: this.form.beginDate,
        price: this.form.price
      }
      editPrice(data).then(res=>{
        this.$message({type:'success', message:'修改成功'})
        this.calendarPrice(this.currDate);
        this.modifyPriceDialog = false;
      })
    },
    closeDialog(){
      this.dialogVisible = false
    }
  }
};
</script>

<style>
.modifyPrice .el-dialog__body {
  padding: 0 30px;
}
/* 插件样式 */
.calendar-box .full-calendar-header .header-center .prev-month,
.calendar-box .full-calendar-header .header-center .next-month,
.calendar-box .full-calendar-header .header-center .title {
  font-size: 16px;
  font-weight: 600;
}
.calendar-box .full-calendar-body .weeks {
  width: 490px;
  margin: 0 auto;
  background-color: #f60;
  color: #fff;
}
.calendar-box .full-calendar-body .dates .week-row {
  border-left: 1px solid #f60;
}
.calendar-box .full-calendar-body .dates .week-row,
.calendar-box .full-calendar-body .dates .dates-events .events-week {
  width: 489px;
  margin: 0 auto;
}
/* .calendar-box .full-calendar-body .dates .dates-events .events-week .events-day, */
.calendar-box .full-calendar-body .dates .week-row .day-cell {
  border-right: 1px solid #f60;
  border-bottom: 1px solid #f60;
  position: relative;
}
.calendar-box .full-calendar-body .event-item{
  padding: 0 !important;
}
.calendar-box .full-calendar-body .event-item.festival {
  background-color: red !important;
  color: #fff !important;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 60px;
  left: 0;
}
.calendar-box .full-calendar-body .today .event-item.price {
  background-color:transparent !important;
  color: #fff !important;
}
.calendar-box .full-calendar-body .today .event-item.festival {
  /* background-color: #fff !important; */
  color: #f60 !important;
}
/* .calendar-box .full-calendar-body .event-item.is-start{
    margin-left: 0px !important;
} */
.calendar-box .full-calendar-body .event-item.price {
  background-color:transparent !important;
  color: #f60 !important;
  font-size: 12px !important;
  font-weight: 600;
  text-align: center;
}
.calendar-box .full-calendar-body .dates .week-row .day-cell.today .day-number {
  color: #fff;
}
.calendar-box .full-calendar-body .dates .week-row .day-cell .day-number,
.calendar-box
  .full-calendar-body
  .dates
  .dates-events
  .events-week
  .events-day
  .day-number {
  text-align: center !important;
  padding-bottom: 0px;
}
.calendar-box .full-calendar-body .dates .week-row .day-cell {
  min-height: 60px;
  overflow: hidden;
}
.calendar-box .full-calendar-body .dates .week-row .day-cell.today {
  background-color: #f60;
}
.calendar-box
  .full-calendar-body
  .dates
  .dates-events
  .events-week
  .events-day {
  position: relative;
  min-height: 69px;
}
.calendar-box .comp-full-calendar p {
  font-size: 12px;
}
</style>
