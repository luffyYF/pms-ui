// 会员积分明细编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <div class="member-dialog">
		<el-dialog class="add-permission" title="会员换卡明细" :visible.sync="dialogVisible" width="800px"
							:close-on-click-modal="false" :before-close="handleClose">
      <MemberExchangeCardDetail ref="MemberExchangeCardDetailRef" />
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
import MemberExchangeCardDetail from "./MemberExchangeCardDetail";
  export default {
    components:{MemberExchangeCardDetail},
    data () {
      return {
        dialogVisible: false,
      }
    },
    methods: {
      showDialog(id, type) {
        this.dialogVisible = true
        this.$nextTick(()=>{
          console.log(this.$refs)
          this.$refs.MemberIntegralDetailTableRef.init(id, type)
        })
      },
      handleClose () {
        this.dialogVisible = false
        this.$emit('callback')
			},
    }
  }
</script>