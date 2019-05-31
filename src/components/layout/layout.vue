<template>
  <el-container>
    <el-aside width="140px">
        <el-menu
            class="el-menu-vertical-demo"
            text-color="#fff"
            :router='true'
            :default-active='defaultActive.activeName'
            active-text-color="#fff">
            <el-menu-item :index="v.path" v-for="(v,i) in router" v-show="i>0" :key='i'>
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
        return {
            defaultActive:{
                activeName:''
            }
        }
    },
    created() {
        let matched = this.$route.matched
        let parent = matched[matched.length-1]
        this.setActiveName(parent.path)
    },
    methods: {
        handleClick (tab, event) {},
        setActiveName(v){
            this.$set(this.defaultActive,'activeName',v)
            console.log(this.defaultActive)
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
        background-color: transparent;
        border-right: 0px solid #21324E;
        .el-menu-item{
            &.is-active{
                background-color: #21324E;
                border-right: 1px solid #21324E;
            }
        }
    }
  }
}
</style>

