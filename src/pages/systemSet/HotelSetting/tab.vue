<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick" addable @tab-add="addTabPane" @tab-remove="removeTab">
      <el-tab-pane label="基础信息" name="syshotelinformation" v-if="hasPerm('pms:hotelSetting:hotelInfo')">
        <sys-hotel-information ref="syshotelinformation"/>
      </el-tab-pane>
      <el-tab-pane label="地址信息" name="sysHotelAddressInfo" v-if="hasPerm('pms:hotelSetting:address')">
        <sys-hotel-address-info ref="sysHotelAddressInfoRefs"/>
      </el-tab-pane>
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.imagesTypeId + item.typeName"
        :name="item.imagesTypeId"
        style="height:500px;overflow-y: auto;"
        closable
      >
        <el-tooltip slot="label" effect="dark" content="双击修改标签" placement="top">
          <span class="text-style" @dblclick="dbClick(item)">{{item.typeName}}</span>
        </el-tooltip>
        <images-edit :imagePos.sync="dataForm.images" :id.sync="item.imagesTypeId" ref="imagesEditRefs"></images-edit>

        <span class="span-footer">
          <el-button @click="resetData(item.imagesTypeId)" size="mini">重 置</el-button>
          <el-button type="primary" size="mini" @click="saveData(item.imagesTypeId)" :loading="loading">保 存</el-button>
        </span>
      </el-tab-pane>
    </el-tabs>

		<!-- 图片类型编辑 -->
		<images-type-edit ref="imagesTypeEditRefs" @callback="refreshTabPane"></images-type-edit>
  </div>
</template>

<script>
  import SysHotelInformation from './SysHotelInformation'
  import SysHotelAddressInfo from './SysHotelAddressInfo'
  import { sourceImgUrl } from "@/api/upload"
  import { listApi, deleteApi } from "@/api/ModuleImagesTypeApi"
  import ImagesTypeEdit from "@/components/ImagesComponent/ImagesTypeEdit"
  import ImagesEdit from "@/components/ImagesComponent/ImagesEdit"
  import { listApi as imagesListApi, addBatchApi } from "@/api/ModuleImagesApi"

  
  export default {
    components: {
      SysHotelInformation,
      SysHotelAddressInfo,
      ImagesTypeEdit,
      ImagesEdit
    },
    data () {
      return {
        activeName: '',
        editableTabs: [],
        dataForm: {
          images: []
        },
        companyPk: JSON.parse(localStorage.getItem("current_logon_company")).companyPk,
        loading: false,
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
      this.handleClick();
      this.refreshTabPane();
    },
    methods: {
      handleClick (tab, event) {
        if (this.activeName == 'syshotelinformation'){
          var child = this.$refs.syshotelinformation
          child.init()
        } else if (this.activeName == 'sysHotelAddressInfo') {
          this.$refs.sysHotelAddressInfoRefs.init();
        } else {
          this.transmitParameters(tab.name)
        }
      },
			transmitParameters (imagesTypeId) {
				// this.$refs.imagesEditRefs[index].showDialog(imagesTypeId)
				let flag = false
				this.dataForm.images.forEach(element => {
					if (element.imagesTypeId == imagesTypeId) {
						flag = true
					}
				});
				if (flag) {
					return
				}
				imagesListApi({imagesTypeId: imagesTypeId}).then(res => {
					res.list.forEach(item => {
						// 图片包含http 或 https
						if (item.imageUrl.indexOf('http://') > -1 || item.imageUrl.indexOf('https://') > -1) {
							item.url = item.imageUrl
						} else {
							// 拼接上项目前缀http或https
							item.url = sourceImgUrl + item.imageUrl
						}
						this.dataForm.images.push(item)
					})
				})
			},
			dbClick (item) {
				this.$refs.imagesTypeEditRefs.showDialog(item.imagesTypeId, this.companyPk, "Hotel")
			},
			addTabPane () {
				this.$refs.imagesTypeEditRefs.showDialog(null, this.companyPk, "Hotel")
			},
			refreshTabPane (isDelete) {
				listApi({thirdId: this.companyPk, groupId: "Hotel"}).then(res => {
					this.editableTabs = res.list
					if (isDelete) {
						this.activeName = "syshotelinformation"
					}
				})
			},
			removeTab (imagesTypeId) {
        this.$confirm('是否确定删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					deleteApi({id: imagesTypeId}).then(result => {
						if(result.code == 1){
							this.$message({
								message: '删除成功',
								type: 'success'
							})
							this.refreshTabPane(true)
						}
					})
        })
      },
      resetData (imagesTypeId) {
        let data = this.dataForm.images
        for (let index = (data.length - 1); index >= 0; index--) {
          if (data[index].imagesId == undefined && data[index].imagesTypeId == imagesTypeId) {
            this.dataForm.images.splice(index, 1)
          }
        }
      },
      saveData (imagesTypeId) {
        this.loading = true
        addBatchApi(this.dataForm).then(result => {
          if(result.code == 1){
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            for (let index = (this.dataForm.images.length - 1); index >= 0; index--) {
              if (this.dataForm.images[index].imagesId == undefined && this.dataForm.images[index].imagesTypeId == imagesTypeId) {
                this.dataForm.images[index].imagesId = 1
              }
            }
          }
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
.text-style {
	display: inline-block;
	height: 40px;
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select:none;
}
.el-tabs--border-card{
  background: #fff;
  border: none !important;
  border-top: 1px solid #dcdfe6 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.span-footer {
  margin-left: 32px;
}
</style>
<style>
.goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
}
</style>

