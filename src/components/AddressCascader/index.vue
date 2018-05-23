<template v-once>
  <el-cascader
    :options="options"
    :props="defaultProps"
    v-model="value"
    filterable
    change-on-select
    clearable
    @change="handleChange">
  </el-cascader>
</template>

<script>
  import bus from '@/utils/bus'
  import {getAddressTree} from '@/api/address'

  export default {
    name: 'AddressCascader',
    // 设置value为props属性-必须,
    props: ['value'],
    data: function () {
      return {
        options: [],
        defaultProps: {
          value: 'id',
          children: 'child',
          label: 'name'
        }
      }
    },
    methods: {
      getAddressTree () {
        getAddressTree().then(res => {
          this.options = res.data
        }).catch(() => {
          this.tableLoading = false
        })
      },
      getAddressInfo () {
        if (this.value === undefined || this.value.length === 0) {
          return ''
        }
        let addressInfo = ''
        if (this.value[0] !== undefined && this.value[0] !== null && this.value[0] !== '') {
          let addressObj = this.getAddressObj(this.options, this.value[0])
          addressInfo += addressObj.name
          if (this.value[1] !== undefined && this.value[1] !== null && this.value[1] !== '') {
            addressObj = this.getAddressObj(addressObj.child, this.value[1])
            addressInfo += addressObj.name
            if (this.value[2] !== undefined && this.value[2] !== null && this.value[2] !== '') {
              addressObj = this.getAddressObj(addressObj.child, this.value[2])
              addressInfo += addressObj.name
            }
          }
        }
        return addressInfo
      },
      getAddressObj (addressList, id) {
        if (addressList === undefined || id === undefined) {
          return ''
        }
        let length = addressList.length
        for (let i = 0; i < length; i++) {
          if (addressList[i].id === id) {
            return addressList[i]
          }
        }
      },
      handleChange (value) {
        // 通过 input 事件带出数值
        this.$emit('input', value)
        // 触发事件
        bus.$emit('addressChangeEven', value)
      }
    },
    mounted () {
      this.getAddressTree()
    }
  }
</script>

<style scope>
  .el-cascader{
    width: 100%;
  }
</style>
