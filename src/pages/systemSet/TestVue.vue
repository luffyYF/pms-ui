<template>
  <section>
    嵌入外部页面
    <outside-iframe ref="outsideIframeRef" :top="180" :left="10" :right="10"/>
  </section>
</template>

<script>
//嵌套iframe
import OutsideIframe from '@/components/iframe/OutsideIframe.vue'
export default {
  components: {OutsideIframe},
  data() {
    return {
      
    }
  },
  mounted() {
    this.$refs.outsideIframeRef.init('https://www.housefeel.cn/cms/')
  },
  methods: {
    
  }
}
</script>

<style>

</style>
