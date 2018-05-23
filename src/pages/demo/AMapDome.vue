<template>
  <div>
    <AMapDialog v-model="aaa" :dialogVisible.sync='dialogFormVisible'></AMapDialog>
    <button @click="showAddressDialog">点击dialogFormVisible11111</button>
    <button @click="getAddress()">点击v-model</button>
  </div>
</template>

<script>
  import AMapDialog from '@/components/AmapLocalize/AMapDialog.vue'

  export default {
    components: {AMapDialog},
    data: function () {
      return {
        dialogFormVisible: false,
        amapRef: {},
        aaa: {}
      }
    },
    methods: {
      showAddressDialog () {
        this.dialogFormVisible = true
        this.aaa = {}
      },
      getAddress () {
      }
    },
    mounted () {
    }
  }
</script>
