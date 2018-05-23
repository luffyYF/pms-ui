<template>
<el-dialog
      title="权限操作"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="closeDialog">
    <div class="content-body">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="mini" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" style="width:100px;"></el-input>
          </el-form-item>
          <el-form-item label="角色级别">
            <el-select v-model="form.roleLevel" placeholder="请选择" style="width:100px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checkedAll" @change="checkedAllList">所有权限</el-checkbox>
          </el-form-item>
          <el-form-item>
            报表日期范围控制
            <el-radio v-model="form.controlDayFlag" label="Y">开启</el-radio>
            <el-radio v-model="form.controlDayFlag" label="N">关闭</el-radio>
            可以访问前
            <el-input v-model="form.viewNumDay" :disabled="form.controlDayFlag=='N'?true:false" style="width:70px;"></el-input>
            天的报表数据
          </el-form-item>
          <el-form-item style="margin-left:10px;">
            <el-button type="primary" @click="addRole('form')" v-if="treeType==0">添加角色</el-button>
            <el-button type="primary" @click="updateRole('form')" v-else>修改权限</el-button>
          </el-form-item>
          <el-row style="margin-bottom:10px;">
            <el-col :span="5" class="border-sty">
                <el-tree
                :data="allPower"
                show-checkbox
                node-key="id"
                ref="tree1"
                highlight-current
                :default-expand-all="true"
                :props="defaultProps">
                </el-tree>
            </el-col>
            <!-- <el-col :span="4" class="border-sty">
                <el-tree
                :data="pmPower"
                show-checkbox
                node-key="id"
                ref="tree2"
                highlight-current
                :default-expand-all="true"
                :props="defaultProps">
                </el-tree>
            </el-col> -->
            <el-col :span="5" class="border-sty">
                <el-tree
                :data="pagePower"
                show-checkbox
                node-key="id"
                ref="tree3"
                highlight-current
                :default-expand-all="true"
                :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="5" class="border-sty">
                <el-tree
                :data="reportPower"
                show-checkbox
                node-key="id"
                ref="tree4"
                highlight-current
                :default-expand-all="true"
                :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="4" class="border-sty">
                <el-tree
                :data="wechatManagerPower"
                show-checkbox
                node-key="id"
                ref="tree5"
                highlight-current
                :default-expand-all="true"
                :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="5" class="border-sty">
                <el-tree
                :data="mobilePower"
                show-checkbox
                node-key="id"
                ref="tree6"
                highlight-current
                :default-expand-all="true"
                :props="defaultProps">
                </el-tree>
            </el-col>
          </el-row>
            
        </el-form>
    </div>
</el-dialog>    
</template>

<script>
import AllPower from '@/mock/powerData/allPower'
import PmPower from '@/mock/powerData/pmPower'
import PagePower from '@/mock/powerData/pagePower'
import ReportPower from '@/mock/powerData/reportPower'
import WechatManagerPower from '@/mock/powerData/wechatManagerPower'
import MobilePower from '@/mock/powerData/mobilePower'
import {addRole,updateRole} from '@/api/operators/pmsRoleController'
  export default {
    data() {
      return {
        treeType:0,//0：添加   1：修改
        rolePo: [],
        allPowerList: [],
        pmPowerList: [],  
        pagePowerList: [], 
        reportPowerList: [], 
        wechatList: [], 
        mobilePowerList: [],
        treeCheck: [],
        permissionsList: [],
        form: {
          roleName: '', 
          permissions: '',
          roleLevel: '1', 
          viewNumDay: '',
          controlDayFlag:'N',
        },
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ]
        },
        checkedAll:false,
        delVisible:false,
        dialogVisible:false,
        options:[
            {value:'1',label:'一级'},
            {value:'2',label:'二级'},
            {value:'3',label:'三级'},
            {value:'4',label:'四级'},
            {value:'5',label:'五级'}
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        allPower:[
          {
            "id": 1,
            "label": "导航",
            "children":AllPower.getAllPower().data
          }
        ],
        pmPower:[
          {
            "id": 2,
            "label": "操作功能",
            "children":PmPower.getPmPower().data
          }
        ],
        pagePower:[
          {
            "id": 3,
            "label": "页面操作功能",
            "children":PagePower.getPagePower().data
          }
        ],
        reportPower:[
          {
            "id": 4,
            "label": "报表操作功能",
            "children":ReportPower.getReportPower().data
          }
        ],
        wechatManagerPower:[
          {
            "id": 5,
            "label": "微信PMS",
            "children":WechatManagerPower.getWechatManagerPower().data
          }
        ],
        mobilePower:[
          {
            "id": 6,
            "label": "房态管家客户端",
            "children":MobilePower.getMobilePower().data
          }
        ],
      };
    },
    mounted(){
    },
    methods: {
      
      /**
       * 添加，初始化
       * @augments */
      addData(){
        this.treeType=0;
        this.dialogVisible = true;
        // this.$refs.tree1.setCheckedKeys([]);
        // // this.$refs.tree2.setCheckedKeys([]);
        // this.$refs.tree3.setCheckedKeys([]);
        // this.$refs.tree4.setCheckedKeys([]);
        // this.$refs.tree5.setCheckedKeys([]);
        // this.$refs.tree6.setCheckedKeys([]);
      },
      /**
       * 修改，初始化
       * @augments */
      editData(row){//加载权限树数据
        this.dialogVisible = true;
        this.treeType=1;
        this.permissionsList = []
        this.dialogVisible = true;
        this.rolePo = row;
        this.form = row;
        const perms = row.permissions.split('-9999')[1]
        this.permissionsList = perms.split(',')
        setTimeout(_=>{
          this.$refs.tree1.setCheckedKeys(this.permissionsList);
          // this.$refs.tree2.setCheckedKeys(this.permissionsList);
          this.$refs.tree3.setCheckedKeys(this.permissionsList);
          this.$refs.tree4.setCheckedKeys(this.permissionsList);
          this.$refs.tree5.setCheckedKeys(this.permissionsList);
          this.$refs.tree6.setCheckedKeys(this.permissionsList);
        },0)
      },

      checkedAllList(value){
        console.log(value)
        if(value){
          this.$refs.tree1.setCheckedKeys([1]);
          // this.$refs.tree2.setCheckedKeys([2]);
          this.$refs.tree3.setCheckedKeys([3]);
          this.$refs.tree4.setCheckedKeys([4]);
          this.$refs.tree5.setCheckedKeys([5]);
          this.$refs.tree6.setCheckedKeys([6]);
        }else{
          this.$refs.tree1.setCheckedKeys([]);
          // this.$refs.tree2.setCheckedKeys([]);
          this.$refs.tree3.setCheckedKeys([]);
          this.$refs.tree4.setCheckedKeys([]);
          this.$refs.tree5.setCheckedKeys([]);
          this.$refs.tree6.setCheckedKeys([]);
        }
      },

      addRole(){
        const self = this;
        self.$refs['form'].validate((valid) => {//添加
          if (valid) {
            // self.treeCheck = []
            // self.treeCheck.push(this.$refs.tree1.getCheckedKeys())
            // // self.treeCheck.push(this.$refs.tree2.getCheckedKeys())
            // self.treeCheck.push(this.$refs.tree3.getCheckedKeys())
            // self.treeCheck.push(this.$refs.tree4.getCheckedKeys())
            // self.treeCheck.push(this.$refs.tree5.getCheckedKeys())
            // self.treeCheck.push(this.$refs.tree6.getCheckedKeys())
            // self.form.permissions = self.treeCheck.toString()

            self.treeCheck = [];
            self.wholeSelected = [];
            self.halfSelected = [];
            self.wholeSelected.push(this.$refs.tree1.getCheckedKeys())
            self.halfSelected.push(this.$refs.tree1.getHalfCheckedKeys())
            // self.wholeSelected.push(this.$refs.tree2.getCheckedKeys())
            // self.halfSelected.push(this.$refs.tree2.getHalfCheckedKeys())
            self.wholeSelected.push(this.$refs.tree3.getCheckedKeys())
            self.halfSelected.push(this.$refs.tree3.getHalfCheckedKeys())
            self.wholeSelected.push(this.$refs.tree4.getCheckedKeys())
            self.halfSelected.push(this.$refs.tree4.getHalfCheckedKeys())
            self.wholeSelected.push(this.$refs.tree5.getCheckedKeys())
            self.halfSelected.push(this.$refs.tree5.getHalfCheckedKeys())
            self.wholeSelected.push(this.$refs.tree6.getCheckedKeys())
            self.halfSelected.push(this.$refs.tree6.getHalfCheckedKeys())
            self.treeCheck = self.halfSelected.toString()+',-9999,'
            self.treeCheck += self.wholeSelected.toString()
            self.treeCheck = self.treeCheck.split(',').filter(item => item).join(',')
            self.form.permissions = self.treeCheck

            if(self.form.permissions != ''){
              addRole(self.form).then(res => {
                self.$message({type:'success', message: '添加成功'})
                self.delVisible = false;
                self.dialogVisible = false;
                this.$emit("showParentComp",self.dialogVisible)
              }).catch(()=>{
                self.delVisible = false;
                self.dialogVisible = false;
                self.$message({type:'danger', message: '网络异常'})
              })
            }else{
              self.$message({
                message: '请选择角色权限！',
                type: 'warning'
              });
            }  
          } else {
            console.log('error submit!!');
            return false;
          }
        });  
      },

      updateRole(){
        const self = this;
        self.$refs['form'].validate((valid) => {
        if (valid) {
          self.treeCheck = [];
          self.wholeSelected = [];
          self.halfSelected = [];
          self.wholeSelected.push(this.$refs.tree1.getCheckedKeys())
          self.halfSelected.push(this.$refs.tree1.getHalfCheckedKeys())
          // self.wholeSelected.push(this.$refs.tree2.getCheckedKeys())
          // self.halfSelected.push(this.$refs.tree2.getHalfCheckedKeys())
          self.wholeSelected.push(this.$refs.tree3.getCheckedKeys())
          self.halfSelected.push(this.$refs.tree3.getHalfCheckedKeys())
          self.wholeSelected.push(this.$refs.tree4.getCheckedKeys())
          self.halfSelected.push(this.$refs.tree4.getHalfCheckedKeys())
          self.wholeSelected.push(this.$refs.tree5.getCheckedKeys())
          self.halfSelected.push(this.$refs.tree5.getHalfCheckedKeys())
          self.wholeSelected.push(this.$refs.tree6.getCheckedKeys())
          self.halfSelected.push(this.$refs.tree6.getHalfCheckedKeys())
          self.treeCheck = self.halfSelected.toString()+',-9999,'
          self.treeCheck += self.wholeSelected.toString()
          self.treeCheck = self.treeCheck.split(',').filter(item => item).join(',')
          console.log(self.treeCheck)
          self.form.permissions = self.treeCheck;
          if(self.form.permissions != ''){
            updateRole(self.form).then(res => {
              self.$message({type:'success', message: '修改成功'})
              self.delVisible = false;
              self.dialogVisible = false;
              this.$emit("showParentComp",self.dialogVisible)
            }).catch(()=>{
              self.delVisible = false;
              self.dialogVisible = false;
              self.$message({type:'danger', message: '网络异常'})
            })
          }else{
            self.$message({
              message: '请选择角色权限！',
              type: 'warning'
            });
          }   
        } else {
          console.log('error submit!!');
          return false;
        }  
        }); 
      },

      //关闭
      closeDialog(){
        this.dialogVisible = false
        this.$refs.tree1.setCheckedKeys([]);
        // this.$refs.tree2.setCheckedKeys([]);
        this.$refs.tree3.setCheckedKeys([]);
        this.$refs.tree4.setCheckedKeys([]);
        this.$refs.tree5.setCheckedKeys([]);
        this.$refs.tree6.setCheckedKeys([]);
      }
    }
  }
</script>
<style scoped>
.border-sty{
  height: 415px;
  overflow: auto;
  background: #fff;
}
.border-sty+.border-sty{
  border-left: 1px solid #ccc;
}
</style>
