<template>
  <div class="content-body">
    <span class="title-span">制卡日志浏览</span>
    <el-button @click="refreshData" type="primary"  icon="el-icon-refresh" size="mini">刷新</el-button>
    <hr>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="120px">
      <el-form-item label="操作员">
        <el-input v-model="form.createUserName"></el-input>
      </el-form-item>
      <el-form-item label="客单号">
        <el-input v-model="form.orderGuestNo"></el-input>
      </el-form-item>
      <el-form-item label="房间号">
        <el-input v-model="form.roomNumber"></el-input>
      </el-form-item>
      <el-form-item label="客人姓名">
        <el-input v-model="form.guestName"></el-input>
      </el-form-item>
      <el-form-item  label="起始时间" prop="daterange">
        <el-date-picker
          v-model="orderDate"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="search(1)">搜索日志</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      height="450"
      style="width: 100%">
      <el-table-column
        prop="createTime"
        align="center"
        width="190"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="orderGuestNo"
        align="center"
        label="客单号">
      </el-table-column>
      <el-table-column
        prop="roomNumber"
        align="center"
        label="房间号">
      </el-table-column>
      <el-table-column
        prop="guestName"
        align="center"
        label="客人姓名">
      </el-table-column>
      <el-table-column
        prop="createUserName"
        align="center"
        width="110"
        label="操作员">
      </el-table-column>
      <el-table-column
        prop="beginDate"
        align="center"
        label="发卡时间" width="150">
        <template slot-scope="scope">
          <span>{{moment(scope.row.beginDate,'YYMMDDHHmm').format('YY/MM/DD HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="endDate"
        align="center"
        label="退房时间" width="150">
        <template slot-scope="scope">
          <span>{{moment(scope.row.beginDate,'YYMMDDHHmm').format('YY/MM/DD HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rflLockNo"
        align="center"
        label="锁号">
      </el-table-column>
      <el-table-column
        prop="rflCoid"
        align="center"
        label="酒店标识">
      </el-table-column>
      <el-table-column
        prop="dai"
        align="left"
        label="客人代号">
      </el-table-column>
      <el-table-column
        prop="llock"
        align="center"
        label="反锁标志">
        <template slot-scope="scope">
          <span v-if="scope.row.llock==1">能开反锁</span>
          <span v-if="scope.row.llock==0">不能开反锁</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="successFlag"
        align="center"
        label="是否成功">
        <template slot-scope="scope">
          <span v-if="scope.row.successFlag==1">成功</span>
          <span v-if="scope.row.successFlag==0">失败</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
import {listRecord} from '@/api/operators/pmsRflRecordLogController'
  export default {
    components: {},
    props: ['value'],
    data() {
      return {
        moment:moment,
        loading:false,
        total:0,
        form: {
          createUserName:'',
          orderGuestNo:'',
          roomNumber:'',
          createUserName:'',
          guestName:'',
        },
        tableData: [],
        //时间控件
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderDate:[],
      };
    },
    watch: {
      value: function () {
        if (this.value) {
          this.orderObj.orderDate = [this.value.begin, this.value.end]
        }
      }
    },
    mounted(){
      this.init();
      if (this.value) {
        this.orderDate = [this.value.begin, this.value.end]
      }
    },
    methods: {
      init(){
        // listBehavior().then(res=>{
        //   var arr = [];
        //   var item = {
        //     pk:'',
        //     behavior:'全部',
        //   };
        //   arr.push(item);
        //   for (let index = 0; index < res.data.length; index++) {
        //     const element = res.data[index];
        //     arr.push(element);
        //   }
        //   this.options = arr;

        //   this.search(1);
        // })
        this.search(1);
      },
      handleSizeChange(){},
      handleCurrentChange(currPage){
        this.search(currPage);
      },
      //搜索
      search(currPage){
        console.log();
        var data = {
          beginTime:'',
          endTime:'',
          pageNum:currPage,
          pageSize:10,
          createUserName:this.form.createUserName,
          orderGuestNo:this.form.orderGuestNo,
          roomNumber:this.form.roomNumber,
          guestName:this.form.guestName
        };
        if(this.orderDate && this.orderDate.length>0){
          data.beginTime = this.orderDate[0];
          data.endTime = this.orderDate[1];
        }
        this.loading = true;
        listRecord(data).then(res=>{
          this.loading = false;
          this.tableData = res.data.data;
          this.total = res.data.total
        }).catch(()=>{
          this.loading = false;
        })
      },
      refreshData(){
        this.form =  {
          createUserName:'',
          orderGuestNo:'',
          roomNumber:'',
          createUserName:'',
          guestName:'',
        };
        this.orderDate = [];
        this.search(1);
      },
      toJson(str) {
        try{
          return JSON.parse(str)
        }catch (e){
          return [str]
       }
      }
    },
   
  };
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
  /* width: 1000px; */
  overflow-y: auto;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px 0;
    display: inline-block;
}
</style>


