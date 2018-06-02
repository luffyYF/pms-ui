<template>
  <div>
      <el-button size="mini" type="primary" @click="dialogModifyMembeInfo = true" v-if="powerJudge('401803')">修改资料</el-button>
      <!-- <el-button size="mini" type="primary">入住历史</el-button>
      <el-button size="mini" type="primary">换 卡</el-button>
      <el-button size="mini" type="primary">加入黑名单</el-button> -->
      <el-button size="mini" type="primary" @click="delMemberType(message.memPk)" v-if="powerJudge('401807')">删除会员</el-button>

      <!-- 修改会员资料 dialog -->
      <el-dialog title="会员管理" :visible.sync="dialogModifyMembeInfo" width="50%" :append-to-body="true">
        <div class="body-conten">
          <el-form :inline="true" :model="message" size="mini" class="demo-form-inline" label-width="80px">
            <el-col :span="24">
              <el-col :span="12">
                <el-form-item label="卡号">
                    <el-input v-model="message.cardNumber" :disabled="true"></el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型">
                  <el-select v-model="message.certificateType">
                    <el-option
                    v-for="(item,index) in certificateTypeoption"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="12">  
                <el-form-item label="证件号">
                    <el-input v-model="message.certificateNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="车号">
                    <el-input v-model="message.carNumber"></el-input>
                </el-form-item>
              </el-col>  
            </el-col>
            <el-col :span="24">
              <el-col :span="12">  
                <el-form-item label="姓名">
                    <el-input v-model="message.memName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="性别">
                  <el-select v-model="message.memSex">
                    <el-option label="男" value="M"></el-option>
                    <el-option label="女" value="W"></el-option>
                    <el-option label="未知" value="N"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>  
            </el-col>
            <el-col :span="24">
              <el-col :span="12"> 
                <el-form-item label="地址">
                    <el-input v-model="message.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="国家">
                    <el-input v-model="message.country"></el-input>
                </el-form-item> 
              </el-col>  
            </el-col>
            <el-col :span="24">
              <el-col :span="12">  
                <el-form-item label="出生">
                    <el-input v-model="message.birthday"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="卡有效期">
                    <el-date-picker v-model="message.invalidDateCard" type="date" value-format="yyyy-MM-dd" style="width:180px;"></el-date-picker>
                </el-form-item>
              </el-col>  
            </el-col>
            <el-col :span="24">
              <el-col :span="12"> 
                <el-form-item label="邮箱">
                    <el-input v-model="message.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="手机">
                    <el-input v-model="message.memPhone"></el-input>
                </el-form-item>  
              </el-col>  
            </el-col>
            <el-col :span="24">
              <el-col :span="12"> 
                <el-form-item label="发票抬头">
                    <el-input v-model="message.accountNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="籍贯">
                    <el-input v-model="message.nativePlace"></el-input>
                </el-form-item>  
              </el-col>    
            </el-col>
            <el-col :span="24">
              <el-col :span="12"> 
                <el-form-item label="客房喜好">
                    <el-input v-model="message.roomLike"></el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="餐饮喜好">
                    <el-input v-model="message.foodLike"></el-input>
                </el-form-item>  
              </el-col>    
            </el-col>
            <el-col :span="24">
              <el-col :span="12">  
                <el-form-item label="特殊要求">
                    <el-input v-model="message.specialRequirements"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="兴趣爱好">
                    <el-input v-model="message.hobby"></el-input>
                </el-form-item>  
              </el-col>    
            </el-col>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="updateMemberType(message)">修改用户信息</el-button>
        </div>
      </el-dialog> 

  </div>
</template>

<script>
import {updateMember,delMember,memberCertificateType} from '@/api/customerRelation/pmsMemberController'
import {powerJudge} from '@/utils/permissionsOperation.js'

export default {
    props: ['message'],
    data() {
      return {
        dialogModifyMembeInfo: false,
        certificateTypeoption:[],
        form: {
          cardNumber:'', 
          certificateType:'', 
          certificateNo:'', 
          carNumber:'', 
          memName:'',
          memSex:'', 
          address:'', 
          country:'', 
          invalidDateCard:'', 
          email:'', 
          memPhone:'', 
          accountNumber:'', 
          nativePlace:'',
          roomLike:'', 
          foodLike:'', 
          specialRequirements:'', 
          hobby:''
        },

      }
    },
    created () {
        this.memberCertificateTypeList();
    },
    methods: {
      memberCertificateTypeList() {
          memberCertificateType().then(res => {
              console.log(res.data)
              this.certificateTypeoption = res.data;
          });
      },
      updateMemberType(message) {
          updateMember(message).then(res => {
              console.log(res.data)
              this.dialogModifyMembeInfo = false;
          })
      },
      delMemberType(params){
          const self = this;
          self.$confirm('确定删除此会员？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
              //确认操作
            delMember({memPk:params}).then(res => {
              if(res.code == 1){
                self.$message({
                  type: 'success',
                  message: '删除成功'
                });
              }
            })
            self.$emit('asfcascas')
            
          })
      },
      powerJudge(id){
        return powerJudge(id);
      }

    }
}
</script>
<style scoped>
.body-conten{
  background: #f7f7f7;
  padding: 10px;
  display: table;
}
</style>
