
<template>
    <div>
        <!-- 会员管理 dialog -->
        <el-dialog title="会员管理" :visible.sync="dialogMemberVisible" width="930px" :before-close="handleClose" class="dialogMemberManage">
            <el-row>
                <el-button size="mini" type="primary" @click="memberExchangeCard(memberInfo)" :disabled="memberInfo.rechargeFlag == 'N'">换卡</el-button>
                <el-button size="mini" type="primary">补卡</el-button>
                <el-button size="mini" type="primary" @click="memberUpdatePasswordClick(memberInfo)" :disabled="memberInfo.rechargeFlag == 'N'">改密码</el-button>
                <el-button size="mini" type="primary"  @click="memberRechargeClick(memberInfo)"  :disabled="memberInfo.rechargeFlag == 'N'">充值</el-button>
                <el-button size="mini" type="primary" @click="memberIntegralExchangeClick(memberInfo)" :disabled="memberInfo.rechargeFlag == 'N'">积分增减</el-button>
                <el-button size="mini" type="primary">积分兑换</el-button>
                <el-button size="mini" type="primary" @click="memberRoomChangeClick(memberInfo)">积分换房</el-button>
                <el-button size="mini" type="primary">会员升级</el-button>
                <el-button size="mini" type="primary" @click="openLogout(memberInfo)">注销</el-button>
                <el-button size="mini" type="primary">挂失</el-button>
                <el-button size="mini" type="primary" @click="openPrint(memberInfo)">登记补打</el-button>
            </el-row>

              <!-- <div class="tabs-container" id="print-dailyreport">
          <div class="tavs-title">
            <div style="margin-left: 7px;text-align: left;">
              <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
            </div>
            <h3 style="text-align:center">会员登记单</h3>
          </div>
          <table
            width="100%"
            border="0"
            style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;"
            cellpadding="6"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th
                  colspan="2"
                  style="text-align: left;font-size: 14px;"
                >店铺：{{activeCompany.companyName}}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="width:25%;border: 1px solid #000;">会员卡号</td>
               <td style="width:25%;border: 1px solid #000;">{{item.name}}</td>
                
              </tr>
                <tr v-for="(item, index) in tableData" :key="index">
              <td style="width:25%;border: 1px solid #000;">会员姓名</td>
                <td style="width:25%;border: 1px solid #000;">{{item.day}}</td>
              </tr>
              <tr>
                <td style="width:25%;border: 1px solid #000;">本月累计</td>
                <td style="width:25%;border: 1px solid #000;">{{item.month}}</td>
              </tr>
              <tr>
                <td style="width:25%;border: 1px solid #000;">本年累计</td>
                <td style="width:25%;border: 1px solid #000;">{{item.year}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="text-align: left;font-size: 14px;">
                  打印人：
                  <span>{{userInfo.realName}}</span>
                </td>
                <td colspan="2" style="text-align: right;font-size: 14px;">
                  打印日期：
                  <span>{{datepickerTime}}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div> -->

            <el-tabs type="border-card" style="margin-top:10px;" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="MemberInfo">
                    <MemberInfo ref="MemberInfo" @callback="delCallback" />
                </el-tab-pane>
                <el-tab-pane label="充值明细" name="MemberRechargeTable">
                     <MemberRechargeTable ref="MemberRechargeTable" />
                </el-tab-pane>
                <el-tab-pane label="卡支付明细" name="0">

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
                <el-tab-pane label="积分兑换明细" name="2">

                </el-tab-pane>
                <el-tab-pane label="卡升级明细" name="3">

                </el-tab-pane>
                <el-tab-pane label="积分换房明细" name="MemberIntegralRoomChangeRecord">
                    <MemberIntegralRoomChangeRecord ref="MemberIntegralRoomChangeRecord"/>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <member-recharge ref="memberRechargeRefs" @callback="memberListData(form.pageNum)"></member-recharge>
        <MemberIntegralRoomChange ref="MemberIntegralRoomChange" />
        <member-integral-exchange ref="memberIntegralExchangeRefs" @callback="memberListData(form.pageNum)"></member-integral-exchange>
        <member-update-password ref="memberUpdatePasswordRefs" @callback="memberListData(form.pageNum)"></member-update-password>
        <member-exchange-card ref="memberExchangeCardRefs" @callback="memberListData(form.pageNum)"></member-exchange-card>
    </div>
</template>

<script>
import { getLodop } from "@/utils/lodop";
import MemberInfo from "./MemberInfo";
import MemberRecharge from "./MemberRecharge/MemberRecharge.vue"
import MemberIntegralExchange from "./MemberIntegral/MemberIntegralExchange.vue"
import MemberRechargeDetailDialog from "./MemberRecharge/MemberRechargeDetailDialog.vue"
import MemberIntegralDetailDialog from "./MemberIntegral/MemberIntegralDetailDialog.vue"
import MemberExchangeCardDetailDialog from "./MemberCardExchange/MemberExchangeCardDetailDialog.vue"
import MemberUpdatePassword from "./MemberUpdatePassword.vue"
import MemberConsumptionDetailDialog from "./MemberConsumption/MemberConsumptionDetailDialog.vue"
import MemberIntegralRoomChange from "./MemberIntegralRoomChange/MemberIntegralRoomChange.vue"
import MemberExchangeCard from "./MemberCardExchange/MemberExchangeCard.vue"
import MemberExchangeCardDetail from "./MemberCardExchange/MemberExchangeCardDetail.vue"
import MemberRechargeTable from "./MemberRecharge/MemberRechargeDetailTable.vue"
import  MemberConsumptionDetailTable from './MemberConsumption/MemberConsumptionDetailTable.vue'
import  MemberIntegralDetailTable from './MemberIntegral/MemberIntegralDetailTable.vue'
import  MemberIntegralRoomChangeRecord from './MemberIntegralRoomChange/MemberIntegralRoomChangeRecord.vue'
import {printMember,delMember} from '@/api/customerRelation/pmsMemberController'

export default {
    components: { MemberInfo, MemberRecharge,MemberIntegralExchange,MemberUpdatePassword,MemberExchangeCard, MemberRechargeDetailDialog, MemberIntegralDetailDialog, MemberConsumptionDetailDialog,MemberRechargeTable,MemberConsumptionDetailTable,MemberIntegralDetailTable,MemberExchangeCardDetail,MemberExchangeCardDetailDialog,MemberIntegralRoomChangeRecord,MemberIntegralRoomChange },
  data() {
    return {
      dialogMemberVisible: false,
      memberInfo: {}, //会员资料
      total: 0,
      activeName:"MemberInfo",
      // LODOP: null,
      // tableData: [],
      // datepickerTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  mounted() {
//       console.log(this.$refs)
//     this.activeName = this.$refs.checkTabs.panes[0].name
  },
  // created(){
  //   var test = window.localStorage.getItem("current_logon_company");
  //   this.activeCompany = JSON.parse(test);
  //   if (
  //     this.activeCompany.companyName == "" ||
  //     this.activeCompany.companyName == null ||
  //     this.activeCompany.companyName == undefined
  //   ) {
  //     this.activeCompany.companyName == "";
  //   }
  //   this.userInfo = JSON.parse(localStorage.getItem("pms_userinfo"));
  //   this.dailyReport();
  // },
  methods: {
    //  dailyReport() {
    //   printMember({memPk:memberInfo.memPk}).then(res => {
    //     console.log(res.data);
    //     this.tableData = res.data;
    //   });
    // },
      //登记补打印
       openPrint(memberInfo) {
        this.$confirm('是否要打印?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      // this.LODOP = getLodop();
      // if (!this.LODOP) {
      //   return;
      // }
      // this.LODOP.PRINT_INITA(0, 0, 794, 1123, "每日日报打印");
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1); // 显示背景
      // this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      // this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      // this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
      // this.LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1);
      // this.LODOP.ADD_PRINT_HTM(16,"1%","98%",1103,document.getElementById("print-dailyreport").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      // this.LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
      // this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 3);
      // this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      this.$message({
            type: 'success',
            message: '打印成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消打印'
          });          
        });
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
                      //this.listSearch()
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
    memberRoomChangeClick(memberInfo){
        this.$refs.MemberIntegralRoomChange.showDialog(memberInfo)
    },
     memberIntegralExchangeClick (row) {
        this.$refs.memberIntegralExchangeRefs.showDialog(row,false)
    },
    memberUpdatePasswordClick(row){
        this.$refs.memberUpdatePasswordRefs.showDialog(row,false)
    },
    memberExchangeCard(row){
        this.$refs.memberExchangeCardRefs.showDialog(row,false);
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


