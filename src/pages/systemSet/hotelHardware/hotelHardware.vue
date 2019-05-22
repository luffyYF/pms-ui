// 会员积分换房规则
<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-col :span="24" class="book-info">
        <el-form ref="pageObj" size="mini" :model="pageObj" label-width="110px">
          <el-row class="info-li">
            <el-col :span="8">
                <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" v-if="queryPower" @click="listHardware()">查询</el-button>
                <el-button type="primary" size="mini" class="add-pro" v-if="hasPerm('pms:hardwareInfo:add')" @click="addClick()">添加硬件</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        

        <el-table-column label="类型" prop="type"  align="center">
            <template slot-scope="scope">
                {{typeObj[scope.row.type]}}
            </template>
        </el-table-column>
        <el-table-column prop="brand" label="品牌" align="center">
          <template slot-scope="scope">
            {{HOTEL_HARDWARE[scope.row.brand]}}
          </template>
        </el-table-column>
        <el-table-column prop="model" label="型号" align="center">
        </el-table-column>
        <el-table-column prop="version" label="版本" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
     
        <el-table-column label="操作" align="center" width="250" fixed="right">
            <template slot-scope="scope">
                <el-button type="primary" v-if="hasPerm('pms:hardwareInfo:update') " @click="editClick(scope.row)" 
                        size="mini">编辑
                </el-button>
                
                <el-button type="danger" v-if="hasPerm('pms:hardwareInfo:delete') " @click="deleteClick(scope.row.couponPk)"
                    size="mini">删除
                </el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin: 10px 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageObj.pageNum"
          :page-sizes="[10, 20, 30, 40]" 
          :page-size="pageObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageObj.total">
        </el-pagination>
    </div>
    <hardwareEdit ref="hardwareEditRef" @callback="listHardware"/>
  </div>
</template>

<script>
  import {addApi,updateApi,listApi,deleteApi } from '@/api/systemSet/hotelHardware/hotelHardware'
  import hardwareEdit from './hardwareEdit'
  export default {
   components: { hardwareEdit },
    data() {
      return {
        options:[],
        tableData: [],
        gradeList:[],
        loading:false,
        pageObj:{
            enableFlag:"",
            total:0,
            pageNum:1,
            pageSize:10
        },
        gradeObj:{

        },
        typeObj:{
            0:"门卡",
            1:"公安",
            2:"身份证阅读器",
            3:"会员卡阅读器",
        },
        codeObj:this.HOTEL_HARDWARE,
        queryPower:this.hasPerm("pms:hardwareInfo:list"),
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init() {
        this.listHardware()
      },
      listHardware(){
        if(!this.queryPower){
          this.$message({ type: 'warning', message: "权限不足" })
          return
        }
        this.loading = true
        listApi(this.pageObj).then(result => {
            var data = result.list;
            this.tableData = data
            this.pageObj.total = parseInt(result.total)
        }).catch(() => {
        }).finally(()=>{
          this.loading = false
        })
      },
      addClick(){
        this.$refs.hardwareEditRef.showDialog()
      },
      editClick(row){
        var temoObj = JSON.parse(JSON.stringify(row))
        this.$refs.hardwareEditRef.showDialog(temoObj)
      },
      deleteClick (id) {
        this.$confirm('确定删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCoupon(id).then(res => {
              if(res.code == 1){
                  this.listHardware()
              }
            this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
          })
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.pageObj.pageSize = val
        this.listHardware()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.pageObj.pageNum = val
        this.listHardware()
      },
    }
  }
</script> 

<style scoped>
.checked{
  margin-bottom: 5px;
}
.el-input{
  width: 60px;
}
.el-input.claName{
  width: 90px;
}
.el-date-editor--time{
  width: 120px;
}
.el-Name{
  width: 120px;
}
.el-radio+.el-radio{
  margin-left: 0;
}
.el-radio .el-radio__label {
  padding-left: 3px;
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
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.span{
  margin-right: 5px;
}
</style>
