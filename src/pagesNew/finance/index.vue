<template>
  <layout :router='router'></layout>
</template>

<script>
  import layout from "@/components/layout/layout"
  import finance from "@/router/home/finance/index"
  export default {
    components:{layout},
    data () {
      return {
        router: finance.children,
        activeName: 'first',
      }
    },
    created() {
    },
    methods: {
      handleClick (tab, event) {
      }
    }
  }
</script>
<style scoped lang='scss'>
.el-container{
  height: 100%;
  .el-aside{
    border-right: 1px solid #2b3c58;
    background-color: #2b3c58;
    .el-menu{
      border-right: 0px solid #21324E;
    }
  }
}
</style>

