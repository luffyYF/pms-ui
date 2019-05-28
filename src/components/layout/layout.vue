<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
          class="el-menu-vertical-demo"
          background-color="#2b3c58"
          text-color="#fff"
          :router='true'
          active-text-color="#fff">
          <el-menu-item :index="v.path" v-for="(v,i) in router" v-show="true" :key='i'>
            <i class="el-icon-menu"></i>
            <span slot="title">{{v.name}}</span>
          </el-menu-item>
        </el-menu>
    </el-aside> 
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    props:["router","activeName"],
    data () {
      return {}
    },
    created() {},
    methods: {
      handleClick (tab, event) {},
      setActiveName(v){
          this.activeName = v
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

