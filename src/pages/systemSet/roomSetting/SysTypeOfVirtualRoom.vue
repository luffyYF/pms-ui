// pms虚拟房型表列表
// Created by Administrator on 2019-05-28T10:43:54.507.
<template>
  <div class="app-container">
    <!--搜索条件-->
    <div class="filter-container">
			<el-row>
				<el-col :span="10">
					状态:
					<el-select v-model="listQuery.status" placeholder="请选择状态" style="width: 200px; margin-right: 15px;" size="mini" @keyup.enter.native="listSearch">
						<el-option label="全部" :value="null"></el-option>
						<el-option label="启用" :value="1"></el-option>
						<el-option label="禁用" :value="0"></el-option>
					</el-select>
					<el-button type="primary" icon="el-icon-search" @click="listSearch" size="mini">查询</el-button>
				</el-col>
				<el-col :span="14">
					<el-button type="primary" icon="el-icon-delete" @click="delBatchClick" v-if="hasPerm('pms:virtualRoomType:add')"
										style="margin-left:5px; float: right;" size="mini">批量删除
					</el-button>
					<el-button type="primary" icon="el-icon-plus" @click="addClick" v-if="hasPerm('pms:virtualRoomType:delBatch')"
										style="margin-left:0; float: right;" size="mini">添加
					</el-button>
				</el-col>
			</el-row>
    </div>
    <!--表格-->
    <div class="table-container">
      <el-table
        :data="rows"
				class="virtual-tab"
        header-cell-class-name="header-color"
				cell-class-name="cell-color"
        fit
				max-height="550"
        size="small"
        highlight-current-row
        style="width: 100%;"
        v-loading="loading"
				@selection-change="handleSelectionChange">
        <!-- 需要映射的表 -->
				<el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="虚拟房型" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="typeName" label="物理房型" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="status" label="状态" align="left" min-width="150" show-overflow-tooltip>
					<template slot-scope="scope">
						<span v-if="scope.row.status == 1">启用</span>
						<span v-else>禁用</span>
					</template>
        </el-table-column>
        <el-table-column prop="channelCode" label="渠道" align="left" min-width="150" show-overflow-tooltip>
					<template slot-scope="scope">
						<span v-if="scope.row.channelCode == 'WXDD'">微信订单</span>
						<span v-else-if="scope.row.channelCode == 'XC'">携程</span>
						<span v-else-if="scope.row.channelCode == 'MT'">美团</span>
						<span v-else-if="scope.row.channelCode == 'WXDFXCX'">微信订房小程序</span>
						<span v-else-if="scope.row.channelCode == 'HC'">赫程</span>
						<span v-else></span>
					</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="left" min-width="150" show-overflow-tooltip/>
    
        <el-table-column label="操作" align="left" fixed="right" min-width="130">
          <template slot-scope="scope">
            <el-button type="text" @click="editClick(scope.row.virtualPk)" v-if="hasPerm('pms:virtualRoomType:edit')"
                       size="mini" class="el-icon-edit">修改
            </el-button>
            <el-button type="text" @click="deleteClick(scope.row.virtualPk)"
                       v-if="hasPerm('pms:virtualRoomType:del')" size="mini" class="el-icon-delete">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        class="page-container"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--添加、修改组件-->
    <SysTypeOfVirtualRoomEdit ref="sysTypeOfVirtualRoomEditRef" @callback="listSearch"/>
  </div>
</template>
<script>
  import { deleteApi, listApi, delBatchApi } from '@/api/pmsVirtualRoomTypeApi'
  import SysTypeOfVirtualRoomEdit from './SysTypeOfVirtualRoomEdit'

  export default {
    components: { SysTypeOfVirtualRoomEdit },
    data () {
      return {
        loading: false,
        rows: [],
        listQuery: {
          systemId: null,
          title: null,
          permType: null,
          pageNum: 1,
					pageSize: 10,
					status: null,
        },
				total: 0,
				multipleSelection: [],
      }
    },
    methods: {
      listSearch () {
        this.loading = true
        listApi(this.listQuery).then(res => {
          this.total = Number(res.data.total)
          this.rows = res.data.list
        }).finally(() => {
          this.loading = false
        })
      },
      addClick () {
        this.$refs.sysTypeOfVirtualRoomEditRef.showDialog(this.listQuery.systemId)
      },
      editClick (id) {
        this.$refs.sysTypeOfVirtualRoomEditRef.showDialog(id)
      },
      deleteClick (id) {
        this.$confirm('确定删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteApi({ id: id }).then(res => {
            this.$message({ type: 'success', message: res.sub_msg })
            this.listSearch()
          })
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.listQuery.pageSize = val
        this.listSearch()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.listQuery.pageNum = val
        this.listSearch()
			},
			handleSelectionChange (val) {
				this.multipleSelection = val
				console.log(this.multipleSelection)
			},
			delBatchClick () {
				if (this.multipleSelection.length <= 0) {
					this.$message.warning("请选择一条数据")
					return
				}

				let virtualPks = ''
				this.multipleSelection.forEach(item => {
					virtualPks += item.virtualPk + ","
				});
				virtualPks = virtualPks.substring(0, virtualPks.length-1)

				this.$confirm('确定批量删除这些数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delBatchApi({ virtualPks: virtualPks }).then(res => {
            this.$message({ type: 'success', message: res.sub_msg })
            this.listSearch()
          })
        })
			},
    }
  }
</script>

<style scoped>
.table-container {
	margin-top: 20px !important;
}
.page-container {
	margin: 10px 0 !important; 
	float: right !important;
}
</style>

<style>
.virtual-tab .header-color {
	background-color: #f7f7f7;
	height: 50px;
	line-height: 25px;
}
.virtual-tab .cell-color {
	background-color: #ffffff;
	height: 50px;
	line-height: 25px;
}
</style>

