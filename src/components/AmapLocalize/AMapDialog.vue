<template>
  <div>
    <el-dialog title="定位" :visible.sync="dialogVisible" :before-close="handleClose" width="800px" :close-on-click-modal="false">
      <AmapLocalize v-model="value" ref="amapRef"></AmapLocalize>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="getAddress()" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import AmapLocalize from '@/components/AmapLocalize/index.vue'

  export default {
    components: {AmapLocalize},
    props: ['value', 'dialogVisible'],
    data: function () {
      return {
        amapRef: {}
      }
    },
    methods: {
      setAddress(lng, lat) {
        this.$nextTick(() => {
          this.$refs.amapRef.setAddressLocal(lng, lat, true)
        })
      },
      handleClose () {
        console.log(this.value)
        this.$emit('update:dialogVisible', false)
      },
      getAddress () {
        let addObj = this.$refs.amapRef.getAddressLocal()
        if (this.value) {
          let tempValue = this.value
          tempValue.lng = addObj.lng
          tempValue.lat = addObj.lat
          tempValue.address = addObj.address
          tempValue.adcode = addObj.adcode
          this.$emit('input', tempValue)
        } else {
          this.$emit('input', addObj)
        }
        this.$emit('update:dialogVisible', false)
      }
    }
  }
</script>
