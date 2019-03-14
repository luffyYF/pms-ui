// 会员积分换房规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">

        <el-form-item label="优惠券类型">
            <el-select size="mini" style="width:90%;" :disabled="dataForm.couponPk != '' && dataForm.couponPk != null" v-model="dataForm.type" placeholder="类型">
                <el-option v-for="y in typeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="规则名称" prop="couponName">
            <el-input size="mini" style="width:90%;" v-model="dataForm.couponName" type="text"/>
        </el-form-item>
        <el-form-item label="属性" prop="property">
            <el-radio v-model="dataForm.property" size="mini" :label="0">电子券</el-radio>
            <el-radio v-model="dataForm.property" size="mini" :label="1">纸质券</el-radio>
        </el-form-item>
        <el-form-item label="数量" prop="amount">
            <el-input-number size="mini" style="width:90%;" :precision="0" :step="1" :min="0" :controls="false" v-model="dataForm.amount" ></el-input-number>
            <span style="margin-left:10px;">张</span>
        </el-form-item>
        <el-form-item label="价值" prop="value">
            <el-input-number size="mini" style="width:90%;" :precision="2" :step="1" :min="0" :controls="false" v-model="dataForm.value" ></el-input-number>
            <span style="margin-left:10px;">元</span>
        </el-form-item>

        <el-form-item label="有效日期" prop="effectiveDateType">
            <el-select size="mini" style="width:30%;" v-model="dataForm.effectiveDateType" placeholder="有效日期">
                <el-option v-for="y in effectiveDateTypeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
            </el-select>
            <el-date-picker v-if="dataForm.effectiveDateType == 0" style="width:60%;" v-model="dataForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
            </el-date-picker>
            <span v-if="dataForm.effectiveDateType == 1">
            <el-input-number size="mini" style="width:20%;" :precision="0" :step="1" :min="0" :controls="false" v-model="dataForm.beginNum" ></el-input-number>
            天到第
            <el-input-number size="mini" style="width:20%;" :precision="0" :step="1" :min="0" :controls="false" v-model="dataForm.endNum" ></el-input-number>
            <span style="margin-left:10px;">天</span>
            </span>
        </el-form-item>
        <el-form-item label="有效星期:" prop="week">
            <el-checkbox-group v-model="dataForm.week" :min="1">
                <el-checkbox v-for="obj in weekList" :label="obj.value" :key="obj.value">{{obj.label}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="到期提醒:" prop="expireRemindFlag">
            <el-checkbox v-model="dataForm.expireRemindFlag" true-label="Y" false-label="N">优惠券到期前</el-checkbox>
            <el-input-number size="mini" style="200px" :precision="0" :step="1" :min="0" :controls="false" v-model="dataForm.remindNum" >
            </el-input-number>
            <span style="margin-left:10px;">天</span>
        </el-form-item>

        <el-form-item label="最低限制消费" v-if="dataForm.type == 0 ||dataForm.type == '0'" prop="threshold">
            <el-input-number size="mini" style="width:90%;" :precision="2" :step="1" :min="0" :controls="false" v-model="dataForm.threshold" ></el-input-number>
            <span style="margin-left:10px;">元</span>
        </el-form-item>
        
        <el-form-item v-else label="入住类型" prop="checkInType">
            <el-checkbox-group v-model="dataForm.checkInTypes" :min="1">
                <el-checkbox v-for="obj in checkInTypeList" :label="obj.value" :key="obj.value">{{obj.label}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="不适用房型" prop="roomTypePks">
            <el-checkbox-group v-model="dataForm.roomTypePks" :min="1">
                <el-checkbox v-for="obj in roomTypeList" :label="obj.typePk" :key="obj.typePk">{{obj.typeName}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="核销范围" prop="writeOffScope">
            <el-checkbox-group v-model="dataForm.writeOffScopes" :min="1">
                <el-checkbox v-for="obj in writeOffScopeList" :label="obj.value" :key="obj.value">{{obj.label}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="优惠详情" prop="detail">
            <el-input size="mini" style="width:90%;" v-model="dataForm.detail" type="textarea"/>
        </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Moment from 'moment'
  import {addCoupon,updateCoupon} from '@/api/systemSet/marketing/coupon'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
            enableFlag:"Y",
            type:0,
            integral:0,
            effectiveDateType:0,
            datepicker:[],
            writeOffScope:[],
            roomTypePks:[],
        },
        rules: {
          couponName: [{ required: true, message: '请填写优惠券名称', trigger: 'blur' }],
          amount: [{ required: true, message: '请填写数量', trigger: 'blur' }],
          value: [{ required: true, message: '请选择价值', trigger: 'blur' }],
          week:[{ required: true, message: '请选择有效星期', trigger: 'change' }],
          effectiveDateType:[{ required: true, message: '请选择有效日期', trigger: 'blur' }],
        },
        title:"添加规则",
        gradeList:[],
        roomTypeList:[],
        weekList:[
            {label:"周一",value:"1"},
            {label:"周二",value:"2"},
            {label:"周三",value:"3"},
            {label:"周四",value:"4"},
            {label:"周五",value:"5"},
            {label:"周六",value:"6"},
            {label:"周日",value:"7"},
        ],
        typeList:[
          {label:"代金券",value:0},
          {label:"房券",value:1}
        ],
        effectiveDateTypeList:[
            {label:"固定有效期",value:0},
            {label:"自领劵起第",value:1}
        ],
        writeOffScopeList:[
            {label:"客房",value:"1"},
            {label:"餐饮",value:"2"},
            {label:"豪斯菲尔餐厅",value:"3"},
        ],
        checkInTypeList:[
            {label:"普通",value:"0"},
            {label:"钟点房",value:"1"},
            {label:"接待房",value:"4"},
        ]
      }
    },
    methods: {
        listRoomType(){
            var typeList = JSON.parse(localStorage.getItem("pms_type"))
            this.roomTypeList = []
            typeList.forEach(item=> {
                if(item.typeMaster == "ROOM_TYPE"){
                this.roomTypeList.push(item);
                }
            })
        },
      showDialog (row) {
        this.dialogVisible = true
        this.listRoomType()
        if (row) {
            row.datepicker = []
            if(row.effectiveDateType == 0){
                row.datepicker[0] = row.beginDate,
                row.datepicker[1] = row.endDate
            }            
            this.title = "修改规则"
            this.dataForm = row
            console.log(JSON.stringify(this.dataForm))
        }else{
            this.title = "添加规则"
            this.dataForm = {
                enableFlag:"Y",
                type:0,
                integral:0,
                effectiveDateType:0,
                datepicker:[],
                writeOffScopes:[],
                roomTypePks:[],
                week:[],
                checkInTypes:[]
            }
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData () {
        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            if(this.dataForm.week.length == 0){
                this.$message({ type: 'warning', message: "请选择有效星期" })
                return
            }
            //处理有效日期类型
            if(this.dataForm.effectiveDateType == 0 || this.dataForm.effectiveDateType == '0'){
                if(this.dataForm.datepicker.length == 2){
                    this.dataForm.beginDate = this.dataForm.datepicker[0]
                    this.dataForm.endDate = this.dataForm.datepicker[1]
                }
                this.dataForm.beginNum = null
                this.dataForm.endNum = null
            }else{
                this.dataForm.beginDate = null
                this.dataForm.endDate = null
            }
            //有效星期
            this.dataForm.effectiveWeek = ""
            for(var i = 0;i<this.dataForm.week.length;i++){
                this.dataForm.effectiveWeek += this.dataForm.week[i]+","
            }
            //核销范围
            this.dataForm.writeOffScope = ""
            for(var i = 0;i<this.dataForm.writeOffScopes.length;i++){
                this.dataForm.writeOffScope += this.dataForm.writeOffScopes[i]+","
            }
            if(this.dataForm.type == 0 || this.dataForm.type == '0'){
                this.dataForm.checkInType = null
            }else{
                this.dataForm.checkInType = ""
                for(var i = 0;i<this.dataForm.checkInTypes.length;i++){
                    this.dataForm.checkInType += this.dataForm.checkInTypes[i]+","
                }
                this.dataForm.checkInType = this.dataForm.checkInType.substring(0,this.dataForm.checkInType.length-1)
                this.dataForm.threshold == null
            }
            this.dataForm.expireRemindFlag = this.dataForm.expireRemindFlag == null?"N":this.dataForm.expireRemindFlag
            this.dataForm.effectiveWeek = this.dataForm.effectiveWeek.substring(0,this.dataForm.effectiveWeek.length-1)
            this.dataForm.writeOffScope = this.dataForm.writeOffScope.substring(0,this.dataForm.writeOffScope.length-1)
            this.loading = true
            let api
            if (this.dataForm.couponPk) {
              api = updateCoupon(this.dataForm)
            } else {
              api = addCoupon(this.dataForm)
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
      }
    }
  }
</script>
