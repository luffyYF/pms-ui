<template>
  <div class="content-body">
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="货单编号">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="仓管员">
            <el-select v-model="form.storekeeper" placeholder="请选择">
              <el-option
                v-for="item in storekeeperOptions"
                :key="item.pk"
                :label="item.storekeeper"
                :value="item.pk">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="本店仓库">
            <el-select v-model="form.depotPk" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.depotPk"
                :label="item.depotName"
                :value="item.depotPk">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总部仓库">
            <el-select v-model="form.bigDepotPk" :disabled="true" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="凭证号">
            <el-input v-model="form.voucherNo"></el-input>
          </el-form-item>
          <el-form-item label="经手人">
            <el-input v-model="form.brokerage"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.personInCharge"></el-input>
          </el-form-item>
          <el-form-item label="填单人">
            <el-input readonly v-model="form.createUserName"></el-input>
          </el-form-item>
          <el-form-item label="填单日期">
            <div class="block">
              <el-date-picker
                v-model="form.createTime"
                type="datetime"
                readonly
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- table -->
    <el-row>
      <el-col :span="8" style="padding-right:10px;">
        <el-form ref="form2" :inline="true" :model="form2" size="mini" label-width="80px">
          <!-- input -->
          <div class="bg-reserve">
            <h5 class="info-title">商品信息</h5>
            <div class="info-li">
              <el-form-item label="商品编号">
                <el-select @change="chooseGoods" v-model="form2.goodsCode" placeholder="编号 - 名称 - 简拼 - 价格">
                  <el-option
                    v-for="item in goodsList"
                    :key="item.goodsCode"
                    :label="item.goodsCode+' - '+item.goodsName+' - '+item.jianpin+' - ￥'+(item.goodsPrice?item.goodsPrice:0)"
                    :value="item.goodsCode">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input readonly v-model="form2.goodsName"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-input readonly v-model="form2.goodsType"></el-input>
              </el-form-item>
              <el-form-item label="进价">
                <el-input readonly v-model="form2.costPrice"></el-input>
              </el-form-item>
              <el-form-item label="预售价">
                <el-input v-model="form2.preSalePrice" type="number" min="0"></el-input>
              </el-form-item>
              <el-form-item label="退库数量">
                <el-input v-model="form2.goodsStock" type="number" min="0"></el-input>
              </el-form-item>
              <el-form-item label="保质期">
                <div class="block">
                  <el-date-picker
                    v-model="form2.invalidDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="生产厂商">
                <el-input v-model="form2.manufacturer"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form2.remark"></el-input>
              </el-form-item>
              <el-form-item style="margin-left:60px;">
                <el-button type="primary" @click="saveGoods()">存入列表</el-button>
                <el-button type="primary" @click="resetForm2()">清除数据</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-col>
      <el-col :span="16" class="bg-reserve book-info">
        <h5 class="info-title">已保存的入库商品</h5>
        <el-table size="mini" 
          border 
          :data="tableData"
          height="440"
          style="width: 98.5%; margin:10px;">
          <el-table-column prop="goodsCode" label="编号" align="center">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="jianpin" label="简拼" align="center">
          </el-table-column>
          <el-table-column prop="goodsType" label="类型" align="center">
          </el-table-column>
          <el-table-column prop="goodsUnit" label="单位" align="center">
          </el-table-column>
          <el-table-column prop="goodsStock" label="数量" align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24">
          <el-col :span="6" :offset="18">
            <el-button size="mini" type="primary" @click="saveInfo">保存</el-button>
            <el-button size="mini" type="primary" @click="clearTable">清除</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from 'moment'
import {
  listGoodsDepot,
  listGoods,
  listGoodsType,
  saveGoodsStockOrder,
  getGoodsByGoodsCode,
  storekeeperGoodsStockOrder
  } from '@/api/stock/pmsStockFunction/stockOrderController'
export default {
  components: {  },
  data() {
    return {
      form: {
        username:'TK'+Moment(new Date()).format("YYYYMMDDhhmmss"), 
        storekeeper:'', 
        depotPk:'', 
        bigDepotPk:'', 
        voucherNo:'', 
        brokerage:'', 
        personInCharge:'', 
        createUserName:JSON.parse(localStorage.getItem('pms_userinfo')).realName, 
        createTime:Moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      },
      form2: {
        goodsCode: "",  
        goodsName: "",  
        goodsType: "",  
        costPrice: "",  
        preSalePrice: "",  
        goodsStock: "",  
        manufacturer: "",  
        invalidDate: null,
        entryExitSign: 1,
        event: 3,
        source: '二级库直入',
        warehouseType: '',
        remark: "", 
      },
      depotNameType: '',
      value1:'',
      value2:'',
      storekeeperOptions: [],
      options:[],
      goodsList:[],//商品列表,
      changeFlag:false,
      tableData: []
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      //加载仓管员列表
      storekeeperGoodsStockOrder().then(res => {
        if(res.code == 1){
          console.log(res.data)
          this.storekeeperOptions = res.data;
          this.form.storekeeper = this.storekeeperOptions[0].pk;
        }
      })
      //加载仓库列表
      listGoodsDepot().then(res => {
        if(res.code==1){
          this.options = res.data;
          //默认选中第一个仓库
          this.form.depotPk = this.options[0].depotPk;
          this.depotNameType = this.options[0].depotName;
        }
      }).catch(error=>{
        this.$message({type:'warning', message: error})
      })

      //加载商品列表
      listGoods().then(res => {
        if(res.code==1){
          this.goodsList = res.data;
          // 默认选中第一个
          // this.form2.goodsCode = this.goodsList[0].goodsCode;
        }
      }).catch(error=>{
        this.$message({type:'warning', message: error})
      })
      //加载商品类型列表
      listGoodsType().then(res => {
        if(res.code==1){
          this.goodsTypeList = res.data;
        }
      }).catch(error=>{
        this.$message({type:'warning', message: error})
      })
    },
    //选择商品
    chooseGoods(item){
      var goodsType = '';
      for (let index = 0; index < this.goodsList.length; index++) {
        const element = this.goodsList[index];
        if(element.goodsCode==this.form2.goodsCode){
          for (let index = 0; index < this.goodsTypeList.length; index++) {
            const ele = this.goodsTypeList[index];
            if(ele.typePk==element.typePk){
              goodsType = ele.typeName;
            }
          }
          this.form2.goodsCode = element.goodsCode;
          this.form2.goodsName = element.goodsName;
          this.form2.goodsType = goodsType;
          this.form2.costPrice = element.goodsPrice?element.goodsPrice:0;
          this.form2.goodsUnit = element.goodsUnit;
          this.form2.jianpin = element.jianpin;
        }
      }
    },
    //选择仓库
    chooseStorehouse(item){
      console.log(item)
      for (let index = 0; index < this.options.length; index++) {
        const element = this.options[index];
        if(element.depotPk == this.form.depotPk){
          console.log(element.depotName)
          this.form2.warehouseType = this.form.depotPk
          this.depotNameType = element.depotName
        }
        
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    saveGoods(){
      if(!this.form2.goodsCode){
        this.$message({type:'warning', message: '请选择商品'})
        return;
      }
      if(this.form2.goodsStock<1){
        this.$message({type:'warning', message: '请输入退库数量'})
        return;
      }
      this.tableData.push(this.form2);
      this.changeFlag = true;
      this.resetForm2();
    },
    resetForm2(){
      this.form2 = {
        goodsCode: "",  
        goodsName: "",  
        goodsType: "",  
        costPrice: "",  
        preSalePrice: "",  
        goodsStock: "",  
        manufacturer: "",  
        invalidDate: null,
        entryExitSign: 1,
        event: 3,
        source: '二级库直入',
        warehouseType: '',
        remark: "", 
      }
    },
    clearTable(){
      this.tableData = [];
      this.changeFlag = false;
    },
    saveInfo(){
      if(this.tableData.length<=0){
        this.$message({type:'warning', message: '请添加商品'})
        return;
      }
      var data = {
        stockOrderPo:this.form,
        stockOrderDetailList:this.tableData
      };
      console.log(data);
      saveGoodsStockOrder(data).then(res => {
        if(res.code==1){
          this.$message({type:'success', message: '保存成功'})
          this.clearTable();
          this.resetForm2();
        }
      }).catch(()=>{
        // this.$message({type:'warning', message: '网络异常'})
        console.log("网络异常");
      })
    }
  },
};
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.book-info{
  height: 537px;
}
.el-select {
  width: 178px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 178px;
}
</style>
