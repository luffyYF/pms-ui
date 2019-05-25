// 班次表列表
// Created by Administrator on 2018-12-05T17:05:43.889.
<template>
  <section class="plan-list">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form class="seach-form" ref="listQuery" :inline="true" :model="listQuery" label-width="70px" size="small" label-position="right">
            <el-form-item label="房型:">
                <el-select class="selectWidth" size="mini" v-model="listQuery.typePk" placeholder="请选择房型" clearable >
                    <el-option v-for="y in roomType" :label="y.typeName" :value="y.typePk" :key="y.typePk"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" size="mini" @click="listSearch()">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" v-if="hasPerm('pms:roomStatus:batchEdit')" @click="batchEditClick()" icon="el-icon-edit">批量修改</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <div class="dropdown-list">
      </div>
         <!-- :show-header="false" -->
      <el-table
        :data="tableData"
        border
        @cell-click="cellClick"
        class="tables-list noChange"
        max-height="600px"
       :show-header="false"
       :cell-class-name="tableCellClassName"
        v-loading="loading">
        <!-- 需要映射的表 -->
        <!-- <el-table-column type="selection" fixed :selectable="disableCheck" width="55" v-if="rows.length > 0"></el-table-column> -->
        <!-- <el-table-column  prop="name" /> -->
        <el-table-column align="center" v-for="(value,index) in headers" :prop="value.code" :fixed="index < 1" :label="value.day+' \n '+value.week" :key="index" :min-width="index == 0 ? '250' : '90'">
          <template slot-scope="scope">
                <div v-if="roomStatus[scope.row[value.code]]">
                    <el-popover
                        placement="top-start"
                        title="标题"
                        width="200"
                        trigger="hover"
                        >
                        <div>
                            <span>￥{{roomStatus[scope.row[value.code]].price}}</span><br>
                            <span v-if="roomStatus[scope.row[value.code]].numberOfBreakfast>0">含早</span>
                            <span v-else>不含早</span>
                            <br><span>预订:{{roomStatus[scope.row[value.code]].reserveCount}}/{{roomStatus[scope.row[value.code]].totalCount}}</span>
                        </div>
                        <!-- <el-button >hover 激活</el-button> -->
                        <div slot="reference" class="cursor">
                            <span>￥{{roomStatus[scope.row[value.code]].price}}</span><br>
                            <span v-if="roomStatus[scope.row[value.code]].numberOfBreakfast>0">含早</span>
                            <span v-else>不含早</span>
                            <br><span>预订:{{roomStatus[scope.row[value.code]].reserveCount}}/{{roomStatus[scope.row[value.code]].totalCount}}</span>
                        </div>
                    </el-popover>
                </div>
                <div style="text-align:center;" v-else-if="scope.row[value.code].week">
                    <span >{{scope.row[value.code].day | dateFormat("MM-DD")}}&nbsp;</span>
                    <br>
                    <span >{{scope.row[value.code].week}}&nbsp;</span>
                </div>
                <div v-else-if="scope.$index == 0">
                    <el-button type="text" size="mini" @click="beginAddAndSubClick(-14)">前14天</el-button>
                    <el-date-picker style="width:100px;" :clearable="false" :editable="false" size="mini" v-model="listQuery.beginDate" type="date" value-format="yyyy-MM-dd"/>
                    <el-button type="text" size="mini" @click="beginAddAndSubClick(14)">后14天</el-button>
                    <br>
                    <el-button type="text" size="mini" @click="isMonthClick(true)">月份</el-button><el-button type="text" size="mini" @click="isMonthClick(false)">双周</el-button>
                </div>
                <div v-else-if="scope.row[value.code]">
                    <span>{{scope.row[value.code]}}</span><br>
                </div>
                <div v-else style="min-height:69px">
                    <!-- <span v-if="index >0 ">预订:0</span> -->
                </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 12px 0 12px;color:red;">
          <span>注：预定:Y/N,Y为预定数量，N为房间总数</span><br>
          <!-- :disabled="true" -->
          <span><el-color-picker size="mini" v-model="colorWhite"></el-color-picker>表示房间开启<el-color-picker size="mini" v-model="colorGray"></el-color-picker>表示房间关闭</span>
      </div>
    </el-row>

    <el-dialog class="add-permission" title="设置" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
             <!-- :rules="rules" -->
    <el-form ref="settingObj" size="small" :rules="rules" :model="settingObj" label-width="80px">
        <el-form-item label="房间类型" prop="roomTypePk">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <!-- <div style="margin: 15px 0;"></div> -->
            <el-checkbox-group v-model="settingObj.roomTypePk" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="obj in roomType2" :label="obj.typePk" :key="obj.typePk">{{obj.typeName}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="渠道" v-if="isBatchEdit" prop="channelPk">
            <el-checkbox :indeterminate="channelIsIndeterminate" v-model="channelCheckAll" @change="channelHandleCheckAllChange">全选</el-checkbox>
            <!-- <div style="margin: 15px 0;"></div> -->
            <el-checkbox-group v-model="settingObj.channelPk" @change="channelHandleCheckedCitiesChange">
                <el-checkbox v-for="obj in channelList" :label="obj.channelPk" :key="obj.channelPk">{{obj.channelName}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <!-- <el-form-item label="房间价格" prop="price">=
            <el-input-number style="width:300px;" size="small" :precision="2" :step="0.01" :min="0" :controls="false" v-model="settingObj.price" ></el-input-number>
        </el-form-item> -->
        <el-form-item label="房间数量" prop="totalCount">
            <!-- <el-input type="text" style="width:300px;" v-model="settingObj.totalCount" placeholder="房间数量" size="small" clearable> </el-input> -->
            <el-input-number style="width:300px;" size="small" :precision="0" :step="1" :min="0" :controls="false" v-model="settingObj.totalCount" ></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="早餐数量" prop="numberOfBreakfast">
            <el-input-number style="width:300px;" size="small" :precision="0" :step="1" :min="0" :controls="false" v-model="settingObj.numberOfBreakfast" ></el-input-number>
        </el-form-item> -->
        <el-form-item label="房间状态" prop="roomStatus">
            <el-radio v-model="settingObj.roomStatus" :label="2">不做修改</el-radio>
            <el-radio v-model="settingObj.roomStatus" :label="1">房间开启</el-radio>
            <el-radio v-model="settingObj.roomStatus" :label="0">房间关闭</el-radio>
        </el-form-item>
        <el-form-item label="日期" prop="beginAndEnd">
            <!-- <date-picker v-model="beginAndEnd" ></date-picker> -->
             <el-date-picker v-model="settingObj.beginAndEnd" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
        </el-date-picker>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="subLoading" @click="subClick()" >保存</el-button>
    </span>
  </el-dialog>

  </section>
</template>
<script>
  import Moment from 'moment'
  import DatePicker from '@/components/DateComponent/DatePicker';
  import {
  getRoomStatusSetting,settingRoomStatus
} from "@/api/systemSet/pmsRoomTypePriceController";

  export default {
    components:{Moment,DatePicker},
    data () {
      return {
        loading: false,
        rows: [],
        listQuery: {
            beginDate:Moment().format("YYYY-MM-DD"),
            endDate:"",
            typePk:""
        },
        tableData:[],
        headers:[],
        roomStatus:{},
        dialogVisible:false,
        settingObj:{
            roomTypePk:[],
            channelPk:[],
            price:0,
            beginDate:"",
            endDate:"",
            totalCount:0,
            numberOfBreakfast:0,
            roomStatus:2,
            beginAndEnd:[
                Moment().format("YYYY-MM-DD"),
                Moment().format("YYYY-MM-DD")
            ],
        },
        
        roomType:[],
        isMonth:false,
        checkAll:false,
        channelCheckAll:false,
        isIndeterminate:true,
        channelIsIndeterminate:true,
        roomType2:[],
        rules: {
          roomTypePk: [{ required: true, message: '请选择房间类型', trigger: 'change' }],
          channelPk: [{ required: true, message: '请选择渠道', trigger: 'change' }],
        //   price: [{ required: true, message: '请填写价格', trigger: 'blur' }],
        //   totalCount: [{ required: true, message: '请填写房间数量', trigger: 'blur' }],
        //   numberOfBreakfast: [
        //     { required: true, message: '请填写权限值', trigger: 'blur' }
        //   ],
          roomStatus: [{ required: true, message: '请选择房间状态', trigger: 'change' }],
          beginAndEnd: [{ required: true, message: '请选择日期', trigger: 'change' }],
        },
        channelList:[
            // {channelName:"房型",channelPk:0},
            {channelName:"豪斯菲尔",channelPk:"housefeel"},
            {channelName:"美团",channelPk:"meituan"},
            {channelName:"携程",channelPk:"ctrip"},
            {channelName:"飞猪",channelPk:"fliggy"},
        ],
        isBatchEdit:false,
        subLoading:false,
        colorWhite:"#FFFFFF",
        colorGray:"#ebeef5",
        editPower:null,
        queryPower:null
      }
    },
    mounted () {
        this.editPower = this.hasPerm('pms:roomStatus:batchEdit')
        this.queryPower = this.hasPerm('pms:roomStatus:list')
        this.roomTypeInit()
        this.listSearch()
    },
    watch:{
    // beginAndEnd: function () {
    //     if (this.beginAndEnd) {
    //         this.settingObj.beginDate = this.beginAndEnd.begin;
    //         this.settingObj.endDate = this.beginAndEnd.end;
    //     }
    // }
    },
    methods: {
        roomTypeInit(){
            var typeList = JSON.parse(localStorage.getItem("pms_type"))
            this.roomType = []
            console.log(typeList.length)
            typeList.forEach(item=> {
                if(item.typeMaster == "ROOM_TYPE"){
                    this.roomType.push(item);
                    this.roomType2.push(item);
                }
            })
            this.roomType.unshift({
                typePk:"",
                typeName:"全部"
            })
        },
      listSearch () {
        if(!this.queryPower){
            this.$message({ type: 'warning', message: "权限不足，请联系管理员" })
            return
        }
        let self = this
        self.loading = true
        self.listQuery.endDate = this.isMonth?Moment(new Date(self.listQuery.beginDate)).add(31, 'days').format("YYYY-MM-DD"):Moment(new Date(self.listQuery.beginDate)).add(14, 'days').format("YYYY-MM-DD")
        getRoomStatusSetting(self.listQuery).then(res => {
            self.tableData = res.data.tableData
            self.headers = res.data.header
            self.roomStatus = res.data.roomStatus
        }).finally(() => {
          self.loading = false
        })
      },
      batchEditClick(){
            this.settingObj = {
                roomTypePk:[],
                channelPk:[],
                roomStatus:2,
                price:0,
                numberOfBreakfast:0,
                totalCount:0
            }
            this.isBatchEdit = true
            this.dialogVisible = true
      }
      ,
      cellClick (row, column, cell, event) {
          if(column.property != undefined && column.property.indexOf('column')!=-1 && row.pk && this.editPower){
                console.log(row);
                console.log(column);
                console.log(cell);
                console.log(event);
                this.settingObj.roomTypePk = []
                this.settingObj.channelPk = []
                var obj =  this.roomStatus[row[column.property]]
                this.settingObj.roomTypePk.push(row.pk)
                this.settingObj.channelPk.push(row.code)
                this.settingObj.roomStatus = obj == null?2:obj.roomStatus
                if(row[column.property]){
                    var obj =  this.roomStatus[row[column.property]]
                    this.settingObj.price = obj.price
                    this.settingObj.beginDate = obj.date
                    this.settingObj.endDate = obj.date
                    this.settingObj.beginAndEnd = [
                        obj.date,
                        obj.date
                    ]
                    this.settingObj.numberOfBreakfast = obj.numberOfBreakfast
                    this.settingObj.totalCount = obj.totalCount
                }else{
                    this.settingObj.price = 0
                    this.settingObj.beginDate = ""
                    this.settingObj.endDate = ""
                    this.settingObj.numberOfBreakfast = 0
                    this.settingObj.totalCount = 0
                }
                this.dialogVisible = true
                this.isBatchEdit = false
                console.log(JSON.stringify(this.settingObj))
          }
          
      },
      handleClose(){
          this.dialogVisible = false
      },
      subClick(){
        this.$refs.settingObj.validate(valid => {
            if (valid) {
                this.settingObj.beginDate = this.settingObj.beginAndEnd[0]
                this.settingObj.endDate = this.settingObj.beginAndEnd[1]
                this.subLoading = true
                settingRoomStatus(this.settingObj).then(res => {
                    this.dialogVisible = false
                    this.listSearch()
                }).finally(() => {
                     this.subLoading = false
                    this.loading = false
                })
            }
        })
      },
      isMonthClick(isMonth){
          this.isMonth = isMonth
          this.listSearch()
      },
      beginAddAndSubClick(num){
          this.listQuery.beginDate = Moment(new Date(this.listQuery.beginDate)).add(num, 'days').format("YYYY-MM-DD")
          this.listSearch()
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.roomType2.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roomType2.length;
      },
      handleCheckAllChange(val) {
        this.settingObj.roomTypePk = []
        if(val){
            this.roomType2.forEach(item=> {
                this.settingObj.roomTypePk.push(item.typePk);
            })
        }
        this.isIndeterminate = false;
      },
      channelHandleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.channelCheckAll = checkedCount === this.channelList.length;
        this.channelIsIndeterminate = checkedCount > 0 && checkedCount < this.channelList.length;
      },
      channelHandleCheckAllChange(val) {
        this.settingObj.channelPk = []
        if(val){
            this.channelList.forEach(item=> {
                this.settingObj.channelPk.push(item.channelPk);
            })
        }
        this.channelIsIndeterminate = false;
      },
      tableCellClassName({row, column,rowIndex,columnIndex}) {
          var roomStatus = this.roomStatus
          if(roomStatus[row[column.property]]){
              if(roomStatus[row[column.property]].roomStatus == 1){
                return "white"
              }else if(roomStatus[row[column.property]].roomStatus == 0){
                   return "gray"
              }else{
                return "white"
              }
          }
        return 'white';
      }

    },
    filters:{
        dateFormat(value,pt){
            return Moment(new Date(value)).format(pt)
        }
    }
  }
</script>

<style>
.plan-list .seach-form .el-form-item{
  margin-bottom: 0px !important;
}
.white{
    background-color: white !important;
}
.gray{
    background-color:#ebeef5 !important;
}
</style>
<style scoped>

.cursor{
    cursor: pointer;
}

.noChange{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}

.plan-list {
  padding: 20px 20px 0 20px;
}
.btn-right {
  text-align: right;
}
.tables-list {
  width: calc(100% - 24px);
  /* min-height: 250px; */
  margin: 0 12px;
}
.tables-list {
  border: 1px solid #ddd;
}
.dropdown-list {
  margin: 20px 12px 0 12px;
  height: 40px;
  line-height: 40px;
  background: #f4f6f9;
  border: 1px solid #dddddd;
  border-bottom: 0;
}
</style>