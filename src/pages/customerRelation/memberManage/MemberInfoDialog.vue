
<template>
    <div>
        <!-- 会员管理 dialog -->
        <el-dialog title="会员管理" :visible.sync="dialogMemberVisible" width="930px" :before-close="handleClose" class="dialogMemberManage">
            <el-row>
                <el-button size="mini" type="primary" @click="memberExchangeCard(memberInfo)">换卡</el-button>
                <!-- <el-button size="mini" type="primary">补卡</el-button> -->
                <el-button size="mini" type="primary" @click="memberUpdatePasswordClick(memberInfo)">改密码</el-button>
                <el-button size="mini" type="primary"  @click="memberRechargeClick(memberInfo)"  :disabled="memberInfo.rechargeFlag == 'N'">充值</el-button>
                <el-button size="mini" type="primary" @click="memberIntegralExchangeClick(memberInfo)">积分增减</el-button>
                <el-button size="mini" type="primary" @click="memberIntegralForGoodsDialog(memberInfo)">积分兑换</el-button>
                <el-button size="mini" type="primary" @click="memberRoomChangeClick(memberInfo)">积分换房</el-button>
                <!-- <el-button size="mini" type="primary">会员升级</el-button> -->
                <el-button size="mini" type="primary" @click="openLogout(memberInfo)" v-if="hasPerm('pms:member:del')">注销</el-button>
                <!-- <el-button size="mini" type="primary">挂失</el-button> -->
                <el-button size="mini" type="primary" @click="openPrint(memberInfo)">登记补打</el-button>
            </el-row>
            <!-- 打印补登 -->
            <div style="text-align:center;display:none;width:100%">
                <div class="tavs-title" id="print-memberReport">
                  <div style="margin-left: 7px;text-align: left;">
                    <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
                  </div>
                   <h3 style="text-align:center">{{activeCompany.companyName}}</h3>
                   <h4 style="text-align:center">会员登记单</h4>
                </div>
                <div id="print-memberReportTable">
                  <table
                  width="100%"
                  border="0"
                  style="border-collapse:collapse;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;"
                  cellpadding="6"
                  cellspacing="0"
                >
                  <thead>
                    <tr>
                      <th colspan="2" style="text-align: center;font-size: 14px;">
                        打印日期：{{datepickerTime}}<br><span>登记日期：{{dataForm.createTime}}</span>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="2">
                        <hr align=center noshade  width="80%">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :v-model="dataForm">
                      <td style="width:50%;">会员卡号 Card ID:</td>
                      <td style="width:50%;">{{dataForm.cardNumber}}</td>
                    </tr>
                    <tr :v-model="dataForm">
                      <td style="width:50%;">会员姓名 Name:</td>
                      <td style="width:50%;">{{dataForm.memName}}</td>
                    </tr>
                    <tr :v-model="dataForm">
                      <td style="width:50%;">证件号码 ID NO:</td>
                      <td style="width:50%;">{{dataForm.certificateNo}}</td>
                    </tr>
                    <tr :v-model="dataForm">
                      <td style="width:50%;">联系电话 Phone:</td>
                      <td style="width:50%;">{{dataForm.memPhone}}</td>
                    </tr>
                    <tr :v-model="dataForm">
                      <td style="width:50%;">会员级别 Type:</td>
                      <td style="width:50%;">{{dataForm.gradeName}}</td>
                    </tr>
                    <tr :v-model="dataForm">
                      <td style="width:50%;">地址 Address:</td>
                      <td style="width:50%;">{{dataForm.address}}</td>
                    </tr>
                    <tr :v-model="dataForm">
                      <td style="width:50%;">备注 Remark:</td>
                      <td style="width:50%;">{{dataForm.remark}}</td>
                    </tr>
                    <tr>
                      <td style="width:50%;">操作人 Operator:</td>
                      <td style="width:50%;">{{userInfo.realName}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" style="text-align: center;font-size: 12px;"><span>--------------------欢迎下次光临--------------------</span></td>
                    </tr>
                  </tfoot>
              </table>
             </div>
            </div>

            <el-tabs type="border-card" style="margin-top:10px;min-height:300px;" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="MemberInfo">
                    <MemberInfo ref="MemberInfo" @callback="delCallback" />
                </el-tab-pane>
                <el-tab-pane label="充值明细" name="MemberRechargeTable">
                     <MemberRechargeTable ref="MemberRechargeTable" />
                </el-tab-pane>
                <el-tab-pane label="卡支付明细" name="MemberCardPayDetail">
                   <MemberCardPayDetail ref="MemberCardPayDetail"/>
                </el-tab-pane>
                <el-tab-pane label="消费明细" name="MemberConsumptionDetailTable">
                    <MemberConsumptionDetailTable ref="MemberConsumptionDetailTable" />
                </el-tab-pane>
                <el-tab-pane label="积分明细" name="MemberIntegralDetailTable">
                    <MemberIntegralDetailTable ref="MemberIntegralDetailTable" />
                </el-tab-pane>
                <el-tab-pane label="换卡明细" name="MemberExchangeCardDetail">
                    <MemberExchangeCardDetail ref="MemberExchangeCardDetail"/>
                </el-tab-pane>
                <el-tab-pane label="积分兑换明细" name="memberIntegralForGoodsDetail">
                    <memberIntegralForGoodsDetail ref="memberIntegralForGoodsDetail"/>
                </el-tab-pane>
                <el-tab-pane label="卡升级明细" name="MemberUpgradeRecord">
                    <MemberUpgradeRecord ref="MemberUpgradeRecord"/>
                </el-tab-pane>
                <el-tab-pane label="积分换房明细" name="MemberIntegralRoomChangeRecord">
                    <MemberIntegralRoomChangeRecord ref="MemberIntegralRoomChangeRecord"/>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <member-recharge ref="memberRechargeRefs" @callback="memberListData(form.pageNum)"></member-recharge>
        <MemberIntegralRoomChange ref="MemberIntegralRoomChange" />
        <member-integral-forGoods ref="memberIntegralForGoodsRefs"></member-integral-forGoods>

        <member-integral-exchange ref="memberIntegralExchangeRefs" @callback="memberListData(form.pageNum)"></member-integral-exchange>
        <member-update-password ref="memberUpdatePasswordRefs" @callback="memberListData(form.pageNum)"></member-update-password>
        <member-exchange-card ref="memberExchangeCardRefs" @callback="memberListData(form.pageNum)"></member-exchange-card>
    </div>
</template>

<script>
import { getLodop } from "@/utils/lodop";
import moment from "moment";
import MemberInfo from "./MemberInfo";
import MemberRecharge from "./MemberRecharge/MemberRecharge.vue"
import MemberIntegralExchange from "./MemberIntegral/MemberIntegralExchange.vue"
import MemberRechargeDetailDialog from "./MemberRecharge/MemberRechargeDetailDialog.vue"
import MemberIntegralDetailDialog from "./MemberIntegral/MemberIntegralDetailDialog.vue"
import MemberExchangeCardDetailDialog from "./MemberCardExchange/MemberExchangeCardDetailDialog.vue"
import MemberUpdatePassword from "./MemberUpdatePassword.vue"
import MemberUpgradeRecord from "./MemberUpgradeRecord.vue"


import MemberConsumptionDetailDialog from "./MemberConsumption/MemberConsumptionDetailDialog.vue"
import MemberIntegralRoomChange from "./MemberIntegralRoomChange/MemberIntegralRoomChange.vue"
import MemberExchangeCard from "./MemberCardExchange/MemberExchangeCard.vue"
import MemberExchangeCardDetail from "./MemberCardExchange/MemberExchangeCardDetail.vue"
import MemberCardPayDetail from "./MemberCardExchange/MemberCardPayDetail.vue"
import MemberRechargeTable from "./MemberRecharge/MemberRechargeDetailTable.vue"
import  MemberConsumptionDetailTable from './MemberConsumption/MemberConsumptionDetailTable.vue'
import  MemberIntegralDetailTable from './MemberIntegral/MemberIntegralDetailTable.vue'
import  MemberIntegralRoomChangeRecord from './MemberIntegralRoomChange/MemberIntegralRoomChangeRecord.vue'
import {printMember,delMember} from '@/api/customerRelation/pmsMemberController'

import memberIntegralForGoods from "./memberIntegralForGoods/memberIntegralForGoods.vue"
import memberIntegralForGoodsDetail from "./memberIntegralForGoods/memberIntegralForGoodsDetail.vue"

export default {
    components: { MemberInfo, MemberRecharge,MemberIntegralExchange,MemberUpdatePassword,MemberExchangeCard,
    MemberRechargeDetailDialog, MemberIntegralDetailDialog, MemberConsumptionDetailDialog,MemberRechargeTable,
    MemberConsumptionDetailTable,MemberIntegralDetailTable,MemberExchangeCardDetail,MemberCardPayDetail,MemberExchangeCardDetailDialog,
    MemberIntegralRoomChangeRecord,MemberIntegralRoomChange,MemberUpgradeRecord,memberIntegralForGoods,memberIntegralForGoodsDetail },
  data() {
    return {
      dialogMemberVisible: false,
      memberInfo: {}, //会员资料
      total: 0,
      activeName:"MemberInfo",
      dataForm:{
        cardNumber:'',
        memName:'',
        certificateNo:'',
        memPhone:'',
        gradeName:'',
        address:'',
        remark:'',
        createUserName:'',
        createTime:''
      },
      LODOP: null,
      datepickerTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  mounted() {
//       console.log(this.$refs)
//     this.activeName = this.$refs.checkTabs.panes[0].name
  },
  created(){
    var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
    this.userInfo = JSON.parse(localStorage.getItem("pms_userinfo"));
  },
  methods: {
      //登记补打印
       openPrint(memberInfo) {
        this.$confirm('是否要打印?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.createdOneFormPrint();
          if (this.LODOP) {
            this.LODOP.PREVIEW();
          }
        this.$message({
              type: 'success',
              message: '正在打印预览...'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消打印预览'
            });
          });
      },
      createdOneFormPrint(){
          this.LODOP = getLodop();
          if (!this.LODOP) {
            return;
          }
          this.LODOP.PRINT_INITA(0, 0, 105, 148, "会员登记单打印");//设置大小和标题
          this.LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A6");
          this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1); // 显示背景
          this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
          this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);//设置边框
          this.LODOP.ADD_PRINT_TABLE(120,"1%","98%",100,document.getElementById("print-memberReportTable").innerHTML);
          this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
          this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
          this.LODOP.ADD_PRINT_HTM(10,"1%","98%",110,document.getElementById("print-memberReport").innerHTML);
          this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
          this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);

          // this.LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A6"); //1指定纵向打印,指定A6纸
          // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1); // 显示背景
          // this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
          // this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
          // this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 2);
          // this.LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1);
          // this.LODOP.ADD_PRINT_HTM(10,"1%","98%","98%",document.getElementById("print-memberReport").innerHTML);
          // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
          // this.LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
    },
      //注销会员卡
      openLogout (memberInfo) {
        if(memberInfo.balance!=0||memberInfo.availableIntegral!=0){
            this.$confirm('该会员还有可用积分或余额，是否要强制注销该卡', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
           this.$confirm('此强制注销操作不可恢复，是否确定?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            delMember({memPk:memberInfo.memPk}).then(res => {
                  if(res.code == 1){
                    this.$message({ type: 'success', message: "强制注销成功！" })
                  }else{
                    this.$message({ type: 'warning', message: "强制注销失败！" })
                  }
              })
            })
          })
          }else{
              this.$confirm('确定注销该会员卡?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            delMember({memPk:memberInfo.memPk}).then(res => {
                  if(res.code == 1){
                    this.$message({ type: 'success', message: "注销成功！" })
                  }else{
                    this.$message({ type: 'warning', message: "注销失败！" })
                  }
              })
            })
          }
      },
    handleClose () {
            this.dialogMemberVisible = false
            this.$emit('callback')
        },
    handleClick (tab, event) {
        if(this.activeName == "MemberRechargeTable"){
            this.$nextTick(()=>{
                this.$refs.MemberRechargeTable.init(this.memberInfo.memPk,0)
            })
        }else if(this.activeName == "MemberConsumptionDetailTable" || this.activeName == "MemberIntegralRoomChangeRecord"){
            this.$nextTick(()=>{
                this.$refs[this.activeName].init(this.memberInfo.memPk)
            })
        }else if(this.activeName == "MemberIntegralDetailTable"){
            this.$nextTick(()=>{
                this.$refs.MemberIntegralDetailTable.init(this.memberInfo.memPk,1)
            })
        }else if(this.activeName == "MemberExchangeCardDetail"){
            this.$nextTick(()=>{
                this.$refs.MemberExchangeCardDetail.init(this.memberInfo.memPk,1)
            })
        }else if(this.activeName == "MemberCardPayDetail"){
          this.$nextTick(()=>{
              this.$refs.MemberCardPayDetail.init(this.memberInfo.memPk,1)
          })
        }else if(this.activeName == "MemberUpgradeRecord"){
            this.$nextTick(()=>{
                this.$refs.MemberUpgradeRecord.init(this.memberInfo.memPk)
            })
        }
        else if(this.activeName=="memberIntegralForGoodsDetail"){
          this.$nextTick(()=>{
                this.$refs.memberIntegralForGoodsDetail.init(this.memberInfo.memPk,1)
            })
        }
        else if(this.activeName){
            this.$refs[this.activeName].init()
        }

    },
    showDialog(row){
        this.dialogMemberVisible = true
        this.memberInfo = row
        this.activeName = "MemberInfo"
        this.$nextTick(()=>{
            this.$refs[this.activeName].init(row)
        })
        this.dataForm={
            cardNumber:row.cardNumber,
            memName:row.memName,
            certificateNo:row.certificateNo,
            memPhone:row.memPhone,
            gradeName:row.gradeName,
            address:row.address,
            remark:row.remark,
            createUserName:row.createUserName,
            createTime:row.createTime,
        }
    },
    delCallback(){
        this.dialogMemberVisible = false
        this.$emit('callback')
    },
    parentCallback(){
        this.dialogMemberVisible = false
        this.$emit('callback')
    },
    memberRechargeClick (row) {
        this.$refs.memberRechargeRefs.showDialog(row,false)
    },

    //积分兑换
    memberIntegralForGoodsDialog(memberInfo){
      this.$refs.memberIntegralForGoodsRefs.showDialog(memberInfo)
    },

    memberRoomChangeClick(memberInfo){
        this.$refs.MemberIntegralRoomChange.showDialog(memberInfo)
    },
     memberIntegralExchangeClick (memberInfo) {
        this.$refs.memberIntegralExchangeRefs.showDialog(memberInfo)
    },
    memberUpdatePasswordClick(memberInfo){
        this.$refs.memberUpdatePasswordRefs.showDialog(memberInfo)
    },
    memberExchangeCard(memberInfo){
        this.$refs.memberExchangeCardRefs.showDialog(memberInfo);
    },
  }
}
</script>


<style scoped>
.body-conten {
  background: #f7f7f7;
  padding: 10px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.height38 {
  height: 38px;
  padding: 20px 10px 0 10px;
}
.height110 {
  height: 110px;
  padding: 20px 10px 0 10px;
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
</style>


