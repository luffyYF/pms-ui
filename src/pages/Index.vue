<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-row>
            <el-col :span="24"><b>经营数据</b>
              <!--<small>每天整点更新</small>-->
            </el-col>
          </el-row>
          <el-row class="index-el-row">
            <el-col :span="$store.getters.shopId ? 12:8">
              <span class="index-price">{{indexData.dayOrderNum}}</span><br>
              今日订单量
            </el-col>
            <el-col :span="$store.getters.shopId ? 12:8">
              <span class="index-price">{{indexData.dayTotalPrice}}</span><br>
              今日营业额
            </el-col>
            <el-col :span="8" v-if="!$store.getters.shopId">
              <span class="index-price">{{indexData.dayAddMemNum}}</span><br>
              今日新增粉丝
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <b>排行榜</b>
    </el-row>
    <el-row gutter="20" style="margin: 0 5px">
      <el-col :span="12">
        <b style="line-height: 30px">商品销售（个）</b>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>菜单</span>
            <span style="float: right; padding: 3px 0">昨日</span>
          </div>
          <div class="index-card">
            <div v-if="indexData.goodsList && indexData.goodsList.length > 0">
              <template>
                <el-table max-height="300" :data="indexData.goodsList">
                  <el-table-column prop="goodsName" label="商品名" min-width="160"/>
                  <el-table-column prop="goodsPrice" label="销售额" min-width="160"/>
                  <el-table-column prop="goodsNum" label="销售量"/>
                </el-table>
              </template>
            </div>
            <div v-else style="text-align: center; line-height: 300px">
              暂无数据
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <b style="line-height: 30px">会员消费额(元)</b>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>昵称</span>
            <span style="float: right; padding: 3px 0">昨日</span>
          </div>
          <div class="index-card">
            <div v-if="indexData.memberList && indexData.memberList.length > 0">
              <template>
                <el-table max-height="300" :data="indexData.memberList">
                  <el-table-column prop="memberName" label="会员昵称"/>
                  <el-table-column prop="memberPrice" label="消费金额"/>
                </el-table>
              </template>
            </div>
            <div v-else style="text-align: center; line-height: 300px">
              暂无数据
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getIndexStatistics} from '../api/index'

  export default {
    data () {
      return {
        indexData: {}
      }
    },
    methods: {
      statisticsData () {
        getIndexStatistics().then(res => {
          this.indexData = new IndexData(res.data)
        })
      }
    },
    mounted () {
      // this.statisticsData()
    }
  }

  class IndexData {
    constructor (obj) {
      this.dayOrderNum = obj.dayOrderNum
      this.dayTotalPrice = obj.dayTotalPrice
      this.dayAddMemNum = obj.dayAddMemNum
      this.goodsList = obj.goodsList
      this.memberList = obj.memberList
    }
  }
</script>

<style scope>
  .el-row {
    margin-bottom: 20px;
  }
  .index-el-row {
    text-align: center;
  }
  .index-price {
    color: #3a8ee6;
    font-size: 30px;
    line-height: 50px;
  }
  .index-card {
    height: 300px;
  }
</style>
