// 退单管理
<template>
  <div class="refund-panel00001">
    <!-- form -->
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">消费查询</h5>
        <el-form-item label="消费单号">
          <el-input v-model="form.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-date-picker v-model="form.businessDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="消费类别">
          <el-select v-model="form.consumeType">
            <el-option label="全部" value=""></el-option>
            <el-option label="客房消费" value="v1"></el-option>
            <el-option label="现金消费" value="v2"></el-option>
            <el-option label="信用卡" value="v3"></el-option>
            <el-option label="微信付款" value="v4"></el-option>
            <el-option label="支付宝当面付" value="v5"></el-option>
            <el-option label="储值卡" value="v7"></el-option>
            <el-option label="支票" value="v6"></el-option>
            <el-option label="集团招待" value="v8"></el-option>
            <el-option label="挂账" value="v9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="未结账" value="1"></el-option>
            <el-option label="已结账" value="2"></el-option>
            <el-option label="未确认" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">消费列表</h5>
      <el-table ref="consumeTable" :data="tableData" size="mini" border style="width: 98.5%; margin:10px;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.detailTableData" row-class-name="bg-row" header-row-class-name="bg-row" size="mini" style="width: 100%;" border>
              <el-table-column prop="goodsName" label="项目名称" width="120" align="center">
              </el-table-column>
              <el-table-column prop="goodsNum" label="数量" width="120" align="center">
              </el-table-column>
              <el-table-column prop="createTime" label="入账日期" width="180" align="center">
              </el-table-column>
              <el-table-column prop="goodsPrice" label="单价" width="100" align="center">
              </el-table-column>
              <el-table-column prop="totalPrice" label="金额" width="150" align="center">
              </el-table-column>
              <el-table-column prop="cancelNum" label="退单数" width="150" align="center">
                <template slot-scope="sonProps">
                  <el-input-number v-if="scope.row.canCancelFlag" :controls="false" v-model="canCancelNum" size="mini" class="max-back-input"></el-input-number> <br>
                  <span class="max-back-font">最大可退数：{{sonProps.row.canCancelNum}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <!-- 操作 -->
                <template slot-scope="scope">
                  <el-button v-if="scope.row.canCancelFlag" @click="backOrderClick(scope.row)" size="mini">退单</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="消费单号" align="center" width="120">
        </el-table-column>
        <el-table-column prop="orderType" label="消费类别" align="center" width="120">
        </el-table-column>
        <el-table-column prop="businessDate" label="营业时间" align="center" width="180">
        </el-table-column>
        <el-table-column prop="orderPrice" label="金额" align="center" width="100">
        </el-table-column>
        <el-table-column prop="createUserId" label="结账人" align="center" width="150">
        </el-table-column>
        <el-table-column prop="orderDetailNum" label="记录数" align="center" width="152">
        </el-table-column>
        <el-table-column fixed="right" label="详细" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="toggleRowClick(scope.row)" type="primary" size="mini">查看详细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 填写退单原因 dialog -->
    <el-dialog title="退单原因" width="30%" :visible.sync="dialogbackOrderVisible">
      <div class="body-conten">
        请填写退单原因：<br>
        <el-input size="mini"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogbackOrderVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogbackOrderVisible = false">确定退单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listGoodsOrder} from '@/api/goods/goodsOrderController'
import {backOrderDetail,listGoodsOrderDetail} from '@/api/goods/goodsOrderDetailController'
export default {
  data() {
    return {
      dialogbackOrderVisible: false,
      proDialogTitle: "",
      form: {
        consumeType: "",
        status: ""
      }, //查询表单数据
      tableData: [],
      canCancelNum:0//退单数量
    };
  },
  mouted(){
    this.getList();
  },
  methods: {
    //获取列表数据
    getList(){
      listGoodsOrder().then(res => {
        if(res.code==1){
          this.tableData = res.data;
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      })
    },
    //查看详细
    toggleRowClick(row) {
      //TODO 根据Id获取initData数据...
      var data={
        orderPk:row.orderPk
      };
      console.log(row);
      listGoodsOrderDetail(data).then(res => {
        if(res.code==1){
          row.detailTableData = res.data;
          this.$refs.consumeTable.toggleRowExpansion(row);
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      });
    },
    //点击退单
    backOrderClick(row) {
      var data={
        orderPk:row.orderPk,
        orderDetailPk:row.orderDetailPk,
        cancelNum:this.canCancelNum
      };
      backOrderDetail(data).then(res => {
        if(res.code==1){
          this.$message({type:'success', message: '退单成功'})
          this.getList();
          this.dialogbackOrderVisible = true;
        }
      }).catch(error=>{
        this.$message({type:'danger', message: error})
      });
    }
  },
};
</script>

<style scoped>
.refund-panel00001 {
  margin-left: 20px;
  margin-right: 10px;
}
.max-back-font {
  font-size: 12px;
}
.max-back-input {
  width: 70px;
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
.el-select {
  width: 178px;
}
.el-date-editor.el-input {
  width: 178px;
}
.add-pro {
  float: left;
  margin-bottom: 10px;
  margin-left: 10px;
}

.el-table__expanded-cell:hover {
  background-color: #edefef;
}
.el-table__expanded-cell {
  background-color: #edefef;
}
</style>
<style>
.refund-panel00001 .bg-row th{
  background-color: #F7F7F7 !important;
}
.refund-panel00001 .bg-row td{
  background-color: #F7F7F7 !important;
}
</style>
