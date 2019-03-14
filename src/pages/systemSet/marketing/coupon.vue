// 会员积分换房规则
<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-col :span="24" class="book-info">
        <el-form ref="pageObj" size="mini" :model="pageObj" label-width="110px">
          <el-row class="info-li">
            <el-col :span="6">
              <el-form-item label="是否启用" prop="ruleName">
                  <el-select size="mini" style="width:100%;" v-model="pageObj.enableFlag" placeholder="状态" clearable >
                      <el-option v-for="y in enableFlagList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" v-if="queryPower" @click="listCoupon()">查询</el-button>
                <el-button type="primary" size="mini" class="add-pro" v-if="hasPerm('pms:coupon:add')" @click="addClick()">添加规则</el-button>
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
        <el-table-column prop="couponName" label="优惠券名称" align="center">
        </el-table-column>
        <!-- <el-table-column label="活动会员类型" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
                <span v-if="scope.row.type == 1 ">
                  <span v-for="(obj,index) in scope.row.gradePks" :key="index">|{{gradeObj[obj]}}</span>
                </span>
                <div v-else>
                  全部会员                  
                </div>
            </template>
        </el-table-column> -->
        <el-table-column label="优惠券类型" prop="type"  align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.type == 'Y' ">代金券</span>
                <span v-else>房券</span>
            </template>
        </el-table-column>
        <el-table-column label="优惠券属性" prop="property" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <span v-if="scope.row.property == 'Y' ">电子券</span>
                <span v-else>纸质券</span>
            </template>
        </el-table-column>
        <el-table-column label="价值" prop="value" align="center">
        </el-table-column>
        <el-table-column label="总数量" prop="amount" align="center">
        </el-table-column>
        <el-table-column label="已发放数量" prop="useAmount" align="center">
        </el-table-column>
        <el-table-column label="核销数量" prop="writeOffAmout" align="center">
        </el-table-column>
        <!-- <el-table-column label="有效星期" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <span v-for="(obj,index) in scope.row.week" :key="index">|{{weekObj[obj]}}</span>
            </template>
        </el-table-column> -->
        <el-table-column label="是否启用" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.enableFlag == 'Y' ">启用</span>
                <span v-else>禁用</span>
            </template>
        </el-table-column>
        <el-table-column label="有效日期" align="center" width="220" show-overflow-tooltip>
            <template slot-scope="scope">
                <span v-if="scope.row.effectiveDateType == 0 || scope.row.effectiveDateType == '0'">{{scope.row.beginDate}}至{{scope.row.endDate}}</span>
                <span v-else>从发券第{{scope.row.beginNum}}天到第{{scope.row.endNum}}天</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250" fixed="right">
            <template slot-scope="scope">
                <el-button type="primary" v-if="hasPerm('pms:coupon:update') && (scope.row.useAmount == 0 || scope.row.useAmount == null)" @click="editClick(scope.row)" 
                        size="mini">编辑
                </el-button>
                <el-button type="primary" v-if="hasPerm('pms:coupon:detail') && scope.row.useAmount > 0" @click="editClick(scope.row)" 
                        size="mini">
                        查看
                </el-button>
                <el-button type="primary" v-if="hasPerm('pms:coupon:editEnableFlag') && scope.row.enableFlag == 'N'" @click="editEnableFlagClick(scope.row.couponPk,'Y')" 
                        size="mini">启用
                </el-button>
                <el-button type="danger" v-if="hasPerm('pms:coupon:editEnableFlag') && scope.row.enableFlag == 'Y'" @click="editEnableFlagClick(scope.row.couponPk,'N')" 
                        size="mini">禁用
                </el-button>
                
                <el-button type="danger" v-if="hasPerm('pms:coupon:delete') && (scope.row.useAmount == 0 || scope.row.useAmount == null)" @click="deleteClick(scope.row.couponPk)"
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
    <couponEdit ref="couponEditRef" @callback="listCoupon"/>
  </div>
</template>

<script>
  import {listCoupon,editEnableFlag,deleteCoupon } from '@/api/systemSet/marketing/coupon'
  import couponEdit from './couponEdit'
  export default {
   components: { couponEdit },
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
        weekObj:{
          "1":"星期一",
          "2":"星期二",
          "3":"星期三",
          "4":"星期四",
          "5":"星期五",
          "6":"星期六",
          "7":"星期天",
        },
        gradeObj:{

        },
        enableFlagList:[
          {label:"全部",value:""},
          {label:"启用",value:"Y"},
          {label:"禁用",value:"N"}
        ],
        queryPower:this.hasPerm("")
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init() {
        this.listCoupon()
        // this.listGrade()
      },
      listCoupon(){
        if(!this.queryPower){
          this.$message({ type: 'warning', message: "权限不足" })
          return
        }
        self.loading = true
        listCoupon(this.pageObj).then(result => {
            var data = result.data.data;
            // for(var i=0;i<data.length;i++){
            //   if(data[i].effectiveWeek){
            //     data[i].week = data[i].effectiveWeek.split(",")
            //   }
            // }
            this.tableData = data
            this.pageObj.total = result.data.total
            self.loading = false
        }).catch(() => {
          self.loading = false
        }).finally(()=>{
          self.loading = false
        })
      },
      addClick(){
        this.$refs.couponEditRef.showDialog()
      },
      editClick(row){
        var temoObj = JSON.parse(JSON.stringify(row))
        temoObj.writeOffScopes = temoObj.writeOffScope != null ?temoObj.writeOffScope.split(","):[]
        temoObj.week = temoObj.effectiveWeek != null ?temoObj.effectiveWeek.split(","):[]
        temoObj.checkInTypes = temoObj.checkInType != null ?temoObj.checkInType.split(","):[]
        this.$refs.couponEditRef.showDialog(temoObj)
      },
      editEnableFlagClick(pk,enableFlag){
        this.$confirm('确定'+(enableFlag == "Y"?'启用':'禁用')+'此优惠券?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          editEnableFlag({couponPk:pk,enableFlag:enableFlag}).then(res => {
                if(res.code == 1){
                    this.listCoupon()
                }
                this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
          })
        })
      },
      deleteClick (id) {
        this.$confirm('确定删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCoupon(id).then(res => {
              if(res.code == 1){
                  this.listCoupon()
              }
            this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
          })
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.pageObj.pageSize = val
        this.listCoupon()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.pageObj.pageNum = val
        this.listCoupon()
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
