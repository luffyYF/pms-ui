<template>
    <div class="content-body">
      <span class="title-span">仓库设置</span>
      <el-button @click="addRow(tableData)" type="primary" size="mini">添加</el-button>
      <el-button type="primary" size="mini" icon="el-icon-refresh" @click="listGoodsDepotType">刷新</el-button>
      <hr>  
      <el-table ref="multipleTable" border v-loading="loading" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="depotCode" label="仓库编号" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="!scope.row.isNew">{{scope.row.depotCode}}</el-button>
            <el-input v-model="scope.row.depotCode" size="mini" v-if="scope.row.isNew"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="depotName" label="仓库名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.depotName" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="usingFlag" label="仓库状态" align="center" width="180">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.usingFlag" label="Y">启用</el-radio>
            <el-radio v-model="scope.row.usingFlag" label="N">停用</el-radio>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addGoodsDepotList(scope.row)"> 保存 </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)" type="text" size="small"> 移除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import {
  addGoodsDepot,
  delGoodsDepot,
  updateGoodsDepot,
  listGoodsDepot
} from "@/api/stock/pmsStockSetUp/goodsDepotController";
export default {
  components: {},
  data() {
    return {
      form: {},
      number: false,
      loading: false,
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
    this.listGoodsDepotType();
  },
  methods: {
    addRow(rows) {
      console.log(rows);
      var item = {depotPk:'',depotCode:'',depotName:'',usingFlag:'Y',isNew:true}
      rows.push(item);
    },
    addGoodsDepotList(row) {
      if (row.isNew) {
        if(row.depotCode == '') {
          this.$message.error('仓库编号不能为空！');
        } else if(row.depotName == '') {
          this.$message.error('仓库名字不能为空！');
        } else {
          addGoodsDepot(row).then(res => {
            if(res.code == 1) {
              this.$message.success('添加仓库成功！');
            } else {
              this.$message.error(res.msg);
            }
            this.listGoodsDepotType();
          });
        }        
      } else {
        updateGoodsDepot(row).then(res => {
          if(res.code == 1) {
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.msg)
          }
          this.listGoodsDepotType();
        });
      }
    },
    deleteRow(index, rows, row) {
      if (row.isNew) {
        rows.splice(index, 1);
      } else {
        this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delGoodsDepot(row).then(res => {
            if(res.code == 1) {
              this.$message.success('已成功移除！')
            }
            this.listGoodsDepotType();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
        
      }
    },
    listGoodsDepotType() {
      this.loading = true;
      listGoodsDepot()
        .then(res => {
          this.loading = false;
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
  width: 900px;
}
.title-span {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px;
  display: inline-block;
}
</style>


