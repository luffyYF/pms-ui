// 会员远期房价批量设置
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="活动时间" prop="datepicker">
            <el-date-picker style="width:100%;" v-model="dataForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
            </el-date-picker>
        </el-form-item>
         <el-form-item label="有效星期:" prop="week">
            <el-checkbox-group v-model="dataForm.week" :min="1">
                <el-checkbox v-for="obj in weekList" :label="obj.value" :key="obj.value">{{obj.label}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="活动对象" prop="type">
            <el-radio v-model="dataForm.type" size="mini" :label="0">全部会员</el-radio>
            <el-radio v-model="dataForm.type" size="mini" :label="1">指定会员</el-radio>
        </el-form-item>
        <el-form-item label="会员选择" v-if="dataForm.type == 1" prop="gradePks">
            <el-checkbox-group :min="1" v-model="dataForm.gradePks">
                <el-checkbox v-for="obj in gradeList" :label="obj.gradePk" :key="obj.gradePk">{{obj.gradeName}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="设置价格" prop="gradePks"> -->
            <el-table
                :data="parms"
                border
                class="forward-price-list noChange"
                @selection-change="handleSelectionChange"
                max-height="550">
                <!-- 需要映射的表 -->
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="roomTypeName"  label="房型" align="center" >
                </el-table-column>
                <el-table-column   label="设置方式" align="center" >
                    <template slot-scope="scope">
                        <el-select size="mini" :clearable="false" style="width:100%;" v-model="scope.row.type" placeholder="设置方式">
                            <el-option v-for="y in parmsList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column   label="具体值" align="center" >
                    <template slot-scope="scope">
                        <el-input-number v-if="scope.row.type == 2 || scope.row.type == '2'" size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :max="10" :controls="false" v-model="scope.row.num" ></el-input-number>
                        <el-input-number v-else :disabled="scope.row.type == 0 " size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :controls="false" v-model="scope.row.num" ></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
        <!-- </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {listGrade} from '@/api/systemSet/member/pmsMemberIntegralRoomChangeRule'
  import {settingPrice} from '@/api/systemSet/member/pmsMemberForwardPrice'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
            enableFlag:"Y",
            type:0,
            integral:0,
            gradePks:[]
        },
        rules: {
          ruleName: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
          type: [{ required: true, message: '请填写类型', trigger: 'change' }],
          gradePks: [{ required: true, message: '请选择会员卡类型', trigger: 'change' }],
          datepicker:  [{ required: true, message: '请选择活动日期', trigger: 'change' }],
          roomTypePk:  [{ required: true, message: '请选择兑换房型', trigger: 'change' }],
          week: [{ required: true, message: '请选择有效日期', trigger: 'change' }],
        },
        title:"批量设置价格",
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
        parmsList:[
            {label:"恢复基础价",value:0},
            {label:"一口价",value:1},
            {label:"折扣率",value:2},
            {label:"上浮固定值",value:3},
            {label:"下浮固定值",value:4},
        ],
        parms:[]
      }
    },
    methods: {
      listGrade(){
        const self = this
        self.gradeList = [];
        listGrade().then(result => {
            self.gradeList = self.gradeList.concat(result.data)
        }).catch(() => {

        }).finally(()=>{
        })
      },
        listRoomType(){
            var typeList = JSON.parse(localStorage.getItem("pms_type"))
            this.parms = []
            typeList.forEach(item=> {
                if(item.typeMaster == "ROOM_TYPE"){
                    this.parms.push({
                        roomTypePk:item.typePk,
                        roomTypeName:item.typeName,
                        type:0,
                        num:0
                    });
                }
            })
        },
      showDialog () {
        this.dialogVisible = true
        this.dataForm = {
            type:0,
            gradePks:[],
            week:['1','2','3','4','5','6','7'],
            parms:[]
        }
        this.listGrade()
        this.listRoomType()
      },
      handleClose () {
        this.dialogVisible = false
      },
        handleSelectionChange(val) {
        this.dataForm.parms = val;
      },
      // 保存数据
      saveData () {
        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            if(this.dataForm.parms.length == 0){
                this.$message({ type: 'warning', message: "至少选择一种房型" })
                return
            }
            for(var i=0;i<this.dataForm.parms.length;i++){
               if((this.dataForm.parms[i].type == 2 || this.dataForm.parms[i].type == '2') && this.dataForm.parms[i].num > 10 ){
                    this.$message({ type: 'warning', message: this.dataForm.parms[i].roomTypeName+"设置方式为折扣率时具体值不能超过10" })
                    return
               }
            }

              //全部会员时
            if(this.dataForm.type == 0){
                this.dataForm.gradePks = []
                for(var i=0;i<this.gradeList.length;i++){
                    this.dataForm.gradePks.push(this.gradeList[i].gradePk)
                }                
            }
            //时间转换
            this.dataForm.beginDate = this.dataForm.datepicker[0]
            this.dataForm.endDate = this.dataForm.datepicker[1]
            //有效星期复制
            this.dataForm.effectiveWeek = ""
            for(var i = 0;i<this.dataForm.week.length;i++){
                this.dataForm.effectiveWeek +=this.dataForm.week[i]+","
            }
            this.dataForm.effectiveWeek = this.dataForm.effectiveWeek.substring(0,this.dataForm.effectiveWeek.length-1)
            this.loading = true
            let api = settingPrice(this.dataForm)
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
