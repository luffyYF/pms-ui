<template>
  <div>
    <!-- form -->
    <el-form ref="conditionalQuery" :inline="true" :model="conditionalQuery" size="mini" label-width="80px">
      <div class="bg-reserve">
        <h5 class="info-title">协议单位查询</h5>     
          <el-form-item label="单位名称">
            <el-input v-model="conditionalQuery.unitName" clearable></el-input>
          </el-form-item>
          <el-form-item label="协议分类">
            <el-select v-model="conditionalQuery.agreementTypePk" placeholder="请选择协议分类">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="(items,index) in agreementOptions"
                :key="index"
                :label="items.typeName"
                :value="items.typePk">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员">
            <el-select v-model="conditionalQuery.saleTypePk" placeholder="请选择销售员">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="(item,index) in saleOptions"
                :key="index"
                :label="item.typeName"
                :value="item.typePk">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="挂账">
          <el-select v-model="conditionalQuery.billFlag" placeholder="请选择挂账">
            <el-option label="全部" value=""></el-option>
            <el-option label="可用" value="Y"></el-option>
            <el-option label="不可用" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="conditionalQuery.status" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="有效" value="Y"></el-option>
            <el-option label="失效" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="protocolSearch">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table -->
    <div class="bg-reserve">
      <h5 class="info-title">协议单位列表</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addProClick">添加协议单位</el-button>
      <el-table 
      size="mini" 
      border 
      v-loading="loading" 
      :data="tableData" 
      height="450" 
      style="width: 98.5%; margin:10px;">
        <!-- <el-table-column prop="companyPk" label="所属分店" align="center" width="120">
        </el-table-column> -->
        <el-table-column prop="unitName" label="单位名称" align="center">
        </el-table-column>
        <el-table-column prop="typeName" label="协议分类" align="center">
        </el-table-column>
        <el-table-column prop="saleName" label="销售员" align="center" width="90">
        </el-table-column>
        <el-table-column prop="unitPhone" label="单位电话" align="center" width="150">
        </el-table-column>
        <el-table-column prop="contactName" label="联系人" align="center" width="120">
        </el-table-column>
        <el-table-column prop="contactPhone" label="联系人手机" align="center" width="120">
        </el-table-column>
        <el-table-column prop="billPrice" label="挂账限额" align="center" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="160">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="editProClick(scope.row)" type="text" size="mini">修改</el-button>
            <!-- <el-button @click="specialPriceClick(scope.row)" type="text" size="mini">特殊房间设置</el-button> -->
            <el-button @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="agreementList" :current-page="conditionalQuery.pageNum" :page-size="conditionalQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <!-- 添加修改协议单位 dialog -->
    <el-dialog :title="proDialogTitle" :visible.sync="dialogProtocolVisible" size="mini" class="addagreement">
      <div class="body-conten">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="协议分类" prop="agreementTypePk">
                <el-select v-model="form.agreementTypePk" placeholder="请选择协议分类" style="width:178px" clearable>
                  <el-option
                    v-for="items in agreementOptions"
                    :key="items.typePk"
                    :label="items.typeName"
                    :value="items.typePk">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="单位名称" prop="unitName">
                <el-input v-model="form.unitName" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>  
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="行业分类" prop="industryTypePk">
                <el-select v-model="form.industryTypePk" placeholder="请选择行业分类" style="width:178px">
                  <el-option
                    v-for="item in industryOptions"
                    :key="item.typePk"
                    :label="item.typeName"
                    :value="item.typePk">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="销售员" prop="saleTypePk">
                <el-select v-model="form.saleTypePk" placeholder="请选择销售员" style="width:178px">
                  <el-option
                    v-for="item in saleOptions"
                    :key="item.typePk"
                    :label="item.typeName"
                    :value="item.typePk">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11"> 
              <el-form-item label="价格方案" prop="priceSchemePk">
                <el-select v-model="form.priceSchemePk" placeholder="请选择价格方案" style="width:178px">
                  <el-option label="方案一" value="fanganyi"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="协议号" prop="agreementCode"> 
                <el-input v-model="form.agreementCode" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col> 
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="生效日期" prop="beginDate">
                <!-- <el-date-picker size="mini" style="width:200px;" v-model="form.beginDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择时间"/> -->
                <el-date-picker type="date" placeholder="选择日期" v-model="form.beginDate" value-format="yyyy-MM-dd" style="width:178px"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="失效日期" prop="endDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" value-format="yyyy-MM-dd" style="width:178px"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="挂账" prop="billFlag">
                <el-select v-model="form.billFlag" @change="billFlagChange" placeholder="请选择挂账" style="width:178px">
                  <el-option label="可用" value="Y"></el-option>
                  <el-option label="不可用" value="N"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="挂账限额" prop="billPrice">
                <el-input v-model="form.billPrice" :disabled="form.billFlag == 'N' ? true : false" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="单位传真" prop="fax">
                <el-input v-model="form.fax" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系人" prop="contactName">
                <el-input v-model="form.contactName" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="联系人职务" prop="contactPost">
                <el-input v-model="form.contactPost" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系人手机" prop="contactPhone">
                <el-input v-model="form.contactPhone" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="单位电话" prop="unitPhone">
                <el-input v-model="form.unitPhone" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogProtocolVisible = false">取 消 </el-button>
        <el-button size="mini" type="primary" @click="preservationUnit('form',proDialogTitle)">保存协议单位</el-button>
      </div>
    </el-dialog>

    <addProtocolUnit ref="addProtocolUnitRef" @callback="agreementList" />

    <!-- 协议单位特殊房价设置 dialog -->
    <el-dialog title="协议单位特殊房价设置" :visible.sync="dialogSpecialPriceVisible" width="50%" class="protocolPrice-contenter">
      <div class="body-conten">
        <el-button size="mini" type="primary" class="addPriceBtn" @click="addSpecialPrice">添加协议特殊房价</el-button>
        <el-tabs v-model="activeProtocolPrice" type="border-card" class="protocolPrice-tabs">
          <el-tab-pane label="有效的价格明细" name="first">
            <el-table :data="protocolPriceEffective" height="250px" border style="width: 100%">
              <el-table-column prop="roomTypePk" label="房型"></el-table-column>
              <el-table-column prop="beginDate" label="起始日期"></el-table-column>
              <el-table-column prop="endDate" label="结束日期"></el-table-column>
              <el-table-column prop="level" label="优先级"></el-table-column>
              <el-table-column prop="agreementPrice" label="房价"></el-table-column>
              <el-table-column prop="beginDate" label="添加时间"></el-table-column>
              <el-table-column prop="date" label="操作员"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="删除的价格明细" name="second">
            <el-table :data="protocolPriceDelete" height="250px" border style="width: 100%">
              <el-table-column prop="roomTypePk" label="房型"></el-table-column>
              <el-table-column prop="beginDate" label="起始日期"></el-table-column>
              <el-table-column prop="endDate" label="结束日期"></el-table-column>
              <el-table-column prop="level" label="优先级"></el-table-column>
              <el-table-column prop="agreementPrice" label="房价"></el-table-column>
              <el-table-column prop="endDate" label="删除时间"></el-table-column>
              <el-table-column prop="date" label="操作员"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogSpecialPriceVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogSpecialPriceVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加协议单位特殊价格" :visible.sync="dialogAddPriceBtnVisible" width="65%" class="protocolPrice-contenter">
      <div class="body-conten" style="display: inline-block;">
        <el-col :span="24" style="padding: 10px;">
          <div class="demo-input-suffix"> 
            起始日期：<el-date-picker  v-model="roomTypeData.beginDate" value-format="yyyy-MM-dd" type="date" size="mini" placeholder="选择日期"></el-date-picker>
            结束日期：<el-date-picker  v-model="roomTypeData.endDate" value-format="yyyy-MM-dd" type="date" size="mini" placeholder="选择日期"></el-date-picker>
            优先级别(<em class="fontColor">数字越大优先级越高</em>)：
            <el-select v-model="roomTypeData.level" placeholder="请选择活动区域" size="mini">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="24" style="padding:0 10px;">
          <p class="fontColor distance">*注：协议价如果为零则不生效</p>
          <el-table :data="roomTypeOptions" height="250px" border style="width: 100%">
              <el-table-column prop="typeName" label="房型" width="100px">
                <template slot-scope="scope">{{scope.row.typeName}}</template>
              </el-table-column>
              <el-table-column label="协议价" width="100px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.agreementPrice" placeholder="0" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="如果一周有不同的价格可以分别设置">
                <template slot-scope="scope">
                  <div class="demo-input-suffix">
                    <span class="price-li"><el-checkbox v-model="scope.row.differentPriceFlag"></el-checkbox></span>
                    <span class="price-li">
                      <div>周日</div>
                      <div v-if="!scope.row.differentPriceFlag">{{scope.row.agreementPrice}}</div>
                      <div v-if="scope.row.differentPriceFlag"><el-input v-model="scope.row.sunday" placeholder="0" size="mini" class="width-ipt"></el-input></div>
                    </span>
                    <span class="price-li">
                      <div>周一</div>
                      <div v-if="!scope.row.differentPriceFlag">{{scope.row.agreementPrice}}</div>
                      <div v-if="scope.row.differentPriceFlag"><el-input v-model="scope.row.monday" placeholder="0" size="mini" class="width-ipt"></el-input></div>
                    </span>
                    <span class="price-li">
                      <div>周二</div>
                      <div v-if="!scope.row.differentPriceFlag">{{scope.row.agreementPrice}}</div>
                      <div v-if="scope.row.differentPriceFlag"><el-input v-model="scope.row.tuesday" placeholder="0" size="mini" class="width-ipt"></el-input></div>
                    </span>
                    <span class="price-li">
                      <div>周三</div>
                      <div v-if="!scope.row.differentPriceFlag">{{scope.row.agreementPrice}}</div>
                      <div v-if="scope.row.differentPriceFlag"><el-input v-model="scope.row.wednesday" placeholder="0" size="mini" class="width-ipt"></el-input></div>
                    </span>
                    <span class="price-li">
                      <div>周四</div>
                      <div v-if="!scope.row.differentPriceFlag">{{scope.row.agreementPrice}}</div>
                      <div v-if="scope.row.differentPriceFlag"><el-input v-model="scope.row.thursday" placeholder="0" size="mini" class="width-ipt"></el-input></div>
                    </span>
                    <span class="price-li">
                      <div>周五</div>
                      <div v-if="!scope.row.differentPriceFlag">{{scope.row.agreementPrice}}</div>
                      <div v-if="scope.row.differentPriceFlag"><el-input v-model="scope.row.friday" placeholder="0" size="mini" class="width-ipt"></el-input></div>
                    </span>
                    <span class="price-li">
                      <div>周六</div>
                      <div v-if="!scope.row.differentPriceFlag">{{scope.row.agreementPrice}}</div>
                      <div v-if="scope.row.differentPriceFlag"><el-input v-model="scope.row.saturday" placeholder="0" size="mini" class="width-ipt"></el-input></div>
                    </span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="preservationPrice(roomTypeOptions)">确定保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {listType} from '@/api/utils/pmsTypeController'
import {addProject,delProject,updateProject,listProject} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
import {addPriceProject,delPriceProject,listPriceProject} from '@/api/customerRelation/ProtocolManage/pmsAgreementRoomPrice'
// import {powerJudge} from '@/utils/permissionsOperation.js'
import addProtocolUnit from './addProtocolUnit'
import moment from "moment"
export default {
  components:{
    moment,addProtocolUnit
  },
  data() {
    return {
      roomTypeOptions: [],
      agreementOptions: [],
      industryOptions: [], 
      saleOptions: [],
      dialogSpecialPriceVisible: false,
      dialogProtocolVisible: false,
      dialogAddPriceBtnVisible: false,
      differentPriceFlag: false,
      loading: false,
      proDialogTitle: '',
      activeProtocolPrice: 'first',
      form: {//查询表单数据
        address: '',
        agreementCode: '',
        agreementPk: '',
        agreementTypePk: '',
        beginDate: moment().format("YYYY-MM-DD") ,
        billFlag: 'Y',
        billPrice: 0,
        companyPk: '',
        contactName: '',
        contactPhone: '',
        contactPost: '',
        endDate:  moment().format("YYYY-MM-DD"),
        fax: '',
        industryTypePk: '',
        priceSchemePk: '',
        saleTypePk: '',
        sortNum: 0,
        unitName: '',
        unitPhone: '',
      },
      conditionalQuery: { 
        pageNum: 1,
        pageSize: 10
      },
      roomTypeData:{ 
        companyPk:'',
        sortNum:'',
        roomPricePk:'',
        agreementPk:'',
        roomTypePk:'',
        level:'',
        agreementPrice:'',
        differentPriceFlag:'',
        differentPrice:'',
        beginDate:'',
        endDate:''
      },
      sunday: 0, 
      monday: 0, 
      tuesday: 0, 
      wednesday: 0, 
      thursday: 0, 
      friday: 0, 
      saturday: 0,
      rules: {//表单验证
        agreementTypePk: [
          { required: true, message: '请选择协议分类', trigger: 'change' },
        ],
        unitName: [
          { required: true, message: '请请输入单位名称', trigger: 'blur' }
        ],          
        industryTypePk: [
          { required: true, message: '请选择行业分类', trigger: 'change' }
        ],
        saleTypePk: [
          { required: true, message: '请选择销售员', trigger: 'change' }
        ],
        priceSchemePk: [
          { required: true, message: '请选择价格方案', trigger: 'change' }
        ],   
        agreementCode: [
          { required: true, message: '请输入协议号', trigger: 'blur' }
        ],
        beginDate: [
          {type: 'date',  required: true, message: '选择日期', trigger: 'change' }
        ],
        endDate: [
          {type: 'date',  required: true, message: '选择日期', trigger: 'change' }
        ],
        billFlag: [
          { required: true, message: '请选择挂账', trigger: 'change' }
        ],
        billPrice: [
          { required: true, message: '请输入挂账限额', trigger: 'blur' }
        ],                      
        fax: [
          { required: true, message: '请输入单位传真', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPost: [
          { required: true, message: '请输入联系人职务', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '联系人手机', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '详细地址', trigger: 'blur' }
        ],
        unitPhone: [
          { required: true, message: '单位电话', trigger: 'blur' }
        ],
      },
      tableData: [], //账户列表数据
      protocolPriceEffective: [], //协议单位有效价格明细
      protocolPriceDelete: [], //协议单位删除价格明细
      beginDate: new Date(),
      endDate: new Date(),
      total: 0,
    };
  },
  created () {
    this.agreementList(1);
    this.listMastersType();
  },
  methods: {
    init() {
      this.listMastersType(1)
    },
    // powerJudge(id){
    //   return powerJudge(id);
    // },
    addProClick(row) {
      const self = this;
      // this.dialogProtocolVisible = true
      // self.form={};
      // this.proDialogTitle = '添加协议单位'
      this.$refs.addProtocolUnitRef.init()
      // self.init();
    },
    preservationUnit(formName,proDialogTitle) {
      const self = this;
      // self.$refs.form.validate((valid) => {
        var valid = true;
        if (valid) {
          console.log(self.form);
          return
          if(proDialogTitle == '添加协议单位'){
            self.form.agreementPk=null;
            self.form.billPrice = Number(self.form.billPrice);
            addProject(self.form).then(result => {
              if(result.code == 1){
                self.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogProtocolVisible = false;
                this.$refs[formName].resetFields();
                this.agreementList(self.conditionalQuery.pageNum);
              }
            })
          }else{
            console.log(self.form.billPrice);
            updateProject(self.form).then(result => {
              if(result.code == 1){
                self.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.dialogProtocolVisible = false;
                this.$refs[formName].resetFields();
                this.agreementList(self.conditionalQuery.pageNum);
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      // });
    },
    editProClick(row) {
      const self = this;
      self.form = row;
      // this.dialogProtocolVisible = true
      this.proDialogTitle = '修改协议单位'
      // delete self.form.typeName;
      this.$refs.addProtocolUnitRef.editProClick(row)
    },
    specialPriceClick(row) {//特殊房间设置
      this.dialogSpecialPriceVisible = true;
      this.listPriceMasters();
    },
    deleteClick(row) {//删除
      const self = this;
      self.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        //确认操作
        delProject({agreementPk: row.agreementPk}).then(res => {
          if(res.code == 1){
            self.$message({
              type: 'success',
              message: '删除成功'
            });
            this.dialogProtocolVisible = false;
            this.agreementList(self.conditionalQuery.pageNum);
          }
        }) 
      }).catch(()=>{
        self.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    listMastersType(i) {//查询分类类型
      const self = this;
      self.roomTypeOptions = [];
      self.agreementOptions = [];
      self.industryOptions = [];
      self.saleOptions = [];
      // listType({typeMasters: 'ROOM_TYPE,AGREEMENT,INDUSTRY,SALE'}).then(result => {
      //   const listTypeData = result.data.data;
      // for (let index = 0; index < listTypeData.length; index++) {
      //   const element = listTypeData[index].typeMaster;
      //   if(element == 'ROOM_TYPE'){
      //     self.roomTypeOptions.push(listTypeData[index])
      //   }else if(element == 'AGREEMENT'){
      //     self.agreementOptions.push(listTypeData[index]);
      //   }else if(element == 'INDUSTRY'){
      //     self.industryOptions.push(listTypeData[index]);
      //   }else{
      //     self.saleOptions.push(listTypeData[index]);
      //   }
      // }
      var typeList = JSON.parse(localStorage.getItem("pms_type"))
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE"){
          self.roomTypeOptions.push(item);
        }
        else if(item.typeMaster == "AGREEMENT"){
          self.agreementOptions.push(item);
        }
        else if(item.typeMaster == "INDUSTRY"){
          self.industryOptions.push(item);
        }
        else if(item.typeMaster == "SALE"){
          self.saleOptions.push(item);
        }
      })
        if(i){
          // self.form.beginDate = moment(new Date()).format("YYYY-MM-DD")
          // self.form.endDate = moment(new Date()).format("YYYY-MM-DD")
          self.form.billFlag = 'Y'
          self.form.priceSchemePk = 'fanganyi'
          self.form.saleTypePk = self.saleOptions.length>0?self.saleOptions[0].typePk:null
          self.form.industryTypePk = self.industryOptions.length>0?self.industryOptions[0].typePk:null
          self.form.agreementTypePk = self.agreementOptions.length>0?self.agreementOptions[0].typePk:null
          console.log(self.form)
        }
        
        // console.log(self.roomTypeOptions)
      // })
    },
    protocolSearch() {//搜索
      const self = this;
      const parameters = self.conditionalQuery;
      this.agreementList(1);
    },
    agreementList(val) {//查询列表
      const self = this;
      self.conditionalQuery.pageNum = val;
      const parameters = self.conditionalQuery;
      this.loading = true
      listProject(parameters).then(res => {
        this.loading = false
        this.tableData = res.data.data;
        this.total = res.data.pageSize;
      })  
    },
    getSizeChange(val) {
      const self = this;
      self.conditionalQuery.pageSize = val;
      if (val > self.total) {
        self.conditionalQuery.pageNum = 1;
      }
      const parameters = self.conditionalQuery;
      this.loading = true
      // console.log(parameters)
      listProject(parameters).then(res => {
        this.loading = false
        this.tableData = res.data.data;
        this.total = res.data.pageSize;
        self.conditionalQuery.pageNum = 1;
      })
    },
    listPriceMasters() {//查询协议单位房间价格
      listPriceProject().then(result => {
        // console.log(result.data)
        this.protocolPriceEffective = result.data;
      })

    },
    addSpecialPrice() { //添加协议单位特殊价格
      this.dialogAddPriceBtnVisible = true;
    },
    preservationPrice(row){
      // console.log(row)
      for (let index = 0; index < row.length; index++) {
        const element = row[index].agreementPrice;
        if(element != undefined){
          this.roomTypeData.agreementPrice = row[index].agreementPrice;
          this.roomTypeData.differentPriceFlag = row[index].differentPriceFlag;
          if(row[index].differentPriceFlag == false){
            this.roomTypeData.differentPrice = row[index].agreementPrice;
          }else{
            this.roomTypeData.differentPrice =  row[index].sunday;
            this.roomTypeData.differentPrice += row[index].monday;
            this.roomTypeData.differentPrice += row[index].tuesday;
            this.roomTypeData.differentPrice += row[index].wednesday;
            this.roomTypeData.differentPrice += row[index].thursday;
            this.roomTypeData.differentPrice += row[index].friday;
            this.roomTypeData.differentPrice += row[index].saturday;
          }
          addPriceProject(this.roomTypeData).then(res => {
            // console.log(res.code)
          })
        }
        // console.log(this.roomTypeData)
      }
    },
    billFlagChange(val) {
      if (val == 'N') {
        this.form.billPrice = 0;
      }
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
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.body-conten{
  position: relative;
  width: 100%;
  background: #f7f7f7;
}
.protocolPrice-tabs{
  box-shadow: none;
}
.addPriceBtn{
  position: absolute;
  z-index: 999;
  top: 6px;
  margin-left: 300px;
}
.fontColor{
  color: red;
  font-style: normal;
}
.distance{
  margin: 0;
}
.width-ipt{
  width: 60px;
}
.price-li{
  width: 60px;
  display: inline-block;
  text-align: center;
}
.positions {
  float: right;
}
</style>
<style>
.protocolPrice-contenter .el-dialog .el-dialog__body {
    padding: 0;
}
.el-dialog{
  width:680px;
}
</style>
