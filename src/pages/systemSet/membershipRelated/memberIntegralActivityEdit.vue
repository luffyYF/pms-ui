// 会员积分活动编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="活动名称" prop="activityName">
            <el-input size="mini" style="width:100%;" v-model="dataForm.activityName" type="text"/>
        </el-form-item>

        <el-form-item label="是否启用" prop="enableFlag">
            <el-switch
            style="display: block"
            v-model="dataForm.enableFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="0">
            </el-switch>
            <!-- <el-checkbox size="mini" v-model="dataForm.enable"></el-checkbox> -->
        </el-form-item>

        <el-form-item label="会员类型:" prop="gradePk">
            <el-select size="mini" style="width:100%;" v-model="dataForm.gradePk" placeholder="会员类型" clearable >
                <el-option  v-for="item in memberList" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="订单渠道:" prop="channel">
            <el-select size="mini" style="width:100%;" v-model="dataForm.channel" placeholder="订单渠道" clearable >
                <el-option v-for="y in options" :label="y.label" :value="y.value" :key="y.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动方式:" prop="activityMode">
            <el-select size="mini" style="width:100%;" v-model="dataForm.activityMode" placeholder="活动方式" clearable >
                <el-option v-for="y in activity" :label="y.label" :value="y.value" :key="y.value"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="额度:" prop="activityQuota" >
             <el-input-number style="width:100%" v-model="dataForm.activityQuota" controls-position="right" :min="1"  size="mini"></el-input-number>
        </el-form-item>

        <el-form-item label="活动时间" prop="datepicker">
            <el-date-picker style="width:100%;" v-model="dataForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
            </el-date-picker>
        </el-form-item>


    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="this.dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Moment from 'moment'
  import {listGrade,addRule,updateRule} from '@/api/systemSet/member/pmsMemberIntegralRoomChangeRule'
  import {listMemberIntegralActivity,updateMemberIntegralActivity,deleteMemberIntegralActivity,insertMemberIntegralActivity,listMember } from '@/api/systemSet/member/pmsMemberIntegralActivity'

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
            enableFlag:'',
            type:0,
            integral:0,
            gradePks:0,
            datepicker:[],
            activityName:null,
            gradePk:null,
            datepicker:null,
            channel:null,
            activityMode:null,
            activityQuota:1,
            beginDate:null,
            endDate:null
        },
        options: [{
          value: '0',
          label: '官网'
        }, {
          value: '1',
          label: '微网站',
          disabled: true
        }],
        activity: [{
          value: '0',
          label: '多倍积分'
        }, {
          value: '1',
          label: '额外积分',
          disabled: true
        }],
        memberList:[{
           value: '0',
          label: '官网'
        }],
        memberTypeList:[{

        }],

        rules: {
          activityName: [{ required: true, message: '请填写活动名称', trigger: 'blur' }],
          enableFlag: [{ required: true, message: '请选择是否启用', trigger: 'change' }],
          gradePk: [{ required: true, message: '请选择会员卡类型', trigger: 'change' }],
          datepicker:  [{ required: true, message: '请选择活动日期', trigger: 'change' }],
          channel:  [{ required: true, message: '请选择渠道', trigger: 'change' }],
          activityMode: [{ required: true, message: '请选择活动方式', trigger: 'change' }],
          activityQuota: [{ required: true, message: '请选择额度', trigger: 'change' }],
        },
        title:"添加规则",
        gradeList:[],
        roomTypeList:[],
      }
    },
    methods: {
        // changTest(){
        //     console.log(this.dataForm.gradePks);
        // },

        // 显示所有的商品下拉列表的值
      listMember() {
        listMember().then(response => {
          this.memberList = [];
          let brandList = response.data.data;
          console.log(brandList)
          for (let i = 0; i < brandList.length; i++) {
            this.memberList.push({label: brandList[i].gradeName, value: brandList[i].gradePk});
          }

        });
      },
      handleBrandChange(val) {
        let brandName = '';
        for (let i = 0; i < this.memberList.length; i++) {
          if (this.memberList[i].value === val) {
            brandName = this.memberList[i].value;
            break;
          }
        }
        this.dataForm.gradePk = brandName;
      },

      //   listMember(){
      //     const self = this
      //     self.member = [];
      //     listMember().then(result =>{
      //     this.member= result.data;
      //     for(var i=0;i<=this.member.length;i++){
      //         this.member.push({label: brandList[i].productName, value: brandList[i].productId});
      //     }

      //           self.member = self.member.concat(result.data)
      //     })
      // },
      listGrade(row){
        const self = this
        self.gradeList = [];
        listGrade().then(result => {
            // if(row){
            //     self.gradeList.push({
            //         gradePk:row.gradePk,
            //         gradeName:row.gradeName
            //     })
            // }
            self.gradeList = self.gradeList.concat(result.data)
        }).catch(() => {

        }).finally(()=>{
        })
      },
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
        this.listGrade(row)
        this.listMember()
        this.listRoomType()
        this.dataForm.gradePk = row.gradePk
        if (row) {
            row.datepicker = []
            row.datepicker[0] = row.beginDate,
            row.datepicker[1] = row.endDate
            this.title = "修改规则"
            if(row.type == 0){
                row.gradePks = []
            }
            this.dataForm = row
            console.log(JSON.stringify(this.dataForm))
        }else{
          this.title = "添加规则"
          this.dataForm = {
            enableFlag:0,
            type:0,
            integral:0,
            gradePks:[],
            activityName:null,
            gradePk:null,
            datepicker:null,
            channel:null,
            activityMode:null,
            activityQuota:null,
          }
        }
      },
      handleClose () {
        // this.dataForm.datepicker,
        //     this.dataForm.activityName=null,
        //    this.dataForm. gradePk=null,
        //    this.dataForm. datepicker=null,
        //    this.dataForm. channel=null,
        //     this.dataForm.activityMode=null,
        //     this.dataForm.activityQuota=1,
          this.dialogVisible = false

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
            if (this.dataForm.activityId) {
              api = updateMemberIntegralActivity(this.dataForm)
            } else {
              api = insertMemberIntegralActivity(this.dataForm)
            }
            api.then(res => {
                if(res.code == 1){
                    this.$message({ type: 'success', message: '修改成功' })
                    this.dialogVisible = false
                    this.$emit('callback')
                }else{
                    this.$message({ type: 'warning', message: '添加成功' })
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
