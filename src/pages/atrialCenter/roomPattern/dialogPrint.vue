<template>
  <div>
      <el-dialog class="pattern-dialog" title="打印" :visible.sync="dialogPrint" width="80%" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <el-col :span="24"><el-button type="primary" @click="onSubmit"  size="mini">打印</el-button></el-col>
        <div class="print-content">
          <p style="text-align: center;"><strong>深圳市前海豪斯菲尔信息科技有限公司</strong></p>
          <p style="text-align: center;">临时住宿登记表 Registration Form</p>
          <table border="1" style="border: 0">
            <tr>
              <td width="150px;">
                <span>姓名</span><br/>
                <span>Surname and Name</span>
              </td>
              <td><span>陆少游</span></td>	
              <td>
                <span>国籍</span><br/>
                <span>Nationality</span>
              </td>
              <td><span>中国大陆</span></td>
              <td>
                <span>公司</span><br/>
                <span>Company</span>
              </td>
              <td><span>珠海豪斯菲尔</span></td>
            </tr>
            <tr>
              <td>
                <span>到店日期</span><br/>
                <span>Arrived Date</span>
              </td>
              <td><span>2018-02-27 10:32:51</span></td>	
              <td>
                <span>出生日期</span><br/>
                <span>Date of Birth</span>
              </td>
              <td><span>7-23</span></td>
              <td>
                <span>护照号码/身份证号码</span><br/>
                <span>Passport/ID No.</span>
              </td>
              <td><span></span></td>
            </tr>
            <tr>
              <td>
                <span>离店日期</span><br/>
                <span>Departure Date</span>
              </td>
              <td><span>2018-02-27 10:32:51</span></td>	
              <td>
                <span>签证类型</span><br/>
                <span>Visa Type</span>
              </td>
              <td><span></span></td>
              <td>
                <span>签证有效期(日/月/年)</span><br/>
                <span>Visa Expiry Date</span>
              </td>
              <td><span></span></td>
            </tr>
            <tr>
              <td>
                <span>会员号码</span><br/>
                <span>Member No</span>
              </td>
              <td><span>普通客人</span></td>	
              <td>
                <span>客人人数</span><br/>
                <span>No of Guests</span>
              </td>
              <td><span>2</span></td>
              <td>
                <span>地址</span><br/>
                <span>Address</span>
              </td>
              <td><span></span></td>
            </tr>
            <tr>
              <td>
                <span>房间类型</span><br/>
                <span>Room Type</span>
              </td>
              <td><span>浪漫公寓</span></td>	
              <td>
                <span>房间号码</span><br/>
                <span>Room No</span>
              </td>
              <td><span>203</span></td>
              <td>
                <span>房价</span><br/>
                <span>Room Rate</span>
              </td>
              <td><span>500.00</span></td>
            </tr>
            <tr>
              <td>
                <span>预收押金</span><br/>
                <span>Advanced Deposit</span>
              </td>
              <td><span>0.00</span></td>	
              <td>
                <span>(餐券）</span><br/>
                <span>MealTicket</span>
              </td>
              <td><span>早0中0晚0</span></td>
              <td>
                <span>预授权</span><br/>
                <span>PreAuth</span>
              </td>
              <td><span>500.00</span></td>
            </tr>
            <tr>
              <td>
                <span>(备注）</span><br/>
                <span>Remarks</span>
              </td>
              <td colspan="5">
                <span></span>
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <span>结账方式 My accounts will be settled by:</span>
              </td>
            </tr>
            <tr>
              <td><span><span class="print-sign color000"></span>现金Cash</span></td>
              <td><span><span class="print-sign"></span>支票Check</span></td>
              <td><span><span class="print-sign"></span>信用卡Creditcard</span></td>
              <td><span><span class="print-sign"></span>借记卡Debitcard</span></td>
              <td><span><span class="print-sign"></span>签单转账Onaccount</span></td>
              <td><span><span class="print-sign"></span>银行转账Banktrans</span></td>
            </tr>
            <tr>
              <td colspan="6">
                <p>尊敬的客人，请您注意以下几点：</p>
                <p>1、退房时间为12:00</p>
                <p>2、贵重物品请寄存总台保管</p>
                <p>3、请您在离开酒店前将您的账目结清</p>
                <p>4、如果您在离开酒店后还有未结清的消费，酒店有权对您的信用卡进行追账。</p>
                <p>5、如果您或您的客人对房间及房间内设备造成损坏或遗失，您有责任为此作出赔偿。</p>
                <p>如果您认可以上注意事项，请您在下面签字.</p>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <span>无论是否有其他任何的付款指示，本人在此承担本人账单的一切帐项。</span><br/>
                <span>Regardless of charge instructions, I hereby acknowledge that I am personally undertake the payment of my statement of accounts.</span>
              </td>
              <td>
                <span>客人签名</span><br/>
                <span>Guest Signature</span>
              </td>
              <td>
                <span>入店</span><br/>
                <span>Check in</span>
              </td>
            </tr>
          </table>
          <p>
            <span style="margin-right: 20px;">打印人：	深圳前海豪斯菲尔</span>
            <span>打印日期：	2018-03-05 14:23:25</span>
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>

