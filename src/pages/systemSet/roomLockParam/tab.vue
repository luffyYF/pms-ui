<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="房锁设置" name="roomLockParam" v-if="hasPerm('pms:roomParam:roomLockParam')">
        <roomLockParam ref="roomLockParam"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import roomLockParam from './roomLockParam'
  export default {
    components: {
      roomLockParam,
    },
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
      handleClick (tab, event) {
        console.log(tab, event)
        if(this.activeName == 'roomLockParam'){
          var child = this.$refs.roomLockParam
          child.init()
        }
      },
    }
  }
</script>
<style scoped>
.el-tabs--border-card{
  background: #fff;
  border: none !important;
  border-top: 1px solid #dcdfe6 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
<style>
.goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
}
</style>

