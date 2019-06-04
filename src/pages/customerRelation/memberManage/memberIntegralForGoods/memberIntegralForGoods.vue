// 会员积分明细编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <div class="member-dialog">
		<el-dialog class="add-permission" title="积分兑换" :center="true" :visible.sync="dialogVisible" width="900px"
							:close-on-click-modal="false" :before-close="handleClose">
            <el-form ref="dataForm" size="mini" :model="memberInfo" label-width="80px">

                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="会员卡号" prop="cardNumber">
                    <el-input size="small" disabled v-model="memberInfo.cardNumber" type="text"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="btn-right">
                      <el-form-item label="会员姓名" prop="memName">
                      <el-input size="small" disabled v-model="memberInfo.memName" type="text"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="会员类型" prop="gradeName">
                  <el-input size="small" disabled v-model="memberInfo.gradeName" type="text"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="btn-right">
                    <el-form-item label="剩余积分" prop="availableIntegral">
                    <el-input size="small" disabled v-model="memberInfo.availableIntegral" type="text"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="11">
                    <el-table
                        :data="tableData"
                        ref="multipleTable"
                         @selection-change="handleSelectionChange"
                        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        border
                        style="width: 100%"
                        highlight-current-row
                        height="250">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                        <el-table-column
                          fixed
                          prop="giftName"
                          label="礼品名称"
                          width="250">
                        </el-table-column>
                        <el-table-column
                          prop="integral"
                          label="所需积分"
                          width="120">
                        </el-table-column>
                   </el-table>

                </el-col>
                <el-col :span="2" >
                    <el-button type="success" size="mini" @click="addGoods()" icon="el-icon-arrow-right" class="btn-center">添加</el-button>
                </el-col>

                <el-col :span="11" class="btn-right">
                    <el-table
                        :data="tableData2"
                        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        style="width: 100%"
                        border
                        highlight-current-row
                        height="250">
                        <el-table-column
                          fixed
                          prop="giftName"
                          label="礼品名称"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="integral"
                          label="所需积分"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          label="兑换数量"
                          width="100">
                           <el-input-number v-model="forNum" size="mini"   :controls="false" :min="1"  label="请输入兑换数量"></el-input-number>
                        </el-table-column>
                        <el-table-column
                          prop="province"
                          label="操作"
                          width="100">
                          <el-button type="primary" size="mini">移除</el-button>
                        </el-table-column>
                   </el-table>
                </el-col>
              </el-row>
            </el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="getAddress()" size="mini">确 定</el-button>
			</span>

      <!-- <el-dialog title="定位" :visible.sync="dialogVisible2" :before-close="handleClose2" width="800px">
      <AmapLocalize ref="amapRef"></AmapLocalize>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose2">取 消</el-button>
        <el-button type="primary" @click="getAddress()">确 定</el-button>
      </div>
    </el-dialog> -->
		</el-dialog>
  </div>
</template>

<script>
import {listByMemberGrade } from '@/api/systemSet/member/pmsMemberIntegralRoomChangeRule'
import {getBookableCount,listMemberIntegralExchange} from '@/api/atrialCenter/roomForwardStatus'

//import {listMemberIntegralExchange} from '@/api/PmsMemberIntegralExchangeApi/listMemberIntegralExchange'

import Moment from 'moment'
  export default {
    components:{},
    data () {
      return {
        dialogVisible: false,
        memberInfo:{},
        listQuery:{
            now:Moment().format("YYYY-MM-DD HH:mm:ss"),
            gradePk:""
        },
        //  tableData: [{
        //   giftName: '',
        //   integral: '',
        //   province: '上海',
        //  }],
         tableData:{},
         tableData2:{},
         forNum:1,
         ids:[],
         multipleSelection: [],
        dataForm:{
            now:"",
            days:1,
            num:1,
            price:0,
            rulePk:"",
            ruleName:"",
            roomTypePk:"",
            roomTypeName:"",
            availableIntegral:0,
            memName:"",
            cardNumber:"",
            integral:0,
            total:0
        },
        list:[],

        ruleObj:{

        }
      }
    },
    created(){
      this.listMemberIntegralExchange();
    },
    methods: {
        ruleChange(val){
            if(val){
                let obj = this.ruleObj[val]
                this.dataForm.ruleName = obj.ruleName
                this.dataForm.roomTypePk = obj.roomTypePk
                this.dataForm.roomTypeName = obj.roomTypeName
                this.dataForm.integral = obj.integral

                this.listMemberIntegralExchange();
                this.getBookableCount()

            }else{
                this.dataForm.ruleName = ""
            }
        },


         //获取下拉列表选中的id
       handleSelectionChange(val) {
        this.multipleSelection = val;
        let machIds = []
        this.multipleSelection.map((item)=> {
        machIds.push(item.rulePk)
        })
        this.ids = machIds;
        alert(this.ids)
      },
      //添加兑换商品
        addGoods(){
          let rulePks = [];
          rulePks = this.ids;
          alert(rulePks)
           for(var i=0;i<this.tableData.length;i++){
              for(var j=0;j<=rulePks.length;j++){
                if(rulePks[j]==this.tableData[i].rulePk){
                  console.log("Pk"+this.tableData[i].rulePk);
                 // this.tableData2=JSON.stringify(this.tableData[i]);
                 this.tableData2 =this.tableData;
                }
              }
           }
           console.log(this.tableData2);
        },
        showDialog(memberInfo) {
            this.memberInfo = memberInfo
            this.listQuery.gradePk = memberInfo.gradePk
            this.listQuery.availableIntegral = memberInfo.availableIntegral
            this.dialogVisible = true
            this.listMemberIntegralExchange();
            this.listByMemberGrade()
        },
        //获取今日可兑换礼品的列表
        listMemberIntegralExchange(){

            listMemberIntegralExchange({integral:this.listQuery.availableIntegral}).then(res =>{
                this.tableData = res.data;
            })
        },
        listByMemberGrade(){
            listByMemberGrade(this.listQuery).then(res=>{
                this.list = res.data
                this.dataForm.gradePk =this.listQuery.gradePk
                this.dataForm.now = this.listQuery.now
                this.ruleObj = {}
                for(var i=0;i<this.list.length;i++){
                    this.ruleObj[this.list[i].rulePk] = this.list[i]

                }
            })
        },
        handleClose () {
            this.dialogVisible = false
            this.$emit('callback')
        },
        getBookableCount(){
            let data={
                roomTypePk: this.dataForm.roomTypePk,
                beginDate: Moment(new Date(this.dataForm.now)).format("YYYY-MM-DD"),
                endDate: Moment(new Date(this.dataForm.now)).add("days",1).format("YYYY-MM-DD")
            }
            getBookableCount(data).then(res=>{
                this.dataForm.total = res.data
            })
        },
    }
  }
</script>

<style scoped>
    .bg-reserve {
        position: relative;
        /* background: #f7f7f7; */
        border: 1px solid #ccc;
        padding-top: 18px;
        width:90%;
        margin: 10px auto;
        /* margin-top: 10px; */
    }
    .info-title {
        position: absolute;
        z-index: 1;
        top: -6px;
        display: inline-block;
        margin: 0;
        margin-left: 155px;
        background: #f7f7f7;
    }
</style>

