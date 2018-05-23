// 商品部商品
<template>
  <div>
    <el-row>
      <el-col :span="12" class="left-panel">
        <el-input size="mini" class="search-input" placeholder="请输入商品或编号查询"></el-input>
        <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
        <br>
        <el-row class="goods-filter" :class="{'is-expand': filterExpand}">
          <el-col :span="2">
            <span>商品</span>
          </el-col>
          <el-col :span="21" id="main-content">
            <el-radio-group v-model="goodsFilter" size="mini">
              <el-radio label="all" border>全部</el-radio>
              <el-radio v-for="item of upGoodsTypeList" :key="item.typePk" :label="item.typePk" border>{{item.typeName}}</el-radio>
              <!-- <el-radio label="2" border>饮料</el-radio>
              <el-radio label="3" border>布草</el-radio>
              <el-radio label="4" border>测试</el-radio>
              <el-radio label="5" border>测试</el-radio>
              <el-radio label="6" border>测试啦啊</el-radio>
              <el-radio label="7" border>测试啦啊</el-radio>
              <el-radio label="8" border>测试啦啊</el-radio>
              <el-radio label="9" border>测试啦啊</el-radio> -->
            </el-radio-group>
          </el-col>
          <el-col :span="1">
            <template v-if="mainContentHeight>40">
              <el-button type="text" class="expand-button top" v-if="!filterExpand" @click="filterExpand=true">︾</el-button>
              <el-button type="text" class="expand-button bottom" v-if="filterExpand" @click="filterExpand=false">︽</el-button>
            </template>
          </el-col>
        </el-row>
        <el-table :data="tableData" size="mini" style="width: 100%">
          <el-table-column prop="goodsCode" label="商品编号" width="150">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" width="150">
          </el-table-column>
          <el-table-column prop="goodsPrice" label="单价" width="150">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-badge :value="0" class="goods-select-dot"></el-badge>
              <el-button size="mini" type="primary" icon="el-icon-plus" @click="addGoodsList(scope.row)"></el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :span="12">
        <div class="bg-consumer">
          <p class="detail-title">
            <span style="margin-left:5px;">消费明细</span>
            <el-button type="text" icon="el-icon-delete" style="float:right;margin-right:5px;">清空</el-button>
          </p>
          <p class="detail-table">
            <el-table :row-style="tableRowClassStyle" :header-cell-style="tableRowClassStyle" :data="detailData" size="mini" style="width: 100%;">
              <el-table-column prop="goodsName" label="项目名称" width="100" align="center">
              </el-table-column>
              <el-table-column prop="price" label="单价" width="80" align="center">
              </el-table-column>
              <el-table-column prop="count" label="数量" width="120" align="center">
                <template slot-scope="props">
                  <el-input-number size="mini" v-model="props.row.count"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="sumPrice" label="金额" align="center">
              </el-table-column>
            </el-table>
          </p>
          <p class="detail-totalPrice">
            <span style="float:right">总计 ¥
              <span class="red-font">192.60</span>
            </span>
          </p>
          <div class="detail-payway">
            <span>付款方式：</span>
            <div class="blank-10"></div>
            <el-radio-group v-model="payway" class="radio-payway">
              <el-row>
                <el-col :span="8">
                  <el-radio :label="'cash'">现金消费</el-radio>
                  <el-radio :label="'bank'">银行卡</el-radio>
                  <el-radio :label="'group'">集团招待</el-radio>
                </el-col>
                <el-col :span="8">
                  <el-radio :label="'guest'">客房消费</el-radio>
                  <el-radio :label="'cheque'">支票</el-radio> <br>
                  <el-radio :label="'credit'">挂账</el-radio>
                </el-col>
                <el-col :span="8">
                  <el-radio :label="'wechat'">微信付款</el-radio>
                  <el-radio :label="'alipay'">支付宝当面付</el-radio>
                  <el-radio :label="'storeCard'">存值卡</el-radio>
                </el-col>
              </el-row>
            </el-radio-group>
          </div>
          <div class="detail-selection">
            <el-form ref="form" :inline="true" :model="form" label-width="80px" size="mini">
              <el-form-item label="哑房" v-if="payway=='cash' || payway=='bank' || payway=='cheque' || payway=='credit' || payway=='wechat' || payway=='alipay' || payway=='group' || payway=='storeCard'">
                <el-input :disabled="true" v-model="form.yafang"></el-input>
                &nbsp;&nbsp;
                <el-button type="text">选择</el-button>
              </el-form-item>
              <el-form-item label="付款条码" v-if="payway=='wechat' || payway=='alipay'">
                <el-input v-model="form.payCode"></el-input>
              </el-form-item>
              <el-form-item label="房号" v-if="payway=='guest'">
                <el-input v-model="form.roomNumber"></el-input>
              </el-form-item>
              <el-form-item label="客单" v-if="payway=='guest'">
                <el-select v-model="form.guestOrder">
                  <el-option label="哈哈哈" value="v1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="会员卡号" v-if="payway=='storeCard'">
                <el-input class="vip-left"></el-input>
                <el-input class="vip-right" :disabled="true"></el-input>
                <img src="../../assets/image/scanner_member.png" alt="">
              </el-form-item>
              <el-form-item label="密码" required v-if="payway=='storeCard'">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="可用余额" v-if="payway=='storeCard'">
                <span style="color:red">0.00</span>
              </el-form-item>
              <el-form-item label="备注" v-if="payway=='cash' || payway=='bank' || payway=='cheque' || payway=='credit' || payway=='wechat' || payway=='alipay' || payway=='group' || payway=='storeCard'">
                <el-input type="textarea" :rows="2" v-model="form.remark"></el-input>
              </el-form-item>
                <div class="form-bottom">
                  <el-button type="primary" size="mini" v-if="payway=='alipay'">请联系客服申请开通</el-button>
                  <el-button type="primary" size="mini" v-else>保存</el-button>
                </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {goodsDeptList} from "@/api/goods/goodsDeptController";
import {getUpGoodsTypeList,listUpGoodsInfos} from "@/api/goods/goodsTypeController";
export default {
  data() {
    return {
      form: {},
      payway: "guest",
      deptPk:'',//当前选中的商品部
      mainContentHeight: 0,
      filterExpand: false,
      goodsFilter: null,
      upGoodsTypeList:[],//上架并且存在上架商品的商品类型
      tableData: [],
      detailData: [
        {
          goodsName: "伊利纯牛奶",
          price: 20.5,
          count: 2,
          sumPrice: 41
        },
        {
          goodsName: "伊利纯牛奶",
          price: 9999.99,
          count: 999,
          sumPrice: 9999.99
        },
        {
          goodsName: "伊利纯牛奶",
          price: 9999.99,
          count: 999,
          sumPrice: 9999.99
        }
      ]
    };
  },
  created(){
    // this.listUpGoodsInfosList();
  },
  mounted() {
    this.mainContentHeight = document.getElementById(
      "main-content"
    ).offsetHeight;
    // this.listUpGoodsInfosList();
  },
  methods: {
    getList(deptPk,listGoodsInfo){
      console.log(deptPk)
      console.log(listGoodsInfo)
      this.deptPk = deptPk;
      this.tableData = listGoodsInfo;
      //加载上架并且存在上架商品的商品类型
      this.getUpGoodsType();
    },
    //加载上架并且存在上架商品的商品类型
    getUpGoodsType(){
      let data = { deptPk: this.deptPk };
      getUpGoodsTypeList().then(res => {
        if (res.code == 1) {
          console.log("=========")
          console.log(res.data)
          this.upGoodsTypeList = res.data;
        }else{
          this.$message({type: "success",message: res.msg});
        }
      });
    },
    tableRowClassStyle({ row, rowIndex }) {
      return "background: #f7f7f7;";
    },
    addGoodsList(row){
      console.log(row)
    }
    // listUpGoodsInfosList(){
    //   listUpGoodsInfos({deptPk:this.deptPk,typePk:this.goodsFilter,upFlag:'Y'}).then(res => {
    //     console.log(res.data)
    //   })
    // }

  },
  updated() {
    this.mainContentHeight = document.getElementById(
      "main-content"
    ).offsetHeight;
  }
};
</script>

<style scoped>
.detail-title {
  line-height: 40px;
  border-bottom: 1px solid #9e9e9e;
}
.detail-table {
  padding-bottom: 40px !important;
  border-bottom: 1px dashed #9e9e9e;
}
.detail-totalPrice {
  /* margin-bottom: 10px; */
  overflow: hidden;
}
.detail-payway {
  padding-left: 5px !important;
}
.detail-selection {
  margin-top: 20px !important;
}
.detail-selection .el-input,
.el-textarea,
.el-select {
  width: 230px;
}
.form-bottom{
  text-align: center;
  margin-bottom: 10px;
  /* margin:0 auto; */
}
.detail-selection .el-form-item--mini .el-form-item__content {
  line-height: 20px !important;
}
.vip-right {
  width: 92px !important;
}
.vip-left {
  width: 138px !important;
}
.radio-payway {
  padding-left: 5px !important;
}

.radio-payway .el-radio {
  margin-left: 0 !important;
  margin-bottom: 5px;
  padding-left: 0 !important;
}
.blank-10 {
  height: 10px;
}
.red-font {
  color: #e51f1f;
  font-size: 21px;
  font-weight: bold;
  margin-right: 10px;
}
.el-input-number {
  width: 98px;
}
.bg-consumer {
  overflow: hidden;
  width: 380px;
  background-color: #f7f7f7;
  margin-left: 44px;
}
.bg-consumer p {
  margin: 0;
  padding: 0;
}
.expand-button {
  position: absolute;
  margin: 0;
  padding: 0;
}
.is-expand {
  height: initial !important;
}
.expand-button.top {
  /* top:6px; */
  bottom: 10px;
}

.expand-button.bottom {
  bottom: 15px;
}
.el-icon-arrow-up {
  font-size: 19px;
}
.el-button--mini .el-icon-arrow-up {
  font-size: 19px;
}
.goods-filter .el-radio {
  margin-bottom: 10px;
}
.goods-filter {
  margin-top: 20px;
  border-bottom: 1px solid #9e9e9e;
  height: 39px;
  overflow: hidden;
}
.left-panel {
  padding-left: 20px;
}
.search-input {
  width: 220px;
}
.goods-filter .el-radio{
  margin-left: 0px;
}
.goods-filter .el-radio{
  margin-left: 0px !important;
  margin-right: 10px !important;
}
</style>
<style>
.goods-select-dot .el-badge__content{
  background-color: #ff6600 !important;
}

</style>
