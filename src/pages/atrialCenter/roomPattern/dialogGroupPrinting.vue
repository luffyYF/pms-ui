<template>
  <div>
      <el-dialog class="pattern-dialog" title="团会打印" :visible.sync="dialogGroupPrinting" width="60%" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <el-col :span="24"><el-button type="primary" @click="onSubmit"  size="mini">打印</el-button></el-col>
        <div class="print-content">
          <table border="1" style="border: 0">
            <tr>
              <td width="150px;">
                <sapn>单位名称(corp.):</sapn>
              </td>
              <td><span>旅游团</span></td>	
              <td>
                <sapn>到日(Arr):</sapn>
              </td>
              <td><span>2017-07-06 15:00</span></td>
            </tr>
            <tr>
              <td>
                <sapn>房号(Room No.):</sapn>
              </td>
              <td><span>301 302 303 304 305 306 307 308 309 310 311 312</span></td>	
              <td>
                <sapn>离日(Dep):</sapn>
              </td>
              <td><span>2018-03-05 15:30</span></td>
            </tr>
            <tr>
              <td>
                <sapn>房价(Room Rate):</sapn>
              </td>
              <td><span>450.0 500.0 500.0 500.0 500.0 500.0</span></td>	
              <td>
                <sapn>人数(Pax):</sapn>
              </td>
              <td><span>2</span></td>
            </tr>
            <tr>
              <td colspan="2"><sapn>项目</sapn></td>
              <td><span>消费</span></td>	
              <td><sapn>结算</sapn></td>
            </tr>
            <tr> 
              <td colspan="2"><sapn>银行卡支出</sapn></td>
              <td><span>0.00</span></td>	
              <td><sapn>-12000.00</sapn></td>
            </tr>
            <tr>
              <td colspan="2"><sapn>夜核房费</sapn></td>
              <td><span>5700.00</span></td>	
              <td><sapn>0.00</sapn></td>
            </tr>
            <tr>
              <td colspan="2"><sapn>会议费</sapn></td>
              <td><span>9.00</span></td>			
              <td><sapn>0.00</sapn></td>
            </tr>
            <tr>
              <td colspan="4">
                <p><strong>消费金额(Debit): 5,709.00	</strong></p>
                <p><strong>结算金额(Credit): - 12,000.00</strong></p>
                <p><strong>余额(Balance): 17,709.00		</strong></p>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p>备注</p>
                <p>我同意支付以上费用<span style="margin-left: 50px">客人签名</span></p>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p>操作员：深圳前海豪斯菲尔</p>
              </td>
            </tr>
          </table>
          
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