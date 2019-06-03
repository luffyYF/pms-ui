// 会员积分明细编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <div class="member-dialog">
		<el-dialog class="add-permission" title="积分换房" :center="true" :visible.sync="dialogVisible" width="800px"
							:close-on-click-modal="false" :before-close="handleClose">
            <el-form ref="dataForm" size="mini" :model="dataForm" label-width="80px">
                <el-col :span="24" class="book-info">
                    <el-row class="info-li">
                        <el-col :span="12">
                            <div class="bg-reserve">
                                <h5 class="info-title">活动信息</h5>
                                <el-form-item label="预抵">
                                    <el-date-picker @change="dateChange" v-model="listQuery.now" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss" style="width:90%;" type="datetime" placeholder="选择日期时间" ></el-date-picker>
                                </el-form-item>
                                <el-form-item label="活动名称" prop="ruleName">
                                    <el-select @change="ruleChange" size="mini" style="width:90%;" :clearable="false" v-model="dataForm.rulePk"  placeholder="活动名称" clearable >
                                        <el-option v-for="y in list" :label="y.ruleName" :value="y.rulePk" :key="y.rulePk"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="入住房型" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="dataForm.roomTypeName" type="text"/>
                                </el-form-item>
                                <el-form-item label="所需积分" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="dataForm.integral" type="text"/>
                                </el-form-item>
                                <el-form-item label="可预定数" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="dataForm.total" type="text"/>
                                </el-form-item>
                                <el-form-item label="入住房价" prop="ruleName">
                                    <el-input size="mini" style="width:90%;" v-model="dataForm.price" type="text"/>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="bg-reserve">
                                <h5 class="info-title">会员信息</h5>
                                <el-form-item label="会员名称" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="memberInfo.memName" type="text"/>
                                </el-form-item>
                                <el-form-item label="会员卡号" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="memberInfo.cardNumber" type="text"/>
                                </el-form-item>
                                <el-form-item label="剩余积分" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="memberInfo.availableIntegral" type="text"/>
                                </el-form-item>
                                <el-form-item label="入住天数" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="dataForm.days" type="text"/>
                                </el-form-item>
                                <el-form-item label="入住间数" prop="ruleName">
                                    <el-input size="mini" :readonly="true" style="width:90%;" v-model="dataForm.num" type="text"/>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-form>
			<span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini">确定</el-button>
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
import {listByMemberGrade } from '@/api/systemSet/member/pmsMemberIntegralRoomChangeRule'
import {getBookableCount} from '@/api/atrialCenter/roomForwardStatus'
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
    methods: {
        dateChange(){
            this.dataForm.rulePk = ""
            this.dataForm.ruleName = ""
            this.dataForm.roomTypePk = ""
            this.dataForm.roomTypeName = ""
            this.dataForm.integral = 0
            this.dataForm.total = 0
            this.listByMemberGrade()
        },
        ruleChange(val){
            if(val){
                let obj = this.ruleObj[val]
                this.dataForm.ruleName = obj.ruleName
                this.dataForm.roomTypePk = obj.roomTypePk
                this.dataForm.roomTypeName = obj.roomTypeName
                this.dataForm.integral = obj.integral
                this.getBookableCount()
            }else{
                this.dataForm.ruleName = ""
            }
        },
        showDialog(memberInfo) {
            this.memberInfo = memberInfo
            this.listQuery.gradePk = memberInfo.gradePk
            this.listQuery.availableIntegral = memberInfo.availableIntegral
            this.dialogVisible = true
            this.listByMemberGrade()
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
        saveClick(){
            
            if(!this.dataForm.rulePk){
                this.$message({ type: 'warning', message: "请选择需要兑换的活动" })
                return
            }

        }
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

