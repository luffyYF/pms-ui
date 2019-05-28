<template>
  <div>
      <div class="tip_box">
        <p>注：这里统计的消费与结算为上一次上缴时间(2018-03-01 19:24:53)到当前时间(2018-03-14 22:59:28)的数据 </p>
        <p>净现金 = 现金 + 人民币押金 - 现金支出 + 现金充值</p>
        <p>银行卡 = 银行卡 + 银行卡押金 -银行卡支出 + 银行卡充值</p>
        <p>其它项 = 除了净现金、银行卡外的其它结收入</p>
      </div>
      <div class="clearfix">
        <el-table
            :data="tableData"
            border
            show-summary
            class="fl"
            style="width: 300px;">
            <el-table-column
            prop="name"
            label="消费统计"
            width="150">
            </el-table-column>
            <el-table-column
            prop="money"
            label="2132450.0"
            width="150">
            </el-table-column>
        </el-table>
        <el-table
            :data="tableData1"
            border
            class="fl"
            show-summary
            style="width: 300px;margin-left:20px;">
            <el-table-column
            prop="name"
            label="结算统计"
            width="150">
            </el-table-column>
            <el-table-column
            prop="money"
            label="154784.0"
            width="150">
            </el-table-column>
        </el-table>
        <div class="fl" style="margin-left:20px;">
            <div class="div_table">
                <p style="font-size:14px; font-weight:600;color:#909399">数据汇总</p>
                <p>上期消费结存：0.00 上期结算结存：0.00</p>
                <p>
                    上期钱柜结存：189868.50 = 净现金(196992.00) + 银行卡(-18110.00) + 其它(10986.50)<br />
                    当前钱柜金额：324662.50 = 净现金(296941.00) + 银行卡(16535.00) + 其它(11186.50)
                </p>
                <p>
                    0.00(会员充值) = 0.00(现金充值) + 0.00(银行卡充值)
                </p>
            </div>
            <div>
                <p>
                    当前钱柜净现金：<span class="tip">297141.00</span>
                    上缴净现金：<el-input style="width:100px;" size="mini" placeholder="请输入内容" value="0.00"></el-input>
                    钱柜净现金余额：<span class="tip">297141.00</span>
                </p>
                <p>
                    当前钱柜银行卡：<span class="tip">16535.00</span>
                    上缴银行卡：<el-input style="width:100px;" size="mini" placeholder="请输入内容" value="0.00"></el-input>
                    钱柜银行卡余额：<span class="tip">16535.00</span>
                </p>
                <p>
                    当前钱柜其他项：<span class="tip">11186.00</span>
                    上缴其他项：<el-input style="width:100px;" size="mini" placeholder="请输入内容" value="0.00"></el-input>
                    钱柜净其他项余额：<span class="tip">11186.00</span>
                </p>
                <p>
                    备注信息：
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="textarea3">
                    </el-input>
                </p>
                <p style="text-align:center">
                    <el-button type="primary">上缴</el-button>
                </p>
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
    data(){
        return {
            textarea3: '',
            tableData: [{
                name: '夜核房费',
                money: '1000'
            }, {
                name: '全天日租',
                money: '245'
            }, {
                name: '电话费',
                money: '7842'
            }, {
                name: '商品',
                money: '1000'
            },{
                name: '会员卡费',
                money: '500'
            },{
                name: '外借租金',
                money: '8457'
            },{
                name: '会议费',
                money: '500'
            },{
                name: '夜宵券',
                money: '7545'
            }],
            tableData1: [{
                name: '现金',
                money: '1000'
            }, {
                name: '银行卡',
                money: '245'
            }, {
                name: '现金支出',
                money: '7842'
            }, {
                name: '支票',
                money: '1000'
            },{
                name: '人民币押金',
                money: '500'
            }]
        }
        
    }
};
</script>

<style scope>
.tip_box {
    padding: 10px;
    margin-bottom: 20px;
    background: #fdf7f7;
}
.tip_box p {
    margin: 0;
}
.tip {
    color: red;
    font-weight: 600;
    font-size: 16px;
    padding: 0 5px;
}
.clearfix:after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  content: ".";
}
.fl {
  float: left;
  display: block;
}
.fr {
  float: right;
  display: block;
}
.div_table {
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
}
.div_table p {
    padding:0 10px;
    line-height: 47px;
    margin: 0;
    border-bottom: 1px solid #ebeef5;
}
</style>
