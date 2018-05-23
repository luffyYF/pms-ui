<template>
  <div class="goords-manager00002">
    <el-row :gutter="24" style="margin-left:0;margin-right:0;">
      <el-col :span="8">
        <div class="collapse-box">
          <el-button type="danger" @click="operation('add',{})" style="width:100%;margin-bottom:20px;"><span class="el-icon-plus"></span>添加商品部</el-button>
          <p class="tip">命名的参考：商品部名字可与商品部位置对应起来</p>
        
          <el-collapse v-model="activecollapse" accordion>
            <el-collapse-item v-for="(commodity,index) in commodityDeptList" :key="index" :name="index">
              <template slot="title">
                {{commodity.deptName}}
                <span class="collapse-btns">
                  <el-button type="text" style="color:#fff;"  v-on:click.stop="operation('modify',commodity)">编辑</el-button>
                  <el-button type="text" style="color:#fff;" v-on:click.stop="deleteDept(commodity)">删除</el-button>
                </span>
              </template>
              <div class="gd_menu_item">
                <ul class="gd_second_menu">
                  <li v-for="(goods,i) in commodity.goodsType" :key="i">
                    <div class="gd_menu_item_line"></div>
                    <div class="gd_menu_content" @click="selectGoodsInfolist(commodity.deptPk,goods.typeId)">
                      <el-button v-on:click.stop="upperLower(index,i)" size="mini" :type="goods.isReg?'success':'danger'">{{goods.isReg?'下架':'上架'}}</el-button>
                      <span>{{goods.typeName}}</span>
                      <span v-if="activeDeptPk == commodity.deptPk && activeTypePk == goods.typeId" class="el-icon-caret-right" style="color:#48c0f8;"></span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="12">
            <el-radio-group v-model="goodsFilter" size="mini" @change="changeSelectCondition">
              <el-radio label="all" border>全部商品</el-radio>
              <el-radio label="up" border>上架商品</el-radio>
              <el-radio label="dowm" border>下架商品</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="12">
            <el-input size="mini" v-model="filterText2" class="search-input" placeholder="请输入商品或编号查询"></el-input>
            <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="goodsInfoStatusList | globalFilter(filterText) | globalFilter(filterText2) " class="table-style">
              <el-table-column prop="usingFlag" width="90" column-key="usingFlag">
                <template slot-scope="scope">
                  <el-button size="mini" @click="goodsUpDown(scope)" :type="scope.row.usingFlag=='Y'?'success':'danger'">{{scope.row.usingFlag=='Y'?'下架':'上架'}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="goodsCode" label="编号" align="center" width="180">
              </el-table-column>
              <el-table-column prop="goodsName" label="名称" align="center" width="180">
              </el-table-column>
              <el-table-column prop="goodsPrice" label="售价" align="center" width="180">
                <!-- 修改售价 begin -->
                <template slot-scope="scope">
                  <template v-if="!scope.row.modifyPrice">
                    {{scope.row.goodsPrice}}
                    <i class="el-icon-edit" @click="openModifyPrice(scope)"></i>
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.goodsPrice" size="mini" class="input-change-price"></el-input>
                    <i class="el-icon-error" @click="closeModifyPrice(scope)"></i>
                    <i class="el-icon-success" @click="saveModifyPrice(scope)"></i>
                  </template>
                </template>
                <!-- 修改售价 end -->
              </el-table-column>
              <el-table-column prop="isChangePriceFlag" label="售价可变" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isChangePriceFlag" @change="modifyPriceFlag(scope)"></el-switch>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

      </el-col>
    </el-row>

    <!-- 添加、修改商品部 dialog -->
    <el-dialog :visible.sync="operationDept.dialogAddVisible" class="add-shop-dept">
      <template slot="title">{{operationDept.title}}</template>
      <el-form :inline="true" :model="operationDept" class="demo-form-inline">
        <el-form-item label="商品部名称：">
          <el-input v-model="operationDept.newGoodsDeptName" placeholder="请填写商品部名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="operationDept.dialogAddVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitOperation">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodsDeptAdd,
  goodsDeptList,
  goodsDeptDel,
  goodsDeptUpdate,
  goodsDeptChangeType,
  goodsDeptupdateGoods
} from "@/api/goods/goodsDeptController";
import { goodsInfolistGoodsInfoByStatus } from "@/api/goods/goodsInfoController";
import { goodsTypeTree } from "@/api/goods/goodsTypeController";
export default {
  created() {
      this.$nextTick(function () {
        this.init();
      });
  },
  methods: {
    init() {
      this.selectGoodsDeptList().then(res =>{
        this.commodityDeptList = res;
        return this.selectGoodsType();
      }).then(res => {
        this.goodsTypeList = res;
        this.commodityDeptList.forEach(element =>{
          element.goodsType = [];
          this.goodsTypeList.forEach( good => {
            var obj = {};
            obj.typeId = good.id;
            obj.typeName = good.name;
            obj.pId = good.pId;
            obj.isReg = false;
            for(var i = 0; i < element.regDeptType.length; i++) {
              if(obj.typeId == element.regDeptType[i].typePk && element.regDeptType[i].upFlag == 'Y') {
                obj.isReg = true;
              }
            }
            element.goodsType.push(obj);
          })
        })
        var item = this.commodityDeptList[0];
        this.$set(this.commodityDeptList,0,item)
      });
    },
    selectGoodsDeptList() {
      return new Promise((resolve, reject) => {
        goodsDeptList().then(res => {
          if (res.code == 1) {
            resolve(res.data);
          } else {
            reject(0);
          }
        });
      });
    },
    selectGoodsType() {
      return new Promise((resolve, reject) => {
        goodsTypeTree().then(res => {
          if (res.code == 1) {
            resolve(res.data);
          } else {
            reject(0);
          }
        });
      });
    },
    submitOperation() {
      if (
        !this.operationDept.newGoodsDeptName ||
        this.operationDept.newGoodsDeptName.replace(/\s+/g, "") == ""
      ) {
        this.$message({ type: "error", message: "请填写商品部名称！" });
        return;
      }
      if (this.operationDept.type == "add") {
        goodsDeptAdd({ deptName: this.operationDept.newGoodsDeptName }).then(
          res => {
            if (res.code == 1) {
              this.$message({
                type: "success",
                message: "成功添加" + this.operationDept.newGoodsDeptName
              });
              this.operationDept.dialogAddVisible = false;
              this.init();
            } else {
              this.$message({ type: "error", message: res.msg });
            }
          }
        );
      }
      if (this.operationDept.type == "modify") {
        goodsDeptUpdate({
          deptPk: this.operationDept.GoodsDeptPk,
          deptName: this.operationDept.newGoodsDeptName
        }).then(res => {
          if (res.code == 1) {
            this.$message({ type: "success", message: "修改成功" });
            this.operationDept.dialogAddVisible = false;
            this.init();
          } else {
            this.$message({ type: "error", message: res.msg });
          }
        });
      }
    },
    deleteDept(obj) {
      console.log(obj);
      this.$confirm("是否删除？")
        .then(_ => {
          goodsDeptDel({ deptPk: obj.deptPk }).then(res => {
            console.log(res);
            if (res.code == 1) {
              this.$message({
                type: "success",
                message: "成功删除" + obj.deptName
              });
              this.init();
            }
          });
        })
        .catch(_ => {});
    },
    operation(type, obj) {
      this.operationDept.dialogAddVisible = true;
      this.operationDept.type = type;
      if (type == "add") {
        this.operationDept.newGoodsDeptName = "";
        this.operationDept.title = "添加商品部";
        this.operationDept.GoodsDeptPk = "";
      }
      if (type == "modify") {
        this.operationDept.newGoodsDeptName = obj.deptName;
        this.operationDept.title = "修改商品部";
        this.operationDept.GoodsDeptPk = obj.deptPk;
      }
    },
    upperLower(i, j) {
      console.log({ i, j });
      var obj = this.commodityDeptList[i];
      var param = {};
      param.upFlag = this.commodityDeptList[i].goodsType[j].isReg?'N':'Y';
      param.deptPk = this.commodityDeptList[i].deptPk;
      param.typePk = this.commodityDeptList[i].goodsType[j].typeId;
      console.log(param)
      goodsDeptChangeType(param).then(res => {
        console.log(res)
        if(res.code == 1) {
          var message = this.commodityDeptList[i].goodsType[j].isReg?'下架成功':'上架成功';
          this.$message({ type: "success", message:message });
          obj.goodsType[j].isReg = !obj.goodsType[j].isReg;
          console.log(this.commodityDeptList[i]);
          this.$set(this.commodityDeptList, i, obj);
        }
      })
    },
    selectGoodsInfolist(deptPK,typePk){
      this.activeDeptPk = deptPK;
      this.activeTypePk = typePk;
      goodsInfolistGoodsInfoByStatus({deptPk:deptPK,typePk:typePk}).then(res => {
        if(res.code == 1) {
          this.goodsInfoStatusList = res.data;
          this.goodsInfoStatusList.forEach(element => {
            element.modifyPrice = false;  //自定义属性，是否启用价格修改框
            element.oldPrice = element.goodsPrice;
            element.changePriceFlag =='Y'?element.isChangePriceFlag = true:element.isChangePriceFlag = false;
          })
          console.log(this.goodsInfoStatusList)
        }
      })
    },
    openModifyPrice(scope){
      var item = this.goodsInfoStatusList[scope.$index];
      item.modifyPrice = true;
      this.$set(this.goodsInfoStatusList,scope.$index,item);
    },
    closeModifyPrice(scope){
      var item = this.goodsInfoStatusList[scope.$index];
      item.goodsPrice = item.oldPrice;
      item.modifyPrice = false;
      this.$set(this.goodsInfoStatusList,scope.$index,item);
    },
    saveModifyPrice(scope){
      var item = this.goodsInfoStatusList[scope.$index];
      console.log(item)
      var param = {};
      param.deptPk = item.deptPk;
      param.goodsPk = item.goodsPk;
      param.goodsPrice = item.goodsPrice
      goodsDeptupdateGoods(param).then(res => {
        if(res.code == 1) {
          console.log(param)
          item.oldPrice = item.goodsPrice;
          this.$message({ type: "success", message:'修改价格成功' });
          item.modifyPrice = false;
          this.$set(this.goodsInfoStatusList,scope.$index,item);
        }
      })
    },
    modifyPriceFlag(scope){
      var item = this.goodsInfoStatusList[scope.$index];
      item.isChangePriceFlag?item.changePriceFlag ='Y':item.changePriceFlag ='N';
      var param = {};
      param.deptPk = item.deptPk;
      param.goodsPk = item.goodsPk;
      param.changePriceFlag = item.changePriceFlag
      param.upFlag = item.usingFlag;
      goodsDeptupdateGoods(param).then(res => {
        if(res.code == 1) {
          this.$message({ type: "success", message:'修改成功' });
          this.$set(this.goodsInfoStatusList,scope.$index,item);
        }
      })
    },
    goodsUpDown(scope){
      var item = this.goodsInfoStatusList[scope.$index];
      item.usingFlag=='N'?item.usingFlag ='Y':item.usingFlag ='N';
      var param = {};
      param.deptPk = item.deptPk;
      param.goodsPk = item.goodsPk;
      param.upFlag = item.usingFlag;
      param.changePriceFlag = item.changePriceFlag
      goodsDeptupdateGoods(param).then(res => {
        if(res.code == 1) {
          var msg = item.usingFlag =='Y'?'已上架':'已下架';
          this.$message({ type: "success", message:msg });
          this.$set(this.goodsInfoStatusList,scope.$index,item);
        }
      })
    },
    changeSelectCondition(){
      console.log(this.goodsFilter)
      if(this.goodsFilter == 'up') {
        this.filterText = {usingFlag:'Y'}
      } else if (this.goodsFilter == 'down') {
        this.filterText = {usingFlag:'N'}
      } else {
        this.filterText = '';
      }
      
    } 

  },
  watch: {
    filterText: function (value) {},
    filterText2:function (value) {}
  },
  data() {
    return {
      commodityDeptList: [],
      dialogAddVisible: false,
      goodsTypeList: [],
      activecollapse: 0,
      operationDept: {
        dialogAddVisible: false,
        newGoodsDeptName: "",
        GoodsDeptPk: "",
        type: "",
        title: ""
      },
      goodsInfoStatusList:[],
      activeDeptPk:'',
      activeTypePk:'',
      filterText:'',
      filterText2:'',
      
     

      currTreeData: {},
      currTreeName: "",

      goodsFilter: "all",
      treeData: [
        {
          id: -1,
          name: "商品部",
          type: "root",
          children: [
            {
              id: 1,
              name: "华发前台商品",
              type: "shopDept",
              children: [
                {
                  id: 2,
                  name: "水果"
                },
                {
                  id: 3,
                  name: "饮料"
                },
                {
                  id: 4,
                  name: "布草"
                },
                {
                  id: 5,
                  name: "男孩玩具"
                }
              ]
            }
          ]
        }
      ],
      goodsTableData: [
        {
          code: "17988",
          name: "苹果",
          price: "23.6",
          isDynPrice: false,
          isEditModel: false //是否开启修改价格模式
        }
      ]
    };
  }
};
</script>
<style scoped>
.input-shopname {
  width: 200px;
}
.search-input {
  width: 220px;
}
.el-icon-edit {
  color: #409eff;
  cursor: pointer;
}
.el-icon-success {
  color: #67c23a;
  cursor: pointer;
}
.el-icon-error {
  color: #f56c6c;
  cursor: pointer;
}
.input-change-price {
  width: 77px;
}
.table-style {
  width: 90%;
  border-top: 1px solid #9e9e9e;
  margin-top: 10px;
}

.collapse-box {
  padding: 10px 30px;
}
.collapse-box .tip {
  margin-top: 0;
  padding: 12px 10px;
  color: #48c0f8;
  background: #daeff9;
}
.collapse-box .collapse-btns {
  float: right;
}
.gd_menu_item {
  margin: 3px 0 15px 46px;
  border-left: 1px solid #48c0f8;
  padding-bottom: 12px;
  display: block;
}
.gd_second_menu {
  padding-left: 0;
}
.gd_second_menu li {
  position: relative;
}
.gd_menu_item_line {
  height: 25px;
  position: absolute;
  left: 3px;
  top: 0px;
  width: 29px;
  border-bottom: 1px solid #48c0f8;
}
.gd_menu_content {
  margin-left: 38px;
  line-height: 52px;
  height: 52px;
  border-bottom: 1px solid #d2d2d2;
  position: relative;
}
ul {
  list-style: none;
}
</style>

<style>
.collapse-box .el-collapse-item__header {
  background-color: #48c0f8;
  color: #fff;
  padding-left: 20px;
}

.goords-manager00002 .add-shop-dept .el-dialog {
  width: 32%;
}
.goords-manager00002 .custom-tree-root {
  padding-left: 30px;
}
.goords-manager00002 .custom-tree-node {
  display: none;
  padding-left: 30px;
}
.goords-manager00002 .el-tree-node__content:hover .custom-tree-node {
  display: inline !important;
}
</style>