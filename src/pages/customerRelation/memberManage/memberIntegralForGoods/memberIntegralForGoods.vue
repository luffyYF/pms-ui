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
                <el-col :span="2" style="margin-left:-18px;margin-top:80px" >
                    <el-button type="success" size="mini" @click="addGoods()" icon="el-icon-arrow-right" class="btn-center">添加</el-button>
                </el-col>

                <el-col :span="11" class="btn-right">
                    <el-table
                        :data="tableData2"
                        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        style="width: 100%"
                        border
                        highlight-current-row
                        height="200">
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
                          <!-- <template slot-scope="scope">
                            <el-input-number v-model="scope.row.integralNumber" size="mini" :min="1" :controls="false"></el-input-number>
                          </template> -->
                            <el-input-number v-model="integralNumber" size="mini" @change="handlerPageNo"   :controls="false" :min="1"  label="请输入兑换数量"></el-input-number>
                        </el-table-column>
                        <el-table-column
                          prop="province"
                          label="操作"
                          width="100">
                          <template slot-scope="scope">
                          <el-button type="primary" @click="deleteRow(scope.$index, tableData2)" size="mini">移除</el-button>
                          </template>
                        </el-table-column>
                   </el-table>

                   <el-form-item label="总计:" style="margin-left:-10px">
                       <!-- <el-input size="small" disabled v-model="userIntegral"  type="text"/> -->
                       <el-tag v-model="userIntegral"  size="small">{{userIntegral}}</el-tag>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addClick()" size="mini">确 定</el-button>
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
import {getBookableCount,listMemberIntegralExchange,saveIntegralExchangeForGoods} from '@/api/atrialCenter/roomForwardStatus'

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
         tableData:[],
         tableData2:[],
         ids:[],
         integralNumber:1,
         multipleSelection: [],
         userIntegral:0,

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
    // created(){

    //   this.listMemberIntegralExchange();
    // },
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
        //删除行
        deleteRow(index, rows) {
                rows.splice(index, 1);
                let sum=0;
                  for(var a=0;a<this.tableData2.length;a++){
                    sum+= this.tableData2[a].integral*Number(this.integralNumber);
                  }
                  this.userIntegral = sum;
              },


         //获取下拉列表选中的id
       handleSelectionChange(val) {
        this.multipleSelection = val;
        // let machIds = []
        // this.multipleSelection =val
        // this.ids = machIds;
      },

      //添加兑换商品
        addGoods(){
          if(this.multipleSelection==''){
            this.$message({ type: 'warning',message:'未选择兑换商品'})
          }
          let multipleSelection = this.multipleSelection;
          let m = this.tableData2.length;
           for(var i=0;i<multipleSelection.length;i++){

              let flag = true;
              for(var j=0;j<m;j++){
                console.log("左边"+multipleSelection[j].rulePk);
                console.log(this.tableData2[i].rulePk);
                if(multipleSelection[j].rulePk == this.tableData2[i].rulePk){
                  flag=false
                  break;
                }
              }
              if(flag){
                this.tableData2.push(JSON.parse(JSON.stringify(multipleSelection[i])))
              }
           }
            let sum = 0;
           for(var a=0;a<this.tableData2.length;a++){
            sum+= this.tableData2[a].integral*Number(this.integralNumber);
           }
           this.userIntegral = sum;
           console.log(this.userIntegral);
           console.log(this.tableData2);
        },

         handlerPageNo(){
            let sum=0;
           for(var a=0;a<this.tableData2.length;a++){
            sum+= this.tableData2[a].integral*Number(this.integralNumber);
           }
           this.userIntegral = sum;
         },

        //批量添加
      addClick () {
        this.$confirm('是否确定要兑换?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        let Integrals = []
        // this.multipleSelection = this.ids;
        if(this.multipleSelection!=null && this.multipleSelection.length!=0){
            this.multipleSelection.forEach(tableData2 => {
          Integrals.push({
            giftName:tableData2.giftName,
            integral: tableData2.integral,
            integralNumber:this.integralNumber,
            rulePk:tableData2.rulePk,
            memPk:this.memberInfo.memPk,
            userIntegral: this.userIntegral,
            giftPk:this.memberInfo.giftPk,
            ruleName:this.memberInfo.ruleName,
            type:this.memberInfo.type
          })
        })
        }else{
          this.$message({ type: 'warning',message:'请勾选需要兑换的商品'})
          return
        }
        if(this.userIntegral>this.memberInfo.availableIntegral){
           this.$message({ type: 'warning',message:'积分不足'})
           return
        }
          saveIntegralExchangeForGoods(Integrals).then(res => {
            this.$message({ type: 'success', message: res.sub_msg })
            //this.listMachRoad()
            this.dialogVisible = false;
          })
        })
      },

        showDialog(memberInfo) {
            this.memberInfo = memberInfo
            this.listQuery.gradePk = memberInfo.gradePk
            this.listQuery.availableIntegral = memberInfo.availableIntegral
            this.dialogVisible = true
            this.tableData2=[];
            this.integralNumber = 1;
            this.userIntegral=0;
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

