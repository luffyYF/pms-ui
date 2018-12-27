<template>
  <div>
    <el-tabs type="border-card"  v-model="activeName" ref='checkTabs'>
      <el-tab-pane label="短信类型详细" name="first">
        <sms-type-detailed/>
      </el-tab-pane>
      <el-tab-pane label="短信账户设置" name="secone">
        <sms-account-setting/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import smsTypeDetailed from "./smsSetFolder/SmsTypeDetailed";
import smsAccountSetting from "./smsSetFolder/SMSAccountSetting";
// import { powerJudge } from "@/utils/permissionsOperation.js";
export default {
  components: { smsTypeDetailed, smsAccountSetting },
  data() {
    return {
      activeName: ""
    };
  },
  mounted() {
    //设置第一个不被隐藏的el-tab-pane为激活状态
    this.activeName = this.$refs.checkTabs.panes[0].name;
  },
  methods: {
    // powerJudge(id) {
    //   return powerJudge(id);
    // }
  }
};
</script>
