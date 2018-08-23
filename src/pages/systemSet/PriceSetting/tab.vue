<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">房型价格设置</h5>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px auto;">
        <el-table-column prop="typeName" label="名称" align="center" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="initPrice(scope.row.typePk)">初始化价格设置</el-button>
            <el-button type="primary" size="mini" @click="toPriceCalendar(scope.row.typePk)">每日价格设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 初始化价格 -->
    <initPrice ref="initPriceRef"></initPrice>
    <priceCalendar ref="priceCalendarRef" ></priceCalendar>
  </div>
</template>

<script>
  import { listType } from '@/api/utils/pmsTypeController'
  import initPrice from './initPrice'
  import priceCalendar from './priceCalendar'
  export default {
    components: { initPrice,priceCalendar },
    data() {
      return {
        tableData: [],
        loading:false,
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init() {
        this.listRoomType()
      },
      listRoomType(){
        const self = this
        this.loading = true;
        listType({typeMaster: 'ROOM_TYPE'}).then(result => {
          self.tableData = result.data.data;
          self.loading = false
        }).catch(() => {
          self.loading = false
        })
      },
      //打开初始化价格设置
      initPrice(typePk) {
        this.$refs.initPriceRef.init(typePk)
      },
      //打开每日价格设置
      toPriceCalendar(typePk) {
        this.$refs.priceCalendarRef.init(typePk)
      }
    }
  }
</script> 

<style scoped>
.el-input{
  width: 80px;
}
.el-Name{
  width: 120px;
}
.el-select{
  width: 80px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding-top: 18px;
  width: 98%;
  margin:10px auto;
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
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
