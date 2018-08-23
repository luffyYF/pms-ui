// 房态图
<template>
    <el-container class="tabs-hieght">
      <el-aside width="280px">
        <el-form :inline="true" size="mini" class="demo-form-inline">
          <el-form-item class="form-screh">
            <el-input class="screhhome" v-model="roomNumber" placeholder="搜索房号"></el-input>
            <el-button class="screhbtn" @click="init">搜索</el-button>
          </el-form-item>
        </el-form>
        
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="房间筛选" name="1" class="cllapse-list">
            <div class="check-list-group">
              <el-checkbox-group v-model="checkList">
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="empty"><span class="bg-icon empty"></span>空房</el-checkbox>
                  </div>
                  <div class="half50">
                    <el-checkbox label="OCCUPY"><span class="bg-icon occupy"></span>占用</el-checkbox>
                  </div>
                </div>
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="DIRTY"><span class="bg-icon dirty"></span>脏房</el-checkbox>
                  </div>
                  <div class="half50">
                    <el-checkbox label="CLEAN_NOCHECK"><span class="bg-icon clean_nocheck"></span>清洁未检查</el-checkbox>
                  </div>
                </div>
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="CLEAN_CHECKED"><span class="bg-icon clean_checked"></span>清洁已检查</el-checkbox>
                  </div>
                  <div class="half50">
                    <el-checkbox label="leaveFlag"><span class="bg-icon reserve_leave"></span>预离房</el-checkbox>
                  </div>
                </div>
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="REPAIR_ROOM"><span class="bg-icon repair_room"></span>维修房</el-checkbox>
                  </div>
                </div>
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="DISABLE_ROOM"><span class="bg-icon disable_room"></span>停用房</el-checkbox>
                  </div>
                </div>
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="SELF_USE"><span class="bg-icon selfuse"></span>自用房</el-checkbox>
                  </div>
                </div>
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="FREE_ROOM"><span class="bg-icon freeroom"></span>免费房</el-checkbox>
                  </div>
                </div>
                <div class="checkbox-li">
                  <div class="half50">
                    <el-checkbox label="futureFlag"><span class="bg-icon reserve_today"></span>今日预抵</el-checkbox>
                  </div>
                </div>
              </el-checkbox-group>
            </div>
            <div class="from-select">
              <el-form ref="selectForm" :model="selectForm" size="mini" label-width="80px">
                <el-form-item>
                  <el-select class="selectWidth" v-model="selectForm.building" placeholder="请选择楼栋" clearable @change="init">
                    <el-option v-for="y in buildingArr" :key="y.buildingPk" :label="y.buildingName" :value="y.buildingPk"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select class="selectWidth" v-model="selectForm.roomType" placeholder="请选择房型" clearable @change="init">
                    <el-option v-for="y in roomType" :label="y.typeName" :value="y.typePk" :key="y.typePk"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select class="selectWidth" v-model="selectForm.floor" placeholder="请选择楼层" clearable @change="init">
                    <el-option v-for="y in floorArr" :key="y.storeyPk" :label="y.storeyName" :value="y.storeyPk"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select class="selectWidth" v-model="selectForm.checkInType" placeholder="请选择入住类型" clearable @change="init">
                    <el-option v-for="(v, k) in checkInTypeMap" :key="k" :label="v" :value="k"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <channel-select class="selectWidth" v-model="selectForm.channel"/>
                  <!-- <el-select class="selectWidth" v-model="selectForm.channel" placeholder="请选择渠道">
                    <el-option label="全部渠道" value=""></el-option>
                    <el-option v-for="y in channelArr" :label="y.typeName" :value="y.typePk" :key="y.typePk"></el-option>
                  </el-select> -->
                </el-form-item>
              </el-form>  
            </div>
          </el-collapse-item>

          <!-- <el-collapse-item title="房态统计" name="2" class="cllapse-list">
            <div class="real-state-li">
              <div class="half50">在住间数<span>6</span></div>
              <div class="half50">普通房数<span>6</span></div>
            </div>
            <div class="real-state-li">
              <div class="half50">钟点房数<span>6</span></div>
              <div class="half50">特殊房数<span>6</span></div>
            </div>
            <div class="real-state-li">
              <div class="half50">自用房数<span>6</span></div>
              <div class="half50">免费房数<span>6</span></div>
            </div>
            <div class="real-state-li">
              <div class="half50">出租率<span>6</span></div>
              <div class="half50">在住房费<span>6</span></div>
            </div>
            <div class="real-state-li">
              <el-table :data="tableData">
                <el-table-column prop="roomLayout" label="房型" width="80"></el-table-column>
                <el-table-column prop="availableRoom" label="可售房"></el-table-column>
                <el-table-column prop="space" label="空房"></el-table-column>
                <el-table-column prop="rentals" label="出租率"></el-table-column>
              </el-table>
            </div>
          </el-collapse-item> -->

          <el-collapse-item title="图标说明" name="3" class="cllapse-list">
            <div class="icon-explain">
              <div class="real-state-li">      
                <div class="half50"><span class="bg-icon empty"></span>空房</div>
                <div class="half50"><span class="bg-icon occupy"></span>占用</div>
              </div>
              <div class="real-state-li">
                <div class="half50"><span class="bg-icon dirty"></span>脏房</div>
                <div class="half50"><span class="bg-icon clean_nocheck"></span>清洁未检查</div>
              </div>
              <div class="real-state-li">
                <div class="half50"><span class="bg-icon clean_checked"></span>清洁已检查</div>
                <div class="half50"><span class="bg-icon reserve_leave"></span>预离房</div>
              </div>
              <div class="real-state-li">
                <div class="half50"><span class="bg-icon repair_room"></span>维修房</div>
                <div class="half50"><span class="bg-icon disable_room"></span>停用房</div>
              </div>
              <div class="real-state-li">
                <div class="half50"><span class="bg-icon selfuse"></span>自用房</div>
                <div class="half50"><span class="bg-icon freeroom"></span>免费房</div>
              </div>
              <div class="real-state-li">
                <div class="half50"><span class="bg-icon reserve_today"></span>今日预抵</div>
                <div class="half50"><span class="bg-icon relation"></span>关联</div>
              </div>
              <div class="real-state-li">
                <div class="half50"><span class="bg-icon room_team"></span>团队</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main>
        <el-row>
          <div class="pattern-li" :class="classRoomStatusObject(item.roomStatus)" v-for="(item, index) in checkedFilter(numberFilter(roomList))">
            <el-dropdown trigger="click" class="pattern-dropdown" :hide-on-click="true">
              <div class="el-dropdown-link">
                <div class="pattern-li-title">
                  <label class="rm">{{item.roomNumber}}</label>
                  <label class="ht">{{item.roomTypeName}}</label>
                </div>
                <!-- 用户信息 -->
                <div class="pattern-li-info">
                  <!--  v-if="item.guestOrderPk" -->
                  <template v-if="item.futureFlag=='Y'">
                    <!-- 预抵客人信息-->
                    <label class="userinfo">{{item.futureInfo ? item.futureInfo.guestName : ''}}</label>
                    <label class="channelinfo">{{item.futureInfo ? item.futureInfo.channelTypeName : ''}}</label> 
                  </template>
                  <template v-if="item.guestOrderPk">
                    <!-- 在住客人信息 -->
                    <label class="userinfo">{{item.guestInfo ? item.guestInfo.guestName : ''}}</label>
                    <label class="channelinfo">{{item.guestInfo ? item.guestInfo.channelTypeName : ''}}</label>
                  </template>
                </div>

                <div class="pattern-li-date" v-if="item.guestOrderPk">
                  <label class="userinfo">入住：{{simpleDate(item.guestInfo ? item.guestInfo.beginDate : '') }}</label><br>
                  <label class="userinfo">离开：{{simpleDate(item.guestInfo ? item.guestInfo.endDate : '')}}</label>
                </div>

              <!-- 状态图标 -->
                <div class="pattern-li-details">
                  <label class="detailsinfo" v-if="item.futureFlag=='Y'"><span class="bg-icon reserve_today"></span></label>
                  <label class="detailsinfo" v-if="item.leaveFlag=='Y'"><span class="bg-icon reserve_leave"></span></label>
                  <label class="detailsinfo" v-if="item.connectTwoFlag=='Y'"><span class="bg-icon relation"></span></label>
                  <label class="detailsinfo" v-if="item.connectManyFlag=='Y'"><span class="bg-icon room_team"></span></label>
                  <label class="detailsinfo" v-if="item.arrearsAmount<0" :title="'欠费金额：￥'+Math.abs(item.arrearsAmount)"><span class="bg-icon arrears"></span></label>
                  <label class="detailsinfo" v-if="item.checkInType==1" title="钟点房"><span class="bg-icon clockroom"></span></label>
                  <label class="detailsinfo" v-if="item.checkInType==2" title="特殊房"><span class="bg-icon special"></span></label>
                  <label class="detailsinfo" v-if="item.checkInType==3" title="自用房"><span class="bg-icon selfuse"></span></label>
                  <label class="detailsinfo" v-if="item.checkInType==4" title="免费房"><span class="bg-icon freeroom"></span></label>
                  <!-- el-icon-time -->
                  <!-- <label class="detailsprice"><i class="el-icon-tickets"></i></label> -->
                </div>
              </div>
              <!-- 下拉菜单操作 -->
              <el-dropdown-menu slot="dropdown" class="pattern-dropdown-li" >
                <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='CLEAN_CHECKED' 
                                                                      || item.roomStatus=='CLEAN_NOCHECK' 
                                                                      || item.roomStatus=='DIRTY' )
                                                                      && !item.guestOrderPk" ><el-button  type="text" :disabled="!hasPerm('pms:roomPattern:saveCheckin')" @click="toCheckin(item)">办理入住</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.guestOrderPk"><el-button  type="text" @click="toDialogVisible(item, 'info')" :disabled="!hasPerm('pms:roomPattern:saveContinue')">办理续住</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.guestOrderPk"><el-button  type="text" @click="toDialogVisible(item, 'settle')" :disabled="!hasPerm('pms:roomPattern:settleLeave')">结账退房</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='CLEAN_NOCHECK'
                                                                      || item.roomStatus=='CLEAN_CHECKED'
                                                                      || item.guestOrderPk
                                                                      || item.roomStatus=='SELF_USE'
                                                                      || item.roomStatus=='FREE_ROOM') && item.roomStatus!='DIRTY'"><el-button :disabled="!hasPerm('pms:roomPattern:toDirty')" type="text" @click="changeRoomStatus(item, 'DIRTY', index)">转为脏房</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DIRTY'
                                                                      || item.roomStatus=='CLEAN_CHECKED'
                                                                      || item.roomStatus=='OCCUPY'"><el-button  type="text" :disabled="!hasPerm('pms:roomPattern:cleanNocheck')" @click="changeRoomStatus(item, 'CLEAN_NOCHECK', index)">清洁未检查</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DIRTY'
                                                                      || item.roomStatus=='CLEAN_NOCHECK'"><el-button  type="text" :disabled="!hasPerm('pms:roomPattern:cleanCheck')" @click="changeRoomStatus(item, 'CLEAN_CHECKED', index)">清洁检查房</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='DIRTY'
                                                                      || item.roomStatus=='CLEAN_NOCHECK' 
                                                                      || item.roomStatus=='CLEAN_CHECKED'
                                                                      || item.roomStatus=='SELF_USE'
                                                                      || item.roomStatus=='FREE_ROOM') && !item.guestOrderPk"><el-button type="text" :disabled="!hasPerm('pms:roomPattern:toRepair')" @click="showRepair(item)">转维修房</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='DIRTY'
                                                                      || item.roomStatus=='CLEAN_NOCHECK' 
                                                                      || item.roomStatus=='CLEAN_CHECKED' 
                                                                      || item.roomStatus=='SELF_USE'
                                                                      || item.roomStatus=='FREE_ROOM' ) && !item.guestOrderPk"><el-button :disabled="!hasPerm('pms:roomPattern:toDisable')" type="text" @click="showDisable(item)">转停用房</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='REPAIR_ROOM'"><el-button  type="text" :disabled="!hasPerm('pms:roomPattern:showRepair')" @click="seeRoomReason(item, 'REPAIR')">查看维修房</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DISABLE_ROOM'"><el-button  type="text" :disabled="!hasPerm('pms:roomPattern:showDisable')" @click="seeRoomReason(item, 'DISABLE')">查看停用房</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='REPAIR_ROOM'"><el-button  type="text" :disabled="!hasPerm('pms:roomPattern:endRepair')" @click="finshRoomReason(item,'REPAIR')">结束维修</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DISABLE_ROOM'"><el-button  type="text" :disabled="!hasPerm('pms:roomPattern:endDisable')" @click="finshRoomReason(item,'DISABLE')">结束停用</el-button></el-dropdown-item>
                <el-dropdown-item class="el-dropdown-menu__item" v-if="item.orderPk"><el-button type="text" @click="toDialogVisible(item, 'info')" :disabled="!hasPerm('pms:roomPattern:showOrderInfo')">查看订单信息</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- 房间item end -->
        </el-row>
      </el-main>

      <el-dialog class="pattern-dialog2" title="转维修房" :visible.sync="dialogRepairRoom" width="500px" :before-close="handleClose">
        <div class="pattern-dialog-container" style="padding: 25px 4px;">
          <el-form ref="repairForm" :model="repairForm" label-width="80px" size="mini">
            <el-form-item label="房号">
              <el-input v-model="repairForm.roomNumber" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="日期">
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="起始日期" v-model="repairForm.beginDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" :disabled="true"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="结束日期" v-model="repairForm.endDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-row class="no-bottom">
              <el-col :span="12">
                <el-form-item label="原因">
                  <el-select v-model="repairForm.reasonTypePk" placeholder="选择原因">
                    <el-option v-for="t in repairType" :key="t.typePk" :label="t.typeName" :value="t.typePk"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="损坏级别">
                  <el-select v-model="repairForm.level" placeholder="选择损坏级别">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="是否提醒">
              <el-select v-model="repairForm.remindFlag">
                <el-option label="不提醒" value="N"></el-option>
                <el-option label="提醒" value="Y"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="说明">
              <el-input type="textarea" v-model="repairForm.remark"></el-input>
            </el-form-item>

            <el-row class="no-bottom">
              <el-col :span="12">
                <el-form-item label="设置人">
                  <el-input v-model="repairForm.createUserName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="解除人">
                   <el-input v-model="repairForm.relieveName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="submitRoomReason('REPAIR')" v-if="repairForm.reasonPk==null" :disabled="btnlock">确认</el-button>
          <el-button size="mini" type="primary" @click="dialogRepairRoom = false">关闭</el-button>
        </span>
      </el-dialog>
      <el-dialog class="pattern-dialog2" title="转停用房" :visible.sync="dialogDisableRoom" width="500px" :before-close="handleClose">
        <div class="pattern-dialog-container" style="padding: 25px 4px;">
          <el-form ref="disableForm" :model="disableForm" label-width="80px" size="mini">
            <el-form-item label="房号">
              <el-input v-model="disableForm.roomNumber" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="日期">
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="起始日期" v-model="disableForm.beginDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" :disabled="true"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="结束日期" v-model="disableForm.endDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-row class="no-bottom">
              <el-col :span="12">
                <el-form-item label="原因">
                  <el-select v-model="disableForm.reasonTypePk" placeholder="选择原因">
                    <el-option v-for="t in disableRoomType" :key="t.typePk" :label="t.typeName" :value="t.typePk"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="损坏级别">
                  <el-select v-model="disableForm.level" placeholder="选择损坏级别">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="是否提醒">
              <el-select v-model="disableForm.remindFlag">
                <el-option label="不提醒" value="N"></el-option>
                <el-option label="提醒" value="Y"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="说明">
              <el-input type="textarea" v-model="disableForm.remark"></el-input>
            </el-form-item>

            <el-row class="no-bottom">
              <el-col :span="12">
                <el-form-item label="设置人">
                  <el-input v-model="disableForm.createUserName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="解除人">
                   <el-input v-model="disableForm.relieveName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="submitRoomReason('DISABLE')" v-if="disableForm.reasonPk==null" :disabled="btnlock">确认</el-button>
          <el-button size="mini" type="primary" @click="dialogDisableRoom = false">关闭</el-button>
        </span>
      </el-dialog>
      <!-- <el-dialog class="pattern-dialog" title="批量入住" :visible.sync="dialogBatchOccupancy" width="80%" :before-close="handleClose">
        <div class="pattern-dialog-container">
          <div class="batchOccupancy-title">
            <span>准备入住房间：</span>
            <el-select v-model="form.region" size="mini" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="onSubmit">确认入住</el-button>
            <el-button type="primary" size="mini" @click="onSubmit">关闭</el-button>
          </div>
          <el-tabs v-model="batchOccupancy" type="card" @tab-click="handleClick">
            <el-tab-pane label="快速选房" name="fastRoom">
              <el-col :span="10" class="batchOccupancy-content">
                <p style="color: red;">注：双击选择入住房间</p>
                <el-form ref="form" :model="form" size="mini" label-width="80px">
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="抵店日期">
                        <el-date-picker type="datetime" placeholder="选择抵店日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="离店日期">
                        <el-date-picker type="datetime" placeholder="选择离店日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="价格方案">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="协议单位">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="会员卡号">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每房人数">
                        <el-select v-model="form.region" placeholder="请选择每房人数">
                          <el-option label="1" value="shanghai"></el-option>
                          <el-option label="2" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-form>
                <el-col :span="24">
                  <el-table :data="tableData" height="250" border style="width: 100%">
                    <el-table-column prop="date" label="房号"></el-table-column>
                    <el-table-column prop="date" label="房型"></el-table-column>
                    <el-table-column prop="date" label="房价"></el-table-column>
                  </el-table>
                </el-col>
              </el-col>
              <el-col :span="13" :offset="1">
                <p style="color: red;">双击删除房间</p>
                <el-table :data="tableData" height="250" border style="width: 100%">
                  <el-table-column prop="date" label="房号"></el-table-column>
                  <el-table-column prop="date" label="房型"></el-table-column>
                  <el-table-column prop="date" label="人数"></el-table-column>
                  <el-table-column prop="date" label="协议单位"></el-table-column>
                  <el-table-column prop="date" label="离店时间"></el-table-column>
                </el-table>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="批量选房" name="batchRoom">
              <el-col :span="10" class="batchOccupancy-content">
                <p style="color: red;">注：双击选择入住房间</p>
                <el-form ref="form" :model="form" size="mini" label-width="80px">
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="抵店日期">
                        <el-date-picker type="datetime" placeholder="选择抵店日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="离店日期">
                        <el-date-picker type="datetime" placeholder="选择离店日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="价格方案">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="协议单位">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="房间类型">
                        <el-select v-model="form.region" placeholder="请选择房间类型">
                          <el-option label="浪漫" value="shanghai"></el-option>
                          <el-option label="温馨" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="会员卡号">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="房间数量">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每房人数">
                        <el-select v-model="form.region" placeholder="请选择每房人数">
                          <el-option label="1" value="shanghai"></el-option>
                          <el-option label="2" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="24" style="text-align: right;margin-bottom: 10px;">
                    <el-button type="primary" @click="onSubmit" size="mini">批量选房</el-button>
                  </el-col>
                </el-form>
                <el-col :span="24">
                  <el-table :data="tableData" height="250" border style="width: 100%">
                    <el-table-column prop="date" label="房号"></el-table-column>
                    <el-table-column prop="date" label="房型"></el-table-column>
                    <el-table-column prop="date" label="房价"></el-table-column>
                  </el-table>
                </el-col>
              </el-col>
              <el-col :span="13" :offset="1">
                <p style="color: red;">双击删除房间</p>
                <el-table :data="tableData" height="250" border style="width: 100%">
                  <el-table-column prop="date" label="房号"></el-table-column>
                  <el-table-column prop="date" label="房型"></el-table-column>
                  <el-table-column prop="date" label="人数"></el-table-column>
                  <el-table-column prop="date" label="协议单位"></el-table-column>
                  <el-table-column prop="date" label="离店时间"></el-table-column>
                </el-table>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer">
        </span>
      </el-dialog> -->
      <!-- <el-dialog class="pattern-dialog" title="续住" :visible.sync="dialogContinuedLive" width="60%" :before-close="handleClose">
        <div class="pattern-dialog-container">
          <el-col :span="24">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="房号"></el-table-column>
              <el-table-column prop="name" label="抵店日期"></el-table-column>
              <el-table-column prop="name" label="离店日期"></el-table-column>
              <el-table-column prop="name" label="人数"></el-table-column>
              <el-table-column prop="name" label="房租"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" style="text-align: right;margin-top: 10px;">
            延期至：<el-date-picker type="datetime" size="mini" placeholder="选择日期时间"></el-date-picker>&nbsp;离店
          </el-col>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="onSubmit">确认</el-button>
          <el-button type="primary" size="mini" @click="onSubmit">关闭</el-button>
        </span>
      </el-dialog> -->
      <DialogCheckinVisible ref="checkinDialogRef" v-on:closecheckin="closeOrderDialog($event)"/>
      
    </el-container>
</template>
<script>
  import bus from '@/utils/bus'
  import DialogCheckinVisible from './roomPattern/DialogVisible'
  import moment from 'moment'
  import {checkInTypeMap} from '@/utils/orm'
  import {listStorey} from '@/api/systemSet/roomSetting/floorRoom'
  import {listBuilding} from '@/api/systemSet/roomSetting/buildingController'
  import {findToday} from '@/api/order/pmsOrderController'
  import {
    currentRoomList, 
    updateRoomStatus, 
    addRoomReason,
    delRoomReason, 
    findRoomReason
  } from '@/api/roomStatus/pmsRoomStatusController'
  import {listType} from '@/api/utils/pmsTypeController'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {DialogCheckinVisible},
    data() {
      return {
        roomNumber: '',
        checkInTypeMap: checkInTypeMap,
        roomList: [],
        roomType: [],//房间类型
        floorArr: [],//楼层数据
        buildingArr: [],//楼栋数据
        channelArr: [],//渠道数据
        repairType: [],
        disableRoomType: [],
        activeName: '1',
        checkList: [],
        form: {
          region: '',
          regions: '',
          date: ''
        },
        selectForm: {
          roomType: null,
          floor: null,
          building: null,
          channel: null,
          checkInType: null,
        },
        repairForm: {},//维修房表单
        disableForm: {},// 停用房表单
        dialogRepairRoom: false,
        dialogDisableRoom: false,
        
        dialogBatchOccupancy: false,
        dialogContinuedLive: false, 
        dialogGroupManag: false,
        groupSelections: false,
        dialogReservations: false,
        dialogModifyHomePrice: false,
        dialogReservationManag: false,
        dialogChoiceRoomNumber: false,
        dialogHoldHisCard: false,
        
        batchOccupancy: 'fastRoom',
        activeContract: 'addContract',
        tableData: [{ 
          roomLayout: '单身公寓',  
          availableRoom: '425',
          space: '12',
          rentals: '87%'
        }, {
          roomLayout: '单身公寓',  
          availableRoom: '425',
          space: '12',
          rentals: '87%'
        }, {
          roomLayout: '单身公寓',  
          availableRoom: '425',
          space: '12',
          rentals: '87%'
        }, {
          roomLayout: '总计',  
          availableRoom: '425',
          space: '12',
          rentals: '87%'
        }],
        WakeData:[{
          Wakenumber:'',  
          Wakedate: '', 
          Wakecaozuo: ''
        }],
        commodityAddTo: false,
        datePicker: '',
        datepickertime: '',
        regimentPaymentTree: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        btnlock:false,
      };
    },
    methods: {
      /**
       * 初始化调用，查找房间数据
       * @augments */
      init() {
        let data = {
          buildingPk: this.selectForm.building,
          roomTypePk: this.selectForm.roomType,
          floorPk: this.selectForm.floor,
          checkInType: this.selectForm.checkInType,
        }
        currentRoomList(data).then(res1=>{
          // let tempdata = res1.data
          this.roomList = res1.data
          listType({typeMaster:'ROOM_TYPE'}).then(res2=>{
            this.roomType = res2.data.data
            // for(let i = 0; i<tempdata.length; i++){
            //   let roomTypePk = tempdata[i].roomTypePk
            //   this.roomType.forEach(type => {
            //     if(roomTypePk==type.typePk){
            //       tempdata[i].roomTypeName=type.typeName
            //     }
            //   })
            // }
            // this.roomList = tempdata
          })
        })
      },
      handleClose(done) { //11
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.init()
          })
          .catch(_ => {});
      },
      powerJudge(id){
        return powerJudge(id);
      },
      onSubmit() { //11
        console.log('submit!');
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      classRoomStatusObject(status) {// 控制房间的背景颜色
        return {
          'occupy': status=='OCCUPY',
          'dirty': status=='DIRTY',
          'clean_nocheck': status=='CLEAN_NOCHECK',
          'clean_checked': status=='CLEAN_CHECKED',
          'repair_room': status=='REPAIR_ROOM',
          'disable_room': status=='DISABLE_ROOM',
        }
      },
      closeOrderDialog() {
        this.init();
      },
      // 房间操作 begin
      changeRoomStatus(room, status, index) {//更新房间状态
        let realStatus = status;
        if(room['guestOrderPk'] && status=='CLEAN_CHECKED'){//有订单，且需要清洁检查
          realStatus = 'OCCUPY'
        }
        let data={
          roomStatePk: room.roomStatePk,
          roomStatus: realStatus
        }
        updateRoomStatus(data).then(res => {
          if(res.code==1){
            this.roomList[index].roomStatus=realStatus
            this.$message({type:'success', message:'操作成功'})
          }
        }).catch(error=>{})
      },
      showRepair(room) {//转维修房
        this.dialogRepairRoom = true
        this.btnlock=false
        this.repairForm= {
          reasonPk: null,
          roomPk: room.roomPk,
          roomNumber: room.roomNumber,
          roomTypePk: room.roomTypePk,
          roomTypeName: room.roomTypeName,
          beginDate: moment().format("YYYY-MM-DD HH:mm:ss"),
          level: 0,
          remindFlag: 'N',
          createUserName: JSON.parse(localStorage.getItem('pms_userinfo')).upmsUserName
        }
        if(moment().hour()<6){
          this.repairForm.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
        }
      },
      showDisable(room) {//转停用房
        console.log(room)
        this.dialogDisableRoom = true
        this.btnlock=false
        this.disableForm = {
          reasonPk:null,
          roomPk: room.roomPk,
          roomNumber: room.roomNumber,
          roomTypePk: room.roomTypePk,
          roomTypeName: room.roomTypeName,
          beginDate: moment().format("YYYY-MM-DD HH:mm:ss"),
          level: 0,
          remindFlag: 'N',
          createUserName: JSON.parse(localStorage.getItem('pms_userinfo')).upmsUserName
        }
        if(moment().hour()<6){
          this.disableForm.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
        }
      },
      submitRoomReason(submitType) {//添加房间原因
        let data={}
        if(submitType=='REPAIR'){
           //校验
          if(!this.repairForm.endDate){
            this.$message({type:'warning', message: '请选择结束日期'})
            return;
          }
          if(!this.repairForm.reasonTypePk){
            this.$message({type:'warning', message: '请选择原因'})
            return;
          }
          if(this.repairForm.remark==null || this.repairForm.remark==undefined || this.repairForm.remark==''){
            this.$message({type:'warning', message: '请填写说明'})
            return;
          }
          data.roomPk= this.repairForm.roomPk
          data.roomNumber=this.repairForm.roomNumber
          data.roomTypePk= this.repairForm.roomTypePk
          data.roomTypeName= this.repairForm.roomTypeName
          data.beginDate= this.repairForm.beginDate
          data.endDate= this.repairForm.endDate
          data.createUserName= this.repairForm.createUserName
          data.reasonTypePk= this.repairForm.reasonTypePk
          data.level= this.repairForm.level
          data.remindFlag= this.repairForm.remindFlag
          data.remark= this.repairForm.remark
          data.typeMaster= submitType
        }else if(submitType=='DISABLE'){
           //校验
          if(!this.disableForm.endDate){
            this.$message({type:'warning', message: '请选择结束日期'})
            return;
          }
          if(!this.disableForm.reasonTypePk){
            this.$message({type:'warning', message: '请选择原因'})
            return;
          }
          if(this.disableForm.remark==null || this.disableForm.remark==undefined || this.disableForm.remark==''){
            this.$message({type:'warning', message: '请填写说明'})
            return;
          }
          data.roomPk= this.disableForm.roomPk
          data.roomNumber=this.disableForm.roomNumber
          data.roomTypePk= this.disableForm.roomTypePk
          data.roomTypeName= this.disableForm.roomTypeName
          data.beginDate= this.disableForm.beginDate
          data.endDate= this.disableForm.endDate
          data.createUserName= this.disableForm.createUserName
          data.reasonTypePk= this.disableForm.reasonTypePk
          data.level= this.disableForm.level
          data.remindFlag= this.disableForm.remindFlag
          data.remark= this.disableForm.remark
          data.typeMaster= submitType
        }
        if(this.btnlock){
          return
        }else {
          this.btnlock = true;
        }
        addRoomReason(data).then(res=>{
          this.roomList.forEach((room, index) => {
            if(room.roomPk==data.roomPk){
              room.reasonPk = res.data;
              if(submitType=='REPAIR'){
                room.roomStatus='REPAIR_ROOM'
                this.dialogRepairRoom = false
              }else if(submitType=='DISABLE'){
                room.roomStatus='DISABLE_ROOM'
                this.dialogDisableRoom = false
              }
            }
          })
          this.btnlock = false;
          this.$message({type:'success', message: '操作成功'})
        }).catch(()=>{
          this.btnlock = false;
        })
      },
      finshRoomReason(room, reasonType) {//删除房间原因
        delRoomReason({reasonPk: room.reasonPk, roomPk: room.roomPk}).then(res =>{
          if(res.code==1){
            room.reasonPk=null;
            room.roomStatus = 'DIRTY'
            this.$message({type:'success', message: '操作成功'})
          }
        })
      },
      seeRoomReason(room, type) {//查看房间原因
        findRoomReason({reasonPk: room.reasonPk}).then(res=>{
          if(res.code==1){
            let data={
                reasonPk: res.data.reasonPk,
                roomPk: res.data.roomPk,
                roomNumber: res.data.roomNumber,
                roomTypePk: res.data.roomTypePk,
                roomTypeName: res.data.roomTypeName,
                beginDate: res.data.beginDate,
                endDate: res.data.endDate,
                level: res.data.level,
                remindFlag: res.data.remindFlag,
                createUserName: res.data.createUserName,
                relieveName: res.data.relieveName,
                reasonTypePk: res.data.reasonTypePk,
                remark: res.data.remark,
              }
            if(type=='REPAIR'){
              this.repairForm = data;
              this.dialogRepairRoom = true
            }else if(type=='DISABLE'){
              this.disableForm = data
              this.dialogDisableRoom = true
            }
          }
        })
      },
      toCheckin(room) {
        findToday({roomNumberPk:room.roomPk}).then(res=>{
          if(res.data){
            //回显订单
            setTimeout(() => {
              this.$refs.checkinDialogRef.initOrderInfo(res.data, 'visitor')
            },0)
          }else{
            //办理入住
            setTimeout(() => {
              this.$refs.checkinDialogRef.initEmpty(room); 
            },0)
          }
        })
      },
      toDialogVisible(item, type) {//打开订单弹窗
        if(type=='info'){
          setTimeout(() => {
            this.$refs.checkinDialogRef.initOrderInfo(item.orderPk, 'visitor', item.guestOrderPk)
          },0)
        }else if(type=='settle'){
          setTimeout(() => {
            this.$refs.checkinDialogRef.initOrderInfo(item.orderPk, 'bill', item.guestOrderPk)
          },0)
        }
      },
      //房间操作 end

      //房间筛选
      checkedFilter(rooms) {
        let condition = this.checkList
        return rooms.filter(function (room) {
          if(condition.length==0){//都不勾选 显示所有
            return room
          }

          if(condition.indexOf('empty')!=-1){//勾选空房
            if((room.roomStatus=='DIRTY' 
              || room.roomStatus=='CLEAN_NOCHECK'
              || room.roomStatus=='CLEAN_CHECKED') 
              && room.futureFlag!='Y') {
              return room
            }
          }
          
          if(condition.indexOf('OCCUPY')!=-1 && room.roomStatus=='OCCUPY'){//勾选占用
            return room
          }
          if(condition.indexOf('DIRTY')!=-1 && room.roomStatus=='DIRTY'){//勾选脏房
            return room
          }
          if(condition.indexOf('CLEAN_NOCHECK')!=-1 && room.roomStatus=='CLEAN_NOCHECK'){//勾选清洁未检查
            return room
          }
          if(condition.indexOf('CLEAN_CHECKED')!=-1 && room.roomStatus=='CLEAN_CHECKED'){//勾选清洁已检查
            return room
          }
          if(condition.indexOf('leaveFlag')!=-1 && room.leaveFlag=='Y'){//勾选预离
            return room
          }
          if(condition.indexOf('REPAIR_ROOM')!=-1 && room.roomStatus=='REPAIR_ROOM'){//勾选维修房
            return room
          }
          if(condition.indexOf('DISABLE_ROOM')!=-1 && room.roomStatus=='DISABLE_ROOM'){//勾选停用房
            return room
          }
          if(condition.indexOf('SELF_USE')!=-1 && room.roomStatus=='SELF_USE'){//勾选自用房
            return room
          }
          if(condition.indexOf('FREE_ROOM')!=-1 && room.roomStatus=='FREE_ROOM'){//勾选免费房
            return room
          }
          if(condition.indexOf('futureFlag')!=-1 && room.futureFlag=='Y'){//勾选今日预抵
            return room
          }

        });
      },
      //房间号搜索
      numberFilter(rooms) {
        const curr = this
        return rooms.filter(function(room){
          if(curr.roomNumber){
            if(room.roomNumber.indexOf(curr.roomNumber) >=0) {
              return room
            }
          }else{
            return room
          }
        })
      },
      simpleDate(date){
        return  moment(date).format("MM-DD")
      },
    },
    mounted() {
      listType({typeMaster:'REPAIR'}).then(res=>{
        this.repairType = res.data.data
      })
      listType({typeMaster:'DISABLE'}).then(res=>{
        this.disableRoomType = res.data.data
      })
      listType({typeMaster:'CHANNEL'}).then(res=>{
        this.channelArr = res.data.data
      })
      listStorey().then(res=>{
        this.floorArr = res.data
      })
      listBuilding().then(res=>{
        this.buildingArr = res.data
      })
      this.init();
      bus.$on('closeOrder', () => {this.closeOrderDialog() })
    },
  }
</script>
<style>
.cllapse-list .el-collapse-item__header,
.cllapse-list .el-collapse-item__content{
  padding: 0 10px;
}
.from-select .el-form-item__content{
  margin-left: 0 !important;
}
.real-state-li .el-table__header,
.real-state-li .el-table__body,
.real-state-li .el-table__empty-block{
  width: auto !important;
  font-size: 12px;
}
.real-state-li .el-table th>.cell,
.real-state-li .el-table .cell{
  font-size: 12px;
  padding: 0 !important;
}
.real-state-li .el-table tr:last-child{
  background: #dddddd
}
.pattern-dialog .el-dialog__header{
  padding: 10px 15px;
}
.pattern-dialog .el-dialog__body{
  padding: 0 4px;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
}
.pattern-dialog2 .el-dialog__header{
  padding: 10px 15px;
}
.pattern-dialog2 .el-dialog__body{
  padding: 0 4px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
}
.reservationRoom .el-input__inner{
  cursor: pointer !important;
}
.height100 .el-dialog__body{
  height: 100px;
}

.form-screh>.el-form-item__content{
  width: 100%;
}
</style>

<style scoped>
.tabs-hieght{
  height: 100%;
}
.no-bottom{
  margin-bottom: 0px !important
}
.el-aside{
  height: calc(100% - 80px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 15px;
}
.form-screh{
  width: 100%;
}
.screhhome{
  width: calc(100% - 60px);
}
.screhbtn{
  width: 50px;
  height: 28px;
}
.selectWidth{
  width: 100%;
}
.el-collapse{
  border: 1px solid #ebeef5;

}
.check-list-group{
  display: flow-root;
}
.el-checkbox+.el-checkbox{
  margin-left: 0;
}
.half50{
  width: 50%;
  float: left;
}
.bg-icon{
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-flex;
  background: #fff;
  margin-right: 3px;
  width: 15px;
  height: 12px;
}
.empty{ 
  /* 空房 */
  background: #01cce6;
}
.occupy{
  /* 占用 */
  background: #ffb303;
}
.dirty{
  /* 脏房 */
  background: #b2b2b2;;
}  
.clean_nocheck{
  /* 清洁未检查 */
  background: #6699ff;
}
.clean_checked{
  /* 清洁已检查 */
  background: #01cce6;
}
.repair_room{
  /* 维修房 */
  background: #009900;
}
.disable_room{
  /* 停用房 */
  background: #FF0000;
}
.reserve_leave{
  /* 预离房 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -913px -19px;
  width: 17px;
  height:14px;
  /* background-size: 523px 22px; */
}
.arrears{
  /* 欠费 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -335px -18px;
  width: 17px;
  height: 17px;
}
.clockroom{
  /* 钟点房 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -10px -18px;
  width: 17px;
  height: 18px;
}
.special{
  /* 特殊房 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -468px -18px;
  width: 17px;
  height: 17px;
}
.selfuse{
  /* 自用房 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -978px -19px;
  width: 17px;
  height: 14px;
}
.freeroom{
  /* 免费房 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -1018px -19px;
  width: 17px;
  height: 14px;
}
.reserve_today{
  /* 今日预抵 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -788px -19px;
  width: 17px;
  height: 14px;
}
.room_team{
  /* 团队 */ 
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -119px -19px;
  width: 17px;
  height: 14px;
}
.relation{
  /* 连房 */
  background: url('../../assets/image/room-status/room_status.png');
  background-repeat:no-repeat;
  background-position: -649px -19px;
  width: 17px;
  height: 14px;
}
.from-select{
  margin-top: 10px;
}
.real-state-li span{
  margin-left: 5px;
}


.el-main{
  position: absolute;
  left: 290px;
  padding: 0 20px !important;
  overflow: auto;
  width: calc(100% - 290px);
  height: calc(100% - 80px);
}

.el-row {
  margin-bottom: 20px;
}
.pattern-li{
  /* width: 110px; */
  /* height: 57px; */
  width: 117px;
  height: 89px;
  /* background: #dddddd; */
  border-radius: 5px;
  overflow: hidden;
  font-family: "Times New Roman",Times,serif;
  font-size: 12px;
  padding: 2px;
  cursor: pointer;
  color: black;
  text-align: left;
  font-weight: normal;
  border: 2px solid white;
  display: inline-block;
}
.pattern-li-title, .pattern-li-info, .pattern-li-details{
  font-family: "Arial Black",Times,serif;
  height: 19px;
  overflow: hidden;
}
.pattern-li-date{
  font-size:12px;
  font-family: "Arial Black",Times,serif;
}
.rm{
  font-size: 15px;
  font-weight: bold;
  color: white;
  margin-right: 1px;
}
.ht{
  font-family: 微软雅黑,"Times New Roman",Helvetica,sans-serif;
  font-size: 12px;
  font-variant: small-caps;
  font-weight: bold;
  text-transform: uppercase;
  color: black;
  overflow: hidden;
}
.userinfo, .channelinfo{
  color:#fff;
  font-family: 微软雅黑,"Times New Roman",Helvetica,sans-serif;
  height: 19px;
  width: 100%;
  overflow: hidden;
  font-variant: inherit;
  text-align: left;
}
.pattern-dropdown{
  width: 100%;
  padding: 0 5px;
}
.pattern-dropdown-li .el-button{
  display: block;
  text-align: left;
  width: 100%;
  margin: 0;
  padding: 8px 10px;
}

.pattern-dialog-container{
  padding: 15px;
  display: inline-block;
  width: 97%;
}
.commodity-dialog-container{
  width: 100%;
}
.pattern-dialog-title{
  border: 1px solid #ccc;
  padding-top: 10px;
  height: 145px;
}
.commodity-dialog-title,.regimentPayment-dialog-content{
  padding: 0 15px;
}
.regimentPayment-dialog-title{
  padding: 15px;
}
.batchModification-title{
  padding: 10px 15px;
  display: inline-block;
}
.regimentPayment-li{
  margin-bottom: 5px;
}
.font-size18{
  width: 30px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  color: #f60;
  font-size: 18px;
}
.left{
  float: left;
}
.right{
  float: right;
}
.delClose{
  cursor: pointer;
}
.price{
  color: #ff6600;
  font-size: 18px;
  font-style: normal;
  padding-right: 10px;
}
.print-content{
  background: #fff;
  margin-top: 45px;
}
.print-sign{
  width: 12px;
  height: 12px;
  display: inline-block;
  background: #fff;
  border: 1px solid #dddddd;
}
.color000{
  background: #000;
  border: 1px solid #000;
}
.borrowFrom-h4{
  margin-top: 0;
  border-bottom: 1px solid #aaa;
}
.groupSelections-title{
  border: 1px solid #dddddd;
  height: 112px;
  padding: 0 10px;
}
.groupSelections-title-txt{
  margin: 0;
  position: relative;
  top: -13px;
  margin-left: 10px;
}
.info-title{
  position: relative;
  z-index: 11;
  top: -22px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.dialog-form-con{
  margin-top: -22px;
}
.dialog-li .el-form-item--mini{
  margin-bottom: 5px;
  margin-right: 0;
}
.pattern-dialog-content{
  position: relative;
}
.pattern-visitor-button{
  position: absolute;
  z-index: 10;
  margin-top: 7px;
  right: 10px;
  display: block;
}
.pattern-visitor-button .el-button+.el-button{
  margin-left: 3px;
}
.cardtabs-visitor-button{
  text-align: right;
}
.batchOccupancy-title{
    position: relative;
    right: 0px;
    text-align: right;
    z-index: 999;
    display: inline-block;
    float: right;
}
.batchOccupancy-content .el-form-item{
  margin-bottom: 5px;
}
.batchOccupancy-content .el-date-editor.el-input,
.batchOccupancy-content .el-date-editor.el-input__inner{
  width: 100%;
} 
.bs-tishi{
  background-color: #fdf7f7;
  border-color: #eed3d7;  
  margin: 10px 0;
  padding: 10px;
  border-left: 3px solid #eee;
}
.el-main[data-v-622e77e1] {
    left: 290px;
    width: calc(100% - 290px);
    height: calc(100% - 135px);
}
</style>
