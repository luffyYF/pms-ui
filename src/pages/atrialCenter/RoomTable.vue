<template>
  <div class="about_spacing">
    <div class="margin_bottom_z line_height_z">
    可售房 = 总房数 - 预订当天到 - 当日预计不离店房 - 维修房 - 停用房 <br>
    可用房 = 总房数 - 在住房 - 维修房 - 停用房 <br>
    出租率 = 房晚数 / (总房间数 — 维修房(不可以入住) — 停用房 — 自用房 — 免费房) * 100 <br>
    </div>
    
    <el-table
      v-loading="loading"
      :data="roomCountList"
      show-summary
      :summary-method="getSummaries"
      border>
      <el-table-column prop="roomTypeName" min-width="60" show-overflow-tooltip/>
      <el-table-column v-for="title in tableTitle" :key="title.roomTypePk" :label="title.name" :prop="title.value"  min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="title.name !== '出租率'">{{scope.row[title.value]==null?0:scope.row[title.value]}}</span>
          <span v-if="title.name == '出租率'">{{scope.row.czl}}%</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="可用房（空房）" min-width="120" show-overflow-tooltip/>
      <el-table-column label="预订房" prop="aa" min-width="80" show-overflow-tooltip/>
      <el-table-column label="在住房" prop="bb" min-width="80" show-overflow-tooltip/>
      <el-table-column label="维修房" prop="cc" min-width="80" show-overflow-tooltip/>
      <el-table-column label="停用房" prop="dd" min-width="80" show-overflow-tooltip/>
      <el-table-column label="免费房" min-width="80" show-overflow-tooltip/>
      <el-table-column label="自用房" min-width="80" show-overflow-tooltip/>
      <el-table-column label="总房数" min-width="80" show-overflow-tooltip/>
      <el-table-column label="清洁房" min-width="80" show-overflow-tooltip/>
      <el-table-column label="清洁未检查房" min-width="120" show-overflow-tooltip/>
      <el-table-column label="预留房" min-width="80" show-overflow-tooltip/>
      <el-table-column label="第三方已预订数" min-width="120" show-overflow-tooltip/>
      <el-table-column label="可用预留房数" min-width="120" show-overflow-tooltip/>
      <el-table-column label="出租率" min-width="80" show-overflow-tooltip/> -->
    </el-table>
  </div>
</template>


<script>
import { roomStatusCount } from "@/api/atrialCenter/roomStatusController";

  export default {
    created(){
      this.countRoom();
    },
    data () {
      return {
        tableTitle:[
          // {name:'可售房',value:'ksf'},
          {name:'可用房（空房）',value:'ROOM'},
          {name:'预定房',value:'ydf'},
          // {name:'占用房',value:'OCCUPY'},
          {name:'在住房',value:'OCCUPY'},
          {name:'维修房',value:'REPAIR_ROOM'},
          {name:'停用房',value:'DISABLE_ROOM'},
          {name:'免费房',value:'FREE_ROOM'},
          {name:'自用房',value:'SELF_USE'},
          {name:'总房数',value:'allRoom'},
          // {name:'清洁房',value:'CLEAN_ROOM'},
          {name:'清洁未检查',value:'CLEAN_NOCHECK'},
          // {name:'预留房',value:'ylf'},
          {name:'第三方已预定数',value:'dsfyyds'},
          // {name:'可用预留房数',value:'kyylfs'},
          {name:'脏房',value:'DIRTY'},
          // {name:'清洁已检查',value:'CLEAN_CHECKED'},
          {name:'出租率',value:'czl'},
          
          
          
        ],
        roomCountList:[],


        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {permissionName: '', realName: ''},
        tableData: [
          {name: '孝道', aa: 10, bb: 9, cc: 8, dd: 7},
          {name: '浪漫', aa: 10, bb: 9, cc: 8, dd: 7}
        ]
      }
    },
    methods: {
      countRoom(){
        roomStatusCount().then(res =>{
          if(res.code == 1) {
            this.roomCountList = res.data;
          }
        })
      },

      // 处理总计数据
      getSummaries (param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
            return
          }
          const values = data.map(item => {
            return item[column.property]==null?0:Number(item[column.property])
          })
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ''
          } else {
            // sums[index] = 'N/A'
            sums[index] = ''
          }
        })

        return sums
      }
    },
    mounted () {
      // bus.$on('upmsPermissionChange', () => { this.getPermissionList() })
      // this.getPermissionList()
    }
  }
</script>
