<template>
  <layout :router='router'></layout>
</template>

<script>
  import layout from "@/components/layout/layout"
  import orderForm from "@/router/home/orderForm/index"
  export default {
    components:{layout},
    data () {
      return {
        router: orderForm.children,
        activeName: 'first',
      }
    },
    created() {
      console.log(this.router)
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

