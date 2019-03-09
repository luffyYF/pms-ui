// 会员远期房价
// Created by Administrator on 2018-12-05T17:05:43.889.
<template>
  <section class="plan-list">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form class="seach-form" ref="listQuery" :inline="true" :model="listQuery" label-width="70px" size="mini" label-position="right">
            <el-form-item label="月份">
                <el-date-picker
                    v-model="listQuery.month"
                    type="month"
                    size="mini"
                    format="yyyy-MM-dd"
                    placeholder="月份"
                    :editable="false"
                    :clearable="false">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="会员类型">
                <el-select size="mini" style="width:100%;" v-model="listQuery.gradePk" placeholder="会员类型" clearable >
                    <el-option v-for="y in gradeList" :label="y.gradeName" :value="y.gradePk" :key="y.gradePk"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" v-if="queryPower" @click="listSearch()">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-setting" v-if="hasPerm('pms:memForwardPrice:batchSetting')" @click="settingClick()">批量设置价格</el-button>
            </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="btn-right">
        
      </el-col>
    </el-row>
    <el-row :gutter="24">
        <!-- @cell-click="cellClick" -->
      <el-table
        :data="rows"
        border
        class="forward-price-list noChange"
        @cell-dblclick="priceDblclick"
        max-height="550"
        :span-method="objectSpanMethod"
        :row-class-name="tableRowClassName"
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column v-for="(value,index) in headers" :prop="value.code" :fixed="index < 3" :label="formatDate(value.desc,'MM.DD')+value.week" :key="index" align="center" :min-width="index == 1 ? '150' : '100'">
          <template slot-scope="scope">
            <span class="cursor" v-if="pricePos[scope.row[value.code]]">
              {{pricePos[scope.row[value.code]].price}}
            </span>
            <span v-else>{{scope.row[value.code]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <span style="color:red;margin-left:12px;">温馨提醒:不设置价格时,客人入住时自动使用基础价,双击价格位置可以单个更改</span>
    </el-row>
    <!--添加、修改组件-->
    <MemberForwardPriceEdit ref="MemberForwardPriceEditRef" @callback="listSearch"/>
    <MemberForwardPriceSingleEdit ref="MemberForwardPriceSingleEditRef" @callback="listSearch"/>
    

  </section>
</template>
<script>
  import Moment from 'moment'
  import {listForwardPrice} from '@/api/systemSet/member/pmsMemberForwardPrice'
    import {listGrade} from '@/api/systemSet/member/pmsMemberIntegralRoomChangeRule'
  import MemberForwardPriceEdit from './MemberForwardPriceEdit'
  import MemberForwardPriceSingleEdit from './MemberForwardPriceSingleEdit'
  
    

  export default {
    components: { MemberForwardPriceEdit,MemberForwardPriceSingleEdit },
    data () {
      return {
        loading: false,
        rows: [],
        headers:[],
        pricePos:{},
        dateMap:{},
        listQuery: {
          gradePk: "",
          month: Moment().format("YYYY-MM-DD"),
        },
        gradeList:[],
        mergeLine:0,
        queryPower:this.hasPerm('pms:memForwardPrice:list'),
        singleSettingPower:this.hasPerm('pms:memForwardPrice:singleSet'),
      }
    },
    mounted () {
    //   this.findOaCompany()
    },
    methods: {
        init(){
            this.listSearch()
            this.listGrade()
        },
      listSearch () {
        if(!this.queryPower){
          this.$message({ type: 'warning', message: "权限不足" })
          return
        }
        this.listQuery.month = Moment(new Date(this.listQuery.month)).format("YYYY-MM-DD")
        this.loading = true
        listForwardPrice(this.listQuery).then(res => {
          if (res.code != 1) {
            this.rows = []
            this.headers = []
          } else {
            this.rows = res.data.tableData
            this.headers = res.data.header
            this.pricePos = res.data.pricePos
            this.dateMap = res.data.dateMap
            this.mergeLine = res.data.mergeLine
          }
        }).finally(() => {
          this.loading = false
        })
      },
      listGrade(){
        listGrade().then(result => {
            this.gradeList = [{gradeName:"全部",gradePk:""}]
            this.gradeList =  this.gradeList.concat(result.data)
        }).catch(() => {

        }).finally(()=>{
        })
      },
      formatDate(date,pt){
        if(date == "会员类型" || date == "房型" || date == "基础价"){
            return date;
        }
        date = new Date(date);
        return Moment(date).format(pt)
      },
      settingClick(){
        this.$refs.MemberForwardPriceEditRef.showDialog()
      },
      priceDblclick(row, column, cell, event){
        if(column.property != undefined && column.property.indexOf('column')!=-1 && this.singleSettingPower){
            var pricePo = this.pricePos[row[column.property]]
            var data = {
                gradeName:row.gradeName,
                roomTypeName:row.roomTypeName,
                pricePk:pricePo == null?"000":pricePo.pricePk,
                gradePk:row.gradePk,
                roomTypePk:row.roomTypePk,
                date:this.dateMap[column.property],
                price:pricePo == null?0:pricePo.price
            }
            this.$refs.MemberForwardPriceSingleEditRef.showDialog(data)
            console.log(JSON.stringify(data))
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % this.mergeLine === 0) {
            return {
              rowspan: this.mergeLine,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 == 0) {
          return 'warning-double';
        } else {
          return 'success-single';
        }
        return '';
      }
    }
  }
</script>

<style>
.plan-list .seach-form .el-form-item{
  margin-bottom: 0px !important;
}
.forward-price-list .warning-double {
    background: white;
  }

.forward-price-list .success-single {
    background: #f5f7fa;
}
</style>
<style scoped>
.cursor{
    cursor: pointer;
}
.plan-list {
  /* padding: 20px 20px 0 20px; */
}
.btn-right {
  text-align: right;
}
.forward-price-list {
  width: calc(100% - 24px);
  /* min-height: 250px; */
  margin: 10px 12px;
}
.forward-price-list {
  border: 1px solid #ddd;
}
.dropdown-list {
  margin: 20px 12px 0 12px;
  height: 40px;
  line-height: 40px;
  background: #f4f6f9;
  border: 1px solid #dddddd;
  border-bottom: 0;
}
.noChange{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
</style>