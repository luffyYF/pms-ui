//会员等级
<template>
  <div>
    <el-select class="member-level" v-model="form.memberGrade" @visible-change="memberLevelChange" placeholder="请选会员级别">
      <el-option
        v-for="item in memberLevel"
        :key="item.gradePk"
        :label="item.gradeName"
        :value="item.gradePk">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import {listGrade} from '@/api/customerRelation/pmsMemberGradeController'
export default {
  // props:['gradePk'],
  mounted(){
    this.init();
  },
  // watch(){
  //   this.$emit("input",gradePk);
  // },
  methods: {
    init(){
      //初始化会员等级
      listGrade().then(result => {
        var item = {
          gradePk:'',
          gradeName:'请选择会员等级',
          cardFee:'',
          invalidDateCard:'',
        };
        var arr = [];
        arr.push(item);
        for (let index = 0; index < result.data.length; index++) {
          const element = result.data[index];
          arr.push(element);
        }
        this.memberLevel = arr;
      })
    },
    //会员等级改变
    memberLevelChange(o){
      if(!o){
        // console.log(this.form.memberGrade)
        for (let index = 0; index < this.memberLevel.length; index++) {
          const element = this.memberLevel[index];
          if(this.form.memberGrade == element.gradePk){
            this.form.cardFee = element.cardFee
            this.form.invalidDateCard = element.invalidDateCard
          }
        }
        bus.$emit('memberGrade',{form:this.form});
        // this.form = {};
      }
    },
  },
  data() {
    return {
      form:{},
      memberLevel:[],
    }
  }
}
</script>
