<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs'>
      <el-tab-pane label="短信列表" name="first">
        <short-message-list/>
      </el-tab-pane>
      <el-tab-pane label="短信详细列表" name="secone">
        <sms-detailed-list/>
      </el-tab-pane>
      <el-tab-pane label="管理员短信列表" name="three">
        <admin-short-message-list/>
      </el-tab-pane>
      <el-tab-pane label="管理员短信详细列表" name="four">
        <admin-sms-detailed-list/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import shortMessageList from './smsManageFolder/ShortMessageList'
import smsDetailedList from './smsManageFolder/SmsDetailedList'
import adminShortMessageList from './smsManageFolder/AdminShortMessageList'
import adminSmsDetailedList from './smsManageFolder/AdminSmsDetailedList'
// import {powerJudge} from '@/utils/permissionsOperation.js'
export default {
  components: {shortMessageList, smsDetailedList, adminShortMessageList, adminSmsDetailedList},
  data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
    },
    methods: {
      // powerJudge(id){
      //   return powerJudge(id);
      // }
    }
}
</script>
