<template>
  <section>
    <el-col :span="24">
      <el-form :inline="true" :model="filters" size="medium">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAddress">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addClick">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table v-loading="loading" :data="props.row.child" border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.child" border style="width: 100%">
                  <el-table-column label="主键" prop="id">
                  </el-table-column>
                  <el-table-column label="地址名" prop="name">
                  </el-table-column>
                  <el-table-column label="类型" prop="type">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button @click="updateClick(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>

            <el-table-column label="主键" prop="id">
            </el-table-column>
            <el-table-column label="地址名" prop="name">
            </el-table-column>
            <el-table-column label="类型" prop="type">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="updateClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column label="主键" prop="id">
      </el-table-column>
      <el-table-column label="地址名" prop="name">
      </el-table-column>
      <el-table-column label="类型" prop="type">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" width="500px" :visible.sync="addressDialogVisible">
      <el-form :model="form" label-width="85px" ref="form" :rules="addressRules">
        <el-form-item label="地址名" prop="addressName" auto-complete="off">
          <el-input v-model="form.addressName" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址类型" prop="addressType">
          <el-select v-model="form.addressType" placeholder="请选择地址类型">
            <el-option v-for="(k,v) in addressType" :key="v" :label="k" :value="v">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addressDialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="addressLoading" @click="saveAddress()">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script >
  import {getAddressTree, addAddress, updateAddress, delAddress} from '@/api/address'
  export default {
    data () {
      return {
        addressDialogVisible: false,
        loading: false,
        addressLoading: false,
        filters: {name: ''},
        tableData: [],
        form: {
          addressPk: '',
          addressName: '',
          addressType: ''
        },
        addressRules: {
          addressName: [
            {required: true, message: '请填写地址名', trigger: 'blur'}
          ],
          addressType: [
            {required: true, message: '请选择地址类型', trigger: 'blur'}
          ]
        },
        addressType: {
          PROVINCE: '省',
          CITY: '市',
          AREA: '区'
        }
      }
    },
    methods: {
      addClick () {
        this.addressDialogVisible = true
        this.form = {
          addressPk: '',
          addressName: '',
          addressType: ''
        }
      },
      updateClick (row) {
        this.addressDialogVisible = true
        this.form.addressPk = row.id
        this.form.addressName = row.name
        this.form.addressType = row.type
      },
      saveAddress () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.addressLoading = true
            var service
            if (this.form.addressPk === '') {
              service = addAddress(this.form)
            } else {
              service = updateAddress(this.form)
            }
            service.then(result => {
              this.addressLoading = false
              let {msg, code} = result
              if (code !== 1) {
                this.$message({message: msg, type: 'error'})
              } else {
                this.getAddress()
                this.addressDialogVisible = false
              }
            })
          } else {
            return false
          }
        })
      },
      // 删除
      deleteClick (row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {ids: row.id}
          delAddress(para).then((res) => {
            this.$message({message: '删除成功', type: 'success'})
            this.getAddress()
          })
        }).catch(() => {

        })
      },
      getAddress () {
        this.loading = true
        getAddressTree().then(res => {
          this.loading = false
          this.tableData = res.data
        })
      }
    },
    mounted () {
      this.getAddress()
    }
  }
</script>
