// 会员积分换房规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
<div>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="规则名称" prop="ruleName">
            <el-input size="mini" style="width:100%;" v-model="dataForm.ruleName" type="text"/>
        </el-form-item>
        <el-form-item label="有效时间" prop="datepicker">
            <el-date-picker style="width:100%;" v-model="dataForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <el-select size="mini" style="width:100%;" @change="typeChange()" v-model="dataForm.type" placeholder="类型" :clearable="false" >
                <el-option v-for="y in typeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="礼品名称" prop="giftName">
            <el-input size="mini" style="width:80%;" :disabled="true" v-model="dataForm.giftName" type="text"/>
            <el-button type="primary" size="mini" @click="changeGiftClick()" :loading="loading">选择</el-button>
        </el-form-item>
        <el-form-item label="所需积分" prop="integral">
            <el-input-number size="mini" style="width:100%;" :precision="0" :step="1" :min="0" :controls="false" v-model="dataForm.integral" ></el-input-number>
        </el-form-item>
        <el-form-item label="会员类型" prop="gradePks">
            <el-checkbox-group :min="1" v-model="dataForm.gradePks">
                <el-checkbox v-for="obj in gradeList" :label="obj.gradePk" :key="obj.gradePk">{{obj.gradeName}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>

    <el-dialog class="add-permission" title="选择优惠券" top="100px" :visible.sync="couponDialogVisible" width="500px"
                :close-on-click-modal="false" :before-close="handleCouponClose">
            <el-form ref="pageObj" size="mini" :model="pageObj" label-width="110px">
                <el-form-item label="优惠券名称" prop="couponName">
                    <el-input size="mini" style="width:200px;" v-model="pageObj.couponName" type="text"/>
                    <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" @click="couponList()">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
            size="mini" 
            border 
            highlight-current-row
            :data="couponData" 
            v-loading="loading"
            @row-dblclick="changeCoupon"
            height="400px"
            >
            <el-table-column label="优惠券名称" prop="couponName"  align="center">
            </el-table-column>
            <el-table-column label="价值" prop="value" align="center">
            </el-table-column>
            <el-table-column label="总数量" prop="amount" align="center">
            </el-table-column>
            <el-table-column label="已发放数量" prop="useAmount" align="center">
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
        <el-button @click="couponDialogVisible = false" size="mini">取 消</el-button>
        <!-- <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button> -->
        </span>
        <span style="color:red;">注:双击选中</span>
    </el-dialog>


    <el-dialog class="add-permission" title="选择礼品" top="100px" :visible.sync="giftDialogVisible" width="500px"
                :close-on-click-modal="false" :before-close="handleGiftClose">
            <el-form ref="pageObj" size="mini" :model="pageObj" label-width="110px">
                <el-form-item label="商品名称" prop="goodsName">
                    <el-input size="mini" style="width:200px;" v-model="pageObj.goodsName" type="text"/>
                    <el-button type="primary" size="mini" icon="el-icon-search" class="add-pro" @click="listGridIntegralGoods()">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
            size="mini" 
            border 
            highlight-current-row
            :data="goodsData" 
            v-loading="loading"
            @row-dblclick="changeGift"
            height="400px"
            >
            <el-table-column label="商品名称" prop="goodsName"  align="center">
            </el-table-column>
            <el-table-column label="商品编码" prop="goodsCode" align="center">
            </el-table-column>
            <el-table-column label="价值/积分" prop="integral" align="center">
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin: 10px 20px;"
            @size-change="giftHandleSizeChange"
            @current-change="giftHandleCurrentChange"
            :current-page="pageObj.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageObj.total">
            </el-pagination>
        <span slot="footer" class="dialog-footer">
        <el-button @click="giftDialogVisible = false" size="mini">取 消</el-button>
        <!-- <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button> -->
        </span>
        <span style="color:red;">注:双击选中</span>
    </el-dialog>
  </div>
</template>

<script>
  import Moment from 'moment'
  import {listGrade,addRule,updateRule} from '@/api/systemSet/member/pmsIntegralExchangeRule'
  import {listGridIntegralGoods} from '@/api/systemSet/member/pmsIntegralGoodsController'
  import {couponList} from '@/api/systemSet/marketing/coupon'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
            enableFlag:"Y",
            type:0,
            integral:0,
            gradePks:[],
            datepicker:[]
        },
        rules: {
          ruleName: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
          type: [{ required: true, message: '请填写类型', trigger: 'change' }],
          gradePks: [{ required: true, message: '请选择会员卡类型', trigger: 'change' }],
          datepicker:  [{ required: true, message: '请选择活动日期', trigger: 'change' }],
          giftName:  [{ required: true, message: '请选择兑换礼品', trigger: 'blur' }],
          
        },
        title:"添加规则",
        gradeList:[],
        typeList:[
            {label:"礼品",value:0},
            {label:"优惠券",value:1}
        ],
        pageObj:{
            total:0,
            pageNum:1,
            pageSize:10
        },
        couponData:[

        ],
        giftDialogVisible:false,
        couponDialogVisible:false,
        goodsData:[]
      }
    },
    methods: {
        typeChange(){
            // this.$set(dataForm,"giftPk","")
            // this.$set(dataForm,"giftName","")
            this.dataForm.giftPk = ""
            this.dataForm.giftName = ""
        },
        changeGiftClick(){
            this.pageObj.pageNum = 1
            this.pageObj.total = 0
            if(this.dataForm.type == 0 || this.dataForm.type == '0'){
                this.giftDialogVisible = true
                this.listGridIntegralGoods()
            }else if(this.dataForm.type == 1 || this.dataForm.type == '1'){
                this.couponList()
                this.couponDialogVisible = true
            }
        },
      listGrade(row){
        const self = this
        listGrade().then(result => {
            self.gradeList = result.data
        }).catch(() => {

        }).finally(()=>{
        })
      },
      showDialog (row) {
        this.dialogVisible = true
        this.listGrade(row)
        if (row) {
            row.datepicker = []
            row.datepicker[0] = row.beginDate,
            row.datepicker[1] = row.endDate
            this.title = "修改规则"
            this.dataForm = row
        }else{
          this.title = "添加规则"
          this.dataForm = {
            enableFlag:"Y",
            type:0,
            integral:0,
            gradePks:[],
            giftPk:"",
            giftName:""
          }
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      handleCouponClose(){
          this.couponDialogVisible = false
      },
      handleGiftClose(){
          this.giftDialogVisible = false
      },
      // 保存数据
      saveData () {
        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            this.dataForm.beginDate = this.dataForm.datepicker[0]
            this.dataForm.endDate = this.dataForm.datepicker[1]
            this.loading = true
            let api
            if (this.dataForm.rulePk) {
              api = updateRule(this.dataForm)
            } else {
              api = addRule(this.dataForm)
            }
            api.then(res => {
                if(res.code == 1){
                    this.$message({ type: 'success', message: res.sub_msg })
                    this.dialogVisible = false
                    this.$emit('callback')
                }else{
                    this.$message({ type: 'warning', message: res.sub_msg })
                }
            }).finally(() => {
              this.loading = false
            })
          }
        })
      },
      couponList(){
        const self = this
        couponList(this.pageObj).then(result => {
            self.couponData = result.data.data
            self.pageObj.total = result.data.total
        }).catch(() => {

        }).finally(()=>{
        })
      },
      listGridIntegralGoods(){
        const self = this
        listGridIntegralGoods(this.pageObj).then(result => {
            self.goodsData = result.data.data
            self.pageObj.total = result.data.total
        }).catch(() => {
        }).finally(()=>{
        })
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
      },//选中协议单位,
      // 分页相关
      giftHandleSizeChange (val) {
        this.pageObj.pageSize = val
        this.listGridIntegralGoods()
      },
      // 分页相关
      giftHandleCurrentChange (val) {
        this.pageObj.pageNum = val
        this.listGridIntegralGoods()
      },
    changeGift(row, event) {
        this.giftDialogVisible = false;
        this.dataForm.giftName = row.goodsName
        this.dataForm.giftPk = row.goodsPk
    },
    changeCoupon(row, event) {
        this.couponDialogVisible = false;
        this.dataForm.giftName = row.couponName
        this.dataForm.giftPk = row.couponPk
    }
    }
  }
</script>
