<template>
  <div class="content-body">
    <el-col :span="24">
      <!-- 筛选条件表单 -->
      <el-form :model="searForm" :inline="true" size="mini" label-width="80px"  class="demo-form-inline">
        <el-form-item label="组单号">
          <el-input v-model="searForm.orderNo" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="searForm.createUserName" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="searForm.remark" clearable></el-input>
        </el-form-item>
        <el-form-item label="协议单位">
          <el-select v-model="searForm.agreementPk" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in agreementList"
              :key="item.agreementPk"
              :label="item.unitName"
              :value="item.agreementPk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="创建日期" prop="createTime">
          <el-date-picker
            v-model="searForm.createTime"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="orderDateChange"
            align="right">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item  label="创建营业日期" prop="orderDate">
          <el-date-picker
            v-model="orderDate"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="orderDateChange"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="结账营业日期" prop="orderDate">
          <el-date-picker
            v-model="orderDate"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="orderDateChange"
            align="right">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item  label="结账日期" prop="checkoutDate">
          <el-date-picker
            v-model="searForm.checkoutDate"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="orderDateChange"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searForm.checkoutFlag" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList(1)">搜索订单</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table 
      v-loading="loading" 
      :data="tableData" 
      border
      stripe>
      <el-table-column label="组单号" prop="orderNo">
      </el-table-column>
      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="余额" prop="balance">
      </el-table-column>
      <el-table-column label="状态" prop="checkoutFlag">
        <template slot-scope="scope">
          <span>{{scope.checkoutFlag=='Y'?'已结账':'未结账'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createUserName">
      </el-table-column>
      <el-table-column label="结账日期" prop="checkoutDate">
      </el-table-column>
      <el-table-column label="结账人" prop="checkoutUserName">
      </el-table-column>
      <el-table-column label="备注" prop="remark">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showDumbDetail(scope.row)" type="text" size="mini">查看</el-button>
          <el-dialog :title="scope.row.orderNo" :visible.sync="dialogTableVisible" width="70%">
            <el-button type="primary" size="mini"  @click="showOperList(scope.row.dumbPk)" class="opear-str">操作记录</el-button>
            <!-- 操作记录 -->
            <el-dialog
              title="操作记录"
              append-to-body
              :visible.sync="operDialogVisible"
              width="40%">
              <el-table
                :data="logList"
                border
                style="width: 100%">
                <el-table-column
                  prop="createTime"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="createUserName"
                  label="操作员">
                </el-table-column>
                <el-table-column
                  prop="behavior"
                  label="行为">
                </el-table-column>
                <el-table-column
                  prop="details"
                  label="详细">
                </el-table-column>
                <el-table-column
                  prop="ip"
                  label="IP">
                </el-table-column>
                <el-table-column
                  prop="runResult"
                  label="结果">
                  <template slot-scope="scope">
                    <span>{{scope.row.runResult=='SUCCESS'?'成功':'失败'}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <!-- 哑房单 -->
              <el-tab-pane label="哑房单" name="first">
                <el-form :inline="true" :model="dumbDetailObj" :ref="dumbDetailObj" :rules="rules" size="mini" label-width="100px">
                  <el-form-item label="协议单位">
                    <el-select v-model="dumbDetailObj.agreementPk" placeholder="协议单位">
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in agreementList"
                        :key="item.agreementPk"
                        :label="item.unitName"
                        :value="item.agreementPk">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="dumbDetailObj.name" placeholder="名称"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input
                      type="textarea"
                      :rows="2"
                      style="width: 450px;"
                      placeholder="请输入备注"
                      v-model="dumbDetailObj.remark">
                      </el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="创建日期">
                    <el-input v-model="dumbDetailObj.createTime" readonly placeholder="创建日期"></el-input>
                  </el-form-item>
                  <el-form-item label="创建营业日期">
                    <el-input v-model="dumbDetailObj.businessDate" readonly placeholder="创建营业日期"></el-input>
                  </el-form-item>
                  <el-form-item label="创建人">
                    <el-input v-model="dumbDetailObj.createUserName" readonly placeholder="创建人"></el-input>
                  </el-form-item>
                </el-form>
                <hr>
                <center>
                  <el-button size="mini" type="primary" @click="updateDumb">保 存</el-button>
                  <el-button size="mini" type="primary" @click="dialogTableVisible = false">关 闭</el-button>
                </center>
              </el-tab-pane>
              <!-- 账单 -->
              <el-tab-pane label="账单" name="second" :disabled="dumbHouse">
                <bill-tag ref="bill" :dumb-obj="scope.row"/>
              </el-tab-pane>
            </el-tabs>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="positions" @size-change="getSizeChange" @current-change="getList" :current-page="searForm.pageNum" :page-size="searForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="countSize"></el-pagination>
  </div>
</template>

<script>
  import Moment from 'moment'
  import {listByGrid,updateDumbHouse,listLog} from '@/api/dumbHouse/pmsDumbHouseController'
  import {listProject } from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
  import BillTag from "../reserveManage/addReserve/bill"
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    props: ['dumbHouse'],
    components: {BillTag},
    data () {
      return {
        loading:false,
        searForm:{
          orderNo:'',
          name:'',
          createUserName:'',
          agreementPk:'',
          checkoutFlag:null,
          remark:'',
          checkoutDateStart:null,
          checkoutDateEnd:null,
          createTimeStart:null,
          createTimeEnd:null,
          pageNum: 1,
          pageSize: 10
        },
        agreementList: [], //协议单位
        tableData: [],//哑房账列表对象
        cacheTableData: [],//哑房账列表对象
        dumbDetailObj:{},
        //校验规则
        rules: {
          name: [
            { required: true, message: '请填写名称', trigger: 'blur' }
          ]
        },
        total: 0,
        options: [
           {
            value: null,
            label: '全部'
          }, {
            value: 'Y',
            label: '已结账'
          }, {
            value: 'N',
            label: '未结账'
          }
        ],
        //时间控件
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() < Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '后三天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 365)
              picker.$emit('pick', [start, end])
            }
          }],
        },
        dialogTableVisible:false,
        activeName:'first',
        formInline:{},
        operDialogVisible:false,
        logList:[],//操作记录集合
        countSize: 0,
      }
    },
    created () {//初始化加载
      this.getList(this.searForm.pageNum);
      this.listProjectDate();
    },
    watch: {
      createTime: function () {
        if (this.value) {
          this.searForm.createTime = [this.value.begin, this.value.end]
        }
      },
      checkoutDate: function () {
        if (this.value) {
          this.searForm.checkoutDate = [this.value.begin, this.value.end]
        }
      }
    },
    methods: {
      // powerJudge(id){
      //   return powerJudge(id);
      // },
      //获取协议的单位
      listProjectDate(){
        listProject().then(res => {
          this.agreementList = res.data.data;
        })
      },
      getList (val) {  //获取列表数据
        this.loading = true;
        let searchForm = {};
        this.searForm.pageNum = val;
        searchForm = this.searForm;
        if(searchForm.createTime){
          searchForm.createTimeStart=Moment(searchForm.createTime[0]).format("YYYY-MM-DD hh:mm:ss");
          searchForm.createTimeEnd=Moment(searchForm.createTime[1]).format("YYYY-MM-DD hh:mm:ss");
        }else{
          searchForm.createTimeStart = null;
          searchForm.createTimeEnd = null;
        }
        if(searchForm.checkoutDate){
          searchForm.checkoutDateStart=Moment(searchForm.checkoutDate[0]).format("YYYY-MM-DD hh:mm:ss");
          searchForm.checkoutDateEnd=Moment(searchForm.checkoutDate[1]).format("YYYY-MM-DD hh:mm:ss");
        }else{
          searchForm.checkoutDateStart = null;
          searchForm.checkoutDateEnd = null;
        }
        // console.log(searchForm);
        listByGrid(searchForm).then(res => {
          this.loading = false;
          this.tableData = res.data.data;
          this.countSize = res.data.pageSize;
        }).catch(error=>{
          this.$message({type:'danger', message: error})
          this.loading = false;
        }); 
      },
      getSizeChange(val) {
        this.loading = true;
        let searchForm = {};
        this.searForm.pageSize = val;
        if(val > this.countSize) {
          this.searForm.pageNum = 1;
        }
        searchForm = this.searForm;
        if(searchForm.createTime){
          searchForm.createTimeStart=Moment(searchForm.createTime[0]).format("YYYY-MM-DD hh:mm:ss");
          searchForm.createTimeEnd=Moment(searchForm.createTime[1]).format("YYYY-MM-DD hh:mm:ss");
        }else{
          searchForm.createTimeStart = null;
          searchForm.createTimeEnd = null;
        }
        if(searchForm.checkoutDate){
          searchForm.checkoutDateStart=Moment(searchForm.checkoutDate[0]).format("YYYY-MM-DD hh:mm:ss");
          searchForm.checkoutDateEnd=Moment(searchForm.checkoutDate[1]).format("YYYY-MM-DD hh:mm:ss");
        }else{
          searchForm.checkoutDateStart = null;
          searchForm.checkoutDateEnd = null;
        }
        // console.log(searchForm);
        listByGrid(searchForm).then(res => {
          this.loading = false;
          this.tableData = res.data.data;
          this.countSize = res.data.pageSize;
        }).catch(error=>{
          this.$message({type:'danger', message: error})
          this.loading = false;
        });
      },
      showDumbDetail(row){
        var dumPk = row.dumbPk
        this.dumbDetailObj = row;
        setTimeout(_=>{
          this.$refs.bill.dumBill(dumPk)
        },0)
        this.dialogTableVisible = true
      },
      updateDumb(){
        updateDumbHouse(this.dumbDetailObj).then(res=>{
          if(res.code==1){
            this.$message({type:'success', message: '修改成功'})
            this.dumbDetailObj = {};
            this.dialogTableVisible = false;
            this.getList(this.searForm.pageNum);
          }
        }).catch(error=>{
          this.$message({type:'danger', message: error})
        })
        // this.$refs.dumbDetailObj.validate((valid) => {
        //   if (valid) {
        //     updateDumbHouse(this.dumbDetailObj).then(res=>{
        //       console.log(res)
        //       if(res.code==1){
        //         this.$message({type:'success', message: '修改成功'})
        //         this.dumbDetailObj = {};
        //         this.dialogTableVisible = false;
        //         this.getList();
        //       }
        //     }).catch(error=>{
        //       this.$message({type:'danger', message: error})
        //     })
        //   } else {
        //     return false;
        //   }
        // });
      },
      //操作记录
      showOperList(pk){
        var data = {
          pk:pk
        };
        listLog(data).then(res=>{
          if(res.code==1){
            this.logList = res.data;
            this.operDialogVisible = true;
          }
        }).catch(error=>{
          this.$message({type:'danger', message: error})
        })
      },
      handlerFilterChange (value) {
        this.total = value.length
        // var offset = (isndex - 1) * size
        // return items.slice(offset, offset + size)
      },
      orderDateChange (value) { //时间改变事件
        let selt= this;
        var curTime = new Date();
        curTime.setHours(8);//小时设置为8
        curTime.setMinutes(0);
        curTime.setSeconds(0);
        curTime.setMilliseconds(0);
        var startTime = new Date(Date.parse(value[0]));//转换过后默认时间是8:00
        if(startTime < curTime){
          this.orderDate = [];
        }else{
          // this.$emit('input', {begin: value[0], end: value[1]})
          this.orderDate = [value[0],value[1]];
        }
      },
      handleClick(tab, event) {
        if(tab.name=="second"){
          // console.log(123456);
          this.$refs.bill.initProject()
          this.$refs.bill.listBill()
        }else{
          // console.log(654321);
        }
      },
    },
    mounted () {
      // if (this.value) {
      //   this.orderDate = [this.value.begin, this.value.end]
      // }
    }
  }
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 20px;
}
.el-select{
  width: 178px;
}
.el-date-editor.el-input{
  width: 178px;
}
.el-dialog__body {
    padding: 5px 20px 30px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
.opear-str {
    position: absolute;
    right: 30px;
    z-index: 9999;
    top: 50px;
}
.positions {
  float: right;
}
.positions {
  float: right;
}
</style>
