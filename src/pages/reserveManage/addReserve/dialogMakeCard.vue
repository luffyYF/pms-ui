<template>
  <el-dialog class="make-card-class" title="门卡操作" :append-to-body="true" :visible.sync="dialogVisible" :closeOnClickModal="false" width="430px">

    <el-form ref="form" size="mini" :model="form" label-width="80px">
      <el-form-item label="锁号">
        <el-input v-model="form.rflLockNo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="离店时间">
        <el-date-picker v-model="form.endDate" align="right" type="datetime" placeholder="选择日期" :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开反锁">
        <el-radio v-model="form.lLock" label="1">能开反锁</el-radio>
        <el-radio v-model="form.lLock" label="0">不能开反锁</el-radio>
      </el-form-item>
    </el-form>
    <span style="color:red">检测：若操作无反应或检测不到版本号，则可能没有安装插件，或缺失DLL文件，请<a href="https://www.housefeel.cn/file/HFPlugin.rar">点击下载</a>插件，根据教程安装</span>
    <span slot="footer">
      <el-button type="primary" @click="makeCard" size="mini" :disabled="!form.rflLockNo || !form.rflCoid ||lazyFlag" >制卡</el-button>
      <el-button type="primary" @click="readCard" size="mini" :disabled="!form.rflLockNo || !form.rflCoid || lazyFlag" >读取卡信息</el-button>
      <el-button type="primary" @click="destoryCard" size="mini" :disabled="!form.rflLockNo || !form.rflCoid || lazyFlag" >注销卡</el-button>
      <el-button type="primary" @click="checkDdl" size="mini" :disabled="lazyFlag">检测</el-button>
      <el-button size="mini" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import base64 from 'js-base64'
import moment from "moment";
import {makeCard} from '@/components/hfplugin/index'
import { getRflRoomInfo } from "@/api/systemSet/roomSetting/floorRoom";
import { saveRflRecord } from '@/api/roomStatus/pmsRoomStatusController'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        rflLockNo: "",
        rflCoid: "",
        lLock:'1',
        orderGuestNo:'',
        roomNumber:'',
        guestName:'',
        endDate: moment(),
      },
      lazyFlag:false,
      userinfo:JSON.parse(window.localStorage.getItem('pms_userinfo')),
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },
  methods: {
    showDialog(roomPk,endDate,orderGuestNo,roomNumber,guestName) {
      this.dialogVisible = true;
      this.form.endDate = moment(endDate);
      this.form.rflLockNo = null;
      this.form.rflCoid = null;
      this.form.lLock='1';
      this.form.orderGuestNo=orderGuestNo;
      this.form.roomNumber=roomNumber;
      this.form.guestName=guestName;
      this.lazyFlag = false;

      getRflRoomInfo({ roomPk: roomPk }).then(res => {
        this.form.rflLockNo = res.data.rflLockNo;
        this.form.rflCoid = res.data.rflCoid;
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    loadFun(){
      this.lazyFlag = true;
      setTimeout(()=>{
        this.lazyFlag =false;
      },1000)
    },
    makeCard() {
      this.lazyFlag = true
      /**
       * 酒店标识
       * 卡号：暂时给0
       * 反锁标志
       * 公共门标志 默认1开
       * 发卡时间
       * 退房时间
       * 锁号
      */
      // this.loadFun();
      if(!this.form.rflCoid){
        this.$message.warning('酒店标识不能为空');
        this.lazyFlag = false;
        return;
      }
      if(!this.form.lLock){
        this.$message.warning('反锁标志不能为空');
        this.lazyFlag = false;
        return;
      }
      if(!this.form.endDate){
        this.$message.warning('离店日期不能为空');
        this.lazyFlag = false;
        return;
      }
      if(!this.form.rflLockNo){
        this.$message.warning('锁号不能为空');
        this.lazyFlag = false;
        return;
      }

      // let params = 'guestCard,'+
      //     this.form.rflCoid+','+
      //     '0,'+
      //     '0,'+
      //     this.form.lLock+','+
      //     '1,'+
      //     moment().format("YYMMDDHHmm")+','+
      //     moment(this.form.endDate).format("YYMMDDHHmm")+','+
      //     this.form.rflLockNo+','+
      //     this.form.orderGuestNo+','+
      //     this.form.roomNumber+','+
      //     this.form.guestName+','+
      //     this.userinfo.upmsUserId+','+
      //     this.userinfo.upmsUserName;

      let params =  {
        rflCoid: this.form.rflCoid,
        cardNo: '0',
        dai: '0',
        llock: this.form.lLock,
        pdoors: '1',
        beginDate: moment().format("YYMMDDHHmm"),
        endDate: moment(this.form.endDate).format("YYMMDDHHmm"),
        rflLockNo: this.form.rflLockNo,
        orderGuestNo: this.form.orderGuestNo,
        roomNumber: this.form.roomNumber,
        guestName: this.form.guestName,
        createUserId: this.userinfo.upmsUserId,
        createUserName: this.userinfo.upmsUserName
      }
      let data = {
        joinParam: 'guestCard,'+ base64.Base64.encode(JSON.stringify(params))
      }
      makeCard(data, res=>{
        if(res.code==0){
          this.$alert(res.data, '读卡器信息', {confirmButtonText: '确定'});
          params.successFlag='1'
        }else {
          params.successFlag='0'
          this.$message.error(res.msg);
        }
        //保存制卡记录
        saveRflRecord(params).then(res=>{})
      }, ()=>{
        this.lazyFlag = false;
      })
    },
    readCard() {
      // this.loadFun();
      // window.open("Webshell://Z2V0Q2FyZE5vSW5mbyUyQzM4NzA0NDc=", "_self");
      // let params = base64.Base64.encode('RFL,getCardNoInfo,'+this.form.rflCoid);
      // window.open("Webshell://"+params, "_self");
      this.lazyFlag = true;

      let params = 'getCardNoInfo,'+this.form.rflCoid;
      makeCard({joinParam: params}, res=>{
        if(res.code==0){
          this.$alert(res.data, '读卡器信息', {dangerouslyUseHTMLString: true});
        }else {
          this.$message.error(res.msg);
        }
      }, ()=>{
        this.lazyFlag = false;
      })
    },
    destoryCard(){
      // this.loadFun();
      // let params = base64.Base64.encode('RFL,cardErase,'+this.form.rflCoid);
      // window.open("Webshell://"+params, "_self");
      this.lazyFlag = true;

      let params = 'cardErase,'+this.form.rflCoid;
      makeCard({joinParam: params}, res=>{
        if(res.code==0){
          this.$alert(res.data, '读卡器信息', {confirmButtonText: '确定'});
        }else {
          this.$message.error(res.msg);
        }
      }, ()=>{
        this.lazyFlag = false;
      })
    },
    checkDdl() {
      // this.loadFun();
      //检测版本号，若没有版本号，则表示缺失ddl文件
      // let params = base64.Base64.encode('RFL,getDLLVersion');
      // window.open("Webshell://"+params, "_self");
      this.lazyFlag = true;

      let params = 'getDLLVersion';
      makeCard({joinParam: params}, res=>{
        if(res.code==0){
          this.$alert(res.data, '读卡器信息', {confirmButtonText: '确定'});
        }else {
          this.$message.error(res.msg);
        }
      }, ()=>{
        this.lazyFlag = false;
      })

    }
  }
};
</script>

<style>
.make-card-class .el-input__inner {
  width: 150px;
}
.make-card-class .el-input__suffix {
  right: 49px !important;
}

.make-card-class .el-dialog__footer{
  padding: 10px 0px 20px !important;
  text-align: center !important;
}
</style>
