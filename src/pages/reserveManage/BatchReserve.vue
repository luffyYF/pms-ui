<template>
  <div style="width: 900px;margin-top: 15px;">
    <el-form :model="orderObj" :rules="rules" ref="orderObj" label-width="100px" size="mini" class="demo-ruleForm">
      <div class="block">
        <el-form-item  label="入离时间" prop="orderDate">
          <el-date-picker
            v-model="orderObj.orderDate"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="orderDateChange"
            align="right">
          </el-date-picker>
          <el-button type="primary" @click="setPriceBySelf()">开启/关闭自定义价格</el-button>
          <el-button type="primary" @click="resetForm('orderObj')">刷新</el-button>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="平台" prop="platformType">
            <el-select v-model="orderObj.platformType" placeholder="请选择平台">
              <el-option v-for="item in platformTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="押金" prop="deposit">
            <el-input v-model="orderObj.deposit" @change="depositChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="客服电话" prop="customerPhone">
            <el-input v-model="orderObj.customerPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-table
          :data="roomsList"
          ref="roomsList"
          border
          fit
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row>
                <el-col :span="20" class="border-right-sty">
                  <!--已排房房间列表-->
                  <div class="team-list">
                    <span class="team-span-list ng-scope" v-for="(item, index) in props.row.resRoomItems">
                      <span class="team-span-list-price">
                        <span>{{item.building+item.roomNumber}}</span>
                        <em v-if="item.selfPrice==0" @click="showPricePanel(item)">总价：{{item.price}}</em>
                        <em v-else="item.selfPrice>0" @click="showPricePanel(item)">总价：{{item.selfPrice}}</em>
                        <!-- 每日价格日历panel -->
                        <el-dialog title="每日价格" :visible.sync="dialogTableVisible" :append-to-body="true">
                          <div class="popover-content">
                            <table class="price-table">
                              <tr>
                                <th>周日</th>
                                <th>周一</th>
                                <th>周二</th>
                                <th>周三</th>
                                <th>周四</th>
                                <th>周五</th>
                                <th>周六</th>
                              </tr>
                            </table>
                          </div>
                          <div class="popover-content">
                            <table class="price-table">
                              <tr v-for="lines in priceDetailList">
                                  <td v-for="(ce, index) in lines">
                                    <!-- <span v-if="ce.date">{{ce}}</span><br> -->
                                    <span v-if="ce.date">{{ce.date}}</span><br>
                                    <span v-if="ce.price && ce.avgPrice==0" class="price">￥{{ce.price}}</span>
                                    <span v-if="ce.avgPrice>0" class="price">￥{{ce.avgPrice}}</span>
                                  </td>
                              </tr>
                            </table>
                          </div>
                        </el-dialog>
                      </span>
                      <span class="cursor_pointer" @click="removeResRoom(props.row,item,index)">x</span>
                    </span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <!--未排房房间列表-->
                  <div class="team-operation">
                    <!--未排房房间列表-->
                    <el-popover
                      ref="allocatingRoomsBtn"
                      placement="left"
                      width="500"
                      trigger="click">
                      <div class="room-list noSpan-list" style="border-top: none">
                        <span class="team-span-list ng-scope" v-for="(item, index) in props.row.noResRoomItems">
                          <span class="team-span-list-price" @click="addResRoom(props.row,item,index)">
                              <span>{{item.building+item.roomNumber}}</span>
                              <em>总价：{{item.price}}</em>
                          </span>
                        </span>
                        <span class="team-span-list noSpan ng-scope" v-if="props.row.noResRoomItems.length<=0">
                      <span class="team-span-list-price">
                          <span>暂无房间</span>
                      </span>
                    </span>
                      </div>
                    </el-popover>
                    <el-button v-popover:allocatingRoomsBtn>排房</el-button>
                  </div>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            label="房型"
            prop="houseTypeDesc">
          </el-table-column>
          <el-table-column
            label="总房价"
            prop="totalPrice">
            <template slot-scope="props">
              <el-input v-model="props.row.totalPrice" @change="totalPriceChange(props.row)"
              :disabled="!editTotalPriceFlag" :min="0" placeholder="" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="可预定数"
            prop="emptyCount">
          </el-table-column>
          <el-table-column
            label="预订间数"
            prop="reservedCount">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click="toggleRowExpansion(scope.row)"
                type="text"
                size="small">
                分配房间
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item class="text-align_right">
        <span class="payAmount_font">
          总金额：<span class="payAmount_sty">￥{{orderObj.payAmount}}</span>
        </span>
      </el-form-item>
      <hr>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预订人姓名" prop="userName">
            <el-input v-model="orderObj.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="userPhone">
            <el-input v-model="orderObj.userPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="支付方式">
        <el-radio-group v-model="orderObj.payType">
          <el-radio @change="showWeiXinPay" label="CASH">现金支付</el-radio>
          <el-radio @change="showWeiXinPay" label="POS">POS机支付</el-radio>
          <el-radio @change="showWeiXinPay" label="WEIXIN">微信支付</el-radio>
          <el-button v-show="weixinpayFlag">点击生成二维码进行微信支付</el-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="text-align_center">
          <el-button type="primary" @click="submitForm('orderObj')">保存订单</el-button>
          <el-button @click="resetForm('orderObj')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  import { CalcOperation } from '../../utils/number';
  export default {
    components:{Message},
    props: ['value'],
    watch: {
      value: function () {
        if (this.value) {
          this.orderObj.orderDate = [this.value.begin, this.value.end]
        }
      }
    },
    data() {
      return {
        //基本表单
        orderObj: {
          orderDate:['2018-03-02','2018-03-03'],
          platformType: [],
          deposit: 200,
          customerPhone: '17688194850',
          userName: '',
          userPhone: '',
          payAmount:200,
          payType:'',
          resRoomItems:[]
        },
        calcOperation: new CalcOperation(),//计算工具类
        //总房价是否可编辑
        editTotalPriceFlag:false,
        //平台集合
        platformTypeList:[{
          value: 'HOUSEFEEL',
          label: '豪斯菲尔'
        }, {
          value: 'MEI_TUAN',
          label: '美团'
        }, {
          value: 'TU_JIA',
          label: '途家'
        }, {
          value: 'MA_YI',
          label: '蚂蚁'
        }, {
          value: 'XIAO_ZHU',
          label: '小猪'
        }, {
          value: 'FEI_ZHU',
          label: '飞猪'
        }, {
          value: 'YI_LONG',
          label: '艺龙'
        }, {
          value: 'XIE_CHENG',
          label: '携程'
        }, {
          value: 'QU_NA_ER',
          label: '去哪儿'
        }],
        //校验规则
        rules: {
          orderDate: [
            { required: true, message: '请选择入离时间', trigger: 'blur' },
          ],
          platformType: [
            { required: true, message: '请选择平台', trigger: 'change' }
          ],
          deposit: [
            { required: true, message: '请填写押金', trigger: 'blur' }
          ],
          customerPhone: [
            { required: true, message: '请填写客服电话', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请填写预订人姓名', trigger: 'blur' }
          ],
          userPhone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' }
          ]
        },
        //时间控件
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() < Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '后三天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 365)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        //table
        roomsList: [{
          houseTypeDesc: '公寓住宅',
          totalPrice: 0,
          emptyCount:2,
          reservedCount: 0,
          resRoomItems:[],
          noResRoomItems:[{
            pk:'3',
            building:'120栋3单元',
            roomNumber:333,
            price:100,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:0
            }]
          }, {
            pk:'4',
            building:'120栋3单元',
            roomNumber:444,
            price:200,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:0
            }]
          }]
        },{
          houseTypeDesc: '浪漫公寓',
          totalPrice: 0,
          emptyCount: 1,
          reservedCount: 0,
          resRoomItems:[],
          noResRoomItems:[{
            pk:'10',
            building:'120栋3单元',
            roomNumber:5454,
            price:300,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:0
            }]
          }]
        }],
        //每日价格
        priceDetailList: [],
        dialogTableVisible:false,
        weixinpayFlag:false,
      };
    },
    methods: {
      submitForm(formName) {//保存订单
        this.$refs[formName].validate((valid) => {
          if (valid && this.orderObj.resRoomItems.length>0) {
            console.log(this.orderObj);
            Message.success("already submit!")
            this.resetForm('orderObj');
            this.resetData();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {//重置订单、刷新
        this.$refs[formName].resetFields();
        this.resetData();
      },
      resetData(formName) {//重置数据
        this.orderObj = {
          orderDate:['2018-03-02','2018-03-03'],
          platformType: [],
          deposit: 200,
          customerPhone: '17688194850',
          userName: '',
          userPhone: '',
          payAmount:200,
          payType:'',
          resRoomItems:[]
        };
        this.roomsList = [{
          houseTypeDesc: '公寓住宅',
          totalPrice: 0,
          emptyCount:2,
          reservedCount: 0,
          resRoomItems:[],
          noResRoomItems:[{
            pk:'3',
            building:'120栋3单元',
            roomNumber:333,
            price:100,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:0
            },{
              date:'2018-03-03',
              price:0
            }]
          }, {
            pk:'4',
            building:'120栋3单元',
            roomNumber:444,
            price:200,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:0
            },{
              date:'2018-03-03',
              price:0
            }]
          }]
        },{
          houseTypeDesc: '浪漫公寓',
          totalPrice: 0,
          emptyCount: 1,
          reservedCount: 0,
          resRoomItems:[],
          noResRoomItems:[{
            pk:'10',
            building:'120栋3单元',
            roomNumber:5454,
            price:300,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:0
            },{
              date:'2018-03-03',
              price:0
            }]
          }]
        }];
      },
      orderDateChange (value) { //入离时间改变事件
        //重置数据
        this.resetForm('orderObj');

        let selt= this;
        var curTime = new Date();
        curTime.setHours(8);//小时设置为8
        curTime.setMinutes(0);
        curTime.setSeconds(0);
        curTime.setMilliseconds(0);
        var startTime = new Date(Date.parse(value[0]));//转换过后默认时间是8:00
        if(startTime < curTime){
          Message.warning("开始日期不能小于当前日期");
          this.orderObj.orderDate = [];
        }else{
          // this.$emit('input', {begin: value[0], end: value[1]})
          this.orderObj.orderDate = [value[0],value[1]];
        }

        var dateDiff = this.getDateDiff(value[0],value[1]);//预定天数
        if(dateDiff==2){
          this.roomsList = [{
            houseTypeDesc: '公寓住宅',
            totalPrice: 0,
            emptyCount: 2,
            reservedCount: 0,
            resRoomItems:[],
            noResRoomItems:[{
              pk:'3',
              building:'120栋3单元',
              roomNumber:333,
              price:200,
              selfPrice:0,
              priceDetail:[{
                date:'2018-03-02',
                price:100
              },{
                date:'2018-03-03',
                price:100
              }]
            }, {
              pk:'4',
              building:'120栋3单元',
              roomNumber:444,
              price:400,
              selfPrice:0,
              priceDetail:[{
                date:'2018-03-02',
                price:200
              },{
                date:'2018-03-03',
                price:200
              }]
            }]
          },{
            houseTypeDesc: '浪漫公寓',
            totalPrice: 0,
            emptyCount: 1,
            reservedCount: 0,
            resRoomItems:[],
            noResRoomItems:[{
              pk:'10',
              building:'120栋3单元',
              roomNumber:5454,
              price:600,
              selfPrice:0,
              priceDetail:[{
                date:'2018-03-02',
                price:300
              },{
                date:'2018-03-03',
                price:300
              }]
            }]
          }];
        }else{
          this.roomsList = [{
          houseTypeDesc: '公寓住宅',
          totalPrice: 0,
          emptyCount:2,
          reservedCount: 0,
          resRoomItems:[],
          noResRoomItems:[{
            pk:'3',
            building:'120栋3单元',
            roomNumber:333,
            price:300,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:100
            },{
              date:'2018-03-03',
              price:100
            },{
              date:'2018-03-04',
              price:100
            }]
          }, {
            pk:'4',
            building:'120栋3单元',
            roomNumber:444,
            price:600,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:200
            },{
              date:'2018-03-03',
              price:200
            },{
              date:'2018-03-04',
              price:200
            }]
          }]
        },{
          houseTypeDesc: '浪漫公寓',
          totalPrice: 0,
          emptyCount: 1,
          reservedCount: 0,
          resRoomItems:[],
          noResRoomItems:[{
            pk:'10',
            building:'120栋3单元',
            roomNumber:5454,
            price:900,
            selfPrice:0,
            priceDetail:[{
              date:'2018-03-02',
              price:300
            },{
              date:'2018-03-03',
              price:300
            },{
              date:'2018-03-04',
              price:300
            }]
          }]
        }];
        }
      },
      setPriceBySelf(){//自定义价格
        this.editTotalPriceFlag = !this.editTotalPriceFlag;
        if(!this.editTotalPriceFlag){ //关闭自定义价格，将房价自定义单价设置为0
          this.orderObj.resRoomItems = [];
          this.roomsList.forEach(obj =>{
            obj.resRoomItems.forEach(objSon =>{
              objSon.selfPrice = 0;
              this.orderObj.resRoomItems.push(objSon);
            })
          })
        }
        this.calcPayMoney();//重新计算总房价、总付款金额
      },
      depositChange(value){//押金改变
        // console.log(value);
        let selt= this;
        var totalPrice = 0;//总金额
        var cashPledge = value;//押金
        this.roomsList.forEach(obj =>{
          obj.resRoomItems.forEach(objSon =>{
            totalPrice = selt.calcOperation.add(objSon.price,totalPrice);
          })
        })

        totalPrice = selt.calcOperation.add(totalPrice,cashPledge);
        this.orderObj.payAmount = totalPrice;//设置总付款金额
      },
      toggleRowExpansion(row){//分配房间按钮
        this.$refs.roomsList.toggleRowExpansion(row);
      },
      addResRoom(row, item, index){//添加排房
        let selt= this;
        //将房间添加到已排房列表
        row.noResRoomItems.splice(index, 1);
        row.resRoomItems.push(item);
        this.orderObj.resRoomItems.push(item);
        this.calcPayMoney();//计算总付款金额
      },
      removeResRoom(row, item, index){//删除排房
        row.resRoomItems.splice(index, 1);
        row.noResRoomItems.push(item);
        this.orderObj.resRoomItems.forEach(obj=>{
          if(item.pk==obj.pk){
            this.orderObj.resRoomItems.splice(obj, 1);
          }
        })
        this.calcPayMoney();//计算总付款金额
      },
      totalPriceChange(row){//总房价改变
        let selt= this;
        // var dateDiff = this.getDateDiff(this.orderObj.orderDate[0],this.orderObj.orderDate[1]);//预定天数
        var bigPrice = 0;//所有房间总房价
        this.roomsList.forEach(obj =>{
          //计算一个房型的总房价
          var totalPrice = 0;
          if(obj.houseTypeDesc==row.houseTypeDesc){
            totalPrice = row.totalPrice;
          }else{
            totalPrice = obj.totalPrice;
          }
          bigPrice = selt.calcOperation.add(totalPrice,bigPrice);
          if(this.editTotalPriceFlag){
            this.calcSelfPrice(obj,obj.totalPrice);//计算自定义价格
          }
        })
        this.orderObj.payAmount = selt.calcOperation.add(bigPrice,this.orderObj.deposit);//计算总付款金额
      },
      calcPayMoney(){ //计算总付款金额
        let selt= this;
        // var dateDiff = this.getDateDiff(this.orderObj.orderDate[0],this.orderObj.orderDate[1]);//预定天数
        var bigPrice = 0;//所有房间总房价
        this.roomsList.forEach(obj =>{
          obj.reservedCount = obj.resRoomItems.length;//累计该房型预定间数
          obj.emptyCount = obj.noResRoomItems.length;//减少该房型未预定间数
          //计算一个房型的总房价
          var totalPrice = 0;
          obj.resRoomItems.forEach(objSon =>{
            totalPrice = selt.calcOperation.add(objSon.price,totalPrice);
          })
          obj.totalPrice = totalPrice;//该房型总房价
          bigPrice = selt.calcOperation.add(totalPrice,bigPrice);
          if(this.editTotalPriceFlag){
            this.calcSelfPrice(obj,totalPrice);//计算自定义价格
          }
        })
        this.orderObj.payAmount = selt.calcOperation.add(bigPrice,this.orderObj.deposit);//计算总付款金额
      },
      calcSelfPrice(row,totalPrice){//计算自定义价格
        let selt= this;
        var resRoomSize = row.resRoomItems.length;//当前房型已排房间数
        var selfPrice = selt.calcOperation.divide(totalPrice,resRoomSize);//当前房型已排房间均价
        row.resRoomItems.forEach(objSon =>{
          objSon.selfPrice = selfPrice;//设置均价
        })
      },
      getDateDiff(startDate,endDate){//计算日期差
          var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
          var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
          var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
          return  dates;
      },
      showWeiXinPay(value){//切换支付方式，显示微信支付按钮
        if(value=="WEIXIN"){
          this.weixinpayFlag = true;
        }else{
          this.weixinpayFlag = false;
        }
      },
      showPricePanel(item){//显示每日价格
        this.dialogTableVisible = true;
        let selt= this;
        var days = this.getDateDiff(this.orderObj.orderDate[0],this.orderObj.orderDate[1]);
        var arr = [
          [{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          }],
          [{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          },{
            date:'03-01',
            price:10
          }]
        ];
        //处理每日价格
        if(this.editTotalPriceFlag){//处理自定义价格
          var avgPrice = selt.calcOperation.divide(item.selfPrice,days);//当前房间每天均价
          item.priceDetail.forEach(objSon =>{
            objSon.avgPrice = avgPrice;//设置均价
          })
        }else{
          var avgPrice = selt.calcOperation.divide(item.price,days);//当前房间每天均价
          item.priceDetail.forEach(objSon =>{
            objSon.price = avgPrice;//设置均价
            objSon.avgPrice = 0;//设置均价
          })
        }
        var lines = [];
        var seven = [{},{},{},{},{},{},{}];
        var index = 0;
        var coop = 0;

        for(var i = 0;i<days;i++){
          var nowItem = item.priceDetail[i];
          var week = new Date(nowItem.date).getDay();
          if(i==0){
            //设置第一行位置
            coop = week;
          }
          seven[coop] = {
            date:nowItem.date.substring(nowItem.date.indexOf('-')+1,nowItem.date.length),
            price:nowItem.price,
            avgPrice:nowItem.avgPrice
          };
          if(coop==6){
            lines.push(seven);
            seven = [{},{},{},{},{},{},{}];
            coop=-1;
          }else if(days-1==i){
            lines.push(seven);
          }
          coop++;
        }
        this.priceDetailList = lines;//arr
      }
    },
    mounted(){
      if (this.value) {
        this.orderObj.orderDate = [this.value.begin, this.value.end]
      }
    }
  }
</script>

<style scoped lang="scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/* .el-form-item .el-form-item__content{
  margin-left: 20px !important;
} */
.text-align_right{
  text-align: right;
}
.payAmount_font{
  font-size: 14px;color: #606266;
}
.payAmount_sty{
  font-style: normal; color: #f60; font-size: 24px;margin: 0px 30px 0px 10px;
}
.team-list {
  /*border-right: 1px solid #ddd;*/
  padding-left: 8px;
  width: 100%;
  min-height: 30px
}
.team-operation {
  width: 135px;
  text-align: center;
}
.room-list .team-span-list {
  background: transparent;
  color: #ff8b3e;
}
.team-span-list {
  margin-right: 8px;
  margin-bottom: 8px;
  border: 1px solid #ff8b3e;
  float: left;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background: #ff8b3e;
  color: #fff;
}
.team-span-list-price {
  cursor: pointer;
}
.team-span-list-price em {
  font-style: normal;
  margin: 0 10px;
  text-decoration: underline;
  cursor: pointer;
}
.room-list .team-span-list {
  background: transparent;
  color: #ff8b3e;
}
.cursor_pointer{
  cursor: pointer;
}
.el-table__expanded-cell[class*=cell] {
  padding: 20px 8px;
}
.text-align_center{
  text-align: center;
}
.room-list .noSpan {
  margin:0 auto;
}
.border-right-sty{
  border-right: 1px solid #ddd;
}
.el-dialog__body {
  padding: 5px 20px 30px;
}
.popover-content {
  display: inline-block;
  width: 100%;
  color: #666;
  padding: 0 !important;
}
.popover-content .price-table {
  width: 100%;
  overflow: auto;
}
.price-table td, .price-table th, .price-table .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: 1px solid rgba(255,255,255,.5);
  text-align: center;
}
.table-height{
  min-height: 100px;
}
.popover-content .price-table td {
  text-align: center !important;
  width: 70px;
}
.popover-content .price-table td span.price {
  color: #f60;
}
// .popover-content .price-table tr{
//   border-bottom:1px solid #99a9bf;
// }
</style>
