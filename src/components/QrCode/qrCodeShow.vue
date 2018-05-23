<template>
  <div>
    <div class="qart">
      <div id="qrcode" ref="qrcode">
      </div>
      <input type="text" id="getval" :value="qrCode" disabled>
    </div>
  </div>
</template>
<script>
  import bus from '../../utils/bus'
  export default {
    props: ['value'],
    watch: {
      value: function (value) {
        this.qrCodeObj = new QRCode(document.getElementById('qrcode'), {
          width: 200,
          height: 200
        })
        this.qrCodeObj.makeCode(value)
        this.qrCode = value
      }
    },
    data () {
      return {
        showFlag: true,
        qrCode: '',
        qrCodeObj: {}
      }
    },
    methods: {
      // showDialog (qrCode) {
      //   this.showFlag = true
      //   if (qrCode !== undefined && qrCode !== '') {
      //     setTimeout(() => {
      //       this.qrCodeObj = new QRCode(document.getElementById('qrcode'), {
      //         width: 200,
      //         height: 200
      //       })
      //       this.qrCodeObj.makeCode(qrCode)
      //       this.qrCode = qrCode
      //     }, 1000)
      //
      //     this.showFlag = false
      //   } else {
      //     this.qrCode = ''
      //   }
      // }
    },
    mounted () {
      // bus.$on('showQrCodeDialogClick', (qrCode) => {
      //   this.showDialog(qrCode)
      // })
    }
  }
</script>
<style scope>
  #qrcode{
    height: 200px;
    width: 200px;
    margin: auto;
  }
</style>
