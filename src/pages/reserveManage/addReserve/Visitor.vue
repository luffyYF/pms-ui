//客单
<template>
  <div class="guestOrder1002">
    <el-row>
      <el-col :span="9">
        <p class="visitor-title visitor-table">
          <span>预订<em class="font-normal">{{gsReserve}}</em>间</span>
          <span>在住<em class="font-normal">{{gsCheckin}}</em>间</span>
          <span>离店<em class="font-normal">{{gsLeave}}</em>间</span>
        </p>
        <div class="visitor-tabs">
          <h5 class="info-title">客单</h5>
          <el-table :data="currGuestList" height="176" border style="width: 100%;margin-top: 7px;" @row-click="guestTableClick" :row-class-name="tableRowClassName">
            <el-table-column prop="roomTypeName" label="房类" width="100"></el-table-column>
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="orderStatus" label="状态" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.pmsCancelFlag=='Y'" style="color:#999999">订单取消</span>
                <span v-else-if="scope.row.orderStatus=='LEAVE' || scope.row.orderStatus=='LEAVENOPAY' || scope.row.orderStatus=='NOSHOW'" style="color:#999999">{{orderStatusMap[scope.row.orderStatus]}}</span>
                <span v-else>{{orderStatusMap[scope.row.orderStatus]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="guestName" label="姓名" min-width="100">
              <template slot-scope="scope">
                <img v-if="scope.row.mainFlag=='Y'" src="../../../assets/image/main_guest.png" width="15" height="16" alt="主客人">
                <span>{{scope.row.guestName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="操作" :fixed="'right'">
              <template slot-scope="scope">
                <template v-if="scope.row.mainFlag=='Y' && scope.row.pmsCancelFlag!='Y'">
                  <el-button size="mini" type="text" v-if="scope.row.roomPk && scope.row.orderStatus=='RESERVE'" @click="guestCheckin(scope.row)">入住</el-button>
                  <el-button size="mini" type="text" v-if="scope.row.orderStatus=='CHECKIN'" @click="toCheckout">退房</el-button>
                </template> <br>
                <el-button size="mini" type="text" v-if="scope.row.orderStatus=='CHECKIN'" @click="dialogQRCodeSettingOpen(scope.row)">二维码开门</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="visitor-contract">
          <h5 class="info-title">房租合约</h5>
          <el-table :data="contractTableData" height="176" border style="width: 100%;margin-top: 7px;">
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="date" label="日期" width="100"></el-table-column>
            <el-table-column prop="personCount" label="人数" width="50"></el-table-column>
            <el-table-column prop="rentPrice" label="房租"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                 <span>{{contractMap[scope.row.status]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="说明"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="15" class="visitor-addReservations">
        <p class="visitor-title visiitor-add">{{form.currTitle}}</p>
        <el-form ref="form" :model="form" size="mini" label-width="100px">
          <el-col :span="24">
            <el-form-item label="入住类型：">
              <el-radio-group v-model="form.checkInType" :disabled="currFormType!='room-info'">
                <el-radio label="0">普通</el-radio>
                <el-radio label="1">钟点房</el-radio>
                <el-radio label="2">特殊房</el-radio>
                <el-radio label="3">自用房</el-radio>
                <el-radio label="4">免费房</el-radio>
                <el-radio label="5">公寓房</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客源渠道：" required>
                  <!-- <channel-select v-model="form.channelTypePk" @selfirst="(id)=>{this.form.channelTypePk = id}" :disabled="form.guestOrderPk!==undefined"></channel-select> -->
                  <channel-select v-model="form.channelTypePk" @selfirst="(id)=>{this.form.channelTypePk = id}"></channel-select>
                </el-form-item>
              </el-col>
            </el-col>
             <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="房间类型：" required>
                  <el-select v-model="form.roomTypePk" @change="roomTypeChange" placeholder="请选择房间类型" :disabled="currFormType=='guest-info' || currFormType=='room-info' || currFormType=='add-guest'">
                    <el-option :label="r.typeName" :value="r.typePk" v-for="r in roomTypeArr" :key="r.typePk"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="当前房租：" required>
                    <el-input-number v-model="form.currPrice" :controls="false" :disabled="form.guestOrderPk!==undefined"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="15">
                <el-form-item label="房间数量：" required>
                  <!-- TODO 适应豪斯菲尔预定，暂时禁用  -->
                  <!-- @change="loadPrice" -->
                  <el-input-number size="mini" :min="1" v-model="form.count" :disabled="currFormType=='guest-info' || currFormType=='room-info'|| currFormType=='add-guest'"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="7" v-if="currFormType=='empty' || currFormType=='room-info'">
                &nbsp;&nbsp;<span style="color:red">可预订{{bookableCount}}间</span>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="房间押金：" required>
                  <el-input-number v-model="form.deposit" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="房间号码：">
                  <el-input v-model="form.roomNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="抵店日期：" required>
                  <el-date-picker v-model="form.beginDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="beginDateChange" type="datetime" placeholder="选择日期时间" :disabled="form.guestOrderPk!==undefined || currFormType=='room-info'" :clearable="false"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="离店日期：" required>
                  <el-date-picker v-model="form.endDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="endDateChange" type="datetime" placeholder="选择日期时间" :disabled="this.form.orderStatus=='LEAVE' || this.form.orderStatus=='NOSHOW' || this.form.pmsCancelFlag=='Y'" :clearable="false"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="入住天数：" required>
                  <!-- <el-input v-model="form.checkinDays" :disabled="true"></el-input> -->
                  <el-input-number v-model="form.checkinDays" :min="1" @change="checkInDaysChange" :disabled="this.currFormType=='guest-info' || this.currFormType=='add-guest'"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-form-item label="餐券数量：" style="margin-bottom: 0px !important;">
                  <el-form-item label="早" label-width="10px" style="width:47px;float:left;">
                    <el-input v-model="form.mealTicketMorn" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                  </el-form-item>
                  <el-form-item label="中" label-width="10px" style="width:47px;float:left;">
                    <el-input v-model="form.mealTicketNoon" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                  </el-form-item>
                  <el-form-item label="晚" label-width="10px" style="width:47px;float:left;">
                    <el-input v-model="form.mealTicketNight" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                  </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人名称：" required>
                  <el-input v-model="form.guestName" :disabled="memberFlag" placeholder="请填写客人名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="iconSearch" @click="chooseEmptyGuest" title="根据客人姓名查询历史客人"></span>
              </el-col>
            </el-col>

            <el-col :span="12">
              <el-col :span="18">
                <el-form-item label="协议单位：">
                  <el-input v-model="form.unitName" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <span class="iconSearch" style="float: left;" @click="toDialogAgreement" title="查询协议单位"></span>
                <el-button type="text" size="mini" @click="clearAgreement">清空</el-button>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="手机号码：" required>
                  <el-input v-model="form.guestPhone" :disabled="memberFlag" @change="phoneChange"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="18">
                <el-form-item label="会员卡号：">
                  <el-input v-model="form.memberCarNo" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <span class="iconCarNoVip" title="读会员卡"></span>
                <!-- <span class="iconCarNoAdd" title="发展新会员" @click="registeredMember = true"></span> -->
                <!-- <span class="iconCarNoCopy" title="发展新会员" @click="registeredMember = true"></span> -->
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="证件类型：">
                  <el-select v-model="form.certificateType" :disabled="memberFlag">
                    <el-option v-for="(value, key) in credentialsMap" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span class="iconCertificate" @click="seeCompany" title="身份证扫描"></span>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="证件号码：">
                  <el-input v-model="form.certificateNo" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span class="iconSearch" @click="seeCompany" title="根据证件号查询历史客人"></span>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人性别：">
                  <el-select v-model="form.guestGender" :disabled="memberFlag">
                    <el-option label="男" value="M"></el-option>
                    <el-option label="女" value="W"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="出生日期：">
                  <el-date-picker v-model="form.bornDate" :disabled="memberFlag" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人国籍：">
                  <el-select v-model="form.nationality" :disabled="memberFlag" clearable>
                    <el-option label="大陆" value="DL"></el-option>
                    <el-option label="港澳台" value="GAT"></el-option>
                    <el-option label="国外" value="GW"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人籍贯：">
                  <el-input v-model="form.nativePlace" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="电子邮件：">
                  <el-input v-model="form.email" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="兴趣爱好：">
                  <el-input v-model="form.hobbies" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="21">
              <el-form-item label="详细地址：">
                  <el-input v-model="form.detailAddress" :disabled="memberFlag"></el-input>
                </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="发票抬头：">
                  <el-input v-model="form.invoiceTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="是否保密：">
                  <el-radio-group v-model="form.isSecret">
                    <el-radio label="N">不保密</el-radio>
                    <el-radio label="Y">保密</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="21">
              <el-form-item label="备注信息：">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-col>
    </el-row>

    <!-- 协议单位 -->
    <el-dialog class="agreement-body" title="协议单位" :visible.sync="dialogAgreement" width="50%" :append-to-body="true">
      <div class="body-conten">
        <Agreement ref="agreementRef"></Agreement>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogAgreement = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 注册会员 -->
    <el-dialog class="agreement-body" title="注册会员" :visible.sync="registeredMember" width="60%" :before-close="registeredMemberClose" :append-to-body="true">
      <div class="body-conten">
        <div class="member-title">
          <h4>会员来源信息（不可修改）</h4>
          <p>
            <span>销售员： 管理员223995 </span>
            <span>领卡部门： 深圳市前海豪斯菲尔信息科技有限公司</span>
          </p>
        </div>
        <div class="member-title">
          <h4>会员基本资料</h4>
          <div class="member-content">
            <el-row>
              <el-form ref="form" :model="registForm" size="mini" label-width="100px">
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="证件类型：">
                        <el-select v-model="registForm.credentialsType" placeholder="请选择证件类型">
                          <el-option label="二代身份证" value="TWO_IDENTITY"></el-option>
                          <el-option label="一代身份证" value="ONE_IDENTITY"></el-option>
                          <el-option label="其他" value="ORDER"></el-option>
                          <el-option label="驾驶证" value="DRIVER"></el-option>
                          <el-option label="护照" value="PASSPORT"></el-option>
                          <el-option label="士兵证" value="SOLDIER"></el-option>
                          <el-option label="军官证" value="OFFICERS"></el-option>
                          <el-option label="港澳通行证" value="HK_MACAO_PASS"></el-option>
                          <el-option label="回乡证" value="RETURN_HOME"></el-option>
                          <el-option label="临时身份证" value="TEMP_IDENTITY"></el-option>
                          <el-option label="户口簿" value="BOOKLET"></el-option>
                          <el-option label="警官证" value="POLICE_OFFICER"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="证 件  号">
                        <el-input v-model="registForm.credentialsNo"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"><span class="required-icon">*</span></el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="姓      名：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"><span class="required-icon">*</span></el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-col :span="16">
                        <el-form-item label="卡      号：">
                          <el-select v-model="registForm.checkType" placeholder="请选择会员级别">
                            <el-option label="普通会员" value="shanghai"></el-option>
                            <el-option label="高级会员" value="beijing"></el-option>
                            <el-option label="VIP会员" value="beijing"></el-option>
                            <el-option label="铂金会员" value="beijing"></el-option>
                            <el-option label="尊贵会员" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="0">
                          <el-input v-model="registForm.guestName"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="2"><span class="required-icon">*</span></el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="卡      费：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="	备      注：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="性      别：">
                        <el-select v-model="registForm.guestName" placeholder="请选择性别">
                          <el-option label="男" value="shanghai"></el-option>
                          <el-option label="女" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"><span class="required-icon">*</span></el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="籍      贯：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"><span class="required-icon">*</span></el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="出      生：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"><span class="required-icon">*</span></el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="	邮      箱：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="国      家：">
                        <el-input v-model="registForm.guestName" placeholder="中国大陆"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="手机号码：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"><span class="required-icon">*</span></el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="24">
                    <el-col :span="23">
                      <el-form-item label="地      址：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="客房喜好：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="餐饮喜好：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="特殊要求：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="兴趣爱好：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="推荐卡号：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="推 荐  人：">
                        <el-input v-model="registForm.guestName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="卡有效期：">
                        <el-date-picker type="date" placeholder="选择日期" v-model="registForm.date1" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form-item label="	协议单位：">
                        <el-input v-model="registForm.unitName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <span class="paddingLeft">注：<span class="required-icon">*</span> 为必填项！请用户仔细填写！</span>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22"><span @click="toDialogAgreement('registMember')" class="alignRight">选择协议单位</span></el-col>
                  </el-col>
                </el-col>
              </el-form>
            </el-row>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary">保存注册信息</el-button>
        <el-button size="mini" type="primary" @click="registeredMember = false">清空</el-button>
      </span>
    </el-dialog>

    <!-- 续房 -->
    <el-dialog class="agreement-body" title="是否确认续房" :visible.sync="dialogExtend" width="30%" :append-to-body="true" :before-close="extendClose">
      <div class="body-conten">
        <p>离店日期改为：{{this.form.endDate}}</p>
        <p>付款方式：
          <el-select v-model="extendForm.payment" size="mini">
            <el-option v-for="(value,key) in paymentMap" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </p>
        <p>押&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：
          <el-input size="mini" type="text" v-model="extendForm.settlementAmount" style="width:166px"></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="extendClose">取 消</el-button>
        <el-button size="mini" @click="extendConfirm" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!--设置二维码开门手机号-->
    <el-dialog class="agreement-body" title="设置二维码开门手机号" :visible.sync="dialogQRCodeSetting" width="30%" :append-to-body="true" :before-close="dialogQRCodeSettingClose">
      <div class="body-conten">
        <p>客人姓名：{{qrcodeForm.guestName}}</p>
        <p>手机号：
          <el-input size="mini" type="text" v-model="qrcodeForm.qrCodePhone" style="width:166px"></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogQRCodeSetting = false">取 消</el-button>
        <el-button size="mini" @click="" type="primary" @click="QRCodeSettingSubmit">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 添加客人 选择客历 -->
    <chooseGuest ref="chooseGuestRef" @sendGuest="loadGuest($event)"></chooseGuest>
    <!-- 预定管理 -->
    <reserveManager ref="reserveManagerRef"></reserveManager>
  </div>
</template>

<script>
    import bus from '@/utils/bus'
    import {orderStatusMap,contractMap, paymentMap, credentialsMap} from '@/utils/orm'
    import {deepClone, formatDate, getBetweenDay, phoneReg, addDate} from '@/utils/index'
    import {isInteger,validatePhone} from '@/utils/validate'
    import {MyToFixed} from '@/utils/number'
    import Agreement from '@/components/Agreement/Agreement'
    import reserveManager from '@/pages/reserveManage/addReserve/reserveManager'
    import chooseGuest from '@/pages/reserveManage/addReserve/chooseGuest'
    import {listContract} from "@/api/order/pmsContractControll"
    import {findPriceSchemeDetailPrice} from '@/api/systemSet/priceScheme/priceSchemeController'
    import {
      checkin,
      addGuest,
      calcMoney,
      changeRoom,
      rowRoomList,
      reserveOrder,
      continuedRoom,
      editOrderMember,
      addReserveGuest,
      qrCodePhoneSetting
    } from '@/api/order/pmsOrderController'
    import {listType, listPriceScheme} from '@/api/utils/pmsTypeController'
    import {listProject, findUnitName} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
    import {getBookableCount} from '@/api/atrialCenter/roomForwardStatus'
    import moment from 'moment'
    export default {
      props: ['parentForm'],
      components:{chooseGuest, reserveManager, Agreement},
      data() {
        return {
          gsReserve:0,
          gsCheckin:0,
          gsLeave:0,
          memberFlag: false,//是否是会员标识
          currFormType:'',//当前表单状态： empty（空） guest-info（客单信息） room-info（保存入住）  add-guest（添加客人）
          currGuestList: [],//当前所有客单信息
          credentialsMap: credentialsMap,
          orderStatusMap: orderStatusMap,
          contractMap: contractMap,
          paymentMap: paymentMap,
          bookableCount:0,//可预订数量
          roomTypeArr:[],
          priceSchemeArr: [],
          registForm:{},
          proForm: {},
          dialogQRCodeSetting:false,
          dialogAgreement:false,
          registeredMember: false,
          hobbySetting: false,
          haveRoomFlag: false,
          dialogExtend: false,
          form: {//客单表单数据
            currTitle: '客单信息',
            memPk: undefined,
            guestOrderPk: undefined,
            agreementPk: undefined,
            unitName:'',
            count: 1,
            checkinDays:1,
            deposit: 200,
            price:100,
            roomNumber: '',
            roomTypePk: '',
            roomPk: undefined,
            channelTypePk: '',
            priceSchemePk: '',
            checkInType: '0',
            isSecret: 'N',
            certificateType: 'TWO_IDENTITY',
            certificateNo:null,
            nationality: 'DL',
            guestName: '新客人',
            guestGender: 'M',
            nativePlace: '',
            email: '',
            carNumber: '',
            hobbies:'',
            detailAddress:'',
            remark:'',
            mealTicketMorn: 0,
            mealTicketNoon: 0,
            mealTicketNight: 0,
            bornDate: null,
            guestPhone:null,
            beginDate: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            endDate: formatDate(new Date(new Date().setDate(new Date().getDate()+1)), 'yyyy-MM-dd hh:mm:ss'),
            pmsCancelFlag: null,
            diyPriceFlag: 'N'
          },
          qrcodeForm:{
            guestOrderPk:'',
            guestName:'',
            qrCodePhone:'',
          },
          roomObj: {
            roomType: '',
            roomNumber: '',
            state: '',
            username: '',
            number: ''
          },
          extendForm:{
            settlementAmount: null,
            payment : null,
          },
          datepicker3: [],
          seeCompany: false,
          roomTable:[],
          tempEndDate:null,
          currTableIndex: '',
          listProjectDate: [],
          listTypeDate: [],
          contractTableData: [], //合约列表
          pickerOptions0: {
          //限制今天以前的日期不可选择
          disabledDate(time) {
            return time.getTime() < moment().subtract(1, 'days') - 8.64e7;
          },
          
        },
          regisType: '',
        }
      },
      created() {
        this.listTypeType();
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if(this.currTableIndex==row.guestOrderPk){
            return 'success-row';
          }
          return '';
        },
        //协议类别 协议单位
        listTypeType(){
          listType({typeMaster:'AGREEMENT'}).then(res => {
            this.listTypeDate = res.data
          })
          listProject().then(res => {
            this.listProjectDate = res.data
          })
          setTimeout(_=>{
            for (let index = 0; index < this.listProjectDate.length; index++) {
              const agreementTypePk = this.listProjectDate[index].agreementTypePk;
              for (let ken = 0; ken < this.listTypeDate.length; ken++) {
                const typePk = this.listTypeDate[ken].typePk;
                if(agreementTypePk == typePk){
                  this.listProjectDate[index].agreementTypePk = this.listTypeDate[ken].typeName
                }
              }
            }
          },1000)
        },
        /**
         * 初始化空表单（外部调用）
         */
        initEmpty() {
          this.initType(_=>{
            this.formReset()
            this.form.currTitle = '添加客单'
            this.currFormType='empty'
            this.roomTable=[]
            this.currGuestList = []
            this.contractTableData = []
            this.loadPrice()
            this.getBookableCount()
          })
        },

        /**
         * 初始化带房间的表单（办理入住）（外部调用）
         * @augments room 当前选择的房间*/
        initRoomData(room) {
          this.initType(_=>{
            this.formReset()
            this.currFormType='room-info'
            this.form.currTitle = '添加客单'
            this.form.roomPk = room.roomPk
            this.form.roomNumber = room.roomNumber
            this.form.roomTypePk = room.roomTypePk
            if(moment().hour()<6){
              this.form.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
            }
            this.roomTable=[]
            this.currGuestList = []
            this.contractTableData = []
            this.loadPrice()
            this.getBookableCount()
          })
        },
        /**
         * 初始化回显客单数据（外部调用）
         * @augments guestList 客单列表
         * @augments loderIndex 装填下标 */
        initGuestData(guestList, loderIndex) {//TODO 初始化加载客单数据
          this.initType(_=>{
            this.currFormType='guest-info'
            this.currGuestList = guestList
            this.formFillGuestInfo(guestList[loderIndex])
            this.currTableIndex = this.form.guestOrderPk
            this.form.currTitle = this.orderStatusMap[this.form.orderStatus]+'客人，客单号：'+this.form.orderGuestNo
            this.tempEndDate = this.form.endDate
            // this.roomTable = []//客单数据
            // guestList.forEach(obj => {
            //   let temp = {
            //     roomPk: obj.roomPk,
            //     orderPk: obj.orderPk,
            //     guestOrderPk: obj.guestOrderPk,
            //     roomTypeName: obj.roomTypeName,
            //     roomNumber: obj.roomNumber,
            //     orderStatus: obj.orderStatus,
            //     guestName: obj.guestName,
            //     count: obj.count,
            //     mainFlag: obj.mainFlag,
            //     pmsCancelFlag: obj.pmsCancelFlag
            //   }
            //   this.roomTable.push(temp)
            // })
            listContract({ orderPk: this.form.orderPk }).then(res=>{//加载合约列表
              this.contractTableData = res.data
            })
            this.calcDays()

            this.gsReserve = 0
            this.gsCheckin = 0
            this.gsLeave = 0
            this.currGuestList.forEach(obj=>{
              if(obj.mainFlag=='Y' && obj.pmsCancelFlag=='N'){
                if(obj.orderStatus=='RESERVE'){
                  this.gsReserve++;
                }else if(obj.orderStatus=='CHECKIN'){
                  this.gsCheckin++;
                }else if(obj.orderStatus=='LEAVE' || obj.orderStatus=='LEAVENOPAY'){
                  this.gsLeave++;
                }
              }
            })
          });
        },
        //添加客人初始化（外部调用）
        parentClearGuest() {
          if(!this.form.guestOrderPk){
            this.$message({type:'warning', message:'请先选择客单'})
            return;
          }
          if(this.form.orderStatus!='CHECKIN'){
            this.$message({type:'warning', message:'客单入住后才能添加客人'})
            return;
          }
          this.memberFlag = false
          this.currFormType = 'add-guest'
          this.form.memPk = undefined
          this.form.currTitle = '添加客人'
          this.form.memberCarNo = ''
          this.form.guestName = ''
          this.form.guestPhone = ''
          this.form.guestGender = 'M'
          this.form.certificateType = 'TWO_IDENTITY'
          this.form.certificateNo = ''
          this.form.bornDate = null
          this.form.email = ''
          this.form.carNumber = ''
          this.form.hobbies = ''
          this.form.nationality = 'DL'
          this.form.nativePlace = ''
          this.form.detailAddress = ''
        },
        //添加客人（外部调用）
        parentAddGuest() {
          if(this.form.currTitle != '添加客人'){
            return;
          }
          // if(!this.formValidate()){
          //   return;
          // }
          let data = {
            guestOrderPk: this.form.guestOrderPk,
            memberPo: {
              memPk: this.form.memPk,
              memName: this.form.guestName,
              memPhone: this.form.guestPhone,
              memSex: this.form.guestGender,
              certificateType: this.form.certificateType,
              certificateNo: this.form.certificateNo,
              birthday: this.form.bornDate ? this.form.bornDate : null,
              email: this.form.email,
              carNumber: this.form.carNumber,
              hobby: this.form.hobbies,
              nationality: this.form.nationality,
              nativePlace: this.form.nativePlace,
              address: this.form.detailAddress
            }
          }
          addGuest(data).then(res=>{
            if(res.code==1){
              this.$message({type:'success', message:'添加客人成功'})
              // this.form.currTitle = '客单信息'
              bus.$emit('refreshOrderInfo', this.form.orderPk)
            }
          })
        },
        //添加预定初始化（外部调用）
        cleanAddReserveGuest() {
          this.formReset();
          this.form.currTitle = '添加预定'
          this.currFormType = 'empty'
          this.getBookableCount()
        },
        //添加预定（外部调用）
        addReserveGuest() {
          addReserveGuest(this.form).then(res=>{
            if(res.code==1){
              this.$message({type:'success', message:'添加预定成功'})
              bus.$emit('refreshOrderInfo', this.form.orderPk)
            }
          })
        },
        editGuestInfo() {//修改客人信息（外部调用）
          if(this.form.pmsCancelFlag=='Y'){
            return;
          }
          editOrderMember(this.form).then(res=>{
            this.$message({type:'success', message: '客人信息修改成功'})
            bus.$emit('refreshOrderInfo', this.form.orderPk)
          });
        },
        formReset() {//重置表单
          this.form.currTitle = ''
          this.form.memPk = undefined
          this.form.guestOrderPk = undefined
          this.form.agreementPk = undefined
          this.form.unitName = null
          this.form.count = 1
          this.form.checkinDays = 1
          this.form.deposit = 200
          this.form.currPrice = 0
          this.form.roomNumber = null
          this.form.roomTypePk = this.roomTypeArr[0].typePk
          this.form.roomPk = undefined
          this.form.checkInType = '0'
          this.form.memberCarNo = null
          this.form.isSecret = 'N'
          this.form.certificateType = 'TWO_IDENTITY'
          this.form.nationality = 'DL'
          this.form.guestName = '新客人'
          this.form.guestPhone = null
          this.form.guestGender = 'M'
          this.form.certificateNo = null
          this.form.nativePlace = null
          this.form.email = null
          this.form.carNumber = null
          this.form.hobbies = null
          this.form.detailAddress = null
          this.form.remark = null
          this.form.mealTicketMorn = 0
          this.form.mealTicketNoon = 0
          this.form.mealTicketNight = 0
          this.form.bornDate = null
          this.form.beginDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          this.form.endDate = formatDate(new Date(new Date().setDate(new Date().getDate()+1)), 'yyyy-MM-dd hh:mm:ss')
          this.form.pmsCancelFlag = 'N'
          // this.form.diyPriceFlag = 'N'

          this.memberFlag = false
        },
        formFillGuestInfo(guest) {//填充客单信息
          this.form.agreementPk = guest.agreementPk
          this.form.beginDate = guest.beginDate
          this.form.bornDate = guest.bornDate
          this.form.pmsCancelFlag = guest.pmsCancelFlag
          this.form.carNumber = guest.carNumber
          this.form.certificateNo = guest.certificateNo
          this.form.certificateType = guest.certificateType
          this.form.channelTypeName = guest.channelTypeName
          this.form.channelTypePk = guest.channelTypePk
          this.form.checkInType = guest.checkInType
          this.form.count = guest.count
          this.form.country = guest.country
          this.form.deposit = guest.deposit
          this.form.detailAddress = guest.detailAddress
          this.form.email = guest.email
          this.form.endDate = guest.endDate
          this.form.guestGender = guest.guestGender
          this.form.guestName = guest.guestName
          this.form.guestOrderPk = guest.guestOrderPk
          this.form.guestPhone = guest.guestPhone
          this.form.hobbies = guest.hobbies
          this.form.invoiceTitle = guest.invoiceTitle
          this.form.isSecret = guest.isSecret
          this.form.leaderFlag = guest.leaderFlag
          this.form.mainFlag = guest.mainFlag
          this.form.memPk = guest.memPk
          this.form.memType = guest.memType
          this.form.memberCarNo = guest.memberCarNo
          this.form.nationality = guest.nationality
          this.form.nativePlace = guest.nativePlace
          this.form.orderGuestNo = guest.orderGuestNo
          this.form.orderPk = guest.orderPk
          this.form.orderStatus = guest.orderStatus
          // this.form.price = guest.price
          this.form.currPrice = guest.currPrice
          this.form.remark = guest.remark
          this.form.roomNumber = guest.roomNumber
          this.form.roomPk = guest.roomPk
          this.form.roomTypeName = guest.roomTypeName
          this.form.roomTypePk = guest.roomTypePk
          
          this.form.unitName = null
          if(this.form.agreementPk){
            findUnitName({agreementPk:this.form.agreementPk}).then(res=>{
              this.form.unitName = res.data.unitName
            })
          }

          if(guest.memType=='MEMBER'){//是会员
            this.memberFlag = true
          }else{
            this.memberFlag = false
          }
        },
        initType(callback) {
          // 获取房型
          listType({typeMaster:'ROOM_TYPE'}).then(res=>{
            this.roomTypeArr = res.data;
            //获取价格方案
            listPriceScheme().then(res=>{
              this.priceSchemeArr = res.data
              callback()
            })
          })
        },
        registeredMemberClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        loadPrice() {//动态加载当前房租 
     
          if(this.currFormType == 'empty' || this.currFormType == 'room-info'){
            if(!this.form.roomTypePk){
              this.$message({type:'warning', message:'请先选择房间类型！'})
              return
            }
            if(!this.form.beginDate){
              this.$message({type:'warning', message:'请先选择抵店日期！'})
              return
            }
           
            let data = {
              roomTypePk: this.form.roomTypePk,
              beginDate: this.form.beginDate,
              endDate: moment(this.form.beginDate).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
            }
            calcMoney(data).then(res=>{
              this.form.currPrice = MyToFixed(res.data*this.form.count, 2)
            })
          }
        },
        //房型改变
        roomTypeChange(){
          this.loadPrice()
          this.getBookableCount()
        },
        //开始日期改变
        beginDateChange(){
          this.calcDays()
          this.loadPrice()
          this.getBookableCount()
        },
        //结束日期改变 续房
        endDateChange(endDate) {
          if(this.currFormType=='guest-info'){
            this.extendForm.payment='0'
            this.extendForm.settlementAmount=0
            this.dialogExtend = true
          }
          this.calcDays()
          this.getBookableCount()
        },
        extendClose() {//取消续房
          this.dialogExtend = false
          this.form.endDate = this.tempEndDate
          this.calcDays()
        },
        extendConfirm() {//确认续房
          if(!this.extendForm.payment){
            this.$message({type:'warning', message:'请选择付款方式'})
            return
          }
          if(Number(this.extendForm.settlementAmount)<0){
            this.$message({type:'warning', message:'请输入正确的押金'})
            return
          }
          let data={
            guestOrderPk: this.form.guestOrderPk,
            endDate: this.form.endDate,
            settlementAmount: this.extendForm.settlementAmount,
            payment: this.extendForm.payment
          }
          continuedRoom(data).then(res=>{
            this.$message({
              type: 'success',
              message: '续住成功!'
            })
            bus.$emit('refreshOrderInfo', this.form.orderPk)
            this.dialogExtend = false
          })
        },
        calcDays() {//计算天数
          let a = formatDate(new Date(this.form.beginDate), 'yyyy-MM-dd');
          let b = formatDate(new Date(this.form.endDate), 'yyyy-MM-dd');
          this.form.checkinDays = getBetweenDay(a, b).length-1
        },
        checkInDaysChange(days) {//改变入住天数
          this.form.endDate = moment(this.form.beginDate).add(days, 'days').format("YYYY-MM-DD HH:mm:ss")
          // this.loadPrice()
        },
        guestCheckin(row) {//客单入住
          this.$confirm('是否确认入住?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            checkin({orderPk:row.orderPk, guestOrderPks:[row.guestOrderPk]}).then(res=>{
              row.orderStatus='CHECKIN'
              this.$message({
                type: 'success',
                message: '入住成功!'
              });
            })
          })
        },
        toCheckout(){
          bus.$emit('toCheckout')
        },
        guestTableClick(row, event, column) {//点击客单table
          this.currGuestList.forEach((guest,index)=>{
            if(row.guestOrderPk==guest.guestOrderPk){
              this.currFormType = 'guest-info'
              this.formFillGuestInfo(guest)
              this.currTableIndex = row.guestOrderPk
              this.form.currTitle = this.orderStatusMap[guest.orderStatus]+'客人，客单号：'+guest.orderGuestNo
              this.tempEndDate = this.form.endDate
              this.calcDays();
              this.$emit('changeCurrGuest', guest, index);
            }
          });
        },
        chooseEmptyGuest() {//打开选择客人
          this.$refs.chooseGuestRef.init(this.form.guestName)
        },
        phoneChange(val) {//手机号改变
          if(val){
            if(!phoneReg.test(val)){
              this.$message({type:'warning', message:'手机号不合法'})
              return
            }
            this.$refs.chooseGuestRef.initByPhone(this.form.guestPhone)
          }
        },
        loadGuest(guest) {//回显客人
          this.form.memPk = guest.memPk
          this.form.guestName = guest.memName
          this.form.guestGender = guest.memSex
          this.form.detailAddress = guest.address
          this.form.memberCarNo = guest.cardNumber
          this.form.certificateNo = guest.certificateNo
          this.form.certificateType = guest.certificateType
          this.form.hobbies = guest.hobby
          this.form.guestPhone = guest.memPhone
          this.form.bornDate = guest.birthday
          this.form.email = guest.email
          this.form.nationality = guest.nationality
          this.form.nativePlace = guest.nativePlace
          this.form.bornDate = guest.birthday

          if(guest.memType=='MEMBER'){
            this.memberFlag = true              
          }else{
            this.memberFlag = false              
          }
        },
        reserveManager() {//打开预定管理
          this.$refs.reserveManagerRef.init(this.form.orderPk)
        },
        editGuestInfo() {//修改客人信息
          if(this.form.pmsCancelFlag=='Y'){
            return;
          }
          editOrderMember(this.form).then(res=>{
            this.$message({type:'success', message: '客人信息修改成功'})
            bus.$emit('refreshOrderInfo', this.form.orderPk)
          }).catch(error=>{
            bus.$emit('refreshOrderInfo', this.form.orderPk)
          })
        },
        toDialogAgreement(buttonType) {//打开选择协议单位
          if(buttonType == 'registMember'){
            this.regisType = buttonType
          }
          this.dialogAgreement =true
          setTimeout(()=>{
            this.$refs.agreementRef.init()
          },0)
        },
        backDialogAgreement(po) {//回显协议单位
          this.dialogAgreement = false
          if(this.currFormType!='add-guest'){
            this.form.agreementPk = po.agreementPk
            this.form.unitName = po.unitName
          }
          if(this.regisType == 'registMember') {
            this.registForm.agreementPk = po.agreementPk;
            this.registForm.unitName = po.unitName;
          }
        },
        clearAgreement() {//清空协议单位
          this.form.agreementPk = undefined
          this.form.unitName = ''
        },
        tableRowClassName({row, rowIndex}) {
          if(this.currTableIndex==row.guestOrderPk){
            return 'success-row';
          }
          return '';
        },

        /*
          加载静态数据
        */
        getBookableCount(){
          let data={
            roomTypePk: this.form.roomTypePk,
            beginDate: moment(this.form.beginDate).format("YYYY-MM-DD"),
            endDate: moment(this.form.endDate).format("YYYY-MM-DD")
          }
          getBookableCount(data).then(res=>{
             this.bookableCount = res.data
           })
        },
        initType(callback) {
          // 获取房型
          listType({typeMaster:'ROOM_TYPE'}).then(res=>{
            this.roomTypeArr = res.data.data;
            callback()
            // //获取价格方案
            // listPriceScheme().then(res=>{
            //   this.priceSchemeArr = res.data
            //   callback()
            // })
          })
        },
        listTypeType(){
          //协议单位
          listType({typeMaster:'AGREEMENT'}).then(res => {
            this.listTypeDate = res.data
          })
          listProject().then(res => {
            this.listProjectDate = res.data
          })
          setTimeout(_=>{
            for (let index = 0; index < this.listProjectDate.length; index++) {
              const agreementTypePk = this.listProjectDate[index].agreementTypePk;
              for (let ken = 0; ken < this.listTypeDate.length; ken++) {
                const typePk = this.listTypeDate[ken].typePk;
                if(agreementTypePk == typePk){
                  this.listProjectDate[index].agreementTypePk = this.listTypeDate[ken].typeName
                }
              }
            }
          },1000)
        },

        //设置二维码开门手机号
        dialogQRCodeSettingOpen(row){
          this.qrcodeForm.guestOrderPk = row.guestOrderPk
          this.qrcodeForm.guestName = row.guestName
          this.qrcodeForm.qrCodePhone = row.qrCodePhone
          this.dialogQRCodeSetting = true;
        },
        dialogQRCodeSettingClose(){
          this.dialogQRCodeSetting = false;
          bus.$emit('refreshOrderInfo', this.form.orderPk)
        },
        QRCodeSettingSubmit(){
          if(!validatePhone(this.qrcodeForm.qrCodePhone)){
            this.$message({type:'warning', message:'手机号不合法'})
            return false
          }
          qrCodePhoneSetting(this.qrcodeForm).then(res=>{
            this.dialogQRCodeSettingClose()
            this.$message.success('设置成功')
          })
        }
      },
      mounted() {
        bus.$on('agreementPo', (po) => { this.backDialogAgreement(po) })
      }

    }
</script>

<style scoped>
.reserve-contert{
  margin: 5px 0;
}
.visitor-title{
  color: red;
  margin: 5px 0;
}
.card-tabs>.el-tabs__content{
  padding: 0 15px;
}
.visitor-table span{
  margin-right: 15px;
}
.visitor-table .font-normal{
  font-style: normal;
}
.visiitor-add{
  text-align: center;
}
.visitor-tabs, .visitor-contract{
  border: 1px solid #cccccc;
  margin-bottom: 15px;
  margin-top: 15px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 3px;
}

.required-icon{
  color: red;
}
.icon-distance{
  height: 28px;
  line-height: 28px;
  margin-left: 5px;
}
.member-title{
  margin-top: 20px;
  border: 1px solid #dddddd;
}
.member-title h4{
  display: table;
  position: relative;
  top: -12px;
  margin: 0;
  margin-left: 10px;
  background: #fff;
  padding: 0 5px;
}
.member-title p {
  margin: -13px 10px 10px;
}
.member-content{
  display: inline-flex;
}
.paddingLeft{
  padding-left: 20px;
}
.alignRight{
  float: right;
  color: #409EFF;
  cursor: pointer;
}
.visitor-addReservations .el-radio+.el-radio {
    margin-left: 0px;
}
.visitor-addReservations .el-radio {
    margin-right: 10px;
}
.visitor-addReservations .el-date-editor.el-input,
.visitor-addReservations .el-date-editor.el-input__inner, 
.visitor-addReservations .el-select{
    width: 100%;
}
.info-title{
  position: absolute;
  margin-top: -9px;
  margin-left: 8px;
  background-color: #ffffff
}
.iconSearch,.iconCarNoVip,.iconCarNoAdd,.iconCarNoCopy,.iconCertificate{
  background: url('../../../assets/image/room-status/room_status.png');
  background-repeat: no-repeat;
  background-position: -1225px -17px;
  width: 23px;
  height: 23px;
  display: table;
  cursor: pointer;
}
.iconCarNoVip{
  float: left;
  background-position: -1057px -15px;
}
.iconCarNoAdd{
  /* float: right; */
  background-position: -1181px -17px;
}
.iconCertificate{
  background-position: -1100px -15px;
}
</style>
<style>
.guestOrder1002 .el-table .success-row {
    background:  #f0f9eb;
}
.guestOrder1002 .el-input-number span{
  width:17px !important
}
.guestOrder1002 .el-input-number .el-input__inner{
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.agreement-body>.el-dialog> .el-dialog__header{
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.agreement-body>.el-dialog>.el-dialog__body{
  padding: 0 15px;
}
.guestOrder1002 .el-input-number .el-input__inne{
  text-align:left !important;
}
.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label{
  line-height: 20px !important;
  font-size: 13px;
}
.guestOrder1002 .el-input--mini .el-input__inner {
    height: 20px !important;
    line-height: 20px;
}
.guestOrder1002 .el-input--mini .el-input__icon {
    line-height: 20px;
}
.guestOrder1002 .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 4px;
}
.guestOrder1002 .visitor-tabs, .visitor-contract{
  margin-bottom: 5px;
  margin-top: 20px;
}
.guestOrder1002 .visitor-tabs{
  margin-top: 16px;
}
#app .el-dialog{
  /* width: 1000px !important; */
}
#app .el-dialog .iconSearch, .iconCarNoVip, .iconCarNoAdd, .iconCarNoCopy, .iconCertificate{
  width: 23px;
  height: 22px;
}
#app .el-button--text{
  padding-top: 2px;
  padding-bottom: 2px;
}
#app .el-tabs--border-card>.el-tabs__content {
  padding: 10px 15px 10px;
}
#app .dialog-li[data-v-2ab0e762] {
  width: calc(100% / 4);
}
#app .patternDialog .el-dialog__body{
  padding: 0;
}
.input_width_style{
  width: calc(95.83333% - 9px) !important;
}
.el-dialog__header {
    padding: 10px 20px 10px;
}
.el-input__inner,.el-textarea__inner{
  border-radius: 2px;
}
.info-title{
  padding: 0 5px;
}
.guestOrder1002 .el-table td, .el-table th{
  padding: 2px 0;
  font-size: 13px;
}
.guestOrder1002 .el-input-number--mini {
    width: 100%;
    line-height: 20px;
}
.el-input--mini .el-input__inner {
    height: 25px !important;
    line-height: 25px;
}
</style>

