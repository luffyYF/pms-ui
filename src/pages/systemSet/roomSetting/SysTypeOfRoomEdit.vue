
// 会员规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="room-type">
		<el-dialog class="add-permission" :title="title" top="8vh" :visible.sync="dialogVisible" width="700px"
							:close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="dataForm" :model="dataForm.typePo" :rules="rules" label-width="106px">
				<el-tabs type="border-card" v-model="activeName">
					<el-tab-pane name="one" label="房型设置" style="height:500px;overflow-y: auto;">
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="代码" label-width="70px" prop="typeCode" size="mini">
									<el-input v-model="dataForm.typePo.typeCode" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="名称" label-width="70px" size="mini" prop="typeName">
									<el-input v-model="dataForm.typePo.typeName" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="简称" label-width="70px" size="mini">
									<el-input v-model="dataForm.typePo.typeDescribe" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="全价" label-width="70px" size="mini">
									<el-input v-model="dataForm.typePo.price" type="number" min="0" step="0.1" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="起步价" label-width="70px" size="mini">
									<el-input v-model="dataForm.typePo.beginPrice" type="number" min="0" step="0.1" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="加收价" label-width="70px" size="mini">
									<el-input v-model="dataForm.typePo.unitPrice" type="number" min="0" step="0.1" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="封顶额" label-width="70px" size="mini">
									<el-input v-model="dataForm.typePo.cappingPrice" type="number" min="0" step="0.1" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="预收房费" label-width="70px" size="mini">
									<el-input v-model="dataForm.typePo.roomPrice" type="number" min="0" step="0.1" style="width:224px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注" label-width="70px" size="mini">
								<el-input v-model="dataForm.typePo.remark" type="textarea" rows="6" style="width:554px"></el-input>
							</el-form-item>
						</el-col>
					</el-tab-pane>
					<el-tab-pane name="two" label="扩展设置" style="height:500px;overflow-y: auto;">
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="面积" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.area" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="早餐" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.breakfastDesc" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="楼层" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.storeyDesc" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="窗户" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.windowDesc" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="可住人数" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.customerNum" type="number" min="1" step="1" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="宽带" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.broadbandDesc" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="卫浴" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.bathroomDesc" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="空调" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.airConditionerDesc" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-col :span="12">
								<el-form-item label="浴室配套" label-width="70px" size="mini">
									<el-input v-model="dataForm.extendPo.bathroomMatchingDesc" style="width:244px"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="是否取消" label-width="70px" size="mini">
									<el-select v-model="dataForm.extendPo.cancelFlag" style="width:244px" disabled>
										<el-option label="不可取消" :value="0"></el-option>
										<el-option label="可取消" :value="1"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-col>
						<el-col :span="24">
							<el-form-item label="描述" label-width="70px" size="mini">
								<el-input v-model="dataForm.extendPo.description" type="textarea" rows="3" style="width:573px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="预定说明" label-width="70px" size="mini">
								<el-input v-model="dataForm.extendPo.reserveDesc" type="textarea" rows="3" style="width:573px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="使用规则" label-width="70px" size="mini">
								<el-input v-model="dataForm.extendPo.usageRuleDesc" type="textarea" rows="3" style="width:573px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="封面图" label-width="70px" size="mini">
          			<upload-avatar :avatar.sync="dataForm.extendPo.coverImage"></upload-avatar>
							</el-form-item>
						</el-col>
					</el-tab-pane>
					<el-tab-pane name="three" label="图片设置" style="height:500px;overflow-y: auto;">
						<el-col :span="24">
							<el-form-item label="轮播图" label-width="70px" size="mini">
								<el-upload
									class="upload-demo"
    							:action="getUploadImageAction()"
									:on-preview="handlePreview"
									:on-remove="handleRemove"
    							:headers="headers"
									:file-list="dataForm.imagePos"
									list-type="picture-card"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-tab-pane>
				</el-tabs>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="saveData" :loading="loading">{{dataForm.typePo.typePk == '' ? '保存' : '修改'}}</el-button>
			</span>
		</el-dialog>

		<el-dialog title="设置排序" :visible.sync="dialogFormVisible" width="400px" append-to-body>
			<el-form size="small">
				<el-form-item label="排序" label-width="100px" style="margin: 10px 0">
					<el-input-number v-model="num" :min="0" :step="1" ></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="returnNum" size="mini">确 定</el-button>
			</div>
		</el-dialog>
  </section>
</template>

<script>  
import {updateRoomType,addRoomType,roomTypeDetail} from '@/api/utils/pmsTypeController'
import UploadAvatar from "@/components/UploadImage/UploadAvatar2";
import { getUploadImageAction } from "@/api/upload"
import {sourceImgUrl} from '@/api/upload'

  export default {
  	components: {UploadAvatar},
    data () {
      return {
        dialogVisible: false,
				loading: false,
				activeName: "one",
        dataForm: {
          typePo: {
            typePk: '',
            typeCode: '',
            typeMaster: 'ROOM_TYPE', 
            typeName: '', 
            integralFlag:'N',
            monthlyRent:'',
            sortNum:'',
            usingFlag:'N',
            typeDescribe:'',
            basePrice: 0,
            price: 0,
            beginPrice: 0,
            unitPrice: 0,
            cappingPrice: 0,
            roomPrice: 0,
            remark: ""
					},
					extendPo: {
						area: '20m²',
						breakfastDesc: '无早餐',
						storeyDesc: '13-28层',
						windowDesc: '有窗',
						customerNum: 2,
						broadbandDesc: '免费WiFi和宽带',
						bathroomDesc: '独立卫浴',
						airConditionerDesc: '有空调',
						bathroomMatchingDesc: '24小时热水、洗漱工具',
						cancelFlag: 0,
						description: '订单确认后不可变更/取消，如未入住，酒店将扣除全额房费',
						reserveDesc: '·15分钟内确认订单\n·发票有代理商开具，如需发票，请在下单时填写发票信息',
						usageRuleDesc: '·直接消费，无需美团劵，携带所有入住人的有效身份证件办理入住，入住必须按照一人一证\n' +
						'·请于14:00之后入住并与次日13:00之前退房；如需提前入住或延时退房，请咨询商家\n' +
						'·入住需要押金，金额以前台为准',
						coverImage: '',
					},
          imagePos: []
        },
        title:"",
        rules: {//表单验证
          typeCode: [
            { required: true, message: '请填写代码', trigger: 'blur' },
          ],
          typeName: [
            { required: true, message: '请填写名称', trigger: 'blur' }
          ],
				},
        getUploadImageAction: getUploadImageAction,
				headers: {'Authorization': 'Bearer '+localStorage.getItem('pms_token') },
				dialogFormVisible: false,
				num: 0,
				url: null,
      }
    },
    methods: {
      showDialog (id) {
        if (id) {
					this.title = '修改房型'
					this.findDetail(id)
        } else {
          this.title = '添加房型'
          this.resetForm()
        }
        if (this.$refs.dataForm != undefined) {
          this.$refs.dataForm.clearValidate()
        }
				this.activeName = "one"
        this.dialogVisible = true
      },
      resetForm () {
        this.dataForm = {
          typePo: {
            typePk: '',
            typeCode: '',
            typeMaster: 'ROOM_TYPE', 
            typeName: '', 
            integralFlag:'N',
            monthlyRent:'',
            sortNum:'',
            usingFlag:'N',
            typeDescribe:'',
            basePrice: 0,
            price: 0,
            beginPrice: 0,
            unitPrice: 0,
            cappingPrice: 0,
            roomPrice: 0,
            remark: ""
					},
					extendPo: {
						area: '20m²',
						breakfastDesc: '无早餐',
						storeyDesc: '13-28层',
						windowDesc: '有窗',
						customerNum: 2,
						broadbandDesc: '免费WiFi和宽带',
						bathroomDesc: '独立卫浴',
						airConditionerDesc: '有空调',
						bathroomMatchingDesc: '24小时热水、洗漱工具',
						cancelFlag: 0,
						description: '订单确认后不可变更/取消，如未入住，酒店将扣除全额房费',
						reserveDesc: '·15分钟内确认订单\n·发票有代理商开具，如需发票，请在下单时填写发票信息',
						usageRuleDesc: '·直接消费，无需美团劵，携带所有入住人的有效身份证件办理入住，入住必须按照一人一证\n' +
						'·请于14:00之后入住并与次日13:00之前退房；如需提前入住或延时退房，请咨询商家\n' +
						'·入住需要押金，金额以前台为准',
						coverImage: '',
					},
          imagePos: []
        }
      },
      saveData(){ 
        const self = this;
        self.loading = true
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            if(self.dataForm.typePo.typePk == ''){
              addRoomType(self.dataForm).then(result => {
                if(result.code == 1){
                  self.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                }
                self.dialogVisible = false
                this.$emit('callback')
              }).finally(() => {
                self.loading = false
              })
            }else{
              updateRoomType(self.dataForm).then(result => {
                if(result.code == 1){
                  self.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                }
                self.dialogVisible = false
                this.$emit('callback')
              }).finally(() => {
                self.loading = false
              })
            }
          } else {
            self.loading = false
          }
        });
      },
      handleClose () {
        this.dialogVisible = false
        this.$emit('callback')
			},
      // 头像上传成功回调
      handleAvatarSuccess (res, file) {
				let url
				// 图片包含http 或 https
				if (res.data.indexOf('http://') > -1 || res.data.indexOf('https://') > -1) {
					url = res.data
				} else {
					// 拼接上项目前缀http或https
					url = sourceImgUrl + res.data
				}
				this.dataForm.imagePos.push({name: file.name, imgUrl: res.data, url: url, sortNum: 0})
        // this.$emit('update:avatar', res.data)
      },
      // 头像上传前执行
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
			},
			handleRemove(file, fileList) {
				for (let i = 0; i < this.dataForm.imagePos.length; i++) {
					if (this.dataForm.imagePos[i].imgUrl == file.imgUrl) {
						this.dataForm.imagePos.splice(i, 1)
					}
				}
        console.log(this.dataForm.imagePos);
      },
      handlePreview(file) {
				console.log(file);
				this.num = file.sortNum
				this.url = file.imgUrl
				this.dialogFormVisible = true
			},
			returnNum () {
				this.dataForm.imagePos.forEach(item => {
					if (item.imgUrl == this.url) {
						item.sortNum = this.num
					}
				})
				this.dialogFormVisible = false
			},
			findDetail (typePk) {
				roomTypeDetail({typePk: typePk}).then(res => {
					console.log(res.data.extendPo == null)
					this.dataForm.typePo = res.data.typePo
					if (res.data.extendPo == null) {
						this.dataForm.extendPo = {
							area: '',
							breakfastDesc: '',
							storeyDesc: '',
							windowDesc: '',
							customerNum: 2,
							broadbandDesc: '',
							bathroomDesc: '',
							airConditionerDesc: '',
							bathroomMatchingDesc: '',
							cancelFlag: 0,
							description: '',
							reserveDesc: '',
							usageRuleDesc: '',
							coverImage: '',
						}
					} else {
						this.dataForm.extendPo = res.data.extendPo
					}
					res.data.imagePos.forEach(item => {
						// 图片包含http 或 https
						if (item.imgUrl.indexOf('http://') > -1 || item.imgUrl.indexOf('https://') > -1) {
							item.url = item.imgUrl
						} else {
							// 拼接上项目前缀http或https
							item.url = sourceImgUrl + item.imgUrl
						}
					})
					this.dataForm.imagePos = res.data.imagePos
				})
			},
    }
  }
</script>

<style>
.upload-demo .el-icon-zoom-in:before {
	content: "\e638";
}
.room-type .el-tabs__content {
  padding: 20px 20px !important;
}
.room-type .el-dialog__body{
  padding:20px 0 10px !important;
}
.room-type .el-transfer-panel{
  width:300px;
}
</style>