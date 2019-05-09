<template>
  <el-dialog
    title="订单详情"
    :visible.sync="dialogVisible"
    width="600px"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <table class="order-detail-table" border="0" cellspacing="0" cellpadding="4" style="width:550px;border-collapse:collapse;border-color: #ffffff5e;" >
      <tbody>
        <tr><th></th><td></td></tr>
        <tr>
          <th>订单号</th>
          <td>{{data.orderNo}}</td>
        </tr>
        <tr>
          <th>订单状态</th>
          <td>{{reserveOrderStatusMap[data.orderStatus]}}</td>
        </tr>
        <tr><th></th><td></td></tr>
      </tbody>

      <tbody>
        <tr><th></th><td></td></tr>
        <tr>
          <th>房型名称</th><td>{{data.roomTypeName}}</td>
        </tr>
        <tr>
          <th>入离日期</th><td>{{data.beginDate}} 至 {{data.endDate}} 共{{moment(data.endDate).diff(moment(data.beginDate), 'days')}}晚</td>
        </tr>
        <tr>
          <th>房间数</th><td>{{data.rentCount}}间</td>
        </tr>
        <tr>
          <th>取消规则</th><td>可取消</td>
        </tr>
        <tr>
          <th>购买时间</th><td>{{data.createTime}}</td>
        </tr>
        <tr>
          <th>购买平台</th><td> 美团网</td>
        </tr>
        <tr><th></th><td></td></tr>
      </tbody>

      <tbody>
        <tr><th></th><td></td></tr>
        <tr>
          <th>第三方交易号</th>
          <td>{{data.thirdTradeNo}}</td>
        </tr>
        <tr>
          <th>支付平台</th>
          <td v-if="data.paymentPlatform=='WECHAT'">微信支付</td>
          <td v-else-if="data.paymentPlatform=='ALIPAY'">支付宝支付</td>
          <td v-else>无</td>
        </tr>
        <tr>
          <th>总支付金额</th>
          <td>{{data.paymentPrice | currency('￥')}}</td>
        </tr>
        <tr>
          <th>订单总价</th>
          <td>{{data.totalPrice | currency('￥')}}</td>
        </tr>
        <tr>
          <th>原房价</th>
          <td>{{data.oldTotalPrice | currency('￥')}}</td>
        </tr>
        <tr>
          <th>优惠券</th>
          <td>{{data.couponPrice | currency('￥')}}</td>
        </tr>
        <tr>
          <th>折扣（1-10）</th>
          <td>{{data.discount}}</td>
        </tr>
        <tr><th></th><td></td></tr>
      </tbody>

      <tbody>
        <tr><th></th><td></td></tr>
        <tr>
          <th>入住人</th>
          <td>{{data.userName}}</td>
        </tr>
        <tr>
          <th>联系电话</th>
          <td>{{data.userPhone}}</td>
        </tr>
        <tr>
          <th>订单备注</th>
          <td>{{data.remark}}</td>
        </tr>
        <tr>
          <th>个性化服务</th>
          <td>{{data.personalization}}</td>
        </tr>
        <tr><th></th><td></td></tr>
      </tbody>

    </table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="mini">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import {currency} from '@/utils'
import {reserveOrderStatusMap} from '@/utils/orm'
import {orderDetail} from "@/api/order/pmsReserveOrderController"

export default {
  data() {
    return {
      dialogVisible:false,
      moment:moment,
      reserveOrderStatusMap: reserveOrderStatusMap,
      data:{},
    }
  },
  filters: {
    currency:currency
  },
  methods: {
    showDialog(orderPk){
      this.dialogVisible=true
      orderDetail({orderPk:orderPk}).then(res=>{
        this.data = res.data
      })
    },
    handleClose() {
      this.data = {}
      this.dialogVisible = false
    },
  }
}
</script>

<style scoped>
.order-detail-table > tbody {
  border: 1px solid #eee;
  /* line-height: 10px; */

}
.order-detail-table > tbody > tr > th{
  border-right: 1px solid #eee;
  width:141px;
  padding-right: 8px;
  background: #f9f9f9;
  text-align: right;
}
.order-detail-table > tbody > tr > td{
  padding-left: 8px;
}
</style>
