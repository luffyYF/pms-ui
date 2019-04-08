// 读取身份证公共组件
<template>
  <section style="display: inline-block;text-align:center;width: 24px;">
    <template v-if="cssStyle=='ICON' || !cssStyle ">
      <el-button type="text" class="iconCertificate" @click="readIDCard" title="身份证扫描" v-if="!idcLoading"></el-button>
      <i class="el-icon-loading" v-else style="color:#409EFF"></i>
    </template>

    <template v-if="cssStyle=='BUTTON'">
      <el-button type="primary" size="mini" @click="readIDCard" :loading="idcLoading">身份证扫描</el-button>
    </template>
  </section>
</template>

<script>
import moment from 'moment'
import base64 from 'js-base64'
import {readCVR} from '@/components/hfplugin/index'
import {saveCvrRecord} from '@/api/cvrApi/apiCVRController'
export default {
  props:{
    //BUTTON ICON
    cssStyle: String
  },
  mounted(){
    // console.log('当前类型',this.cssStyle)
  },
  data() {
    return {
      idcLoading:false,
      idcTime:null,
      timer:null,
    }
  },
  methods: {
    //调用读取身份证信息
    readIDCard() {
      //end
      const curr = this
      this.idcLoading = true
      readCVR({}, res=>{
        if(res.code==0){
          let idCard = curr.matchingData(res.data);
          // 保存身份证读取记录
          saveCvrRecord(res.data).then(res=>{})
          curr.$emit('callback', idCard)
        }else {
          this.$message.error(res.msg);
        }
      }, error=> {
        error && this.$alert(error, '消息', {type:'error'});
        this.idcLoading = false
      })
    },

    matchingData(idCard) {
      idCard.peopleBirthday = moment(idCard.peopleBirthday, "YYYYMMDD").format('YYYY-MM-DD');
      if(idCard.peopleSex === '男'){
        idCard.peopleSex = 'M'
      }else if(idCard.peopleSex === '女'){
        idCard.peopleSex = 'W'
      }else {
        idCard.peopleSex = null
      }
      if(""===idCard.certType){
        idCard.certType = 'DL'
      }else if("J"===idCard.certType){
        idCard.certType = 'GAT'
      }else if("I"===idCard.certType){
        idCard.certType = 'GW'
      }else {
        idCard.certType = null
      }
      idCard.startDate = moment(idCard.startDate, "YYYYMMDD").format('YYYY-MM-DD');
      idCard.endDate = moment(idCard.endDate, "YYYYMMDD").format('YYYY-MM-DD');
      idCard.peopleIdCode = idCard.peopleIDCode
      return idCard
    },
  }
}
</script>
<style scoped>
.iconCertificate{
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat: no-repeat;
  /* background-position: -1225px -17px; */
  background-position: -1100px -17px;
  /* width: 27px; */
  display: table;
  cursor: pointer;
}
</style>

