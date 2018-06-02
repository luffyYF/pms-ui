<template>
  <div>
    <el-row>
        <el-col :span="24">
            <el-button type="primary"  size="mini">打印</el-button>
            <el-button type="primary" @click="exportData" size="mini">导出Excel</el-button>
            <el-button type="primary"  size="mini">打印</el-button>
        </el-col>
        <div class="print-content">
            <table style="width: 842px" cellpadding="0" cellspacing="0" border="0" bgcolor="white">
                <tbody>
                    <tr>
                        <td><img alt="" src="/px" style="width: 1px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 56px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 18px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 23px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 22px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 66px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 69px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 15px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 29px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 16px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 25px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 86px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 9px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 100px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 1px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 12px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 7px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 31px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 19px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 2px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 65px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 72px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 23px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 35px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 36px; height: 1px;"></td>
                        <td><img alt="" src="/px" style="width: 4px; height: 1px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="24" valign="middle" style="text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 16.0px; font-weight: bold;">深圳市前海豪斯菲尔信息科技有限公司</span></td>
                        <td colspan="2"><img alt="" src="/px" style="width: 40px; height: 37px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="24" valign="middle" style="text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 16.0px; font-weight: bold;">催账报表</span></td>
                        <td colspan="2"><img alt="" src="/px" style="width: 40px; height: 25px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="3"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">打印日期：</span></td>
                        <td colspan="5"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">2018-03-07</span></td>
                        <td colspan="3" rowspan="2"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">打印时间：</span></td>
                        <td colspan="3" rowspan="2"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">15:17:59</span></td>
                        <td><img alt="" src="/px" style="width: 1px; height: 15px;"></td>
                        <td colspan="4"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">生产日期：</span></td>
                        <td><img alt="" src="/px" style="width: 2px; height: 15px;"></td>
                        <td colspan="4"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">2018-03-07</span></td>
                        <td colspan="2"><img alt="" src="/px" style="width: 40px; height: 15px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="8"><img alt="" src="/px" style="width: 270px; height: 1px;"></td>
                        <td colspan="12"><img alt="" src="/px" style="width: 307px; height: 1px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="18" valign="middle"><span style="font-family: 新宋体; color: #000000; font-size: 12.0px;">注：余额 = 已交押金-消费总额-需加收房费；当余额小于100.0时显示。</span></td>
                        <td colspan="8"><img alt="" src="/px" style="width: 256px; height: 25px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="2" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">组单号</span></td>
                        <td colspan="2" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">房号</span></td>
                        <td colspan="2" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">姓名</span></td>
                        <td valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">房型</span></td>
                        <td colspan="2" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">房价</span></td>
                        <td colspan="3" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">入住日期</span></td>
                        <td colspan="4" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">预离日期</span></td>
                        <td colspan="3" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">押金</span></td>
                        <td colspan="2" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">消费总额</span></td>
                        <td valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">需加收房费</span></td>
                        <td colspan="3" valign="middle" style="background-color: #CCCCCC; border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; border-right-style: solid; border-right-width: 1px; border-right-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #333333; background-color: #CCCCCC; font-size: 13.0px;">余额</span></td>
                        <td><img alt="" src="/px" style="width: 4px; height: 27px;"></td>
                    </tr>
                    
                    <tr valign="top">
                    <td style="border-left-style: solid; border-left-width: 1px; border-left-color: #000000; "><img alt="" src="/px" border="0"></td>
                        <td><img alt="" src="/px" style="width: 56px; height: 22px;"></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">129</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">新客人</span></td>
                        <td valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">孝道</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 新宋体; color: #000000; font-size: 12.0px;">286.0</span></td>
                        <td colspan="3" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">2018-03-07 14:35</span></td>
                        <td colspan="4" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">2018-03-24 12:00</span></td>
                        <td colspan="3" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">0.00</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">0.00</span></td>
                        <td valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">286.00</span></td>
                        <td valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">欠</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-right-style: solid; border-right-width: 1px; border-right-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">286.00</span></td>
                        <td><img alt="" src="/px" style="width: 4px; height: 22px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="2" valign="middle" style="border-left-style: solid; border-left-width: 1px; border-left-color: #000000; "><img alt="" src="/px" border="0"></td>
                        <td colspan="14" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">小计（房间数：18）</span></td>
                        <td colspan="3" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">0.00</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">0.00</span></td>
                        <td valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">8591.00</span></td>
                        <td valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">欠</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-right-style: solid; border-right-width: 1px; border-right-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">8591.00</span></td>
                        <td><img alt="" src="/px" style="width: 4px; height: 22px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="16" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">总计（房间数：19）</span></td>
                        <td colspan="3" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">0.00</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">4000.00</span></td>
                        <td valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">8601.00</span></td>
                        <td valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-left-style: solid; border-left-width: 1px; border-left-color: #000000; text-align: center;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">欠</span></td>
                        <td colspan="2" valign="middle" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; border-right-style: solid; border-right-width: 1px; border-right-color: #000000; text-align: right;"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">12601.00</span></td>
                        <td><img alt="" src="/px" style="width: 4px; height: 22px;"></td>
                    </tr>
                    <tr valign="top">
                        <td><img alt="" src="/px" style="width: 1px; height: 1px;"></td>
                        <td colspan="24" style="border-top-style: solid; border-top-width: 1px; border-top-color: #000000; "><img alt="" src="/px" border="0"></td>
                        <td><img alt="" src="/px" style="width: 4px; height: 1px;"></td>
                    </tr>
                    <tr valign="top">
                        <td colspan="5" valign="middle"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">第1页，</span></td>
                        <td colspan="5" valign="middle"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">共1页</span></td>
                        <td colspan="3" valign="middle"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">操作员：</span></td>
                        <td colspan="4" valign="middle"><span style="font-family: 宋体; color: #000000; font-size: 12.0px;">深圳前海豪斯菲尔</span></td>
                        <td colspan="9"><img alt="" src="/px" style="width: 287px; height: 20px;"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </el-row>  
  </div>
</template>

<script>
import {table2csvData,csvColumns} from './data/tabeData'
export default {
  data() {
    return {
        tableData:[],
        columnsCsv:csvColumns,
        csvData:table2csvData,
        formInline: {
            region: "weihetingyong"
        },
        keepingData: []
    };
  },
  methods: {
    exportData() {
        console.log(this.$refs.tableCsv)
      this.$refs.tableCsv.exportCsv({
          filename: '原始数据'
      });
    },
    getList(){
      let self = this
      console.log(this.queryObj)
      reportCuiZhangBaoBiao(this.queryObj).then((data)=>{
        console.log(data)
        self.listData.splice(0,data.data.length);
        if(data.code == 1){
        //   self.listData = data.data;
          data.data.forEach((obj)=>{
            obj.plusMinus = "余"
            if(obj.remainingSum < 0){
                obj.plusMinus = "欠"
                obj.remainingSum  = Math.abs(obj.remainingSum)
            }
            self.listData.push(obj);
          })
        }
      ];
      this.keepingData = data;
      // getHousekeepingList().then(res => {
      //   this.keepingData = new HousekeepingList(res.data)
      // })
    }
  },
  mounted() {
    this.housekeepingDate();
  }
};
</script>
<style scoped>
.bg-purple-dark {
  background-color: #fdf7f7;
  border-color: #eed3d7;
  padding: 10px;
}
.keeping-content {
  padding: 10px;
}
</style>
