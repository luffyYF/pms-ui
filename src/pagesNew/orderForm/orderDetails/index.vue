<template>
    <el-container>
        <el-aside width="220px">
            <div class="operation">
                <div class="title">普通订单列表（1）</div>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="1">预定(0)</el-checkbox>
                    <el-checkbox label="2">预离(0)</el-checkbox>
                    <el-checkbox label="3">离店(0)</el-checkbox>
                </el-checkbox-group>
            </div>
            <el-menu
                :default-active="menuInfo.defaultActive"
                class="el-menu-vertical-demo"
                @select='menuSelect'
                active-text-color="#fff">
                <el-menu-item index="1">
                    <span slot="title">订单信息（普通）</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">114145(394)余额:100</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <span slot="title">114145(394)余额:100</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <span slot="title">114145(394)余额:100</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">114145(394)余额:100</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <information v-if="menuInfo.defaultActive == 1"></information>
            <booking v-if="menuInfo.defaultActive != 1"></booking>
        </el-main>
    </el-container>
</template>
<script>
  import moment from 'moment'
  import information from './information/index'
  import booking from './booking'
  export default {
    components: {booking,information},
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
        checkList:[],
        menuInfo:{
            defaultActive:'1',
        }
      }
    },
    created () {
      console.log(this);
    },
    watch: {
      filterText: function (value) {}
    },
    methods: {
        menuSelect(index){
            console.log(index);
            this.$set(this.menuInfo,"defaultActive",index)
        }
    },
    mounted () {}
  }
</script>
<style scoped lang='scss'>
.el-aside{
    height: 100%;
    border-right: solid 1px #e6e6e6;
    font-size: 12px;
    .operation{
        .title{
            padding: 10px;
            background-color: #f0f0f0;
        }
        .el-checkbox-group{
            padding: 10px;
            .el-checkbox{
                margin-right: 15px;
                margin-bottom: 10px;
            }
        }
    }
    
    .el-menu{
        border-right: 0;
        .el-menu-item{
            font-size: 12px;
            border-top: 1px solid  #e6e6e6;
            height: 45px;
            line-height: 40px;
            padding-left: 40px;
            &:first-child{
                padding-left: 20px;
            }
            &:last-child{
                border-bottom: 1px solid  #e6e6e6;
            }
            &:hover{
                background-color: #21324E;
                color: #fff;
            }
            &.is-active{
                background-color: #21324E;
            }
        }
    }
}
    
</style>
