// 会员充值明细模态框
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="会员充值明细" :visible.sync="dialogVisible" width="800px"
							:close-on-click-modal="false" :before-close="handleClose">
        <MemberRechargeTable ref="MemberRechargeTable" />

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">关 闭</el-button>
			</span>
		</el-dialog>
  </section>
</template>

<script>
import { listMemberLog } from '@/api/customerRelation/pmsMemberLogController'

import MemberRechargeTable from "./MemberRechargeDetailTable.vue"

  export default {
    components:{MemberRechargeTable},
    data () {
      return {
        dialogVisible: false,
				loading: false,
      }
    },
    methods: {
      showDialog (id, type) {
        this.dialogVisible = true
        this.$nextTick(()=>{
          this.$refs.MemberRechargeTable.init(id, type)
        })
      },
      handleClose () {
        this.dialogVisible = false
        this.$emit('callback')
			},
    }
  }
</script>