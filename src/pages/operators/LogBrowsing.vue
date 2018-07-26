<template>
  <div class="content-body">
    <span class="title-span">日志浏览</span>
    <el-button @click="refreshData" type="primary"  icon="el-icon-refresh" size="mini">刷新</el-button>
    <hr>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="120px">
      <el-form-item label="操作员">
        <el-input v-model="form.createUserName"></el-input>
      </el-form-item>
      <el-form-item label="组单号">
        <el-input v-model="form.pk"></el-input>
      </el-form-item>
      <el-form-item label="行为">
        <el-select v-model="form.behavior" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.pk"
            :label="item.behavior"
            :value="item.pk">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="form.ip"></el-input>
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
      <br>
      <el-form-item label="详细（模糊搜索）">
        <el-input v-model="form.details">
        </el-input>
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
        prop="createUserName"
        align="center"
        width="110"
        label="操作员">
      </el-table-column>
      <el-table-column
        prop="behavior"
        align="center"
        label="行为">
      </el-table-column>
      <el-table-column
        prop="details"
        align="left"
        label="详细">
        <template slot-scope="scope">
          <div v-for="y in toJson(scope.row.details)">{{y}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="ip"
        align="center"
        width="140"
        label="IP">
      </el-table-column>
      <el-table-column
        prop="runResult"
        align="center"
        width="80"
        label="结果">
        <template slot-scope="scope">
          <span v-if="scope.row.runResult == 'SUCCESS'">成功</span>
          <span v-if="scope.row.runResult == 'FAILED'">失败</span>
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
import {listLog,listBehavior} from '@/api/operators/pmsLogController'
  export default {
    components: {},
    props: ['value'],
    data() {
      return {
        loading:false,
        total:0,
        form: {
          beginTime:'',
          endTime:'',
          behavior:'',
          createUserName:'',
          details:'',
          ip:'',
          pk:''
        },
        options:[],
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
        listBehavior().then(res=>{
          var arr = [];
          var item = {
            pk:'',
            behavior:'全部',
          };
          arr.push(item);
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            arr.push(element);
          }
          this.options = arr;

          this.search(1);
        })
      },
      handleSizeChange(){},
      handleCurrentChange(currPage){
        this.search(currPage);
      },
      //搜索
      search(currPage){
        var data = {
          beginTime:'',
          endTime:'',
          createUserName:this.form.createUserName,
          pk:this.form.pk,
          behavior:this.form.behavior,
          ip:this.form.ip,
          details:this.form.details,
          pageNum:currPage,
          pageSize:10
        };
        if(this.orderDate && this.orderDate.length>0){
          data.beginTime = this.orderDate[0];
          data.endTime = this.orderDate[1];
        }
        this.loading = true;
        console.log(data)
        listLog(data).then(res=>{
          this.loading = false;
          this.tableData = res.data.data;
          this.total = res.data.total
        }).catch(()=>{
          this.loading = false;
        })
      },
      refreshData(){
        this.form =  {
          beginTime:'',
          endTime:'',
          behavior:'',
          createUserName:'',
          details:'',
          ip:'',
          pk:''
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


