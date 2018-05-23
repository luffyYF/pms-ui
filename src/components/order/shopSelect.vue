<template>
  <el-select
    v-model="selectValue"
    clearable
    filterable
    @change="handlerChange"
    placeholder="请选择店铺">
    <el-option
      v-for="(v, k) in options"
      :key="k"
      :label="v"
      :value="k">
    </el-option>
  </el-select>
</template>

<script>
  import {getShopSelect} from '../../api/component'
  export default {
    props: ['value'],
    watch: {
      value: function (value) {
        if (value) {
          this.selectValue = value
        }
      }
    },
    data () {
      return {
        selectValue: '',
        options: {}
      }
    },
    methods: {
      handlerChange (value) {
        this.$emit('input', value)
      }
    },
    mounted () {
      this.selectValue = this.value
      getShopSelect().then(res => {
        this.options = res.data
      })
    }
  }
</script>
