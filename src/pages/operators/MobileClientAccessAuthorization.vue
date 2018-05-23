<template>
  <div class="content-body">
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-form-item label="授权模式">
        <el-select v-model="form.region" placeholder="请选择授权模式">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        form: {},
      };
    },
    methods: {
      init(){
        
      },
    }
  };
</script>


<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 20px;
  width: 800px;
}
</style>