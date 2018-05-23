<template>
  <div class="content-body">
    <el-row type="flex" class="row-bg">
      <el-col :span="10">
        <el-form :inline="true" :model="formTemplate" size="mini" class="demo-form-inline">
          <el-form-item label="模板名称">
            <el-input v-model="formTemplate.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addTemplate">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyTemplate">修改</el-button>
          </el-form-item>
        </el-form>
        <div class="tree-box">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1,2,3,4]"
            :props="defaultProps">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="14">
        <div style="margin-left:30px;">
          <el-table
          :data="tableData"
          border
          max-height="450"
          style="width: 100%">
          <el-table-column
            align="center"
            label="模板名称">
            <template slot-scope="props">
              {{props.row.name}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="props">
              <el-button type="text">禁用</el-button>
              <el-button type="text" @click="deleteTemplate">删除</el-button>
              <el-button type="text">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
        

      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formTemplate: {
        name: ""
      },
      data2: [
        {
          id: 1,
          label: "请选择团付项目",
          children: [
            {
              id: 2,
              label: "会员卡费",
              children: [
                {
                  id: 2.1,
                  label: "会员卡费调整"
                },
                {
                  id: 2.2,
                  label: "会员卡费"
                }
              ]
            },
            {
              id: 3,
              label: "电话费",
              children: [
                {
                  id: 3.1,
                  label: "电话费"
                }
              ]
            },
            {
              id: 4,
              label: "客房赔偿",
              children: [
                {
                  id: 4.1,
                  label: "损坏赔偿"
                },
                {
                  id: 4.2,
                  label: "赔偿"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [
        {
          name: "默认系统模板"
        },
        {
          name: "其他模板"
        },
        {
          name: "测试"
        },
        {
          name: "最新"
        }
      ]
    };
  },
  methods: {
    addTemplate() {
      if(this.formTemplate.name == '') {
        this.$alert('模板名称不能为空', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        })
      } else {
        var obj = {};
        obj.name = this.formTemplate.name;
        this.tableData.push(obj)
      }
    },
    modifyTemplate() {},
    deleteTemplate() {
      this.$confirm("确认删除？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 20px;
}
.tree-box {
  height: 400px;
  overflow-y: auto;
  background-color: #ffffff;
}
</style>
