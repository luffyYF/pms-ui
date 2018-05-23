<template>
  <div class="content-body">
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="货单编号">
            <el-input readonly v-model="form.stockOrderNo"></el-input>
          </el-form-item>
          <el-form-item label="填单日期">
            <div class="block">
              <el-date-picker
                v-model="form.createTime"
                readonly
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="凭证号">
            <el-input v-model="form.voucherNo"></el-input>
          </el-form-item>
          <el-form-item label="申请仓库">
            <el-select :disabled="changeFlag" v-model="form.depotPk" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.depotPk"
                :label="item.depotName"
                :value="item.depotPk">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="填单人">
            <el-input readonly v-model="form.createUserName"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.personInCharge"></el-input>
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
                <!-- <el-input v-model="form2.goodsCode" @change="searchGoods" placeholder="商品编号/简拼/商品名称"></el-input> -->
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
              <el-form-item label="申请数量">
                <el-input  @change="changeGoodsStock" v-model="form2.goodsStock" type="number" min="0"></el-input>
              </el-form-item>
              <el-form-item label="总价">
                <el-input readonly v-model="form2.totalPrice"></el-input>
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
        <h5 class="info-title">采购商品列表</h5>
        <el-table size="mini" 
          border 
          :data="stockDetailList"
          height="300"
          style="width: 98.5%; margin:10px;">
          <el-table-column prop="goodsCode" label="编号" align="center">
          </el-table-column>
          <el-table-column prop="goodsName" label="名称" align="center">
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
                @click.native.prevent="deleteRow(scope.$index, stockDetailList)"
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
import Moment from 'Moment'
import {
  listGoodsDepot,
  listGoods,
  listGoodsType,
  saveGoodsStockOrder,
  getGoodsByGoodsCode
  } from '@/api/stock/pmsStockFunction/stockOrderController'
export default {
  components: {  },
  data() {
    return {
      form: {//货单表单
        stockOrderNo:'CG'+Moment(new Date()).format("YYYYMMDDhhmmss"),
        createTime:Moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        createUserName:JSON.parse(localStorage.sessionInfo).userName,
        stockOrderType:'APPLY',
        voucherNo:'',
        depotPk:'',
        personInCharge:'',
      },
      form2: {//货单详单表单
        goodsCode: "",
        goodsName: "",
        goodsType: "",
        costPrice: 0,
        goodsStock: 0,
        totalPrice: 0,
        remark: "",
        goodsUnit: "",
        jianpin: "",
        source: "总部下拨",
        event: 0,
        entryExitSign: 3,
      },
      stockDetailList:[],//详单对象集合
      options:[],//仓库列表,
      goodsList:[],//商品列表,
      goodsTypeList:[],//商品类型列表,
      changeFlag:false
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      //加载仓库列表
      listGoodsDepot().then(res => {
        if(res.code==1){
          this.options = res.data;
          //默认选中第一个仓库
          this.form.depotPk = this.options[0].depotPk;
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
    //改变申请数量
    changeGoodsStock(value){
      this.form2.totalPrice = Number(this.form2.costPrice)*Number(value);
    },
    //存入列表
    saveGoods(){
      if(!this.form2.goodsCode){
        this.$message({type:'warning', message: '请选择商品'})
        return;
      }
      if(this.form2.goodsStock<1){
        this.$message({type:'warning', message: '请输入申请数量'})
        return;
      }
      this.stockDetailList.push(this.form2);
      this.changeFlag = true;
      this.resetForm2();
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    clearTable(){
      this.stockDetailList = [];
      this.changeFlag = false;
    },
    resetForm2(){
      this.form2 = {
        goodsCode: "",
        goodsName: "",
        goodsType: "",
        costPrice: 0,
        goodsStock: 0,
        totalPrice: 0,
        remark: "",
        goodsUnit: "",
        jianpin: "",
        source: "总部下拨",
        event: 0,
        entryExitSign: 3,
      }
    },
    saveInfo(){
      if(this.stockDetailList.length<=0){
        this.$message({type:'warning', message: '请添加商品'})
        return;
      }
      var data = {
        stockOrderPo:this.form,
        stockOrderDetailList:this.stockDetailList
      };
      console.log(data);
      saveGoodsStockOrder(data).then(res => {
        if(res.code==1){
          this.$message({type:'success', message: '保存成功'})
          this.clearTable();
          this.resetForm2();
        }
      }).catch(()=>{
        this.$message({type:'warning', message: '网络异常'})
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
  height: 396px;
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
