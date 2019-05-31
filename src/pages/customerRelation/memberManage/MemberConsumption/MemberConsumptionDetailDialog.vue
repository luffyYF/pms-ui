// 会员消费明细编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="会员消费明细" :visible.sync="dialogVisible" width="800px"
							:close-on-click-modal="false" :before-close="handleClose">
        <MemberConsumptionDetailTable ref="MemberConsumptionDetailTable" /> 

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
			</span>
		</el-dialog>
  </section>
</template>

<script>
import  MemberConsumptionDetailTable from './MemberConsumptionDetailTable.vue'

  export default {
    components:{MemberConsumptionDetailTable},
    data () {
      return {
        dialogVisible: false,
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        this.$nextTick(()=>{
          this.$refs.MemberConsumptionDetailTable.init(id)
        })
      },
      handleClose(){
        this.dialogVisible = false
      }
    }
  }
</script>