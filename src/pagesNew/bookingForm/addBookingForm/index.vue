<template>
  <section>
    <el-form :inline="true" size="mini" label-width="80px"  class="demo-form-inline">
        <el-col :span="24">
            <el-form-item label="入住类型:">
                <el-radio-group v-model="formInline.checkInType">
                    <el-radio :label="0">正常</el-radio>
                    <el-radio :label="1">团队</el-radio>
                    <el-radio :label="2">自用</el-radio>
                    <el-radio :label="3">免费</el-radio>
                    <el-radio :label="4">钟点</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="客户类型:">
                <el-radio-group v-model="formInline.customerType">
                    <el-radio :label="0">散客</el-radio>
                    <el-radio :label="1">会员</el-radio>
                    <el-radio :label="2">单位</el-radio>
                    <el-radio :label="3">中介</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-form-item label="计费规则:" v-show="formInline.checkInType == 4">
            <el-select v-model="value" placeholder="请选择"  style="width: 199px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="预抵日期:">
            <el-date-picker v-model="formInline.arrivalsDate" type="date" placeholder="选择日期" style="width: 110px;"></el-date-picker>
            <el-time-select v-model="formInline.arrivalsTime" :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }" placeholder="选择时间"  style="width: 85px;"></el-time-select>
        </el-form-item>
        <el-form-item label="入住天数:" v-show="formInline.checkInType != 4">
           <el-input-number size="mini" v-model="formInline.checkInDays" style="width: 199px;"></el-input-number>
        </el-form-item>
        <el-form-item label="预离日期:">
            <el-date-picker v-model="formInline.dueOutDate" type="date" placeholder="选择日期" style="width: 199px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="保留时间:">
            <el-date-picker v-model="formInline.arrivalsDate" type="date" placeholder="选择日期" style="width: 110px;"></el-date-picker>
            <el-time-select v-model="formInline.arrivalsTime" :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }" placeholder="选择时间"  style="width: 85px;"></el-time-select>
        </el-form-item>
        <el-form-item label="订单来源:">
            <channel-select ref="channelRef" v-model="formInline.channelTypePk" style="width: 199px;"/>
        </el-form-item>
        <el-form-item label="预订人:">
            <el-input v-model="formInline.userName" placeholder="请输入预订人" clearable style="width: 199px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
            <el-input v-model="formInline.userPhone" placeholder="请输入手机号" clearable style="width: 199px;"></el-input>
        </el-form-item>
        <el-form-item label="团名:" v-show="formInline.checkInType == 1">
            <el-input v-model="formInline.userName" placeholder="请输入团名" clearable style="width: 199px;"></el-input>
        </el-form-item>
        <el-form-item label="公付费用:" v-show="formInline.checkInType == 1">
            <channel-select ref="channelRef" v-model="formInline.channelTypePk" style="width: 199px;"/>
        </el-form-item>
        <el-form-item label="销售员:">
            <channel-select ref="channelRef" v-model="formInline.channelTypePk" style="width: 199px;"/>
        </el-form-item>
        <el-form-item label="外单号:">
            <el-input v-model="formInline.orderNo" placeholder="请输入外单号" clearable style="width: 199px;"></el-input>
        </el-form-item>
        <el-form-item label="订单备注:">
            <el-input v-model="formInline.orderNo" placeholder="请输入订单备注" clearable style="width: 493px;"></el-input>
        </el-form-item>
    </el-form>
    <el-row>
        <el-col :span="10" class="line">
            <el-table
                :data="tableData"
                height="500px"
                size="mini"
                style="width: 100%">
                <el-table-column
                    prop="column1"
                    label="房型">
                </el-table-column>
                <el-table-column
                    prop="column2"
                    label="房价">
                </el-table-column>
                <el-table-column
                    prop="column3"
                    label="可定数">
                </el-table-column>
                <el-table-column
                    prop="column4"
                    label="可超数">
                </el-table-column>
                <el-table-column
                    prop="column5"
                    label="入住间数">
                </el-table-column>
                <el-table-column
                    prop="column6"
                    label="已排房">
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="12" :offset="1" class="line">
            <el-table
                :data="tableData"
                height="500px"
                size="mini"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="column1"
                    label="房型">
                </el-table-column>
                <el-table-column
                    prop="column7"
                    label="房号">
                </el-table-column>
                <el-table-column
                    prop="column8"
                    label="房价">
                </el-table-column>
                <el-table-column
                    prop="column9"
                    label="早餐劵">
                </el-table-column>
                <el-table-column
                    prop="column10"
                    label="备注">
                </el-table-column>
                <!-- <el-table-column
                    prop="address"
                    label="操作">
                </el-table-column> -->
            </el-table>
        </el-col>
    </el-row>
    <el-col :span="24">
        
    </el-col>
  </section>
</template>
<script>
  import moment from 'moment'
  export default {
    components: {},
    data () {
      return {
        formInline: {
          //订单来源
          channelTypePk:'',
          // 入住类型
          checkInType: 0,
          //客户类型
          customerType: 0,
          //预抵日期
          arrivalsDate: moment(),
          //预抵时间
          arrivalsTime:'14:00',
          //入住天数
          checkInDays:1,
          //预离日期
          dueOutDate: moment().add(1, 'days'),
          //保留日期
          retentionDate: moment().add(1, 'days'),
          //保留时间
          retentionTime: '06:00',
        },
        tableData:[
            {
                column1:'商务房',
                column2:'200/300',
                column3:'50',
                column4:'10',
                column5:'1',
                column6:'0',
                column7:'未排房',
                column8:'200',
                column9:'2',
                column10:'',
            }
        ]
      }
    },
    created () {
      console.log(this);
    },
    watch: {
      filterText: function (value) {}
    },
    methods: {},
    mounted () {}
  }
</script>
<style scoped lang='scss'>
.el-form.demo-form-inline{
    .el-form-item--mini.el-form-item{
        margin-bottom: 15px
    }
}
.line{
    border: 1px solid #DCDFE6
}
</style>
