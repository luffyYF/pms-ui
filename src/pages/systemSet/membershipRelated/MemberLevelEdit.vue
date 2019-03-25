// 会员规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="1000px"
             :close-on-click-modal="false" :before-close="handleClose">
        <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        height="500px"
        style="width: 98%; margin:10px;">
        <el-table-column label="房型" prop="roomTypeName" width="150"  align="center">
        </el-table-column>
        <el-table-column label="全价" prop="price" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-input-number size="mini" style="width:100%;" :precision="0" :step="1" :min="0" :controls="false" v-model="scope.row.price" ></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="起步价" prop="beginPrice" align="center">
             <template slot-scope="scope">
                <el-input-number size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :controls="false" v-model="scope.row.beginPrice" ></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="单位时间加收价" width="150" prop="unitPrice" align="center">
            <template slot-scope="scope">
                <el-input-number size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :controls="false" v-model="scope.row.unitPrice" ></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="加收封顶价" prop="cappingPrice" align="center">
            <template slot-scope="scope">
                <el-input-number size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :controls="false" v-model="scope.row.cappingPrice" ></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="预收房费" prop="roomPrice" align="center">
            <template slot-scope="scope">
                <el-input-number size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :controls="false" v-model="scope.row.roomPrice" ></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="早餐券数" prop="numberOfBreakfast" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-input-number size="mini" style="width:100%;" :precision="0" :step="1" :min="0" :controls="false" v-model="scope.row.numberOfBreakfast" ></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="备注" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-input size="mini" style="width:100%;" v-model="scope.row.remark" type="text"/>
            </template>
        </el-table-column>
      </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>  
import {peiceList,priceSetting} from '@/api/systemSet/member/pmsMemberGradeController'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {

        },
        title:"会员价格设置",
        currentDtoIndex:null,
        pageObj:{
            enableFlag:"",
            total:0,
            pageNum:1,
            pageSize:10
        },
        tableData:[],
        multipleSelection:[]
      }
    },
    methods: {
      showDialog (row) {
        this.dialogVisible = true
        this.peiceList(row)
      },
      peiceList(row){
        const self = this
        this.loading = true
        peiceList({gradePk:row.gradePk}).then(result => {
            self.tableData = result.data
            this.loading = false
        }).catch(() => {
            this.loading = false
        }).finally(()=>{
            this.loading = false
        })
      },
      saveData(){ 
        priceSetting(this.tableData).then(res => {
            this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
            if(res.code == 1){
                this.dialogVisible = false
            }
        }).catch(() => {
        }).finally(()=>{
        })
      },
      handleClose () {
        this.dialogVisible = false
      },
    }
  }
</script>
