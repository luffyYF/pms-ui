<template>
  <div class="content-body">
    <el-form :inline="true" :rules="rules" ref="dumbHouseObj" :model="dumbHouseObj" size="mini" label-width="100px">
      <el-form-item label="协议单位">
        <el-select v-model="dumbHouseObj.agreementPk" placeholder="协议单位">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in agreementList"
            :key="item.agreementPk"
            :label="item.unitName"
            :value="item.agreementPk">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="dumbHouseObj.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          class="el_input_textarea"
          v-model="dumbHouseObj.remark">
          </el-input>
      </el-form-item>
      <br>
      <el-form-item label="创建日期">
        <el-input v-model="dumbHouseObj.createTime" readonly placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="创建营业日期">
        <el-input v-model="dumbHouseObj.businessDate" readonly placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="dumbHouseObj.createUserName" readonly placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button size="mini" type="primary" @click="save">新 增</el-button>
    </div>
  </div>
</template>

<script>
  import {listProject } from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
  import {addDumbHouse} from '@/api/dumbHouse/pmsDumbHouseController'
  import Moment from 'moment'
  export default {
    data () {
      return {
        agreementList: [], //协议单位
        dumbHouseObj:{
          dumbPk:null,
          name:'',
          orderNo:null,
          agreementPk:'',
          balance:0,
          checkoutFlag:'N',
          checkoutDate:null,
          checkoutUserPk:null,
          checkoutUserName:null,
          createUserName:JSON.parse(localStorage.getItem('pms_userinfo')).realName,
          businessDate:Moment(new Date()).format("YYYY-MM-DD"),
          remark:'',
          createTime:Moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        },
        //校验规则
        rules: {
          name: [
            { required: true, message: '请填写名称', trigger: 'blur' }
          ]
        },
      }
    },
    created () {//初始化加载
      this.listProjectDate();
    },
    methods: {
      //获取协议的单位
      listProjectDate(){
        listProject().then(res => {
          this.agreementList = res.data.data;
        })
      },
      save(){//新增哑房账
        this.$refs['dumbHouseObj'].validate((valid) => {
          if (valid) {
            this.dumbHouseObj.businessDate = Moment(this.dumbHouseObj.businessDate).format("YYYY-MM-DD")
            this.dumbHouseObj.createTime = Moment(this.dumbHouseObj.createTime).format("YYYY-MM-DD hh:mm:ss")
            addDumbHouse(this.dumbHouseObj).then(res=>{
              console.log(res)
              if(res.code==1){
                this.$message({type:'success', message: '新增成功'})
                this.onReset()
              }
            }).catch(error=>{
              this.$message({type:'danger', message: error})
            })
          } else {
            return false;
          }
        });
      },
      onReset() {
        this.dumbHouseObj = {
          dumbPk:null,
          name:'',
          groupNumber:null,
          agreementPk:'',
          balance:0,
          checkoutFlag:'N',
          checkoutDate:null,
          checkoutUserPk:null,
          checkoutUserName:null,
          createUserName:'super',
          businessDate:Moment(new Date()).format("YYYY-MM-DD"),
          remark:'',
          createTime:Moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        };
        this.$emit("toReset")
      },
    }
  }
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 20px 0px;
  width: 650px;
}
.el_input_textarea{
  min-height: 30px;
  width: 439px;
  padding: 5px;
  margin-left: -3px;
}
.button{
  margin-left: 32px;
  margin-top: 20px;
}
</style>
