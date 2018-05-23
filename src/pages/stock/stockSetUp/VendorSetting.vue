<template>
  <div class="content-body">
    <span class="title-span">库存管理－供应商设置</span>
    <el-button @click="addRow(tableData)" type="primary" size="mini">添加</el-button>
    <el-button type="primary" size="mini" icon="el-icon-refresh" @click="listGoodsSupplierType">刷新</el-button>
    <hr>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <el-form-item label="编号">
        <el-input v-model="form.supplierCode" clearable></el-input>
      </el-form-item>
      <el-form-item  label="名称">
        <el-input v-model="form.supplierName" clearable></el-input>
      </el-form-item>
      <el-form-item  label="联系人">
        <el-input v-model="form.contactName" clearable></el-input>
      </el-form-item>
      <el-form-item  label="联系电话">
        <el-input v-model="form.contactPhone" clearable></el-input>
      </el-form-item>
      <el-form-item  label="简拼">
        <el-input v-model="form.jianpin" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.usingFlag">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="Y"></el-option>
          <el-option label="停用" value="N"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="mini" @click="listGoodsSupplierType('query')">搜索</el-button>
      </el-form-item>

      <el-table v-loading="loading" 
      :data="tableData"  border style="width: 100%">
        <el-table-column label="编号">
          <template slot-scope="scope">
            <el-button type="text" v-if="!scope.row.isNew">{{scope.row.supplierCode}}</el-button>
            <el-input v-model="scope.row.supplierCode" size="mini" v-if="scope.row.isNew"></el-input>
          </template>
        </el-table-column> 
        <el-table-column label="名称"> 
          <template slot-scope="scope">
            <el-input v-model="scope.row.supplierName" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column label="简拼">
          <template slot-scope="scope">
            <el-input v-model="scope.row.jianpin" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系人">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contactName" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系电话">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contactPhone" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系地址">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contactAddress" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column> 
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="160">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.usingFlag">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addGoodsSupplierList(scope.row)">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import {
  addGoodsSupplier,
  delGoodsSupplier,
  listGoodsSupplier,
  updateGoodsSupplier
} from "@/api/stock/pmsStockSetUp/goodsSupplierController";
export default {
  components: {},
  data() {
    return {
      form: {
        supplierCode: "",
        supplierName: "",
        contactName: "",
        contactPhone: "",
        jianpin: "",
        usingFlag: ""
      },
      platformTypeList: [],
      tableData: [],
      loading: false
    };
  },
  created() {
    this.listGoodsSupplierType();
  },
  methods: {
    addRow(rows) {
      var item = {
        supplierCode:'',
        supplierName:'',
        jianpin:'',
        contactName:'',
        contactPhone:'',
        contactAddress:'',
        remark:'',
        usingFlag:'Y',
        isNew: true
      };
      rows.push(item);
    },
    addGoodsSupplierList(row) {
      console.log(row);
      if(this.verification(row)) {
        if (row.isNew) {
          addGoodsSupplier(row).then(res => {
            if(res.code == 1) {
              this.$message.success('添加成功');
            } else {
              this.$message.error(res.msg)
            }
            this.listGoodsSupplierType();
          });
        } else {
          updateGoodsSupplier(row).then(res => {
            if(res.code == 1) {
              this.$message.success('修改成功');
            } else {
              this.$message.error(res.msg)
            }
            this.listGoodsSupplierType();
          });
        }
      }
    
    },
    verification(row){
      var content = '';
      if(row.supplierCode == '') {
        content = '请输入供应商编码';
      } else if (row.supplierName == '') {
        content = '请输入供应商名称';
      } else if (row.jianpin == '') {
        content = '请输入供应商简拼';
      } else if (row.contactName == '') {
        content = '请输入联系人';
      } else if (row.contactPhone == '') {
        content = '请输入联系电话';
      } else if (row.contactAddress == '') {
        content = '请输入联系地址';
      }

      if(content != '') {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    listGoodsSupplierType() {
      // const self = this;
      // self.tableData = [];
      // const params = self.form;
      this.loading = true;
      if(arguments[0] != 'query') {
        this.form = {
          supplierCode: "",
          supplierName: "",
          contactName: "",
          contactPhone: "",
          jianpin: "",
          usingFlag: ""
        }
      }
      listGoodsSupplier(this.form).then(res => {
        this.loading = false;
        if(res.code == 1) {
          this.tableData = res.data;
        } 
        
      }).catch(()=>{
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
}
.title-span {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px;
  display: inline-block;
}
</style>


