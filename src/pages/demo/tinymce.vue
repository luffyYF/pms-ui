<template>
  <div class="components-container">
    <div>
      <tinymce :height="700" v-model="content"></tinymce>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'tinymce-demo',
  components: {Tinymce},
  data () {
    return {
      content: 'Tinymce'
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


