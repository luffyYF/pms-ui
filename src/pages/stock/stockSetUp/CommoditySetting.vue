<template>
  <div class="content-body">
    <!-- 库存管理－商品设置 -->
    <div v-if="showTabFlag">
      <span class="title-span">库存管理－商品设置</span>
      <el-button @click="showTabFlag = false" type="primary" size="mini">添加</el-button>
      <el-button type="primary" size="mini" icon="el-icon-refresh" @click="listGoodsInfoData">刷新</el-button>
      <hr>
      <el-form ref="sreacehlistData" :inline="true" :model="sreacehlistData" size="mini"  >
        <el-form-item  label="编号"> 
          <el-input v-model="sreacehlistData.goodsCode" clearable></el-input>
        </el-form-item>
        <el-form-item  label="名称">
          <el-input v-model="sreacehlistData.goodsName" clearable></el-input>
        </el-form-item>
        <el-form-item  label="简拼">
          <el-input v-model="sreacehlistData.jianpin" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="sreacehlistData.usingFlag" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="Y"></el-option>
            <el-option label="停用" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="listGoodsInfoData('query')">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="goodsCode" align="center" label="编号"></el-table-column>
          <el-table-column prop="goodsName" align="center" label="名称"></el-table-column>
          <el-table-column prop="jianpin" align="center" label="简拼"></el-table-column>
          <el-table-column prop="linenFlag" align="center" label="类别">
            <template slot-scope="scope">{{scope.row.linenFlag== 'Y' ? '布草':'商品'}}</template>
          </el-table-column>
          <el-table-column prop="goodsUnit" align="center" label="单位"> </el-table-column>
          <el-table-column prop="goodsSpec" align="center" label="规格"> </el-table-column>
          <el-table-column prop="usingFlag" align="center" label="状态">
            <template slot-scope="scope">{{scope.row.usingFlag== 'Y' ? '启用':'停用'}}</template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button  @click="updateGoodsInfoType(scope.row)" type="text" size="small">{{scope.row.usingFlag== 'Y'?'停用':'启用'}}</el-button>
              <el-button @click="updateInfoBtn(scope.row)" type="text" size="small"> 修改 </el-button>
            </template>
          </el-table-column>
        </el-table>
      
    </div>
    <!-- 添加商品 -->

    <div v-if="!showTabFlag">
      <span class="title-span">添加商品</span>
      <el-button type="primary" size="mini" icon="el-icon-refresh" @click="listGoodsTypeList">刷新</el-button>
      <hr>
      <el-form ref="form" size="mini" :model="form" label-width="80px">
        
        <el-row>
          <el-col :span="7">
            <el-form-item  label="编号" >
              <el-input v-model="form.goodsCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  label="名称">
              <el-input v-model="form.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  label="简拼" >
              <el-input v-model="form.jianpin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item  label="单位">
              <el-input v-model="form.goodsUnit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  label="规格" >
              <el-input v-model="form.goodsSpec"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="类型" >
              <el-cascader
                :props="props"
                :options="listGoodsTypeData"
                v-model="form.typePkList">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="状态">
              <el-radio-group v-model="form.usingFlag">
                <el-radio label="Y">启用</el-radio>
                <el-radio label="N">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  label="库存下限">
              <el-input v-model="form.lowerLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  label="库存上限" >
              <el-input v-model="form.upperLimit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="布草">
          <el-radio-group v-model="form.linenFlag">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="addCommoditySetting(form)">保存</el-button>
          <el-button type="primary" size="mini" @click="showTabFlag = true">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="修改商品" width="850px"  :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="updateForm" size="mini" label-width="80px">
        <el-col :span="24">
          <el-col :span="7">
            <el-form-item label="编号">
              <el-input v-model="updateForm.goodsCode" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input v-model="updateForm.goodsName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="简拼">
              <el-input v-model="updateForm.jianpin" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="7">
            <el-form-item label="单位">
              <el-input v-model="updateForm.goodsUnit" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格">
              <el-input v-model="updateForm.goodsSpec" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="类型">
              <span>{{updateForm.typename}}</span>
              <el-cascader
              style="width:140px"
                :props="props"
                :options="listGoodsTypeData"
                @change="handleChange"
                v-model="updateForm.typePkList">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="7">
            <el-form-item label="状态">
              <el-radio-group v-model="updateForm.usingFlag">
                <el-radio label="Y">启用</el-radio>
                <el-radio label="N">停用</el-radio>  
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存下限">
              <el-input v-model="updateForm.lowerLimit" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="库存上限">
              <el-input v-model="updateForm.upperLimit" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="updateInfoType">确 定</el-button>
      </div>
    </el-dialog>



    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" append-to-body :before-close="handleClose">
      <span>确定停用?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import { goodsTypeTree,goodsTypeList } from "@/api/goods/goodsTypeController";
import {
  addGoodsInfo,
  delGoodsInfo,
  listGoodsInfo,
  updateGoodsInfo
} from "@/api/stock/pmsStockSetUp/goodsInfoController";
export default {
  components: {},
  data() {
    return {
      listGoodsTypeData: [],
      listGoodsType:[],
      props: {
        label: "name",
        value: "id",
        children: "child"
      },
      sreacehlistData: {
        goodsCode: "",
        goodsName: "",
        jianpin: "",
        usingFlag: ""
      },
      form: {
        goodsCode: "",
        goodsName: "",
        jianpin: "",
        goodsUnit: "",
        goodsSpec: "",
        typePkList: [],
        typePk:'',
        typename:'',
        usingFlag: "Y",
        lowerLimit: "",
        upperLimit: "",
        linenFlag: "Y"
      },
      updateForm: {
        goodsCode: "",
        goodsName: "",
        jianpin: "",
        goodsUnit: "",
        goodsSpec: "",
        typePk: "",
        typePkList:[],
        usingFlag: "",
        lowerLimit: "",
        upperLimit: ""
      },
      usingFlagWhy: false,
      showTabFlag: true,
      dialogVisible: false,
      dialogFormVisible: false,
      loading: false,
      platformTypeList: [],
      tableData: [],
      formaaa: []
    };
  },
  created() {
    this.listGoodsTypeList();
    this.listGoodsInfoData();
  },
  methods: {
    listGoodsTypeList() {
      //商品类型
      goodsTypeTree().then(res => {
        console.log(res.data);
        if (res.code == 1) {
          this.listGoodsTypeData = res.data;
          console.log(this.listGoodsTypeData)
        }
      });
      goodsTypeList().then(res => {
        if(res.code == 1) {
          console.log(res.data)
          this.listGoodsType = res.data;
        }
      })
    },
    listGoodsInfoData() {
      this.loading = true;
      if(arguments[0] != 'query') {
        this.sreacehlistData = {
          goodsCode: "",
          goodsName: "",
          jianpin: "",
          usingFlag: ""
        }
      }
      listGoodsInfo(this.sreacehlistData).then(res => {
        this.loading = false;
        this.tableData = res.data;
        console.log(this.tableData)
      });
    },
    updateGoodsInfoType(row) {
      row.usingFlag == 'Y'?row.usingFlag = 'N':row.usingFlag = 'Y';
      console.log(row)
      updateGoodsInfo(row).then(res => {
        if(res.code == 1) {
          this.$message.success(row.usingFlag == 'Y'?'已启用':'已停用');
        } else {
          this.$message.error(res.msg);
        }
        this.listGoodsInfoData();
      });
    },
    addCommoditySetting(form) {
      if(form.typePkList != null) {
        if(form.typePkList.length == 2) {
          form.typePk = form.typePkList[1];
        } else if(form.typePkList.length == 1) {
          form.typePk = form.typePkList[0];
        }
      }
      
       if(this.verification(form)) {
         console.log(form)
          addGoodsInfo(form).then(res => {
            console.log(res.code);
            if(res.code == 1) {
              this.$message.success('商品保存成功');
              this.showTabFlag = true;
            } else {
              this.$message.error(res.msg);
            }
            this.listGoodsInfoData();
          });
       }
    },
    verification(obj){
      var content = '';
      if(obj.goodsCode == '') {
        content = '商品编号不能为空';
      } else if (obj.goodsName == '') {
        content = '商品名称不能为空'
      } else if (obj.jianpin == '') {
        content = '商品简拼不能为空'
      } else if (obj.goodsUnit == '') {
        content = '商品单位不能为空'
      } else if (obj.goodsSpec == '') {
        content = '商品规格不能为空'
      } else if (obj.typePk == '') {
        content = '商品类型不能为空'
      } else if (obj.lowerLimit == '') {
        content = '库存下限不能为空'
      } else if (obj.upperLimit == '') {
        content = '库存上限不能为空'
      }

      if (content != '') {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    
    
    updateInfoBtn(row) {
      this.dialogFormVisible = true;
      this.updateForm = row;
      for(var i = 0; i < this.listGoodsType.length; i++) {
        if(this.updateForm.typePk == this.listGoodsType[i].typePk) {
          this.updateForm.typename = this.listGoodsType[i].typeName;
        }
      }
      console.log(this.updateForm);
    },
    updateInfoType() {
      console.log(this.updateForm)
      if(this.updateForm.typePkList != null) {
        if(this.updateForm.typePkList.length== 1) {
          this.updateForm.typePk = this.updateForm.typePkList[0]
        } else if (this.updateForm.typePkList.length == 2) {
          this.updateForm.typePk = this.updateForm.typePkList[1]
        }
      }
      
      if(this.verification(this.updateForm)) {
        
        updateGoodsInfo(this.updateForm).then(res => {
          console.log(res.code);
          if(res.code == 1) {
            this.$message.success('修改成功');
            this.dialogFormVisible = false;
          } else {
            this.$message.error(res.msg)
          }
          this.listGoodsInfoData();
        });
      }
    },
    handleChange(){
      var tmp = '';
      if(this.updateForm.typePkList.length == 1) {
        tmp = this.updateForm.typePkList[0]
      } else if (this.updateForm.typePkList.length == 2) {
        tmp = this.updateForm.typePkList[1]
      }
      for(var i = 0; i < this.listGoodsType.length; i++) {
        if(tmp == this.listGoodsType[i].typePk) {
          this.updateForm.typename = this.listGoodsType[i].typeName;
        }
      }

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


