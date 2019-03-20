<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">积分商品管理</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addProtocolClick">添加积分商品</el-button>
      <el-table
        size="mini" 
        border 
        v-loading="loading"
        highlight-current-row
        :data="intergralGoodList" 
        style="width: 98%; margin:10px;">
        <el-table-column prop="goodsCode" label="编码" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsCode" size="mini" placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="goodsType" label="商品类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.goodsType" size="mini" placeholder="请选择">
              <el-option
                v-for="item in goodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="名称/金额/房型" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsName"  size="mini" placeholder="请输入名称/金额/房型"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="integral" label="需要积分数" align="center">
          <template slot-scope="scope">
             <el-input v-model="scope.row.integral"  size="mini" placeholder="请输入需要积分数"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  integralGoodsAdd,
  integralGoodsDel,
  integralGoodsList,
  integralGoodsUpdate
} from "../../../api/systemSet/member/pmsIntegralGoodsController";
export default {
  created() {
    // this.selectGoodList();
  },
  data() {
    return {
      intergralGoodList: [],
      goodOptions: [
        { label: "普通物品", value: "COMM" },
        { label: "现金", value: "CASH" },
        { label: "客房", value: "ROOM" }
      ],
      loading: false
    };
  },
  methods: {
    init() {
      this.selectGoodList();
    },
    selectGoodList() {
      this.loading = true;
      integralGoodsList().then(res => {
        this.loading = false;
        if (res.code == 1) {
          this.intergralGoodList = res.data;
          console.log(this.intergralGoodList);
        }
      });
    },
    saveClick(row) {
      console.log(row);
      if (this.verification(row)) {
        if (row.isNew) {
          integralGoodsAdd(row).then(res => {
            if (res.code == 1) {
              this.$message.success("添加积分商品成功！");
              this.selectGoodList();
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          integralGoodsUpdate(row).then(res => {
            if (res.code == 1) {
              this.$message.success("保存成功");
              this.selectGoodList();
            }
          });
        }
      }
    },
    verification(row) {
      var content = "";
      if (row.goodsCode == "") {
        content = "请填写积分商品编码";
      } else if (row.goodsType == "") {
        content = "请选择商品类型";
      } else if (row.goodsName == "") {
        content = "请填写名称/金额/房型";
      } else if (row.integral == "") {
        content = "请填写所需积分";
      }
      if (content != "") {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    deleteClick(row) {
      console.log(row);
      this.$confirm('此操作将永久删除该积分商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        integralGoodsDel(row).then(res => {
          if(res.code == 1) {
            this.$message.success('删除成功！')
            this.selectGoodList();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    addProtocolClick() {
      this.intergralGoodList.unshift({
        goodsCode: "",
        goodsName: "",
        goodsType: "",
        integral: "",
        goodsPk: "",
        isNew: true
      });
    }
  }
};
</script> 

<style scoped>
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
.add-pro {
  float: left;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
