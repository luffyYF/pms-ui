// 会员积分换房规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="600px"
             :close-on-click-modal="false" :before-close="handleClose">
    
        <el-col :span="24" v-if="type == 0">
            <el-form ref="lock" size="mini" :rules="lockRules" :model="lock" label-width="110px">
                <el-row class="info-li" >
                    <el-col :span="12">
                        <el-form-item label="类型" prop="type">
                            <el-select size="mini" @change="typeChange" style="width:90%;" :disabled="lock.hardwarePk != '' && lock.hardwarePk != null" v-model="lock.type" placeholder="类型">
                                <el-option v-for="y in typeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="品牌" prop="brand">
                            <el-select size="mini" style="width:90%;" v-model="lock.brand" placeholder="品牌">
                                <el-option v-for="(y,index) in brandList" :label="y.label" :value="y.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-li">
                    <el-col :span="12">
                        <el-form-item label="型号" prop="model">
                        <el-input size="mini" style="width:90%;" v-model="lock.model" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="版本" prop="version">
                            <el-input size="mini" style="width:90%;" v-model="lock.version" type="text"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-li">
                    <el-col :span="12">
                        <el-form-item label="全局锁号" prop="lockNum">
                        <el-input size="mini" style="width:90%;" v-model="lock.lockNum" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最大全局锁号" prop="maxLockNum">
                            <el-input size="mini" style="width:90%;" v-model="lock.maxLockNum" type="text"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-li">
                    <el-col :span="12">
                        <el-form-item label="全局流水号" prop="serialNum">
                        <el-input size="mini" style="width:90%;" v-model="lock.serialNum" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最大全局流水号" prop="maxserialNum">
                            <el-input size="mini" style="width:90%;" v-model="lock.maxSerialNum" type="text"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-li">
                    <el-col :span="12">
                        <el-form-item label="全局序列号" prop="sequenceNum">
                        <el-input size="mini" style="width:90%;" v-model="lock.sequenceNum" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最大全局序列号" prop="maxSequenceNum">
                            <el-input size="mini" style="width:90%;" v-model="lock.maxSequenceNum" type="text"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-li">
                    <el-col :span="12">
                        <el-form-item label="子房卡号" prop="sonRoomCardNum">
                        <el-input size="mini" style="width:90%;" v-model="lock.sonRoomCardNum" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最大子房卡号" prop="maxSonRoomCardNum">
                            <el-input size="mini" style="width:90%;" v-model="lock.maxSonRoomCardNum" type="text"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row class="info-li">
                    <el-col :span="24">
                        <el-form-item label="是否支持身份证" prop="idCardFlag">
                        <el-switch
                                style="display: block"
                                v-model="lock.idCardFlag"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value="Y"
                                inactive-value="N"
                                active-text="是"
                                inactive-text="否">
                                </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-li">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                        <el-input size="mini" style="width:90%;" v-model="lock.remark" type="textarea"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>

        <el-col :span="24" v-if="type == 1">
            <el-form ref="gongan" size="mini" :rules="gonganRules" :model="gongan" label-width="110px">
                <el-row class="info-li" >
                    <el-col :span="12">
                        <el-form-item label="类型" prop="type">
                            <el-select size="mini"  @change="typeChange" style="width:90%;" :disabled="gongan.hardwarePk != '' && gongan.hardwarePk != null" v-model="gongan.type" placeholder="类型">
                                <el-option v-for="y in typeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="端口" prop="port">
                            <el-input size="mini" style="width:90%;" v-model="gongan.port" type="text"/>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="酒店编号" prop="hotelNum">
                            <el-input size="mini" style="width:90%;" v-model="gongan.hotelNum" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="参数1" prop="param1">
                            <el-input size="mini" style="width:90%;" v-model="gongan.param1" type="text"/>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="12">
                        <el-form-item label="参数2" prop="param2">
                            <el-input size="mini" style="width:90%;" v-model="gongan.param2" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="参数3" prop="param3">
                            <el-input size="mini" style="width:90%;" v-model="gongan.param3" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="参数4" prop="param4">
                            <el-input size="mini" style="width:90%;" v-model="gongan.param4" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="参数5" prop="param5">
                            <el-input size="mini" style="width:90%;" v-model="gongan.param5" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="参数6" prop="param6">
                            <el-input size="mini" style="width:90%;" v-model="gongan.param6" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="参数7" prop="param7">
                            <el-input size="mini" style="width:90%;" v-model="gongan.param7" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ip地址" prop="ip">
                            <el-input size="mini" style="width:90%;" v-model="gongan.ip" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接口文件路径" prop="interfaceFileName">
                            <el-input size="mini" style="width:90%;" v-model="gongan.interfaceFileName" type="text"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
        <el-col :span="24" v-if="type == 2 || type == 3">
            <el-form ref="read" size="mini" :rules="readRules" :model="read" label-width="110px">
                <el-row class="info-li" >
                    <el-col :span="12">
                        <el-form-item label="类型" prop="type">
                            <el-select size="mini"  @change="typeChange" style="width:90%;" :disabled="read.hardwarePk != '' && read.hardwarePk != null" v-model="read.type" placeholder="类型">
                                <el-option v-for="y in typeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="品牌" prop="brand">
                            <el-select size="mini" style="width:90%;" v-model="read.brand" placeholder="品牌">
                                <el-option v-for="(y,index) in brandList" :label="y.label" :value="y.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="型号" prop="model">
                            <el-input size="mini" style="width:90%;" v-model="read.model" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="版本" prop="version">
                            <el-input size="mini" style="width:90%;" v-model="read.version" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="刷新时间" prop="refreshTime">
                            <el-input size="mini" style="width:90%;" v-model.number="read.refreshTime" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="端口" prop="port">
                            <el-select size="mini" style="width:90%;" v-model="read.port" placeholder="端口">
                                <el-option v-for="(y,index) in portList" :label="y.label" :value="y.value" :key="index"></el-option>
                            </el-select>
                            <!-- <el-input size="mini" style="width:90%;" v-model="read.port" type="text"/> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark">
                            <el-input size="mini" style="width:90%;" v-model="read.remark" type="text"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否启用" prop="enableFlag">
                            <el-switch
                            style="display: block"
                            v-model="read.enableFlag"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="Y"
                            inactive-value="N"
                            active-text="是"
                            inactive-text="否">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Moment from 'moment'

  import {addApi,updateApi,listApi,deleteApi } from '@/api/systemSet/hotelHardware/hotelHardware'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        lockRules: {
          type: [{ required: true, message: '请选择硬件类型', trigger: 'change' }],
          brand: [{ required: true, message: '请填写品牌', trigger: 'blur' }],
        },
        gonganRules:{
          type: [{ required: true, message: '请选择硬件类型', trigger: 'change' }],
        },
        readRules:{
          type: [{ required: true, message: '请选择硬件类型', trigger: 'change' }],
          brand:[{ required: true, message: '请填写品牌', trigger: 'change' }],
        },
        title:"添加",
        gradeList:[],
        typeList:[
            {label:"门锁",value:0},
            {label:"公安",value:1},
            {label:"身份证阅读器",value:2},
            {label:"会员卡阅读器",value:3},
        ],
        brandList:[
            {label:"AMX",value:"AMX"},
            {label:"宏安兴EM-4305",value:"HAXEM-4305"},
        ],
        portList:[
            {label:"COM4",value:"COM4"},
            {label:"USB",value:"USB"},
            {label:"COM1",value:"COM1"},
            {label:"COM2",value:"COM2"},
            {label:"COM3",value:"COM3"},
        ],
        lock:{
            
        },
        gongan:{
            
        },
        read:{
            
        },
        // codeObj:{
        //     "AMX":"AMX",
        //     "MHURD-R310":"明华KRF-310",
        //     "MHURD-R330":"明华KRF-330",
        //     "MHKRF-35":"明华KRF-35",
        //     "MHSRD-U010":"明华SRD-U010",
        //     "MHSRD-U100":"明华SRD-U100",
        //     "YTT":"英泰通",
        //     "HAXEM-4305":"宏安行EM-4305"
        // },
        type:0
      }
    },
    methods: {
        initParam(){
            this.lock = {
                type:"",
                brand:"",
                model:"",
                version:"",
                lockNum:"",
                maxLockNum:"",
                serialNum:"",
                maxSerialNum:"",
                sequenceNum:"",
                maxSequenceNum:"",
                sonRoomCardNum:"",
                maxSonRoomCardNum:"",
                idCardFlag:"N",
                remark:""
            }
            this.gongan = {
                type:"",
                port:"",
                hotelNum:"",
                param1:"",
                param2:"",
                param3:"",
                param4:"",
                param5:"",
                param6:"",
                param7:"",
                ip:"",
                interfaceFileName:""
            }
            this.read = {
                brand:"",
                model:"",
                version:"",
                refreshTime:"",
                port:"",
                remark:"",
                enableFlag:"N"
            }
        },
        //类型切换
        typeChange(val){
            this.type = val
            if(this.type == 0){//门锁
                this.lock.type = val
                this.brandList = [
                    {label:"艾美信",value:"AMX"},
                    {label:"宏安行EM-4305",value:"HAXEM-4305"},
                ]
            }else if(this.type == 1){//公安
                this.gongan.type = val
            }else if(this.type == 2 ){//身份证阅读器
                this.read.type = val
                this.brandList = [{label:"华视阅读器CVR-110UA",value:"HSCVR-110UA"}]
                this.read.brand = null;
                this.read.brand = this.brandList[0].value;
            }else if(this.type == 3){//会员阿卡阅读器CVR-110UA
                this.read.type = val
                this.brandList = [
                    {label:"明华URD-R310",value:"MHURD-R310"},
                    {label:"明华URD-R330",value:"MHURD-R330"},
                    {label:"明华KRF-35",value:"MHKRF-35"},
                    {label:"明华SRD-U010",value:"MHSRD-U010"},
                    {label:"明华SRD-U100",value:"MHSRD-U100"},
                    {label:"英泰通",value:"YTT"},
                ]
                this.read.brand = this.brandList[0].value;
            }
        },
      showDialog (row) {
        this.dialogVisible = true
        this.initParam()
        if (row) {
            this.title = '编辑'
            this.type = row.type
            
            if(this.type == 0){
                this.lock = row
            }else if(this.type == 1){
                this.gongan = row
            }else if(this.type == 2 || (this.type == 3)){
                this.read = row
            }
            this.typeChange(this.type)
        }else{
            this.title = "添加"
            this.type = 0
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData () {
          let refs = null
          let dataForm = {}
          if(this.type == 0){
            refs = this.$refs.lock
            dataForm = this.lock
          }else if(this.type == 1){
            refs = this.$refs.gongan
            dataForm = this.gongan
            }else if(this.type == 2 || this.type == 3){
            refs = this.$refs.read
            dataForm = this.read
           }  
        //   dataForm.type = this.type
            refs.validate(valid => {
          if (valid) {
            this.loading = true
            let api
            if(dataForm.type == 1){
                dataForm.code = 'GONGAN'
            }else{
                dataForm.code = dataForm.brand
            }
            if (dataForm.hardwarePk) {
              api = updateApi(dataForm)
            } else {
                
              api = addApi(dataForm)
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
