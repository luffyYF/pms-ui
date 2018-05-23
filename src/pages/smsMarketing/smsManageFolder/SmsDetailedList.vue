<template>
  <div class="short-message-body">
    <div class="titlp">短信详细列表</div>
    <div class="short-message-content">
        <el-form ref="form" :model="form" size="mini" label-width="80px">
            <el-col :span="24"> 
                <el-col :span="8">
                    <el-form-item label="短信类型">
                        <el-select v-model="form.region" placeholder="请选择短信类型">
                            <el-option label="过生日" value="shanghai"></el-option>
                            <el-option label="积分兑换" value="beijing"></el-option>
                            <el-option label="入住" value="beijing"></el-option>
                            <el-option label="预订" value="beijing"></el-option>
                            <el-option label="注册" value="beijing"></el-option>
                            <el-option label="结账" value="beijing"></el-option>
                            <el-option label="会员卡充值" value="beijing"></el-option>
                            <el-option label="转维修房" value="beijing"></el-option>
                            <el-option label="解除维修房" value="beijing"></el-option>
                            <el-option label="取消预订回复" value="beijing"></el-option>
                            <el-option label="批量预订" value="beijing"></el-option>
                            <el-option label="储值消费" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态">
                        <el-select v-model="form.region" placeholder="请选择状态">
                            <el-option label="成功" value="shanghai"></el-option>
                            <el-option label="失败" value="beijing"></el-option>
                            <el-option label="超时" value="beijing"></el-option>
                            <el-option label="发送中" value="beijing"></el-option>
                            <el-option label="定时发送" value="beijing"></el-option>
                            <el-option label="参数错误" value="beijing"></el-option>
                            <el-option label="渠道值错误" value="beijing"></el-option>
                            <el-option label="IP没有权限" value="beijing"></el-option>
                            <el-option label="长号码错误" value="beijing"></el-option>
                            <el-option label="关键字禁止" value="beijing"></el-option>
                            <el-option label="MD5鉴权错误" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-col>
            <el-col :span="24"> 
                <el-col :span="8">
                    <el-form-item label="开始时间">
                        <el-date-picker type="date" placeholder="开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="结束时间">
                        <el-date-picker type="date" placeholder="结束时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                     <el-form-item label-width="10px">
                        <el-button type="primary">搜索</el-button>
                    </el-form-item>
                </el-col>
            </el-col>
        </el-form>
        <el-col :span="24">
            <el-table :data="tableData" height="250" border style="width: 100%">
                <el-table-column prop="date" label="序号"></el-table-column>
                <el-table-column prop="date" label="内容"></el-table-column>
                <el-table-column prop="date" label="类型"></el-table-column>
                <el-table-column prop="date" label="发送时间"></el-table-column>
                <el-table-column prop="date" label="接收人"></el-table-column>
                <el-table-column prop="date" label="手机号码"></el-table-column>
                <el-table-column prop="date" label="状态"></el-table-column>
                <el-table-column prop="date" label="操作"></el-table-column>    
            </el-table>
        </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          form: {
            name: '', 
            date1: '',
            region: ''
          },
          tableData: []
      }
  },
  methods: {

  }
}
</script>

<style scoped>
.short-message-body{
    width: 850px;
    border: 1px solid #ccc;
    background: #f7f7f7;
    padding: 15px;
    display: table;
}
.titlp{
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
    border-bottom: 1px solid #aaa;
    margin-bottom: 8px;
    color: #333;
}
</style>
