<template>
  <div class="content-body" v-loading="loading">
    <!-- table -->
    <el-row>
      <el-col :span="5">
        <div class="bg-reserve book-info init_floor">
        <h5 class="info-title">楼层</h5>
        <el-form label-width="px" size="mini" :inline="true"  style="padding-left:10px">
          <el-form-item label="楼层号">
            <el-input-number v-model="storeyName" placeholder="请输入楼层号" class="block_input" :controls="false"></el-input-number>
          </el-form-item>
          <el-button @click="addStorey" type="primary" size="mini" style="margin-bottom: 16px;">添加</el-button>
        </el-form>
        <el-table size="mini" 
          border 
          :data="storeyData"
          @row-click.self="storeyRowClick"
          height="388">
          <el-table-column prop="storeyName" label="楼层" align="center">
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="delStorey(scope.row)" type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="18" :offset="1">
        <div class="bg-reserve book-info">
          <h5 class="info-title">【{{selectStorey.storeyName}}】房间属性</h5>
          <el-form label-width="20px" :inline="true" size="mini">
            <el-form-item label=" ">
              <el-button @click="openAddRoomDialog" type="primary">添加房间</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="batchAddRoomDialog = true" type="primary">批量生成房间</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="batchPropClick" type="primary">批量修改房间</el-button>
            </el-form-item>
            
          </el-form>
          <el-table size="mini" 
            border 
            :data="roomData"
            height="473">
            <el-table-column prop="roomNumber" label="房号" align="center">
            </el-table-column>
            <el-table-column prop="roomTypePk" label="房型" align="center">
              <template slot-scope="scope">
                <!-- <el-select v-model="scope.row.roomTypePk" disabled size="mini" class="colic" placeholder="请选择状态">
                  <el-option 
                    v-for="item in listTypeData"
                    :key="item.typePk"
                    :label="item.typeName"
                    :value="item.typePk"></el-option>
                </el-select> -->
                <span>{{listTypeDataView[scope.row.roomTypePk].typeName}}</span>
                <el-input v-if="scope.row.usingFlag == 'Y'" v-model="scope.row.overtimeBilling" size="mini" placeholder="请输入计费"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="intelligentFlag" label="智能锁" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.paramPk != null && scope.row.paramPk != ''">已安装</span>
                <span v-else>未安装</span>
              </template>
            </el-table-column>
            <el-table-column prop="param1" label="艾美信 楼栋编号" align="center">
              <template slot-scope="scope">
                  <span>{{scope.row.param1 | lockFilter(scope.row)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="param2" label="艾美信 楼层编号" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.param2 | lockFilter(scope.row)}}</span>
                  </template>
            </el-table-column>
            <el-table-column prop="param3" label="艾美信 房间编号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.param3 | lockFilter(scope.row)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="param1" label="RFL 锁号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.param1 | lockFilter2(scope.row)}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="telPhone" label="电话分机" align="center">
            </el-table-column>
            <el-table-column prop="telPhoneLine" label="电话外线" align="center">
            </el-table-column> -->
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button @click="lockViewClick(scope.row)" type="text" size="mini">智能锁</el-button>
                <el-button @click="deleteLockParamClick(scope.row.paramPk)" v-if="scope.row.paramPk != null && scope.row.paramPk != ''" type="text" size="mini">删除锁</el-button>
                <el-button @click="updateClick(scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="delRoom(scope.row)" type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <!-- 添加房间 -->
    <el-dialog title="添加房间" :visible.sync="addRoomDialog" width="820px">
      <el-form :model="addFrom" :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼层：">
          <span class="text-cs">{{selectStorey.storeyName}}</span>
        </el-form-item>
        <el-form-item label="房号：" required>
          <!-- <el-input v-model="addFrom.roomNumber" placeholder="请输入房号" auto-complete="off"></el-input> -->
          <el-input-number v-model="addFrom.roomNumber" placeholder="请输入房号" :controls="false" class="text_position"></el-input-number>
        </el-form-item>
        <el-form-item label="房间类型：" required>
          <el-select v-model="addFrom.roomTypePk" placeholder="请选择房间类型">
            <el-option 
              v-for="item in listTypeData"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="房间朝向：">
          <el-input v-model="addFrom.roomOrientation" placeholder="请输入房间朝向" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话分机：">
          <el-input v-model="addFrom.telPhone" placeholder="请输入电话分机" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话外线：">
          <el-input v-model="addFrom.telPhoneLine" placeholder="请输入电话外线" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="房间锁号：">
          <el-input v-model="addFrom.roomLockNumber" auto-complete="off" placeholder="请输入房间锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：房间锁号 请根据门锁软件中的对应房号进行配置</span>
        </el-form-item> -->
        <el-form-item label="概况：">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入概况"
            v-model="addFrom.roomSurvey"
            style="width:300px;">
          </el-input>
        </el-form-item>
        <br>
        <!-- <el-form-item label="智能门锁" prop="hardwarePk">
            <el-select size="mini"  @change="lockChange" style="width:90%;" v-model="addFrom.hardwarePk" placeholder="类型">
                <el-option v-for="y in lockList" :label="codeObj[y.brand]" :value="y.hardwarePk" :key="y.hardwarePk"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item :label="y.label" v-for="(y,i) in paramList" :key="i" required>
            <el-input v-if="y.type == 'text'" v-model="addFrom[y.key]" :placeholder="'请输入'+y.label" auto-complete="off"></el-input>
            <upload-avatar v-else-if="y.type == 'image'" :avatar.sync="addFrom[y.key]"></upload-avatar>
            <span style="color:red">{{y.remark}}</span>
        </el-form-item> -->

        <!-- <el-form-item style="display:block;margin-left:32px;">
            <el-checkbox label="艾美信" v-model="addFrom.intelligentFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="楼栋编号：" v-if="addFrom.intelligentFlag=='Y'" required>
          <el-input v-model="addFrom.intelligentBanNo" placeholder="请输入楼栋编号：" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼层编号：" v-if="addFrom.intelligentFlag=='Y'" required>
          <el-input v-model="addFrom.intelligentFloorNo" placeholder="请输入楼层编号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间编号：" v-if="addFrom.intelligentFlag=='Y'" required>
          <el-input v-model="addFrom.intelligentRoomNo" placeholder="请输入房间编号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item style="display:block;margin-left:32px;">
          <el-checkbox label="RFL门卡" v-model="addFrom.rflFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="RFL锁号：" v-if="addFrom.rflFlag=='Y'">
          <el-input v-model="addFrom.rflLockNo"  auto-complete="off" placeholder="请输入RFL锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：8位数字</span>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoomDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addRoom" size="mini" :loading="commitLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改房间 -->
    <el-dialog title="修改房间" :visible.sync="updateRoomDialog" width="820px">
      <el-form :model="selectRoom" :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼层：">
          <span class="text-cs">{{selectStorey.storeyName}}</span>
        </el-form-item>
        <el-form-item label="房号：">
          <span class="text-cs">{{selectRoom.roomNumber}}</span>
        </el-form-item>
        <el-form-item label="房间类型：">
          <el-select v-model="selectRoom.roomTypePk" placeholder="请选择房间类型">
            <el-option 
              v-for="item in listTypeData"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间朝向：">
          <el-input v-model="selectRoom.roomOrientation" placeholder="请输入房间朝向" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话分机：">
          <el-input v-model="selectRoom.telPhone" placeholder="请输入电话分机" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话外线：">
          <el-input v-model="selectRoom.telPhoneLine" placeholder="请输入电话外线" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="房间锁号：">
          <el-input v-model="selectRoom.roomLockNumber" auto-complete="off" placeholder="请选择房间锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：房间锁号 请根据门锁软件中的对应房号进行配置</span>
        </el-form-item> -->
        <el-form-item label="概况：">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入概况"
            v-model="selectRoom.roomSurvey"
            style="width:300px;">
          </el-input>
        </el-form-item>
        <br>
        <!-- <el-form-item label="智能门锁" prop="hardwarePk">
            <el-select size="mini"  @change="lockChange" style="width:90%;" v-model="selectRoom.hardwarePk" placeholder="类型">
                <el-option v-for="y in lockList" :label="HOTEL_HARDWARE[y.brand]" :value="y.hardwarePk" :key="y.hardwarePk"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item :label="y.label" v-for="(y,i) in paramList" :key="i" required>
            <el-input v-if="y.type == 'text'" v-model="selectRoom[y.key]" :placeholder="'请输入'+y.label" auto-complete="off"></el-input>
            <upload-avatar v-else-if="y.type == 'image'" :avatar.sync="selectRoom[y.key]"></upload-avatar>
            <span style="color:red">{{y.remark}}</span>
        </el-form-item> -->
        <!-- <el-form-item style="display:block;margin-left:32px;">
          <el-checkbox label="艾美信" v-model="selectRoom.intelligentFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="楼栋编号：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <el-input v-model="selectRoom.intelligentBanNo" placeholder="请输入楼栋编号：" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼层编号：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <el-input v-model="selectRoom.intelligentFloorNo" placeholder="请输入楼层编号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间编号：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <el-input v-model="selectRoom.intelligentRoomNo" placeholder="请输入房间编号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item style="width:100%;" label="授权图片：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <upload-avatar :avatar.sync="selectRoom.authorizedPicture"></upload-avatar>
        </el-form-item>
        <el-form-item label="门锁图片：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <upload-avatar :avatar.sync="selectRoom.lockPictures"></upload-avatar>
        </el-form-item>

        <el-form-item style="display:block;margin-left:32px;">
          <el-checkbox label="RFL门卡" v-model="selectRoom.rflFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="RFL锁号：" v-if="selectRoom.rflFlag=='Y'">
          <el-input v-model="selectRoom.rflLockNo"  auto-complete="off" placeholder="请输入RFL锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：8位数字</span>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRoomDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateRoom" size="mini" :loading="commitLoading">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 批量添加房间 -->
    <el-dialog title="批量添加房间" :visible.sync="batchAddRoomDialog" width="820px">
      <el-form :model="previewData" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼层：" required>
          <el-select v-model="previewData.storeyPk" prop="storeyPk" placeholder="请选择房间类型" @change="enters">
            <el-option 
              v-for="item in storeyData"
              :key="item.storeyPk"
              :label="item.storeyName"
              :value="item.storeyPk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型：" required>
          <el-select v-model="previewData.roomTypePk" prop="roomTypePk" placeholder="请选择房间类型" @change="enters">
            <el-option 
              v-for="item in listTypeData"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房号前缀：">
          <el-input v-model="previewData.prefix" class="el-select" prop="prefix" @keyup.enter.native="enters" @blur="enters" placeholder="请输入房号前缀"></el-input>
        </el-form-item>
        <el-form-item label="房间数量：" required>
          <!-- <el-input class="text-cs" v-model="previewData.roomNum" prop="roomNum" @keyup.enter.native="enters" @blur="enters" placeholder="请输入房间数量"></el-input> -->
          <el-input-number class="text-cs" v-model="previewData.roomNum" controls-position="right" @keyup.enter.native="enters" @blur="enters" placeholder="请输入房间数量" :min="1" :max="20"></el-input-number>
          <span class="red">单次添加房间数量不能大于20</span>
        </el-form-item>
        <el-form-item label="过滤尾数：">
          <!-- <el-checkbox v-model="previewData.checked4" @change="enters">4</el-checkbox>
          <el-checkbox v-model="previewData.checked7" @change="enters">7</el-checkbox> -->
          <el-select v-model="value5" multiple placeholder="请选择" @change="enters">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding:0 20px;">
          说明：房间批量生成的房号由房间数量和房号前缀生成，如输入房间数量：“12”，房号前缀“A”，那么生成的房号为：A01、A02……A11、A812，如果前缀为空则生成的房间号为：楼层+01。 
        </el-form-item>
        <h4>房间预览</h4>
        <div class="roomsList">
          <el-form-item v-for="(itemP, index) in previewRoomes" :label="itemP.roomNumber" :key="itemP.roomNumber"  label-width="60px" style="padding:10px;margin-bottom: 0px;">
            <el-select v-model="itemP.roomTypePk" style="width:130px;" placeholder="请选择房间类型">
              <el-option 
                v-for="item in listTypeData"
                :key="item.typePk"
                :label="item.typeName"
                :value="item.typePk"></el-option>
            </el-select>
            <el-button type="danger" icon="el-icon-delete" @click="deleteRow(index,previewRoomes)"></el-button>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchAddRoomDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addRooms()" size="mini" :loading="commitLoading">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="智能锁设置" :visible.sync="roomLockDialog" width="820px">
      <el-form  :model="roomLockObj" :label-width="formLabelWidth" :inline="true" size="mini">
        
        <el-form-item label="智能门锁" prop="hardwarePk">
            <el-select size="mini"  @change="lockChange" style="width:90%;" v-model="roomLockObj.hardwarePk" placeholder="类型">
                <el-option v-for="y in lockList" :label="HOTEL_HARDWARE[y.brand]" :value="y.hardwarePk" :key="y.hardwarePk"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item :label="y.label" v-for="(y,i) in paramList" :key="i" required>
            <el-input v-if="y.type == 'text'" v-model="roomLockObj[y.key]" :placeholder="'请输入'+y.label" auto-complete="off"></el-input>
            <upload-avatar v-else-if="y.type == 'image'" :avatar.sync="roomLockObj[y.key]"></upload-avatar>
            <span style="color:red">{{y.remark}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roomLockDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveRoomLock" size="mini" >保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量编辑房间" :visible.sync="batchPropDialog" width="820px">
      <el-form  :rules="propRules" :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="属性" >
          <el-checkbox @change="propChange(obj.check,i)" v-for="(obj,i) in propList" :key="i" v-model="obj.check">{{obj.label}}</el-checkbox>
        </el-form-item>
        <el-form-item :label="obj.label" v-if="obj.check" v-for="(obj,index) in propList" :key="index" required>
            <el-select v-if="obj.key == 'roomTypePk'" v-model="obj.value" >
                <el-option 
                v-for="item in listTypeData"
                :key="item.typePk"
                :label="item.typeName"
                :value="item.typePk">
                </el-option>
            </el-select>
            <el-input v-else :type="obj.type" v-model="obj.value" :placeholder="'请输入'+obj.label" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchPropDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveBatchClck" size="mini" >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addStorey, listStorey, delStorey, listRoom,listStoreyRoom,batchUpdateRoomProp, addRoom, addRooms, updateRoom, delRoom, previewRooms} from '@/api/systemSet/roomSetting/floorRoom'
import {listType} from '@/api/utils/pmsTypeController'
import UploadAvatar from "@/components/UploadImage/UploadAvatar2";
import {allListApi } from '@/api/systemSet/hotelHardware/hotelHardware'

import {addApi,updateApi,detailApi,deleteApi } from '@/api/systemSet/hotelHardware/DeviceRoomLockParamApi'
export default {
  components: {UploadAvatar},
  data() {
    return {
      commitLoading:false,
      formLabelWidth: '120px',
      addRoomDialog: false,
      updateRoomDialog: false,
      batchAddRoomDialog: false,
      loading:false,
      storeyName: undefined,
      storeyData: [],
      selectStorey:{storeyName:'未选择'},
      selectRoom: {},
      roomData: [],
      previewData:{},
      previewRoomes:[],
      listTypeData: [],
      listTypeDataView: {},
      rules: {
        storeyPk: [{ required: true, message: ''}],
        roomTypePk: [{ required: true, message: ''}],
        roomNum:[{ type: 'number', message: '必须为数字值'}]
      },
      addFroms:{
        "doorLockKey": "",
        "remark": "",
        "roomCharacteristic": "",
        "roomImg": "",
        // "roomLockNumber": "",
        "roomName": "",
        "roomNumber": "",
        "roomOrientation": "",
        "roomPk": "",
        "roomSurvey": "",
        "roomTypePk": "",
        "storeyName": "",
        "storeyPk": "",
        "telPhone": "",
        "telPhoneLine": "",
      },
      addFrom: {
        "doorLockKey": "",
        "remark": "",
        "roomCharacteristic": "",
        "roomImg": "",
        // "roomLockNumber": "",
        "roomName": "",
        "roomNumber": "",
        "roomOrientation": "",
        "roomPk": "",
        "roomSurvey": "",
        "roomTypePk": "",
        "storeyName": "",
        "storeyPk": "",
        "telPhone": "",
        "telPhoneLine": "",
        "intelligentFlag": "N",
        "rflFlag": "N",
        "intelligentBanNo":null,
        "intelligentFloorNo":null,
        "intelligentRoomNo":null,
        "rflLockNo":null,
        "hardwarePk":""
      },
      options: [
        {
          label: "0",
          value: "0"
        },{
          label: "1",
          value: "1"
        },{
          label: "2",
          value: "2"
        },{
          label: "3",
          value: "3"
        },{
          label: "4",
          value: "4"
        },{
          label: "5",
          value: "5"
        },{
          label: "6",
          value: "6"
        },{
          label: "7",
          value: "7"
        },{
          label: "8",
          value: "8"
        },{
          label: "9",
          value: "9"
        }
      ],
      value5: [],

      //智能锁
      lockList:[],
      lockObj:{

      },
      //批量修改属性 begin
      propRules:{
        roomTypePk: [{ required: true, message: '请选择房间类型', trigger: 'change' }],
        roomOrientation: [{ required: true, message: '请填写房间朝向', trigger: 'blur' }],
        telPhone: [{ required: true, message: '请填写电话分机', trigger: 'blur' }],
        telPhoneLine: [{ required: true, message: '电话外线', trigger: 'blur' }],
        roomSurvey: [{ required: true, message: '概况', trigger: 'blur' }],
      },
      propList:[
        {key:"roomTypePk",type:"select",label:"房间类型",check:false,value:""},
        {key:"roomOrientation",type:"text",label:"房间朝向",check:false,value:""},
        {key:"telPhone",type:"text",label:"电话分机",check:false,value:""},
        {key:"telPhoneLine",type:"text",label:"电话外线",check:false,value:""},
        {key:"roomSurvey",type:"textarea",label:"概况",check:false,value:""},
      ],
      batchPropDialog:false,

      // propObj:{
      //   roomTypePk: "",
      //   roomOrientation: "",
      //   telPhone: "",
      //   telPhoneLine: "",
      //   roomSurvey: "",
      //   storeyPk:""
      // },
      //批量修改属性 end
      codeObj:this.HOTEL_HARDWARE,
      paramList:[

      ],
      
      roomLockObj:{

      },
      roomLockDialog:false
      //智能锁
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    //批量修改属性 begin
    propChange(val,key){
      if(!val){
        this.propList[i].value = null
      }
    },
    batchPropClick(){
      if(this.selectStorey.storeyName == '未选择'){
        this.$message({
          message: '请选择楼层',
          type: 'warning'
        });
        return
      }
      this.batchPropDialog = true
    },
    saveBatchClck(){
      var pmsRoomPo = {
        
      }
      var props = []
      for(let i=0;i<this.propList.length;i++){
        if(this.propList[i].check ){
          if(this.propList[i].key == 'roomTypePk' && (this.propList[i].value == null || this.propList[i].value == "")){
            this.$message({ type: 'warning', message: '房间类型不能为空' })
            return
          }
          pmsRoomPo[this.propList[i].key] = this.propList[i].value
          props.push(this.propList[i].key)
        }
      }
      if(props == null |  props.length <= 0){
          this.$message({ type: 'warning', message: '请选择勾选要设置的参数' })
          return
      }
      var data = {
          storeyPk:this.selectStorey.storeyPk,
          props:props,
          pmsRoomPo:pmsRoomPo
      }
      batchUpdateRoomProp(data).then(res=>{
          this.batchPropDialog = false
          this.listStoreyRoom(this.selectStorey.storeyPk)
          this.$message({ type: res.code == 1?'success':'warning', message: res.sub_msg })
      })
    },
    //批量修改属性 end
    //智能锁
    saveRoomLock(){
        let dataForm = this.roomLockObj
        let api = null
        if(dataForm.hardwarePk){
          dataForm.hardwareCode = this.lockObj[dataForm.hardwarePk].code
        }
        if (dataForm.paramPk) {
          api = updateApi(dataForm)
        } else {
          api = addApi(dataForm)
        }
        api.then(res => {
            if(res.code == 1){
                this.$message({ type: 'success', message: res.sub_msg })
                this.roomLockDialog = false
                this.listStoreyRoom(this.selectStorey.storeyPk)
            }else{
                this.$message({ type: 'warning', message: res.sub_msg })
            }
        }).finally(() => {
        })
    },
    lockViewClick(row){
      this.roomLockObj = {roomPk:row.roomPk}
      if(row.paramPk != null && row.paramPk != ''){
        this.roomLockDetail(row.paramPk)
      }else{
        this.listAllLock()
      }
      this.roomLockDialog = true
    },
    roomLockDetail(id){
      detailApi({id:id}).then(res=>{
        this.roomLockObj = res.data
        this.listAllLock(true)
      })
    },
    deleteLockParamClick(id){
      this.$confirm('此操作将移除房间智能锁参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApi({id:id}).then(res=>{
          this.$message({
            message: res.sub_msg,
            type: res.code == 1?'success':'warning'
          });
          this.listStoreyRoom(this.selectStorey.storeyPk)
        })
      });
    },
    lockChange(val){
      let obj = this.lockObj[val]
      if(val != null){
        //艾美信
        if(obj.code.indexOf("AMX") != -1){
          this.paramList = [
            {label:"楼栋编号",type:"text",key:"param1",remark:""},
            {label:"楼层编号",type:"text",key:"param2",remark:""},
            {label:"房间编号",type:"text",key:"param3",remark:""},
            {label:"授权图片",type:"image",key:"param4",remark:""},
            {label:"门锁图片",type:"image",key:"param5",remark:""},
          ]
          //宏安兴
        }else if(obj.code.indexOf("HAX") != -1){
            this.paramList = [
              {label:"RFL锁号",type:"text",key:"param1",remark:"*注：8位数字"},
              {label:"酒店标识编码",type:"text",key:"param2",remark:""},
            ]
        }
      }
    },
    //智能锁
    init(){
      this.listStorey()
      this.listType()
    },
    numSort: function (a,b) {
      return a.count-b.count;
    },
    listAllLock(isEdit){
      allListApi({type:0}).then(res=>{
        let data = res.data
        this.lockList = data
        this.lockObj = {}
        for(let i=0;i<data.length;i++){
          this.lockObj[data[i].hardwarePk] = data[i]
        }
        if(isEdit && this.roomLockObj.hardwarePk != null && this.roomLockObj.hardwarePk != ""){
          this.lockChange(this.roomLockObj.hardwarePk)
        }
      })
    },
    listType(){
      const self = this
      self.listTypeDataView = {}
      // listType({typeMaster: 'ROOM_TYPE'}).then(result => {
      //   self.listTypeData = result.data.data
      //   self.listTypeData.forEach((value,key)=>{
      //     self.listTypeDataView[value.typePk] = value;
      //   })
      // })
      var typeList = JSON.parse(localStorage.getItem("pms_type"))
      self.listTypeData = []
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE"){
          self.listTypeData.push(item);
        }
      })
      self.listTypeData.forEach((value,key)=>{
        self.listTypeDataView[value.typePk] = value;
      })
    },
    listStorey(){
      const self = this
      self.loading = true
      listStorey().then(result => {
        self.storeyData = result.data
        self.loading = false
      }).catch(() => {
        self.loading = false
      })
    },
    addStorey(){
      if(!this.storeyName){
        this.$message.warning("楼层号不能为空")
        return;
      }
      let data = {storeyName: this.storeyName}
      const self = this
      addStorey(data).then(function(result){
        self.storeyName = undefined;
        self.$message({
          message: '添加成功',
          type: 'success'
        });
        self.listStorey();
      })
    },
    delStorey(obj){
      const self = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStorey({storeyPk: obj.storeyPk}).then(result => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          self.listStorey()
        })
      });
      
    },
    storeyRowClick(row, event, column){
      this.selectStorey = row
      this.loading = true
      this.listStoreyRoom(this.selectStorey.storeyPk)
    },
    listStoreyRoom(){
      const self = this;
      listStoreyRoom({storeyPk: self.selectStorey.storeyPk}).then(result => {
        self.roomData = result.data
        self.loading = false
      }).catch(() => {
        self.loading = false
      })
    },
    listRoom(storeyPk) {
      const self = this;
      listRoom({storeyPk: self.selectStorey.storeyPk}).then(result => {
        self.roomData = result.data
        self.loading = false
      }).catch(() => {
        self.loading = false
      })
    },
    openAddRoomDialog(){
      if(this.selectStorey.storeyName == '未选择'){
        this.$message({
          message: '请选择楼层',
          type: 'warning'
        });
      }else{
        // this.listAllLock()
        this.addFrom={intelligentFlag:'N',rflFlag:'N'}
        this.addRoomDialog = true
      }
    },
    addRoom() {
      this.commitLoading = true;
      const self = this
      self.addFrom.storeyPk = this.selectStorey.storeyPk
      // if(self.addFrom.hardwarePk != null && self.addFrom.hardwarePk != "" ){
      //   self.addFrom.hardwareCode = this.lockObj[self.addFrom.hardwarePk].code
      // }
      addRoom(self.addFrom).then(result => {
        if(result.code == 1){
          self.addFrom = self.addFroms
          self.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        this.listStoreyRoom(this.selectStorey.storeyPk)
        self.addRoomDialog = false 
      }).finally(()=>{
        this.commitLoading = false;
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addRooms(){
      this.commitLoading = true;
      const self = this
      self.addFrom.storeyPk = this.selectStorey.storeyPk
      addRooms(self.previewRoomes).then(result => {
        if(result.code == 1){
          self.addFrom = self.addFroms
          self.$message({
            message: '批量添加成功',
            type: 'success'
          })
        }
        this.listStoreyRoom(this.selectStorey.storeyPk)
        self.batchAddRoomDialog = false 
      }).finally(()=>{
        this.commitLoading = false;
      })
    },
    previewRoom(){
      const self = this
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          self.previewRoomes = [];
          if(self.previewData.roomNum > 20){
            return;
          }
          previewRooms(self.previewData).then(result => {
            if(result.code == 1){
              for (let index = 0; index < result.data.length; index++) {
                const element = result.data[index];
                self.previewRoomes.push({
                  roomNumber:element,
                  roomTypePk:self.previewData.roomTypePk,
                  storeyPk:self.previewData.storeyPk
                })
              }
            }
          })
        } else {
          return false;
        }
      });
      
    },
    
    updateClick(row){
      let str = JSON.stringify(row)
      this.selectRoom = JSON.parse(str)
      // this.listAllLock(true)
      this.updateRoomDialog = true
    },
    updateRoom(){
      this.commitLoading = true;
      const self = this
      delete this.selectRoom.createTime;
      delete this.selectRoom.updateTime;
      if(this.selectRoom.rflFlag=='N'){
        this.selectRoom.rflLockNo = ''
      }
      // if(self.selectRoom.hardwarePk != null && self.selectRoom.hardwarePk != "" ){
      //   self.selectRoom.hardwareCode = this.lockObj[self.selectRoom.hardwarePk].code
      // }
      updateRoom(this.selectRoom).then(result => {
        if(result.code == 1){
          self.$message({
            message: '修改成功',
            type: 'success'
          });
        }
        self.listStoreyRoom();
        self.updateRoomDialog = false
      }).finally(()=>{
        this.commitLoading = false;
      })
    },
    delRoom(obj){
      const self = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoom({roomPk: obj.roomPk}).then(result => {
          if(result.code == 1){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.storeyRowClick(this.selectStorey);
          }
          self.listStoreyRoom()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },
    enters(){
      this.previewData.filterTail = []
      this.value5.forEach(item => {
        this.previewData.filterTail.push(item)
      });
      // if(this.previewData.checked4){
      //   this.previewData.filterTail.push("4")
      // }

      // if(this.previewData.checked7){
      //   this.previewData.filterTail.push("7")
      // }
      this.previewRoom()
    }
  },
  filters:{
    lockFilter(v,v1){
      if(v1.paramPk != null && v1.hardwareCode != null &&  v1.hardwareCode.indexOf('AMX') != -1){
        return v
      }
      return ''
    },
    lockFilter2(v,v1){
      if(v1.paramPk != null && v1.hardwareCode != null &&  v1.hardwareCode.indexOf('HAX') != -1){
        return v
      }
      return ''
    },
  }
};
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
}
.bg-reserve {
  position: relative;
  background: #fff;
  margin-top: 10px;
  border: 1px solid #ccc;
}

.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.buttomst{
  text-align: center;
  margin-bottom: 20px;
}
.buttomst button{
  width: 80px;
}
.book-info{
  height: 520px;
  padding-top: 18px;
}
.book-info .el-col{
  padding-top: 18px; 
}
.book-info .sysbage{
  height: 100%;
  background: #f7f7f7;
  padding-top: 100px;
}
.el-select {
  width: 178px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
  padding-top: 18px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 178px;
}
.text-cs{
  width: 178px;
  display: block;
}
.text-cs{
  width: 178px;
  display: block;
}
.red{
  color:red;
}
.roomsList{
  width: 100%;
  height: 200px;
  overflow: auto;
  border: 1px solid #EBEEF5;
}
.colic{
  width: 120px;
}
/* .block_input{
  width:70%;
} */
</style>
<style>
.init_floor .el-input-number .el-input__inner {
  text-align: left;
}
.text_position .el-input__inner{
  text-align: left;
}
</style>
