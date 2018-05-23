<template>
  <div>
    <img src="static/img/logo.png" class="image" v-show="false">
    <div ref="qart" hidden="hidden"></div>
    <el-button @click="previewQrCode" v-if="download.visible" type="text" size="small">查看</el-button>
    <!--<el-button @click="convertToImage" v-if="download.visible" v-bind:style="download.style" type="text" size="small">-->
      <!--{{download.text}}-->
    <!--</el-button>-->
    <el-dialog
      title="二维码预览"
      :visible.sync="dialogVisible"
      width="400px">

      <img :src="qrCodeUrl" class="image">

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="convertToImage">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }
</style>

<script>
import QArt from 'qartjs'
import '../../../static/img/logo.png'
export default {
  props: {
    config: {
      type: Object
    },
    download: {
      type: Object,
      default: function () {
        return {
          visible: true,
          text: '下载',
          style: {float: 'right', position: 'absolute', top: '12px', right: '70px'}
        }
      }
    }
  },
  name: 'VueQart',
  data () {
    return {
      msg: '',
      dialogVisible: false,
      qrCodeUrl: ''
    }
  },
  watch: {
    'config.value': function (val, oldVal) {
      this.config.value = val
      this.renderQrcode(this.config)
    }
  },
  mounted () {
    this.renderQrcode(this.config)
  },

  methods: {
    renderQrcode (config) {
      this.qart = new QArt(config)
      if (this.qart.value === '' || this.qart.value === null) {
        return false
      }
      this.qart.make(this.$refs.qart)
      // this.$refs.qart.appendChild(this.qart.make())
    },
    convertToImage () {
      this.dialogVisible = false
      const myCanvas = this.$refs.qart.children[0]
      const type = 'image/png'
      let image = myCanvas.toDataURL(type).replace(type, 'image/octet-stream')
      window.location.href = image // it will save locally
    },
    // 浏览二维码
    previewQrCode () {
      const myCanvas = this.$refs.qart.children[0]
      if (!(myCanvas)) {
        this.$message({message: '暂无二维码,请设置', type: 'info'})
        return false
      }
      const type = 'image/png'
      let image = myCanvas.toDataURL(type).replace(type, 'image/octet-stream')
      this.qrCodeUrl = image
      this.dialogVisible = true
    }
  }
}
</script>

