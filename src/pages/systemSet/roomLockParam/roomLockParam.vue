// 会员积分换房规则
<template>
  <div class="heightOverflow100">
    <div class="bg-reserve">
      <el-row :gutter="24">
        <el-col :span="18">
            <el-form ref="pageObj" size="mini" :inline="true" :model="pageObj" label-width="110px">
                <el-form-item label="楼层选择" prop="storeyPk" >
                  <el-select size="mini" v-model="pageObj.storeyPk" placeholder="楼层选择">
                      <el-option v-for="y in storeyData" :label="y.storeyName" :value="y.storeyPk" :key="y.storeyPk"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="storeyPk" >
                    <el-button type="primary" size="mini" icon="el-icon-search"  @click="listStoreyRoom()">查询</el-button>
                    <el-button type="primary" size="mini" v-if="hasPerm('pms:roomLockParam:batchSave')" @click="batchClick()">批量设置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
      </el-row>
      
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="roomData" 
        v-loading="loading"
        style="width: 98%; margin:10px;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="roomNumber" label="房号" width="100" align="center">
            </el-table-column>
            <el-table-column prop="roomTypePk" label="房型"  width="200" align="center">
              <template slot-scope="scope">
                <span>{{listTypeDataView[scope.row.roomTypePk].typeName}}</span>
                <el-input v-if="scope.row.usingFlag == 'Y'" v-model="scope.row.overtimeBilling" size="mini" placeholder="请输入计费"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="intelligentFlag" label="智能锁" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.hardwareCode">{{codeObj[scope.row.hardwareCode]}}</span>
                <span v-else>未安装</span>
              </template>
            </el-table-column>
            <el-table-column prop="param1" label="参数" align="center" min-width="300">
              <template slot-scope="scope">
                  <span>{{scope.row | lockParamFilter}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="param1" label="艾美信 楼栋编号" align="center">
              <template slot-scope="scope">
                  <span>{{scope.row.param1 | lockFilter(scope.row)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="param2" label="艾美信 楼层编号" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.param2 | lockFilter(scope.row)}}</span>
                  </template>
            </el-table-column>
            <el-table-column prop="param3" label="艾美信 房间编号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.param3 | lockFilter(scope.row)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="param1" label="RFL 锁号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.param1 | lockFilter2(scope.row)}}</span>
                </template>
            </el-table-column> -->
            <!-- <el-table-column prop="telPhone" label="电话分机" align="center">
            </el-table-column>
            <el-table-column prop="telPhoneLine" label="电话外线" align="center">
            </el-table-column> -->
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>

      </el-table>
      <!-- <el-pagination
          style="margin: 10px 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageObj.pageNum"
          :page-sizes="[10, 20, 30, 40]" 
          :page-size="pageObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageObj.total">
        </el-pagination> -->


        <el-dialog title="批量编辑房间" :visible.sync="batchPropDialog" width="820px">
          <el-form label-width="110" :inline="true" label-position="right" size="mini">

            <el-form-item label="智能门锁" prop="hardwarePk">
              <el-select size="mini"  @change="lockChange" style="width:200px;" v-model="hardwarePk" placeholder="类型">
                  <el-option v-for="y in lockList" :label="codeObj[y.brand]" :value="y.hardwarePk" :key="y.hardwarePk"></el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="属性" v-if="propList.length > 0">
              <el-checkbox @change="propChange(obj.check,i)" v-for="(obj,i) in propList" :key="i" v-model="obj.check">{{obj.label}}</el-checkbox>
            </el-form-item>
            <br>
            <el-form-item :label="obj.label" style="width:40%" v-if="obj.check" v-for="(obj,index) in propList" :key="index" required>
                <upload-avatar v-if="obj.type == 'image'" :avatar.sync="obj.value"></upload-avatar>
                <el-input v-else :type="obj.type" style="width:100%;" v-model="obj.value" :placeholder="'请输入'+obj.label" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="batchPropDialog = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="saveBatchClck" size="mini" >保存</el-button>
          </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
  import {listStorey,listStoreyRoom,batchUpdateRoomProp} from '@/api/systemSet/roomSetting/floorRoom'
  import {addApi,updateApi,listApi,deleteApi, allListApi} from '@/api/systemSet/hotelHardware/hotelHardware'
  
  import {batchUpdateRoomLockParam } from '@/api/systemSet/hotelHardware/DeviceRoomLockParamApi'
  import UploadAvatar from "@/components/UploadImage/UploadAvatar2";
  export default {
   components: { UploadAvatar },
    data() {
      return {
        options:[],
        tableData: [],
        gradeList:[],
        loading:false,
        pageObj:{
            storeyPk:"",
            total:0,
            pageNum:1,
            pageSize:10
        },
        gradeObj:{

        },
        typeObj:{
            0:"门卡",
            1:"公安",
            2:"身份证阅读器",
            3:"会员卡阅读器",
        },
        codeObj:this.HOTEL_HARDWARE,
        storeyData:[],
        roomData:[],
        listTypeDataView:[],
        currentChangeList:[],
        hardwarePk:"",
        batchPropDialog:false,
        propList:[
          // {key:"param1",type:"select",label:"楼栋编号",check:false,value:""},
          // {key:"param2",type:"text",label:"楼层编号",check:false,value:""},
          // {key:"param3",type:"text",label:"房间编号",check:false,value:""},
          // {key:"param4",type:"image",label:"授权图片",check:false,value:""},
          // {key:"param5",type:"image",label:"门锁图片",check:false,value:""},
        ],
        lockList:[],
        lockObj:{}
      }
    },
    mounted(){
      this.init()
      this.listType()
    },
    methods: {
      
        batchClick(){
          if(this.currentChangeList == null || this.currentChangeList.length == 0){
              this.$message({ type: 'warning', message: '请选择需要修改的房间' })
              return
          }
          this.hardwarePk = "";
          this.propList = []
          this.allListApi()
          this.batchPropDialog = true
        },
        saveBatchClck(){
          if(this.hardwarePk == null |  this.hardwarePk == ''){
             this.$message({ type: 'warning', message: '请选择要设置的门锁' })
             return
          }
          //属性
          let props = []
          let param = {}
          for(let i=0;i<this.propList.length;i++){
            if(this.propList[i].check ){
              param[this.propList[i].key] = this.propList[i].value
              props.push(this.propList[i].key)
            }
          }
          if(props == null |  props.length <= 0){
             this.$message({ type: 'warning', message: '请选择勾选要设置的参数' })
             return
          }
          let roomPks = []
          for(let i=0;i<this.currentChangeList.length;i++){
              roomPks.push(this.currentChangeList[i].roomPk)
          }
          let obj = this.lockObj[this.hardwarePk]
          param.hardwarePk = obj.hardwarePk
          param.hardwareCode = obj.code
          props.push("hardwarePk")
          props.push("hardwareCode")
          let data = {
              roomPks:roomPks,
              props:props,
              param:param
          }
          batchUpdateRoomLockParam(data).then(res=>{
            this.batchPropDialog = false
            this.listStoreyRoom()
            this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
          })
        },
        propChange(val,key){
          if(!val){
            this.propList[i].value = null
          }
        },
        lockChange(val){
          let obj = this.lockObj[val]
          if(val != null){
            //艾美信
            if(obj.code.indexOf("AMX") != -1){
              this.propList = [
                {key:"param1",type:"select",label:"楼栋编号",check:false,value:""},
                {key:"param2",type:"text",label:"楼层编号",check:false,value:""},
                {key:"param3",type:"text",label:"房间编号",check:false,value:""},
                {key:"param4",type:"image",label:"授权图片",check:false,value:""},
                {key:"param5",type:"image",label:"门锁图片",check:false,value:""},
              ]
              //宏安兴
            }else if(obj.code.indexOf("HAX") != -1){
                this.propList = [
                  {label:"RFL锁号",type:"text",key:"param1",value:"",check:false},
                  {label:"酒店标识编码",type:"text",key:"param2",value:"",check:false},
                ]
            }
          }
      },
      allListApi(){
          allListApi({type:0}).then(res=>{
            let data = res.data
            this.lockList = data
            this.lockObj = {}
            for(let i=0;i<data.length;i++){
              this.lockObj[data[i].hardwarePk] = data[i]
            }
            console.log()
            if(this.hardwarePk != null && this.hardwarePk != ""){
              this.lockChange(this.hardwarePk)
            }
          })
      },
      handleSelectionChange(val){
        this.currentChangeList = val
      },
      init() {
        this.listStorey()
      },
      listType(){
        const self = this
        self.listTypeDataView = {}
        var typeList = JSON.parse(localStorage.getItem("pms_type"))
        self.listTypeData = []
        typeList.forEach(item=> {
          if(item.typeMaster == "ROOM_TYPE"){
            self.listTypeData.push(item);
          }
        })
        self.listTypeData.forEach((value,key)=>{
          self.listTypeDataView[value.typePk] = value;
        })
      },
      listStorey(){
        const self = this
        listStorey().then(result => {
          self.storeyData = result.data
          if(self.storeyData != null && self.storeyData.length >0){
              this.pageObj.storeyPk = self.storeyData[0].storeyPk
          }
          this.listStoreyRoom()
        })
      },
      listStoreyRoom(){
        const self = this;
        listStoreyRoom({storeyPk: self.pageObj.storeyPk}).then(result => {
          self.roomData = result.data
          self.loading = false
        }).catch(() => {
          self.loading = false
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.pageObj.pageSize = val
        this.listStoreyRoom()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.pageObj.pageNum = val
        this.listStoreyRoom()
      },
    },
    filters:{
      lockParamFilter(val){
          if(val.hardwareCode == null || val.hardwareCode == '' ){
            return ""
          }else if(val.hardwareCode.indexOf('AMX') != -1){
            return "楼栋编号:"+val.param1+",楼层编号:"+val.param2+",房间编号:"+val.param3

          }else if(val.hardwareCode.indexOf('HAX') != -1){
            return "RFL锁号:"+val.param1
          }
          
      },
      lockFilter(v,v1){
        if(v1.paramPk != null && v1.hardwareCode != null &&  v1.hardwareCode.indexOf('AMX') != -1){
          return v
        }
        return ''
      },
      lockFilter2(v,v1){
        if(v1.paramPk != null && v1.hardwareCode != null &&  v1.hardwareCode.indexOf('HAX') != -1){
          return v
        }
        return ''
      }
    }
  }
</script> 

<style scoped>
.checked{
  margin-bottom: 5px;
}
.el-input{
  width: 60px;
}
.el-input.claName{
  width: 90px;
}
.el-date-editor--time{
  width: 120px;
}
.el-Name{
  width: 120px;
}
.el-radio+.el-radio{
  margin-left: 0;
}
.el-radio .el-radio__label {
  padding-left: 3px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.span{
  margin-right: 5px;
}
</style>
