// 会员规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="800px"
             :close-on-click-modal="false" :before-close="handleClose">
        <el-form ref="pageObj" size="mini" :model="pageObj" label-width="110px">
            <el-form-item label="优惠券名称" prop="couponName">
                <el-input size="mini" style="width:200px;" v-model="pageObj.couponName" type="text"/>
                <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" @click="couponList()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
        size="mini" 
        ref="tableRefs"
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        @selection-change="handleSelectionChange"
        height="500px"
        style="width: 98%; margin:10px;">
        <el-table-column
        type="selection"
        width="40">
        </el-table-column>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {couponList} from '@/api/systemSet/marketing/coupon'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {

        },
        title:"优惠券选择",
        currentDtoIndex:null,
        pageObj:{
            enableFlag:"",
            total:0,
            pageNum:1,
            pageSize:10,
            detailPk: null,
        },
        tableData:[],
        multipleSelection:[],
        couponPos: [],
      }
    },
    methods: {
        
      showDialog (id, pos) {
        console.log(id)
        console.log(pos)
        this.pageObj.detailPk = id
        this.couponPos = []
        if (pos != undefined) {
          this.couponPos = pos
        }
        this.dialogVisible = true
        this.couponList()
      },
      couponList(){
        const self = this
        couponList(this.pageObj).then(result => {
            self.tableData = result.data.data
            self.pageObj.total = result.data.total
            self.$nextTick(() => {
              result.data.detailPos.forEach(item => {
                result.data.data.forEach(element => {
                  if (item.couponPk == element.couponPk) {
                    self.$refs.tableRefs.toggleRowSelection(element);
                  }
                });
              });
              self.couponPos.forEach(item => {
                result.data.data.forEach(element => {
                  if (item.pk == element.couponPk) {
                    self.$refs.tableRefs.toggleRowSelection(element, item.status);
                  }
                });
              });
            })
        }).catch(() => {

        }).finally(()=>{
        })
      },
      saveData(){
          var couponPos = [];
          var couponPks = [];
          for(var i=0;i<this.multipleSelection.length;i++){
            couponPos.push({pk: this.multipleSelection[i].couponPk, status: this.multipleSelection[i].status})
            couponPks.push(this.multipleSelection[i].couponPk)
          }
          let data = {
            couponPos: couponPos,
            couponPks: couponPks
          }
          this.$emit('callback',data)
          this.dialogVisible = false
      },
      handleSelectionChange(val) {
        if (val.length > 0) {
          this.tableData.forEach(row => {
            row.status = false
            val.forEach(item => {
              if (row.couponPk == item.couponPk) {
                row.status = true
              }
            })
          });

          this.tableData.forEach(row => {
            let num = 0
            this.multipleSelection.forEach(item => {
              if (row.couponPk == item.couponPk) {
                item.status = row.status
                num++;
              }
            });
            if (num == 0) {
              this.multipleSelection.push(row)
            }
          });
        } else {
          this.tableData.forEach(row => {
            row.status =false
            let num = 0
            this.multipleSelection.forEach(item => {
              if (row.couponPk == item.couponPk) {
                item.status = row.status
                num++;
              }
            });
            if (num == 0) {
              this.multipleSelection.push(row)
            }
          });
        }
        console.log(val)
        console.log(this.multipleSelection)
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 分页相关
      handleSizeChange (val) {
        this.pageObj.pageSize = val
        this.couponList()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.pageObj.pageNum = val
        this.couponList()
      },
    }
  }
</script>
