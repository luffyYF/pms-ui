<template>
    <div class="content-body">
      <span class="title-span">仓库设置</span>
      <el-button @click="addRow(tableData)" type="primary" size="mini">添加</el-button>
      <el-button type="primary" size="mini" icon="el-icon-refresh" @click="listStorage">刷新</el-button>
      <hr>  
      <el-table ref="multipleTable" border v-loading="loading" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="storageNo" label="仓库编号" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="!scope.row.isNew">{{scope.row.storageNo}}</el-button>
            <el-input v-model="scope.row.storageNo" size="mini" v-if="scope.row.isNew"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="仓库名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="usingFlag" label="仓库状态" align="center" width="180">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.usingFlag" label="Y">启用</el-radio>
            <el-radio v-model="scope.row.usingFlag" label="N">停用</el-radio>
          </template>
        </el-table-column> -->
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
import Cookies from 'js-cookie'
import {getStorageList,addStorage,updateStorage, deleteStorage} from '@/api/upmsStorage';
export default {
  components: {},
  data() {
    return {
      form: {},
      number: false,
      loading: false,
      tableData: [],
      multipleSelection: [],
      currCompanyPk: Cookies.get('select_company_pk')
    };
  },
  created() {
    this.listStorage();
  },
  methods: {
    addRow(rows) {
      var item = {storageId:'',storageNo:'',name:'',companyPk:this.currCompanyPk, isNew:true}
      rows.push(item);
    },
    addGoodsDepotList(row) {
      if (row.isNew) {
        if(row.storageNo == '') {
          this.$message.error('仓库编号不能为空！');
        } else if(row.name == '') {
          this.$message.error('仓库名字不能为空！');
        } else {
          addStorage(row).then(res => {
            this.$message.success('添加仓库成功！');
            this.listStorage();
          });
        }        
      } else {
        updateStorage(row).then(res => {
          if(res.code == 1) {
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.msg)
          }
          this.listStorage();
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
          deleteStorage(row).then(res => {
            this.$message.success('已成功移除！')
            this.listStorage();
          });
        });
        
      }
    },
    listStorage() {
      this.loading = true;
      getStorageList({companyPk:this.currCompanyPk}).then(res => {
        this.loading = false;
        this.tableData = res.data;
      }).catch(() => {
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


