
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="800px"
             :close-on-click-modal="false" :before-close="handleClose">
        <el-form ref="pageObj" size="mini" :model="pageObj" label-width="110px">
            <el-form-item label="礼品名称" prop="goodsName">
                <el-input size="mini" style="width:200px;" v-model="pageObj.couponName" type="text"/>
                <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" @click="listGridIntegralGoods()">查询</el-button>
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
        <el-table-column label="礼品名称" prop="goodsName" align="center">
        </el-table-column>
        <el-table-column label="礼品编码" prop="code" align="center">
        </el-table-column>
        <el-table-column label="类型" prop="amount" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.goodsType == 'COMM'">普通物品</span>
            <span v-else-if="scope.row.goodsType == 'CASH'">现金</span>
            <span v-else>客房</span>
          </template>
        </el-table-column>
        <el-table-column label="所需积分" prop="integral" align="center">
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

  import {listGridIntegralGoods} from '@/api/systemSet/member/pmsIntegralGoodsController'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {

        },
        title:"礼品选择",
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
        giftPos: [],
      }
    },
    methods: {
        
      showDialog (id, pos) {
        console.log(id)
        console.log(pos)
        this.pageObj.detailPk = id
        this.giftPos = []
        if (pos != undefined) {
          this.giftPos = pos
        }
        this.dialogVisible = true
        this.listGridIntegralGoods()
      },
      listGridIntegralGoods(){
        const self = this
        listGridIntegralGoods(this.pageObj).then(result => {
            self.tableData = result.data.data
            self.pageObj.total = result.data.total
            self.$nextTick(() => {
              result.data.detailPos.forEach(item => {
                result.data.data.forEach(element => {
                  if (item.giftPk == element.goodsPk) {
                    self.$refs.tableRefs.toggleRowSelection(element);
                  }
                });
              });
              self.giftPos.forEach(item => {
                result.data.data.forEach(element => {
                  if (item.pk == element.goodsPk) {
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
          var giftPos = [];
          var giftPks = [];
          for(var i=0;i<this.multipleSelection.length;i++){
            giftPos.push({pk: this.multipleSelection[i].goodsPk, status: this.multipleSelection[i].status})
            giftPks.push(this.multipleSelection[i].goodsPk)
          }
          let data = {
            giftPos: giftPos,
            giftPks: giftPks
          }
          this.$emit('callback',data)
          this.dialogVisible = false
      },
      handleSelectionChange(val) {
        if (val.length > 0) {
          this.tableData.forEach(row => {
            row.status = false
            val.forEach(item => {
              if (row.goodsPk == item.goodsPk) {
                row.status = true
              }
            })
          });

          this.tableData.forEach(row => {
            let num = 0
            this.multipleSelection.forEach(item => {
              if (row.goodsPk == item.goodsPk) {
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
              if (row.goodsPk == item.goodsPk) {
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
        this.listGridIntegralGoods()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.pageObj.pageNum = val
        this.listGridIntegralGoods()
      },
    }
  }
</script>
