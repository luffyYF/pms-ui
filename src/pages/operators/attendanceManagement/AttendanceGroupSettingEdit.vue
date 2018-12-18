<template>
  <section class="setting-container">
    <el-form ref="dataForm" :model="dataForm.groupSetting" label-width="120px" size="small">
      <el-form-item label="班次组" prop="groupId" class="width-50">
        <el-select v-model="dataForm.groupId" placeholder="请选择班次组" size="small" class="width-100" disabled>
          <el-option v-for="item in group" :key="item.groupId" :value="item.groupId" :label="item.groupName">
            <span style="float: left; margin-right: 20px">{{ item.groupName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.companyName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="允许迟到时长" prop="permitLateMinutes" class="width-50">
        <el-input size="small" v-model.number="dataForm.groupSetting.permitLateMinutes" type="number" :min="0">
          <template slot="append">分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="旷工迟到时长" prop="absenteeismLateMinutes" class="width-50">
        <el-input size="small" v-model.number="dataForm.groupSetting.absenteeismLateMinutes" type="number" :min="0">
          <template slot="append">分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="下班打卡" prop="isOffDutyFreeCheck">
        <el-radio-group v-model="dataForm.groupSetting.isOffDutyFreeCheck">
          <el-radio :label="0">不强制</el-radio>
          <el-radio :label="1">强制</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div>
      <label class="input-label">考勤地址列表</label>
      <el-button plain size="mini"  @click="addClick">添加</el-button>
      <span style="color: red">**注：可添加多个打卡地点，并设置有效打卡范围</span>
      <div class="address-list">
        <el-row>
          <el-col :span="24" v-for="(item, index) in dataForm.addresses" :key="index" class="over-col">
            <div class="inline-div">
              <p>地址简写： {{item.shortAddress}}</p>
              <p>详细地址： {{item.address}}</p>
              <p>打卡范围： {{item.scope}}米</p>
            </div>
            <span class="dialog-footer">
              <el-button type="text" size="small" @click="editClick(item,index)">编辑</el-button>
              <el-button type="text" size="small" @click="remove(index)">删除</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer-div">
      <span class="dialog-footers">
        <el-button type="primary" :loading="loading" size="mini" @click="saveClick" v-if="hasPerm('pms:planSetManage:add')">保 存</el-button>
        <el-button type="primary" size="mini" @click="resetClick">刷 新</el-button>
        <el-button size="mini" @click="backClick">返 回</el-button>
      </span>
    </div>
    
    <!--添加、修改组件-->
    <AttendanceAddressEdit ref="attendanceAddressEditRef" @callback="getValue"/>
  </section>
</template>
<script>
  import { getSettingAndAddress, addSettingAndAddress } from '@/api/oaApi'
  import { getAllApi } from '@/api/oaApi'
  import AttendanceAddressEdit from './AttendanceAddressEdit'

  export default {
    components: { AttendanceAddressEdit },
    data () {
      return {
        loading: false,
        dataForm: {
          groupId: this.$route.params.groupId,
          groupSetting: {
            groupSettingId: null,
            groupId: null,
            permitLateMinutes: 0,
            absenteeismLateMinutes: 0,
            isOffDutyFreeCheck: 0,
            isDelete: null,
            createTime: null
          },
          addresses: []
        },
        group: [],
      }
    },
    mounted () {
      this.findGroup()
      this.listSearch()
    },
    methods: {
      listSearch () {
        let self = this
        self.loading = true
        getSettingAndAddress({groupId: self.dataForm.groupId}).then(res => {
          if (res.data.groupSetting == null) {
            self.dataForm.groupSetting = {
              groupSettingId: null,
              groupId: null,
              permitLateMinutes: 0,
              absenteeismLateMinutes: 0,
              isOffDutyFreeCheck: 0,
              isDelete: null,
              createTime: null
            }
          } else {
            self.dataForm.groupSetting = res.data.groupSetting
          }
          self.dataForm.addresses = res.data.addresses
          self.loading = false
        })
      },
      addClick () {
        this.$refs.attendanceAddressEditRef.showDialog(null, null)
      },
      editClick (item, index) {
        this.$refs.attendanceAddressEditRef.showDialog(item, index)
      },
      //查询班次组
      findGroup () {
        getAllApi().then(res => {
          this.group = res.list
        });
      },
      getValue (data) {
        console.log(data);
        let str = JSON.stringify(data);
        let temp = JSON.parse(str);
        if (temp.index != null) {
          this.dataForm.addresses.splice(temp.index, 1, temp.dataForm);
        } else {
          this.dataForm.addresses.push(temp.dataForm);
        }
        console.log(this.dataForm.addresses);
      },
      remove (index) {
        this.dataForm.addresses.splice(index, 1)
      },
      saveClick () {
        this.loading = true
        addSettingAndAddress(this.dataForm).then(res => {
          this.$message({ type: 'success', message: res.sub_msg })
        }).finally(() => {
          this.loading = false
        })
      },
      resetClick () {
        this.findGroup()
        this.listSearch()
      },
      backClick () {
        this.$router.push("/operators/attendanceGroup");
      }
    }
  }
</script>

<style scoped>
.setting-container {
  background-color: #f7f7f7;
  padding: 40px 150px;
  width: calc(100% - 300px);
}
.width-100 {
  width: 100%;
}
.width-50 {
  width: 50%;
  min-width: 390px;
}
.input-label {
  width: 120px;
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 32px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.address-list {
  margin: 20px 0;
  height: 250px;
  border: 1px solid #ccc;
  background: #ffffff;
  margin-left: 120px;
}
.over-col {
  width: calc(100% - 20px);
  margin: 5px 10px;
  overflow: hidden;
  background: #FAFAFB;
  border: 1px solid #e7eaec;
  border-left: 3px solid #1c84c6;
}
.inline-div {
  display: inline-block;
  font-size: 13px;
  height: 72px;
}
.inline-div p {
  margin: 5px 0;
  padding-left: 10px;
}
.dialog-footer {
  width: 66px;
  height: 72px;
  line-height: 72px;
  padding-right: 10px;
  float: right;
}
.footer-div {
  overflow: hidden;
}
.dialog-footers {
  float: right;
}
.height-programme-one .twoLayerOfPage {
  height: 546px;
}
</style>
