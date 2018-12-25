import Vue from 'vue'
import {listChannel} from '@/api/systemSet/type/typeController'

// 分页组件
Vue.component('pagination', {
  template: `<el-pagination style="float: right;margin-top:10px" v-show="value.total > 0"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="1"
                 :page-sizes="[10, 20, 30, 50, 100]"
                 :page-size="10"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="value.total"></el-pagination>`,
  name: 'Pagination',
  props: ['value'],
  methods: {
    // 切换每页条数
    handleSizeChange (val) {
      this.value.size = val
    },
    // 切换当前页
    handleCurrentChange (val) {
      this.value.current = val
    }
  }
})

// 渠道下拉选择组件
Vue.component('channelSelect', {
  template: `<el-select v-model="selectValue" @change="handleChange" :disabled="disabled" clearable placeholder="请选择渠道">
              <el-option
                v-for="(value,index) in channelTyps"
                :key="index"
                :label="value.typeName"
                :value="value.typePk">
              </el-option>
            </el-select>`,
  name: 'ChannelSelect',
  props: ['value','disabled'],
  data: function () {
    return {
      selectValue: null,
      channelTyps: []
    }
  },
  watch: {
    value: function (val) {
      this.selectValue = val;
    },
  },
  methods: {
    // 切换每页条数
    handleChange (val) {
      this.$emit('input', val)
      this.$emit('callback', val);
    },
    /**
     * 初始化加载数据
     * @param {*} flag true过滤掉已停用的  false全部状态
     */
    load(flag){
      if(flag==true){
        this.channelTyps = [];
        listChannel().then(res => {
          res.data.forEach(ele => {
            if(ele.usingFlag=='Y'){
              this.channelTyps.push(ele)
            }
          });
        });
      }else{
        listChannel().then(res => {
          this.channelTyps = res.data;
        });
      }
    },
  },
  // mounted () {
  //  this.load(false);
  // }
})
