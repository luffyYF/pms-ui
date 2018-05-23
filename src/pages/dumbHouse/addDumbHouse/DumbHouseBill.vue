<template>
  <div class="content-body">
    <bill-tag/>
  </div>
</template>

<script>
import BillTag from "../../reserveManage/addReserve/bills"
  export default {
    props:['dumbObj'],
    components: {BillTag},
    data () {
      return {
      }
    },
    methods: {

    },
    created(){
      // console.log("==========");
      // console.log(this.dumbObj);
    }
  }
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 20px;
}
</style>
