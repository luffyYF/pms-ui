<template>
  <div class="iframe-container" :style="{top: top+'px', left: left+'px', right: right+'px', bottom: bottom+'px'}">
    <iframe :src="src" scrolling="auto" frameborder="0" class="frame"></iframe>
  </div>
</template>

<script>
export default {
  props:{
    top:{default:0},
    left:{default:0},
    right:{default:0}, 
    bottom:{default:0}
  },
  data() {
    return {
      src:''
    };
  },
  mounted() {
    console.log("iframe-mounted")
  },
  methods: {
    init(src) {
      this.src = src
    }
  },
};
</script>

<style lang="scss" scoped>
.iframe-container {
  position: absolute;
  overflow-x: auto;
  overflow-y: auto;
  .frame {
    position: relative;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>