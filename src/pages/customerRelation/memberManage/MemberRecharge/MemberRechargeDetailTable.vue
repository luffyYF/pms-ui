// 会员充值明细列表
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
        <el-table
            :data="rows"
            :summary-method="getSummaries"
            show-summary
            border
            v-loading="loading"
            style="width: 100%"
            max-height="410px">
            <el-table-column prop="createTime" label="充值时间" width="184"></el-table-column>
            <el-table-column prop="moneyAmount" label="充值金额">
            <template slot-scope="scope">
                {{scope.row.moneyAmount|toMoney}}
            </template>
            </el-table-column>
            <el-table-column prop="type" label="充值类型">
            <template slot-scope="scope">
                <span v-if="scope.row.type == 0">现金充值</span>
                <span v-else-if="scope.row.type == 1">银行卡充值</span>
                <span v-else-if="scope.row.type == 2">支付宝充值</span>
                <span v-else-if="scope.row.type == 3">微信充值</span>
                <span v-else>充值赠送</span>
            </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <el-pagination
        style="margin: 10px 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </section>
</template>

<script>
import { listMemberLog } from '@/api/customerRelation/pmsMemberLogController'

  export default {
    data () {
      return {
        dialogVisible: false,
				loading: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          memPk: null,
          type: null,
        },
        rows: [],
        total: 0,
      }
    },
    methods: {
      init (id, type) {
        this.queryParams.memPk = id
        this.queryParams.type = type
        this.dialogVisible = true
        this.listSearch()
      },
      listSearch () {
        this.loading = false
        listMemberLog(this.queryParams).then(res => {
          this.rows = res.data.list
          this.total = parseInt(res.data.total)
        }).finally(() => {
          this.loading = false
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.queryParams.pageSize = val
        this.listSearch()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.queryParams.pageNum = val
        this.listSearch()
      },
    },

    //计算总和
        //计算总和
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index == 6) {
            sums[index] = sums[index].toFixed(2);
            //给价格合计添加单位
            //sums[index] += ' 元';
          } else if (index == 7) {
            sums[index] = "N/A";
          }
          // sums[index] += ' 元';
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },
    filters: {
      toMoney: function(num) {
        if(num){
          if(isNaN(num)) {
            alert("金额中含有不能识别的字符");
            return;
          }
          num = typeof num == "string"?parseFloat(num):num//判断是否是字符串如果是字符串转成数字
          num = num.toFixed(2);//保留两位
          num = parseFloat(num);//转成数字
          num = num.toLocaleString();//转成金额显示模式
          //判断是否有小数
          if(num.indexOf(".")==-1){
              num = num+".00";
          }else{
              num = num.split(".")[1].length<2?num+"0":num;
          }
          return num;//返回的是字符串23,245.12保留2位小数
        } else {
          return num = 0;
        }
      }
    }
  }
</script>
