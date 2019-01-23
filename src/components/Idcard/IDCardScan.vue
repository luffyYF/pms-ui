<template>
  <section style="display: inline-block;text-align:center;width: 24px;">
    <el-button type="text" class="iconCertificate" @click="readIDCard" title="身份证扫描" v-if="!idcLoading"></el-button>
    <i class="el-icon-loading" v-else style="color:#409EFF"></i>
  </section>
</template>

<script>
import moment from 'moment'
import base64 from 'js-base64'
import {generatorCode, getIDCardInfo} from '@/api/cvrApi/apiCVRController'
export default {
  data() {
    return {
      idcLoading:false,
      idcTime:null,
      timer:null,
    }
  },
  methods: {
    //读取身份证信息
    readIDCard(){
      this.idcLoading = true
      this.idcTime = moment();
      generatorCode().then(res=>{
        let code = res.data

        let params = "CVR,"+code
        params = base64.Base64.encode(params);
        window.open("Webshell://"+params, "_self");

        this.timer = setInterval(()=>{
          this.getCardInfo(code)
          console.log('定时获取数据中...')
        }, 1000)
      })
    },
    getCardInfo(code){
      //10秒没有获取到数据，直接终止
      if(moment().subtract(10, 'seconds').isAfter(this.idcTime)){
        clearInterval(this.timer)
        this.idcLoading = false
        this.$message.warning('扫描超时，请移走卡片重新放置后重试')
        return;
      }
      getIDCardInfo({code:code}).then(res=>{
        if(res.data) {
          console.log("获取到身份证信息")
          let idCard = res.data
          let callbackData = {}
          callbackData.guestName = idCard.peopleName
          callbackData.certificateNo = idCard.peopleIDCode
          callbackData.bornDate = moment(idCard.peopleBirthday, "YYYYMMDD").format('YYYY-MM-DD');
          callbackData.detailAddress = idCard.peopleAddress
          if(idCard.peopleSex === '男'){
            callbackData.guestGender = 'M'
          }else if(idCard.peopleSex === '女'){
            callbackData.guestGender = 'W'
          }else {
            callbackData.guestGender = null
          }
          if(""===idCard.certType){
            callbackData.nationality = 'DL'
          }else if("J"===idCard.certType){
            callbackData.nationality = 'GAT'
          }else if("I"===idCard.certType){
            callbackData.nationality = 'GW'
          }else {
            callbackData.nationality = null
          }
          clearInterval(this.timer)
          this.idcLoading = false
          this.$emit('callback', callbackData)
        }
      })
    }
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

