<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
  body {
    margin: 0;
    padding: 0;
    /*background: url(assets/bg1.jpg) center !important;
          background-size: cover;*/
    // background: #1F2D3D;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
  }

  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  /*.toolbar {*/
  /*background: #f2f2f2;*/
  /*padding: 10px;*/
  /*//border:1px solid #dfe6ec;*/
  /*margin: 10px 0px;*/
  /*.el-form-item {*/
  /*margin-bottom: 10px;*/
  /*}*/
  /*}*/

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
