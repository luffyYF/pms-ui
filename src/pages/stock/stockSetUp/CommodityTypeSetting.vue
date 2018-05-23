<template>
  <div class="content-body">
    <span class="title-span">商品类型设置</span>
    <el-button type="primary" size="mini" icon="el-icon-refresh" @click="listGoodsTypeData">刷新</el-button>
    <hr>
    <el-row>
      <el-col :span="12" style="padding-right:10px;">
        <span>一级类型</span>
        <el-button @click="addParentRow(parentTable)" type="primary" size="mini">添加</el-button>
        <el-table v-loading="loading" :data="parentTable" border style="width: 100%;margin-top:10px;">
          <el-table-column label="编号" align="center" prop="typeCode">
            <template slot-scope="scope">
              <el-button @click="changeChildTable(scope.row)" type="text">{{scope.row.typeCode}}</el-button>
              <!-- <el-input v-model="scope.row.typeCode" size="mini" v-if="scope.row.isNew"></el-input> -->
            </template>  
          </el-table-column>
          <el-table-column prop="name" label="名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" size="mini" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120"  align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="saveRow(scope.row)">保存</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, parentTable, scope.row)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <span>{{childTable.pName}} 的二级类型</span>
        <el-button @click="addChildRow(childTable)" type="primary" size="mini">添加</el-button>
        <el-table v-loading="loading" :data="childTable.table" border style="width: 100%;margin-top:10px;">
          <el-table-column label="编号" align="center" prop="typeCode">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.number">{{scope.row.typeCode}}</el-button>
              <el-input v-model="scope.row.typeCode" size="mini" v-if="scope.row.number"></el-input>
            </template>  
          </el-table-column>
          <el-table-column label="名称" align="center" prop="name">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" size="mini" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="saveRow(scope.row)">保存</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, childTable.table, scope.row)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  goodsTypeAdd,
  goodsTypeDel,
  goodsTypeList,
  goodsTypeUpdate,
  goodsTypeTree
} from "@/api/goods/goodsTypeController";
export default {
  data() {
    return {
      parentTable:[],
      childTable:{
        pId:'',
        pName:'',
        table:[]
      },
      loading:false,



      form: {},
      tableData: [],
      tableDataTwo: []
    };
  },
  created() {
    this.listGoodsTypeData();
  },
  methods: {
    listGoodsTypeData() {
      this.loading = true;
      goodsTypeTree().then(res => {
        console.log(res.data)
        this.loading = false;
        if(res.code == 1) {
          this.parentTable = res.data;
          this.childTable.pId = this.parentTable[0].id;  //二级类型默认显示第一个一级类型
          this.childTable.pName = this.parentTable[0].name;
          this.childTable.table = this.parentTable[0].child;
        }
      }).catch(()=>{
        this.loading = false;
      });
    },
    changeChildTable(row){
      console.log(row)
      this.childTable.pId = row.id;  
      this.childTable.pName = row.name;
      this.childTable.table = row.child;
    },
    addParentRow(rows){
      var row = {
        child:[],
        id:'',
        name:'',
        pId:'',
        typeCode:'',
        isNew:true
      }
      rows.push(row);
    },
    saveRow(row) {
      console.log(row);
      var param = {};
      param.typeCode = row.param;
      param.typeName = row.name;
      param.typePk = row.id;
      param.pTypePk = row.pId;
      if(param.typeName == '') {
        this.$message.error('类型名称不能为空！');
      } else {
        var type = row.isNew?'add':'modify';
        this.addGoodsTypeList(param,type);
      }
    },
    addGoodsTypeList(params,type){
      console.log(params);
      console.log(type);
      if (type == 'add') {
        goodsTypeAdd(params).then(res => {
          if(res.code == 1) {
            this.$message.success('添加成功！');
          } else {
            this.$message.error(res.msg);
          }
          this.listGoodsTypeData();
        });
      } else {
        goodsTypeUpdate(params).then(res => {
          if(res.code == 1) {
            this.$message.success('修改成功！')
          } else {
            this.$message.error(res.msg);
          }
          this.listGoodsTypeData();
        });
      }
    },





    addChildRow(obj) {
      console.log(obj);
      if(obj.table == null) {
        obj.table = [];
      }
      var item = {
        id:'',
        name:'',
        pId:this.childTable.pId,
        typeCode:'',
        isNew:true
      };
      obj.table.push(item);
    },
    
    deleteRow(index, rows, row) {
      if (row.isNew) {
        rows.splice(index, 1);
      } else {
        var param = {};
        param.typeCode = row.param;
        param.typeName = row.name;
        param.typePk = row.id;
        param.pTypePk = row.pId;
        this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          goodsTypeDel(param).then(res => {
            if(res.code == 1) {
              this.$message.success('移除成功！');
            } else {
              this.$message.error(res.msg);
            }
            this.listGoodsTypeData();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      }
    },
    addGoodsTypeSecondLevel(row) {
      console.log(row);
      const params = {
        companyPk: "",
        pTypePk: "SECOND-LEVEL",
        sortNum: "",
        typeCode: row.typeCode,
        typeName: row.typeName,
        typePk: ""
      };
      if (row.number) {
        goodsTypeAdd(params).then(res => {
          row.number = false;
          console.log(res.code);
          this.listGoodsTypeData();
        });
      } else {
        goodsTypeUpdate(row).then(res => {
          console.log(res.code);
        });
      }
    },
    
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


