<template>
  <div>
    <el-table v-loading="childMsg.loading" :data="priceCategoryList.tableList" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="priceCategoryValue" label="价格类别"></el-table-column>
      <el-table-column prop="schemeName" label="价格方案">
        <template slot-scope="scope">
              <el-popover @show="showSchemePopover(scope)" ref="name" placement="bottom-start"  width="300" trigger="hover">
                <div>
                  <p class="clearfix">
                    <span class="fl">名称：{{popoverItem.schemeName}}</span>
                  </p>
                  <p class="clearfix">
                    <span class="fl">代码：{{popoverItem.schemeCode}}</span>
                    <span class="fr">
                      <el-switch
                        v-model="popoverItem.usingFlag"
                        active-text="已启用"
                        @change="changeUsingFlag"
                        inactive-text="已停用">
                      </el-switch>
                    </span>
                  </p>
                  <p class="clearfix">
                    <span class="fl">价格类别：{{popoverItem.priceCategoryValue}}</span>
                    <span class="fr">{{popoverItem.breakfastValue}}</span>
                  </p>
                  <p class="clearfix">
                    <span class="fl">促销类型：{{popoverItem.priceCategoryValue}}</span>
                    <span class="fr">{{popoverItem.paymentMethodValue}}</span>
                  </p>
                  <p class="clearfix">
                    <span class="fl">有效时间：{{popoverItem.beginDate}} 至 {{popoverItem.endDate}}</span>
                  </p>
                </div>
              </el-popover>
              <span @dblclick="updataSchemeInformation(scope)" style="text-decoration: underline;cursor: pointer;" v-popover:name>{{scope.row.schemeName}}</span>
              <el-button @click="openModifyPriceDialog(scope)" type="primary" size="mini" style="float:right">变价</el-button>
            </template>
      </el-table-column>
      <el-table-column v-for="(key,value) in priceCategoryList.title" :key="value" :prop="value" :label="key">
        <template slot-scope="scope">
          <span @click="dialogVisible3 = true" class="cursor-pointer-sty">{{scope.row[value]}}</span>
        </template>
      </el-table-column> 
    </el-table>

    <el-dialog title="变价" :visible.sync="bjDialog" width="800px">
      <el-col :span="24">
        <el-form ref="newSchemeForm" :model="newSchemeForm" size="mini" label-width="80px">
          <el-form-item label="名称" prop="roomType">
            <span>{{newSchemeForm.schemeName}}</span>
          </el-form-item>
          <el-form-item label="使用房型" prop="roomType">
            <el-select v-model="newSchemeForm.roomType" multiple placeholder="请选择使用房型" style="width:50%;" @change="roomTypeChange">
              <el-option v-for="roomItem in roomTypeList" :key="roomItem.typePk" :label="roomItem.typeName" :value="roomItem.typePk"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效时间" prop="daterange">
            <el-date-picker
              v-model="newSchemeForm.daterange" 
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <h3 class="price-title">价格明细</h3>
        <div class="price-detail-li" v-for="(priceDetail, index) in priceDetailPos" :key="index">
          <div class="demo-input-suffix">
            <el-input :disabled="true" v-model="priceDetail.roomTypeValue" size="mini" style="width:120px;"></el-input>
            <el-switch v-model="priceDetail.isFixed" active-color="#13ce66" inactive-color="#ff4949" active-text="固定房价" inactive-text="引用方案"></el-switch>
            <div v-if="priceDetail.isFixed" style="display: inline-block;">
              <el-input v-model="priceDetail.price" size="mini" style="width:120px;"></el-input>
              <el-checkbox v-model="priceDetail.isDifferent">周末价和平日价不同</el-checkbox>
            </div>
            <div v-if="!priceDetail.isFixed" style="display: inline-block;">
              <el-select v-model="priceDetail.refSchemePk" size="mini" placeholder="请选择价格方案" style="width:120px;">
                <el-option v-for="(scheme,index) in addSchemeNeedList" :key="index" :label="scheme.schemeName" :value="scheme.schemePk"></el-option>
              </el-select>
              <el-select v-model="priceDetail.refRule" size="mini" style="width:120px;">
                <el-option v-for="(rule,index) in refRuleList" :key="index" :label="rule.name" :value="rule.key"></el-option>
              </el-select>
              <div v-if="priceDetail.refRule != 'UNCHANGED'" style="display: inline-block;">
                <el-input v-model="priceDetail.refRuleValue" size="mini" style="width:70px;"></el-input>
                <span v-if="priceDetail.refRule == 'UP_MONEY' || priceDetail.refRule == 'DOWN_MONEY'">元</span>
                <span v-if="priceDetail.refRule == 'UP_RATIO' || priceDetail.refRule == 'DOWN_RATIO'">%</span>
                <span v-if="priceDetail.refRule == 'UP_RATIO' || priceDetail.refRule == 'DOWN_RATIO'">
                  <el-select v-model="priceDetail.accuracyType" size="mini" style="width:120px;">
                    <el-option v-for="(accuracy,index) in accuracyTypeList" :key="index" :label="accuracy.name" :value="accuracy.key"></el-option>
                  </el-select>
                </span>
              </div>
            </div>
          </div>
          <div class="everydayPrice" v-if="priceDetail.isDifferent && priceDetail.isFixed">
            <span class="everydayPrice-li" v-for="(week,index) in priceDetail.differentPrice" :key="index">
              <span>{{week.time}}</span>
              <el-input v-model="week.value" size="mini"></el-input>
            </span>
          </div>
        </div>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="saveBj">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="房价修改"
      :visible.sync="dialogVisible3"
      width="600px"
      center
      class="fullCalendar">
      <div class="calendar-box">
        <full-calendar :events="meetingEventList" lang="zh"
          @eventClick="eventClick"
          @changeMonth="changeMonth"
          @dayClick="dayClick">
        </full-calendar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="valence">变价</el-button>
      </span>
    </el-dialog>  
    <el-dialog title="修改价格" center :visible.sync="modifyPriceDialog" width="300px" class="modifyPrice">
      <span style="font-weight:600;padding-bottom:20px;">2018-03-08  房价修改</span>
      <el-form :model="form" size="mini">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入新价格"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="变价"
      :visible.sync="valenceDialog"
      width="600px">
      <span>日期范围：</span>
      <el-date-picker
        size="mini"
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div style="display: inline-block;margin-top:10px;">
        <el-input value="固定房价" size="mini" style="width:120px;" :disabled="true" placeholder="0"></el-input>
        <el-input v-model="value1" size="mini" style="width:120px;" placeholder="0"></el-input>
        <el-checkbox v-model="whetherChecked1">周末价和平日价不同</el-checkbox>
      </div>
      <div class="everydayPrice" v-if="whetherChecked1">
        <span class="everydayPrice-li">
          <span>周一</span>
          <el-input v-model="value1" size="mini" placeholder="0"></el-input>
        </span>
        <span class="everydayPrice-li">
          <span>周三</span>
          <el-input v-model="value1" size="mini" placeholder="0"></el-input>
        </span>
        <span class="everydayPrice-li">
          <span>周三</span>
          <el-input v-model="value1" size="mini" placeholder="0"></el-input>
        </span>
        <span class="everydayPrice-li">
          <span>周四</span>
          <el-input v-model="value1" size="mini" placeholder="0"></el-input>
        </span>
        <span class="everydayPrice-li">
          <span>周五</span>
          <el-input v-model="value1" size="mini" placeholder="0"></el-input>
        </span>
        <span class="everydayPrice-li">
          <span>周六</span>
          <el-input v-model="value1" size="mini" placeholder="0"></el-input>
        </span>
        <span class="everydayPrice-li">
          <span>周日</span>
          <el-input v-model="value1" size="mini" placeholder="0"></el-input>
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin:0 auto;display:block;" size="mini" type="primary">保存</el-button>
      </div>
    </el-dialog>    


    <el-dialog class="peice-programme" title="编辑方案" width="800px" :visible.sync="editSchemeDialog">
      <el-col :span="24">
        <el-form ref="newSchemeForm" :model="newSchemeForm" :rules="schemeRules" size="small" label-width="100px">
          <el-form-item label="代码" prop="schemeCode">
            <el-input class="inpt-width" v-model="newSchemeForm.schemeCode" placeholder="输入价格方案代码"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="schemeName">
            <el-input class="inpt-width" v-model="newSchemeForm.schemeName" placeholder="输入价格方案名称"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input class="inpt-width" v-model="newSchemeForm.schemeDisc" placeholder="输入价格方案描述"></el-input>
          </el-form-item>
          <el-form-item label="价格类别">
            <el-radio-group v-model="newSchemeForm.priceTypeValue" disabled>
              <el-radio-button label="会员类"></el-radio-button>
              <el-radio-button label="协议类"></el-radio-button>
              <el-radio-button label="中介类"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="会员级别" v-if="newSchemeForm.isMember">
            <el-select v-model="newSchemeForm.memberLabel" style="width:50%;" placeholder="请选择会员级别">
              <el-option v-for="grade in gradeList" :key="grade.gradePk" :label="grade.gradeName" :value="grade.gradePk"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="含早情况">
            <el-input-number v-model="newSchemeForm.breakfast" @change="breakfastChange" :min="0" :max="9" ></el-input-number>
            <span>{{newSchemeForm.breakfastText}}</span>
          </el-form-item>
          <el-form-item label="付款方式">
            <el-radio-group v-model="newSchemeForm.payTypeValue" @change="priceTypeChange">
              <el-radio-button label="现付"></el-radio-button>
              <el-radio-button label="预付"></el-radio-button>
            </el-radio-group>
          </el-form-item> 
          <el-form-item label="促销类型">
            <el-select v-model="newSchemeForm.saleType" placeholder="请选择促销类型" style="width:50%;">
              <el-option v-for="promotion in promotionType" :key="promotion.value" :label="promotion.label" :value="promotion.value"></el-option>
            </el-select>
            <div style="margin-top:10px;" v-if="newSchemeForm.saleType !='BASIC_PRICE'">
              <span v-if="newSchemeForm.saleType !='TIME_LIMIT'">
                <span v-if="newSchemeForm.saleType =='ADVANCE_BOOK'">
                  <el-input style="width:140px;" :disabled="true" value="提前预定天数" suffix-icon="el-icon-caret-bottom" ></el-input> >=
                </span>
                <el-input style="width:80px;" v-model="newSchemeForm.promotionDay"></el-input>  天
              </span>
              <el-time-picker
                is-range
                v-if="newSchemeForm.saleType =='TIME_LIMIT'"
                arrow-control
                value-format="hh:mm:ss"
                v-model="newSchemeForm.promotionDate"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-time-picker>
            </div>
          </el-form-item>

          <el-form-item label="担保类型" v-if="newSchemeForm.isIntermediary"  prop="guaranteeType">
            <el-select v-model="newSchemeForm.guaranteeType" style="width:50%;" placeholder="请选择担保类型">
              <el-option v-for="(guarantee,index) in guaranteeTypeList" :key="index" :label="guarantee.name" :value="guarantee.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="担保时间" v-if="newSchemeForm.guaranteeType == 'FSSWDB' || newSchemeForm.guaranteeType == 'FSQEDB'">
            <el-select v-model="newSchemeForm.guaranteeTime" style="width:50%;">
              <el-option v-for="(guarantee,index) in guaranteeTimeList" :key="index" :label="guarantee.name" :value="guarantee.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退订政策" v-if="newSchemeForm.isIntermediary" prop="unsubscribe">
            <el-select v-model="newSchemeForm.unsubscribe"  style="width:50%;" placeholder="请选择退订政策">
              <el-option label="任意退" value="shanghai"></el-option>
              <el-option label="不能退" value="beijing"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="适用渠道" prop="channel" >
            <el-select v-model="newSchemeForm.channel" multiple placeholder="请选择适用渠道型" style="width:50%;">
              <el-option v-for="channel in channelList" :key="channel.typePk" :label="channel.typeName" :value="channel.typePk"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用房型" prop="roomType">
            <el-select v-model="newSchemeForm.roomType" multiple placeholder="请选择使用房型" style="width:50%;" @change="roomTypeChange">
              <el-option v-for="roomItem in roomTypeList" :key="roomItem.typePk" :label="roomItem.typeName" :value="roomItem.typePk"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="有效时间" prop="daterange">
            <el-date-picker
              v-model="newSchemeForm.daterange"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="使用状态" prop="roomType">
            <el-switch
              v-model="newSchemeForm.usingFlag"
              active-text="已启用"
              inactive-text="未启用">
            </el-switch>
          </el-form-item>
        </el-form>
      </el-col> 
    </el-dialog>


  </div>
</template>

<script>
import {
  addPriceScheme,
  listPriceScheme,
  updateUsingPriceScheme,
  updatePriceScheme,
  selectPriceScheme
} from "@/api/systemSet/priceScheme/priceSchemeController";
import { listType } from "@/api/systemSet/type/typeController";
import { listGrade } from "@/api/systemSet/member/pmsMemberGradeController";
var demoEvents = [
  {
    title: "元宵节",
    start: "2018-03-02",
    cssClass: "festival",  //价格所用样式
    YOUR_DATA: {}
  },{
    title: "妇女节",
    start: "2018-03-09",
    cssClass: "festival",  //节日所用样式
    YOUR_DATA: {}
  },{
    title: "￥666",
    start: "2018-03-08",
    cssClass: "price",  //节日所用样式
    YOUR_DATA: {}
  },{
    title: "￥666",
    start: "2018-03-09",
    cssClass: "price",  //节日所用样式
    YOUR_DATA: {}
  },{
    title: "￥666",
    start: "2018-03-10",
    cssClass: "price",  //节日所用样式
    YOUR_DATA: {}
  }
  
];
  export default {
    props: ['childMsg'],
    created(){
      this.init();
    },
    data () {
      return {
        priceCategoryList:[],
        contrast:[],
        contactArray:[],
        contactDot:0,
        popoverItem: {
          //弹出框显示信息
          schemePk: "",
          schemeName: "", //方案名
          schemeCode: "", //方案代码
          priceCategory: "", //价格类别
          priceCategoryValue: "", //价格类别名
          promotionType: "", //促销类型
          promotionTypeValue: "", //促销类型名
          beginDate: "", //开始时间
          endDate: "", //结束时间
          usingFlag: "", //是否启用
          breakfastNum: "", // 早餐数量
          breakfastValue: "", // 早餐数量说明
          paymentMethod: "", //付款方式
          paymentMethodValue: ""
        },
        editSchemeDialog:false,
        newSchemeForm: {
        schemePk: "",
        schemeCode: "",
        schemeName: "",
        schemeDisc: "",
        priceTypeValue: "",
        priceType: "",
        memberLabel: "",
        breakfast: 0,
        payTypeValue: "现付",
        payType: "CASH_PAYMENT",
        saleType: "BASIC_PRICE",
        promotionCondition: "",
        promotionDay: "1",
        promotionDate: null,
        guaranteeType: "NO",
        guaranteeTime: "10:00:00",
        unsubscribe: "",
        channel: [],
        isIntermediary: false,
        isMember: true,
        breakfastText: "不含早",
        roomType: [],
        daterange: "",
        usingFlag: true
      },
      priceDetailPos: [],
      priceDetailPosCopy: [],
      roomTypeList: [],
      channelList: [],
      bjDialog: false,
      editSchemeDialog: false,
      addSchemeNeedList: [],
      refRuleList: [
        //引用方案时的规则列表
        { key: "UNCHANGED", name: "不变" },
        { key: "UP_MONEY", name: "上浮金额" },
        { key: "DOWN_MONEY", name: "下调金额" },
        { key: "UP_RATIO", name: "上浮比例" },
        { key: "DOWN_RATIO", name: "下调比例" }
      ],
      gradeList: [], //会员等级
      promotionType: [
        //促销类型
        { label: "基础价格", value: "BASIC_PRICE" },
        { label: "连住优惠", value: "CONCESSION" },
        { label: "提前预订优惠", value: "ADVANCE_BOOK" },
        { label: "限时优惠", value: "TIME_LIMIT" },
        { label: "住几天或几天以上的倍数优惠", value: "OVER_DAY" }
      ],
      guaranteeTypeList: [
        //担保类型列表
        { key: "NO", name: "无担保" },
        { key: "FSSWDB", name: "分时首晚担保" },
        { key: "FSQEDB", name: "分时全额担保" },
        { key: "QTSWDB", name: "全天首晚担保" },
        { key: "QTQEDB", name: "全天全额担保" }
      ],
      guaranteeTimeList: [
        //担保时间段
        { key: "08:00:00", name: "早上08:00" },
        { key: "09:00:00", name: "上午09:00" },
        { key: "10:00:00", name: "上午10:00" },
        { key: "11:00:00", name: "上午11:00" },
        { key: "12:00:00", name: "中午12:00" },
        { key: "13:00:00", name: "下午01:00" },
        { key: "14:00:00", name: "下午02:00" },
        { key: "15:00:00", name: "下午03:00" },
        { key: "16:00:00", name: "下午04:00" },
        { key: "17:00:00", name: "下午05:00" },
        { key: "18:00:00", name: "晚上06:00" },
        { key: "19:00:00", name: "晚上07:00" },
        { key: "20:00:00", name: "晚上08:00" },
        { key: "21:00:00", name: "晚上09:00" },
        { key: "22:00:00", name: "晚上10:00" },
        { key: "23:00:00", name: "晚上11:00" }
      ],
      accuracyTypeList: [
        //精确度
        { key: "KEEY_BRANCH", name: "保留到分" },
        { key: "INTEGER", name: "舍去取整" },
        { key: "ROUNDING", name: "四舍五入" }
      ],
      schemeRules: {
        schemeCode: [
          {
            required: true,
            message: "请输入价格方案代码",
            trigger: "blur,change"
          }
        ],
        schemeName: [
          {
            required: true,
            message: "请输入价格方案名称",
            trigger: "blur,change"
          }
        ],
        schemeName: [
          {
            required: true,
            message: "请输入价格方案名称",
            trigger: "blur,change"
          }
        ],
        priceType: [
          { required: true, message: "请选择价格类别", trigger: "blur,change" }
        ],
        memberLabel: [
          { required: true, message: "请选择会员级别", trigger: "blur,change" }
        ],
        payType: [
          { required: true, message: "请选择付款方式", trigger: "blur,change" }
        ],
        saleType: [
          { required: true, message: "请选择促销类型", trigger: "blur,change" }
        ],
        guaranteeType: [
          { required: true, message: "请选择担保类型", trigger: "blur,change" }
        ],
        unsubscribe: [
          { required: true, message: "请选择退订政策", trigger: "blur,change" }
        ],
        channel: [
          { required: true, message: "请选择使用渠道", trigger: "blur,change" }
        ],
        roomType: [
          { required: true, message: "请选择使用房型", trigger: "blur,change" }
        ],
        daterange: [
          { required: true, message: "请选择有效时间", trigger: "blur,change" }
        ]
      },


        meetingEventList: demoEvents,

        weekendDefinition: false,
        yearMonth: '',
        value1:'',
        form: {
          region: '',
          date1: '',
          date2: '',
          checked: ''
        },
        checkList: [],
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        modifyPriceDialog:false,
        valenceDialog:false,
        whetherChecked1:false,
        whetherChecked2:false,
        dateRange:'',
        form:{
          name:''
        }
      }
    },
    methods: {
      init(){
        //查找方案列表 Y：价格方案  N：渠道
        
        listPriceScheme({ priceFlag: "Y" }).then(res => {
          if (res.code == 1) {
            this.contactArray = [];
            this.contactDot = 0;
            this.priceCategoryList = res.data;
            if (this.priceCategoryList.tableList.length > 0) {
              this.priceCategoryList.tableList.forEach(element => {
                if (element.priceCategory == "MEMBER") {
                  element.priceCategoryValue = "会员类";
                }
                if (element.priceCategory == "AGREEMENT") {
                  element.priceCategoryValue = "协议类";
                }
                if (element.priceCategory == "INTERMEDIA") {
                  element.priceCategoryValue = "中介类";
                }
              });
            }
          this.priceCategoryList.tableList.sort(
            this.sortBy("priceCategoryValue", false)
          );
          this.contrast = this.priceCategoryList.tableList;
          for(var i = 0; i<this.contrast.length; i++) {
            var item = this.contrast[i];
            if(i === 0){
              this.contactArray.push(1)
              this.contactDot = 0;
            } else {
              if(item.priceCategoryValue === this.contrast[i-1].priceCategoryValue) {
                this.contactArray[this.contactDot] += 1;
                this.contactArray.push(0)
              } else {
                this.contactArray.push(1)
                this.contactDot = i;
              }
            }
          }

          console.log(this.priceCategoryList);          
          }
        });
        this.selectRoomType();
      },
      sortBy(attr, rev) {
        //第二个参数没有传递 默认升序排列
        if (rev == undefined) {
          rev = 1;
        } else {
          rev = rev ? 1 : -1;
        }
        return function(a, b) {
          a = a[attr];
          b = b[attr];
          if (a < b) {
            return rev * -1;
          }
          if (a > b) {
            return rev * 1;
          }
          return 0;
        };
      },
      selectPrice() {
      selectPriceScheme().then(res => {
        if (res.code == 1) {
          this.addSchemeNeedList = res.data;
        }
      });
    },
    selectGrade() {
      listGrade().then(res => {
        if (res.code == 1) {
          this.gradeList = res.data;
        }
      });
    },

    selectRoomType() {
      //查找房型
      listType({ typeMaster: "ROOM_TYPE" }).then(res => {
        if (res.code == 1) {
          this.roomTypeList = res.data;
        }
      });
      listType({ typeMaster: "CHANNEL" }).then(res => {
        if (res.code == 1) {
          this.channelList = res.data;
        }
      });
    },
      showSchemePopover(obj) {
      this.popoverItem.schemePk = obj.row.schemePk;
      this.popoverItem.schemeName = obj.row.schemeName;
      this.popoverItem.schemeCode = obj.row.schemeCode;
      this.popoverItem.priceCategory = obj.row.priceCategory;
      if (this.popoverItem.priceCategory == "MEMBER") {
        this.popoverItem.priceCategoryValue = "会员类";
      } else if (this.popoverItem.priceCategory == "AGREEMENT") {
        this.popoverItem.priceCategoryValue = "协议类";
      } else {
        this.popoverItem.priceCategoryValue = "中介类";
      }
      this.popoverItem.beginDate = obj.row.beginDate;
      this.popoverItem.endDate = obj.row.endDate;
      this.popoverItem.usingFlag = obj.row.usingFlag === "Y" ? true : false;
      this.popoverItem.breakfastNum = obj.row.breakfastNum;
      if (this.popoverItem.breakfastNum == 0) {
        this.popoverItem.breakfastValue = "不含早";
      } else if (this.popoverItem.breakfastNum == 1) {
        this.popoverItem.breakfastValue = "含单早";
      } else if (this.popoverItem.breakfastNum == 2) {
        this.popoverItem.breakfastValue = "含双早";
      } else {
        this.popoverItem.breakfastValue =
          "含早餐（" + this.popoverItem.breakfastNum + "）";
      }
      this.popoverItem.paymentMethod = obj.row.paymentMethod;
      if (this.popoverItem.paymentMethod == "CASH_PAYMENT") {
        this.popoverItem.paymentMethodValue = "现付";
      } else {
        this.popoverItem.paymentMethodValue = "预付";
      }
    },
    changeUsingFlag() {
      const self = this;
      var params = {
        schemePk: self.popoverItem.schemePk,
        usingFlag: self.popoverItem.usingFlag ? "Y" : "N"
      };
      updateUsingPriceScheme(params).then(res => {
        if (res.code == 1) {
          var msg = this.popoverItem.usingFlag ? "启用" : "停用";
          this.$message({
            showClose: true,
            message: "方案已" + msg,
            type: "success"
          });
          self.init();
        }
      });
    },
    //选择使用房型
    roomTypeChange(data) {
      this.priceDetailPosCopy = this.priceDetailPos;
      this.priceDetailPos = [];
      for (var i = 0; i < this.newSchemeForm.roomType.length; i++) {
        var obj = this.deep_in_array(
          this.newSchemeForm.roomType[i],
          this.priceDetailPosCopy
        );
        var room = this.room_name_in_array(
          this.newSchemeForm.roomType[i],
          this.roomTypeList
        );
        if (obj.flag) {
          this.priceDetailPos.push(obj.obj);
        } else {
          var item = {
            accuracyType: "KEEY_BRANCH",
            detailPk: "",
            differentPriceFlag: "N",
            price: 0,
            differentPrice: [
              { value: 0, time: "周一" },
              { value: 0, time: "周二" },
              { value: 0, time: "周三" },
              { value: 0, time: "周四" },
              { value: 0, time: "周五" },
              { value: 0, time: "周六" },
              { value: 0, time: "周日" }
            ],
            refRule: "UNCHANGED",
            refRuleValue: 0,
            refSchemePk: "",
            roomTypePk: room.pk,
            ruleType: "FIXED_PRICE",
            isFixed: true,
            schemePk: "",
            sortNum: "",
            roomTypeValue: room.name,
            isDifferent: false
          };
          this.priceDetailPos.push(item);
        }
      }
    },
    deep_in_array(value, array) {
      var arr_obj = { flag: false, obj: {} };
      if (array.length == 0) {
        return arr_obj;
      }
      array.forEach(element => {
        if (value == element.roomTypePk) {
          arr_obj.obj = element;
          arr_obj.flag = true;
          return arr_obj;
        }
      });
      return arr_obj;
    },
    //匹配房型名称
    room_name_in_array(value, array) {
      var obj = { pk: value, name: "" };
      if (array.length == 0) {
        return obj;
      }
      array.forEach(element => {
        if (element.typePk == value) {
          obj.name = element.typeName;
          return obj;
        }
      });
      return obj;
    },
    openModifyPriceDialog(scheme) {
      this.bjDialog = true;
      this.newSchemeForm.schemePk = scheme.row.schemePk;
      this.newSchemeForm.schemeName = scheme.row.schemeName;

      this.selectPrice();
    },
    saveBj() {
      if (this.verification()) {
        var params = {};
        params.beginDate = this.newSchemeForm.daterange[0];
        params.schemePk = this.newSchemeForm.schemePk;
        params.endDate = this.newSchemeForm.daterange[1];
        params.roomTypePks = this.newSchemeForm.roomType.join(",");
        var detailPos = [];
        this.priceDetailPos.forEach(element => {
          var obj = {};
          obj.accuracyType = element.accuracyType; //精确度
          var price = [];
          for (var i = 0; i < element.differentPrice.length; i++) {
            price[i] = element.differentPrice[i].value;
          }
          obj.differentPrice = price.join(",");
          element.isDifferent
            ? (obj.differentPriceFlag = "Y")
            : (obj.differentPriceFlag = "N"); //周末价和平日价不同(自定义价格)是否启用标识
          obj.price = element.price; //价格 基本价格
          obj.refRule = element.refRule; //引用方案时使用的规制
          obj.refRuleValue = element.refRuleValue; //引用方案使用的规制的值
          obj.refSchemePk = element.refSchemePk; //引用价格方案主键
          obj.roomTypePk = element.roomTypePk; //房间类型主键
          element.isFixed
            ? (obj.ruleType = "FIXED_PRICE")
            : (obj.ruleType = "REFERENCE");
          detailPos.push(obj);
        });
        params.detailPos = detailPos;
        updatePriceScheme(params).then(res => {
          if (res.code == 1) {
            this.$message({
              showClose: true,
              message: "变价成功",
              type: "success"
            });
            this.bjDialog = false;
            this.priceDetailPos = [];
            (this.newSchemeForm = {
              schemePk: "",
              schemeName: "",
              roomType: [],
              daterange: ""
            }),
              this.init();
          }
        });
      }
    },
    verification() {
      var centent = "";
      if (this.newSchemeForm.roomType.length == 0) {
        centent = "方案房型不能为空！";
      } else if (this.newSchemeForm.daterange == "") {
        centent = "方案有效时间不能为空！";
      }
      if (centent != "") {
        this.$message({
          showClose: true,
          message: centent,
          type: "error"
        });
        return false;
      }
      return true;
    },

    breakfastChange(data) {
      if (data == 0) {
        this.newSchemeForm.breakfastText = "不含早";
      } else if (data == 1) {
        this.newSchemeForm.breakfastText = "含单早";
      } else if (data == 2) {
        this.newSchemeForm.breakfastText = "含双早";
      } else {
        this.newSchemeForm.breakfastText = "含早餐" + data + "份";
      }
    },
    priceTypeChange(data) {
      if (data == "现付") {
        this.newSchemeForm.payType = "CASH_PAYMENT";
      } else {
        this.newSchemeForm.payType = "PAY_ADVANCE";
      }
    },

    //修改方案信息
    updataSchemeInformation(scope) {
      this.editSchemeDialog = true;
      this.newSchemeForm.schemeCode = scope.row.schemeCode;
      this.newSchemeForm.schemeName = scope.row.schemeName;
      this.newSchemeForm.channel = scope.row.channelPks.split(",");
      // this.newSchemeForm.schemeDisc =
      this.newSchemeForm.priceType = scope.row.priceCategory;
      if (this.newSchemeForm.priceType == "MEMBER") {
        this.newSchemeForm.priceTypeValue = "会员类";
        this.newSchemeForm.isMember = true;
        this.newSchemeForm.isIntermediary = false;
      } else if (this.newSchemeForm.priceType == "AGREEMENT") {
        this.newSchemeForm.priceTypeValue = "协议类";
        this.newSchemeForm.isMember = false;
        this.newSchemeForm.isIntermediary = false;
      } else {
        this.newSchemeForm.priceTypeValue = "中介类";
        this.newSchemeForm.isMember = false;
        this.newSchemeForm.isIntermediary = true;
      }
      this.newSchemeForm.breakfast = scope.row.breakfastNum;
      this.breakfastChange(this.newSchemeForm.breakfast);
      this.newSchemeForm.payType = scope.row.paymentMethod;
      if (this.newSchemeForm.payType == "CASH_PAYMENT") {
        this.newSchemeForm.payTypeValue = "现付";
      } else {
        this.newSchemeForm.payTypeValue = "预付";
      }
      this.newSchemeForm.saleType = scope.row.promotionType; //促销类型
      this.newSchemeForm.memberLabel = scope.row.gradePk;
      this.newSchemeForm.daterange = [scope.row.beginDate, scope.row.endDate];
      this.newSchemeForm.roomType = scope.row.roomTypePks; //使用房型
      this.newSchemeForm.usingFlag = scope.row.usingFlag == "Y" ? true : false;
    },




      test(){
        console.log(1)
        this.dialogVisible3 = true;
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if(columnIndex === 0) {
          const _row = this.contactArray[rowIndex]
          const _col = _row > 0 ? 1:0;
          return {
            rowspan:_row,
            colspan:_col
          }
        }
      },
      whetherChecked(data){
        if(data){
           this.weekendDefinition = true; 
        }else{
          this.weekendDefinition = false;
        }
        console.log(data)
      },
      //日历月份点击事件
      changeMonth (start, end, current) {
        console.log({
          start:start,
          end:end,
          current:current
        })
      },
      //日历事件点击函数
      eventClick(event, jsEvent, pos) {
        console.log("eventClick", event);
      },
      //日历日期点击函数
      dayClick(day, jsEvent) {
        console.log(day)
        this.modifyPriceDialog = true;
      },
      valence(){
        this.valenceDialog = true;
      }
    },
    components: {
      "full-calendar": require("vue-fullcalendar")
    }
  }
</script>

<style scoped>
.cursor-pointer-sty{
  display: block;
  cursor: pointer;
}
.price-title{
  border-bottom: 2px solid #ddd;
  font-size: 14px;
}
.price-detail-li{
  margin-bottom: 10px;
}
.icon-close{
  font-size: 22px;
  position: relative;
  top: 3px;
  color: #f60;
  margin-left: 12px;
}
.paddingLeft{
  padding-left: 12px;
  margin: 10px 0;
}
.everydayPrice{
  margin: 10px 0;
}

.everydayPrice-li{
  width: 65px;
  display: inline-block;
  text-align: center;
  margin: 0 5px;
}
.clearfix {
  zoom: 1;
}
.clearfix:after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  content: ".";
}
.fl {
  float: left;
  display: block;
}
.fr {
  float: right;
  display: block;
}
</style>