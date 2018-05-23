// 价格方案设置   注：2018-04-12 暂时不用，未来删掉
<template>
  <div class="content-body">
    <div class="form-heard">
      <span>注：即将过期-查询距离过期还有7天的价格方案</span>
    </div>
    <el-form size="mini" v-model="screenForm"  label-width="80px">
      <el-form-item label="状态">
        <el-radio-group v-model="screenForm.statusValue" size="small" @change="statusChange">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="有效"></el-radio-button>
          <el-radio-button label="无效"></el-radio-button>
          <el-radio-button label="已过期"></el-radio-button>
          <el-radio-button label="即将过期"></el-radio-button>
        </el-radio-group>
        <el-button type="primary" @click="dialogVisible = true">价格变更记录</el-button>
        <el-button type="primary" @click="addSchemeDialog = true">添加价格方案</el-button>
      </el-form-item>
      <el-form-item label="渠道">
        <el-checkbox :indeterminate="screenForm.isIndeterminate" v-model="screenForm.checkChannelAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="screenForm.checkedChannel" @change="handleCheckedChannelChange">
          <el-checkbox v-for="channel in channelList" :label="channel" :key="channel.typePk">{{channel.typeName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-tabs class="priceSchemeTabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="渠道" name="first">
         <channel :child-msg="screenForm"/>
      </el-tab-pane>
      <el-tab-pane label="价格类别" name="second">
        <price-category :child-msg="screenForm"/>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="价格变更记录" width="800px" :visible.sync="dialogVisible">
      <el-form ref="form2" :model="form2" :inline="true" size="mini" label-width="80px">
        <el-row>
          <el-form-item label="方案">
            <el-input v-model="form2.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="房型">
            <el-select v-model="form2.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格范围">
            <el-date-picker v-model="form2.value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="	修改日期">
            <el-date-picker v-model="form2.value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-button type="primary" size="mini">查询</el-button>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="方案"></el-table-column>
          <el-table-column prop="date" label="房型"></el-table-column>
          <el-table-column prop="date" label="价格范围"></el-table-column>
          <el-table-column prop="date" label="价格类别"></el-table-column>
          <el-table-column prop="date" label="房价"></el-table-column>
          <el-table-column prop="date" label="修改时间"></el-table-column>
          <el-table-column prop="address" label="操作员"></el-table-column>
        </el-table>
      </el-form>
    </el-dialog>

    <el-dialog class="peice-programme" title="添加新方案" width="800px" :visible.sync="addSchemeDialog">
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
            <el-radio-group v-model="newSchemeForm.priceTypeValue" @change="priceCategoryChange">
              <el-radio-button label="会员类"></el-radio-button>
              <el-radio-button label="协议类"></el-radio-button>
              <el-radio-button label="中介类"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="会员级别" v-if="newSchemeForm.isMember"><!-- 会员价 -->
            <el-select v-model="newSchemeForm.memberLabel" style="width:50%;" placeholder="请选择会员级别">
              <el-option v-for="grade in gradeList" :key="grade.gradePk" :label="grade.gradeName" :value="grade.gradePk"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="含早情况">
            <el-input-number v-model="newSchemeForm.breakfast" @change="breakfastChange" :min="0" :max="9" label="描述文字"></el-input-number>
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

          <el-form-item label="担保类型" v-if="newSchemeForm.isIntermediary"  prop="guaranteeType"><!-- 中介价 -->
            <el-select v-model="newSchemeForm.guaranteeType" style="width:50%;" placeholder="请选择担保类型">
              <el-option v-for="(guarantee,index) in guaranteeTypeList" :key="index" :label="guarantee.name" :value="guarantee.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="担保时间" v-if="newSchemeForm.guaranteeType == 'FSSWDB' || newSchemeForm.guaranteeType == 'FSQEDB'">
            <el-select v-model="newSchemeForm.guaranteeTime" style="width:50%;">
              <el-option v-for="(guarantee,index) in guaranteeTimeList" :key="index" :label="guarantee.name" :value="guarantee.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退订政策" v-if="newSchemeForm.isIntermediary" prop="unsubscribe"><!-- 中介价 -->
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
      <span slot="footer" class="dialog-footer" style="text-align:center;display:block;">
        <el-button type="primary" size="small" @click="saveNewScheme">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Channel from "./PriceScheme/Channel";
import PriceCategory from "./PriceScheme/PriceCategory";
import {
  addPriceScheme,
  listPriceScheme,
  selectPriceScheme
} from "@/api/systemSet/priceScheme/priceSchemeController";
import { listType } from "@/api/systemSet/type/typeController";
import { listGrade } from "@/api/systemSet/member/pmsMemberGradeController";
export default {
  components: { Channel, PriceCategory },
  created() {
    this.init();
  },
  data() {
    return {
      priceCategoryList: [], // 价格类别表单数据
      channelChildList: [], // 渠道类别表单数据
      roomTypeList: [], // 房型
      channelList: [], // 渠道
      channelPskList: [],
      addSchemeDialog: false, // 是否打开添加新方案模态框
      newSchemeForm: {
        // 添加新方案表单对象   isMember:是否是会员类 isIntermediary：是否是中介类
        schemeCode: "",
        schemeName: "",
        schemeDisc: "",
        priceTypeValue: "会员类",
        priceType: "MEMBER",
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
        channel: "",
        roomType: "",
        daterange: "",
        isIntermediary: false,
        isMember: true,
        breakfastText: "不含早"
      },
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
      priceDetailPos: [
        //价格明细
        // { accuracyType:'',   //精确度
        //   detailPk:'',   //价格方案明细逐渐
        //   differentPrice:'',// 周末价和平日价不同  '21,23,21,12,12,12,12'
        //   differentPriceFlag:'',//周末价和平日价不同是否启用表标志
        //   isDifferent：false,   //价格是否不同
        //   price:'',//基础价格
        //   refRule:'',//引用方案时使用的规则[ UNCHANGED, UP_MONEY, DOWN_MONEY, UP_RATIO, DOWN_RATIO ]
        //   refRuleValue:'',//引用方案使用的规制的值
        //   refSchemePk:'',//引用价格方案主键
        //   roomTypePk:'',//房间类型主键
        //   ruleType:'',//规则类型 [ FIXED_PRICE, REFERENCE ] 固定房价/引用方案
        //   schemePk:'',//价格方案主鍵
        //   sortNum:'',//
        //   roomTypeValue:'',// 房型名称
        //   isFixed:''//是否固定房价
        //   }
      ],
      priceDetailPosCopy: [], //价格明细对照数组
      refRuleList: [
        //引用方案时的规则列表
        { key: "UNCHANGED", name: "不变" },
        { key: "UP_MONEY", name: "上浮金额" },
        { key: "DOWN_MONEY", name: "下调金额" },
        { key: "UP_RATIO", name: "上浮比例" },
        { key: "DOWN_RATIO", name: "下调比例" }
      ],
      accuracyTypeList: [
        //精确度
        { key: "KEEY_BRANCH", name: "保留到分" },
        { key: "INTEGER", name: "舍去取整" },
        { key: "ROUNDING", name: "四舍五入" }
      ],
      addSchemeNeedList: [], //添加新方案时引用的价格方案
      // checkChannelAll:true,     // 渠道全选
      isIndeterminate: true,
      screenForm: {
        statusValue: "全部",
        status: "all",
        isIndeterminate: false,
        checkChannelAll: true,
        checkedChannel: [],
        loading:false,
      },

      

      form: {},
      form2: {},
      radio5: "",
      checkAll: false,
      checkedCities: ["上海", "北京"],
      priceCategory: "会员价",
      paymentMethod: "现付",
      // breakfastText: '不含早',
      breakfast: "0",
      date1: "",
      roomPriceChoice: false,

      dialogVisible: false,
      memberShow: true,
      intermediary: false,
      whetherChecked: false,
      priceAdjustment: "",
      value1: "",
      options: [],
      activeName: "first",
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          address: "234",
          date: 12
        },
        {
          id: "12987123",
          name: "王小虎",
          address: "165",
          date: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          address: "324",
          date: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          address: "621",
          date: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          address: "539",
          date: "4.1",
          amount3: 15
        }
      ]
    };
  },
  methods: {
    init() {
      const self = this;
      //查找价格方案（表格数据）
      // self.selectSchemeList();
      //查找价格方案（添加新方案）
      selectPriceScheme().then(res => {
        if (res.code == 1) {
          self.addSchemeNeedList = res.data;
        }
        console.log(self.addSchemeNeedList);
      });
      //查找渠道
      listType({ typeMaster: "CHANNEL" }).then(res => {
        if (res.code == 1) {
          self.channelList = res.data;
          console.log(self.channelList);
          self.screenForm.checkedChannel = self.channelList;
        }
      });
      //查找房型
      listType({ typeMaster: "ROOM_TYPE" }).then(res => {
        if (res.code == 1) {
          self.roomTypeList = res.data;
        }
      });
      //查找会员等级
      listGrade().then(res => {
        if (res.code == 1) {
          self.gradeList = res.data;
        }
      });
    },
    selectSchemeList() {
      const _this = this;
      //查找方案列表 Y：价格方案  N：渠道
      listPriceScheme({ priceFlag: "Y" }).then(res => {
        if (res.code == 1) {
          _this.priceCategoryList = res.data;
          if (_this.priceCategoryList.tableList.length > 0) {
            _this.priceCategoryList.tableList.forEach(element => {
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
        console.log(_this.priceCategoryList);          
        }
      });
      listPriceScheme({ priceFlag: "N" }).then(res => {
        if (res.code == 1) {
          _this.channelChildList = res.data;
        console.log(_this.channelChildList);          
        }
      });
    },
    priceCategoryChange(data) {
      if (data == "会员类") {
        this.newSchemeForm.priceType = "MEMBER";
        this.newSchemeForm.isMember = true;
        this.newSchemeForm.isIntermediary = false;
      } else if (data == "协议类") {
        this.newSchemeForm.priceType = "AGREEMENT";
        this.newSchemeForm.isMember = false;
        this.newSchemeForm.isIntermediary = false;
      } else {
        this.newSchemeForm.priceType = "INTERMEDIA";
        this.newSchemeForm.isMember = false;
        this.newSchemeForm.isIntermediary = true;
      }
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
    //保存新方案
    saveNewScheme() {
      const self = this;
      if (this.verification()) {
        var params = {};
        params.beginDate = this.newSchemeForm.daterange[0]; //有效的开始时间
        params.breakfastNum = this.newSchemeForm.breakfast; //早餐数量
        params.channelPks = this.newSchemeForm.channel; //适用渠道主键
        // params.detailPos 价格详情集合
        params.endDate = this.newSchemeForm.daterange[1]; //有效的结束时间
        params.gradePk = this.newSchemeForm.memberLabel; //会员等级主键
        params.guaranteeTime = this.newSchemeForm.guaranteeTime; //担保时间
        params.guaranteeType = this.newSchemeForm.guaranteeType; //担保类型
        params.paymentMethod = this.newSchemeForm.payType; //付款方式
        params.priceCategory = this.newSchemeForm.priceType; //价格类别
        params.promotionType = this.newSchemeForm.saleType; //促销类型

        if (this.newSchemeForm.saleType == "BASIC_PRICE") {
          params.promotionCondition = "";
        } else if (this.newSchemeForm.saleType == "TIME_LIMIT") {
          var timerange = {
            beginTime: this.newSchemeForm.promotionDate[0],
            endTime: this.newSchemeForm.promotionDate[1]
          };
          params.promotionCondition = JSON.stringify(timerange);
        } else {
          params.promotionCondition = JSON.stringify({
            day: this.newSchemeForm.promotionDay
          });
        } //促销类型相关条件
        params.roomTypePks = this.newSchemeForm.roomType.join(","); //使用房型
        params.schemeCode = this.newSchemeForm.schemeCode; //方案代码
        params.schemeName = this.newSchemeForm.schemeName; //方案名称
        params.usingFlag = "Y";
        var detailPos = [];
        this.priceDetailPos.forEach(element => {
          var obj = {};
          obj.accuracyType = element.accuracyType; //精确度
          var price = [];
          for (var i = 0; i < element.differentPrice.length; i++) {
            price[i] = element.differentPrice[i].value;
          }
          obj.differentPrice = price.join(",");
          element.isDifferent?obj.differentPriceFlag = "Y":obj.differentPriceFlag = "N"; //周末价和平日价不同(自定义价格)是否启用标识
          obj.price = element.price; //价格 基本价格
          obj.refRule = element.refRule; //引用方案时使用的规制
          obj.refRuleValue = element.refRuleValue; //引用方案使用的规制的值
          obj.refSchemePk = element.refSchemePk; //引用价格方案主键
          obj.roomTypePk = element.roomTypePk; //房间类型主键
          element.isFixed?obj.ruleType = "FIXED_PRICE":obj.ruleType = "REFERENCE";
          detailPos.push(obj);
        });
        params.detailPos = detailPos;
        addPriceScheme(params).then(res => {
          if (res.code == 1) {
            this.$message({
              showClose: true,
              message: "新方案保存成功",
              type: "success"
            });
            self.addSchemeDialog = false;
            self.selectSchemeList();
          }
        });
      }
    },
    verification() {
      var centent = "";
      if (this.newSchemeForm.schemeCode == "") {
        centent = "方案代码不能为空！";
      } else if (this.newSchemeForm.schemeName == "") {
        centent = "方案名称不能为空！";
      } else if (this.newSchemeForm.channel.length == 0) {
        centent = "方案渠道不能为空！";
      } else if (this.newSchemeForm.roomType.length == 0) {
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
    handleCheckAllChange(val) {
      console.log(val);
      this.screenForm.checkedChannel = val ? this.channelList : [];
      this.screenForm.isIndeterminate = false;
    },
    handleCheckedChannelChange(value) {
      let checkedCount = value.length;
      this.screenForm.checkChannelAll =
        checkedCount === this.channelList.length;
      this.screenForm.isIndeterminate =
        checkedCount > 0 && checkedCount < this.channelList.length;
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    priceAdjustmentChange(data) {
      // console.log(data)
      // console.log(this.priceAdjustment)
    },
    statusChange(){
      this.screenForm.loading = true;
      setTimeout(()=>{
        this.screenForm.loading = false;
      },500)
    }
  }
};
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 20px;
}
.form-heard {
  /* background-color: grey; */
  /* border-left: 2px solid red; */
  padding: 10px 30px;
  color: red;
}
.inpt-width {
  width: 193px;
}
.price-title {
  border-bottom: 2px solid #ddd;
  font-size: 14px;
}
.price-detail-li {
  margin-bottom: 10px;
}
.everydayPrice {
  margin: 10px 0;
}

.everydayPrice-li {
  width: 65px;
  display: inline-block;
  text-align: center;
  margin: 0 5px;
}

</style>
<style>
.peice-programme .el-dialog .el-dialog__body {
  height: 400px;
  overflow: auto;
}
</style>

