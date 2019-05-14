<template>
  <div class="content-body">
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="货单编号">
            <el-input readonly v-model="form.applyNo"></el-input>
          </el-form-item>
          <el-form-item label="操作人">
            <el-input readonly v-model="form.createUserName"></el-input>
          </el-form-item>
          <el-form-item label="申请日期">
            <div class="block">
              <el-date-picker
                v-model="form.createTime"
                readonly
                type="datetime"
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
            <h5 class="info-title">货物信息</h5>
            <div class="info-li">
              <el-form-item label="货物编号">
                <el-select
                  @change="chooseInventory"
                  v-model="form2.inventoryId"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="编号 - 名称 - 简拼 - 价格"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in inventorySelectList"
                    :key="item.inventoryId"
                    :label="item.inventoryNo+' - '+item.name+' - '+item.shortName+' - ￥'+(item.price?item.price:0)"
                    :value="item.inventoryId" class="in_select">
                    <span>{{item.inventoryNo}}</span>
                    <br />
                    <span style="color: #8492a6; font-size: 13px">{{item.name}}&nbsp;-&nbsp;{{item.shortName}}&nbsp;-&nbsp;￥{{item.price}}&nbsp;-&nbsp;{{item.spec}}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="货物名称">
                <el-input readonly v-model="form2.inventoryName"></el-input>
              </el-form-item>
              <el-form-item label="单位">
                <el-input readonly v-model="form2.unit"></el-input>
              </el-form-item>
              <el-form-item label="规格">
                <el-input readonly v-model="form2.spec"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-input readonly v-model="form2.typeName"></el-input>
              </el-form-item>
              <el-form-item label="单价">
                <el-input readonly v-model="form2.price"></el-input>
              </el-form-item>
              <el-form-item label="申请数量">
                <el-input  @change="changeAmout" v-model="form2.amount" type="number" min="0"></el-input>
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
        <h5 class="info-title">申领列表</h5>
        <el-table size="mini" 
          border 
          :data="stockDetailList"
          height="300"
          style="width: 98.5%; margin:10px;">
          <el-table-column prop="inventoryNo" label="编号" align="center">
          </el-table-column>
          <el-table-column prop="inventoryName" label="名称" align="center">
          </el-table-column>
          <el-table-column prop="shortName" label="简拼" align="center">
          </el-table-column>
          <el-table-column prop="typeName" label="类型" align="center">
          </el-table-column>
          <el-table-column prop="unit" label="单位" align="center">
          </el-table-column>
          <el-table-column prop="spec" label="规格" align="center">
          </el-table-column>
          <el-table-column prop="amount" label="数量" align="center">
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
import Moment from 'moment'
// import {
//   listGoodsDepot,
//   listGoods,
//   listGoodsType,
//   saveGoodsStockOrder,
//   getGoodsByGoodsCode
//   } from '@/api/stock/pmsStockFunction/stockOrderController'
import {getApplySequence,toApply, inventorySelectList} from '@/api/upmsStorage'
export default {
  components: {  },
  data() {
    return {
      loading:false,
      form: {//货单表单
        applyNo:null,
        companyPk:localStorage.getItem('select_company_pk'),
        createTime:null,
        createUserName:JSON.parse(localStorage.getItem('pms_userinfo')).upmsRealName,
      },
      form2: {//货单详单表单
        inventoryId:null,
        inventoryNo: null,
        icon:null,
        inventoryName: null,
        typeId:null,
        typeName: null,
        spec:null,
        price: 0,
        amount: 0,
        totalPrice: 0,
        remark: null,
        unit: null,
        shortName: null,
      },
      stockDetailList:[],//详单对象集合
      options:[],//仓库列表,
      inventorySelectList:[],//商品列表,
      goodsTypeList:[],//商品类型列表,
      changeFlag:false
    };
  },
  methods: {
    init(){
      this.form.createTime = Moment().format("YYYY-MM-DD HH:mm:ss"),
      getApplySequence().then(res=>{
        this.form.applyNo= res.data
      })

      //TODO 需要改动的
      // //加载仓库列表
      // listGoodsDepot().then(res => {
      //   if(res.code==1){
      //     this.options = res.data;
      //     //默认选中第一个仓库
      //     this.form.depotPk = this.options[0].depotPk;
      //   }
      // }).catch(error=>{
      //   this.$message({type:'warning', message: error})
      // })
      // //加载商品列表
      // listGoods().then(res => {
      //   if(res.code==1){
      //     this.inventorySelectList = res.data;
      //     // 默认选中第一个
      //     // this.form2.inventoryNo = this.inventorySelectList[0].inventoryNo;
      //   }
      // }).catch(error=>{
      //   this.$message({type:'warning', message: error})
      // })
      // //加载商品类型列表
      // listGoodsType().then(res => {
      //   if(res.code==1){
      //     this.goodsTypeList = res.data;
      //   }
      // }).catch(error=>{
      //   this.$message({type:'warning', message: error})
      // })
    },
    //选择商品
    chooseInventory(inventoryId){
      this.inventorySelectList.forEach((v,i)=>{
        if(v.inventoryId==inventoryId){
          this.form2.inventoryId=v.inventoryId;
          this.form2.inventoryNo=v.inventoryNo;
          this.form2.icon=v.icon;
          this.form2.inventoryName=v.name;
          this.form2.typeId=v.typeId;
          this.form2.typeName=v.typeName;
          this.form2.spec=v.spec;
          this.form2.price=v.price;
          this.form2.amount=v.amount;
          this.form2.totalPrice=v.totalPrice;
          this.form2.remark=v.remark;
          this.form2.unit=v.unit;
          this.form2.shortName=v.shortName;
        }
      })
    },
    //改变申请数量，计算总价
    changeAmout(value){
      this.form2.totalPrice = (Number(this.form2.price)*Number(value)).toFixed(2);
    },
    //存入列表
    saveGoods(){
      if(!this.form2.inventoryId){
        this.$message({type:'warning', message: '请选择货物'})
        return;
      }
      if(!this.form2.amount || this.form2.amount<1){
        this.$message({type:'warning', message: '请输入申请数量'})
        return;
      }
      //判断是否重复，重复则累加数量
      let has = false;
      this.stockDetailList.forEach((v,i)=>{
        if(v.inventoryId==this.form2.inventoryId){
          v.amount = Number(v.amount) + Number(this.form2.amount);
          has = true;
        }
      })
      if(!has){
        this.stockDetailList.push(this.form2);
      }
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
        inventoryId:null,
        inventoryNo: null,
        icon:null,
        inventoryName: null,
        typeId:null,
        typeName: null,
        spec:null,
        price: 0,
        amount: 0,
        totalPrice: 0,
        remark: null,
        unit: null,
        shortName: null,
      }
    },
    saveInfo(){
      if(this.stockDetailList.length<=0){
        this.$message({type:'warning', message: '请添加货物'})
        return;
      }
      var data = {
        ckApplyForm:this.form,
        ckApplyDetials:this.stockDetailList
      };
      toApply(data).then(res => {
        this.$message({type:'success', message: '保存成功'})
        this.clearTable();
        this.resetForm2();
        this.init();
      }).catch(()=>{
        // this.$message({type:'warning', message: '网络异常'})
        console.log("网络异常");
      })
    },
    remoteMethod(query) {
      this.loading = true;
      this.inventorySelectList = [];
      inventorySelectList({name:query}).then(res=>{
        this.loading = false;
        this.inventorySelectList = res.data
      }).finally(()=>{
        this.loading = false;
      })
      // if (query !== '') {
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //     this.options4 = this.list.filter(item => {
      //       return item.label.toLowerCase()
      //         .indexOf(query.toLowerCase()) > -1;
      //     });
      //   }, 200);
      // } else {
      //   this.options4 = [];
      // }
    }
  },
  mounted () {
    this.init()
  }
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
.in_select {
  height: 100%;
  line-height: 22px !important;
}
</style>
