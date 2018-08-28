<template>
  <div>
    <el-form ref="form" size="mini" :model="form" label-width="80px">
      <el-form-item label="所在仓库">
        <el-checkbox-group v-model="form.depotPk">
          <el-checkbox v-for="item in options" :label="item.depotPk" :key="item.depotPk">{{item.depotName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="部门">
        <el-checkbox-group v-model="form.deptPk">
          <el-checkbox label="商品部"></el-checkbox>
          <el-checkbox label="布草部"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="出入标识">
        <el-checkbox-group v-model="form.entryExitSign">
          <el-checkbox label="1">出库</el-checkbox> 
          <el-checkbox label="0">入库</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="事件">
        <el-checkbox-group v-model="form.event">
          <el-checkbox label="0">采购</el-checkbox>
          <el-checkbox label="1">总部出库</el-checkbox>
          <el-checkbox label="2">总部下拨</el-checkbox>
          <el-checkbox label="3">二级库退库</el-checkbox>
          <el-checkbox label="4">二级库调拨</el-checkbox>
          <el-checkbox label="5">二级库直入</el-checkbox>
          <el-checkbox label="6">直拨入部门</el-checkbox>
          <el-checkbox label="7">部门退库</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-row>
        <el-col :span="4">
          <el-form-item  label="商品编号">
            <el-input v-model="form.goodsCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item  label="货单编号">
            <el-input v-model="form.stockOrderNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="供应商">
            <el-select v-model="form.supplierPk" placeholder="请选择供应商">
              <el-option v-for="item in supplierPkList"
                         :key="item.supplierPk"
                         :label="item.supplierName"
                         :value="item.supplierPk">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="block">
          <el-form-item  label="起始时间">
            <el-date-picker
              v-model="pickerTime"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
            <el-button type="primary" @click="searchList(form)">搜索</el-button>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
    <el-table :data="tableData"  border height="400" style="width: 100%">
      <el-table-column prop="goodsCode" label="商品编号"> </el-table-column>
      <el-table-column prop="stockOrderNo" label="货单编号"> </el-table-column>
      <el-table-column prop="goodsName" label="名称"> </el-table-column>
      <el-table-column prop="jianpin" label="简拼"> </el-table-column>
      <el-table-column prop="goodsSpec" label="规格"> </el-table-column>
      <el-table-column prop="goods_type" label="类别"> </el-table-column>
      <el-table-column prop="goodsStock" label="数量"> </el-table-column>
      <el-table-column prop="goodsUnit" label="单位"> </el-table-column>
      <el-table-column prop="costPrice" label="进价"> </el-table-column>
      <el-table-column prop="totalPrice" label="总价"> </el-table-column>
      <el-table-column prop="preSalePrice" label="预售价"> </el-table-column>
      <el-table-column prop="invalidDate" label="保质期"></el-table-column>
      <el-table-column prop="depotPk" label="仓库"> </el-table-column>
      <el-table-column prop="deptPk" label="部门"> </el-table-column>
      <el-table-column label="事件">
        <template slot-scope="scope">
          <span v-if="scope.row.event == 0">采购</span>
          <span v-if="scope.row.event == 1">总部出库</span>
          <span v-if="scope.row.event == 2">总部下拨</span>
          <span v-if="scope.row.event == 3">二级库退库</span>
          <span v-if="scope.row.event == 4">二级库调拨</span>
          <span v-if="scope.row.event == 5">二级库直入</span>
          <span v-if="scope.row.event == 6">直拨入部门</span>
          <span v-if="scope.row.event == 7">部门退库</span>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column label="标识">
        <template slot-scope="scope">
          <span v-if="scope.row.entryExitSign == 0">入库</span>
          <span v-if="scope.row.entryExitSign == 1">出库</span>
          <span v-if="scope.row.entryExitSign == 3">待审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Moment from 'moment'
  import {
    listGoodsDepot,
    listGoods,
    listGoodsType,
    listGoodsSupplier,
    saveGoodsStockOrder,
    getGoodsByGoodsCode,
    storekeeperGoodsStockOrder,
    listGoodsStockOrder
    } from '@/api/stock/pmsStockFunction/stockOrderController'
  export default {
    // props: ['value'],
    // watch: {
    //   value: function () {
    //     if (this.value) {
    //       this.orderObj.orderDate = [this.value.begin, this.value.end]
    //     }
    //   }
    // },
    data() {
      return {
        form: {
          depotPk:[], 
          deptPk:[], 
          entryExitSign:[], 
          event:[], 
          goodsCode:'', 
          stockOrderNo:'', 
          supplierPk:'',
          beginDate:'',
          endDate: '',
        },
        options: [], //所在仓库
        supplierPkList:[], //供应商
        tableData: [],
        pickerTime: '',
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
          }]
        },
      }
    },
    created() {
      this.init();
      this.listGoodsStockOrderList();
    },
    mounted(){
    
    },
    methods: {
      init(){
        //加载仓库列表
        listGoodsDepot().then(res => {
          if(res.code==1){
            console.log(res.data)
            this.options = res.data;
          }
        }).catch(error=>{
          this.$message({type:'warning', message: error})
        })
        //加载供应商列表
        listGoodsSupplier().then(res => {
          if(res.code == 1){
            console.log(res.data)
            this.supplierPkList = res.data;
            // this.form.supplierPk = this.supplierPkList[0].supplierPk;
          }
        }).catch(error=>{
          this.$message({type:'warning', message: error})
        })
      },
      //获取列表数据
      listGoodsStockOrderList() {
        listGoodsStockOrder(this.form).then(res => {
          this.tableData = res.data
          for (let index = 0; index < this.tableData.length; index++) {
            const element = this.tableData[index].invalidDate;
            const geshiDate = Moment(element).format('YYYY-MM-DD');
            if(geshiDate != 'Invalid date'){
              this.tableData[index].invalidDate = geshiDate
            }
          }
          console.log(this.tableData)
        });
      },
      searchList(formList) {
        console.log(formList)
        formList.beginDate = this.pickerTime[0];
        formList.endDate = this.pickerTime[1];
        this.form = formList;
        this.listGoodsStockOrderList();
      },
     


      
    }
  }
</script>