<template>
  <div class="content-body">
    <div v-if="!showTabFlag">
        <span class="title-span">员工管理</span>
        <!-- <el-button @click="addRow(userList)" type="primary" size="mini">添加员工</el-button> -->
        <el-button @click="selectUserList" type="primary"  icon="el-icon-refresh" size="mini">刷新</el-button>
        <hr>
        <el-form :inline="true" size="mini" :model="selectUserForm" class="demo-form-inline">
          <el-form-item label="员工姓名">
            <el-input v-model="selectUserForm.userName" placeholder="员工姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="员工状态">
            <el-select size="mini" v-model="selectUserForm.state" placeholder="请选择状态">
              <el-option
                v-for="item in jabOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="操作员">
            <el-input v-model="selectUserForm.userAccount" placeholder="操作员" clearable></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="conditionalQuery">查询</el-button>
          </el-form-item>
        </el-form>
        <p style="color:red;margin-top:0;">*注：员工状态为离职时，登陆账号失效。</p>

        <el-table
          :data="userList"
          border
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            prop="employeeNo"
            align="center"
            label="员工编号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.employeeNo" disabled size="mini" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            align="center"
            label="员工姓名">
            <template slot-scope="scope">
              <el-input v-model="scope.row.userName" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="sexFlag"
            align="center"
            label="员工性别">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.sexFlag" placeholder="请选择">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="userPhone"
            align="center"
            label="手机号码">
            <template slot-scope="scope">
              <el-input v-model="scope.row.userPhone" size="mini"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="name"
            align="center"
            label="所属部门">
          </el-table-column> -->
          <!-- <el-table-column
            prop="name"
            align="center"
            label="是否保洁"
            width="80">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.name"></el-checkbox>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="state"
            align="center"
            label="员工状态">
            <template slot-scope="scope">
              <span>{{scope.row.state==1?'在职':'离职'}}</span>
              <!-- <el-input v-model="scope.row.name" disabled size="mini" placeholder=""></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <!-- <el-button v-if="scope.row.userPk == ''" type="text" size="small" @click="addUser(scope.row)">保存</el-button> -->
              <el-button v-if="scope.row.userPk != ''" type="text" size="small" @click="saveUserModify(scope.row)">修改</el-button>
              <!-- <el-button v-if="scope.row.userPk != ''" @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button> -->
              <!-- <el-button @click="deleteRow(scope.$index,userList,scope.row)" type="text" size="small"> 移除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div v-if="showTabFlag">
      <span @click="showTabFlag=false" class="title-span title-span-return">员工管理</span>>> {{modifyUserObj.userName}}
      <hr>
      <el-form ref="modifyUserObj" :model="modifyUserObj" size="mini" label-width="120px" :inline="true">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div class="form-row">
              <el-form-item label="工号" prop="certificateNo">
                <el-input v-model="modifyUserObj.userCode" disabled class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="国籍">
                <el-input v-model="modifyUserObj.nationality" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <el-select v-model="modifyUserObj.marriage">
                  <el-option v-for="(marriage,index) in marriageOptions" :key="index" :label="marriage.label" :value="marriage.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="在职">
                <el-select v-model="modifyUserObj.jobType">
                  <el-option v-for="(jab,index) in jabOptions" :key="index" :label="jab.label" :value="jab.value"></el-option>
        
                </el-select>
              </el-form-item>
              <el-form-item label="英文名" prop="certificateNo">
                <el-input v-model="modifyUserObj.englishName" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="modifyUserObj.userName" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="modifyUserObj.sexFlag">
                  <el-option v-for="(sex,index) in sexOptions" :key="index" :label="sex.label" :value="sex.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号" prop="nativePlace">
                <el-input v-model="modifyUserObj.identityCard" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="证件地址" prop="nativePlace">
                <el-input v-model="modifyUserObj.documentAddress" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="出生日期" prop="bornDate">
                <el-date-picker v-model="modifyUserObj.birthday" value-format="yyyy-MM-dd" type="date" placeholder="出生日期" class="input-width"></el-date-picker>
              </el-form-item>
              <el-form-item label="入职日期">
                <el-date-picker v-model="modifyUserObj.entryDate" value-format="yyyy-MM-dd" type="date" placeholder="入职日期" class="input-width"></el-date-picker>
              </el-form-item>
              <el-form-item label="离职日期">
                <el-date-picker v-model="modifyUserObj.leaveDate" value-format="yyyy-MM-dd" type="date" placeholder="离职日期" class="input-width"></el-date-picker>
              </el-form-item>
              <el-form-item label="户口类型">
                <el-select v-model="modifyUserObj.householdType">
                  <el-option label="农业户口" value="农业户口"></el-option>
                  <el-option label="非农业" value="非农业"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族">
                <el-input v-model="modifyUserObj.nation" class="input-width"></el-input>         
              </el-form-item>
              <el-form-item label="地区">
                <el-input v-model="modifyUserObj.region" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-input v-model="modifyUserObj.politicalOutlook" class="input-width"></el-input>
              </el-form-item>
              <!-- <el-form-item label="部门">  暂时隐藏
                <el-select v-model="modifyUserObj.deptPk">
                  <el-option label="男" value="man"></el-option>
                  <el-option label="女" value="woman"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="学历">
                <el-input v-model="modifyUserObj.education" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="毕业学校">
                <el-input v-model="modifyUserObj.graduateSchool" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="职称">
                <el-select v-model="modifyUserObj.jobTitle">
                  <el-option label="高级职称" value="高级职称"></el-option>
                  <el-option label="中级职称" value="中级职称"></el-option>
                  <el-option label="初级职称" value="初级职称"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职务">
                <el-input v-model="modifyUserObj.post" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="用工性质">
                <el-select v-model="modifyUserObj.workingNature">
                  <el-option label="全员合同" value="全员合同"></el-option>
                  <el-option label="临时合同" value="临时合同"></el-option>
                  <el-option label="总部派驻" value="总部派驻"></el-option>
                  <el-option label="退休返聘" value="退休返聘"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="考勤卡号" prop="email">
                <el-input v-model="modifyUserObj.attendanceCard" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="户口所在地">
                <el-input v-model="modifyUserObj.registeredResidence" class="input-width"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="是否为部门主管" >
                <el-checkbox v-model="director"></el-checkbox>
              </el-form-item>
              <el-form-item label="是否为采购员">
                <el-checkbox v-model="buyer"></el-checkbox>
              </el-form-item>
              <br>
              <el-form-item label="备注信息">
                <el-input v-model="modifyUserObj.remark" type="textarea" ></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系信息" name="second">
            <div style="width:800px;">
              <el-form-item label="手机" prop="email">
                <el-input v-model="modifyUserObj.userPhone" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input v-model="modifyUserObj.email" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="家庭电话">
                <el-input v-model="modifyUserObj.familyPhone" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="家庭住址">
                <el-input v-model="modifyUserObj.familyAddress" class="input-width"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="备注信息">
                <el-input v-model="modifyUserObj.remark" type="textarea" class="input-width"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同信息" name="third">
            <div style="width:800px;">
              <el-form-item label="合同期限">
                <el-select v-model="modifyUserObj.contractPeriod">
                  <el-option label="1年" value="1年"></el-option>
                  <el-option label="2年" value="2年"></el-option>
                  <el-option label="3年" value="3年"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="自">
                <el-date-picker v-model="modifyUserObj.contractPeriodStart" value-format="yyyy-MM-dd" type="date" placeholder="" class="input-width"></el-date-picker>
              </el-form-item>
              <el-form-item label="到">
                <el-date-picker v-model="modifyUserObj.contractPeriodEnd" value-format="yyyy-MM-dd" type="date" placeholder="" class="input-width"></el-date-picker>
              </el-form-item>
              <el-form-item label="委托/担保人" prop="certificateNo">
                <el-input v-model="modifyUserObj.guarantee" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="基本工资" prop="userName">
                <el-input v-model="modifyUserObj.basicSalary" class="input-width"></el-input>元
              </el-form-item>
              <el-form-item label="试用期限">
                <el-select v-model="modifyUserObj.probation">
                  <el-option label="1月" value="1月"></el-option>
                  <el-option label="2月" value="2月"></el-option>
                  <el-option label="3月" value="3月"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="自">
                <el-date-picker v-model="modifyUserObj.probationStart" value-format="yyyy-MM-dd" type="date" placeholder="" class="input-width"></el-date-picker>
              </el-form-item>
              <el-form-item label="到">
                <el-date-picker v-model="modifyUserObj.probationEnd" value-format="yyyy-MM-dd" type="date" placeholder="" class="input-width"></el-date-picker>
              </el-form-item>
               <el-form-item label="工资类型">
                <el-select v-model="modifyUserObj.salaryType">
                  <el-option label="基本工资" value="基本工资"></el-option>
                  <el-option label="绩效工资" value="绩效工资"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="试用工资" prop="nativePlace">
                <el-input v-model="modifyUserObj.probationarySalary" class="input-width"></el-input>元
              </el-form-item>
              <el-form-item label="违约责任" prop="nativePlace">
                <el-input v-model="modifyUserObj.breachLiability" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="签约日期" prop="bornDate">
                <el-date-picker v-model="modifyUserObj.signDate" value-format="yyyy-MM-dd" type="date" placeholder="签约日期" class="input-width"></el-date-picker>
              </el-form-item>
              <el-form-item label="其他事项">
                <el-input v-model="modifyUserObj.otherRemark" type="textarea" class="input-width"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-form-item>
          <el-button type="primary" size="mini" @click="saveComifyUser(modifyUserObj)">保 存</el-button>
          <el-button type="warning" size="mini">审 核</el-button>
          <span style="color:#F56C6C">审核人： 操作员：深圳前海豪斯菲尔</span>
        </el-form-item>
      </el-form>
      <hr>

      <!-- <el-tabs v-model="activeName2" @tab-click="handleClick">
        <el-tab-pane label="奖罚记录" name="first">
          <el-dialog title="奖罚操作" :visible.sync="dialogFormVisible" width="35%" append-to-body>
            <el-row>
              <span class="title-span">奖罚记录</span>
            </el-row>
            <hr>
            <el-form :model="form3" size="mini" :inline="true">
              <el-form-item label="奖罚标志" :label-width="formLabelWidth">
                <el-select v-model="form3.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="批准人" :label-width="formLabelWidth">
                <el-input v-model="form3.name" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="批准时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  size="mini"
                  class="input-width"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input v-model="form3.name" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="操作员" :label-width="formLabelWidth">
                <el-input v-model="form3.name" disabled class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="奖罚原因" :label-width="formLabelWidth">
                <el-input v-model="form3.name" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="备注信息" :label-width="formLabelWidth">
                <el-input v-model="form3.name" class="input-width"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
              <el-button size="small" type="primary" @click="dialogFormVisible = false">保 存</el-button>
            </div>
          </el-dialog>
          <el-button @click="dialogFormVisible = true" type="primary" size="mini" style="margin:0 0 10px;">新增奖罚</el-button>
          <el-table
            :data="tableData2"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="标记">
            </el-table-column>
            <el-table-column
              prop="name"
              label="奖罚内容">
            </el-table-column>
            <el-table-column
              prop="province"
              label="奖罚原因">
            </el-table-column>
            <el-table-column
              prop="city"
              label="批准人">
            </el-table-column>
            <el-table-column
              prop="address"
              label="批准时间">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="操作人">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="dialogVisible = true" type="text" size="small">编辑奖罚</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="35%"
                  :before-close="handleClose">
                  <el-row>
                    <span class="title-span">奖罚记录</span>
                  </el-row>
                  <hr>
                  <el-form :model="form3" size="mini" :inline="true">
                    <el-form-item label="奖罚标志" :label-width="formLabelWidth">
                      <el-select v-model="form3.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="批准人" :label-width="formLabelWidth">
                      <el-input v-model="form3.name" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="批准时间" :label-width="formLabelWidth">
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        size="mini"
                        class="input-width"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                      <el-input v-model="form3.name" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="操作员" :label-width="formLabelWidth">
                      <el-input v-model="form3.name" disabled class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="奖罚原因" :label-width="formLabelWidth">
                      <el-input v-model="form3.name" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息" :label-width="formLabelWidth">
                      <el-input v-model="form3.name" class="input-width"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog>
                <el-button @click="dialogVisible2 = true" type="text" size="small">删除奖罚</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible2"
                  width="30%"
                  :before-close="handleClose">
                  <span>删除奖罚</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="dialogVisible2 = false">确 定</el-button>
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工作记录" name="second">
          <el-dialog title="工作记录操作" :visible.sync="dialogFormVisible2" width="35%" append-to-body>
            <el-row>
              <span class="title-span">添加工作记录</span>
            </el-row>
            <hr>
            <el-form :model="form4" size="mini" :inline="true">
              <el-form-item label="入职日期" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  size="mini"
                  class="input-width"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="离职日期" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  size="mini"
                  class="input-width"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="部门" :label-width="formLabelWidth">
                <el-input v-model="form4.name" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="职务" :label-width="formLabelWidth">
                <el-input v-model="form4.name" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="单位" :label-width="formLabelWidth">
                <el-input v-model="form4.name" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="离职原因" :label-width="formLabelWidth">
                <el-input v-model="form4.name" class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="操作员" :label-width="formLabelWidth">
                <el-input v-model="form4.name" disabled class="input-width"></el-input>
              </el-form-item>
              <el-form-item label="备注信息" :label-width="formLabelWidth">
                <el-input v-model="form4.name" class="input-width"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button size="small" type="primary" @click="dialogFormVisible2 = false">保 存</el-button>
            </div>
          </el-dialog>
          <el-button @click="dialogFormVisible2 = true" type="primary" size="mini" style="margin:0 0 10px;">新增工作</el-button>
          <el-table
            :data="tableData2"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="入职日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="离职日期">
            </el-table-column>
            <el-table-column
              prop="province"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="city"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="address"
              label="职务">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="离职原因">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="dialogVisible3 = true" type="text" size="small">编辑工作</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible3"
                  width="35%"
                  :before-close="handleClose">
                  <el-row>
                    <span class="title-span">添加工作记录</span>
                  </el-row>
                  <hr>
                  <el-form :model="form4" size="mini" :inline="true">
                    <el-form-item label="入职日期" :label-width="formLabelWidth">
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        size="mini"
                        class="input-width"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="离职日期" :label-width="formLabelWidth">
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        size="mini"
                        class="input-width"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="部门" :label-width="formLabelWidth">
                      <el-input v-model="form4.name" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="职务" :label-width="formLabelWidth">
                      <el-input v-model="form4.name" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" :label-width="formLabelWidth">
                      <el-input v-model="form4.name" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="离职原因" :label-width="formLabelWidth">
                      <el-input v-model="form4.name" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="操作员" :label-width="formLabelWidth">
                      <el-input v-model="form4.name" disabled class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息" :label-width="formLabelWidth">
                      <el-input v-model="form4.name" class="input-width"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible3 = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="dialogVisible3 = false">保 存</el-button>
                  </span>
                </el-dialog>
                <el-button @click="dialogVisible4 = true" type="text" size="small">删除工作</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible4"
                  width="30%"
                  :before-close="handleClose">
                  <span>删除工作</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible4 = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="dialogVisible4 = false">确 定</el-button>
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs> -->
    </div>
  </div>
</template>

<script>
import { pmsUserAdd, pmsUserDel, pmsUserList, pmsUserUpdate } from '../../api/operators/pmsUserController'
import { listApi, updateApi } from '@/api/oaApi'
export default {
  components: {},
  created(){
    this.selectUserList();
  },
  watch:{
  },
  data() {
    return {
      selectUserForm:{
        userName:'',
        userAccount:'',
        state: 1,
      },
      userList:[],
      sexOptions: [
        {value: "M",label: "男"},
        {value: "W",label: "女"}
      ],
      loading:false,
      showTabFlag: false,
      modifyUserObj:{},
      marriageOptions:[
        {value: 0, label: "未婚"},
        {value: 1, label: "已婚"},
        {value: 2, label: "离婚"}
      ],
      jabOptions:[
        {value:0,label:'离职'},
        {value:1,label:'在职'}
      ],
      buyer:true,
      director:true,



      form: {},
      form2: {},
      form3: {},
      form4: {},
      activeName: "first",
      activeName2: "first",
      value: "",
      value1: "",
      
      tableData: [
        {
          name: "王小龙"
        },
        {
          name: "王小虎"
        },
        {
          name: "王小猪"
        },
        {
          name: "王小马"
        }
      ],
      
      tableData2: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      checked1: false,
      checked2: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "80px"
    };
  },
  methods: {
    //查找员工列表
    selectUserList(){
      var param = {
        companyPk: JSON.parse(localStorage.getItem("current_logon_company")).companyPk,
        userName: this.selectUserForm.userName,
        state: this.selectUserForm.state,
      };
      this.loading = true;
      // console.log(arguments);
      // if(arguments[0] != 'query') {
      //   this.selectUserForm.userName = '';
      //   this.selectUserForm.userAccount = '';
      // }
      // param.userName = this.selectUserForm.userName;
      // param.userAccount = this.selectUserForm.userAccount;
      listApi(param).then(res => {
        this.loading = false;
        if(res.code == 1) {
          this.userList = res.data;
        }
      }).catch(() => {
        this.loading = false
      })
      
    },
    //保存修改
    saveUserModify(row){
      let data = {
        userPkno: row.userPkno,
        userName: row.userName,
        sexFlag: row.sexFlag,
        userPhone: row.userPhone
      }
      updateApi(data).then(res => {
        if(res.code == 1) {
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success'
          });
          this.selectUserList();
        }
      })
    },
    //添加员工
    addRow(row) {
      var item = {userPk:'',jobType:0,isNew:true};
      row.push(item);
    },
    //保存新员工
    addUser(row){
      console.log(row)
      var content = '';
      if(row.userName == '') {
        content = '请填写员工姓名';
      } else if (row.sexFlag  == '') {
        content = '请选择员工性别';
      } else if (row.userPhone  == '') {
        content = '请填写手机号码';
      }
      if(content != '') {
        this.$message({
          showClose: true,
          message: content,
          type: 'error'
        });

      } else {
        pmsUserAdd(row).then(res =>{
          if(res.code == 1) {
            this.$message({
              showClose: true,
              message: '添加员工成功！',
              type: 'success'
            });
            this.selectUserList();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
          }
        })
      }
    },
    //条件查询
    conditionalQuery(){
      // if(this.selectUserForm.userName == '' && this.selectUserForm.userAccount == '') {
      //   this.$message({
      //     showClose: true,
      //     message: '请输入筛选条件',
      //     type: 'error'
      //   });
      //   return false;
      // }
      this.selectUserList('query');
    },
    //删除员工
    deleteRow(index, rows, row) {
      if(row.isNew) {
        rows.splice(index, 1);
      } else {
        this.$confirm('确定移除员工?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pmsUserDel(row).then(res=> {
            if(res.code == 1) {
              this.$message({
                showClose: true,
                message: '移除成功！',
                type: 'success'
              });
              this.selectUserList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    //编辑员工
    modifyUser(row){
      this.showTabFlag=true;
      this.modifyUserObj = row;
      this.modifyUserObj.userPwd = '';
      this.modifyUserObj.buyerFlag == "Y"?this.buyer=true:this.buyer=false;
      this.modifyUserObj.directorFlag == "Y"?this.director=true:this.director=false;
      console.log(this.modifyUserObj)
    },
    saveComifyUser(modifyUserObj){
      this.buyer?modifyUserObj.buyerFlag = "Y":modifyUserObj.buyerFlag = "N";
      this.director?modifyUserObj.directorFlag = "Y":modifyUserObj.directorFlag =="N";
      console.log(modifyUserObj)
      pmsUserUpdate(modifyUserObj).then(res => {
        if(res.code == 1) {
          this.$message({
            showClose: true,
            message: '保存成功！',
            type: 'success'
          });
          this.modifyUserObj = {};
          this.showTabFlag=false;
        }
      })
    },




    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose() {}
  }
};
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
  overflow-y: auto;
}
.title-span {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px 0;
  display: inline-block;
}
.title-span-return {
  cursor: pointer;
  color: blueviolet;
  text-decoration: underline;
}
.input-width {
  width: 194px;
}
.input-width-80 {
  width: 80px;
}
.el-row {
  margin-bottom: 5px;
}
.el-dialog__body {
  padding: 5px 20px !important;
  color: #606266;
  line-height: 24px;
  font-size: 14px;
}
.form-row {
  width: 800px;
}
.form-row .el-form-item {
  width: 380px;
}
</style>


