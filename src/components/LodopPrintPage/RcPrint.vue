<template>
  <el-dialog
    title="打印RC单"
    :visible.sync="dialogVisible"
    width="900px"
    :before-close="handleClose">
    <el-button size="mini" type="primary" @click="printPreview">打印预览</el-button>
    <el-button size="mini" type="primary" @click="print" :loading="loading">直接打印</el-button>
     <el-checkbox label="隐藏" name="type" v-model="eleMode"></el-checkbox>

    <div id="printarea" style="width: 100%;margin: 0 auto;">
        <!-- 1f65ad -->
        <div v-if="eleMode" style="height:45px"></div>
        <div v-else style="padding: 22px 0px 5px 0px; text-align:center;position: relative;">
          <div style="position: absolute;top: 6px;left: 11px;">
            <img src="@/assets/image/hsgl-logo.png" width="250px">
          </div>
          <span style="font-size: 14px; font-family: 宋体;color:#505050;">入住登记表 </span>
          <span style="font-size: 12px; font-family: Helvetica;color:#505050;">Registration Form</span>
        </div>
        <div style="text-align:right;color:#505050;"></div>
        <table style="border-collapse:collapse;text-align: left;font-family: 宋体;font-size: 13px;margin:0 auto;color:#505050;" :bordercolor="eleMode?'#ffffff':'#505050'" border="1"  width="100%" cellpadding="1" cellspacing="0" >
            <tr>
                <td width="16%">
                  <span v-if="eleMode"><br><br><br></span>
                  <span v-else>房间号码<br>Room No</span>
                </td>
                <td width="17%" style="color: black">{{dataObj.roomNumber}}</td>
                <td width="15%">
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>姓名<br>Surname and Name</span>

                </td>
                <td width="12%" style="color: black">{{dataObj.guestName}}</td>
                <td width="18%">
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>房价<br>Room Rate</span>
                </td>
                <td width="18%" style="color: black">{{ dataObj.currPrice.toFixed(2)}}</td>
            </tr>
            <tr>
                <td>
                  <span v-if="eleMode"><br><br></span>
                  <span v-else>到店日期<br>Arrived Date</span>
                </td>
                <td style="color: black">{{dataObj.beginDate}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>出生日期<br>Date of Birth</span>
                </td>
                <td style="color: black">{{dataObj.birthday}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>护照号码/身份证号码<br>Passport/ID No.</span>
                </td>
                <td style="color: black">{{dataObj.certificateNo}}</td>
            </tr>
            <tr>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>离店日期<br>Departure Date</span>
                </td>
                <td style="color: black">{{dataObj.endDate}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>地址<br>Address</span>
                </td>
                <td colspan="3" style="color: black">{{dataObj.address}}</td>
            </tr>
            <tr>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>会员号码<br>Member No</span>
                </td>
                <td style="color: black">{{dataObj.cardNumber}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>电话号码<br>Tel No</span>
                </td>
                <td style="color: black">{{dataObj.guestPhone}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>公司<br>Company</span>
                </td>
                <td style="color: black"></td>
            </tr>
            <tr>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>国籍<br>Nationality</span>
                </td>
                <td style="color: black">{{dataObj.nationality}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>签证类型<br>Visa Type</span>
                </td>
                <td style="color: black"></td>
                <td>
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>签证有效期(日/月/年)<br>Visa Expiry Date</span>
                </td>
                <td style="color: black"></td>
            </tr>
            <tr>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>房间类型<br>Room Type</span>
                </td>
                <td style="color: black">{{dataObj.roomTypeName}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;</span>
                  <span v-else>联房房间<br>Link Room</span>
                </td>
                <td colspan="3" style="color: black;">
                  <div style="word-break: break-all;">
                    {{dataObj.linkRoom}}
                  </div>
                </td>
            </tr>
            <tr>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>预收押金<br>Advanced Deposit</span>
                </td>
                <td style="color: black">{{dataObj.settlementAmount.toFixed(2)}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>餐券<br>MealTicket</span>
                </td>
                <td style="color: black">早{{dataObj.mealTicketMorn}}中{{dataObj.mealTicketNoon}}晚{{dataObj.mealTicketNight}}</td>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>预授权<br>PreAuth</span>
                </td>
                <td style="color: black"></td>
            </tr>
            <tr>
                <td>
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>备注<br>Remarks</span>
                </td>
                <td colspan="5" style="color: black">
                  <div style="word-break: break-all;">{{dataObj.remark}}</div>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                  <span v-if="eleMode">&nbsp;<br><br></span>
                  <span v-else>
                  结账方式My accounts will be settled by:<br>
                    <span v-for="(v,k) in paymentMap" style="margin-right:13px;">
                        <!--功能暂时废 <span style="font-size:23px;color:black" v-if="dataObj.payment==k">■</span> -->
                        <!-- v-else -->
                        <span style="font-size:18px;font-family:微软雅黑">□</span>
                        {{v}}
                    </span>
                  </span>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                  <span v-if="eleMode"><br><br><br><br><br><br><br><br></span>
                  <span v-else>
                    尊敬的客人，请您注意以下几点：<br>
                    1、退房时间为12:00<br>
                    2、贵重物品请寄存总台保管<br>
                    3、请您在离开酒店前将您的账目结清<br>
                    4、如果您在离开酒店后还有未结清的消费，酒店有权对您的信用卡进行追账。<br>
                    5、如果您或您的客人对房间及房间内设备造成损坏或遗失，您有责任为此作出赔偿。<br>
                    <br>
                    <br>
                  </span>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                  <span v-if="eleMode"><br><br></span>
                  <span v-else>
                  无论是否有其他任何的付款指示，本人在此承担本人账单的一切帐项。<br>
                  Regardless of charge instructions, I hereby acknowledge that I am personally undertake the payment of my statement of accounts.
                  </span>
                </td>
                <td colspan="2">
                  <span v-if="eleMode"><br><br></span>
                  <span v-else>
                    客人签名<br>Guest Signature
                  </span>
                </td>
                <!-- <td>入店<br>Check in</td> -->
            </tr>
        </table>
    </div>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button size="mini" @click="handleClose">关闭</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import { getLodop } from '@/utils/lodop'
import { rcprint } from '@/api/print'
export default {
  data() {
    return {
      dialogVisible: false,
      eleMode:false,
      loading:false,
      shopName: null,
      dataObj:{
        currPrice:0,
        settlementAmount:0,
      },
      styleObject:{
        opacity:0
      },
      paymentMap: {
        0: '现金',
        1: '微信',
        2: '支付宝',
        3: '银行卡',
        4: '预授权',
        5: 'AR帐',
        6: '支票',
        7: '汇款',
        8: 'POS机'
      },
      LODOP: null
    }
  },
  // mounted() {
  //   this.init();
  // },
  methods: {
    showDialog(guestOrderPk,shopName) {
      this.dialogVisible=true
      this.eleMode = false
      this.shopName = shopName
      rcprint({guestOrderPk: guestOrderPk}).then(result => {
        this.dataObj = result.data;
      });

    },
    handleClose() {
      this.dialogVisible=false
    },
    //直接打印
    print() {
      this.loading = true
      setTimeout(()=>{
        this.loading = false
      },3000)
      this.createOneFormPage();
      if (this.LODOP) {
        this.LODOP.PRINT();
      }
    },
    //打印预览
    printPreview() {
      this.createOneFormPage();	
      if (this.LODOP) {
        this.LODOP.PREVIEW();
      }
    },
    createOneFormPage() {
      this.LODOP=getLodop();
      if (!this.LODOP) {
        return
      }
      this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(2,0,0,"A5");//2指定横向打印，指定A5纸，
      this.LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题
      this.LODOP.ADD_PRINT_HTM(6,10,750,650,document.getElementById("printarea").innerHTML);
    }
  },
}
</script>

<style scoped>
</style>