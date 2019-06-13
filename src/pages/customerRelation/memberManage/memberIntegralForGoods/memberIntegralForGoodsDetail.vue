
<template>
  <div>
      <el-table
        :data="rows"
        :summary-method="getSummaries"
        show-summary
        border
        v-loading="loading"
        style="width: 100%"
        max-height="410px">
        <el-table-column prop="createTime" label="兑换时间"></el-table-column>
        <el-table-column prop="userIntegral" label="使用积分"></el-table-column>
        <el-table-column prop="giftName" label="兑换礼品/优惠卷" width="184"></el-table-column>
        <el-table-column prop="integralNumber" label="数量"></el-table-column>
        <el-table-column prop="integral" label="价值"></el-table-column>
        <el-table-column prop="userName" label="操作员"></el-table-column>
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
  </div>
</template>

<script>
import {listIntegralExchangeForGoods} from '@/api/atrialCenter/roomForwardStatus'

  export default {
    data () {
      return {
        loading: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          memPk: null,
        },
        rows: [],
        sum:0,
        total: 0,
      }
    },
    created(){
      this.listSearch();
    },
    methods: {
      init(id) {
        this.listSearch();
        this.queryParams.memPk = id

      },
      listSearch () {
        this.loading = true
        listIntegralExchangeForGoods(this.queryParams).then(res => {
          this.rows = res.data.list

          for(var i=0;i<this.rows.length;i++){
              this.sum+=this.rows[i].userIntegral;
          }
          this.total = parseInt(res.data.total)
        }).finally(() => {
          this.loading = false
        })
      },

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
          if (index == 1) {
            sums[index] = sums[index].toFixed(2);
            //给价格合计添加单位
            //sums[index] += ' 元';
          } else if (index == 5) {
            sums[index] = "N/A";
          }
          // sums[index] += ' 元';
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
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
    }
  }
</script>
