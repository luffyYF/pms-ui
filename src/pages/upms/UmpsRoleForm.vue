<template>
  <el-dialog title="角色操作" width="40%" :visible.sync="dialogVisible">
    <el-tabs type="border-card">
      <el-tab-pane label="角色信息">
        <el-form :model="form" label-width="85px" ref="form" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色标题" prop="title">
            <el-input v-model="form.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="角色权限">
        树状节点
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="saveRole()">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import bus from '@/utils/bus'
  import {getRoleById, addRole, updateRole} from '@/api/upmsRole'

  /**
   * 实体类对象
   */
  class UpmsRole {
    static rules = {
      name: [
        {required: true, message: '请填写角色名称', trigger: 'blur'},
        {min: 2, message: '账号最少 2 个字符', trigger: 'blur'}
      ],
      title: [
        {required: true, message: '请填写角色标题', trigger: 'blur'},
        {min: 2, message: '长度最少 2 个字符', trigger: 'blur'}
      ]
    };

    constructor (obj) {
      if (obj === undefined) {
        this.roleId = ''
        this.name = ''
        this.title = ''
        this.description = ''
      } else {
        this.roleId = obj.roleId
        this.name = obj.name
        this.title = obj.title
        this.description = obj.description
      }
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        form: {},
        rules: UpmsRole.rules
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (id === undefined) {
          this.form = new UpmsRole()
        } else {
          getRoleById(id).then(res => {
            this.form = new UpmsRole(res.data.upmsRole)
          })
        }
      },
      saveRole () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            let service = this.form.roleId === '' ? addRole(this.form) : updateRole(this.form)
            service.then(result => {
              let {msg, code} = result
              if (code !== 1) {
                this.$message.error(msg)
              } else {
                bus.$emit('upmsRoleChange')
                this.dialogVisible = false
              }
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    },
    mounted () {
    }
  }
</script>
