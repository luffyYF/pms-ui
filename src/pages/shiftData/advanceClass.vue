// 会员管理
<template>
  <div>
    <!-- form -->
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">交班数据查询</h5>
        <el-form-item label="日期">
          <el-date-picker
            style="width:100%;"
            v-model="datePicker2"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="listShiftData(1)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="shiftData"
            v-if="hasPerm('pms:handoverDuty:view')"
          >交班</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">交班数据</h5>
      <el-table
        v-loading="loading"
        size="mini"
        border
        :data="tableData"
        style="width: 98.5%; margin:10px;"
      >
        <el-table-column label>
          <el-table-column prop="shiftNo" label="班次" align="center" width="180"></el-table-column>
          <el-table-column prop="beginDate" label="开始时间" align="center" width="180"></el-table-column>
          <el-table-column prop="endDate" label="结束时间" align="center" width="180"></el-table-column>
          <el-table-column
            prop="shiftPeopleName"
            label="当班人"
            align="center"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="本班权责汇总">
          <el-table-column prop="qzCash" label="现金" align="center" width="80"></el-table-column>
          <el-table-column prop="qzBankCard" label="银行卡" align="center" width="80"></el-table-column>
          <el-table-column prop="qzMemberCard" label="会员卡" align="center" width="80"></el-table-column>
          <el-table-column prop="qzHangBill" label="挂账" align="center" width="80"></el-table-column>
          <el-table-column prop="qzFreeSheet" label="免单" align="center" width="80"></el-table-column>
          <el-table-column prop="qzCheck" label="支票" align="center" width="80"></el-table-column>
          <el-table-column prop="qzCashCoupon" label="代金券" align="center" width="80"></el-table-column>
          <el-table-column prop="qzOther" label="其他" align="center" width="80"></el-table-column>
          <el-table-column prop="qzRoomCharge" label="房费" align="center" width="80"></el-table-column>
          <el-table-column prop="qzGoods" label="商品销售" align="center" width="80"></el-table-column>
          <el-table-column prop="qzMemberReCharge" label="会员充值" align="center" width="80"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="本班收付汇总">
          <el-table-column prop="rpCash" label="现金" align="center" width="80"></el-table-column>
          <el-table-column prop="rpBankCard" label="银行卡" align="center" width="80"></el-table-column>
          <el-table-column prop="rpMemberCard" label="会员卡" align="center" width="80"></el-table-column>
          <el-table-column prop="rpHangBill" label="挂账" align="center" width="80"></el-table-column>
          <el-table-column prop="rpFreeSheet" label="免单" align="center" width="80"></el-table-column>
          <el-table-column prop="rpCheck" label="支票" align="center" width="80"></el-table-column>
          <el-table-column prop="rpCashCoupon" label="代金券" align="center" width="80"></el-table-column>
          <el-table-column prop="rpOther" label="其他" align="center" width="80"></el-table-column>
          <el-table-column prop="rpRoomCharge" label="房费" align="center" width="80"></el-table-column>
          <el-table-column prop="rpGoods" label="商品销售" align="center" width="80"></el-table-column>
          <el-table-column prop="rpMemberReCharge" label="会员充值" align="center" width="80"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        class="positions"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNum"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total"
      ></el-pagination>
    </div>

    <!-- 会员管理 dialog -->
    <el-dialog
      title="预交班信息"
      :visible.sync="dialogMemberVisible"
      width="800px"
      top="60px"
      class="dialogMemberManage"
    >
      <el-form
        ref="preShiftData"
        size="mini"
        :rules="rules"
        :model="preShiftData"
        label-position="right"
        label-width="110px"
      >
        <div class="body-conten">
          <div class="bg-reserve">
            <h5 class="info-title">交班基础信息</h5>
            <el-form-item label="班次时间" prop="ruleName">
              <el-date-picker
                style="width:100%;"
                v-model="datePicker"
                @change="shiftData"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              />
            </el-form-item>
            <el-form-item label="交班操作员" prop="ruleName">{{preShiftData.userName}}</el-form-item>
            <el-form-item label="交班人员" prop="ruleName">
              <el-select v-model="shiftPeople" multiple placeholder="请选择">
                <el-option-group
                  v-for="group in shiftList"
                  :key="group.classId"
                  :label="group.className"
                >
                  <el-option
                    v-for="item in group.userList"
                    :key="item.upmsUserId"
                    :label="item.userName"
                    :value="item.upmsUserId"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="body-conten">
          <div class="bg-reserve">
            <h5 class="info-title">本班交班账务汇总</h5>
            <el-form-item label="客房总收入">
              {{preShiftData.qz.cons.income}}&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="preShiftData.qz.cons.detail.length>0"
              >(</span>
              <span v-for="(obj,i) in preShiftData.qz.cons.detail" :key="i">
                {{obj.projectName}}:{{obj.price}}
                <i
                  v-if="i != preShiftData.qz.cons.detail.length-1"
                >，</i>
              </span>
              <span v-if="preShiftData.qz.cons.detail.length>0">)</span>
            </el-form-item>
            <el-form-item label="总结算">
              {{preShiftData.qz.settl.income}}&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="preShiftData.qz.settl.detail.length>0"
              >(</span>
              <span v-for="(obj,i) in preShiftData.qz.settl.detail" :key="i">
                {{obj.projectName}}:{{obj.price}}
                <i
                  v-if="i != preShiftData.qz.settl.detail.length-1"
                >，</i>
              </span>
              <span v-if="preShiftData.qz.settl.detail.length>0">)</span>
            </el-form-item>
          </div>
        </div>
        <div class="body-conten">
          <div class="bg-reserve">
            <h5 class="info-title">本次已结账账务汇总(本班收付)</h5>
            <el-form-item label="客房总收入">
              {{preShiftData.settl.cons.income}}&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="preShiftData.settl.cons.detail.length>0"
              >(</span>
              <span v-for="(obj,i) in preShiftData.settl.cons.detail" :key="i">
                {{obj.projectName}}:{{obj.price}}
                <i
                  v-if="i != preShiftData.settl.cons.detail.length-1"
                >，</i>
              </span>
              <span v-if="preShiftData.settl.cons.detail.length>0">)</span>
            </el-form-item>
            <el-form-item label="总结算">
              {{preShiftData.settl.settl.income}}&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="preShiftData.settl.settl.detail.length>0"
              >(</span>
              <span v-for="(obj,i) in preShiftData.settl.settl.detail" :key="i">
                {{obj.projectName}}:{{obj.price}}
                <i
                  v-if="i != preShiftData.settl.settl.detail.length-1"
                >，</i>
              </span>
              <span v-if="preShiftData.settl.settl.detail.length>0">)</span>
            </el-form-item>
          </div>
        </div>

        <div class="body-conten">
          <div class="bg-reserve">
            <h5 class="info-title">会员充值</h5>
            <el-form-item label="会员充值">
              {{preShiftData.recharge.income}}&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="preShiftData.recharge.detail.length>0"
              >(</span>
              <span v-for="(obj,i) in preShiftData.recharge.detail" :key="i">
                {{obj.projectName}}:{{obj.price}}
                <i
                  v-if="i != preShiftData.recharge.detail.length-1"
                >，</i>
              </span>
              <span v-if="preShiftData.recharge.detail.length>0">)</span>
            </el-form-item>
          </div>
        </div>

        <div class="body-conten">
          <div class="bg-reserve">
            <h5 class="info-title">单位中介收款</h5>
            <el-form-item label="单位结算">{{preShiftData.agreementSettlement}}</el-form-item>
            <el-form-item label="单位预收款">{{preShiftData.agreementAdvanceCollection}}</el-form-item>
            <el-form-item label="中介结算">{{preShiftData.intermediarySettlement}}</el-form-item>
            <el-form-item label="中介预收款">{{preShiftData.intermediaryAdvanceCollection}}</el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMemberVisible = false" size="mini">取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="hasPerm('pms:handoverDuty:add')"
          @click="addShiftData"
          :loading="loading"
        >保存</el-button>
      </span>
    </el-dialog>

    <!-- 交班报表 -->
    <el-dialog
      class="dialogLogStatements"
      :visible.sync="dialogLogStatementsVisible"
      :close-on-click-modal="true"
      :modal="true"
      width="1200px"
      top="60px"
    >
      <table
        cellpadding="5"
        style="padding:20px; border-collapse:collapse;text-align:center;width:100%;table-layout: fixed;"
      >
        <caption style="font-size:18px;font-weight: bold;">交班报表</caption>

        <tr style="text-align:left">
          <td colspan="3">班次:BC8044637395</td>
          <td colspan="4">交班人:超级管理员</td>
          <td colspan="5">交班日期:2019-03-12 10:33:50至2019-05-28 17:42:09</td>
        </tr>
        <tr>
          <th colspan="12" style="border:1px solid black;">本班权责</th>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">结算</td>
          <td colspan="2" style="border:1px solid black;">现金</td>
          <td rowspan="2" style="border:1px solid black;">银行卡</td>
          <td rowspan="2" style="border:1px solid black;">支付宝</td>
          <td rowspan="2" style="border:1px solid black;">微信</td>
          <td rowspan="2" style="border:1px solid black;">会员卡</td>
          <td colspan="2" style="border:1px solid black;">挂账</td>
          <td rowspan="2" style="border:1px solid black;">免单</td>
          <td rowspan="2" style="border:1px solid black;">代金卷</td>
          <td rowspan="2" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">收</td>
          <td style="border:1px solid black;">退</td>
          <td style="border:1px solid black;">单位</td>
          <td style="border:1px solid black;">中介</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">收入</td>
          <td colspan="3" style="border:1px solid black;">房费</td>
          <td colspan="4" style="border:1px solid black;">商品销售</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">全日租</td>
          <td style="border:1px solid black;">半日租</td>
          <td style="border:1px solid black;">钟点房</td>
          <td style="border:1px solid black;">赔偿</td>
          <td style="border:1px solid black;">会议</td>
          <td style="border:1px solid black;">电话</td>
          <td style="border:1px solid black;">餐饮</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">-28</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td colspan="4" style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="3" style="border:1px solid black;">-28</td>
          <td colspan="4" style="border:1px solid black;">0</td>
          <td colspan="4" style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">总计</td>
          <td colspan="11" style="border:1px solid black;">
            <span style="margin:0 10px">结算：0.0</span>
            <span style="margin:0 10px">收入：-28.0</span>
          </td>
        </tr>
        <tr>
          <th colspan="12" style="border:1px solid black;">本班收付</th>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">结算</td>
          <td colspan="2" style="border:1px solid black;">现金</td>
          <td rowspan="2" style="border:1px solid black;">银行卡</td>
          <td rowspan="2" style="border:1px solid black;">支付宝</td>
          <td rowspan="2" style="border:1px solid black;">微信</td>
          <td rowspan="2" style="border:1px solid black;">会员卡</td>
          <td colspan="2" style="border:1px solid black;">挂账</td>
          <td rowspan="2" style="border:1px solid black;">免单</td>
          <td rowspan="2" style="border:1px solid black;">代金卷</td>
          <td rowspan="2" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">收</td>
          <td style="border:1px solid black;">退</td>
          <td style="border:1px solid black;">单位</td>
          <td style="border:1px solid black;">中介</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">收入</td>
          <td colspan="3" style="border:1px solid black;">房费</td>
          <td colspan="4" style="border:1px solid black;">商品销售</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">全日租</td>
          <td style="border:1px solid black;">半日租</td>
          <td style="border:1px solid black;">钟点房</td>
          <td style="border:1px solid black;">赔偿</td>
          <td style="border:1px solid black;">会议</td>
          <td style="border:1px solid black;">电话</td>
          <td style="border:1px solid black;">餐饮</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">-28</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td style="border:1px solid black;">0</td>
          <td colspan="4" style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="3" style="border:1px solid black;">-28</td>
          <td colspan="4" style="border:1px solid black;">0</td>
          <td colspan="4" style="border:1px solid black;">0</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">总计</td>
          <td colspan="11" style="border:1px solid black;">
            <span style="margin:0 10px">结算：0.0</span>
            <span style="margin:0 10px">收入：-28.0</span>
          </td>
        </tr>
        <tr>
          <td colspan="10" style="border:1px solid black;">会员充值</td>
          <td colspan="2" style="border:1px solid black;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border:1px solid black;">现金充值</td>
          <td colspan="2" style="border:1px solid black;">银行卡</td>
          <td colspan="2" style="border:1px solid black;">支付宝</td>
          <td colspan="2" style="border:1px solid black;">微信</td>
          <td colspan="2" style="border:1px solid black;">充值赠送</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border:1px solid black;">前台操作员</td>
          <td colspan="2" style="border:1px solid black;">现金充值</td>
          <td colspan="2" style="border:1px solid black;">银行卡</td>
          <td colspan="2" style="border:1px solid black;">支付宝</td>
          <td colspan="2" style="border:1px solid black;">微信</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border:1px solid black;"></td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td colspan="2" style="border:1px solid black;">0</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
      </table>
      <div style="text-align:right;padding:10px;font-size:12px">
        <el-button type="primary" icon="el-icon-printer" @click="listShiftData(1)">打印发票</el-button>
        <el-button type="primary" icon="el-icon-download" @click="listShiftData(1)">导出excel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  shiftDataViewByPk,
  getPreShiftInf,
  addShiftData,
  listShiftData,
  shiftDataView
} from "@/api/shiftData/shiftData";
import { getAttendanceClasses } from "@/api/oaApi";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      dialogMemberVisible: false,
      dialogLogStatementsVisible: false,
      loading: false,
      form: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        beginDate: "",
        endDate: ""
      },
      preShiftDataObj: {
        beginDate: "",
        endDate: ""
      },
      preShiftData: {
        qz: {
          cons: {
            icome: 0,
            detail: []
          },
          settl: {
            icome: 0,
            detail: []
          }
        },
        settl: {
          cons: {
            icome: 0,
            detail: []
          },
          settl: {
            icome: 0,
            detail: []
          }
        },
        recharge: {
          income: 0,
          detail: []
        }
      },
      datePicker: [],
      datePicker2: [],
      rules: {},
      shiftList: [],
      shiftPeople: [],
      shiftPeopleObj: {}
    };
  },
  mounted() {
    //   this.init()
  },
  methods: {
    listShiftData(val) {
      if (val) {
        this.form.pageNum = 1;
      }
      console.log(this.datePicker2 != null && this.datePicker2.length == 2);
      if (this.datePicker2 != null && this.datePicker2.length == 2) {
        this.form.beginDate = this.datePicker2[0];
        this.form.endDate = this.datePicker2[1];
      } else {
        this.form.beginDate = "";
        this.form.endDate = "";
      }
      listShiftData(this.form).then(res => {
        this.tableData = res.data.data;
        this.form.total = res.data.total;
      });
      // shiftDataView({shiftType:1,billType:0}).then(res=>{
      //     console.log(res.data)
      // })
    },
    init() {
      this.listShiftData();
    },
    getAttendanceClasses() {
      getAttendanceClasses({
        companyPk: localStorage.getItem("select_company_pk")
      }).then(res => {
        this.shiftList = res.data;
        this.shiftPeopleObj = {};
        for (var i = 0; i < this.shiftList.length; i++) {
          if (this.shiftList[i].userList == null) {
            continue;
          }
          for (var j = 0; j < this.shiftList[i].userList.length; j++) {
            this.shiftPeopleObj[
              this.shiftList[i].userList[j].upmsUserId
            ] = this.shiftList[i].userList[j];
          }
        }
      });
    },
    shiftData() {
      var that = this;
      // if(that.datePicker != null && that.datePicker.length == 2){
      //     that.preShiftDataObj.beginDate = that.datePicker[0]
      //     that.preShiftDataObj.endDate = that.datePicker[1]
      // }
      this.getAttendanceClasses();
      getPreShiftInf(that.preShiftDataObj).then(res => {
        that.datePicker = [res.data.beginDate, res.data.endDate];
        that.preShiftData = res.data;
        that.dialogMemberVisible = true;
      });
    },
    saveShiftData() {
      var that = this;
      var data = {
        shiftPeople:
          this.shiftPeople == null || this.shiftPeople.length == 0
            ? ""
            : this.shiftPeople.join(","),
        beginDate: that.preShiftData.beginDate,
        endDate: that.preShiftData.endDate,
        agreementSettlement: that.preShiftData.agreementSettlement,
        agreementAdvanceCollection:
          that.preShiftData.agreementAdvanceCollection,
        intermediarySettlement: that.preShiftData.intermediarySettlement,
        intermediaryAdvanceCollection:
          that.preShiftData.intermediaryAdvanceCollection
      };
      let shiftPeopleName = "";
      if (this.shiftPeople != null && this.shiftPeople.length != 0) {
        for (let i = 0; i < this.shiftPeople.length; i++) {
          shiftPeopleName +=
            this.shiftPeopleObj[this.shiftPeople[i]].userName + ",";
        }
        data.shiftPeopleName = shiftPeopleName.substring(
          0,
          shiftPeopleName.length - 1
        );
      }
      addShiftData(data).then(res => {
        that.$message({ type: "success", message: res.sub_msg });
        if (res.code == 1) {
          shiftDataViewByPk({ shiftDataPk: res.sub_code }).then(res => {
            console.log("res :", res);
            that.dialogLogStatementsVisible = true;
          });
        }
        that.listShiftData();
        that.dialogMemberVisible = false;
      });
    },
    addShiftData() {
      if (this.shiftPeople == null || this.shiftPeople.length == 0) {
        this.$confirm("当前未选择交班人员?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.saveShiftData();
        });
      } else {
        this.saveShiftData();
      }
    },
    // 分页相关
    handleSizeChange(val) {
      this.form.pageNum = 1;
      this.form.pageSize = val;
      this.listRule();
    },
    // 分页相关
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.listRule();
    }
  }
};
</script>

<style scoped>
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
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
.el-select {
  width: 178px;
}
.el-date-editor.el-input {
  width: 178px;
}
.body-conten {
  background: #f7f7f7;
  padding: 10px;
}
.height38 {
  height: 38px;
  padding: 20px 10px 0 10px;
}
.height110 {
  height: 110px;
  padding: 20px 10px 0 10px;
}
.positions {
  float: right;
}
</style>
<style>
.dialogMemberManage .el-dialog .el-dialog__body {
  padding: 0;
}
.dialogLogStatements .el-dialog {
  padding-bottom: 20px;
}
</style>

